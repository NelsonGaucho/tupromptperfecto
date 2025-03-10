
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Key } from 'lucide-react';
import { toast } from 'sonner';

const OPENAI_KEY_STORAGE = 'openai_api_key';
const PERPLEXITY_KEY_STORAGE = 'perplexity_api_key';

const ApiSettings = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [perplexityKey, setPerplexityKey] = useState('');
  const [openaiKeyStored, setOpenaiKeyStored] = useState(false);
  const [perplexityKeyStored, setPerplexityKeyStored] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if keys exist in localStorage
    const storedOpenaiKey = localStorage.getItem(OPENAI_KEY_STORAGE);
    const storedPerplexityKey = localStorage.getItem(PERPLEXITY_KEY_STORAGE);
    
    if (storedOpenaiKey) {
      setOpenaiKey('•'.repeat(20)); // Mask the actual key
      setOpenaiKeyStored(true);
    }
    
    if (storedPerplexityKey) {
      setPerplexityKey('•'.repeat(20)); // Mask the actual key
      setPerplexityKeyStored(true);
    }
  }, []);

  const handleSaveOpenAI = () => {
    if (!openaiKey || openaiKey === '•'.repeat(20)) {
      toast.error('Por favor, introduce una API key válida');
      return;
    }

    localStorage.setItem(OPENAI_KEY_STORAGE, openaiKey);
    setOpenaiKeyStored(true);
    toast.success('API key de OpenAI guardada correctamente');
  };

  const handleSavePerplexity = () => {
    if (!perplexityKey || perplexityKey === '•'.repeat(20)) {
      toast.error('Por favor, introduce una API key válida');
      return;
    }

    localStorage.setItem(PERPLEXITY_KEY_STORAGE, perplexityKey);
    setPerplexityKeyStored(true);
    toast.success('API key de Perplexity guardada correctamente');
  };

  const handleClearOpenAI = () => {
    localStorage.removeItem(OPENAI_KEY_STORAGE);
    setOpenaiKey('');
    setOpenaiKeyStored(false);
    toast.success('API key de OpenAI eliminada');
  };

  const handleClearPerplexity = () => {
    localStorage.removeItem(PERPLEXITY_KEY_STORAGE);
    setPerplexityKey('');
    setPerplexityKeyStored(false);
    toast.success('API key de Perplexity eliminada');
  };

  const handleOpenaiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (openaiKeyStored) {
      // If user starts editing a stored key, clear the mask
      setOpenaiKey('');
      setOpenaiKeyStored(false);
    } else {
      setOpenaiKey(e.target.value);
    }
  };

  const handlePerplexityKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (perplexityKeyStored) {
      // If user starts editing a stored key, clear the mask
      setPerplexityKey('');
      setPerplexityKeyStored(false);
    } else {
      setPerplexityKey(e.target.value);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="mb-4"
            >
              Volver al inicio
            </Button>
            
            <h1 className="text-3xl font-bold mb-4">Configuración de API Keys</h1>
            <p className="text-muted-foreground mb-6">
              Introduce tus API keys para habilitar todas las funcionalidades de la aplicación.
              Estas claves se almacenarán de forma segura en tu navegador y nunca se compartirán.
            </p>
            
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Las API keys son privadas. No las compartas con nadie. TuPromptPerfecto nunca enviará tus claves a ningún servidor.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  OpenAI API Key
                </CardTitle>
                <CardDescription>
                  Necesaria para la generación de hashtags y funciones de ChatGPT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={openaiKey}
                      onChange={handleOpenaiKeyChange}
                    />
                  </div>
                  {openaiKeyStored && (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      API key guardada
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleClearOpenAI} disabled={!openaiKeyStored}>
                  Eliminar
                </Button>
                <Button onClick={handleSaveOpenAI}>
                  Guardar
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Perplexity API Key
                </CardTitle>
                <CardDescription>
                  Necesaria para la generación de keywords SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Input
                      type="password" 
                      placeholder="sk-..."
                      value={perplexityKey}
                      onChange={handlePerplexityKeyChange}
                    />
                  </div>
                  {perplexityKeyStored && (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      API key guardada
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleClearPerplexity} disabled={!perplexityKeyStored}>
                  Eliminar
                </Button>
                <Button onClick={handleSavePerplexity}>
                  Guardar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default ApiSettings;
