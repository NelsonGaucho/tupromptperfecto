
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Términos y Condiciones | TuPromptPerfecto";
    
    const metaTags = [
      { name: 'description', content: 'Términos y Condiciones de TuPromptPerfecto. Información sobre las condiciones de uso de nuestros servicios.' },
      { property: 'og:title', content: 'Términos y Condiciones | TuPromptPerfecto' },
      { property: 'og:description', content: 'Información sobre las condiciones de uso de nuestros servicios en TuPromptPerfecto.' },
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
              <CardTitle className="text-3xl font-bold">Términos y Condiciones</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm sm:prose max-w-none">
              <p className="text-lg">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">1. Introducción</h2>
              <p>
                Estos Términos y Condiciones rigen el uso de TuPromptPerfecto y todos los servicios proporcionados a través de nuestro sitio web. 
                Al acceder a nuestro sitio web, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con estos términos y condiciones 
                o cualquier parte de estos términos y condiciones, no debes utilizar nuestro sitio web.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">2. Licencia de uso</h2>
              <p>
                A menos que se indique lo contrario, TuPromptPerfecto y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en TuPromptPerfecto. 
                Todos los derechos de propiedad intelectual están reservados.
              </p>
              <p>
                Puedes ver, descargar y imprimir páginas desde nuestro sitio web para tu uso personal, sujeto a las restricciones establecidas a continuación y en otros lugares de estos términos y condiciones.
              </p>
              <p>No debes:</p>
              <ul className="list-disc pl-6 my-3">
                <li>Republicar material de TuPromptPerfecto</li>
                <li>Vender, alquilar o sublicenciar material de TuPromptPerfecto</li>
                <li>Reproducir, duplicar o copiar material de TuPromptPerfecto</li>
                <li>Redistribuir contenido de TuPromptPerfecto</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">3. Limitaciones de responsabilidad</h2>
              <p>
                TuPromptPerfecto no será responsable ante ti (ya sea bajo la ley de contratos, la ley de responsabilidad civil o de otra manera) 
                en relación con el contenido o el uso, o de otra manera en relación con este sitio web:
              </p>
              <ul className="list-disc pl-6 my-3">
                <li>En la medida en que el sitio web se proporciona de forma gratuita, por cualquier pérdida directa;</li>
                <li>Por cualquier pérdida indirecta, especial o consecuente; o</li>
                <li>Por cualquier pérdida de negocio, ingresos, beneficios, oportunidades, datos, contratos, buena voluntad o ahorros.</li>
              </ul>
              <p>
                Nada en este sitio web descarta o limita la responsabilidad de TuPromptPerfecto por fraude, por muerte o lesiones personales causadas por su negligencia, 
                o por cualquier responsabilidad que no pueda ser excluida o limitada bajo la ley aplicable.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">4. Razonabilidad</h2>
              <p>
                Al utilizar este sitio web, aceptas que las exclusiones y limitaciones de responsabilidad establecidas en este descargo de responsabilidad del sitio web son razonables. 
                Si no crees que son razonables, no debes utilizar este sitio web.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">5. Otras partes</h2>
              <p>
                Aceptas que, como entidad de responsabilidad limitada, TuPromptPerfecto tiene interés en limitar la responsabilidad personal de sus funcionarios y empleados. 
                Aceptas que no presentarás ninguna reclamación personalmente contra los funcionarios o empleados de TuPromptPerfecto respecto a cualquier pérdida que sufras en relación 
                con el sitio web.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">6. Disposiciones inaplicables</h2>
              <p>
                Si alguna provisión de este descargo de responsabilidad del sitio web es, o se determina que es, inaplicable bajo la ley aplicable, eso no afectará la aplicabilidad de las otras 
                provisiones de este descargo de responsabilidad del sitio web.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">7. Modificaciones</h2>
              <p>
                TuPromptPerfecto puede revisar estos términos y condiciones en cualquier momento modificando esta página. Se espera que revises esta página de vez en cuando para tomar nota 
                de cualquier cambio que TuPromptPerfecto haya hecho, ya que son vinculantes para ti.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contacto</h2>
              <p>
                Si tienes alguna pregunta sobre estos términos y condiciones, por favor contáctanos a través de correo electrónico: info@tupromptperfecto.com
              </p>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default TermsAndConditions;
