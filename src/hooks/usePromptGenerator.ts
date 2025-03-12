
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, TrendingKeyword, PromptTemplate } from '@/types/prompt';

export function usePromptGenerator() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Error al cargar las categorías');
    } finally {
      setLoading(false); // Corrected: using setLoading as a function instead of reassigning
    }
  };

  const generatePrompt = async (categoryId: string, keywords: string[]) => {
    try {
      const { data: templates } = await supabase
        .from('prompt_templates')
        .select('*')
        .eq('category_id', categoryId)
        .limit(1);

      if (!templates?.length) return null;

      // Obtener palabras clave relacionadas
      const { data: trendingKeywords } = await supabase
        .from('trending_keywords')
        .select('keyword')
        .eq('category_id', categoryId)
        .order('trending_score', { ascending: false })
        .limit(5);

      const template = templates[0];
      let prompt = template.template;

      // Reemplazar placeholders con keywords
      keywords.forEach((keyword, index) => {
        prompt = prompt.replace(`{keyword${index + 1}}`, keyword);
      });

      // Añadir palabras clave trending si hay espacio
      if (trendingKeywords?.length) {
        prompt += "\n\nConsideraciones adicionales basadas en tendencias actuales:\n";
        trendingKeywords.forEach(({ keyword }) => {
          prompt += `- Incluye perspectivas sobre: ${keyword}\n`;
        });
      }

      return prompt;
    } catch (err) {
      console.error('Error generating prompt:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    generatePrompt,
  };
}
