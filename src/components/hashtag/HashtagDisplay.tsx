
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, RefreshCw, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SocialPlatform } from '@/types/hashtag';

interface HashtagDisplayProps {
  platform: SocialPlatform;
  hashtags: string[];
  popularHashtags: string[];
  nicheHashtags: string[];
  youtubeFormattedHashtags?: string;
  loading: boolean;
  onRefresh: () => void;
}

const HashtagDisplay = ({ 
  platform, 
  hashtags, 
  popularHashtags, 
  nicheHashtags, 
  youtubeFormattedHashtags,
  loading,
  onRefresh
}: HashtagDisplayProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "Los hashtags se han copiado correctamente",
    });
  };

  if (hashtags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hashtags generados</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onRefresh}
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
          {platform === 'youtube' && youtubeFormattedHashtags && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Hashtags para YouTube (formato recomendado)</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="break-words">{youtubeFormattedHashtags}</p>
              </div>
              <Button 
                variant="secondary" 
                className="mt-3 w-full"
                onClick={() => copyToClipboard(youtubeFormattedHashtags)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar hashtags para YouTube
              </Button>
            </div>
          )}
        
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
    </div>
  );
};

export default HashtagDisplay;
