
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

// Fetch keywords from AnswerThePublic
export async function getAnswerThePublicKeywords() {
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
