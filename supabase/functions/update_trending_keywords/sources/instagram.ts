
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

// Fetch hashtags from Instagram related sources
export async function getInstagramHashtags(query: string = 'social media') {
  console.log('Extracting Instagram-related hashtags for:', query);
  try {
    // For demonstration, we'll use a similar approach as we can't directly access Instagram API
    // In a production environment, you would need to use their official API with proper authentication
    const url = `https://best-hashtags.com/hashtag/${encodeURIComponent(query)}/`;
    console.log(`Querying URL: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 seconds timeout
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hashtags: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    console.log(`Response received, size: ${html.length} bytes`);
    
    // Parse the HTML
    const document = new DOMParser().parseFromString(html, 'text/html');
    if (!document) {
      throw new Error('Failed to parse HTML document');
    }
    
    const hashtagBlocks = document.querySelectorAll('.tag-block');
    console.log(`Found ${hashtagBlocks?.length || 0} hashtag blocks`);
    
    const hashtags = [];
    
    if (hashtagBlocks && hashtagBlocks.length > 0) {
      for (const block of hashtagBlocks) {
        const blockText = block.textContent;
        if (blockText) {
          // Extract hashtags using regex
          const matches = blockText.match(/#[\w\d]+/g);
          if (matches) {
            for (const tag of matches) {
              // Normalize the tag (remove # and lowercase)
              const keyword = tag.substring(1).toLowerCase().trim();
              
              // Skip very short or empty keywords
              if (keyword.length < 2) continue;
              
              hashtags.push({
                keyword: keyword,
                source: 'instagram',
                trending_score: 0.85 // Arbitrary high score for Instagram hashtags
              });
              console.log(`Found Instagram hashtag: #${keyword}`);
            }
          }
        }
      }
    }
    
    // If no hashtags were found, try to extract at least some from the page
    if (hashtags.length === 0) {
      console.log('No hashtags found in blocks, trying to extract from page content');
      
      // Extract any hashtag from the whole page
      const bodyText = document.body?.textContent || '';
      const matches = bodyText.match(/#[\w\d]+/g);
      
      if (matches) {
        const uniqueHashtags = [...new Set(matches)];
        
        for (const tag of uniqueHashtags.slice(0, 30)) { // Limit to 30 hashtags
          const keyword = tag.substring(1).toLowerCase().trim();
          
          if (keyword.length < 2) continue;
          
          hashtags.push({
            keyword: keyword,
            source: 'instagram',
            trending_score: 0.75
          });
          console.log(`Extracted fallback hashtag: #${keyword}`);
        }
      }
    }
    
    console.log(`Total Instagram hashtags found: ${hashtags.length}`);
    return hashtags;
  } catch (error) {
    console.error('Error getting hashtags from Instagram sources:', error);
    
    // Return default hashtags to prevent empty results
    const defaultHashtags = [
      'instagram', 'instadaily', 'instafollow', 'instagood', 'instalike',
      'photography', 'photooftheday', 'picoftheday', 'love', 'trending',
      'explore', 'viral', 'follow', 'content', 'creator', 'community'
    ].map(term => ({
      keyword: term,
      source: 'instagram_default',
      trending_score: 0.7
    }));
    
    console.log(`Returning ${defaultHashtags.length} default hashtags due to error`);
    return defaultHashtags;
  }
}
