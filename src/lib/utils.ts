import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Quy chuẩn tiêu đề thẻ Card toàn bộ website:
 * 1. Tiêu đề card chuẩn hóa đúng 4 từ (tối đa 4 từ).
 * 2. Tuyệt đối KHÔNG dùng từ hoặc ký tự "&".
 * 3. Định dạng: Viết hoa chữ đầu còn lại viết thường (Sentence case).
 * 4. Bảo toàn các từ viết tắt chuyên môn viết hoa (AI, CX, CSKH, CRM, SOP, KPI, ERP, MBA, UI/UX, v.v.).
 */
export function formatCardTitle(title: string): string {
  if (!title) return '';
  // 1. Loại bỏ triệt để ký tự '&', các dấu gạch ngang, chấm, ngoặc đơn
  const clean = title
    .replace(/&/g, ' ')
    .replace(/[•\-_:]/g, ' ')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // 2. Tách từ và loại bỏ từ '&' hoặc từ 'và' thừa
  const words = clean.split(/\s+/).filter((w) => Boolean(w) && w !== '&' && w.toLowerCase() !== 'và');
  if (words.length === 0) return '';

  const uppercaseAcronyms = new Set([
    'AI', 'CX', 'CSKH', 'SOP', 'CRM', 'KPI', 'OKR', 'ERP', 'BI', 'COPC', 'ISO', 'Q&A', 'IT', 'ROI', 'SLA', 'OMNI', 'RPA', 'LLM', 'BCP', 'LMS', 'POS', 'SDP', 'HRM', 'BPM', 'MBA', 'QTKD', 'BBA', 'PMP', 'UI/UX', 'UI', 'UX', 'CCNA', 'MCSA', 'CNTT'
  ]);

  // 3. Giới hạn đúng tối đa 4 từ
  const fourWords = words.slice(0, 4);

  // 4. Viết hoa chữ đầu, còn lại viết thường (Sentence case)
  const formattedWords = fourWords.map((w, index) => {
    const rawUpper = w.toUpperCase().replace(/[^A-Z0-9/]/g, '');
    if (uppercaseAcronyms.has(rawUpper)) {
      return rawUpper;
    }
    if (index === 0) {
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }
    return w.toLowerCase();
  });

  return formattedWords.join(' ');
}

/**
 * Định dạng tiêu đề theo quy tắc bắt buộc: "Viết hoa chữ đầu còn lại viết thường" (Sentence Case),
 * đúng tối đa 4 từ và tuyệt đối không dùng từ "&".
 */
export function formatSentenceCase(title: string): string {
  return formatCardTitle(title);
}

