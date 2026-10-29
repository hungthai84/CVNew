'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { WebIcon } from '@/components/ui/WebIcon';
import { Modal } from '@/components/ui/Modal';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { findBestVoice, findBestEnglishVoice, VOICE_CHANGE_EVENT, getSavedVoiceURI, saveDefaultVoiceURI } from '@/utils/speechVoice';
import { useToast } from '@/components/ui/Toast';
import { formatCardTitle } from '@/lib/utils';
import { getSavedMutedPref, saveMutedPref, AUDIO_PREF_EVENT } from '@/utils/audioPreference';
import { AmbientSoundEngine } from '@/utils/ambientSoundEngine';
import {
  CAREER_MILESTONES_DATA,
  CORE_VALUES_DATA,
  OPERATIONAL_PRINCIPLES_DATA,
  CareerMilestoneItem,
} from '@/data/letterData';
import { LetterBentoDashboard } from '@/components/views/LetterBentoDashboard';

// Video thuyết minh Thư Ngỏ (Cloudinary Transition Studio)
export const LETTER_SLIDE_1_VIDEO_URL =
  'https://res.cloudinary.com/q5tpzaxk/video/upload/v1793040322/transition-studio-take_24.mp4';

// Authentic Signature vector for Nguyễn Hùng Thái
const SignatureSvg = () => (
  <svg
    className="w-32 sm:w-36 h-10 sm:h-11 text-blue-600 dark:text-cyan-400 opacity-95 relative select-none pointer-events-none"
    viewBox="0 0 220 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
    <path d="M 38 42 L 185 34" strokeWidth="2" />
    <path d="M 82 10 L 82 65" strokeWidth="2.8" />
  </svg>
);

// Map icon string name to WebIcon name
const getMilestoneIconName = (name: string): string => {
  switch (name) {
    case 'Signal':
      return 'signal';
    case 'Headset':
      return 'headphones';
    case 'Tv':
      return 'tv';
    case 'Gamepad2':
      return 'gamepad';
    case 'ShoppingBag':
    case 'ShoppingCart':
      return 'shopping-bag';
    case 'ShieldCheck':
      return 'shield';
    case 'CreditCard':
      return 'card';
    case 'Heart':
      return 'heart';
    case 'Lightbulb':
      return 'lightbulb';
    case 'BarChart2':
      return 'chart';
    case 'Users':
      return 'users';
    case 'Target':
      return 'target';
    case 'Sparkles':
      return 'sparkles';
    case 'Award':
      return 'trophy';
    case 'Rocket':
      return 'rocket';
    case 'Network':
      return 'network';
    default:
      return 'briefcase';
  }
};

// Slide sections metadata for interactive navigation
const LETTER_SECTIONS = [
  { id: 0, shortLabel: 'Thông Điệp Hợp Tác', icon: 'mail' },
  { id: 1, shortLabel: 'Sự Nghiệp 2002 - 2011', icon: 'rocket' },
  { id: 2, shortLabel: 'Sự Nghiệp 2013 - 2023+', icon: 'briefcase' },
  { id: 3, shortLabel: 'Triết Lý Quản Trị', icon: 'trophy' },
];

// Interface for Video Presentation Timecode Cues
interface VideoPresentationCue {
  id: string;
  startPct: number;
  endPct: number;
  slideIndex: number;
  targetId: string;
  noteBadge: string;
  noteTitle: string;
  noteSummary: string;
  highlightKeywords: string[];
  colorPreset: 'amber' | 'cyan' | 'purple' | 'emerald' | 'rose' | 'blue';
}

// 7 Mốc Thuyết Minh Đồng Bộ Toàn Diện Video Scena AI xuyên suốt 4 Slide
const PRESENTATION_VIDEO_CUES: VideoPresentationCue[] = [
  {
    id: 'cue-0-salutation',
    startPct: 0,
    endPct: 14,
    slideIndex: 0,
    targetId: 'callout-salutation',
    noteBadge: '🤝 Lời Mở Đầu',
    noteTitle: 'Kính Chào Quý Đối Tác',
    noteSummary: 'Gửi lời chào trân trọng và lời chúc hợp tác thịnh vượng đến Quý Doanh nghiệp.',
    highlightKeywords: ['Kính chào', 'Thông điệp', 'Hợp tác'],
    colorPreset: 'amber',
  },
  {
    id: 'cue-0-exp',
    startPct: 14,
    endPct: 28,
    slideIndex: 0,
    targetId: 'bento-experience-intro',
    noteBadge: '🌟 Bề Dày 22 Năm',
    noteTitle: 'Chuyên Gia Quản Trị Dịch Vụ',
    noteSummary: 'Hơn hai thập kỷ kiên định xây dựng, vận hành và chuẩn hóa hệ thống CSKH đa ngành.',
    highlightKeywords: ['Nguyễn Hùng Thái', '22 năm kinh nghiệm', 'xây dựng, vận hành'],
    colorPreset: 'cyan',
  },
  {
    id: 'cue-0-pillars',
    startPct: 28,
    endPct: 42,
    slideIndex: 0,
    targetId: 'bento-three-pillars',
    noteBadge: '🏛️ 3 Trụ Cột Nền Tảng',
    noteTitle: 'Quy Trình · Con Người · Công Nghệ',
    noteSummary: 'Chuẩn hóa KPI, phát triển nhân sự thấu cảm và bứt phá đòn bẩy tự động hóa AI/CRM.',
    highlightKeywords: ['Quy Trình Tạo Nền Tảng', 'Con Người Tạo Giá Trị', 'Công Nghệ Tạo Đòn Bẩy'],
    colorPreset: 'emerald',
  },
  {
    id: 'cue-1-mobifone',
    startPct: 42,
    endPct: 56,
    slideIndex: 1,
    targetId: 'card-2002',
    noteBadge: '🚀 Nền Tảng Viễn Thông',
    noteTitle: 'MobiFone (2002) & Bước Ngoặt HTV (2011)',
    noteSummary: 'Đào tạo bài bản tiêu chuẩn viễn thông, chuyển mình thành nhà quản trị toàn diện tại HTV-TMS.',
    highlightKeywords: ['MobiFone', 'Viễn Liên V247', 'LBC – Truyền hình Cáp HTV', 'chuẩn hóa quy trình'],
    colorPreset: 'blue',
  },
  {
    id: 'cue-2-shopee-garena',
    startPct: 56,
    endPct: 70,
    slideIndex: 2,
    targetId: 'card-2013',
    noteBadge: '📦 Bứt Phá TMĐT',
    noteTitle: 'Shopee & Garena (2013)',
    noteSummary: 'Điều hành hệ thống quy mô triệu người dùng, đạt CSAT 99% và đào tạo 100.000+ nhân sự.',
    highlightKeywords: ['Garena & Shopee', 'CSAT 99%', '100.000+ học viên', 'triệu người dùng'],
    colorPreset: 'amber',
  },
  {
    id: 'cue-2-prudential-momo',
    startPct: 70,
    endPct: 84,
    slideIndex: 2,
    targetId: 'card-2016',
    noteBadge: '💳 Tài Chính - Fintech',
    noteTitle: 'Prudential (2016) & MoMo (2018)',
    noteSummary: 'Nâng chuẩn dịch vụ tài chính bảo hiểm cao cấp, tối ưu hóa trải nghiệm số ví điện tử.',
    highlightKeywords: ['Prudential', 'MoMo', 'Ví ECO', 'Fintech', 'bền vững'],
    colorPreset: 'rose',
  },
  {
    id: 'cue-3-philosophy',
    startPct: 84,
    endPct: 100,
    slideIndex: 3,
    targetId: 'card-philosophy-gratitude',
    noteBadge: '💎 Triết Lý Phụng Sự',
    noteTitle: 'Đồng Hành & Phát Triển Bền Vững',
    noteSummary: 'Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự.',
    highlightKeywords: ['Triết Lý Quản Trị', 'chân thành', 'phụng sự', 'bền vững'],
    colorPreset: 'purple',
  },
];

// Interface for AI Voice Narration Segment
interface NarrationSegment {
  id: string;
  slideIndex: number;
  targetId: string;
  label: string;
  text: string;
}

