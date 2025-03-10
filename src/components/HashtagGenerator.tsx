
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Instagram, Youtube, Twitter, RefreshCw, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { sanitizeInput } from '@/utils/security';
import { generateHashtags } from '@/utils/hashtagGenerator';

interface HashtagGeneratorProps {
  platform: 'instagram' | 'youtube' | 'twitter';
}

const HashtagGenerator = ({ platform }: HashtagGeneratorProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [popularHashtags, setPopularHashtags] = useState<string[]>([]);
  const [nicheHashtags, setNicheHashtags] = useState<string[]>([]);

  const platformIcon = {
    instagram: <Instagram className="h-5 w-5 mr-2" />,
    youtube: <Youtube className="h-5 w-5 mr-2" />,
    twitter: <Twitter className="h-5 w-5 mr-2" />,
  };

  const platformTitle = {
    instagram: 'Instagram',
    youtube: 'YouTube',
    twitter: 'X (Twitter)',
  };

  const maxHashtags = {
    instagram: 30,
    youtube: 15,
    twitter: 10,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Por favor, introduce un tema para generar hashtags.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Sanitize inputs to prevent XSS
      const sanitizedTopic = sanitizeInput(topic);
      const sanitizedDescription = sanitizeInput(description);
      
      // Generate hashtags based on the platform and topic
      const result = await generateHashtags(platform, sanitizedTopic, sanitizedDescription);
      
      setHashtags(result.all);
      setPopularHashtags(result.popular);
      setNicheHashtags(result.niche);
      
      toast({
        title: "¡Hashtags generados!",
        description: `Se han generado ${result.all.length} hashtags para ${platformTitle[platform]}`,
      });
    } catch (error) {
      console.error('Error generating hashtags:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al generar los hashtags. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "Los hashtags se han copiado correctamente",
    });
  };

  const refreshHashtags = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    
    try {
      const sanitizedTopic = sanitizeInput(topic);
      const sanitizedDescription = sanitizeInput(description);
      
      // Regenerate hashtags with slightly different results
      const result = await generateHashtags(platform, sanitizedTopic, sanitizedDescription);
      
      setHashtags(result.all);
      setPopularHashtags(result.popular);
      setNicheHashtags(result.niche);
      
      toast({
        title: "¡Hashtags actualizados!",
        description: `Se han regenerado los hashtags para ${platformTitle[platform]}`,
      });
    } catch (error) {
      console.error('Error refreshing hashtags:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar los hashtags. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-background border-border shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="topic" className="block text-sm font-medium text-foreground">
                Tema o nicho
              </label>
              <Input
                id="topic"
                type="text"
                placeholder={`Ej: fotografía de paisajes, marketing digital, recetas veganas...`}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-foreground">
                Descripción (opcional)
              </label>
              <Textarea
                id="description"
                placeholder="Describe brevemente el contenido específico para obtener hashtags más relevantes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[100px]"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit"
                disabled={loading || !topic.trim()} 
                className="w-full"
              >
                {platformIcon[platform]}
                {loading ? 'Generando hashtags...' : `Generar hashtags para ${platformTitle[platform]}`}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Máximo recomendado: {maxHashtags[platform]} hashtags para {platformTitle[platform]}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {hashtags.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Hashtags generados</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={refreshHashtags}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Regenerar hashtags</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Card className="bg-background border-border shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {hashtags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm flex items-center"
                  >
                    <Hash className="h-3.5 w-3.5 mr-1" />
                    {tag.startsWith('#') ? tag.substring(1) : tag}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => copyToClipboard(hashtags.map(tag => (tag.startsWith('#') ? tag : `#${tag}`)).join(' '))}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar todos
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => copyToClipboard(hashtags.map(tag => (tag.startsWith('#') ? tag : `#${tag}`)).join('\n'))}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar uno por línea
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-background border-border shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hashtags populares</h3>
                <div className="flex flex-wrap gap-2">
                  {popularHashtags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm flex items-center"
                    >
                      <Hash className="h-3.5 w-3.5 mr-1" />
                      {tag.startsWith('#') ? tag.substring(1) : tag}
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => copyToClipboard(popularHashtags.map(tag => (tag.startsWith('#') ? tag : `#${tag}`)).join(' '))}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar hashtags populares
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-border shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hashtags de nicho</h3>
                <div className="flex flex-wrap gap-2">
                  {nicheHashtags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-sm flex items-center"
                    >
                      <Hash className="h-3.5 w-3.5 mr-1" />
                      {tag.startsWith('#') ? tag.substring(1) : tag}
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => copyToClipboard(nicheHashtags.map(tag => (tag.startsWith('#') ? tag : `#${tag}`)).join(' '))}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar hashtags de nicho
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
            <p className="font-medium mb-2">Consejos para usar hashtags en {platformTitle[platform]}:</p>
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
                  <li>YouTube permite hasta 15 hashtags por video.</li>
                  <li>Los primeros 3 hashtags aparecerán sobre el título del video.</li>
                  <li>Usa hashtags específicos relacionados con el contenido de tu video.</li>
                  <li>No uses demasiados hashtags para evitar parecer spam.</li>
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
        </div>
      )}
    </div>
  );
};

export default HashtagGenerator;
