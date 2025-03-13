
// Deno edge function to be called by a scheduled job to update Instagram hashtags
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to call the update_trending_keywords endpoint
async function updateTrendingKeywords() {
  try {
    console.log('Starting scheduled update of trending keywords and Instagram hashtags');
    
    // Call the update_trending_keywords function
    const response = await fetch(
      `${supabaseUrl}/functions/v1/update_trending_keywords`,
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
      throw new Error(`Failed to update trending keywords: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Update completed:', result);
    
    return { success: true, ...result };
  } catch (error) {
    console.error('Error in scheduled update:', error);
    return { success: false, error: error.message };
  }
}

// Main function
Deno.serve(async (req) => {
  if (req.method === 'POST') {
    const result = await updateTrendingKeywords();
    
    return new Response(
      JSON.stringify(result),
      {
        headers: { 'Content-Type': 'application/json' },
        status: result.success ? 200 : 500
      }
    );
  }
  
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 405
    }
  );
});
