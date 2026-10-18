'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SiteTheme } from '@/types';

interface FloatingIconConfig {
  id: string;
  name: string;
  lightGlow: string;
  neonGlow: string;
  defaultTop: number;
  defaultLeft: number;
  minTop: number;
  maxTop: number;
  minLeft: number;
  maxLeft: number;
  floatAnim: string;
  svg: React.ReactNode;
}

const ICONS_CONFIG: FloatingIconConfig[] = [
  {
    id: 'globe',
    name: 'Website Globe',
    lightGlow: 'light-glow-cyan',
    neonGlow: 'neon-glow-cyan',
    defaultTop: 7,
    defaultLeft: 4,
    minTop: 3,
    maxTop: 30,
    minLeft: 2,
    maxLeft: 26,
    floatAnim: 'animate-[neon-float-1_7s_ease-in-out_infinite]',
    svg: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 'cpu',
    name: 'CPU Chip',
    lightGlow: 'light-glow-rose',
    neonGlow: 'neon-glow-magenta',
    defaultTop: 9,
    defaultLeft: 91,
    minTop: 4,
    maxTop: 32,
    minLeft: 74,
    maxLeft: 95,
    floatAnim: 'animate-[neon-float-2_8s_ease-in-out_infinite]',
    svg: (
      <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  },
  {
    id: 'star',
    name: 'Sparkle Star',
    lightGlow: 'light-glow-amber',
    neonGlow: 'neon-glow-amber',
    defaultTop: 13,
    defaultLeft: 47,
    minTop: 4,
    maxTop: 24,
    minLeft: 30,
    maxLeft: 68,
    floatAnim: 'animate-[neon-float-3_6.5s_ease-in-out_infinite]',
    svg: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
      </svg>
    ),
  },
  {
    id: 'code',
    name: 'Code Brackets',
    lightGlow: 'light-glow-emerald',
    neonGlow: 'neon-glow-green',
    defaultTop: 42,
    defaultLeft: 3.5,
    minTop: 30,
    maxTop: 66,
    minLeft: 1.5,
    maxLeft: 22,
    floatAnim: 'animate-[neon-float-2_9s_ease-in-out_infinite]',
    svg: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'diamond',
    name: 'Diamond Crystal',
    lightGlow: 'light-glow-cyan',
    neonGlow: 'neon-glow-cyan',
    defaultTop: 46,
    defaultLeft: 93,
    minTop: 30,
    maxTop: 66,
    minLeft: 76,
    maxLeft: 96,
    floatAnim: 'animate-[neon-float-1_7.5s_ease-in-out_infinite]',
    svg: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20M10 3l-2 6 4 12 4-12-2-6" />
      </svg>
    ),
  },
  {
    id: 'lightning',
    name: 'Lightning Bolt',
    lightGlow: 'light-glow-amber',
    neonGlow: 'neon-glow-amber',
    defaultTop: 83,
    defaultLeft: 7,
    minTop: 66,
    maxTop: 92,
    minLeft: 2,
    maxLeft: 26,
    floatAnim: 'animate-[neon-float-3_8.5s_ease-in-out_infinite]',
    svg: (
      <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 'heart',
    name: 'Customer Care Heart',
    lightGlow: 'light-glow-rose',
    neonGlow: 'neon-glow-magenta',
    defaultTop: 85,
    defaultLeft: 88,
    minTop: 66,
    maxTop: 92,
    minLeft: 74,
    maxLeft: 95,
    floatAnim: 'animate-[neon-float-2_7s_ease-in-out_infinite]',
    svg: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'shield',
    name: 'Security Shield',
    lightGlow: 'light-glow-purple',
    neonGlow: 'neon-glow-purple',
    defaultTop: 88,
    defaultLeft: 48,
    minTop: 72,
    maxTop: 93,
    minLeft: 30,
    maxLeft: 68,
    floatAnim: 'animate-[neon-float-1_9.5s_ease-in-out_infinite]',
    svg: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

interface IconPositionState {
  top: number;
  left: number;
  duration: number;
  rotate: number;
  scale: number;
}

export interface FloatingIconsProps {
  theme?: SiteTheme;
  currentPage?: number;
}

export const FloatingIcons: React.FC<FloatingIconsProps> = ({
  theme = 'light-glass',
  currentPage = 0,
}) => {
  const isDark = theme === 'dark-neon';

  // Initial deterministic positions matching defaults for clean SSR
  const [positions, setPositions] = useState<IconPositionState[]>(() =>
    ICONS_CONFIG.map((cfg) => ({
      top: cfg.defaultTop,
      left: cfg.defaultLeft,
      duration: 7,
      rotate: 0,
      scale: 1,
    }))
  );

  // Helper to calculate a new random position for a specific icon
  const getRandomPosition = useCallback((cfg: FloatingIconConfig, customDuration?: number): IconPositionState => {
    const rangeY = cfg.maxTop - cfg.minTop;
    const rangeX = cfg.maxLeft - cfg.minLeft;
    const top = +(cfg.minTop + Math.random() * rangeY).toFixed(2);
    const left = +(cfg.minLeft + Math.random() * rangeX).toFixed(2);
    const rotate = Math.round((Math.random() - 0.5) * 26); // -13deg to +13deg
    const scale = +(0.92 + Math.random() * 0.18).toFixed(2); // 0.92 to 1.10
    const duration = customDuration ?? +(6 + Math.random() * 5).toFixed(1); // 6s to 11s

    return { top, left, duration, rotate, scale };
  }, []);

  // Scatter/move a single icon by index
  const triggerMoveIcon = useCallback((index: number, fastSpeed?: boolean) => {
    setPositions((prev) => {
      const next = [...prev];
      const cfg = ICONS_CONFIG[index];
      if (!cfg) return prev;
      next[index] = getRandomPosition(cfg, fastSpeed ? 2.2 : undefined);
      return next;
    });
  }, [getRandomPosition]);

  // Timers ref to avoid memory leaks
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Independent randomized floating movement intervals for each icon
  useEffect(() => {
    // 1. Initial random stagger on client mount
    setPositions(ICONS_CONFIG.map((cfg) => getRandomPosition(cfg, 4.5)));

    // Clear previous timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // Schedule independent random drift loops for each of the 8 icons
    ICONS_CONFIG.forEach((cfg, index) => {
      const scheduleNextMove = () => {
        // Random wait between 5.5s and 10.5s before next move
        const delayMs = Math.floor(5500 + Math.random() * 5000);
        const timer = setTimeout(() => {
          triggerMoveIcon(index);
          scheduleNextMove();
        }, delayMs);
        timersRef.current[index] = timer;
      };

      // Initial staggered start
      const initialDelay = Math.floor(1000 + Math.random() * 3500);
      const firstTimer = setTimeout(() => {
        triggerMoveIcon(index);
        scheduleNextMove();
      }, initialDelay);
      timersRef.current[index] = firstTimer;
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [getRandomPosition, triggerMoveIcon]);

  // Wave of movement whenever user switches pages
  useEffect(() => {
    // When switching pages, all icons smoothly drift to fresh random locations
    const waveTimer = setTimeout(() => {
      setPositions((prev) =>
        prev.map((_, i) => {
          const cfg = ICONS_CONFIG[i];
          return getRandomPosition(cfg, +(3.5 + Math.random() * 2.5).toFixed(1));
        })
      );
    }, 150);

    return () => clearTimeout(waveTimer);
  }, [currentPage, getRandomPosition]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {ICONS_CONFIG.map((cfg, index) => {
        const pos = positions[index] || {
          top: cfg.defaultTop,
          left: cfg.defaultLeft,
          duration: 7,
          rotate: 0,
          scale: 1,
        };

        const glowClass = isDark ? cfg.neonGlow : cfg.lightGlow;
        const iconBaseClass = isDark ? 'neon-floating-icon' : 'light-floating-icon';

        return (
          <div
            key={cfg.id}
            className="absolute transition-all ease-in-out pointer-events-none select-none"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transitionProperty: 'top, left, transform',
              transitionDuration: `${pos.duration}s, ${pos.duration}s, 0.8s`,
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              zIndex: 1,
            }}
          >
            {/* Inner bobbing animation container with interactive hover / click */}
            <div
              onClick={() => triggerMoveIcon(index, true)}
              title={`${cfg.name} (Nhấp chuột để di chuyển)`}
              className={`
                ${iconBaseClass}
                ${glowClass}
                ${cfg.floatAnim}
                cursor-pointer
                pointer-events-auto
                transition-all
                duration-300
                hover:scale-130
                hover:opacity-100
                active:scale-95
                active:rotate-45
                opacity-75
              `}
            >
              {cfg.svg}
            </div>
          </div>
        );
      })}
    </div>
  );
};
