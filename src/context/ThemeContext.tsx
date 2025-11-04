/**
 * Theme Context - Manages app theme and colors
 */

import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {colors, ThemeMode, ColorScheme} from '../theme/colors';
import {storage} from '../utils/storage';

interface ThemeContextType {
  theme: ThemeMode;
  colorScheme: ColorScheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const settings = await storage.getSettings();
    setThemeState(settings.theme);
  };

  const setTheme = async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    await storage.updateSettings({theme: newTheme});
  };

  const toggleTheme = () => {
    const themes: ThemeMode[] = ['light', 'dark', 'neon'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const colorScheme = colors[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        setTheme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
