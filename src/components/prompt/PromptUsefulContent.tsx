
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PromptUsefulContent = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "¡Copiado!",
      description: "El ejemplo ha sido copiado al portapapeles"
    });
  };

  const exampleSEO = `Actúa como un experto en SEO. Crea un artículo completo sobre [tema] optimizado para SEO. 
Incluye una introducción atractiva, al menos 5 subtítulos H2, bullet points donde sea 
relevante, y una conclusión. Incorpora de forma natural las siguientes palabras clave: 
[lista de palabras clave]. El artículo debe tener aproximadamente 1500 palabras y estar 
dirigido a [audiencia objetivo].`;

  const exampleMarket = `Actúa como un analista de mercado experto en [industria]. Realiza un análisis DAFO 
(Debilidades, Amenazas, Fortalezas, Oportunidades) detallado para una empresa de [tipo de negocio] 
que quiere expandirse al mercado de [ubicación]. Incluye factores económicos, tecnológicos, 
sociales y regulatorios. Para cada punto, proporciona una explicación de 2-3 frases y una 
recomendación estratégica.`;

  const exampleSocial = `Como estratega de contenido para redes sociales, crea 10 ideas de publicaciones para 
[plataforma] para promocionar [producto/servicio]. Cada idea debe incluir: un título 
llamativo, el texto completo para la publicación (máximo 280 caracteres), 3 hashtags 
relevantes, y una breve descripción del tipo de imagen o video que acompañaría la 
publicación. El tono debe ser [formal/casual/inspirador] y dirigido a [demografía].`;

  return (
    <div className="mt-16 prose prose-lg max-w-3xl mx-auto text-muted-foreground">
      <h2 className="text-2xl font-semibold text-foreground">Guía Completa: Cómo Usar Prompts Efectivos con ChatGPT</h2>
      
      <h3 className="text-xl font-medium text-foreground mt-6">¿Por qué son importantes los prompts bien formulados?</h3>
      <p>
        Un prompt bien formulado es la diferencia entre obtener una respuesta genérica y una respuesta 
        detallada, precisa y realmente útil de ChatGPT. Los prompts actúan como instrucciones que guían 
        al modelo de IA para generar el tipo exacto de contenido que necesitas.
      </p>
      
      <h3 className="text-xl font-medium text-foreground mt-6">Anatomía de un prompt efectivo</h3>
      <p>Un prompt efectivo generalmente contiene estos elementos:</p>
      <ol className="list-decimal pl-5 space-y-2">
        <li><strong>Contexto claro:</strong> Proporciona suficiente información de fondo.</li>
        <li><strong>Instrucción específica:</strong> Define exactamente lo que necesitas.</li>
        <li><strong>Formato deseado:</strong> Especifica cómo quieres que se presente la información.</li>
        <li><strong>Tono y estilo:</strong> Indica el nivel de formalidad o creatividad requerido.</li>
        <li><strong>Longitud apropiada:</strong> Menciona si necesitas una respuesta breve o detallada.</li>
      </ol>
      
      <h3 className="text-xl font-medium text-foreground mt-6">Técnicas avanzadas para mejorar tus prompts</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Chain-of-Thought (Cadena de pensamiento):</strong> Solicita a ChatGPT que 
          explique su razonamiento paso a paso, lo que resulta en respuestas más precisas.
          <p className="text-sm mt-1 italic">
            Ejemplo: "Explica paso a paso cómo resolver este problema de matemáticas..."
          </p>
        </li>
        <li>
          <strong>Few-Shot Learning (Aprendizaje con pocos ejemplos):</strong> Proporciona ejemplos 
          del tipo de respuesta que esperas.
          <p className="text-sm mt-1 italic">
            Ejemplo: "Quiero que generes nombres de empresa. Aquí hay algunos ejemplos del estilo que busco: Azul Tecnología, Verde Innovación, Rojo Soluciones."
          </p>
        </li>
        <li>
          <strong>Role-Playing (Juego de roles):</strong> Pide a ChatGPT que asuma un rol específico.
          <p className="text-sm mt-1 italic">
            Ejemplo: "Actúa como un experto en marketing digital y explícame cómo mejorar mi estrategia de redes sociales."
          </p>
        </li>
      </ul>
      
      <h3 className="text-xl font-medium text-foreground mt-6">Ejemplos prácticos de prompts para diferentes propósitos</h3>
      
      <div className="bg-muted p-4 rounded-md mt-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">Para creación de contenido SEO:</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8" 
            onClick={() => copyToClipboard(exampleSEO)}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copiar ejemplo</span>
          </Button>
        </div>
        <pre className="bg-background p-2 rounded text-sm overflow-x-auto">
          {exampleSEO}
        </pre>
      </div>
      
      <div className="bg-muted p-4 rounded-md mt-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">Para análisis de mercado:</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8" 
            onClick={() => copyToClipboard(exampleMarket)}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copiar ejemplo</span>
          </Button>
        </div>
        <pre className="bg-background p-2 rounded text-sm overflow-x-auto">
          {exampleMarket}
        </pre>
      </div>
      
      <div className="bg-muted p-4 rounded-md mt-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">Para marketing en redes sociales:</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8" 
            onClick={() => copyToClipboard(exampleSocial)}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copiar ejemplo</span>
          </Button>
        </div>
        <pre className="bg-background p-2 rounded text-sm overflow-x-auto">
          {exampleSocial}
        </pre>
      </div>
      
      <h3 className="text-xl font-medium text-foreground mt-8">Optimización de prompts para SEO</h3>
      <p>
        Cuando uses ChatGPT para generar contenido para SEO, asegúrate de incluir estos elementos en tus prompts:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Palabras clave principales y secundarias que quieres destacar</li>
        <li>Instrucciones para crear títulos y metadescripciones optimizados</li>
        <li>Solicitud de estructurar el contenido con encabezados H1, H2, H3 apropiados</li>
        <li>Petición de incluir preguntas frecuentes (FAQs) relevantes</li>
        <li>Instrucción para mantener un lenguaje natural que no suene sobreoptimizado</li>
      </ul>
      
      <h3 className="text-xl font-medium text-foreground mt-6">Errores comunes a evitar en tus prompts</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Ser demasiado vago:</strong> "Escribe algo sobre marketing" vs. "Escribe un artículo sobre estrategias de marketing de contenidos para startups B2B"</li>
        <li><strong>Omitir detalles cruciales:</strong> No especificar la audiencia, tono o formato deseado</li>
        <li><strong>Saturar con demasiadas instrucciones:</strong> Los prompts excesivamente largos pueden confundir al modelo</li>
        <li><strong>No iterar:</strong> Si no obtienes lo que buscas, refina tu prompt basándote en la respuesta anterior</li>
      </ul>
      
      <h3 className="text-xl font-medium text-foreground mt-6">Cómo evaluar y mejorar tus prompts</h3>
      <p>
        La creación de prompts efectivos es un proceso iterativo. Después de recibir una respuesta de ChatGPT:
      </p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Analiza qué partes de la respuesta cumplen con tus expectativas y cuáles no</li>
        <li>Identifica si faltó alguna instrucción específica en tu prompt original</li>
        <li>Refina tu prompt añadiendo más contexto o aclarando las instrucciones</li>
        <li>Experimenta con diferentes formulaciones para ver cuál genera mejores resultados</li>
        <li>Mantén un registro de los prompts más efectivos para reutilizarlos en el futuro</li>
      </ol>
      
      <div className="bg-card p-5 rounded-lg shadow-sm mt-8">
        <h3 className="text-xl font-medium text-foreground">Consejo profesional</h3>
        <p>
          Para obtener el máximo valor de ChatGPT, considera tu interacción como una conversación en desarrollo. 
          No necesitas incluir todas tus instrucciones en un solo prompt. Puedes empezar con un prompt 
          inicial y luego refinar la respuesta con instrucciones adicionales en los siguientes mensajes.
        </p>
      </div>
    </div>
  );
};

export default PromptUsefulContent;
