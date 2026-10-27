'use client';

import React from 'react';
import { PAGE_SHOWCASE_ITEMS } from '@/data/pageShowcaseData';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { cn } from '@/lib/utils';

export interface HomePages3DCarouselLeftProps {
  isDark?: boolean;
  onNavigatePage?: (pageId: number) => void;
  onOpenPagesCarousel?: () => void;
}

export const HomePages3DCarouselLeft: React.FC<HomePages3DCarouselLeftProps> = ({
  isDark = false,
  onNavigatePage,
  onOpenPagesCarousel,
}) => {
  // Trang 01: Executive Hub - Tổng Quan & Điều Hành (Trang Chủ)
  const currentItem = PAGE_SHOWCASE_ITEMS[0];

  const handleClick = () => {
    SoundEngine.playTap();
    if (onOpenPagesCarousel) {
      onOpenPagesCarousel();
    } else if (onNavigatePage) {
      onNavigatePage(currentItem.pageId);
    }
  };

  return (
    <div className="relative pointer-events-auto select-none">
      {/* Khối Thẻ Duy Nhất: 01 EXECUTIVE HUB TỔNG QUAN & ĐIỀU HÀNH Trang Chủ */}
      <div
        onClick={handleClick}
        className={cn(
          'relative w-[270px] sm:w-[295px] md:w-[315px] h-[140px] sm:h-[150px]',
          'rounded-[14px] overflow-hidden cursor-pointer backdrop-blur-xl',
          'transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group',
          isDark
            ? 'border-2 border-white/20 shadow-[0_16px_36px_-10px_rgba(2,132,199,0.5),0_0_20px_rgba(2,132,199,0.25)]'
            : 'border-2 border-white/80 shadow-[0_16px_36px_-10px_rgba(2,132,199,0.35),0_4px_12px_rgba(0,0,0,0.1)]'
        )}
        style={{
          borderColor: currentItem.theme,
          boxShadow: `0 16px 36px -10px ${currentItem.theme}66, 0 0 20px ${currentItem.theme}33`,
        }}
        title={`Bấm để mở danh mục 14 trang (${currentItem.fullName})`}
      >
        {/* Hình Ảnh Nền Minh Họa Của Trang */}
        <img
          src={currentItem.image}
          alt={currentItem.shortTitle}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Lớp Phủ Chuyển Sắc Làm Nổi Bật Chữ */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-85 group-hover:opacity-90"
          style={{
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.75) 45%, ${currentItem.theme}aa 100%)`,
          }}
        />

        {/* Nội Dung Mặt Thẻ: 01 EXECUTIVE HUB TỔNG QUAN & ĐIỀU HÀNH Trang Chủ */}
        <div className="relative z-10 w-full h-full p-3 sm:p-3.5 flex flex-col justify-between text-white text-left">
          {/* Top Row: Số Trang & Badge & Icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="w-6 h-6 rounded-[6px] flex items-center justify-center shadow-xs font-mono font-black text-[11px] text-white"
                style={{ background: currentItem.theme }}
              >
                {currentItem.pageNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider backdrop-blur-md bg-white/20 border border-white/25 text-white">
                {currentItem.badge}
              </span>
            </div>

            <span className="w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-2xs">
              <WebIcon name={currentItem.iconName} className="w-3 h-3" />
            </span>
          </div>

          {/* Bottom Row: Tiêu Đề & Phân Loại */}
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-200 font-bold block">
              {currentItem.category}
            </span>
            <h4 className="text-[13.5px] sm:text-[15px] font-black font-play text-white drop-shadow-md truncate leading-tight">
              {currentItem.shortTitle}
            </h4>
            <p className="text-[10px] text-slate-200/90 truncate font-medium">
              {currentItem.fullName}
            </p>
          </div>

          {/* Active Tag */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[8.5px] font-mono font-bold shadow-xs group-hover:bg-emerald-400 transition-colors">
            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span>Khám phá ↵</span>
          </div>
        </div>
      </div>
    </div>
  );
};
