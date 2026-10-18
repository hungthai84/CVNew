'use client';

import React, { useState, useEffect } from 'react';

export interface ClockProps {
  isLight?: boolean;
}

export const Clock: React.FC<ClockProps> = ({ isLight = true }) => {
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

  return (
    <div
      className={`relative z-10 flex items-center gap-1.5 sm:gap-2 bg-transparent select-none shrink-0 ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}
      title={`Thời gian thực: ${hStr}:${mStr}:${sStr} (${dayOfWeek} ${dateStr})`}
    >
      {/* Khung đồng hồ: Giao diện sáng dùng màu đen, giao diện tối dùng màu trắng */}
      <div className={`flex items-center font-mono font-bold text-xs sm:text-[13px] tracking-wide leading-none ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}>
        <span className={`px-1 py-0.5 rounded font-mono font-extrabold shadow-2xs ${
          isLight
            ? 'bg-slate-900/10 border border-slate-700/30 text-slate-900'
            : 'bg-white/10 border border-white/20 text-white'
        }`}>
          {hStr}
        </span>
        <span className={`animate-pulse px-0.5 font-black text-xs ${
          isLight ? 'text-slate-800' : 'text-white/90'
        }`}>:</span>
        <span className={`px-1 py-0.5 rounded font-mono font-extrabold shadow-2xs ${
          isLight
            ? 'bg-slate-900/10 border border-slate-700/30 text-slate-900'
            : 'bg-white/10 border border-white/20 text-white'
        }`}>
          {mStr}
        </span>
        <span className={`animate-pulse px-0.5 font-black text-xs ${
          isLight ? 'text-slate-800' : 'text-white/90'
        }`}>:</span>
        <span className={`px-1 py-0.5 rounded font-mono font-extrabold shadow-2xs ${
          isLight
            ? 'bg-slate-900/10 border border-slate-700/30 text-slate-900'
            : 'bg-white/10 border border-white/20 text-white'
        }`}>
          {sStr}
        </span>
      </div>

      {/* Thông tin Thứ & Ngày Tháng nằm gọn trong thẻ */}
      <div className={`hidden md:flex flex-col items-start leading-none pl-1 border-l ${
        isLight ? 'border-slate-800/30 text-slate-900' : 'border-white/25 text-white'
      }`}>
        <span className={`text-[10px] font-extrabold leading-tight ${
          isLight ? 'text-amber-700' : 'text-amber-200'
        }`}>
          {dayOfWeek}
        </span>
        <span className={`text-[9px] font-medium leading-tight ${
          isLight ? 'text-slate-700 font-semibold' : 'text-white/85'
        }`}>
          {dateStr}
        </span>
      </div>
    </div>
  );
};
