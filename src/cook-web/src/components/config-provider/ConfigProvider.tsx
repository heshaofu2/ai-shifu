'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import '@/i18n';

interface ConfigContextType {
  isLoaded: boolean;
}

const ConfigContext = createContext<ConfigContextType>({ isLoaded: false });

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Use the environment configuration directly without additional loading
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load config:', error);
        setIsLoaded(true);
      }
    };

    loadConfig();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <ConfigContext.Provider value={{ isLoaded }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}

export default ConfigProvider;
