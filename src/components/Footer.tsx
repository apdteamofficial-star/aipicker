import React from 'react';
import { AIPickerLogo } from './AIPickerLogo';
import { 
  Sparkles, 
  Mail, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { ActiveView, ToolCategory } from '../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  setSelectedCategory: (cat: ToolCategory) => void;
  onOpenAdSenseGuide?: () => void;
  onOpenSeoModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveView,
  setSelectedCategory,
  onOpenSeoModal
}) => {
  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: ToolCategory) => {
    setSelectedCategory(cat);
    setActiveView('home');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <AIPickerLogo iconSize={36} variant="dark" />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AIPicker is an independent, human-curated directory and benchmark laboratory evaluating artificial intelligence software, reasoning models, coding IDEs, and generative design tools.
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Unbiased Benchmarks</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Editorial Integrity Standards</span>
              </span>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Editorial Inquiries:</span>
              <a href="mailto:contact@aipicker.in" className="text-indigo-400 hover:underline">
                contact@aipicker.in
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              AI Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('coding-dev')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Code & Dev Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('llm-chat')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  LLMs & Chatbots
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('image-design')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Image & Design AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('video-animation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Video & Motion AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('audio-voice')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Audio & Voice AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('productivity-workflow')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Productivity & Workflows
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Utilities & Guides */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Tools & Hubs
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('benchmarks')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Model Leaderboard</span>
                  <span className="text-[9px] bg-indigo-500/30 text-indigo-300 font-bold px-1.5 py-0.2 rounded">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('prompts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Prompt Hub & Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('news')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>AI Radar & News</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quiz')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-violet-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>AI Readiness Quiz</span>
                  <span className="text-[9px] bg-violet-500/30 text-violet-300 font-bold px-1.5 py-0.2 rounded">60s</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('matcher')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Smart AI Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('compare')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Cost & ROI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guides')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Benchmark Research Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (Mandatory for AdSense) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Trust & Governance
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  id="footer-about-link"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-slate-300"
                >
                  About AIPicker
                </button>
              </li>
              <li>
                <button
                  id="footer-contact-link"
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-slate-300"
                >
                  Contact Us & Support
                </button>
              </li>
              <li>
                <button
                  id="footer-privacy-link"
                  onClick={() => handleNav('privacy-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-slate-300"
                >
                  Privacy Policy (GDPR/CCPA)
                </button>
              </li>
              <li>
                <button
                  id="footer-terms-link"
                  onClick={() => handleNav('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-slate-300"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  id="footer-disclosure-link"
                  onClick={() => handleNav('affiliate-disclosure')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Affiliate & Ad Disclosure
                </button>
              </li>
              <li>
                <button
                  id="footer-editorial-link"
                  onClick={() => handleNav('editorial-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Editorial & Review Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-seo-indexing-link"
                  onClick={onOpenSeoModal}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SEO &amp; Indexing Center</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-4 text-xs text-slate-500">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> AIPicker is an independent technology publication. All company and product names, logos, and brands mentioned are trademarks™ or registered® trademarks of their respective owners. Their mention does not imply endorsement. We test all software independently according to our documented testing guidelines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <p className="text-slate-400">
              © 2026 <strong className="text-slate-200">AIPicker</strong>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1">
                <span>Curated with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>for the global AI community</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
