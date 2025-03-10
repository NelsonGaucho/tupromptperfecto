
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import { setupSecurity } from '@/utils/security';
import AdSenseAd from '@/components/AdSenseAd';

const YoutubeHashtags = () => {
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
    
    // Enhanced SEO for YouTube hashtags page
    document.title = "Generador de Hashtags para YouTube | Optimiza tus vídeos | TuPromptPerfecto";
    
    // Set meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Genera hashtags optimizados para YouTube. Herramienta gratuita para mejorar la visibilidad de tus videos y aumentar visualizaciones, suscriptores y engagement.' },
      { name: 'keywords', content: 'YouTube, hashtags, generador de hashtags, SEO YouTube, visibilidad, alcance, creador de contenido, video tags, youtube shorts, etiquetar videos youtube, posicionamiento youtube, cómo conseguir más visitas en youtube' },
      { property: 'og:title', content: 'Generador de Hashtags para YouTube | Optimiza tus vídeos | TuPromptPerfecto' },
      { property: 'og:description', content: 'Herramienta gratuita para generar los hashtags perfectos para YouTube y mejorar la visibilidad de tus videos. Aumenta tus visualizaciones y engagement.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Generador de Hashtags para YouTube | Optimiza tus vídeos' },
      { name: 'twitter:description', content: 'Herramienta gratuita para generar los hashtags perfectos para YouTube y mejorar la visibilidad de tus videos.' },
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
    
    // Add structured data for improved SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Generador de Hashtags para YouTube",
      "description": "Herramienta gratuita para crear hashtags optimizados para YouTube y mejorar la visibilidad de tus videos.",
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
          <AdSenseAd adSlot="3456789012" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-8 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Generador de Hashtags para YouTube
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Crea hashtags optimizados para mejorar la visibilidad de tus videos en YouTube
            </p>
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">¿Por qué son importantes los hashtags en YouTube?</h2>
            <p>
              Los hashtags son una herramienta fundamental para aumentar la visibilidad de tus videos en YouTube. 
              Un buen uso de hashtags puede mejorar el posicionamiento de tus videos, aumentar las visualizaciones y atraer a nuevos suscriptores.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Beneficios de usar hashtags en YouTube:</h2>
            <ul className="list-disc pl-6">
              <li>Mejoran la clasificación de tus videos en la búsqueda de YouTube</li>
              <li>Ayudan a que tus videos aparezcan en las secciones de "Videos relacionados"</li>
              <li>Permiten que tus videos sean descubiertos a través de clics en hashtags</li>
              <li>Aumentan las posibilidades de que tus shorts se vuelvan virales</li>
              <li>Proporcionan contexto adicional para tus videos</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo usar nuestra herramienta:</h2>
            <ol className="list-decimal pl-6">
              <li>Introduce el tema principal de tu video</li>
              <li>Añade una descripción breve del contenido específico (opcional)</li>
              <li>Haz clic en "Generar hashtags para YouTube"</li>
              <li>¡Copia los hashtags en formato optimizado para YouTube con un solo clic!</li>
            </ol>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="youtube" />
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto my-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">Consejos para aprovechar los hashtags en YouTube:</h2>
            <ul className="list-disc pl-6">
              <li><strong>Usa hashtags relevantes:</strong> Asegúrate de que los hashtags estén relacionados con el contenido de tu video.</li>
              <li><strong>Limita la cantidad:</strong> YouTube recomienda usar no más de 15 hashtags por video.</li>
              <li><strong>Coloca estratégicamente:</strong> Los primeros tres hashtags aparecerán sobre el título del video.</li>
              <li><strong>Formato correcto:</strong> En YouTube, puedes usar hashtags sin el símbolo # separados por comas, especialmente en la descripción.</li>
              <li><strong>Investiga tendencias:</strong> Utiliza hashtags populares relacionados con tu nicho para aumentar tu alcance.</li>
              <li><strong>Crea hashtags específicos:</strong> Desarrolla hashtags únicos para tu canal o serie de videos.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Errores comunes a evitar:</h2>
            <ul className="list-disc pl-6">
              <li>Usar hashtags irrelevantes solo porque son populares</li>
              <li>Sobrecargar tu video con demasiados hashtags (más de 15)</li>
              <li>Usar hashtags muy genéricos que no destacan tu contenido</li>
              <li>No investigar los hashtags antes de usarlos</li>
              <li>Usar hashtags prohibidos o con connotaciones negativas</li>
              <li>No actualizar tus hashtags para diferentes tipos de contenido</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">¿Dónde colocar los hashtags en YouTube?</h2>
            <ol className="list-decimal pl-6">
              <li><strong>En el título:</strong> Puedes incluir 1-2 hashtags al principio o final del título.</li>
              <li><strong>En la descripción:</strong> Ideal para colocar todos tus hashtags, preferiblemente en las primeras líneas.</li>
              <li><strong>Como etiquetas:</strong> YouTube también extrae hashtags de las etiquetas de tu video.</li>
            </ol>
          </div>
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="9876543210" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default YoutubeHashtags;
