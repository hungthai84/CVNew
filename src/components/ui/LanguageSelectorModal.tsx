'use client';

import React from 'react';
import { useLanguage, LANGUAGE_OPTIONS, Language } from '@/context/LanguageContext';
import { WebIcon } from './WebIcon';
import { SoundEngine } from './SoundEngine';
import { useToast } from './Toast';

export interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  isDark = false,
}) => {
  const { language, setLanguage, browserLanguage, isBrowserDefault, resetToBrowserDefault } = useLanguage();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSelectLanguage = (langCode: Language) => {
    SoundEngine.playTap();
    setLanguage(langCode);
    showToast(
      langCode === 'en'
        ? 'Switched to English (Tiếng Anh)'
        : 'Đã chuyển sang Tiếng Việt (Vietnamese)'
    );
    onClose();
  };

  const handleResetToBrowser = () => {
    SoundEngine.playTap();
    resetToBrowserDefault();
    showToast(
      `Đã khôi phục ngôn ngữ mặc định trình duyệt: ${
        browserLanguage === 'en' ? 'English 🇬🇧' : 'Tiếng Việt 🇻🇳'
      }`
    );
    onClose();
  };

  return (
    <div
      className={`w-[320px] sm:w-[360px] rounded-3xl backdrop-blur-2xl border shadow-2xl p-4 text-left z-[130] flex flex-col gap-3 font-play select-none animate-in fade-in zoom-in-95 duration-150 ${
        isDark
          ? 'bg-slate-900/98 border-emerald-400/50 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(52,211,153,0.25)]'
          : 'bg-white/98 border-white/95 text-slate-800 shadow-[0_20px_50px_rgba(6,78,59,0.18),0_0_0_1px_rgba(255,255,255,0.9)]'
      }`}
      style={{
        boxShadow: isDark
          ? '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(52, 211, 153, 0.25)'
          : '0 20px 50px rgba(6, 78, 59, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* Header Popup */}
      <div
        className={`flex items-center justify-between pb-2.5 border-b px-1 ${
          isDark ? 'border-white/10' : 'border-emerald-100/80'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              isDark ? 'bg-emerald-950/80 text-emerald-300 ring-1 ring-emerald-400/40' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
          <div>
            <h3 className={`text-xs font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {language === 'en' ? 'Select Language' : 'Chọn Ngôn Ngữ'}
            </h3>
            <p className={`text-[9.5px] ${isDark ? 'text-emerald-300/80' : 'text-emerald-700/80'}`}>
              {language === 'en' ? 'Bilingual Executive Portal' : 'Cổng thông tin lãnh đạo song ngữ'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
          }`}
          title="Đóng"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Danh sách ngôn ngữ lựa chọn */}
      <div className="flex flex-col gap-2 py-1">
        {LANGUAGE_OPTIONS.map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelectLanguage(item.code)}
              className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? isDark
                    ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[0_0_16px_rgba(52,211,153,0.3)] ring-1 ring-emerald-400/50'
                    : 'bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-sm ring-1 ring-emerald-400/40'
                  : isDark
                  ? 'bg-slate-800/60 hover:bg-slate-800 border-white/5 text-slate-300 hover:text-white'
                  : 'bg-white hover:bg-emerald-50/50 border-slate-200/80 text-slate-700 hover:text-slate-900 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Cờ quốc gia */}
                <span className="text-2xl leading-none shrink-0 drop-shadow-xs">
                  {item.flag}
                </span>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs leading-snug">
                      {item.label}
                    </span>
                    {item.code === 'en' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                        EN
                      </span>
                    )}
                    {item.code === 'vi' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300">
                        VI
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] leading-tight ${
                      isSelected
                        ? isDark
                          ? 'text-emerald-300'
                          : 'text-emerald-700'
                        : isDark
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {item.subLabel}
                  </span>
                </div>
              </div>

              {/* Dấu chọn active */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                  isSelected
                    ? 'bg-emerald-500 border-emerald-400 text-white shadow-xs'
                    : isDark
                    ? 'border-white/20 group-hover:border-white/40'
                    : 'border-slate-300 group-hover:border-slate-400'
                }`}
              >
                {isSelected && (
                  <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Thông tin mặc định trình duyệt hệ thống & Nút reset */}
      <div
        className={`p-2.5 rounded-2xl border flex flex-col gap-1.5 text-xs ${
          isDark
            ? 'bg-slate-950/60 border-white/10 text-slate-300'
            : 'bg-emerald-50/50 border-emerald-100 text-slate-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <WebIcon name="globe" className="w-3 h-3 text-emerald-500" />
            <span>
              {language === 'en' ? 'System Browser Detected:' : 'Trình duyệt hệ thống:'}
            </span>
          </span>
          <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            {browserLanguage === 'en' ? 'English (en) 🇬🇧' : 'Tiếng Việt (vi) 🇻🇳'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleResetToBrowser}
          className={`w-full py-1.5 px-2.5 rounded-xl border text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            isBrowserDefault
              ? isDark
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300/80 cursor-default'
                : 'bg-emerald-100/70 border-emerald-200 text-emerald-800 cursor-default'
              : isDark
              ? 'bg-slate-800 hover:bg-slate-700 border-white/10 text-emerald-300 hover:border-emerald-400/50'
              : 'bg-white hover:bg-emerald-50 border-slate-200 text-emerald-700 shadow-2xs'
          }`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>
            {isBrowserDefault
              ? language === 'en'
                ? '✓ Currently using Browser Default'
                : '✓ Đang dùng theo mặc định trình duyệt'
              : language === 'en'
              ? 'Reset to System Browser Default'
              : 'Tự động dùng theo trình duyệt hệ thống'}
          </span>
        </button>
      </div>
    </div>
  );
};
