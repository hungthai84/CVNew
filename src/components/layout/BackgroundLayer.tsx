'use client';

import React from 'react';
import { SiteTheme } from '@/types';
import { FloatingIcons } from './FloatingIcons';

export interface BackgroundLayerProps {
  wallpaperClass?: string;
  wallpaperStyle?: React.CSSProperties;
  wallpaperVideo?: string;
  theme?: SiteTheme;
  currentPage?: number;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  wallpaperClass = 'prism-light-bg',
  wallpaperStyle = {},
  wallpaperVideo,
  theme = 'light-glass',
  currentPage = 0,
}) => {
  const hasCustomWallpaper =
    Boolean(wallpaperStyle?.background) ||
    Boolean(wallpaperStyle?.backgroundImage) ||
    Boolean(wallpaperStyle?.backgroundColor) ||
    Boolean(wallpaperClass && wallpaperClass !== 'prism-light-bg' && wallpaperClass !== 'dark-neon-bg');

  return (
    <>
      {wallpaperVideo ? (
        <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
          <video
            key={wallpaperVideo}
            src={wallpaperVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Subtle contrast tint overlay */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Dynamic Floating Icons above video background */}
          <FloatingIcons theme={theme} currentPage={currentPage} />
        </div>
      ) : (
        <div
          className={`fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none transition-all duration-700 ${wallpaperClass}`}
          style={wallpaperStyle}
        >
          {/* THEME 1 & SÁNG: Light Multi-color Ambient Flares (Chỉ hiển thị khi không dùng hình nền tùy biến riêng) */}
          {!hasCustomWallpaper && (theme === 'light-glass' || theme === 'pastel-sky' || theme === 'crystal-glass' || theme === 'aurora' || theme === 'purple-pastel') && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* 1. Top-Left: Coral Rose & Hot Pink */}
              <div
                className="absolute -top-[5%] -left-[3%] w-[460px] h-[460px] bg-gradient-to-tr from-rose-400/24 via-pink-400/16 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '6.5s' }}
              />
              {/* 2. Top-Center: Electric Sky & Ocean Blue */}
              <div
                className="absolute -top-[8%] left-[32%] w-[480px] h-[480px] bg-gradient-to-b from-sky-400/26 via-blue-500/14 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '8.5s' }}
              />
              {/* 3. Top-Right: Orchid Fuchsia & Rich Violet */}
              <div
                className="absolute -top-[4%] -right-[3%] w-[470px] h-[470px] bg-gradient-to-bl from-fuchsia-400/22 via-purple-500/16 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '7.5s' }}
              />
              {/* 4. Mid-Left: Mint Teal & Fresh Lime */}
              <div
                className="absolute top-[38%] -left-[6%] w-[440px] h-[440px] bg-gradient-to-r from-teal-400/22 via-lime-400/14 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '9.5s' }}
              />
              {/* 5. Center-Core: Prismatic Sheen & Electric Indigo */}
              <div
                className="absolute top-[28%] left-[30%] w-[520px] h-[520px] bg-gradient-to-tr from-indigo-400/18 via-sky-300/12 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '10.5s' }}
              />
              {/* 6. Mid-Right: Sunset Orange & Warm Amber */}
              <div
                className="absolute top-[36%] -right-[5%] w-[450px] h-[450px] bg-gradient-to-l from-orange-400/22 via-amber-400/16 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '8s' }}
              />
              {/* 7. Bottom-Left: Emerald Green & Mint Teal */}
              <div
                className="absolute -bottom-[6%] -left-[4%] w-[490px] h-[490px] bg-gradient-to-tr from-emerald-400/22 via-teal-300/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '7s' }}
              />
              {/* 8. Bottom-Center: Royal Ocean & Indigo */}
              <div
                className="absolute -bottom-[8%] left-[34%] w-[480px] h-[480px] bg-gradient-to-t from-blue-600/20 via-indigo-500/16 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '9s' }}
              />
              {/* 9. Bottom-Right: Rich Violet & Hot Pink */}
              <div
                className="absolute -bottom-[5%] -right-[4%] w-[470px] h-[470px] bg-gradient-to-tl from-violet-500/24 via-pink-400/16 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: '11s' }}
              />
            </div>
          )}

          {/* DYNAMIC FLOATING ICONS (Tự động di chuyển vị trí ngẫu nhiên trên toàn website) */}
          <FloatingIcons theme={theme} currentPage={currentPage} />

          {/* THEME 3: Aurora Classic Orbs */}
          {!hasCustomWallpaper && theme === 'aurora' && (
            <>
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
            </>
          )}

          {/* THEME 6: Soft Pastel Purple UI */}
          {!hasCustomWallpaper && theme === 'purple-pastel' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div
                className="absolute -top-[10%] -left-[5%] w-[580px] h-[580px] rounded-full blur-3xl pointer-events-none opacity-60 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(196, 181, 253, 0.7) 0%, rgba(167, 139, 250, 0.35) 50%, transparent 70%)',
                  animationDuration: '8s',
                }}
              />
              <div
                className="absolute top-[25%] -right-[10%] w-[620px] h-[620px] rounded-full blur-3xl pointer-events-none opacity-60 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(165, 180, 252, 0.65) 0%, rgba(199, 210, 254, 0.35) 50%, transparent 70%)',
                  animationDuration: '9s',
                }}
              />
              <div
                className="absolute -bottom-[15%] left-[20%] w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none opacity-50 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(244, 208, 244, 0.65) 0%, rgba(221, 214, 254, 0.35) 50%, transparent 70%)',
                  animationDuration: '10s',
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
