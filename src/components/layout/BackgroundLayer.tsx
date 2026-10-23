'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SiteTheme } from '@/types';
import { FloatingIcons } from './FloatingIcons';
import {
  sanitizeWallpaperStyle,
  CINEMATIC_LUT_PRESETS,
  CinematicLutPresetId,
} from '@/utils/wallpaperStorage';

export interface BackgroundLayerProps {
  wallpaperClass?: string;
  wallpaperStyle?: React.CSSProperties;
  wallpaperVideo?: string;
  theme?: SiteTheme;
  currentPage?: number;
  dimmerOpacity?: number; // 0 - 80
  blurAmount?: number; // 0 - 24
  parallaxEnabled?: boolean;
  weatherSyncEnabled?: boolean;
  weatherCondition?: string;
  cinematicLut?: CinematicLutPresetId;
  livingMeshEnabled?: boolean;
  livingMeshSpeed?: 'slow' | 'normal' | 'fast';
}

const RAIN_DROPS = [
  { left: '6%', delay: '0s', duration: '1.15s', height: 48 },
  { left: '14%', delay: '0.35s', duration: '0.95s', height: 62 },
  { left: '22%', delay: '0.7s', duration: '1.25s', height: 54 },
  { left: '31%', delay: '0.15s', duration: '1.05s', height: 68 },
  { left: '39%', delay: '0.55s', duration: '1.1s', height: 50 },
  { left: '47%', delay: '0.25s', duration: '0.9s', height: 64 },
  { left: '56%', delay: '0.8s', duration: '1.2s', height: 58 },
  { left: '64%', delay: '0.4s', duration: '1.0s', height: 60 },
  { left: '73%', delay: '0.1s', duration: '1.15s', height: 52 },
  { left: '81%', delay: '0.6s', duration: '0.95s', height: 66 },
  { left: '89%', delay: '0.3s', duration: '1.1s', height: 56 },
  { left: '95%', delay: '0.75s', duration: '1.05s', height: 48 },
];

const GLASS_DROPLETS = [
  { left: '12%', top: '18%', size: 6, delay: '0s' },
  { left: '28%', top: '34%', size: 8, delay: '1.2s' },
  { left: '44%', top: '15%', size: 5, delay: '2.1s' },
  { left: '62%', top: '27%', size: 7, delay: '0.7s' },
  { left: '78%', top: '22%', size: 9, delay: '1.6s' },
  { left: '86%', top: '48%', size: 6, delay: '2.5s' },
  { left: '19%', top: '68%', size: 7, delay: '0.9s' },
  { left: '53%', top: '74%', size: 8, delay: '1.8s' },
  { left: '74%', top: '79%', size: 6, delay: '0.4s' },
];

