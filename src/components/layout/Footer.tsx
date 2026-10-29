'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PageMeta, WeatherPreset, SiteTheme } from '@/types';
import { THEME_LIST } from '@/data/themes';
import { WeatherWidget } from './WeatherWidget';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelectorModal } from '@/components/ui/LanguageSelectorModal';

export interface FooterProps {
  pages: PageMeta[];
  currentPage: number;
  currentWeather: WeatherPreset;
  currentTheme?: SiteTheme;
  onCycleWeather: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onSelectPage: (index: number) => void;
  onSelectTheme?: (theme: SiteTheme) => void;
  onOpenAiChat?: () => void;
  onOpenPagesCarousel?: () => void;
  onOpenNetworkDebug?: () => void;
}

export const FONT_SCALE_OPTIONS = [
  { id: 'sm' as const, label: 'Cỡ Chữ Nhỏ', subLabel: 'Thu gọn bố cục, hiển thị nhiều thông tin', badge: 'A-', percent: '90%', samplePx: '14.5px' },
  { id: 'md' as const, label: 'Cỡ Chữ Chuẩn', subLabel: 'Kích thước mặc định cân đối, dễ đọc', badge: 'A', percent: '100%', samplePx: '16px' },
  { id: 'lg' as const, label: 'Cỡ Chữ Lớn', subLabel: 'Tăng cỡ chữ, đọc êm mắt, rõ ràng', badge: 'A+', percent: '110%', samplePx: '17.5px' },
  { id: '2xl' as const, label: 'Cỡ Chữ Cực Đại', subLabel: 'Tối đa khả năng tiếp cận và thị lực', badge: 'A+++', percent: '130%', samplePx: '20.5px' },
];

