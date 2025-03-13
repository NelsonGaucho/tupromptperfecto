
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Sobre Nosotros | TuPromptPerfecto</title>
        <meta name="description" content="Descubre quiénes somos y cómo nuestras herramientas te ayudan a mejorar tu presencia digital con prompts optimizados y hashtags efectivos." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Sobre Nosotros</h1>
          
          <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">¿Qué es TuPromptPerfecto?</h2>
            <p>
              TuPromptPerfecto nació de una necesidad real: optimizar el trabajo con inteligencia artificial y maximizar la presencia en redes sociales. Somos una plataforma dedicada a proporcionar herramientas gratuitas que te ayudan a generar prompts perfectos para ChatGPT y hashtags optimizados para tus publicaciones en redes sociales.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Misión</h2>
            <p>
              Nuestra misión es democratizar el acceso a herramientas de optimización de contenido y SEO. Creemos que todos los creadores de contenido, sin importar su tamaño o presupuesto, merecen tener acceso a herramientas que les ayuden a destacar en el mundo digital.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cómo Funcionan Nuestras Herramientas</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">Generador de Prompts</h3>
                <p>
                  Nuestro generador de prompts utiliza algoritmos avanzados para crear instrucciones perfectas para ChatGPT. Analizamos patrones de éxito en miles de interacciones para ofrecerte prompts que generan respuestas precisas, detalladas y útiles.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">Generadores de Hashtags</h3>
                <p>
                  Nuestros generadores de hashtags para Instagram, YouTube y X (Twitter) analizan las tendencias actuales y el algoritmo de cada plataforma para sugerirte las etiquetas más efectivas para tu contenido. Esto maximiza tu alcance orgánico y aumenta tus posibilidades de ser descubierto.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">Generador de Keywords SEO</h3>
                <p>
                  Nuestra herramienta de SEO identifica las palabras clave más relevantes para tu contenido, analizando volumen de búsqueda, competencia y dificultad para ayudarte a posicionar mejor tus páginas web y blogs.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">¿Por Qué Elegirnos?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>100% Gratuito:</strong> Todas nuestras herramientas son completamente gratuitas.</li>
              <li><strong>Sin Registro:</strong> No necesitas crear una cuenta para utilizar nuestros servicios.</li>
              <li><strong>Actualizaciones Constantes:</strong> Nos mantenemos al día con los cambios en los algoritmos de las plataformas.</li>
              <li><strong>Orientado a Resultados:</strong> Nuestro objetivo es que veas un aumento real en tu engagement y visibilidad.</li>
              <li><strong>Fácil de Usar:</strong> Interfaces intuitivas diseñadas para usuarios de todos los niveles de experiencia.</li>
            </ul>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
