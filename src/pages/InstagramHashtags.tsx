import React from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import AdSenseAd from '@/components/AdSenseAd';

const InstagramHashtags = () => {
  // Set page-specific metadata when component mounts
  React.useEffect(() => {
    document.title = "Generador de Hashtags para Instagram | TuPromptPerfecto";
    // Add page-specific meta tags
    
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Top ad */}
          <AdSenseAd adSlot="3456789012" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-12 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Generador de Hashtags para Instagram
            </h1>
            <p className="text-xl text-muted-foreground">
              Crea los mejores hashtags para aumentar el alcance de tus publicaciones en Instagram
            </p>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="instagram" />
          </div>
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="5678901234" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default InstagramHashtags;
