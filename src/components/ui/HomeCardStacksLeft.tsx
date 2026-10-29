'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { PAGE_SHOWCASE_ITEMS, PageShowcaseItem } from '@/data/pageShowcaseData';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { SiteTheme } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
} from 'lucide-react';

export interface HomeCardStacksLeftProps {
  currentTheme?: SiteTheme;
  onNavigatePage?: (pageId: number) => void;
  onOpenPagesCarousel?: () => void;
}

// 4 Nhóm chuyên mục thẻ lọc nhanh (tuân thủ Rule 8: 4 từ, Sentence case, không dùng ký tự &)
export type ShowcaseCategoryFilter = 'all' | 'profile' | 'systems' | 'interactive';

export interface CategoryTabItem {
  id: ShowcaseCategoryFilter;
  title: string;
  count: number;
  pageIds: number[];
}

export const CATEGORY_TABS: CategoryTabItem[] = [
  {
    id: 'all',
    title: 'Tất cả chuyên mục',
    count: 13,
    pageIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'profile',
    title: 'Hồ sơ năng lực',
    count: 5,
    pageIds: [1, 2, 3, 4, 5],
  },
  {
    id: 'systems',
    title: 'Hệ thống dự án',
    count: 5,
    pageIds: [6, 7, 8, 9, 10],
  },
  {
    id: 'interactive',
    title: 'Tương tác kết nối',
    count: 3,
    pageIds: [0, 11, 12],
  },
];

// Chuẩn hóa tiêu đề thẻ đúng 4 từ, Sentence case, không dùng ký tự & theo quy tắc AGENTS.md
const formatFourWordTitle = (pageId: number, fallback: string): string => {
  switch (pageId) {
    case 0:
      return 'Trang chủ tổng quan';
    case 1:
      return 'Thư ngỏ đối tác';
    case 2:
      return 'Hồ sơ chuyên gia';
    case 3:
      return 'Lĩnh vực hoạt động';
    case 4:
      return 'Kỹ năng quản trị';
    case 5:
      return 'Kinh nghiệm thực chiến';
    case 6:
      return 'Dự án tiêu biểu';
    case 7:
      return 'Hệ thống vận hành';
    case 8:
      return 'Phỏng vấn chuyên sâu';
    case 9:
      return 'Tử vi phong thủy';
    case 10:
      return 'Kỷ niệm hành trình';
    case 11:
      return 'Liên hệ hợp tác';
    case 12:
      return 'Hình nền cá nhân';
    default:
      return fallback;
  }
};

const AUTOSWAP_DURATION_MS = 6500; // 6.5s đếm ngược tự động đổi thẻ
const PROGRESS_TICK_MS = 50;

