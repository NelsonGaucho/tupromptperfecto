
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApiKeyWarningProps {
  apiName?: string;
  onClose?: () => void;
}

const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ apiName = "OpenAI", onClose }) => {
  const [hasOpenAIKey, setHasOpenAIKey] = useState(true);
  
  useEffect(() => {
    // Verificar si existe una clave de OpenAI en localStorage
    const openaiKey = localStorage.getItem('openai_api_key');
    setHasOpenAIKey(!!openaiKey);
  }, []);
  
  if (hasOpenAIKey) {
    return null; // No mostrar el aviso si ya hay una clave API
  }
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error de API</AlertTitle>
      <AlertDescription>
        No se pudo conectar a la API de {apiName}. Es posible que la clave API haya expirado o sea incorrecta. 
        Estamos utilizando una versión local del generador hasta que se resuelva el problema.
        <div className="mt-2">
          <Link 
            to="/api-settings" 
            className="text-white underline hover:text-white/90"
          >
            Configurar API Key
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
