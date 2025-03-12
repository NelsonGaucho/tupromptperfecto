
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface TrendingKeyword {
  id: string;
  keyword: string;
  source: string;
  categoryId: string;
  searchVolume?: number;
  trendingScore?: number;
}

export interface PromptTemplate {
  id: string;
  categoryId: string;
  title: string;
  template: string;
  description?: string;
  usageCount: number;
  rating: number;
}
