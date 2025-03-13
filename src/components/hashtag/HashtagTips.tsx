
import { SocialPlatform } from '@/types/hashtag';

interface HashtagTipsProps {
  platform: SocialPlatform;
}

const HashtagTips = ({ platform }: HashtagTipsProps) => {
  const platformTitle = {
    instagram: 'Instagram',
    youtube: 'YouTube',
    twitter: 'X (Twitter)',
  };

  return (
    <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
      <p className="font-medium mb-2">
        {platform === 'youtube' 
          ? `Consejos para usar etiquetas en ${platformTitle[platform]}:` 
          : `Consejos para usar hashtags en ${platformTitle[platform]}:`}
      </p>
      <ul className="list-disc list-inside space-y-1">
        {platform === 'instagram' && (
          <>
            <li>Instagram permite hasta 30 hashtags por publicación.</li>
            <li>Combina hashtags populares con hashtags de nicho para mayor alcance.</li>
            <li>Puedes colocar los hashtags en el primer comentario para mantener tu descripción limpia.</li>
            <li>Cambia tus hashtags regularmente para alcanzar diferentes audiencias.</li>
          </>
        )}
        {platform === 'youtube' && (
          <>
            <li>YouTube permite hasta 15 etiquetas por video.</li>
            <li>Los primeras 3 etiquetas aparecerán sobre el título del video.</li>
            <li>Utiliza el formato de etiquetas separadas por comas sin el símbolo #.</li>
            <li>Usa etiquetas específicas relacionadas con el contenido de tu video.</li>
            <li>No uses demasiadas etiquetas para evitar parecer spam.</li>
          </>
        )}
        {platform === 'twitter' && (
          <>
            <li>X recomienda usar no más de 2-3 hashtags por tweet.</li>
            <li>Usa hashtags cortos y fáciles de recordar.</li>
            <li>Verifica si el hashtag ya está siendo usado y su contexto.</li>
            <li>Considera hashtags trending para mayor visibilidad.</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default HashtagTips;
