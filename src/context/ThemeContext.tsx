'use client';

import React, { createContext, useContext } from 'react';
import { SiteTheme } from '@/types';

export interface ThemeContextType {
  theme: SiteTheme | string;
  setTheme?: (theme: SiteTheme | string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'mritech-digital-growth',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{
  theme?: SiteTheme | string;
  children: React.ReactNode;
}> = ({ theme = 'mritech-digital-growth', children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
