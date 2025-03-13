import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sanitizeInput } from '@/utils/security';
import KeywordGeneratorForm from './KeywordGeneratorForm';
import KeywordTable from './KeywordTable';
import KeywordActions from './KeywordActions';
import KeywordTips from './KeywordTips';
import { useKeywordGenerator } from './hooks/useKeywordGenerator';

const SEOKeywordGeneratorRefactored = () => {
  const {
    keywords,
    loading,
    sortConfig,
    generateKeywordsHandler,
    refreshKeywords,
    handleSort,
  } = useKeywordGenerator();

  // State for keeping track of the last used parameters for refreshing
  const [lastParams, setLastParams] = useState({
    topic: '',
    description: '',
    industry: '',
    location: '',
    keywordType: 'all'
  });

  const handleGenerateKeywords = async (
    sanitizedTopic: string,
    sanitizedDescription: string,
    sanitizedIndustry: string,
    sanitizedLocation: string,
    keywordType: string
  ) => {
    // Save the parameters for refresh functionality
    setLastParams({
      topic: sanitizedTopic,
      description: sanitizedDescription,
      industry: sanitizedIndustry,
      location: sanitizedLocation,
      keywordType
    });
    
    await generateKeywordsHandler(
      sanitizedTopic,
      sanitizedDescription,
      sanitizedIndustry,
      sanitizedLocation,
      keywordType
    );
  };

  const handleRefreshKeywords = async () => {
    if (!lastParams.topic.trim()) return;
    
    await refreshKeywords(
      lastParams.topic,
      lastParams.description,
      lastParams.industry,
      lastParams.location,
      lastParams.keywordType
    );
  };

  return (
    <div className="space-y-8">
      <Card className="bg-background border-border shadow-sm">
        <CardContent className="p-6">
          <KeywordGeneratorForm 
            onGenerateKeywords={handleGenerateKeywords}
            loading={loading}
          />
        </CardContent>
      </Card>

      {keywords.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Palabras clave generadas</h2>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRefreshKeywords}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <Card className="bg-background border-border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <KeywordTable 
                keywords={keywords}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </CardContent>
          </Card>
          
          <KeywordActions keywords={keywords} />
          
          <KeywordTips />
        </div>
      )}
    </div>
  );
};

export default SEOKeywordGeneratorRefactored;
