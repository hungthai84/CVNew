'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import clsx from 'clsx';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const showToast = useCallback((msg: string) => {
    setTimeout(() => {
      setMessage(msg);
      setVisible(true);
    }, 0);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={clsx(
          'fixed top-20 right-8 z-[9999] px-4 py-2.5 rounded-2xl glass-panel text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center gap-2.5 border border-white dark:border-cyan-400/40 shadow-xl transition-all duration-300 pointer-events-none select-none',
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[-100px]'
        )}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-ping shrink-0" />
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
