'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Notification01Icon } from '@hugeicons/core-free-icons';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Notification01Props {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const Notification01: React.FC<Notification01Props> = ({
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
              scale: 1.12,
              rotate: [0, -10, 10, -5, 0],
              transition: { duration: 0.35, ease: 'easeOut' },
            }
          : undefined
      }
      whileTap={animateOnTap ? { scale: 0.9, transition: { duration: 0.1 } } : undefined}
    >
      <HugeiconsIcon
        icon={Notification01Icon}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </motion.span>
  );
};

export { Notification01Icon };
export default Notification01;
