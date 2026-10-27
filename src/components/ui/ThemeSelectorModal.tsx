'use client';

import React from 'react';
import { SiteTheme, ThemeOption } from '@/types';
import { THEME_LIST } from '@/data/themes';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: SiteTheme;
  onSelectTheme: (theme: SiteTheme) => void;
}

interface ThemePreviewData {
  previewStyle: React.CSSProperties;
  badgeBg: string;
  sampleElements: React.ReactNode;
}

const THEME_PREVIEWS: Record<SiteTheme, ThemePreviewData> = {
  'light-glass': {
    previewStyle: {
      background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 35%, #ECFDF5 70%, #FFFBEB 100%)',
    },
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    sampleElements: (
      <div
        className="logo-pill-light w-full p-2.5 rounded-2xl backdrop-blur-md border shadow-sm relative overflow-hidden flex items-center justify-between text-xs"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.95)',
          color: '#1E1B4B',
        }}
      >
        <span className="logo-pill-text font-bold relative z-10 flex items-center gap-1.5" style={{ color: '#1E1B4B' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#60A5FA] via-[#FB7185] to-[#FCD34D]" />
          Glass UI Light Multicolor
        </span>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] font-bold relative z-10 shadow-2xs"
          style={{ background: '#F3E8FF', color: '#6B21A8' }}
        >
          Kính sáng đa sắc
        </span>
      </div>
    ),
  },
  'luminous-glass': {
    previewStyle: {
      background:
        'radial-gradient(circle at 20% 25%, rgba(56, 189, 248, 0.45) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(244, 114, 182, 0.45) 0%, transparent 50%), linear-gradient(135deg, #f0fdf4 0%, #eff6ff 40%, #fdf2f8 70%, #fefce8 100%)',
    },
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    sampleElements: (
      <div
        className="w-full p-2.5 rounded-2xl backdrop-blur-xl border shadow-sm relative overflow-hidden flex items-center justify-between text-xs"
        style={{
          background: 'rgba(255, 255, 255, 0.65)',
          borderColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 24px -4px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 1)',
          color: '#0F172A',
        }}
      >
        <span className="font-bold relative z-10 flex items-center gap-1.5 text-slate-900">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
          Luminous Glass Showcase
        </span>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] font-black relative z-10 shadow-2xs border border-white"
          style={{ background: 'linear-gradient(135deg, #e0f2fe, #fce7f3)', color: '#0369a1' }}
        >
          Kính sáng quang phổ
        </span>
      </div>
    ),
  },
  'dark-neon': {
    previewStyle: {
      background: 'linear-gradient(135deg, #070A14 0%, #0B1020 50%, #11182B 100%)',
    },
    badgeBg: 'bg-purple-950 text-purple-300 border-purple-500/40',
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-sm relative overflow-hidden flex items-center justify-between text-xs text-white">
        <span className="font-bold relative z-10 flex items-center gap-1.5 text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          Glass UI Dark Neon Multicolor
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold relative z-10 shadow-2xs">
          Kính tối Neon
        </span>
      </div>
    ),
  },
};

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  const { showToast } = useToast();

  const handleChoose = (themeId: SiteTheme, fourWordName: string) => {
    onSelectTheme(themeId);
    onClose();
    showToast(`Đã áp dụng: ${fourWordName}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" showCloseBtn={true}>
      <div className="p-5 sm:p-7 flex flex-col gap-5 text-left select-none font-play">
        {/* Header Title */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-white/10 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Giao Diện Hệ Thống
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Giao diện độc quyền: Kính sáng đa sắc & Kính tối đa sắc.
            </p>
          </div>
        </div>

        {/* Danh sách giao diện */}
        <div className="grid grid-cols-1 gap-4">
          {THEME_LIST.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const preview = THEME_PREVIEWS[theme.id] || THEME_PREVIEWS['light-glass'];

            return (
              <div
                key={theme.id}
                onClick={() => handleChoose(theme.id, theme.fourWordName)}
                className={`p-4 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 group relative select-none ${
                  isSelected
                    ? 'border-indigo-600 dark:border-cyan-400 bg-indigo-50/50 dark:bg-cyan-950/40 shadow-lg ring-2 ring-indigo-400/40 dark:ring-cyan-400/40'
                    : 'border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 hover:border-indigo-300 dark:hover:border-cyan-400/70 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute -top-2.5 right-3 z-10 px-3 py-0.5 rounded-[999px] text-[10px] font-black bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md flex items-center gap-1">
                    <span>✓ Đang áp dụng</span>
                  </div>
                )}

                <div className="flex flex-col gap-2.5">
                  {/* Theme Preview Box */}
                  <div
                    className="w-full h-24 rounded-2xl p-2.5 flex flex-col justify-end border border-black/10 dark:border-white/10 overflow-hidden relative shadow-inner group-hover:scale-102 transition-transform duration-300"
                    style={preview.previewStyle}
                  >
                    {preview.sampleElements}
                  </div>

                  {/* Icon & Tên 4 Chữ (Không hiển thị sub tiêu đề) */}
                  <div className="flex items-center gap-2.5 py-1">
                    <span
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        background: `${theme.accentColor}18`,
                        color: theme.accentColor,
                      }}
                    >
                      <WebIcon name={theme.icon} className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                      {theme.fourWordName}
                    </h4>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-[999px] text-xs font-bold transition duration-200 flex items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-cyan-950/50 text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <span>{isSelected ? 'Đang hoạt động' : 'Áp dụng giao diện'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
