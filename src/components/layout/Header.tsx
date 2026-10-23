'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PageMeta, SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { WebIcon } from '@/components/ui/WebIcon';
import { useToast } from '@/components/ui/Toast';

export interface HeaderProps {
  pages: PageMeta[];
  currentPage: number;
  currentTheme?: SiteTheme;
  onSelectPage: (index: number) => void;
  onOpenAiChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  pages,
  currentPage,
  currentTheme = 'light-glass',
  onSelectPage,
}) => {
  const { showToast } = useToast();

  // Xóa icon Hình Nền khỏi thanh menu Header, giữ các mục nội dung chính
  const headerPages = pages.filter((page) => page.shortTitle !== 'Hình Nền');

  const isDark = currentTheme === 'dark-neon';

  // Trạng thái Bật/Tắt âm thanh giao diện toàn cục (lưu trong localStorage & đồng bộ với SoundEngine)
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const initial = SoundEngine.loadPersistedState();
    setIsSoundEnabled(initial);
    const unsubscribe = SoundEngine.subscribe((enabled) => {
      setIsSoundEnabled(enabled);
    });
    return unsubscribe;
  }, []);

  const handleToggleGlobalSound = () => {
    const nextState = SoundEngine.toggleSound();
    setIsSoundEnabled(nextState);
    showToast(
      nextState
        ? 'Đã bật âm thanh phản hồi giao diện (Unmuted)'
        : 'Đã tắt âm thanh phản hồi giao diện (Muted)'
    );
  };

  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);

  // Chiều rộng đồng nhất cho tất cả các nút (lấy theo nút dài nhất làm chuẩn)
  const [longestWidth, setLongestWidth] = useState<number>(126);

  // Trạng thái xếp chồng khi không hiển thị hết các nút trên thanh Header
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [overlapAmount, setOverlapAmount] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Đo đạc kích thước của nút dài nhất trong DOM và tính toán hiệu ứng xếp chồng khi tràn
  useEffect(() => {
    const calculateLayout = () => {
      if (!measureContainerRef.current) return;
      const items = measureContainerRef.current.querySelectorAll<HTMLElement>('.neonav-measure-item');
      if (!items || items.length === 0) return;

      let maxWidth = 0;
      items.forEach((item) => {
        const w = item.getBoundingClientRect().width;
        if (w > maxWidth) maxWidth = w;
      });

      let currentLongest = longestWidth;
      if (maxWidth > 0) {
        const rounded = Math.ceil(maxWidth);
        currentLongest = rounded % 2 === 0 ? rounded : rounded + 1;
        setLongestWidth(currentLongest);
      }

      // Kiểm tra có hiển thị hết các nút trong nav hay không
      if (navRef.current) {
        const availableWidth = navRef.current.clientWidth - 16; // trừ padding ngang
        const count = headerPages.length;
        if (count > 1) {
          const naturalTotalWidth = count * currentLongest + (count - 1) * 6; // 6px gap bình thường
          if (naturalTotalWidth > availableWidth) {
            setIsOverflowing(true);
            // Tính toán mức độ xếp chồng cần thiết để các nút co giãn tối ưu
            const neededOverlap = Math.ceil((naturalTotalWidth - availableWidth) / (count - 1));
            // Giới hạn overlap để icon bên trái (28px) và phần đầu chữ luôn hiển thị rõ
            const maxOverlap = Math.max(16, Math.min(currentLongest - 42, 65));
            const overlap = Math.max(14, Math.min(neededOverlap, maxOverlap));
            setOverlapAmount(overlap);
          } else {
            setIsOverflowing(false);
            setOverlapAmount(0);
          }
        } else {
          setIsOverflowing(false);
          setOverlapAmount(0);
        }
      }
    };

    calculateLayout();

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(calculateLayout);
    }

    const timer = setTimeout(calculateLayout, 150);
    window.addEventListener('resize', calculateLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateLayout);
    };
  }, [headerPages.length, longestWidth]);

  // Tự động cuộn mượt đến nút đang chọn khi chuyển trang
  useEffect(() => {
    if (!navRef.current) return;
    const activeItem = navRef.current.querySelector<HTMLElement>('.neonav-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentPage]);

  // Hỗ trợ cuộn ngang bằng con lăn chuột trên thanh menu Header
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (navRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        navRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <header
      id="app-header"
      className="neonav-bar w-[1200px] max-w-[calc(100%-40px)] mx-auto h-[64px] sm:h-[68px] glass-panel rounded-b-[20px] rounded-t-none flex items-center justify-between p-[2px] z-40 relative flex-shrink-0 transition-all duration-300 shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_45px_-6px_rgba(0,0,0,0.65),0_0_24px_rgba(99,102,241,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)] border-b-2 border-x border-white/80 dark:border-white/20 hover:shadow-[0_18px_50px_-6px_rgba(99,102,241,0.25),0_6px_22px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] hover:border-white/95 group/header overflow-hidden"
    >
      {/* NeoNav Floating Background Elements */}
      <div className="header-floating-elements">
        <div
          className="header-floating-circle"
          style={{ width: '45px', height: '45px', top: '10%', left: '8%', animationDelay: '0s' }}
        />
        <div
          className="header-floating-circle"
          style={{ width: '65px', height: '65px', top: '25%', right: '12%', animationDelay: '2s' }}
        />
        <div
          className="header-floating-circle"
          style={{ width: '35px', height: '35px', bottom: '15%', left: '48%', animationDelay: '4s' }}
        />
      </div>

      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-10" />

      {/* Hidden measurement container to calculate natural width of longest button */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute -top-[9999px] -left-[9999px] pointer-events-none opacity-0 invisible flex flex-nowrap"
      >
        {headerPages.map((page) => (
          <div
            key={`measure-${page.id}`}
            className="neonav-measure-item h-[38px] w-auto min-w-max flex items-center justify-start gap-1.5 pl-1.5 pr-3 rounded-full border text-[11px] sm:text-[11.5px] font-bold"
          >
            <div className="w-7 h-7 rounded-full shrink-0" />
            <span className="whitespace-nowrap font-bold text-[11px] sm:text-[11.5px] tracking-tight text-left">
              {page.shortTitle}
            </span>
          </div>
        ))}
      </div>

      {/* Danh sách Tabs Menu Điều Hướng NeoNav Glass */}
      <nav
        ref={navRef}
        id="header-center"
        onWheel={handleWheel}
        className={`flex-1 min-w-0 h-full flex items-center overflow-x-auto no-scrollbar z-10 ${
          currentPage === 4 ? 'p-[2px]' : 'py-[2px] px-2'
        }`}
      >
        <div
          ref={containerRef}
          id="header-menu-container"
          className={`flex items-center m-auto py-[2px] flex-nowrap transition-all duration-300 ${
            isOverflowing ? 'neonav-stacked' : 'gap-1 sm:gap-1.5'
          }`}
        >
          {headerPages.map((page, index) => {
            const isSelected = currentPage === page.id;
            const isHovered = hoveredId === page.id;
            const baseZIndex = index + 1;
            const itemZIndex = isHovered ? 50 : isSelected ? 35 : baseZIndex;

            return (
              <button
                key={page.id}
                id={`nav-item-${page.id}`}
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  onSelectPage(page.id);
                }}
                onMouseEnter={() => setHoveredId(page.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`neonav-item relative h-[38px] flex items-center justify-start gap-1.5 pl-1.5 pr-2.5 rounded-full border cursor-pointer select-none transition-colors duration-200 shrink-0 ${
                  isSelected ? 'active' : ''
                }`}
                style={{
                  width: `${longestWidth}px`,
                  minWidth: `${longestWidth}px`,
                  maxWidth: `${longestWidth}px`,
                  marginLeft: isOverflowing && index > 0 ? `-${overlapAmount}px` : undefined,
                  zIndex: itemZIndex,
                  transform: 'none',
                  boxShadow: 'none', // Xóa hoàn toàn hiệu ứng chọn trang/nổi lên trên
                  ...(isSelected
                    ? {
                        background: page.theme,
                        borderColor: page.theme,
                        color: '#ffffff',
                      }
                    : {
                        borderColor: isDark ? `${page.theme}60` : page.borderColor || `${page.theme}45`,
                        background: isDark
                          ? 'rgba(15, 23, 42, 0.75)'
                          : page.bgNormal || page.bgLight || `${page.theme}15`,
                        color: page.theme, // Tiêu đề có màu trùng khớp với màu icon
                      }),
                }}
                title={page.fullName}
              >
                {/* Circular Icon Container */}
                <div
                  className="neonav-icon-box w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-none transition-none"
                  style={{
                    background: isSelected
                      ? 'rgba(255, 255, 255, 0.25)'
                      : isDark
                      ? 'rgba(15, 23, 42, 0.85)'
                      : page.bgLight,
                    color: isSelected ? '#ffffff' : page.theme,
                  }}
                >
                  <span className="w-4 h-4 flex items-center justify-center" style={{ color: isSelected ? '#ffffff' : page.theme }}>
                    {page.iconSvg}
                  </span>
                </div>

                {/* Tiêu đề ngắn gọn có màu TRÙNG KHỚP với màu icon */}
                <span
                  className="whitespace-nowrap font-bold text-[11px] sm:text-[11.5px] tracking-tight transition-colors z-10 text-left truncate flex-1"
                  style={{
                    color: isSelected ? '#ffffff' : page.theme,
                  }}
                >
                  {page.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Nút Bật/Tắt Âm Thanh Toàn Cục (Global Mute/Unmute Toggle) */}
      <div className="shrink-0 pr-2 pl-1 flex items-center z-20">
        <button
          id="header-sound-toggle"
          type="button"
          onClick={handleToggleGlobalSound}
          aria-pressed={isSoundEnabled}
          aria-label={isSoundEnabled ? 'Tắt âm thanh giao diện (Mute)' : 'Bật âm thanh giao diện (Unmute)'}
          title={
            isSoundEnabled
              ? 'Âm thanh phản hồi đang BẬT — Nhấp để Tắt (Mute)'
              : 'Âm thanh phản hồi đang TẮT — Nhấp để Bật (Unmute)'
          }
          className={`relative h-[38px] w-[38px] rounded-full border flex items-center justify-center cursor-pointer select-none transition-all duration-200 active:scale-90 hover:scale-105 shrink-0 ${
            isSoundEnabled
              ? isDark
                ? 'bg-slate-900/85 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.28)] hover:border-cyan-300'
                : currentTheme === 'flat-rainbow'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700 hover:bg-emerald-100'
                : 'bg-blue-50/90 border-blue-300/80 text-blue-600 shadow-2xs hover:bg-blue-100/80'
              : isDark
              ? 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-rose-400 hover:border-rose-500/50'
              : 'bg-slate-100/85 border-slate-300/80 text-slate-400 hover:text-rose-500 hover:border-rose-300'
          }`}
        >
          <WebIcon
            name={isSoundEnabled ? 'volume-2' : 'volume-x'}
            className="w-4 h-4 transition-transform duration-200"
          />
          {/* Chấm trạng thái trực quan */}
          <span
            className={`absolute top-1 right-1 w-2 h-2 rounded-full border border-white dark:border-slate-900 transition-colors duration-200 ${
              isSoundEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'
            }`}
          />
        </button>
      </div>
    </header>
  );
};
