
import React from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import AdSenseAd from '@/components/AdSenseAd';
import { setupSecurity } from '@/utils/security';
import InstagramHashtagsSEO from '@/components/seo/InstagramHashtagsSEO';
import InstagramIntro from '@/components/instagram/InstagramIntro';
import InstagramInfo from '@/components/instagram/InstagramInfo';
import InstagramAdvancedTips from '@/components/instagram/InstagramAdvancedTips';

const InstagramHashtags = () => {
  // Set up security measures when component mounts
  React.useEffect(() => {
    setupSecurity();
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <InstagramHashtagsSEO />
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Top ad */}
          <AdSenseAd adSlot="3456789012" className="mb-8" />
          
          <InstagramIntro />
          
          <InstagramInfo />
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="instagram" />
          </div>
          
          <InstagramAdvancedTips />
          
          {/* Bottom ad */}
          <AdSenseAd adSlot="5678901234" className="mt-8" />
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default InstagramHashtags;
