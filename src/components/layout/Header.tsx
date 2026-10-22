'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PageMeta, SiteTheme } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();

  // Xóa icon Hình Nền khỏi thanh menu Header, giữ các mục nội dung chính
  const headerPages = pages.filter((page) => page.id !== 13);

  const isDark = currentTheme === 'dark-neon';

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
  }, [headerPages.length, longestWidth, t]);

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
      className="neonav-bar w-[1200px] max-w-[calc(100%-40px)] mx-auto h-[64px] sm:h-[68px] glass-panel rounded-b-[20px] rounded-t-none flex items-center justify-center p-[2px] z-40 relative flex-shrink-0 transition-all duration-300 shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_45px_-6px_rgba(0,0,0,0.65),0_0_24px_rgba(99,102,241,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)] border-b-2 border-x border-white/80 dark:border-white/20 hover:shadow-[0_18px_50px_-6px_rgba(99,102,241,0.25),0_6px_22px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] hover:border-white/95 group/header overflow-hidden"
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
        {headerPages.map((page) => {
          const displayTitle = t.pages[page.id]?.shortTitle || page.shortTitle;
          return (
            <div
              key={`measure-${page.id}`}
              className="neonav-measure-item h-[38px] w-auto min-w-max flex items-center justify-start gap-1.5 pl-1.5 pr-3 rounded-full border text-[11px] sm:text-[11.5px] font-bold"
            >
              <div className="w-7 h-7 rounded-full shrink-0" />
              <span className="whitespace-nowrap font-bold text-[11px] sm:text-[11.5px] tracking-tight text-left">
                {displayTitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Danh sách Tabs Menu Điều Hướng NeoNav Glass */}
      <nav
        ref={navRef}
        id="header-center"
        onWheel={handleWheel}
        className="w-full h-full flex items-center overflow-x-auto no-scrollbar p-[1px] z-10"
        style={{ padding: '1px' }}
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
            // Hiệu ứng xếp chồng: nút trước nằm dưới nút kia (z-index tăng dần từ trái qua phải)
            const baseZIndex = index + 1;
            const itemZIndex = isHovered ? 50 : isSelected ? 35 : baseZIndex;

            return (
              <button
                key={page.id}
                id={`nav-item-${page.id}`}
                type="button"
                onClick={() => onSelectPage(page.id)}
                onMouseEnter={() => setHoveredId(page.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`neonav-item relative h-[38px] flex items-center justify-start gap-1.5 pl-1.5 pr-2.5 rounded-full border cursor-pointer select-none transition-all duration-200 shrink-0 ${
                  isSelected ? 'active' : ''
                }`}
                style={{
                  width: `${longestWidth}px`,
                  minWidth: `${longestWidth}px`,
                  maxWidth: `${longestWidth}px`,
                  marginLeft: isOverflowing && index > 0 ? `-${overlapAmount}px` : undefined,
                  zIndex: itemZIndex,
                  transform: 'none',
                  ...(isSelected
                    ? {
                        background:
                          currentTheme === 'dark-neon'
                            ? page.theme
                            : currentTheme === 'light-glass-multicolor'
                            ? `linear-gradient(135deg, ${page.theme} 0%, ${page.theme}ee 100%)`
                            : page.theme,
                        borderColor: '#ffffff',
                        color: '#ffffff',
                        boxShadow: isOverflowing
                          ? `-3px 0 10px rgba(0, 0, 0, 0.22), 0 3px 12px -1px ${page.theme}75, inset 0 1px 1.5px rgba(255, 255, 255, 0.85)`
                          : `0 3px 12px -1px ${page.theme}75, inset 0 1px 1.5px rgba(255, 255, 255, 0.85)`,
                      }
                    : {
                        borderColor: isDark
                          ? `${page.theme}60`
                          : currentTheme === 'light-glass-multicolor'
                          ? 'rgba(255, 255, 255, 0.92)'
                          : page.borderColor || `${page.theme}45`,
                        background: isDark
                          ? 'rgba(15, 23, 42, 0.78)'
                          : currentTheme === 'light-glass-multicolor'
                          ? 'rgba(255, 255, 255, 0.78)'
                          : page.bgNormal || page.bgLight || `${page.theme}15`,
                        color: isDark ? '#f1f5f9' : page.theme,
                        boxShadow: isOverflowing
                          ? '-2px 0 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.45)'
                          : undefined,
                      }),
                }}
                title={t.pages[page.id]?.fullName || page.fullName}
              >
                {/* NeoNav Circular Icon Container */}
                <div
                  className="neonav-icon-box w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-inner transition-transform duration-200"
                  style={{
                    background: isSelected
                      ? 'rgba(255, 255, 255, 0.28)'
                      : isDark
                      ? 'rgba(15, 23, 42, 0.9)'
                      : page.bgLight,
                    color: isSelected ? '#ffffff' : page.theme,
                    border: isSelected
                      ? '1px solid rgba(255, 255, 255, 0.4)'
                      : isDark
                      ? `1px solid ${page.theme}40`
                      : '1px solid rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <span className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    {page.iconSvg}
                  </span>
                </div>

                {/* Tiêu đề ngắn gọn căn lề trái */}
                <span
                  className="whitespace-nowrap font-bold text-[11px] sm:text-[11.5px] tracking-tight transition-colors z-10 text-left truncate flex-1"
                  style={{
                    color: isSelected ? '#ffffff' : isDark ? '#f1f5f9' : page.theme,
                  }}
                >
                  {t.pages[page.id]?.shortTitle || page.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
