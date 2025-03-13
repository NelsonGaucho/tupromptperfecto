
import React, { useState } from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashtagGenerator from '@/components/HashtagGenerator';
import AdSenseAd from '@/components/AdSenseAd';
import { setupSecurity } from '@/utils/security';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InstagramHashtags = () => {
  const { isUpdating, updateStatus, updateTrendingKeywords } = usePromptGenerator();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Trigger update of trending hashtags
  const handleUpdateHashtags = async () => {
    try {
      setIsRefreshing(true);
      await updateTrendingKeywords();
      toast({
        title: "¡Actualización completa!",
        description: "Los hashtags de tendencia han sido actualizados correctamente.",
      });
    } catch (error) {
      console.error("Error updating hashtags:", error);
      toast({
        title: "Error",
        description: "No se pudieron actualizar los hashtags de tendencia. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Set page-specific metadata when component mounts
  React.useEffect(() => {
    // Set up security measures
    setupSecurity();
    
    // Enhanced SEO meta tags
    document.title = "Generador de Hashtags para Instagram | Aumenta Tu Alcance | TuPromptPerfecto";
    
    // Add page-specific meta tags with enhanced SEO
    const metaTags = [
      { name: 'description', content: 'Genera los mejores hashtags para aumentar el alcance y engagement de tus publicaciones en Instagram con nuestra herramienta gratuita. Optimiza tu estrategia de Instagram con hashtags efectivos.' },
      { name: 'keywords', content: 'generador de hashtags instagram, hashtags instagram, instagram marketing, hashtags populares instagram, aumentar engagement instagram, herramienta hashtags, instagram algorithm, instagram reach, hashtags en español, instagram engagement' },
      { property: 'og:title', content: 'Generador de Hashtags para Instagram | Aumenta Tu Alcance | TuPromptPerfecto' },
      { property: 'og:description', content: 'Genera los hashtags perfectos para Instagram y aumenta tu alcance y engagement. Herramienta gratuita para optimizar tus publicaciones.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Generador de Hashtags para Instagram | Aumenta Tu Alcance' },
      { name: 'twitter:description', content: 'Genera los hashtags perfectos para Instagram y aumenta tu alcance y engagement. Herramienta gratuita de TuPromptPerfecto.' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'canonical', content: window.location.href },
      { name: 'author', content: 'TuPromptPerfecto' },
      { name: 'language', content: 'Spanish' },
      { property: 'og:locale', content: 'es_ES' },
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
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Generador de Hashtags para Instagram",
      "description": "Herramienta gratuita para crear hashtags optimizados para Instagram y aumentar el alcance y engagement de tus publicaciones.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "author": {
        "@type": "Organization",
        "name": "TuPromptPerfecto"
      }
    };
    
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);
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
            
            {/* Add manual refresh button */}
            <div className="flex justify-center mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleUpdateHashtags}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Actualizando hashtags de tendencia...' : 'Actualizar hashtags de tendencia'}
              </Button>
            </div>
            {updateStatus?.success && (
              <p className="text-sm text-green-600 dark:text-green-400">
                {updateStatus.message} 
                {updateStatus.stats && ` (${updateStatus.stats.total} hashtags actualizados)`}
              </p>
            )}
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">¿Por qué son importantes los hashtags en Instagram?</h2>
            <p>
              Los hashtags son una herramienta fundamental para aumentar la visibilidad de tus publicaciones en Instagram. 
              Un buen uso de hashtags puede multiplicar tu alcance, atraer nuevos seguidores y aumentar el engagement de tu cuenta.
              Según estudios recientes, las publicaciones con al menos 11 hashtags obtienen un 79% más de interacción.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Beneficios de usar hashtags efectivos:</h2>
            <ul className="list-disc pl-6">
              <li>Incrementa la visibilidad de tus publicaciones hasta un 12.6% según datos de Instagram</li>
              <li>Atrae a una audiencia más específica e interesada en tu contenido</li>
              <li>Ayuda a posicionarte como referente en tu nicho</li>
              <li>Aumenta las posibilidades de aparecer en la sección "Explorar"</li>
              <li>Mejora el engagement (likes, comentarios, guardados) de tus posts</li>
              <li>Permite que tu contenido sea descubierto por usuarios que no te siguen</li>
              <li>Aumenta tus seguidores orgánicos a largo plazo</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo usar nuestra herramienta:</h2>
            <ol className="list-decimal pl-6">
              <li>Introduce el tema principal de tu publicación (ej. "fotografía de paisajes", "recetas veganas")</li>
              <li>Añade una descripción más detallada para obtener hashtags más específicos (opcional)</li>
              <li>Haz clic en "Generar hashtags para Instagram"</li>
              <li>Obtén una lista de hashtags populares y de nicho optimizados para tu contenido</li>
              <li>Copia todos los hashtags o selecciona los que prefieras con un solo clic</li>
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
              <li><strong>Agrupa tus hashtags:</strong> Crea conjuntos de hashtags para diferentes tipos de contenido.</li>
              <li><strong>Aprovecha los hashtags geográficos:</strong> Incluye ubicaciones específicas si tu contenido es local.</li>
              <li><strong>Utiliza hashtags de comunidad:</strong> Participa en hashtags de comunidades para conectar con usuarios afines.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Errores comunes a evitar:</h2>
            <ul className="list-disc pl-6">
              <li>Usar hashtags prohibidos o restringidos por Instagram</li>
              <li>Utilizar hashtags demasiado genéricos (#love, #instagood) sin combinarlos con otros más específicos</li>
              <li>Abusar de hashtags irrelevantes solo porque son populares</li>
              <li>No investigar el significado de los hashtags antes de usarlos</li>
              <li>Colocar los hashtags de forma visible en la descripción principal en lugar de en comentarios o al final del texto</li>
              <li>Exceder el límite de 30 hashtags por publicación</li>
              <li>Repetir exactamente los mismos hashtags en publicaciones consecutivas</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo estructurar tus hashtags en Instagram:</h2>
            <ol className="list-decimal pl-6">
              <li><strong>En la descripción:</strong> Colócalos al final de tu descripción, separados del texto principal por varios saltos de línea.</li>
              <li><strong>En un comentario:</strong> Publica tu contenido sin hashtags y luego añádelos en el primer comentario para mantener tu descripción limpia.</li>
              <li><strong>Organización visual:</strong> Agrupa tus hashtags por categorías usando puntos o emojis como separadores.</li>
              <li><strong>Cantidad óptima:</strong> Instagram permite hasta 30 hashtags, pero estudios recientes sugieren que entre 8-15 hashtags es lo ideal para maximizar el engagement.</li>
            </ol>
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
