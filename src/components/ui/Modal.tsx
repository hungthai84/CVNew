'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '5xl' | '7xl';
  showCloseBtn?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = '2xl',
  showCloseBtn = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '5xl': 'max-w-5xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative w-full rounded-[14px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl border border-white/60 dark:border-white/15 flex flex-col text-slate-800 dark:text-slate-100 overflow-hidden max-h-[92vh] transition-colors duration-300 glass-pastel',
          maxWidthClasses[maxWidth]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseBtn) && (
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center font-bold">
                  {icon}
                </div>
              )}
              <div>
                {title && <h3 className="typo-card-title font-semibold text-slate-900 dark:text-white">{title}</h3>}
                {subtitle && <p className="typo-caption text-slate-500 dark:text-slate-400">{subtitle}</p>}
              </div>
            </div>
            {showCloseBtn && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center transition cursor-pointer"
                title="Đóng (Esc)"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto glass-scrollbar flex-1">{children}</div>
      </div>
    </div>
  );
};