export const HomeCardStacksLeft: React.FC<HomeCardStacksLeftProps> = ({
  currentTheme = 'light-glass',
  onNavigatePage,
  onOpenPagesCarousel,
}) => {
  const isDark = currentTheme === 'dark-neon';

  // 1. Quản lý Bộ Lọc Theo Nhóm Chuyên Mục (Category Filter Tabs)
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategoryFilter>('all');

  // Lọc danh sách thẻ gốc theo chuyên mục được chọn
  const baseItems = useMemo(() => {
    const activeTab = CATEGORY_TABS.find((t) => t.id === selectedCategory) || CATEGORY_TABS[0];
    return PAGE_SHOWCASE_ITEMS.filter((item) => activeTab.pageIds.includes(item.pageId));
  }, [selectedCategory]);

  // Quản lý thứ tự hiển thị của các thẻ trong xấp (Stack Order)
  const [stackItems, setStackItems] = useState<PageShowcaseItem[]>(() => [...baseItems]);

  // Khi người dùng chọn chuyên mục khác, đồng bộ lại danh sách và phát âm thanh lật bài
  useEffect(() => {
    setStackItems([...baseItems]);
    setProgressMs(0);
  }, [baseItems]);

  // Trạng thái đang thực hiện hiệu ứng bay và trượt xuống đáy (Swap Animation)
  const [swappingCardId, setSwappingCardId] = useState<number | null>(null);

  // 2. Tự Động Đổi Thẻ & Vòng Tròn Tiến Trình Neon (Mặc định tắt auto-change theo yêu cầu)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progressMs, setProgressMs] = useState<number>(0);

  // 3. Hiệu Ứng Kéo Vuốt Cảm Ứng (Touch & Pointer Swipe Card Gesture)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredDragActionRef = useRef<boolean>(false);

  // Hàm hoán đổi thẻ trên cùng xuống đáy stack (CodePen Swap Effect) kèm âm thanh xào bài cổ điển
  const handleSwap = useCallback(() => {
    if (swappingCardId !== null || stackItems.length <= 1) return;

    const topCard = stackItems[0];
    setSwappingCardId(topCard.pageId);
    setProgressMs(0);

    // Phát âm thanh lật thẻ giấy / xào bài cổ điển chân thực
    SoundEngine.playPaperDeckShuffle();

    // Thời gian animation trùng khớp với CodePen (680ms)
    setTimeout(() => {
      setStackItems((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setSwappingCardId(null);
    }, 680);
  }, [swappingCardId, stackItems]);

  // Lùi lại thẻ trước đó (Prev Card)
  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (swappingCardId !== null || stackItems.length <= 1) return;
      setProgressMs(0);
      SoundEngine.playPaperDeckShuffle();
      setStackItems((prev) => {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      });
    },
    [swappingCardId, stackItems.length]
  );

  // Đổi bộ lọc chuyên mục kèm âm thanh
  const handleSelectCategory = (catId: ShowcaseCategoryFilter) => {
    if (catId === selectedCategory) return;
    SoundEngine.playPaperDeckShuffle();
    setSelectedCategory(catId);
  };

  // Điều hướng trực tiếp tới trang của thẻ đang hiển thị
  const handleGoToPage = (pageId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEngine.playTap();
    if (onNavigatePage) {
      onNavigatePage(pageId);
    }
  };

  // Vòng lặp đếm ngược tiến trình tự động đổi thẻ (6.5s)
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDragging || swappingCardId !== null) {
      return;
    }

    const timer = setInterval(() => {
      setProgressMs((prev) => {
        const next = prev + PROGRESS_TICK_MS;
        if (next >= AUTOSWAP_DURATION_MS) {
          handleSwap();
          return 0;
        }
        return next;
      });
    }, PROGRESS_TICK_MS);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, isDragging, swappingCardId, handleSwap]);

  // =========================================================================
  // XỬ LÝ KÉO VUỐT CẢM ỨNG (TOUCH / POINTER SWIPE GESTURES)
  // =========================================================================
  const handleTouchStart = (e: React.TouchEvent) => {
    if (swappingCardId !== null || stackItems.length <= 1) return;
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    hasTriggeredDragActionRef.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStartRef.current || hasTriggeredDragActionRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleTouchEnd = () => {
    if (!dragStartRef.current) return;
    const { x: dx, y: dy } = dragOffset;

    // Ngưỡng vuốt: Vuốt lên (-55px) hoặc vuốt ngang lệch lớn (>65px) => Hoán đổi (Swap)
    if (dy < -55 || Math.abs(dx) > 70) {
      hasTriggeredDragActionRef.current = true;
      handleSwap();
    }
    // Vuốt xuống dưới (+60px) => Lùi về thẻ trước (Prev)
    else if (dy > 60) {
      hasTriggeredDragActionRef.current = true;
      handlePrev();
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    dragStartRef.current = null;
  };

  // Hỗ trợ thêm chuột rê kéo (Pointer drag) cho máy tính bàn
  const handlePointerDown = (e: React.PointerEvent) => {
    if (swappingCardId !== null || stackItems.length <= 1 || e.button !== 0) return;
    // Bỏ qua nếu bấm vào nút con bên trong
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    dragStartRef.current = { x: e.clientX, y: e.clientY };
    hasTriggeredDragActionRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current || hasTriggeredDragActionRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = () => {
    if (!dragStartRef.current) return;
    const { x: dx, y: dy } = dragOffset;

    if (dy < -55 || Math.abs(dx) > 70) {
      hasTriggeredDragActionRef.current = true;
      handleSwap();
    } else if (dy > 60) {
      hasTriggeredDragActionRef.current = true;
      handlePrev();
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    dragStartRef.current = null;
  };

  // Tính toán phần trăm tiến trình đếm ngược (0 -> 100%)
  const progressPct = Math.min(100, Math.max(0, (progressMs / AUTOSWAP_DURATION_MS) * 100));

  // Vòng tròn SVG: r = 13, chu vi = 2 * PI * 13 ≈ 81.68
  const ringRadius = 13;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - progressPct / 100);

  // Chỉ lấy 4 thẻ đầu tiên để render hiển thị xếp lớp trong stack
  const visibleCards = stackItems.slice(0, 4);
  const topCard = stackItems[0];

  return (
    <div
      className="relative pointer-events-auto select-none flex flex-col items-start gap-2.5 font-play"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CSS Keyframes mô phỏng chính xác hiệu ứng Swap từ CodePen Card Stacks */}
      <style jsx>{`
        @keyframes cardStackSwapKeyframe {
          0% {
            transform: translate(-50%, calc(-50% + 15px)) scale(1.05) rotate(0deg);
            opacity: 1;
          }
          45% {
            transform: translate(-50%, calc(-50% - 170px)) scale(0.88) rotate(-7deg);
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
            opacity: 0.95;
          }
          85% {
            transform: translate(-50%, calc(-50% - 32px)) scale(0.85) rotate(0deg);
            z-index: 1;
            opacity: 0.75;
          }
          100% {
            transform: translate(-50%, calc(-50% - 30px)) scale(0.9);
            z-index: 0;
            opacity: 0.7;
          }
        }
        .animate-card-stack-swap {
          animation: cardStackSwapKeyframe 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
          pointer-events: none;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. BỘ LỌC THẺ THEO NHÓM CHUYÊN MỤC (ẨN THEO YÊU CẦU GIAO DIỆN)             */}
      {/* ========================================================================= */}
      <div className="hidden items-center gap-1 overflow-x-auto no-scrollbar w-full max-w-[340px] sm:max-w-[370px] md:max-w-[390px] pb-0.5 px-0.5">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectCategory(tab.id)}
              className={`px-2 py-1 rounded-xl text-[10.5px] font-bold font-play shrink-0 transition-all duration-200 border cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] scale-102'
                  : isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/10'
                    : 'bg-white/85 hover:bg-white text-slate-700 border-slate-200/90 shadow-2xs'
              }`}
              title={`Lọc xem nhóm: ${tab.title} (${tab.count} trang)`}
            >
              <span>{tab.title}</span>
              <span
                className={`text-[9px] font-mono px-1 py-0.2 rounded-full font-extrabold ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : isDark
                      ? 'bg-slate-800 text-cyan-300'
                      : 'bg-blue-100 text-blue-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP CONTROLLER BAR: TIÊU ĐỀ & NÚT TIẾN TRÌNH TỰ ĐỘNG ĐỔI THẺ            */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-end w-full max-w-[340px] sm:max-w-[370px] md:max-w-[390px] px-1">
        {/* Khối Tất cả chuyên mục (Ẩn theo yêu cầu giao diện) */}
        <div className="hidden items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Layers className="w-3 h-3" />
          </div>
          <span className="text-xs font-black font-play text-slate-900 dark:text-white drop-shadow-xs">
            {CATEGORY_TABS.find((t) => t.id === selectedCategory)?.title || 'Danh mục 14 trang'}
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-300/60 dark:border-blue-800/60">
            {topCard?.pageNumber}/{baseItems.length}
          </span>
        </div>

        {/* Nút Prev / Next mini & Vòng tròn tiến trình Neon đếm ngược 6.5s */}
        <div className="flex items-center gap-1">
          {/* Nút bật / tạm dừng Auto-swap */}
          <button
            type="button"
            onClick={() => {
              SoundEngine.playTap();
              setIsAutoPlay((prev) => !prev);
            }}
            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer text-xs ${
              isAutoPlay
                ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-300 dark:border-cyan-800 text-cyan-600 dark:text-cyan-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={isAutoPlay ? 'Tạm dừng đếm ngược 6.5s tự đổi thẻ' : 'Bật tự động đổi thẻ (6.5s)'}
          >
            {isAutoPlay ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="w-6 h-6 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shadow-xs transition active:scale-95 cursor-pointer text-xs"
            title="Xem thẻ trước (hoặc vuốt xuống)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Nút Đổi Thẻ Kèm Vòng Tròn Neon Siêu Mảnh (Auto-Swap Progress Ring) */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            {/* SVG Vòng tròn tiến trình đếm ngược 6.5s */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 32 32">
              {/* Vòng nền mờ */}
              <circle
                cx="16"
                cy="16"
                r={ringRadius}
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                className="text-slate-200 dark:text-slate-800"
              />
              {/* Vòng tiến trình Neon phát sáng */}
              {isAutoPlay && (
                <circle
                  cx="16"
                  cy="16"
                  r={ringRadius}
                  stroke="currentColor"
                  strokeWidth="2.2"
                  fill="none"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  className="text-cyan-500 dark:text-cyan-400 transition-all duration-75 drop-shadow-[0_0_5px_rgba(6,182,212,0.9)]"
                />
              )}
            </svg>

            <button
              type="button"
              onClick={handleSwap}
              className="w-5.5 h-5.5 rounded-full bg-white dark:bg-slate-900 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-xs transition active:scale-90 cursor-pointer text-xs z-10"
              title="Đổi thẻ tiếp theo (6.5s hoặc vuốt lên)"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN STACK CONTAINER: BỐ CỤC XẾP LỚP & KÉO VUỐT CẢM ỨNG (TOUCH SWIPE) */}
      {/* ========================================================================= */}
      <div
        className="relative w-[320px] sm:w-[350px] md:w-[375px] h-[330px] sm:h-[350px] mt-1 overflow-visible touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Render ngược thứ tự mảng để thẻ thứ 0 nằm trên cùng (z-index cao nhất) */}
        {[...visibleCards].reverse().map((item) => {
          const depthIndex = stackItems.findIndex((si) => si.pageId === item.pageId);
          const isTop = depthIndex === 0;
          const isSwapping = swappingCardId === item.pageId;

          // Tính toán vị trí --y và scale theo chuẩn CodePen
          let translateY = '-50%';
          let scale = 0.9;
          let zIndex = 1;
          let opacity = 0.65;
          let shadow = '0 2px 8px rgba(0,0,0,0.06)';
          let rotation = 0;

          if (depthIndex === 0) {
            translateY = 'calc(-50% + 15px)';
            scale = 1.05;
            zIndex = 10;
            opacity = 1;
            shadow = isDark
              ? `0 16px 36px -6px ${item.theme}55, 0 8px 18px rgba(0,0,0,0.5)`
              : `0 16px 36px -6px ${item.theme}40, 0 8px 20px rgba(0,0,0,0.12)`;

            // Nếu đang kéo vuốt (Touch/Drag Swipe), dịch chuyển thẻ theo tay người dùng
            if (isDragging && !isSwapping) {
              rotation = dragOffset.x * 0.06;
              scale = 1.05 - Math.min(0.06, Math.abs(dragOffset.y) / 800);
            }
          } else if (depthIndex === 1) {
            translateY = 'calc(-50%)';
            scale = 1.0;
            zIndex = 8;
            opacity = 0.92;
            shadow = '0 10px 24px rgba(0,0,0,0.12)';
          } else if (depthIndex === 2) {
            translateY = 'calc(-50% - 15px)';
            scale = 0.95;
            zIndex = 6;
            opacity = 0.82;
            shadow = '0 6px 16px rgba(0,0,0,0.08)';
          } else {
            translateY = 'calc(-50% - 30px)';
            scale = 0.9;
            zIndex = 4;
            opacity = 0.7;
          }

          const fourWordTitle = formatFourWordTitle(item.pageId, item.shortTitle);

          // Tạo chuỗi transform động
          let transformStyle = `translate(-50%, ${translateY}) scale(${scale})`;
          if (isTop && isDragging && !isSwapping) {
            transformStyle = `translate(calc(-50% + ${dragOffset.x * 0.75}px), calc(-50% + 15px + ${dragOffset.y * 0.85}px)) scale(${scale}) rotate(${rotation}deg)`;
          }

          const CARD_COLOR_PALETTES = [
            {
              lightBg: 'linear-gradient(135deg, rgba(239, 246, 255, 0.96) 0%, rgba(219, 234, 254, 0.92) 55%, rgba(191, 219, 254, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.78) 60%, rgba(29, 78, 216, 0.45) 100%)',
              accentGlow: 'rgba(59, 130, 246, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(245, 243, 255, 0.96) 0%, rgba(237, 233, 254, 0.92) 55%, rgba(221, 214, 254, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(76, 29, 149, 0.78) 60%, rgba(124, 58, 237, 0.45) 100%)',
              accentGlow: 'rgba(139, 92, 246, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(236, 253, 245, 0.96) 0%, rgba(209, 250, 229, 0.92) 55%, rgba(167, 243, 208, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 78, 59, 0.78) 60%, rgba(16, 185, 129, 0.45) 100%)',
              accentGlow: 'rgba(16, 185, 129, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(255, 251, 235, 0.96) 0%, rgba(254, 243, 199, 0.92) 55%, rgba(253, 230, 138, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(120, 53, 15, 0.78) 60%, rgba(245, 158, 11, 0.45) 100%)',
              accentGlow: 'rgba(245, 158, 11, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(255, 241, 242, 0.96) 0%, rgba(255, 228, 230, 0.92) 55%, rgba(254, 205, 211, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(136, 19, 55, 0.78) 60%, rgba(244, 63, 94, 0.45) 100%)',
              accentGlow: 'rgba(244, 63, 94, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(236, 254, 255, 0.96) 0%, rgba(207, 250, 254, 0.92) 55%, rgba(165, 243, 252, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(22, 78, 99, 0.78) 60%, rgba(6, 182, 212, 0.45) 100%)',
              accentGlow: 'rgba(6, 182, 212, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(253, 242, 248, 0.96) 0%, rgba(252, 231, 243, 0.92) 55%, rgba(249, 168, 212, 0.82) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(131, 24, 67, 0.78) 60%, rgba(236, 72, 153, 0.45) 100%)',
              accentGlow: 'rgba(236, 72, 153, 0.28)',
            },
            {
              lightBg: 'linear-gradient(135deg, rgba(238, 242, 255, 0.96) 0%, rgba(224, 231, 255, 0.92) 55%, rgba(199, 210, 254, 0.88) 100%)',
              darkBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(49, 46, 129, 0.78) 60%, rgba(99, 102, 241, 0.45) 100%)',
              accentGlow: 'rgba(99, 102, 241, 0.28)',
            },
          ];
          const paletteIndex = Math.abs(item.pageId) % CARD_COLOR_PALETTES.length;
          const cardPalette = CARD_COLOR_PALETTES[paletteIndex];

          return (
            <div
              key={item.pageId}
              onClick={isTop && !isDragging ? handleSwap : undefined}
              className={`absolute top-1/2 left-1/2 w-[92%] h-[270px] sm:h-[285px] rounded-[22px] overflow-hidden backdrop-blur-2xl border ${
                isDragging && isTop ? 'cursor-grabbing transition-none' : 'transition-all duration-300 cursor-grab'
              } ${isSwapping ? 'animate-card-stack-swap' : ''} ${
                isDark
                  ? 'text-white border-white/25'
                  : 'text-slate-800 border-white/90'
              }`}
              style={{
                transform: isSwapping ? undefined : transformStyle,
                zIndex,
                opacity: isSwapping ? undefined : opacity,
                boxShadow: shadow,
                borderTopColor: item.theme,
                borderTopWidth: isTop ? '4px' : '2.5px',
                background: isDark ? cardPalette.darkBg : cardPalette.lightBg,
              }}
              title={isTop ? 'Vuốt lên hoặc nhấp thẻ để đổi trang tiếp theo' : undefined}
            >
              {/* Đốm sáng trang trí góc thẻ (Không dùng hình nền) */}
              <div
                className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none"
                style={{ background: cardPalette.accentGlow }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                style={{ background: `${item.theme}22` }}
              />

              {/* Nội Dung Mặt Thẻ Trang */}
              <div className="relative z-10 w-full h-full p-3.5 sm:p-4 flex flex-col justify-between text-left">
                {/* 1. Header: Khung Hợp Nhất (Unified Frame) + Số Trang */}
                <div className="flex items-center justify-between gap-2 shrink-0">
                  {/* Unified Pill Frame: Icon + Tiêu đề 4 chữ Sentence Case */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-md shadow-2xs"
                    style={{
                      backgroundColor: isDark ? `${item.theme}25` : `${item.theme}15`,
                      borderColor: isDark ? `${item.theme}55` : `${item.theme}40`,
                    }}
                  >
                    <span style={{ color: item.theme }}>
                      <WebIcon name={item.iconName} className="w-3.5 h-3.5 shrink-0" />
                    </span>
                    <span
                      className="text-[11.5px] font-black font-play tracking-wide truncate max-w-[155px]"
                      style={{ color: item.theme }}
                    >
                      {fourWordTitle}
                    </span>
                  </div>

                  {/* Badge Số Trang & Chuyên Mục */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className="w-6 h-6 rounded-lg text-white font-mono font-black text-[10.5px] flex items-center justify-center shadow-xs"
                      style={{ background: item.theme }}
                    >
                      {item.pageNumber}
                    </span>
                  </div>
                </div>

                {/* 2. Body: Phân loại & Mô tả tóm tắt đặc biệt từ trang */}
                <div className="my-auto space-y-1.5 py-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[9.5px] font-mono font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded"
                      style={{
                        color: item.theme,
                        backgroundColor: `${item.theme}18`,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="text-[11.5px] sm:text-[12px] leading-relaxed line-clamp-2 text-slate-700 dark:text-slate-200 font-medium">
                    {item.description}
                  </p>

                  {/* 2 Điểm nhấn nổi bật đặc biệt từ trang */}
                  <div className="space-y-1 pt-0.5">
                    {item.highlights.slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5 text-[10.5px] text-slate-600 dark:text-slate-300">
                        <Sparkles className="w-3 h-3 shrink-0 text-amber-500" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Footer: Nút Khám Phá Trang & Nút Đổi Thẻ Tiếp */}
                <div className="pt-2 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleGoToPage(item.pageId, e)}
                    className="flex-1 py-1 px-2 rounded-xl text-white font-bold text-[11px] font-play shadow-xs flex items-center justify-center gap-1 cursor-pointer transition hover:opacity-95 active:scale-95"
                    style={{ background: item.theme }}
                    title={`Mở trực tiếp trang ${item.fullName}`}
                  >
                    <span>Khám phá trang</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSwap();
                    }}
                    className="py-1 px-2 rounded-xl text-[10.5px] font-bold font-play flex items-center gap-1 cursor-pointer transition active:scale-95 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    title="Đổi sang thẻ trang kế tiếp (Swap)"
                  >
                    <RefreshCw className="w-3 h-3 text-cyan-500" />
                    <span>Đổi thẻ</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gợi ý tương tác người dùng: Vuốt cảm ứng & Xem lưới 3D */}
      <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[370px] md:max-w-[390px] px-2 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
        <span>🖐️ Vuốt lên/xuống để đổi bài</span>
        <button
          type="button"
          onClick={() => {
            if (onOpenPagesCarousel) onOpenPagesCarousel();
          }}
          className="text-blue-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
        >
          Xem lưới 3D
        </button>
      </div>
    </div>
  );
};
