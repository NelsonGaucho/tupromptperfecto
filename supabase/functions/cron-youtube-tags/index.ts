
// Deno edge function to be called by a scheduled job to update YouTube tags
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Define CORS headers for the entire application
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to call the update_youtube_tags endpoint
async function updateYouTubeTags() {
  try {
    console.log('Starting scheduled update of YouTube tags');
    
    // Call the update_youtube_tags function
    const response = await fetch(
      `${supabaseUrl}/functions/v1/update_youtube_tags`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update YouTube tags: ${response.statusText}. Details: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('YouTube tags update completed successfully:', result);
    
    return { success: true, ...result };
  } catch (error) {
    console.error('Error in scheduled YouTube tags update:', error);
    return { success: false, error: error.message };
  }
}

// Main function
Deno.serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Log request information for debugging
  console.log(`Received ${req.method} request to cron-youtube-tags`);
  
  if (req.method === 'POST') {
    try {
      console.log('Executing scheduled YouTube tags update task...');
      const startTime = Date.now();
      const result = await updateYouTubeTags();
      const executionTime = Date.now() - startTime;
      
      console.log(`Task completed in ${executionTime}ms. Success: ${result.success}`);
      
      return new Response(
        JSON.stringify(result),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: result.success ? 200 : 500
        }
      );
    } catch (error) {
      console.error('Unhandled error in cron function:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }
  }
  
  return new Response(
    JSON.stringify({ 
      error: 'Method not allowed', 
      allowedMethods: ['POST', 'OPTIONS'],
      timestamp: new Date().toISOString()
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405
    }
  );
});
