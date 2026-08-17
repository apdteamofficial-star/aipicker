import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Share2, 
  Bookmark, 
  Code, 
  FileText, 
  Image, 
  Video, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Award, 
  Check,
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ToolItem, ActiveView } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

interface AiReadinessQuizProps {
  onSelectTool: (tool: ToolItem) => void;
  onNavigate: (view: ActiveView) => void;
  onBookmarkTool: (toolId: string) => void;
  bookmarkedIds: string[];
}

interface QuestionOption {
  id: string;
  label: string;
  desc: string;
  icon: any;
  points: number;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  options: QuestionOption[];
}

export function AiReadinessQuiz({
  onSelectTool,
  onNavigate,
  onBookmarkTool,
  bookmarkedIds
}: AiReadinessQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: intro, 1-5: questions, 6: calculating, 7: results
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [bookmarkedAll, setBookmarkedAll] = useState<boolean>(false);

  // Questions Database
  const questions: Question[] = [
    {
      id: 1,
      title: 'What is your primary professional role or daily focus?',
      subtitle: 'We personalize tool suggestions specifically for your day-to-day workflow.',
      category: 'Domain & Role',
      options: [
        {
          id: 'developer',
          label: 'Software Engineer / Developer',
          desc: 'Frontend, backend, mobile apps, code refactoring, scripts & CI/CD',
          icon: Code,
          points: 20
        },
        {
          id: 'writer',
          label: 'Content Writer / Marketer / SEO',
          desc: 'Long-form articles, copywriting, email newsletters & social media',
          icon: FileText,
          points: 15
        },
        {
          id: 'designer',
          label: 'Designer / Creative Artist',
          desc: 'UI/UX mockups, illustrations, concept art & graphic assets',
          icon: Image,
          points: 15
        },
        {
          id: 'founder',
          label: 'Product Manager / Founder / Executive',
          desc: 'PRDs, market research, strategy decks, financial summaries & team operations',
          icon: Briefcase,
          points: 18
        },
        {
          id: 'student',
          label: 'Student / Researcher / Academic',
          desc: 'Literature reviews, math reasoning, study notes & thesis assistance',
          icon: GraduationCap,
          points: 15
        },
        {
          id: 'video-audio',
          label: 'Video Creator / Audio / Podcaster',
          desc: 'Motion generation, B-roll, voice cloning, sound effects & video editing',
          icon: Video,
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: 'How frequently do you currently use AI in your daily workflow?',
      subtitle: 'This helps us match the right learning curve and tool sophistication.',
      category: 'Experience Level',
      options: [
        {
          id: 'beginner',
          label: 'Novice / Occasional User',
          desc: 'I occasionally ask ChatGPT basic questions or brainstorm ideas',
          icon: Sparkles,
          points: 10
        },
        {
          id: 'intermediate',
          label: 'Regular Practitioner',
          desc: 'I use AI tools multiple times a day for drafting, editing, and queries',
          icon: Zap,
          points: 18
        },
        {
          id: 'power-user',
          label: 'Advanced Power User',
          desc: 'I use multi-file IDEs, system prompts, custom instructions, and reasoning models',
          icon: TrendingUp,
          points: 24
        },
        {
          id: 'expert-dev',
          label: 'AI Native / Builder',
          desc: 'I build with APIs, local LLMs (Ollama), autonomous agents & vector search',
          icon: Cpu,
          points: 28
        }
      ]
    },
    {
      id: 3,
      title: 'What is your target monthly budget for AI software?',
      subtitle: 'We ensure our recommended tool stack fits within your exact financial comfort zone.',
      category: 'Budget & Pricing',
      options: [
        {
          id: 'free',
          label: '$0 / Month (100% Free & Open Source)',
          desc: 'I prefer generous free tiers, open-weights models, and free student allowances',
          icon: DollarSign,
          points: 12
        },
        {
          id: 'individual-pro',
          label: '$15 - $30 / Month (Single High-Impact Pro Tool)',
          desc: 'I am willing to pay for 1 essential daily driver (e.g. Cursor Pro or ChatGPT Plus)',
          icon: DollarSign,
          points: 18
        },
        {
          id: 'power-stack',
          label: '$40 - $80 / Month (Multi-Tool Pro Stack)',
          desc: 'I want top-of-the-line frontier models + dedicated code/design suites',
          icon: DollarSign,
          points: 22
        },
        {
          id: 'team-enterprise',
          label: '$100+ / Month (Team / Enterprise)',
          desc: 'Looking for collaborative team workspaces, high security & enterprise SLAs',
          icon: DollarSign,
          points: 25
        }
      ]
    },
    {
      id: 4,
      title: 'What is your absolute highest priority goal?',
      subtitle: 'Pick the outcome that will create the biggest breakthrough for your day.',
      category: 'Core Objective',
      options: [
        {
          id: 'speed',
          label: 'Maximum Speed & Routine Automation',
          desc: 'Eliminate repetitive typing, boilerplate, and tedious administrative work',
          icon: Zap,
          points: 18
        },
        {
          id: 'accuracy',
          label: 'Deep Reasoning & Zero-Hallucination Accuracy',
          desc: 'Flawless math, complex logic, in-depth architectural audits, and verified citations',
          icon: CheckCircle2,
          points: 20
        },
        {
          id: 'privacy',
          label: 'Data Privacy & Local Security (Zero Cloud Leaks)',
          desc: 'Keep all proprietary source code, NDA files, and client data strictly on-device',
          icon: ShieldCheck,
          points: 16
        },
        {
          id: 'creativity',
          label: 'High-End Creative & Multimedia Quality',
          desc: 'Stunning photorealistic imagery, cinematic 4K video, and hyper-realistic voices',
          icon: Image,
          points: 18
        }
      ]
    },
    {
      id: 5,
      title: 'What is your primary operating system / hardware setup?',
      subtitle: 'Crucial for recommending between local on-device models vs cloud-based tools.',
      category: 'Hardware & OS',
      options: [
        {
          id: 'mac',
          label: 'Apple Silicon Mac (M1 / M2 / M3 / M4)',
          desc: 'Unified memory architecture capable of running local 8B-32B LLMs with MLX',
          icon: Cpu,
          points: 20
        },
        {
          id: 'windows-gpu',
          label: 'Windows PC with NVIDIA RTX GPU',
          desc: 'CUDA acceleration ready for local Stable Diffusion, ComfyUI, and fast inference',
          icon: Cpu,
          points: 20
        },
        {
          id: 'browser-cloud',
          label: 'Standard Laptop / Chromebook (Cloud First)',
          desc: 'I prefer web-based tools that do not require heavy local CPU/GPU hardware',
          icon: Layers,
          points: 15
        },
        {
          id: 'linux',
          label: 'Linux Workstation / Terminal First',
          desc: 'Command-line power user, Docker, Python environments & self-hosting',
          icon: Code,
          points: 20
        }
      ]
    }
  ];

  // Handle Option Selection
  const handleSelectOption = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (questionId < questions.length) {
      setCurrentStep(questionId + 1);
    } else {
      // Move to calculating animation
      setCurrentStep(6);
    }
  };

  // Simulating the calculating stage
  useEffect(() => {
    if (currentStep === 6) {
      const timer = setTimeout(() => {
        setCurrentStep(7);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Calculate Quiz Score & Custom Stack
  const calculateResults = () => {
    let totalScore = 0;
    questions.forEach((q) => {
      const selectedId = answers[q.id];
      const opt = q.options.find((o) => o.id === selectedId);
      if (opt) totalScore += opt.points;
    });

    // Normalize score to 0-100
    const normalizedScore = Math.min(Math.max(Math.round((totalScore / 115) * 100), 45), 98);

    const role = answers[1] || 'developer';
    const exp = answers[2] || 'intermediate';
    const budget = answers[3] || 'individual-pro';
    const goal = answers[4] || 'speed';
    const hardware = answers[5] || 'mac';

    // Persona Archetype
    let archetype = 'Productivity Accelerator';
    let archetypeDesc = 'You utilize AI effectively to compress routine workloads and focus on high-leverage creative output.';
    let hoursSaved = '8.5 - 11.0 hrs / week';

    if (normalizedScore >= 80) {
      archetype = 'AI Native Pioneer';
      archetypeDesc = 'You operate at the frontier of AI adoption, chaining multiple specialized models to achieve 5x output velocity.';
      hoursSaved = '14.0 - 18.5 hrs / week';
    } else if (normalizedScore < 65) {
      archetype = 'Emerging AI Explorer';
      archetypeDesc = 'You have strong fundamentals with immense unlocked potential by adopting multi-file coding and reasoning tools.';
      hoursSaved = '5.0 - 7.5 hrs / week';
    }

    // Recommendation Engine matching actual TOOLS_DATA
    let primaryToolId = 'cursor-ai';
    let secondaryToolId = 'claude-ai';
    let freeCompanionId = 'deepseek-r1';

    if (role === 'developer') {
      if (budget === 'free') {
        primaryToolId = 'windsurf-codeium';
        secondaryToolId = 'deepseek-r1';
        freeCompanionId = 'ollama';
      } else {
        primaryToolId = 'cursor-ai';
        secondaryToolId = 'claude-ai';
        freeCompanionId = goal === 'privacy' ? 'ollama' : 'deepseek-r1';
      }
    } else if (role === 'writer' || role === 'founder') {
      primaryToolId = 'claude-ai';
      secondaryToolId = 'perplexity-ai';
      freeCompanionId = 'gemini-20-flash';
    } else if (role === 'designer') {
      primaryToolId = 'midjourney';
      secondaryToolId = 'magnific-ai';
      freeCompanionId = 'flux-1-schnell';
    } else if (role === 'video-audio') {
      primaryToolId = 'runway-gen3';
      secondaryToolId = 'elevenlabs';
      freeCompanionId = 'suno-ai';
    } else if (role === 'student') {
      primaryToolId = 'perplexity-ai';
      secondaryToolId = 'deepseek-r1';
      freeCompanionId = 'gemini-20-flash';
    }

    const primaryTool = TOOLS_DATA.find((t) => t.id === primaryToolId) || TOOLS_DATA[0];
    const secondaryTool = TOOLS_DATA.find((t) => t.id === secondaryToolId) || TOOLS_DATA[1];
    const freeCompanion = TOOLS_DATA.find((t) => t.id === freeCompanionId) || TOOLS_DATA[2];

    return {
      score: normalizedScore,
      archetype,
      archetypeDesc,
      hoursSaved,
      tools: {
        primary: primaryTool,
        secondary: secondaryTool,
        companion: freeCompanion
      },
      actionSteps: [
        `Integrate ${primaryTool.name} as your default workspace tool for high-velocity daily tasks.`,
        `Use ${secondaryTool.name} whenever you need deep research verification or multi-modal generation.`,
        `Keep ${freeCompanion.name} bookmarked as your zero-cost fallback to preserve monthly API budgets.`
      ]
    };
  };

  const results = currentStep === 7 ? calculateResults() : null;

  const handleShare = () => {
    if (!results) return;
    const shareText = `🚀 My 2026 AI Readiness Score is ${results.score}% (${results.archetype})!\n\nMy Recommended 2026 AI Stack:\n• Primary Driver: ${results.tools.primary.name}\n• Secret Weapon: ${results.tools.secondary.name}\n• Free Companion: ${results.tools.companion.name}\n\nTake the free 60-second quiz at https://aipicker.in`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleBookmarkStack = () => {
    if (!results) return;
    onBookmarkTool(results.tools.primary.id);
    onBookmarkTool(results.tools.secondary.id);
    onBookmarkTool(results.tools.companion.id);
    setBookmarkedAll(true);
    setTimeout(() => setBookmarkedAll(false), 3000);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(1);
    setBookmarkedAll(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* STAGE 0: INTRO SCREEN */}
      {currentStep === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center p-8 sm:p-12 space-y-8 animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Interactive 2026 Assessment • 60 Seconds</span>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover Your AI Readiness Score &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Perfect Tool Stack</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Cut through marketing hype. Answer 5 quick questions about your daily workflow, hardware, and budget to receive an instant personalized AI maturity score and tailored software roadmap.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <span className="text-xl font-extrabold text-slate-900">100% Free</span>
              <span className="text-xs text-slate-500 mt-0.5">Zero bias or affiliate locking</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <span className="text-xl font-extrabold text-indigo-600">~12 hrs/wk</span>
              <span className="text-xs text-slate-500 mt-0.5">Average time saved by matched stack</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
              <span className="text-xl font-extrabold text-emerald-600">40+ Tools</span>
              <span className="text-xs text-slate-500 mt-0.5">Evaluated in real laboratory tests</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>Start Free Assessment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 1 - 5: QUESTIONS SCREEN */}
      {currentStep >= 1 && currentStep <= 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-indigo-600 uppercase tracking-wider">
                Question {currentStep} of {questions.length} • {questions[currentStep - 1].category}
              </span>
              <span>{Math.round((currentStep / questions.length) * 100)}% Completed</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {questions[currentStep - 1].title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {questions[currentStep - 1].subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {questions[currentStep - 1].options.map((option) => {
              const Icon = option.icon;
              const isSelected = answers[currentStep] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentStep, option.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/80 shadow-2xs'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-950 flex items-center justify-between">
                      <span>{option.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-1" />}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {option.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Back & Skip Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>
            ) : (
              <div />
            )}

            <span className="text-[11px] text-slate-400">
              Select an option above to proceed automatically
            </span>
          </div>
        </div>
      )}

      {/* STAGE 6: CALCULATING SCREEN */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-12 text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Synthesizing Your AI Maturity Blueprint...</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Analyzing workflow bottlenecks, matching token pricing models, and selecting the highest-performing models for your hardware.
            </p>
          </div>
          <div className="w-48 bg-slate-100 h-2 rounded-full mx-auto overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {/* STAGE 7: RESULTS DASHBOARD */}
      {currentStep === 7 && results && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Main Score Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-indigo-900/50 space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-indigo-800/40">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Assessment Complete</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {results.archetype}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                  {results.archetypeDesc}
                </p>
              </div>

              {/* Big Score Ring */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-xs border border-white/15 px-6 py-4 rounded-3xl shrink-0">
                <div className="text-4xl sm:text-5xl font-black text-indigo-300 tracking-tight">
                  {results.score}%
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">
                  AI Readiness Score
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Estimated Time Saved</span>
                </div>
                <div className="text-lg font-bold text-white">{results.hoursSaved}</div>
                <div className="text-[10px] text-slate-400">By automating routine tasks</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>Velocity Multiplier</span>
                </div>
                <div className="text-lg font-bold text-white">3.8x - 4.5x Output</div>
                <div className="text-[10px] text-slate-400">With multi-file IDEs &amp; reasoning</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                  <DollarSign className="w-4 h-4" />
                  <span>Cost Efficiency</span>
                </div>
                <div className="text-lg font-bold text-white">High ROI (&gt;800%)</div>
                <div className="text-[10px] text-slate-400">Optimal mix of Pro &amp; free models</div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmarkStack}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    bookmarkedAll
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {bookmarkedAll ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{bookmarkedAll ? 'Stack Saved to Bookmarks!' : 'Bookmark My 3-Tool Stack'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedShare ? 'Copied to Clipboard!' : 'Share Score'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recommended AI Stack Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Your Recommended 2026 AI Dream Stack</h3>
                <p className="text-xs text-slate-500">
                  Carefully synthesized for your role, hardware, and budget requirements.
                </p>
              </div>
              <button
                onClick={() => onNavigate('compare')}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Compare Side-by-Side</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stack Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Primary Daily Driver */}
              <div className="bg-white rounded-3xl border-2 border-indigo-600 p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Primary Daily Driver
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${results.tools.primary.logoBg} text-white font-bold text-lg flex items-center justify-center shadow-xs`}>
                      {results.tools.primary.logoLetter}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{results.tools.primary.name}</h4>
                      <span className="text-xs text-indigo-600 font-semibold">{results.tools.primary.categoryName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {results.tools.primary.tagline}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Editor Rating:</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        ★ {results.tools.primary.rating} / 5.0
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Pricing:</span>
                      <span className="font-bold text-slate-900">{results.tools.primary.startingPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    onClick={() => onSelectTool(results.tools.primary)}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Read Full Lab Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={results.tools.primary.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 block"
                  >
                    Visit Official Site ↗
                  </a>
                </div>
              </div>

              {/* Card 2: Secret Weapon / Intelligence Multiplier */}
              <div className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all">
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Intelligence Multiplier
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${results.tools.secondary.logoBg} text-white font-bold text-lg flex items-center justify-center shadow-xs`}>
                      {results.tools.secondary.logoLetter}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{results.tools.secondary.name}</h4>
                      <span className="text-xs text-violet-600 font-semibold">{results.tools.secondary.categoryName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {results.tools.secondary.tagline}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Editor Rating:</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        ★ {results.tools.secondary.rating} / 5.0
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Pricing:</span>
                      <span className="font-bold text-slate-900">{results.tools.secondary.startingPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    onClick={() => onSelectTool(results.tools.secondary)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Read Full Lab Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={results.tools.secondary.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 block"
                  >
                    Visit Official Site ↗
                  </a>
                </div>
              </div>

              {/* Card 3: Free Companion */}
              <div className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  100% Free Companion
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${results.tools.companion.logoBg} text-white font-bold text-lg flex items-center justify-center shadow-xs`}>
                      {results.tools.companion.logoLetter}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{results.tools.companion.name}</h4>
                      <span className="text-xs text-emerald-600 font-semibold">{results.tools.companion.categoryName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {results.tools.companion.tagline}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Editor Rating:</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        ★ {results.tools.companion.rating} / 5.0
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Pricing:</span>
                      <span className="font-bold text-emerald-600">{results.tools.companion.startingPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    onClick={() => onSelectTool(results.tools.companion)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Read Full Lab Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={results.tools.companion.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 block"
                  >
                    Visit Official Site ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Recommended Next Steps to Maximize Velocity</span>
            </h3>
            <div className="space-y-2.5">
              {results.actionSteps.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
