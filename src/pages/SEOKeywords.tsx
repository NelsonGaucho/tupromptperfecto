
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOKeywordGenerator from '@/components/SEOKeywordGenerator';
import { setupSecurity } from '@/utils/security';
import AdSenseAd from '@/components/AdSenseAd';

const SEOKeywords = () => {
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
    
    // Enhanced SEO meta tags
    document.title = "Generador de Palabras Clave SEO | Mejora tu Posicionamiento Web | TuPromptPerfecto";
    
    // Set meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Genera palabras clave SEO efectivas. Herramienta gratuita para mejorar el posicionamiento de tu sitio web en Google y otros buscadores. Optimiza tu contenido para SEO.' },
      { name: 'keywords', content: 'SEO, palabras clave, keyword research, posicionamiento web, búsqueda, Google, keywords, SEO en español, herramientas SEO, long tail keywords, SEO gratis, posicionamiento en buscadores, optimización web' },
      { property: 'og:title', content: 'Generador de Palabras Clave SEO | Mejora tu Posicionamiento Web | TuPromptPerfecto' },
      { property: 'og:description', content: 'Herramienta gratuita para generar palabras clave SEO efectivas y mejorar el posicionamiento de tu sitio web en Google y otros buscadores.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Generador de Palabras Clave SEO | Mejora tu Posicionamiento Web' },
      { name: 'twitter:description', content: 'Herramienta gratuita para generar palabras clave SEO efectivas y mejorar el posicionamiento de tu sitio web.' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'canonical', content: window.location.href },
      { name: 'author', content: 'TuPromptPerfecto' },
      { name: 'language', content: 'Spanish' },
      { property: 'og:locale', content: 'es_ES' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ];
    
    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[${Object.keys(tag)[0]}="${Object.keys(tag)[1]}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(Object.keys(tag)[0], Object.values(tag)[0] as string);
        meta.setAttribute(Object.keys(tag)[1], Object.values(tag)[1] as string);
        document.head.appendChild(meta);
      } else {
        meta.setAttribute(Object.values(tag)[0] as string, Object.values(tag)[1] as string);
      }
    });
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Generador de Palabras Clave SEO",
      "description": "Herramienta gratuita para generar palabras clave SEO efectivas y mejorar el posicionamiento de tu sitio web.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "author": {
        "@type": "Organization",
        "name": "TuPromptPerfecto"
      }
    };
    
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Top ad */}
          <AdSenseAd adSlot="6543210987" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-8 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Generador de Palabras Clave SEO
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Crea palabras clave efectivas para mejorar el posicionamiento de tu sitio web
            </p>
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">La importancia de las palabras clave en SEO</h2>
            <p>
              Las palabras clave son la base de cualquier estrategia SEO efectiva. Son los términos y frases que 
              los usuarios introducen en los motores de búsqueda cuando buscan información, productos o servicios.
              Identificar las palabras clave correctas es fundamental para optimizar tu contenido y mejorar tu 
              posicionamiento en los resultados de búsqueda.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Beneficios de usar palabras clave optimizadas:</h2>
            <ul className="list-disc pl-6">
              <li>Mejora tu visibilidad en los motores de búsqueda</li>
              <li>Atrae tráfico cualificado a tu sitio web</li>
              <li>Aumenta las conversiones al llegar a usuarios con intención de búsqueda específica</li>
              <li>Ayuda a estructurar y organizar el contenido de tu sitio web</li>
              <li>Permite identificar oportunidades de nicho y tendencias emergentes</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo usar nuestra herramienta:</h2>
            <ol className="list-decimal pl-6">
              <li>Introduce el tema principal para el que quieres generar palabras clave</li>
              <li>Selecciona el tipo de contenido (blog, ecommerce, servicio profesional, etc.)</li>
              <li>Especifica tu sector o nicho</li>
              <li>Haz clic en "Generar palabras clave SEO"</li>
              <li>Utiliza las palabras clave generadas para optimizar tu contenido</li>
            </ol>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <SEOKeywordGenerator />
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto my-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">Tipos de palabras clave para optimizar tu SEO:</h2>
            <ul className="list-disc pl-6">
              <li><strong>Palabras clave short tail:</strong> Términos cortos y generales (ej. "SEO", "marketing")</li>
              <li><strong>Palabras clave long tail:</strong> Frases más específicas con menor competencia (ej. "agencia de SEO en Madrid especializada en ecommerce")</li>
              <li><strong>Palabras clave de intención informativa:</strong> Buscan información (ej. "qué es SEO", "cómo optimizar una web")</li>
              <li><strong>Palabras clave de intención comercial:</strong> Indican intención de compra (ej. "contratar servicios SEO", "mejores herramientas SEO")</li>
              <li><strong>Palabras clave LSI (Latent Semantic Indexing):</strong> Términos relacionados semánticamente con tu palabra clave principal</li>
              <li><strong>Palabras clave locales:</strong> Incluyen ubicaciones geográficas (ej. "agencia SEO Barcelona")</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Errores comunes al seleccionar palabras clave:</h2>
            <ul className="list-disc pl-6">
              <li>Elegir palabras clave con demasiada competencia y difíciles de posicionar</li>
              <li>No analizar la intención de búsqueda detrás de las palabras clave</li>
              <li>Ignorar el volumen de búsqueda y el potencial de tráfico</li>
              <li>Practicar keyword stuffing (sobrecarga de palabras clave)</li>
              <li>No actualizar regularmente tu investigación de palabras clave</li>
              <li>Centrarse solo en palabras clave genéricas ignorando las long tail</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo implementar tus palabras clave:</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Títulos (H1):</strong> Incluye tu palabra clave principal en el título de la página</li>
              <li><strong>Subtítulos (H2, H3):</strong> Utiliza variaciones de tus palabras clave en los subtítulos</li>
              <li><strong>Primeros párrafos:</strong> Menciona tus palabras clave en los primeros 100-150 palabras</li>
              <li><strong>URLs:</strong> Crea URLs amigables que incluyan tus palabras clave principales</li>
              <li><strong>Meta descripciones:</strong> Incluye tus palabras clave de forma natural en las meta descripciones</li>
              <li><strong>Texto alternativo de imágenes:</strong> Usa palabras clave relevantes en el texto ALT de tus imágenes</li>
              <li><strong>Contenido:</strong> Distribuye tus palabras clave de forma natural a lo largo del contenido</li>
            </ol>
          </div>
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="5432109876" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default SEOKeywords;
