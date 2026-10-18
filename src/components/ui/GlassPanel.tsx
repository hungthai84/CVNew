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
      default: 'glass-panel',
      card: 'glass-panel rounded-[22px]',
      subtle: 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-md',
      header: 'glass-panel rounded-b-[24px] rounded-t-none',
      footer: 'glass-panel rounded-t-[24px] rounded-b-none',
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
