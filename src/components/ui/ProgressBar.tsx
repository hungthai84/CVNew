'use client';

import React from 'react';
import clsx from 'clsx';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  colorGradient?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
  colorGradient = 'from-blue-500 to-cyan-500',
  className,
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full', className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-bold">
          {label && <span className="text-slate-800 truncate">{label}</span>}
          {showPercent && (
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-500 bg-gradient-to-r', colorGradient)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
