import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Zap, 
  DollarSign, 
  Cpu, 
  Scale, 
  Check, 
  ExternalLink,
  Info,
  TrendingUp,
  Award
} from 'lucide-react';
import { BENCHMARKS_DATA } from '../data/benchmarksData';
import { BenchmarkEntry, ToolItem } from '../types';

interface BenchmarkArenaProps {
  onSelectTool?: (tool: ToolItem) => void;
}

export const BenchmarkArena: React.FC<BenchmarkArenaProps> = ({ onSelectTool }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'sweBench' | 'speed' | 'cost' | 'mmlu'>('sweBench');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const providers = useMemo(() => {
    const set = new Set(BENCHMARKS_DATA.map(m => m.provider));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredAndSorted = useMemo(() => {
    return BENCHMARKS_DATA.filter(model => {
      const matchProvider = selectedProvider === 'all' || model.provider === selectedProvider;
      const matchSearch = model.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.bestUseCase.toLowerCase().includes(searchTerm.toLowerCase());
      return matchProvider && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'sweBench') return b.sweBenchScore - a.sweBenchScore;
      if (sortBy === 'mmlu') return b.mmluProScore - a.mmluProScore;
      if (sortBy === 'speed') return b.tokensPerSecond - a.tokensPerSecond;
      if (sortBy === 'cost') return a.inputCostPer1M - b.inputCostPer1M;
      return 0;
    });
  }, [selectedProvider, sortBy, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>2026 Frontier LLM Benchmarks & Cost Matrix</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI Model Arena & Benchmark Leaderboard
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Independent, empirical evaluations of state-of-the-art AI models across real-world software engineering (SWE-bench), deep reasoning (MMLU-Pro), throughput latency, and API inference economics.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 sm:pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Standardized Suite</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified API Pricing (2026)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters and Sorting */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search model, provider (Claude 3.7, DeepSeek, OpenAI)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
          />
        </div>

        {/* Provider Filter */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Provider:</span>
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedProvider(p)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedProvider === p
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="sweBench">Coding (SWE-bench)</option>
            <option value="mmlu">Reasoning (MMLU-Pro)</option>
            <option value="speed">Speed (Tokens / sec)</option>
            <option value="cost">Lowest Cost / 1M Tokens</option>
          </select>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAndSorted.map((model, idx) => (
          <div
            key={model.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between group relative"
          >
            {/* Top Rank Badge */}
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center border border-slate-200">
                  #{idx + 1}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {model.provider}
                </span>
              </div>
              <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md ${
                model.reasoningCapability === 'Frontier' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {model.reasoningCapability} Tier
              </span>
            </div>

            {/* Model Name & Context */}
            <div className="space-y-1.5 sm:space-y-2 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {model.modelName}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {model.bestUseCase}
              </p>
            </div>

            {/* Benchmark Scores Visualization */}
            <div className="space-y-2.5 sm:space-y-3 bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-100 mb-4">
              {/* SWE-bench Score */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>SWE-bench Verified</span>
                  </span>
                  <span className="text-slate-900 font-bold">{model.sweBenchScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${model.sweBenchScore}%` }}
                  />
                </div>
              </div>

              {/* MMLU-Pro Score */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>MMLU-Pro Reasoning</span>
                  </span>
                  <span className="text-slate-900 font-bold">{model.mmluProScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${model.mmluProScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Speed Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Input Cost / 1M:</span>
                <span className="font-extrabold text-slate-900">${model.inputCostPer1M.toFixed(2)}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Speed:</span>
                <span className="font-extrabold text-emerald-600">{model.tokensPerSecond} tok/s</span>
              </div>
            </div>

            {/* Context Window Footnote */}
            <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Context: <strong className="text-slate-700">{model.contextWindow}</strong></span>
              <span className="text-[10px] text-slate-400">Arch: {model.architectureType}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
