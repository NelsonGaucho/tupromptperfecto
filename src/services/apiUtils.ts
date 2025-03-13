
// Common API utilities and configuration

// Constants for storage keys
export const OPENAI_KEY_STORAGE = 'openai_api_key';

// Function to get the OpenAI API key from localStorage or use fallback
export const getOpenAIKey = (): string => {
  const localKey = localStorage.getItem(OPENAI_KEY_STORAGE);
  // Clave fallback por si no hay una guardada en localStorage
  const fallbackKey = "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";
  
  return localKey || fallbackKey;
};

// Interface for API response used across all services
export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Function to handle OpenAI API errors and responses
export const handleOpenAIError = async (response: Response): Promise<never> => {
  const errorData = await response.json();
  console.error("OpenAI API error:", errorData);
  throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
};
