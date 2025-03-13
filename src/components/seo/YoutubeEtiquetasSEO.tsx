
import React from 'react';
import { Helmet } from 'react-helmet';

const YoutubeEtiquetasSEO = () => {
  return (
    <Helmet>
      <title>Generador de Etiquetas para YouTube | Optimiza tus vídeos | TuPromptPerfecto</title>
      <meta name="description" content="Genera etiquetas optimizadas para YouTube. Herramienta gratuita para mejorar la visibilidad de tus videos y aumentar visualizaciones, suscriptores y engagement." />
      <meta name="keywords" content="YouTube, etiquetas, generador de etiquetas, SEO YouTube, visibilidad, alcance, creador de contenido, video tags, youtube shorts, etiquetar videos youtube, posicionamiento youtube, cómo conseguir más visitas en youtube" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content="Generador de Etiquetas para YouTube | Optimiza tus vídeos | TuPromptPerfecto" />
      <meta property="og:description" content="Herramienta gratuita para generar las etiquetas perfectas para YouTube y mejorar la visibilidad de tus videos. Aumenta tus visualizaciones y engagement." />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Generador de Etiquetas para YouTube | Optimiza tus vídeos" />
      <meta name="twitter:description" content="Herramienta gratuita para generar las etiquetas perfectas para YouTube y mejorar la visibilidad de tus videos." />
      
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
          "name": "Generador de Etiquetas para YouTube",
          "description": "Herramienta gratuita para crear etiquetas optimizadas para YouTube y mejorar la visibilidad de tus videos.",
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

export default YoutubeEtiquetasSEO;
