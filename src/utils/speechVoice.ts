'use client';

export const DEFAULT_VOICE_STORAGE_KEY = 'hungthai_default_voice_uri';
export const VOICE_CHANGE_EVENT = 'hungthai-voice-change';

export type BrowserEnvironment = 'edge' | 'chrome' | 'other';

export interface EnhancedVoiceOption {
  voiceURI: string;
  name: string;
  lang: string;
  category: 'vi' | 'multilingual';
  provider: 'microsoft' | 'google' | 'apple' | 'system';
  isDefaultEdge?: boolean;
  isDefaultChrome?: boolean;
  badgeLabel?: string;
  nativeVoice?: SpeechSynthesisVoice;
}

/**
 * Phát hiện môi trường trình duyệt: Microsoft Edge, Google Chrome hoặc khác
 */
export function detectBrowserEnvironment(): BrowserEnvironment {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  if (/Edg\//i.test(ua)) return 'edge';
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return 'chrome';
  return 'other';
}

/**
 * Danh sách giọng đọc chủ động bổ sung (Proactive Presets) cho Microsoft & Chrome và Đa ngôn ngữ
 */
export const PROACTIVE_PRESET_VOICES: EnhancedVoiceOption[] = [
  // GIỌNG MICROSOFT TIẾNG VIỆT
  {
    voiceURI: 'microsoft-nam-minh-vi-vn',
    name: 'Microsoft Nam Minh Online (Natural) - Tiếng Việt',
    lang: 'vi-VN',
    category: 'vi',
    provider: 'microsoft',
    isDefaultEdge: true,
    badgeLabel: 'Mặc định Edge / MS',
  },
  {
    voiceURI: 'microsoft-hoai-my-vi-vn',
    name: 'Microsoft Hoài My Online (Natural) - Tiếng Việt',
    lang: 'vi-VN',
    category: 'vi',
    provider: 'microsoft',
    badgeLabel: 'Microsoft Edge',
  },
  {
    voiceURI: 'microsoft-an-vi-vn',
    name: 'Microsoft An Online (Natural) - Tiếng Việt',
    lang: 'vi-VN',
    category: 'vi',
    provider: 'microsoft',
    badgeLabel: 'Microsoft Edge',
  },

  // GIỌNG GOOGLE CHROME TIẾNG VIỆT
  {
    voiceURI: 'google-tieng-viet-5-vi-vn',
    name: 'Google Tiếng Việt 5 (Chrome Online AI Natural) - Tiếng Việt',
    lang: 'vi-VN',
    category: 'vi',
    provider: 'google',
    isDefaultChrome: true,
    badgeLabel: 'Mặc định Chrome',
  },
  {
    voiceURI: 'google-tieng-viet-standard-vi-vn',
    name: 'Google Tiếng Việt (Chrome Voice Standard) - Tiếng Việt',
    lang: 'vi-VN',
    category: 'vi',
    provider: 'google',
    badgeLabel: 'Google Chrome',
  },

  // GIỌNG ĐA NGÔN NGỮ TIÊU BIỂU (MULTILINGUAL)
  {
    voiceURI: 'google-us-english-en-us',
    name: 'Google US English (Natural) - English (United States)',
    lang: 'en-US',
    category: 'multilingual',
    provider: 'google',
    badgeLabel: 'English',
  },
  {
    voiceURI: 'microsoft-jenny-en-us',
    name: 'Microsoft Jenny Online (Natural) - English (US)',
    lang: 'en-US',
    category: 'multilingual',
    provider: 'microsoft',
    badgeLabel: 'English',
  },
  {
    voiceURI: 'google-japanese-ja-jp',
    name: 'Google 日本語 (Natural) - Japanese (Japan)',
    lang: 'ja-JP',
    category: 'multilingual',
    provider: 'google',
    badgeLabel: '日本語',
  },
  {
    voiceURI: 'google-korean-ko-kr',
    name: 'Google 한국어 (Natural) - Korean (South Korea)',
    lang: 'ko-KR',
    category: 'multilingual',
    provider: 'google',
    badgeLabel: '한국어',
  },
  {
    voiceURI: 'google-chinese-zh-cn',
    name: 'Google 普通话 (Natural) - Chinese (China)',
    lang: 'zh-CN',
    category: 'multilingual',
    provider: 'google',
    badgeLabel: '中文',
  },
  {
    voiceURI: 'google-french-fr-fr',
    name: 'Google Français (Natural) - French (France)',
    lang: 'fr-FR',
    category: 'multilingual',
    provider: 'google',
    badgeLabel: 'Français',
  },
];

/**
 * Trả về Voice URI mặc định theo môi trường trình duyệt:
 * - Microsoft Edge -> Nam Minh
 * - Chrome -> Tiếng Việt 5
 */
export function getDefaultVoiceURIForBrowser(): string {
  const env = detectBrowserEnvironment();
  if (env === 'edge') {
    return 'microsoft-nam-minh-vi-vn';
  }
  return 'google-tieng-viet-5-vi-vn';
}

/**
 * Lấy Voice URI đã lưu làm mặc định trong localStorage.
 * Nếu chưa lưu, tự động trả về giọng mặc định theo trình duyệt (Edge: Nam Minh, Chrome: Tiếng Việt 5).
 */
export function getSavedVoiceURI(): string {
  if (typeof window === 'undefined') return getDefaultVoiceURIForBrowser();
  try {
    const saved = localStorage.getItem(DEFAULT_VOICE_STORAGE_KEY);
    if (saved && saved.trim()) return saved;
  } catch {}
  return getDefaultVoiceURIForBrowser();
}

/**
 * Lưu Voice URI làm mặc định cho toàn bộ website và kích hoạt sự kiện đồng bộ
 */
export function saveDefaultVoiceURI(voiceURI: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DEFAULT_VOICE_STORAGE_KEY, voiceURI);
  } catch {}

  // Kích hoạt custom event để mọi component lắng nghe cập nhật ngay lập tức
  window.dispatchEvent(
    new CustomEvent(VOICE_CHANGE_EVENT, {
      detail: { voiceURI },
    })
  );
}

