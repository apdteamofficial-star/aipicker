import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  HelpCircle,
  Tag,
  Check
} from 'lucide-react';
import { ArticleItem } from '../types';

interface ArticleViewProps {
  article: ArticleItem | null;
  onBack: () => void;
  onSelectArticle: (article: ArticleItem) => void;
  allArticles: ArticleItem[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!article) return null;

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/#guide-${article.slug}` : `https://aipicker.in/articles/${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg bg-white border border-slate-200 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Guides & Benchmarks</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-md border border-indigo-200">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {article.publishDate}</span>
          </span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
            Updated: {article.updatedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author Byline Box (Google E-E-A-T Critical) */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900">{article.author.name}</span>
                {article.author.verifiedExpert && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100" title="Verified AIPicker Reviewer" />
                )}
              </div>
              <p className="text-xs text-slate-500">{article.author.role}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{article.author.bio}</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied' : 'Share Guide'}</span>
          </button>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm max-h-[400px] bg-slate-900">
        <img
          src={article.featuredImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Prose Content */}
      <div 
        className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Frequently Asked Questions (FAQ Schema Ready) */}
      {article.faqs && article.faqs.length > 0 && (
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900">
              Frequently Asked Questions (FAQs)
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags Strip */}
      <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-200">
        <Tag className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-bold text-slate-500">Related Tags:</span>
        {article.tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Benchmark Guides */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="text-lg font-black text-slate-900">More Deep-Dive Benchmark Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all cursor-pointer space-y-2 group"
              >
                <span className="text-[11px] font-bold text-indigo-600">{rel.category}</span>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
