'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  User,
  Heart,
  Target,
  Building2,
  Bot,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  BarChart3,
  MessagesSquare,
  Sparkles,
  Calendar,
  Home,
  Users,
  Star,
  Leaf,
  HeartHandshake,
  X,
  Navigation,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  BookOpen,
  LayoutGrid,
  RotateCw,
  RotateCcw,
  Maximize2,
  Palette,
  Check,
  Car,
  Clock,
  ShieldCheck,
  Zap,
  Award,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Save,
  Monitor,
} from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCardTitle } from '@/lib/utils';
import { SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { findBestVoice } from '@/utils/speechVoice';
import {
  ABOUT_PROFILE_STATS,
  PERSONAL_DEMOGRAPHICS,
  SERVICE_PHILOSOPHY_VALUES,
  ECOSYSTEM_BANNERS,
  EcosystemBannerItem,
} from '@/data/aboutData';
import { getSavedMutedPref, saveMutedPref, AUDIO_PREF_EVENT } from '@/utils/audioPreference';
import { LetterBentoDashboard } from '@/components/views/LetterBentoDashboard';

// Định nghĩa 4 bộ màu sắc chủ đạo Bento (Bento Palette Theme)
export type BentoPaletteType = 'pastel' | 'cyber' | 'emerald' | 'rose';

export interface BentoPaletteConfig {
  id: BentoPaletteType;
  name: string;
  badge: string;
  iconColor: string;
  dotColor: string;
  pillColor: string;
  accentBorder: string;
  cardGlow: string;
  tintBg: string;
}

export const BENTO_PALETTES: Record<BentoPaletteType, BentoPaletteConfig> = {
  pastel: {
    id: 'pastel',
    name: 'Pastel Sáng',
    badge: '🌸 Pastel Sáng',
    iconColor: 'text-purple-600 dark:text-purple-400',
    dotColor: 'bg-gradient-to-r from-purple-400 to-pink-400',
    pillColor: 'from-purple-600 via-indigo-600 to-pink-600',
    accentBorder: 'border-purple-200/80 dark:border-purple-800/60',
    cardGlow: 'hover:shadow-[0_10px_28px_rgba(168,85,247,0.15)]',
    tintBg: 'from-purple-50/40 via-sky-50/20 to-pink-50/40 dark:from-purple-950/20 dark:via-slate-900/30 dark:to-pink-950/20',
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Neon',
    badge: '⚡ Cyber Neon',
    iconColor: 'text-cyan-500 dark:text-cyan-300',
    dotColor: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    pillColor: 'from-cyan-500 via-blue-600 to-fuchsia-600',
    accentBorder: 'border-cyan-400/60 dark:border-cyan-400/70',
    cardGlow: 'hover:shadow-[0_10px_32px_rgba(6,182,212,0.3)] shadow-[0_0_12px_rgba(6,182,212,0.12)]',
    tintBg: 'from-cyan-950/20 via-blue-950/20 to-fuchsia-950/20 dark:from-cyan-950/45 dark:via-slate-950/40 dark:to-fuchsia-950/40',
  },
  emerald: {
    id: 'emerald',
    name: 'Royal Emerald',
    badge: '💎 Royal Emerald',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    dotColor: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    pillColor: 'from-emerald-600 via-teal-600 to-amber-500',
    accentBorder: 'border-emerald-300/80 dark:border-emerald-600/70',
    cardGlow: 'hover:shadow-[0_10px_30px_rgba(16,185,129,0.22)] shadow-[0_0_12px_rgba(16,185,129,0.1)]',
    tintBg: 'from-emerald-50/50 via-teal-50/30 to-amber-50/20 dark:from-emerald-950/35 dark:via-teal-950/25 dark:to-slate-900/30',
  },
  rose: {
    id: 'rose',
    name: 'Rose Gold',
    badge: '✨ Rose Gold',
    iconColor: 'text-rose-600 dark:text-rose-400',
    dotColor: 'bg-gradient-to-r from-rose-400 to-amber-400',
    pillColor: 'from-rose-500 via-pink-600 to-amber-500',
    accentBorder: 'border-rose-300/80 dark:border-rose-600/70',
    cardGlow: 'hover:shadow-[0_10px_30px_rgba(244,63,94,0.22)] shadow-[0_0_12px_rgba(244,63,94,0.1)]',
    tintBg: 'from-rose-50/50 via-pink-50/30 to-orange-50/20 dark:from-rose-950/35 dark:via-pink-950/25 dark:to-slate-900/30',
  },
};

// Video 1: Video phát ngầm mặc định của trang Giới Thiệu
const ABOUT_IDLE_VIDEO_URL =
  'https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4';

// Video 2: Video giới thiệu bản thân chi tiết
const ABOUT_INTRO_VIDEO_URL =
  'https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4';

const getLucideIcon = (name: string) => {
  switch (name) {
    case 'BarChart3':
      return BarChart3;
    case 'Building2':
      return Building2;
    case 'Bot':
      return Bot;
    case 'User':
      return User;
    case 'Users':
      return Users;
    case 'Heart':
      return Heart;
    case 'Calendar':
      return Calendar;
    case 'MapPin':
      return MapPin;
    case 'Home':
      return Home;
    case 'Mail':
      return Mail;
    case 'Phone':
      return Phone;
    case 'Globe':
      return Globe;
    case 'Linkedin':
      return LinkedinIcon as any;
    case 'ExternalLink':
      return ExternalLink;
    case 'Sparkles':
      return Sparkles;
    case 'Star':
      return Star;
    default:
      return User;
  }
};

// Danh sách các Slide trong trang Giới Thiệu (Đã loại bỏ Slide 2)
const ABOUT_SLIDES = [
  { id: 0, title: 'Tổng Quan Video', icon: User, subtitle: 'Chân dung & Trợ lý ảo phỏng vấn' },
  { id: 1, title: 'Trụ Cột Triết Lý', icon: Target, subtitle: '3 Trụ cột vận hành · Giá trị cốt lõi & Tầm nhìn' },
];

export interface AboutViewProps {
  currentTheme?: SiteTheme;
  onNavigatePage?: (pageIndex: number) => void;
}

export function AboutView({ currentTheme = 'light-glass', onNavigatePage }: AboutViewProps = {}) {
  const { showToast } = useToast();

  // Chế độ xem: cố định duy nhất dạng Trình chiếu Slide ('slides')
  const [viewMode, setViewMode] = useState<'dashboard' | 'bento' | 'slides'>('slides');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Yêu cầu 1: Bento Palette Theme Switcher ('pastel' | 'cyber' | 'emerald' | 'rose')
  const [bentoPalette, setBentoPalette] = useState<BentoPaletteType>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hungthai_bento_palette') as BentoPaletteType;
        if (saved && (saved === 'pastel' || saved === 'cyber' || saved === 'emerald' || saved === 'rose')) {
          return saved;
        }
      } catch {}
    }
    return 'pastel';
  });
  const [isPaletteMenuOpen, setIsPaletteMenuOpen] = useState(false);

  const [isClientMounted, setIsClientMounted] = useState<boolean>(false);
  const [isRightDockCollapsed, setIsRightDockCollapsed] = useState<boolean>(false);
  const [isAboutNavMenuOpen, setIsAboutNavMenuOpen] = useState(false);
  const [isAboutNavHovered, setIsAboutNavHovered] = useState(false);
  const aboutNavContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClientMounted(true);
    setViewMode('slides');
  }, []);

  // Click outside to close about nav menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        aboutNavContainerRef.current &&
        !aboutNavContainerRef.current.contains(e.target as Node)
      ) {
        setIsAboutNavHovered(false);
        setIsAboutNavMenuOpen(false);
        setIsPaletteMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Yêu cầu 3: Thuyết minh AI cho 3 Trụ Cột Vận Hành (Card 3.1)
  const [isPillarsNarrating, setIsPillarsNarrating] = useState(false);

  // Yêu cầu 4: Hiệu ứng lật thẻ nhân khẩu học (Card 2.1)
  const [isDemographicFlipped, setIsDemographicFlipped] = useState(false);

  // Tính năng 1: Hologram lật thẻ tương tác 3D cho 3 Giá Trị Cốt Lõi (Mặt sau hiển thị Case Study CSKH)
  const [flippedCoreValues, setFlippedCoreValues] = useState<Record<string, boolean>>({});

  // Tính năng 5: Chế độ đối chiếu tương quan Trụ Cột & Giá Trị khi hover (Cross-Highlight Connection)
  const [hoveredPillarOrValue, setHoveredPillarOrValue] = useState<string | null>(null);

  // Tính năng 4: Nút nghe thuyết minh từng giá trị & trụ cột bằng Trợ Lý AI Tí Chuột
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  // Yêu cầu 5: Focus toàn màn hình từng Card Bento (Bento Expand Modal)
  const [focusedBentoCard, setFocusedBentoCard] = useState<string | null>(null);

  // Interactive Google Maps active preview state in Slide 2
  const [activeMapTab, setActiveMapTab] = useState<'tam_tru' | 'cu_tru'>('tam_tru');

  // Full-screen Modal Google Maps popup state
  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    isOpen: boolean;
    type: 'tam_tru' | 'cu_tru';
    title: string;
    address: string;
    query: string;
  } | null>(null);

  // Video State & Controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(() => getSavedMutedPref(true));
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  // Helper format mm:ss
  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Đồng bộ lưu & khôi phục trạng thái âm thanh qua CustomEvent
  useEffect(() => {
    const handleAudioPref = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.muted === 'boolean') {
        setIsVideoMuted(customEvent.detail.muted);
        if (videoRef.current) {
          videoRef.current.muted = customEvent.detail.muted;
        }
      }
    };
    window.addEventListener(AUDIO_PREF_EVENT, handleAudioPref);
    return () => window.removeEventListener(AUDIO_PREF_EVENT, handleAudioPref);
  }, []);

  // Active ecosystem banner tab index (7 Phân Hệ)
  const [activeBannerIndex, setActiveBannerIndex] = useState<number>(0);

  // Bento Palette Handler
  const handleSelectBentoPalette = useCallback((palette: BentoPaletteType) => {
    SoundEngine.playTap();
    setBentoPalette(palette);
    setIsPaletteMenuOpen(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hungthai_bento_palette', palette);
      } catch {}
    }
    showToast(`Đã chuyển sang bộ màu Bento: ${BENTO_PALETTES[palette]?.name}`);
  }, [showToast]);

  // Lưu cấu hình hồ sơ mặc định
  const handleSaveAboutSettings = useCallback(() => {
    SoundEngine.playGlassChime();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hungthai_about_view_mode', viewMode);
        localStorage.setItem('hungthai_bento_palette', bentoPalette);
      } catch {}
    }
    showToast('Đã lưu cấu hình hồ sơ làm mặc định thành công!');
  }, [viewMode, bentoPalette, showToast]);

  // Flip demographic card handler
  const toggleDemographicFlip = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playPop();
    setIsDemographicFlipped((prev) => !prev);
  }, []);

  // AI voice narration for Card 3.1 (3 Trụ Cột Vận Hành)
  const handleNarrateThreePillars = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playTap();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }

    if (isPillarsNarrating) {
      window.speechSynthesis.cancel();
      setIsPillarsNarrating(false);
      showToast('Đã dừng thuyết minh 3 Trụ Cột Vận Hành.');
      return;
    }

    window.speechSynthesis.cancel();
    const text =
      'Trải qua hơn 22 năm điều hành và quản trị dịch vụ khách hàng, chuyên gia Nguyễn Hùng Thái luôn kiên định với 3 trụ cột cốt lõi: ' +
      'Thứ nhất, Hiệu quả và Quy trình tạo nền tảng vững chắc, chuẩn hóa chất lượng và tối ưu kết quả vận hành. ' +
      'Thứ hai, Nhân văn và Con người tạo giá trị, thấu hiểu từ tâm qua sự lắng nghe và đồng cảm kịp thời. ' +
      'Thứ ba, Bền vững và Công nghệ tạo đòn bẩy đột phá với CRM, Dashboard và tự động hóa AI. ' +
      'Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const chosenVoice = findBestVoice(voices);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = () => {
      setIsPillarsNarrating(true);
      showToast('AI Trợ Lý Tí Chuột đang thuyết minh 3 Trụ Cột Vận Hành...');
    };

    utterance.onend = () => {
      setIsPillarsNarrating(false);
    };

    utterance.onerror = () => {
      setIsPillarsNarrating(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isPillarsNarrating, showToast]);

  // Handler lật thẻ 3D Hologram cho Giá Trị Cốt Lõi
  const toggleFlipCoreValue = useCallback((valId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playCardFlip();
    setFlippedCoreValues((prev) => ({
      ...prev,
      [valId]: !prev[valId],
    }));
  }, []);

  // Handler nghe thuyết minh AI ngắn gọn cho từng Trụ Cột / Giá Trị (5-7s)
  const handleSpeakItem = useCallback((id: string, text: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playTap();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }

    if (activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      showToast(`Đã dừng thuyết minh ${title}.`);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const chosenVoice = findBestVoice(voices);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = () => {
      setActiveSpeechId(id);
      showToast(`AI Tí Chuột đang thuyết minh: ${title}... 🔊`);
    };

    utterance.onend = () => {
      setActiveSpeechId(null);
    };

    utterance.onerror = () => {
      setActiveSpeechId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [activeSpeechId, showToast]);

  // Kiểm tra tương quan sáng viền giữa 3 Trụ Cột và 3 Giá Trị Cốt Lõi
  // Pillar 1 (Hiệu Quả) <-> Value 2 (Kịp Thời / Tốc độ xử lý & Quy trình)
  // Pillar 2 (Nhân Văn) <-> Value 3 (Đồng Cảm Chân Thành / Thấu cảm & Con người)
  // Pillar 3 (Bền Vững) <-> Value 1 (Sự Tận Tâm / Giá trị dài hạn & Trách nhiệm)
  const isPillarHighlighted = useCallback((pillarId: string) => {
    if (hoveredPillarOrValue === pillarId) return true;
    if (pillarId === 'pillar-1' && hoveredPillarOrValue === 'val-2') return true;
    if (pillarId === 'pillar-2' && hoveredPillarOrValue === 'val-3') return true;
    if (pillarId === 'pillar-3' && hoveredPillarOrValue === 'val-1') return true;
    return false;
  }, [hoveredPillarOrValue]);

  const isValueHighlighted = useCallback((valId: string) => {
    if (hoveredPillarOrValue === valId) return true;
    if (valId === 'val-1' && hoveredPillarOrValue === 'pillar-3') return true;
    if (valId === 'val-2' && hoveredPillarOrValue === 'pillar-1') return true;
    if (valId === 'val-3' && hoveredPillarOrValue === 'pillar-2') return true;
    return false;
  }, [hoveredPillarOrValue]);

  // Bento Focus Modal Handlers
  const handleOpenBentoFocus = useCallback((cardKey: string) => {
    SoundEngine.playPageFlip();
    setFocusedBentoCard(cardKey);
  }, []);

  const handleCloseBentoFocus = useCallback(() => {
    SoundEngine.playTap();
    setFocusedBentoCard(null);
  }, []);

  // Navigation handlers
  const handleSelectSlide = useCallback((slideIdx: number) => {
    SoundEngine.playTap();
    setSlideDirection(slideIdx > currentSlide ? 'next' : 'prev');
    setCurrentSlide(slideIdx);
  }, [currentSlide]);

  const handlePrevSlide = useCallback(() => {
    SoundEngine.playTap();
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : ABOUT_SLIDES.length - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    SoundEngine.playTap();
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev < ABOUT_SLIDES.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard accessibility: ESC đóng modal/video, ArrowLeft/ArrowRight chuyển slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        if (focusedBentoCard) {
          handleCloseBentoFocus();
        } else if (selectedMapLocation) {
          setSelectedMapLocation(null);
        } else if (isPlayingIntro) {
          handleCancelIntro();
        }
      } else if (viewMode === 'slides' && !isPlayingIntro && !selectedMapLocation && !focusedBentoCard) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextSlide();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMapLocation, isPlayingIntro, viewMode, focusedBentoCard, handleCloseBentoFocus, handlePrevSlide, handleNextSlide]);

  // Video time tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlayIntro = () => {
    setIsPlayingIntro(true);
    setIsVideoMuted(false);
    saveMutedPref(false);
    setIsVideoPaused(false);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_INTRO_VIDEO_URL;
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    showToast('Đang phát Video: Giới thiệu bản thân 🎬');
  };

  const handleCancelIntro = () => {
    setIsPlayingIntro(false);
    setIsVideoMuted(true);
    saveMutedPref(true);
    setIsVideoPaused(false);
    setVideoCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_IDLE_VIDEO_URL;
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    showToast('Đã dừng nghe — Quay về Video Ban đầu');
  };

  const handleVideoEnded = () => {
    if (isPlayingIntro) {
      handleCancelIntro();
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isVideoMuted;
    videoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
    saveMutedPref(nextMuted);
    showToast(nextMuted ? 'Đã tắt âm thanh video' : 'Đã mở âm thanh video 🔊');
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPaused(false);
    } else {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  };

  // Render nội dung phóng to chi tiết cho Bento Expand Modal (Yêu cầu 5)
  const renderFocusedCardContent = () => {
    switch (focusedBentoCard) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-900 text-white rounded-2xl p-5 border border-slate-700">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
                <video
                  src={ABOUT_INTRO_VIDEO_URL}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-3 text-left">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lãnh Đạo Vận Hành CX 22+ Năm</span>
                  </div>
                  <h3 className="text-xl font-black font-play text-white">Nguyễn Hùng Thái</h3>
                  <div className="text-xs text-slate-300 font-normal leading-relaxed mt-2 space-y-2">
                    <p>
                      Một chuyên gia dịch vụ khách hàng với hơn <strong>22 năm kinh nghiệm thực chiến</strong>. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                    </p>
                    <p>
                      Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ <strong>sự tận tâm kịp thời</strong> và <strong>đồng cảm chân thành</strong>. Trong suốt sự nghiệp, tôi đã trực tiếp thiết kế và tối ưu hóa hàng chục quy trình, hệ thống Chăm Sóc Khách Hàng, luôn đặt trên nền tảng ba giá trị cốt lõi:
                    </p>
                    <div className="p-2 rounded-lg bg-white/10 border border-white/15 text-cyan-300 font-bold font-play text-xs text-center">
                      Hiệu quả – Nhân văn – Bền vững
                    </div>
                    <p>
                      Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi: <em>Họ luôn được lắng nghe.</em>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <img
                    src="https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif"
                    alt="Tí Chuột AI"
                    className="w-8 h-8 object-contain"
                  />
                  <div className="text-[11px] text-slate-300">
                    <span className="font-bold text-cyan-400">Trợ Lý Ảo Tí Chuột:</span> “Sẵn sàng kết nối và đồng hành cùng quý doanh nghiệp!”
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ABOUT_PROFILE_STATS.map((stat) => {
                const StatIcon = getLucideIcon(stat.iconName);
                return (
                  <div
                    key={stat.id}
                    onClick={() => {
                      SoundEngine.playPop();
                      showToast(`Chỉ số ${stat.labelVi}: ${stat.metric} ${stat.unitVi || ''}`);
                    }}
                    className="rounded-2xl p-4 border flex flex-col justify-between transition-all duration-200  cursor-pointer shadow-sm hover:shadow-md"
                    style={{
                      backgroundColor: `${stat.color}0f`,
                      borderColor: `${stat.color}35`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-play">
                        {stat.labelVi}
                      </span>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <StatIcon className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                    </div>
                    <div className="my-3">
                      <span
                        className="text-3xl font-black font-play leading-none tracking-tight block"
                        style={{ color: stat.color }}
                      >
                        {stat.metric}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block mt-1 font-mono">
                        {stat.unitVi || 'THỰC CHIẾN'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                      {stat.id === 'experience' && 'Hơn hai thập kỷ trực tiếp điều hành, thiết lập quy chuẩn và nâng cấp dịch vụ.'}
                      {stat.id === 'scale' && 'Từng quản lý và xây dựng hệ thống tại hơn 8 tập đoàn, doanh nghiệp quy mô lớn.'}
                      {stat.id === 'automation' && 'Tích hợp công nghệ AI, CRM & quy trình tự động hoá chăm sóc khách hàng 24/7.'}
                      {stat.id === 'csat' && 'Chỉ số hài lòng khách hàng (CSAT) liên tục duy trì ở mức cao kỷ lục.'}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white font-bold">💡 Triết lý đo lường thực chiến:</strong> Số liệu phản ánh năng lực kiểm soát chi tiết từ vi mô (từng cuộc gọi, khiếu nại, phản hồi khách hàng) đến vĩ mô (chiến lược ngân sách, nhân sự, kiến trúc hệ thống CRM và chuyển đổi số).
            </div>
          </div>
        );

      case 'demographics':
        return (
          <div className="space-y-4 text-left">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PERSONAL_DEMOGRAPHICS.map((item) => {
                const ItemIcon = getLucideIcon(item.iconName);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      SoundEngine.playPop();
                      if (item.type === 'map') {
                        setSelectedMapLocation({
                          isOpen: true,
                          type: item.id === 'temp_residence' ? 'tam_tru' : 'cu_tru',
                          title: item.mapTitle || item.labelVi,
                          address: item.href || item.valueVi,
                          query: item.mapQuery || item.valueVi,
                        });
                      }
                    }}
                    className={cn(
                      'rounded-xl p-3 border flex items-center gap-3 transition-all cursor-pointer hover:shadow-sm ',
                      item.colorTheme.bg,
                      item.colorTheme.border
                    )}
                  >
                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', item.colorTheme.iconBg)}>
                      <ItemIcon className={cn('w-4.5 h-4.5', item.colorTheme.iconColor)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={cn('text-[10px] font-bold block truncate', item.colorTheme.labelColor)}>
                        {item.labelVi}
                      </span>
                      <span className={cn('text-xs font-black font-play block truncate', item.colorTheme.valueColor)}>
                        {item.valueVi}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chi tiết lộ trình di chuyển Q7 - Mỹ Tho */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-sky-50/70 to-blue-50/60 dark:from-indigo-950/40 dark:via-sky-950/30 dark:to-slate-900/40 border border-indigo-200/80 dark:border-indigo-800/60">
              <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300">
                <Car className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-sm font-black font-play">Chi Tiết Lộ Trình &amp; Khả Năng Di Chuyển Linh Hoạt</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
                <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Khoảng cách</span>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white font-play">~68 KM</span>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">Tuyến Cao tốc TP.HCM - Trung Lương</p>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Thời gian</span>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white font-play">50 – 65 Phút</span>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">Lộ trình thông thoáng, xe đưa đón liên tục</p>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Sẵn sàng Onsite</span>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white font-play">100% Onsite / Hybrid</span>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">Có chỗ tạm trú Q7 sẵn sàng cho công tác</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                Chuyên gia Nguyễn Hùng Thái chủ động hoàn toàn phương tiện di chuyển, sẵn sàng đáp ứng yêu cầu công việc toàn thời gian tại TP.HCM hoặc chế độ làm việc kết hợp (Hybrid) theo nhu cầu của ban điều hành.
              </p>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playPop();
                  setActiveMapTab('tam_tru');
                }}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border',
                  activeMapTab === 'tam_tru'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                )}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Tạm trú: Quận 7, TP.HCM</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playPop();
                  setActiveMapTab('cu_tru');
                }}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border',
                  activeMapTab === 'cu_tru'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                )}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Cư trú: Mỹ Tho, Tiền Giang</span>
              </button>
            </div>

            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner bg-slate-100 dark:bg-slate-950">
              <iframe
                title={activeMapTab === 'tam_tru' ? 'Bản đồ Quận 7' : 'Bản đồ Mỹ Tho'}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  activeMapTab === 'tam_tru' ? 'District 7, Ho Chi Minh City, Vietnam' : 'My Tho, Tien Giang, Vietnam'
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Địa chỉ: {activeMapTab === 'tam_tru' ? 'Quận 7, TP. Hồ Chí Minh' : 'Mỹ Tho, Tiền Giang'}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeMapTab === 'tam_tru' ? 'District 7, Ho Chi Minh City, Vietnam' : 'My Tho, Tien Giang, Vietnam'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-cyan-400 font-bold hover:underline"
              >
                <span>Mở trong Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        );

      case 'pillars':
        return (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                3 nguyên lý vận hành cốt lõi qua hơn 22 năm điều hành hệ thống dịch vụ khách hàng:
              </span>
              <button
                type="button"
                onClick={handleNarrateThreePillars}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer',
                  isPillarsNarrating
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300 shadow-sm animate-pulse'
                    : 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100'
                )}
              >
                <Volume2 className={cn('w-4 h-4', isPillarsNarrating && 'animate-spin')} />
                <span>{isPillarsNarrating ? 'Dừng đọc...' : 'Nghe AI Tí Chuột Thuyết Minh'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Pillar 1 */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                    <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md">TRỤ CỘT 01</span>
                  </div>
                  <h4 className="text-base font-black font-play text-white">01. HIỆU QUẢ</h4>
                  <p className="text-xs text-blue-100 font-semibold mt-1">Tối ưu quy trình &amp; Kết quả</p>
                  <p className="text-xs text-white/90 leading-relaxed mt-2.5">
                    Tối ưu hiệu suất vận hành, chuẩn hóa SOP, quản trị KPI, SLA, FCR và giải quyết triệt để rủi ro dịch vụ.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/20 text-[11px] text-blue-100 font-mono">
                  ✓ Chuẩn hóa SOP &amp; Đo lường ROI
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Heart className="w-6 h-6 text-white" />
                    <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md">TRỤ CỘT 02</span>
                  </div>
                  <h4 className="text-base font-black font-play text-white">02. NHÂN VĂN</h4>
                  <p className="text-xs text-rose-100 font-semibold mt-1">Đồng cảm &amp; Thấu hiểu</p>
                  <p className="text-xs text-white/90 leading-relaxed mt-2.5">
                    Lắng nghe thấu hiểu từ tâm, lấy con người làm gốc rễ, đào tạo đội ngũ tận tâm và xây dựng văn hóa gắn kết.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/20 text-[11px] text-rose-100 font-mono">
                  ✓ Thấu cảm từ tâm &amp; Trao quyền
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Leaf className="w-6 h-6 text-white" />
                    <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded-md">TRỤ CỘT 03</span>
                  </div>
                  <h4 className="text-base font-black font-play text-white">03. BỀN VỮNG</h4>
                  <p className="text-xs text-emerald-100 font-semibold mt-1">Giá trị &amp; Tin cậy</p>
                  <p className="text-xs text-white/90 leading-relaxed mt-2.5">
                    Xây dựng niềm tin dài hạn, ứng dụng công nghệ CRM hiện đại, Data Analytics và tự động hóa AI tạo đòn bẩy.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/20 text-[11px] text-emerald-100 font-mono">
                  ✓ Công nghệ AI CRM &amp; Tăng trưởng
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span className="font-handwriting text-blue-600 dark:text-cyan-400 text-base font-bold">
                Luôn bên bạn và tận tâm từng khoảnh khắc ♡
              </span>
              <span className="font-mono text-[11px] text-slate-500">22+ Năm Phụng Sự Dịch Vụ Khách Hàng</span>
            </div>
          </div>
        );

      case 'philosophy':
        return (
          <div className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Khối 1: Giá trị cốt lõi */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-50/90 to-orange-100/70 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                    <Star className="w-5 h-5 fill-current" />
                    <h4 className="text-sm font-black font-play">Giá Trị Cốt Lõi: Khách Hàng Là Trung Tâm</h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    Sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ <strong className="text-amber-800 dark:text-amber-300 font-bold">sự tận tâm kịp thời</strong> và <strong className="text-amber-800 dark:text-amber-300 font-bold">đồng cảm chân thành</strong> trong từng điểm chạm (Touchpoint).
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-amber-200/60 dark:border-amber-800/40 text-[11px] text-amber-700 dark:text-amber-300 font-handwriting text-base font-bold">
                  Tận tâm phụng sự ♡
                </div>
              </div>

              {/* Khối 2: Triết lý tầm nhìn */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-sky-50/90 to-cyan-100/70 dark:from-sky-950/40 dark:to-cyan-950/30 border border-sky-200/80 dark:border-sky-800/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-sky-400">
                      <Sparkles className="w-5 h-5" />
                      <h4 className="text-sm font-black font-play">Triết Lý Tầm Nhìn CX 2026+</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-white/90 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">
                      Kỷ Nguyên Mới
                    </span>
                  </div>
                  <blockquote className="text-sm font-black text-blue-800 dark:text-cyan-300 font-play leading-relaxed border-l-4 border-blue-500 pl-3 my-2">
                    “ Tận Tâm &amp; Đồng Hành Cùng Trải Nghiệm Khách Hàng ”
                  </blockquote>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    Kết hợp hài hòa giữa công nghệ chuyển đổi số (AI CRM, tự động hóa) và trái tim phụng sự nhân văn để tạo nên sự gắn kết thương hiệu bền lâu.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-sky-200/60 dark:border-sky-800/40 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Nguyễn Hùng Thái</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-bold">22+ Năm Vận Hành Thực Chiến</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isDark = currentTheme === 'dark-neon';

  // Glass card classes
  const glassCardClass =
    isDark
      ? 'bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.65)] text-slate-100'
      : 'bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-5px_rgba(30,27,75,0.06)] text-slate-800';

  const renderAboutRightNavigationBar = () => null;

  return (
    <section
      id="about"
      className="relative w-full h-full flex-1 flex flex-col justify-start items-stretch font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto lg:overflow-hidden glass-scrollbar select-none"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-3 sm:gap-3.5 h-full min-h-0">
        {/* ========================================================================= */}
        {/* NÚT ĐIỀU HƯỚNG SLIDE TRÁI & PHẢI (CHỈ HIỂN THỊ Ở CHẾ ĐỘ SLIDE KHI KHÔNG PHÁT VIDEO) */}
        {/* ========================================================================= */}
        {!isPlayingIntro && (
          <>
            <button
              type="button"
              onClick={handlePrevSlide}
              className="absolute left-2 sm:left-3.5 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-800 dark:text-white border-2 border-blue-500/80 dark:border-cyan-400/80 shadow-[0_0_20px_rgba(59,130,246,0.38)] dark:shadow-[0_0_20px_rgba(34,211,238,0.45)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer z-30 group"
              title="Slide trước (Phím ←)"
              aria-label="Slide trước"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.8] text-blue-600 dark:text-cyan-400 group-hover:text-white dark:group-hover:text-slate-950 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute right-2 sm:right-3.5 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-800 dark:text-white border-2 border-blue-500/80 dark:border-cyan-400/80 shadow-[0_0_20px_rgba(59,130,246,0.38)] dark:shadow-[0_0_20px_rgba(34,211,238,0.45)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer z-30 group"
              title="Slide kế tiếp (Phím →)"
              aria-label="Slide kế tiếp"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.8] text-blue-600 dark:text-cyan-400 group-hover:text-white dark:group-hover:text-slate-950 transition-transform group-hover:translate-x-0.5" />
            </button>
          </>
        )}

        {/* ========================================================================= */}
        {/* CHẾ ĐỘ TRÌNH CHIẾU SLIDE 3 BƯỚC                                           */}
        {/* ========================================================================= */}

        {/* SLIDE 1: TỔNG QUAN & VIDEO TRỢ LÝ ẢO */}
        {viewMode === 'slides' && currentSlide === 0 && (
          <div
            key="about-slide-0"
            className={`w-full flex-1 min-h-0 flex flex-col justify-between gap-3 ${
              slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-[14px] border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 lg:p-7 flex flex-col justify-between shadow-xs backdrop-blur-xl bg-slate-900 text-left transition-all duration-500 group/hero flex-1 min-h-[360px] sm:min-h-[420px] ${
                isPlayingIntro ? 'h-full min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] shadow-2xl ring-1 ring-cyan-400/30' : ''
              }`}
            >
              {/* Video Background Layer */}
              <video
                ref={videoRef}
                key={isPlayingIntro ? 'video-intro-2' : 'video-idle-1'}
                autoPlay
                loop={!isPlayingIntro}
                muted={isPlayingIntro ? isVideoMuted : true}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-100 transition-opacity duration-700 brightness-110 contrast-105"
                src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
              />

              {/* High-contrast Ambient Scrim Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r pointer-events-none z-10 transition-opacity duration-500 ${
                  isPlayingIntro
                    ? 'from-black/50 via-black/20 to-black/30 dark:from-slate-950/60 dark:via-slate-950/20 dark:to-slate-950/40'
                    : 'from-black/45 via-black/20 to-transparent dark:from-slate-950/55 dark:via-slate-950/25 dark:to-transparent'
                }`}
              />

              {/* Calligraphy note */}
              {!isPlayingIntro && (
                <div className="hidden sm:block absolute left-[260px] lg:left-[280px] top-6 z-20 pointer-events-none">
                  <span className="font-handwriting text-cyan-300 dark:text-cyan-400 text-xl font-bold select-none rotate-[-6deg] block drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    Luôn bên bạn ♡
                  </span>
                </div>
              )}

              {/* Nội dung Slide 1 */}
              <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 relative z-20 h-full">
                {/* Left Column: Greeting, Name, Role, CTA Button */}
                {isPlayingIntro && (
                  <div className="absolute top-4 right-4 z-50">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelIntro();
                      }}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(244,63,94,0.7)] backdrop-blur-xl border border-rose-400/80 transition cursor-pointer active:scale-95"
                      title="Hủy video"
                    >
                      <X className="w-5 h-5 stroke-[3]" />
                      <span>Hủy</span>
                    </button>
                  </div>
                )}
                <div
                  className={`flex flex-col justify-between z-20 ${
                    isPlayingIntro ? 'hidden' : 'max-w-full md:max-w-[340px] lg:max-w-[380px]'
                  }`}
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-800/90 shadow-2xs border border-slate-200/80 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-100 w-fit backdrop-blur-md">
                      <span>👋</span>
                      <span>Xin chào,</span>
                      {isPlayingIntro && (
                        <span className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black animate-pulse">
                          Đang phát Video giới thiệu
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black font-play !text-white leading-[1.15] mt-3 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      Nguyễn Hùng Thái <span className="text-amber-400">✨</span>
                    </h2>

                    {!isPlayingIntro && (
                      <p className="text-xs sm:text-[13px] !text-white/95 font-medium leading-relaxed mt-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                        Chuyên gia Quản trị Trải nghiệm Khách hàng (CX) & Vận hành Contact Center với hơn 22 năm kinh nghiệm thực chiến.
                      </p>
                    )}
                  </div>

                  {/* Cụm nút Giới thiệu bản thân đa năng nhóm chung Speaker */}
                  <div className="pt-4 flex items-center gap-3">
                    <div className="relative inline-flex items-center p-[2px] rounded-full overflow-hidden transition-all duration-300 group/pill shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.55)]">
                      {/* Animated Conic Gradient Border Chạy Viền Màu */}
                      <div
                        className={`absolute inset-[-100%] animate-[spin_3.5s_linear_infinite] transition-opacity duration-300 opacity-90 group-hover/pill:opacity-100 blur-[0.5px] ${
                          !isPlayingIntro
                            ? 'bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a855f7_25%,#ec4899_50%,#06b6d4_75%,#3b82f6_100%)]'
                            : 'bg-[conic-gradient(from_90deg_at_50%_50%,#f43f5e_0%,#fb7185_25%,#f97316_50%,#e11d48_75%,#f43f5e_100%)]'
                        }`}
                      />

                      <div
                        className={`relative z-10 flex items-center rounded-full backdrop-blur-xl transition-all duration-300 ${
                          !isPlayingIntro
                            ? 'bg-slate-950/90 text-white'
                            : 'bg-gradient-to-r from-rose-950/95 via-pink-950/90 to-slate-950/95 text-white'
                        }`}
                      >
                        {/* Nút Speaker: Mặc định tắt âm, bấm vào toggle âm thanh video */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoMute();
                          }}
                          title={isVideoMuted ? 'Bấm để mở âm thanh video' : 'Bấm để tắt âm thanh'}
                          className={`px-3 py-2 flex items-center justify-center transition-all cursor-pointer rounded-l-full border-r border-white/15 ${
                            !isVideoMuted
                              ? 'text-cyan-300 bg-cyan-500/20'
                              : 'text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {!isVideoMuted ? (
                            <Volume2 className="w-4 h-4 animate-bounce text-cyan-300" />
                          ) : (
                            <VolumeX className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {/* Nút Play / Dừng nghe */}
                        {!isPlayingIntro ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayIntro();
                            }}
                            className="px-4.5 py-2 flex items-center gap-2 font-bold font-play text-xs sm:text-sm text-white hover:text-cyan-200 transition-all cursor-pointer rounded-r-full group/btn"
                            title="Bấm để phát video 2 (Giới thiệu bản thân)"
                          >
                            <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-xs group-hover/btn:scale-110 transition-transform">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                            <span>Giới thiệu bản thân</span>
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelIntro();
                            }}
                            className="px-3.5 py-2 flex items-center gap-2 font-bold font-play text-xs sm:text-sm text-rose-100 hover:text-white transition-all cursor-pointer rounded-r-full bg-gradient-to-r from-rose-600/80 to-red-600/80 hover:from-rose-600 hover:to-red-600 group/btn"
                            title="Bấm để dừng nghe và quay lại Video ban đầu"
                          >
                            <div className="w-5.5 h-5.5 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xs group-hover/btn:scale-110 transition-transform">
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <span>Dừng nghe</span>
                            {/* Audio Duration Pill: Đếm ngược thời gian + sóng âm mini */}
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-500/30 text-rose-100 border border-rose-300/40 text-[10.5px] font-mono font-bold tracking-tight shrink-0 shadow-xs ml-0.5">
                              <span className="flex items-center gap-0.5 h-2.5">
                                <span className="w-0.5 h-1.5 bg-rose-200 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                                <span className="w-0.5 h-2.5 bg-rose-100 rounded-full animate-[pulse_0.4s_ease-in-out_infinite]" />
                                <span className="w-0.5 h-2 bg-rose-200 rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" />
                              </span>
                              <span>{formatCountdown(Math.max(0, 105 - Math.floor(videoCurrentTime)))}</span>
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {isPlayingIntro && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}
                        className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95 shadow-md"
                        title={isVideoPaused ? 'Tiếp tục phát' : 'Tạm dừng'}
                      >
                        {isVideoPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Thẻ Thông Tin Cá Nhân (Chỉ hiện khi idle) */}
                {!isPlayingIntro && (
                  <div className="flex flex-col gap-2 z-20 w-full sm:w-[160px] lg:w-[180px] shrink-0 justify-center">
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-1 gap-2">
                        {PERSONAL_DEMOGRAPHICS.map((item) => {
                          const ItemIcon = getLucideIcon(item.iconName);
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                SoundEngine.playPop();
                                if (item.type === 'map') {
                                  setSelectedMapLocation({
                                    isOpen: true,
                                    type: item.id === 'temp_residence' ? 'tam_tru' : 'cu_tru',
                                    title: item.mapTitle || item.labelVi,
                                    address: item.href || item.valueVi,
                                    query: item.mapQuery || item.valueVi,
                                  });
                                } else {
                                  showToast(`${item.labelVi}: ${item.valueVi}`);
                                }
                              }}
                              className="p-2 px-2.5 rounded-xl bg-white/95 dark:bg-slate-800/95 border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center gap-2 hover:shadow-xs  transition-all cursor-pointer group"
                              title={item.type === 'map' ? `Click để xem bản đồ: ${item.valueVi}` : `${item.labelVi}: ${item.valueVi}`}
                            >
                              <div
                                className={cn(
                                  'w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 shadow-2xs',
                                  item.colorTheme.iconBg
                                )}
                              >
                                <ItemIcon className={cn('w-3.5 h-3.5', item.colorTheme.iconColor)} />
                              </div>
                              <div className="min-w-0 flex flex-col text-left flex-1">
                                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-bold truncate">
                                  {item.labelVi}
                                </span>
                                <span className="text-[11.5px] font-black font-play text-slate-800 dark:text-slate-100 truncate leading-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                                  {item.valueVi}
                                </span>
                              </div>
                              {item.type === 'map' && (
                                <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover:text-blue-500 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: TRỤ CỘT VẬN HÀNH & TRIẾT LÝ GIÁ TRỊ (GỘP SLIDE 3 & SLIDE 4 TRƯỚC ĐÂY) */}
        {viewMode === 'slides' && currentSlide === 1 && (
          <div
            key="about-slide-1"
            className={`w-full flex-1 min-h-0 flex flex-col justify-between gap-3 ${
              slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
            }`}
          >
            <div
              className={`w-full p-4 sm:p-5 lg:p-6 rounded-[14px] border flex-1 min-h-0 flex flex-col justify-between gap-4 text-left ${glassCardClass}`}
            >
              {/* Header Card */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-2.5 text-blue-600 dark:text-sky-400">
                  <Target className="w-5 h-5 stroke-[2.4] shrink-0" />
                  <h3 className="text-sm sm:text-base font-black font-play text-blue-600 dark:text-sky-400 leading-tight">
                    {formatCardTitle('Trụ cột vận hành triết lý')}
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                  Slide 2 / 2
                </span>
              </div>

              {/* Bento Grid: Khối trên (Chân dung + 3 Trụ Cột) & Khối dưới (Giá trị cốt lõi + Triết lý) */}
              <div className="flex flex-col gap-3.5 flex-1 min-h-0">

                {/* Row 1: Left Story Card (lg:col-span-5) + Right 3 Pillars (lg:col-span-7) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
                  {/* Left: Giới thiệu bản thân tôi với hình GIF làm nền card + Prismatic Border Shimmer */}
                  <div
                    className="lg:col-span-5 rounded-[14px] border border-blue-100/90 dark:border-white/10 p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-500 relative overflow-hidden group select-none min-h-[175px]"
                  >
                    {/* Prismatic Border Shimmer: Ánh sáng phản chiếu quét viền lướt quanh mép kính khi hover */}
                    <div className="absolute inset-0 rounded-[14px] border border-transparent group-hover:border-cyan-400/80 dark:group-hover:border-cyan-300/80 transition-all duration-500 pointer-events-none z-20 shadow-[inset_0_0_18px_rgba(56,189,248,0.22)]" />
                    <div className="absolute -inset-[1px] rounded-[15px] bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500 opacity-0 group-hover:opacity-35 transition-opacity duration-700 blur-[2.5px] pointer-events-none z-0" />

                    {/* GIF Animation Background Layer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                      <img
                        src="https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif"
                        alt="Avata Ti Chuot Animated Background"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-full h-full object-cover object-center opacity-30 dark:opacity-25 filter blur-[0.3px] scale-105 transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Soft Frosted Glass Scrim giúp văn bản tương phản cao, dễ đọc */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/85 to-blue-50/80 dark:from-slate-900/95 dark:via-slate-900/85 dark:to-slate-950/80 backdrop-blur-[1px]" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 pb-2 border-b border-blue-200/60 dark:border-white/10">
                        <User className="w-4.5 h-4.5 text-blue-600 dark:text-sky-400 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-black font-play text-blue-600 dark:text-sky-400">
                          {formatCardTitle('Giới thiệu bản thân')}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed mt-2.5">
                        Một chuyên gia dịch vụ khách hàng với hơn{' '}
                        <strong className="font-bold text-slate-950 dark:text-white">22 năm kinh nghiệm</strong> thực chiến.
                        Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh
                        khắc, dù là nhỏ nhất, đều là một cơ hội quý giá để lắng nghe, để thấu hiểu, và để tạo ra những trải
                        nghiệm vượt trên cả sự mong đợi.
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="flex items-end justify-between pt-3 mt-2 relative z-10">
                      <span className="font-handwriting text-blue-600 dark:text-cyan-400 text-xl sm:text-2xl font-bold select-none leading-none drop-shadow-xs">
                        Luôn bên bạn ♡
                      </span>
                      <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-300 px-2 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/40">
                        Chuyên gia CSKH
                      </span>
                    </div>
                  </div>

                  {/* Right: 3 Trụ Cột Vận Hành với icon hình nền watermark nằm dưới thẻ + Audio Narration + Cross Highlight */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-black font-play text-blue-600 dark:text-cyan-400">
                          {formatCardTitle('3 Trụ cột vận')}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                        3 Trụ cột vận hành
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-stretch flex-1">
                      {/* Pillar 1: Hiệu Quả (Tương quan Giá trị Kịp Thời) */}
                      <div
                        onMouseEnter={() => setHoveredPillarOrValue('pillar-1')}
                        onMouseLeave={() => setHoveredPillarOrValue(null)}
                        onClick={() => {
                          SoundEngine.playPop();
                          showToast('Trụ cột 01: Hiệu Quả - Tối ưu kết quả thực chiến');
                        }}
                        className={cn(
                          'pillar-gradient-card rounded-[14px] bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 text-white p-3.5 shadow-sm flex flex-col justify-between min-h-[145px] relative overflow-hidden transition-all duration-300  hover:shadow-md border border-white/20 text-left group cursor-pointer',
                          isPillarHighlighted('pillar-1') &&
                            'ring-2 ring-cyan-300 dark:ring-cyan-400 shadow-[0_0_24px_rgba(56,189,248,0.7)] scale-[1.02] -translate-y-1'
                        )}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xs">
                            <BarChart3 className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Nút nghe thuyết minh Audio Narration Pill */}
                            <button
                              type="button"
                              onClick={(e) =>
                                handleSpeakItem(
                                  'pillar-1',
                                  'Trụ cột một, Hiệu quả vận hành. Chuẩn hóa quy trình SLAs, tối ưu hiệu suất và kiến tạo kết quả đo lường rõ ràng.',
                                  'Trụ cột 01: Hiệu Quả',
                                  e
                                )
                              }
                              className={cn(
                                'w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md',
                                activeSpeechId === 'pillar-1'
                                  ? 'bg-amber-400 text-slate-900 animate-pulse shadow-sm'
                                  : 'bg-white/20 hover:bg-white/35 text-white'
                              )}
                              title="Nghe AI Tí Chuột thuyết minh Trụ cột 01"
                            >
                              {activeSpeechId === 'pillar-1' ? (
                                <VolumeX className="w-3 h-3" />
                              ) : (
                                <Volume2 className="w-3 h-3" />
                              )}
                            </button>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                              01
                            </span>
                          </div>
                        </div>

                        <div className="my-1.5 relative z-10">
                          <h5 className="text-xs sm:text-sm font-black font-play !text-white">Hiệu quả vận hành</h5>
                          <span className="text-[10px] text-blue-100 font-semibold block">Tối ưu &amp; Kết quả</span>
                          <p className="text-[11px] text-white/95 font-medium leading-snug mt-1">
                            Chuẩn hóa SLAs, tối ưu hiệu suất quy trình và tạo kết quả đo lường rõ ràng.
                          </p>
                        </div>

                        <div className="self-end relative z-10">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenBentoFocus('pillars');
                            }}
                            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition text-white"
                            title="Xem chi tiết trụ cột hiệu quả"
                          >
                            <ArrowRight className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Pillar 2: Nhân Văn (Tương quan Giá trị Đồng Cảm Chân Thành) */}
                      <div
                        onMouseEnter={() => setHoveredPillarOrValue('pillar-2')}
                        onMouseLeave={() => setHoveredPillarOrValue(null)}
                        onClick={() => {
                          SoundEngine.playPop();
                          showToast('Trụ cột 02: Nhân Văn - Đồng cảm và thấu hiểu');
                        }}
                        className={cn(
                          'pillar-gradient-card rounded-[14px] bg-gradient-to-br from-rose-500 via-rose-600 to-pink-500 text-white p-3.5 shadow-sm flex flex-col justify-between min-h-[145px] relative overflow-hidden transition-all duration-300  hover:shadow-md border border-white/20 text-left group cursor-pointer',
                          isPillarHighlighted('pillar-2') &&
                            'ring-2 ring-pink-300 dark:ring-pink-400 shadow-[0_0_24px_rgba(244,114,182,0.7)] scale-[1.02] -translate-y-1'
                        )}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xs">
                            <Heart className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Nút nghe thuyết minh Audio Narration Pill */}
                            <button
                              type="button"
                              onClick={(e) =>
                                handleSpeakItem(
                                  'pillar-2',
                                  'Trụ cột hai, Nhân văn con người. Lắng nghe chân thành từ tâm, thấu cảm sâu sắc và lấy con người làm trọng tâm phụng sự.',
                                  'Trụ cột 02: Nhân Văn',
                                  e
                                )
                              }
                              className={cn(
                                'w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md',
                                activeSpeechId === 'pillar-2'
                                  ? 'bg-amber-400 text-slate-900 animate-pulse shadow-sm'
                                  : 'bg-white/20 hover:bg-white/35 text-white'
                              )}
                              title="Nghe AI Tí Chuột thuyết minh Trụ cột 02"
                            >
                              {activeSpeechId === 'pillar-2' ? (
                                <VolumeX className="w-3 h-3" />
                              ) : (
                                <Volume2 className="w-3 h-3" />
                              )}
                            </button>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                              02
                            </span>
                          </div>
                        </div>

                        <div className="my-1.5 relative z-10">
                          <h5 className="text-xs sm:text-sm font-black font-play !text-white">Nhân văn con người</h5>
                          <span className="text-[10px] text-rose-100 font-semibold block">Đồng cảm &amp; Thấu hiểu</span>
                          <p className="text-[11px] text-white/95 font-medium leading-snug mt-1">
                            Lắng nghe chân thành, phục vụ từ tâm và lấy con người làm trọng tâm.
                          </p>
                        </div>

                        <div className="self-end relative z-10">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenBentoFocus('pillars');
                            }}
                            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition text-white"
                            title="Xem chi tiết trụ cột nhân văn"
                          >
                            <ArrowRight className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Pillar 3: Bền Vững (Tương quan Giá trị Sự Tận Tâm) */}
                      <div
                        onMouseEnter={() => setHoveredPillarOrValue('pillar-3')}
                        onMouseLeave={() => setHoveredPillarOrValue(null)}
                        onClick={() => {
                          SoundEngine.playPop();
                          showToast('Trụ cột 03: Bền Vững - Giá trị dài hạn và tin cậy');
                        }}
                        className={cn(
                          'pillar-gradient-card rounded-[14px] bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-500 text-white p-3.5 shadow-sm flex flex-col justify-between min-h-[145px] relative overflow-hidden transition-all duration-300  hover:shadow-md border border-white/20 text-left group cursor-pointer',
                          isPillarHighlighted('pillar-3') &&
                            'ring-2 ring-emerald-300 dark:ring-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.7)] scale-[1.02] -translate-y-1'
                        )}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xs">
                            <Leaf className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Nút nghe thuyết minh Audio Narration Pill */}
                            <button
                              type="button"
                              onClick={(e) =>
                                handleSpeakItem(
                                  'pillar-3',
                                  'Trụ cột ba, Bền vững dài hạn. Xây dựng niềm tin bền bỉ, ứng dụng công nghệ CRM hiện đại và đồng hành phát triển dài lâu.',
                                  'Trụ cột 03: Bền Vững',
                                  e
                                )
                              }
                              className={cn(
                                'w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md',
                                activeSpeechId === 'pillar-3'
                                  ? 'bg-amber-400 text-slate-900 animate-pulse shadow-sm'
                                  : 'bg-white/20 hover:bg-white/35 text-white'
                              )}
                              title="Nghe AI Tí Chuột thuyết minh Trụ cột 03"
                            >
                              {activeSpeechId === 'pillar-3' ? (
                                <VolumeX className="w-3 h-3" />
                              ) : (
                                <Volume2 className="w-3 h-3" />
                              )}
                            </button>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                              03
                            </span>
                          </div>
                        </div>

                        <div className="my-1.5 relative z-10">
                          <h5 className="text-xs sm:text-sm font-black font-play !text-white">Bền vững dài hạn</h5>
                          <span className="text-[10px] text-emerald-100 font-semibold block">Giá trị &amp; Tin cậy</span>
                          <p className="text-[11px] text-white/95 font-medium leading-snug mt-1">
                            Xây dựng niềm tin vững bền, bảo chứng chất lượng và đồng hành lâu dài.
                          </p>
                        </div>

                        <div className="self-end relative z-10">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenBentoFocus('pillars');
                            }}
                            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition text-white"
                            title="Xem chi tiết trụ cột bền vững"
                          >
                            <ArrowRight className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Bento 2 Columns: Giá trị cốt lõi (lg:col-span-7) + Triết lý tầm nhìn (lg:col-span-5) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
                  {/* Giá trị cốt lõi (lg:col-span-7) với 3 thẻ Hologram lật 3D: Sự tận tâm, Kịp thời, Đồng cảm chân thành */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-current shrink-0" />
                        <h4 className="text-xs sm:text-sm font-black font-play text-amber-600 dark:text-amber-400">
                          {formatCardTitle('Giá trị cốt lõi')}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                        3 Cam kết vàng · Nhấp lật xem Case Study
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-stretch flex-1">
                      {/* Core Value 1: Sự tận tâm (Tương quan Trụ Cột Bền Vững) */}
                      <div
                        onMouseEnter={() => setHoveredPillarOrValue('val-1')}
                        onMouseLeave={() => setHoveredPillarOrValue(null)}
                        className={cn(
                          'relative min-h-[168px] sm:min-h-[175px] perspective-[1000px] transition-all duration-300',
                          isValueHighlighted('val-1') && 'scale-[1.02] -translate-y-1'
                        )}
                      >
                        <div
                          className={cn(
                            'w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d]',
                            flippedCoreValues['val-1'] ? '[transform:rotateY(180deg)]' : ''
                          )}
                        >
                          {/* MẶT TRƯỚC (Front) */}
                          <div
                            onClick={() => toggleFlipCoreValue('val-1')}
                            className={cn(
                              'pillar-gradient-card absolute inset-0 [backface-visibility:hidden] rounded-[14px] bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white p-3.5 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-md border border-white/20 text-left group cursor-pointer',
                              isValueHighlighted('val-1') &&
                                'ring-2 ring-amber-300 dark:ring-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.75)]'
                            )}
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xs">
                                <Award className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex items-center gap-1.5">
                                {/* Nút nghe thuyết minh Audio Narration Pill */}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleSpeakItem(
                                      'val-1',
                                      'Giá trị cốt lõi một, Sự tận tâm. Dốc trọn tâm sức, phụng sự chu đáo từng trải nghiệm với tinh thần trách nhiệm cao nhất.',
                                      'Giá trị 01: Sự Tận Tâm',
                                      e
                                    )
                                  }
                                  className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md',
                                    activeSpeechId === 'val-1'
                                      ? 'bg-white text-slate-900 animate-pulse shadow-sm'
                                      : 'bg-white/20 hover:bg-white/35 text-white'
                                  )}
                                  title="Nghe AI Tí Chuột thuyết minh Giá trị 01"
                                >
                                  {activeSpeechId === 'val-1' ? (
                                    <VolumeX className="w-3 h-3" />
                                  ) : (
                                    <Volume2 className="w-3 h-3" />
                                  )}
                                </button>
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                                  01
                                </span>
                              </div>
                            </div>

                            <div className="my-1 relative z-10">
                              <h5 className="text-xs sm:text-sm font-black font-play !text-white">Sự tận tâm</h5>
                              <span className="text-[10px] text-amber-100 font-semibold block">Trách nhiệm &amp; Hết lòng</span>
                              <p className="text-[11px] text-white/95 font-medium leading-snug mt-1">
                                Dốc trọn tâm sức, chăm chút tỉ mỉ từng trải nghiệm khách hàng với tinh thần phụng sự cao nhất.
                              </p>
                            </div>

                            {/* Value Pulse Indicator: Tỷ lệ giải quyết FCR / SLAs */}
                            <div className="pt-1.5 border-t border-white/20 relative z-10">
                              <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-amber-100 mb-0.5">
                                <span>FCR Cam kết</span>
                                <span className="text-white font-black">94.5%</span>
                              </div>
                              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: '94.5%' }} />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1 relative z-10">
                              <span className="text-[9.5px] font-mono text-amber-200">Case Study ➜</span>
                              <div
                                onClick={(e) => toggleFlipCoreValue('val-1', e)}
                                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center cursor-pointer transition text-white"
                                title="Lật xem tình huống thực tế Case Study CSKH"
                              >
                                <RotateCw className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* MẶT SAU (Back: Case Study CSKH) */}
                          <div
                            onClick={() => toggleFlipCoreValue('val-1')}
                            className={cn(
                              'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[14px] bg-gradient-to-br from-amber-700 via-orange-700 to-amber-800 text-white p-3 sm:p-3.5 shadow-md flex flex-col justify-between overflow-hidden border border-white/30 text-left cursor-pointer group',
                              isValueHighlighted('val-1') &&
                                'ring-2 ring-amber-300 dark:ring-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.75)]'
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between pb-1.5 border-b border-white/20">
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-amber-100">
                                  Case Study CSKH 01
                                </span>
                                <div
                                  onClick={(e) => toggleFlipCoreValue('val-1', e)}
                                  className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer text-white"
                                  title="Quay lại mặt trước"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </div>
                              </div>
                              <h6 className="text-[11.5px] sm:text-xs font-black font-play text-white mt-1.5 leading-tight">
                                Hỗ trợ sự cố bão số 9 xuyên đêm
                              </h6>
                              <p className="text-[10px] sm:text-[10.5px] text-amber-100/90 leading-tight mt-1">
                                Chủ động thiết lập đường dây nóng 24/7, gọi trực tiếp trấn an 100% khách hàng doanh nghiệp bị gián đoạn kết nối.
                              </p>
                            </div>

                            <div className="pt-1.5 border-t border-white/20">
                              <div className="flex items-center justify-between text-[9px] font-mono text-amber-200">
                                <span>Kết quả: FCR 94.5%</span>
                                <span className="text-white font-bold">CSAT 99.2%</span>
                              </div>
                              <span className="text-[9px] text-amber-100/80 block mt-0.5">
                                0 phát sinh khiếu nại sau phục hồi
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Core Value 2: Kịp thời (Tương quan Trụ Cột Hiệu Quả) */}
                      <div
                        onMouseEnter={() => setHoveredPillarOrValue('val-2')}
                        onMouseLeave={() => setHoveredPillarOrValue(null)}
                        className={cn(
                          'relative min-h-[168px] sm:min-h-[175px] perspective-[1000px] transition-all duration-300',
                          isValueHighlighted('val-2') && 'scale-[1.02] -translate-y-1'
                        )}
                      >
                        <div
                          className={cn(
                            'w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d]',
                            flippedCoreValues['val-2'] ? '[transform:rotateY(180deg)]' : ''
                          )}
                        >
                          {/* MẶT TRƯỚC (Front) */}
                          <div
                            onClick={() => toggleFlipCoreValue('val-2')}
                            className={cn(
                              'pillar-gradient-card absolute inset-0 [backface-visibility:hidden] rounded-[14px] bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 text-white p-3.5 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-md border border-white/20 text-left group cursor-pointer',
                              isValueHighlighted('val-2') &&
                                'ring-2 ring-pink-300 dark:ring-pink-400 shadow-[0_0_24px_rgba(244,114,182,0.75)]'
                            )}
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xs">
                                <Clock className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex items-center gap-1.5">
                                {/* Nút nghe thuyết minh Audio Narration Pill */}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleSpeakItem(
                                      'val-2',
                                      'Giá trị cốt lõi hai, Kịp thời nhanh nhạy. Phản ứng tốc độ dưới mười lăm phút, hiện diện đúng lúc giải quyết dứt điểm mọi vướng mắc.',
                                      'Giá trị 02: Kịp Thời',
                                      e
                                    )
                                  }
                                  className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md',
                                    activeSpeechId === 'val-2'
                                      ? 'bg-white text-slate-900 animate-pulse shadow-sm'
                                      : 'bg-white/20 hover:bg-white/35 text-white'
                                  )}
                                  title="Nghe AI Tí Chuột thuyết minh Giá trị 02"
                                >
                                  {activeSpeechId === 'val-2' ? (
                                    <VolumeX className="w-3 h-3" />
                                  ) : (
                                    <Volume2 className="w-3 h-3" />
                                  )}
                                </button>
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                                  02
                                </span>
                              </div>
                            </div>

                            <div className="my-1 relative z-10">
                              <h5 className="text-xs sm:text-sm font-black font-play !text-white">Kịp thời nhanh nhạy</h5>
                              <span className="text-[10px] text-rose-100 font-semibold block">Tốc độ &amp; Đúng lúc</span>
                              <p className="text-[11px] text-white/95 font-medium leading-snug mt-1">
                                Phản ứng nhanh chóng, đồng hành đúng thời điểm để giải quyết triệt để mọi vướng mắc.
                              </p>
                            </div>

                            {/* Value Pulse Indicator: Tỷ lệ đáp ứng SLA */}
                            <div className="pt-1.5 border-t border-white/20 relative z-10">
                              <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-rose-100 mb-0.5">
                                <span>SLA Phản hồi (&lt;15p)</span>
                                <span className="text-white font-black">98.8%</span>
                              </div>
                              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: '98.8%' }} />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1 relative z-10">
                              <span className="text-[9.5px] font-mono text-rose-200">Case Study ➜</span>
                              <div
                                onClick={(e) => toggleFlipCoreValue('val-2', e)}
                                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center cursor-pointer transition text-white"
                                title="Lật xem tình huống thực tế Case Study CSKH"
                              >
                                <RotateCw className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* MẶT SAU (Back: Case Study CSKH) */}
                          <div
                            onClick={() => toggleFlipCoreValue('val-2')}
                            className={cn(
                              'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[14px] bg-gradient-to-br from-rose-700 via-pink-700 to-rose-800 text-white p-3 sm:p-3.5 shadow-md flex flex-col justify-between overflow-hidden border border-white/30 text-left cursor-pointer group',
                              isValueHighlighted('val-2') &&
                                'ring-2 ring-pink-300 dark:ring-pink-400 shadow-[0_0_24px_rgba(244,114,182,0.75)]'
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between pb-1.5 border-b border-white/20">
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-rose-100">
                                  Case Study CSKH 02
                                </span>
                                <div
                                  onClick={(e) => toggleFlipCoreValue('val-2', e)}
                                  className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer text-white"
                                  title="Quay lại mặt trước"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </div>
                              </div>
                              <h6 className="text-[11.5px] sm:text-xs font-black font-play text-white mt-1.5 leading-tight">
                                Fast-Track dập khiếu nại nóng 24/7
                              </h6>
                              <p className="text-[10px] sm:text-[10.5px] text-rose-100/90 leading-tight mt-1">
                                Định tuyến trực tiếp khiếu nại nóng tới Trưởng bộ phận trong 3 phút, đưa giải pháp bước đầu dưới 12 phút.
                              </p>
                            </div>

                            <div className="pt-1.5 border-t border-white/20">
                              <div className="flex items-center justify-between text-[9px] font-mono text-rose-200">
                                <span>Tốc độ: &lt; 12 Phút</span>
                                <span className="text-white font-bold">Đúng hẹn 99.5%</span>
                              </div>
                              <span className="text-[9px] text-rose-100/80 block mt-0.5">
                                Ngăn ngừa 100% rủi ro leo thang khiếu kiện
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Core Value 3: Đồng cảm chân thành (Tương quan Trụ Cột Nhân Văn) */}
                      <div
                        onMouseEnter={() => setHoveredPillarOrValue('val-3')}
                        onMouseLeave={() => setHoveredPillarOrValue(null)}
                        className={cn(
                          'relative min-h-[168px] sm:min-h-[175px] perspective-[1000px] transition-all duration-300',
                          isValueHighlighted('val-3') && 'scale-[1.02] -translate-y-1'
                        )}
                      >
                        <div
                          className={cn(
                            'w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d]',
                            flippedCoreValues['val-3'] ? '[transform:rotateY(180deg)]' : ''
                          )}
                        >
                          {/* MẶT TRƯỚC (Front) */}
                          <div
                            onClick={() => toggleFlipCoreValue('val-3')}
                            className={cn(
                              'pillar-gradient-card absolute inset-0 [backface-visibility:hidden] rounded-[14px] bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white p-3.5 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-md border border-white/20 text-left group cursor-pointer',
                              isValueHighlighted('val-3') &&
                                'ring-2 ring-purple-300 dark:ring-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.75)]'
                            )}
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xs">
                                <HeartHandshake className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex items-center gap-1.5">
                                {/* Nút nghe thuyết minh Audio Narration Pill */}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleSpeakItem(
                                      'val-3',
                                      'Giá trị cốt lõi ba, Đồng cảm chân thành. Đặt trọn trái tim lắng nghe không phán xét, kết nối sâu sắc và thấu cảm từng khách hàng.',
                                      'Giá trị 03: Đồng Cảm Chân Thành',
                                      e
                                    )
                                  }
                                  className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md',
                                    activeSpeechId === 'val-3'
                                      ? 'bg-white text-slate-900 animate-pulse shadow-sm'
                                      : 'bg-white/20 hover:bg-white/35 text-white'
                                  )}
                                  title="Nghe AI Tí Chuột thuyết minh Giá trị 03"
                                >
                                  {activeSpeechId === 'val-3' ? (
                                    <VolumeX className="w-3 h-3" />
                                  ) : (
                                    <Volume2 className="w-3 h-3" />
                                  )}
                                </button>
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                                  03
                                </span>
                              </div>
                            </div>

                            <div className="my-1 relative z-10">
                              <h5 className="text-xs sm:text-sm font-black font-play !text-white">Đồng cảm chân thành</h5>
                              <span className="text-[10px] text-purple-100 font-semibold block">Lắng nghe &amp; Thấu cảm</span>
                              <p className="text-[11px] text-white/95 font-medium leading-snug mt-1">
                                Đặt trọn trái tim để lắng nghe, thấu hiểu cảm xúc và kết nối sâu sắc với từng khách hàng.
                              </p>
                            </div>

                            {/* Value Pulse Indicator: Chỉ số CSAT */}
                            <div className="pt-1.5 border-t border-white/20 relative z-10">
                              <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-purple-100 mb-0.5">
                                <span>Chỉ số CSAT Hài lòng</span>
                                <span className="text-white font-black">98.6%</span>
                              </div>
                              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: '98.6%' }} />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1 relative z-10">
                              <span className="text-[9.5px] font-mono text-purple-200">Case Study ➜</span>
                              <div
                                onClick={(e) => toggleFlipCoreValue('val-3', e)}
                                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center cursor-pointer transition text-white"
                                title="Lật xem tình huống thực tế Case Study CSKH"
                              >
                                <RotateCw className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* MẶT SAU (Back: Case Study CSKH) */}
                          <div
                            onClick={() => toggleFlipCoreValue('val-3')}
                            className={cn(
                              'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[14px] bg-gradient-to-br from-purple-800 via-indigo-800 to-purple-900 text-white p-3 sm:p-3.5 shadow-md flex flex-col justify-between overflow-hidden border border-white/30 text-left cursor-pointer group',
                              isValueHighlighted('val-3') &&
                                'ring-2 ring-purple-300 dark:ring-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.75)]'
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between pb-1.5 border-b border-white/20">
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-purple-100">
                                  Case Study CSKH 03
                                </span>
                                <div
                                  onClick={(e) => toggleFlipCoreValue('val-3', e)}
                                  className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer text-white"
                                  title="Quay lại mặt trước"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </div>
                              </div>
                              <h6 className="text-[11.5px] sm:text-xs font-black font-play text-white mt-1.5 leading-tight">
                                Biến bức xúc thành Đại sứ thương hiệu
                              </h6>
                              <p className="text-[10px] sm:text-[10.5px] text-purple-100/90 leading-tight mt-1">
                                Lắng nghe không phán xét, thư tay tri ân &amp; chính sách bù đắp cá nhân hóa cho khách hàng VIP bức xúc.
                              </p>
                            </div>

                            <div className="pt-1.5 border-t border-white/20">
                              <div className="flex items-center justify-between text-[9px] font-mono text-purple-200">
                                <span>Gắn kết: 96%</span>
                                <span className="text-white font-bold">CSAT 98.6%</span>
                              </div>
                              <span className="text-[9px] text-purple-100/80 block mt-0.5">
                                Khách hàng tái ký hợp đồng 3 năm liên tiếp
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Triết lý và tầm nhìn (lg:col-span-5) - Nơi chuyển "Khách hàng là trung tâm ♡" sang */}
                  <div
                    className="lg:col-span-5 p-4 sm:p-5 rounded-[14px] bg-gradient-to-br from-sky-50/90 via-cyan-50/70 to-blue-100/60 dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-blue-950/40 border border-sky-200/80 dark:border-sky-800/50 shadow-2xs flex flex-col justify-between relative hover:shadow-xs transition-all duration-300 min-h-[175px]"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-sky-200/60 dark:border-sky-800/40">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                          <h5 className="text-xs sm:text-sm font-black font-play text-blue-600 dark:text-sky-400">
                            {formatCardTitle('Triết lý tầm nhìn')}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10">
                          CX 2026+
                        </span>
                      </div>

                      <div className="my-2.5">
                        <p className="text-xs sm:text-[12.5px] font-black text-blue-700 dark:text-cyan-300 font-play leading-snug">
                          “ Tận Tâm &amp; Đồng Hành Cùng Trải Nghiệm Khách Hàng ”.
                        </p>
                        <p className="text-[11px] sm:text-[11.5px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-1.5">
                          Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi
                          khách hàng cảm nhận được một điều đơn giản mà rất lớn: họ luôn được lắng nghe.
                        </p>
                      </div>
                    </div>

                    {/* Khách hàng là trung tâm ♡ chuyển sang đây */}
                    <div className="pt-2.5 flex items-center justify-between border-t border-sky-200/60 dark:border-sky-800/40">
                      <span className="font-handwriting text-cyan-600 dark:text-cyan-400 text-lg sm:text-xl font-bold select-none drop-shadow-xs">
                        Khách hàng là trung tâm ♡
                      </span>
                      <div className="text-right text-[10.5px] text-slate-500 dark:text-slate-400 font-mono">
                        <span className="text-blue-600 dark:text-cyan-300 font-bold block">22+ Năm Vận Hành</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Maps Location Popup Modal */}
      <AnimatePresence>
        {selectedMapLocation && selectedMapLocation.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMapLocation(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: '22px' }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/15 p-4 sm:p-6 shadow-2xl z-10 flex flex-col gap-3 text-slate-800 dark:text-slate-100 font-play overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${
                      selectedMapLocation.type === 'cu_tru' ? 'bg-emerald-600' : 'bg-purple-600'
                    }`}
                  >
                    {selectedMapLocation.type === 'cu_tru' ? (
                      <Home className="w-4.5 h-4.5" />
                    ) : (
                      <MapPin className="w-4.5 h-4.5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight font-play">
                      {selectedMapLocation.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {selectedMapLocation.address}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMapLocation(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-950">
                <iframe
                  title={selectedMapLocation.title}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    selectedMapLocation.query
                  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{selectedMapLocation.address}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedMapLocation.query
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Mở Google Maps</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMapLocation(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold transition-all cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bento Card Focus / Expand Modal (Yêu Cầu 5) */}
      <Modal
        isOpen={!!focusedBentoCard}
        onClose={handleCloseBentoFocus}
        title={
          focusedBentoCard === 'hero'
            ? 'Chân Dung Chuyên Gia & Trợ Lý Ảo'
            : focusedBentoCard === 'stats'
            ? '4 Dấu Ấn Năng Lực Vận Hành Thực Chiến'
            : focusedBentoCard === 'demographics'
            ? 'Hồ Sơ Nhân Khẩu Học & Lộ Trình Di Chuyển'
            : focusedBentoCard === 'map'
            ? 'Bản Đồ Cư Trú & Công Tác Tương Tác'
            : focusedBentoCard === 'pillars'
            ? '3 Trụ Cột Vận Hành Chiến Lược (22+ Năm)'
            : focusedBentoCard === 'philosophy'
            ? 'Giá Trị Cốt Lõi & Triết Lý Tầm Nhìn CX 2026+'
            : 'Chi Tiết Thẻ Bento'
        }
        subtitle={
          focusedBentoCard === 'hero'
            ? 'Chuyên gia Vận hành & Trải nghiệm Khách hàng (CX) 22+ năm kinh nghiệm'
            : focusedBentoCard === 'stats'
            ? 'Số liệu thực tế đo lường qua hơn hai thập kỷ quản trị hệ thống'
            : focusedBentoCard === 'demographics'
            ? 'Thông tin nhân khẩu, lộ trình di chuyển 68km kết nối Q7 - Mỹ Tho & chế độ làm việc linh hoạt'
            : focusedBentoCard === 'map'
            ? 'Vị trí địa lý kết nối hai đầu cầu làm việc Quận 7, TP.HCM & Mỹ Tho, Tiền Giang'
            : focusedBentoCard === 'pillars'
            ? 'Hiệu Quả - Nhân Văn - Bền Vững: 3 kim chỉ nam điều hành bền vững'
            : focusedBentoCard === 'philosophy'
            ? 'Khách hàng là trung tâm - Đồng hành từ tâm cùng sự đồng cảm kịp thời'
            : undefined
        }
        icon={
          focusedBentoCard === 'hero' ? (
            <Bot className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          ) : focusedBentoCard === 'stats' ? (
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          ) : focusedBentoCard === 'demographics' ? (
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : focusedBentoCard === 'map' ? (
            <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          ) : focusedBentoCard === 'pillars' ? (
            <Target className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          ) : focusedBentoCard === 'philosophy' ? (
            <Star className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-500" />
          ) : undefined
        }
        maxWidth="5xl"
      >
        {renderFocusedCardContent()}
      </Modal>
    </section>
  );
}
