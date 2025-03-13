
import React from 'react';

const YouTubeAdvancedTips = () => {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto my-8 text-muted-foreground">
      <h2 className="text-2xl font-semibold text-foreground">Consejos para aprovechar las etiquetas en YouTube:</h2>
      <ul className="list-disc pl-6">
        <li><strong>Usa etiquetas relevantes:</strong> Asegúrate de que las etiquetas estén relacionadas con el contenido de tu video.</li>
        <li><strong>Limita la cantidad:</strong> YouTube recomienda usar no más de 15 etiquetas por video.</li>
        <li><strong>Coloca estratégicamente:</strong> Las primeras tres etiquetas aparecerán sobre el título del video.</li>
        <li><strong>Formato correcto:</strong> En YouTube, puedes usar etiquetas sin el símbolo # separadas por comas, especialmente en la descripción.</li>
        <li><strong>Investiga tendencias:</strong> Utiliza etiquetas populares relacionadas con tu nicho para aumentar tu alcance.</li>
        <li><strong>Crea etiquetas específicas:</strong> Desarrolla etiquetas únicas para tu canal o serie de videos.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground mt-6">Errores comunes a evitar:</h2>
      <ul className="list-disc pl-6">
        <li>Usar etiquetas irrelevantes solo porque son populares</li>
        <li>Sobrecargar tu video con demasiadas etiquetas (más de 15)</li>
        <li>Usar etiquetas muy genéricas que no destacan tu contenido</li>
        <li>No investigar las etiquetas antes de usarlas</li>
        <li>Usar etiquetas prohibidas o con connotaciones negativas</li>
        <li>No actualizar tus etiquetas para diferentes tipos de contenido</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground mt-6">¿Dónde colocar las etiquetas en YouTube?</h2>
      <ol className="list-decimal pl-6">
        <li><strong>En el título:</strong> Puedes incluir 1-2 etiquetas al principio o final del título.</li>
        <li><strong>En la descripción:</strong> Ideal para colocar todas tus etiquetas, preferiblemente en las primeras líneas.</li>
        <li><strong>Como etiquetas:</strong> YouTube también extrae etiquetas de las etiquetas de tu video.</li>
      </ol>
    </div>
  );
};

export default YouTubeAdvancedTips;
