
import { getOpenAIKey, ApiResponse, handleOpenAIError } from './apiUtils';

// Function to generate SEO keywords using OpenAI
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
            content: "You are an SEO expert who specializes in keyword research and analysis."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw await handleOpenAIError(response);
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
