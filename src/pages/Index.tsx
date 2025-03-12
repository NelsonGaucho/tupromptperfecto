
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptGenerator from '@/components/PromptGenerator';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            {t('Tu Prompt Perfecto')}
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            {t('La herramienta definitiva para generar prompts perfectos con inteligencia artificial.')}
          </p>
        </section>

        <PromptGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
