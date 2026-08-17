import React, { useState, useRef, useEffect } from 'react';
import { AIPickerLogo } from './AIPickerLogo';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Scale, 
  Compass, 
  Calculator, 
  BookOpen, 
  PlusCircle, 
  Menu, 
  X, 
  Layers,
  BarChart3,
  Terminal,
  Zap,
  Command,
  ChevronDown,
  Code2,
  Bot,
  Image as ImageIcon,
  Video,
  Mic,
  Workflow,
  PenTool,
  Brain,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { ActiveView, ToolCategory } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCategory: ToolCategory;
  setSelectedCategory: (cat: ToolCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedIds: string[];
  compareIds: string[];
  onOpenSubmitModal: () => void;
  onOpenCommandPalette: () => void;
}

interface CategoryOption {
  id: ToolCategory;
  label: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

const CATEGORY_ITEMS: CategoryOption[] = [
  { id: 'all', label: 'All AI Tools', description: 'Browse entire vetted catalog of 38+ tools', icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
  { id: 'llm-chat', label: 'LLMs & Chatbots', description: 'Claude, ChatGPT, DeepSeek, Gemini, Perplexity', icon: Bot, color: 'text-blue-600 bg-blue-50' },
  { id: 'coding-dev', label: 'Coding & Dev Agents', description: 'Cursor, Windsurf, v0, Lovable, Bolt, Copilot', icon: Code2, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'image-design', label: 'Image & Design AI', description: 'Midjourney, Recraft v3, Flux.1, Ideogram', icon: ImageIcon, color: 'text-pink-600 bg-pink-50' },
  { id: 'video-animation', label: 'Video & Motion AI', description: 'Runway Gen-3, Kling AI, Luma Dream Machine', icon: Video, color: 'text-purple-600 bg-purple-50' },
  { id: 'audio-voice', label: 'Voice & Audio AI', description: 'ElevenLabs, Suno AI, Udio, Whisper', icon: Mic, color: 'text-amber-600 bg-amber-50' },
  { id: 'productivity-workflow', label: 'Productivity & Workflows', description: 'Notion AI, Make, Zapier Central', icon: Workflow, color: 'text-teal-600 bg-teal-50' },
  { id: 'writing-marketing', label: 'Writing & SEO', description: 'Jasper, Copy.ai, Writesonic', icon: PenTool, color: 'text-orange-600 bg-orange-50' },
  { id: 'research-data', label: 'Research & Science', description: 'Consensus, Elicit, NotebookLM', icon: Brain, color: 'text-cyan-600 bg-cyan-50' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  bookmarkedIds,
  compareIds,
  onOpenSubmitModal,
  onOpenCommandPalette
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (cat: ToolCategory) => {
    setSelectedCategory(cat);
    setActiveView('home');
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Top Main Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              id="nav-logo"
              onClick={() => handleNav('home')}
              className="flex items-center text-left group cursor-pointer focus:outline-none transition-transform"
              aria-label="AIPicker Home"
            >
              <AIPickerLogo iconSize={38} variant="light" />
            </button>
          </div>

          {/* Quick Search Bar / Command Palette Trigger (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-2">
            <button
              id="nav-btn-quicksearch"
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between pl-3.5 pr-2.5 py-2 bg-slate-100/90 hover:bg-slate-100 text-slate-500 text-xs rounded-xl border border-slate-200/90 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer text-left group shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                <span className="text-slate-500 font-medium truncate">Search 38+ AI tools, models, prompts...</span>
              </div>
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs font-mono shrink-0 ml-1.5">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-1.5">
            
            {/* Categories & Directory Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                id="nav-dropdown-categories"
                onClick={() => {
                  setCategoriesDropdownOpen(!categoriesDropdownOpen);
                  setToolsDropdownOpen(false);
                }}
                className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  (activeView === 'home' || activeView === 'directory') && !categoriesDropdownOpen
                    ? 'text-indigo-600 bg-indigo-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              {/* Categories Mega Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2.5 py-2 border-b border-slate-100 flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Browse by Category</span>
                    <button
                      onClick={() => handleCategorySelect('all')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      View All (38+)
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-[380px] overflow-y-auto">
                    {CATEGORY_ITEMS.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.id && activeView === 'home';
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-50/90 text-indigo-900' 
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${cat.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                              <span>{cat.label}</span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {cat.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Model Benchmark Leaderboard */}
            <button
              id="nav-link-benchmarks"
              onClick={() => handleNav('benchmarks')}
              className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                activeView === 'benchmarks'
                  ? 'text-indigo-600 bg-indigo-50/90 shadow-2xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Leaderboard</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-600 text-white uppercase tracking-tight">
                New
              </span>
            </button>

            {/* Prompt Hub */}
            <button
              id="nav-link-prompts"
              onClick={() => handleNav('prompts')}
              className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'prompts'
                  ? 'text-indigo-600 bg-indigo-50/90 shadow-2xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span>Prompt Hub</span>
            </button>

            {/* AI Readiness Quiz (New Feature) */}
            <button
              id="nav-link-quiz"
              onClick={() => handleNav('quiz')}
              className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                activeView === 'quiz'
                  ? 'text-indigo-600 bg-indigo-50/90 shadow-2xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-600 animate-pulse" />
              <span>AI Quiz</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 text-white uppercase tracking-tight">
                60s
              </span>
            </button>

            {/* AI Radar (Live News) */}
            <button
              id="nav-link-news"
              onClick={() => handleNav('news')}
              className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                activeView === 'news'
                  ? 'text-indigo-600 bg-indigo-50/90 shadow-2xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>AI Radar</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute top-1.5 right-1" />
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1" />
            </button>

            {/* Interactive Tools Dropdown (Matcher, Compare, ROI, Guides) */}
            <div className="relative" ref={toolsRef}>
              <button
                id="nav-dropdown-tools"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setCategoriesDropdownOpen(false);
                }}
                className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  (activeView === 'matcher' || activeView === 'compare' || activeView === 'calculator' || activeView === 'guides' || activeView === 'article-detail') && !toolsDropdownOpen
                    ? 'text-indigo-600 bg-indigo-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Tools & ROI</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${toolsDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              {/* Tools Dropdown Menu */}
              {toolsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Decision Utilities</span>
                  </div>

                  <button
                    onClick={() => handleNav('quiz')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-violet-50 text-slate-800 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>AI Readiness Quiz</span>
                        <span className="bg-violet-600 text-white text-[9px] font-extrabold px-1 rounded">60s</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Calculate maturity score &amp; dream stack</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('matcher')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-slate-50 text-slate-800 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">AI Matcher Wizard</div>
                      <div className="text-[11px] text-slate-500">Find the right AI tool in 30 seconds</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('compare')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-50 text-slate-800 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Side-by-Side Compare</div>
                        <div className="text-[11px] text-slate-500">Matrix comparison of specs & pricing</div>
                      </div>
                    </div>
                    {compareIds.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold">
                        {compareIds.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => handleNav('calculator')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-slate-50 text-slate-800 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">AI Cost & ROI Calculator</div>
                      <div className="text-[11px] text-slate-500">Calculate team savings & subscription spend</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('guides')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-slate-50 text-slate-800 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Editorial Guides & Deep Dives</div>
                      <div className="text-[11px] text-slate-500">Curated comparisons and buyer handbooks</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons & Utilities */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Search Icon Trigger for Mobile/Tablet */}
            <button
              id="btn-mobile-search"
              onClick={onOpenCommandPalette}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Search AI Tools (Ctrl+K)"
              aria-label="Search AI Tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bookmarks Counter Button */}
            <button
              id="btn-nav-bookmarks"
              onClick={() => handleNav('bookmarks')}
              className={`p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer ${
                activeView === 'bookmarks' ? 'text-indigo-600 bg-indigo-50 ring-1 ring-indigo-200' : ''
              }`}
              title="Saved AI Tools"
              aria-label="Saved AI Tools"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkedIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Submit Tool Button */}
            <button
              id="btn-nav-submit"
              onClick={onOpenSubmitModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all hover:shadow-md hover:shadow-indigo-500/25 cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Tool</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              id="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-8 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          
          {/* Mobile Search Trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommandPalette();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer border border-slate-200"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 font-semibold">Quick search 38+ AI tools...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Core Navigation Hubs */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Core Hubs & Leaderboards
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNav('home')}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeView === 'home' || activeView === 'directory'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>AI Directory</span>
              </button>

              <button
                onClick={() => handleNav('benchmarks')}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeView === 'benchmarks'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Leaderboard</span>
              </button>

              <button
                onClick={() => handleNav('prompts')}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeView === 'prompts'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <Terminal className="w-4 h-4 text-indigo-600" />
                <span>Prompt Hub</span>
              </button>

              <button
                onClick={() => handleNav('news')}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeView === 'news'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>AI Radar (News)</span>
              </button>
            </div>
          </div>

          {/* Interactive Utilities */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Interactive Utilities
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNav('quiz')}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer col-span-2 ${
                  activeView === 'quiz'
                    ? 'bg-violet-600 text-white'
                    : 'bg-violet-50 text-violet-800 hover:bg-violet-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-violet-600" />
                <div className="flex items-center justify-between w-full">
                  <span>AI Readiness &amp; Stack Quiz</span>
                  <span className="text-[9px] bg-violet-200 text-violet-900 font-extrabold px-1.5 py-0.2 rounded">60s</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('matcher')}
                className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>AI Matcher Wizard</span>
              </button>

              <button
                onClick={() => handleNav('compare')}
                className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-600" />
                  <span>Compare</span>
                </div>
                {compareIds.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                    {compareIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNav('calculator')}
                className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>ROI Calculator</span>
              </button>

              <button
                onClick={() => handleNav('guides')}
                className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Editorial Guides</span>
              </button>
            </div>
          </div>

          {/* Quick Categories Filter */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Filter by Category
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORY_ITEMS.slice(1).map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id && activeView === 'home';
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs font-medium cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-indigo-100 text-indigo-900 font-bold' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bookmarks & Submit Action */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleNav('bookmarks')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold text-xs cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-rose-500" />
              <span>Saved AI Tools ({bookmarkedIds.length})</span>
            </button>

            <button
              onClick={() => {
                onOpenSubmitModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Your AI Tool</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
