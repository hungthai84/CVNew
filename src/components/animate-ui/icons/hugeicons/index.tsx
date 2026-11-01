'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Home03Icon,
  Search01Icon,
  Menu01Icon,
  PencilEdit02Icon,
  UserIcon,
  UserCheck01Icon,
  Mail01Icon,
  Call02Icon,
  Calendar01Icon,
  Clock01Icon,
  Mortarboard01Icon,
  Award01Icon,
  Briefcase01Icon,
  Target01Icon,
  FolderOpenIcon,
  Folder01Icon,
  Settings02Icon,
  Settings05Icon,
  ChartBarLineIcon,
  TrophyIcon,
  LightbulbIcon,
  BotIcon,
  BotMessageSquareIcon,
  Message01Icon,
  Notification01Icon,
  StarIcon,
  Camera01Icon,
  Image01Icon,
  ClapperboardIcon,
  Link01Icon,
  Download01Icon,
  Upload01Icon,
  Maximize01Icon,
  Minimize01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PaintbrushIcon,
  Sun03Icon,
  Moon02Icon,
  Location01Icon,
  SunCloud01Icon,
  VolumeHighIcon,
  VolumeMute01Icon,
  PlayIcon,
  PauseIcon,
  Share01Icon,
  Bookmark01Icon,
  Globe02Icon,
  GlobalIcon,
  BrainIcon,
  Compass01Icon,
  SparklesIcon,
  Database01Icon,
  CpuIcon,
  Layers01Icon,
  ShieldCheckIcon,
  ShieldAlertIcon,
  ZapIcon,
  EyeIcon,
  EyeOffIcon,
  Copy01Icon,
  CheckIcon,
  RefreshIcon,
  FilterIcon,
  HeartIcon,
  ThumbsUpIcon,
  QuoteDownIcon,
  Grid02Icon,
} from '@hugeicons/core-free-icons';

export interface HugeiconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

function createAnimatedHugeicon(iconData: any, defaultDisplayName: string) {
  const Component: React.FC<HugeiconProps> = ({
    className,
    size = 20,
    color = 'currentColor',
    strokeWidth = 1.75,
    animateOnHover = true,
    animateOnTap = true,
    style,
    onClick,
  }) => {
    return (
      <motion.span
        className={cn('inline-flex items-center justify-center shrink-0 select-none', className)}
        style={style}
        onClick={onClick}
        whileHover={animateOnHover ? { scale: 1.1, rotate: [0, -4, 4, 0], transition: { duration: 0.3 } } : undefined}
        whileTap={animateOnTap ? { scale: 0.9, transition: { duration: 0.15 } } : undefined}
      >
        <HugeiconsIcon icon={iconData} size={size} color={color} strokeWidth={strokeWidth} />
      </motion.span>
    );
  };
  Component.displayName = defaultDisplayName;
  return Component;
}

