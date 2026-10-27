'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PAGE_SHOWCASE_ITEMS, PageShowcaseItem } from '@/data/pageShowcaseData';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface Pages3DCarouselProps {
  currentTheme?: string;
  onSelectPage: (pageId: number) => void;
  onClose?: () => void;
}

export const Pages3DCarousel: React.FC<Pages3DCarouselProps> = ({
  currentTheme = 'light-glass',
  onSelectPage,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number>(0);

  const isDark = currentTheme === 'dark-neon';
  const total = PAGE_SHOWCASE_ITEMS.length;
  const currentItem = PAGE_SHOWCASE_ITEMS[currentIndex] || PAGE_SHOWCASE_ITEMS[0];

  const updateIndex = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      SoundEngine.playTap();
      const next = (newIndex + total) % total;
      setCurrentIndex(next);

      setTimeout(() => {
        setIsAnimating(false);
      }, 750);
    },
    [isAnimating, total]
  );

  const handleNext = useCallback(() => {
    updateIndex(currentIndex + 1);
  }, [currentIndex, updateIndex]);

  const handlePrev = useCallback(() => {
    updateIndex(currentIndex - 1);
  }, [currentIndex, updateIndex]);

  // Keyboard navigation (ArrowUp, ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Mouse wheel scroll support with debounce
  const wheelLockRef = useRef<boolean>(false);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) > 25) {
      wheelLockRef.current = true;
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 600);
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Auto-play slideshow support
  useEffect(() => {
    if (!isAutoPlay) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, total]);

  // Helper calculating 3D Cylindrical transformation for each card
  const getCardStyle = (index: number) => {
    const offset = (index - currentIndex + total) % total;

    // Center Active Card
    if (offset === 0) {
      return {
        zIndex: 15,
        transform: 'translateY(0px) scale(1.08) translateZ(0px)',
        opacity: 1,
        filter: 'none',
        pointerEvents: 'auto' as const,
        boxShadow: `0 24px 50px -12px ${currentItem.theme}55, 0 0 25px ${currentItem.theme}33`,
        border: `2px solid ${currentItem.theme}`,
      };
    }

    // Down 1 (First below)
    if (offset === 1) {
      return {
        zIndex: 8,
        transform: 'translateY(135px) scale(0.9) translateZ(-110px)',
        opacity: 0.88,
        filter: 'grayscale(60%)',
        pointerEvents: 'auto' as const,
        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.4)',
      };
    }

    // Down 2 (Second below)
    if (offset === 2) {
      return {
        zIndex: 3,
        transform: 'translateY(250px) scale(0.78) translateZ(-240px)',
        opacity: 0.65,
        filter: 'grayscale(90%)',
        pointerEvents: 'auto' as const,
        boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.25)',
      };
    }

    // Up 1 (First above)
    if (offset === total - 1) {
      return {
        zIndex: 8,
        transform: 'translateY(-135px) scale(0.9) translateZ(-110px)',
        opacity: 0.88,
        filter: 'grayscale(60%)',
        pointerEvents: 'auto' as const,
        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.4)',
      };
    }

    // Up 2 (Second above)
    if (offset === total - 2) {
      return {
        zIndex: 3,
        transform: 'translateY(-250px) scale(0.78) translateZ(-240px)',
        opacity: 0.65,
        filter: 'grayscale(90%)',
        pointerEvents: 'auto' as const,
        boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.25)',
      };
    }

    // Hidden cards
    return {
      zIndex: 0,
      transform: 'translateY(0px) scale(0.5) translateZ(-450px)',
      opacity: 0,
      pointerEvents: 'none' as const,
      filter: 'grayscale(100%)',
    };
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full flex flex-col items-center justify-center font-play select-none relative overflow-hidden py-4 sm:py-6"
    >
      {/* Ambient Radial Mesh Glow theo màu sắc trang đang chọn */}
      <div
        className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-[90px] pointer-events-none opacity-30 transition-all duration-700"
        style={{ background: currentItem.theme }}
      />
      <div
        className="absolute -bottom-32 right-1/4 w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ background: currentItem.theme }}
      />

      {/* Main 2-Column Container (Codepen: .main-container) */}
      <div className="w-full max-w-[1140px] flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 relative z-10">
        
        {/* ========================================================
            CỘT 1: 3D CYLINDRICAL CAROUSEL TRACK (.carousel-section)
            ======================================================== */}
        <div className="w-full lg:w-[480px] h-[360px] sm:h-[440px] flex items-center justify-center relative shrink-0">
          
          {/* Nút Mũi Tên Lên (Floating Navigation Button) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Trang trước"
            title="Trang trước (Phím Mũi Tên Lên)"
            className={`absolute top-2 sm:top-4 z-30 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border shadow-lg transition-all duration-300 cursor-pointer active:scale-90 ${
              isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 border-white/80 shadow-md hover:shadow-xl'
            }`}
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Khung 3D Perspective (.carousel-container) */}
          <div
            className="w-full h-full relative flex items-center justify-center"
            style={{ perspective: 1000 }}
          >
            {/* Track chứa danh sách 14 thẻ 3D (.carousel-track) */}
            <div
              className="w-[320px] sm:w-[380px] h-[190px] sm:h-[220px] relative flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {PAGE_SHOWCASE_ITEMS.map((item, idx) => {
                const isCenter = idx === currentIndex;
                const cardStyle = getCardStyle(idx);

                return (
                  <div
                    key={item.pageId}
                    onClick={() => updateIndex(idx)}
                    style={cardStyle}
                    className="absolute inset-0 w-full h-full rounded-[14px] overflow-hidden cursor-pointer backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group"
                  >
                    {/* Hình Ảnh Nền Minh Họa Của Trang */}
                    <img
                      src={item.image}
                      alt={item.shortTitle}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Lớp Phủ Chuyển Sắc Đa Tầng Làm Nổi Bật Chữ */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isCenter ? 'opacity-85' : 'opacity-92'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 41, 59, 0.72) 40%, ${item.theme}99 100%)`,
                      }}
                    />

                    {/* Mặt Thẻ: Thông Tin Tóm Tắt Trang */}
                    <div className="relative z-10 w-full h-full p-4 sm:p-5 flex flex-col justify-between text-white text-left">
                      {/* Hàng Đầu: Huy Hiệu Số Trang & Icon Nhận Diện */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-[10px] flex items-center justify-center shadow-md font-mono font-black text-xs sm:text-sm text-white"
                            style={{ background: item.theme }}
                          >
                            {item.pageNumber}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-mono uppercase tracking-wider backdrop-blur-md bg-white/15 border border-white/20 text-white shadow-xs">
                            {item.badge}
                          </span>
                        </div>

                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-xs"
                          style={{ color: '#ffffff' }}
                        >
                          <WebIcon name={item.iconName} className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Hàng Dưới: Tiêu Đề Trang & Phân Loại */}
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-cyan-200/90 font-bold block mb-0.5">
                          {item.category}
                        </span>
                        <h4 className="text-base sm:text-lg font-black font-play text-white drop-shadow-md truncate leading-tight">
                          {item.shortTitle}
                        </h4>
                        <p className="text-[11px] text-slate-200/80 truncate mt-0.5 font-medium">
                          {item.fullName}
                        </p>
                      </div>

                      {/* Huy Hiệu Active Khi Thẻ Ở Giữa */}
                      {isCenter && (
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[9.5px] font-mono font-bold shadow-sm animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>Đang chọn</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nút Mũi Tên Xuống (Floating Navigation Button) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Trang tiếp theo"
            title="Trang tiếp theo (Phím Mũi Tên Xuống)"
            className={`absolute bottom-2 sm:bottom-4 z-30 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border shadow-lg transition-all duration-300 cursor-pointer active:scale-90 ${
              isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 border-white/80 shadow-md hover:shadow-xl'
            }`}
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* ========================================================
            CỘT 2: KHỐI THÔNG TIN CHI TIẾT & ĐIỀU KHIỂN (.controls-section)
            ======================================================== */}
        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 px-2">
          
          {/* Top Bar: Bộ Phím Điều Hướng & Nút Trình Chiếu Tự Động */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border-white/10'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                }`}
                title="Lên trên (Phím Mũi Tên Lên)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border-white/10'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                }`}
                title="Xuống dưới (Phím Mũi Tên Xuống)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Nút Bật/Tắt Tự Xoay Carousel */}
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setIsAutoPlay((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-play flex items-center gap-1.5 transition-all border cursor-pointer ${
                isAutoPlay
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs'
                  : isDark
                  ? 'bg-slate-800/60 text-slate-400 border-white/10 hover:text-white'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isAutoPlay ? 'Đang Tự Xoay (4.5s)' : 'Tự Động Xoay'}</span>
            </button>
          </div>

          {/* Thông Tin Trang (.member-info theo Codepen) */}
          <div className="w-full space-y-3">
            {/* Hàng Huy Hiệu & Mã Số Trang */}
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-black text-white shadow-xs"
                style={{ background: currentItem.theme }}
              >
                TRANG {currentItem.pageNumber} / 14
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                isDark
                  ? 'bg-white/10 text-cyan-200 border-white/15'
                  : 'bg-slate-100 text-slate-700 border-slate-200/90'
              }`}>
                {currentItem.badge}
              </span>
            </div>

            {/* Tiêu Đề Chính Của Trang Kèm 2 Vạch Trang Trí Nghệ Thuật (member-name) */}
            <div className="relative inline-block py-1">
              <h2
                className="text-2xl sm:text-3xl font-black font-play tracking-tight leading-tight transition-colors duration-300"
                style={{ color: isDark ? '#ffffff' : currentItem.theme }}
              >
                {currentItem.shortTitle}
              </h2>
              {/* Vạch kẻ trang trí đồng màu như Codepen */}
              <div
                className="h-[3px] w-24 mx-auto lg:mx-0 rounded-full mt-2 transition-all duration-500"
                style={{ background: currentItem.theme }}
              />
            </div>

            {/* Phân Loại Trang (member-role) */}
            <p
              className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase opacity-90"
              style={{ color: currentItem.theme }}
            >
              {currentItem.category}
            </p>

            {/* Đoạn Văn Giới Thiệu Tổng Quan Về Trang */}
            <p className={`text-xs sm:text-[13.5px] leading-relaxed font-medium max-w-xl ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {currentItem.description}
            </p>

            {/* Danh Sách Điểm Nổi Bật Của Trang (Key Highlights Grid) */}
            <div className="space-y-2 pt-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: currentItem.theme }} />
                <span className={`text-xs font-black font-play uppercase tracking-wider ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  Các Điểm Nổi Bật Cốt Lõi:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {currentItem.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-[12px] border text-xs leading-snug flex items-start gap-2 transition-all ${
                      isDark
                        ? 'bg-slate-900/60 border-white/10 text-slate-200 hover:border-cyan-400/30'
                        : 'bg-white/85 border-slate-200/80 text-slate-800 shadow-2xs hover:border-indigo-200'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${currentItem.theme}25`, color: currentItem.theme }}
                    >
                      <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-semibold text-[11.5px] leading-relaxed">
                      {hl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button: Khám Phá Trang Ngay */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  onSelectPage(currentItem.pageId);
                  if (onClose) onClose();
                }}
                className="px-6 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm font-play flex items-center gap-2 shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                style={{
                  background: currentItem.accentBg,
                  boxShadow: `0 8px 24px -4px ${currentItem.theme}66`,
                }}
              >
                <span>Mở Xem Trang {currentItem.shortTitle}</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dãy Chấm Điều Hướng 14 Trang (.dots theo Codepen) */}
          <div className="w-full flex items-center justify-center lg:justify-start gap-2 pt-2 flex-wrap">
            {PAGE_SHOWCASE_ITEMS.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.pageId}
                  type="button"
                  onClick={() => updateIndex(idx)}
                  aria-label={`Chuyển đến trang ${item.shortTitle}`}
                  title={`${item.pageNumber}. ${item.shortTitle}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 h-2.5 sm:w-8 sm:h-3 shadow-md'
                      : 'w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-40 hover:opacity-80'
                  }`}
                  style={{
                    background: isActive
                      ? item.theme
                      : isDark
                      ? '#64748b'
                      : '#cbd5e1',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
