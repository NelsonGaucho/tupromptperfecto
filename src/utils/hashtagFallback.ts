
import { sanitizeHashtag, shuffleArray, formatForYoutube, getPlatformPresets, getPlatformConfig } from './hashtagUtils';
import { HashtagResult } from '@/types/hashtag';

// Generate hashtags using a fallback algorithm when AI and database methods fail
export const generateFallbackHashtags = (
  platform: 'instagram' | 'youtube' | 'twitter',
  sanitizedTopic: string
): HashtagResult => {
  // Get platform configuration
  const { maxHashtags, maxPopular, maxNiche } = getPlatformConfig(platform);
  
  // Create base hashtags from the topic
  const baseHashtags = sanitizedTopic
    .split(/\s+/)
    .map(word => sanitizeHashtag(word))
    .filter(tag => tag.length > 2);
  
  // Get platform presets
  const platformPresets = getPlatformPresets(platform);
  
  // Topic-based keywords
  const topicKeywords = sanitizedTopic.toLowerCase().split(/\s+/);
  
  // Simulate API response for popular hashtags
  const popularHashtags = [
    ...platformPresets.slice(0, 5),
    ...baseHashtags.map(tag => `${tag}`),
    ...topicKeywords.map(word => {
      const randomPreset = platformPresets[Math.floor(Math.random() * platformPresets.length)];
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
    for (let j = 0; j < platformPresets.length && additionalHashtags.length < additionalCount; j++) {
      const combined = `${topicKeywords[i]}${platformPresets[j]}`;
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
