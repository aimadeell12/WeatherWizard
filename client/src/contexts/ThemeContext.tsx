import React, { createContext, useContext, useEffect, useState } from 'react';

interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  temperatureUnit: 'celsius' | 'fahrenheit';
  language: 'ar' | 'en';
  autoRefresh: boolean;
  refreshInterval: number;
}

interface ThemeContextType {
  settings: AppSettings;
  updateSetting: (key: keyof AppSettings, value: any) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

const defaultSettings: AppSettings = {
  darkMode: false,
  notifications: true,
  temperatureUnit: 'celsius',
  language: 'ar',
  autoRefresh: true,
  refreshInterval: 10,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Apply dark mode
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.darkMode]);

  useEffect(() => {
    // Apply language direction
    const html = document.documentElement;
    if (settings.language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
  }, [settings.language]);

  const updateSetting = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
  };

  const exportSettings = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (settingsJson: string) => {
    try {
      const parsed = JSON.parse(settingsJson);
      const validSettings = { ...defaultSettings, ...parsed };
      setSettings(validSettings);
      localStorage.setItem('appSettings', JSON.stringify(validSettings));
      return true;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  };

  return (
    <ThemeContext.Provider value={{
      settings,
      updateSetting,
      resetSettings,
      exportSettings,
      importSettings
    }}>
      {children}
    </ThemeContext.Provider>
  );
};