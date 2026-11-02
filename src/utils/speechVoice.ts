'use client';

export const DEFAULT_VOICE_STORAGE_KEY = 'hungthai_default_voice_uri';
export const VOICE_CHANGE_EVENT = 'hungthai-voice-change';
export const GEMINI_PUCK_VOICE_URI = 'gemini-puck-vi-mien-tay';

export type BrowserEnvironment = 'edge' | 'chrome' | 'other';
export type PuckSpeakingStyle = 'friendly' | 'professional' | 'narration';
export type PuckPitchPreset = 'low' | 'natural' | 'warm';

export interface EnhancedVoiceOption {
  voiceURI: string;
  name: string;
  lang: string;
  category: 'vi' | 'multilingual';
  provider: 'gemini' | 'microsoft' | 'google' | 'apple' | 'system';
  isDefaultEdge?: boolean;
  isDefaultChrome?: boolean;
  isGeminiPuck?: boolean;
  badgeLabel?: string;
  nativeVoice?: SpeechSynthesisVoice;
}

export interface GeminiPuckTtsResult {
  audioBase64: string;
  audioDataUrl: string;
  mimeType: string;
  voiceName: string;
  model: string;
  language: string;
  accent: string;
  speakingStyle: PuckSpeakingStyle;
  speakingRate: number;
  pitch: PuckPitchPreset;
  processedText: string;
  accentLimitationNote: string;
}

// Active HTMLAudioElement instance for Gemini PUCK playback across the site
let activeGeminiAudio: HTMLAudioElement | null = null;

/**
 * Dừng mọi âm thanh TTS đang phát (cả Gemini PUCK Audio và Web Speech API)
 */
export function stopActiveSpeech(): void {
  if (activeGeminiAudio) {
    try {
      activeGeminiAudio.pause();
      activeGeminiAudio.currentTime = 0;
    } catch {}
    activeGeminiAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

/**
 * Gọi API `/api/tts` thực tế sử dụng Google Gemini TTS – Voice: PUCK (Miền Tây Nam Bộ)
 */
export async function generateGeminiPuckSpeech(params: {
  text: string;
  speakingStyle?: PuckSpeakingStyle;
  speakingRate?: number;
  pitch?: PuckPitchPreset;
}): Promise<GeminiPuckTtsResult> {
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: params.text,
      speakingStyle: params.speakingStyle || 'friendly',
      speakingRate: params.speakingRate ?? 1.0,
      pitch: params.pitch || 'natural',
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.audioBase64) {
    throw new Error(
      data?.error || 'Không thể tạo giọng đọc PUCK từ Google Gemini TTS.'
    );
  }

  const mimeType = data.mimeType || 'audio/wav';
  const audioDataUrl = `data:${mimeType};base64,${data.audioBase64}`;

  return {
    audioBase64: data.audioBase64,
    audioDataUrl,
    mimeType,
    voiceName: data.voiceName || 'PUCK',
    model: data.model || 'gemini-3.8-flash-lite-tts',
    language: data.language || 'vi-VN',
    accent: data.accent || 'Southern Vietnamese – Mekong Delta (Miền Tây Nam Bộ)',
    speakingStyle: data.speakingStyle || params.speakingStyle || 'friendly',
    speakingRate: data.speakingRate ?? params.speakingRate ?? 1.0,
    pitch: data.pitch || params.pitch || 'natural',
    processedText: data.processedText || params.text,
    accentLimitationNote:
      data.accentLimitationNote ||
      'PUCK là giọng tổng hợp có sẵn của Google Gemini TTS kết hợp chỉ dẫn phát âm tiếng Việt Nam Bộ (ưu tiên sắc thái Miền Tây Nam Bộ).',
  };
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
 * Danh sách giọng đọc chủ động bổ sung (Proactive Presets)
 * Ưu tiên số 1: Google Gemini TTS – PUCK (Nam Miền Tây Nam Bộ • vi-VN)
 */
export const PROACTIVE_PRESET_VOICES: EnhancedVoiceOption[] = [
  // GIỌNG AI CHỦ ĐẠO: GOOGLE GEMINI TTS - PUCK (MIỀN TÂY NAM BỘ)
  {
    voiceURI: GEMINI_PUCK_VOICE_URI,
    name: 'Google Gemini TTS – PUCK (Nam Miền Tây Nam Bộ • Ấm áp, Gần gũi)',
    lang: 'vi-VN',
    category: 'vi',
    provider: 'gemini',
    isGeminiPuck: true,
    badgeLabel: 'Gemini PUCK • Miền Tây',
  },

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
 * Trả về Voice URI mặc định: ưu tiên Google Gemini TTS – PUCK (Miền Tây Nam Bộ)
 */
export function getDefaultVoiceURIForBrowser(): string {
  return GEMINI_PUCK_VOICE_URI;
}

/**
 * Lấy Voice URI đã lưu làm mặc định trong localStorage.
 */
export function getSavedVoiceURI(): string {
  if (typeof window === 'undefined') return GEMINI_PUCK_VOICE_URI;
  try {
    const saved = localStorage.getItem(DEFAULT_VOICE_STORAGE_KEY);
    if (saved && saved.trim()) return saved;
  } catch {}
  return GEMINI_PUCK_VOICE_URI;
}

/**
 * Lưu Voice URI làm mặc định cho toàn bộ website và kích hoạt sự kiện đồng bộ
 */
export function saveDefaultVoiceURI(voiceURI: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DEFAULT_VOICE_STORAGE_KEY, voiceURI);
  } catch {}

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

    if (preset.voiceURI === GEMINI_PUCK_VOICE_URI) {
      matchedNative = undefined;
    } else if (preset.voiceURI === 'microsoft-nam-minh-vi-vn') {
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
 * Tìm giọng đọc tối ưu nhất từ danh sách voices native (fallback khi không dùng Gemini PUCK):
 */
export function findBestVoice(
  voices: SpeechSynthesisVoice[],
  preferredURI?: string
): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const targetURI = preferredURI || getSavedVoiceURI();

  if (targetURI && targetURI !== GEMINI_PUCK_VOICE_URI) {
    const directMatch = voices.find((v) => v.voiceURI === targetURI);
    if (directMatch) return directMatch;

    if (
      targetURI === 'microsoft-nam-minh-vi-vn' ||
      /nam\s*minh/i.test(targetURI)
    ) {
      const nm = voices.find((v) => /nam\s*minh/i.test(v.name));
      if (nm) return nm;
      const viVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('vi') ||
          v.name.toLowerCase().includes('vietnam') ||
          v.name.toLowerCase().includes('tiếng việt')
      );
      if (viVoice) return viVoice;
    }

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

    const matchedPreset = PROACTIVE_PRESET_VOICES.find((p) => p.voiceURI === targetURI);
    if (matchedPreset) {
      const langMatch = voices.find((v) =>
        v.lang.toLowerCase().startsWith(matchedPreset.lang.toLowerCase().slice(0, 2))
      );
      if (langMatch) return langMatch;
    }
  }

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
 * Tìm giọng đọc Tiếng Anh chuyên nghiệp nhất từ danh sách voices native
 */
export function findBestEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const premiumEnVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith('en') &&
      (/natural|studio|neural|online/i.test(v.name) ||
        /jenny|guy|aria|samantha|alex|daniel|oliver/i.test(v.name))
  );
  if (premiumEnVoice) return premiumEnVoice;

  const googleOrMsEn = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith('en') &&
      (/google/i.test(v.name) || /microsoft/i.test(v.name))
  );
  if (googleOrMsEn) return googleOrMsEn;

  const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  if (anyEn) return anyEn;

  return voices[0];
}

