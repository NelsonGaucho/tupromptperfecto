import { sanitizeInput } from './security';

// Helper function to randomize array elements
export const shuffleArray = (array: string[]): string[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Sanitize hashtags to ensure they're valid
export const sanitizeHashtag = (hashtag: string): string => {
  // Remove spaces, special characters, keep only alphanumeric
  return hashtag
    .trim()
    .toLowerCase()
    .replace(/[^\w\d]/g, '')
    .replace(/\s+/g, '');
};

// Format hashtags specifically for YouTube (comma-separated without # symbol)
export const formatForYoutube = (hashtags: string[]): string => {
  return hashtags
    .map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
    .join(', ');
};

// Get platform-specific hashtag presets
export const getPlatformPresets = (platform: string): string[] => {
  const platformPresets: Record<string, string[]> = {
    instagram: [
      'instagram', 'insta', 'instadaily', 'instagood', 'photooftheday', 
      'picoftheday', 'explore', 'trending', 'viral', 'follow', 'love',
      'photography', 'photo', 'instamood', 'instalike', 'igers'
    ],
    youtube: [
      'youtube', 'youtuber', 'video', 'subscribe', 'channel', 'youtubevideo',
      'youtubers', 'youtubevideos', 'trending', 'viral', 'content', 'creator',
      'shorts', 'youtubeshorts', 'videooftheday', 'tutorial'
    ],
    twitter: [
      'twitter', 'tweet', 'x', 'trending', 'viral', 'followme', 'retweet',
      'twitterpost', 'twitterverse', 'twitterfam'
    ]
  };
  
  return platformPresets[platform] || [];
};

// Get platform-specific configuration values
export const getPlatformConfig = (platform: 'instagram' | 'youtube' | 'twitter') => {
  // Set platform-specific variables
  const maxHashtags = platform === 'instagram' ? 30 : platform === 'youtube' ? 15 : 10;
  const maxPopular = platform === 'instagram' ? 10 : platform === 'youtube' ? 5 : 3;
  const maxNiche = platform === 'instagram' ? 15 : platform === 'youtube' ? 7 : 5;
  
  return { maxHashtags, maxPopular, maxNiche };
};