/**
 * Kết hợp danh sách giọng native của trình duyệt với danh sách giọng chủ động add vào (Presets)
 */
export function getMergedEnhancedVoices(nativeVoices: SpeechSynthesisVoice[]): EnhancedVoiceOption[] {
  const result: EnhancedVoiceOption[] = [];
  const processedURIs = new Set<string>();

  // 1. Duyệt qua Presets và ghép nối với native voices nếu có
  for (const preset of PROACTIVE_PRESET_VOICES) {
    let matchedNative: SpeechSynthesisVoice | undefined;

    if (preset.voiceURI === 'microsoft-nam-minh-vi-vn') {
      matchedNative = nativeVoices.find((v) => /nam\s*minh/i.test(v.name));
    } else if (preset.voiceURI === 'microsoft-hoai-my-vi-vn') {
      matchedNative = nativeVoices.find((v) => /hoai\s*my/i.test(v.name));
    } else if (preset.voiceURI === 'microsoft-an-vi-vn') {
      matchedNative = nativeVoices.find((v) => /an\s*online/i.test(v.name) && v.lang.toLowerCase().includes('vi'));
    } else if (preset.voiceURI === 'google-tieng-viet-5-vi-vn') {
      matchedNative =
        nativeVoices.find((v) => /tiếng việt 5|tieng viet 5/i.test(v.name)) ||
        nativeVoices.find((v) => /google/i.test(v.name) && v.lang.toLowerCase().includes('vi'));
    } else if (preset.voiceURI === 'google-tieng-viet-standard-vi-vn') {
      matchedNative = nativeVoices.find(
        (v) => /google/i.test(v.name) && v.lang.toLowerCase().includes('vi')
      );
    } else {
      matchedNative = nativeVoices.find(
        (v) => v.lang.toLowerCase() === preset.lang.toLowerCase() || v.name.toLowerCase().includes(preset.badgeLabel?.toLowerCase() || '')
      );
    }

    const item: EnhancedVoiceOption = {
      ...preset,
      nativeVoice: matchedNative,
    };

    result.push(item);
    processedURIs.add(preset.voiceURI);
    if (matchedNative) {
      processedURIs.add(matchedNative.voiceURI);
    }
  }

  // 2. Thêm các native voices còn lại của hệ thống
  for (const v of nativeVoices) {
    if (processedURIs.has(v.voiceURI)) continue;

    const isVi =
      v.lang.toLowerCase().includes('vi') ||
      v.name.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('tiếng việt');

    const isMicrosoft = /microsoft/i.test(v.name);
    const isGoogle = /google/i.test(v.name);
    const isApple = /apple|siri|compact/i.test(v.name);

    const isNamMinh = /nam\s*minh/i.test(v.name);
    const isTiengViet5 = /tiếng việt 5|tieng viet 5/i.test(v.name);

    result.push({
      voiceURI: v.voiceURI,
      name: v.name,
      lang: v.lang,
      category: isVi ? 'vi' : 'multilingual',
      provider: isMicrosoft ? 'microsoft' : isGoogle ? 'google' : isApple ? 'apple' : 'system',
      isDefaultEdge: isNamMinh,
      isDefaultChrome: isTiengViet5,
      badgeLabel: isNamMinh
        ? 'Mặc định Edge / MS'
        : isTiengViet5
        ? 'Mặc định Chrome'
        : isMicrosoft
        ? 'Microsoft'
        : isGoogle
        ? 'Google'
        : v.lang,
      nativeVoice: v,
    });

    processedURIs.add(v.voiceURI);
  }

  return result;
}

/**
 * Tìm giọng đọc tối ưu nhất từ danh sách voices native:
 * 1. Khớp URI đã lưu mặc định (hoặc URI truyền vào)
 * 2. Khớp với preset giọng tương ứng (Nam Minh hoặc Tiếng Việt 5)
 * 3. Tự động áp dụng giọng mặc định theo môi trường trình duyệt:
 *    - Microsoft Edge: Ưu tiên Nam Minh
 *    - Google Chrome: Ưu tiên Tiếng Việt 5
 * 4. Ưu tiên giọng Tiếng Việt
 * 5. Fallback về giọng đầu tiên
 */
