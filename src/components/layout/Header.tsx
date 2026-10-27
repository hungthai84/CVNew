'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PageMeta, SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { useLanguage } from '@/context/LanguageContext';

export interface HeaderProps {
  pages: PageMeta[];
  currentPage: number;
  currentTheme?: SiteTheme;
  onSelectPage: (index: number) => void;
  onOpenAiChat?: () => void;
}

// Bảng màu ánh sáng Neon đèn độc bản cho từng mục menu ở giao diện tối Glass Neon
const PAGE_NEON_COLORS: Record<number, { neon: string; glow: string }> = {
  0: { neon: '#38BDF8', glow: 'rgba(56, 189, 248, 0.7)' },   // Trang Chủ: Electric Sky Blue
  1: { neon: '#FB7185', glow: 'rgba(251, 113, 133, 0.7)' },  // Thư Ngỏ: Neon Rose Red
  2: { neon: '#C084FC', glow: 'rgba(192, 132, 252, 0.7)' },  // Giới Thiệu: Neon Violet
  3: { neon: '#FBBF24', glow: 'rgba(251, 191, 36, 0.7)' },   // Lĩnh Vực: Amber Gold Neon
  4: { neon: '#22D3EE', glow: 'rgba(34, 211, 238, 0.7)' },   // Kỹ Năng: Vivid Cyan Neon
  5: { neon: '#818CF8', glow: 'rgba(129, 140, 248, 0.7)' },  // Kinh Nghiệm: Indigo Laser Neon
  6: { neon: '#E879F9', glow: 'rgba(232, 121, 249, 0.7)' },  // Dự Án: Fuchsia Neon
  7: { neon: '#FB923C', glow: 'rgba(251, 146, 60, 0.7)' },   // Hệ Thống: Radiant Orange Neon
  8: { neon: '#F472B6', glow: 'rgba(244, 114, 182, 0.7)' },  // Phỏng Vấn: Hot Pink Neon
  9: { neon: '#F0ABFC', glow: 'rgba(240, 171, 252, 0.7)' },  // Tử Vi: Mystic Purple Neon
  10: { neon: '#4ADE80', glow: 'rgba(74, 222, 128, 0.7)' },  // Kỷ Niệm: Lime Mint Neon
  11: { neon: '#2DD4BF', glow: 'rgba(45, 212, 191, 0.7)' },  // Liên Hệ: Electric Teal Neon
};

