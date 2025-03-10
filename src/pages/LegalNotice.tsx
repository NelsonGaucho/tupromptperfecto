
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LegalNotice = () => {
  useEffect(() => {
    document.title = "Aviso Legal | TuPromptPerfecto";
    
    const metaTags = [
      { name: 'description', content: 'Aviso Legal de TuPromptPerfecto. Información sobre los aspectos legales de nuestro sitio web.' },
      { property: 'og:title', content: 'Aviso Legal | TuPromptPerfecto' },
      { property: 'og:description', content: 'Información sobre los aspectos legales de nuestro sitio web TuPromptPerfecto.' },
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
              <CardTitle className="text-3xl font-bold">Aviso Legal</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm sm:prose max-w-none">
              <p className="text-lg">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">1. Información del Titular</h2>
              <p>
                <strong>Denominación Social:</strong> TuPromptPerfecto<br />
                <strong>Domicilio Social:</strong> Calle Ejemplo 123, 28001 Madrid, España<br />
                <strong>NIF/CIF:</strong> B12345678<br />
                <strong>Teléfono:</strong> +34 912 345 678<br />
                <strong>Email:</strong> info@tupromptperfecto.com<br />
                <strong>Inscripción en el Registro Mercantil:</strong> Registro Mercantil de Madrid, Tomo XX, Folio XX, Hoja XX, Inscripción XX
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">2. Objeto</h2>
              <p>
                El presente Aviso Legal regula el uso del servicio del sitio web TuPromptPerfecto, que el titular pone a disposición de los usuarios de Internet.
              </p>
              <p>
                La utilización del sitio web atribuye la condición de usuario del mismo e implica la aceptación de todas las condiciones incluidas en este Aviso Legal. 
                El usuario debe leer atentamente el presente Aviso Legal en cada una de las ocasiones en que se proponga utilizar el sitio web, ya que éste puede sufrir modificaciones.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">3. Propiedad Intelectual e Industrial</h2>
              <p>
                Todos los contenidos del sitio web, entendiendo por estos a título meramente enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, 
                links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual del titular o de terceros, 
                sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual.
              </p>
              <p>
                Las marcas, nombres comerciales o signos distintivos son titularidad del titular o terceros, sin que pueda entenderse que el acceso al sitio web atribuya ningún derecho sobre las citadas marcas, 
                nombres comerciales y/o signos distintivos.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">4. Condiciones de Uso</h2>
              <p>
                El usuario se compromete a utilizar el sitio web de conformidad con la ley, el presente Aviso Legal, así como con la moral y buenas costumbres. 
                A tal efecto, el usuario se abstendrá de utilizar la página con finalidades ilícitas o prohibidas, lesivas de derechos e intereses de terceros, o que de cualquier forma 
                puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los documentos, archivos y toda clase de contenidos almacenados en cualquier equipo 
                informático.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">5. Responsabilidad</h2>
              <p>
                El titular no garantiza la disponibilidad permanente de los servicios que se ofrecen a través del sitio web, si bien realizará todos los esfuerzos para mantenerlo en funcionamiento 
                durante las 24 horas del día, los 7 días de la semana.
              </p>
              <p>
                El titular no se responsabiliza de los posibles daños o perjuicios que se pudieran derivar de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas 
                o desconexiones en el funcionamiento operativo de este sistema electrónico, motivadas por causas ajenas al titular; de retrasos o bloqueos en el uso del presente sistema 
                electrónico causados por deficiencias o sobrecargas de líneas telefónicas o sobrecargas en el Centro de Procesos de Datos, en el sistema de Internet o en otros sistemas electrónicos.
              </p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-3">6. Legislación Aplicable y Jurisdicción</h2>
              <p>
                El presente Aviso Legal se rige por la legislación española. Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades 
                en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos 
                derivados o relacionados con su uso los Juzgados y Tribunales de Madrid.
              </p>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default LegalNotice;
