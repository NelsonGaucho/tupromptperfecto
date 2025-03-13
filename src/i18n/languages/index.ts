
import en from './en';
import es from './es';

// Type declaration for translations
export interface TranslationsType {
  [key: string]: string;
}

// Interface for the translations object
export interface AllTranslationsType {
  [key: string]: TranslationsType;
}

// Combine all translations
const translations: AllTranslationsType = {
  en,
  es,
  // Add more languages as needed
};

export default translations;
