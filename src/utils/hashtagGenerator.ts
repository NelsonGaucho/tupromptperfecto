import { sanitizeInput } from './security';

// Interface for hashtag generation result
interface HashtagResult {
  all: string[];
  popular: string[];
  niche: string[];
}

// Helper function to randomize array elements
const shuffleArray = (array: string[]): string[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Sanitize hashtags to ensure they're valid
const sanitizeHashtag = (hashtag: string): string => {
  // Remove spaces, special characters, keep only alphanumeric
  return hashtag
    .trim()
    .toLowerCase()
    .replace(/[^\w\d]/g, '')
    .replace(/\s+/g, '');
};

// Generate hashtags using the provided OpenAI API key (this is a mock implementation)
export const generateHashtags = async (
  platform: 'instagram' | 'youtube' | 'twitter',
  topic: string,
  description?: string
): Promise<HashtagResult> => {
  // In a real implementation, this would call the OpenAI API with the provided API key
  // For now, this is a simulation to demonstrate the functionality
  
  console.log(`Generating ${platform} hashtags for topic: ${topic}`);
  
  // Sanitize the topic
  const sanitizedTopic = sanitizeInput(topic);
  
  // Set platform-specific variables
  const maxHashtags = platform === 'instagram' ? 30 : platform === 'youtube' ? 15 : 10;
  const maxPopular = platform === 'instagram' ? 10 : platform === 'youtube' ? 5 : 3;
  const maxNiche = platform === 'instagram' ? 15 : platform === 'youtube' ? 7 : 5;
  
  // Create base hashtags from the topic
  const baseHashtags = sanitizedTopic
    .split(/\s+/)
    .map(word => sanitizeHashtag(word))
    .filter(tag => tag.length > 2);
  
  // Basic preset hashtags for each platform
  const platformPresets: Record<string, string[]> = {
    instagram: [
      'instagram', 'insta', 'instadaily', 'instagood', 'photooftheday', 
      'picoftheday', 'explore', 'trending', 'viral', 'follow', 'love',
      'photography', 'photo', 'instamood', 'instalike', 'igers'
    ],
    youtube: [
      'youtube', 'youtuber', 'video', 'subscribe', 'channel', 'youtubevideo',
      'youtubers', 'youtubevideos', 'trending', 'viral', 'content', 'creator'
    ],
    twitter: [
      'twitter', 'tweet', 'x', 'trending', 'viral', 'followme', 'retweet',
      'twitterpost', 'twitterverse', 'twitterfam'
    ]
  };
  
  // Topic-based preset hashtags
  const topicKeywords = sanitizedTopic.toLowerCase().split(/\s+/);
  
  // Simulate API response for popular hashtags
  const popularHashtags = [
    ...platformPresets[platform].slice(0, 5),
    ...baseHashtags.map(tag => `${tag}`),
    ...topicKeywords.map(word => {
      const presets = platformPresets[platform];
      const randomPreset = presets[Math.floor(Math.random() * presets.length)];
      return `${word}${randomPreset}`;
    })
  ].map(tag => sanitizeHashtag(tag));
  
  // Simulate API response for niche hashtags
  const nicheHashtags = [
    ...baseHashtags.map(tag => `${tag}`),
    ...topicKeywords.map(word => `${word}community`),
    ...topicKeywords.map(word => `${word}lovers`),
    ...topicKeywords.map(word => `${word}daily`),
    ...topicKeywords.map(word => `best${word}`),
    ...topicKeywords.map(word => `${word}life`),
    ...topicKeywords.map(word => `${word}world`),
    ...topicKeywords.map(word => `${word}tips`)
  ].map(tag => sanitizeHashtag(tag));
  
  // Get unique and valid hashtags
  const uniquePopular = [...new Set(popularHashtags)]
    .filter(tag => tag.length >= 3 && tag.length <= 30)
    .slice(0, maxPopular);
  
  const uniqueNiche = [...new Set(nicheHashtags)]
    .filter(tag => !uniquePopular.includes(tag)) // Avoid duplicates
    .filter(tag => tag.length >= 3 && tag.length <= 30)
    .slice(0, maxNiche);
  
  // Create additional hashtags to meet the max count
  let additionalCount = maxHashtags - uniquePopular.length - uniqueNiche.length;
  additionalCount = Math.max(0, additionalCount); // Ensure non-negative
  
  // Combine keywords to create more hashtags
  const additionalHashtags = [];
  for (let i = 0; i < topicKeywords.length && additionalHashtags.length < additionalCount; i++) {
    for (let j = 0; j < platformPresets[platform].length && additionalHashtags.length < additionalCount; j++) {
      const combined = `${topicKeywords[i]}${platformPresets[platform][j]}`;
      const sanitized = sanitizeHashtag(combined);
      if (
        sanitized.length >= 3 && 
        sanitized.length <= 30 && 
        !uniquePopular.includes(sanitized) && 
        !uniqueNiche.includes(sanitized) &&
        !additionalHashtags.includes(sanitized)
      ) {
        additionalHashtags.push(sanitized);
      }
    }
  }
  
  // Shuffle the additional hashtags to add some randomness
  const shuffledAdditional = shuffleArray(additionalHashtags).slice(0, additionalCount);
  
  // Combine all hashtags
  const allHashtags = [...uniquePopular, ...uniqueNiche, ...shuffledAdditional];
  
  // Return with a slight delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    all: allHashtags,
    popular: uniquePopular,
    niche: uniqueNiche
  };
};
