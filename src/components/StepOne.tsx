
import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeInput } from '@/utils/security';

interface StepOneProps {
  onContinue: (data: { promptType: string; promptDescription: string }) => void;
  initialData?: { promptType: string; promptDescription: string };
}

const StepOne = ({ onContinue, initialData }: StepOneProps) => {
  const { t } = useTranslation();
  const [promptType, setPromptType] = useState<string>(initialData?.promptType || '');
  const [promptDescription, setPromptDescription] = useState<string>(initialData?.promptDescription || '');
  const [error, setError] = useState<string | null>(null);

  // Animation state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContinue = () => {
    // Basic validation
    if (!promptType) {
      setError(t('step1.category.placeholder'));
      return;
    }
    
    if (promptDescription.trim().length < 20) {
      setError('Please provide a more detailed description (minimum 20 characters).');
      return;
    }
    
    // Clear any errors
    setError(null);
    
    // Sanitize inputs before passing them up
    onContinue({
      promptType: sanitizeInput(promptType),
      promptDescription: sanitizeInput(promptDescription)
    });
  };

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-medium text-foreground tracking-tight">
          {t('step1.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('step1.description')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="promptType">{t('step1.category.label')}</Label>
          <Select 
            value={promptType} 
            onValueChange={setPromptType}
          >
            <SelectTrigger id="promptType" className="w-full">
              <SelectValue placeholder={t('step1.category.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="creative">{t('step1.category.creative')}</SelectItem>
              <SelectItem value="technical">{t('step1.category.technical')}</SelectItem>
              <SelectItem value="business">{t('step1.category.business')}</SelectItem>
              <SelectItem value="academic">{t('step1.category.academic')}</SelectItem>
              <SelectItem value="personal">{t('step1.category.personal')}</SelectItem>
              <SelectItem value="educational">{t('step1.category.educational')}</SelectItem>
              <SelectItem value="other">{t('step1.category.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="promptDescription">{t('step1.description.label')}</Label>
          <Textarea
            id="promptDescription"
            placeholder={t('step1.description.placeholder')}
            value={promptDescription}
            onChange={(e) => setPromptDescription(e.target.value)}
            className="min-h-[120px] resize-y"
          />
        </div>
        
        {error && (
          <div className="text-sm font-medium text-destructive">{error}</div>
        )}

        <Button 
          onClick={handleContinue} 
          className="w-full sm:w-auto"
        >
          {t('step1.continue')}
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
