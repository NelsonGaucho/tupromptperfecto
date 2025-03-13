
// Fetch keywords from Reddit
export async function getRedditKeywords() {
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
