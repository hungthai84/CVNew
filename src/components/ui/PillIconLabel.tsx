'use client';

import React from 'react';
import { Users, MessageSquare, Briefcase, Video, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PillIconName = 'users' | 'chat' | 'briefcase' | 'video';
export type PillColorScheme = 'emerald' | 'indigo' | 'violet' | 'rose' | 'amber' | 'teal';
export type PillVariant = 'soft' | 'solid' | 'outline';
export type PillIconType = 'solid' | 'lucide';

export interface PillIconLabelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Nội dung nhãn văn bản hiển thị
   * @default "Giao Tiếp và Làm Việc"
   */
  label?: string;
  /**
   * Tên biểu tượng (hỗ trợ users, chat, briefcase, video)
   * @default "users"
   */
  iconName?: PillIconName;
  /**
   * Kiểu hiển thị icon: 'solid' (SVG Solid fill-current) hoặc 'lucide' (vector line Lucide)
   * @default "solid"
   */
  iconType?: PillIconType;
  /**
   * Hệ màu sắc của Pill
   * @default "emerald"
   */
  colorScheme?: PillColorScheme;
  /**
   * Phong cách hiển thị (soft, solid, outline)
   * @default "soft"
   */
  variant?: PillVariant;
  /**
   * Tùy chọn truyền custom icon thay thế nếu muốn
   */
  customIcon?: React.ReactNode;
  /**
   * ClassName tùy biến ghi đè style nếu cần
   */
  className?: string;
  /**
   * Sự kiện khi người dùng click vào Pill
   */
  onClick?: () => void;
}

// Bảng màu cho từng biến thể variant và colorScheme
const COLOR_STYLES: Record<PillVariant, Record<PillColorScheme, string>> = {
  soft: {
    emerald:
      'bg-emerald-50/90 text-emerald-700 border border-emerald-200/90 hover:bg-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60 dark:hover:bg-emerald-900/50 dark:hover:border-emerald-700/80 shadow-sm shadow-emerald-500/5',
    indigo:
      'bg-indigo-50/90 text-indigo-700 border border-indigo-200/90 hover:bg-indigo-100 hover:border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60 dark:hover:bg-indigo-900/50 dark:hover:border-indigo-700/80 shadow-sm shadow-indigo-500/5',
    violet:
      'bg-violet-50/90 text-violet-700 border border-violet-200/90 hover:bg-violet-100 hover:border-violet-300 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/60 dark:hover:bg-violet-900/50 dark:hover:border-violet-700/80 shadow-sm shadow-violet-500/5',
    rose:
      'bg-rose-50/90 text-rose-700 border border-rose-200/90 hover:bg-rose-100 hover:border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60 dark:hover:bg-rose-900/50 dark:hover:border-rose-700/80 shadow-sm shadow-rose-500/5',
    amber:
      'bg-amber-50/90 text-amber-800 border border-amber-200/90 hover:bg-amber-100 hover:border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60 dark:hover:bg-amber-900/50 dark:hover:border-amber-700/80 shadow-sm shadow-amber-500/5',
    teal:
      'bg-teal-50/90 text-teal-700 border border-teal-200/90 hover:bg-teal-100 hover:border-teal-300 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/60 dark:hover:bg-teal-900/50 dark:hover:border-teal-700/80 shadow-sm shadow-teal-500/5',
  },
  solid: {
    emerald:
      'bg-emerald-600 text-white border border-emerald-500 hover:bg-emerald-500 dark:bg-emerald-600 dark:border-emerald-500 dark:hover:bg-emerald-500 shadow-md shadow-emerald-600/25',
    indigo:
      'bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-500 dark:bg-indigo-600 dark:border-indigo-500 dark:hover:bg-indigo-500 shadow-md shadow-indigo-600/25',
    violet:
      'bg-violet-600 text-white border border-violet-500 hover:bg-violet-500 dark:bg-violet-600 dark:border-violet-500 dark:hover:bg-violet-500 shadow-md shadow-violet-600/25',
    rose:
      'bg-rose-600 text-white border border-rose-500 hover:bg-rose-500 dark:bg-rose-600 dark:border-rose-500 dark:hover:bg-rose-500 shadow-md shadow-rose-600/25',
    amber:
      'bg-amber-600 text-white border border-amber-500 hover:bg-amber-500 dark:bg-amber-600 dark:border-amber-500 dark:hover:bg-amber-500 shadow-md shadow-amber-600/25',
    teal:
      'bg-teal-600 text-white border border-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:border-teal-500 dark:hover:bg-teal-500 shadow-md shadow-teal-600/25',
  },
  outline: {
    emerald:
      'bg-transparent text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-950/40',
    indigo:
      'bg-transparent text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-950/40',
    violet:
      'bg-transparent text-violet-600 border-2 border-violet-500 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-violet-950/40',
    rose:
      'bg-transparent text-rose-600 border-2 border-rose-500 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-400 dark:hover:bg-rose-950/40',
    amber:
      'bg-transparent text-amber-600 border-2 border-amber-500 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-950/40',
    teal:
      'bg-transparent text-teal-600 border-2 border-teal-500 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-950/40',
  },
};

