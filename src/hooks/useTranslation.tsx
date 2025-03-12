
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import translations from '../i18n/translations';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string }[];
};

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  // Add more languages as needed
];

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  availableLanguages,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    // Check localStorage first
    const storedLang = localStorage.getItem('language');
    if (storedLang && availableLanguages.some(lang => lang.code === storedLang)) {
      setLanguageState(storedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      
      // Check if we support the browser language
      if (availableLanguages.some(lang => lang.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
    
    // Set the HTML lang attribute
    document.documentElement.lang = language;
  }, []);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    
    // Return the key itself if not found
    console.log(`Translation missing for key: ${key}`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

export default useTranslation;
