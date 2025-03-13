
import { SocialPlatform } from '@/types/hashtag';
import HashtagForm from './hashtag/HashtagForm';
import HashtagDisplay from './hashtag/HashtagDisplay';
import HashtagTips from './hashtag/HashtagTips';
import useHashtagGenerator from '@/hooks/useHashtagGenerator';

interface HashtagGeneratorProps {
  platform: SocialPlatform;
}

const HashtagGenerator = ({ platform }: HashtagGeneratorProps) => {
  const {
    loading,
    setLoading,
    hashtags,
    popularHashtags,
    nicheHashtags,
    youtubeFormattedHashtags,
    handleHashtagsGenerated,
    refreshHashtags
  } = useHashtagGenerator(platform);

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
