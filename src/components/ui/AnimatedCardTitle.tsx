'use client';

import React from 'react';
import { motion } from 'motion/react';
import { WebIcon } from './WebIcon';

export interface AnimatedCardTitleProps {
  title: string;
  iconName?: string;
  className?: string;
}

export const AnimatedCardTitle: React.FC<AnimatedCardTitleProps> = ({
  title,
  iconName = 'sparkles',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        animate={{ y: [0, -3, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-blue-600 dark:text-cyan-400 shrink-0"
      >
        <WebIcon name={iconName} className="w-5 h-5" />
      </motion.div>
      <h3 className="text-base sm:text-lg font-bold font-play bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
        {title}
      </h3>
    </div>
  );
};