const WeatherAmbientOverlay: React.FC<{ condition?: string }> = ({ condition = 'Sunny' }) => {
  const norm = condition.toLowerCase();
  const isSunny = norm.includes('sun');
  const isRain = norm.includes('rain') || norm.includes('thunder') || norm.includes('lightning');
  const isStorm = norm.includes('thunder') || norm.includes('lightning');
  const isCloudyOrMist = norm.includes('cloud') || norm.includes('overcast');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2] transition-opacity duration-700">
      {/* 1. SUNNY: Warm Solar Rays & Golden Lens Flare */}
      {isSunny && (
        <>
          <div
            className="absolute -top-[18%] -right-[10%] w-[680px] h-[680px] rounded-full blur-3xl opacity-55 animate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(251, 191, 36, 0.36) 0%, rgba(245, 158, 11, 0.18) 42%, rgba(56, 189, 248, 0.08) 70%, transparent 85%)',
              animationDuration: '6s',
            }}
          />
          <div
            className="absolute top-0 inset-x-0 h-[45%] opacity-35"
            style={{
              background:
                'linear-gradient(135deg, rgba(254, 240, 138, 0.18) 0%, rgba(251, 191, 36, 0.08) 45%, transparent 75%)',
            }}
          />
        </>
      )}

      {/* 2. CLOUDY / OVERCAST: Soft Aurora Mist & Cool Atmospheric Veil */}
      {isCloudyOrMist && (
        <>
          <div
            className="absolute -top-[10%] left-[8%] w-[640px] h-[360px] rounded-full blur-3xl opacity-45 animate-pulse"
            style={{
              background:
                'radial-gradient(ellipse, rgba(148, 163, 184, 0.32) 0%, rgba(56, 189, 248, 0.16) 55%, transparent 80%)',
              animationDuration: '8s',
            }}
          />
          <div
            className="absolute bottom-[5%] right-[6%] w-[620px] h-[340px] rounded-full blur-3xl opacity-40 animate-pulse"
            style={{
              background:
                'radial-gradient(ellipse, rgba(167, 139, 250, 0.24) 0%, rgba(96, 165, 250, 0.14) 55%, transparent 80%)',
              animationDuration: '9.5s',
            }}
          />
        </>
      )}

      {/* 3. RAIN / STORM: Rain Streaks & Water Droplets on Glass */}
      {isRain && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: isStorm
                ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.34) 0%, rgba(30, 58, 138, 0.16) 60%, rgba(15, 23, 42, 0.28) 100%)'
                : 'linear-gradient(180deg, rgba(15, 23, 42, 0.18) 0%, rgba(56, 189, 248, 0.08) 100%)',
            }}
          />

          {/* Falling rain streaks */}
          {RAIN_DROPS.map((drop, idx) => (
            <div
              key={idx}
              className="absolute -top-16 w-[1.5px] rounded-full opacity-55 animate-bounce"
              style={{
                left: drop.left,
                height: `${drop.height}px`,
                background: 'linear-gradient(180deg, transparent, rgba(186, 230, 253, 0.85), transparent)',
                animationDuration: drop.duration,
                animationDelay: drop.delay,
                transform: 'rotate(12deg)',
              }}
            />
          ))}

          {/* Water droplets clinging to glass */}
          {GLASS_DROPLETS.map((d, idx) => (
            <div
              key={idx}
              className="absolute rounded-full border border-white/50 bg-sky-200/25 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] animate-pulse"
              style={{
                left: d.left,
                top: d.top,
                width: `${d.size}px`,
                height: `${d.size * 1.25}px`,
                animationDuration: '3.8s',
                animationDelay: d.delay,
              }}
            />
          ))}
        </>
      )}

      {/* 4. THUNDER STORM / LIGHTNING: Electric Atmospheric Glow */}
      {isStorm && (
        <div
          className="absolute -top-[12%] left-[25%] w-[680px] h-[420px] rounded-full blur-3xl opacity-35 animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(192, 132, 252, 0.38) 0%, rgba(56, 189, 248, 0.22) 45%, transparent 75%)',
            animationDuration: '3.2s',
          }}
        />
      )}
    </div>
  );
};

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  wallpaperClass = 'prism-light-bg',
  wallpaperStyle = {},
  wallpaperVideo,
  theme = 'light-glass',
  currentPage = 0,
  dimmerOpacity = 0,
  blurAmount = 0,
  parallaxEnabled = true,
  weatherSyncEnabled = false,
  weatherCondition = 'Sunny',
  cinematicLut = 'none',
  livingMeshEnabled = true,
  livingMeshSpeed = 'normal',
}) => {
  const safeWallpaperStyle = sanitizeWallpaperStyle(wallpaperStyle);
  const hasCustomWallpaper =
    Boolean(safeWallpaperStyle?.background) ||
    Boolean(safeWallpaperStyle?.backgroundImage) ||
    Boolean(safeWallpaperStyle?.backgroundColor) ||
    Boolean(wallpaperClass && wallpaperClass !== 'prism-light-bg' && wallpaperClass !== 'dark-neon-bg');

  const isGradientOrCssWallpaper =
    !wallpaperVideo &&
    !(
      typeof safeWallpaperStyle?.backgroundImage === 'string' &&
      safeWallpaperStyle.backgroundImage.trim().toLowerCase().startsWith('url(')
    );

  const livingMeshClass =
    livingMeshEnabled && isGradientOrCssWallpaper
      ? livingMeshSpeed === 'slow'
        ? 'living-mesh-slow'
        : livingMeshSpeed === 'fast'
        ? 'living-mesh-fast'
        : 'living-mesh-normal'
      : '';

  const activeLutPreset =
    CINEMATIC_LUT_PRESETS.find((lut) => lut.id === cinematicLut) || CINEMATIC_LUT_PRESETS[0];
  const lutFilterStyle: React.CSSProperties =
    activeLutPreset.id !== 'none' ? { filter: activeLutPreset.cssFilter } : {};

  // Subtle Mouse Parallax state for Desktop
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!parallaxEnabled) {
      setParallaxOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return; // Desktop only
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const normY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        // Subtle 3D depth movement (-14px to +14px)
        setParallaxOffset({
          x: Number((-normX * 14).toFixed(2)),
          y: Number((-normY * 14).toFixed(2)),
        });
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [parallaxEnabled]);

  const parallaxStyle: React.CSSProperties = parallaxEnabled
    ? {
        transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0) scale(1.045)`,
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }
    : {};

  const showFilterOverlay = dimmerOpacity > 0 || blurAmount > 0;
  const filterOverlayStyle: React.CSSProperties = {
    backgroundColor: dimmerOpacity > 0 ? `rgba(5, 8, 20, ${(dimmerOpacity / 100).toFixed(2)})` : 'transparent',
    backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
    WebkitBackdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
  };

  return (
    <>
      {wallpaperVideo ? (
        <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
          <div className="w-full h-full" style={{ ...parallaxStyle, ...lutFilterStyle }}>
            <video
              key={wallpaperVideo}
              src={wallpaperVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle contrast tint overlay */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Cinematic LUT Split-Tone Color Grading Overlay */}
          {activeLutPreset.id !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-500 z-[1]"
              style={{
                background: activeLutPreset.tintOverlay,
                mixBlendMode: activeLutPreset.mixBlendMode,
              }}
            />
          )}

          {/*Customizable Dimmer & Blur Filter Overlay */}
          {showFilterOverlay && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300 z-[1]"
              style={filterOverlayStyle}
            />
          )}

          {/* Weather-Synced Ambient Overlay */}
          {weatherSyncEnabled && <WeatherAmbientOverlay condition={weatherCondition} />}

          {/* Dynamic Floating Icons above video background */}
          <FloatingIcons theme={theme} currentPage={currentPage} />
        </div>
      ) : (
        <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
          <div
            className={`w-full h-full transition-colors duration-700 ${wallpaperClass} ${livingMeshClass}`}
            style={{
              ...safeWallpaperStyle,
              ...parallaxStyle,
              ...lutFilterStyle,
            }}
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

            {/* THEME 2: Glass UI Dark Neon Multicolor Ambient Flares */}
            {!hasCustomWallpaper && theme === 'dark-neon' && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Radial Cyan Glow */}
                <div
                  className="absolute -top-[10%] left-[10%] w-[550px] h-[550px] rounded-full blur-[100px] pointer-events-none opacity-45 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 75%)',
                    animationDuration: '8s',
                  }}
                />
                {/* Radial Electric Blue & Purple Glow */}
                <div
                  className="absolute top-[20%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[110px] pointer-events-none opacity-40 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(59, 130, 246, 0.14) 50%, transparent 75%)',
                    animationDuration: '10s',
                  }}
                />
                {/* Radial Neon Pink & Orange Accent */}
                <div
                  className="absolute -bottom-[10%] left-[25%] w-[580px] h-[580px] rounded-full blur-[120px] pointer-events-none opacity-35 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(244, 114, 182, 0.18) 0%, rgba(251, 146, 60, 0.1) 50%, transparent 75%)',
                    animationDuration: '9s',
                  }}
                />
                {/* Radial Neon Green Accent */}
                <div
                  className="absolute top-[50%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-30 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(52, 211, 153, 0.16) 0%, transparent 70%)',
                    animationDuration: '11s',
                  }}
                />
              </div>
            )}

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

          {/* Cinematic LUT Split-Tone Color Grading Overlay */}
          {activeLutPreset.id !== 'none' && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-500 z-[1]"
              style={{
                background: activeLutPreset.tintOverlay,
                mixBlendMode: activeLutPreset.mixBlendMode,
              }}
            />
          )}

          {/* Customizable Dimmer & Blur Filter Overlay */}
          {showFilterOverlay && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300 z-[1]"
              style={filterOverlayStyle}
            />
          )}

          {/* Weather-Synced Ambient Overlay */}
          {weatherSyncEnabled && <WeatherAmbientOverlay condition={weatherCondition} />}

          {/* DYNAMIC FLOATING ICONS (Tự động di chuyển vị trí ngẫu nhiên trên toàn website) */}
          <FloatingIcons theme={theme} currentPage={currentPage} />
        </div>
      )}
    </>
  );
};

