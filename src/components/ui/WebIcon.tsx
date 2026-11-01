'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import * as HugeIconsAll from '@hugeicons/core-free-icons';
import { getCategoryTheme } from '@/utils/categoryTheme';
import { GlassmorphicIconFrame } from './GlassmorphicIconFrame';
import { cn } from '@/lib/utils';

export interface WebIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  strokeWidth?: number;
  category?: string; // Tự động áp dụng màu sắc tương ứng theo phân hệ (MobiFone, VED/Shopee, MoMo, Finviet...)
  sparkle?: boolean; // Hiệu ứng nhấp nháy cho SparklesIcon
  springBounce?: boolean; // Hiệu ứng nảy nhẹ tự nhiên khi rê chuột
  rotateOnClick?: boolean; // Hiệu ứng xoay nhẹ khi click nút làm mới
  isRotating?: boolean; // Trạng thái đang xoay
  framed?: boolean; // Bọc trong khung kính mờ Glassmorphic Glow Icon Frame
  frameSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Bảng ánh xạ các alias của website sang Hugeicons chính thức
 */
const HUGEICONS_MAP: Record<string, any> = {
  // 1. Navigation & Core Pages
  home: HugeIconsAll.Home03Icon,
  'home-03': HugeIconsAll.Home03Icon,
  menu: HugeIconsAll.Menu01Icon,
  'menu-01': HugeIconsAll.Menu01Icon,
  bars: HugeIconsAll.Menu01Icon,
  'bars-3': HugeIconsAll.Menu01Icon,
  dashboard: (HugeIconsAll as any).Grid02Icon || HugeIconsAll.Home03Icon,
  'layout-dashboard': (HugeIconsAll as any).Grid02Icon || HugeIconsAll.Home03Icon,
  layoutdashboard: (HugeIconsAll as any).Grid02Icon || HugeIconsAll.Home03Icon,
  briefcase: HugeIconsAll.Briefcase01Icon,
  'briefcase-business': HugeIconsAll.Briefcase01Icon,
  corp: HugeIconsAll.Briefcase01Icon,
  hrm: HugeIconsAll.UserIcon,
  chart: HugeIconsAll.ChartBarLineIcon,
  'chart-no-axes-combined': HugeIconsAll.ChartBarLineIcon,
  erp: HugeIconsAll.ChartBarLineIcon,
  analytics: HugeIconsAll.ChartBarLineIcon,
  'trend-up': HugeIconsAll.ChartBarLineIcon,
  trending: HugeIconsAll.ChartBarLineIcon,
  'trend-down': HugeIconsAll.ChartBarLineIcon,
  globe: HugeIconsAll.Globe02Icon,
  global: HugeIconsAll.GlobalIcon,
  standard: HugeIconsAll.ShieldCheckIcon,
  all: (HugeIconsAll as any).Grid02Icon || HugeIconsAll.Home03Icon,
  graduation: HugeIconsAll.Mortarboard01Icon,
  'graduation-cap': HugeIconsAll.Mortarboard01Icon,
  lms: HugeIconsAll.Mortarboard01Icon,
  book: HugeIconsAll.Mortarboard01Icon,
  'book-open': HugeIconsAll.Mortarboard01Icon,
  calendar: HugeIconsAll.Calendar01Icon,
  milestones: (HugeIconsAll as any).Flag01Icon || HugeIconsAll.Award01Icon,
  milestone: (HugeIconsAll as any).Flag01Icon || HugeIconsAll.Award01Icon,
  clock: HugeIconsAll.Clock01Icon,
  trophy: HugeIconsAll.TrophyIcon,
  award: HugeIconsAll.Award01Icon,
  awards: HugeIconsAll.TrophyIcon,
  play: HugeIconsAll.PlayIcon,
  pause: HugeIconsAll.PauseIcon,
  stop: (HugeIconsAll as any).StopIcon || HugeIconsAll.Cancel01Icon,
  volume: HugeIconsAll.VolumeHighIcon,
  'volume-2': HugeIconsAll.VolumeHighIcon,
  'volume-x': HugeIconsAll.VolumeMute01Icon,
  mute: HugeIconsAll.VolumeMute01Icon,
  unmute: HugeIconsAll.VolumeHighIcon,
  layers: HugeIconsAll.Layers01Icon,
  target: HugeIconsAll.Target01Icon,
  sparkles: HugeIconsAll.SparklesIcon,
  star: HugeIconsAll.StarIcon,
  user: HugeIconsAll.UserIcon,
  users: HugeIconsAll.UserIcon,
  'user-check': HugeIconsAll.UserCheck01Icon,
  settings: HugeIconsAll.Settings02Icon,
  'settings-02': HugeIconsAll.Settings02Icon,
  'settings-05': HugeIconsAll.Settings05Icon,
  cog: HugeIconsAll.Settings02Icon,
  sliders: HugeIconsAll.Settings05Icon,
  filter: HugeIconsAll.FilterIcon,
  phone: HugeIconsAll.Call02Icon,
  'phone-call': HugeIconsAll.Call02Icon,
  call: HugeIconsAll.Call02Icon,
  mail: HugeIconsAll.Mail01Icon,
  'mail-01': HugeIconsAll.Mail01Icon,
  email: HugeIconsAll.Mail01Icon,
  heart: HugeIconsAll.HeartIcon,
  chat: HugeIconsAll.Message01Icon,
  'message-square': HugeIconsAll.BotMessageSquareIcon,
  'message-circle': HugeIconsAll.Message01Icon,
  bolt: HugeIconsAll.ZapIcon,
  zap: HugeIconsAll.ZapIcon,
  grid: (HugeIconsAll as any).Grid02Icon || HugeIconsAll.Home03Icon,
  palette: HugeIconsAll.PaintbrushIcon,
  paintbrush: HugeIconsAll.PaintbrushIcon,
  download: HugeIconsAll.Download01Icon,
  'download-01': HugeIconsAll.Download01Icon,
  upload: HugeIconsAll.Upload01Icon,
  'upload-01': HugeIconsAll.Upload01Icon,
  refresh: HugeIconsAll.RefreshIcon,
  sync: HugeIconsAll.RefreshIcon,
  search: HugeIconsAll.Search01Icon,
  'search-01': HugeIconsAll.Search01Icon,
  edit: HugeIconsAll.PencilEdit02Icon,
  'pencil-edit-02': HugeIconsAll.PencilEdit02Icon,
  bot: HugeIconsAll.BotIcon,
  ai: HugeIconsAll.BotIcon,
  notification: HugeIconsAll.Notification01Icon,
  'notification-01': HugeIconsAll.Notification01Icon,
  bell: HugeIconsAll.Notification01Icon,
  camera: HugeIconsAll.Camera01Icon,
  image: HugeIconsAll.Image01Icon,
  gallery: HugeIconsAll.Image01Icon,
  clapperboard: HugeIconsAll.ClapperboardIcon,
  video: HugeIconsAll.ClapperboardIcon,
  link: HugeIconsAll.Link01Icon,
  'link-01': HugeIconsAll.Link01Icon,
  maximize: HugeIconsAll.Maximize01Icon,
  'maximize-01': HugeIconsAll.Maximize01Icon,
  minimize: HugeIconsAll.Minimize01Icon,
  'minimize-01': HugeIconsAll.Minimize01Icon,
  cancel: HugeIconsAll.Cancel01Icon,
  'cancel-01': HugeIconsAll.Cancel01Icon,
  close: HugeIconsAll.Cancel01Icon,
  x: HugeIconsAll.Cancel01Icon,
  check: HugeIconsAll.CheckmarkCircle01Icon,
  'check-circle': HugeIconsAll.CheckmarkCircle01Icon,
  arrowleft: HugeIconsAll.ArrowLeft01Icon,
  'arrow-left': HugeIconsAll.ArrowLeft01Icon,
  arrowright: HugeIconsAll.ArrowRight01Icon,
  'arrow-right': HugeIconsAll.ArrowRight01Icon,
  sun: HugeIconsAll.Sun03Icon,
  'sun-03': HugeIconsAll.Sun03Icon,
  moon: HugeIconsAll.Moon02Icon,
  'moon-02': HugeIconsAll.Moon02Icon,
  location: HugeIconsAll.Location01Icon,
  'location-01': HugeIconsAll.Location01Icon,
  weather: HugeIconsAll.SunCloud01Icon,
  cloud: HugeIconsAll.SunCloud01Icon,
  brain: HugeIconsAll.BrainIcon,
  compass: HugeIconsAll.Compass01Icon,
  database: HugeIconsAll.Database01Icon,
  cpu: HugeIconsAll.CpuIcon,
  shield: HugeIconsAll.ShieldCheckIcon,
  'shield-alert': HugeIconsAll.ShieldAlertIcon,
  copy: HugeIconsAll.Copy01Icon,
  eye: HugeIconsAll.EyeIcon,
  'eye-off': HugeIconsAll.EyeOffIcon,
  share: HugeIconsAll.Share01Icon,
  quote: HugeIconsAll.QuoteDownIcon,
  thumbsup: HugeIconsAll.ThumbsUpIcon,
};

