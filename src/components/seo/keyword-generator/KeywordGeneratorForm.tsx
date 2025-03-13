
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sanitizeInput } from '@/utils/security';

interface KeywordGeneratorFormProps {
  onGenerateKeywords: (
    sanitizedTopic: string,
    sanitizedDescription: string,
    sanitizedIndustry: string,
    sanitizedLocation: string,
    keywordType: string
  ) => Promise<void>;
  loading: boolean;
}

const KeywordGeneratorForm = ({ onGenerateKeywords, loading }: KeywordGeneratorFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [keywordType, setKeywordType] = useState('all');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Por favor, introduce un tema para generar palabras clave.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Sanitize inputs to prevent XSS
      const sanitizedTopic = sanitizeInput(topic);
      const sanitizedDescription = sanitizeInput(description);
      const sanitizedIndustry = sanitizeInput(industry);
      const sanitizedLocation = sanitizeInput(location);
      
      await onGenerateKeywords(
        sanitizedTopic,
        sanitizedDescription,
        sanitizedIndustry,
        sanitizedLocation,
        keywordType
      );
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar el formulario. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="topic" className="block text-sm font-medium text-foreground">
          Tema principal
        </label>
        <Input
          id="topic"
          type="text"
          placeholder="Ej: marketing digital, yoga para principiantes, recetas sin gluten..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="industry" className="block text-sm font-medium text-foreground">
            Industria o nicho (opcional)
          </label>
          <Input
            id="industry"
            type="text"
            placeholder="Ej: salud, tecnología, moda..."
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-foreground">
            Ubicación (opcional)
          </label>
          <Input
            id="location"
            type="text"
            placeholder="Ej: España, México, global..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-foreground">
          Descripción (opcional)
        </label>
        <Textarea
          id="description"
          placeholder="Describe brevemente tu contenido, servicio o producto para obtener palabras clave más relevantes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="keywordType" className="block text-sm font-medium text-foreground">
          Tipo de palabras clave
        </label>
        <Select value={keywordType} onValueChange={setKeywordType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el tipo de palabras clave" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="informational">Informativas (cómo, qué, por qué)</SelectItem>
            <SelectItem value="commercial">Comerciales (comprar, precio)</SelectItem>
            <SelectItem value="navigational">Navegacionales (marca, producto)</SelectItem>
            <SelectItem value="transactional">Transaccionales (ofertas, descuentos)</SelectItem>
            <SelectItem value="longtail">Long Tail (frases específicas)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={loading || !topic.trim()} 
          className="w-full"
        >
          <Search className="h-5 w-5 mr-2" />
          {loading ? 'Generando palabras clave...' : 'Generar palabras clave SEO'}
        </Button>
      </div>
    </form>
  );
};

export default KeywordGeneratorForm;
