import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';
export type Theme = 'dark' | 'light';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cvUrls: {
    fr: {
      url: string;
      filename: string;
      label: string;
    };
    en: {
      url: string;
      filename: string;
      label: string;
    };
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to 'fr'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('portfolio_lang') as Language;
      if (savedLang === 'en' || savedLang === 'fr') return savedLang;
      // Default to French as requested
      return 'fr';
    } catch {
      return 'fr';
    }
  });

  // Initialize theme from localStorage or default to 'dark'
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio_theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage', e);
    }
  }, [theme]);

  // Apply language html attribute and save
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('portfolio_lang', language);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState(prev => (prev === 'fr' ? 'en' : 'fr'));

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));

  // CV files mapping directly to provided PDF attachments in public/
  const cvUrls = {
    fr: {
      url: '/CV_Jaures_MOUZOUN_FR.pdf',
      filename: 'CV_Jaures_MOUZOUN_FR.pdf',
      label: 'CV en Français',
    },
    en: {
      url: '/CV_Jaures_MOUZOUN_EN.pdf',
      filename: 'Resume_Jaures_MOUZOUN_EN.pdf',
      label: 'Resume in English',
    },
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        cvUrls,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
