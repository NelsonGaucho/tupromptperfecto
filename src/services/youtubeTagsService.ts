
import { supabase } from '@/integrations/supabase/client';
import { ApiResponse } from './apiUtils';
import { enhanceHashtagsWithAI } from './hashtagService';

// Obtener etiquetas para YouTube desde la base de datos
export const getYouTubeTags = async (keyword: string): Promise<ApiResponse> => {
  try {
    console.log(`Buscando etiquetas para YouTube para: ${keyword}`);
    
    // Buscar etiquetas en la base de datos
    const { data, error } = await supabase
      .from('youtube_tags')
      .select('*')
      .ilike('keyword', `%${keyword}%`)
      .order('trending_score', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    // Si encontramos resultados, devolverlos
    if (data && data.length > 0) {
      console.log(`Se encontraron ${data.length} conjuntos de etiquetas en la base de datos`);
      
      // Combinar todas las etiquetas de diferentes fuentes
      let allTags: string[] = [];
      
      for (const result of data) {
        const tags = result.tags as string[];
        allTags = [...allTags, ...tags];
      }
      
      // Eliminar duplicados y formatear
      const uniqueTags = [...new Set(allTags)];
      const formattedTags = uniqueTags.map(tag => tag.startsWith('#') ? tag : `#${tag}`);
      
      // Dividir en populares y de nicho
      const popular = formattedTags.slice(0, Math.min(10, formattedTags.length));
      const niche = formattedTags.slice(10);
      
      // Formatear para YouTube (sin #)
      const formattedForYoutube = formattedTags
        .map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
        .join(', ');
      
      return {
        success: true,
        data: {
          all: formattedTags,
          popular,
          niche,
          formattedForYoutube
        }
      };
    }
    
    // Si no hay resultados en la base de datos, intentar actualizar desde la Edge Function
    console.log('No se encontraron etiquetas en la base de datos, invocando Edge Function');
    
    try {
      // Invocar la Edge Function para obtener nuevas etiquetas
      const { data: functionData, error: functionError } = await supabase.functions.invoke('update_youtube_tags', {
        body: { keyword }
      });
      
      if (functionError) {
        console.error('Error al invocar Edge Function:', functionError);
        // Continuar con AI como fallback
      } else {
        console.log('Edge Function ejecutada correctamente');
        
        // Volver a consultar la base de datos después de actualizar
        const { data: refreshedData, error: refreshedError } = await supabase
          .from('youtube_tags')
          .select('*')
          .ilike('keyword', `%${keyword}%`)
          .order('trending_score', { ascending: false });
        
        if (!refreshedError && refreshedData && refreshedData.length > 0) {
          // Procesar y devolver los datos actualizados
          let allTags: string[] = [];
          
          for (const result of refreshedData) {
            const tags = result.tags as string[];
            allTags = [...allTags, ...tags];
          }
          
          // Eliminar duplicados y formatear
          const uniqueTags = [...new Set(allTags)];
          const formattedTags = uniqueTags.map(tag => tag.startsWith('#') ? tag : `#${tag}`);
          
          // Dividir en populares y de nicho
          const popular = formattedTags.slice(0, Math.min(10, formattedTags.length));
          const niche = formattedTags.slice(10);
          
          // Formatear para YouTube (sin #)
          const formattedForYoutube = formattedTags
            .map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
            .join(', ');
          
          return {
            success: true,
            data: {
              all: formattedTags,
              popular,
              niche,
              formattedForYoutube
            }
          };
        }
      }
    } catch (functionCallError) {
      console.error('Error en la llamada a la Edge Function:', functionCallError);
      // Continuar con AI como fallback
    }
    
    // Si todo lo demás falla, utilizar la generación de OpenAI
    console.log('Usando OpenAI como fallback para generar etiquetas');
    return await enhanceHashtagsWithAI('youtube', keyword);
  } catch (error) {
    console.error('Error al obtener etiquetas de YouTube:', error);
    return {
      success: false,
      error: (error as Error).message || "No se pudieron obtener las etiquetas para YouTube"
    };
  }
};

// Función para actualizar manualmente las etiquetas de YouTube
export const refreshYouTubeTags = async (keyword: string): Promise<ApiResponse> => {
  try {
    console.log(`Actualizando manualmente etiquetas para: ${keyword}`);
    
    // Invocar la Edge Function para obtener nuevas etiquetas
    const { data, error } = await supabase.functions.invoke('update_youtube_tags', {
      body: { keyword }
    });
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error al actualizar etiquetas de YouTube:', error);
    return {
      success: false,
      error: (error as Error).message || "No se pudieron actualizar las etiquetas"
    };
  }
};
