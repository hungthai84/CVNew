'use client';

import React, { useState, useEffect } from 'react';
import { SiteTheme } from '@/types';

export interface ClockProps {
  isLight?: boolean;
  currentTheme?: SiteTheme;
}

export const Clock: React.FC<ClockProps> = ({ isLight = true, currentTheme = 'light-glass' }) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className={`relative z-10 flex items-center bg-transparent px-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
        <span className="text-xs font-mono font-bold tracking-widest">--:--:--</span>
      </div>
    );
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hStr = hours < 10 ? '0' + hours : '' + hours;
  const mStr = minutes < 10 ? '0' + minutes : '' + minutes;
  const sStr = seconds < 10 ? '0' + seconds : '' + seconds;

  // Day of week in Vietnamese
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const dayOfWeek = days[time.getDay()];
  const dateStr = `${time.getDate() < 10 ? '0' + time.getDate() : time.getDate()}/${
    time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  }`;

  // Theme-aware styles for clock digits & labels
  const getThemeClockClasses = () => {
    switch (currentTheme) {
      case 'light-glass-multicolor':
        return {
          digitBox: 'bg-blue-600/10 border border-blue-400/30 text-[#1E3A6D] dark:text-cyan-300',
          colon: 'text-[#3B82F6] dark:text-cyan-400',
          divider: 'border-slate-300/80 dark:border-white/20',
          dayText: 'text-[#2563EB] dark:text-cyan-300',
          dateText: 'text-[#58749A] dark:text-slate-400',
        };
      case 'dark-neon':
        return {
          digitBox: 'bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.35)]',
          colon: 'text-cyan-400',
          divider: 'border-cyan-500/30',
          dayText: 'text-cyan-300',
          dateText: 'text-slate-300',
        };
      case 'flat-rainbow':
        return {
          digitBox: 'bg-pink-50 border border-pink-300/80 text-pink-700 font-bold',
          colon: 'text-pink-600',
          divider: 'border-pink-200',
          dayText: 'text-pink-600',
          dateText: 'text-slate-600',
        };
      case 'light-glass':
      default:
        return {
          digitBox: isLight
            ? 'bg-slate-900/10 border border-slate-700/25 text-slate-900'
            : 'bg-white/10 border border-white/20 text-white',
          colon: isLight ? 'text-sky-600' : 'text-white/90',
          divider: isLight ? 'border-slate-800/25' : 'border-white/25',
          dayText: isLight ? 'text-sky-700' : 'text-amber-200',
          dateText: isLight ? 'text-slate-700 font-semibold' : 'text-white/85',
        };
    }
  };

  const style = getThemeClockClasses();

  return (
    <div
      className="relative z-10 flex items-center gap-1.5 sm:gap-2 bg-transparent select-none shrink-0"
      title={`Thời gian thực: ${hStr}:${mStr}:${sStr} (${dayOfWeek} ${dateStr})`}
    >
      {/* Khung đồng hồ: Số phút giây với hộp bo góc bóng nhẹ */}
      <div className="flex items-center font-mono font-bold text-xs sm:text-[13px] tracking-wide leading-none">
        <span className={`px-1 py-0.5 rounded font-mono font-extrabold shadow-2xs ${style.digitBox}`}>
          {hStr}
        </span>
        <span className={`animate-pulse px-0.5 font-black text-xs ${style.colon}`}>:</span>
        <span className={`px-1 py-0.5 rounded font-mono font-extrabold shadow-2xs ${style.digitBox}`}>
          {mStr}
        </span>
        <span className={`animate-pulse px-0.5 font-black text-xs ${style.colon}`}>:</span>
        <span className={`px-1 py-0.5 rounded font-mono font-extrabold shadow-2xs ${style.digitBox}`}>
          {sStr}
        </span>
      </div>

      {/* Thông tin Thứ & Ngày Tháng nằm gọn trong thẻ */}
      <div className={`hidden md:flex flex-col items-start leading-none pl-1 border-l ${style.divider}`}>
        <span className={`text-[10px] font-extrabold leading-tight ${style.dayText}`}>
          {dayOfWeek}
        </span>
        <span className={`text-[9px] font-medium leading-tight ${style.dateText}`}>
          {dateStr}
        </span>
      </div>
    </div>
  );
};
