'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GlassmorphicIconFrameProps {
  children: ReactNode;
  color?: string;
  glowColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  springBounce?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

const SIZE_MAP = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-14 h-14 text-xl',
};

/**
 * Khung Tròn / Bo Góc Nền Kính Mờ Hào Quang Siêu Thực (Glassmorphic Glow Icon Frame)
 * - Nền kính mờ: backdrop-blur-md với độ trong suốt tinh tế
 * - Vệt sáng gradient siêu thực tỏa hào quang khi hover chuột
 * - Hiệu ứng nảy nhẹ tự nhiên theo vật lý (Micro-animated icon physics)
 */
export const GlassmorphicIconFrame: React.FC<GlassmorphicIconFrameProps> = ({
  children,
  color = '#06b6d4',
  glowColor,
  size = 'md',
  shape = 'circle',
  springBounce = true,
  className,
  onClick,
  title,
}) => {
  const effectiveGlow = glowColor || color;

  return (
    <div
      onClick={onClick}
      title={title}
      style={
        {
          '--frame-glow-color': color,
          '--frame-glow-shadow': effectiveGlow,
        } as React.CSSProperties
      }
      className={cn(
        'glass-icon-frame select-none transition-all duration-300',
        SIZE_MAP[size],
        shape === 'circle' ? 'rounded-full' : 'rounded-2xl',
        springBounce && 'icon-spring-bounce cursor-pointer',
        className
      )}
    >
      {/* Vệt sáng gradient siêu thực phản quang */}
      <span
        className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${color}35 0%, transparent 70%)`,
        }}
      />

      {/* Icon bên trong với màu năng động */}
      <div
        className="relative z-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      >
        {children}
      </div>
    </div>
  );
};
