import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import YoutubeEtiquetasSEO from '@/components/seo/YoutubeEtiquetasSEO';
import YouTubeIntro from '@/components/youtube/YouTubeIntro';
import YouTubeInfo from '@/components/youtube/YouTubeInfo';
import YouTubeAdvancedTips from '@/components/youtube/YouTubeAdvancedTips';
import YouTubeUsefulContent from '@/components/youtube/YouTubeUsefulContent';

const YoutubeHashtags = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <YoutubeEtiquetasSEO />
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-extrabold text-center mb-4">
            Generador de Etiquetas para YouTube
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-8">
            Crea etiquetas optimizadas para aumentar las visualizaciones de tus videos en YouTube
          </p>
        </section>
        
        <YouTubeIntro />
        
        <section className="my-8">
          <HashtagGenerator platform="youtube" />
        </section>
        
        <YouTubeInfo />
        <YouTubeAdvancedTips />
        <YouTubeUsefulContent />
      </main>
      <Footer />
    </div>
  );
};

export default YoutubeHashtags;
