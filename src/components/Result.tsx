
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { sanitizeHtml } from '@/utils/security';

interface ResultProps {
  promptText: string;
  tips: string[];
  onReset: () => void;
}

const Result = ({ promptText, tips, onReset }: ResultProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const promptRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Apply syntax highlighting to the prompt text
  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.innerHTML = sanitizeHtml(
        promptText.replace(/\n\n/g, '<br/><br/>')
                .replace(/\n/g, '<br/>')
                .replace(/^(##? .+)$/gm, '<span class="text-primary font-semibold">$1</span>')
                .replace(/(\*\*.*?\*\*)/g, '<span class="font-semibold">$1</span>')
                .replace(/(\*.*?\*)/g, '<span class="italic">$1</span>')
      );
    }
  }, [promptText]);

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-medium text-foreground tracking-tight">
          {t('result.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('result.subtitle')}
        </p>
      </div>

      <div className="relative">
        <div 
          ref={promptRef}
          className="w-full p-6 mb-4 bg-secondary/50 border border-border rounded-lg text-foreground font-mono text-sm whitespace-pre-wrap"
        />
        
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-3 right-3"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              {t('result.copied')}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              {t('result.copy')}
            </>
          )}
        </Button>
      </div>

      <div className="bg-accent/50 border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-3">
          {t('result.tips.title')}
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          {tips.map((tipKey, index) => (
            <li key={index} className="text-foreground">
              {t(tipKey)}
            </li>
          ))}
        </ul>
      </div>
      
      <Button onClick={onReset} className="mt-4">
        {t('result.new')}
      </Button>
    </div>
  );
};

export default Result;
