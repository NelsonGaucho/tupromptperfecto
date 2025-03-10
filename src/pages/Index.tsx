
import { useEffect } from 'react';
import { setupSecurity } from '@/utils/security';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptGenerator from '@/components/PromptGenerator';
import AdSenseAd from '@/components/AdSenseAd';

const Index = () => {
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
    
    // Set page title for SEO
    document.title = "TuPromptPerfecto - Genera prompts perfectos para ChatGPT";
    
    // Enhanced meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Genera prompts perfectos para ChatGPT. Herramienta gratuita para crear prompts optimizados para obtener los mejores resultados con la IA.' },
      { name: 'keywords', content: 'ChatGPT, prompts, generador de prompts, crear prompts, prompt perfecto, IA, inteligencia artificial, GPT, prompt engineering, prompt generator' },
      { property: 'og:title', content: 'TuPromptPerfecto - Genera prompts perfectos para ChatGPT' },
      { property: 'og:description', content: 'Herramienta gratuita para crear prompts perfectos y obtener los mejores resultados con ChatGPT.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'TuPromptPerfecto - Genera prompts perfectos para ChatGPT' },
      { name: 'twitter:description', content: 'Herramienta gratuita para crear prompts perfectos y obtener los mejores resultados con ChatGPT.' },
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
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Top ad */}
          <AdSenseAd adSlot="1234567890" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-12 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              TuPromptPerfecto
            </h1>
            <p className="text-xl text-muted-foreground">
              Genera prompts perfectos para ChatGPT y obtén mejores resultados
            </p>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <PromptGenerator />
          </div>
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="0987654321" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
