import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Award, 
  FileText, 
  Lock, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ContactMessage } from '../types';

interface LegalPagesProps {
  pageType: 'about' | 'contact' | 'privacy-policy' | 'terms' | 'affiliate-disclosure' | 'editorial-policy';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType }) => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. ABOUT US */}
      {pageType === 'about' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Award className="w-3.5 h-3.5" />
              <span>Independent Technology Publication</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              About AIPicker.in
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Empowering developers, creators, researchers, and enterprises to navigate the artificial intelligence revolution through rigorous, independent human testing.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base space-y-4">
            <h2>Our Mission</h2>
            <p>
              Founded in 2026, <strong>AIPicker.in</strong> was established in response to the overwhelming explosion of synthetic tools and AI wrappers. With hundreds of software products launching every week, discerning genuine architectural breakthroughs from shallow marketing wrappers has become increasingly difficult.
            </p>
            <p>
              Our mission is simple: <strong>provide 100% human-verified, objective benchmarks, honest trade-off analysis, and interactive matching tools</strong> so you never waste money or time on the wrong software.
            </p>

            <h2>Editorial Independence & Integrity</h2>
            <p>
              At AIPicker.in, we uphold the strictest journalistic and research ethics:
            </p>
            <ul>
              <li><strong>Zero Paid Rankings:</strong> No company or AI founder can pay to artificially inflate a tool’s score, benchmark, or placement in our directory.</li>
              <li><strong>14-Day Minimum Testing:</strong> Every software tool listed on AIPicker.in undergoes a minimum of 14 continuous days of real-world production testing by our staff.</li>
              <li><strong>Reproducible Benchmarks:</strong> All token-per-second latency measurements, coding pass rates (SWE-bench), and context-recall tests are documented with standardized hardware matrices.</li>
            </ul>

            <h2>The AIPicker Editorial Board</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Aarav Mehta"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Aarav Mehta</h4>
                  <p className="text-xs text-indigo-600 font-semibold">Founder & Systems Lead</p>
                  <p className="text-xs text-slate-500 mt-1">12+ years in full-stack architecture, distributed LLM orchestration, and developer tooling.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Dr. Priya Sharma"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Dr. Priya Sharma</h4>
                  <p className="text-xs text-indigo-600 font-semibold">Head of Research & NLP</p>
                  <p className="text-xs text-slate-500 mt-1">Specializing in reasoning model distillation, chain-of-thought verification, and hallucination reduction.</p>
                </div>
              </div>
            </div>

            <h2>Editorial Headquarters & Contact</h2>
            <p>
              AIPicker operates as a registered technology portal. For press kits, correction requests, or editorial inquiries, contact us directly at <a href="mailto:contact@aipicker.in">contact@aipicker.in</a>.
            </p>
          </div>
        </div>
      )}

      {/* 2. CONTACT US */}
      {pageType === 'contact' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Editorial Support</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Contact Us
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Have a question about an AI tool review, spotted an error in our benchmarks, or want to suggest a new tool? Our editorial team replies within 24-48 business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Details Column */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <Mail className="w-4 h-4" />
                  <span>Email Inquiries</span>
                </div>
                <p className="text-sm font-bold text-slate-900">contact@aipicker.in</p>
                <p className="text-xs text-slate-500">General editorial & reader support</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <Clock className="w-4 h-4" />
                  <span>Response SLA</span>
                </div>
                <p className="text-sm font-bold text-slate-900">24 – 48 Hours</p>
                <p className="text-xs text-slate-500">Monday through Friday (IST / UTC)</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Publisher Transparency</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  AIPicker.in complies with all Google Search Essentials & AdSense Webmaster Quality policies.
                </p>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              {isSubmitted ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Delivered Successfully</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out to AIPicker.in. Our editorial desk has logged your inquiry and will follow up at <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
                    }}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Send an Editorial Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                    >
                      <option value="general">General Feedback / Reader Inquiry</option>
                      <option value="editorial-correction">Editorial Correction / Benchmark Update</option>
                      <option value="tool-review">Submit AI Tool for Review</option>
                      <option value="advertising">Advertising & Google AdSense Questions</option>
                      <option value="privacy">Privacy & GDPR Rights Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief summary of your inquiry"
                      className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Provide all context, links, or questions here..."
                      className="w-full p-3 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry to AIPicker.in Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. PRIVACY POLICY (Mandatory for Google AdSense & GDPR) */}
      {pageType === 'privacy-policy' && (
        <div className="space-y-6 animate-in fade-in prose prose-slate max-w-none text-sm sm:text-base">
          <div className="not-prose space-y-2 mb-6">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Legal Compliance</span>
            <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Effective Date: August 15, 2026 | Last Updated: August 2026</p>
          </div>

          <p>
            At <strong>AIPicker</strong> (accessible from https://aipicker.in), the privacy of our visitors is one of our primary priorities. This Privacy Policy document outlines the types of information collected and recorded by AIPicker and how we utilize it in full compliance with the <strong>General Data Protection Regulation (GDPR)</strong>, <strong>California Consumer Privacy Act (CCPA/CPRA)</strong>, and <strong>Google AdSense Publisher Policies</strong>.
          </p>

          <h2>1. Log Files & Server Diagnostics</h2>
          <p>
            AIPicker follows a standard procedure of utilizing log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>

          <h2>2. Cookies and Web Beacons</h2>
          <p>
            Like any other website, AIPicker uses "cookies". These cookies are used to store information including visitors' preferences, bookmarks, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2>3. Google DoubleClick DART Cookie & AdSense Policies</h2>
          <p>
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
          </p>
          <p>
            Our advertising partners, including Google AdSense, may use cookies and web beacons on our site. Each of our advertising partners has their own Privacy Policy for their policies on user data.
          </p>

          <h2>4. Third-Party Privacy Policies</h2>
          <p>
            AIPicker's Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>

          <h2>5. GDPR Data Protection Rights (EU Users)</h2>
          <p>We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul>
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
          </ul>

          <h2>6. Contact Our Data Protection Officer</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>privacy@aipicker.in</strong> or <strong>contact@aipicker.in</strong>.
          </p>
        </div>
      )}

      {/* 4. TERMS OF SERVICE */}
      {pageType === 'terms' && (
        <div className="space-y-6 animate-in fade-in prose prose-slate max-w-none text-sm sm:text-base">
          <div className="not-prose space-y-2 mb-6">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Legal Governance</span>
            <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
            <p className="text-xs text-slate-500">Last Revised: August 2026</p>
          </div>

          <p>
            Welcome to <strong>AIPicker</strong>. By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2>1. Use License & Intellectual Property</h2>
          <p>
            The materials contained in this website (including benchmark datasets, original editorial articles, UI components, and software comparison tables) are protected by applicable copyright and trademark law. Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.
          </p>

          <h2>2. Disclaimer & No Warranties</h2>
          <p>
            The materials on AIPicker are provided on an 'as is' basis. AIPicker makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h2>3. Limitations of Liability</h2>
          <p>
            In no event shall AIPicker or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the software tools evaluated on this site.
          </p>

          <h2>4. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with international digital publication standards and the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      )}

      {/* 5. AFFILIATE & AD DISCLOSURE */}
      {pageType === 'affiliate-disclosure' && (
        <div className="space-y-6 animate-in fade-in prose prose-slate max-w-none text-sm sm:text-base">
          <div className="not-prose space-y-2 mb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">FTC & Google Compliance</span>
            <h1 className="text-3xl font-black text-slate-900">Affiliate & Advertising Disclosure</h1>
            <p className="text-xs text-slate-500">Updated: August 2026</p>
          </div>

          <p>
            In compliance with the <strong>Federal Trade Commission (FTC) guidelines</strong> and <strong>Google AdSense Quality Guidelines</strong>, AIPicker maintains 100% transparency regarding our monetization and review practices.
          </p>

          <h2>How AIPicker Earns Revenue</h2>
          <p>
            Running a high-performance benchmarking laboratory, hosting extensive benchmark matrices, and maintaining full-time testing staff requires computational resources. AIPicker sustains its free, open-access directory through two transparent avenues:
          </p>
          <ol>
            <li><strong>Display Advertising (Google AdSense):</strong> We display clearly labeled contextual advertisements served by Google AdSense. All ads are marked with the "Advertisement" or "Sponsored" tag.</li>
            <li><strong>Affiliate Referral Links:</strong> When you click on certain outbound links to software tools and subsequently purchase a subscription, AIPicker may earn a small referral commission at <em>zero additional cost to you</em>.</li>
          </ol>

          <h2>Our Editorial Firewall Promise</h2>
          <p>
            We strictly enforce an uncompromising firewall between our editorial research and commercial partnerships:
          </p>
          <ul>
            <li>We <strong>never</strong> give positive reviews or higher benchmark scores to a tool simply because it offers an affiliate commission.</li>
            <li>If a paid tool is subpar, buggy, or delivers poor value, we explicitly document its flaws regardless of financial incentives.</li>
            <li>Many of our #1 recommended tools (e.g. DeepSeek R1, FLUX.1) are open-source with zero affiliate program whatsoever.</li>
          </ul>
        </div>
      )}

      {/* 6. EDITORIAL & REVIEW POLICY */}
      {pageType === 'editorial-policy' && (
        <div className="space-y-6 animate-in fade-in prose prose-slate max-w-none text-sm sm:text-base">
          <div className="not-prose space-y-2 mb-6">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Testing Methodology</span>
            <h1 className="text-3xl font-black text-slate-900">Editorial & Fact-Checking Policy</h1>
            <p className="text-xs text-slate-500">Updated: August 2026</p>
          </div>

          <p>
            At <strong>AIPicker</strong>, accuracy and reproducible empirical testing are the foundation of our trust. Here is the step-by-step methodology our staff follows before any AI tool review is published.
          </p>

          <h2>1. Multi-Stage Testing Protocol</h2>
          <p>Every software submission undergoes a 3-stage validation cycle:</p>
          <ul>
            <li><strong>Stage 1 (Feature Verification):</strong> Testing every claimed feature (e.g. multi-file editing, voice cloning, in-image typography) against real-world test assets.</li>
            <li><strong>Stage 2 (Benchmark Stress-Testing):</strong> Measuring inference speed (tokens/sec), generation latency, memory consumption, and context window recall.</li>
            <li><strong>Stage 3 (Pricing & Privacy Audit):</strong> Checking data retention policies (ZDR), SOC2 compliance, and verifying if free tiers have hidden paywalls.</li>
          </ul>

          <h2>2. Corrections & Updates</h2>
          <p>
            The artificial intelligence landscape moves at lightning speed. If an AI tool updates its pricing, releases a new model version (e.g. v6.0 to v6.1), or fixes documented bugs, we update our reviews within 7 days. Readers can flag outdated data at <strong>contact@aipicker.in</strong>.
          </p>
        </div>
      )}

    </div>
  );
};
