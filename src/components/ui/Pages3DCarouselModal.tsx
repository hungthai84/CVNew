'use client';

import React, { useEffect } from 'react';
import { Pages3DCarousel } from '@/components/ui/Pages3DCarousel';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface Pages3DCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (pageId: number) => void;
  currentTheme?: string;
}

export const Pages3DCarouselModal: React.FC<Pages3DCarouselModalProps> = ({
  isOpen,
  onClose,
  onSelectPage,
  currentTheme = 'light-glass',
}) => {
  const isDark = currentTheme === 'dark-neon';

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200 select-none"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          SoundEngine.playTap();
          onClose();
        }}
        className="absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Shell (Bo cong 14px theo quy tắc #6) */}
      <div
        className={`relative z-10 w-full max-w-[1180px] max-h-[92vh] overflow-y-auto glass-scrollbar rounded-[14px] p-4 sm:p-6 md:p-8 border shadow-2xl transition-all duration-300 ${
          isDark
            ? 'bg-slate-950/92 border-cyan-400/40 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(34,211,238,0.2)]'
            : 'bg-white/94 border-white/90 text-slate-900 shadow-[0_25px_60px_rgba(30,27,75,0.22)]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${
                isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              <WebIcon name="layers" className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black font-play leading-tight">
                Khám Phá Toàn Cảnh 14 Trang (3D Cylindrical Carousel)
              </h3>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Xoay vòng thẻ 3D theo chiều dọc · Phân tích chi tiết và điểm nổi bật của từng trang
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              SoundEngine.playTap();
              onClose();
            }}
            aria-label="Đóng hộp thoại"
            title="Đóng (ESC)"
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-white/10'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 3D Vertical Carousel Component */}
        <Pages3DCarousel
          currentTheme={currentTheme}
          onSelectPage={(pageId) => {
            onSelectPage(pageId);
            onClose();
          }}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
