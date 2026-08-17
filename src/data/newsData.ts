import { NewsItem } from '../types';

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'claude-3-7-launch',
    title: 'Anthropic Unveils Claude 3.7 Sonnet with Hybrid Reasoning Engine',
    summary: 'The model introduces simultaneous instant responses and scalable reasoning budgets up to 128k output tokens, achieving unprecedented SWE-bench software generation records.',
    source: 'Anthropic Engineering',
    sourceUrl: 'https://www.anthropic.com',
    date: 'August 2026',
    category: 'Model Release',
    impactScore: 'Industry Shift',
    relatedToolSlug: 'claude-ai'
  },
  {
    id: 'openai-o3-mini-cost-drop',
    title: 'OpenAI Reduces Inference Pricing by 60% for Reasoning Models',
    summary: 'Developers can now leverage high-reasoning STEM intelligence at $1.10/M input tokens, democratizing autonomous agent development for small engineering teams.',
    source: 'OpenAI Blog',
    sourceUrl: 'https://openai.com',
    date: 'August 2026',
    category: 'Pricing Update',
    impactScore: 'High Impact',
    relatedToolSlug: 'chatgpt-plus'
  },
  {
    id: 'gemini-2-flash-1m-tokens',
    title: 'Google DeepMind Expands Gemini 2.0 Multimodal Audio-Video API',
    summary: 'Sub-400ms real-time audio conversation loops and 1M token context windows are now generally available with native tool calling and computer use primitives.',
    source: 'Google DeepMind',
    sourceUrl: 'https://deepmind.google',
    date: 'July 2026',
    category: 'API Capabilities',
    impactScore: 'High Impact',
    relatedToolSlug: 'gemini-advanced'
  },
  {
    id: 'cursor-composer-multi-repo',
    title: 'Cursor Releases Multi-Repository Codebase Indexing',
    summary: 'Software engineering teams can now link microservices and shared client-server monorepos directly into Composer for end-to-end full-stack refactoring.',
    source: 'Cursor Changelog',
    sourceUrl: 'https://cursor.com',
    date: 'August 2026',
    category: 'Dev Tooling',
    impactScore: 'Moderate',
    relatedToolSlug: 'cursor-ai'
  },
  {
    id: 'sora-video-api-rollout',
    title: 'High-Definition Video Generation APIs Open for Global Commercial Use',
    summary: 'Generative 1080p 60fps video generation with continuous temporal physics simulation is now accessible for digital marketers, animators, and game studios.',
    source: 'AI Media Digest',
    sourceUrl: 'https://openai.com/sora',
    date: 'July 2026',
    category: 'Video AI',
    impactScore: 'Industry Shift',
    relatedToolSlug: 'runway-gen3'
  }
];
