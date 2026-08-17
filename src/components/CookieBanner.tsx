import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [adConsent, setAdConsent] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('aipicker_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('aipicker_cookie_consent', JSON.stringify({ necessary: true, analytics: true, ads: true }));
    setVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('aipicker_cookie_consent', JSON.stringify({ necessary: true, analytics: analyticsConsent, ads: adConsent }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-2xl border border-slate-800 space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600/30 text-indigo-400 rounded-xl flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-100">Cookie & Privacy Notice (AIPicker)</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We use cookies to enhance your browsing experience, measure site traffic, and support independent AI reviews via personalized Google AdSense ads.
            </p>
          </div>
        </div>

        {showSettings && (
          <div className="p-3 bg-slate-800/80 rounded-xl space-y-2 text-xs border border-slate-700">
            <div className="flex items-center justify-between text-slate-300">
              <span>Essential System Cookies</span>
              <span className="text-[10px] font-bold text-emerald-400">Required</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span>Analytical & Performance</span>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span>Google AdSense Personalization</span>
              <input
                type="checkbox"
                checked={adConsent}
                onChange={(e) => setAdConsent(e.target.checked)}
                className="accent-indigo-600"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <Settings className="w-3 h-3" />
            <span>{showSettings ? 'Hide Details' : 'Preferences'}</span>
          </button>

          <div className="flex items-center gap-2">
            {showSettings ? (
              <button
                onClick={handleSaveCustom}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            ) : null}

            <button
              onClick={handleAcceptAll}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
