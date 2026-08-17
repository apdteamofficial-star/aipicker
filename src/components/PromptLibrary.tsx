import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Search, 
  Tag, 
  Zap, 
  BookOpen, 
  SlidersHorizontal 
} from 'lucide-react';
import { PROMPTS_DATA } from '../data/promptsData';
import { PromptItem } from '../types';

interface PromptLibraryProps {
  onSelectToolById?: (id: string) => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const targets = ['all', 'Cursor AI & Windsurf', 'Claude 3.7 / Claude Pro', 'Midjourney v6.1 / Midjourney Web', 'v0.dev / Bolt.new', 'Perplexity AI / Pro Search', 'ElevenLabs Studio'];

  const filteredPrompts = PROMPTS_DATA.filter((p) => {
    const matchTarget = selectedTarget === 'all' || p.toolTarget === selectedTarget;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase()) ||
                        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchTarget && matchSearch;
  });

  const handleCopy = (prompt: PromptItem) => {
    navigator.clipboard.writeText(prompt.promptTemplate);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Verified System Prompts & Tested Recipes</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI Prompt Engineering & System Rules Hub
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Curated, production-tested prompt templates, `.cursorrules` configurations, and chain-of-thought scaffolds engineered to get maximum accuracy out of modern frontier LLMs and creative generative models.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search prompts by keyword, target model, or language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-3 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Model:</span>
          {targets.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTarget(t)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedTarget === t
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t === 'all' ? 'All' : t.split('/')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {prompt.toolTarget}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{prompt.difficulty} Level</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">{prompt.title}</h3>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">{prompt.description}</p>

              {/* Prompt Code Box */}
              <div className="bg-slate-900 rounded-xl p-3.5 text-slate-200 font-mono text-[11px] sm:text-xs overflow-x-auto max-h-48 relative group/code border border-slate-800">
                <pre className="whitespace-pre-wrap leading-relaxed">{prompt.promptTemplate}</pre>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {prompt.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Used {prompt.copyCount}+ times</span>
              <button
                onClick={() => handleCopy(prompt)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  copiedId === prompt.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                }`}
              >
                {copiedId === prompt.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
