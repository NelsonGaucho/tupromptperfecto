
import React from 'react';

const YouTubeInfo = () => {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto mb-8 text-muted-foreground">
      <h2 className="text-2xl font-semibold text-foreground">¿Por qué son importantes las etiquetas en YouTube?</h2>
      <p>
        Las etiquetas son una herramienta fundamental para aumentar la visibilidad de tus videos en YouTube. 
        Un buen uso de etiquetas puede mejorar el posicionamiento de tus videos, aumentar las visualizaciones y atraer a nuevos suscriptores.
      </p>
      
      <h2 className="text-2xl font-semibold text-foreground mt-6">Beneficios de usar etiquetas en YouTube:</h2>
      <ul className="list-disc pl-6">
        <li>Mejoran la clasificación de tus videos en la búsqueda de YouTube</li>
        <li>Ayudan a que tus videos aparezcan en las secciones de "Videos relacionados"</li>
        <li>Permiten que tus videos sean descubiertos a través de clics en etiquetas</li>
        <li>Aumentan las posibilidades de que tus shorts se vuelvan virales</li>
        <li>Proporcionan contexto adicional para tus videos</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground mt-6">Cómo usar nuestra herramienta:</h2>
      <ol className="list-decimal pl-6">
        <li>Introduce el tema principal de tu video</li>
        <li>Añade una descripción breve del contenido específico (opcional)</li>
        <li>Haz clic en "Generar etiquetas para YouTube"</li>
        <li>¡Copia las etiquetas en formato optimizado para YouTube con un solo clic!</li>
      </ol>
    </div>
  );
};

export default YouTubeInfo;
