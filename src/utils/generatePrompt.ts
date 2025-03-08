
import { sanitizeInput } from './security';

interface PromptData {
  promptType: string;
  promptDescription: string;
  toneStyle: string;
  contentLength: string;
  audience: string;
  formatRequirements: string;
  additionalNotes: string;
}

// Sanitize all inputs before using them
const sanitizePromptData = (data: PromptData): PromptData => {
  return {
    promptType: sanitizeInput(data.promptType),
    promptDescription: sanitizeInput(data.promptDescription),
    toneStyle: sanitizeInput(data.toneStyle),
    contentLength: sanitizeInput(data.contentLength),
    audience: sanitizeInput(data.audience),
    formatRequirements: sanitizeInput(data.formatRequirements),
    additionalNotes: sanitizeInput(data.additionalNotes),
  };
};

export const getTypeDescription = (type: string): string => {
  const typeDescriptions: Record<string, string> = {
    'creative': 'escritura creativa y narrativa',
    'technical': 'contenido técnico y especializado',
    'business': 'estrategias de negocios y marketing',
    'academic': 'redacción académica e investigación',
    'personal': 'desarrollo personal y planificación',
    'educational': 'contenido educativo y didáctico',
    'other': 'el tema que voy a describir'
  };
  
  return typeDescriptions[type] || 'el tema solicitado';
};

export const getToneDescription = (tone: string): string => {
  const toneDescriptions: Record<string, string> = {
    'formal': 'formal y profesional',
    'casual': 'casual y conversacional',
    'academic': 'académico y técnico',
    'creative': 'creativo e imaginativo',
    'persuasive': 'persuasivo y convincente',
    'instructional': 'instructivo y educativo'
  };
  
  return toneDescriptions[tone] || 'apropiado para el contexto';
};

export const getLengthDescription = (length: string): string => {
  const lengthDescriptions: Record<string, string> = {
    'short': 'breve (1-2 párrafos)',
    'medium': 'media (3-5 párrafos)',
    'long': 'extensa (documento detallado)',
    'flexible': 'adaptada al contenido requerido'
  };
  
  return lengthDescriptions[length] || 'apropiada para el contexto';
};

export const generatePrompt = (data: PromptData): string => {
  // Sanitize all input data to prevent XSS
  const sanitizedData = sanitizePromptData(data);
  
  // Create the prompt based on the template and user data
  let promptTemplate = '';
  
  // Introduction of the prompt
  promptTemplate += `Actúa como un experto en ${getTypeDescription(sanitizedData.promptType)}.\n\n`;
  
  // Main description
  promptTemplate += `Necesito tu ayuda con lo siguiente: ${sanitizedData.promptDescription}\n\n`;
  
  // Specific instructions section
  promptTemplate += `Instrucciones específicas:\n`;
  
  // Tone and style
  promptTemplate += `- Utiliza un tono ${getToneDescription(sanitizedData.toneStyle)}.\n`;
  
  // Content length
  promptTemplate += `- La respuesta debe ser de longitud ${getLengthDescription(sanitizedData.contentLength)}.\n`;
  
  // Target audience if provided
  if (sanitizedData.audience) {
    promptTemplate += `- El contenido debe estar dirigido a: ${sanitizedData.audience}.\n`;
  }
  
  // Format requirements if provided
  if (sanitizedData.formatRequirements) {
    promptTemplate += `- Formato requerido: ${sanitizedData.formatRequirements}.\n`;
  }
  
  // Additional notes if provided
  if (sanitizedData.additionalNotes) {
    promptTemplate += `\nConsideraciones adicionales:\n${sanitizedData.additionalNotes}\n`;
  }
  
  // Instructions to improve the quality of the response
  promptTemplate += `\nPor favor, proporciona una respuesta detallada, estructurada y de alta calidad. Si encuentras ambigüedades en mi solicitud, indica cuáles son tus suposiciones. Sé creativo pero preciso en tu respuesta.`;
  
  return promptTemplate;
};

export const generateTips = (promptType: string): string[] => {
  // General tips for all prompt types
  const generalTips = [
    'tips.general1',
    'tips.general2',
    'tips.general3',
  ];
  
  // Specific tips based on prompt type
  const specificTips: Record<string, string[]> = {
    'creative': [
      'tips.creative1',
      'tips.creative2',
      'tips.creative3',
    ],
    'technical': [
      'tips.technical1',
      'tips.technical2',
      'tips.technical3',
    ],
    'business': [
      'tips.business1',
      'tips.business2',
      'tips.business3',
    ],
    'academic': [
      'tips.academic1',
      'tips.academic2',
      'tips.academic3',
    ],
    'personal': [
      'tips.personal1',
      'tips.personal2',
      'tips.personal3',
    ],
    'educational': [
      'tips.educational1',
      'tips.educational2',
      'tips.educational3',
    ],
  };
  
  // Add specific tips if available for the selected type
  const allTips = [...generalTips];
  if (specificTips[promptType]) {
    allTips.push(...specificTips[promptType]);
  }
  
  return allTips;
};
