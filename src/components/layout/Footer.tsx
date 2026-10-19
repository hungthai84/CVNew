'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PageMeta, WeatherPreset, SiteTheme } from '@/types';
import { THEME_LIST } from '@/data/themes';
import { WeatherWidget } from './WeatherWidget';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { useLanguage } from '@/context/LanguageContext';

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
  onOpenThemeModal?: () => void;
  onOpenAiChat?: () => void;
}

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
  onOpenThemeModal,
  onOpenAiChat,
}) => {
  const { showToast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const activePage = pages[currentPage] || pages[0];

  const [isPageMenuOpen, setIsPageMenuOpen] = useState<boolean>(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState<boolean>(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const pageMenuContainerRef = useRef<HTMLDivElement>(null);
  const contactContainerRef = useRef<HTMLDivElement>(null);
  const themeMenuContainerRef = useRef<HTMLDivElement>(null);
  const langMenuContainerRef = useRef<HTMLDivElement>(null);

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
      if (langMenuContainerRef.current && !langMenuContainerRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isPageMenuOpen || isContactMenuOpen || isThemeMenuOpen || isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPageMenuOpen, isContactMenuOpen, isThemeMenuOpen, isLangMenuOpen]);

  return (
    <footer
      id="app-footer"
      className="w-[1200px] max-w-[calc(100%-40px)] mx-auto h-[72px] glass-panel rounded-t-[18px] rounded-b-none flex items-center justify-between px-4 z-40 relative flex-shrink-0 transition-all duration-300 shadow-[0_-14px_40px_-6px_rgba(30,27,75,0.18),0_-4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_-16px_45px_-6px_rgba(0,0,0,0.65),0_0_24px_rgba(99,102,241,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)] border-t-2 border-x border-white/80 dark:border-white/20 hover:shadow-[0_-18px_50px_-6px_rgba(99,102,241,0.25),0_-6px_22px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] hover:border-white/95 group/footer"
    >
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />
      {/* Khu vực 1: Bên trái - Card thời tiết, co giãn tùy theo khoảng trống còn lại */}
      <div className="flex-1 h-full py-2.5 pr-2 flex items-center justify-start min-w-0 relative z-10">
        <WeatherWidget currentPreset={currentWeather} onCycle={onCycleWeather} currentTheme={currentTheme} />
      </div>

      {/* Khu vực 2: Chính giữa - Nút trang luôn nằm CHÍNH GIỮA tuyệt đối của Footer */}
      <div
        ref={pageMenuContainerRef}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex items-center justify-center shrink-0"
      >
        <div className="relative inline-flex items-center p-[2px] rounded-[999px] overflow-hidden shadow-[0_0_18px_rgba(99,102,241,0.4)] group transition-all duration-300 hover:shadow-[0_0_28px_rgba(99,102,241,0.65)] hover:scale-[1.03]">
          {/* Rotating Conic Laser Beam Border */}
          <div className="absolute -inset-[220%] animate-[spin_4.5s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#ec4899,#06b6d4,#10b981,#fbbf24,#6366f1)] opacity-95 blur-[0.8px]" />

          {/* Glassmorphism Inner Capsule (114px × 46px, bo cong 4 góc 999px hài hòa với Footer) */}
          <div className="relative z-10 w-[114px] h-[46px] flex items-center justify-between px-1 rounded-[999px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-inner">
            {/* Prev Button (Lùi trang) */}
            <button
              type="button"
              onClick={onPrevPage}
              title={`${t.footer.prevPage} (←)`}
              className="w-[34px] h-[34px] rounded-[999px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-cyan-400 flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-xs cursor-pointer shrink-0"
            >
              <svg className="w-[14px] h-[14px] stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              title={`${t.footer.pageOf} ${t.pages[activePage.id]?.shortTitle || activePage.shortTitle} (${currentPage + 1}/${pages.length}) — ${t.footer.quickJump}`}
              className="flex-1 h-[34px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 px-0.5"
            >
              {currentPage === 6 ? (
                /* Khối <div> "7/16" được format theo phong cách giao diện được chọn */
                <div
                  id="domains-page-counter-badge"
                  className={`px-2 py-0.5 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    currentTheme === 'dark-neon'
                      ? 'bg-slate-950/90 border border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.6)] text-cyan-300'
                      : currentTheme === 'flat-rainbow'
                      ? 'bg-white text-slate-900 border-2 font-black shadow-xs'
                      : currentTheme === 'light-glass-multicolor'
                      ? 'bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/90 shadow-2xs text-[#1E3A6D]'
                      : 'bg-indigo-50/90 border border-indigo-200/90 shadow-2xs text-indigo-700'
                  }`}
                  style={
                    currentTheme === 'flat-rainbow'
                      ? {
                          background:
                            'linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7) border-box',
                          border: '2px solid transparent',
                        }
                      : {}
                  }
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
                  className="text-xs sm:text-[13px] font-mono font-black text-indigo-700 dark:text-cyan-400 tracking-tight whitespace-nowrap leading-none select-none text-center"
                >
                  {currentPage + 1}/{pages.length}
                </span>
              )}
            </button>

            {/* Next Button (Tới trang) */}
            <button
              type="button"
              onClick={onNextPage}
              title={`${t.footer.nextPage} (→)`}
              className="w-[34px] h-[34px] rounded-[999px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-cyan-400 flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-xs cursor-pointer shrink-0"
            >
              <svg className="w-[14px] h-[14px] stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Popup Menu Đi Tới Trang Nhanh */}
        {isPageMenuOpen && (
          <div
            className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-80 sm:w-96 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl p-3.5 text-left z-[100] flex flex-col gap-2 font-play select-none animate-in fade-in zoom-in-95 duration-150"
            style={{
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10 px-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <WebIcon name="compass" className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {t.footer.quickJump} ({currentPage + 1}/{pages.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPageMenuOpen(false)}
                className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto no-scrollbar py-0.5">
              {pages.map((p, idx) => {
                const isActive = idx === currentPage;
                const pageTitle = t.pages[p.id]?.shortTitle || p.shortTitle;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onSelectPage(idx);
                      setIsPageMenuOpen(false);
                    }}
                    className={`p-1.5 px-2.5 rounded-full border text-left flex items-center gap-2 transition cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-400 dark:border-cyan-400 text-indigo-700 dark:text-cyan-300 font-black shadow-2xs'
                        : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: p.bgLight, color: p.theme }}
                    >
                      {p.iconSvg}
                    </span>
                    <span className="text-[11px] truncate flex-1">
                      {idx + 1}. {pageTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Khu vực 3: Bên phải - Avatar + nhóm nút tiện ích (Kích thước bằng nhóm nút tới và lùi trang: 107px x 40px) */}
      <div className="flex-1 h-full flex items-center justify-end overflow-visible pl-2 min-w-0 relative z-20">
        <div className="flex items-center justify-end py-1 relative">
          {/* Tiện ích 1: Ngôn Ngữ */}
          <div ref={langMenuContainerRef} className="relative z-10">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen((prev) => !prev)}
              className="footer-util-btn border border-indigo-300/80 dark:border-indigo-400/40 cursor-pointer"
              style={{
                background: currentTheme === 'dark-neon' ? 'rgba(30, 27, 75, 0.75)' : 'rgba(224, 231, 255, 0.7)',
                color: currentTheme === 'dark-neon' ? '#818cf8' : '#4f46e5',
              }}
              title={t.footer.language}
            >
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 text-base"
                style={{
                  background: currentTheme === 'dark-neon' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                  color: currentTheme === 'dark-neon' ? '#818cf8' : '#4f46e5',
                }}
              >
                {language === 'vi' ? '🇻🇳' : '🇬🇧'}
              </div>
              <span
                className="text-[11.5px] font-bold whitespace-nowrap leading-none select-none tracking-tight flex items-center gap-1"
                style={{ color: currentTheme === 'dark-neon' ? '#818cf8' : '#4f46e5' }}
              >
                <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                <span className="text-[9px] font-black opacity-70">▾</span>
              </span>
            </button>

            {/* Popup Menu Chọn Ngôn Ngữ */}
            {isLangMenuOpen && (
              <div
                className="absolute bottom-[calc(100%+10px)] left-0 w-48 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl p-2.5 text-left z-[100] flex flex-col gap-1.5 font-play select-none animate-in fade-in zoom-in-95 duration-150"
                style={{
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-white/10 px-1">
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <span>🌐</span>
                    <span>{t.footer.selectLanguage}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLangMenuOpen(false)}
                    className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('vi');
                    setIsLangMenuOpen(false);
                    showToast('Đã chuyển ngôn ngữ sang Tiếng Việt');
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition cursor-pointer ${
                    language === 'vi'
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-300 dark:border-cyan-400 text-indigo-700 dark:text-cyan-300 font-black'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs">
                    <span className="text-base">🇻🇳</span>
                    <span>Tiếng Việt</span>
                  </span>
                  {language === 'vi' && <span className="text-indigo-600 dark:text-cyan-400 text-xs font-bold">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    setIsLangMenuOpen(false);
                    showToast('Switched language to English');
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition cursor-pointer ${
                    language === 'en'
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-300 dark:border-cyan-400 text-indigo-700 dark:text-cyan-300 font-black'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs">
                    <span className="text-base">🇬🇧</span>
                    <span>English</span>
                  </span>
                  {language === 'en' && <span className="text-indigo-600 dark:text-cyan-400 text-xs font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Tiện ích 2: Hình Nền (xếp chồng đè lên nút Ngôn Ngữ) */}
          <button
            type="button"
            onClick={() => {
              const idx = pages.findIndex((p) => p.shortTitle === 'Hình Nền');
              onSelectPage(idx !== -1 ? idx : pages.length - 1);
            }}
            className="footer-util-btn border border-fuchsia-300/80 dark:border-fuchsia-400/40 -ml-[64px]"
            style={{
              background: currentTheme === 'dark-neon' ? 'rgba(74, 4, 78, 0.75)' : 'rgba(253, 228, 255, 0.7)',
              color: currentTheme === 'dark-neon' ? '#f472b6' : '#c026d3',
              zIndex: 20,
            }}
            title="Hình Nền"
          >
            <div
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0"
              style={{
                background: currentTheme === 'dark-neon' ? 'rgba(217, 70, 239, 0.25)' : 'rgba(217, 70, 239, 0.2)',
                color: currentTheme === 'dark-neon' ? '#f472b6' : '#c026d3',
              }}
            >
              <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <span
              className="text-[11.5px] font-bold whitespace-nowrap leading-none select-none tracking-tight"
              style={{ color: currentTheme === 'dark-neon' ? '#f472b6' : '#c026d3' }}
            >
              Hình Nền
            </span>
          </button>

          {/* Tiện ích 3: Nút Giao Diện - Click mở Danh sách Giao diện (Icon & Tiêu đề 4 chữ) */}
          <div ref={themeMenuContainerRef} className="relative -ml-[64px] z-30">
            <button
              id="theme-toggle-footer-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsThemeMenuOpen((prev) => !prev);
              }}
              className="footer-util-btn border cursor-pointer"
              style={{
                background:
                  currentTheme === 'dark-neon'
                    ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 23, 42, 0.85) 100%)'
                    : currentTheme === 'flat-rainbow'
                    ? 'linear-gradient(135deg, rgba(254, 242, 242, 0.95) 0%, rgba(240, 253, 244, 0.9) 50%, rgba(238, 242, 255, 0.95) 100%)'
                    : currentTheme === 'light-glass-multicolor'
                    ? 'linear-gradient(135deg, rgba(234, 244, 255, 0.95) 0%, rgba(241, 245, 255, 0.9) 50%, rgba(245, 243, 255, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(245, 243, 255, 0.9) 0%, rgba(254, 243, 199, 0.85) 100%)',
                borderColor:
                  currentTheme === 'dark-neon'
                    ? 'rgba(56, 189, 248, 0.5)'
                    : currentTheme === 'flat-rainbow'
                    ? 'rgba(236, 72, 153, 0.8)'
                    : currentTheme === 'light-glass-multicolor'
                    ? 'rgba(59, 130, 246, 0.45)'
                    : 'rgba(252, 211, 77, 0.8)',
                color:
                  currentTheme === 'dark-neon'
                    ? '#38bdf8'
                    : currentTheme === 'flat-rainbow'
                    ? '#db2777'
                    : currentTheme === 'light-glass-multicolor'
                    ? '#1E3A6D'
                    : '#d97706',
              }}
              title="Tùy chọn giao diện hệ thống (Nhấp để mở danh sách chọn)"
            >
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 shadow-xs"
                style={{
                  background:
                    currentTheme === 'dark-neon'
                      ? 'rgba(56, 189, 248, 0.2)'
                      : currentTheme === 'flat-rainbow'
                      ? 'rgba(236, 72, 153, 0.2)'
                      : currentTheme === 'light-glass-multicolor'
                      ? 'rgba(59, 130, 246, 0.18)'
                      : 'rgba(251, 191, 36, 0.25)',
                  color:
                    currentTheme === 'dark-neon'
                      ? '#38bdf8'
                      : currentTheme === 'flat-rainbow'
                      ? '#db2777'
                      : currentTheme === 'light-glass-multicolor'
                      ? '#3B82F6'
                      : '#d97706',
                }}
              >
                {currentTheme === 'dark-neon' ? (
                  <WebIcon name="moon" className="w-[16px] h-[16px]" />
                ) : currentTheme === 'flat-rainbow' ? (
                  <WebIcon name="palette" className="w-[16px] h-[16px]" />
                ) : currentTheme === 'light-glass-multicolor' ? (
                  <WebIcon name="layoutdashboard" className="w-[16px] h-[16px]" />
                ) : (
                  <WebIcon name="sun" className="w-[16px] h-[16px]" />
                )}
              </div>
              <span
                className="text-[11.5px] font-bold whitespace-nowrap leading-none select-none tracking-tight font-play"
                style={{
                  color:
                    currentTheme === 'dark-neon'
                      ? '#38bdf8'
                      : currentTheme === 'flat-rainbow'
                      ? '#db2777'
                      : currentTheme === 'light-glass-multicolor'
                      ? '#1E3A6D'
                      : '#d97706',
                }}
              >
                Giao Diện
              </span>
            </button>

            {/* Popup Menu Danh sách Giao diện (Icon & Tiêu đề 4 chữ) */}
            {isThemeMenuOpen && (
              <div
                className="absolute bottom-[calc(100%+14px)] right-0 w-64 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl p-2.5 text-left z-[100] flex flex-col gap-1.5 font-play select-none animate-in fade-in zoom-in-95 duration-150"
                style={{
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-white/10 px-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Chọn Giao Diện
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsThemeMenuOpen(false)}
                    className="w-5 h-5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {THEME_LIST.map((theme) => {
                    const isSelected = currentTheme === theme.id;
                    const iconName = theme.icon.toLowerCase();
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          if (onSelectTheme) {
                            onSelectTheme(theme.id);
                          }
                          setIsThemeMenuOpen(false);
                          showToast(`Đã chuyển sang ${theme.fourWordName}`);
                        }}
                        className={`w-full p-2 rounded-xl border flex items-center justify-between gap-2.5 transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-cyan-400 text-indigo-700 dark:text-cyan-300 font-bold shadow-2xs'
                            : 'bg-white/70 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-700/60 border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-2xs"
                            style={{
                              background: theme.accentColor + '22',
                              color: theme.accentColor,
                            }}
                          >
                            <WebIcon name={iconName} className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-bold truncate">
                            {theme.fourWordName}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-xs" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tiện ích 4: Avatar Hùng Thái biến đổi hình thái từ pill -> circle -> bay lên + Pure CSS Circle Menu */}
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
              title={isContactMenuOpen ? 'Thu gọn menu liên hệ' : 'Nguyễn Hùng Thái (Nhấp để mở Circle Menu liên hệ)'}
              aria-expanded={isContactMenuOpen}
              aria-label="Menu liên hệ Hùng Thái"
            >
              <div className="avatar-morph-inner bg-sky-500/20 text-[#0284c7] ring-1 ring-sky-300">
                <img
                  src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                  alt="Hùng Thái"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/100x100/0284c7/ffffff?text=HT';
                  }}
                />
                {!isContactMenuOpen && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                )}
              </div>

              {/* Nhãn chữ co biến mất mượt mà khi thu thành hình tròn */}
              <span className="avatar-morph-text text-[11.5px] font-bold whitespace-nowrap leading-none select-none tracking-tight text-[#0284c7]">
                Hùng Thái
              </span>

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

          {/* Tiện ích 5: Avatar AI Chat 24/7 (Nằm trên nút Avatar Hùng Thái với zIndex cao hơn) */}
          <button
            type="button"
            onClick={() => {
              if (onOpenAiChat) onOpenAiChat();
            }}
            className="footer-util-btn border border-purple-300/90 dark:border-purple-400/40 -ml-[64px] cursor-pointer"
            style={{
              background:
                currentTheme === 'dark-neon'
                  ? 'linear-gradient(135deg, rgba(59, 7, 100, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(250, 245, 255, 0.9) 0%, rgba(243, 232, 255, 0.85) 100%)',
              color: currentTheme === 'dark-neon' ? '#c084fc' : '#7c3aed',
              zIndex: 55,
            }}
            title="Trợ lý AI Hùng Thái 24/7 (Nhấp để mở trò chuyện bung popup)"
          >
            <div className="w-[36px] h-[36px] rounded-full bg-purple-500/20 text-[#7c3aed] flex items-center justify-center shrink-0 relative overflow-hidden ring-1 ring-purple-300 shadow-xs">
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
            <span
              className="text-[11.5px] font-bold whitespace-nowrap leading-none select-none tracking-tight font-play"
              style={{ color: currentTheme === 'dark-neon' ? '#c084fc' : '#7c3aed' }}
            >
              Avatar AI
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
