'use client';

import { useLanguage as useLang } from '@/context/LanguageContext';

export function useLanguage() {
  const { language, setLanguage, browserLanguage, isBrowserDefault, resetToBrowserDefault, t } = useLang();
  return {
    lang: language,
    language,
    setLanguage,
    browserLanguage,
    isBrowserDefault,
    resetToBrowserDefault,
    t,
  };
}

export default useLanguage;
