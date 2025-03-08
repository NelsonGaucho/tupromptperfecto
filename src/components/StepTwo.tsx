
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

interface StepTwoProps {
  onBack: () => void;
  onGenerate: (data: {
    toneStyle: string;
    contentLength: string;
    audience: string;
    formatRequirements: string;
    additionalNotes: string;
  }) => void;
  initialData?: {
    toneStyle: string;
    contentLength: string;
    audience: string;
    formatRequirements: string;
    additionalNotes: string;
  };
}

const StepTwo = ({ onBack, onGenerate, initialData }: StepTwoProps) => {
  const { t } = useTranslation();
  const [toneStyle, setToneStyle] = useState<string>(initialData?.toneStyle || 'formal');
  const [contentLength, setContentLength] = useState<string>(initialData?.contentLength || 'medium');
  const [audience, setAudience] = useState<string>(initialData?.audience || '');
  const [formatRequirements, setFormatRequirements] = useState<string>(initialData?.formatRequirements || '');
  const [additionalNotes, setAdditionalNotes] = useState<string>(initialData?.additionalNotes || '');
  
  // Animation state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGenerate = () => {
    // Sanitize all inputs
    onGenerate({
      toneStyle: sanitizeInput(toneStyle),
      contentLength: sanitizeInput(contentLength),
      audience: sanitizeInput(audience),
      formatRequirements: sanitizeInput(formatRequirements),
      additionalNotes: sanitizeInput(additionalNotes)
    });
  };

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-medium text-foreground tracking-tight">
          {t('step2.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('step2.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="toneStyle">{t('step2.tone.label')}</Label>
            <Select value={toneStyle} onValueChange={setToneStyle}>
              <SelectTrigger id="toneStyle">
                <SelectValue placeholder={t('step2.tone.formal')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">{t('step2.tone.formal')}</SelectItem>
                <SelectItem value="casual">{t('step2.tone.casual')}</SelectItem>
                <SelectItem value="academic">{t('step2.tone.academic')}</SelectItem>
                <SelectItem value="creative">{t('step2.tone.creative')}</SelectItem>
                <SelectItem value="persuasive">{t('step2.tone.persuasive')}</SelectItem>
                <SelectItem value="instructional">{t('step2.tone.instructional')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentLength">{t('step2.length.label')}</Label>
            <Select value={contentLength} onValueChange={setContentLength}>
              <SelectTrigger id="contentLength">
                <SelectValue placeholder={t('step2.length.medium')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">{t('step2.length.short')}</SelectItem>
                <SelectItem value="medium">{t('step2.length.medium')}</SelectItem>
                <SelectItem value="long">{t('step2.length.long')}</SelectItem>
                <SelectItem value="flexible">{t('step2.length.flexible')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audience">{t('step2.audience.label')}</Label>
            <Input
              id="audience"
              placeholder={t('step2.audience.placeholder')}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="formatRequirements">{t('step2.format.label')}</Label>
            <Input
              id="formatRequirements"
              placeholder={t('step2.format.placeholder')}
              value={formatRequirements}
              onChange={(e) => setFormatRequirements(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">{t('step2.notes.label')}</Label>
        <Textarea
          id="additionalNotes"
          placeholder={t('step2.notes.placeholder')}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="min-h-[100px] resize-y"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" onClick={onBack}>
          {t('step2.back')}
        </Button>
        <Button onClick={handleGenerate}>
          {t('step2.generate')}
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
