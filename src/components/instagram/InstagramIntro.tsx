
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';

const InstagramIntro = () => {
  const { isUpdating, updateStatus, updateTrendingKeywords } = usePromptGenerator();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Trigger update of trending hashtags
  const handleUpdateHashtags = async () => {
    try {
      setIsRefreshing(true);
      await updateTrendingKeywords();
      toast({
        title: "¡Actualización completa!",
        description: "Los hashtags de tendencia han sido actualizados correctamente.",
      });
    } catch (error) {
      console.error("Error updating hashtags:", error);
      toast({
        title: "Error",
        description: "No se pudieron actualizar los hashtags de tendencia. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center mb-8 animate-slide-in-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
      <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
        Generador de Hashtags para Instagram
      </h1>
      <p className="text-xl text-muted-foreground mb-6">
        Crea los mejores hashtags para aumentar el alcance de tus publicaciones en Instagram
      </p>
      
      {/* Add manual refresh button */}
      <div className="flex justify-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleUpdateHashtags}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Actualizando hashtags de tendencia...' : 'Actualizar hashtags de tendencia'}
        </Button>
      </div>
      {updateStatus?.success && (
        <p className="text-sm text-green-600 dark:text-green-400">
          {updateStatus.message} 
          {updateStatus.stats && ` (${updateStatus.stats.total} hashtags actualizados)`}
        </p>
      )}
    </div>
  );
};

export default InstagramIntro;
