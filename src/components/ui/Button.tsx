'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'pill' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  glowColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      glowColor,
      gradientFrom,
      gradientTo,
      style,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-tight select-none transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-40 disabled:pointer-events-none';

    const sizeStyles = {
      sm: 'px-2.5 py-1 text-xs rounded-[999px] gap-1.5',
      md: 'px-4 py-2 text-xs sm:text-sm rounded-[999px] gap-2',
      lg: 'px-5 py-2.5 text-sm sm:text-base rounded-[999px] gap-2.5',
      icon: 'w-8 h-8 rounded-[999px] p-0 flex items-center justify-center',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20',
      secondary:
        'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs',
      glass:
        'bg-white/80 hover:bg-white text-slate-800 border border-white/90 backdrop-blur-md shadow-sm',
      pill:
        'rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs border border-slate-200',
      ghost:
        'bg-transparent hover:bg-slate-100/60 text-slate-700',
      gradient:
        'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:brightness-105',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          glowColor && 'rotate-glow-wrapper',
          className
        )}
        style={{
          ...(glowColor ? { '--glow-color': glowColor } as React.CSSProperties : {}),
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
