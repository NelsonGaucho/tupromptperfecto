
import { useState } from 'react';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PromptGenerator() {
  const { 
    categories, 
    loading, 
    error, 
    generatePrompt, 
    updateTrendingKeywords, 
    isUpdating, 
    updateStatus 
  } = usePromptGenerator();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedCategory || !keywords.trim()) {
      toast({
        title: "Error",
        description: "Por favor selecciona una categoría y añade palabras clave",
        variant: "destructive"
      });
      return;
    }

    const keywordsList = keywords.split(',').map(k => k.trim());
    const prompt = await generatePrompt(selectedCategory, keywordsList);

    if (prompt) {
      setGeneratedPrompt(prompt);
      toast({
        title: "¡Prompt generado!",
        description: "Tu prompt optimizado está listo para usar"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "¡Copiado!",
      description: "El prompt ha sido copiado al portapapeles"
    });
  };

  const handleUpdateKeywords = async () => {
    try {
      await updateTrendingKeywords();
      toast({
        title: "Actualización iniciada",
        description: "Estamos obteniendo keywords de tendencia, esto puede tomar un momento..."
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudieron actualizar las keywords de tendencia",
        variant: "destructive"
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Generador de Prompts SEO</h2>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Las keywords de tendencia se actualizan automáticamente a diario a las 00:00 hrs. También puedes actualizarlas manualmente con el botón.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button 
              variant="outline" 
              onClick={handleUpdateKeywords} 
              disabled={isUpdating}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Actualizando...' : 'Actualizar Keywords'}
            </Button>
          </div>
        </div>

        {updateStatus && (
          <Card className={`p-4 ${updateStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium">{updateStatus.success ? '✅ Actualización exitosa' : '❌ Error en la actualización'}</p>
            <p>{updateStatus.message}</p>
            {updateStatus.stats && (
              <div className="mt-2 text-sm">
                <p>Keywords obtenidas:</p>
                <ul className="list-disc pl-5">
                  <li>Google Trends: {updateStatus.stats.googleTrends}</li>
                  <li>Reddit: {updateStatus.stats.reddit}</li>
                  <li>AnswerThePublic: {updateStatus.stats.answerThePublic}</li>
                  <li>Total: {updateStatus.stats.total}</li>
                </ul>
              </div>
            )}
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="category">Categoría del Prompt</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Palabras Clave (separadas por comas)</Label>
          <Textarea
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="marketing digital, redes sociales, engagement..."
            className="min-h-[100px]"
          />
        </div>

        <Button onClick={handleGenerate} className="w-full">
          Generar Prompt Optimizado
        </Button>

        {generatedPrompt && (
          <Card className="p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <pre className="whitespace-pre-wrap">
              {generatedPrompt}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
}
