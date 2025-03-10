
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const Header = () => {
  const { t, language, setLanguage, availableLanguages } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  // Initialize theme based on system preference or stored value
  useEffect(() => {
    // Check local storage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  }, []);

  // Update theme classes and store preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const tools = [
    { path: '/', name: 'Generador de Prompts' },
    { path: '/instagram-hashtags', name: 'Hashtags para Instagram' },
    { path: '/youtube-hashtags', name: 'Hashtags para YouTube' },
    { path: '/x-hashtags', name: 'Hashtags para X' },
    { path: '/seo-keywords', name: 'Palabras Clave SEO' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-background border-b border-border transition-all-300">
      <div className="flex items-center space-x-2 transition-all-300">
        <Link to="/" className="text-2xl font-display font-semibold text-foreground">
          {t('app.title')}
        </Link>
        {/* Removed the subtitle span that was here */}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {tools.map((tool) => (
          <Link key={tool.path} to={tool.path}>
            <Button 
              variant={isActive(tool.path) ? "secondary" : "ghost"} 
              size="sm"
              className={`px-3 ${isActive(tool.path) ? 'font-medium' : ''}`}
            >
              {tool.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full py-6">
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{t('app.title')}</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-1">
                  {tools.map((tool) => (
                    <SheetClose key={tool.path} asChild>
                      <Link to={tool.path}>
                        <Button 
                          variant={isActive(tool.path) ? "secondary" : "ghost"} 
                          className={`w-full justify-start text-left ${isActive(tool.path) ? 'font-medium' : ''}`}
                        >
                          {tool.name}
                        </Button>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Globe className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">{t('app.lang')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {availableLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={language === lang.code ? "bg-accent" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
