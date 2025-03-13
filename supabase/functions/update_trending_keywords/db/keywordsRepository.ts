
import { supabase } from './supabaseClient.ts'

// Función para actualizar la base de datos en Supabase
export async function updateTrendingKeywords(keywords) {
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
