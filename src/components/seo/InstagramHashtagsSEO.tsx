
import React from 'react';

const InstagramHashtagsSEO = () => {
  React.useEffect(() => {
    // Set page-specific metadata
    document.title = "Generador de Hashtags para Instagram | Aumenta Tu Alcance | TuPromptPerfecto";
    
    // Add page-specific meta tags with enhanced SEO
    const metaTags = [
      { name: 'description', content: 'Genera los mejores hashtags para aumentar el alcance y engagement de tus publicaciones en Instagram con nuestra herramienta gratuita. Optimiza tu estrategia de Instagram con hashtags efectivos.' },
      { name: 'keywords', content: 'generador de hashtags instagram, hashtags instagram, instagram marketing, hashtags populares instagram, aumentar engagement instagram, herramienta hashtags, instagram algorithm, instagram reach, hashtags en español, instagram engagement' },
      { property: 'og:title', content: 'Generador de Hashtags para Instagram | Aumenta Tu Alcance | TuPromptPerfecto' },
      { property: 'og:description', content: 'Genera los hashtags perfectos para Instagram y aumenta tu alcance y engagement. Herramienta gratuita para optimizar tus publicaciones.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Generador de Hashtags para Instagram | Aumenta Tu Alcance' },
      { name: 'twitter:description', content: 'Genera los hashtags perfectos para Instagram y aumenta tu alcance y engagement. Herramienta gratuita de TuPromptPerfecto.' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'canonical', content: window.location.href },
      { name: 'author', content: 'TuPromptPerfecto' },
      { name: 'language', content: 'Spanish' },
      { property: 'og:locale', content: 'es_ES' },
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
      "name": "Generador de Hashtags para Instagram",
      "description": "Herramienta gratuita para crear hashtags optimizados para Instagram y aumentar el alcance y engagement de tus publicaciones.",
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

  return null;
};

export default InstagramHashtagsSEO;
