'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SiteTheme } from '@/types';

export interface ClockProps {
  isLight?: boolean;
  currentTheme?: SiteTheme;
}

interface FlipDigitProps {
  digitClass: string;
  value: string;
}

/**
 * 3D Split-Flap Mechanical Flip Digit Component
 * Implements flipTo / jumpTo logic with .base and .flap (over front, over back, under)
 */
const FlipDigit: React.FC<FlipDigitProps> = ({ digitClass, value }) => {
  const [baseVal, setBaseVal] = useState<string>(value);
  const [frontVal, setFrontVal] = useState<string>(value);
  const [backVal, setBackVal] = useState<string>(value);
  const [flipping, setFlipping] = useState<boolean>(false);
  const currentValRef = useRef<string>(value);
  const isInitial = useRef<boolean>(true);

  useEffect(() => {
    // Initial mount: jumpTo without animation
    if (isInitial.current) {
      isInitial.current = false;
      currentValRef.current = value;
      setBaseVal(value);
      return;
    }

    // When value changes: trigger 300ms flip animation, settle base at 350ms
    if (value !== currentValRef.current) {
      const oldVal = currentValRef.current;
      currentValRef.current = value;

      setFrontVal(oldVal);
      setBackVal(value);
      setFlipping(true);

      const timer = setTimeout(() => {
        setBaseVal(value);
        setFlipping(false);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className={`digit ${digitClass}`} data-num={value}>
      <span className="base">{baseVal}</span>
      <div
        className="flap over front"
        data-content={frontVal}
        style={{ display: flipping ? 'block' : 'none' }}
      />
      <div
        className="flap over back"
        data-content={backVal}
        style={{ display: flipping ? 'block' : 'none' }}
      />
      <div
        className="flap under"
        data-content={backVal}
        style={{ display: flipping ? 'block' : 'none' }}
      />
    </div>
  );
};

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
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 bg-transparent select-none shrink-0">
        <div className="clock">
          <div className="digit tenhour"><span className="base">0</span></div>
          <div className="digit hour"><span className="base">0</span></div>
          <div className="digit tenmin"><span className="base">0</span></div>
          <div className="digit min"><span className="base">0</span></div>
          <div className="digit tensec"><span className="base">0</span></div>
          <div className="digit sec"><span className="base">0</span></div>
        </div>
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

  // Theme-aware styles for dividers & date text
  const getThemeClockClasses = () => {
    switch (currentTheme) {
      case 'light-glass-multicolor':
        return {
          divider: 'border-slate-300/80 dark:border-white/20',
          dayText: 'text-[#2563EB] dark:text-cyan-300',
          dateText: 'text-[#58749A] dark:text-slate-400',
        };
      case 'dark-neon':
        return {
          divider: 'border-cyan-500/30',
          dayText: 'text-cyan-300',
          dateText: 'text-slate-300',
        };
      case 'flat-rainbow':
        return {
          divider: 'border-pink-200',
          dayText: 'text-pink-600',
          dateText: 'text-slate-600',
        };
      case 'light-glass':
      default:
        return {
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
      {/* 3D Split-Flap Flip Clock theo đúng cấu trúc code người dùng */}
      <div className="clock">
        <FlipDigit digitClass="tenhour" value={hStr[0]} />
        <FlipDigit digitClass="hour" value={hStr[1]} />
        <FlipDigit digitClass="tenmin" value={mStr[0]} />
        <FlipDigit digitClass="min" value={mStr[1]} />
        <FlipDigit digitClass="tensec" value={sStr[0]} />
        <FlipDigit digitClass="sec" value={sStr[1]} />
      </div>

      {/* Thông tin Thứ & Ngày Tháng nằm gọn trong thẻ */}
      <div className={`hidden sm:flex flex-col items-start leading-none pl-1.5 border-l ${style.divider}`}>
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
