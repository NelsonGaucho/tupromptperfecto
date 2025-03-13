import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstagramIntro from '@/components/instagram/InstagramIntro';
import HashtagGenerator from '@/components/HashtagGenerator';
import InstagramInfo from '@/components/instagram/InstagramInfo';
import InstagramAdvancedTips from '@/components/instagram/InstagramAdvancedTips';
import InstagramHashtagsSEO from '@/components/seo/InstagramHashtagsSEO';
import InstagramUsefulContent from '@/components/instagram/InstagramUsefulContent';

const InstagramHashtags = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <InstagramHashtagsSEO />
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-extrabold text-center mb-4">
            Generador de Hashtags para Instagram
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-8">
            Crea hashtags optimizados para aumentar el alcance de tus publicaciones en Instagram
          </p>
        </section>

        <InstagramIntro />
        
        <section className="my-8">
          <HashtagGenerator platform="instagram" />
        </section>
        
        <InstagramInfo />
        <InstagramAdvancedTips />
        <InstagramUsefulContent />
      </main>
      <Footer />
    </div>
  );
};

export default InstagramHashtags;
