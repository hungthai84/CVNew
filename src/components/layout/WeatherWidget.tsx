'use client';

import React from 'react';
import { WeatherPreset, SiteTheme } from '@/types';
import { Clock } from './Clock';

export interface WeatherWidgetProps {
  currentPreset: WeatherPreset;
  onCycle: () => void;
  currentTheme?: SiteTheme;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ currentPreset, onCycle, currentTheme = 'light-glass' }) => {
  const isLight = currentTheme !== 'dark-neon';

  // Format weather card to match currently selected theme
  const getThemeWeatherStyle = () => {
    switch (currentTheme) {
      case 'light-glass-multicolor':
        return {
          containerClass:
            'bg-gradient-to-r from-[#eaf4ff]/90 via-[#f1f5ff]/85 to-[#f5f3ff]/90 dark:from-slate-900/90 dark:via-slate-800/85 dark:to-slate-900/90 border border-white/95 dark:border-white/15 shadow-[0_6px_22px_rgba(62,115,180,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-[16px]',
          tempColor: 'text-[#1E3A6D] dark:text-cyan-300',
          conditionColor: 'text-[#3B82F6] dark:text-cyan-400',
          locationColor: 'text-[#58749A] dark:text-slate-400',
          glowGradient: 'radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.16) 0%, transparent 65%)',
          sheen: 'bg-gradient-to-b from-white/45 via-white/15 to-transparent',
        };
      case 'dark-neon':
        return {
          containerClass:
            'bg-gradient-to-r from-slate-950/95 via-[#0b1120]/90 to-slate-950/95 border border-cyan-400/60 shadow-[0_0_18px_rgba(6,182,212,0.35),inset_0_0_12px_rgba(6,182,212,0.18)] backdrop-blur-[16px]',
          tempColor: 'text-cyan-300',
          conditionColor: 'text-white',
          locationColor: 'text-slate-300',
          glowGradient: 'radial-gradient(circle at 15% 50%, rgba(6, 182, 212, 0.28) 0%, transparent 65%)',
          sheen: 'bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent',
        };
      case 'flat-rainbow':
        return {
          containerClass:
            'bg-gradient-to-r from-white via-amber-50/50 to-pink-50/60 border-2 border-pink-400/80 shadow-[3px_3px_0px_rgba(236,72,153,0.35)]',
          tempColor: 'text-slate-900',
          conditionColor: 'text-rose-600',
          locationColor: 'text-slate-600',
          glowGradient: 'radial-gradient(circle at 15% 50%, rgba(236, 72, 153, 0.12) 0%, transparent 65%)',
          sheen: 'bg-gradient-to-b from-white/60 via-transparent to-transparent',
        };
      case 'light-glass':
      default:
        return {
          containerClass:
            'bg-gradient-to-r from-white/85 via-sky-50/80 to-blue-50/85 dark:bg-slate-900/85 border border-white/85 dark:border-white/15 shadow-[0_6px_20px_rgba(31,38,135,0.10),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-[16px]',
          tempColor: isLight ? 'text-slate-900' : 'text-white',
          conditionColor: isLight ? 'text-sky-600' : 'text-cyan-400',
          locationColor: isLight ? 'text-slate-600' : 'text-slate-300',
          glowGradient: 'radial-gradient(circle at 15% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 65%)',
          sheen: 'bg-gradient-to-b from-white/40 via-white/10 to-transparent',
        };
    }
  };

  const themeStyle = getThemeWeatherStyle();

  return (
    <div
      onClick={onCycle}
      title="Nhấp để đổi trạng thái thời tiết"
      className={`relative w-max max-w-full h-full rounded-[18px] px-3.5 pr-4 flex items-center gap-3 sm:gap-4 cursor-pointer select-none transition-all duration-500 overflow-visible group ${themeStyle.containerClass}`}
      style={{
        backgroundImage: themeStyle.glowGradient,
      }}
    >
      {/* Glass Sheen Highlight */}
      <div className={`absolute inset-0 rounded-[18px] pointer-events-none ${themeStyle.sheen}`} />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/15 to-transparent rounded-r-[18px] pointer-events-none" />

      {/* 3D Pop-out Graphic */}
      <div className="relative z-20 flex items-center shrink-0 -ml-2.5">
        <div className="relative transition-transform duration-500 group-hover:scale-110 weather-float">
          {currentPreset.condition === 'Cloudy' && (
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
              <defs>
                <linearGradient id="sunA" x2="0" y2="1">
                  <stop stopColor="#fff9a6" />
                  <stop offset=".45" stopColor="#ffce32" />
                  <stop offset="1" stopColor="#ff8a00" />
                </linearGradient>
                <linearGradient id="cloudA" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#c9eaff" />
                </linearGradient>
              </defs>
              <circle cx="38" cy="36" r="25" fill="#ffad00" opacity=".24" />
              <circle cx="38" cy="36" r="21" fill="url(#sunA)" className="sun-anim" />
              <path
                d="M20 68C8 68 7 50 20 46C22 31 43 28 52 42C67 36 81 47 78 60C91 65 84 81 69 81H24C13 81 11 72 20 68Z"
                fill="url(#cloudA)"
                stroke="#fff"
                strokeOpacity=".75"
                strokeWidth="2"
                className="cloud-anim"
              />
            </svg>
          )}

          {currentPreset.condition === 'Thunder Storm' && (
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
              <defs>
                <linearGradient id="cloudB" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#b8d8ff" />
                </linearGradient>
                <linearGradient id="boltB" x2="0" y2="1">
                  <stop stopColor="#fff45c" />
                  <stop offset="1" stopColor="#ff9700" />
                </linearGradient>
              </defs>
              <path
                d="M17 61C4 57 8 39 23 38C25 17 49 15 59 32C77 24 92 39 86 54C97 62 87 75 73 75H25C15 75 11 67 17 61Z"
                fill="url(#cloudB)"
                stroke="#fff"
                strokeOpacity=".8"
                strokeWidth="2"
                className="cloud-anim"
              />
              <path
                d="M52 67L39 86H51L45 100L70 78H57L64 67Z"
                fill="url(#boltB)"
                stroke="#ffc72c"
                strokeWidth="1.5"
                className="lightning-anim"
              />
              <path
                d="M22 82l-4 8m58-9l-4 8"
                stroke="#5bd8ff"
                strokeWidth="4"
                strokeLinecap="round"
                className="rain-anim"
              />
            </svg>
          )}

          {currentPreset.condition === 'Overcast' && (
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
              <defs>
                <linearGradient id="cloudC" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#e5edf5" />
                </linearGradient>
              </defs>
              <path
                d="M18 66C4 62 8 43 23 41C26 20 49 18 60 35C78 28 92 43 86 58C98 66 88 79 73 79H25C14 79 10 71 18 66Z"
                fill="url(#cloudC)"
                stroke="#fff"
                strokeWidth="2"
                className="cloud-anim"
              />
              <ellipse cx="30" cy="72" rx="13" ry="9" fill="#fff" opacity=".8" />
            </svg>
          )}

          {currentPreset.condition === 'Sunny' && (
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
              <defs>
                <radialGradient id="sunD">
                  <stop stopColor="#fff98a" />
                  <stop offset=".58" stopColor="#ffd52a" />
                  <stop offset="1" stopColor="#ff9800" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="38" fill="#ffb900" opacity=".2" />
              <circle cx="50" cy="50" r="31" fill="url(#sunD)" stroke="#ffe88b" strokeWidth="2" className="sun-anim" />
            </svg>
          )}

          {currentPreset.condition === 'Heavy Rain' && (
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
              <defs>
                <linearGradient id="cloudE" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#b9d8ff" />
                </linearGradient>
                <linearGradient id="rainE" x2="0" y2="1">
                  <stop stopColor="#baf7ff" />
                  <stop offset="1" stopColor="#1dc8ff" />
                </linearGradient>
              </defs>
              <path
                d="M16 58C3 54 8 35 23 34C26 14 49 13 60 30C78 23 92 38 86 52C97 60 87 73 73 73H25C14 73 10 65 16 58Z"
                fill="url(#cloudE)"
                stroke="#fff"
                strokeWidth="2"
                className="cloud-anim"
              />
              <path
                d="M27 77l-3 12m19-12l-3 17m20-17l-3 12m20-12l-3 17"
                stroke="url(#rainE)"
                strokeWidth="5"
                strokeLinecap="round"
                className="rain-anim"
              />
            </svg>
          )}

          {currentPreset.condition === 'Lightning' && (
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
              <defs>
                <linearGradient id="boltF" x2="0" y2="1">
                  <stop stopColor="#fff66b" />
                  <stop offset=".5" stopColor="#ffd21a" />
                  <stop offset="1" stopColor="#ff8c00" />
                </linearGradient>
              </defs>
              <path
                d="M57 5L22 56H43L34 94L78 42H54L67 5Z"
                fill="url(#boltF)"
                stroke="#ffe44d"
                strokeWidth="2"
                strokeLinejoin="round"
                className="lightning-anim"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Temperature & Condition - Format theo giao diện đang được chọn */}
      <div className="relative z-10 flex items-center gap-2 pl-0.5">
        <div className={`flex items-start tracking-tight drop-shadow-sm font-play ${themeStyle.tempColor}`}>
          <span className="text-2xl sm:text-3xl font-black leading-none">{currentPreset.temp}</span>
          <span className="text-xs sm:text-sm font-black leading-none -mt-0.5 ml-0.5">°C</span>
        </div>

        <div className="flex flex-col text-left leading-tight drop-shadow-xs">
          <span className={`text-xs sm:text-[13px] font-black tracking-tight whitespace-nowrap ${themeStyle.conditionColor}`}>
            {currentPreset.conditionVi || currentPreset.badge || currentPreset.condition}
          </span>
          <span className={`text-[10px] font-semibold truncate max-w-[120px] sm:max-w-none ${themeStyle.locationColor}`}>
            {currentPreset.location || 'TP. Hồ Chí Minh'}
          </span>
        </div>
      </div>

      {/* Live Flip Clock Component */}
      <Clock isLight={isLight} currentTheme={currentTheme} />
    </div>
  );
};
