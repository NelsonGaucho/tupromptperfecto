
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-12 py-6 px-6 bg-secondary/50 border-t border-border text-center text-sm text-muted-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link to="/instagram-hashtags" className="hover:underline">Instagram Hashtags</Link>
          <Link to="/youtube-hashtags" className="hover:underline">YouTube Etiquetas</Link>
          <Link to="/x-hashtags" className="hover:underline">X Hashtags</Link>
          <Link to="/seo-keywords" className="hover:underline">Keywords SEO</Link>
          <Link to="/about-us" className="hover:underline">Sobre Nosotros</Link>
          <Link to="/contact" className="hover:underline">Contacto</Link>
        </div>
        
        <p>© {currentYear} TuPromptPerfecto. Todos los derechos reservados.</p>
        
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link to="/privacy-policy" className="hover:underline">Política de Privacidad</Link>
          <Link to="/terms-and-conditions" className="hover:underline">Términos y Condiciones</Link>
          <Link to="/legal-notice" className="hover:underline">Aviso Legal</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
