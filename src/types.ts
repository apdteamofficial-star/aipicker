export type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Free Trial' | 'Open Source' | 'API Only';

export type ToolCategory = 
  | 'all'
  | 'llm-chat'
  | 'coding-dev'
  | 'image-design'
  | 'video-animation'
  | 'audio-voice'
  | 'productivity-workflow'
  | 'writing-marketing'
  | 'research-data';

export interface ToolBenchmark {
  metric: string;
  score: number; // 0 - 100
  notes: string;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: ToolCategory;
  categoryName: string;
  pricingModel: PricingModel;
  startingPrice: string;
  freeTierDetails: string;
  rating: number; // 1.0 - 5.0
  reviewCount: number;
  featured: boolean;
  trending: boolean;
  verifiedHumanReview: boolean;
  websiteUrl: string;
  logoBg: string;
  logoLetter: string;
  overview: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  editorVerdict: string;
  testedVersion: string;
  lastUpdated: string;
  benchmarks: ToolBenchmark[];
  platforms: string[]; // Web, Mac, Windows, Linux, iOS, Android, VS Code, CLI
  apiAvailable: boolean;
  contextWindow?: string;
  alternativeToolIds: string[];
  userUpvotes: number;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    verifiedExpert: boolean;
  };
  tags: string[];
  featuredImage: string;
  contentHtml: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ToolSubmission {
  toolName: string;
  websiteUrl: string;
  category: string;
  pricingModel: string;
  contactEmail: string;
  shortDescription: string;
  keyDifferentiator: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'editorial-correction' | 'tool-review' | 'advertising' | 'privacy';
}

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: ToolCategory | 'general';
  toolTarget: string;
  tags: string[];
  promptTemplate: string;
  expectedOutput: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  copyCount: number;
}

export interface BenchmarkEntry {
  id: string;
  modelName: string;
  provider: string;
  releaseDate: string;
  sweBenchScore: number; // 0-100%
  mmluProScore: number; // 0-100%
  inputCostPer1M: number; // in USD
  outputCostPer1M: number; // in USD
  tokensPerSecond: number;
  contextWindowTokens: string;
  reasoningCapability: 'Frontier' | 'High' | 'Standard';
  license: 'Proprietary' | 'Open Weights' | 'Open Source';
  bestUseCase: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  date: string;
  category: string;
  impactScore: 'High Impact' | 'Moderate' | 'Industry Shift';
  relatedToolSlug?: string;
}

export interface UserReview {
  id: string;
  toolId: string;
  authorName: string;
  authorRole: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedUser: boolean;
  helpfulCount: number;
}

export type ActiveView = 
  | 'home'
  | 'directory'
  | 'quiz'
  | 'compare'
  | 'matcher'
  | 'calculator'
  | 'benchmarks'
  | 'prompts'
  | 'news'
  | 'guides'
  | 'article-detail'
  | 'tool-detail'
  | 'about'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'affiliate-disclosure'
  | 'editorial-policy'
  | 'adsense-guide'
  | 'bookmarks';
