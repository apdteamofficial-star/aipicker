import { useState } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  FileCode2, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Sparkles,
  Bot
} from 'lucide-react';

interface SeoIndexingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SeoIndexingModal({ isOpen, onClose }: SeoIndexingModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'sitemap' | 'robots' | 'schema' | 'gsc'>('overview');

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sitemapUrl = 'https://aipicker.in/sitemap.xml';
  const robotsTxtUrl = 'https://aipicker.in/robots.txt';

  const sampleSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Cursor',
    'operatingSystem': 'Windows, macOS, Linux',
    'applicationCategory': 'DeveloperApplication',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '428',
      'bestRating': '5'
    },
    'offers': {
      '@type': 'Offer',
      'price': '20.00',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">SEO & Google Indexing Center</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Index Ready
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Sitemaps, structured JSON-LD schemas, robots directives & Google Search Console verification.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'overview', label: 'Search Preview', icon: Search },
            { id: 'sitemap', label: 'Sitemap.xml', icon: FileCode2 },
            { id: 'robots', label: 'Robots.txt', icon: Bot },
            { id: 'schema', label: 'JSON-LD Schema', icon: Sparkles },
            { id: 'gsc', label: 'Google Search Console Guide', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Google SERP Rich Snippet Preview</h3>
                <p className="text-xs text-slate-500 mb-4">
                  This is how AIPicker appears on Google Search results with verified rich snippets and ratings.
                </p>

                {/* Google Snippet Card Mockup */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-1.5 font-sans">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] flex items-center justify-center font-bold">P</span>
                    <span className="font-medium text-slate-800">AIPicker</span>
                    <span className="text-slate-400">https://aipicker.in › tools › cursor-ai</span>
                  </div>
                  <h4 className="text-indigo-800 text-base font-medium hover:underline cursor-pointer">
                    Cursor Review, Pricing &amp; Benchmarks (2026) | AIPicker
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
                    <div className="flex items-center">★★★★★</div>
                    <span>Rating: 4.9 · 428 reviews · $20.00/mo · Freemium</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    Cursor is a bespoke AI code editor with Composer multi-file refactoring, whole-repo AST indexing, and Claude 3.7 integration. Read verified benchmark metrics...
                  </p>
                </div>
              </div>

              {/* Status checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {[
                  { title: 'Meta Title & Description', desc: 'Dynamically updated on every page and modal view', status: 'Active' },
                  { title: 'Canonical Link Tag', desc: 'Strict rel="canonical" tags prevent duplicate content', status: 'Active' },
                  { title: 'OpenGraph & Twitter Cards', desc: 'Rich preview cards formatted for LinkedIn, X & FB', status: 'Active' },
                  { title: 'Schema.org Structured Data', desc: 'SoftwareApplication, TechArticle, FAQ & Organization', status: 'Active' },
                  { title: 'XML Sitemap', desc: 'Clean sitemap.xml with 30+ deep URLs and priorities', status: 'Active' },
                  { title: 'Robots.txt Directives', desc: 'Allows Googlebot, Bingbot & Slurp indexing', status: 'Active' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800">{item.title}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Live XML Sitemap URL</h3>
                  <p className="text-xs text-slate-500">Submit this endpoint directly in Google Search Console.</p>
                </div>
                <button
                  onClick={() => handleCopy(sitemapUrl, 'sitemapUrl')}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSection === 'sitemapUrl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'sitemapUrl' ? 'Copied URL!' : 'Copy Sitemap URL'}
                </button>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 break-all select-all">
                {sitemapUrl}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700">Included XML Entities:</span>
                <ul className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <li>• <strong>Core Hubs:</strong> Home, Comparisons Matrix, Benchmarks Arena, Editorial Guides, Cost Calculator, Prompt Library, AI News</li>
                  <li>• <strong>Category Archives:</strong> LLMs, Code & Dev, Image Art, Video AI, Audio & Voice, Productivity, Marketing</li>
                  <li>• <strong>In-Depth Editorial Guides:</strong> Cursor vs Windsurf, Video AI Shootout, AI Search Engines 100-Query Test, Local LLM Masterclass, etc.</li>
                  <li>• <strong>Top Tool Reviews:</strong> Cursor, Windsurf, Perplexity, ChatGPT, Claude, Midjourney, Runway, ElevenLabs</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Robots.txt Directives</h3>
                  <p className="text-xs text-slate-500">Configured to invite Googlebot, Bingbot, and other major search indexers.</p>
                </div>
                <button
                  onClick={() => handleCopy(robotsTxtUrl, 'robotsUrl')}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSection === 'robotsUrl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'robotsUrl' ? 'Copied' : 'Copy Robots.txt URL'}
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed">
{`User-agent: *
Allow: /

# Specific Googlebot & Bingbot crawler permissions
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Host: https://aipicker.in
Sitemap: https://aipicker.in/sitemap.xml`}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900">Structured Data (JSON-LD) Generation</h3>
                <p className="text-xs text-slate-500">
                  Every tool, article, and category automatically generates Schema.org microdata for Google Rich Results.
                </p>
              </div>

              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed">
                {JSON.stringify(sampleSchema, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'gsc' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">How to Index in Google in 3 Easy Steps</h3>
              
              <div className="space-y-3">
                <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-indigo-950">Add Property in Google Search Console</h4>
                    <p className="text-xs text-indigo-900/80 leading-relaxed">
                      Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="underline font-semibold">Google Search Console</a> and add <code>https://aipicker.in</code> as a URL Prefix or Domain property.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-indigo-950">Submit the Sitemap URL</h4>
                    <p className="text-xs text-indigo-900/80 leading-relaxed">
                      Click <strong>Sitemaps</strong> in the left menu, enter <code>sitemap.xml</code>, and press <strong>Submit</strong>. Google will automatically crawl all articles and category pages.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-indigo-950">Request Instant URL Indexing</h4>
                    <p className="text-xs text-indigo-900/80 leading-relaxed">
                      Use the top <strong>URL Inspection</strong> search box in GSC for any new article URL (e.g. <code>https://aipicker.in/articles/cursor-vs-windsurf-vs-copilot-2026</code>) and click <strong>"Request Indexing"</strong> for priority crawl within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Meta tags, sitemap.xml &amp; robots.txt ready for Googlebot
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
