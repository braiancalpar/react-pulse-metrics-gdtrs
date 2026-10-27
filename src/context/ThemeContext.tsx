import React, { createContext, useContext, useState } from 'react';

const lightTheme = {
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    surface: '#ffffff',
    background: '#f3f4f6',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  borderRadius: '8px',
  fontFamily: "'Inter', sans-serif",
};

const darkTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    surface: '#1f2937',
    background: '#111827',
    textPrimary: '#f9fafb',
    textSecondary: '#9ca3af',
    border: '#374151',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  },
  borderRadius: '8px',
  fontFamily: "'Inter', sans-serif",
};

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
