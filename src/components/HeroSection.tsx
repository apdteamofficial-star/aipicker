import React from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Flame, 
  Compass, 
  ShieldCheck,
  TrendingUp,
  Cpu,
  Calculator,
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/toolsData';
import { ToolCategory, PricingModel } from '../types';

interface HeroSectionProps {
  selectedCategory: ToolCategory;
  setSelectedCategory: (cat: ToolCategory) => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onlyTrending: boolean;
  setOnlyTrending: (val: boolean) => void;
  onOpenMatcher: () => void;
  onOpenCalculator: () => void;
  onOpenBenchmarks?: () => void;
  onOpenPrompts?: () => void;
  onOpenQuiz?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedPricing,
  setSelectedPricing,
  searchQuery,
  setSearchQuery,
  onlyTrending,
  setOnlyTrending,
  onOpenMatcher,
  onOpenCalculator,
  onOpenBenchmarks,
  onOpenPrompts,
  onOpenQuiz
}) => {
  const pricingOptions: { label: string; value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Free', value: 'Free' },
    { label: 'Freemium', value: 'Freemium' },
    { label: 'Open Source', value: 'Open Source' },
    { label: 'Paid', value: 'Paid' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900/5 via-slate-50 to-slate-50 border-b border-slate-200/80 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Tag & Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-[11px] sm:text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">Human-Curated AI Directory & Benchmark Lab</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight px-1">
            Discover & Compare the World’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">Best AI Tools</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto px-2">
            Unbiased evaluations, verified benchmarks, pricing calculators, and deep-dive comparisons across coding, LLMs, design, and automation.
          </p>

          {/* Quick Action Shortcuts - Fully Responsive Touch Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {onOpenQuiz && (
              <button
                id="hero-btn-quiz"
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-violet-600/25 transition-all cursor-pointer ring-2 ring-violet-400/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <span>Take 60s AI Quiz</span>
              </button>
            )}

            <button
              id="hero-btn-matcher"
              onClick={onOpenMatcher}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>AI Matcher Wizard</span>
            </button>

            {onOpenBenchmarks && (
              <button
                id="hero-btn-benchmarks"
                onClick={onOpenBenchmarks}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Leaderboard</span>
              </button>
            )}

            {onOpenPrompts && (
              <button
                id="hero-btn-prompts"
                onClick={onOpenPrompts}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Prompts</span>
              </button>
            )}

            <button
              id="hero-btn-calculator"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ROI Calc</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Container */}
        <div className="mt-6 sm:mt-8 max-w-4xl mx-auto bg-white rounded-2xl p-3.5 sm:p-5 shadow-xs border border-slate-200 space-y-3 sm:space-y-4">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, models (Claude 3.7, Cursor, FLUX, DeepSeek)..."
              className="w-full pl-10 sm:pl-11 pr-14 sm:pr-16 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-semibold text-slate-500 hover:text-slate-700 px-2 py-1 bg-slate-200 rounded-md cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Pricing & Trending Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
            {/* Pricing Model Pills */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase mr-1 shrink-0">Price:</span>
              {pricingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedPricing(opt.value)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPricing === opt.value
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Trending Toggle */}
            <button
              onClick={() => setOnlyTrending(!onlyTrending)}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer self-start sm:self-auto shrink-0 ${
                onlyTrending
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${onlyTrending ? 'text-white' : 'text-amber-600'}`} />
              <span>Trending Only</span>
            </button>
          </div>

        </div>

        {/* Category Horizontal Scroll Pills */}
        <div className="mt-5 sm:mt-6 max-w-6xl mx-auto overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 justify-start sm:justify-center min-w-max px-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ToolCategory)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Badges Strip (Critical for E-E-A-T & Google Quality Evaluation) */}
        <div className="mt-6 sm:mt-8 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
          <div className="p-2.5 sm:p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-indigo-600 font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>38+ Curated Tools</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Tested for 30+ days</p>
          </div>

          <div className="p-2.5 sm:p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs sm:text-sm">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>100% Unbiased</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Zero sponsored rankings</p>
          </div>

          <div className="p-2.5 sm:p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 font-bold text-xs sm:text-sm">
              <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Real Benchmarks</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">SWE-bench & latency</p>
          </div>

          <div className="p-2.5 sm:p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-purple-600 font-bold text-xs sm:text-sm">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>2026 AI Specs</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Claude 3.7 & DeepSeek</p>
          </div>
        </div>

      </div>
    </section>
  );
};
