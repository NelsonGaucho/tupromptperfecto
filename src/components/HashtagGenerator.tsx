
import { useState } from 'react';
import { SocialPlatform } from '@/types/hashtag';
import HashtagForm from './hashtag/HashtagForm';
import HashtagDisplay from './hashtag/HashtagDisplay';
import HashtagTips from './hashtag/HashtagTips';
import { sanitizeInput } from '@/utils/security';
import { generateHashtags } from '@/utils/hashtagGenerator';
import { useToast } from '@/hooks/use-toast';

interface HashtagGeneratorProps {
  platform: SocialPlatform;
}

const HashtagGenerator = ({ platform }: HashtagGeneratorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [popularHashtags, setPopularHashtags] = useState<string[]>([]);
  const [nicheHashtags, setNicheHashtags] = useState<string[]>([]);
  const [youtubeFormattedHashtags, setYoutubeFormattedHashtags] = useState<string>('');

  const handleHashtagsGenerated = (
    allHashtags: string[], 
    popular: string[], 
    niche: string[], 
    youtubeFormatted?: string
  ) => {
    setHashtags(allHashtags);
    setPopularHashtags(popular);
    setNicheHashtags(niche);
    
    if (platform === 'youtube' && youtubeFormatted) {
      setYoutubeFormattedHashtags(youtubeFormatted);
    }
  };

  const refreshHashtags = async () => {
    if (hashtags.length === 0) return;
    
    setLoading(true);
    
    try {
      // We'll need to extract the topic from existing hashtags to refresh
      // This is a simplistic approach - in a real app we might want to store the original topic
      const topicTag = hashtags[0].startsWith('#') ? hashtags[0].substring(1) : hashtags[0];
      const sanitizedTopic = sanitizeInput(topicTag);
      
      // Regenerate hashtags with slightly different results
      const result = await generateHashtags(platform, sanitizedTopic);
      
      setHashtags(result.all);
      setPopularHashtags(result.popular);
      setNicheHashtags(result.niche);
      
      // Set YouTube formatted hashtags if available
      if (platform === 'youtube' && result.formattedForYoutube) {
        setYoutubeFormattedHashtags(result.formattedForYoutube);
      }
      
      toast({
        title: "¡Hashtags actualizados!",
        description: `Se han regenerado los hashtags`,
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
      <HashtagForm 
        platform={platform}
        onHashtagsGenerated={handleHashtagsGenerated}
        setLoading={setLoading}
        loading={loading}
      />

      {hashtags.length > 0 && (
        <>
          <HashtagDisplay
            platform={platform}
            hashtags={hashtags}
            popularHashtags={popularHashtags}
            nicheHashtags={nicheHashtags}
            youtubeFormattedHashtags={youtubeFormattedHashtags}
            loading={loading}
            onRefresh={refreshHashtags}
          />
          
          <HashtagTips platform={platform} />
        </>
      )}
    </div>
  );
};

export default HashtagGenerator;