export function findBestVoice(
  voices: SpeechSynthesisVoice[],
  preferredURI?: string
): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const targetURI = preferredURI || getSavedVoiceURI();

  // 1. Kiểm tra trực tiếp khớp voiceURI
  if (targetURI) {
    const directMatch = voices.find((v) => v.voiceURI === targetURI);
    if (directMatch) return directMatch;

    // 2. Nếu target là preset Nam Minh
    if (
      targetURI === 'microsoft-nam-minh-vi-vn' ||
      /nam\s*minh/i.test(targetURI)
    ) {
      const nm = voices.find((v) => /nam\s*minh/i.test(v.name));
      if (nm) return nm;
      // Nếu không có Nam Minh trên trình duyệt này, fallback về giọng tiếng Việt
      const viVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('vi') ||
          v.name.toLowerCase().includes('vietnam') ||
          v.name.toLowerCase().includes('tiếng việt')
      );
      if (viVoice) return viVoice;
    }

    // 3. Nếu target là preset Tiếng Việt 5
    if (
      targetURI === 'google-tieng-viet-5-vi-vn' ||
      /tiếng việt 5|tieng viet 5/i.test(targetURI)
    ) {
      const tv5 =
        voices.find((v) => /tiếng việt 5|tieng viet 5/i.test(v.name)) ||
        voices.find((v) => /google/i.test(v.name) && v.lang.toLowerCase().includes('vi'));
      if (tv5) return tv5;
      const viVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('vi') ||
          v.name.toLowerCase().includes('vietnam') ||
          v.name.toLowerCase().includes('tiếng việt')
      );
      if (viVoice) return viVoice;
    }

    // 4. Nếu target là preset đa ngôn ngữ (vd: US English, Japanese, v.v.)
    const matchedPreset = PROACTIVE_PRESET_VOICES.find((p) => p.voiceURI === targetURI);
    if (matchedPreset) {
      const langMatch = voices.find((v) =>
        v.lang.toLowerCase().startsWith(matchedPreset.lang.toLowerCase().slice(0, 2))
      );
      if (langMatch) return langMatch;
    }
  }

  // 5. Mặc định theo trình duyệt nếu không có cấu hình trước
  const browserEnv = detectBrowserEnvironment();
  if (browserEnv === 'edge') {
    const edgeDefault = voices.find((v) => /nam\s*minh/i.test(v.name));
    if (edgeDefault) return edgeDefault;
  } else if (browserEnv === 'chrome') {
    const chromeDefault =
      voices.find((v) => /tiếng việt 5|tieng viet 5/i.test(v.name)) ||
      voices.find((v) => /google/i.test(v.name) && v.lang.toLowerCase().includes('vi'));
    if (chromeDefault) return chromeDefault;
  }

  // 6. Ưu tiên giọng Tiếng Việt chung
  const viVoice = voices.find(
    (v) =>
      /nam\s*minh/i.test(v.name) ||
      v.lang.toLowerCase().includes('vi') ||
      v.name.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('tiếng việt')
  );
  if (viVoice) return viVoice;

  return voices[0];
}

/**
 * Tìm giọng đọc Tiếng Anh chuyên nghiệp nhất từ danh sách voices native:
 * Ưu tiên: Google US English, Microsoft Jenny Online (Natural), Microsoft Guy, Samantha, Alex, Daniel...
 */
export function findBestEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  // 1. Ưu tiên các giọng Online Natural / Neural / Studio chuyên nghiệp
  const premiumEnVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith('en') &&
      (/natural|studio|neural|online/i.test(v.name) ||
        /jenny|guy|aria|samantha|alex|daniel|oliver/i.test(v.name))
  );
  if (premiumEnVoice) return premiumEnVoice;

  // 2. Ưu tiên Google US English hoặc Microsoft US English
  const googleOrMsEn = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith('en') &&
      (/google/i.test(v.name) || /microsoft/i.test(v.name))
  );
  if (googleOrMsEn) return googleOrMsEn;

  // 3. Bất kỳ giọng tiếng Anh nào
  const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  if (anyEn) return anyEn;

  return voices[0];
}

/**
 * Đọc văn bản toàn website bằng giọng đọc mặc định đã chọn
 */
export function speakSiteText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    preferredVoiceURI?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  // Dọn dẹp ký tự markdown
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/[•#*>\-]/g, ' ')
    .replace(/\n+/g, '. ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = options?.rate ?? 1.0;
  utterance.pitch = options?.pitch ?? 1.05;

  const voices = window.speechSynthesis.getVoices();
  const chosenVoice = findBestVoice(voices, options?.preferredVoiceURI);
  if (chosenVoice) {
    utterance.voice = chosenVoice;
    utterance.lang = chosenVoice.lang || 'vi-VN';
  } else {
    utterance.lang = 'vi-VN';
  }

  if (options?.onStart) utterance.onstart = options.onStart;
  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
}
