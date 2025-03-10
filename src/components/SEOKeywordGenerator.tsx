
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Search, RefreshCw, Filter, ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { sanitizeInput } from '@/utils/security';
import { generateKeywords } from '@/utils/keywordGenerator';

interface Keyword {
  keyword: string;
  searchVolume: number;
  competition: number;
  difficulty: number;
  cpc: number;
}

const SEOKeywordGenerator = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [keywordType, setKeywordType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Keyword | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });

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
    
    setLoading(true);
    
    try {
      // Sanitize inputs to prevent XSS
      const sanitizedTopic = sanitizeInput(topic);
      const sanitizedDescription = sanitizeInput(description);
      const sanitizedIndustry = sanitizeInput(industry);
      const sanitizedLocation = sanitizeInput(location);
      
      // Generate keywords based on the inputs
      const result = await generateKeywords(
        sanitizedTopic, 
        sanitizedDescription, 
        sanitizedIndustry, 
        sanitizedLocation, 
        keywordType
      );
      
      setKeywords(result);
      
      toast({
        title: "¡Palabras clave generadas!",
        description: `Se han generado ${result.length} palabras clave para SEO`,
      });
    } catch (error) {
      console.error('Error generating keywords:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al generar las palabras clave. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "Las palabras clave se han copiado correctamente",
    });
  };

  const refreshKeywords = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    
    try {
      const sanitizedTopic = sanitizeInput(topic);
      const sanitizedDescription = sanitizeInput(description);
      const sanitizedIndustry = sanitizeInput(industry);
      const sanitizedLocation = sanitizeInput(location);
      
      // Regenerate keywords with slightly different results
      const result = await generateKeywords(
        sanitizedTopic, 
        sanitizedDescription, 
        sanitizedIndustry, 
        sanitizedLocation, 
        keywordType
      );
      
      setKeywords(result);
      
      toast({
        title: "¡Palabras clave actualizadas!",
        description: `Se han regenerado las palabras clave para SEO`,
      });
    } catch (error) {
      console.error('Error refreshing keywords:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar las palabras clave. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof Keyword) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  const sortedKeywords = [...keywords].sort((a, b) => {
    if (sortConfig.key === null || sortConfig.direction === null) {
      return 0;
    }
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortConfig.direction === 'ascending') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (sortConfig.direction === 'ascending') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
    
    return 0;
  });

  const getSortIcon = (key: keyof Keyword) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    
    if (sortConfig.direction === 'ascending') {
      return <ArrowUp className="h-4 w-4" />;
    }
    
    if (sortConfig.direction === 'descending') {
      return <ArrowDown className="h-4 w-4" />;
    }
    
    return <ArrowUpDown className="h-4 w-4" />;
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-green-600 dark:text-green-400";
    if (difficulty < 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return "Fácil";
    if (difficulty < 60) return "Medio";
    return "Difícil";
  };

  return (
    <div className="space-y-8">
      <Card className="bg-background border-border shadow-sm">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>

      {keywords.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Palabras clave generadas</h2>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={refreshKeywords}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <Card className="bg-background border-border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => handleSort('keyword')} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-1">
                          <span>Palabra clave</span>
                          {getSortIcon('keyword')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('searchVolume')} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-1">
                          <span>Volumen de búsqueda</span>
                          {getSortIcon('searchVolume')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('competition')} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-1">
                          <span>Competencia</span>
                          {getSortIcon('competition')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('difficulty')} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-1">
                          <span>Dificultad</span>
                          {getSortIcon('difficulty')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('cpc')} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-1">
                          <span>CPC (€)</span>
                          {getSortIcon('cpc')}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedKeywords.map((keyword, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                        <TableCell>{keyword.searchVolume.toLocaleString()}</TableCell>
                        <TableCell>{keyword.competition.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={getDifficultyColor(keyword.difficulty)}>
                            {keyword.difficulty}/100 ({getDifficultyLabel(keyword.difficulty)})
                          </span>
                        </TableCell>
                        <TableCell>{keyword.cpc.toFixed(2)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => copyToClipboard(keywords.map(k => k.keyword).join(', '))}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar todas las palabras clave
            </Button>
            
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                const csv = [
                  ['Palabra clave', 'Volumen de búsqueda', 'Competencia', 'Dificultad', 'CPC (€)'].join(','),
                  ...keywords.map(k => [
                    k.keyword,
                    k.searchVolume,
                    k.competition.toFixed(2),
                    k.difficulty,
                    k.cpc.toFixed(2)
                  ].join(','))
                ].join('\n');
                copyToClipboard(csv);
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar como CSV
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
            <p className="font-medium mb-2">Consejos para usar palabras clave SEO:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Utiliza las palabras clave en títulos, subtítulos, meta descripciones y URLs.</li>
              <li>Combina palabras clave de alta competencia con long tail para una estrategia equilibrada.</li>
              <li>Considera las palabras clave con menor dificultad para obtener resultados más rápidos.</li>
              <li>Analiza la intención de búsqueda detrás de cada palabra clave para crear contenido relevante.</li>
              <li>Actualiza periódicamente tu investigación de palabras clave para adaptarte a las tendencias.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOKeywordGenerator;
