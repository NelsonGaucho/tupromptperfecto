import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import TwitterUsefulContent from '@/components/twitter/TwitterUsefulContent';

const XHashtags = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Generador de Hashtags para X (Twitter) | Aumenta tu alcance | TuPromptPerfecto</title>
        <meta name="description" content="Genera hashtags optimizados para X (Twitter). Herramienta gratuita para mejorar la visibilidad de tus tweets y aumentar seguidores e interacciones." />
      </Helmet>
      
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-extrabold text-center mb-4">
            Generador de Hashtags para X (Twitter)
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-8">
            Crea hashtags optimizados para aumentar el alcance de tus tweets
          </p>
        </section>
        
        <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
          <h2 className="text-2xl font-semibold text-foreground">¿Por qué son importantes los hashtags en X?</h2>
          <p>
            Los hashtags en X (anteriormente Twitter) son fundamentales para participar en conversaciones 
            más amplias, mejorar la descubribilidad de tus tweets y conectar con audiencias interesadas 
            en temas específicos. A diferencia de otras plataformas, X recomienda usar menos hashtags 
            (1-2 por tweet) pero más estratégicos.
          </p>
        </div>
        
        <section className="my-8">
          <HashtagGenerator platform="twitter" />
        </section>
        
        <TwitterUsefulContent />
      </main>
      <Footer />
    </div>
  );
};

export default XHashtags;
