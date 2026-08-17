import React from 'react';
import { 
  X, 
  Check, 
  XCircle, 
  Scale, 
  Star, 
  ShieldCheck, 
  ExternalLink,
  Plus,
  ArrowRight
} from 'lucide-react';
import { ToolItem } from '../types';

interface CompareModalProps {
  compareIds: string[];
  allTools: ToolItem[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onAddMoreTools: () => void;
  onSelectTool: (tool: ToolItem) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  compareIds,
  allTools,
  onRemoveFromCompare,
  onClearCompare,
  onAddMoreTools,
  onSelectTool
}) => {
  const comparedTools = allTools.filter((t) => compareIds.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Compare Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Side-by-Side Tool Comparison
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare features, pricing tiers, benchmarks, and honest trade-offs side by side.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onAddMoreTools}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tool</span>
          </button>

          {comparedTools.length > 0 && (
            <button
              onClick={onClearCompare}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-2 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              Clear All ({comparedTools.length})
            </button>
          )}
        </div>
      </div>

      {comparedTools.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center space-y-3">
          <Scale className="w-10 sm:w-12 h-10 sm:h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No tools selected for comparison</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the comparison scale icon on any tool card in the directory to compare up to 4 tools side by side.
          </p>
          <button
            onClick={onAddMoreTools}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Browse Directory
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Responsive Comparison Container with Horizontal Scrolling Indicator */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between sm:hidden text-[11px] text-slate-500 font-medium">
              <span>Swipe horizontally to view all tools →</span>
              <span className="font-bold text-indigo-600">{comparedTools.length} tools</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[620px] sm:min-w-[700px]">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <th className="p-3 sm:p-4 w-36 sm:w-48 text-xs font-bold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/90 backdrop-blur-xs z-10">
                      Specification
                    </th>
                    {comparedTools.map((tool) => (
                      <th key={tool.id} className="p-3 sm:p-4 w-60 sm:w-72 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-2.5">
                            <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-xl ${tool.logoBg} text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0`}>
                              {tool.logoLetter}
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-900 text-xs sm:text-sm">{tool.name}</span>
                                {tool.verifiedHumanReview && (
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 font-normal">{tool.categoryName}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveFromCompare(tool.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {/* Rating & Pricing */}
                  <tr>
                    <td className="p-3 sm:p-4 font-bold text-slate-700 bg-slate-50/50 sticky left-0 bg-slate-50 z-10">
                      Rating & Price
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-3 sm:p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 font-bold text-slate-900">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{tool.rating.toFixed(1)}</span>
                            <span className="text-slate-400 font-normal text-xs">({tool.reviewCount})</span>
                          </div>
                          <p className="font-extrabold text-indigo-600 text-xs">{tool.startingPrice}</p>
                          <p className="text-[11px] text-slate-500">{tool.freeTierDetails}</p>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Overview */}
                  <tr>
                    <td className="p-3 sm:p-4 font-bold text-slate-700 bg-slate-50/50 sticky left-0 bg-slate-50 z-10">
                      Overview
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-3 sm:p-4 text-slate-600 text-xs leading-relaxed">
                        {tool.tagline}
                      </td>
                    ))}
                  </tr>

                  {/* Best For */}
                  <tr>
                    <td className="p-3 sm:p-4 font-bold text-slate-700 bg-slate-50/50 sticky left-0 bg-slate-50 z-10">
                      Best For
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-3 sm:p-4 text-xs font-semibold text-slate-800">
                        {tool.bestFor}
                      </td>
                    ))}
                  </tr>

                  {/* Key Strengths */}
                  <tr>
                    <td className="p-3 sm:p-4 font-bold text-slate-700 bg-slate-50/50 sticky left-0 bg-slate-50 z-10">
                      Key Strengths
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-3 sm:p-4 space-y-1.5">
                        {tool.pros.slice(0, 3).map((pro, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Trade-offs */}
                  <tr>
                    <td className="p-3 sm:p-4 font-bold text-slate-700 bg-slate-50/50 sticky left-0 bg-slate-50 z-10">
                      Trade-offs
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-3 sm:p-4 space-y-1.5">
                        {tool.cons.slice(0, 2).map((con, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-3 sm:p-4 font-bold text-slate-700 bg-slate-50/50 sticky left-0 bg-slate-50 z-10">
                      Action
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-3 sm:p-4">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => onSelectTool(tool)}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                          >
                            Full Review
                          </button>
                          <a
                            href={tool.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
