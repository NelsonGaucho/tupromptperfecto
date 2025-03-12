
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { load } from 'https://esm.sh/cheerio@1.0.0-rc.12'
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

// Definir los encabezados CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Crear cliente Supabase
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Función para extraer términos de Google Trends
async function getGoogleTrendsKeywords() {
  console.log('Extrayendo términos de Google Trends')
  try {
    const categories = ['chatgpt', 'ai prompt', 'artificial intelligence']
    const keywords = []

    for (const category of categories) {
      // La URL de Google Trends Daily Search Trends
      const url = `https://trends.google.com/trends/trendingsearches/daily?geo=US&q=${encodeURIComponent(category)}`
      console.log(`Consultando URL: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })
      
      const html = await response.text()
      console.log(`Respuesta recibida, tamaño: ${html.length} bytes`)
      
      // Usar cheerio para parsear el HTML
      const $ = load(html)
      
      // Extraer términos de tendencia
      $('.title').each((_, el) => {
        const keyword = $(el).text().trim()
        if (keyword) {
          keywords.push({
            keyword,
            source: 'google_trends',
            trending_score: 0.9 // Puntaje arbitrario alto para Google Trends
          })
          console.log(`Encontrado término: ${keyword}`)
        }
      })
    }
    
    return keywords
  } catch (error) {
    console.error('Error obteniendo keywords de Google Trends:', error)
    return []
  }
}

// Función para extraer términos de Reddit
async function getRedditKeywords() {
  console.log('Extrayendo términos de Reddit')
  try {
    const subreddits = ['ChatGPT', 'PromptEngineering', 'ArtificialIntelligence']
    const keywords = []

    for (const subreddit of subreddits) {
      // Usar la API de Reddit para obtener posts populares
      const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=20`
      console.log(`Consultando URL: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })
      
      const data = await response.json()
      console.log(`Respuesta recibida, contiene ${data.data?.children?.length || 0} posts`)
      
      // Extraer títulos de posts y keywords
      for (const post of data.data?.children || []) {
        const title = post.data.title
        // Extraer palabras clave (palabras de 4+ caracteres)
        const words = title.split(/\s+/)
          .filter(word => word.length >= 4 && !word.match(/^\W+$/))
          .map(word => word.toLowerCase().replace(/^\W+|\W+$/g, ''))
        
        // Eliminar duplicados
        const uniqueWords = [...new Set(words)]
        
        for (const word of uniqueWords) {
          // Solo añadir si es relevante (no stopwords, etc.)
          if (word && !['this', 'that', 'with', 'from', 'have', 'what'].includes(word)) {
            keywords.push({
              keyword: word,
              source: `reddit_${subreddit}`,
              trending_score: 0.8 // Valor arbitrario para Reddit
            })
            console.log(`Encontrado término en Reddit: ${word}`)
          }
        }
      }
    }
    
    return keywords
  } catch (error) {
    console.error('Error obteniendo keywords de Reddit:', error)
    return []
  }
}

// Función para extraer términos de AnswerThePublic
async function getAnswerThePublicKeywords() {
  console.log('Extrayendo términos de AnswerThePublic')
  try {
    const queries = ['chatgpt prompt', 'ai assistant']
    const keywords = []

    for (const query of queries) {
      const url = `https://answerthepublic.com/data?q=${encodeURIComponent(query)}&country=us`
      console.log(`Consultando URL: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })
      
      const html = await response.text()
      console.log(`Respuesta recibida, tamaño: ${html.length} bytes`)
      
      // Parsear el HTML
      const document = new DOMParser().parseFromString(html, 'text/html')
      
      // Encontrar todos los elementos que contienen preguntas
      const questions = document?.querySelectorAll('.question-wrapper .text')
      console.log(`Encontradas ${questions?.length || 0} preguntas`)
      
      for (const question of questions || []) {
        const text = question.textContent?.trim()
        if (text && text.length > 5) {
          keywords.push({
            keyword: text,
            source: 'answer_the_public',
            trending_score: 0.7 // Valor arbitrario para ATP
          })
          console.log(`Encontrado término en ATP: ${text}`)
        }
      }
    }
    
    return keywords
  } catch (error) {
    console.error('Error obteniendo keywords de AnswerThePublic:', error)
    return []
  }
}

// Función para actualizar la base de datos en Supabase
async function updateTrendingKeywords(keywords) {
  console.log(`Actualizando ${keywords.length} keywords en Supabase`)
  if (!keywords.length) return

  try {
    // Primero, obtener las categorías
    const { data: categories, error: catError } = await supabase
      .from('prompt_categories')
      .select('id, name, slug')
    
    if (catError) {
      throw catError
    }
    
    console.log(`Encontradas ${categories.length} categorías`)
    
    // Para cada keyword, asignar a una categoría
    const keywordsToInsert = keywords.map(keyword => {
      // Asignar a categoría basada en keywords
      let categoryId = null
      
      // Reglas simples para asignar categorías
      const kw = keyword.keyword.toLowerCase()
      if (kw.includes('marketing') || kw.includes('seo') || kw.includes('sales')) {
        categoryId = categories.find(c => c.slug === 'marketing')?.id
      } else if (kw.includes('education') || kw.includes('learn') || kw.includes('study')) {
        categoryId = categories.find(c => c.slug === 'education')?.id
      } else if (kw.includes('art') || kw.includes('design') || kw.includes('creative')) {
        categoryId = categories.find(c => c.slug === 'creativity')?.id
      } else if (kw.includes('productivity') || kw.includes('workflow') || kw.includes('efficiency')) {
        categoryId = categories.find(c => c.slug === 'productivity')?.id
      } else if (kw.includes('personal') || kw.includes('growth') || kw.includes('develop')) {
        categoryId = categories.find(c => c.slug === 'personal-development')?.id
      } else {
        // Por defecto asignar a viral
        categoryId = categories.find(c => c.slug === 'viral')?.id
      }
      
      return {
        ...keyword,
        category_id: categoryId,
        last_updated: new Date().toISOString()
      }
    })
    
    // Insertar en la base de datos, ignorando duplicados
    const { data, error } = await supabase
      .from('trending_keywords')
      .upsert(keywordsToInsert, { 
        onConflict: 'keyword,source',  // Evitar duplicados basados en keyword y source
        ignoreDuplicates: false        // Actualizar si ya existe
      })
    
    if (error) {
      throw error
    }
    
    console.log(`Insertadas/actualizadas ${keywordsToInsert.length} keywords`)
    return data
  } catch (error) {
    console.error('Error actualizando keywords en la base de datos:', error)
    throw error
  }
}

// Generar templates de prompts basados en categorías
async function generatePromptTemplates() {
  console.log('Generando templates de prompts')
  try {
    // Obtener las categorías
    const { data: categories, error: catError } = await supabase
      .from('prompt_categories')
      .select('*')
    
    if (catError) throw catError
    
    const templates = []
    
    for (const category of categories) {
      // Template básico por categoría
      let template = ''
      let title = ''
      
      switch(category.slug) {
        case 'viral':
          title = 'Prompt viral para contenido de redes sociales'
          template = 'Crea contenido viral sobre {keyword1} que pueda generar engagement en redes sociales. Incluye {keyword2} como tema secundario y asegúrate de que el contenido sea compartible y con potencial de hacerse viral. El formato debe ser llamativo, con títulos atractivos y fácil de leer en dispositivos móviles.';
          break;
        case 'marketing':
          title = 'Estrategia de marketing basada en tendencias'
          template = 'Desarrolla una estrategia de marketing para {keyword1} enfocada en aumentar conversiones. Incluye tácticas relacionadas con {keyword2}, mejores prácticas SEO, y un plan para redes sociales. La estrategia debe ser medible, con KPIs claros y adaptable a diferentes audiencias.';
          break;
        case 'education':
          title = 'Plan educativo estructurado'
          template = 'Crea un plan educativo completo sobre {keyword1} para estudiantes de nivel intermedio. Incluye conceptos de {keyword2}, ejercicios prácticos, evaluaciones y recursos adicionales. El plan debe seguir principios pedagógicos sólidos y permitir el seguimiento del progreso.';
          break;
        case 'creativity':
          title = 'Generador de ideas creativas'
          template = 'Genera 10 ideas creativas relacionadas con {keyword1} para un proyecto innovador. Incorpora elementos de {keyword2} y asegúrate de que las ideas sean originales, factibles y con potencial de desarrollo. Incluye una breve descripción de cada idea y posibles aplicaciones.';
          break;
        case 'productivity':
          title = 'Sistema de productividad optimizado'
          template = 'Diseña un sistema de productividad enfocado en {keyword1} para profesionales ocupados. Integra métodos para gestionar {keyword2} eficientemente, técnicas de gestión del tiempo, y herramientas recomendadas. El sistema debe ser simple de implementar y mantener a largo plazo.';
          break;
        case 'personal-development':
          title = 'Plan de desarrollo personal transformador'
          template = 'Crea un plan de desarrollo personal centrado en mejorar habilidades de {keyword1} durante 30 días. Incluye ejercicios diarios relacionados con {keyword2}, reflexiones guiadas, y métodos para medir el progreso. El plan debe ser realista, motivador y adaptable a diferentes niveles de experiencia.';
          break;
        default:
          title = 'Prompt general optimizado'
          template = 'Genera contenido detallado sobre {keyword1} incluyendo aspectos de {keyword2}. Estructura la información de manera clara, con introducción, desarrollo y conclusión. Incluye datos relevantes y ejemplos prácticos para mejorar la comprensión del tema.';
      }
      
      // Verificar si ya existe un template similar
      const { data: existingTemplates, error: tmplError } = await supabase
        .from('prompt_templates')
        .select('*')
        .eq('category_id', category.id)
        .limit(1)
      
      if (tmplError) throw tmplError
      
      // Solo insertar si no existe
      if (!existingTemplates || existingTemplates.length === 0) {
        templates.push({
          category_id: category.id,
          title,
          template,
          description: `Template optimizado para la categoría ${category.name}`,
          usage_count: 0,
          rating: 0
        })
      }
    }
    
    // Insertar los templates generados
    if (templates.length > 0) {
      const { data, error } = await supabase
        .from('prompt_templates')
        .insert(templates)
      
      if (error) throw error
      
      console.log(`Insertados ${templates.length} templates de prompts`)
      return data
    } else {
      console.log('No se crearon nuevos templates (ya existen)')
      return []
    }
    
  } catch (error) {
    console.error('Error generando templates de prompts:', error)
    return []
  }
}

// Función principal que maneja las peticiones
Deno.serve(async (req) => {
  // Manejar preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  if (req.method === 'POST') {
    try {
      console.log('Iniciando actualización de keywords y templates')
      
      // 1. Obtener keywords de diferentes fuentes
      const googleTrendsKeywords = await getGoogleTrendsKeywords()
      console.log(`Obtenidas ${googleTrendsKeywords.length} keywords de Google Trends`)
      
      const redditKeywords = await getRedditKeywords()
      console.log(`Obtenidas ${redditKeywords.length} keywords de Reddit`)
      
      const atpKeywords = await getAnswerThePublicKeywords()
      console.log(`Obtenidas ${atpKeywords.length} keywords de AnswerThePublic`)
      
      // 2. Combinar todas las keywords
      const allKeywords = [
        ...googleTrendsKeywords,
        ...redditKeywords,
        ...atpKeywords
      ]
      
      console.log(`Total de ${allKeywords.length} keywords obtenidas`)
      
      // 3. Actualizar la base de datos
      await updateTrendingKeywords(allKeywords)
      
      // 4. Generar templates si no existen
      await generatePromptTemplates()
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Actualización completada',
          stats: {
            googleTrends: googleTrendsKeywords.length,
            reddit: redditKeywords.length,
            answerThePublic: atpKeywords.length,
            total: allKeywords.length
          }
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200
        }
      )
    } catch (error) {
      console.error('Error en la función edge:', error)
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
      )
    }
  }
  
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Método no permitido'
    }),
    {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 405
    }
  )
})
