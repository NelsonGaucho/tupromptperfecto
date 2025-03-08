
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Header & Navigation
    "app.title": "TuPromptPerfecto",
    "app.subtitle": "Perfect Prompts for ChatGPT",
    "app.lang": "Language",
    
    // Step 1
    "step1.title": "What type of prompt do you need?",
    "step1.description": "Select the general theme for your prompt and provide a detailed description of what you need.",
    "step1.category.label": "Prompt category:",
    "step1.category.placeholder": "-- Select a category --",
    "step1.category.creative": "Creative writing (stories, poetry, scripts)",
    "step1.category.technical": "Technical content (programming, mathematics, science)",
    "step1.category.business": "Business and marketing",
    "step1.category.academic": "Academic content and research",
    "step1.category.personal": "Personal advice or planning",
    "step1.category.educational": "Education and teaching",
    "step1.category.other": "Other (specify in the description)",
    "step1.description.label": "Describe as detailed as possible what you need:",
    "step1.description.placeholder": "Example: I need to create a prompt to generate short science fiction stories set on Mars in the year 2150, with a focus on technological challenges and human relationships...",
    "step1.continue": "Continue",
    
    // Step 2
    "step2.title": "Additional Details",
    "step2.description": "Provide more information to customize your perfect prompt.",
    "step2.tone.label": "Desired tone and style:",
    "step2.tone.formal": "Formal and professional",
    "step2.tone.casual": "Casual and conversational",
    "step2.tone.academic": "Academic and technical",
    "step2.tone.creative": "Creative and imaginative",
    "step2.tone.persuasive": "Persuasive and convincing",
    "step2.tone.instructional": "Instructive and educational",
    "step2.length.label": "Preferred content length:",
    "step2.length.short": "Brief (paragraph or two)",
    "step2.length.medium": "Medium (several paragraphs)",
    "step2.length.long": "Extensive (full document)",
    "step2.length.flexible": "Flexible (no specific preference)",
    "step2.audience.label": "Target audience:",
    "step2.audience.placeholder": "E.g.: University students, technical professionals, general public...",
    "step2.format.label": "Specific format requirements:",
    "step2.format.placeholder": "E.g.: Bullets, numbered, tables, markdown...",
    "step2.notes.label": "Additional notes or restrictions:",
    "step2.notes.placeholder": "Any additional information you want to include in your prompt...",
    "step2.back": "Back",
    "step2.generate": "Generate Perfect Prompt",
    
    // Result
    "result.title": "Your Perfect Prompt for ChatGPT",
    "result.subtitle": "Use the following prompt to get the best results:",
    "result.copy": "Copy to Clipboard",
    "result.copied": "Copied!",
    "result.tips.title": "Tips for using your prompt:",
    "result.new": "Create New Prompt",
    
    // General Tips
    "tips.general1": "You can modify specific parts to adjust it to your exact needs.",
    "tips.general2": "If you need more detailed results, consider adding concrete examples.",
    "tips.general3": "For better consistency, use the same prompt in future conversations.",
    
    // Creative Tips
    "tips.creative1": "For stories, specify characters, setting, and emotional tone.",
    "tips.creative2": "Consider including an example of the style you're looking for.",
    "tips.creative3": "You can request variations of the same creative idea.",
    
    // Technical Tips
    "tips.technical1": "Specify the level of technical expertise you're assuming.",
    "tips.technical2": "Ask for code examples or formulas when relevant.",
    "tips.technical3": "Request step-by-step explanations for complex topics.",
    
    // Business Tips
    "tips.business1": "Include specific metrics or KPIs that interest you.",
    "tips.business2": "Specify the sector or industry to get more relevant answers.",
    "tips.business3": "Consider asking for specific presentation formats for reports.",
    
    // Academic Tips
    "tips.academic1": "Specify the citation style you prefer (APA, MLA, etc).",
    "tips.academic2": "Request that counterarguments be included for academic essays.",
    "tips.academic3": "Ask for suggestions for future research or additional readings.",
    
    // Personal Tips
    "tips.personal1": "Provide context about your current situation to get more personalized advice.",
    "tips.personal2": "Specify if you're looking for options with pros and cons or a direct recommendation.",
    "tips.personal3": "Consider asking for an action plan with concrete steps.",
    
    // Educational Tips
    "tips.educational1": "Specify the educational level of the target audience.",
    "tips.educational2": "Request practical activities or assessments when appropriate.",
    "tips.educational3": "Ask to include additional resources to delve deeper into the topic.",
    
    // Steps
    "steps.step": "Step",
    "steps.of": "of",
  },
  es: {
    // Header & Navigation
    "app.title": "TuPromptPerfecto",
    "app.subtitle": "Prompts Perfectos para ChatGPT",
    "app.lang": "Idioma",
    
    // Step 1
    "step1.title": "¿Qué tipo de prompt necesitas crear?",
    "step1.description": "Selecciona el tema general para tu prompt y proporciona una descripción detallada de lo que necesitas.",
    "step1.category.label": "Categoría del prompt:",
    "step1.category.placeholder": "-- Selecciona una categoría --",
    "step1.category.creative": "Escritura creativa (historias, poesía, guiones)",
    "step1.category.technical": "Contenido técnico (programación, matemáticas, ciencia)",
    "step1.category.business": "Negocios y marketing",
    "step1.category.academic": "Contenido académico e investigación",
    "step1.category.personal": "Consejo personal o planificación",
    "step1.category.educational": "Educación y enseñanza",
    "step1.category.other": "Otro (especificar en la descripción)",
    "step1.description.label": "Describe lo más detalladamente posible lo que necesitas:",
    "step1.description.placeholder": "Ejemplo: Necesito crear un prompt para generar historias cortas de ciencia ficción ambientadas en Marte en el año 2150, con un enfoque en los desafíos tecnológicos y las relaciones humanas...",
    "step1.continue": "Continuar",
    
    // Step 2
    "step2.title": "Detalles adicionales",
    "step2.description": "Proporciona más información para personalizar tu prompt perfecto.",
    "step2.tone.label": "Tono y estilo deseado:",
    "step2.tone.formal": "Formal y profesional",
    "step2.tone.casual": "Casual y conversacional",
    "step2.tone.academic": "Académico y técnico",
    "step2.tone.creative": "Creativo e imaginativo",
    "step2.tone.persuasive": "Persuasivo y convincente",
    "step2.tone.instructional": "Instructivo y educativo",
    "step2.length.label": "Longitud de contenido preferida:",
    "step2.length.short": "Breve (párrafo o dos)",
    "step2.length.medium": "Media (varios párrafos)",
    "step2.length.long": "Extensa (documento completo)",
    "step2.length.flexible": "Flexible (sin preferencia específica)",
    "step2.audience.label": "Audiencia objetivo:",
    "step2.audience.placeholder": "Ej: Estudiantes universitarios, profesionales técnicos, público general...",
    "step2.format.label": "Requisitos de formato específicos:",
    "step2.format.placeholder": "Ej: Bullets, numerado, tablas, markdown...",
    "step2.notes.label": "Notas o restricciones adicionales:",
    "step2.notes.placeholder": "Cualquier información adicional que quieras incluir en tu prompt...",
    "step2.back": "Atrás",
    "step2.generate": "Generar Prompt Perfecto",
    
    // Result
    "result.title": "Tu Prompt Perfecto para ChatGPT",
    "result.subtitle": "Utiliza el siguiente prompt para obtener los mejores resultados:",
    "result.copy": "Copiar al Portapapeles",
    "result.copied": "¡Copiado!",
    "result.tips.title": "Consejos para usar tu prompt:",
    "result.new": "Crear Nuevo Prompt",
    
    // General Tips
    "tips.general1": "Puedes modificar partes específicas para ajustarlo a tus necesidades exactas.",
    "tips.general2": "Si necesitas resultados más detallados, considera agregar ejemplos concretos.",
    "tips.general3": "Para mejorar la consistencia, utiliza el mismo prompt en conversaciones futuras.",
    
    // Creative Tips
    "tips.creative1": "Para historias, especifica personajes, escenario y tono emocional.",
    "tips.creative2": "Considera incluir un ejemplo del estilo que buscas.",
    "tips.creative3": "Puedes solicitar variaciones de la misma idea creativa.",
    
    // Technical Tips
    "tips.technical1": "Especifica el nivel de experiencia técnica que asumes.",
    "tips.technical2": "Pide ejemplos de código o fórmulas cuando sea relevante.",
    "tips.technical3": "Solicita explicaciones paso a paso para temas complejos.",
    
    // Business Tips
    "tips.business1": "Incluye métricas o KPIs específicos que te interesan.",
    "tips.business2": "Especifica el sector o industria para obtener respuestas más relevantes.",
    "tips.business3": "Considera pedir formatos de presentación específicos para reportes.",
    
    // Academic Tips
    "tips.academic1": "Especifica el estilo de citación que prefieres (APA, MLA, etc).",
    "tips.academic2": "Solicita que se incluyan contraargumentos para ensayos académicos.",
    "tips.academic3": "Pide sugerencias para futuras investigaciones o lecturas adicionales.",
    
    // Personal Tips
    "tips.personal1": "Proporciona contexto sobre tu situación actual para obtener consejos más personalizados.",
    "tips.personal2": "Especifica si buscas opciones con pros y contras o una recomendación directa.",
    "tips.personal3": "Considera pedir un plan de acción con pasos concretos.",
    
    // Educational Tips
    "tips.educational1": "Especifica el nivel educativo de la audiencia objetivo.",
    "tips.educational2": "Solicita actividades prácticas o evaluaciones cuando sea apropiado.",
    "tips.educational3": "Pide que se incluyan recursos adicionales para profundizar en el tema.",
    
    // Steps
    "steps.step": "Paso",
    "steps.of": "de",
  },
  // Add more languages as needed
};

export default translations;
