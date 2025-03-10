
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setupSecurity } from '@/utils/security';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptGenerator from '@/components/PromptGenerator';
import AdSenseAd from '@/components/AdSenseAd';
import ApiKeyWarning from '@/components/ApiKeyWarning';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // Verificar si existe una API key al cargar
  useEffect(() => {
    const apiKey = localStorage.getItem('openai_api_key');
    setHasApiKey(!!apiKey);
  }, []);
  
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
    
    // Set page title for SEO
    document.title = "TuPromptPerfecto - Genera prompts perfectos para ChatGPT";
    
    // Set meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Genera prompts perfectos para ChatGPT. Herramienta gratuita para crear prompts optimizados para obtener los mejores resultados con la IA.' },
      { name: 'keywords', content: 'ChatGPT, prompts, generador de prompts, crear prompts, prompt perfecto, IA, inteligencia artificial, GPT' },
      { property: 'og:title', content: 'TuPromptPerfecto - Genera prompts perfectos para ChatGPT' },
      { property: 'og:description', content: 'Herramienta gratuita para crear prompts perfectos y obtener los mejores resultados con ChatGPT.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'TuPromptPerfecto - Genera prompts perfectos para ChatGPT' },
      { name: 'twitter:description', content: 'Herramienta gratuita para crear prompts perfectos y obtener los mejores resultados con ChatGPT.' },
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
          {/* Top ad */}
          <AdSenseAd adSlot="1234567890" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-12 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              TuPromptPerfecto
            </h1>
            <p className="text-xl text-muted-foreground">
              Genera prompts perfectos para ChatGPT y obtén mejores resultados
            </p>
            
            <div className="mt-4">
              <Link to="/api-settings">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings className="h-4 w-4" />
                  {hasApiKey ? "Configuración de API" : "Configurar API Key"}
                </Button>
              </Link>
            </div>
          </div>
          
          {!hasApiKey && (
            <div className="mb-8">
              <ApiKeyWarning />
            </div>
          )}
          
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
