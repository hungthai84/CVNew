/**
 * BẢNG MÀU NĂNG ĐỘNG THEO TỪNG CỤM CHỦ ĐỀ & PHÂN HỆ DOANH NGHIỆP
 * (Dynamic Accent Hue for Categories & Enterprise Ecosystems)
 * 
 * - MobiFone: Xanh viễn thông (Telecom Deep Sky Blue)
 * - VED / Shopee: Cam thương mại điện tử & giải trí (Shopee Flame Orange)
 * - Ví MoMo: Hồng tím công nghệ tài chính (MoMo Magenta Pink/Violet)
 * - Finviet: Xanh ngọc thanh toán số (Emerald Jade Green)
 * - Be Group: Vàng công nghệ vận tải
 * - Grab: Xanh lá siêu ứng dụng
 * - Ngân hàng / Techcombank: Đỏ tài chính
 */

export interface CategoryThemeMeta {
  key: string;
  name: string;
  color: string;
  lightColor: string;
  darkColor: string;
  gradient: string;
  glow: string;
  glowShadow: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
}

export const CATEGORY_THEMES: Record<string, CategoryThemeMeta> = {
  // 1. Phân hệ Viễn Thông: MobiFone (Xanh Viễn Thông)
  mobifone: {
    key: 'mobifone',
    name: 'MobiFone',
    color: '#0284c7', // Sky 600 / Telecom Blue
    lightColor: '#0284c7',
    darkColor: '#38bdf8',
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    glow: 'rgba(2, 132, 199, 0.55)',
    glowShadow: 'rgba(2, 132, 199, 0.35)',
    bgLight: 'rgba(224, 242, 254, 0.85)',
    bgDark: 'rgba(8, 47, 73, 0.75)',
    borderLight: 'rgba(56, 189, 248, 0.65)',
    borderDark: 'rgba(56, 189, 248, 0.45)',
  },

  // 2. Phân hệ Thương Mại Điện Tử & Giải Trí: VED / Shopee / Garena (Cam Rực Rỡ)
  ved: {
    key: 'ved',
    name: 'VED / Shopee',
    color: '#ea580c', // Shopee Flame Orange
    lightColor: '#ea580c',
    darkColor: '#fb923c',
    gradient: 'from-orange-500 via-amber-600 to-red-500',
    glow: 'rgba(234, 88, 12, 0.55)',
    glowShadow: 'rgba(234, 88, 12, 0.35)',
    bgLight: 'rgba(255, 237, 213, 0.85)',
    bgDark: 'rgba(67, 20, 7, 0.75)',
    borderLight: 'rgba(251, 146, 60, 0.65)',
    borderDark: 'rgba(251, 146, 60, 0.45)',
  },
  shopee: {
    key: 'shopee',
    name: 'Shopee',
    color: '#ee4d2d', // Exact Shopee Orange Red
    lightColor: '#ee4d2d',
    darkColor: '#fb923c',
    gradient: 'from-orange-500 via-red-500 to-amber-500',
    glow: 'rgba(238, 77, 45, 0.55)',
    glowShadow: 'rgba(238, 77, 45, 0.35)',
    bgLight: 'rgba(255, 237, 213, 0.85)',
    bgDark: 'rgba(67, 20, 7, 0.75)',
    borderLight: 'rgba(251, 146, 60, 0.65)',
    borderDark: 'rgba(251, 146, 60, 0.45)',
  },
  garena: {
    key: 'garena',
    name: 'Garena',
    color: '#dc2626', // Garena Red
    lightColor: '#dc2626',
    darkColor: '#f87171',
    gradient: 'from-red-600 via-rose-600 to-orange-600',
    glow: 'rgba(220, 38, 38, 0.55)',
    glowShadow: 'rgba(220, 38, 38, 0.35)',
    bgLight: 'rgba(254, 226, 226, 0.85)',
    bgDark: 'rgba(69, 10, 10, 0.75)',
    borderLight: 'rgba(248, 113, 113, 0.65)',
    borderDark: 'rgba(248, 113, 113, 0.45)',
  },

  // 3. Phân hệ Fintech & Ví Điện Tử: Ví MoMo (Hồng Tím)
  momo: {
    key: 'momo',
    name: 'Ví MoMo',
    color: '#c026d3', // MoMo Magenta / Fuchsia Violet
    lightColor: '#c026d3',
    darkColor: '#f0abfc',
    gradient: 'from-fuchsia-600 via-pink-600 to-purple-600',
    glow: 'rgba(192, 38, 211, 0.55)',
    glowShadow: 'rgba(192, 38, 211, 0.35)',
    bgLight: 'rgba(250, 232, 255, 0.85)',
    bgDark: 'rgba(74, 4, 78, 0.75)',
    borderLight: 'rgba(232, 121, 249, 0.65)',
    borderDark: 'rgba(232, 121, 249, 0.45)',
  },

  // 4. Phân hệ Giải Pháp Thanh Toán Số: Finviet / ECO (Xanh Ngọc)
  finviet: {
    key: 'finviet',
    name: 'Finviet',
    color: '#059669', // Emerald Jade Green
    lightColor: '#059669',
    darkColor: '#34d399',
    gradient: 'from-emerald-500 via-teal-600 to-green-600',
    glow: 'rgba(5, 150, 105, 0.55)',
    glowShadow: 'rgba(5, 150, 105, 0.35)',
    bgLight: 'rgba(209, 250, 229, 0.85)',
    bgDark: 'rgba(6, 78, 59, 0.75)',
    borderLight: 'rgba(52, 211, 153, 0.65)',
    borderDark: 'rgba(52, 211, 153, 0.45)',
  },
  eco: {
    key: 'eco',
    name: 'ECO Pay / Finviet',
    color: '#0d9488', // Teal Jade
    lightColor: '#0d9488',
    darkColor: '#2dd4bf',
    gradient: 'from-teal-500 via-emerald-600 to-cyan-600',
    glow: 'rgba(13, 148, 136, 0.55)',
    glowShadow: 'rgba(13, 148, 136, 0.35)',
    bgLight: 'rgba(204, 251, 241, 0.85)',
    bgDark: 'rgba(19, 78, 74, 0.75)',
    borderLight: 'rgba(45, 212, 191, 0.65)',
    borderDark: 'rgba(45, 212, 191, 0.45)',
  },

  // 5. Nền Tảng Di Chuyển & Đa Dịch Vụ: Be Group (Vàng Công Nghệ)
  begroup: {
    key: 'begroup',
    name: 'Be Group',
    color: '#f59e0b', // Amber / Gold
    lightColor: '#d97706',
    darkColor: '#fbbf24',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.55)',
    glowShadow: 'rgba(245, 158, 11, 0.35)',
    bgLight: 'rgba(254, 243, 199, 0.85)',
    bgDark: 'rgba(69, 26, 3, 0.75)',
    borderLight: 'rgba(251, 191, 36, 0.65)',
    borderDark: 'rgba(251, 191, 36, 0.45)',
  },

  // 6. Ứng Dụng Đa Dịch Vụ: Grab (Xanh Lá Siêu Ứng Dụng)
  grab: {
    key: 'grab',
    name: 'Grab',
    color: '#10b981', // Grab Emerald Green
    lightColor: '#059669',
    darkColor: '#34d399',
    gradient: 'from-emerald-500 via-green-600 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.55)',
    glowShadow: 'rgba(16, 185, 129, 0.35)',
    bgLight: 'rgba(209, 250, 229, 0.85)',
    bgDark: 'rgba(6, 78, 59, 0.75)',
    borderLight: 'rgba(52, 211, 153, 0.65)',
    borderDark: 'rgba(52, 211, 153, 0.45)',
  },

  // 7. Ngân Hàng & Tài Chính: Techcombank (Đỏ Tài Chính)
  techcombank: {
    key: 'techcombank',
    name: 'Techcombank',
    color: '#dc2626',
    lightColor: '#dc2626',
    darkColor: '#f87171',
    gradient: 'from-red-600 via-rose-600 to-red-700',
    glow: 'rgba(220, 38, 38, 0.55)',
    glowShadow: 'rgba(220, 38, 38, 0.35)',
    bgLight: 'rgba(254, 226, 226, 0.85)',
    bgDark: 'rgba(69, 10, 10, 0.75)',
    borderLight: 'rgba(248, 113, 113, 0.65)',
    borderDark: 'rgba(248, 113, 113, 0.45)',
  },

  // 8. Ngân Hàng Tiên Phong Số: TPBank (Tím Hoàng Gia)
  tpbank: {
    key: 'tpbank',
    name: 'TPBank',
    color: '#7c3aed',
    lightColor: '#7c3aed',
    darkColor: '#a78bfa',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    glow: 'rgba(124, 58, 237, 0.55)',
    glowShadow: 'rgba(124, 58, 237, 0.35)',
    bgLight: 'rgba(243, 232, 255, 0.85)',
    bgDark: 'rgba(46, 16, 101, 0.75)',
    borderLight: 'rgba(167, 139, 250, 0.65)',
    borderDark: 'rgba(167, 139, 250, 0.45)',
  },
};