export const WebIcon: React.FC<WebIconProps> = ({
  name,
  className = '',
  size = 20,
  color,
  strokeWidth = 1.75,
  animateOnHover = true,
  animateOnTap = true,
  category,
  sparkle = false,
  springBounce = false,
  rotateOnClick = false,
  isRotating = false,
  framed = false,
  frameSize = 'md',
  style,
  onClick,
}) => {
  const normKey = (name || '').toLowerCase().trim().replace(/[_\s]/g, '-');
  const hugeIconData = HUGEICONS_MAP[normKey] || HUGEICONS_MAP[normKey.replace(/-/g, '')];

  // Áp dụng màu tự động theo category nếu có
  const catTheme = category ? getCategoryTheme(category) : null;
  const computedColor = color || (catTheme ? catTheme.color : 'currentColor');

  const content = hugeIconData ? (
    <HugeiconsIcon
      icon={hugeIconData}
      size={size}
      color={computedColor}
      strokeWidth={strokeWidth}
      className={cn('shrink-0 transition-transform duration-200', className)}
    />
  ) : (
    // Fallback sang biểu tượng default nếu alias không có
    <HugeiconsIcon
      icon={HugeIconsAll.SparklesIcon}
      size={size}
      color={computedColor}
      strokeWidth={strokeWidth}
      className={cn('shrink-0 transition-transform duration-200', className)}
    />
  );

  const wrapped = (
    <motion.span
      className={cn('inline-flex items-center justify-center shrink-0 select-none', className)}
      style={style}
      onClick={onClick}
      whileHover={
        animateOnHover
          ? {
              scale: 1.1,
              rotate: springBounce ? [0, -6, 6, 0] : 0,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : undefined
      }
      whileTap={animateOnTap ? { scale: 0.92, transition: { duration: 0.1 } } : undefined}
      animate={
        isRotating
          ? { rotate: 360 }
          : sparkle
          ? { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }
          : undefined
      }
      transition={
        isRotating
          ? { repeat: Infinity, duration: 1.2, ease: 'linear' }
          : sparkle
          ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
          : undefined
      }
    >
      {content}
    </motion.span>
  );

  if (framed && catTheme) {
    return (
      <GlassmorphicIconFrame color={catTheme.color} glowColor={catTheme.glow} size={frameSize}>
        {wrapped}
      </GlassmorphicIconFrame>
    );
  }

  return wrapped;
};

export default WebIcon;
