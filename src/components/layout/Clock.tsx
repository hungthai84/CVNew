'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Clock as ClockIcon, Sparkles } from 'lucide-react';
import { SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { useToast } from '@/components/ui/Toast';

export interface ClockProps {
  isLight?: boolean;
  currentTheme?: SiteTheme;
}

interface ThemeClockStyle {
  wrapBg: string;
  wrapBorder: string;
  wrapShadow: string;
  wrapRadius: string;
  cardBg: string;
  cardBorder: string;
  cardColor: string;
  cardShadow: string;
  cardTextShadow: string;
  meridiemColor: string;
  meridiemBg?: string;
  meridiemBorder?: string;
  bottomBg: string;
  fontFamily?: string;
  dayColor: string;
  dateColor: string;
  dividerBorder: string;
  badgeText?: string;
  dateShadow?: string;
}

const THEME_CLOCK_STYLES: Record<SiteTheme, ThemeClockStyle> = {
  // 1. Giao diện Kính sáng đa sắc (Mặc định)
  'light-glass': {
    wrapBg: 'rgba(255, 255, 255, 0.75)',
    wrapBorder: '1px solid rgba(226, 232, 240, 0.85)',
    wrapShadow: 'inset 0px 1px 2px rgba(255, 255, 255, 0.95), 0px 3px 12px rgba(99, 102, 241, 0.08)',
    wrapRadius: '10px',
    cardBg: 'linear-gradient(to top, #F5F3FF 0%, #FFFFFF 100%)',
    cardBorder: '1px solid rgba(196, 181, 253, 0.55)',
    cardColor: '#1E1B4B',
    cardShadow: '0px 2px 6px rgba(99, 102, 241, 0.10)',
    cardTextShadow: '0px 1px 2px rgba(255, 255, 255, 0.85)',
    meridiemColor: '#4F46E5',
    meridiemBg: 'rgba(99, 102, 241, 0.12)',
    meridiemBorder: '1px solid rgba(99, 102, 241, 0.25)',
    bottomBg: '#FFFFFF',
    fontFamily: "'Play', system-ui, sans-serif",
    dayColor: '#1E1B4B',
    dateColor: '#4F46E5',
    dividerBorder: 'rgba(196, 181, 253, 0.6)',
    badgeText: 'Kính sáng',
    dateShadow: '0 1px 2px rgba(255,255,255,0.85)',
  },

  // 2. Giao diện Kính tối Neon (Cyber Dark Neon)
  'dark-neon': {
    wrapBg: 'rgba(10, 15, 30, 0.85)',
    wrapBorder: '1px solid rgba(34, 211, 238, 0.45)',
    wrapShadow: '0 0 16px rgba(34, 211, 238, 0.25), inset 0 0 8px rgba(34, 211, 238, 0.12)',
    wrapRadius: '10px',
    cardBg: 'linear-gradient(to top, #060913 0%, #0F172A 100%)',
    cardBorder: '1px solid rgba(168, 85, 247, 0.55)',
    cardColor: '#22D3EE',
    cardShadow: '0 0 10px rgba(168, 85, 247, 0.3)',
    cardTextShadow: '0 0 8px #22D3EE, 0 0 18px rgba(34, 211, 238, 0.85)',
    meridiemColor: '#C084FC',
    meridiemBg: 'rgba(192, 132, 252, 0.18)',
    meridiemBorder: '1px solid rgba(192, 132, 252, 0.45)',
    bottomBg: '#0A0F1D',
    fontFamily: "'Play', ui-monospace, monospace",
    dayColor: '#22D3EE',
    dateColor: '#C084FC',
    dividerBorder: 'rgba(34, 211, 238, 0.4)',
    badgeText: 'Kính tối Neon',
    dateShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
  },

  // 3. Giao diện Kính sáng quang phổ (NDesign Luminous Glass Showcase)
  'luminous-glass': {
    wrapBg: 'rgba(255, 255, 255, 0.65)',
    wrapBorder: '1px solid rgba(56, 189, 248, 0.4)',
    wrapShadow: '0 6px 20px -4px rgba(56, 189, 248, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
    wrapRadius: '10px',
    cardBg: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #ffffff 100%)',
    cardBorder: '1px solid rgba(56, 189, 248, 0.35)',
    cardColor: '#0369A1',
    cardShadow: '0 2px 8px rgba(56, 189, 248, 0.15)',
    cardTextShadow: '0 1px 2px rgba(255, 255, 255, 0.9)',
    meridiemColor: '#0284C7',
    meridiemBg: 'rgba(56, 189, 248, 0.15)',
    meridiemBorder: '1px solid rgba(56, 189, 248, 0.35)',
    bottomBg: 'rgba(255, 255, 255, 0.8)',
    fontFamily: "'Play', system-ui, sans-serif",
    dayColor: '#0284C7',
    dateColor: '#DB2777',
    dividerBorder: 'rgba(56, 189, 248, 0.35)',
    badgeText: 'Quang phổ',
    dateShadow: '0 1px 2px rgba(255, 255, 255, 0.85)',
  },
};

export const Clock: React.FC<ClockProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const [time, setTime] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Khôi phục định dạng giờ đã lưu (12h hoặc 24h)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hungthai_clock_format');
        if (saved === '24h') {
          setIs24Hour(true);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Xử lý chuyển đổi định dạng 12H / 24H khi nhấp đúp
  const handleToggleTimeFormat = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next24 = !is24Hour;
    setIs24Hour(next24);
    SoundEngine.playClockTick();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hungthai_clock_format', next24 ? '24h' : '12h');
      } catch {}
    }
    showToast(next24 ? 'Đã đổi sang chế độ 24 Giờ (Military)' : 'Đã đổi sang chế độ 12 Giờ (AM/PM) ⏰');
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
    SoundEngine.playClockTick();
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 250);
  };

  if (!time) {
    return (
      <div className="flex items-center text-xs font-mono text-slate-400">
        --:--
      </div>
    );
  }

  const hour24 = time.getHours();
  const minute = time.getMinutes();
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  // Hiển thị theo định dạng 12H hoặc 24H
  const displayHour = is24Hour ? hour24 : hour12;
  const hourStr = displayHour < 10 ? '0' + displayHour : '' + displayHour;
  const minStr = minute < 10 ? '0' + minute : '' + minute;
  const meridiem = is24Hour ? '24h' : hour24 >= 12 ? 'pm' : 'am';

  // Day of week in Vietnamese
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayOfWeek = days[time.getDay()];
  const dateStr = `${time.getDate() < 10 ? '0' + time.getDate() : time.getDate()}/${
    time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  }/${time.getFullYear()}`;

  const style = THEME_CLOCK_STYLES[currentTheme] || THEME_CLOCK_STYLES['light-glass'];
  const isDark = currentTheme === 'dark-neon';
  const isLuminous = currentTheme === 'luminous-glass';

  // Danh sách các trung tâm tài chính lớn thế giới
  const FINANCIAL_CENTERS = [
    { name: 'TP. Hồ Chí Minh', flag: '🇻🇳', tz: 'Asia/Ho_Chi_Minh', code: 'ICT', isBase: true },
    { name: 'Singapore', flag: '🇸🇬', tz: 'Asia/Singapore', code: 'SGT (UTC+8)' },
    { name: 'Tokyo', flag: '🇯🇵', tz: 'Asia/Tokyo', code: 'JST (UTC+9)' },
    { name: 'London', flag: '🇬🇧', tz: 'Europe/London', code: 'GMT (UTC+0)' },
    { name: 'New York', flag: '🇺🇸', tz: 'America/New_York', code: 'EST (UTC-5)' },
  ];

  const formatTzTime = (tz: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: !is24Hour,
      }).format(time);
    } catch {
      return '--:--';
    }
  };

  const isTzMarketOpen = (tz: string) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
      }).formatToParts(time);
      const hourVal = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
      const minVal = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
      const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
      if (weekday === 'Sat' || weekday === 'Sun') return false;
      const t = hourVal + minVal / 60;
      return t >= 9 && t <= 17;
    } catch {
      return false;
    }
  };

  return (
    <div
      data-clock-theme={currentTheme}
      onDoubleClick={handleToggleTimeFormat}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Nhấp đúp chuột để chuyển đổi định dạng 12H / 24H • Rê chuột xem giờ quốc tế"
      className="relative z-10 flex items-center gap-2 sm:gap-2.5 select-none shrink-0 cursor-pointer"
    >
      {/* Đồng Hồ Số Hiện Đại Đồng Bộ Giao Diện (Theme-Aligned Glass Digital Clock) */}
      <div className="flex items-center shrink-0">
        <div
          className="flex items-center font-mono font-black text-base sm:text-lg tracking-tight leading-none px-2 py-1 rounded-xl border transition-all duration-300"
          style={{
            color: style.cardColor,
            backgroundColor: isDark
              ? 'rgba(6, 9, 19, 0.65)'
              : isLuminous
              ? 'rgba(255, 255, 255, 0.75)'
              : 'rgba(255, 255, 255, 0.85)',
            borderColor: isDark ? 'rgba(34, 211, 238, 0.4)' : isLuminous ? 'rgba(56, 189, 248, 0.4)' : 'rgba(196, 181, 253, 0.55)',
            textShadow: style.cardTextShadow,
            boxShadow: isDark
              ? '0 0 12px rgba(34, 211, 238, 0.25)'
              : '0 2px 8px rgba(99, 102, 241, 0.1)',
          }}
        >
          <span>{hourStr}</span>
          <span className="mx-0.5 opacity-80 animate-pulse text-indigo-500 dark:text-cyan-400 font-bold">
            :
          </span>
          <span>{minStr}</span>

          <span
            className="ml-1.5 text-[9px] sm:text-[10px] font-sans font-extrabold uppercase px-1 py-0.5 rounded-md leading-tight shrink-0 shadow-2xs"
            style={{
              color: style.meridiemColor,
              backgroundColor: style.meridiemBg || 'rgba(99, 102, 241, 0.12)',
              border: style.meridiemBorder || 'none',
            }}
          >
            {meridiem}
          </span>
        </div>
      </div>

      {/* Day & Date info: Thứ, Ngày Tháng Năm - Hài hòa tuyệt đối với Card thời tiết */}
      <div
        className="hidden md:flex flex-col items-start justify-center leading-tight pl-2 sm:pl-2.5 transition-colors duration-300 shrink-0"
        style={{
          borderLeft: `1.5px solid ${style.dividerBorder}`,
          textShadow: style.dateShadow || 'none',
        }}
      >
        <span
          className="text-[11px] sm:text-[11.5px] font-black tracking-tight whitespace-nowrap"
          style={{ color: style.dayColor, fontFamily: style.fontFamily || 'inherit' }}
        >
          {dayOfWeek}
        </span>
        <span
          className="text-[9.5px] sm:text-[10px] font-bold tracking-tight opacity-95 mt-0.5 whitespace-nowrap font-mono"
          style={{ color: style.dateColor, fontFamily: style.fontFamily || 'inherit' }}
        >
          {dateStr}
        </span>
      </div>

      {/* 5. Hiển Thị Múi Giờ Quốc Tế (Global Multi-Timezone Tooltip) */}
      {isHovered && (
        <div
          role="tooltip"
          className={`absolute bottom-full right-0 mb-3 z-50 w-72 sm:w-80 rounded-2xl p-3.5 shadow-2xl border backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 pointer-events-auto ${
            isDark
              ? 'bg-slate-900/95 border-cyan-400/40 text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.25)]'
              : 'bg-white/95 border-indigo-200/80 text-slate-800 shadow-[0_12px_36px_-6px_rgba(99,102,241,0.22)]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/50 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-xs">
                <Globe className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <span className="text-xs font-black font-play tracking-wide">
                Múi Giờ Quốc Tế
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-cyan-300 border border-indigo-500/20">
              {is24Hour ? 'Chế độ 24H' : 'Chế độ 12H'}
            </span>
          </div>

          {/* List 5 Financial Centers */}
          <div className="space-y-1.5">
            {FINANCIAL_CENTERS.map((fc) => {
              const open = isTzMarketOpen(fc.tz);
              return (
                <div
                  key={fc.tz}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-colors ${
                    fc.isBase
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-500/30 font-semibold'
                      : 'hover:bg-slate-100/70 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm shrink-0">{fc.flag}</span>
                    <div className="flex flex-col text-left leading-tight truncate">
                      <span className="text-[11.5px] font-bold truncate">
                        {fc.name}
                      </span>
                      <span className="text-[9.5px] opacity-60 font-mono">
                        {fc.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Market status badge */}
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold font-mono tracking-tight flex items-center gap-1 ${
                        open
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
                      }`}
                      title={open ? 'Thị trường tài chính đang mở cửa' : 'Thị trường đang đóng cửa'}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          open ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                        }`}
                      />
                      {open ? 'Mở' : 'Đóng'}
                    </span>

                    {/* Time */}
                    <span className="text-xs font-mono font-black text-indigo-600 dark:text-cyan-300 min-w-[54px] text-right">
                      {formatTzTime(fc.tz)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Tip */}
          <div className="mt-2.5 pt-2 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-[9.5px] opacity-70">
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <span>Nhấp đúp chuột để đổi 12H ⇄ 24H</span>
            </span>
            <span className="font-mono">Real-time Sync</span>
          </div>
        </div>
      )}
    </div>
  );
};
