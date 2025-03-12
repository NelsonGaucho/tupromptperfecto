
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Result from './Result';
import { generatePrompt, generateTips } from '@/utils/generatePrompt';
import { useToast } from '@/components/ui/use-toast';

interface PromptData {
  promptType: string;
  promptDescription: string;
  toneStyle: string;
  contentLength: string;
  audience: string;
  formatRequirements: string;
  additionalNotes: string;
}

const PromptGenerator = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [promptData, setPromptData] = useState<PromptData>({
    promptType: '',
    promptDescription: '',
    toneStyle: 'formal',
    contentLength: 'medium',
    audience: '',
    formatRequirements: '',
    additionalNotes: '',
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [promptTips, setPromptTips] = useState<string[]>([]);
  const [exiting, setExiting] = useState<boolean>(false);

  const handleStepOneComplete = (data: { promptType: string; promptDescription: string }) => {
    setExiting(true);
    setTimeout(() => {
      setPromptData(prevData => ({
        ...prevData,
        ...data
      }));
      setCurrentStep(2);
      setExiting(false);
    }, 300);
  };

  const handleBackToStepOne = () => {
    setExiting(true);
    setTimeout(() => {
      setCurrentStep(1);
      setExiting(false);
    }, 300);
  };

  const handleGeneratePrompt = (data: {
    toneStyle: string;
    contentLength: string;
    audience: string;
    formatRequirements: string;
    additionalNotes: string;
  }) => {
    setExiting(true);
    setTimeout(() => {
      const updatedPromptData = {
        ...promptData,
        ...data
      };
      
      setPromptData(updatedPromptData);
      
      const prompt = generatePrompt(updatedPromptData);
      setGeneratedPrompt(prompt);
      
      const tips = generateTips(updatedPromptData.promptType);
      setPromptTips(tips);
      
      setCurrentStep(3);
      setExiting(false);
      
      toast({
        title: t('result.success'),
        description: t('result.ready'),
      });
    }, 300);
  };

  const handleReset = () => {
    setExiting(true);
    setTimeout(() => {
      setPromptData({
        promptType: '',
        promptDescription: '',
        toneStyle: 'formal',
        contentLength: 'medium',
        audience: '',
        formatRequirements: '',
        additionalNotes: '',
      });
      setGeneratedPrompt('');
      setPromptTips([]);
      setCurrentStep(1);
      setExiting(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {currentStep < 3 && (
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -z-10" />
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium border-2 ${
                  step === currentStep
                    ? 'border-primary bg-primary text-white'
                    : step < currentStep
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-muted-foreground/30 bg-background text-muted-foreground'
                } transition-all duration-300`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <div className="text-center">{t('step1.title')}</div>
            <div className="text-center">{t('step2.title')}</div>
          </div>
        </div>
      )}

      <div className={`bg-background border border-border rounded-xl shadow-sm p-6 md:p-8 overflow-hidden transition-all duration-300 ${exiting ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
        {currentStep === 1 && (
          <StepOne
            onContinue={handleStepOneComplete}
            initialData={{
              promptType: promptData.promptType,
              promptDescription: promptData.promptDescription
            }}
          />
        )}
        
        {currentStep === 2 && (
          <StepTwo
            onBack={handleBackToStepOne}
            onGenerate={handleGeneratePrompt}
            initialData={{
              toneStyle: promptData.toneStyle,
              contentLength: promptData.contentLength,
              audience: promptData.audience,
              formatRequirements: promptData.formatRequirements,
              additionalNotes: promptData.additionalNotes
            }}
          />
        )}
        
        {currentStep === 3 && (
          <Result
            promptText={generatedPrompt}
            tips={promptTips}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default PromptGenerator;
