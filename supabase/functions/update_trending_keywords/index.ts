
// Import the necessary modules
import { corsHeaders } from './db/supabaseClient.ts';
import { updateTrendingKeywords } from './db/keywordsRepository.ts';
import { updateInstagramHashtags } from './db/instagramRepository.ts';
import { generatePromptTemplates } from './db/templatesRepository.ts';
import { getGoogleTrendsKeywords } from './sources/googleTrends.ts';
import { getRedditKeywords } from './sources/reddit.ts';
import { getAnswerThePublicKeywords } from './sources/answerThePublic.ts';
import { getInstagramHashtags } from './sources/instagram.ts';

// Main function that handles the requests
Deno.serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  if (req.method === 'POST') {
    try {
      console.log('Starting update of keywords, templates, and Instagram hashtags')
      
      // Parse request body if present
      let requestBody = {};
      try {
        const requestText = await req.text();
        if (requestText) {
          requestBody = JSON.parse(requestText);
        }
      } catch (e) {
        console.log('No request body or invalid JSON');
      }
      
      const keywordQuery = requestBody.keyword || 'social media';
      
      // 1. Get keywords from different sources
      const googleTrendsKeywords = await getGoogleTrendsKeywords();
      console.log(`Obtained ${googleTrendsKeywords.length} keywords from Google Trends`);
      
      const redditKeywords = await getRedditKeywords();
      console.log(`Obtained ${redditKeywords.length} keywords from Reddit`);
      
      const atpKeywords = await getAnswerThePublicKeywords();
      console.log(`Obtained ${atpKeywords.length} keywords from AnswerThePublic`);
      
      // Get Instagram hashtags specifically for the requested keyword
      const instagramHashtags = await getInstagramHashtags(keywordQuery);
      console.log(`Obtained ${instagramHashtags.length} hashtags from Instagram sources`);
      
      // 2. Combine all keywords
      const allKeywords = [
        ...googleTrendsKeywords,
        ...redditKeywords,
        ...atpKeywords
      ];
      
      console.log(`Total of ${allKeywords.length} keywords obtained`);
      
      // 3. Update the database
      await updateTrendingKeywords(allKeywords);
      
      // 4. Update Instagram hashtags separately
      await updateInstagramHashtags(instagramHashtags);
      
      // 5. Generate templates if they don't exist
      await generatePromptTemplates();
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Update completed',
          stats: {
            googleTrends: googleTrendsKeywords.length,
            reddit: redditKeywords.length,
            answerThePublic: atpKeywords.length,
            instagram: instagramHashtags.length,
            total: allKeywords.length + instagramHashtags.length
          }
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200
        }
      )
    } catch (error) {
      console.error('Error in edge function:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 500
        }
      )
    }
  }
  
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }),
    {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 405
    }
  )
})
