
import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { t, language, setLanguage, availableLanguages } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-background border-b border-border transition-all-300">
      <div className="flex items-center space-x-2 transition-all-300">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          {t('app.title')}
        </h1>
        <span className="hidden md:inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {t('app.subtitle')}
        </span>
      </div>

      <div className="flex items-center space-x-2">
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
