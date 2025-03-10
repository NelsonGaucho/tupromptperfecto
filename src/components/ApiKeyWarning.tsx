
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ApiKeyWarningProps {
  apiName?: string;
  onClose?: () => void;
}

const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ apiName = "OpenAI", onClose }) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error de API</AlertTitle>
      <AlertDescription>
        No se pudo conectar a la API de {apiName}. Es posible que la clave API haya expirado o sea incorrecta. 
        Estamos utilizando una versión local del generador hasta que se resuelva el problema.
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
