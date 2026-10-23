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

  // Dynamic theme colors for weather text
  const getTempColor = () => {
    if (currentTheme === 'dark-neon') return 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]';
    if (currentTheme === 'flat-rainbow') return 'text-slate-900';
    return isLight ? 'text-slate-900' : 'text-white';
  };

  const getConditionColor = () => {
    if (currentTheme === 'dark-neon') return 'text-cyan-200';
    if (currentTheme === 'flat-rainbow') return 'text-rose-600 font-black';
    return isLight ? 'text-indigo-900' : 'text-white';
  };

  const getLocationColor = () => {
    if (currentTheme === 'dark-neon') return 'text-cyan-400/90';
    if (currentTheme === 'flat-rainbow') return 'text-slate-700 font-bold';
    return isLight ? 'text-slate-700 font-semibold' : 'text-white/85';
  };

  return (
    <div
      onClick={onCycle}
      title="Nhấp để đổi trạng thái thời tiết"
      className="relative w-max max-w-full h-full rounded-[18px] px-2 sm:px-3 flex items-center gap-2 sm:gap-3 cursor-pointer select-none transition-all duration-300 border border-transparent bg-transparent overflow-visible group"
      style={{ background: 'transparent' }}
    >
      {/* 3D Pop-out Graphic */}
      <div className="relative z-20 flex items-center shrink-0 -ml-1">
        <div className="relative transition-transform duration-500 group-hover:scale-110 weather-float">
          {currentPreset.condition === 'Cloudy' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
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
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
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
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
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
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
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
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
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
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
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

      {/* Temperature & Condition: Icon + Temperature °C display */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 pl-0.5 shrink-0">
        <div className={`flex items-start tracking-tight drop-shadow-sm font-play shrink-0 ${getTempColor()}`}>
          <span className="text-lg sm:text-xl font-black leading-none">{currentPreset.temp}</span>
          <span className="text-xs font-black leading-none ml-0.5">°C</span>
        </div>

        <div className="hidden sm:flex flex-col text-left leading-tight drop-shadow-xs shrink-0">
          <span className={`text-[11px] font-black tracking-tight whitespace-nowrap ${getConditionColor()}`}>
            {currentPreset.conditionVi || currentPreset.badge || currentPreset.condition}
          </span>
          <span className={`text-[9.5px] truncate max-w-[100px] ${getLocationColor()}`}>
            {currentPreset.location || 'TP. Hồ Chí Minh'}
          </span>
        </div>
      </div>

      {/* Live Clock Component HH:MM */}
      <Clock isLight={isLight} currentTheme={currentTheme} />
    </div>
  );
};
