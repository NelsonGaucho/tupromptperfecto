
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, this would send an email through a backend API
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarnos. Te responderemos lo antes posible.",
      });
      
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Contacto | TuPromptPerfecto</title>
        <meta name="description" content="¿Tienes alguna pregunta o sugerencia? Ponte en contacto con nosotros y te responderemos lo antes posible." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow p-4 sm:p-6 md:p-8 container max-w-7xl mx-auto">
        <section className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Contacto</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Ponte en contacto</h2>
              <p className="text-muted-foreground mb-6">
                ¿Tienes alguna pregunta, sugerencia o feedback sobre nuestras herramientas? 
                Nos encantaría escucharte. Completa el formulario y te responderemos a la mayor brevedad posible.
              </p>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <a href="mailto:nelsinho2024yt@gmail.com" className="hover:underline">
                  nelsinho2024yt@gmail.com
                </a>
              </div>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="¿En qué podemos ayudarte?"
                    rows={5}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Preguntas frecuentes</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">¿Son realmente gratuitas todas las herramientas?</h3>
                <p>
                  Sí, todas nuestras herramientas son completamente gratuitas. Nuestro objetivo es proporcionar recursos útiles a la comunidad de creadores de contenido sin barreras de entrada.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">¿Cómo puedo sugerir una nueva herramienta?</h3>
                <p>
                  Nos encantaría escuchar tus ideas. Simplemente envíanos un mensaje a través del formulario de contacto explicando qué herramienta te gustaría ver en nuestra plataforma.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">¿Ofrecen servicios de consultoría para optimización SEO?</h3>
                <p>
                  Actualmente nos enfocamos en proporcionar herramientas automatizadas, pero estamos abiertos a discutir proyectos de consultoría. Contáctanos para más información.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">¿Cómo puedo apoyar este proyecto?</h3>
                <p>
                  La mejor manera de apoyarnos es compartiendo nuestras herramientas con otros creadores de contenido y proporcionándonos feedback para mejorar. ¡Cada sugerencia cuenta!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
