import { sanitizeInput } from './security';
import { enhanceHashtagsWithAI } from '@/services/apiService';
import { supabase } from '@/integrations/supabase/client';

// Interface for hashtag generation result
interface HashtagResult {
  all: string[];
  popular: string[];
  niche: string[];
  formattedForYoutube?: string; // For YouTube format
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

// Format hashtags specifically for YouTube (comma-separated without # symbol)
const formatForYoutube = (hashtags: string[]): string => {
  return hashtags
    .map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
    .join(', ');
};

// Generate hashtags using our database, Edge Function, and OpenAI API
export const generateHashtags = async (
  platform: 'instagram' | 'youtube' | 'twitter',
  topic: string,
  description?: string
): Promise<HashtagResult> => {
  // Sanitize the topic
  const sanitizedTopic = sanitizeInput(topic);
  
  // For Instagram, try to get hashtags from our database first
  if (platform === 'instagram') {
    try {
      console.log(`Attempting to get Instagram hashtags for topic: ${topic} from Supabase`);
      
      const { data, error } = await supabase.functions.invoke('get_instagram_hashtags', {
        body: { topic: sanitizedTopic }
      });
      
      if (!error && data && data.success && data.data && data.data.all.length > 0) {
        console.log(`Successfully retrieved ${data.data.all.length} Instagram hashtags`);
        return data.data;
      }
      
      console.log("No Instagram hashtags found in database or empty result, falling back to AI");
    } catch (error) {
      console.error("Error getting Instagram hashtags:", error);
      console.log("Falling back to AI generation");
    }
  }
  
  // Try to enhance hashtags with AI first
  try {
    console.log(`Attempting to generate ${platform} hashtags for topic: ${topic} using AI`);
    
    const aiResult = await enhanceHashtagsWithAI(platform, topic);
    
    if (aiResult.success && aiResult.data && aiResult.data.length > 0) {
      console.log(`AI successfully generated ${aiResult.data.length} hashtags`);
      
      // Split the AI-generated hashtags into popular and niche
      const aiHashtags = aiResult.data.map((tag: string) => 
        tag.startsWith('#') ? tag : `#${tag}`
      );
      
      const popular = aiHashtags.slice(0, Math.min(10, aiHashtags.length));
      const niche = aiHashtags.slice(10);
      
      const result: HashtagResult = {
        all: aiHashtags,
        popular,
        niche
      };
      
      // Add YouTube specific format if platform is YouTube
      if (platform === 'youtube') {
        result.formattedForYoutube = formatForYoutube(aiHashtags);
      }
      
      return result;
    }
    
    console.log("AI hashtag generation failed or returned empty results, falling back to algorithm");
  } catch (error) {
    console.error("Error with AI hashtag generation:", error);
    console.log("Falling back to algorithm");
  }
  
  // Fall back to the original algorithm if all else fails
  
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
      'youtubers', 'youtubevideos', 'trending', 'viral', 'content', 'creator',
      'shorts', 'youtubeshorts', 'videooftheday', 'tutorial'
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
  
  // Add # prefix to all hashtags
  const formattedHashtags = allHashtags.map(tag => `#${tag}`);
  const formattedPopular = uniquePopular.map(tag => `#${tag}`);
  const formattedNiche = uniqueNiche.map(tag => `#${tag}`);
  
  // Create result object
  const result: HashtagResult = {
    all: formattedHashtags,
    popular: formattedPopular,
    niche: formattedNiche
  };
  
  // Add YouTube specific format if platform is YouTube
  if (platform === 'youtube') {
    result.formattedForYoutube = formatForYoutube(formattedHashtags);
  }
  
  return result;
};
