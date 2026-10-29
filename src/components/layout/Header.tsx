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
  currentTheme = 'dark-neon',
  onSelectPage,
}) => {
  const { language } = useLanguage();

  // Xóa icon Hình Nền khỏi thanh menu Header, giữ các mục nội dung chính
  const headerPages = pages.filter((page) => page.shortTitle !== 'Hình Nền');

  const isDark = currentTheme === 'dark-neon';

  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureKinhNghiemRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [kinhNghiemWidth, setKinhNghiemWidth] = useState<number>(118);
  const [navWidth, setNavWidth] = useState<number>(1160);

  // Tìm đối tượng trang "Kinh Nghiệm" để làm mẫu đo lường kích thước chuẩn
  const kinhNghiemPage =
    headerPages.find((p) => p.shortTitle === 'Kinh Nghiệm') ||
    headerPages.find((p) => p.id === 6) ||
    headerPages[0];

  // Đo đạc kích thước thực tế của nút Kinh Nghiệm (với nội dung có padding 2px) và độ rộng thanh nav
  useEffect(() => {
    const updateDimensions = () => {
      if (measureKinhNghiemRef.current) {
        const measured = Math.ceil(measureKinhNghiemRef.current.getBoundingClientRect().width);
        if (measured > 30) {
          setKinhNghiemWidth(measured);
        }
      }
      if (navRef.current) {
        setNavWidth(navRef.current.clientWidth);
      }
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      ro = new ResizeObserver(() => {
        updateDimensions();
      });
      ro.observe(navRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, [language, kinhNghiemPage]);

  // Hỗ trợ cuộn ngang bằng con lăn chuột trên thanh menu Header nếu cần
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (navRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        navRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  // Chiều dài các nút bằng chiều dài nút Kinh nghiệm
  const buttonWidth = kinhNghiemWidth || 118;
  const totalItems = headerPages.length;

  // Mặc định các nút xếp chồng sau cho nằm gọn trong header ở mọi kích thước
  const overlapAmount = (() => {
    if (totalItems <= 1) return 0;

    // Chiều rộng khả dụng của khung nav (trừ padding an toàn hai bên)
    const availableWidth = Math.max(260, navWidth - 12);
    const totalRequiredNoOverlap = totalItems * buttonWidth;

    if (totalRequiredNoOverlap <= availableWidth) {
      // Mặc định các nút vẫn có độ xếp chồng nhẹ (16px) tinh tế tạo hiệu ứng card-deck nghệ thuật
      return 16;
    }

    // Khi chiều rộng header nhỏ hơn tổng chiều dài các nút, tính toán chính xác để xếp chồng nằm gọn
    // totalSpan = buttonWidth + (totalItems - 1) * (buttonWidth - overlap) <= availableWidth
    // => step = (availableWidth - buttonWidth) / (totalItems - 1)
    // => overlap = buttonWidth - step
    const step = (availableWidth - buttonWidth) / (totalItems - 1);
    const computedOverlap = Math.ceil(buttonWidth - step);

    // Đảm bảo icon (18px) + padding luôn lộ ra rõ ràng ít nhất 24px
    const maxSafeOverlap = Math.max(16, buttonWidth - 24);
    return Math.max(16, Math.min(maxSafeOverlap, computedOverlap));
  })();

  return (
    <header
      id="app-header"
      className={`neonav-bar w-[1200px] max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)] mx-auto h-[64px] sm:h-[68px] glass-panel flex items-center justify-between p-[2px] z-40 relative flex-shrink-0 transition-all duration-300 rounded-t-none rounded-b-[20px] border-t-0 border-x border-b ${
        isDark
          ? 'border-2 border-cyan-400/30 bg-slate-950/80 backdrop-blur-xl shadow-[0_16px_45px_-6px_rgba(0,0,0,0.75),0_0_24px_rgba(34,211,238,0.22),inset_0_1px_1px_rgba(255,255,255,0.15)]'
          : 'border-2 border-white/80 dark:border-white/20 shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]'
      } hover:shadow-[0_18px_50px_-6px_rgba(99,102,241,0.25),0_6px_22px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] group/header overflow-hidden`}
    >
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-10" />

      {/* Phần tử ẩn đo đạc chiều dài chuẩn xác của nút Kinh Nghiệm với nội dung padding 2px */}
      {kinhNghiemPage && (
        <div
          ref={measureKinhNghiemRef}
          aria-hidden="true"
          className="absolute -top-[9999px] -left-[9999px] invisible pointer-events-none p-[2px] border h-[38px] flex items-center justify-center rounded-xl"
          style={{ width: 'max-content' }}
        >
          <div className="w-full h-full p-[2px] flex flex-row items-center justify-center gap-1.5 whitespace-nowrap">
            <span className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
              {kinhNghiemPage.iconSvg}
            </span>
            <span className="font-play font-bold text-[14px] sm:text-[14.5px]">
              {language === 'en' && kinhNghiemPage.shortTitleEn ? kinhNghiemPage.shortTitleEn : kinhNghiemPage.shortTitle}
            </span>
          </div>
        </div>
      )}

      {/* Danh sách Tabs Menu Điều Hướng NeoNav Glass - Xếp chồng nằm gọn trong header ở mọi kích thước */}
      <nav
        ref={navRef}
        id="header-center"
        onWheel={handleWheel}
        className="flex-1 min-w-0 h-full flex items-center justify-center overflow-x-auto no-scrollbar z-10 px-1 sm:px-2 py-1"
      >
        <div
          ref={containerRef}
          id="header-menu-container"
          className="flex items-center m-auto py-[2px] flex-nowrap justify-center"
        >
          {headerPages.map((page, index) => {
            const isHovered = hoveredId === page.id;
            const isSelected = currentPage === page.id;
            const baseZIndex = index + 1;
            // Nút hover nổi lên đỉnh cao nhất (50), nút đang chọn ở mức (40), nút mặc định theo thứ tự
            const itemZIndex = isHovered ? 50 : isSelected ? 40 : baseZIndex;

            let itemBg = page.bgNormal || page.bgLight || `${page.theme}15`;
            let itemBorder = page.borderColor || `${page.theme}45`;
            let itemBoxShadow = '0 1px 2px rgba(0,0,0,0.04)';
            let iconColor = page.theme;
            let iconGlowFilter = 'none';
            let titleColor = page.theme;
            let titleTextShadow = 'none';

            if (currentTheme === 'dark-neon') {
              const neonData = PAGE_NEON_COLORS[page.id] || { neon: page.theme, glow: `${page.theme}80` };
              iconColor = neonData.neon;
              iconGlowFilter = isHovered || isSelected
                ? `drop-shadow(0 0 5px ${neonData.neon})`
                : `drop-shadow(0 0 3px ${neonData.neon}B3)`;

              itemBg = isSelected
                ? `${neonData.neon}32`
                : isHovered
                ? `${neonData.neon}28`
                : 'rgba(15, 23, 42, 0.88)';
              itemBorder = isSelected
                ? `${neonData.neon}95`
                : isHovered
                ? `${neonData.neon}75`
                : `${neonData.neon}35`;
              itemBoxShadow = isHovered
                ? `0 10px 25px -4px ${neonData.glow}, 0 0 14px ${neonData.neon}`
                : isSelected
                ? `0 4px 16px -2px ${neonData.glow}`
                : '0 2px 4px rgba(0, 0, 0, 0.35)';

              titleColor = iconColor;
              titleTextShadow = isSelected
                ? `0 0 6px ${neonData.neon}`
                : isHovered
                ? `0 0 4px ${neonData.neon}80`
                : 'none';
            } else {
              itemBg = isSelected
                ? `linear-gradient(135deg, #FFFFFF 0%, ${page.bgNormal || `${page.theme}24`} 100%)`
                : isHovered
                ? `linear-gradient(135deg, #FFFFFF 0%, ${page.bgLight || `${page.theme}18`} 100%)`
                : `linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, ${page.bgLight || `${page.theme}12`} 100%)`;
              itemBorder = isSelected
                ? page.theme
                : isHovered
                ? `${page.theme}85`
                : page.borderColor || `${page.theme}45`;
              itemBoxShadow = isHovered
                ? `0 8px 20px -3px ${page.theme}55`
                : isSelected
                ? `0 4px 14px -2px ${page.theme}45`
                : `0 2px 6px -1px ${page.theme}20`;

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
                className="neonav-item relative h-[36px] sm:h-[38px] p-[2px] rounded-xl border cursor-pointer select-none transition-all duration-200 shrink-0 group/navitem flex items-center justify-center backdrop-blur-md"
                style={{
                  ['--nav-item-color' as string]: iconColor,
                  width: `${buttonWidth}px`,
                  minWidth: `${buttonWidth}px`,
                  maxWidth: `${buttonWidth}px`,
                  marginLeft: index === 0 ? 0 : `-${overlapAmount}px`,
                  zIndex: itemZIndex,
                  boxShadow: itemBoxShadow,
                  borderColor: itemBorder,
                  background: itemBg,
                  color: iconColor,
                  transform: isHovered
                    ? 'translateY(-3px) scale(1.05)'
                    : isSelected
                    ? 'translateY(-1px)'
                    : 'none',
                }}
                title={pageFullName}
              >
                {/* Nội dung nút có padding 2px, biểu tượng icon và chữ nằm ngang chuẩn xác */}
                <div className="w-full h-full p-[2px] flex flex-row items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden">
                  <span
                    className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/navitem:scale-115"
                    style={{
                      color: iconColor,
                      filter: iconGlowFilter,
                    }}
                  >
                    {page.iconSvg}
                  </span>

                  <span
                    className={`neonav-item-title truncate font-play tracking-tight transition-colors duration-200 ${
                      isSelected
                        ? 'font-black text-[13.5px] sm:text-[14px]'
                        : 'font-bold text-[13.5px] sm:text-[14px]'
                    }`}
                    style={{
                      color: iconColor,
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
