
// Fetch keywords from Google Trends
export async function getGoogleTrendsKeywords() {
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
      const $ = (await import('https://esm.sh/cheerio@1.0.0-rc.12')).load(html)
      
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
