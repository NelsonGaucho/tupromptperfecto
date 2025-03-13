
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import { setupSecurity } from '@/utils/security';
import AdSenseAd from '@/components/AdSenseAd';
import YoutubeEtiquetasSEO from '@/components/seo/YoutubeEtiquetasSEO';
import YouTubeIntro from '@/components/youtube/YouTubeIntro';
import YouTubeInfo from '@/components/youtube/YouTubeInfo';
import YouTubeAdvancedTips from '@/components/youtube/YouTubeAdvancedTips';

const YoutubeHashtags = () => {
  // Set up security measures when the component mounts
  useEffect(() => {
    setupSecurity();
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <YoutubeEtiquetasSEO />
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Top ad */}
          <AdSenseAd adSlot="3456789012" className="mb-8" />
          
          <YouTubeIntro />
          
          <YouTubeInfo />
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="youtube" />
          </div>
          
          <YouTubeAdvancedTips />
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="9876543210" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default YoutubeHashtags;
