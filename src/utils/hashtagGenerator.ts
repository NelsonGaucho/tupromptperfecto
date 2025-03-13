
import { sanitizeInput } from './security';
import { enhanceHashtagsWithAI } from '@/services/apiService';
import { supabase } from '@/integrations/supabase/client';
import { formatForYoutube } from './hashtagUtils';
import { generateFallbackHashtags } from './hashtagFallback';
import { HashtagResult } from '@/types/hashtag';

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
  
  // Try to enhance hashtags with AI second
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
  return generateFallbackHashtags(platform, sanitizedTopic);
};
