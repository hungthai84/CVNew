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
  'pastel-sky': {
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    previewStyle: {
      background: 'linear-gradient(135deg, #bae6fd 0%, #f0f9ff 50%, #fde68a 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-white/90 border border-white shadow-sm relative overflow-hidden flex items-center justify-between text-xs text-slate-800">
        <span className="font-bold relative z-10 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-sky-500 to-amber-400" />
          Bầu Trời Đa Sắc
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-amber-100 text-amber-700 font-bold relative z-10">
          Pastel Sky
        </span>
      </div>
    ),
  },
  'light-glass': {
    accentColor: '#0284c7',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    previewStyle: {
      background: 'linear-gradient(135deg, #fdf4ff 0%, #e0f2fe 35%, #ecfdf5 70%, #fffbeb 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-white/80 border border-white/95 shadow-sm relative overflow-hidden flex items-center justify-between text-xs text-slate-800">
        <span className="font-bold relative z-10 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-sky-400 via-rose-400 to-amber-400" />
          Kính Sáng 12 Màu
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-sky-100 text-sky-700 font-bold relative z-10">
          Light Glass
        </span>
      </div>
    ),
  } as ThemePreviewData,
  'dark-neon': {
    badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-500/50',
    previewStyle: {
      background: 'linear-gradient(135deg, #060814 0%, #15102a 50%, #081c24 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-[#0a0e24]/90 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.3)] relative overflow-hidden flex items-center justify-between text-xs text-cyan-200">
        <span className="font-bold relative z-10 flex items-center gap-1.5 drop-shadow-[0_0_8px_#00f2fe]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Thẻ Neon Gương
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-400/40 relative z-10 shadow-[0_0_8px_rgba(0,242,254,0.4)]">
          Cyber Neon
        </span>
      </div>
    ),
  },
  'flat-rainbow': {
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    previewStyle: {
      background: 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 30%, #eff6ff 70%, #fefce8 100%)',
    },
    sampleElements: (
      <div
        className="w-full p-2.5 rounded-2xl shadow-sm flex items-center justify-between text-xs text-slate-800"
        style={{
          background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7) border-box',
          border: '2px solid transparent',
        }}
      >
        <span className="font-extrabold flex items-center gap-1.5 text-slate-900">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-indigo-500" />
          Phẳng Cầu Vồng 7 Màu
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black shadow-xs">
          Flat Rainbow
        </span>
      </div>
    ),
  },
  'aurora': {
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    previewStyle: {
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 50%, #fae8ff 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-white/70 border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs text-slate-700">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          Thẻ Kính Aurora
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-slate-100 text-slate-600 font-semibold">
          Original
        </span>
      </div>
    ),
  },
  'crystal-glass': {
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    previewStyle: {
      background: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 50%, #f0fdf4 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-white/95 border border-cyan-200 shadow-sm flex items-center justify-between text-xs text-slate-800">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          Thẻ Pha Lê
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-cyan-50 text-cyan-700 font-semibold">
          Crystal
        </span>
      </div>
    ),
  },
  'midnight-dark': {
    badgeBg: 'bg-purple-950 text-purple-300 border-purple-500/50',
    previewStyle: {
      background: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-sm flex items-center justify-between text-xs text-slate-200">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          Thẻ Đêm Tối
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-purple-900/60 text-purple-300 font-semibold">
          Midnight
        </span>
      </div>
    ),
  },
  'purple-pastel': {
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-300',
    previewStyle: {
      background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 50%, #fae8ff 100%)',
    },
    sampleElements: (
      <div className="w-full p-2.5 rounded-2xl bg-white/90 border border-white/95 shadow-sm flex items-center justify-between text-xs text-slate-800">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-500" />
          Thẻ Tím Pastel
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[999px] bg-violet-100 text-violet-700 font-semibold">
          Soft Pastel
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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="5xl" showCloseBtn={true}>
      <div className="p-5 sm:p-7 flex flex-col gap-5 text-left select-none font-play">
        {/* Header Title */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 text-white flex items-center justify-center font-bold shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              Tùy Chọn Giao Diện Hệ Thống (Theme Selection)
            </h3>
            <p className="text-xs text-slate-500">
              Chọn giao diện hiển thị yêu thích. Giao diện được lưu lâu dài vào trình duyệt.
            </p>
          </div>
        </div>

        {/* Danh sách các giao diện dạng Grid Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEME_LIST.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const preview = THEME_PREVIEWS[theme.id] || THEME_PREVIEWS['light-glass'];

            return (
              <div
                key={theme.id}
                onClick={() => handleChoose(theme.id, theme.fourWordName)}
                className={`p-4 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 group relative select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-lg ring-2 ring-indigo-400/40'
                    : 'border-slate-200 bg-white/85 hover:border-indigo-300 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute -top-2.5 right-3 z-10 px-3 py-0.5 rounded-[999px] text-[10px] font-black bg-indigo-600 text-white shadow-md flex items-center gap-1">
                    <span>✓ Đang áp dụng</span>
                  </div>
                )}

                <div className="flex flex-col gap-2.5">
                  {/* Theme Preview Box */}
                  <div
                    className="w-full h-24 rounded-2xl p-2.5 flex flex-col justify-end border border-black/10 overflow-hidden relative shadow-inner group-hover:scale-102 transition-transform duration-300"
                    style={preview.previewStyle}
                  >
                    {preview.sampleElements}
                  </div>

                  {/* Icon & Tên 4 Chữ */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: `${theme.accentColor}18`,
                          color: theme.accentColor,
                        }}
                      >
                        <WebIcon name={theme.icon} className="w-4 h-4" />
                      </span>
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {theme.fourWordName}
                      </h4>
                    </div>
                    <span
                      className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-[999px] border shadow-2xs ${preview.badgeBg}`}
                    >
                      {theme.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-2">
                    {theme.description}
                  </p>
                </div>

                {/* Apply Button */}
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-[999px] text-xs font-bold transition duration-200 flex items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 border border-slate-200'
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
