
// Importar los módulos necesarios
import { corsHeaders } from './db/supabaseClient.ts';
import { updateTrendingKeywords } from './db/keywordsRepository.ts';
import { generatePromptTemplates } from './db/templatesRepository.ts';
import { getGoogleTrendsKeywords } from './sources/googleTrends.ts';
import { getRedditKeywords } from './sources/reddit.ts';
import { getAnswerThePublicKeywords } from './sources/answerThePublic.ts';

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
