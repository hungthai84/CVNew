// Lucian UX/UI Prompt #289 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#289
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface LiveDisplaySettingsProps {
  onNavigatePage?: (pageIndex: number) => void;
  applyToDocument?: boolean;
  className?: string;
  onClose?: () => void;
}

const SWITCH_LABELS = ['High contrast', 'Highlight links', 'Wider line spacing'];
const SWITCH_LABELS_VI = ['Độ tương phản cao', 'Nổi bật liên kết', 'Giãn cách dòng rộng'];

const PRESET_SCALES = [85, 90, 95, 100, 105, 110, 115, 120];

export const LiveDisplaySettings: React.FC<LiveDisplaySettingsProps> = ({
  onNavigatePage,
  applyToDocument = true,
  className = '',
  onClose,
}) => {
  // Always open directly when invoked from footer
  const [scalePercent, setScalePercent] = useState<number>(100); // 100% default
  const [switches, setSwitches] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);
  const upButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedPercent = localStorage.getItem('hungthai_font_scale_percent');
      const savedScale = localStorage.getItem('hungthai_font_scale');
      if (savedPercent) {
        const val = parseInt(savedPercent, 10);
        if (!isNaN(val) && val >= 70 && val <= 160) {
          setScalePercent(val);
        }
      } else if (savedScale) {
        if (savedScale === 'sm') setScalePercent(90);
        else if (savedScale === 'md') setScalePercent(100);
        else if (savedScale === 'lg') setScalePercent(115);
        else if (savedScale === '2xl') setScalePercent(130);
      }

      const hc = localStorage.getItem('hungthai_a11y_high_contrast') === '1';
      const hl = localStorage.getItem('hungthai_a11y_highlight_links') === '1';
      const wl = localStorage.getItem('hungthai_a11y_wide_lines') === '1';
      setSwitches([hc, hl, wl]);
    } catch {}

    const handleExternalFontChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ percent?: number; scaleKey?: string }>;
      if (customEvent.detail?.percent) {
        setScalePercent(customEvent.detail.percent);
      }
    };

    window.addEventListener('hungthai-font-scale-change', handleExternalFontChange);
    return () => window.removeEventListener('hungthai-font-scale-change', handleExternalFontChange);
  }, []);

  const currentScale = scalePercent / 100;
  const isHighContrast = switches[0];
  const isHighlightLinks = switches[1];
  const isWiderLineSpacing = switches[2];
  const currentLineHeight = isWiderLineSpacing ? 2 : 1.6;

  // Real-time site-wide CSS scaling
  useEffect(() => {
    if (!applyToDocument || typeof document === 'undefined') return;
    const root = document.documentElement;

    let scaleKey: 'sm' | 'md' | 'lg' | '2xl' = 'md';
    if (scalePercent <= 85) scaleKey = 'sm';
    else if (scalePercent >= 125) scaleKey = '2xl';
    else if (scalePercent >= 110) scaleKey = 'lg';

    root.setAttribute('data-font-scale', scaleKey);
    root.style.setProperty('--a11y-fs', currentScale.toFixed(2));
    root.style.fontSize = `${(16 * currentScale).toFixed(1)}px`;

    // Accessibility classes
    root.classList.toggle('a11y-high-contrast', isHighContrast);
    root.classList.toggle('a11y-highlight-links', isHighlightLinks);
    root.classList.toggle('a11y-wide-line-height', isWiderLineSpacing);
  }, [scalePercent, isHighContrast, isHighlightLinks, isWiderLineSpacing, currentScale, applyToDocument]);

  const noticeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Lưu đồng bộ tất cả cài đặt hiển thị làm mặc định vĩnh viễn vào localStorage (áp dụng trở về sau)
  const persistDisplaySettings = (
    targetPercent: number,
    targetSwitches: [boolean, boolean, boolean],
    showNotice = true
  ) => {
    let scaleKey: 'sm' | 'md' | 'lg' | '2xl' = 'md';
    if (targetPercent <= 85) scaleKey = 'sm';
    else if (targetPercent >= 125) scaleKey = '2xl';
    else if (targetPercent >= 110) scaleKey = 'lg';

    try {
      localStorage.setItem('hungthai_font_scale_percent', targetPercent.toString());
      localStorage.setItem('hungthai_font_scale', scaleKey);
      localStorage.setItem('hungthai_a11y_high_contrast', targetSwitches[0] ? '1' : '0');
      localStorage.setItem('hungthai_a11y_highlight_links', targetSwitches[1] ? '1' : '0');
      localStorage.setItem('hungthai_a11y_wide_lines', targetSwitches[2] ? '1' : '0');
    } catch {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('hungthai-font-scale-change', {
          detail: { percent: targetPercent, scaleKey, switches: targetSwitches },
        })
      );
    }

    if (showNotice) {
      setIsSavedNotice(true);
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
      noticeTimerRef.current = setTimeout(() => setIsSavedNotice(false), 2400);
    }
  };

  // Nút chủ động xác nhận lưu làm mặc định vĩnh viễn
  const handleSaveAsDefault = () => {
    SoundEngine.playTap();
    persistDisplaySettings(scalePercent, switches, true);
  };

  // Giảm 5%: Tự động lưu làm mặc định ngay khi chọn
  const handleStepDown = () => {
    const next = Math.max(75, scalePercent - 5);
    setScalePercent(next);
    persistDisplaySettings(next, switches, true);
  };

  // Tăng 5%: Tự động lưu làm mặc định ngay khi chọn
  const handleStepUp = () => {
    const next = Math.min(150, scalePercent + 5);
    setScalePercent(next);
    persistDisplaySettings(next, switches, true);
  };

  // Chọn preset: Tự động lưu làm mặc định ngay khi chọn
  const handleSelectPreset = (preset: number) => {
    setScalePercent(preset);
    persistDisplaySettings(preset, switches, true);
  };

  // Bật/tắt switch A11y: Tự động lưu làm mặc định ngay khi gạt
  const handleToggleSwitch = (index: number) => {
    setSwitches((prev) => {
      const next = [...prev] as [boolean, boolean, boolean];
      next[index] = !next[index];
      persistDisplaySettings(scalePercent, next, true);
      return next;
    });
  };

  // Khôi phục mặc định ban đầu: Reset về 100% và lưu giá trị 100% làm mặc định
  const handleReset = () => {
    SoundEngine.playTap();
    setScalePercent(100);
    setSwitches([false, false, false]);
    persistDisplaySettings(100, [false, false, false], true);
  };

  return (
    <div
      className={`u289-container w-[350px] max-w-[94vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-4 shadow-2xl text-slate-800 dark:text-slate-100 select-none ${className}`}
      style={
        {
          '--fs': currentScale,
          '--lh': currentLineHeight,
        } as React.CSSProperties
      }
    >
      {/* 1. Header with Close button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
              Display settings
            </h3>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Cài đặt hiển thị &amp; cỡ chữ (bước 5%)
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors"
            title="Đóng bảng hiển thị"
            aria-label="Đóng"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* 2. Text Size Stepper - EXACTLY 5% per click */}
      <div className="mt-3.5 bg-slate-100/80 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Kích thước chữ (Text size)
          </span>
          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-1.5 py-0.5 rounded-md">
            ±5% mỗi lần nhấn
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
          <button
            type="button"
            aria-label="Giảm 5% kích thước font"
            title="Giảm 5% kích thước font chữ"
            disabled={scalePercent <= 75}
            onClick={handleStepDown}
            className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center justify-center font-bold text-sm disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
          >
            -5%
          </button>

          <div className="flex flex-col items-center">
            <span className="text-lg font-black tracking-tight text-blue-600 dark:text-blue-400 tabular-nums">
              {scalePercent}%
            </span>
            <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">
              {(16 * (scalePercent / 100)).toFixed(1)}px base
            </span>
          </div>

          <button
            ref={upButtonRef}
            type="button"
            aria-label="Tăng 5% kích thước font"
            title="Tăng 5% kích thước font chữ"
            disabled={scalePercent >= 150}
            onClick={handleStepUp}
            className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center justify-center font-bold text-sm disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
          >
            +5%
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
          {PRESET_SCALES.map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleSelectPreset(pct)}
              className={`px-1.5 py-1 text-[9.5px] font-bold rounded-md transition-all ${
                scalePercent === pct
                  ? 'bg-blue-600 text-white shadow-sm scale-105'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* 3. Accessibility Switches */}
      <div className="mt-3 space-y-1.5">
        {SWITCH_LABELS.map((label, idx) => {
          const isChecked = switches[idx];
          return (
            <div
              key={label}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors text-xs font-semibold"
            >
              <div className="flex flex-col">
                <span className="text-slate-800 dark:text-slate-200">{label}</span>
                <span className="text-[9.5px] font-normal text-slate-500 dark:text-slate-400">
                  {SWITCH_LABELS_VI[idx]}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                aria-label={label}
                onClick={() => handleToggleSwitch(idx)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  isChecked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    isChecked ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>



      {/* 5. Save as Default Button & Reset */}
      <div className="mt-3.5 space-y-2">
        <button
          type="button"
          onClick={handleSaveAsDefault}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          <span>Xác nhận dùng {scalePercent}% làm mặc định</span>
        </button>

        {isSavedNotice && (
          <div className="text-center text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 py-1 px-2 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
            ✓ Đã lưu cài đặt ({scalePercent}%) làm mặc định trở về sau!
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Khôi phục chuẩn ban đầu (100%)
          </button>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tự động lưu vĩnh viễn</span>
          </span>
        </div>
      </div>
    </div>
  );
};
