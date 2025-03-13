
import React from 'react';

const InstagramInfo = () => {
  return (
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
  );
};

export default InstagramInfo;
