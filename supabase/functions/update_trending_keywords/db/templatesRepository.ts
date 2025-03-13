
import { supabase } from './supabaseClient.ts'

// Generar templates de prompts basados en categorías
export async function generatePromptTemplates() {
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
