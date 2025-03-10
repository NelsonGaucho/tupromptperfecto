
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import { setupSecurity } from '@/utils/security';

const YoutubeHashtags = () => {
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
    
    // Set page title for SEO
    document.title = "Generador de Hashtags para YouTube - TuPromptPerfecto";
    
    // Set meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Genera hashtags optimizados para YouTube. Herramienta gratuita para mejorar la visibilidad de tus videos.' },
      { name: 'keywords', content: 'YouTube, hashtags, generador de hashtags, SEO YouTube, visibilidad, alcance, creador de contenido' },
      { property: 'og:title', content: 'Generador de Hashtags para YouTube - TuPromptPerfecto' },
      { property: 'og:description', content: 'Herramienta gratuita para generar los hashtags perfectos para YouTube y mejorar la visibilidad de tus videos.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Generador de Hashtags para YouTube - TuPromptPerfecto' },
      { name: 'twitter:description', content: 'Herramienta gratuita para generar los hashtags perfectos para YouTube y mejorar la visibilidad de tus videos.' },
      { name: 'robots', content: 'index, follow' },
      { name: 'canonical', content: window.location.href },
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
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Generador de Hashtags para YouTube
            </h1>
            <p className="text-xl text-muted-foreground">
              Crea hashtags optimizados para mejorar la visibilidad de tus videos en YouTube
            </p>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="youtube" />
          </div>
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default YoutubeHashtags;
