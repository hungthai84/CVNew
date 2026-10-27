'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MEMORIES_DATA,
  MEMORIES_COMPANIES,
  MEMORIES_CATEGORIES,
} from '@/data/memories';
import { MemoryPhoto } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { formatCardTitle } from '@/lib/utils';

export interface MemoriesViewProps {
  currentTheme?: string;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState<boolean>(false);
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCompanyDropdownOpen(false);
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
      {/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
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

      {/* Modal Popup Dropdown Lọc Công Ty (Tránh bị overflow-hidden của banner che khuất) */}
      {companyDropdownOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setCompanyDropdownOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-3 flex flex-col gap-2 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Lọc Theo Đơn Vị / Công Ty</span>
              </div>
              <button
                type="button"
                onClick={() => setCompanyDropdownOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-300 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-1 max-h-72 overflow-y-auto no-scrollbar">
              {MEMORIES_COMPANIES.map((comp) => {
                const count =
                  comp.id === 'all'
                    ? MEMORIES_DATA.length
                    : MEMORIES_DATA.filter((m) => m.companyId === comp.id).length;
                const isActive = companyFilter === comp.id;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => {
                      setCompanyFilter(comp.id);
                      setCompanyDropdownOpen(false);
                      showToast(`Đã lọc: ${comp.labelVi}`);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate pr-2">{comp.labelVi}</span>
                    <span className="text-[10px] font-mono opacity-70 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-md">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" /></svg>
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