// Animated Audio Waveform Visualizer Component
const AudioWaveformVisualizer: React.FC<{
  isPlaying: boolean;
  barCount?: number;
  size?: 'sm' | 'md';
}> = ({ isPlaying, barCount = 12, size = 'md' }) => {
  const heights = [45, 85, 60, 100, 70, 95, 50, 90, 65, 100, 75, 55];
  const colors = [
    'from-blue-500 to-cyan-400',
    'from-cyan-500 to-teal-400',
    'from-indigo-500 to-blue-400',
    'from-purple-500 to-indigo-400',
    'from-rose-500 to-pink-400',
    'from-emerald-500 to-teal-400',
  ];

  return (
    <div
      className={`inline-flex items-center gap-[2.5px] ${
        size === 'sm' ? 'h-3.5' : 'h-4 sm:h-5'
      } px-1 select-none`}
      aria-hidden="true"
    >
      {Array.from({ length: barCount }).map((_, idx) => {
        const maxH = heights[idx % heights.length];
        const colorGrad = colors[idx % colors.length];
        return (
          <span
            key={idx}
            className={`w-[2.5px] rounded-full bg-gradient-to-t ${colorGrad} transition-all duration-300 ${
              isPlaying ? 'animate-voice-bar' : 'opacity-40'
            }`}
            style={{
              height: isPlaying ? `${maxH}%` : '28%',
              animationDelay: `${(idx * 0.09).toFixed(2)}s`,
              animationDuration: `${(0.55 + (idx % 4) * 0.12).toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// Animated Card Title Subcomponent
const AnimatedCardTitle: React.FC<{
  iconName: string;
  title: string;
  subtitle?: string;
  colorPreset?: 'emerald' | 'cyan' | 'purple' | 'rose' | 'orange' | 'blue';
  actionRight?: React.ReactNode;
  animateIcon?: boolean;
  matchTitleColor?: boolean;
}> = ({
  iconName,
  title,
  subtitle,
  colorPreset = 'blue',
  actionRight,
  animateIcon = false,
  matchTitleColor = false,
}) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-700/50',
      text: 'text-emerald-700 dark:text-emerald-300',
      sub: 'text-emerald-700/90 dark:text-emerald-400',
    },
    cyan: {
      bg: 'bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-200/80 dark:border-cyan-700/50',
      text: 'text-cyan-700 dark:text-cyan-300',
      sub: 'text-cyan-700/90 dark:text-cyan-400',
    },
    purple: {
      bg: 'bg-purple-100/90 dark:bg-purple-950/80 border border-purple-200/80 dark:border-purple-700/50',
      text: 'text-purple-700 dark:text-purple-300',
      sub: 'text-purple-700/90 dark:text-purple-400',
    },
    rose: {
      bg: 'bg-rose-100/90 dark:bg-rose-950/80 border border-rose-200/80 dark:border-rose-700/50',
      text: 'text-rose-700 dark:text-rose-300',
      sub: 'text-rose-700/90 dark:text-rose-400',
    },
    orange: {
      bg: 'bg-orange-100/90 dark:bg-orange-950/80 border border-orange-200/80 dark:border-orange-700/50',
      text: 'text-orange-700 dark:text-orange-300',
      sub: 'text-orange-700/90 dark:text-orange-400',
    },
    blue: {
      bg: 'bg-blue-100/90 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-700/50',
      text: 'text-blue-700 dark:text-blue-300',
      sub: 'text-blue-700/90 dark:text-blue-400',
    },
  };

  const scheme = colorMap[colorPreset] || colorMap.blue;

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left min-w-0 flex-1">
        {/* Tiêu đề không đóng khung, icon & tiêu đề cùng màu và kích thước tương xứng */}
        <div
          className={`flex items-center gap-2 ${scheme.text} max-w-full`}
        >
          <span
            className={`shrink-0 ${
              animateIcon ? 'animate-[icon-floating_3s_ease-in-out_infinite]' : ''
            }`}
          >
            <WebIcon name={iconName} className="w-4.5 h-4.5 card-title-icon" />
          </span>
          <h3
            className={`typo-card-title font-semibold ${scheme.text} font-play truncate`}
          >
            {formatCardTitle(title)}
          </h3>
        </div>
        {subtitle && (
          <p className={`typo-caption font-medium ${scheme.sub} truncate sm:ml-1`}>
            {subtitle}
          </p>
        )}
      </div>
      {actionRight && <div className="shrink-0">{actionRight}</div>}
    </div>
  );
};

export interface LetterViewProps {
  currentTheme?: string;
}

export const LetterView: React.FC<LetterViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();

  // Saved default voice URI synchronized with AI Assistant and global system
  const [currentVoiceURI, setCurrentVoiceURI] = useState<string>(() => {
    return getSavedVoiceURI();
  });

  // Current Slide: 0 -> Slide 1, 1 -> Slide 2, 2 -> Slide 3, 3 -> Slide 4
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Feature 1: Chế độ xem ('dashboard' = Bảng tổng quan Bento mới 100% như hình | 'slides' = Trình chiếu 4 slide | 'one-page' = Một trang)
  const [viewMode, setViewMode] = useState<'dashboard' | 'slides' | 'one-page'>('dashboard');

  // Current Theme detection
  const isDark = currentTheme === 'dark-neon';

  // Chế độ thu gọn / mở rộng thanh tiện ích bên phải (Mặc định luôn hiển thị đầy đủ ở trang Thư Ngỏ)
  const [isRightDockCollapsed, setIsRightDockCollapsed] = useState<boolean>(false);

  // Floating expandable navigation control bar on hover
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setIsNavHovered(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Feature 2: Cá nhân hóa tên "Quý Công ty" từ URL (?company=...) hoặc tùy chỉnh trực tiếp
  const [companyName, setCompanyName] = useState<string>('');
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);
  const [companyInputDraft, setCompanyInputDraft] = useState<string>('');

  // Feature 5: Karaoke Word Sync progress (0 -> 1) cho thẻ đang thuyết minh
  const [karaokeProgress, setKaraokeProgress] = useState<number>(0);
  const karaokeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Selected milestone for detail modal
  const [selectedMilestone, setSelectedMilestone] = useState<CareerMilestoneItem | null>(null);

  // Collapse/Expand state for career milestones inline bilingual view
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({});

  // Dynamic position tracking for Right-Side Toolbar (Bám sát mép phải website right: 0, chiều cao bằng #center-card)
  const [sideToolbarPos, setSideToolbarPos] = useState<{
    top: number;
    height: number;
  }>({
    top: 0,
    height: 0,
  });
  const [isClientMounted, setIsClientMounted] = useState<boolean>(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsClientMounted(true);
    const updateSideToolbarPosition = () => {
      const centerCard = document.getElementById('center-card');
      if (centerCard) {
        const rect = centerCard.getBoundingClientRect();
        setSideToolbarPos({
          top: rect.top,
          height: rect.height,
        });
      }
    };

    updateSideToolbarPosition();
    window.addEventListener('resize', updateSideToolbarPosition);
    window.addEventListener('scroll', updateSideToolbarPosition, true);
    const timer = setTimeout(updateSideToolbarPosition, 150);
    return () => {
      window.removeEventListener('resize', updateSideToolbarPosition);
      window.removeEventListener('scroll', updateSideToolbarPosition, true);
      clearTimeout(timer);
    };
  }, []);

  // Lắng nghe click outside để tự động đóng menu điều khiển
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setIsNavHovered(false);
        setIsNavMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // =========================================================================
  // FLOATING CIRCLE PIP VIDEO PRESENTATION (VIDEO THUYẾT MINH GÓC PHẢI DƯỚI)
  // =========================================================================
  const floatingVideoRef = useRef<HTMLVideoElement | null>(null);
  // Mặc định thuyết trình không auto-play: người dùng chủ động bấm phát khi muốn nghe
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(() => getSavedMutedPref(true));
  const [videoProgressPct, setVideoProgressPct] = useState<number>(0);
  const [autoSyncVideoWithSlides, setAutoSyncVideoWithSlides] = useState<boolean>(true);
  const lastActiveCueIdRef = useRef<string>('');

  // Chế Độ Thuyết Trình Tự Động Kèm Nhạc Nền Lo-Fi (Autoplay Presentation with Ambient Audio)
  const [isAutoplayPresentation, setIsAutoplayPresentation] = useState<boolean>(false);
  const [isLofiAudioEnabled, setIsLofiAudioEnabled] = useState<boolean>(true);
  const [isDuckingActive, setIsDuckingActive] = useState<boolean>(false);
  const savedVideoTimeRef = useRef<number>(0);

  // Dọn dẹp âm thanh khi unmount
  useEffect(() => {
    return () => {
      AmbientSoundEngine.stop();
    };
  }, []);

  // Lắng nghe đồng bộ âm thanh video toàn hệ thống
  useEffect(() => {
    const handleAudioPref = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.muted === 'boolean') {
        setIsVideoMuted(customEvent.detail.muted);
        if (floatingVideoRef.current) {
          floatingVideoRef.current.muted = customEvent.detail.muted;
        }
      }
    };
    window.addEventListener(AUDIO_PREF_EVENT, handleAudioPref);
    return () => window.removeEventListener(AUDIO_PREF_EVENT, handleAudioPref);
  }, []);

  // =========================================================================
  // AI VOICE NARRATION STATE & ENGINE (ĐỌC TỰ ĐỘNG 4 PHẦN THƯ NGỎ)
  // =========================================================================
  // Chế Độ Thuyết Minh Song Ngữ (Bilingual Narration: 'vi' = Tiếng Việt, 'en' = English)
  const [narrationLanguage, setNarrationLanguage] = useState<'vi' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hungthai_narration_lang');
        if (saved === 'en' || saved === 'vi') return saved;
      } catch {}
    }
    return 'vi';
  });
  const narrationLanguageRef = useRef<'vi' | 'en'>('vi');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    narrationLanguageRef.current = narrationLanguage;
  }, [narrationLanguage]);

  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const isNarratingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const autoAdvanceRef = useRef<boolean>(true);
  const speechRateRef = useRef<number>(1.0);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const utteranceIdRef = useRef<number>(0);

  const clearKaraokeTimer = useCallback(() => {
    if (karaokeIntervalRef.current) {
      clearInterval(karaokeIntervalRef.current);
      karaokeIntervalRef.current = null;
    }
  }, []);

  // Cơ Chế Giảm Âm Lượng Nhạc Nền Tinh Tế (Ambient Audio Ducking Engine)
  useEffect(() => {
    if (!isLofiAudioEnabled) {
      AmbientSoundEngine.stop();
      return;
    }

    if (!isAutoplayPresentation) {
      return;
    }

    // Nhạc nền Lofi tự động giảm âm lượng khi có giọng đọc AI TTS hoặc khi video thuyết minh đang phát có tiếng
    const isVoiceActive = (isVideoPlaying && !isVideoMuted) || (isNarrating && !isPaused);
    setIsDuckingActive(isVoiceActive);

    if (isVoiceActive) {
      // Giảm âm lượng Lo-Fi xuống 12% để giọng đọc AI và thuyết minh nổi bật, rõ ràng
      AmbientSoundEngine.setVolume(12);
    } else {
      // Tăng âm lượng Lo-Fi trở lại mức nền thư thái 32%
      AmbientSoundEngine.setVolume(32);
    }
  }, [isLofiAudioEnabled, isAutoplayPresentation, isVideoPlaying, isVideoMuted, isNarrating, isPaused]);

  // Tên hiển thị "Quý Công ty" đã cá nhân hóa (ví dụ: "Quý Công ty FPT")
  const companyDisplay = useMemo(() => {
    const trimmed = companyName.trim();
    if (!trimmed) return 'Quý Công ty';
    if (/^quý\s+công\s+ty/i.test(trimmed)) return trimmed;
    if (/^công\s+ty/i.test(trimmed)) return `Quý ${trimmed}`;
    return `Quý Công ty ${trimmed}`;
  }, [companyName]);

  // Khôi phục slide mặc định & đọc tham số ?company=... trên URL khi mở trang Thư Ngỏ
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCompany =
        params.get('company') || params.get('doitac') || params.get('partner') || '';
      const savedCompany = localStorage.getItem('hungthai_letter_company_name') || '';
      const initialCompany = urlCompany.trim() || savedCompany.trim();
      if (initialCompany) {
        setCompanyName(initialCompany);
        setCompanyInputDraft(initialCompany);
      }

      const urlMode = params.get('letterMode') || params.get('mode');
      if (urlMode === 'one-page' || urlMode === 'full') {
        setViewMode('one-page');
      }

      const savedSlide = localStorage.getItem('hungthai_letter_active_slide');
      if (savedSlide !== null) {
        const parsed = parseInt(savedSlide, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 3) {
          setCurrentSlide(parsed);
        }
      }
      const savedAutoAdvance = localStorage.getItem('hungthai_letter_auto_advance');
      if (savedAutoAdvance !== null) {
        setAutoAdvance(savedAutoAdvance === 'true');
      }
      const savedRate = localStorage.getItem('hungthai_letter_speech_rate');
      if (savedRate !== null) {
        const rateParsed = parseFloat(savedRate);
        if (!isNaN(rateParsed) && rateParsed >= 0.5 && rateParsed <= 2) {
          setSpeechRate(rateParsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Áp dụng tên Quý Công ty cá nhân hóa & cập nhật URL
  const handleApplyCompanyName = useCallback(
    (newCompany: string, copyShareLink: boolean = false) => {
      if (typeof window === 'undefined') return;
      const cleaned = newCompany.trim();
      setCompanyName(cleaned);
      setCompanyInputDraft(cleaned);
      try {
        if (cleaned) {
          localStorage.setItem('hungthai_letter_company_name', cleaned);
        } else {
          localStorage.removeItem('hungthai_letter_company_name');
        }
        const url = new URL(window.location.href);
        if (cleaned) {
          url.searchParams.set('company', cleaned);
        } else {
          url.searchParams.delete('company');
        }
        window.history.replaceState({}, '', url.toString());

        if (copyShareLink && navigator.clipboard) {
          navigator.clipboard.writeText(url.toString()).catch(() => {});
          SoundEngine.playTap();
          showToast(
            cleaned
              ? `Đã sao chép link cá nhân hóa cho Quý Công ty ${cleaned}!`
              : 'Đã sao chép link Thư Ngỏ mặc định!'
          );
          setIsCompanyModalOpen(false);
          return;
        }
      } catch {
        // ignore
      }
      SoundEngine.playTap();
      showToast(
        cleaned
          ? `Đã cá nhân hóa Thư Ngỏ gửi tới: Quý Công ty ${cleaned}!`
          : 'Đã đặt lại lời chào mặc định: Kính chào Quý Công ty!'
      );
      setIsCompanyModalOpen(false);
    },
    [showToast]
  );

  // Lắng nghe sự kiện VOICE_CHANGE_EVENT để đồng bộ giọng đọc AI mặc định toàn hệ thống
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleVoiceChange = (e: CustomEvent<{ voiceURI: string }>) => {
      if (e.detail?.voiceURI) {
        setCurrentVoiceURI(e.detail.voiceURI);
      } else {
        setCurrentVoiceURI(getSavedVoiceURI());
      }
    };
    window.addEventListener(VOICE_CHANGE_EVENT as any, handleVoiceChange);
    return () => {
      window.removeEventListener(VOICE_CHANGE_EVENT as any, handleVoiceChange);
    };
  }, []);

  // Hàm áp dụng và lưu cấu hình làm mặc định
  const handleSaveDefaultSettings = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('hungthai_letter_active_slide', currentSlide.toString());
      localStorage.setItem('hungthai_letter_auto_advance', autoAdvance ? 'true' : 'false');
      localStorage.setItem('hungthai_letter_speech_rate', speechRate.toString());
      if (currentVoiceURI) {
        saveDefaultVoiceURI(currentVoiceURI);
      }
      SoundEngine.playTap();
      showToast(
        `Đã thiết lập Phần ${currentSlide + 1} (${LETTER_SECTIONS[currentSlide]?.shortLabel}) và Giọng đọc AI làm mặc định thành công!`
      );
    } catch (e) {
      console.warn('Could not save letter defaults:', e);
    }
  }, [currentSlide, autoAdvance, speechRate, currentVoiceURI, showToast]);

  // Sync refs with state
  useEffect(() => {
    isNarratingRef.current = isNarrating;
  }, [isNarrating]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    autoAdvanceRef.current = autoAdvance;
  }, [autoAdvance]);

  useEffect(() => {
    speechRateRef.current = speechRate;
  }, [speechRate]);

  // Xây dựng kịch bản thuyết minh Song Ngữ (Bilingual Narration: Tiếng Việt chuẩn mực & Tiếng Anh chuyên nghiệp)
  const narrationSegments = useMemo<NarrationSegment[]>(() => {
    const cleanBold = (str: string) => str.replace(/\*\*(.*?)\*\*/g, '$1');
    const isEn = narrationLanguage === 'en';

    // Slide 0: Mở đầu lời chào & Triết lý phục vụ
    const slide0Segments: NarrationSegment[] = [
      {
        id: 'seg-s0-1',
        slideIndex: 0,
        targetId: 'card-main-letter-content',
        label: isEn
          ? 'Cooperation Message — Opening Greeting'
          : 'Thông điệp hợp tác — Lời chào mở đầu',
        text: isEn
          ? `Warmest greetings to ${companyDisplay}! I am Nguyen Hung Thai, a Senior Customer Experience and Operations Leader with over 22 years of hands-on expertise in architecting, operating, and scaling customer service ecosystems.`
          : `Kính chào ${companyDisplay}! Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng.`,
      },
      {
        id: 'seg-s0-2',
        slideIndex: 0,
        targetId: 'card-main-letter-content',
        label: isEn
          ? 'Cooperation Message — Partnership & Commitment'
          : 'Thông điệp hợp tác — Đồng hành & Cam kết',
        text: isEn
          ? `I look forward to partnering with ${companyDisplay} to establish modern, customer-centric support systems that optimize operational costs and foster long-term sustainable growth. Thank you sincerely for your valuable time and attention!`
          : `Tôi mong muốn được đồng hành cùng ${companyDisplay} trong việc xây dựng một hệ thống chăm sóc khách hàng hiện đại, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra giá trị phát triển bền vững. Xin trân trọng cảm ơn ${companyDisplay} đã dành thời gian lắng nghe!`,
      },
      {
        id: 'seg-s0-3',
        slideIndex: 0,
        targetId: 'quote-banner-slide-1',
        label: isEn ? 'Service Philosophy' : 'Phương châm phụng sự',
        text: isEn
          ? 'Service Credo: True success comes not merely from competence, but from genuine empathy and a steadfast dedication to service.'
          : 'Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự.',
      },
    ];

    // Slide 1: 3 Cột mốc khởi đầu sự nghiệp (MobiFone, V247, LBC)
    const slide1Segments: NarrationSegment[] = CAREER_MILESTONES_DATA.slice(0, 3).map(
      (item) => ({
        id: `seg-s1-${item.id}`,
        slideIndex: 1,
        targetId: item.id,
        label: isEn
          ? `${item.company} (${item.yearLabelEn || item.yearLabelVi})`
          : item.milestoneTitleVi || `${item.company} (${item.yearLabelVi})`,
        text: isEn
          ? `${item.company} (${item.yearLabelEn || item.yearLabelVi}). Role: ${item.roleEn}. ${cleanBold(item.descEn)}. Key highlight: ${cleanBold(item.highlightEn)}.`
          : `${item.milestoneTitleVi || item.company}. ${cleanBold(item.descVi)}`,
      })
    );

    // Slide 2: 4 Cột mốc quản trị quy mô lớn (Garena, Prudential, MoMo, Finviet)
    const slide2Segments: NarrationSegment[] = CAREER_MILESTONES_DATA.slice(3, 7).map(
      (item) => ({
        id: `seg-s2-${item.id}`,
        slideIndex: 2,
        targetId: item.id,
        label: isEn
          ? `${item.company} (${item.yearLabelEn || item.yearLabelVi})`
          : item.milestoneTitleVi || `${item.company} (${item.yearLabelVi})`,
        text: isEn
          ? `${item.company} (${item.yearLabelEn || item.yearLabelVi}). Role: ${item.roleEn}. ${cleanBold(item.descEn)}. Key highlight: ${cleanBold(item.highlightEn)}.`
          : `${item.milestoneTitleVi || item.company}. ${cleanBold(item.descVi)} ${
              item.descViPart2 ? cleanBold(item.descViPart2) : ''
            }`,
      })
    );

    // Slide 3: Triết lý quản trị & 4 Giá trị cốt lõi
    const slide3Segments: NarrationSegment[] = [
      {
        id: 'seg-s3-philosophy',
        slideIndex: 3,
        targetId: 'card-philosophy-gratitude',
        label: isEn ? 'Management Philosophy' : 'Triết lý quản trị',
        text: isEn
          ? 'Executive Leadership Philosophy. Over more than two decades across diverse industries, I have realized that customer service is not merely about resolving issues, but about architecting a foundation that enables sustainable business growth. I steadfastly adhere to three core pillars: Process establishes the foundation. People create real value. Technology delivers the leverage.'
          : 'Triết lý quản trị. Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững. Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi: Quy trình tạo nền tảng. Con người tạo giá trị. Công nghệ tạo đòn bẩy.',
      },
      {
        id: 'seg-s3-gratitude',
        slideIndex: 3,
        targetId: 'card-philosophy-gratitude',
        label: isEn
          ? `Dedication & Appreciation to ${companyDisplay}`
          : `Tâm niệm & Lời cảm ơn ${companyDisplay}`,
        text: isEn
          ? `Accordingly, I focus on integrating scalable CRM architectures, executive BI dashboards, AI chatbots, and smart automation workflows to boost operational throughput and empower data-driven decision making. Alongside technology, people remain the pivotal factor of enduring success. I nurture teams that listen with empathy and consistently exceed customer expectations. I eagerly look forward to joining hands with ${companyDisplay} on new horizons! Thank you sincerely!`
          : `Từ đó, tôi tập trung xây dựng các hệ thống CRM, Dashboard quản trị, AI Chatbot và các giải pháp tự động hóa, nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu. Bên cạnh công nghệ, tôi luôn xem con người là yếu tố quyết định thành công. Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng. Tôi luôn tâm niệm: Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời. Tôi mong muốn được đồng hành cùng ${companyDisplay} trong việc xây dựng một hệ thống chăm sóc khách hàng hiện đại, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra giá trị phát triển bền vững. Xin trân trọng cảm ơn ${companyDisplay} đã dành thời gian lắng nghe!`,
      },
      ...CORE_VALUES_DATA.map((val, idx) => ({
        id: `seg-s3-val-${val.number}`,
        slideIndex: 3,
        targetId: `core-val-${val.number}`,
        label: isEn
          ? `Core Value ${val.number}: ${val.titleEn}`
          : `Giá trị cốt lõi ${val.number}: ${val.titleVi}`,
        text: isEn
          ? `${idx === 0 ? 'Four guiding core values include: ' : ''}Value ${idx + 1}, ${val.titleEn}: ${val.descEn}`
          : `${
              idx === 0 ? 'Bốn giá trị cốt lõi phát triển gồm: ' : ''
            }Giá trị thứ ${idx + 1}, ${val.titleVi}: ${val.descVi}`,
      })),
    ];

    return [...slide0Segments, ...slide1Segments, ...slide2Segments, ...slide3Segments];
  }, [companyDisplay, narrationLanguage]);

  // Load browser speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      if (avail && avail.length > 0) {
        setVoices(avail);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      utteranceIdRef.current += 1;
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      if (karaokeIntervalRef.current) clearInterval(karaokeIntervalRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const stopNarration = useCallback(() => {
    utteranceIdRef.current += 1;
    clearFallbackTimer();
    clearKaraokeTimer();
    setKaraokeProgress(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setIsPaused(false);
    isNarratingRef.current = false;
    isPausedRef.current = false;
  }, [clearFallbackTimer, clearKaraokeTimer]);

  // Play a specific segment index and chain to the next segment
  const playSegmentAtIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= narrationSegments.length) {
        stopNarration();
        return;
      }

      const segment = narrationSegments[index];
      const currentCallId = ++utteranceIdRef.current;
      clearFallbackTimer();
      clearKaraokeTimer();
      setKaraokeProgress(0);

      setActiveSegmentIndex(index);
      setIsNarrating(true);
      setIsPaused(false);
      isNarratingRef.current = true;
      isPausedRef.current = false;

      // Automatically switch slide if segment belongs to another slide
      setCurrentSlide((prevSlide) => {
        if (prevSlide !== segment.slideIndex) {
          setSlideDirection(segment.slideIndex > prevSlide ? 'next' : 'prev');
          SoundEngine.playPageFlip();
          return segment.slideIndex;
        }
        return prevSlide;
      });

      const handleSegmentCompleted = () => {
        if (utteranceIdRef.current !== currentCallId || !isNarratingRef.current) return;
        clearFallbackTimer();
        clearKaraokeTimer();
        setKaraokeProgress(1);

        const nextIndex = index + 1;
        if (nextIndex >= narrationSegments.length) {
          stopNarration();
          return;
        }

        const nextSegment = narrationSegments[nextIndex];
        // Check if moving to a new slide section
        if (nextSegment.slideIndex !== segment.slideIndex && !autoAdvanceRef.current) {
          // Stop at end of current section if autoAdvance is disabled
          stopNarration();
          return;
        }

        playSegmentAtIndex(nextIndex);
      };

      // Estimated duration fallback in case browser TTS doesn't fire onend reliably
      const wordsCount = segment.text.split(/\s+/).length;
      const estimatedMs = Math.max(
        3500,
        Math.round(((wordsCount / 2.7) * 1000) / speechRateRef.current) + 1500
      );

      // Smooth Karaoke Word Sync progress tracker
      let elapsedMs = 0;
      const stepMs = 90;
      const speechDurationMs = Math.max(2000, estimatedMs - 1000);
      karaokeIntervalRef.current = setInterval(() => {
        if (!isNarratingRef.current || utteranceIdRef.current !== currentCallId) {
          clearKaraokeTimer();
          return;
        }
        if (isPausedRef.current) return;
        elapsedMs += stepMs;
        const pct = Math.min(0.98, elapsedMs / speechDurationMs);
        setKaraokeProgress((prev) => Math.max(prev, pct));
      }, stepMs);

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(segment.text);
          const isEn = narrationLanguageRef.current === 'en';

          if (isEn) {
            utterance.lang = 'en-US';
            utterance.rate = speechRateRef.current * 0.96;
            utterance.pitch = 1.0;
            const chosenVoice = findBestEnglishVoice(voices);
            if (chosenVoice) {
              utterance.voice = chosenVoice;
            }
          } else {
            utterance.lang = 'vi-VN';
            utterance.rate = speechRateRef.current;
            utterance.pitch = 1.02;
            const chosenVoice = findBestVoice(voices);
            if (chosenVoice) {
              utterance.voice = chosenVoice;
            }
          }

          utterance.onboundary = (event) => {
            if (utteranceIdRef.current === currentCallId && segment.text.length > 0) {
              const charPct = Math.min(0.99, event.charIndex / segment.text.length);
              setKaraokeProgress((prev) => Math.max(prev, charPct));
            }
          };

          utterance.onend = () => {
            handleSegmentCompleted();
          };

          utterance.onerror = () => {
            // If speech synthesis errors or is blocked, still allow smooth visual narration fallback
            if (utteranceIdRef.current === currentCallId && isNarratingRef.current) {
              clearFallbackTimer();
              fallbackTimerRef.current = setTimeout(handleSegmentCompleted, 2600);
            }
          };

          window.speechSynthesis.speak(utterance);
          fallbackTimerRef.current = setTimeout(handleSegmentCompleted, estimatedMs);
        } catch {
          fallbackTimerRef.current = setTimeout(handleSegmentCompleted, estimatedMs);
        }
      } else {
        fallbackTimerRef.current = setTimeout(handleSegmentCompleted, estimatedMs);
      }
    },
    [narrationSegments, voices, clearFallbackTimer, clearKaraokeTimer, stopNarration]
  );

  // Phát giọng đọc AI trực tiếp cho 1 cột mốc năm bất kỳ (từ Timeline Mini hoặc Thẻ)
  const handleNarrateMilestone = useCallback(
    (milestoneId: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      SoundEngine.playTap();
      const segIdx = narrationSegments.findIndex((s) => s.targetId === milestoneId);
      if (segIdx !== -1) {
        playSegmentAtIndex(segIdx);
      }
    },
    [narrationSegments, playSegmentAtIndex]
  );

  // Start or Toggle Play/Pause Voice Narration
  const handleToggleNarration = useCallback(() => {
    SoundEngine.playTap();
    if (!isNarrating) {
      // Find first segment of current slide to start reading from current slide
      const firstSegIdx = narrationSegments.findIndex((s) => s.slideIndex === currentSlide);
      playSegmentAtIndex(firstSegIdx >= 0 ? firstSegIdx : 0);
      return;
    }

    if (isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        playSegmentAtIndex(activeSegmentIndex);
      }
    } else {
      setIsPaused(true);
      isPausedRef.current = true;
      clearFallbackTimer();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    }
  }, [
    isNarrating,
    isPaused,
    currentSlide,
    narrationSegments,
    activeSegmentIndex,
    playSegmentAtIndex,
    clearFallbackTimer,
  ]);

  // Cycle reading speed (0.9x -> 1.0x -> 1.15x -> 1.25x)
  const handleCycleSpeed = useCallback(() => {
    SoundEngine.playTap();
    const speeds = [0.9, 1.0, 1.15, 1.25];
    const nextIdx = (speeds.indexOf(speechRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setSpeechRate(nextSpeed);
    speechRateRef.current = nextSpeed;
    if (isNarrating && !isPaused) {
      playSegmentAtIndex(activeSegmentIndex);
    }
  }, [speechRate, isNarrating, isPaused, activeSegmentIndex, playSegmentAtIndex]);

  // Chuyển đổi ngôn ngữ giọng đọc Song Ngữ (Bilingual Narration Switcher: VI <-> EN)
  const handleToggleNarrationLanguage = useCallback(() => {
    SoundEngine.playTap();
    const nextLang: 'vi' | 'en' = narrationLanguage === 'vi' ? 'en' : 'vi';
    setNarrationLanguage(nextLang);
    narrationLanguageRef.current = nextLang;
    try {
      localStorage.setItem('hungthai_narration_lang', nextLang);
    } catch {}

    showToast(
      nextLang === 'en'
        ? '🇬🇧 Switched to Professional English Voice Narration'
        : '🇻🇳 Đã chuyển sang Giọng đọc Tiếng Việt chuẩn mực'
    );

    // Nếu đang phát thuyết minh, tự động phát lại đoạn hiện tại với ngôn ngữ mới
    if (isNarratingRef.current) {
      setTimeout(() => {
        playSegmentAtIndex(activeSegmentIndex);
      }, 150);
    }
  }, [narrationLanguage, showToast, playSegmentAtIndex, activeSegmentIndex]);

  // Chọn trực tiếp ngôn ngữ thuyết minh từ danh sách chọn
  const handleSelectNarrationLanguage = useCallback(
    (targetLang: 'vi' | 'en') => {
      SoundEngine.playTap();
      setNarrationLanguage(targetLang);
      narrationLanguageRef.current = targetLang;
      try {
        localStorage.setItem('hungthai_narration_lang', targetLang);
      } catch {}

      showToast(
        targetLang === 'en'
          ? '🇬🇧 Switched to Professional English Voice Narration'
          : '🇻🇳 Đã chuyển sang Giọng đọc Tiếng Việt chuẩn mực'
      );

      // Nếu đang phát thuyết minh, tự động phát lại đoạn hiện tại với ngôn ngữ mới
      if (isNarratingRef.current) {
        setTimeout(() => {
          playSegmentAtIndex(activeSegmentIndex);
        }, 150);
      }
      setIsLangMenuOpen(false);
    },
    [showToast, playSegmentAtIndex, activeSegmentIndex]
  );

  const handleSelectSlide = useCallback(
    (targetSlide: number) => {
      if (targetSlide === currentSlide) return;
      setSlideDirection(targetSlide > currentSlide ? 'next' : 'prev');
      setCurrentSlide(targetSlide);
      // If currently narrating, jump voice narration to the selected slide
      if (isNarratingRef.current) {
        const segIdx = narrationSegments.findIndex((s) => s.slideIndex === targetSlide);
        if (segIdx !== -1) {
          playSegmentAtIndex(segIdx);
        }
      }
    },
    [currentSlide, narrationSegments, playSegmentAtIndex]
  );

  const handlePrevSlide = useCallback(() => {
    setSlideDirection('prev');
    const targetSlide = currentSlide > 0 ? currentSlide - 1 : 3;
    setCurrentSlide(targetSlide);
    if (isNarratingRef.current) {
      const segIdx = narrationSegments.findIndex((s) => s.slideIndex === targetSlide);
      if (segIdx !== -1) playSegmentAtIndex(segIdx);
    }
  }, [currentSlide, narrationSegments, playSegmentAtIndex]);

  const handleNextSlide = useCallback(() => {
    setSlideDirection('next');
    const targetSlide = currentSlide < 3 ? currentSlide + 1 : 0;
    setCurrentSlide(targetSlide);
    if (isNarratingRef.current) {
      const segIdx = narrationSegments.findIndex((s) => s.slideIndex === targetSlide);
      if (segIdx !== -1) playSegmentAtIndex(segIdx);
    }
  }, [currentSlide, narrationSegments, playSegmentAtIndex]);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMilestone) return;
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, selectedMilestone]);

  // Floating Video Presentation Handlers & Synchronization
  const handleFloatingVideoLoadedMetadata = useCallback(() => {
    if (floatingVideoRef.current && savedVideoTimeRef.current > 0) {
      floatingVideoRef.current.currentTime = savedVideoTimeRef.current;
    }
  }, []);

  // Đảm bảo tuyệt đối không auto play video hoặc thuyết minh khi mở trang hay chuyển chế độ Trình chiếu
  useEffect(() => {
    setIsAutoplayPresentation(false);
    setIsVideoPlaying(false);
    if (floatingVideoRef.current && !floatingVideoRef.current.paused) {
      floatingVideoRef.current.pause();
    }
  }, [viewMode]);

  const handleFloatingVideoTimeUpdate = useCallback(() => {
    if (!floatingVideoRef.current) return;
    const { currentTime, duration } = floatingVideoRef.current;
    if (!duration || isNaN(duration) || duration <= 0) return;
    savedVideoTimeRef.current = currentTime;
    const pct = Math.min(100, Math.max(0, (currentTime / duration) * 100));
    setVideoProgressPct(pct);

    const cue =
      PRESENTATION_VIDEO_CUES.find((c) => pct >= c.startPct && pct < c.endPct) ||
      PRESENTATION_VIDEO_CUES[PRESENTATION_VIDEO_CUES.length - 1];

    if (cue && cue.id !== lastActiveCueIdRef.current) {
      lastActiveCueIdRef.current = cue.id;
      if (autoSyncVideoWithSlides && cue.slideIndex !== currentSlide) {
        setSlideDirection(cue.slideIndex > currentSlide ? 'next' : 'prev');
        setCurrentSlide(cue.slideIndex);
        SoundEngine.playPageFlip();
      }
    }
  }, [autoSyncVideoWithSlides, currentSlide]);

  const toggleFloatingVideoPlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playTap();
    if (!floatingVideoRef.current) return;
    if (floatingVideoRef.current.paused) {
      floatingVideoRef.current
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => {});
    } else {
      floatingVideoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  const toggleFloatingVideoMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playTap();
    setIsVideoMuted((prev) => {
      const next = !prev;
      if (floatingVideoRef.current) floatingVideoRef.current.muted = next;
      saveMutedPref(next);
      showToast(next ? 'Đã tắt tiếng video thuyết minh' : 'Đã bật tiếng video thuyết minh 🔊');
      return next;
    });
  }, [showToast]);

  const toggleAutoSyncVideoWithSlides = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playTap();
    setAutoSyncVideoWithSlides((prev) => {
      const next = !prev;
      showToast(
        next
          ? 'Đã bật tự động lật slide theo tiến trình video'
          : 'Đã tắt tự động lật slide theo tiến trình video'
      );
      return next;
    });
  }, [showToast]);

  // Bật / Tắt Chế Độ Thuyết Trình Tự Động Kèm Nhạc Nền Lo-Fi
  const handleToggleAutoplayPresentation = useCallback(() => {
    SoundEngine.playTap();
    if (isAutoplayPresentation) {
      setIsAutoplayPresentation(false);
      if (floatingVideoRef.current) {
        floatingVideoRef.current.pause();
        setIsVideoPlaying(false);
      }
      AmbientSoundEngine.stop();
      showToast('Đã dừng chế độ Thuyết trình Tự động');
    } else {
      setIsAutoplayPresentation(true);
      setViewMode('slides');
      setAutoSyncVideoWithSlides(true);

      // Bật nhạc nền Lo-Fi 'cosmos' 432Hz thư thái
      if (isLofiAudioEnabled) {
        AmbientSoundEngine.startTrack('cosmos', 32);
      }

      // Khởi chạy video thuyết minh và đồng bộ âm thanh
      if (floatingVideoRef.current) {
        floatingVideoRef.current.muted = false;
        setIsVideoMuted(false);
        saveMutedPref(false);
        floatingVideoRef.current
          .play()
          .then(() => setIsVideoPlaying(true))
          .catch(() => {});
      }
      showToast('Bắt đầu Thuyết trình Tự động kèm Nhạc nền Lo-Fi (4 Slide)');
    }
  }, [isAutoplayPresentation, isLofiAudioEnabled, showToast]);

  // Bật / Tắt riêng Nhạc Nền Lo-Fi
  const toggleLofiAudio = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    SoundEngine.playTap();
    setIsLofiAudioEnabled((prev) => {
      const next = !prev;
      if (next) {
        AmbientSoundEngine.startTrack('cosmos', isDuckingActive ? 12 : 32);
        showToast('Đã bật Nhạc Nền Lo-Fi Thư Thái (Ambient Pad 432Hz)');
      } else {
        AmbientSoundEngine.stop();
        showToast('Đã tắt Nhạc Nền Lo-Fi');
      }
      return next;
    });
  }, [isDuckingActive, showToast]);

  // Active Video Cue based on playback progress percentage
  const activeVideoCue = useMemo(() => {
    return (
      PRESENTATION_VIDEO_CUES.find(
        (c) => videoProgressPct >= c.startPct && videoProgressPct < c.endPct
      ) || PRESENTATION_VIDEO_CUES[0]
    );
  }, [videoProgressPct]);

  // Tiến trình nội bộ của Cue Video Scena AI hiện tại (từ 0.0 đến 1.0)
  const currentCueProgress = useMemo(() => {
    if (!activeVideoCue) return 0;
    const span = activeVideoCue.endPct - activeVideoCue.startPct;
    if (span <= 0) return 0;
    return Math.max(0, Math.min(1, (videoProgressPct - activeVideoCue.startPct) / span));
  }, [videoProgressPct, activeVideoCue]);

  // Tiến trình Karaoke đồng bộ hiệu dụng (cả khi phát video Scena AI lẫn giọng đọc TTS)
  const effectiveKaraokeProgress = isVideoPlaying ? currentCueProgress : karaokeProgress;

  // Active segment metadata: Kết hợp cả AI Voice TTS lẫn Video Timecode Cues
  const currentSegment = narrationSegments[activeSegmentIndex] || narrationSegments[0];
  const activeTargetId = isNarrating
    ? currentSegment?.targetId
    : isVideoPlaying
    ? activeVideoCue?.targetId
    : null;
  const progressPercent = isNarrating
    ? Math.round(((activeSegmentIndex + 1) / narrationSegments.length) * 100)
    : isVideoPlaying
    ? Math.round(videoProgressPct)
    : 0;

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    return 'bg-white/85 dark:bg-[#121624]/90 border border-white/90 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_10px_32px_-4px_rgba(31,38,135,0.09),0_4px_12px_-2px_rgba(15,23,42,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_38px_-6px_rgba(0,0,0,0.7),0_0_20px_-2px_rgba(56,189,248,0.2),inset_0_1px_1.5px_rgba(255,255,255,0.15)] hover:shadow-[0_18px_42px_-6px_rgba(31,38,135,0.15)] dark:hover:shadow-[0_20px_45px_-6px_rgba(0,0,0,0.85),0_0_28px_rgba(56,189,248,0.35)] transition-all duration-300';
  }, []);

  // Đếm tổng số cụm từ khóa in đậm (**...**) trong đoạn văn
  const countBoldKeywords = useCallback((text?: string) => {
    if (!text) return 0;
    const tokens = text.split('**');
    return Math.floor(tokens.length / 2);
  }, []);

  // Feature 5: Helper format in đậm kết hợp Hiệu Ứng Highlight Từ Khóa Theo Giọng Đọc (Karaoke Word Sync)
  const renderFormattedText = useCallback(
    (
      text: string,
      options?: {
        isCardReading?: boolean;
        keywordOffset?: number;
        totalKeywords?: number;
      }
    ) => {
      if (!text) return '';
      const tokens = text.split('**');
      const isCardReading = options?.isCardReading ?? false;
      const keywordOffset = options?.keywordOffset ?? 0;
      const totalKeywords = options?.totalKeywords ?? Math.max(1, Math.floor(tokens.length / 2));
      const activeKwIndex = isCardReading
        ? Math.min(totalKeywords - 1, Math.floor(effectiveKaraokeProgress * totalKeywords))
        : -1;

      return tokens.map((part, i) => {
        if (i % 2 === 1) {
          const kwIdx = keywordOffset + Math.floor(i / 2);
          const isCurrentKeyword = isCardReading && kwIdx === activeKwIndex;
          const isPassedKeyword = isCardReading && kwIdx < activeKwIndex;

          return (
            <strong
              key={i}
              className={
                isCurrentKeyword
                  ? 'font-bold text-slate-950 dark:text-amber-100 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 dark:from-amber-500/45 dark:via-yellow-400/35 dark:to-amber-500/45 px-1.5 py-0.5 rounded-md ring-2 ring-amber-400 dark:ring-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.75)] transition-all duration-300 inline-block scale-[1.03]'
                  : isPassedKeyword
                  ? 'font-bold text-emerald-700 dark:text-cyan-300 underline decoration-emerald-400/80 dark:decoration-cyan-400/80 decoration-2 underline-offset-2 transition-colors duration-300'
                  : 'font-bold text-slate-900 dark:text-white transition-colors duration-300'
              }
            >
              {part}
            </strong>
          );
        }
        return part;
      });
    },
    [effectiveKaraokeProgress]
  );

  // Feature 3: Nút Tải Bản PDF "Thư Ngỏ Nguyễn Hùng Thái" Chuẩn A4
  const handleExportLetterPDF = useCallback(() => {
    if (typeof window === 'undefined') return;
    SoundEngine.playTap();
    showToast(`Đang khởi tạo bản PDF Chuẩn A4 gửi tới ${companyDisplay}...`);

    const formatHtmlBold = (str?: string) =>
      (str || '').replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0f172a;font-weight:700;">$1</strong>');

    const milestonesHtml = CAREER_MILESTONES_DATA.map(
      (m) => `
      <div class="milestone-item">
        <div class="milestone-header">
          <span class="milestone-title" style="color:${m.color}">${m.milestoneTitleVi || m.company}</span>
          <span class="milestone-role">${m.roleVi} (${m.yearLabelVi})</span>
        </div>
        <p class="milestone-desc">${formatHtmlBold(m.descVi)}</p>
        ${m.descViPart2 ? `<p class="milestone-desc" style="margin-top:6px;">${formatHtmlBold(m.descViPart2)}</p>` : ''}
      </div>
    `
    ).join('');

    const printHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Thư Ngỏ Nguyễn Hùng Thái - ${companyDisplay}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Play', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.55;
      font-size: 12.5px;
      background: #ffffff;
    }
    .page-container {
      max-width: 780px;
      margin: 0 auto;
      padding: 4px 0;
    }
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid #1e40af;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .author-name {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .author-title {
      font-size: 13px;
      font-weight: 700;
      color: #1d4ed8;
      margin-top: 2px;
    }
    .contact-meta {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.45;
    }
    .salutation {
      font-size: 15px;
      font-weight: 700;
      color: #c2410c;
      margin-bottom: 8px;
    }
    .intro-para {
      margin-bottom: 12px;
      text-align: justify;
    }
    .section-heading {
      font-size: 13.5px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      border-left: 3.5px solid #2563eb;
      padding-left: 8px;
      margin: 12px 0 8px 0;
    }
    .milestone-item {
      margin-bottom: 9px;
      padding: 7px 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      page-break-inside: avoid;
    }
    .milestone-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    .milestone-title {
      font-size: 13px;
      font-weight: 700;
    }
    .milestone-role {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
    }
    .milestone-desc {
      text-align: justify;
      font-size: 12px;
      color: #334155;
    }
    .principles-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin: 8px 0;
    }
    .principle-pill {
      padding: 7px 9px;
      border-radius: 7px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      font-size: 11.5px;
      font-weight: 700;
      color: #1e40af;
      text-align: center;
    }
    .quote-callout {
      margin: 9px 0;
      padding: 8px 12px;
      background: #fffbeb;
      border-left: 3.5px solid #f59e0b;
      font-style: italic;
      font-weight: 700;
      color: #92400e;
      font-size: 12px;
    }
    .closing-section {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      page-break-inside: avoid;
    }
    .signature-block {
      text-align: center;
      min-width: 210px;
    }
    .sig-svg {
      width: 140px;
      height: 46px;
      color: #1d4ed8;
      margin: 4px auto;
    }
    @media print {
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="letterhead">
      <div>
        <div class="author-name">Nguyễn Hùng Thái</div>
        <div class="author-title">Trưởng phòng Chăm sóc Khách hàng • 22+ Năm Kinh Nghiệm</div>
      </div>
      <div class="contact-meta">
        <div><strong>Hồ sơ năng lực:</strong> Hung Thai Executive Portal</div>
        <div><strong>Chuyên môn:</strong> Contact Center, CX, CRM & AI Automation</div>
        <div><strong>Người nhận:</strong> ${companyDisplay}</div>
      </div>
    </div>

    <div class="salutation">Kính chào ${companyDisplay}!</div>
    <p class="intro-para">
      Tôi là <strong>Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn <strong>22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng.
    </p>

    <div class="section-heading">Hành Trình Sự Nghiệp & Dấu Ấn Quản Trị (2002 – 2023+)</div>
    ${milestonesHtml}

    <div class="section-heading">Triết Lý Quản Trị & Tâm Niệm Phụng Sự</div>
    <p class="intro-para">
      Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững. Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi:
    </p>
    <div class="principles-box">
      <div class="principle-pill">1. Quy trình tạo nền tảng.</div>
      <div class="principle-pill">2. Con người tạo giá trị.</div>
      <div class="principle-pill">3. Công nghệ tạo đòn bẩy.</div>
    </div>
    <p class="intro-para">
      Từ đó, tôi tập trung xây dựng các hệ thống <strong>CRM</strong>, <strong>Dashboard quản trị</strong>, <strong>AI Chatbot</strong> và các giải pháp <strong>tự động hóa</strong>, nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu. Bên cạnh công nghệ, tôi luôn xem <strong>con người là yếu tố quyết định thành công</strong>. Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng. Tôi luôn tâm niệm:
    </p>
    <div class="quote-callout">
      “Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.”<br/>
      “Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự.”
    </div>

    <div class="closing-section">
      <div style="max-width: 62%;">
        <p class="intro-para" style="margin-bottom:6px;">
          Tôi mong muốn được đồng hành cùng <strong>${companyDisplay}</strong> trong việc xây dựng một hệ thống chăm sóc khách hàng hiện đại, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra giá trị phát triển bền vững.
        </p>
        <p style="font-weight:700; color:#0f172a;">
          Xin trân trọng cảm ơn ${companyDisplay} đã dành thời gian lắng nghe!
        </p>
      </div>
      <div class="signature-block">
        <div style="font-size:11px;color:#64748b;">Trân trọng kính chào,</div>
        <svg class="sig-svg" viewBox="0 0 220 80" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
          <path d="M 38 42 L 185 34" stroke-width="2" />
          <path d="M 82 10 L 82 65" stroke-width="2.8" />
        </svg>
        <div style="font-size:14px;font-weight:700;color:#0f172a;">Nguyễn Hùng Thái</div>
        <div style="font-size:10.5px;color:#475569;font-weight:700;">Trưởng phòng Chăm sóc Khách hàng</div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

    const printWin = window.open('', '_blank', 'width=900,height=1000');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(printHtml);
      printWin.document.close();
    } else {
      window.print();
    }
  }, [companyDisplay, showToast]);

  // Feature 4: Timeline Mini Tương Tác Ngay Trên Đầu Slide 2 & Slide 3 (2002 -> 2007 -> 2011 -> 2013 -> 2016 -> 2018 -> 2023)
  const renderInteractiveMiniTimeline = () => (
    <div className="w-full flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1.5 px-2.5 rounded-xl bg-slate-100/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shrink-0">
      <div className="flex items-center gap-1.5 shrink-0 mr-1">
        <WebIcon name="clock" className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
        <span className="text-[10.5px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 font-play">
          Mốc Năm:
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 flex-1 justify-start sm:justify-between min-w-max">
        {CAREER_MILESTONES_DATA.map((m, idx) => {
          const targetSlideForMilestone = idx < 3 ? 1 : 2;
          const isBeingRead = activeTargetId === m.id;
          const isCurrentSlideGroup =
            viewMode === 'one-page' || currentSlide === targetSlideForMilestone;
          const shortYear = m.yearLabelVi.replace('+', '');

          return (
            <React.Fragment key={m.id}>
              <div
                className={`inline-flex items-center rounded-full border transition-all duration-200 shadow-2xs overflow-hidden ${
                  isBeingRead
                    ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                    : isCurrentSlideGroup
                    ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-400'
                    : 'bg-white/60 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-slate-200/70 dark:border-slate-800 opacity-75 hover:opacity-100'
                }`}
              >
                {/* Bấm vào năm để mở Popup chi tiết & nhảy tới slide tương ứng */}
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    if (viewMode === 'slides' && currentSlide !== targetSlideForMilestone) {
                      setSlideDirection(targetSlideForMilestone > currentSlide ? 'next' : 'prev');
                      setCurrentSlide(targetSlideForMilestone);
                    }
                    setSelectedMilestone(m);
                  }}
                  title={`Xem chi tiết cột mốc ${m.milestoneTitleVi || m.company}`}
                  className="px-2 sm:px-2.5 py-0.5 flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-bold font-play cursor-pointer"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: isBeingRead ? '#ffffff' : m.color }}
                  />
                  <span className="font-mono font-bold">{shortYear}</span>
                  <span className="hidden md:inline truncate max-w-[85px]">{m.company}</span>
                </button>

                {/* Nút loa nhỏ phát giọng đọc AI + Karaoke trực tiếp cho cột mốc năm đó */}
                <button
                  type="button"
                  onClick={(e) => handleNarrateMilestone(m.id, e)}
                  title={`Nghe thuyết minh AI & Highlight từ khóa mốc ${shortYear} - ${m.company}`}
                  className={`px-1.5 py-0.5 border-l transition-colors cursor-pointer flex items-center justify-center ${
                    isBeingRead
                      ? 'border-emerald-400 bg-emerald-700 text-white'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-600 dark:text-cyan-400'
                  }`}
                >
                  <WebIcon name={isBeingRead && !isPaused ? 'pause' : 'volume-2'} className="w-2.5 h-2.5" />
                </button>
              </div>

              {idx < CAREER_MILESTONES_DATA.length - 1 && (
                <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono select-none">
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  // Render unified executive glass navigation dock bám sát cạnh phải website
  const renderTopNavigationBar = () => {
    if (!isClientMounted || typeof document === 'undefined') return null;

    const isExpanded = !isRightDockCollapsed || isNavHovered || isNavMenuOpen;

    const navContent = (
      <aside
        ref={navContainerRef}
        role="region"
        aria-label="Thanh điều khiển bên phải trang thư ngỏ"
        onMouseEnter={() => {
          setIsNavHovered(true);
        }}
        onMouseLeave={() => {
          if (!isNavMenuOpen) setIsNavHovered(false);
        }}
        onDoubleClick={() => {
          SoundEngine.playGlassChime();
          setIsRightDockCollapsed((prev) => !prev);
        }}
        title="Nhấp đúp chuột để thu gọn / mở rộng thanh tiện ích thư ngỏ"
        style={
          sideToolbarPos.height > 0
            ? {
                top: `${sideToolbarPos.top}px`,
                height: `${sideToolbarPos.height}px`,
                right: 0,
              }
            : { right: 0 }
        }
        className={`fixed right-0 ${
          sideToolbarPos.height > 0 ? '' : 'top-1/2 -translate-y-1/2'
        } z-40 flex flex-col justify-start items-center py-2.5 px-1.5 select-none transition-all duration-300 rounded-none rounded-tl-[20px] rounded-bl-[20px] border-0 pointer-events-auto font-play ${
          !isExpanded
            ? 'w-[48px]'
            : 'w-[185px]'
        } ${
          isDark
            ? 'bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_45px_-6px_rgba(0,0,0,0.75),0_0_24px_rgba(34,211,238,0.22)]'
            : 'bg-white/85 backdrop-blur-xl shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06)]'
        }`}
      >

        {/* Nút Thu Gọn / Mở Rộng Ở Đỉnh Thanh Dock */}
        <div className="w-full flex items-center justify-between shrink-0 mb-1 px-1">
          {isExpanded ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-xs font-black font-play tracking-wide text-slate-800 dark:text-slate-100 truncate">
                {formatCardTitle('Điều khiển thư ngỏ')}
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              SoundEngine.playGlassChime();
              setIsRightDockCollapsed((prev) => !prev);
              if (isExpanded) {
                setIsNavMenuOpen(false);
                setIsNavHovered(false);
              } else {
                setIsNavMenuOpen(true);
              }
            }}
            title={!isExpanded ? 'Bấm để mở rộng thanh điều khiển thư ngỏ' : 'Bấm để thu gọn thanh điều khiển'}
            className={`w-6 h-5 rounded-md flex items-center justify-center transition hover:scale-115 active:scale-90 border cursor-pointer shrink-0 ${
              isDark
                ? 'bg-cyan-950/60 border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/60'
                : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white shadow-2xs'
            }`}
          >
            {!isExpanded ? (
              <WebIcon name="chevron-left" className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <WebIcon name="chevron-right" className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* THÂN THANH DOCK: HIỂN THỊ THU GỌN HOẶC MỞ RỘNG (3 CHẾ ĐỘ: TỔNG QUAN, MỘT TRANG, TRÌNH CHIẾU) */}
        {!isExpanded ? (
          /* TRẠNG THÁI THU GỌN: 3 NÚT ICON NHANH (TỔNG QUAN, MỘT TRANG & TRÌNH CHIẾU) */
          <div className="flex flex-col items-center justify-between flex-1 w-full py-2">
            <div className="flex flex-col items-center gap-2.5">
              {/* Nút Tổng quan (Bento Dashboard 100% theo hình mẫu) */}
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('dashboard');
                }}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition border cursor-pointer ${
                  viewMode === 'dashboard'
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md ring-1 ring-emerald-300'
                    : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
                }`}
                title="Chế độ Tổng quan Bento (Mẫu mới)"
              >
                <WebIcon name="layers" className="w-4 h-4 shrink-0" />
              </button>

              {/* Nút Một trang */}
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('one-page');
                }}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition border cursor-pointer ${
                  viewMode === 'one-page'
                    ? 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white border-purple-400 shadow-md ring-1 ring-purple-300'
                    : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-purple-50'
                }`}
                title="Chế độ Một trang"
              >
                <WebIcon name="book" className="w-4 h-4 shrink-0" />
              </button>

              {/* Nút Trình chiếu */}
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('slides');
                }}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition border cursor-pointer ${
                  viewMode === 'slides'
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md ring-1 ring-blue-300'
                    : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50'
                }`}
                title="Chế độ Trình chiếu"
              >
                <WebIcon name="monitor" className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Bottom Indicator */}
            <div className="w-full flex flex-col items-center justify-center gap-1 pt-1 border-t border-slate-200/60 dark:border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playGlassChime();
                  setIsRightDockCollapsed(false);
                  setIsNavMenuOpen(true);
                }}
                className="text-[8.5px] font-mono font-bold text-slate-400 hover:text-cyan-500 transition cursor-pointer"
                title="Mở rộng menu điều khiển"
              >
                «
              </button>
            </div>
          </div>
        ) : (
          /* TRẠNG THÁI MỞ RỘNG: 3 nút chế độ (Tổng quan, Một trang & Trình chiếu) */
          <div className="w-full flex-1 min-h-0 flex flex-col gap-2 pt-2 px-0.5">
            {/* Nút 1: Tổng quan (Bento Dashboard 100% theo hình đính kèm) */}
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('dashboard');
              }}
              className={`w-full py-2 px-3 rounded-xl flex items-center gap-2.5 text-left transition-all duration-200 border cursor-pointer group shadow-2xs ${
                viewMode === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-sm ring-1 ring-emerald-300'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700/80'
              }`}
              title="Chế độ Bảng Tổng Quan Bento (Chuẩn mẫu thiết kế mới 100%)"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                viewMode === 'dashboard'
                  ? 'bg-white/20 text-white'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
              }`}>
                <WebIcon name="layers" className="w-4 h-4 shrink-0" />
              </div>
              <span className="text-[12px] font-bold font-play tracking-tight truncate flex-1">
                Tổng quan
              </span>
              {viewMode === 'dashboard' && (
                <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />
              )}
            </button>

            {/* Nút 2: Một trang */}
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('one-page');
              }}
              className={`w-full py-2 px-3 rounded-xl flex items-center gap-2.5 text-left transition-all duration-200 border cursor-pointer group shadow-2xs ${
                viewMode === 'one-page'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-sm ring-1 ring-purple-300'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-slate-700/80'
              }`}
              title="Chuyển sang chế độ xem toàn văn Thư Ngỏ trên 1 trang"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                viewMode === 'one-page'
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
              }`}>
                <WebIcon name="book" className="w-4 h-4 shrink-0" />
              </div>
              <span className="text-[12px] font-bold font-play tracking-tight truncate flex-1">
                Một trang
              </span>
              {viewMode === 'one-page' && (
                <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />
              )}
            </button>

            {/* Nút 3: Trình chiếu */}
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('slides');
              }}
              className={`w-full py-2 px-3 rounded-xl flex items-center gap-2.5 text-left transition-all duration-200 border cursor-pointer group shadow-2xs ${
                viewMode === 'slides'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-sm ring-1 ring-blue-300'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700/80'
              }`}
              title="Chuyển sang chế độ thuyết trình trình chiếu 4 slide"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                viewMode === 'slides'
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
              }`}>
                <WebIcon name="monitor" className="w-4 h-4 shrink-0" />
              </div>
              <span className="text-[12px] font-bold font-play tracking-tight truncate flex-1">
                Trình chiếu
              </span>
              {viewMode === 'slides' && (
                <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />
              )}
            </button>
          </div>
        )}
      </aside>
    );

    return createPortal(navContent, document.body);
  };

  const renderSectionSwitcher = () => renderTopNavigationBar();

  // Subcomponent to render each career milestone as a responsive Bento View Card
  const renderCareerCard = (
    item: CareerMilestoneItem,
    bentoSpan: string = 'md:col-span-6',
    hideYear: boolean = false
  ) => {
    const roleIcon = getMilestoneIconName(item.roleIconName);
    const highlightIcon = getMilestoneIconName(item.highlightIconName || 'Sparkles');
    const mainIcon = getMilestoneIconName(item.iconName);
    const isExpanded = !!expandedCard[item.id];
    const isCardBeingRead = activeTargetId === item.id;
    const part1KwCount = countBoldKeywords(item.descVi);
    const part2KwCount = countBoldKeywords(item.descViPart2);
    const totalCardKeywords = Math.max(1, part1KwCount + part2KwCount);

    const rawTitle = item.milestoneTitleVi || item.company;
    const cleanTitle = hideYear
      ? rawTitle.replace(/\s*\(\d{4}[^\)]*\)/g, '').trim()
      : rawTitle;
    const displayTitle = formatCardTitle(cleanTitle);

    return (
      <div
        key={item.id}
        id={item.id}
        onClick={() => setSelectedMilestone(item)}
        className={`bento-view-card flex flex-col justify-between p-3.5 sm:p-4 relative transition-all duration-300 overflow-hidden group/mcard border w-full h-full min-h-0  hover:shadow-xl text-left rounded-[14px] cursor-pointer ${bentoSpan} ${getGlassCardClass()} ${
          isCardBeingRead
            ? 'ring-4 ring-offset-1 ring-emerald-500 dark:ring-cyan-400 shadow-[0_0_32px_rgba(16,185,129,0.35)] -translate-y-1'
            : ''
        }`}
      >
        {/* Floating Video Live Presentation Callout Badge on Card */}
        {isVideoPlaying && activeVideoCue?.targetId === item.id && (
          <div className="absolute top-2 left-2 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[10px] font-bold shadow-lg border border-white/30 animate-pulse">
            <WebIcon name="sparkles" className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-play">{activeVideoCue.noteBadge}</span>
            <span className="hidden sm:inline font-medium opacity-90 truncate max-w-[140px]">
              — {activeVideoCue.noteTitle}
            </span>
          </div>
        )}

        {/* Active Voice Reading Indicator Badge on Card */}
        {isCardBeingRead && !isVideoPlaying && (
          <div className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/95 text-white text-[10px] font-bold shadow-sm backdrop-blur-md">
            <AudioWaveformVisualizer isPlaying={!isPaused} barCount={4} size="sm" />
            <span>Karaoke AI Sync</span>
          </div>
        )}

        {/* Subtle Brand Color Radial Tint */}
        <div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.14] pointer-events-none"
          style={{
            background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)`,
          }}
        />

        {/* Header: Company Logo & Milestone Title & Role on Left, Year Badge Pill + Voice Trigger on Right */}
        <div className="w-full flex items-start sm:items-center justify-between gap-2 pb-2 mb-1.5 border-b border-slate-200/70 dark:border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 text-left">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 p-1.5 shadow-2xs shrink-0 flex items-center justify-center transition-transform duration-300 group-hover/mcard:scale-105 ${
                item.id === 'card-2018'
                  ? 'border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                  : ''
              }`}
            >
              <img
                src={item.logo}
                alt={item.company}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4
                className="text-[13.5px] sm:text-[15px] font-black tracking-tight leading-snug truncate font-play"
                style={{ color: item.color }}
              >
                {displayTitle}
              </h4>
              {/* Vai trò: Icon và văn bản cùng kích thước và màu, hoàn toàn không đóng khung */}
              <div
                className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-bold mt-0.5 min-w-0"
                style={{ color: item.color }}
              >
                <WebIcon name={roleIcon} className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.roleVi}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            <button
              type="button"
              onClick={(e) => handleNarrateMilestone(item.id, e)}
              title={hideYear ? 'Nghe thuyết minh AI mốc này' : `Nghe thuyết minh AI mốc ${item.yearLabelVi}`}
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition cursor-pointer ${
                isCardBeingRead
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-white/90 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-blue-600'
              }`}
            >
              <WebIcon name={isCardBeingRead && !isPaused ? 'pause' : 'volume-2'} className="w-3 h-3" />
            </button>

            {/* Year Badge Pill with Gradient (Ẩn khi hideYear = true) */}
            {!hideYear && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-white text-[10px] sm:text-[10.5px] font-black font-mono tabular-nums shadow-xs tracking-wider uppercase shrink-0 whitespace-nowrap ${item.yearBadgeGradient}`}
              >
                {item.yearLabelVi}
              </span>
            )}
          </div>
        </div>

        {/* Body: Text with full width readability + Karaoke Word Sync */}
        <div className="w-full flex-1 my-0.5 text-left relative z-10 flex flex-col justify-center min-h-0">
          {item.descViPart2 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3.5 items-start">
              <p className="text-[11.5px] sm:text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-200 text-left font-medium break-words bg-rose-50/50 dark:bg-rose-950/25 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-800/40">
                {renderFormattedText(item.descVi, {
                  isCardReading: isCardBeingRead,
                  keywordOffset: 0,
                  totalKeywords: totalCardKeywords,
                })}
              </p>
              <p className="text-[11.5px] sm:text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-200 text-left font-medium break-words bg-orange-50/50 dark:bg-orange-950/25 p-2.5 rounded-xl border border-orange-200/60 dark:border-orange-800/40">
                {renderFormattedText(item.descViPart2, {
                  isCardReading: isCardBeingRead,
                  keywordOffset: part1KwCount,
                  totalKeywords: totalCardKeywords,
                })}
              </p>
            </div>
          ) : (
            <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-200 text-left font-medium break-words">
              {renderFormattedText(item.descVi, {
                isCardReading: isCardBeingRead,
                keywordOffset: 0,
                totalKeywords: totalCardKeywords,
              })}
            </p>
          )}

          {isExpanded && (
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/60">
              {item.descEn}
            </p>
          )}

          {item.showMoreLink && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedCard((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
              }}
              className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer self-start"
            >
              {isExpanded ? (
                <>
                  <WebIcon name="chevron-up" className="w-3 h-3" />
                  <span>Thu gọn</span>
                </>
              ) : (
                <span>Xem thêm →</span>
              )}
            </button>
          )}
        </div>

        {/* Bottom Highlight Bento Capsule */}
        <div
          className="w-full mt-1.5 p-2 rounded-xl flex items-center justify-between gap-2 text-[11px] sm:text-[11.5px] font-bold relative z-10 border shrink-0 transition-colors"
          style={{
            backgroundColor: `${item.color}14`,
            borderColor: `${item.color}35`,
          }}
        >
          <div className="flex items-center gap-1.5 truncate" style={{ color: item.color }}>
            <WebIcon name={highlightIcon} className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate leading-snug text-left">{item.highlightVi}</span>
          </div>
          <span className="text-[9.5px] font-mono font-black text-slate-500 dark:text-slate-400 shrink-0 opacity-80 group-hover/mcard:opacity-100 flex items-center gap-0.5">
            <span>Chi tiết</span>
            <span className="transition-transform group-hover/mcard:translate-x-0.5">↗</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full max-w-full flex-1 min-h-0 flex flex-col gap-2 relative z-10 text-slate-800 dark:text-slate-100 select-none glass-scrollbar ${
        viewMode === 'slides'
          ? 'justify-between overflow-y-auto lg:overflow-hidden'
          : 'justify-start overflow-hidden'
      }`}
    >
      {/* ========================================================================= */}
      {/* THANH ĐIỀU HƯỚNG TRUNG TÂM THƯ NGỎ (EXECUTIVE GLASS NAVIGATION BAR)        */}
      {/* ========================================================================= */}
      {renderTopNavigationBar()}

      {/* ========================================================================= */}
      {/* THANH ĐIỀU KHIỂN ĐỌC THƯ NGỎ BẰNG GIỌNG NÓI AI (VOICE NARRATION PLAYER)    */}
      {/* ========================================================================= */}
      {isNarrating && (
        <div
          className={`w-full px-3 sm:px-4 py-2 rounded-2xl border flex flex-wrap items-center justify-between gap-2.5 z-30 shrink-0 relative overflow-hidden ${getGlassCardClass()} ring-1 ring-emerald-400/50 dark:ring-cyan-400/40`}
        >
          {/* Progress Bar Fill Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-200/60 dark:bg-slate-800/80">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Left: Waveform + Active Segment Caption */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              type="button"
              onClick={handleToggleNarration}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs hover:scale-105 transition cursor-pointer"
              title={isPaused ? 'Tiếp tục đọc' : 'Tạm dừng đọc'}
            >
              <WebIcon name={isPaused ? 'play' : 'pause'} className="w-3.5 h-3.5" />
            </button>

            <AudioWaveformVisualizer isPlaying={!isPaused} barCount={12} size="md" />

            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 text-[10px] font-black font-mono uppercase shrink-0">
                  {`Phần ${currentSlide + 1}/4`}
                </span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate font-play">
                  {currentSegment?.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate mt-0.5 font-medium">
                {currentSegment?.text}
              </p>
            </div>
          </div>

          {/* Right: Controls (Prev/Next Segment, Speed, Auto-Advance, Stop) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                playSegmentAtIndex(
                  activeSegmentIndex > 0 ? activeSegmentIndex - 1 : narrationSegments.length - 1
                )
              }
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
              title="Đoạn trước"
            >
              <WebIcon name="skip-back" className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() =>
                playSegmentAtIndex(
                  activeSegmentIndex < narrationSegments.length - 1 ? activeSegmentIndex + 1 : 0
                )
              }
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
              title="Đoạn kế tiếp"
            >
              <WebIcon name="skip-forward" className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleToggleNarrationLanguage}
              className={`px-2 py-1 rounded-full text-[10.5px] font-black border transition cursor-pointer flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 ${
                narrationLanguage === 'en'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              }`}
              title={
                narrationLanguage === 'vi'
                  ? 'Đang phát Giọng đọc Tiếng Việt chuẩn mực. Nhấp để chuyển sang Tiếng Anh chuyên nghiệp'
                  : 'Currently narrating in Professional English. Click to switch to Vietnamese'
              }
            >
              <span>{narrationLanguage === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
              <span className="font-mono">{narrationLanguage === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={handleCycleSpeed}
              className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-[10.5px] font-black font-mono cursor-pointer hover:bg-blue-100 transition"
              title="Tốc độ giọng đọc AI"
            >
              {`${speechRate}x`}
            </button>

            <button
              type="button"
              onClick={() => setAutoAdvance((prev) => !prev)}
              className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                autoAdvance
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
              title="Tự động chuyển sang phần tiếp theo khi đọc xong phần hiện tại"
            >
              <WebIcon name="sync" className="w-3 h-3" />
              <span className="hidden sm:inline">
                {autoAdvance ? 'Tự chuyển phần: BẬT' : 'Tự chuyển phần: TẮT'}
              </span>
            </button>

            <button
              type="button"
              onClick={stopNarration}
              className="px-2.5 py-1 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white text-[10.5px] font-bold flex items-center gap-1 shadow-2xs transition cursor-pointer"
              title="Dừng chế độ đọc Thư Ngỏ"
            >
              <WebIcon name="stop" className="w-3 h-3" />
              <span>Dừng</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* THANH ĐIỀU KHIỂN THUYẾT TRÌNH TỰ ĐỘNG KÈM NHẠC NỀN LO-FI (AUTOPLAY DOCK)   */}
      {/* ========================================================================= */}
      {isAutoplayPresentation && (
        <div
          role="region"
          aria-label="Điều khiển thuyết trình tự động"
          className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl sm:rounded-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-cyan-400/50 dark:border-cyan-400/60 shadow-[0_12px_36px_-6px_rgba(6,182,212,0.35),0_0_24px_rgba(99,102,241,0.25)] flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-center gap-2 sm:gap-3 text-slate-800 dark:text-slate-100 max-w-[95vw] animate-slide-up select-none font-play"
        >
          {/* Nhãn trạng thái Slide & Cue */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs">
                Slide {currentSlide + 1}/4
              </span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-cyan-200 hidden md:inline truncate max-w-[150px]">
                {activeVideoCue?.noteBadge || 'Thuyết minh'}
              </span>
            </div>
          </div>

          {/* Huy hiệu Audio Ducking Nhạc nền Lo-Fi */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleLofiAudio}
              className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                isLofiAudioEnabled
                  ? isDuckingActive
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/60 shadow-2xs animate-pulse'
                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/60 shadow-2xs'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
              title="Nhấp để bật/tắt Nhạc nền Lo-Fi thư giãn"
            >
              <WebIcon name={isLofiAudioEnabled ? 'volume-2' : 'volume-x'} className="w-3 h-3" />
              <span>
                {isLofiAudioEnabled
                  ? isDuckingActive
                    ? 'Lo-Fi êm (12%)'
                    : 'Lo-Fi nền (32%)'
                  : 'Lo-Fi tắt'}
              </span>
            </button>

            {/* Nút chuyển đổi giọng đọc Song Ngữ VI / EN */}
            <button
              type="button"
              onClick={handleToggleNarrationLanguage}
              className={`px-2 py-1 rounded-full text-[10px] font-black border transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                narrationLanguage === 'en'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-2xs'
                  : 'bg-emerald-600 text-white border-emerald-400 shadow-2xs'
              }`}
              title={
                narrationLanguage === 'vi'
                  ? 'Đang chọn Giọng Tiếng Việt. Nhấp để chuyển sang Tiếng Anh'
                  : 'Currently English. Click to switch to Vietnamese'
              }
            >
              <span>{narrationLanguage === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
              <span>{narrationLanguage === 'vi' ? 'VI' : 'EN'}</span>
            </button>
          </div>

          {/* Thanh tiến trình Video */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <div className="w-20 xl:w-28 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${videoProgressPct}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
              {Math.round(videoProgressPct)}%
            </span>
          </div>

          {/* Bộ nút điều khiển Video & Slide */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
              title="Slide trước (←)"
            >
              <WebIcon name="chevron-left" className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleFloatingVideoPlay}
              className="w-7.5 h-7.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center shadow-sm transition active:scale-95 cursor-pointer"
              title={isVideoPlaying ? 'Tạm dừng video' : 'Tiếp tục phát video'}
            >
              <WebIcon name={isVideoPlaying ? 'pause' : 'play'} className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleFloatingVideoMute}
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition cursor-pointer ${
                isVideoMuted
                  ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
              title={isVideoMuted ? 'Bật tiếng thuyết minh video' : 'Tắt tiếng video'}
            >
              <WebIcon name={isVideoMuted ? 'volume-x' : 'volume-2'} className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
              title="Slide kế tiếp (→)"
            >
              <WebIcon name="chevron-right" className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Nút Dừng Thuyết Trình */}
          <button
            type="button"
            onClick={handleToggleAutoplayPresentation}
            className="px-2.5 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-[10.5px] font-bold flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer shrink-0"
            title="Dừng chế độ Thuyết trình Tự động"
          >
            <WebIcon name="stop" className="w-3 h-3" />
            <span>Dừng</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CẶP NÚT TRÒN ĐIỀU HƯỚNG SLIDE BÊN TRÁI & PHẢI TINH TẾ NGOÀI BIÊN          */}
      {/* ========================================================================= */}
      {viewMode === 'slides' && (
        <>
          <button
            type="button"
            onClick={handlePrevSlide}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/15 shadow-md shadow-slate-900/5 dark:shadow-none backdrop-blur-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-50 group"
            title="Slide trước (Phím ←)"
            aria-label="Slide trước"
          >
            <svg
              className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNextSlide}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/15 shadow-md shadow-slate-900/5 dark:shadow-none backdrop-blur-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-50 group"
            title="Slide kế tiếp (Phím →)"
            aria-label="Slide kế tiếp"
          >
            <svg
              className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* ========================================================================= */}
      {/* CHẾ ĐỘ BẢNG TỔNG QUAN BENTO (DASHBOARD MODE - GIỐNG 100% HÌNH THAM KHẢO)  */}
      {/* ========================================================================= */}
      {viewMode === 'dashboard' && (
        <LetterBentoDashboard
          currentTheme={currentTheme}
          companyName={companyName}
          companyDisplay={companyDisplay}
          onOpenCompanyModal={() => {
            setCompanyInputDraft(companyName);
            setIsCompanyModalOpen(true);
          }}
          onSwitchToSlides={() => setViewMode('slides')}
          onSwitchToOnePage={() => setViewMode('one-page')}
          onSelectMilestoneModal={(item) => setSelectedMilestone(item)}
        />
      )}

      {/* ========================================================================= */}
      {/* FEATURE 1: CHẾ ĐỘ XEM TOÀN VĂN THƯ NGỎ TRÊN 1 TRANG CUỘN (ONE-PAGE MODE) THEO CHUẨN DESIGN REFERENCE */}
      {/* ========================================================================= */}
      {viewMode === 'one-page' && (
        <div
          id="card-main-letter-one-page"
          className="w-full h-full flex-1 min-h-0 overflow-y-auto glass-scrollbar p-2 sm:p-3 md:p-4 lg:p-5 pr-1.5 sm:pr-2.5 space-y-4 sm:space-y-5 animate-fadeIn select-none text-slate-800 dark:text-slate-100"
        >
          <div className="w-full min-h-full flex flex-col justify-start space-y-4 sm:space-y-5">
            {/* 0. BREADCRUMB & HEADER TOP BAR */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 px-1">
              {/* Breadcrumb bên trái */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-2xs">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <WebIcon name="home" className="w-3.5 h-3.5" />
                  <span>Trang chủ</span>
                </span>
                <span className="text-slate-400">›</span>
                <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <WebIcon name="mail" className="w-3.5 h-3.5" />
                  <span>Thư ngỏ</span>
                </span>
              </div>

              {/* Subtitle Badge bên phải & Nút điều khiển */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold shadow-2xs">
                  <WebIcon name="sparkles" className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span className="truncate max-w-[280px] sm:max-w-none">
                    Hành trình 22+ năm kinh nghiệm xây dựng & phát triển hệ thống CSKH
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCompanyInputDraft(companyName);
                    setIsCompanyModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700 flex items-center gap-1 cursor-pointer transition shadow-2xs"
                  title="Tùy chỉnh tên đối tác"
                >
                  <WebIcon name="users" className="w-3.5 h-3.5" />
                  <span>{companyName ? `Đổi tên (${companyName})` : '+ Điền tên Công ty'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportLetterPDF}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs flex items-center gap-1 cursor-pointer transition"
                >
                  <WebIcon name="download" className="w-3.5 h-3.5" />
                  <span>Xuất PDF Chuẩn A4</span>
                </button>
              </div>
            </div>



            {/* 2. KHỐI LĨNH VỰC HOẠT ĐỘNG CHÍNH (4 CARDS NGANG ĐA SẮC) */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 px-1 text-left">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs">
                  <WebIcon name="rocket" className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-black font-play text-slate-900 dark:text-white uppercase tracking-wider">
                  Lĩnh vực hoạt động chính
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                {/* Card 1: Dịch vụ Viễn thông (Xanh dương) */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-sm flex items-center justify-between gap-2.5 group hover:scale-[1.02] transition-all duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                      <WebIcon name="phone" className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-black font-play truncate leading-tight">
                        Dịch vụ Viễn thông
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-white/80 truncate mt-0.5">
                        Kết nối · Phục vụ · Phát triển
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span className="text-xs font-bold">→</span>
                  </div>
                </div>

                {/* Card 2: Cam kết (Cam) */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-sm flex items-center justify-between gap-2.5 group hover:scale-[1.02] transition-all duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                      <WebIcon name="users" className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-black font-play truncate leading-tight">
                        Cam kết
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-white/80 truncate mt-0.5">
                        Khách hàng là trung tâm
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span className="text-xs font-bold">→</span>
                  </div>
                </div>

                {/* Card 3: Nhiệm vụ (Hồng Magenta) */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white shadow-sm flex items-center justify-between gap-2.5 group hover:scale-[1.02] transition-all duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                      <WebIcon name="settings" className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-black font-play truncate leading-tight">
                        Nhiệm vụ
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-white/80 truncate mt-0.5">
                        Nâng cao Trải nghiệm
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span className="text-xs font-bold">→</span>
                  </div>
                </div>

                {/* Card 4: Định hướng (Xanh ngọc Teal) */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-700 text-white shadow-sm flex items-center justify-between gap-2.5 group hover:scale-[1.02] transition-all duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                      <WebIcon name="chart" className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-black font-play truncate leading-tight">
                        Định hướng
                      </h4>
                      <p className="text-[10px] sm:text-[10.5px] text-white/80 truncate mt-0.5">
                        Bền vững & Hiệu quả
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span className="text-xs font-bold">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. KHỐI HÀNH TRÌNH SỰ NGHIỆP — TIMELINE 2 CỘT ZIC-ZAC ĐỐI XỨNG QUA TRỤC DỌC Ở GIỮA */}
            <div className="p-4 sm:p-6 lg:p-7 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-5">
              {/* Header Khối Hành Trình */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <WebIcon name="briefcase" className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black font-play text-slate-900 dark:text-white leading-tight">
                      Hành trình sự nghiệp
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      Hơn 22 năm kinh nghiệm xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-bold font-play">
                  <WebIcon name="mail" className="w-3.5 h-3.5" />
                  <span>Hành trình phát triển qua từng cột mốc</span>
                </div>
              </div>

              {/* KHUNG TIMELINE 2 CỘT ZIC-ZAC CÓ ĐƯỜNG TRỤC DỌC Ở GIỮA */}
              <div className="relative w-full">
                {/* Đường trục dọc ở giữa (Central Spine) trên màn hình tablet/desktop */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-400 via-indigo-400 via-purple-400 to-teal-400 dark:from-blue-600 dark:via-indigo-700 dark:to-teal-600 rounded-full z-0 pointer-events-none opacity-60" />

                {/* Grid 2 Cột Chứa Các Thẻ Cột Mốc Đối Xứng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 relative z-10">
                  {CAREER_MILESTONES_DATA.map((item, idx) => {
                    const isBeingRead = activeTargetId === item.id;
                    const p1Count = countBoldKeywords(item.descVi);
                    const p2Count = countBoldKeywords(item.descViPart2);
                    const totalKw = Math.max(1, p1Count + p2Count);
                    const isEven = idx % 2 === 0;

                    // Watermark icon mờ cho từng cột mốc
                    const watermarkIcon =
                      item.company.includes('MobiFone') ? 'radio' :
                      item.company.includes('V247') ? 'phone' :
                      item.company.includes('HTV') || item.company.includes('LBC') ? 'chart' :
                      item.company.includes('Garena') ? 'sparkles' :
                      item.company.includes('Prudential') ? 'shield' :
                      item.company.includes('MoMo') ? 'wallet' : 'trending';

                    return (
                      <div
                        key={item.id}
                        id={item.id}
                        className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-slate-50/70 to-slate-100/50 dark:from-slate-800/90 dark:via-slate-850/80 dark:to-slate-900/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all duration-300 group overflow-hidden text-left ${
                          isBeingRead ? 'ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-md scale-[1.01]' : ''
                        }`}
                      >
                        {/* Chấm tròn Node Dot nối vào trục giữa trên desktop */}
                        <div
                          className={`hidden md:block absolute top-7 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm z-20 ${
                            isEven
                              ? '-right-[27px] bg-blue-500 ring-2 ring-blue-300/50'
                              : '-left-[27px] bg-purple-500 ring-2 ring-purple-300/50'
                          }`}
                        />

                        {/* Watermark Icon Vector mờ siêu lớn ở góc phải dưới giống hình tham khảo */}
                        <div className="absolute right-2 bottom-1 text-slate-300/40 dark:text-slate-600/20 pointer-events-none select-none z-0">
                          <WebIcon name={watermarkIcon} className="w-16 h-16 sm:w-20 sm:h-20" />
                        </div>

                        {/* Header Thẻ: Logo + Tên Công ty + Badge Năm Pill */}
                        <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200/60 dark:border-slate-700/60 relative z-10">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 shadow-xs border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                              <img
                                src={item.logo}
                                alt={item.company}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4
                                className="text-sm sm:text-base font-black font-play truncate leading-tight"
                                style={{ color: item.color }}
                              >
                                {item.company}
                              </h4>
                              <p className="text-[10.5px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                                {item.roleVi}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`px-2.5 sm:px-3 py-0.5 rounded-full text-white text-[10.5px] sm:text-xs font-black font-mono shadow-2xs shrink-0 ${item.yearBadgeGradient}`}
                          >
                            {item.yearLabelVi.replace('Năm ', '')}
                          </span>
                        </div>

                        {/* Nội dung chi tiết cột mốc (Giữ nguyên 100% data) */}
                        <div className="space-y-2 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-200 leading-relaxed relative z-10 flex-1">
                          <p>
                            {renderFormattedText(item.descVi, {
                              isCardReading: isBeingRead,
                              keywordOffset: 0,
                              totalKeywords: totalKw,
                            })}
                          </p>
                          {item.descViPart2 && (
                            <p className="pt-1 text-slate-600 dark:text-slate-300">
                              {renderFormattedText(item.descViPart2, {
                                isCardReading: isBeingRead,
                                keywordOffset: p1Count,
                                totalKeywords: totalKw,
                              })}
                            </p>
                          )}
                        </div>

                        {/* Footer Thẻ: Nút nghe giọng đọc Karaoke */}
                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2 relative z-10">
                          <button
                            type="button"
                            onClick={(e) => handleNarrateMilestone(item.id, e)}
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs border ${
                              isBeingRead
                                ? 'bg-emerald-600 text-white border-emerald-400'
                                : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50'
                            }`}
                          >
                            <WebIcon name={isBeingRead && !isPaused ? 'pause' : 'volume-2'} className="w-3 h-3" />
                            <span>{isBeingRead ? 'Đang đọc' : 'Nghe mốc này'}</span>
                          </button>

                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono italic truncate">
                            {item.highlightVi.slice(0, 38)}...
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. KHỐI SONG SONG: GIẢI PHÁP CÔNG NGHỆ (TRÁI) & TÂM THƯ TRI ÂN (PHẢI) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
              {/* Cột trái: Giải pháp công nghệ */}
              <div className="md:col-span-6 p-4 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <WebIcon name="settings" className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-black font-play text-slate-900 dark:text-white">
                      Giải pháp công nghệ
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Tập trung áp dụng và triển khai các giải pháp công nghệ để nâng cao hiệu quả vận hành và chất lượng dịch vụ khách hàng. Bao gồm tự động hóa quy trình, phân tích dữ liệu khách hàng, ứng dụng AI và các công cụ hiện đại.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  {/* Danh sách 4 giải pháp */}
                  <div className="w-full sm:w-3/5 space-y-1.5">
                    {[
                      { num: '01', title: 'Hệ thống CRM', desc: 'Quản lý khách hàng toàn diện', color: 'bg-blue-600' },
                      { num: '02', title: 'Tự động hóa', desc: 'Tối ưu quy trình & hiệu suất', color: 'bg-teal-500' },
                      { num: '03', title: 'Phân tích dữ liệu', desc: 'Hiểu khách hàng sâu sắc hơn', color: 'bg-rose-500' },
                      { num: '04', title: 'AI Chatbot', desc: 'Hỗ trợ khách hàng 24/7', color: 'bg-amber-500' },
                    ].map((sol) => (
                      <div
                        key={sol.num}
                        className="p-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2 shadow-2xs hover:scale-[1.01] transition-transform"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-5 h-5 rounded-md ${sol.color} text-white font-black font-mono text-[10px] flex items-center justify-center shrink-0`}>
                            {sol.num}
                          </span>
                          <div className="min-w-0">
                            <span className="text-[11.5px] font-bold text-slate-900 dark:text-white block truncate leading-tight font-play">
                              {sol.title}
                            </span>
                            <span className="text-[9.5px] text-slate-500 dark:text-slate-400 block truncate">
                              {sol.desc}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">›</span>
                      </div>
                    ))}
                  </div>

                  {/* Minh họa 3D Dashboard nhỏ bên phải */}
                  <div className="w-full sm:w-2/5 flex items-center justify-center p-2 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50/80 dark:from-slate-800 dark:to-slate-800/60 border border-blue-200/60 dark:border-blue-900/40">
                    <div className="w-24 h-20 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 p-2 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-1.5 rounded-full bg-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex items-end justify-between gap-1 h-8 px-1">
                        <div className="w-2 h-4 rounded-t bg-blue-400" />
                        <div className="w-2 h-6 rounded-t bg-indigo-500" />
                        <div className="w-2 h-7 rounded-t bg-teal-400" />
                        <div className="w-2 h-5 rounded-t bg-amber-400" />
                      </div>
                      <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột phải: Tâm thư tri ân */}
              <div className="md:col-span-6 p-4 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-xs">
                      <WebIcon name="heart" className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-black font-play text-slate-900 dark:text-white">
                      Tâm thư tri ân
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Xin chân thành cảm ơn Quý đối tác, Quý khách hàng và đồng nghiệp đã luôn tin tưởng, đồng hành và hỗ trợ tôi trong suốt hành trình 22+ năm qua. Tôi luôn trân trọng những cơ hội được hợp tác và mong tiếp tục nhận được sự đồng hành trong chặng đường phía trước.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Trích dẫn 3 dòng: Cùng nhau - Cùng phát triển - Cùng thành công */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-3xl font-black text-sky-400 leading-none select-none">““</span>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black text-blue-700 dark:text-cyan-400 font-play">Cùng nhau</p>
                      <p className="text-xs font-black text-indigo-700 dark:text-indigo-400 font-play">Cùng phát triển</p>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-play">Cùng thành công</p>
                      <div className="pt-1.5">
                        <SignatureSvg />
                      </div>
                    </div>
                  </div>

                  {/* Minh họa 3D Phong bì thư với trái tim bay */}
                  <div className="flex items-center justify-center">
                    <div className="w-24 h-20 rounded-2xl bg-gradient-to-tr from-sky-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 p-2 flex items-center justify-center relative shadow-inner">
                      <div className="w-16 h-12 rounded-lg bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center relative">
                        <WebIcon name="mail" className="w-7 h-7 text-sky-500" />
                        <div className="absolute -top-2 right-1 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
                          <WebIcon name="heart" className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. KHỐI GIÁ TRỊ CỐT LÕI (4 CỘT NGANG CÓ SỐ THỨ TỰ 01, 02, 03, 04) */}
            <div className="space-y-2.5 text-left">
              <div className="flex items-center gap-2 px-1">
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shadow-2xs">
                  <WebIcon name="sparkles" className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-black font-play text-slate-900 dark:text-white uppercase tracking-wider">
                  Giá trị cốt lõi
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { num: '01', title: 'Tận tâm', desc: 'Đặt khách hàng làm trung tâm trong mọi hoạt động.', icon: 'target', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-950/70' },
                  { num: '02', title: 'Chuyên nghiệp', desc: 'Không ngừng nâng cao năng lực và chất lượng dịch vụ.', icon: 'sparkles', color: 'text-blue-600 dark:text-cyan-400', bg: 'bg-blue-100 dark:bg-blue-950/70' },
                  { num: '03', title: 'Hợp tác', desc: 'Xây dựng mối quan hệ bền vững với đối tác.', icon: 'users', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-950/70' },
                  { num: '04', title: 'Hiệu quả', desc: 'Luôn hướng đến giá trị thực tế và bền vững.', icon: 'chart', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950/70' },
                ].map((val) => (
                  <div
                    key={val.num}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between gap-2 hover:scale-[1.01] transition-transform relative overflow-hidden"
                  >
                    {/* Số thứ tự mờ to ở góc trên */}
                    <span className="absolute top-2 right-3 text-2xl font-black font-mono text-slate-300/40 dark:text-slate-700/40 select-none pointer-events-none">
                      {val.num}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${val.bg} ${val.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                        <WebIcon name={val.icon} className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-black font-play text-slate-900 dark:text-white truncate">
                        {val.title}
                      </h4>
                    </div>

                    <p className="text-[10.5px] sm:text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      )}

      {/* SLIDE 1: THẺ THÔNG ĐIỆP HỢP TÁC CHIẾN LƯỢC BENTO VIEW TỐI ƯU TOÀN MÀN HÌNH */}
      {/* ========================================================================= */}
      {viewMode === 'slides' && currentSlide === 0 && (
        <div
          key="slide-1"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-4 lg:p-5 select-none font-play ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Main Container Thẻ Thông Điệp Hợp Tác (Chiếm trọn vẹn chiều cao, lấp đầy thẻ chính) */}
          <div
            id="card-main-letter-content"
            className="w-full flex-1 min-h-0 flex flex-col justify-between gap-3 sm:gap-4 relative z-10 overflow-y-auto lg:overflow-hidden glass-scrollbar"
          >
            {/* 1. KHU VỰC TRÊN (HERO AREA): Chia tỷ lệ 5:7 giữa Khung Video Thuyết Minh và Khung Thư Ngỏ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-stretch flex-1 min-h-0">
              {/* 1.1 Khung Video Thuyết Minh (5 Cột) - Tràn viền, bo góc rounded-2xl, Flat Glass Controls */}
              <div
                id="bento-letter-video"
                className={`col-span-12 lg:col-span-5 rounded-2xl min-h-[220px] sm:min-h-[240px] lg:min-h-0 relative overflow-hidden flex flex-col justify-between border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-none transition-all duration-300 group/vcard ${
                  activeTargetId === 'bento-experience-intro' || activeTargetId === 'callout-salutation'
                    ? 'ring-2 ring-cyan-500/80 shadow-[0_0_24px_rgba(6,182,212,0.3)]'
                    : 'hover:border-cyan-500/40'
                }`}
              >
                {/* Video lấp đầy toàn bộ thẻ */}
                <video
                  ref={floatingVideoRef}
                  src={LETTER_SLIDE_1_VIDEO_URL}
                  playsInline
                  loop
                  muted
                  onTimeUpdate={handleFloatingVideoTimeUpdate}
                  onLoadedMetadata={handleFloatingVideoLoadedMetadata}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />

                {/* Lớp phủ gradient mờ bảo đảm text và controls luôn sắc nét trên nền video */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/65 z-10 pointer-events-none" />

                {/* Header Video Top Bar: Micro-badge Scena AI & Nhãn Thuyết Minh */}
                <div className="relative z-20 p-3 sm:p-3.5 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/80 text-white flex items-center justify-center shrink-0 shadow-xs ring-1 ring-cyan-300/40">
                      <WebIcon name="play" className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-bold text-white drop-shadow-sm truncate">
                      Thuyết minh thư ngỏ
                    </span>
                  </div>

                  {/* Micro-badge Scena AI & Sóng âm */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="flex items-center gap-0.5 h-3">
                      <span className={`w-0.5 h-2 bg-cyan-400 rounded-full ${isVideoPlaying ? 'animate-[pulse_0.5s_infinite]' : 'opacity-40'}`} />
                      <span className={`w-0.5 h-3 bg-cyan-300 rounded-full ${isVideoPlaying ? 'animate-[pulse_0.35s_infinite]' : 'opacity-40'}`} />
                      <span className={`w-0.5 h-2 bg-cyan-400 rounded-full ${isVideoPlaying ? 'animate-[pulse_0.6s_infinite]' : 'opacity-40'}`} />
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-cyan-200 bg-slate-950/70 px-2 py-0.5 rounded-full border border-cyan-400/30 backdrop-blur-md">
                      Scena AI
                    </span>
                  </div>
                </div>

                {/* Vùng giữa: Nhấp để Play/Pause */}
                <div
                  onClick={toggleFloatingVideoPlay}
                  className="relative z-20 flex-1 flex items-center justify-center cursor-pointer min-h-[80px]"
                  title={isVideoPlaying ? 'Bấm để tạm dừng video' : 'Bấm để phát video'}
                >
                  {!isVideoPlaying && (
                    <div className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-cyan-600 text-white flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 transform hover:scale-105 active:scale-95 transition-all duration-200">
                      <WebIcon name="play" className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Footer Controls: Flat Glass Thanh Mảnh Bo Tròn Nhẹ Nhàng */}
                <div className="relative z-20 p-2.5 sm:p-3 flex flex-col gap-2 shrink-0">
                  {/* Progress Bar ở đáy video */}
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-200"
                      style={{ width: `${videoProgressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      {/* Nút Loa */}
                      <button
                        type="button"
                        onClick={toggleFloatingVideoMute}
                        className="px-2.5 py-1 rounded-xl bg-slate-950/60 hover:bg-slate-900/80 active:scale-95 text-white flex items-center gap-1.5 transition text-[11px] font-medium cursor-pointer border border-white/15 backdrop-blur-md"
                        title={isVideoMuted ? 'Bấm để mở âm thanh video' : 'Bấm để tắt tiếng'}
                      >
                        <WebIcon name={isVideoMuted ? 'volume-x' : 'volume-2'} className="w-3.5 h-3.5 text-cyan-300" />
                        <span>{isVideoMuted ? 'Mở loa' : 'Đang bật'}</span>
                      </button>

                      {/* Nút Play/Pause */}
                      <button
                        type="button"
                        onClick={toggleFloatingVideoPlay}
                        className="px-2.5 py-1 rounded-xl bg-slate-950/60 hover:bg-slate-900/80 active:scale-95 text-white flex items-center gap-1.5 transition text-[11px] font-medium cursor-pointer border border-white/15 backdrop-blur-md"
                      >
                        <WebIcon name={isVideoPlaying ? 'pause' : 'play'} className="w-3.5 h-3.5 text-cyan-300" />
                        <span>{isVideoPlaying ? 'Tạm dừng' : 'Phát'}</span>
                      </button>
                    </div>

                    {/* Nút Toggle Đồng Bộ Slide */}
                    <button
                      type="button"
                      onClick={toggleAutoSyncVideoWithSlides}
                      className={`px-2.5 py-1 rounded-xl flex items-center gap-1.5 transition text-[10.5px] font-medium cursor-pointer border backdrop-blur-md ${
                        autoSyncVideoWithSlides
                          ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400/50 shadow-xs'
                          : 'bg-slate-950/60 text-slate-300 hover:text-white border-white/15'
                      }`}
                      title="Tự động lật slide theo từng phân đoạn thuyết minh của video"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${autoSyncVideoWithSlides ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
                      <span>Đồng bộ slide</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 1.2 Khung Thư Ngỏ (7 Cột) - Bố cục chuẩn mực, Typography thang bậc rõ ràng */}
              <div
                id="bento-commitment"
                className={`col-span-12 lg:col-span-7 p-4 sm:p-5 lg:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-none flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  activeTargetId === 'callout-salutation' || activeTargetId === 'bento-experience-intro' || activeTargetId === 'bento-commitment'
                    ? 'ring-2 ring-cyan-500/80 shadow-[0_0_24px_rgba(6,182,212,0.25)]'
                    : 'hover:border-cyan-500/40'
                }`}
              >
                {/* Live Note Pill nếu video đang nhắc đến lời chào hoặc thông điệp */}
                {isVideoPlaying && (activeVideoCue?.targetId === 'callout-salutation' || activeVideoCue?.targetId === 'bento-commitment') && (
                  <div className="absolute top-3 right-4 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 z-20 animate-pulse">
                    <WebIcon name="sparkles" className="w-3 h-3" />
                    <span>{activeVideoCue.noteBadge}</span>
                  </div>
                )}

                {/* Header Thư Ngỏ: Micro-Badge "Thông điệp hợp tác" & Nút Đổi tên công ty */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10 shrink-0 gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 text-xs font-bold">
                    <WebIcon name="book" className="w-3.5 h-3.5 shrink-0" />
                    <span>Thông điệp hợp tác</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        SoundEngine.playTap();
                        setCompanyInputDraft(companyName);
                        setIsCompanyModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/70 dark:border-white/15 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      title="Tùy chỉnh tên Quý Công ty hoặc lấy link chia sẻ (?company=...)"
                    >
                      <WebIcon name="users" className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      <span>{companyName ? 'Đổi tên' : '+ Tên Công ty'}</span>
                    </button>

                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-white/10">
                      Nguyễn Hùng Thái
                    </span>
                  </div>
                </div>

                {/* Nội Dung Thư Ngỏ: Typography thang bậc rõ ràng (Heading 1, Body text chuẩn) */}
                <div className="my-auto py-2 space-y-3">
                  {/* Heading 1 (Lời chào/Tiêu đề chính): text-2xl font-bold leading-tight */}
                  <h1
                    id="callout-salutation"
                    className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white"
                  >
                    Kính chào {companyDisplay}!
                  </h1>

                  {/* Đoạn 1: Body text text-base font-normal leading-relaxed text-slate-700 dark:text-slate-300 */}
                  <p className="text-base font-normal leading-relaxed text-slate-700 dark:text-slate-300">
                    Tôi là{' '}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      Nguyễn Hùng Thái
                    </strong>
                    , Trưởng phòng Chăm sóc Khách hàng với hơn{' '}
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                      22 năm kinh nghiệm
                    </span>{' '}
                    trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng.
                  </p>

                  {/* Đoạn 2: Cam kết đồng hành */}
                  <p className="text-base font-normal leading-relaxed text-slate-700 dark:text-slate-300">
                    Tôi mong muốn được đồng hành cùng{' '}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      {companyDisplay}
                    </strong>{' '}
                    trong việc xây dựng một{' '}
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                      hệ thống chăm sóc khách hàng hiện đại
                    </span>
                    , lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra{' '}
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                      giá trị phát triển bền vững
                    </span>
                    .
                  </p>
                </div>

                {/* Lời cảm ơn + Chữ ký số đặt an toàn trong padding */}
                <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-snug">
                    Xin trân trọng cảm ơn {companyDisplay} đã dành thời gian lắng nghe!
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                      Trân trọng,
                    </span>
                    <div className="w-28 sm:w-32 h-8 sm:h-9 flex items-center justify-center">
                      <SignatureSvg />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. KHU VỰC DƯỚI (3 TRỤ CỘT GIÁ TRỊ): CSS Grid 3 cột đều nhau, đồng bộ chiều cao, không viền màu sặc sỡ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-stretch shrink-0">
              {/* Trụ Cột 1: Quy trình nền tảng */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-md shadow-slate-900/5 dark:shadow-none flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 ${
                  activeTargetId === 'bento-three-pillars' && effectiveKaraokeProgress < 0.34
                    ? 'ring-2 ring-cyan-500 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <WebIcon name="shield" className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold leading-tight text-slate-900 dark:text-white truncate">
                    Quy trình nền tảng
                  </h4>
                </div>
                <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-2 truncate">
                  Chuẩn hóa KPI & Chất lượng dịch vụ
                </p>
              </div>

              {/* Trụ Cột 2: Con người giá trị */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-md shadow-slate-900/5 dark:shadow-none flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 ${
                  activeTargetId === 'bento-three-pillars' &&
                  effectiveKaraokeProgress >= 0.34 &&
                  effectiveKaraokeProgress < 0.67
                    ? 'ring-2 ring-cyan-500 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <WebIcon name="users" className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold leading-tight text-slate-900 dark:text-white truncate">
                    Con người giá trị
                  </h4>
                </div>
                <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-2 truncate">
                  Lắng nghe, thấu hiểu & đồng cảm
                </p>
              </div>

              {/* Trụ Cột 3: Công nghệ đòn bẩy */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-md shadow-slate-900/5 dark:shadow-none flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 ${
                  activeTargetId === 'bento-three-pillars' && effectiveKaraokeProgress >= 0.67
                    ? 'ring-2 ring-cyan-500 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <WebIcon name="cpu" className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold leading-tight text-slate-900 dark:text-white truncate">
                    Công nghệ đòn bẩy
                  </h4>
                </div>
                <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-2 truncate">
                  CRM, Dashboard & AI Chatbot
                </p>
              </div>
            </div>

            {/* 3. KHU VỰC CHÂN TRANG: Banner Danh Ngôn Giảm Độ Dày, Bo Góc Đồng Bộ (rounded-2xl) */}
            <div
              id="quote-banner-slide-1"
              className={`w-full relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 py-2.5 px-4 shadow-md shadow-slate-900/5 dark:shadow-none flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 transition-all duration-300 ${
                activeTargetId === 'quote-banner-slide-1'
                  ? 'ring-2 ring-cyan-500 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-serif font-bold leading-none">“</span>
                </div>
                <p className="text-sm font-medium italic leading-snug tracking-wide text-slate-800 dark:text-slate-200 text-center sm:text-left truncate">
                  "Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự."
                </p>
              </div>
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold shrink-0 font-play whitespace-nowrap">
                — Nguyễn Hùng Thái
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 2: HÀNH TRÌNH SỰ NGHIỆP (3 CỘT MỐC NỀN TẢNG)                        */}
      {/* ========================================================================= */}
      {viewMode === 'slides' && currentSlide === 1 && (
        <div
          key="slide-2"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-2.5 p-3.5 sm:p-4 lg:p-5 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Header Card (Không có mốc năm, đúng 4 từ, Sentence case) */}
          <div className={`w-full p-3 sm:p-3.5 rounded-2xl border shrink-0 space-y-2 ${getGlassCardClass()}`}>
            <AnimatedCardTitle
              iconName="rocket"
              title="Hành trình sự nghiệp"
              subtitle="Khởi đầu tại MobiFone · Phát triển quản lý tại Viễn Liên V247 · Bước ngoặt Trưởng phòng CSKH tại LBC HTV"
              colorPreset="cyan"
              actionRight={
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  3 Cột Mốc Nền Tảng
                </span>
              }
            />
          </div>

          {/* 3 Cards Bento Grid */}
          <div className="w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
            {CAREER_MILESTONES_DATA.slice(0, 3).map((item, idx) => {
              const bentoSpan = idx === 2 ? 'md:col-span-12' : 'md:col-span-6';
              return renderCareerCard(item, bentoSpan, true);
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 3: HÀNH TRÌNH BỨT PHÁ (4 CỘT MỐC CHUYỂN ĐỔI SỐ)                     */}
      {/* ========================================================================= */}
      {viewMode === 'slides' && currentSlide === 2 && (
        <div
          key="slide-3"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-2.5 p-3.5 sm:p-4 lg:p-5 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Header Card (Không có mốc năm, đúng 4 từ, Sentence case) */}
          <div className={`w-full p-3 sm:p-3.5 rounded-2xl border shrink-0 space-y-2 ${getGlassCardClass()}`}>
            <AnimatedCardTitle
              iconName="briefcase"
              title="Hành trình bứt phá"
              subtitle="Garena và Shopee · Prudential Việt Nam · MoMo · Ví ECO"
              colorPreset="purple"
              actionRight={
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  4 Cột Mốc Bứt Phá
                </span>
              }
            />
          </div>

          {/* 4 Cards Bento Grid */}
          <div className="w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
            {CAREER_MILESTONES_DATA.slice(3, 7).map((item, idx) => {
              const bentoSpan = idx === 0 ? 'md:col-span-12' : 'md:col-span-4';
              return renderCareerCard(item, bentoSpan, true);
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 4: TRIẾT LÝ QUẢN TRỊ, TÂM THƯ TRI ÂN & GIÁ TRỊ CỐT LÕI               */}
      {/* ========================================================================= */}
      {viewMode === 'slides' && currentSlide === 3 && (
        <div
          key="slide-4"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-3 p-3.5 sm:p-4 lg:p-5 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Upper Section: Triết lý quản trị (Left) & Tâm niệm đồng hành cùng Quý Công ty (Right) */}
          <div
            id="card-philosophy-gratitude"
            className={`w-full flex-1 min-h-0 relative overflow-hidden p-4 sm:p-5 rounded-2xl group text-left border flex flex-col justify-center ${getGlassCardClass()} ${
              activeTargetId === 'card-philosophy-gratitude'
                ? 'ring-2 ring-purple-500/80 dark:ring-cyan-400/80 shadow-[0_0_25px_rgba(168,85,247,0.22)]'
                : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch relative z-10 h-full min-h-0">
              {/* Left Column: TRIẾT LÝ QUẢN TRỊ */}
              <div className="flex flex-col justify-between gap-2.5 border-b lg:border-b-0 lg:border-r border-slate-200/70 dark:border-slate-800/80 pb-4 lg:pb-0 lg:pr-5 min-w-0">
                <div className="flex flex-col items-start text-left w-full">
                  <AnimatedCardTitle
                    iconName="sparkles"
                    title="Triết Lý Quản Trị"
                    subtitle="Ba nguyên tắc cốt lõi kiến tạo hệ thống phát triển bền vững"
                    colorPreset="purple"
                  />

                  <p className="text-[12.5px] sm:text-[13.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững.
                  </p>
                </div>

                {/* Three Core Principles */}
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                    Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi:
                  </p>

                  <div className="grid grid-cols-1 gap-2 w-full">
                    {OPERATIONAL_PRINCIPLES_DATA.map((principle, idx) => {
                      const iconName = idx === 0 ? 'layers' : idx === 1 ? 'users' : 'network';
                      const principleColor = idx === 0 ? '#3b82f6' : idx === 1 ? '#a855f7' : '#10b981';
                      return (
                        <div
                          key={principle.id}
                          className={`p-2.5 rounded-xl bg-white/85 dark:bg-slate-900/75 border dark:border-white/10 shadow-2xs text-left flex flex-col justify-between gap-1 transition-all hover:translate-x-1 duration-200 ${principle.borderClass}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className="flex items-center gap-2 text-xs font-bold"
                              style={{
                                color: principleColor,
                              }}
                            >
                              <WebIcon name={iconName} className="w-3.5 h-3.5 shrink-0" />
                              <h4
                                className="font-black text-[12.5px] sm:text-[13.5px] font-play leading-snug truncate"
                                style={{ color: principleColor }}
                              >
                                {principle.titleVi}
                              </h4>
                            </div>
                            <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500">
                              0{idx + 1}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-[11.5px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed break-words">
                            {principle.descVi}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: THỰC THI HỆ THỐNG, ĐÀO TẠO CON NGƯỜI & LỜI KẾT */}
              <div className="flex flex-col justify-between gap-2 min-w-0">
                <div className="flex flex-col gap-1.5">
                  <AnimatedCardTitle
                    iconName="heart"
                    title="Tâm Thư Đồng Hành"
                    subtitle="Công nghệ tự động hóa song hành cùng sự thấu hiểu con người"
                    colorPreset="rose"
                  />

                  <div className="text-[12px] sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed space-y-1.5 font-medium">
                    <p>
                      Từ đó, tôi tập trung xây dựng các hệ thống{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">CRM</strong>,{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">
                        Dashboard quản trị
                      </strong>
                      ,{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">
                        AI Chatbot
                      </strong>{' '}
                      và các giải pháp{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">
                        tự động hóa
                      </strong>
                      , nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu. Bên cạnh công nghệ, tôi luôn xem{' '}
                      <strong className="font-black text-rose-600 dark:text-rose-400">
                        con người là yếu tố quyết định thành công
                      </strong>
                      . Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng. Tôi luôn tâm niệm:
                    </p>
                  </div>
                </div>

                {/* Quote box synthesis */}
                <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950/90 dark:to-slate-950 p-2.5 sm:p-3 rounded-xl border border-amber-400/40 relative flex items-center gap-2.5 shadow-sm">
                  <span className="text-amber-400 font-serif font-black text-xl leading-none shrink-0">
                    “
                  </span>
                  <p className="text-amber-300 font-bold italic text-xs sm:text-[13px] leading-snug">
                    "Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời."
                  </p>
                </div>

                {/* Closing Cooperation & Gratitude Box */}
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-cyan-50/90 dark:from-emerald-950/40 dark:via-teal-950/35 dark:to-cyan-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[11.5px] sm:text-[12.5px] leading-snug space-y-1">
                  <p className="text-slate-800 dark:text-slate-100 font-medium">
                    Tôi mong muốn được đồng hành cùng <strong className="font-bold text-emerald-700 dark:text-emerald-300">{companyDisplay}</strong> trong việc xây dựng một hệ thống chăm sóc khách hàng hiện đại, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra giá trị phát triển bền vững.
                  </p>
                  <p className="font-extrabold text-emerald-700 dark:text-emerald-300 font-play">
                    Xin trân trọng cảm ơn {companyDisplay} đã dành thời gian lắng nghe!
                  </p>
                </div>

                {/* Bottom - Signature Block */}
                <div className="w-full flex flex-wrap items-center justify-between gap-2 relative z-10 text-left pt-1.5 border-t border-slate-200/70 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="-ml-1 shrink-0">
                      <SignatureSvg />
                    </div>
                    <div>
                      <h4 className="text-[14px] sm:text-[15px] font-black text-slate-900 dark:text-white font-play leading-tight">
                        Nguyễn Hùng Thái
                      </h4>
                      <span className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide font-mono block">
                        Trưởng phòng Chăm sóc Khách hàng
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9.5px] font-black tracking-wider uppercase font-mono shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      QUY TRÌNH
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      CON NGƯỜI
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      CÔNG NGHỆ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: GIÁ TRỊ CỐT LÕI PHÁT TRIỂN (4 Bento Cards) */}
          <div
            id="card-core-values-pursued"
            className={`w-full p-4 sm:p-4.5 shadow-md transition-all duration-300 flex flex-col items-start group/values z-10 border text-left rounded-2xl shrink-0 ${getGlassCardClass()}`}
          >
            {/* Tiêu đề Khối */}
            <AnimatedCardTitle
              iconName="trophy"
              title="Giá trị cốt lõi phát triển"
              subtitle="4 nguyên lý định hình phong cách làm việc & kiến tạo thành công bền vững"
              colorPreset="orange"
              actionRight={
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-orange-50 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                  4 Giá Trị Cốt Lõi
                </span>
              }
            />

            {/* 4 Cột Giá Trị Cốt Lõi Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-1">
              {CORE_VALUES_DATA.map((val) => {
                const valIconName =
                  val.number === '01'
                    ? 'heart'
                    : val.number === '02'
                    ? 'target'
                    : val.number === '03'
                    ? 'lightbulb'
                    : 'handshake';
                const isValBeingRead = activeTargetId === `core-val-${val.number}`;

                return (
                  <div
                    key={val.number}
                    id={`core-val-${val.number}`}
                    className={`relative overflow-hidden flex flex-col justify-between p-3.5 bg-gradient-to-br dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 border dark:border-white/15 shadow-xs hover:shadow-lg  transition-all duration-300 min-h-[125px] text-left group rounded-2xl ${val.colorTheme.bgGradient} ${val.colorTheme.border} ${
                      isValBeingRead
                        ? 'ring-2 ring-emerald-500 dark:ring-cyan-400 shadow-[0_0_24px_rgba(16,185,129,0.28)] -translate-y-1'
                        : ''
                    }`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.06] dark:opacity-[0.14] pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at bottom right, ${val.colorTheme.primary}, transparent 70%)`,
                      }}
                    />

                    <div className="flex items-center justify-between relative z-10 gap-2">
                      {/* Tiêu đề giá trị cốt lõi không đóng khung, icon & tiêu đề cùng màu */}
                      <div
                        className="flex items-center gap-2 max-w-[80%]"
                        style={{
                          color: val.colorTheme.primary,
                        }}
                      >
                        <WebIcon name={valIconName} className="w-4 h-4 shrink-0" />
                        <h4
                          className="text-xs sm:text-[13px] font-black tracking-normal font-play truncate"
                          style={{ color: val.colorTheme.primary }}
                        >
                          {formatCardTitle(val.titleVi)}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isValBeingRead && (
                          <AudioWaveformVisualizer isPlaying={!isPaused} barCount={4} size="sm" />
                        )}
                        <span
                          className={`font-mono tabular-nums font-black text-xl sm:text-2xl select-none ${val.colorTheme.numberText}`}
                        >
                          {val.number}
                        </span>
                      </div>
                    </div>

                    <div className="my-2 relative z-10 text-left">
                      <p className="text-[11.5px] sm:text-xs text-slate-700 dark:text-slate-300 leading-snug font-medium">
                        {val.descVi}
                      </p>
                    </div>

                    <span
                      className={`text-[9px] tracking-widest font-mono font-bold uppercase mt-auto relative z-10 ${val.colorTheme.tagText} dark:brightness-125`}
                    >
                      {val.idName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 2: MODAL CÁ NHÂN HÓA TÊN "QUÝ CÔNG TY" & TẠO LINK CHIA SẺ          */}
      {/* ========================================================================= */}
      {isCompanyModalOpen && (
        <Modal
          isOpen={isCompanyModalOpen}
          onClose={() => setIsCompanyModalOpen(false)}
          title="Cá Nhân Hóa Tên Quý Công Ty & Link Chia Sẻ"
          maxWidth="lg"
        >
          <div className="flex flex-col gap-4 p-1 text-left font-play">
            <p className="typo-body-sm text-slate-600 dark:text-slate-300">
              Nhập tên Doanh nghiệp / Đối tác để toàn bộ lời chào trong Thư Ngỏ, bản in PDF A4 và giọng đọc AI tự động cá nhân hóa thành{' '}
              <strong className="text-amber-600 dark:text-amber-400">
                “Kính chào Quý Công ty {companyInputDraft.trim() || '[Tên Công Ty]'}!”
              </strong>
              .
            </p>

            <div className="space-y-1.5">
              <label className="typo-label block text-slate-700 dark:text-slate-200">
                Tên Quý Công ty / Tập đoàn đối tác:
              </label>
              <input
                type="text"
                value={companyInputDraft}
                onChange={(e) => setCompanyInputDraft(e.target.value)}
                placeholder="Ví dụ: FPT, Viettel, VNG, Techcombank..."
                className="typo-input w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quick Company Presets */}
            <div className="space-y-1.5">
              <span className="typo-caption font-semibold text-slate-500 dark:text-slate-400 block">
                Gợi ý chọn nhanh:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['FPT', 'Viettel', 'VNG', 'MoMo', 'Shopee', 'Techcombank', 'ACB', 'Prudential'].map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCompanyInputDraft(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        companyInputDraft.trim() === preset
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                      }`}
                    >
                      {preset}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleApplyCompanyName('', false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition"
              >
                Đặt về mặc định ("Quý Công ty")
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyCompanyName(companyInputDraft, true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center gap-1.5 cursor-pointer transition"
                >
                  <WebIcon name="share-2" className="w-3.5 h-3.5" />
                  <span>Áp dụng & Copy Link (?company=...)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyCompanyName(companyInputDraft, false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer transition"
                >
                  Áp dụng ngay
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT CỘT MỐC SỰ NGHIỆP KHI CLICK VÀO THẺ                        */}
      {/* ========================================================================= */}
      {selectedMilestone && (
        <Modal
          isOpen={!!selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
          title={selectedMilestone.milestoneTitleVi || `${selectedMilestone.company} (${selectedMilestone.yearLabelVi})`}
          maxWidth="2xl"
        >
          <div className="flex flex-col gap-4 p-1 text-left font-play">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src={selectedMilestone.logo}
                    alt={selectedMilestone.company}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {selectedMilestone.milestoneTitleVi || formatCardTitle(selectedMilestone.company)}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-bold mt-0.5"
                    style={{ color: selectedMilestone.color }}
                  >
                    {selectedMilestone.roleVi} • {selectedMilestone.roleEn}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-black font-mono shrink-0 ${selectedMilestone.yearBadgeGradient}`}
              >
                {selectedMilestone.yearLabelVi}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                  Hành trình & Dấu ấn quản trị vận hành
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {renderFormattedText(selectedMilestone.descVi)}
                </p>
                {selectedMilestone.descViPart2 && (
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70">
                    {renderFormattedText(selectedMilestone.descViPart2)}
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1.5">
                  {selectedMilestone.descEn}
                </p>
              </div>

              <div
                className="p-3.5 rounded-xl border flex items-start gap-2.5"
                style={{
                  backgroundColor: `${selectedMilestone.color}12`,
                  borderColor: `${selectedMilestone.color}35`,
                }}
              >
                <span style={{ color: selectedMilestone.color }} className="shrink-0 mt-0.5">
                  <WebIcon
                    name={getMilestoneIconName(selectedMilestone.highlightIconName || 'Award')}
                    className="w-4 h-4"
                  />
                </span>
                <div>
                  <span
                    className="text-[10px] font-mono font-bold uppercase block mb-0.5"
                    style={{ color: selectedMilestone.color }}
                  >
                    Dấu ấn & Thành tựu nổi bật
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {selectedMilestone.highlightVi}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-0.5">
                    {selectedMilestone.highlightEn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* FLOATING AI VOICE SYNC READING HUD BAR (KARAOKE PODCAST LIVE CONTROLLER) */}
      {/* ========================================================================= */}
      {(isVideoPlaying || isNarrating) && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-md w-full px-2 animate-fade-in select-none">
          <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-indigo-300/80 dark:border-cyan-500/40 backdrop-blur-xl shadow-[0_12px_36px_rgba(30,41,59,0.22)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] p-2 sm:px-3 sm:py-2 flex items-center justify-between gap-2.5">
            {/* Live Progress Micro Bar */}
            <div
              className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 transition-all duration-200"
              style={{
                width: isVideoPlaying
                  ? `${videoProgressPct.toFixed(1)}%`
                  : `${Math.round(effectiveKaraokeProgress * 100)}%`,
              }}
            />

            {/* Left: Play/Pause button + Waveform */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <button
                type="button"
                onClick={isVideoPlaying ? (e) => toggleFloatingVideoPlay(e) : handleToggleNarration}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isVideoPlaying ? 'Tạm dừng Video Thuyết Minh' : isPaused ? 'Tiếp tục Giọng Đọc' : 'Tạm dừng Giọng Đọc'}
              >
                <WebIcon
                  name={isVideoPlaying || (isNarrating && !isPaused) ? 'pause' : 'play'}
                  className="w-3.5 h-3.5 fill-current ml-0.5"
                />
              </button>

              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-black uppercase tracking-wider font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/60 shrink-0">
                    {isVideoPlaying ? 'Video Scena AI' : 'Podcast AI Voice'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold shrink-0">
                    {isVideoPlaying
                      ? `${Math.round(videoProgressPct)}%`
                      : `${Math.round(effectiveKaraokeProgress * 100)}%`}
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-[12px] font-bold text-slate-900 dark:text-white truncate font-play">
                  {isVideoPlaying
                    ? activeVideoCue.noteTitle || activeVideoCue.noteBadge
                    : currentSegment?.label || 'Đang thuyết minh thư ngỏ'}
                </p>
              </div>
            </div>

            {/* Right: Audio Waveform Visualizer + Volume / Stop Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <AudioWaveformVisualizer
                isPlaying={isVideoPlaying || (isNarrating && !isPaused)}
                barCount={8}
                size="sm"
              />

              {isVideoPlaying && (
                <button
                  type="button"
                  onClick={(e) => toggleFloatingVideoMute(e)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    isVideoMuted
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 border-rose-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:text-blue-600'
                  }`}
                  title={isVideoMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                >
                  <WebIcon name={isVideoMuted ? 'volume-x' : 'volume-2'} className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  if (isVideoPlaying && floatingVideoRef.current) {
                    floatingVideoRef.current.pause();
                    setIsVideoPlaying(false);
                  }
                  if (isNarrating) {
                    stopNarration();
                  }
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                title="Đóng điều khiển"
              >
                <WebIcon name="x" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterView;
