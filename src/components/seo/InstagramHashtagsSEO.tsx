import React from 'react';
import { Helmet } from 'react-helmet-async';

const InstagramHashtagsSEO = () => {
  return (
    <Helmet>
      <title>Generador de Hashtags para Instagram | Aumenta tu alcance | TuPromptPerfecto</title>
      <meta name="description" content="Genera hashtags optimizados para Instagram. Herramienta gratuita para mejorar la visibilidad de tus publicaciones y aumentar seguidores y likes." />
      <meta name="keywords" content="Instagram, hashtags, generador de hashtags, SEO Instagram, visibilidad, alcance, creador de contenido, post tags, instagram post, aumentar seguidores, likes" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content="Generador de Hashtags para Instagram | Aumenta tu alcance | TuPromptPerfecto" />
      <meta property="og:description" content="Herramienta gratuita para generar los hashtags perfectos para Instagram y mejorar la visibilidad de tus publicaciones. Aumenta tus seguidores y likes." />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Generador de Hashtags para Instagram | Aumenta tu alcance" />
      <meta name="twitter:description" content="Herramienta gratuita para generar los hashtags perfectos para Instagram y mejorar la visibilidad de tus publicaciones." />
      
      {/* Canonical */}
      <link rel="canonical" href={window.location.href} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="TuPromptPerfecto" />
      <meta name="language" content="Spanish" />
      <meta property="og:locale" content="es_ES" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Generador de Hashtags para Instagram",
          "description": "Herramienta gratuita para crear hashtags optimizados para Instagram y mejorar la visibilidad de tus publicaciones.",
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
        })}
      </script>
    </Helmet>
  );
};

export default InstagramHashtagsSEO;
