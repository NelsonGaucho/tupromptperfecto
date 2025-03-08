
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-12 py-6 px-6 bg-secondary/50 border-t border-border text-center text-sm text-muted-foreground">
      <div className="max-w-5xl mx-auto">
        <p>© {currentYear} TuPromptPerfecto. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
