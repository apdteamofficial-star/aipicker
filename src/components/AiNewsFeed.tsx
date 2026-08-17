import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  TrendingUp, 
  Tag, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { NEWS_DATA } from '../data/newsData';
import { NewsItem, ToolCategory } from '../types';

interface AiNewsFeedProps {
  onSelectTool?: (toolSlug: string) => void;
}

export const AiNewsFeed: React.FC<AiNewsFeedProps> = ({ onSelectTool }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = ['all', 'Model Release', 'Pricing Update', 'API Capabilities', 'Dev Tooling', 'Video AI'];

  const filteredNews = NEWS_DATA.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl border border-slate-700/50">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-time AI Industry Intelligence (2026)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Releases & Industry Radar
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Stay ahead with verified model benchmark breakthroughs, API price reductions, agentic updates, and regulatory developments curated daily by our editorial staff.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedFilter(c)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === c
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c === 'all' ? 'All Headlines' : c}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {news.category}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  news.impactScore === 'Industry Shift' ? 'bg-amber-100 text-amber-900' :
                  news.impactScore === 'High Impact' ? 'bg-indigo-100 text-indigo-900' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {news.impactScore}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2.5 leading-snug">
                {news.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {news.summary}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{news.date}</span>
              </div>

              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
              >
                <span>{news.source}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
