'use client';

import React, { useState } from 'react';
import * as HeroOutlineIcons from '@heroicons/react/24/outline';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { getCategoryTheme } from '@/utils/categoryTheme';
import { GlassmorphicIconFrame } from './GlassmorphicIconFrame';

export interface WebIconProps {
  name: string;
  className?: string;
  animateOnHover?: boolean;
  strokeWidth?: number;
  category?: string; // Tự động áp dụng màu sắc tương ứng theo phân hệ (MobiFone, VED/Shopee, MoMo, Finviet...)
  sparkle?: boolean; // Hiệu ứng nhấp nháy cho SparklesIcon
  springBounce?: boolean; // Hiệu ứng nảy nhẹ tự nhiên khi rê chuột
  rotateOnClick?: boolean; // Hiệu ứng xoay nhẹ khi click nút làm mới
  isRotating?: boolean; // Trạng thái đang xoay
  framed?: boolean; // Bọc trong khung tròn kính mờ Glassmorphic Glow Icon Frame
  frameSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Bảng ánh xạ các alias đặc thù toàn bộ website sang tên icon chính thức trong thư viện @heroicons/react/24/outline
 */
const HEROICONS_ALIAS_MAP: Record<string, string> = {
  // Navigation & Core Pages
  home: 'HomeIcon',
  menu: 'Bars3Icon',
  bars: 'Bars3Icon',
  'bars-3': 'Bars3Icon',
  layoutdashboard: 'Squares2X2Icon',
  'layout-dashboard': 'Squares2X2Icon',
  panelstopleft: 'ViewColumnsIcon',
  'panels-top-left': 'ViewColumnsIcon',
  briefcase: 'BriefcaseIcon',
  'briefcase-business': 'BriefcaseIcon',
  briefcasebusiness: 'BriefcaseIcon',
  corp: 'BriefcaseIcon',
  hrm: 'UsersIcon',
  chart: 'ChartBarIcon',
  chartnoaxescombined: 'ChartBarIcon',
  'chart-no-axes-combined': 'ChartBarIcon',
  erp: 'ChartBarSquareIcon',
  analytics: 'ChartPieIcon',
  'trend-up': 'ArrowTrendingUpIcon',
  trending: 'ArrowTrendingUpIcon',
  'trend-down': 'ArrowTrendingDownIcon',
  upgrade: 'ArrowUpRightIcon',
  bi: 'ChartPieIcon',
  globe: 'GlobeAltIcon',
  standard: 'ShieldCheckIcon',
  all: 'Squares2X2Icon',
  graduation: 'AcademicCapIcon',
  'graduation-cap': 'AcademicCapIcon',
  lms: 'AcademicCapIcon',
  book: 'BookOpenIcon',
  'book-open': 'BookOpenIcon',
  bookopen: 'BookOpenIcon',
  books: 'BookmarkSquareIcon',
  calendar: 'CalendarIcon',
  milestones: 'FlagIcon',
  milestone: 'FlagIcon',
  clock: 'ClockIcon',
  trophy: 'TrophyIcon',
  award: 'SparklesIcon',
  awards: 'TrophyIcon',
  play: 'PlayIcon',
  pause: 'PauseIcon',
  stop: 'StopIcon',
  square: 'StopIcon',
  volume: 'SpeakerWaveIcon',
  'volume-2': 'SpeakerWaveIcon',
  'volume-x': 'SpeakerXMarkIcon',
  volumex: 'SpeakerXMarkIcon',
  mute: 'SpeakerXMarkIcon',
  unmute: 'SpeakerWaveIcon',
  music: 'MusicalNoteIcon',
  layers: 'Square3Stack3DIcon',
  target: 'AdjustmentsHorizontalIcon',
  sparkles: 'SparklesIcon',
  star: 'StarIcon',
  user: 'UserIcon',
  users: 'UsersIcon',
  'user-check': 'CheckBadgeIcon',
  settings: 'Cog6ToothIcon',
  cog: 'Cog6ToothIcon',
  sliders: 'AdjustmentsHorizontalIcon',
  filter: 'FunnelIcon',
  phone: 'PhoneIcon',
  'phone-call': 'PhoneIcon',
  mail: 'EnvelopeIcon',
  heart: 'HeartIcon',
  chat: 'ChatBubbleLeftRightIcon',
  'message-square': 'ChatBubbleLeftRightIcon',
  'message-circle': 'ChatBubbleOvalLeftEllipsisIcon',
  bolt: 'BoltIcon',
  zap: 'BoltIcon',
  grid: 'Squares2X2Icon',
  'layout-grid': 'Squares2X2Icon',
  palette: 'SwatchIcon',
  download: 'ArrowDownTrayIcon',
  save: 'BookmarkIcon',
  refresh: 'ArrowPathIcon',
  'refresh-cw': 'ArrowPathIcon',
  'rotate-cw': 'ArrowPathIcon',
  sync: 'ArrowPathIcon',
  check: 'CheckIcon',
  'check-circle': 'CheckCircleIcon',
  'check-circle2': 'CheckCircleIcon',
  x: 'XMarkIcon',
  close: 'XMarkIcon',
  'chevron-left': 'ChevronLeftIcon',
  'chevron-right': 'ChevronRightIcon',
  'chevron-up': 'ChevronUpIcon',
  'chevron-down': 'ChevronDownIcon',
  'arrow-left': 'ArrowLeftIcon',
  'arrow-right': 'ArrowRightIcon',
  'arrow-up': 'ArrowUpIcon',
  'arrow-down': 'ArrowDownIcon',
  'external-link': 'ArrowTopRightOnSquareIcon',
  search: 'MagnifyingGlassIcon',
  moon: 'MoonIcon',
  sun: 'SunIcon',
  eye: 'EyeIcon',
  'eye-off': 'EyeSlashIcon',
  copy: 'DocumentDuplicateIcon',
  share: 'ShareIcon',
  'share-2': 'ShareIcon',
  cpu: 'CpuChipIcon',
  bot: 'CpuChipIcon',
  shield: 'ShieldCheckIcon',
  'shield-check': 'ShieldCheckIcon',
  gem: 'SparklesIcon',
  rocket: 'RocketLaunchIcon',
  monitor: 'ComputerDesktopIcon',
  smartphone: 'DevicePhoneMobileIcon',
  tablet: 'DeviceTabletIcon',
  laptop: 'ComputerDesktopIcon',
  code: 'CodeBracketIcon',
  terminal: 'CommandLineIcon',
  database: 'CircleStackIcon',
  server: 'ServerIcon',
  cloud: 'CloudIcon',
  lock: 'LockClosedIcon',
  unlock: 'LockOpenIcon',
  key: 'KeyIcon',
  flag: 'FlagIcon',
  pin: 'MapPinIcon',
  bookmark: 'BookmarkIcon',
  tag: 'TagIcon',
  tags: 'TagIcon',
  folder: 'FolderIcon',
  'folder-open': 'FolderOpenIcon',
  file: 'DocumentTextIcon',
  'file-text': 'DocumentTextIcon',
  image: 'PhotoIcon',
  video: 'VideoCameraIcon',
  mic: 'MicrophoneIcon',
  'mic-off': 'MicrophoneIcon',
  wifi: 'WifiIcon',
  'wifi-off': 'WifiIcon',
  info: 'InformationCircleIcon',
  help: 'QuestionMarkCircleIcon',
  'help-circle': 'QuestionMarkCircleIcon',
  scale: 'ScaleIcon',
  bell: 'BellIcon',
  'shopping-cart': 'ShoppingCartIcon',
  wallet: 'WalletIcon',
  factory: 'BuildingOfficeIcon',
  building: 'BuildingOfficeIcon',
  radio: 'SignalIcon',
};

/**
 * Tự động chuyển đổi tên bất kỳ sang component icon @heroicons/react/24/outline
 */
function resolveHeroIcon(rawName: string): React.ComponentType<any> {
  if (!rawName) return HeroOutlineIcons.SparklesIcon;
  const clean = rawName.trim().toLowerCase();

  // 1. Tra trong bảng alias Heroicons
  if (HEROICONS_ALIAS_MAP[clean]) {
    const iconName = HEROICONS_ALIAS_MAP[clean];
    const component = (HeroOutlineIcons as Record<string, any>)[iconName];
    if (component) return component;
  }

  // 2. Chuyển kebab-case / snake-case sang PascalCase kèm hậu tố 'Icon'
  const pascal = clean
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const pascalWithIcon = pascal.endsWith('Icon') ? pascal : `${pascal}Icon`;

  if ((HeroOutlineIcons as Record<string, any>)[pascalWithIcon]) {
    return (HeroOutlineIcons as Record<string, any>)[pascalWithIcon];
  }

  if ((HeroOutlineIcons as Record<string, any>)[pascal]) {
    return (HeroOutlineIcons as Record<string, any>)[pascal];
  }

  // 3. Tra exact name
  if ((HeroOutlineIcons as Record<string, any>)[rawName]) {
    return (HeroOutlineIcons as Record<string, any>)[rawName];
  }
  const rawWithIcon = rawName.endsWith('Icon') ? rawName : `${rawName}Icon`;
  if ((HeroOutlineIcons as Record<string, any>)[rawWithIcon]) {
    return (HeroOutlineIcons as Record<string, any>)[rawWithIcon];
  }

  // 4. Fallback an toàn sang Lucide nếu là icon chuyên biệt chỉ có ở Lucide
  const lucidePascal = pascal.replace(/Icon$/, '');
  if ((LucideIcons as Record<string, any>)[lucidePascal]) {
    return (LucideIcons as Record<string, any>)[lucidePascal];
  }

  return HeroOutlineIcons.SparklesIcon;
}

/**
 * Toàn bộ icon website được cung cấp 100% bằng thư viện @heroicons/react
 * Tích hợp Hiệu Ứng Vi Tương Tác Chuyển Động (Micro-Animated Icon Physics):
 * - Xoay nhẹ khi click nút làm mới (ArrowPathIcon / refresh)
 * - Nhấp nháy lấp lánh cho SparklesIcon (AI / Highlight)
 * - Nảy nhẹ tự nhiên khi rê chuột (Spring Bounce)
 * - Đổi màu năng động theo từng cụm chủ đề / phân hệ (Dynamic Accent Hue)
 * - Bọc khung kính mờ hào quang phản chiếu (Glassmorphic Glow Icon Frame)
 */
export const WebIcon: React.FC<WebIconProps> = ({
  name,
  className = 'w-4 h-4',
  strokeWidth = 1.85,
  category,
  sparkle,
  springBounce,
  rotateOnClick,
  isRotating,
  framed = false,
  frameSize = 'sm',
  style,
  onClick,
}) => {
  const [localRotating, setLocalRotating] = useState<boolean>(false);
  const cleanName = (name || '').toLowerCase().trim();

  // 1. Nhận diện màu sắc năng động theo phân hệ (MobiFone, VED/Shopee, MoMo, Finviet...)
  const categoryTheme = category ? getCategoryTheme(category) : undefined;
  const dynamicColor = categoryTheme ? categoryTheme.color : undefined;

  // 2. Vi tương tác: Nhấp nháy lấp lánh cho SparklesIcon
  const isSparkle = sparkle || cleanName.includes('sparkle') || cleanName === 'award' || cleanName === 'gem';

  // 3. Vi tương tác: Xoay nhẹ khi click nút làm mới (ArrowPathIcon / refresh)
  const isRefreshIcon =
    cleanName === 'refresh' ||
    cleanName === 'refresh-cw' ||
    cleanName === 'rotate-cw' ||
    cleanName === 'sync' ||
    cleanName === 'arrowpath';

  const shouldRotate = isRotating || localRotating;

  const handleClick = (e: React.MouseEvent) => {
    if (rotateOnClick || isRefreshIcon) {
      setLocalRotating(true);
      setTimeout(() => setLocalRotating(false), 650);
    }
    if (onClick) onClick(e);
  };

  const IconComponent = resolveHeroIcon(name);

  // Xây dựng class name tổng hợp
  const iconClasses = [
    className,
    className.includes('shrink-') ? '' : 'shrink-0',
    'web-icon-solid',
    isSparkle ? 'icon-sparkle-twinkle' : '',
    springBounce ? 'icon-spring-bounce' : '',
    shouldRotate ? 'icon-rotate-click' : '',
    isRefreshIcon && !shouldRotate ? 'hover:rotate-180 transition-transform duration-500 cursor-pointer' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties = {
    ...style,
    color: dynamicColor || style?.color,
  };

  const renderedIcon = (
    <IconComponent
      className={iconClasses}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      style={mergedStyle}
      onClick={!framed ? handleClick : undefined}
    />
  );

  // 4. Bọc Khung Tròn Kính Mờ Hào Quang Siêu Thực nếu có framed
  if (framed) {
    return (
      <GlassmorphicIconFrame
        size={frameSize}
        color={dynamicColor || '#06b6d4'}
        glowColor={categoryTheme?.glow}
        springBounce={springBounce}
        onClick={handleClick}
      >
        {renderedIcon}
      </GlassmorphicIconFrame>
    );
  }

  return renderedIcon;
};
