'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import {
  Home03Icon,
  Menu01Icon,
  Briefcase01Icon,
  UserIcon,
  ChartBarLineIcon,
  Globe02Icon,
  GlobalIcon,
  ShieldCheckIcon,
  Mortarboard01Icon,
  Calendar01Icon,
  Award01Icon,
  Clock01Icon,
  TrophyIcon,
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMute01Icon,
  Layers01Icon,
  Target01Icon,
  SparklesIcon,
  StarIcon,
  UserCheck01Icon,
  Settings02Icon,
  Settings05Icon,
  FilterIcon,
  Call02Icon,
  Mail01Icon,
  HeartIcon,
  Message01Icon,
  BotMessageSquareIcon,
  ZapIcon,
  PaintbrushIcon,
  Download01Icon,
  Upload01Icon,
  RefreshIcon,
  Search01Icon,
  PencilEdit02Icon,
  BotIcon,
  Notification01Icon,
  Camera01Icon,
  Image01Icon,
  ClapperboardIcon,
  Link01Icon,
  Maximize01Icon,
  Minimize01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Sun03Icon,
  Moon02Icon,
  Location01Icon,
  SunCloud01Icon,
  BrainIcon,
  Compass01Icon,
  Database01Icon,
  CpuIcon,
  ShieldAlertIcon,
  Copy01Icon,
  EyeIcon,
  EyeOffIcon,
  Share01Icon,
  QuoteDownIcon,
  ThumbsUpIcon,
} from '@hugeicons/core-free-icons';
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
  category?: string;
  sparkle?: boolean;
  springBounce?: boolean;
  rotateOnClick?: boolean;
  isRotating?: boolean;
  framed?: boolean;
  frameSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Bảng ánh xạ các alias của website sang Hugeicons chính thức
 */
const HUGEICONS_MAP: Record<string, any> = {
  // 1. Navigation & Core Pages
  home: Home03Icon,
  'home-03': Home03Icon,
  menu: Menu01Icon,
  'menu-01': Menu01Icon,
  bars: Menu01Icon,
  'bars-3': Menu01Icon,
  dashboard: Home03Icon,
  'layout-dashboard': Home03Icon,
  layoutdashboard: Home03Icon,
  briefcase: Briefcase01Icon,
  'briefcase-business': Briefcase01Icon,
  corp: Briefcase01Icon,
  hrm: UserIcon,
  chart: ChartBarLineIcon,
  'chart-no-axes-combined': ChartBarLineIcon,
  erp: ChartBarLineIcon,
  analytics: ChartBarLineIcon,
  'trend-up': ChartBarLineIcon,
  trending: ChartBarLineIcon,
  'trend-down': ChartBarLineIcon,
  globe: Globe02Icon,
  global: GlobalIcon,
  standard: ShieldCheckIcon,
  all: Home03Icon,
  graduation: Mortarboard01Icon,
  'graduation-cap': Mortarboard01Icon,
  lms: Mortarboard01Icon,
  book: Mortarboard01Icon,
  'book-open': Mortarboard01Icon,
  calendar: Calendar01Icon,
  milestones: Award01Icon,
  milestone: Award01Icon,
  clock: Clock01Icon,
  trophy: TrophyIcon,
  award: Award01Icon,
  awards: TrophyIcon,
  play: PlayIcon,
  pause: PauseIcon,
  stop: Cancel01Icon,
  volume: VolumeHighIcon,
  'volume-2': VolumeHighIcon,
  'volume-x': VolumeMute01Icon,
  mute: VolumeMute01Icon,
  unmute: VolumeHighIcon,
  layers: Layers01Icon,
  target: Target01Icon,
  sparkles: SparklesIcon,
  star: StarIcon,
  user: UserIcon,
  users: UserIcon,
  'user-check': UserCheck01Icon,
  settings: Settings02Icon,
  'settings-02': Settings02Icon,
  'settings-05': Settings05Icon,
  cog: Settings02Icon,
  sliders: Settings05Icon,
  filter: FilterIcon,
  phone: Call02Icon,
  'phone-call': Call02Icon,
  call: Call02Icon,
  mail: Mail01Icon,
  'mail-01': Mail01Icon,
  email: Mail01Icon,
  heart: HeartIcon,
  chat: Message01Icon,
  'message-square': BotMessageSquareIcon,
  'message-circle': Message01Icon,
  bolt: ZapIcon,
  zap: ZapIcon,
  grid: Home03Icon,
  palette: PaintbrushIcon,
  paintbrush: PaintbrushIcon,
  download: Download01Icon,
  'download-01': Download01Icon,
  upload: Upload01Icon,
  'upload-01': Upload01Icon,
  refresh: RefreshIcon,
  sync: RefreshIcon,
  search: Search01Icon,
  'search-01': Search01Icon,
  edit: PencilEdit02Icon,
  'pencil-edit-02': PencilEdit02Icon,
  bot: BotIcon,
  ai: BotIcon,
  notification: Notification01Icon,
  'notification-01': Notification01Icon,
  bell: Notification01Icon,
  camera: Camera01Icon,
  image: Image01Icon,
  gallery: Image01Icon,
  clapperboard: ClapperboardIcon,
  video: ClapperboardIcon,
  link: Link01Icon,
  'link-01': Link01Icon,
  maximize: Maximize01Icon,
  'maximize-01': Maximize01Icon,
  minimize: Minimize01Icon,
  'minimize-01': Minimize01Icon,
  cancel: Cancel01Icon,
  'cancel-01': Cancel01Icon,
  close: Cancel01Icon,
  x: Cancel01Icon,
  check: CheckmarkCircle01Icon,
  'check-circle': CheckmarkCircle01Icon,
  arrowleft: ArrowLeft01Icon,
  'arrow-left': ArrowLeft01Icon,
  arrowright: ArrowRight01Icon,
  'arrow-right': ArrowRight01Icon,
  sun: Sun03Icon,
  'sun-03': Sun03Icon,
  moon: Moon02Icon,
  'moon-02': Moon02Icon,
  location: Location01Icon,
  'location-01': Location01Icon,
  weather: SunCloud01Icon,
  cloud: SunCloud01Icon,
  brain: BrainIcon,
  compass: Compass01Icon,
  database: Database01Icon,
  cpu: CpuIcon,
  shield: ShieldCheckIcon,
  'shield-alert': ShieldAlertIcon,
  copy: Copy01Icon,
  eye: EyeIcon,
  'eye-off': EyeOffIcon,
  share: Share01Icon,
  quote: QuoteDownIcon,
  thumbsup: ThumbsUpIcon,
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
  const hugeIconData = HUGEICONS_MAP[normKey] || HUGEICONS_MAP[normKey.replace(/-/g, '')] || SparklesIcon;

  const catTheme = category ? getCategoryTheme(category) : null;
  const computedColor = color || (catTheme ? catTheme.color : 'currentColor');

  const content = (
    <HugeiconsIcon
      icon={hugeIconData}
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
