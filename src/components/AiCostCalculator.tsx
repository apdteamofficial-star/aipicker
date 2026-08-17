import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Check, 
  Clock, 
  Users, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const AiCostCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(3);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState<number>(6);
  
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'cursor',
    'claude',
    'perplexity'
  ]);

  const toolPricingMap: Record<string, { name: string; price: number; category: string }> = {
    cursor: { name: 'Cursor AI Pro', price: 20, category: 'Coding' },
    windsurf: { name: 'Windsurf Pro', price: 15, category: 'Coding' },
    github_copilot: { name: 'GitHub Copilot', price: 10, category: 'Coding' },
    claude: { name: 'Claude Pro (Thinking)', price: 20, category: 'LLM & Reasoning' },
    chatgpt: { name: 'ChatGPT Plus (GPT-4o)', price: 20, category: 'LLM & Voice' },
    perplexity: { name: 'Perplexity Pro', price: 20, category: 'Research' },
    midjourney: { name: 'Midjourney Standard', price: 30, category: 'Design' },
    elevenlabs: { name: 'ElevenLabs Creator', price: 22, category: 'Audio & Voice' },
    runway: { name: 'Runway Gen-3 Standard', price: 15, category: 'Video' }
  };

  const toggleTool = (key: string) => {
    if (selectedTools.includes(key)) {
      setSelectedTools(selectedTools.filter((t) => t !== key));
    } else {
      setSelectedTools([...selectedTools, key]);
    }
  };

  // Calculations
  const costPerPersonMonthly = selectedTools.reduce(
    (sum, key) => sum + (toolPricingMap[key]?.price || 0),
    0
  );
  const totalMonthlySoftwareSpend = costPerPersonMonthly * teamSize;

  const totalHoursSavedMonthly = teamSize * hoursSavedPerWeek * 4; // 4 weeks in a month
  const totalFinancialValueSaved = totalHoursSavedMonthly * hourlyRate;
  const netMonthlySavings = totalFinancialValueSaved - totalMonthlySoftwareSpend;
  const roiPercentage = totalMonthlySoftwareSpend > 0 
    ? Math.round((netMonthlySavings / totalMonthlySoftwareSpend) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Economic Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          AI Subscription ROI Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Calculate your exact monthly AI subscription spend against productive engineering and design hours saved.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Controls & Tool Picker */}
        <div className="lg:col-span-2 space-y-6 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-2xs">
          
          {/* Team Size & Rates Sliders */}
          <div className="space-y-4 pb-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>1. Team Dynamics & Labor Rate</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
              {/* Team Size */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 block mb-1">Team Size (Seats):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-sm text-indigo-600 min-w-[28px]">{teamSize}</span>
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 block mb-1">Avg Hourly Pay ($):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="15"
                    max="200"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-sm text-indigo-600 min-w-[36px]">${hourlyRate}</span>
                </div>
              </div>

              {/* Hours Saved Per Week */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 block mb-1">Hours Saved / Week:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={hoursSavedPerWeek}
                    onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-sm text-indigo-600 min-w-[28px]">{hoursSavedPerWeek}h</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>2. Select Active Paid AI Subscriptions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(toolPricingMap).map(([key, item]) => {
                const isChecked = selectedTools.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleTool(key)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-indigo-50/80 border-indigo-500 ring-1 ring-indigo-300'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{item.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800">${item.price}/mo</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Projected ROI Summary */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Projected ROI Metrics</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Net Value Generated</span>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                ${netMonthlySavings.toLocaleString()} <span className="text-xs font-semibold text-slate-300">/ mo</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Annualized net gain: ${(netMonthlySavings * 12).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Tool Spend:</span>
                <span className="font-bold text-white">${totalMonthlySoftwareSpend.toLocaleString()} / mo</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Engineering Hours Saved:</span>
                <span className="font-bold text-indigo-300">{totalHoursSavedMonthly} hrs / mo</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Calculated ROI:</span>
                <span className="font-black text-emerald-400 text-sm">+{roiPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-[11px] text-slate-300 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-indigo-400 inline mr-1" />
            Based on empirical engineering velocity studies measuring modern LLM and IDE agent productivity gains.
          </div>

        </div>

      </div>
    </div>
  );
};
