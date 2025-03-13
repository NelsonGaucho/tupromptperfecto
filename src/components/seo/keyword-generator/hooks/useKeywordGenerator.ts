
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateKeywords } from '@/utils/keywordGenerator';
import { Keyword } from '../types';

export const useKeywordGenerator = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Keyword | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });

  const generateKeywordsHandler = async (
    sanitizedTopic: string,
    sanitizedDescription: string,
    sanitizedIndustry: string,
    sanitizedLocation: string,
    keywordType: string
  ) => {
    setLoading(true);
    
    try {
      // Generate keywords based on the inputs
      const result = await generateKeywords(
        sanitizedTopic, 
        sanitizedDescription, 
        sanitizedIndustry, 
        sanitizedLocation, 
        keywordType
      );
      
      setKeywords(result);
      
      toast({
        title: "¡Palabras clave generadas!",
        description: `Se han generado ${result.length} palabras clave para SEO`,
      });
    } catch (error) {
      console.error('Error generating keywords:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al generar las palabras clave. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshKeywords = async (
    sanitizedTopic: string,
    sanitizedDescription: string,
    sanitizedIndustry: string,
    sanitizedLocation: string,
    keywordType: string
  ) => {
    if (!sanitizedTopic.trim()) return;
    
    setLoading(true);
    
    try {
      // Regenerate keywords with slightly different results
      const result = await generateKeywords(
        sanitizedTopic, 
        sanitizedDescription, 
        sanitizedIndustry, 
        sanitizedLocation, 
        keywordType
      );
      
      setKeywords(result);
      
      toast({
        title: "¡Palabras clave actualizadas!",
        description: `Se han regenerado las palabras clave para SEO`,
      });
    } catch (error) {
      console.error('Error refreshing keywords:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar las palabras clave. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof Keyword) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  return {
    keywords,
    loading,
    sortConfig,
    generateKeywordsHandler,
    refreshKeywords,
    handleSort,
  };
};
