import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Mail, 
  Layers
} from 'lucide-react';
import { ToolSubmission } from '../types';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ToolSubmission>({
    toolName: '',
    websiteUrl: '',
    category: 'coding-dev',
    pricingModel: 'Freemium',
    contactEmail: '',
    shortDescription: '',
    keyDifferentiator: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.toolName || !formData.websiteUrl || !formData.contactEmail) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      toolName: '',
      websiteUrl: '',
      category: 'coding-dev',
      pricingModel: 'Freemium',
      contactEmail: '',
      shortDescription: '',
      keyDifferentiator: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="submit-tool-modal"
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Submission Received!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for submitting <strong>{formData.toolName}</strong>. Our editorial team will test your software for 14 days following our standard benchmark guidelines. We will email <strong>{formData.contactEmail}</strong> once published on AIPicker.in.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Founder & Creator Portal</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Submit an AI Tool to AIPicker.in
              </h2>
              <p className="text-xs text-slate-500">
                Join over 30+ verified AI software tools reviewed by our engineering and research team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tool Name *</label>
                <input
                  type="text"
                  required
                  value={formData.toolName}
                  onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                  placeholder="e.g. NextCode AI"
                  className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Website URL *</label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                >
                  <option value="coding-dev">Code & Dev Agents</option>
                  <option value="llm-chat">LLMs & AI Assistants</option>
                  <option value="image-design">Image & Creative Art</option>
                  <option value="video-animation">Video & Motion AI</option>
                  <option value="audio-voice">Audio, Music & Voice</option>
                  <option value="productivity-workflow">Productivity & Workflow</option>
                  <option value="writing-marketing">Copy & Content AI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pricing Model</label>
                <select
                  value={formData.pricingModel}
                  onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                >
                  <option value="Freemium">Freemium (Free tier available)</option>
                  <option value="Free">100% Free Forever</option>
                  <option value="Open Source">Open Source / Self-Hosted</option>
                  <option value="Paid">Paid Only (Commercial)</option>
                  <option value="Free Trial">Free Trial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Founder / Contact Email *</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="founder@yourtool.com"
                  className="w-full pl-8 pr-3 py-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Short Elevator Pitch (1-2 sentences) *</label>
              <textarea
                required
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="What does your tool do and who is it built for?"
                className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Key Differentiator vs Competitors</label>
              <input
                type="text"
                value={formData.keyDifferentiator}
                onChange={(e) => setFormData({ ...formData, keyDifferentiator: e.target.value })}
                placeholder="e.g. 5x faster generation, local privacy, zero API markup"
                className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-[11px] text-indigo-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>AIPicker.in review policy: Submissions are tested strictly on objective merits without sponsored payment.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Editorial Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
