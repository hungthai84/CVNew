'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface ParallaxTiltIconProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (e.g. 15)
  glowColor?: string; // hex or rgba
  scaleOnHover?: number;
}

export const ParallaxTiltIcon: React.FC<ParallaxTiltIconProps> = ({
  children,
  className = '',
  maxTilt = 14,
  glowColor = 'rgba(56, 189, 248, 0.4)',
  scaleOnHover = 1.08,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none [perspective:800px] ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22,
          mass: 0.6,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {/* Lớp phản quang ánh sáng kính mờ 3D (3D Gloss Sheen) */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, rgba(255,255,255,0.02) 65%, transparent 80%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Nội dung Icon/3D Illustration ở mặt trước nổi (Z-axis elevation) */}
        <div style={{ transform: 'translateZ(24px)' }} className="w-full h-full flex items-center justify-center relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
