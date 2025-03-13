
import { corsHeaders } from '../update_trending_keywords/db/supabaseClient.ts';
import { supabase } from '../update_trending_keywords/db/supabaseClient.ts';

// Interfaz para las etiquetas de YouTube
interface YouTubeTag {
  tag: string;
  source: string;
  trending_score?: number;
}

// Función para obtener etiquetas de YouTube Autocomplete
async function getYouTubeAutocompleteTags(keyword: string): Promise<YouTubeTag[]> {
  console.log(`Obteniendo sugerencias de YouTube Autocomplete para: ${keyword}`);
  
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(keyword)}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`Error en la respuesta de autocomplete: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const text = await response.text();
    
    if (!text || text.length === 0) {
      console.log('Respuesta vacía de autocomplete');
      return [];
    }
    
    try {
      // El resultado viene como una función de callback con un array JSON
      const jsonString = text.substring(text.indexOf('(') + 1, text.lastIndexOf(')'));
      const data = JSON.parse(jsonString);
      
      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        const suggestions = data[1];
        
        return suggestions.map((suggestion: string) => ({
          tag: suggestion.trim(),
          source: 'youtube_autocomplete',
          trending_score: 0.85 // Alta puntuación para las sugerencias directas de YouTube
        }));
      }
    } catch (parseError) {
      console.error('Error al analizar la respuesta de autocomplete:', parseError);
    }
    
    return [];
  } catch (error) {
    console.error('Error al obtener etiquetas de YouTube Autocomplete:', error);
    return [];
  }
}

// Función para obtener etiquetas populares de videos de YouTube
async function getYouTubePopularTags(keyword: string): Promise<YouTubeTag[]> {
  console.log(`Analizando etiquetas populares para: ${keyword}`);
  
  try {
    // Simular etiquetas populares basadas en categorías comunes
    const popularCategories = [
      'tutorial', 'review', 'gameplay', 'unboxing', 'how to', 'tips',
      'guide', 'reaction', 'challenge', 'vlog', 'shorts', 'music', 
      'documentary', 'commentary', 'educational', 'entertainment'
    ];
    
    // Combinar la palabra clave con categorías populares
    const tags = popularCategories.map(category => ({
      tag: `${keyword} ${category}`,
      source: 'youtube_popular',
      trending_score: 0.75
    }));
    
    // Añadir hashtags específicos de YouTube
    const youtubeSpecificTags = [
      '#YouTubeShorts', '#Shorts', '#ShortsFeed', '#YouTube',
      '#Trending', '#Viral', '#Tutorial', '#HowTo', '#YoutubeVideo'
    ].map(tag => ({
      tag,
      source: 'youtube_specific',
      trending_score: 0.8
    }));
    
    return [...tags, ...youtubeSpecificTags];
  } catch (error) {
    console.error('Error al generar etiquetas populares de YouTube:', error);
    return [];
  }
}

// Función para guardar las etiquetas en la base de datos
async function saveTagsToDatabase(keyword: string, tags: YouTubeTag[]): Promise<boolean> {
  console.log(`Guardando ${tags.length} etiquetas para: ${keyword}`);
  
  if (!tags || tags.length === 0) {
    console.log('No hay etiquetas para guardar');
    return false;
  }
  
  try {
    // Transformar las etiquetas al formato adecuado para la base de datos
    const formattedTags = tags.map(tag => tag.tag);
    
    // Para cada fuente, guardar las etiquetas correspondientes
    const sources = [...new Set(tags.map(tag => tag.source))];
    let savedSuccessfully = false;
    
    for (const source of sources) {
      const sourceTags = tags.filter(tag => tag.source === source);
      
      if (!sourceTags || sourceTags.length === 0) {
        continue;
      }
      
      const averageTrendingScore = sourceTags.reduce((sum, tag) => sum + (tag.trending_score || 0), 0) / sourceTags.length;
      
      const tagsToSave = sourceTags.map(tag => tag.tag);
      
      // Insertar o actualizar en la base de datos
      const { error } = await supabase
        .from('youtube_tags')
        .upsert({
          keyword,
          tags: tagsToSave,
          source,
          trending_score: averageTrendingScore,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'keyword,source'
        });
      
      if (error) {
        console.error(`Error al guardar etiquetas para fuente ${source}:`, error);
      } else {
        savedSuccessfully = true;
      }
    }
    
    if (savedSuccessfully) {
      console.log(`Etiquetas guardadas correctamente para: ${keyword}`);
      return true;
    } else {
      console.log(`No se pudieron guardar etiquetas para: ${keyword}`);
      return false;
    }
  } catch (error) {
    console.error('Error al guardar etiquetas en la base de datos:', error);
    return false;
  }
}

// Función principal para actualizar las etiquetas de YouTube
async function updateYouTubeTags(keyword?: string): Promise<YouTubeTag[]> {
  try {
    // Si no se proporciona una palabra clave, usar algunas predeterminadas
    const keywords = keyword ? [keyword] : [
      'gaming', 'tutorial', 'review', 'vlog', 'music', 'cooking',
      'fitness', 'technology', 'travel', 'beauty', 'fashion'
    ];
    
    let allTags: YouTubeTag[] = [];
    
    for (const kw of keywords) {
      if (!kw || kw.trim() === '') {
        console.log('Palabra clave vacía, omitiendo');
        continue;
      }
      
      console.log(`Procesando palabra clave: ${kw}`);
      
      // Obtener etiquetas de diferentes fuentes
      const autocompleteTags = await getYouTubeAutocompleteTags(kw);
      const popularTags = await getYouTubePopularTags(kw);
      
      // Combinar todas las etiquetas
      const combinedTags = [...autocompleteTags, ...popularTags];
      
      if (combinedTags.length === 0) {
        console.log(`No se encontraron etiquetas para: ${kw}`);
        continue;
      }
      
      // Eliminar duplicados
      const uniqueTags = Array.from(
        new Map(combinedTags.map(tag => [tag.tag.toLowerCase(), tag])).values()
      );
      
      // Guardar en la base de datos
      const saved = await saveTagsToDatabase(kw, uniqueTags);
      
      if (saved) {
        allTags = [...allTags, ...uniqueTags];
      }
    }
    
    return allTags;
  } catch (error) {
    console.error('Error al actualizar etiquetas de YouTube:', error);
    return [];
  }
}

// Endpoint principal
Deno.serve(async (req) => {
  // Manejar preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parsear el cuerpo de la solicitud
    let keyword;
    
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        keyword = body?.keyword;
      } catch (e) {
        console.log('No se proporcionó una palabra clave o el formato es inválido');
      }
    }
    
    // Actualizar etiquetas
    const tags = await updateYouTubeTags(keyword);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Etiquetas de YouTube actualizadas correctamente',
        count: tags.length
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error en la función de Edge:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});
