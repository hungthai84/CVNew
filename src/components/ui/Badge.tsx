'use client';

import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'slate' | 'pink' | 'cyan' | 'teal';
  size?: 'sm' | 'md';
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'blue',
  size = 'sm',
  pill = true,
  ...props
}) => {
  const variantStyles = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-100 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    teal: 'bg-teal-100 text-teal-700 border-teal-200',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-bold font-mono tracking-wide border shadow-2xs select-none',
        pill ? 'rounded-full' : 'rounded-lg',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