export const Footer: React.FC<FooterProps> = ({
  pages,
  currentPage,
  currentWeather,
  currentTheme = 'light-glass',
  onCycleWeather,
  onPrevPage,
  onNextPage,
  onSelectPage,
  onSelectTheme,
  onOpenAiChat,
  onOpenPagesCarousel,
  onOpenNetworkDebug,
}) => {
  const { showToast } = useToast();
  const activePage = pages[currentPage] || pages[0];
  const { language, t } = useLanguage();
  const isDark = currentTheme === 'dark-neon';
  const isLuminous = currentTheme === 'luminous-glass';

  const [isPageMenuOpen, setIsPageMenuOpen] = useState<boolean>(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState<boolean>(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
  const [currentFontScalePercent, setCurrentFontScalePercent] = useState<number>(100);
  const pageMenuContainerRef = useRef<HTMLDivElement>(null);
  const contactContainerRef = useRef<HTMLDivElement>(null);
  const themeMenuContainerRef = useRef<HTMLDivElement>(null);
  const languageMenuContainerRef = useRef<HTMLDivElement>(null);

  // Lắng nghe thay đổi kích thước hiển thị để cập nhật tỷ lệ mặc định trên nút Footer
  useEffect(() => {
    try {
      const sp = localStorage.getItem('hungthai_font_scale_percent');
      if (sp) {
        const val = parseInt(sp, 10);
        if (!isNaN(val) && val >= 70 && val <= 160) {
          setCurrentFontScalePercent(val);
        }
      }
    } catch {}

    const handleFontScaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ percent?: number }>;
      if (customEvent.detail?.percent) {
        setCurrentFontScalePercent(customEvent.detail.percent);
      }
    };
    window.addEventListener('hungthai-font-scale-change', handleFontScaleChange);
    return () => window.removeEventListener('hungthai-font-scale-change', handleFontScaleChange);
  }, []);

  // Close popup menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pageMenuContainerRef.current && !pageMenuContainerRef.current.contains(event.target as Node)) {
        setIsPageMenuOpen(false);
      }
      if (contactContainerRef.current && !contactContainerRef.current.contains(event.target as Node)) {
        setIsContactMenuOpen(false);
      }
      if (themeMenuContainerRef.current && !themeMenuContainerRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
      if (languageMenuContainerRef.current && !languageMenuContainerRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    if (isPageMenuOpen || isContactMenuOpen || isThemeMenuOpen || isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPageMenuOpen, isContactMenuOpen, isThemeMenuOpen, isLanguageMenuOpen]);

  return (
    <footer
      id="app-footer"
      className={`w-[1200px] max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)] mx-auto h-[72px] glass-panel flex items-center justify-between px-2.5 sm:px-4 z-40 relative flex-shrink-0 transition-all duration-300 rounded-b-none rounded-t-[20px] border-b-0 border-x border-t ${
        isDark
          ? 'border-2 border-cyan-400/30 bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_45px_-6px_rgba(0,0,0,0.75),0_0_24px_rgba(34,211,238,0.22),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-cyan-400/50'
          : 'border-2 border-white/80 shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-white/95 bg-white/80 backdrop-blur-xl'
      } hover:shadow-[0_18px_50px_-6px_rgba(99,102,241,0.25),0_6px_22px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] group/footer`}
    >
      {/* Top ambient highlight line */}
      <div
        className={`absolute top-0 inset-x-8 h-[1px] pointer-events-none transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/80 to-transparent'
        }`}
      />
      {/* Khu vực 1: Bên trái - Card thời tiết & đồng hồ */}
      <div className="flex-1 h-full py-2 pr-2 flex items-center justify-start min-w-0 relative z-10 gap-2.5">
        <WeatherWidget currentPreset={currentWeather} onCycle={onCycleWeather} currentTheme={currentTheme} />
      </div>

      {/* Khu vực 2: Chính giữa - Nút trang luôn nằm CHÍNH GIỮA tuyệt đối của Footer */}
      <div
        ref={pageMenuContainerRef}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex items-center justify-center shrink-0"
      >
        <div
          className={`relative inline-flex items-center p-[2px] rounded-[999px] overflow-hidden group transition-all duration-300 hover:scale-[1.03] ${
            isDark
              ? 'shadow-[0_0_24px_rgba(34,211,238,0.45)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)]'
              : 'shadow-[0_0_18px_rgba(99,102,241,0.4)] hover:shadow-[0_0_28px_rgba(99,102,241,0.65)]'
          }`}
        >
          {/* Rotating Conic Laser Beam Border */}
          <div
            className={`absolute -inset-[220%] animate-[spin_4.5s_linear_infinite] pointer-events-none opacity-95 blur-[0.8px] ${
              isDark
                ? 'bg-[conic-gradient(from_0deg,#22d3ee,#6366f1,#ec4899,#06b6d4,#10b981,#3b82f6,#22d3ee)]'
                : 'bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#ec4899,#06b6d4,#10b981,#fbbf24,#6366f1)]'
            }`}
          />

          {/* Glassmorphism Inner Capsule (114px × 46px, bo cong 4 góc 999px hài hòa với Footer) */}
          <div
            className={`relative z-10 w-[114px] h-[46px] flex items-center justify-between px-1 rounded-[999px] backdrop-blur-xl border shadow-inner transition-colors duration-300 ${
              isDark
                ? 'bg-slate-900/95 border-cyan-400/40 text-cyan-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]'
                : 'bg-white/90 border-white/90 text-indigo-900'
            }`}
          >
            {/* Prev Button (Lùi trang) */}
            <button
              type="button"
              onClick={onPrevPage}
              title="Trang trước (Lùi trang)"
              className={`w-[34px] h-[34px] rounded-[999px] flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-xs cursor-pointer shrink-0 group/prev ${
                isDark
                  ? 'bg-slate-800 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-300 border border-white/10'
                  : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
              }`}
            >
              <svg className="w-[14px] h-[14px] stroke-[2.4] transition-transform duration-200 group-hover/prev:-translate-x-0.5 icon-spring-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Nút Hiển thị số trang & Mở Menu */}
            <button
              id="footer-center-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPageMenuOpen((prev) => !prev);
              }}
              title={`Đang ở ${activePage.shortTitle} (${currentPage + 1}/${pages.length}) — Nhấp để tới trang nhanh`}
              className="flex-1 h-[34px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 px-0.5"
            >
              {currentPage === 6 ? (
                <div
                  id="domains-page-counter-badge"
                  className={`px-2 py-0.5 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? 'bg-cyan-950/80 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.3)] text-cyan-300'
                      : 'bg-indigo-50/90 border border-indigo-200/90 shadow-2xs text-indigo-700'
                  }`}
                >
                  <span
                    id="footer-page-counter"
                    className="text-xs sm:text-[13px] font-mono font-black tracking-tight whitespace-nowrap leading-none select-none text-center"
                  >
                    {currentPage + 1}/{pages.length}
                  </span>
                </div>
              ) : (
                <span
                  id="footer-page-counter"
                  className={`text-xs sm:text-[13px] font-mono font-black tracking-tight whitespace-nowrap leading-none select-none text-center ${
                    isDark ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]' : 'text-indigo-700'
                  }`}
                >
                  {currentPage + 1}/{pages.length}
                </span>
              )}
            </button>

            {/* Next Button (Tới trang) */}
            <button
              type="button"
              onClick={onNextPage}
              title="Trang kế tiếp (Tới trang)"
              className={`w-[34px] h-[34px] rounded-[999px] flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-xs cursor-pointer shrink-0 group/next ${
                isDark
                  ? 'bg-slate-800 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-300 border border-white/10'
                  : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
              }`}
            >
              <svg className="w-[14px] h-[14px] stroke-[2.4] transition-transform duration-200 group-hover/next:translate-x-0.5 icon-spring-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Popup Menu Đi Tới Trang Nhanh */}
        {isPageMenuOpen && (
          <div
            className={`absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-80 sm:w-96 rounded-3xl backdrop-blur-2xl border shadow-2xl p-3.5 text-left z-[100] flex flex-col gap-2 font-play select-none animate-in fade-in zoom-in-95 duration-150 ${
              isDark
                ? 'bg-slate-900/95 border-cyan-400/40 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(34,211,238,0.2)]'
                : 'bg-white/95 border-white/90 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.2)]'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-2 border-b px-1 ${
                isDark ? 'border-white/10' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-cyan-950 text-cyan-300' : 'bg-indigo-50 text-indigo-600'
                  }`}
                >
                  <WebIcon name="compass" className="w-3.5 h-3.5" />
                </span>
                <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {language === 'en' ? 'Quick Jump' : 'Đi Tới Trang Nhanh'} ({currentPage + 1}/{pages.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPageMenuOpen(false)}
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto no-scrollbar py-0.5">
              {pages.map((p, idx) => {
                const pageTitle = language === 'en' && p.shortTitleEn ? p.shortTitleEn : p.shortTitle;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onSelectPage(idx);
                      setIsPageMenuOpen(false);
                    }}
                    className={`p-1.5 px-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer font-semibold ${
                      isDark
                        ? 'bg-slate-800/80 hover:bg-cyan-950/70 border-white/10 text-slate-200 hover:text-cyan-300'
                        : 'bg-white/80 hover:bg-slate-50 border-slate-100 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 flex items-center justify-center shrink-0"
                      style={{
                        color: isDark ? '#22d3ee' : p.theme,
                      }}
                    >
                      {p.iconSvg}
                    </span>
                    <span className="text-[11px] truncate flex-1 font-bold">
                      {idx + 1}. {pageTitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {onOpenPagesCarousel && (
              <div className="pt-2 border-t border-black/5 dark:border-white/10 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setIsPageMenuOpen(false);
                    onOpenPagesCarousel();
                  }}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-bold font-play flex items-center justify-center gap-2 transition cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 hover:from-cyan-600/45 hover:to-indigo-600/45 border-cyan-400/40 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'bg-gradient-to-r from-indigo-50 to-sky-50 hover:from-indigo-100 hover:to-sky-100 border-indigo-200 text-indigo-700 shadow-2xs'
                  }`}
                >
                  <WebIcon name="layers" className="w-4 h-4" />
                  <span>Xem 3D Carousel (14 Trang)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Khu vực 3: Bên phải - Avatar + nhóm nút tiện ích */}
      <div className="flex-1 h-full flex items-center justify-end overflow-visible pl-2 min-w-0 relative z-20">
        <div className="flex items-center justify-end py-1 relative">
          {/* Tiện ích 1: Ngôn Ngữ (Màu 1: Xanh Ngọc Bích Emerald) - Bấm hiển thị danh sách lựa chọn */}
          <div ref={languageMenuContainerRef} className="relative pointer-events-auto" style={{ zIndex: 10 }}>
            <button
              id="language-selector-footer-btn"
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setIsLanguageMenuOpen((prev) => !prev);
              }}
              className={`footer-util-btn border transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.3)] hover:border-emerald-300'
                  : 'border-emerald-300/90 shadow-xs hover:border-emerald-400'
              }`}
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.92) 0%, rgba(6, 95, 70, 0.88) 100%)'
                  : 'linear-gradient(135deg, rgba(209, 250, 229, 0.95) 0%, rgba(167, 243, 208, 0.85) 100%)',
                color: isDark ? '#a7f3d0' : '#065f46',
              }}
              title={language === 'en' ? 'Language: English (Click to change)' : 'Ngôn ngữ: Tiếng Việt (Bấm để chọn)'}
            >
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: isDark ? 'rgba(52, 211, 153, 0.25)' : 'rgba(16, 185, 129, 0.2)',
                  color: isDark ? '#a7f3d0' : '#047857',
                }}
              >
                <span className="text-[17px] leading-none select-none">
                  {language === 'en' ? '🇬🇧' : '🇻🇳'}
                </span>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span
                  className="text-[11px] font-bold whitespace-nowrap leading-none select-none tracking-tight font-play flex items-center gap-1"
                  style={{ color: isDark ? '#a7f3d0' : '#065f46' }}
                >
                  <span>{language === 'en' ? 'English' : 'Tiếng Việt'}</span>
                </span>
                <span
                  className="text-[8.5px] font-semibold mt-1 opacity-80 select-none whitespace-nowrap flex items-center gap-0.5"
                  style={{ color: isDark ? '#6ee7b7' : '#047857' }}
                >
                  <span>{language === 'en' ? 'EN / Tiếng Anh' : 'VI / Song ngữ'}</span>
                  <svg className={`w-2.5 h-2.5 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Popup Danh Sách Ngôn Ngữ Lựa Chọn */}
            {isLanguageMenuOpen && (
              <div className="absolute bottom-[calc(100%+14px)] left-0 sm:-left-4 z-[130] animate-in fade-in zoom-in-95 duration-150">
                <LanguageSelectorModal
                  isOpen={isLanguageMenuOpen}
                  onClose={() => setIsLanguageMenuOpen(false)}
                  isDark={isDark}
                />
              </div>
            )}
          </div>

          {/* Tiện ích 2: Hình Nền (Màu 2: Hồng Sen Rose - xếp chồng đè lên nút Ngôn Ngữ) */}
          <button
            type="button"
            onClick={() => {
              const idx = pages.findIndex((p) => p.shortTitle === 'Hình Nền');
              onSelectPage(idx !== -1 ? idx : pages.length - 1);
            }}
            className={`footer-util-btn border -ml-[64px] transition-all duration-300 ${
              isDark
                ? 'border-rose-400/60 shadow-[0_0_12px_rgba(251,113,133,0.3)]'
                : 'border-rose-300/90 shadow-xs'
            }`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(76, 5, 25, 0.92) 0%, rgba(136, 19, 55, 0.88) 100%)'
                : 'linear-gradient(135deg, rgba(255, 228, 230, 0.95) 0%, rgba(254, 205, 211, 0.88) 100%)',
              color: isDark ? '#fecdd3' : '#9f1239',
              zIndex: 18,
            }}
            title="Hình Nền"
          >
            <div
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 shadow-xs"
              style={{
                background: isDark ? 'rgba(251, 113, 133, 0.25)' : 'rgba(244, 63, 94, 0.2)',
                color: isDark ? '#fecdd3' : '#be123c',
              }}
            >
              <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span
                className="text-[11px] font-bold whitespace-nowrap leading-none select-none tracking-tight font-play"
                style={{ color: isDark ? '#fecdd3' : '#9f1239' }}
              >
                Hình Nền
              </span>
              <span
                className="text-[8.5px] font-semibold mt-1 opacity-80 select-none whitespace-nowrap"
                style={{ color: isDark ? '#fda4af' : '#be123c' }}
              >
                Tùy chỉnh
              </span>
            </div>
          </button>



          {/* Tiện ích 3: Nút Giao Diện (Màu 4: Vàng Hổ Phách Amber Gold - zIndex: 30) */}
          <div ref={themeMenuContainerRef} className="relative -ml-[64px] z-30 pointer-events-auto" style={{ zIndex: 30 }}>
            <button
              id="theme-toggle-footer-btn"
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setIsThemeMenuOpen((prev) => !prev);
              }}
              className={`footer-util-btn border cursor-pointer transition-all duration-300 ${
                isDark
                  ? 'border-amber-400/60 shadow-[0_0_14px_rgba(251,191,36,0.3)] hover:border-amber-300'
                  : 'border-amber-300/90 shadow-[0_2px_10px_rgba(245,158,11,0.15)] hover:border-amber-400'
              }`}
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(69, 26, 3, 0.92) 0%, rgba(120, 53, 15, 0.88) 100%)'
                  : 'linear-gradient(135deg, rgba(254, 243, 199, 0.95) 0%, rgba(253, 230, 138, 0.9) 100%)',
                color: isDark ? '#fde68a' : '#92400e',
              }}
              title="Nhấp để hiển thị danh sách giao diện cho chọn lựa"
            >
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:rotate-12 icon-spring-bounce"
                style={{
                  background: isDark ? 'rgba(251, 191, 36, 0.25)' : 'rgba(245, 158, 11, 0.25)',
                  color: isDark ? '#fde68a' : '#b45309',
                }}
              >
                <WebIcon
                  name={isDark ? 'moon' : 'sun'}
                  className="w-[16px] h-[16px]"
                  springBounce
                />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span
                  className="text-[11px] font-bold whitespace-nowrap leading-none select-none tracking-tight font-play flex items-center gap-1"
                  style={{
                    color: isDark ? '#fde68a' : '#92400e',
                  }}
                >
                  {isDark ? 'Kính Tối Đa Sắc' : 'Kính Sáng Đa Sắc'}
                </span>
                <span
                  className="text-[8.5px] font-semibold mt-1 opacity-80 select-none whitespace-nowrap flex items-center gap-0.5"
                  style={{
                    color: isDark ? '#fcd34d' : '#b45309',
                  }}
                >
                  <span>{isDark ? 'Giao diện tối neon' : 'Giao diện sáng glass'}</span>
                  <svg className={`w-2.5 h-2.5 transition-transform ${isThemeMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Popup Danh Sách Giao Diện Cho Chọn Lựa */}
            {isThemeMenuOpen && (
              <div
                className={`absolute bottom-[calc(100%+14px)] right-0 w-[300px] sm:w-[320px] rounded-3xl backdrop-blur-2xl border shadow-2xl p-3 text-left z-[120] flex flex-col gap-2 font-play select-none animate-in fade-in zoom-in-95 duration-150 ${
                  isDark
                    ? 'bg-slate-900/98 border-cyan-400/50 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(34,211,238,0.25)]'
                    : 'bg-white/98 border-white/95 text-slate-800 shadow-[0_20px_50px_rgba(30,27,75,0.22),0_0_0_1px_rgba(255,255,255,0.9)]'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(34, 211, 238, 0.25)'
                    : '0 20px 50px rgba(30, 27, 75, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.9)',
                }}
              >
                {/* Header Popup */}
                <div
                  className={`flex items-center justify-between pb-2 border-b px-1 ${
                    isDark ? 'border-white/10' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-cyan-950 text-cyan-300' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <WebIcon name="palette" className="w-3.5 h-3.5" />
                    </span>
                    <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      Chọn Giao Diện
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsThemeMenuOpen(false)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Danh Sách Giao Diện */}
                <div className="flex flex-col gap-1.5 py-0.5">
                  {THEME_LIST.map((theme) => {
                    const isActive = currentTheme === theme.id;
                    const iconName = theme.id === 'light-glass' ? 'sun' : 'moon';

                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          SoundEngine.playTap();
                          if (onSelectTheme) onSelectTheme(theme.id);
                          setIsThemeMenuOpen(false);
                          showToast(`Đã áp dụng giao diện: ${theme.fourWordName}`);
                        }}
                        className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                          isActive
                            ? isDark
                              ? 'bg-cyan-950/70 border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                              : 'bg-amber-50/90 border-amber-300 shadow-sm'
                            : isDark
                            ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 text-slate-300'
                            : 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200/80 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs icon-spring-bounce ${
                              isActive
                                ? isDark
                                  ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400'
                                  : 'bg-amber-200/80 text-amber-800 ring-1 ring-amber-400'
                                : isDark
                                ? 'bg-slate-700/80 text-slate-300'
                                : 'bg-white text-slate-600 border border-slate-200'
                            }`}
                          >
                            <WebIcon
                              name={iconName}
                              className="w-4 h-4"
                              springBounce
                            />
                          </div>
                          <div className="min-w-0 flex items-center gap-2">
                            <span
                              className={`text-xs font-black font-play truncate ${
                                isActive
                                  ? isDark
                                    ? 'text-cyan-300'
                                    : 'text-amber-900'
                                  : isDark
                                  ? 'text-slate-100'
                                  : 'text-slate-800'
                              }`}
                            >
                              {theme.fourWordName}
                            </span>
                            {isActive && (
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                                isDark
                                  ? 'bg-cyan-400/30 text-cyan-200'
                                  : 'bg-amber-200 text-amber-900'
                              }`}>
                                Đang dùng
                              </span>
                            )}
                          </div>
                        </div>

                        {isActive && (
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              isDark
                                ? 'bg-cyan-400 text-slate-950 shadow-xs'
                                : 'bg-amber-500 text-white shadow-xs'
                            }`}
                          >
                            <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tiện ích 4: Avatar Hùng Thái biến đổi hình thái từ pill -> circle -> bay lên + Pure CSS Circle Menu (Màu 5: Xanh Chàm Hoàng Gia Royal Indigo) */}
          <div ref={contactContainerRef} className="avatar-circle-menu-container -ml-[64px] z-42">
            {/* Nút Avatar Morphing: Lúc bình thường là nút dài, click vào thu tròn và bay lên */}
            <button
              id="avatar-hung-thai-morph-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsContactMenuOpen((prev) => !prev);
              }}
              className={`avatar-morph-btn ${isContactMenuOpen ? 'is-open' : ''}`}
              style={
                isDark
                  ? {
                      background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.94) 0%, rgba(49, 46, 129, 0.9) 100%)',
                      borderColor: 'rgba(129, 140, 248, 0.65)',
                      boxShadow: '0 0 16px rgba(129, 140, 248, 0.35)',
                    }
                  : {
                      background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(224, 231, 255, 0.9) 100%)',
                      borderColor: 'rgba(165, 180, 252, 0.9)',
                      boxShadow: 'inset 0 1px 1.5px rgba(255, 255, 255, 0.95), 0 3px 12px rgba(79, 70, 229, 0.18)',
                    }
              }
              title={isContactMenuOpen ? 'Thu gọn menu liên hệ' : 'Nguyễn Hùng Thái (Nhấp để mở Circle Menu liên hệ)'}
              aria-expanded={isContactMenuOpen}
              aria-label="Menu liên hệ Hùng Thái"
            >
              <div
                className={`avatar-morph-inner ${
                  isDark
                    ? 'bg-indigo-950/80 text-indigo-300 ring-1 ring-indigo-400/50'
                    : 'bg-indigo-500/20 text-[#4f46e5] ring-1 ring-indigo-300'
                }`}
              >
                <img
                  src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                  alt="Hùng Thái"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/100x100/4f46e5/ffffff?text=HT';
                  }}
                />
                {!isContactMenuOpen && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                )}
              </div>

              {/* Nhãn chữ co biến mất mượt mà khi thu thành hình tròn */}
              <div className="avatar-morph-text flex flex-col items-start select-none">
                <span
                  className={`text-[11.5px] font-bold whitespace-nowrap leading-tight tracking-tight font-play ${
                    isDark ? 'text-indigo-200' : 'text-[#3730a3]'
                  }`}
                >
                  Hùng Thái
                </span>
                <span
                  className={`text-[9px] font-medium whitespace-nowrap leading-none tracking-tight ${
                    isDark ? 'text-indigo-300' : 'text-[#4f46e5]'
                  }`}
                >
                  Chuyên gia CSKH
                </span>
              </div>

              {/* Nút đóng badge ✕ hiện lên khi ở trạng thái bay lên */}
              <span className="avatar-morph-close-badge" title="Đóng">
                ✕
              </span>
            </button>

            {/* Pure CSS Radial / Circle Menu Tỏa Vòng Cung Xung Quanh Avatar */}
            <div className={`pure-circle-menu ${isContactMenuOpen ? 'is-open' : ''}`}>
              {/* Vầng sáng nền lan tỏa */}
              <div className="circle-menu-aura" />

              {/* Node 1: LinkedIn (Góc Tây Bắc thấp) */}
              <a
                href="https://www.linkedin.com/in/hungthai84"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => showToast('Đang mở trang LinkedIn Nguyễn Hùng Thái')}
                className="circle-menu-node circle-node-1 bg-[#0a66c2]"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span className="circle-node-tooltip">
                  LinkedIn • /in/hungthai84
                </span>
              </a>

              {/* Node 2: Zalo Chat (Góc Tây Bắc cao) */}
              <a
                href="https://zalo.me/0903011699"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => showToast('Đang kết nối Zalo Chat (0903.011.699)')}
                className="circle-menu-node circle-node-2 bg-[#0068ff]"
                title="Zalo Chat Trực Tiếp"
                aria-label="Zalo Chat Trực Tiếp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.08L5 22l4.16-1.39C10.05 20.85 11 21 12 21c5.52 0 10-4.03 10-9s-4.48-10-10-10zm-1.5 13H8.2V9h2.3v6zm5.3 0h-3.6V9h3.6v1.3h-2.3v1.1h2.1v1.3h-2.1v1h2.3V15z" />
                </svg>
                <span className="circle-node-tooltip">
                  Zalo • 0903.011.699
                </span>
              </a>

              {/* Node 3: Trang Liên Hệ Chi Tiết (Đỉnh vòm cao nhất) */}
              <button
                type="button"
                onClick={() => {
                  setIsContactMenuOpen(false);
                  const idx = pages.findIndex((p) => p.shortTitle === 'Liên Hệ');
                  onSelectPage(idx !== -1 ? idx : 12);
                  showToast('Mở trang Thông Tin Liên Hệ Chi Tiết');
                }}
                className="circle-menu-node circle-node-3 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600"
                title="Trang Liên Hệ Chi Tiết"
                aria-label="Trang Liên Hệ Chi Tiết"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="circle-node-tooltip">
                  Xem Trang Liên Hệ
                </span>
              </button>

              {/* Node 4: Hotline Gọi Điện / Sao Chép (Góc Đông Bắc cao) */}
              <a
                href="tel:0903011699"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText('0903011699');
                  }
                  showToast('Số điện thoại: 0903.011.699 (Đã sao chép)');
                }}
                className="circle-menu-node circle-node-4 bg-[#10b981]"
                title="Hotline: 0903.011.699 (Nhấp để gọi / sao chép)"
                aria-label="Hotline 0903.011.699"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span className="circle-node-tooltip">
                  Hotline • 0903.011.699
                </span>
              </a>

              {/* Node 5: Email Liên Hệ / Sao Chép (Góc Đông Bắc thấp) */}
              <a
                href="mailto:hungthai84@gmail.com"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText('hungthai84@gmail.com');
                  }
                  showToast('Email: hungthai84@gmail.com (Đã sao chép)');
                }}
                className="circle-menu-node circle-node-5 bg-[#f43f5e]"
                title="Email: hungthai84@gmail.com"
                aria-label="Email hungthai84@gmail.com"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="circle-node-tooltip">
                  hungthai84@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Tiện ích 5: Avatar AI Chat 24/7 (Màu 6: Tím Thạch Anh Neon Violet - zIndex cao nhất) */}
          <button
            type="button"
            onClick={() => {
              if (onOpenAiChat) onOpenAiChat();
            }}
            className={`footer-util-btn border -ml-[64px] cursor-pointer transition-all duration-300 ${
              isDark
                ? 'border-purple-400/60 shadow-[0_0_16px_rgba(192,132,252,0.35)]'
                : 'border-purple-300/90 shadow-xs'
            }`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(59, 7, 100, 0.92) 0%, rgba(88, 28, 135, 0.88) 100%)'
                : 'linear-gradient(135deg, rgba(250, 245, 255, 0.95) 0%, rgba(243, 232, 255, 0.9) 100%)',
              color: isDark ? '#f3e8ff' : '#6b21a8',
              zIndex: 55,
            }}
            title="Trợ lý AI Hùng Thái 24/7 (Nhấp để mở trò chuyện bung popup)"
          >
            <div
              className={`w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 relative overflow-hidden ring-1 shadow-xs ${
                isDark
                  ? 'bg-purple-950/80 text-purple-300 ring-purple-400/50'
                  : 'bg-purple-500/20 text-[#7c3aed] ring-purple-300'
              }`}
            >
              <img
                src="https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif"
                alt="Avata Ti Chuot GIF"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/100x100/8b5cf6/ffffff?text=AI';
                }}
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse" />
            </div>
            <div className="flex flex-col items-start select-none">
              <span
                className="text-[11.5px] font-bold whitespace-nowrap leading-tight tracking-tight font-play"
                style={{ color: isDark ? '#f3e8ff' : '#6b21a8' }}
              >
                AI hỗ trợ
              </span>
              <span
                className="text-[9px] font-medium whitespace-nowrap leading-none tracking-tight"
                style={{ color: isDark ? '#d8b4fe' : '#9333ea' }}
              >
                Trợ lý 24/7
              </span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
