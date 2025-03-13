
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
      }
    });
    
    const html = await response.text();
    console.log(`Response received, size: ${html.length} bytes`);
    
    // Parse the HTML
    const document = new DOMParser().parseFromString(html, 'text/html');
    
    const hashtagBlocks = document?.querySelectorAll('.tag-block');
    console.log(`Found ${hashtagBlocks?.length || 0} hashtag blocks`);
    
    const hashtags = [];
    
    if (hashtagBlocks) {
      for (const block of hashtagBlocks) {
        const blockText = block.textContent;
        if (blockText) {
          // Extract hashtags using regex
          const matches = blockText.match(/#[\w\d]+/g);
          if (matches) {
            for (const tag of matches) {
              hashtags.push({
                keyword: tag.substring(1), // Remove the # prefix
                source: 'instagram',
                trending_score: 0.85 // Arbitrary high score for Instagram hashtags
              });
              console.log(`Found Instagram hashtag: ${tag}`);
            }
          }
        }
      }
    }
    
    return hashtags;
  } catch (error) {
    console.error('Error getting hashtags from Instagram sources:', error);
    return [];
  }
}
