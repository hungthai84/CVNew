'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Language = 'vi' | 'en';

export interface LanguageOption {
  code: Language;
  label: string;
  englishLabel: string;
  flag: string;
  subLabel: string;
  locale: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'vi',
    label: 'Tiếng Việt',
    englishLabel: 'Vietnamese',
    flag: '🇻🇳',
    subLabel: 'Ngôn ngữ mẹ đẻ (Bản chuẩn)',
    locale: 'vi-VN',
  },
  {
    code: 'en',
    label: 'English',
    englishLabel: 'English',
    flag: '🇬🇧',
    subLabel: 'International / Executive Mode',
    locale: 'en-US',
  },
];

/**
 * Nhận diện ngôn ngữ mặc định từ trình duyệt hệ thống
 */
export const getSystemBrowserLanguage = (): Language => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'vi';
  }
  try {
    const navLang = (navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || '').toLowerCase();
    if (navLang.startsWith('en')) {
      return 'en';
    }
    if (Array.isArray(navigator.languages)) {
      for (const l of navigator.languages) {
        const lower = (l || '').toLowerCase();
        if (lower.startsWith('en')) return 'en';
        if (lower.startsWith('vi')) return 'vi';
      }
    }
  } catch (err) {
    console.warn('Lỗi khi đọc ngôn ngữ trình duyệt:', err);
  }
  return 'vi';
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  browserLanguage: Language;
  isBrowserDefault: boolean;
  resetToBrowserDefault: () => void;
  t: (vi: string, en?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  setLanguage: () => {},
  browserLanguage: 'vi',
  isBrowserDefault: true,
  resetToBrowserDefault: () => {},
  t: (vi, en) => en || vi,
});

const STORAGE_KEY = 'hungthai_language';
const STORAGE_CUSTOM_FLAG = 'hungthai_language_is_custom';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [browserLanguage, setBrowserLanguage] = useState<Language>('vi');
  const [language, setLanguageState] = useState<Language>('vi');
  const [isBrowserDefault, setIsBrowserDefault] = useState<boolean>(true);

  // Khởi tạo ban đầu: Ưu tiên localStorage nếu người dùng đã tùy chọn, nếu không thì dùng mặc định trình duyệt hệ thống
  useEffect(() => {
    const sysLang = getSystemBrowserLanguage();
    setBrowserLanguage(sysLang);

    let currentLang: Language = sysLang;
    let custom = false;

    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      const isCustomFlag = localStorage.getItem(STORAGE_CUSTOM_FLAG);
      if (saved === 'vi' || saved === 'en') {
        currentLang = saved;
        custom = isCustomFlag === '1';
      } else {
        // Chưa có tùy chọn lưu trước đó -> dùng mặc định trình duyệt
        currentLang = sysLang;
        custom = false;
      }
    } catch {
      currentLang = sysLang;
    }

    setLanguageState(currentLang);
    setIsBrowserDefault(!custom);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
      document.documentElement.setAttribute('data-lang', currentLang);
    }
  }, []);

  // Thay đổi ngôn ngữ chủ động
  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    setIsBrowserDefault(false);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        localStorage.setItem(STORAGE_CUSTOM_FLAG, '1');
      } catch (err) {
        console.warn('Không thể lưu ngôn ngữ vào localStorage:', err);
      }
      if (document.documentElement) {
        document.documentElement.lang = newLang;
        document.documentElement.setAttribute('data-lang', newLang);
      }
      window.dispatchEvent(
        new CustomEvent('hungthai-language-change', { detail: { language: newLang } })
      );
    }
  }, []);

  // Đặt lại theo mặc định trình duyệt hệ thống
  const resetToBrowserDefault = useCallback(() => {
    const sysLang = getSystemBrowserLanguage();
    setBrowserLanguage(sysLang);
    setLanguageState(sysLang);
    setIsBrowserDefault(true);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_CUSTOM_FLAG);
      } catch {}
      if (document.documentElement) {
        document.documentElement.lang = sysLang;
        document.documentElement.setAttribute('data-lang', sysLang);
      }
      window.dispatchEvent(
        new CustomEvent('hungthai-language-change', { detail: { language: sysLang } })
      );
    }
  }, []);

  // Hàm dịch nhanh: Nếu đang ở Tiếng Anh và có bản dịch tiếng Anh thì dùng, ngược lại dùng Tiếng Việt
  const t = useCallback(
    (vi: string, en?: string): string => {
      if (language === 'en' && en) {
        return en;
      }
      return vi;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        browserLanguage,
        isBrowserDefault,
        resetToBrowserDefault,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
