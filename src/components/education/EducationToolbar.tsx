'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Calendar, LayoutGrid, Layers, Radar, RotateCcw, SlidersHorizontal, Tag, X } from 'lucide-react';
import { ACADEMIC_COMPETENCY_RADAR } from '@/data/education';
import { SoundEngine } from '@/components/ui/SoundEngine';

export type EducationViewMode = 'grid' | 'carousel';

export interface EducationCategoryOption {
  readonly id: string;
  readonly label: string;
}

export interface EducationToolbarProps {
  isDark: boolean;
  viewMode: EducationViewMode;
  onViewModeChange: (mode: EducationViewMode) => void;
  categories: readonly EducationCategoryOption[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  years: readonly number[];
  minYear: number;
  maxYear: number;
  maxYearFilter: number;
  exactYearFilter: number | null;
  onMaxYearChange: (year: number) => void;
  onExactYearToggle: (year: number) => void;
  onYearReset: () => void;
  selectedRadarAxisId: string | null;
  onRadarAxisChange: (id: string | null) => void;
  onResetAll: () => void;
}

const VIEW_OPTIONS: { id: EducationViewMode; label: string; Icon: typeof LayoutGrid }[] = [
  { id: 'grid', label: 'Dạng lưới', Icon: LayoutGrid },
  { id: 'carousel', label: 'Trình chiếu', Icon: Layers },
];

/**
 * Thanh công cụ trang Học vấn: nút Bộ lọc (popover glass) + chuyển chế độ xem (Lưới / Trình chiếu) trên cùng một hàng.
 */
export const EducationToolbar: React.FC<EducationToolbarProps> = ({
  isDark,
  viewMode,
  onViewModeChange,
  categories,
  activeCategory,
  onCategoryChange,
  years,
  minYear,
  maxYear,
  maxYearFilter,
  exactYearFilter,
  onMaxYearChange,
  onExactYearToggle,
  onYearReset,
  selectedRadarAxisId,
  onRadarAxisChange,
  onResetAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();

  const isYearActive = exactYearFilter !== null || maxYearFilter < maxYear;
  const activeCount =
    (activeCategory !== 'all' ? 1 : 0) + (isYearActive ? 1 : 0) + (selectedRadarAxisId !== null ? 1 : 0);
  const shownYear = exactYearFilter ?? maxYearFilter;

  // Đóng popover khi click ra ngoài hoặc nhấn Escape
  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    // Đưa focus vào phần tử đầu tiên trong popover
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>('button, input');
    firstFocusable?.focus();
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const chipBase =
    'px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400';
  const chipIdle = isDark
    ? 'bg-slate-800/60 text-slate-200 border-white/15 hover:border-emerald-400/60'
    : 'bg-white/70 text-slate-700 border-slate-300/80 hover:border-emerald-500/60';
  const chipActive = 'bg-emerald-500 text-slate-950 font-black border-emerald-300 shadow-sm';
  const groupLabel = `flex items-center gap-1.5 text-[11px] font-black font-play ${
    isDark ? 'text-emerald-300' : 'text-emerald-700'
  }`;

  const activeCategoryLabel = categories.find((c) => c.id === activeCategory)?.label;
  const activeAxis = ACADEMIC_COMPETENCY_RADAR.find((a) => a.id === selectedRadarAxisId);

  return (
    <section
      className={`relative z-30 w-full rounded-2xl px-3 py-2 sm:px-4 border shadow-sm flex items-center justify-between gap-2 shrink-0 ${
        isDark ? 'border-slate-700/60 text-slate-100' : 'border-slate-200/80 text-slate-800'
      }`}
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Cột trái: các bộ lọc đang áp dụng */}
      <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto no-scrollbar py-0.5">
        {activeCount === 0 ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold font-play opacity-80">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Hành trình năm ({minYear} – {shownYear})
          </span>
        ) : (
          <>
            {activeCategory !== 'all' && activeCategoryLabel && (
              <ActiveChip label={activeCategoryLabel} onClear={() => onCategoryChange('all')} isDark={isDark} />
            )}
            {isYearActive && (
              <ActiveChip
                label={exactYearFilter !== null ? `${exactYearFilter}` : `${minYear}–${maxYearFilter}`}
                onClear={onYearReset}
                isDark={isDark}
              />
            )}
            {activeAxis && (
              <ActiveChip label={activeAxis.shortLabel} onClear={() => onRadarAxisChange(null)} isDark={isDark} />
            )}
          </>
        )}
      </div>

      {/* Cột phải: Nút bộ lọc + chuyển chế độ xem (icon-only) */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div ref={wrapperRef} className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => {
              SoundEngine.playTap();
              setIsOpen((v) => !v);
            }}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={activeCount > 0 ? `Bộ lọc (${activeCount} đang áp dụng)` : 'Bộ lọc'}
            title="Bộ lọc"
            className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              isOpen || activeCount > 0
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                : isDark
                ? 'bg-slate-800/60 text-slate-100 border-white/15 hover:border-emerald-400/60'
                : 'bg-white/70 text-slate-700 border-slate-300/80 hover:border-emerald-500/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">
                {activeCount}
              </span>
            )}
          </button>

          {isOpen && (
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-label="Bộ lọc văn bằng"
              className={`absolute right-0 top-full mt-2 w-[min(92vw,380px)] rounded-2xl border p-3.5 space-y-3.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-200 ${
                isDark ? 'border-slate-700/80 text-slate-100' : 'border-white/80 text-slate-800'
              }`}
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Nhóm 1: Danh mục */}
              <div className="space-y-1.5">
                <span className={groupLabel}>
                  <Tag className="w-3.5 h-3.5" />
                  Danh mục
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          SoundEngine.playTap();
                          onCategoryChange(cat.id);
                        }}
                        className={`${chipBase} ${isSelected ? chipActive : chipIdle}`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nhóm 2: Hành trình năm */}
              <div className="space-y-1.5">
                <span className={groupLabel}>
                  <Calendar className="w-3.5 h-3.5" />
                  Hành trình năm ({minYear} – {shownYear}):
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold opacity-75">{minYear}</span>
                  <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={shownYear}
                    onChange={(e) => onMaxYearChange(Number(e.target.value))}
                    aria-label="Năm tốt nghiệp tối đa"
                    className="w-full h-1.5 bg-emerald-500/30 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    title={`Kéo thanh thời gian để lọc hành trình nâng cấp bằng cấp từ ${minYear} đến ${maxYear}`}
                  />
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{shownYear}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    aria-pressed={!isYearActive}
                    onClick={() => {
                      SoundEngine.playTap();
                      onYearReset();
                    }}
                    className={`${chipBase} font-mono text-[10px] px-2 py-0.5 ${!isYearActive ? chipActive : chipIdle}`}
                  >
                    {minYear}–{maxYear}
                  </button>
                  {years.map((yr) => {
                    const isExact = exactYearFilter === yr;
                    return (
                      <button
                        key={yr}
                        type="button"
                        aria-pressed={isExact}
                        onClick={() => {
                          SoundEngine.playTap();
                          onExactYearToggle(yr);
                        }}
                        title={`Lọc chứng chỉ tốt nghiệp năm ${yr}`}
                        className={`${chipBase} font-mono text-[10px] px-2 py-0.5 ${
                          isExact
                            ? chipActive
                            : yr <= maxYearFilter && exactYearFilter === null
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                            : chipIdle
                        }`}
                      >
                        {yr}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nhóm 3: Trục năng lực */}
              <div className="space-y-1.5">
                <span className={groupLabel}>
                  <Radar className="w-3.5 h-3.5" />
                  Ma trận năng lực
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ACADEMIC_COMPETENCY_RADAR.map((axis) => {
                    const isSelected = selectedRadarAxisId === axis.id;
                    return (
                      <button
                        key={axis.id}
                        type="button"
                        aria-pressed={isSelected}
                        title={axis.label}
                        onClick={() => {
                          SoundEngine.playTap();
                          onRadarAxisChange(isSelected ? null : axis.id);
                        }}
                        className={`${chipBase} inline-flex items-center gap-1.5 ${isSelected ? chipActive : chipIdle}`}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: axis.color }} />
                        {axis.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeCount > 0 && (
                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={onResetAll}
                    className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-400/40 hover:bg-rose-500 hover:text-white transition cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                    title="Đặt lại toàn bộ bộ lọc"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Đặt lại</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chuyển chế độ xem: Lưới / Trình chiếu */}
        <div
          role="group"
          aria-label="Chế độ xem"
          className={`p-0.5 rounded-xl border flex items-center gap-0.5 ${
            isDark ? 'bg-slate-800/60 border-white/15' : 'bg-white/70 border-slate-300/80'
          }`}
        >
          {VIEW_OPTIONS.map(({ id, label, Icon }) => {
            const isActive = viewMode === id;
            return (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-pressed={isActive}
                title={label}
                onClick={() => {
                  SoundEngine.playTap();
                  onViewModeChange(id);
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ActiveChip: React.FC<{ label: string; onClear: () => void; isDark: boolean }> = ({ label, onClear, isDark }) => (
  <span
    className={`inline-flex items-center gap-1 pl-2.5 pr-1 py-0.5 rounded-full text-[11px] font-bold border whitespace-nowrap ${
      isDark ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' : 'bg-emerald-500/15 text-emerald-800 border-emerald-500/40'
    }`}
  >
    {label}
    <button
      type="button"
      onClick={() => {
        SoundEngine.playTap();
        onClear();
      }}
      aria-label={`Bỏ lọc ${label}`}
      title={`Bỏ lọc ${label}`}
      className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/15 dark:hover:bg-white/15 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);