// Export Animate UI Hugeicons
export const Home03 = createAnimatedHugeicon(Home03Icon, 'Home03');
export const Search01 = createAnimatedHugeicon(Search01Icon, 'Search01');
export const Menu01 = createAnimatedHugeicon(Menu01Icon, 'Menu01');
export const PencilEdit02 = createAnimatedHugeicon(PencilEdit02Icon, 'PencilEdit02');
export const User = createAnimatedHugeicon(UserIcon, 'User');
export const UserRound = createAnimatedHugeicon(UserCheck01Icon, 'UserRound');
export const Mail01 = createAnimatedHugeicon(Mail01Icon, 'Mail01');
export const Phone = createAnimatedHugeicon(Call02Icon, 'Phone');
export const Calendar = createAnimatedHugeicon(Calendar01Icon, 'Calendar');
export const Clock01 = createAnimatedHugeicon(Clock01Icon, 'Clock01');
export const Graduation = createAnimatedHugeicon(Mortarboard01Icon, 'Graduation');
export const Award = createAnimatedHugeicon(Award01Icon, 'Award');
export const Briefcase = createAnimatedHugeicon(Briefcase01Icon, 'Briefcase');
export const Target01 = createAnimatedHugeicon(Target01Icon, 'Target01');
export const FolderOpen = createAnimatedHugeicon(FolderOpenIcon, 'FolderOpen');
export const Folder01 = createAnimatedHugeicon(Folder01Icon, 'Folder01');
export const Settings02 = createAnimatedHugeicon(Settings02Icon, 'Settings02');
export const Settings05 = createAnimatedHugeicon(Settings05Icon, 'Settings05');
export const ChartBarIncreasing = createAnimatedHugeicon(ChartBarLineIcon, 'ChartBarIncreasing');
export const Trophy = createAnimatedHugeicon(TrophyIcon, 'Trophy');
export const Lightbulb = createAnimatedHugeicon(LightbulbIcon, 'Lightbulb');
export const Bot = createAnimatedHugeicon(BotIcon, 'Bot');
export const BotMessageSquare = createAnimatedHugeicon(BotMessageSquareIcon, 'BotMessageSquare');
export const MessageCircle = createAnimatedHugeicon(Message01Icon, 'MessageCircle');
export const Notification01 = createAnimatedHugeicon(Notification01Icon, 'Notification01');
export const Star = createAnimatedHugeicon(StarIcon, 'Star');
export const Gallery = createAnimatedHugeicon(Image01Icon, 'Gallery');
export const Camera = createAnimatedHugeicon(Camera01Icon, 'Camera');
export const Clapperboard = createAnimatedHugeicon(ClapperboardIcon, 'Clapperboard');
export const Link01 = createAnimatedHugeicon(Link01Icon, 'Link01');
export const Download01 = createAnimatedHugeicon(Download01Icon, 'Download01');
export const Upload01 = createAnimatedHugeicon(Upload01Icon, 'Upload01');
export const Maximize01 = createAnimatedHugeicon(Maximize01Icon, 'Maximize01');
export const Minimize01 = createAnimatedHugeicon(Minimize01Icon, 'Minimize01');
export const Cancel01 = createAnimatedHugeicon(Cancel01Icon, 'Cancel01');
export const Check = createAnimatedHugeicon(CheckmarkCircle01Icon, 'Check');
export const CheckIconSimple = createAnimatedHugeicon(CheckIcon, 'CheckIconSimple');
export const ArrowLeft01 = createAnimatedHugeicon(ArrowLeft01Icon, 'ArrowLeft01');
export const ArrowRight01 = createAnimatedHugeicon(ArrowRight01Icon, 'ArrowRight01');
export const Paintbrush = createAnimatedHugeicon(PaintbrushIcon, 'Paintbrush');
export const Sun03 = createAnimatedHugeicon(Sun03Icon, 'Sun03');
export const Moon02 = createAnimatedHugeicon(Moon02Icon, 'Moon02');
export const Location01 = createAnimatedHugeicon(Location01Icon, 'Location01');
export const CloudSun = createAnimatedHugeicon(SunCloud01Icon, 'CloudSun');
export const VolumeHigh = createAnimatedHugeicon(VolumeHighIcon, 'VolumeHigh');
export const VolumeMute = createAnimatedHugeicon(VolumeMute01Icon, 'VolumeMute');
export const Play = createAnimatedHugeicon(PlayIcon, 'Play');
export const Pause = createAnimatedHugeicon(PauseIcon, 'Pause');
export const Share01 = createAnimatedHugeicon(Share01Icon, 'Share01');
export const Bookmark01 = createAnimatedHugeicon(Bookmark01Icon, 'Bookmark01');
export const Globe = createAnimatedHugeicon(Globe02Icon, 'Globe');
export const Brain = createAnimatedHugeicon(BrainIcon, 'Brain');
export const Compass = createAnimatedHugeicon(Compass01Icon, 'Compass');
export const Sparkles = createAnimatedHugeicon(SparklesIcon, 'Sparkles');
export const Database = createAnimatedHugeicon(Database01Icon, 'Database');
export const Cpu = createAnimatedHugeicon(CpuIcon, 'Cpu');
export const Layers = createAnimatedHugeicon(Layers01Icon, 'Layers');
export const ShieldCheck = createAnimatedHugeicon(ShieldCheckIcon, 'ShieldCheck');
export const ShieldAlert = createAnimatedHugeicon(ShieldAlertIcon, 'ShieldAlert');
export const Zap = createAnimatedHugeicon(ZapIcon, 'Zap');
export const Eye = createAnimatedHugeicon(EyeIcon, 'Eye');
export const EyeOff = createAnimatedHugeicon(EyeOffIcon, 'EyeOff');
export const Copy = createAnimatedHugeicon(Copy01Icon, 'Copy');
export const Refresh = createAnimatedHugeicon(RefreshIcon, 'Refresh');
export const Filter = createAnimatedHugeicon(FilterIcon, 'Filter');
export const Heart = createAnimatedHugeicon(HeartIcon, 'Heart');
export const ThumbsUp = createAnimatedHugeicon(ThumbsUpIcon, 'ThumbsUp');
export const Quote = createAnimatedHugeicon(QuoteDownIcon, 'Quote');
export const Grid = createAnimatedHugeicon(Grid02Icon, 'Grid');

export default {
  Home03,
  Search01,
  Menu01,
  PencilEdit02,
  User,
  UserRound,
  Mail01,
  Phone,
  Calendar,
  Clock01,
  Graduation,
  Award,
  Briefcase,
  Target01,
  FolderOpen,
  Folder01,
  Settings02,
  Settings05,
  ChartBarIncreasing,
  Trophy,
  Lightbulb,
  Bot,
  BotMessageSquare,
  MessageCircle,
  Notification01,
  Star,
  Gallery,
  Camera,
  Clapperboard,
  Link01,
  Download01,
  Upload01,
  Maximize01,
  Minimize01,
  Cancel01,
  Check,
  ArrowLeft01,
  ArrowRight01,
  Paintbrush,
  Sun03,
  Moon02,
  Location01,
  CloudSun,
  VolumeHigh,
  VolumeMute,
  Play,
  Pause,
  Share01,
  Bookmark01,
  Globe,
  Brain,
  Compass,
  Sparkles,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  ShieldAlert,
  Zap,
};
