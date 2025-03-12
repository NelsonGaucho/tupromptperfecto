import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Instagram, Youtube, Twitter, Search } from 'lucide-react';

// Importamos el componente de prueba de Supabase
import SupabaseTest from '@/components/SupabaseTest';

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
            {t('La herramienta definitiva para generar hashtags y palabras clave SEO con inteligencia artificial.')}
          </p>
        </section>

        {/* Sección de prueba de Supabase */}
        <section className="mb-12 bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Verificación de Supabase</h2>
          <SupabaseTest />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5" />
                {t('Instagram Hashtags')}
              </CardTitle>
              <CardDescription>
                {t('Genera hashtags efectivos para Instagram con IA.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('Optimiza tu contenido de Instagram con hashtags relevantes y de tendencia.')}</p>
              <Link to="/instagram-hashtags" className="inline-block mt-4 text-blue-500 hover:underline">
                {t('Generar hashtags para Instagram')}
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                {t('YouTube Hashtags')}
              </CardTitle>
              <CardDescription>
                {t('Encuentra los mejores hashtags para tus videos de YouTube.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('Aumenta la visibilidad de tus videos con hashtags optimizados para YouTube.')}</p>
              <Link to="/youtube-hashtags" className="inline-block mt-4 text-blue-500 hover:underline">
                {t('Generar hashtags para YouTube')}
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Twitter className="h-5 w-5" />
                {t('X (Twitter) Hashtags')}
              </CardTitle>
              <CardDescription>
                {t('Genera hashtags impactantes para tus tweets en X.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('Maximiza el alcance de tus mensajes con hashtags de tendencia en X (Twitter).')}</p>
              <Link to="/x-hashtags" className="inline-block mt-4 text-blue-500 hover:underline">
                {t('Generar hashtags para X (Twitter)')}
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {t('SEO Keywords')}
              </CardTitle>
              <CardDescription>
                {t('Descubre palabras clave SEO para mejorar tu posicionamiento en buscadores.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('Atrae tráfico orgánico a tu sitio web con palabras clave relevantes y de alto impacto.')}</p>
              <Link to="/seo-keywords" className="inline-block mt-4 text-blue-500 hover:underline">
                {t('Generar palabras clave SEO')}
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-background border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                {t('API Settings')}
              </CardTitle>
              <CardDescription>
                {t('Configura tu API Key de OpenAI para potenciar la generación de contenido.')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('Ajusta la configuración de la API para optimizar la generación de hashtags y palabras clave.')}</p>
              <Link to="/api-settings" className="inline-block mt-4 text-blue-500 hover:underline">
                {t('Configurar API Key')}
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">{t('¿Cómo funciona?')}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Simplemente elige la plataforma, introduce un tema y nuestra IA generará los mejores hashtags y palabras clave para ti.')}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
