'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'subtle' | 'header' | 'footer';
  glowColor?: string;
  rounded?: string;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, variant = 'default', glowColor, rounded, style, ...props }, ref) => {
    const variantStyles = {
      default: 'glass-panel smart-adaptive-card rounded-[20px] glass-pastel',
      card: 'glass-panel rounded-[20px] smart-adaptive-card glass-pastel',
      subtle: 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-md smart-adaptive-card rounded-[20px]',
      header: 'glass-panel rounded-[24px]',
      footer: 'glass-panel rounded-[24px]',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          variantStyles[variant],
          rounded,
          className
        )}
        style={{
          ...(glowColor ? { '--glow-color': glowColor } as React.CSSProperties : {}),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
