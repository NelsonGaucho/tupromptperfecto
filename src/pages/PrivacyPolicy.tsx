
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Política de Privacidad | TuPromptPerfecto";
    
    const metaTags = [
      { name: 'description', content: 'Política de Privacidad de TuPromptPerfecto. Información sobre cómo recopilamos, usamos y protegemos tus datos.' },
      { property: 'og:title', content: 'Política de Privacidad | TuPromptPerfecto' },
      { property: 'og:description', content: 'Información sobre cómo recopilamos, usamos y protegemos tus datos en TuPromptPerfecto.' },
    ];
    
    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[${Object.keys(tag)[0]}="${Object.keys(tag)[1]}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(Object.keys(tag)[0], Object.values(tag)[0] as string);
        meta.setAttribute(Object.keys(tag)[1], Object.values(tag)[1] as string);
        document.head.appendChild(meta);
      } else {
        meta.setAttribute(Object.values(tag)[0] as string, Object.values(tag)[1] as string);
      }
    });
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Política de Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm sm:prose max-w-none">
              <p className="text-lg">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">1. Introducción</h2>
              <p>
                En TuPromptPerfecto, accesible desde https://tupromptperfecto.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes. 
                Este documento de Política de Privacidad contiene información sobre qué datos recopilamos y cómo los utilizamos.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">2. Información que recopilamos</h2>
              <p>
                <strong>Información proporcionada voluntariamente:</strong> Cuando utilizas nuestras herramientas, como el generador de prompts o los generadores de hashtags, 
                recopilamos la información que proporcionas para poder ofrecer el servicio solicitado.
              </p>
              <p>
                <strong>Información recopilada automáticamente:</strong> Nuestro sitio utiliza cookies y tecnologías similares para recopilar cierta información automáticamente. 
                Esto puede incluir su dirección IP, tipo de navegador, páginas de referencia/salida, sistema operativo, fecha/hora y datos de clickstream.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">3. Uso de la información</h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul className="list-disc pl-6 my-3">
                <li>Proporcionar, operar y mantener nuestro sitio web</li>
                <li>Mejorar, personalizar y expandir nuestro sitio web</li>
                <li>Entender y analizar cómo utilizas nuestro sitio web</li>
                <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
                <li>Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios</li>
                <li>Mostrar anuncios personalizados</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">4. Cookies</h2>
              <p>
                TuPromptPerfecto utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos que un sitio o su proveedor de servicios 
                transfiere al disco duro de su ordenador a través de su navegador web (si usted lo permite).
              </p>
              <p>
                Utilizamos cookies para entender y guardar las preferencias del usuario para futuras visitas y para compilar datos agregados sobre el tráfico del sitio.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">5. Servicios de terceros</h2>
              <p>Utilizamos servicios de terceros que pueden recopilar información utilizada para identificarlo.</p>
              <p>
                <strong>Google AdSense:</strong> Utilizamos Google AdSense para mostrar anuncios. Google, como proveedor externo, utiliza cookies para mostrar anuncios basados en visitas 
                anteriores de los usuarios a nuestro sitio web. El uso que hace Google de la cookie de DoubleClick permite a Google y a sus socios mostrar anuncios a los usuarios en 
                función de su visita a nuestro sitio web u otros sitios web de Internet.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">6. Derechos de los usuarios</h2>
              <p>Si eres residente de la Unión Europea, tienes los siguientes derechos relacionados con tus datos personales:</p>
              <ul className="list-disc pl-6 my-3">
                <li>Derecho de acceso</li>
                <li>Derecho de rectificación</li>
                <li>Derecho de supresión</li>
                <li>Derecho a la limitación del tratamiento</li>
                <li>Derecho a la portabilidad de los datos</li>
                <li>Derecho de oposición</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, por favor, contacta con nosotros a través de la información de contacto proporcionada al final de esta política.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">7. Cambios en esta política</h2>
              <p>
                Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta Política de Privacidad, por favor contáctanos a través de correo electrónico: info@tupromptperfecto.com
              </p>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default PrivacyPolicy;
