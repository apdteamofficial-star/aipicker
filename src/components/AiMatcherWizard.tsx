import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  DollarSign, 
  Cpu, 
  Code, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music,
  ExternalLink
} from 'lucide-react';
import { ToolItem } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

interface AiMatcherWizardProps {
  onSelectTool: (tool: ToolItem) => void;
}

export const AiMatcherWizard: React.FC<AiMatcherWizardProps> = ({ onSelectTool }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [matchedResults, setMatchedResults] = useState<ToolItem[]>([]);

  const goals = [
    { id: 'coding', title: 'Write & Debug Software', desc: 'Code editors, autocomplete, multi-file refactoring, terminal agents', icon: Code, cat: 'coding-dev' },
    { id: 'reasoning', title: 'Deep Logic, Math & LLMs', desc: 'Complex problem solving, coding reasoning, synthetic analysis', icon: Cpu, cat: 'llm-chat' },
    { id: 'image', title: 'Visual Art, Logos & Design', desc: 'Photorealistic generation, typography, graphics, canvas editing', icon: ImageIcon, cat: 'image-design' },
    { id: 'video', title: 'Generate & Edit Video Clips', desc: 'Cinematic video synthesis, motion brushes, camera controls', icon: Video, cat: 'video-animation' },
    { id: 'audio', title: 'Voice Cloning & Music Songs', desc: 'Realistic speech, songwriting, podcast editing, sound FX', icon: Music, cat: 'audio-voice' },
    { id: 'writing', title: 'Research & Content Strategy', desc: 'Cited search synthesis, spreadsheets, data science, SEO blogs', icon: FileText, cat: 'writing-marketing' },
  ];

  const budgets = [
    { id: 'free', title: '100% Free / Open Source', desc: 'Zero subscription fees, generous daily tiers, or local self-hosting' },
    { id: 'individual', title: 'Individual Pro ($10 - $20/mo)', desc: 'Best value pro subscriptions with high compute allowances' },
    { id: 'team', title: 'Team & Enterprise ($30+/mo)', desc: 'Team collaboration, unlimited API headroom, SOC2 privacy' }
  ];

  const skillLevels = [
    { id: 'beginner', title: 'Beginner / Zero-Code', desc: 'Simple chat interfaces and web apps that require no setup' },
    { id: 'developer', title: 'Developer / Technical', desc: 'Full IDEs, terminal CLI, API keys, and local GPU setups (ComfyUI/Ollama)' }
  ];

  const handleCalculateMatch = (goal: string, budget: string, skill: string) => {
    let filtered = [...TOOLS_DATA];

    if (goal === 'coding') {
      filtered = filtered.filter(t => t.category === 'coding-dev');
      if (budget === 'free') filtered = filtered.filter(t => t.pricingModel === 'Free' || t.pricingModel === 'Freemium' || t.pricingModel === 'Open Source');
    } else if (goal === 'reasoning') {
      filtered = filtered.filter(t => t.category === 'llm-chat');
      if (budget === 'free') filtered = filtered.filter(t => t.id === 'deepseek-r1' || t.id === 'gemini-2-flash');
    } else if (goal === 'image') {
      filtered = filtered.filter(t => t.category === 'image-design');
      if (budget === 'free') filtered = filtered.filter(t => t.id === 'flux-1-black-forest' || t.id === 'ideogram-2');
    } else if (goal === 'video') {
      filtered = filtered.filter(t => t.category === 'video-animation');
    } else if (goal === 'audio') {
      filtered = filtered.filter(t => t.category === 'audio-voice');
    } else {
      filtered = filtered.filter(t => t.category === 'writing-marketing' || t.category === 'productivity-workflow' || t.id === 'perplexity-ai');
    }

    filtered.sort((a, b) => b.rating - a.rating);
    setMatchedResults(filtered.slice(0, 3));
    setStep(4);
  };

  const handleReset = () => {
    setSelectedGoal('');
    setSelectedBudget('');
    setSelectedSkill('');
    setMatchedResults([]);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Recommendation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Smart AI Tool Matcher
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Answer 3 quick questions about your workflow to receive an unbiased, customized AI tech stack recommendation.
        </p>
      </div>

      {/* Wizard Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-4 border-b border-slate-100">
          <span>Step {step} of 4</span>
          <span>{step === 1 ? 'Select Primary Goal' : step === 2 ? 'Select Budget' : step === 3 ? 'Technical Level' : 'Your Custom Matches'}</span>
        </div>

        {/* STEP 1: GOAL */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              What is your primary use case?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((g) => {
                const Icon = g.icon;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGoal(g.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 hover:border-indigo-400 hover:bg-indigo-50/50 ${
                      selectedGoal === g.id ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-200'
                    }`}
                  >
                    <div className="p-2.5 bg-indigo-100/80 text-indigo-600 rounded-xl shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{g.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{g.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: BUDGET */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              What is your target budget per user?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {budgets.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBudget(b.id);
                    setStep(3);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 ${
                    selectedBudget === b.id ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-200'
                  }`}
                >
                  <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{b.desc}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer pt-2"
            >
              ← Back to Step 1
            </button>
          </div>
        )}

        {/* STEP 3: SKILL LEVEL */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              What is your team's technical comfort?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {skillLevels.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSkill(s.id);
                    handleCalculateMatch(selectedGoal, selectedBudget, s.id);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 ${
                    selectedSkill === s.id ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-200'
                  }`}
                >
                  <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer pt-2"
            >
              ← Back to Step 2
            </button>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Recommended AI Stack for You</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Selected from 38+ laboratory-tested tools based on your requirements.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Matcher</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {matchedResults.map((tool, idx) => (
                <div
                  key={tool.id}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-600 text-white">
                        Match #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {tool.pricingModel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl ${tool.logoBg} text-white font-black text-lg flex items-center justify-center`}>
                        {tool.logoLetter}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{tool.name}</h3>
                        <p className="text-[11px] text-slate-500">{tool.categoryName}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {tool.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/80">
                    <button
                      onClick={() => onSelectTool(tool)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Read Full Lab Review
                    </button>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Visit Tool</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
