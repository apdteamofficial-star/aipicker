import React, { useEffect } from 'react';
import { ToolItem, ArticleItem, ActiveView, ToolCategory } from '../types';

interface SeoManagerProps {
  activeView: ActiveView | string;
  selectedTool: ToolItem | null;
  selectedArticle: ArticleItem | null;
  selectedCategory: ToolCategory | string;
  categoryName?: string;
  searchQuery?: string;
}

export const SeoManager: React.FC<SeoManagerProps> = ({
  activeView,
  selectedTool,
  selectedArticle,
  selectedCategory,
  categoryName,
  searchQuery,
}) => {
  useEffect(() => {
    let title = 'AIPicker | Discover, Compare & Choose the Best AI Tools (2026)';
    let description =
      'AIPicker is an independent, human-curated directory and review platform for AI software, models, and developer tools. Compare features, pricing, benchmarks, and honest reviews.';
    let canonicalUrl = 'https://aipicker.in';
    let ogType = 'website';
    let ogImage = 'https://aipicker.in/src/assets/images/aipicker_premium_logo_1786786506806.jpg';

    let structuredData: Record<string, unknown> | null = null;

    if (selectedArticle) {
      // 1. In-Depth Editorial Article SEO
      title = `${selectedArticle.title} | AIPicker Research (2026)`;
      description = selectedArticle.excerpt;
      canonicalUrl = `https://aipicker.in/articles/${selectedArticle.slug}`;
      ogType = 'article';
      if (typeof selectedArticle.featuredImage === 'string' && selectedArticle.featuredImage.startsWith('http')) {
        ogImage = selectedArticle.featuredImage;
      }

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: selectedArticle.title,
        description: selectedArticle.excerpt,
        image: ogImage,
        datePublished: selectedArticle.publishDate,
        dateModified: selectedArticle.updatedDate || selectedArticle.publishDate,
        author: {
          '@type': 'Person',
          name: selectedArticle.author.name,
          jobTitle: selectedArticle.author.role,
          description: selectedArticle.author.bio,
        },
        publisher: {
          '@type': 'Organization',
          name: 'AIPicker',
          url: 'https://aipicker.in',
          logo: {
            '@type': 'ImageObject',
            url: 'https://aipicker.in/src/assets/images/aipicker_premium_logo_1786786506806.jpg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        keywords: selectedArticle.tags.join(', '),
      };
    } else if (selectedTool) {
      // 2. Individual Software Tool Review SEO
      title = `${selectedTool.name} Review, Pricing & Benchmarks (2026) | AIPicker`;
      description = `${selectedTool.name}: ${selectedTool.tagline}. Verified editor rating ${selectedTool.rating}/5. Read pros, cons, pricing model (${selectedTool.pricingModel}), and benchmark breakdown.`;
      canonicalUrl = `https://aipicker.in/tools/${selectedTool.slug}`;
      ogType = 'product';

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: selectedTool.name,
        operatingSystem: 'Web, Windows, macOS, Linux',
        applicationCategory: selectedTool.categoryName,
        description: selectedTool.overview,
        offers: {
          '@type': 'Offer',
          price: selectedTool.pricingModel === 'Free' ? '0' : selectedTool.startingPrice.replace(/[^0-9.]/g, '') || '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: selectedTool.rating,
          reviewCount: selectedTool.reviewCount,
          bestRating: '5',
          worstRating: '1',
        },
        review: {
          '@type': 'Review',
          author: {
            '@type': 'Organization',
            name: 'AIPicker Testing Lab',
          },
          reviewBody: selectedTool.editorVerdict,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: selectedTool.rating,
            bestRating: '5',
          },
        },
      };
    } else {
      // 3. View-Level & Category-Level Dynamic SEO
      switch (activeView) {
        case 'quiz':
          title = 'AI Readiness & Custom Stack Quiz (2026) | AIPicker';
          description = 'Take our 60-second interactive AI readiness assessment to discover your AI maturity score and get a customized 3-tool software stack matching your role and hardware.';
          canonicalUrl = 'https://aipicker.in/quiz';
          break;
        case 'compare':
          title = 'Side-by-Side AI Tool Comparison Matrix | AIPicker';
          description = 'Compare top AI coding editors, LLM models, and video generators side by side with real performance benchmarks, pricing, and feature matrices.';
          canonicalUrl = 'https://aipicker.in/compare';
          break;
        case 'matcher':
          title = 'AI Matcher Wizard: Find Your Perfect AI Tool | AIPicker';
          description = 'Answer 3 quick questions and get instant, benchmarked AI software recommendations tailored to your exact workflow.';
          canonicalUrl = 'https://aipicker.in/#matcher';
          break;
        case 'benchmarks':
          title = 'AI Benchmark Arena: Coding, Speed & Latency Tests (2026) | AIPicker';
          description = 'Laboratory test results comparing real-world LLM latency, reasoning token cost, whole-repo refactor pass rates, and video rendering efficiency.';
          canonicalUrl = 'https://aipicker.in/benchmarks';
          break;
        case 'guides':
        case 'articles':
          title = 'AI Research Guides, Editorial Shootouts & Teardowns | AIPicker';
          description = 'Deep-dive engineering evaluations, hardware guides, and autonomous agent post-mortems authored by verified industry leads.';
          canonicalUrl = 'https://aipicker.in/articles';
          break;
        case 'calculator':
          title = 'AI Token & API Cost Calculator (2026) | AIPicker';
          description = 'Calculate and project your monthly API expenditure across Claude 3.7 Sonnet, OpenAI o1, DeepSeek R1, GPT-4o, and Gemini 2.0 Flash.';
          canonicalUrl = 'https://aipicker.in/pricing-calculator';
          break;
        case 'prompts':
          title = 'Curated System Prompts & Workflows for LLMs | AIPicker';
          description = 'Battle-tested prompts for coding, architectural reviews, creative writing, and autonomous research agents.';
          canonicalUrl = 'https://aipicker.in/prompts';
          break;
        case 'news':
          title = 'Live AI News, Releases & Model Updates | AIPicker';
          description = 'Breaking artificial intelligence product updates, open-weight model drops, and regulatory news curated daily.';
          canonicalUrl = 'https://aipicker.in/ai-news';
          break;
        case 'bookmarks':
          title = 'Saved AI Tools & Shortlist | AIPicker';
          description = 'Your bookmarked AI software tools and customized stack recommendations.';
          canonicalUrl = 'https://aipicker.in/#bookmarks';
          break;
        case 'about':
          title = 'About Us & Editorial Board | AIPicker.in';
          description = 'Learn about AIPicker.in, our mission for independent AI benchmarking, and our verified engineering editorial board.';
          canonicalUrl = 'https://aipicker.in/about';
          break;
        case 'contact':
          title = 'Contact AIPicker Editorial Desk & Support';
          description = 'Get in touch with the AIPicker editorial and benchmark testing team. Reader inquiries, corrections, and tool submissions.';
          canonicalUrl = 'https://aipicker.in/contact';
          break;
        case 'privacy':
        case 'privacy-policy':
          title = 'Privacy Policy (GDPR & CCPA Compliant) | AIPicker';
          description = 'AIPicker privacy policy, data protection rights, log files, and Google AdSense cookie compliance.';
          canonicalUrl = 'https://aipicker.in/privacy';
          break;
        case 'terms':
          title = 'Terms of Service & Usage License | AIPicker';
          description = 'Terms of service, intellectual property guidelines, and conditions of use for AIPicker.in.';
          canonicalUrl = 'https://aipicker.in/terms';
          break;
        case 'affiliate-disclosure':
          title = 'Affiliate & Advertising Disclosure (FTC Compliant) | AIPicker';
          description = 'Complete transparency regarding Google AdSense display advertising, affiliate links, and our strict editorial firewall.';
          canonicalUrl = 'https://aipicker.in/affiliate-disclosure';
          break;
        case 'editorial':
        case 'editorial-policy':
          title = 'Editorial Standards & Fact-Checking Methodology | AIPicker';
          description = 'Learn how the AIPicker research laboratory tests, audits, and rates AI software independently without paid bias.';
          canonicalUrl = 'https://aipicker.in/editorial-policy';
          break;
        default:
          if (selectedCategory !== 'all' && categoryName) {
            title = `Best ${categoryName} Tools & Software (2026) | AIPicker`;
            description = `Explore top-rated ${categoryName} software tools ranked by speed, accuracy, pricing transparency, and verified human reviews.`;
            canonicalUrl = `https://aipicker.in/category/${selectedCategory}`;
          } else if (searchQuery) {
            title = `AI Tools Search: "${searchQuery}" | AIPicker`;
            description = `Search results for "${searchQuery}" across 40+ curated AI tools, code editors, image generators, and benchmark reports.`;
          }
          break;
      }
    }

    // Update document title
    document.title = title;

    // Helper function to set or update meta tag
    const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Meta Description
    updateMetaTag('name', 'description', description);

    // Update Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update Open Graph Tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImage);

    // Update Twitter Tags
    updateMetaTag('property', 'twitter:title', title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:url', canonicalUrl);
    updateMetaTag('property', 'twitter:image', ogImage);

    // Update or inject dynamic JSON-LD structured data script
    const dynamicSchemaId = 'dynamic-aipicker-schema';
    let dynamicScript = document.getElementById(dynamicSchemaId);
    if (structuredData) {
      if (!dynamicScript) {
        dynamicScript = document.createElement('script');
        dynamicScript.id = dynamicSchemaId;
        dynamicScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(dynamicScript);
      }
      dynamicScript.textContent = JSON.stringify(structuredData);
    } else if (dynamicScript) {
      dynamicScript.remove();
    }
  }, [activeView, selectedTool, selectedArticle, selectedCategory, categoryName, searchQuery]);

  return null;
};
