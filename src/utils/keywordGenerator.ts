import { sanitizeInput } from './security';
import { enhanceKeywordsWithAI } from '@/services/apiService';

// Interface for keyword data
interface Keyword {
  keyword: string;
  searchVolume: number;
  competition: number;
  difficulty: number;
  cpc: number;
}

// Helper function to randomize array elements
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate a random number within a range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to remove duplicates from an array
const getUniqueItems = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// Calculate keyword metrics based on various factors
const calculateKeywordMetrics = (
  keyword: string,
  industry: string = '',
  keywordType: string = 'all'
): Omit<Keyword, 'keyword'> => {
  // This is a simplified simulation of keyword metrics
  // In a real implementation, this would use data from SEO APIs
  
  const keywordLength = keyword.split(' ').length;
  const containsBrandOrLocation = /brand|city|location|place|store/i.test(keyword);
  const isQuestionKeyword = /^(how|what|why|where|when|who|which)/i.test(keyword);
  const isTransactional = /(buy|price|cost|cheap|affordable|discount|deal)/i.test(keyword);
  const isLongTail = keywordLength >= 3;
  
  // Base search volume ranges by type
  let baseVolumeMin = 500;
  let baseVolumeMax = 10000;
  
  // Competition varies by keyword type
  let baseCompetitionMin = 0.1;
  let baseCompetitionMax = 0.9;
  
  // Adjust based on keyword properties
  if (isLongTail) {
    baseVolumeMin = 50;
    baseVolumeMax = 1000;
    baseCompetitionMin = 0.05;
    baseCompetitionMax = 0.6;
  }
  
  if (isQuestionKeyword) {
    baseVolumeMin = 200;
    baseVolumeMax = 5000;
    baseCompetitionMin = 0.2;
    baseCompetitionMax = 0.7;
  }
  
  if (isTransactional) {
    baseVolumeMin = 300;
    baseVolumeMax = 8000;
    baseCompetitionMin = 0.4;
    baseCompetitionMax = 0.95;
  }
  
  if (containsBrandOrLocation) {
    baseVolumeMin = 100;
    baseVolumeMax = 3000;
    baseCompetitionMin = 0.1;
    baseCompetitionMax = 0.5;
  }
  
  // Adjust for industry if provided
  if (industry) {
    const competitiveIndustries = [
      'insurance', 'loans', 'credit', 'mortgage', 'lawyer', 'attorney',
      'finance', 'software', 'hosting', 'seo', 'marketing', 'cbd', 'casino'
    ];
    
    const isCompetitiveIndustry = competitiveIndustries.some(ind => 
      industry.toLowerCase().includes(ind)
    );
    
    if (isCompetitiveIndustry) {
      baseVolumeMin *= 1.5;
      baseVolumeMax *= 1.5;
      baseCompetitionMin += 0.2;
      baseCompetitionMax = Math.min(baseCompetitionMax + 0.2, 0.99);
    }
  }
  
  // Generate metrics
  const searchVolume = getRandomNumber(baseVolumeMin, baseVolumeMax);
  const competition = parseFloat((baseCompetitionMin + Math.random() * (baseCompetitionMax - baseCompetitionMin)).toFixed(2));
  
  // Calculate difficulty based on competition and keyword properties
  let difficultyBase = competition * 70;
  
  if (isLongTail) difficultyBase *= 0.8;
  if (keywordLength === 1) difficultyBase *= 1.4;
  if (isTransactional) difficultyBase *= 1.3;
  
  const difficulty = Math.min(Math.round(difficultyBase + getRandomNumber(-10, 10)), 100);
  
  // Calculate CPC based on competition and keyword properties
  let cpcBase = competition * 2;
  
  if (isTransactional) cpcBase *= 1.8;
  if (isLongTail) cpcBase *= 0.7;
  
  const cpc = parseFloat((cpcBase + Math.random()).toFixed(2));
  
  return {
    searchVolume,
    competition,
    difficulty,
    cpc
  };
};

