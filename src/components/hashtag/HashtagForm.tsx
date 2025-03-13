
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { SocialPlatform, PlatformConfig } from '@/types/hashtag';
import { sanitizeInput } from '@/utils/security';
import { generateHashtags } from '@/utils/hashtagGenerator';

interface HashtagFormProps {
  platform: SocialPlatform;
  onHashtagsGenerated: (hashtags: string[], popularHashtags: string[], nicheHashtags: string[], youtubeFormattedHashtags?: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const HashtagForm = ({ platform, onHashtagsGenerated, setLoading, loading }: HashtagFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const platformConfig: Record<SocialPlatform, PlatformConfig> = {
    instagram: {
      icon: <Instagram className="h-5 w-5 mr-2" />,
      title: 'Instagram',
      maxHashtags: 30,
    },
    youtube: {
      icon: <Youtube className="h-5 w-5 mr-2" />,
      title: 'YouTube',
      maxHashtags: 15,
    },
    twitter: {
      icon: <Twitter className="h-5 w-5 mr-2" />,
      title: 'X (Twitter)',
      maxHashtags: 10,
    },
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
      
      onHashtagsGenerated(
        result.all, 
        result.popular, 
        result.niche, 
        result.formattedForYoutube
      );
      
      toast({
        title: "¡Hashtags generados!",
        description: `Se han generado ${result.all.length} hashtags para ${platformConfig[platform].title}`,
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

  return (
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
              {platformConfig[platform].icon}
              {loading ? 'Generando hashtags...' : `Generar hashtags para ${platformConfig[platform].title}`}
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Máximo recomendado: {platformConfig[platform].maxHashtags} hashtags para {platformConfig[platform].title}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HashtagForm;
