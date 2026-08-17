import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Bookmark, 
  Scale, 
  Compass, 
  Calculator, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { 
  ToolItem, 
  ArticleItem, 
  ActiveView, 
  ToolCategory 
} from './types';
import { TOOLS_DATA, CATEGORIES } from './data/toolsData';
import { ARTICLES_DATA } from './data/articlesData';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { CompareModal } from './components/CompareModal';
import { AiMatcherWizard } from './components/AiMatcherWizard';
import { AiCostCalculator } from './components/AiCostCalculator';
import { ArticleView } from './components/ArticleView';
import { LegalPages } from './components/LegalPages';
import { SubmitToolModal } from './components/SubmitToolModal';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { BenchmarkArena } from './components/BenchmarkArena';
import { PromptLibrary } from './components/PromptLibrary';
import { AiNewsFeed } from './components/AiNewsFeed';
import { CommandPalette } from './components/CommandPalette';
import { SeoManager } from './components/SeoManager';
import { SeoIndexingModal } from './components/SeoIndexingModal';
import { AiReadinessQuiz } from './components/AiReadinessQuiz';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyTrending, setOnlyTrending] = useState<boolean>(false);

  // Guide Filtering State
  const [guideCategoryFilter, setGuideCategoryFilter] = useState<string>('all');
  const [guideSearchQuery, setGuideSearchQuery] = useState<string>('');

  // Selected Data Items
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Lists & State
  const [toolsList, setToolsList] = useState<ToolItem[]>(TOOLS_DATA);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aipicker_bookmarks');
      return saved ? JSON.parse(saved) : ['cursor-ai', 'claude-37-sonnet', 'deepseek-r1'];
    } catch {
      return ['cursor-ai', 'claude-37-sonnet', 'deepseek-r1'];
    }
  });
  const [compareIds, setCompareIds] = useState<string[]>(['cursor-ai', 'windsurf-ai', 'github-copilot']);

  // Modals & Command Palette
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState<boolean>(false);

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aipicker_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Handlers
  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const handleToggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 4) {
        alert('You can compare a maximum of 4 tools simultaneously.');
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  const handleUpvote = (id: string) => {
    setToolsList((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, userUpvotes: tool.userUpvotes + 1 } : tool
      )
    );
    if (selectedTool && selectedTool.id === id) {
      setSelectedTool((prev) =>
        prev ? { ...prev, userUpvotes: prev.userUpvotes + 1 } : null
      );
    }
  };

  const handleSelectAlternative = (toolId: string) => {
    const found = toolsList.find((t) => t.id === toolId);
    if (found) {
      setSelectedTool(found);
    }
  };

  const handleSelectArticle = (article: ArticleItem) => {
    setSelectedArticle(article);
    setActiveView('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Tools for Directory View
  const filteredTools = toolsList.filter((tool) => {
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tool.name.toLowerCase().includes(q);
      const matchTag = tool.tagline.toLowerCase().includes(q);
      const matchCat = tool.categoryName.toLowerCase().includes(q);
      const matchFeat = tool.keyFeatures.some((f) => f.toLowerCase().includes(q));
      if (!matchName && !matchTag && !matchCat && !matchFeat) return false;
    }

    // Category
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
      return false;
    }

    // Pricing Model
    if (selectedPricing !== 'all' && tool.pricingModel !== selectedPricing) {
      return false;
    }

    // Trending Only
    if (onlyTrending && !tool.trending) {
      return false;
    }

    return true;
  });

  const bookmarkedTools = toolsList.filter((t) => bookmarkedIds.includes(t.id));

  const allGuideCategories = ['all', ...Array.from(new Set(ARTICLES_DATA.map((a) => a.category)))];

  const filteredArticles = ARTICLES_DATA.filter((article) => {
    if (guideCategoryFilter !== 'all' && article.category !== guideCategoryFilter) {
      return false;
    }
    if (guideSearchQuery.trim()) {
      const q = guideSearchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchExcerpt = article.excerpt.toLowerCase().includes(q);
      const matchTag = article.tags.some((t) => t.toLowerCase().includes(q));
      const matchAuthor = article.author.name.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt && !matchTag && !matchAuthor) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Search Engine Optimization & Googlebot Schema Manager */}
      <SeoManager
        activeView={activeView}
        selectedTool={selectedTool}
        selectedArticle={selectedArticle}
        selectedCategory={selectedCategory}
        categoryName={CATEGORIES.find((c) => c.id === selectedCategory)?.name}
        searchQuery={searchQuery}
      />
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkedIds={bookmarkedIds}
        compareIds={compareIds}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME & DIRECTORY */}
        {(activeView === 'home' || activeView === 'directory') && (
          <div className="space-y-8 pb-16">
            {/* Hero Header */}
            <HeroSection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPricing={selectedPricing}
              setSelectedPricing={setSelectedPricing}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onlyTrending={onlyTrending}
              setOnlyTrending={setOnlyTrending}
              onOpenMatcher={() => setActiveView('matcher')}
              onOpenCalculator={() => setActiveView('calculator')}
              onOpenBenchmarks={() => setActiveView('benchmarks')}
              onOpenPrompts={() => setActiveView('prompts')}
              onOpenQuiz={() => setActiveView('quiz')}
            />

            {/* Directory Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Directory Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <span>Verified AI Tools Directory</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {filteredTools.length} results
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing independent, benchmarked AI tools tested by our research laboratory.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Category Reset if active */}
                  {(selectedCategory !== 'all' || selectedPricing !== 'all' || searchQuery || onlyTrending) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedPricing('all');
                        setSearchQuery('');
                        setOnlyTrending(false);
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Tools Card Grid */}
              {filteredTools.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
                  <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No tools matched your criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try clearing your search query or selecting "All Categories" to view the full directory.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedPricing('all');
                      setSearchQuery('');
                      setOnlyTrending(false);
                    }}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isBookmarked={bookmarkedIds.includes(tool.id)}
                      onToggleBookmark={handleToggleBookmark}
                      isCompared={compareIds.includes(tool.id)}
                      onToggleCompare={handleToggleCompare}
                      onSelectTool={(t) => setSelectedTool(t)}
                      onUpvote={handleUpvote}
                    />
                  ))}
                </div>
              )}

              {/* Featured Research Guides Preview Strip */}
              <div className="pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      <span>Latest 2026 AI Editorial Guides & Benchmarks</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      In-depth research papers, coding assistant benchmarks, and economic audits.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setActiveView('guides')}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    <span>View All {ARTICLES_DATA.length} Guides</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {ARTICLES_DATA.slice(0, 4).map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleSelectArticle(article)}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="h-40 overflow-hidden relative bg-slate-900">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span className="truncate max-w-[120px] font-semibold text-slate-600">{article.author.name}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          </div>
        )}

        {/* VIEW 2: MODEL BENCHMARK ARENA (LEADERBOARD) */}
        {activeView === 'benchmarks' && (
          <BenchmarkArena
            onSelectTool={(tool) => setSelectedTool(tool)}
          />
        )}

        {/* VIEW 3: PROMPT HUB / TEMPLATE LIBRARY */}
        {activeView === 'prompts' && (
          <PromptLibrary
            onSelectToolById={(id) => {
              const found = toolsList.find((t) => t.id === id);
              if (found) setSelectedTool(found);
            }}
          />
        )}

        {/* VIEW 4: AI RADAR & INDUSTRY NEWS */}
        {activeView === 'news' && (
          <AiNewsFeed
            onSelectToolById={(id) => {
              const found = toolsList.find((t) => t.id === id);
              if (found) setSelectedTool(found);
            }}
          />
        )}

        {/* VIEW 5: AI READINESS QUIZ & DREAM STACK */}
        {activeView === 'quiz' && (
          <AiReadinessQuiz
            onSelectTool={(tool) => setSelectedTool(tool)}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookmarkTool={(toolId) => handleToggleBookmark(toolId)}
            bookmarkedIds={bookmarkedIds}
          />
        )}

        {/* VIEW 6: AI MATCHER WIZARD */}
        {activeView === 'matcher' && (
          <AiMatcherWizard onSelectTool={(tool) => setSelectedTool(tool)} />
        )}

        {/* VIEW 6: COMPARE MATRIX */}
        {activeView === 'compare' && (
          <CompareModal
            compareIds={compareIds}
            allTools={toolsList}
            onRemoveFromCompare={(id) => setCompareIds(compareIds.filter((item) => item !== id))}
            onClearCompare={() => setCompareIds([])}
            onAddMoreTools={() => setActiveView('home')}
            onSelectTool={(tool) => setSelectedTool(tool)}
          />
        )}

        {/* VIEW 7: ROI & COST CALCULATOR */}
        {activeView === 'calculator' && (
          <AiCostCalculator />
        )}

        {/* VIEW 8: ALL GUIDES LIST */}
        {activeView === 'guides' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Editorial Research & Benchmarks</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                AI Deep-Dives & Testing Reports
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Empirical evaluations written by verified engineering leads, cinematographers, and NLP researchers.
              </p>
            </div>

            {/* Guides Filter & Search Controls */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={guideSearchQuery}
                  onChange={(e) => setGuideSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, tags, or author name..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-xs"
                />
                {guideSearchQuery && (
                  <button
                    onClick={() => setGuideSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {allGuideCategories.map((cat) => {
                  const isActive = guideCategoryFilter === cat;
                  const count = cat === 'all' 
                    ? ARTICLES_DATA.length 
                    : ARTICLES_DATA.filter((a) => a.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setGuideCategoryFilter(cat)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span>{cat === 'all' ? 'All Topics' : cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count & Reset */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
              <span>Showing <strong>{filteredArticles.length}</strong> research guides</span>
              {(guideCategoryFilter !== 'all' || guideSearchQuery) && (
                <button
                  onClick={() => {
                    setGuideCategoryFilter('all');
                    setGuideSearchQuery('');
                  }}
                  className="font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Article Cards Grid */}
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No research guides found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms or picking another category pill.
                </p>
                <button
                  onClick={() => {
                    setGuideCategoryFilter('all');
                    setGuideSearchQuery('');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Show All Guides
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article)}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden relative bg-slate-900">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{article.publishDate}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {article.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div className="text-left">
                            <span className="block text-xs font-bold text-slate-700 leading-none">{article.author.name}</span>
                            <span className="text-[10px] text-slate-400">{article.author.role.split('&')[0]}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 6: ARTICLE DETAIL VIEW */}
        {activeView === 'article-detail' && (
          <ArticleView
            article={selectedArticle}
            onBack={() => setActiveView('guides')}
            onSelectArticle={(art) => handleSelectArticle(art)}
            allArticles={ARTICLES_DATA}
          />
        )}

        {/* VIEW 7: BOOKMARKS VIEW */}
        {activeView === 'bookmarks' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-rose-500 fill-rose-500" />
                  <span>Your Saved AI Tools</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Tools you bookmarked for quick reference and stack planning ({bookmarkedTools.length} saved).
                </p>
              </div>

              {bookmarkedTools.length > 0 && (
                <button
                  onClick={() => setBookmarkedIds([])}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Clear All Bookmarks
                </button>
              )}
            </div>

            {bookmarkedTools.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No saved tools yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the bookmark icon on any tool in the directory to save it to your personal shortlist.
                </p>
                <button
                  onClick={() => setActiveView('home')}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Explore AI Tools Directory
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isBookmarked={true}
                    onToggleBookmark={handleToggleBookmark}
                    isCompared={compareIds.includes(tool.id)}
                    onToggleCompare={handleToggleCompare}
                    onSelectTool={(t) => setSelectedTool(t)}
                    onUpvote={handleUpvote}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 8: LEGAL PAGES (About, Contact, Privacy, Terms, Disclosure, Editorial) */}
        {(activeView === 'about' ||
          activeView === 'contact' ||
          activeView === 'privacy-policy' ||
          activeView === 'terms' ||
          activeView === 'affiliate-disclosure' ||
          activeView === 'editorial-policy') && (
          <LegalPages pageType={activeView} />
        )}

      </main>

      {/* Persistent Footer */}
      <Footer
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
      />

      {/* SEO & Search Engine Indexing Status Center */}
      <SeoIndexingModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
      />

      {/* Tool Specifications In-Depth Modal */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        isBookmarked={selectedTool ? bookmarkedIds.includes(selectedTool.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSelectAlternative={handleSelectAlternative}
        onUpvote={handleUpvote}
      />

      {/* Submit Tool Modal */}
      <SubmitToolModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Global Command Palette / Quick Search (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTool={(tool) => setSelectedTool(tool)}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* GDPR / CCPA Cookie Banner */}
      <CookieBanner />

    </div>
  );
}
