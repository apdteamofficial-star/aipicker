import React, { useState } from 'react';
import { HelpCircle, Code, Check } from 'lucide-react';

interface AdSlotProps {
  id?: string;
  type: 'leaderboard' | 'rectangle' | 'in-feed' | 'sidebar' | 'sticky-bottom';
  className?: string;
  slotId?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id = 'ad-slot',
  type,
  className = '',
  slotId = '1234567890'
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const adCodeSnippet = `<!-- Google AdSense - AIPicker.in [${type.toUpperCase()}] -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="${slotId}"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(adCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDimensions = () => {
    switch (type) {
      case 'leaderboard':
        return 'min-h-[90px] max-w-5xl mx-auto';
      case 'rectangle':
        return 'min-h-[250px] max-w-[336px] mx-auto';
      case 'sidebar':
        return 'min-h-[600px] w-full';
      case 'sticky-bottom':
        return 'min-h-[60px] w-full';
      case 'in-feed':
      default:
        return 'min-h-[140px] w-full';
    }
  };

  return (
    <div id={id} className={`my-6 transition-all ${className}`}>
      {/* Policy Compliant Ad Label */}
      <div className="flex items-center justify-between px-2 pb-1 text-[11px] font-medium tracking-wider text-slate-600 uppercase">
        <span className="flex items-center gap-1">
          <span>Advertisement</span>
          <span className="text-[10px] text-slate-600">• AIPicker.in AdSense Placement</span>
        </span>
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1 text-slate-700 hover:text-indigo-600 font-semibold cursor-pointer transition-colors"
          title="Click to view AdSense script tag for this slot"
        >
          <Code className="w-3 h-3" />
          <span>{showCode ? 'Hide Ad Code' : 'AdSense Tag'}</span>
        </button>
      </div>

      {showCode ? (
        <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono border border-slate-800 shadow-sm relative">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-emerald-400 font-semibold">2026 AdSense Unit: {type}</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-300" /> : null}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto text-[11px] text-slate-300 whitespace-pre-wrap">{adCodeSnippet}</pre>
          <p className="mt-2 text-[10px] text-slate-600">
            * Once your Google AdSense is approved on your domain, replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID.
          </p>
        </div>
      ) : (
        <div
          className={`border border-dashed border-slate-300 bg-slate-100/70 rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group ${getDimensions()}`}
        >
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
            <HelpCircle className="w-3 h-3 text-indigo-500" />
            <span>AdSense Ready 2026</span>
          </div>

          <div className="max-w-md space-y-1.5 z-10">
            <p className="text-xs font-bold text-slate-700 tracking-wide">
              Google AdSense High-CTR Responsive Slot ({type.toUpperCase()})
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Optimized for 100% viewability & compliance with Google Ad Placement policies.
            </p>
          </div>

          {/* Clean decorative subtle pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </div>
      )}
    </div>
  );
};
