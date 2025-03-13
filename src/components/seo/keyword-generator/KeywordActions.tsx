
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Keyword {
  keyword: string;
  searchVolume: number;
  competition: number;
  difficulty: number;
  cpc: number;
}

interface KeywordActionsProps {
  keywords: Keyword[];
}

const KeywordActions = ({ keywords }: KeywordActionsProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "Las palabras clave se han copiado correctamente",
    });
  };

  return (
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
  );
};

export default KeywordActions;
