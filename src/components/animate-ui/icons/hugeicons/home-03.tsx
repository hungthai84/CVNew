'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home03Icon } from '@hugeicons/core-free-icons';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Home03Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const Home03: React.FC<Home03Props> = ({
  size = 20,
  color = 'currentColor',
  className,
  strokeWidth = 1.75,
  animateOnHover = true,
  animateOnTap = true,
  style,
  onClick,
}) => {
  return (
    <motion.span
      className={cn('inline-flex items-center justify-center shrink-0 select-none', className)}
      style={style}
      onClick={onClick}
      whileHover={
        animateOnHover
          ? {
              scale: 1.1,
              y: -2,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : undefined
      }
      whileTap={animateOnTap ? { scale: 0.92, transition: { duration: 0.1 } } : undefined}
    >
      <HugeiconsIcon
        icon={Home03Icon}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </motion.span>
  );
};

export { Home03Icon };
export default Home03;
