
import { getOpenAIKey, ApiResponse, handleOpenAIError } from './apiUtils';

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
      throw await handleOpenAIError(response);
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