// Generate keywords using both our algorithm and Perplexity API
export const generateKeywords = async (
  topic: string,
  description?: string,
  industry?: string,
  location?: string,
  keywordType: string = 'all'
): Promise<Keyword[]> => {
  // Sanitize inputs
  const sanitizedTopic = sanitizeInput(topic);
  const sanitizedDescription = description ? sanitizeInput(description) : '';
  const sanitizedIndustry = industry ? sanitizeInput(industry) : '';
  const sanitizedLocation = location ? sanitizeInput(location) : '';
  
  // Try to enhance keywords with AI first
  try {
    console.log(`Attempting to generate keywords for topic: ${topic} using AI`);
    
    const aiResult = await enhanceKeywordsWithAI(topic, industry);
    
    if (aiResult.success && aiResult.data && aiResult.data.length > 0) {
      console.log(`AI successfully generated ${aiResult.data.length} keywords`);
      
      // Return the AI-generated keywords
      return aiResult.data;
    }
    
    console.log("AI keyword generation failed or returned empty results, falling back to algorithm");
  } catch (error) {
    console.error("Error with AI keyword generation:", error);
    console.log("Falling back to algorithm");
  }
  
  // Fall back to the original algorithm if AI fails
  
  // Split topic into words for keyword combinations
  const topicWords = sanitizedTopic.toLowerCase().split(/\s+/);
  
  // Basic seed keywords from the topic
  const seedKeywords = [sanitizedTopic];
  
  // Add topic variations
  topicWords.forEach(word => {
    if (word.length > 3) {
      seedKeywords.push(word);
    }
  });
  
  // Generate informational keywords
  const informationalPrefixes = ['how to', 'what is', 'why', 'where to', 'when to', 'who', 'which', 'best', 'top', 'guide to'];
  const informationalKeywords = informationalPrefixes.map(prefix => `${prefix} ${sanitizedTopic}`);
  
  // Generate commercial keywords
  const commercialPrefixes = ['buy', 'price', 'cost', 'cheap', 'affordable', 'best', 'top', 'review', 'compare'];
  const commercialKeywords = commercialPrefixes.map(prefix => `${prefix} ${sanitizedTopic}`);
  
  // Generate navigational keywords
  const navigationalKeywords = [`${sanitizedTopic} website`, `${sanitizedTopic} official`, `${sanitizedTopic} brand`];
  
  // Generate transactional keywords
  const transactionalPrefixes = ['buy', 'order', 'purchase', 'discount', 'deal', 'coupon', 'sale'];
  const transactionalKeywords = transactionalPrefixes.map(prefix => `${prefix} ${sanitizedTopic}`);
  
  // Generate long tail keywords
  const longTailKeywords: string[] = [];
  
  // Create basic long tail combinations
  informationalPrefixes.forEach(prefix => {
    commercialPrefixes.forEach(suffix => {
      longTailKeywords.push(`${prefix} ${sanitizedTopic} ${suffix}`);
    });
  });
  
  // Add more specific long tail keywords
  longTailKeywords.push(
    `best ${sanitizedTopic} for beginners`,
    `how to use ${sanitizedTopic} effectively`,
    `${sanitizedTopic} tips and tricks`,
    `${sanitizedTopic} for small business`,
    `${sanitizedTopic} advanced guide`
  );
  
  // Include location if provided
  const localKeywords: string[] = [];
  if (sanitizedLocation) {
    localKeywords.push(
      `${sanitizedTopic} in ${sanitizedLocation}`,
      `${sanitizedTopic} ${sanitizedLocation}`,
      `best ${sanitizedTopic} in ${sanitizedLocation}`,
      `${sanitizedLocation} ${sanitizedTopic} services`
    );
  }
  
  // Combine all generated keywords
  let allKeywords: string[] = [
    ...seedKeywords,
    ...informationalKeywords,
    ...commercialKeywords,
    ...navigationalKeywords,
    ...transactionalKeywords,
    ...longTailKeywords,
    ...localKeywords
  ];
  
  // Filter by keyword type if specified
  if (keywordType !== 'all') {
    const typeMap: Record<string, string[]> = {
      'informational': informationalKeywords,
      'commercial': commercialKeywords,
      'navigational': navigationalKeywords,
      'transactional': transactionalKeywords,
      'longtail': longTailKeywords
    };
    
    allKeywords = typeMap[keywordType] || allKeywords;
  }
  
  // Get unique keywords
  const uniqueKeywords = getUniqueItems(allKeywords)
    .filter(keyword => keyword.length > 0)
    .slice(0, 30); // Limit to a reasonable number of keywords
  
  // Create keyword objects with metrics
  const keywordsWithMetrics: Keyword[] = uniqueKeywords.map(keyword => ({
    keyword,
    ...calculateKeywordMetrics(keyword, sanitizedIndustry, keywordType)
  }));
  
  // Sort by search volume by default
  keywordsWithMetrics.sort((a, b) => b.searchVolume - a.searchVolume);
  
  return keywordsWithMetrics;
};
