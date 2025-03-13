import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOKeywordGenerator from '@/components/SEOKeywordGenerator';
import SEOUsefulContent from '@/components/seo/SEOUsefulContent';

const SEOKeywords = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Generador de Keywords para SEO | Optimiza tu contenido web | TuPromptPerfecto</title>
        <meta name="description" content="Genera palabras clave optimizadas para SEO. Herramienta gratuita para mejorar el posicionamiento de tu sitio web y aumentar el tráfico orgánico." />
      </Helmet>
      
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-extrabold text-center mb-4">
            Generador de Keywords para SEO
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-8">
            Encuentra las mejores palabras clave para posicionar tu contenido
          </p>
        </section>
        
        <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
          <h2 className="text-2xl font-semibold text-foreground">Optimiza tu estrategia SEO con palabras clave efectivas</h2>
          <p>
            Las palabras clave (keywords) son términos o frases que los usuarios introducen en los 
            motores de búsqueda. Identificar y utilizar las palabras clave adecuadas es fundamental 
            para que tu contenido sea descubierto por tu audiencia objetivo.
          </p>
          <p>
            Nuestra herramienta de generación de keywords para SEO te ayuda a identificar términos 
            relevantes con datos sobre volumen de búsqueda, competencia y dificultad, permitiéndote 
            tomar decisiones informadas para tu estrategia de contenido.
          </p>
        </div>
        
        <section className="my-8">
          <SEOKeywordGenerator />
        </section>
        
        <SEOUsefulContent />
      </main>
      <Footer />
    </div>
  );
};

export default SEOKeywords;