/**
 * Solid SVG Icons sắc nét, kích thước 24px, dùng trực tiếp fill="currentColor"
 */
const SolidIcons: Record<PillIconName, React.FC<{ className?: string }>> = {
  users: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  chat: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </svg>
  ),
  briefcase: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  ),
  video: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  ),
};

/**
 * Lucide outline icons
 */
const LucideIconMap: Record<PillIconName, LucideIcon> = {
  users: Users,
  chat: MessageSquare,
  briefcase: Briefcase,
  video: Video,
};

/**
 * Component PillIconLabel
 * Đáp ứng đầy đủ quy cách:
 * - Font chữ Google Font "Play" (`font-play font-['Play'] font-bold`)
 * - Full Pill (`rounded-full`), căn giữa `inline-flex items-center`
 * - Icon kích thước 24px (`w-6 h-6 shrink-0 fill-current`)
 * - Gap 10px (`gap-2.5`), Padding ngang 24px (`px-6`), Padding dọc 10px (`py-2.5`)
 * - Icon và chữ luôn đồng nhất một màu
 * - Hiệu ứng hover mượt mà (`hover:-translate-y-0.5 group-hover:scale-105 transition-all duration-300`)
 * - Hỗ trợ đầy đủ Tailwind Dark Mode (`dark:` prefix)
 */
export const PillIconLabel: React.FC<PillIconLabelProps> = ({
  label = 'Giao Tiếp và Làm Việc',
  iconName = 'users',
  iconType = 'solid',
  colorScheme = 'emerald',
  variant = 'soft',
  customIcon,
  className,
  onClick,
  ...props
}) => {
  const styleClasses = COLOR_STYLES[variant]?.[colorScheme] || COLOR_STYLES.soft.emerald;

  // Render icon tương ứng (Solid SVG hoặc Lucide Icon)
  const renderIcon = () => {
    if (customIcon) {
      return (
        <span className="w-6 h-6 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {customIcon}
        </span>
      );
    }

    if (iconType === 'lucide') {
      const LucideComp = LucideIconMap[iconName] || LucideIconMap.users;
      return (
        <LucideComp
          className="w-6 h-6 shrink-0 stroke-[2.2] transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        />
      );
    }

    const SolidComp = SolidIcons[iconName] || SolidIcons.users;
    return (
      <SolidComp
        className="w-6 h-6 shrink-0 fill-current transition-transform duration-300 group-hover:scale-105"
      />
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Quy cách kích thước & khoảng cách
        'inline-flex items-center justify-center rounded-full px-6 py-2.5 gap-2.5',
        // Font chữ Google Font "Play"
        "font-['Play'] font-play font-bold text-base leading-none tracking-normal select-none",
        // Tương tác & Animation mượt mà
        'group cursor-pointer transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        // Style màu sắc đồng bộ chữ và icon
        styleClasses,
        className
      )}
      {...props}
    >
      {/* Icon 24px (w-6 h-6 shrink-0) */}
      {renderIcon()}

      {/* Nhãn văn bản (đồng màu với icon) */}
      <span className="truncate transition-colors duration-300">{label}</span>
    </button>
  );
};

export default PillIconLabel;
