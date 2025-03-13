
export type SocialPlatform = 'instagram' | 'youtube' | 'twitter';

export interface HashtagResult {
  all: string[];
  popular: string[];
  niche: string[];
  formattedForYoutube?: string;
}

export interface PlatformConfig {
  icon: JSX.Element;
  title: string;
  maxHashtags: number;
}
