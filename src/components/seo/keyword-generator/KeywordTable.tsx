
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

interface Keyword {
  keyword: string;
  searchVolume: number;
  competition: number;
  difficulty: number;
  cpc: number;
}

interface KeywordTableProps {
  keywords: Keyword[];
  sortConfig: {
    key: keyof Keyword | null;
    direction: 'ascending' | 'descending' | null;
  };
  onSort: (key: keyof Keyword) => void;
}

const KeywordTable = ({ keywords, sortConfig, onSort }: KeywordTableProps) => {
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => onSort('keyword')} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Palabra clave</span>
                {getSortIcon('keyword')}
              </div>
            </TableHead>
            <TableHead onClick={() => onSort('searchVolume')} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Volumen de búsqueda</span>
                {getSortIcon('searchVolume')}
              </div>
            </TableHead>
            <TableHead onClick={() => onSort('competition')} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Competencia</span>
                {getSortIcon('competition')}
              </div>
            </TableHead>
            <TableHead onClick={() => onSort('difficulty')} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Dificultad</span>
                {getSortIcon('difficulty')}
              </div>
            </TableHead>
            <TableHead onClick={() => onSort('cpc')} className="cursor-pointer hover:bg-muted/50 transition-colors">
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
  );
};

export default KeywordTable;