/**
 * Tự động phân tích chuỗi văn bản (Tên công ty, phân hệ, danh mục, từ khóa) để tìm cụm chủ đề phù hợp
 */
export function getCategoryTheme(keywordOrBrand?: string): CategoryThemeMeta {
  if (!keywordOrBrand) {
    return {
      key: 'default',
      name: 'Default',
      color: '#06b6d4',
      lightColor: '#0891b2',
      darkColor: '#22d3ee',
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.5)',
      glowShadow: 'rgba(6, 182, 212, 0.3)',
      bgLight: 'rgba(207, 250, 254, 0.85)',
      bgDark: 'rgba(8, 51, 68, 0.75)',
      borderLight: 'rgba(34, 211, 238, 0.65)',
      borderDark: 'rgba(34, 211, 238, 0.45)',
    };
  }

  const raw = keywordOrBrand.toLowerCase().trim();

  // 1. Khớp Mobifone
  if (raw.includes('mobifone') || raw.includes('viễn thông') || raw.includes('telecom')) {
    return CATEGORY_THEMES.mobifone;
  }

  // 2. Khớp VED / Shopee / Garena
  if (raw.includes('ved') || raw.includes('shopee') || raw.includes('garena') || raw.includes('vietnam esports') || raw.includes('e-commerce') || raw.includes('thương mại')) {
    if (raw.includes('garena')) return CATEGORY_THEMES.garena;
    if (raw.includes('shopee')) return CATEGORY_THEMES.shopee;
    return CATEGORY_THEMES.ved;
  }

  // 3. Khớp Ví MoMo
  if (raw.includes('momo') || raw.includes('ví momo') || raw.includes('fintech') || raw.includes('m-service')) {
    return CATEGORY_THEMES.momo;
  }

  // 4. Khớp Finviet / ECO
  if (raw.includes('finviet') || raw.includes('eco') || raw.includes('ecopay') || raw.includes('thanh toán số') || raw.includes('payment')) {
    if (raw.includes('eco')) return CATEGORY_THEMES.eco;
    return CATEGORY_THEMES.finviet;
  }

  // 5. Khớp Be Group
  if (raw.includes('be group') || raw.includes('be ') || raw.includes('bego')) {
    return CATEGORY_THEMES.begroup;
  }

  // 6. Khớp Grab
  if (raw.includes('grab')) {
    return CATEGORY_THEMES.grab;
  }

  // 7. Khớp Techcombank
  if (raw.includes('techcombank') || raw.includes('tcb')) {
    return CATEGORY_THEMES.techcombank;
  }

  // 8. Khớp TPBank
  if (raw.includes('tpbank') || raw.includes('tpb')) {
    return CATEGORY_THEMES.tpbank;
  }

  // Fallback
  return {
    key: 'general',
    name: 'Chung',
    color: '#06b6d4',
    lightColor: '#0891b2',
    darkColor: '#22d3ee',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6, 182, 212, 0.5)',
    glowShadow: 'rgba(6, 182, 212, 0.3)',
    bgLight: 'rgba(207, 250, 254, 0.85)',
    bgDark: 'rgba(8, 51, 68, 0.75)',
    borderLight: 'rgba(34, 211, 238, 0.65)',
    borderDark: 'rgba(34, 211, 238, 0.45)',
  };
}
