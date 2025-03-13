
import { supabase } from './supabaseClient.ts';

// Function to update the Instagram hashtags in the database
export async function updateInstagramHashtags(hashtags: any[]) {
  console.log(`Updating ${hashtags.length} Instagram hashtags in Supabase`);
  if (!hashtags.length) return;

  try {
    const hashtagsToInsert = hashtags.map(hashtag => {
      return {
        keyword: hashtag.keyword.toLowerCase(),
        hashtags: JSON.stringify([`#${hashtag.keyword}`]),
        source: hashtag.source,
        trending_score: hashtag.trending_score,
        last_updated: new Date().toISOString()
      };
    });
    
    // Insert into the database, updating if already exists
    const { data, error } = await supabase
      .from('instagram_hashtags')
      .upsert(hashtagsToInsert, { 
        onConflict: 'keyword,source',
        ignoreDuplicates: false
      });
    
    if (error) {
      throw error;
    }
    
    console.log(`Inserted/updated ${hashtagsToInsert.length} Instagram hashtags`);
    return data;
  } catch (error) {
    console.error('Error updating Instagram hashtags in database:', error);
    throw error;
  }
}

// Function to get related hashtags for a specific keyword
export async function getRelatedHashtags(keyword: string) {
  try {
    console.log(`Getting related hashtags for: ${keyword}`);
    
    // First try to find exact match
    const { data: exactMatch, error: exactError } = await supabase
      .from('instagram_hashtags')
      .select('*')
      .eq('keyword', keyword.toLowerCase())
      .limit(1);
    
    if (exactError) throw exactError;
    
    if (exactMatch && exactMatch.length > 0) {
      console.log(`Found exact match for ${keyword}`);
      return exactMatch[0];
    }
    
    // If no exact match, try to find partial matches
    const { data: partialMatches, error: partialError } = await supabase
      .from('instagram_hashtags')
      .select('*')
      .ilike('keyword', `%${keyword.toLowerCase()}%`)
      .order('trending_score', { ascending: false })
      .limit(10);
    
    if (partialError) throw partialError;
    
    if (partialMatches && partialMatches.length > 0) {
      console.log(`Found ${partialMatches.length} partial matches for ${keyword}`);
      return partialMatches;
    }
    
    console.log(`No matches found for ${keyword}`);
    return null;
  } catch (error) {
    console.error('Error getting related hashtags:', error);
    return null;
  }
}