/**
 * Đọc văn bản toàn website bằng giọng đọc mặc định đã chọn (Ưu tiên Google Gemini TTS - PUCK Miền Tây Nam Bộ)
 */
export function speakSiteText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    speakingStyle?: PuckSpeakingStyle;
    preferredVoiceURI?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err?: string) => void;
  }
): void {
  if (typeof window === 'undefined') return;

  stopActiveSpeech();

  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/[•#*>\-]/g, ' ')
    .replace(/\n+/g, '. ')
    .trim();

  if (!cleanText) return;

  const targetVoiceURI = options?.preferredVoiceURI || getSavedVoiceURI();
  const rate = Math.min(1.15, Math.max(0.85, options?.rate ?? 1.0));
  const pitchVal = options?.pitch ?? 1.0;
  const pitchPreset: PuckPitchPreset =
    pitchVal < 0.96 ? 'low' : pitchVal > 1.06 ? 'warm' : 'natural';

  // Nếu đang chọn giọng Google Gemini TTS – PUCK (mặc định), gọi API thực tế /api/tts
  if (!targetVoiceURI || targetVoiceURI === GEMINI_PUCK_VOICE_URI) {
    generateGeminiPuckSpeech({
      text: cleanText,
      speakingStyle: options?.speakingStyle || 'friendly',
      speakingRate: rate,
      pitch: pitchPreset,
    })
      .then((res) => {
        const audio = new Audio(res.audioDataUrl);
        audio.playbackRate = rate;
        activeGeminiAudio = audio;
        audio.onplay = () => {
          options?.onStart?.();
        };
        audio.onended = () => {
          activeGeminiAudio = null;
          options?.onEnd?.();
        };
        audio.onerror = () => {
          activeGeminiAudio = null;
          options?.onError?.('Lỗi phát âm thanh PUCK.');
        };
        audio.play().catch((err) => {
          activeGeminiAudio = null;
          options?.onError?.(err?.message || 'Không thể tự động phát âm thanh.');
        });
      })
      .catch((err) => {
        options?.onError?.(err instanceof Error ? err.message : 'Lỗi kết nối Gemini TTS');
      });
    return;
  }

  // Fallback cho các giọng trình duyệt khác khi người dùng chủ động chọn Microsoft/Chrome
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = pitchVal;

  const voices = window.speechSynthesis.getVoices();
  const chosenVoice = findBestVoice(voices, targetVoiceURI);
  if (chosenVoice) {
    utterance.voice = chosenVoice;
    utterance.lang = chosenVoice.lang || 'vi-VN';
  } else {
    utterance.lang = 'vi-VN';
  }

  if (options?.onStart) utterance.onstart = options.onStart;
  if (options?.onEnd) utterance.onend = options.onEnd;
  if (options?.onError) utterance.onerror = () => options.onError?.();

  window.speechSynthesis.speak(utterance);
}
