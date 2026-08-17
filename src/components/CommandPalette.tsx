import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Code, 
  Terminal, 
  BarChart3, 
  BookOpen, 
  Calculator, 
  ArrowRight, 
  X,
  Zap
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { BENCHMARKS_DATA } from '../data/benchmarksData';
import { PROMPTS_DATA } from '../data/promptsData';
import { ARTICLES_DATA } from '../data/articlesData';
import { ToolItem, ActiveView } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolItem) => void;
  onNavigate: (view: ActiveView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent or direct
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedTools = TOOLS_DATA.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.tagline.toLowerCase().includes(query.toLowerCase()) ||
    t.categoryName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const matchedBenchmarks = BENCHMARKS_DATA.filter(b =>
    b.modelName.toLowerCase().includes(query.toLowerCase()) ||
    b.provider.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedPrompts = PROMPTS_DATA.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.toolTarget.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tools, benchmarks, system prompts, guides, or press ESC..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Views Navigation */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider shrink-0">Quick Jump:</span>
          <button
            onClick={() => { onNavigate('quiz'); onClose(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 border border-violet-200 text-violet-700 hover:text-violet-900 hover:border-violet-300 font-semibold cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>AI Quiz (60s)</span>
          </button>
          <button
            onClick={() => { onNavigate('benchmarks'); onClose(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 font-medium cursor-pointer shrink-0"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => { onNavigate('prompts'); onClose(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 font-medium cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>Prompt Hub</span>
          </button>
          <button
            onClick={() => { onNavigate('calculator'); onClose(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 font-medium cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-500" />
            <span>ROI Calculator</span>
          </button>
          <button
            onClick={() => { onNavigate('news'); onClose(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 font-medium cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Radar</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Matched Tools */}
          {matchedTools.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                AI Tools & Software ({matchedTools.length})
              </h4>
              <div className="space-y-1.5">
                {matchedTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => { onSelectTool(tool); onClose(); }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl ${tool.logoBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {tool.logoLetter}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 group-hover:text-indigo-600">{tool.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">{tool.categoryName}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{tool.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Benchmarks */}
          {matchedBenchmarks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
                Model Benchmarks
              </h4>
              <div className="space-y-1.5">
                {matchedBenchmarks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { onNavigate('benchmarks'); onClose(); }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 transition-all text-left group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600">{b.modelName}</div>
                      <div className="text-xs text-slate-500">SWE-bench: <strong>{b.sweBenchScore}%</strong> • MMLU-Pro: <strong>{b.mmluProScore}%</strong> • ${b.inputCostPer1M}/1M Tokens</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Prompts */}
          {matchedPrompts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                Prompt Recipes
              </h4>
              <div className="space-y-1.5">
                {matchedPrompts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { onNavigate('prompts'); onClose(); }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 transition-all text-left group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600">{p.title}</div>
                      <div className="text-xs text-slate-500">Target: {p.toolTarget} • Difficulty: {p.difficulty}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedTools.length === 0 && matchedBenchmarks.length === 0 && matchedPrompts.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">
              No exact matches found for "{query}". Try searching for Cursor, Claude, Python, or Benchmarks.
            </div>
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search 38+ Verified AI Tools & Frontier Model Specs</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
