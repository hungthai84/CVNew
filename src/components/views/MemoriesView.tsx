'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, SlidersHorizontal, ChevronDown } from 'lucide-react';
import {
  MEMORIES_DATA,
  MEMORIES_COMPANIES,
  MEMORIES_CATEGORIES,
} from '@/data/memories';
import { MemoryPhoto } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { cn, formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface MemoriesViewProps {
  currentTheme?: string;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState<boolean>(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCompanyDropdownOpen(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMemories = MEMORIES_DATA.filter((item) => {
    if (companyFilter !== 'all' && item.companyId !== companyFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.titleVi.toLowerCase().includes(q) ||
        item.descVi.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q) ||
        item.locationVi.toLowerCase().includes(q) ||
        item.tagVi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activePhoto: MemoryPhoto | null =
    activeLightboxIdx !== null ? filteredMemories[activeLightboxIdx] || null : null;

  // Auto-scroll active photo thumbnail into view in lightbox filmstrip
  useEffect(() => {
    if (activeLightboxIdx !== null && filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[activeLightboxIdx] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeLightboxIdx]);

  // Slideshow timer
  useEffect(() => {
    if (!isSlideshowPlaying || activeLightboxIdx === null || filteredMemories.length <= 1) return;
    const interval = setInterval(() => {
      setActiveLightboxIdx((prev) =>
        prev !== null ? (prev < filteredMemories.length - 1 ? prev + 1 : 0) : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [isSlideshowPlaying, activeLightboxIdx, filteredMemories.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIdx === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIdx(null);
        setIsSlideshowPlaying(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIdx((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : filteredMemories.length - 1) : 0
        );
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIdx((prev) =>
          prev !== null ? (prev < filteredMemories.length - 1 ? prev + 1 : 0) : 0
        );
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsSlideshowPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIdx, filteredMemories.length]);

  const handleShareLink = () => {
    if (activePhoto) {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(activePhoto.imageUrl);
        showToast('Đã sao chép liên kết ảnh vào clipboard!');
      } else {
        showToast(`Liên kết ảnh: ${activePhoto.imageUrl}`);
      }
    }
  };

  const handleResetFilters = () => {
    setCompanyFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
    showToast('Đã đặt lại toàn bộ bộ lọc');
  };

  const hasActiveFilter = companyFilter !== 'all' || categoryFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start select-none relative text-slate-800 dark:text-slate-100 pb-8 text-left">
      {/* Style for crisp bright image, smooth zoom & fly-up animation from below */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes flyUpMemories {
              0% {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
              }
              65% {
                opacity: 0.9;
                transform: translateY(-4px) scale(1.01);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .memory-photo-item {
              animation: flyUpMemories 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
              will-change: transform, opacity;
            }
            .memory-crisp-img {
              filter: brightness(1.08) contrast(1.08) saturate(1.08);
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          `,
        }}
      />

      {/* BANNER KỶ NIỆM: Tiêu đề 4 chữ viết hoa chữ đầu còn lại viết thường, icon + tiêu đề lấy màu menu icon (#16a34a), câu nói font viết tay màu chữ vàng, nhóm nút thành 1 filter icon bên dưới bên trái, trong suốt 100% */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="hero-banner w-full h-44 sm:h-52 rounded-2xl overflow-visible relative bg-transparent border-0 shadow-none shrink-0 flex flex-col justify-between p-5 sm:p-7 z-30"
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-transparent pointer-events-none">
          <img
            src="/images/memories/hero-banner.png"
            alt="Khoảnh khắc kỷ niệm"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/education/hero-banner.png';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100 pointer-events-none filter brightness-110 contrast-110 saturate-110"
          />
          <div className="absolute inset-0 bg-transparent pointer-events-none" />
        </div>

        {/* Vùng Tiêu Đề: 4 chữ viết hoa chữ đầu còn lại viết thường, icon và tiêu đề lấy màu menu icon (#16a34a) */}
        <div className="relative z-10 flex flex-col justify-start text-left max-w-2xl">
          <div className="flex items-center gap-2.5" style={{ color: '#16a34a' }}>
            <Camera
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 bg-transparent border-0 p-0 shadow-none drop-shadow-[0_2px_8px_rgba(22,163,74,0.75)]"
              style={{ color: '#16a34a', stroke: '#16a34a' }}
            />
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black font-play tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: '#16a34a', textTransform: 'none' }}
            >
              Khoảnh khắc kỷ niệm
            </h1>
          </div>

          {/* Sub tiêu đề là câu nói chuyển sang font viết tay màu chữ vàng */}
          <p
            className="font-handwriting text-yellow-300 text-lg sm:text-xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-1.5 select-none"
            style={{ color: '#facc15' }}
          >
            "Mỗi khoảnh khắc là một mảnh ghép tự hào của hành trình ♡"
          </p>
        </div>

        {/* Nhóm các nút lại thành 1 filter icon ở bên dưới banner bên trái - filter dạng drop menu list, tiêu đề nhóm nút còn 4 từ */}
        <div className="relative z-30 flex items-center justify-start mt-auto pt-2" ref={filterMenuRef}>
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setIsFilterDropdownOpen((prev) => !prev);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 text-emerald-300 border border-emerald-400/70 shadow-[0_4px_16px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all cursor-pointer text-xs font-bold font-play active:scale-95 group"
              title="Bộ lọc kỷ niệm"
              aria-expanded={isFilterDropdownOpen}
              aria-haspopup="listbox"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-300 transition-transform group-hover:rotate-45 shrink-0" />
              <span>Bộ lọc kỷ niệm</span>
              {(categoryFilter !== 'all' || companyFilter !== 'all') && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-[10px] font-mono text-emerald-200">
                  {categoryFilter !== 'all'
                    ? MEMORIES_CATEGORIES.find((c) => c.id === categoryFilter)?.labelVi
                    : MEMORIES_COMPANIES.find((c) => c.id === companyFilter)?.labelVi}
                </span>
              )}
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 text-emerald-300 transition-transform duration-200 shrink-0',
                  isFilterDropdownOpen && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {isFilterDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.16 }}
                  role="listbox"
                  className="absolute left-0 top-[calc(100%+8px)] w-64 max-h-80 overflow-y-auto custom-scrollbar rounded-xl bg-slate-950/95 border border-emerald-400/50 shadow-[0_12px_32px_rgba(0,0,0,0.75)] backdrop-blur-xl py-1.5 px-1.5 z-50 flex flex-col gap-1"
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400/80">
                    Theo chủ đề kỷ niệm
                  </div>
                  {MEMORIES_CATEGORIES.map((cat) => {
                    const active = categoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          SoundEngine.playTap();
                          setCategoryFilter(cat.id);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold font-play transition-all cursor-pointer text-left',
                          active
                            ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/60'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white border border-transparent'
                        )}
                      >
                        <span>{cat.labelVi}</span>
                        {active && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                      </button>
                    );
                  })}

                  <div className="my-1 border-t border-white/10" />
                  <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400/80">
                    Theo đơn vị công tác
                  </div>
                  {MEMORIES_COMPANIES.map((comp) => {
                    const isActive = companyFilter === comp.id;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => {
                          SoundEngine.playTap();
                          setCompanyFilter(comp.id);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold font-play transition-all cursor-pointer text-left',
                          isActive
                            ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/60'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white border border-transparent'
                        )}
                      >
                        <span className="truncate">{comp.labelVi}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Thanh Công Cụ Tìm Kiếm Kỷ Niệm (Glass Soft Toolbar) */}
      <div className="w-full rounded-[12px] p-2.5 sm:p-3 bg-white/85 dark:bg-slate-900/85 border border-white/80 dark:border-white/10 backdrop-blur-xl shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        {/* Ô tìm kiếm & Bộ đếm ảnh */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kỷ niệm, năm, địa điểm..."
              className="w-44 sm:w-52 pl-7 pr-6 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-rose-400"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <WebIcon name="search" className="w-3.5 h-3.5" />
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 cursor-pointer"
              >
                <WebIcon name="close" className="w-3 h-3" />
              </button>
            )}
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition cursor-pointer flex items-center gap-1"
              title="Đặt lại bộ lọc"
            >
              <WebIcon name="refresh" className="w-3 h-3" />
              <span className="hidden sm:inline">Đặt lại</span>
            </button>
          )}

          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shrink-0">
            {filteredMemories.length} ảnh
          </span>
        </div>
      </div>

      {/* 2. Vùng chứa hiển thị Album hình ảnh (Sáng rõ nét, bay từ dưới lên, KHÔNG hiện tiêu đề/mô tả mặc định, CHỈ hiện khi hover chuột) */}
      <div className="w-full flex-grow relative min-h-[420px]">
        {filteredMemories.length === 0 ? (
          <div className="w-full py-16 px-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-dashed border-slate-300 dark:border-white/20 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <WebIcon name="camera" className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-white">Không tìm thấy ảnh kỷ niệm phù hợp với bộ lọc.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Hãy thử đổi từ khóa tìm kiếm hoặc chọn công ty khác.</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow hover:bg-rose-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>↻ Đặt lại bộ lọc</span>
            </button>
          </div>
        ) : (
          /* Multi-column Masonry Layout */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-[15px] space-y-[15px] text-left">
            {filteredMemories.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIdx(idx)}
                style={{ animationDelay: `${(idx % 16) * 45}ms` }}
                className="memory-photo-item break-inside-avoid relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-[0_10px_28px_-4px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] dark:shadow-[0_14px_34px_-6px_rgba(0,0,0,0.7),0_0_18px_rgba(244,63,94,0.18)] hover:shadow-[0_20px_42px_-6px_rgba(15,23,42,0.16)] dark:hover:shadow-[0_22px_45px_-6px_rgba(0,0,0,0.85),0_0_26px_rgba(244,63,94,0.35)] transition-all duration-300 cursor-pointer group "
              >
                {/* Hình ảnh sáng rõ nét, không lớp tối phủ mặc định */}
                <img
                  src={item.imageUrl}
                  alt={item.titleVi}
                  className="memory-crisp-img w-full h-auto object-cover  transition-transform duration-500 block"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/400x300/1e293b/ffffff?text=Photo';
                  }}
                />

                {/* Tiêu đề và mô tả CHỈ hiển thị khi hover chuột (opacity-0 group-hover:opacity-100) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 backdrop-blur-[2px] pointer-events-none">
                  <div className="flex items-center justify-between gap-1 translate-y-[-8px] group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-rose-600/90 px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                      {item.tagVi}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded-full border border-white/10">
                      {item.year}
                    </span>
                  </div>
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wide block">
                      {item.companyId?.toUpperCase()}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug break-words mt-0.5 drop-shadow-sm flex items-center gap-1.5">
                      <WebIcon name="camera" className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{formatCardTitle(item.titleVi)}</span>
                    </h4>
                    <p className="text-[11px] text-slate-200 break-words mt-1 opacity-90 leading-tight">
                      {item.descVi}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/20 text-[10px] font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <WebIcon name="location" className="w-3 h-3 text-rose-400" />
                        <span>{item.locationVi}</span>
                      </span>
                      {item.teamSize && (
                        <span className="text-cyan-300 font-bold">
                          {item.teamSize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Upgraded Lightbox Modal with Slideshow & Filmstrip */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-5 bg-slate-950/95 backdrop-blur-md"
          onClick={() => {
            setActiveLightboxIdx(null);
            setIsSlideshowPlaying(false);
          }}
        >
          <div
            className="w-full max-w-6xl max-h-[94vh] overflow-y-auto no-scrollbar rounded-3xl bg-slate-900 text-white border border-rose-500/30 shadow-2xl flex flex-col relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Large Image & Controller */}
            <div className="relative w-full h-72 sm:h-[460px] md:h-[520px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.titleVi}
                className="w-full h-full object-contain select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/60 pointer-events-none" />

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIdx((prev) =>
                    prev !== null ? (prev > 0 ? prev - 1 : filteredMemories.length - 1) : 0
                  )
                }
                title="Ảnh trước (Mũi tên trái)"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-all border border-white/20 shadow-lg hover:scale-110 active:scale-95 cursor-pointer z-20"
              >
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIdx((prev) =>
                    prev !== null ? (prev < filteredMemories.length - 1 ? prev + 1 : 0) : 0
                  )
                }
                title="Ảnh tiếp theo (Mũi tên phải)"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-all border border-white/20 shadow-lg hover:scale-110 active:scale-95 cursor-pointer z-20"
              >
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Top Action Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono text-slate-300 font-bold">
                    {(activeLightboxIdx ?? 0) + 1} / {filteredMemories.length}
                  </span>

                  {/* Slideshow Play/Pause Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                    title={isSlideshowPlaying ? 'Tạm dừng trình chiếu' : 'Tự động trình chiếu 4s'}
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                      isSlideshowPlaying
                        ? 'bg-rose-600 text-white border-rose-500 shadow animate-pulse'
                        : 'bg-slate-950/80 text-slate-300 border-white/20 hover:text-white'
                    }`}
                  >
                    {isSlideshowPlaying ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6v12m6-12v12" />
                        </svg>
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5.5v13l10.5-6.5L8 5.5z" />
                        </svg>
                        <span>Trình chiếu</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareLink}
                    title="Sao chép link ảnh"
                    className="p-2 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white transition-colors border border-white/20 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveLightboxIdx(null);
                      setIsSlideshowPlaying(false);
                    }}
                    title="Đóng (Phím Esc)"
                    className="p-2 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-colors border border-white/20 cursor-pointer font-bold"
                  >
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Title & Tags Overlay at bottom of image */}
              <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-1.5 z-20 pointer-events-none">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 bg-rose-950/90 px-3 py-0.5 rounded-full border border-rose-500/40">
                    {activePhoto.tagVi}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800/90 px-3 py-0.5 rounded-full border border-white/10">
                    {activePhoto.year}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase text-amber-300 bg-amber-950/80 px-3 py-0.5 rounded-full border border-amber-500/40">
                    {activePhoto.companyId?.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-black text-white leading-snug">
                  {activePhoto.titleVi}
                </h2>
              </div>
            </div>

            {/* Thumbnail Filmstrip */}
            <div
              ref={filmstripRef}
              className="w-full flex items-center gap-2 px-4 py-2 bg-slate-950/90 border-y border-white/10 overflow-x-auto no-scrollbar"
            >
              {filteredMemories.map((thumb, tIdx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setActiveLightboxIdx(tIdx)}
                  className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeLightboxIdx === tIdx
                      ? 'border-rose-500 scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb.imageUrl} alt={thumb.titleVi} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-6 flex flex-col gap-4 bg-slate-900">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/10 pb-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <WebIcon name="location" className="w-3.5 h-3.5 text-rose-400" />
                  <span>{activePhoto.locationVi}</span>
                </div>
                {activePhoto.teamSize && (
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <WebIcon name="users" className="w-3.5 h-3.5" />
                    <span>Quy mô: {activePhoto.teamSize}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-amber-400">
                  <WebIcon name="building" className="w-3.5 h-3.5" />
                  <span>{MEMORIES_COMPANIES.find((c) => c.id === activePhoto.companyId)?.labelVi}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {activePhoto.descVi}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
