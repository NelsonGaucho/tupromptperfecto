
import { getOpenAIKey, ApiResponse, handleOpenAIError } from './apiUtils';

// Function to generate better hashtags using OpenAI API
export const enhanceHashtagsWithAI = async (
  platform: 'instagram' | 'youtube' | 'twitter',
  topic: string,
  count: number = 30
): Promise<ApiResponse> => {
  try {
    const prompt = `Generate ${count} of the best and most effective hashtags for ${platform} related to "${topic}". 
    Include a mix of popular and niche hashtags to maximize reach. 
    Format the result as a JSON array of strings. Only include the hashtags, no explanations.`;

    const openaiKey = getOpenAIKey();
    
    if (!openaiKey) {
      return {
        success: false,
        error: "No se ha configurado una API key de OpenAI. Por favor, configúrala en la página de configuración."
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a social media marketing expert who specializes in generating optimal hashtags for different platforms."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw await handleOpenAIError(response);
    }

    const data = await response.json();
    let hashtags;
    
    try {
      // Try to parse the hashtags from the response
      const content = data.choices[0].message.content;
      hashtags = JSON.parse(content);
    } catch (e) {
      // If parsing fails, extract hashtags with regex
      const content = data.choices[0].message.content;
      const hashtagRegex = /#[\w\d]+/g;
      const matches = content.match(hashtagRegex);
      
      if (matches && matches.length > 0) {
        hashtags = matches;
      } else {
        // Split by new lines and clean up
        hashtags = content
          .split(/\n/)
          .map(line => line.trim())
          .filter(line => line.startsWith('#'))
          .map(line => line.trim());
      }
    }

    return {
      success: true,
      data: Array.isArray(hashtags) ? hashtags : []
    };
  } catch (error) {
    console.error("Error enhancing hashtags with AI:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to generate hashtags"
    };
  }
};
