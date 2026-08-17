import React from 'react';
import { 
  Star, 
  ExternalLink, 
  Bookmark, 
  Check, 
  ShieldCheck, 
  ThumbsUp, 
  Scale, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (id: string) => void;
  onSelectTool: (tool: ToolItem) => void;
  onUpvote: (id: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
  onSelectTool,
  onUpvote
}) => {
  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Open Source':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Freemium':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Paid':
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div 
      id={`tool-card-${tool.slug}`}
      className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group overflow-hidden"
    >
      {/* Card Header & Badges */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${tool.logoBg} text-white font-black text-xl flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform`}>
              {tool.logoLetter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 
                  onClick={() => onSelectTool(tool)}
                  className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {tool.name}
                </h3>
                {tool.verifiedHumanReview && (
                  <span title="Verified Human Tested & Benchmarked" className="text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {tool.categoryName}
              </span>
            </div>
          </div>

          {/* Bookmark & Compare Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'text-rose-600 bg-rose-50' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Remove from Saved' : 'Save Tool'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => onToggleCompare(tool.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isCompared 
                  ? 'text-indigo-600 bg-indigo-50 ring-1 ring-indigo-300' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Tagline */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal min-h-[32px]">
          {tool.tagline}
        </p>

        {/* Pricing & Rating Line */}
        <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
          <span className={`px-2 py-0.5 rounded-md font-bold border ${getPricingBadge(tool.pricingModel)}`}>
            {tool.pricingModel} • {tool.startingPrice}
          </span>

          <div className="flex items-center gap-1 text-slate-700 font-bold">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{tool.rating.toFixed(1)}</span>
            <span className="text-slate-600 font-normal text-[11px]">({tool.reviewCount})</span>
          </div>
        </div>

        {/* Key Features Bullet Pills */}
        <div className="mt-3 space-y-1.5">
          {tool.keyFeatures.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Upvote + Review Button */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onUpvote(tool.id)}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 font-medium px-2 py-1 rounded-md hover:bg-white transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{tool.userUpvotes}</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
            title={`Visit official ${tool.name} website`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => onSelectTool(tool)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            <span>Review</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