export const Header: React.FC<HeaderProps> = ({
  pages,
  currentPage,
  currentTheme = 'light-glass',
  onSelectPage,
}) => {
  const { language } = useLanguage();

  // Xóa icon Hình Nền khỏi thanh menu Header, giữ các mục nội dung chính
  const headerPages = pages.filter((page) => page.shortTitle !== 'Hình Nền');

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
  }, [headerPages.length, longestWidth, language]);

  // Giữ thanh menu Header cố định, không tự động cuộn giật khi chuyển trang từ các nút bên dưới
  // (Người dùng vẫn có thể cuộn ngang tự do bằng con lăn chuột onWheel)

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
      className={`neonav-bar w-[1200px] max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)] mx-auto h-[64px] sm:h-[68px] glass-panel flex items-center justify-between p-[2px] z-40 relative flex-shrink-0 transition-all duration-300 rounded-t-none rounded-b-[20px] border-t-0 border-x border-b ${
        isDark
          ? 'border-2 border-cyan-400/30 bg-slate-950/80 backdrop-blur-xl shadow-[0_16px_45px_-6px_rgba(0,0,0,0.75),0_0_24px_rgba(34,211,238,0.22),inset_0_1px_1px_rgba(255,255,255,0.15)]'
          : 'border-2 border-white/80 dark:border-white/20 shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]'
      } hover:shadow-[0_18px_50px_-6px_rgba(99,102,241,0.25),0_6px_22px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] hover:border-white/95 group/header overflow-hidden`}
    >
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-10" />

      {/* Hidden measurement container to calculate natural width of longest button */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute -top-[9999px] -left-[9999px] pointer-events-none opacity-0 invisible flex flex-nowrap"
      >
        {headerPages.map((page) => {
          const title = language === 'en' && page.shortTitleEn ? page.shortTitleEn : page.shortTitle;
          return (
            <div
              key={`measure-${page.id}`}
              className="neonav-measure-item h-[36px] sm:h-[38px] w-auto min-w-max flex items-center justify-center gap-1.5 px-3 rounded-xl border text-[11px] sm:text-[11.5px] font-bold"
            >
              <div className="w-[24px] h-[24px] shrink-0" />
              <span className="whitespace-nowrap font-bold text-[11px] sm:text-[11.5px] tracking-tight text-left">
                {title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Danh sách Tabs Menu Điều Hướng NeoNav Glass Cố Định */}
      <nav
        ref={navRef}
        id="header-center"
        onWheel={handleWheel}
        className="flex-1 min-w-0 h-full flex items-center justify-center overflow-x-auto no-scrollbar z-10 p-[2px]"
      >
        <div
          ref={containerRef}
          id="header-menu-container"
          className={`flex items-center m-auto py-[2px] flex-nowrap ${
            isOverflowing ? 'neonav-stacked' : 'gap-1 sm:gap-1.5'
          }`}
        >
          {headerPages.map((page, index) => {
            const isHovered = hoveredId === page.id;
            const isSelected = currentPage === page.id;
            const baseZIndex = index + 1;
            // Không tăng z-index khi được chọn để nút không nổi đè lên trên các nút khác
            const itemZIndex = isHovered ? 15 : baseZIndex;

            // Format menu icon và item theo giao diện được chọn (currentTheme)
            let itemBg = page.bgNormal || page.bgLight || `${page.theme}15`;
            let itemBorder = page.borderColor || `${page.theme}45`;
            let itemBoxShadow = '0 1px 2px rgba(0,0,0,0.04)';
            let iconColor = page.theme;
            let iconGlowFilter = 'none';
            let titleColor = page.theme;
            let titleTextShadow = 'none';

            if (currentTheme === 'dark-neon') {
              // Giao diện tối Glass Neon: Mỗi nút menu icon có màu ánh sáng neon đèn riêng biệt độc bản
              const neonData = PAGE_NEON_COLORS[page.id] || { neon: page.theme, glow: `${page.theme}80` };
              iconColor = neonData.neon;
              iconGlowFilter = isHovered || isSelected
                ? `drop-shadow(0 0 5px ${neonData.neon})`
                : `drop-shadow(0 0 3px ${neonData.neon}B3)`;

              // Khi trang được chọn: Màu nền đậm hơn chút nhưng phẳng, không nổi đè nút khác
              itemBg = isSelected
                ? `${neonData.neon}32`
                : isHovered
                ? `${neonData.neon}20`
                : 'rgba(15, 23, 42, 0.85)';
              itemBorder = isSelected
                ? `${neonData.neon}90`
                : isHovered
                ? `${neonData.neon}60`
                : `${neonData.neon}30`;
              itemBoxShadow = '0 1px 3px rgba(0, 0, 0, 0.25)';

              titleColor = iconColor;
              titleTextShadow = isSelected
                ? `0 0 6px ${neonData.neon}`
                : isHovered
                ? `0 0 4px ${neonData.neon}80`
                : 'none';
            } else {
              // default: light-glass (Giao diện sáng kính đa sắc)
              // Khi trang được chọn: Màu nền đậm hơn chút nhưng phẳng, không nổi đè nút khác
              itemBg = isSelected
                ? `${page.theme}26`
                : isHovered
                ? `${page.theme}16`
                : 'rgba(255, 255, 255, 0.75)';
              itemBorder = isSelected
                ? page.theme
                : isHovered
                ? `${page.theme}80`
                : page.borderColor || `${page.theme}35`;
              itemBoxShadow = '0 1px 2px rgba(0,0,0,0.04)';

              titleColor = iconColor;
              titleTextShadow = 'none';
            }

            const pageTitle = language === 'en' && page.shortTitleEn ? page.shortTitleEn : page.shortTitle;
            const pageFullName = language === 'en' && page.fullNameEn ? page.fullNameEn : page.fullName;

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
                className="neonav-item relative h-[36px] sm:h-[38px] flex items-center justify-center px-2 sm:px-2.5 rounded-xl border cursor-pointer select-none transition-colors duration-200 shrink-0 group/navitem overflow-hidden"
                style={{
                  width: `${longestWidth}px`,
                  minWidth: `${longestWidth}px`,
                  maxWidth: `${longestWidth}px`,
                  marginLeft: isOverflowing && index > 0 ? `-${overlapAmount}px` : undefined,
                  zIndex: itemZIndex,
                  transform: 'none',
                  boxShadow: itemBoxShadow,
                  borderColor: itemBorder,
                  background: itemBg,
                }}
                title={pageFullName}
              >
                {/* Khung nhóm icon và tiêu đề được căn giữa hoàn hảo trong nút menu */}
                <div className="flex items-center justify-center gap-1.5 w-full mx-auto overflow-hidden">
                  {/* Icon Menu: Bọc Khung Tròn Kính Mờ backdrop-blur-md Hào Quang Siêu Thực & Hiệu Ứng Nảy Nhẹ */}
                  <div
                    className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden icon-spring-bounce group-hover/navitem:scale-115"
                    style={{
                      background: isDark
                        ? isSelected
                          ? `${iconColor}35`
                          : 'rgba(15, 23, 42, 0.7)'
                        : isSelected
                        ? `${iconColor}22`
                        : 'rgba(255, 255, 255, 0.7)',
                      border: `1px solid ${
                        isSelected
                          ? iconColor
                          : isDark
                          ? 'rgba(255, 255, 255, 0.18)'
                          : 'rgba(255, 255, 255, 0.85)'
                      }`,
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    {/* Vệt sáng gradient siêu thực phản quang khi hover chuột */}
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover/navitem:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 35% 25%, ${iconColor}50 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon vector bên trong */}
                    <span
                      className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] flex items-center justify-center shrink-0 relative z-1 transition-transform duration-300 group-hover/navitem:scale-110"
                      style={{
                        color: iconColor,
                        filter: iconGlowFilter,
                      }}
                    >
                      {page.iconSvg}
                    </span>
                  </div>

                  {/* Tiêu đề ngắn gọn căn giữa cân đối */}
                  <span
                    className="whitespace-nowrap font-bold text-[11px] sm:text-[11.5px] tracking-tight transition-colors duration-200 truncate"
                    style={{
                      color: titleColor,
                      textShadow: titleTextShadow,
                    }}
                  >
                    {pageTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
