
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import { setupSecurity } from '@/utils/security';
import AdSenseAd from '@/components/AdSenseAd';

const XHashtags = () => {
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
    
    // Enhanced SEO meta tags
    document.title = "Generador de Hashtags para X (Twitter) | Herramienta Gratuita | TuPromptPerfecto";
    
    // Set meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Genera hashtags efectivos para X (Twitter). Herramienta gratuita para aumentar el alcance, engagement y visibilidad de tus tweets. Mejora tu estrategia en redes sociales con hashtags optimizados.' },
      { name: 'keywords', content: 'X, Twitter, hashtags, generador de hashtags, trending, alcance, engagement, tweet, redes sociales, marketing digital, trending topics, visibilidad, viral, retweets, SEO twitter' },
      { property: 'og:title', content: 'Generador de Hashtags para X (Twitter) | Herramienta Gratuita | TuPromptPerfecto' },
      { property: 'og:description', content: 'Herramienta gratuita para generar los hashtags perfectos para X (Twitter) y aumentar el alcance de tus tweets. Mejora tu estrategia en redes sociales.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Generador de Hashtags para X (Twitter) | Herramienta Gratuita' },
      { name: 'twitter:description', content: 'Herramienta gratuita para generar los hashtags perfectos para X (Twitter) y aumentar el alcance de tus tweets.' },
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
      "name": "Generador de Hashtags para X (Twitter)",
      "description": "Herramienta gratuita para crear hashtags efectivos para X (Twitter) y aumentar el alcance de tus tweets.",
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
          <AdSenseAd adSlot="8765432109" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-8 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Generador de Hashtags para X (Twitter)
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Crea hashtags efectivos para aumentar el alcance y visibilidad de tus tweets en X
            </p>
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">El poder de los hashtags en X (Twitter)</h2>
            <p>
              Los hashtags son esenciales para aumentar la visibilidad de tus tweets en X (anteriormente Twitter). 
              Al usar hashtags relevantes y estratégicos, puedes conectar con audiencias interesadas en tu contenido,
              aparecer en búsquedas de tendencias y aumentar significativamente tu engagement.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Beneficios de usar hashtags en X:</h2>
            <ul className="list-disc pl-6">
              <li>Aumenta la visibilidad de tus tweets más allá de tus seguidores</li>
              <li>Mejora las posibilidades de que tu contenido aparezca en tendencias</li>
              <li>Incrementa las interacciones (likes, respuestas, retweets)</li>
              <li>Conecta con comunidades específicas interesadas en tus temas</li>
              <li>Permite participar en conversaciones globales sobre temas actuales</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo usar nuestra herramienta:</h2>
            <ol className="list-decimal pl-6">
              <li>Introduce el tema principal de tu tweet</li>
              <li>Opcionalmente, añade una descripción más detallada</li>
              <li>Haz clic en "Generar hashtags para X"</li>
              <li>Copia los hashtags generados directamente a tu tweet</li>
            </ol>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="twitter" />
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto my-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">Estrategias efectivas para hashtags en X:</h2>
            <ul className="list-disc pl-6">
              <li><strong>Menos es más:</strong> X recomienda usar solo 1-2 hashtags por tweet para maximizar el engagement.</li>
              <li><strong>Investiga las tendencias:</strong> Usa herramientas como esta para encontrar hashtags populares relacionados con tu nicho.</li>
              <li><strong>Crea hashtags de marca:</strong> Desarrolla hashtags únicos para tu marca o campañas específicas.</li>
              <li><strong>Participa en hashtags recurrentes:</strong> #LunesDeMotivación, #FelizViernes y otros hashtags diarios pueden aumentar tu visibilidad.</li>
              <li><strong>Verifica el contexto:</strong> Siempre investiga un hashtag antes de usarlo para entender su significado actual.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Errores comunes al usar hashtags en X:</h2>
            <ul className="list-disc pl-6">
              <li>Usar demasiados hashtags en un solo tweet (sobrecarga visual)</li>
              <li>Utilizar hashtags demasiado genéricos que no atraen a tu audiencia objetivo</li>
              <li>No investigar el significado actual de un hashtag antes de usarlo</li>
              <li>Crear hashtags demasiado largos o complicados</li>
              <li>Forzar hashtags irrelevantes solo porque son tendencia</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Tipos de hashtags para X:</h2>
            <ul className="list-disc pl-6">
              <li><strong>Hashtags de nicho:</strong> Específicos para tu industria o tema (#MarketingDigital, #FotografíaPaisaje)</li>
              <li><strong>Hashtags de marca:</strong> Únicos para tu empresa o campañas (#TuMarca, #TuCampaña)</li>
              <li><strong>Hashtags de tendencia:</strong> Los que están siendo utilizados ampliamente en ese momento</li>
              <li><strong>Hashtags de evento:</strong> Relacionados con acontecimientos específicos (#OlimpiadasParis2024)</li>
              <li><strong>Hashtags de chat:</strong> Utilizados para conversaciones programadas en X (#SEOChat)</li>
            </ul>
          </div>
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="7654321098" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default XHashtags;
