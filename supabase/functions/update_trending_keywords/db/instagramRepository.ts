
import { supabase } from './supabaseClient.ts';

// Function to update the Instagram hashtags in the database
export async function updateInstagramHashtags(hashtags: any[]) {
  console.log(`Updating ${hashtags.length} Instagram hashtags in Supabase`);
  if (!hashtags.length) {
    console.log('No hashtags to update, skipping database operation');
    return [];
  }

  try {
    // Process and validate hashtags before insertion
    const hashtagsToInsert = hashtags
      .filter(hashtag => {
        // Make sure the hashtag has a valid keyword
        if (!hashtag.keyword || typeof hashtag.keyword !== 'string' || hashtag.keyword.trim() === '') {
          console.log('Skipping invalid hashtag', hashtag);
          return false;
        }
        return true;
      })
      .map(hashtag => {
        const cleanKeyword = hashtag.keyword.toLowerCase().trim();
        return {
          keyword: cleanKeyword,
          hashtags: JSON.stringify([`#${cleanKeyword}`]),
          source: hashtag.source || 'unknown',
          trending_score: hashtag.trending_score || 0.5,
          last_updated: new Date().toISOString()
        };
      });
    
    if (hashtagsToInsert.length === 0) {
      console.log('No valid hashtags to insert after filtering');
      return [];
    }
    
    console.log(`Inserting ${hashtagsToInsert.length} validated hashtags into database`);
    
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
    
    console.log(`Successfully inserted/updated ${hashtagsToInsert.length} Instagram hashtags`);
    return data || [];
  } catch (error) {
    console.error('Error updating Instagram hashtags in database:', error);
    throw error;
  }
}

// Function to get related hashtags for a specific keyword
export async function getRelatedHashtags(keyword: string) {
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    console.log('Invalid keyword provided, returning null');
    return null;
  }

  try {
    const cleanKeyword = keyword.toLowerCase().trim();
    console.log(`Getting related hashtags for: ${cleanKeyword}`);
    
    // First try to find exact match
    const { data: exactMatch, error: exactError } = await supabase
      .from('instagram_hashtags')
      .select('*')
      .eq('keyword', cleanKeyword)
      .limit(1);
    
    if (exactError) throw exactError;
    
    if (exactMatch && exactMatch.length > 0) {
      console.log(`Found exact match for ${cleanKeyword}`);
      return exactMatch[0];
    }
    
    // If no exact match, try to find partial matches
    const { data: partialMatches, error: partialError } = await supabase
      .from('instagram_hashtags')
      .select('*')
      .ilike('keyword', `%${cleanKeyword}%`)
      .order('trending_score', { ascending: false })
      .limit(10);
    
    if (partialError) throw partialError;
    
    if (partialMatches && partialMatches.length > 0) {
      console.log(`Found ${partialMatches.length} partial matches for ${cleanKeyword}`);
      return partialMatches;
    }
    
    console.log(`No matches found for ${cleanKeyword}`);
    return null;
  } catch (error) {
    console.error('Error getting related hashtags:', error);
    return null;
  }
}
