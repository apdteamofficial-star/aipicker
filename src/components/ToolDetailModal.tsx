import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  XCircle, 
  Layers, 
  Cpu, 
  Clock, 
  Bookmark, 
  ThumbsUp, 
  Share2, 
  CheckCircle2,
  Sparkles,
  DollarSign,
  Monitor
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectAlternative: (toolId: string) => void;
  onUpvote: (id: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectAlternative,
  onUpvote
}) => {
  const [copied, setCopied] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [userSubmittedReview, setUserSubmittedReview] = useState(false);

  if (!tool) return null;

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/#tool-${tool.slug}` : `https://aipicker.in/tools/${tool.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setUserSubmittedReview(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6">
      <div 
        id="tool-detail-modal"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl ${tool.logoBg} text-white font-black text-lg sm:text-xl flex items-center justify-center shadow-2xs shrink-0`}>
              {tool.logoLetter}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">{tool.name}</h2>
                {tool.verifiedHumanReview && (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                    <span>Tested</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">{tool.categoryName} • Updated {tool.lastUpdated}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Copy link to this tool"
            >
              {copied ? <Check className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" /> : <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />}
            </button>

            <button
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-100'
              }`}
              title="Save to bookmarks"
            >
              <Bookmark className={`w-4 sm:w-5 h-4 sm:h-5 ${isBookmarked ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          
          {/* Quick Overview Hero Strip */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] sm:text-xs font-bold text-indigo-600 uppercase tracking-wider">Executive Overview</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{tool.overview}</p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{tool.testedVersion}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                  <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{tool.platforms.join(', ')}</span>
                </span>
                {tool.contextWindow && (
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    <Cpu className="w-3.5 h-3.5 shrink-0" />
                    <span>Context: {tool.contextWindow}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Visit / Pricing Button Box */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end justify-center gap-2.5 sm:gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
              <div className="text-left md:text-right">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold">Pricing Model</span>
                <p className="text-base sm:text-lg font-black text-slate-900">{tool.startingPrice}</p>
                <p className="text-[11px] text-emerald-600 font-medium">{tool.freeTierDetails}</p>
              </div>

              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pros & Cons Grid */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
              <span>Unbiased Testing Breakdown: Pros vs Limitations</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Pros */}
              <div className="bg-emerald-50/50 rounded-xl p-3.5 sm:p-4 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5 mb-2.5 sm:mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Key Strengths & Advantages</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {tool.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-rose-50/50 rounded-xl p-3.5 sm:p-4 border border-rose-200">
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide flex items-center gap-1.5 mb-2.5 sm:mb-3">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Trade-offs & Potential Drawbacks</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {tool.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Benchmark Scores */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 sm:mb-4">
              AIPicker Laboratory Benchmark Metrics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {tool.benchmarks.map((bench, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{bench.metric}</span>
                    <span className="font-extrabold text-indigo-600">{bench.score} / 100</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                      style={{ width: `${bench.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 pt-0.5">{bench.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Verdict & Who It's Best For */}
          <div className="bg-indigo-900 text-white rounded-2xl p-4 sm:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-300 shrink-0" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">AIPicker Editorial Verdict</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-indigo-100">{tool.editorVerdict}</p>
            <div className="pt-2 border-t border-indigo-800/80 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-indigo-200">
              <strong className="text-white">Best For:</strong>
              <span>{tool.bestFor}</span>
            </div>
          </div>

          {/* Key Features Detailed List */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
              Full Capabilities & Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {tool.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2">
                  <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
