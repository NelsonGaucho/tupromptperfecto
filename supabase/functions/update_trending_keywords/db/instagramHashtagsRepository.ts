
import { supabase } from './supabaseClient.ts';

// Function to store keywords as Instagram hashtags
export async function storeInstagramHashtags(keywords: any[]) {
  if (!keywords || keywords.length === 0) return;
  
  try {
    const hashtags = keywords.map(keyword => {
      // Format the keyword as a hashtag
      const hashtagText = keyword.keyword.toLowerCase().trim();
      
      // Skip empty keywords
      if (!hashtagText) return null;
      
      // Create an array with the hashtag
      const hashtagArray = [`#${hashtagText}`];
      
      return {
        keyword: hashtagText,
        hashtags: JSON.stringify(hashtagArray),
        source: keyword.source || 'ai_generated',
        trending_score: keyword.trending_score || 0.7,
        last_updated: new Date().toISOString()
      };
    }).filter(Boolean);
    
    if (hashtags.length === 0) return;
    
    // Insert hashtags into the database
    const { data, error } = await supabase
      .from('instagram_hashtags')
      .upsert(hashtags, {
        onConflict: 'keyword,source',
        ignoreDuplicates: false
      });
    
    if (error) throw error;
    
    console.log(`Stored ${hashtags.length} Instagram hashtags`);
    return data;
  } catch (error) {
    console.error('Error storing Instagram hashtags:', error);
    throw error;
  }
}
