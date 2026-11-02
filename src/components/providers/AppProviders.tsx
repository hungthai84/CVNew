'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { LanguageProvider } from '@/context/LanguageContext';
import { InstantHotReloadGuard } from '@/components/ui/InstantHotReloadGuard';
import { OfflineFallback } from '@/components/ui/OfflineFallback';
import { SmartResourcePreloader } from '@/components/ui/SmartResourcePreloader';

export interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950" />;
  }

  return (
    <ToastProvider>
      <LanguageProvider>
        <InstantHotReloadGuard>
          {children}
          <OfflineFallback />
          <SmartResourcePreloader />
        </InstantHotReloadGuard>
      </LanguageProvider>
    </ToastProvider>
  );
};

export default AppProviders;
