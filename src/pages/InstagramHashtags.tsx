
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
    const metaTags = [
      { name: 'description', content: 'Genera los mejores hashtags para aumentar el alcance y engagement de tus publicaciones en Instagram con nuestra herramienta gratuita.' },
      { name: 'keywords', content: 'generador de hashtags instagram, hashtags instagram, instagram marketing, hashtags populares instagram, aumentar engagement instagram' },
      { property: 'og:title', content: 'Generador de Hashtags para Instagram | TuPromptPerfecto' },
      { property: 'og:description', content: 'Genera los hashtags perfectos para Instagram y aumenta tu alcance y engagement.' },
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
          <AdSenseAd adSlot="3456789012" className="mb-8" />
          
          <div className="max-w-3xl mx-auto text-center mb-8 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Generador de Hashtags para Instagram
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Crea los mejores hashtags para aumentar el alcance de tus publicaciones en Instagram
            </p>
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">¿Por qué son importantes los hashtags en Instagram?</h2>
            <p>
              Los hashtags son una herramienta fundamental para aumentar la visibilidad de tus publicaciones en Instagram. 
              Un buen uso de hashtags puede multiplicar tu alcance, atraer nuevos seguidores y aumentar el engagement de tu cuenta.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Beneficios de usar hashtags efectivos:</h2>
            <ul className="list-disc pl-6">
              <li>Incrementa la visibilidad de tus publicaciones</li>
              <li>Atrae a una audiencia más específica e interesada en tu contenido</li>
              <li>Ayuda a posicionarte como referente en tu nicho</li>
              <li>Aumenta las posibilidades de aparecer en la sección "Explorar"</li>
              <li>Mejora el engagement (likes, comentarios, guardados) de tus posts</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo usar nuestra herramienta:</h2>
            <ol className="list-decimal pl-6">
              <li>Introduce el tema principal de tu publicación</li>
              <li>Selecciona el número de hashtags que necesitas (Instagram permite hasta 30)</li>
              <li>Especifica si prefieres hashtags populares, nichos o una mezcla</li>
              <li>¡Genera tus hashtags personalizados y cópialos con un solo clic!</li>
            </ol>
          </div>
          
          <div className="animate-slide-in-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <HashtagGenerator platform="instagram" />
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto my-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">Consejos para maximizar el impacto de tus hashtags:</h2>
            <ul className="list-disc pl-6">
              <li><strong>Combina hashtags populares y de nicho:</strong> Los hashtags muy populares tienen mucha competencia, mientras que los hashtags de nicho llegan a audiencias más específicas.</li>
              <li><strong>Crea hashtags propios:</strong> Desarrolla hashtags únicos para tu marca o campañas específicas.</li>
              <li><strong>Investiga a tu competencia:</strong> Observa qué hashtags utilizan cuentas similares con buen engagement.</li>
              <li><strong>Cambia tus hashtags:</strong> No uses siempre los mismos hashtags en todas tus publicaciones.</li>
              <li><strong>Utiliza hashtags relevantes:</strong> Asegúrate de que los hashtags estén relacionados con el contenido de tu publicación.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Errores comunes a evitar:</h2>
            <ul className="list-disc pl-6">
              <li>Usar hashtags prohibidos o restringidos por Instagram</li>
              <li>Utilizar hashtags demasiado genéricos (#love, #instagood) sin combinarlos con otros más específicos</li>
              <li>Abusar de hashtags irrelevantes solo porque son populares</li>
              <li>No investigar el significado de los hashtags antes de usarlos</li>
              <li>Colocar los hashtags de forma visible en la descripción principal en lugar de en comentarios o al final del texto</li>
            </ul>
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
