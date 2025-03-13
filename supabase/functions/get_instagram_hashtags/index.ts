
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Define CORS headers for the entire application
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main function to serve requests
Deno.serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Create Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  if (req.method === 'POST') {
    try {
      // Get the topic from the request
      const { topic } = await req.json();
      
      if (!topic) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Topic is required'
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            },
            status: 400
          }
        );
      }
      
      console.log(`Searching for Instagram hashtags related to: ${topic}`);
      
      // First check if we have any exact or partial matches
      const { data: existingHashtags, error: queryError } = await supabase
        .from('instagram_hashtags')
        .select('*')
        .or(`keyword.eq.${topic.toLowerCase()},keyword.ilike.%${topic.toLowerCase()}%`)
        .order('trending_score', { ascending: false })
        .limit(30);
      
      if (queryError) {
        throw queryError;
      }
      
      // If we have some results, return them
      if (existingHashtags && existingHashtags.length > 0) {
        console.log(`Found ${existingHashtags.length} existing hashtags`);
        
        // Process the hashtags into a usable format
        const allTags = [];
        const popularTags = [];
        const nicheTags = [];
        
        existingHashtags.forEach(record => {
          try {
            const tagArray = typeof record.hashtags === 'string' 
              ? JSON.parse(record.hashtags) 
              : record.hashtags;
            
            if (Array.isArray(tagArray)) {
              // Add tags to the appropriate categories
              tagArray.forEach(tag => {
                if (!allTags.includes(tag)) {
                  allTags.push(tag);
                  
                  // Simple logic to separate popular from niche
                  if (record.trending_score > 0.7 && popularTags.length < 10) {
                    popularTags.push(tag);
                  } else if (nicheTags.length < 15) {
                    nicheTags.push(tag);
                  }
                }
              });
            }
          } catch (e) {
            console.error('Error parsing hashtags:', e);
          }
        });
        
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              all: allTags,
              popular: popularTags,
              niche: nicheTags
            }
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            },
            status: 200
          }
        );
      }
      
      // If no results, trigger an update and return a message
      // Call the update_trending_keywords function with the topic
      const updateResponse = await fetch(
        `${supabaseUrl}/functions/v1/update_trending_keywords`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ keyword: topic })
        }
      );
      
      if (!updateResponse.ok) {
        throw new Error(`Failed to update trending keywords: ${updateResponse.statusText}`);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No existing hashtags found for this topic. We\'ve started generating them. Please try again in a few moments.',
          data: {
            all: [],
            popular: [],
            niche: []
          }
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200
        }
      );
      
    } catch (error) {
      console.error('Error in get_instagram_hashtags function:', error);
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
      );
    }
  }
  
  // Return error for unsupported methods
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
  );
});
