/**
 * Tiện ích ghi nhớ trạng thái âm thanh người dùng (Audio Preference Storage)
 * Lưu lựa chọn bật/tắt âm thanh vào localStorage để tự động đồng bộ trên toàn website
 */

export const AUDIO_PREF_KEY = 'hungthai_audio_muted_pref';
export const AUDIO_PREF_EVENT = 'hungthai_audio_pref_change';

export function getSavedMutedPref(defaultValue = true): boolean {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(AUDIO_PREF_KEY);
    return saved !== null ? saved === 'true' : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveMutedPref(muted: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUDIO_PREF_KEY, String(muted));
    window.dispatchEvent(
      new CustomEvent(AUDIO_PREF_EVENT, {
        detail: { muted },
      })
    );
  } catch {}
}
