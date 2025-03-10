// API keys
const OPENAI_API_KEY = "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";
const PERPLEXITY_API_KEY = "sk-17004fc0721948948c91a572d9fff500";

// Interface for API response
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
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
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
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

// Function to generate better SEO keywords using Perplexity API
export const enhanceKeywordsWithAI = async (
  topic: string,
  industry?: string,
  count: number = 20
): Promise<ApiResponse> => {
  try {
    const prompt = `Generate ${count} of the most effective SEO keywords for the topic "${topic}"${industry ? ` in the ${industry} industry` : ''}.
    Include a mix of high-volume and long-tail keywords to maximize search visibility.
    Format the result as a JSON array of objects with the following structure: 
    [{"keyword": "example keyword", "searchVolume": 1000, "competition": 0.5, "difficulty": 30, "cpc": 1.20}]
    Only include the keyword data, no explanations.`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO expert who specializes in keyword research and analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000,
        return_images: false,
        return_related_questions: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Perplexity API error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    let keywords;
    
    try {
      // Try to parse the keywords from the response
      const content = data.choices[0].message.content;
      keywords = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse keywords:", e);
      return {
        success: false,
        error: "Failed to parse keywords data"
      };
    }

    return {
      success: true,
      data: Array.isArray(keywords) ? keywords : []
    };
  } catch (error) {
    console.error("Error enhancing keywords with AI:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to generate keywords"
    };
  }
};

// Function to query ChatGPT API
export const queryChatGPT = async (
  prompt: string,
  model: string = "gpt-4o-mini",
  temperature: number = 0.7
): Promise<ApiResponse> => {
  try {
    // Validate inputs
    if (!prompt.trim()) {
      throw new Error("Prompt cannot be empty");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return {
      success: true,
      data: {
        text: content,
        model: model,
        usage: data.usage
      }
    };
  } catch (error) {
    console.error("Error querying ChatGPT:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to query ChatGPT"
    };
  }
};
