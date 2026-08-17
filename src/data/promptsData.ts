import { PromptItem } from '../types';

export const PROMPTS_DATA: PromptItem[] = [
  {
    id: 'cursor-senior-code-refactor',
    title: 'Cursor .cursorrules Senior Full-Stack Architect',
    description: 'System prompt to inject into `.cursorrules` for pristine TypeScript, zero hallucinated packages, modular React patterns, and defensive async error handling.',
    category: 'coding-dev',
    toolTarget: 'Cursor AI & Windsurf',
    tags: ['System Prompt', 'TypeScript', 'React', 'Production Ready'],
    difficulty: 'Advanced',
    copyCount: 1420,
    promptTemplate: `You are an elite Staff Software Engineer and UI Architect.
Follow these non-negotiable engineering directives:
1. TYPE SAFETY: Write strict TypeScript. Never use 'any'. Always define clear interfaces and explicit return types.
2. ARCHITECTURE: Avoid monolithic files. Split components into sub-files with single responsibility.
3. ERROR BOUNDARIES: All network calls and async operations must use try/catch with user-friendly error fallbacks.
4. DEPENDENCY DISCIPLINE: Use only existing dependencies from package.json. Do not invent non-existent package names.
5. TAILWIND CSS: Write clean responsive Tailwind CSS classes. Adhere to accessibility (WCAG AA contrast) and mobile-first responsiveness.
6. DEFENSIVE CHECKS: Ensure optional chaining (foo?.bar) and null safety across all dynamic object access.`,
    expectedOutput: 'Clean, production-ready, typed code with clear architectural modularity and zero runtime exceptions.'
  },
  {
    id: 'claude-3-7-deep-reasoning-system',
    title: 'Claude 3.7 Hybrid Thinking Problem Solver',
    description: 'Forces Claude 3.7 to utilize internal chain-of-thought verification before generating solutions for intricate mathematical, logic, and architectural dilemmas.',
    category: 'llm-chat',
    toolTarget: 'Claude 3.7 / Claude Pro',
    tags: ['Reasoning', 'Chain-of-thought', 'Architecture', 'Problem Solving'],
    difficulty: 'Intermediate',
    copyCount: 980,
    promptTemplate: `I want you to solve the following problem with rigorous deep thinking:
[INSERT YOUR COMPLEX PROBLEM OR SYSTEM DESIGN GOAL]

Please format your analysis as follows:
1. Core Assumptions & First Principles Breakdown
2. Edge Cases, Failure Modes & Hidden Bottlenecks
3. Step-by-Step Architectural Solution (with trade-offs analysis)
4. Recommended Implementation Strategy & Benchmark Criteria
5. Risk Mitigation & Long-term Maintenance Strategy`,
    expectedOutput: 'Comprehensive, structured breakdown evaluating edge cases, quantitative trade-offs, and verified logic.'
  },
  {
    id: 'midjourney-v6-photorealistic-portrait',
    title: 'Midjourney v6.1 Ultra-Realistic Cinematic Lighting',
    description: 'Prompt recipe for ultra-crisp studio lighting, 85mm lens depth of field, natural skin texture, and photorealistic color science.',
    category: 'image-design',
    toolTarget: 'Midjourney v6.1 / Midjourney Web',
    tags: ['Midjourney', 'Photorealism', 'Cinematic', 'Lighting'],
    difficulty: 'Beginner',
    copyCount: 2310,
    promptTemplate: `Cinematic editorial portrait of [SUBJECT/PERSON], shot on 85mm lens f/1.4, golden hour volumetric lighting, soft rim light, authentic natural skin micro-texture, subtle film grain, Hasselblad medium format photography, dynamic neutral color grading, 8k resolution, photorealistic, hyper-detailed --ar 16:9 --style raw --v 6.1`,
    expectedOutput: 'Stunning magazine-quality photographic composition with realistic lens bokeh and studio color balance.'
  },
  {
    id: 'v0-fullstack-dashboard-prompt',
    title: 'v0 by Vercel High-Converting SaaS Dashboard Component',
    description: 'Precision prompt to generate clean, responsive shadcn/ui + Tailwind dashboards with real charts and accessible tabs.',
    category: 'coding-dev',
    toolTarget: 'v0.dev / Bolt.new',
    tags: ['v0', 'UI/UX', 'Tailwind', 'SaaS Dashboard'],
    difficulty: 'Intermediate',
    copyCount: 1150,
    promptTemplate: `Create a modern, high-density SaaS analytics dashboard using React, Tailwind CSS, and Lucide React icons.
Include:
- Metric summary cards with percentage change badges and subtle micro-charts
- An interactive Recharts area chart showing revenue trends over time with 7d/30d/90d filter toggles
- A recent activity table with status badges (Completed, In Review, Pending) and search filter
- Clean light theme with slate/indigo color palette, crisp 1px borders, and mathematical padding (16px/24px)
- Fully responsive on mobile, tablet, and ultra-wide screens.`,
    expectedOutput: 'Production-ready React JSX component with complete layout, mock data, and responsive styling.'
  },
  {
    id: 'perplexity-academic-deep-research',
    title: 'Perplexity AI Deep Research & Literature Review',
    description: 'Extracts peer-reviewed citations, empirical studies, and balanced consensus on complex scientific or market trends.',
    category: 'research-data',
    toolTarget: 'Perplexity AI / Pro Search',
    tags: ['Research', 'Academic', 'Fact-Checking', 'Citations'],
    difficulty: 'Beginner',
    copyCount: 890,
    promptTemplate: `Conduct a rigorous synthesis of empirical research regarding [TOPIC].
Requirements:
1. Cite only high-impact peer-reviewed journals, official industry benchmarks, or primary technical documentation from 2024-2026.
2. Group the findings into: Consensus Opinions vs. Active Debates.
3. Provide quantitative statistics, sample sizes, and methodology critiques where available.
4. Conclude with a practical summary table showing pros, cons, and future trajectory.`,
    expectedOutput: 'Academic-grade research synthesis complete with domain citations, data tables, and objective critique.'
  },
  {
    id: 'elevenlabs-voiceover-acting-script',
    title: 'ElevenLabs Emotion & Pacing Studio Tagging',
    description: 'Optimized SSML and emotional punctuation prompt for realistic podcast or video narrator voice generation.',
    category: 'audio-voice',
    toolTarget: 'ElevenLabs Studio',
    tags: ['ElevenLabs', 'Voice AI', 'Podcasting', 'Voiceover'],
    difficulty: 'Intermediate',
    copyCount: 670,
    promptTemplate: `[Natural cadence, conversational pacing with slight breath pause]
"Welcome back to the AI Horizon podcast. [pause=0.4s] Today, we are dissecting something that truly caught the entire software industry off-guard. [whisper] And no, it isn't what you think. [/whisper] [excited] The latest benchmark dropped just two hours ago, [/excited] and the numbers are simply unprecedented."`,
    expectedOutput: 'Fluid, human-like voice synthesis with natural vocal cadences, emotional inflection, and realism.'
  }
];
