'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { Modal } from '@/components/ui/Modal';
import { SoundEngine } from '@/components/ui/SoundEngine';
import {
  CAREER_MILESTONES_DATA,
  CORE_VALUES_DATA,
  OPERATIONAL_PRINCIPLES_DATA,
  CareerMilestoneItem,
} from '@/data/letterData';

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
  { id: 0, shortLabel: '01. Thông điệp hợp tác', icon: 'mail' },
  { id: 1, shortLabel: '02. Sự nghiệp (2002 - 2013)', icon: 'rocket' },
  { id: 2, shortLabel: '03. Sự nghiệp (2013 - 2026+)', icon: 'briefcase' },
  { id: 3, shortLabel: '04. Triết lý & Giá trị cốt lõi', icon: 'trophy' },
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
      <div className="flex items-center gap-2.5 text-left min-w-0 flex-1">
        <div
          className={`w-9 h-9 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center font-bold shadow-2xs shrink-0 ${
            animateIcon ? 'animate-[icon-floating_3s_ease-in-out_infinite]' : ''
          }`}
        >
          <WebIcon name={iconName} className="w-[25px] h-[25px] card-title-icon" />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm sm:text-base lg:text-[17px] font-black ${
              matchTitleColor ? scheme.text : 'text-slate-900 dark:text-white'
            } tracking-tight font-play leading-tight truncate`}
          >
            {title}
          </h3>
          {subtitle && (
            <p className={`text-[11px] sm:text-xs font-semibold ${scheme.sub} truncate mt-0.5`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actionRight && <div className="shrink-0">{actionRight}</div>}
    </div>
  );
};

export const LetterView: React.FC = () => {
  // Current Slide: 0 -> Slide 1, 1 -> Slide 2, 2 -> Slide 3, 3 -> Slide 4
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Selected milestone for detail modal
  const [selectedMilestone, setSelectedMilestone] = useState<CareerMilestoneItem | null>(null);

  // Collapse/Expand state for career milestones inline bilingual view
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({});

  // =========================================================================
  // AI VOICE NARRATION STATE & ENGINE (ĐỌC TỰ ĐỘNG 4 PHẦN THƯ NGỎ)
  // =========================================================================
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

  // Build authentic narration script across all 4 sections from existing data
  const narrationSegments = useMemo<NarrationSegment[]>(() => {
    const cleanBold = (str: string) => str.replace(/\*\*(.*?)\*\*/g, '$1');

    const slide0Segments: NarrationSegment[] = [
      {
        id: 'seg-s0-1',
        slideIndex: 0,
        targetId: 'card-main-letter-content',
        label: 'Thông điệp hợp tác — Lời mở đầu',
        text: 'Thư Ngỏ Đối Tác. Thông điệp hợp tác, định hướng phát triển bền vững cùng doanh nghiệp. Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự. Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc khách hàng với hơn 22 năm kinh nghiệm thực chiến từ năm 2002 đến 2026 trong lĩnh vực xây dựng, vận hành và chuyển đổi số hệ thống dịch vụ khách hàng chuyên nghiệp.',
      },
      {
        id: 'seg-s0-2',
        slideIndex: 0,
        targetId: 'card-main-letter-content',
        label: 'Thông điệp hợp tác — Tầm nhìn & 3 Trụ cột',
        text: 'Trong bối cảnh thị trường không ngừng biến động, trải nghiệm khách hàng và năng lực tự động hóa bằng công nghệ chính là lợi thế cạnh tranh cốt lõi. Tôi luôn hướng đến mục tiêu đồng hành cùng các tổ chức kiến tạo mô hình vận hành tinh gọn, đạt chuẩn quốc tế với ba trụ cột: Một, Vận hành quốc tế chuẩn COPC và ISO. Hai, Công nghệ và AI tối ưu trên 60 phần trăm tác vụ. Ba, Giá trị bền vững đạt CSAT 96 phần trăm và giảm rời bỏ.',
      },
      {
        id: 'seg-s0-3',
        slideIndex: 0,
        targetId: 'quote-banner-slide-1',
        label: 'Phương châm phụng sự',
        text: 'Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự.',
      },
    ];

    const slide1Segments: NarrationSegment[] = CAREER_MILESTONES_DATA.slice(0, 4).map(
      (item, idx) => ({
        id: `seg-s1-${item.id}`,
        slideIndex: 1,
        targetId: item.id,
        label: `${item.company} (${item.yearLabelVi})`,
        text: `${
          idx === 0
            ? 'Phần 2: Hành trình sự nghiệp đột phá giai đoạn 2002 đến 2013. '
            : ''
        }Giai đoạn ${item.yearLabelVi} tại ${item.company}, vị trí ${item.roleVi}. ${cleanBold(
          item.descVi
        )} Thành tựu nổi bật: ${item.highlightVi}`,
      })
    );

    const slide2Segments: NarrationSegment[] = CAREER_MILESTONES_DATA.slice(4, 8).map(
      (item, idx) => ({
        id: `seg-s2-${item.id}`,
        slideIndex: 2,
        targetId: item.id,
        label: `${item.company} (${item.yearLabelVi})`,
        text: `${
          idx === 0
            ? 'Phần 3: Hành trình sự nghiệp đột phá giai đoạn 2013 đến 2026. '
            : ''
        }Giai đoạn ${item.yearLabelVi} tại ${item.company}, vị trí ${item.roleVi}. ${cleanBold(
          item.descVi
        )} Thành tựu nổi bật: ${item.highlightVi}`,
      })
    );

    const principlesText = OPERATIONAL_PRINCIPLES_DATA.map(
      (p, i) => `Nguyên tắc ${i + 1}: ${p.titleVi}, ${p.descVi}`
    ).join(' ');

    const slide3Segments: NarrationSegment[] = [
      {
        id: 'seg-s3-philosophy',
        slideIndex: 3,
        targetId: 'card-philosophy-gratitude',
        label: 'Triết lý quản trị vận hành',
        text: `Phần 4: Triết lý quản trị vận hành và Giá trị cốt lõi. Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững. Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi: ${principlesText}`,
      },
      {
        id: 'seg-s3-gratitude',
        slideIndex: 3,
        targetId: 'card-philosophy-gratitude',
        label: 'Tâm thư tri ân phụng sự',
        text: 'Tâm thư tri ân phụng sự: Từ đó, tôi tập trung xây dựng các hệ thống CRM, Dashboard quản trị, AI Chatbot và các giải pháp tự động hóa, nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu. Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.',
      },
      ...CORE_VALUES_DATA.map((val, idx) => ({
        id: `seg-s3-val-${val.number}`,
        slideIndex: 3,
        targetId: `core-val-${val.number}`,
        label: `Giá trị cốt lõi ${val.number}: ${val.titleVi}`,
        text: `${
          idx === 0 ? 'Bốn giá trị cốt lõi phát triển gồm: ' : ''
        }Giá trị thứ ${idx + 1}, ${val.titleVi}: ${val.descVi}${
          idx === CORE_VALUES_DATA.length - 1
            ? ' Trân trọng cảm ơn Quý đối tác và Quý khách hàng. Nguyễn Hùng Thái — Trưởng phòng Chăm sóc Khách hàng.'
            : ''
        }`,
      })),
    ];

    return [...slide0Segments, ...slide1Segments, ...slide2Segments, ...slide3Segments];
  }, []);

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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setIsPaused(false);
    isNarratingRef.current = false;
    isPausedRef.current = false;
  }, [clearFallbackTimer]);

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

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(segment.text);
          utterance.lang = 'vi-VN';
          utterance.rate = speechRateRef.current;
          utterance.pitch = 1.02;

          // Pick best Vietnamese voice if available
          const viVoice =
            voices.find(
              (v) =>
                (v.lang.toLowerCase().includes('vi') || v.name.toLowerCase().includes('viet')) &&
                (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('HoaiMy') || v.name.includes('NamMinh'))
            ) || voices.find((v) => v.lang.toLowerCase().includes('vi'));

          if (viVoice) {
            utterance.voice = viVoice;
          }

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
    [narrationSegments, voices, clearFallbackTimer, stopNarration]
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

  // Active segment metadata
  const currentSegment = narrationSegments[activeSegmentIndex] || narrationSegments[0];
  const activeTargetId = isNarrating ? currentSegment?.targetId : null;
  const progressPercent = isNarrating
    ? Math.round(((activeSegmentIndex + 1) / narrationSegments.length) * 100)
    : 0;

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    return 'bg-white/85 dark:bg-[#121624]/90 border border-white/90 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_8px_30px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] hover:shadow-[0_12px_36px_0_rgba(31,38,135,0.12)] transition-all duration-300';
  }, []);

  // Helper to format bold text split by **
  const renderFormattedText = (text: string) => {
    if (!text) return '';
    const tokens = text.split('**');
    return tokens.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Render quick section switcher pills + AI Voice Narration Trigger Button
  const renderSectionSwitcher = () => (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
      {/* AI Voice Narration Quick Button */}
      <button
        type="button"
        onClick={handleToggleNarration}
        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
          isNarrating
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.45)]'
            : 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 hover:from-amber-500 hover:to-orange-600 text-white border-amber-300/80 shadow-xs'
        }`}
        title={isNarrating ? 'Tạm dừng / Tiếp tục đọc Thư Ngỏ bằng giọng nói AI' : 'Nghe AI đọc tự động 4 phần Thư Ngỏ'}
      >
        <WebIcon name={isNarrating && !isPaused ? 'pause' : 'volume-2'} className="w-3.5 h-3.5 shrink-0" />
        <span>{isNarrating ? (isPaused ? 'Tiếp tục nghe' : 'Đang đọc AI...') : 'Nghe Thư Ngỏ AI'}</span>
        {isNarrating && <AudioWaveformVisualizer isPlaying={!isPaused} barCount={5} size="sm" />}
      </button>

      {LETTER_SECTIONS.map((sec) => {
        const isActive = currentSlide === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => handleSelectSlide(sec.id)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-xs'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 shadow-2xs'
            }`}
          >
            <WebIcon name={sec.icon} className="w-3 h-3 shrink-0" />
            <span>{sec.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );

  // Subcomponent to render each career milestone card
  const renderCareerCard = (item: CareerMilestoneItem) => {
    const roleIcon = getMilestoneIconName(item.roleIconName);
    const highlightIcon = getMilestoneIconName(item.highlightIconName || 'Sparkles');
    const mainIcon = getMilestoneIconName(item.iconName);
    const isExpanded = !!expandedCard[item.id];
    const isCardBeingRead = activeTargetId === item.id;

    return (
      <div
        key={item.id}
        id={item.id}
        onClick={() => setSelectedMilestone(item)}
        className={`flex flex-col justify-between p-3.5 sm:p-4 lg:p-5 relative transition-all duration-300 overflow-hidden group/mcard border w-full h-full min-h-0 hover:-translate-y-1 text-left rounded-2xl cursor-pointer ${getGlassCardClass()} ${
          isCardBeingRead
            ? 'ring-2 ring-emerald-500 dark:ring-cyan-400 shadow-[0_0_28px_rgba(16,185,129,0.28)] -translate-y-1'
            : ''
        }`}
      >
        {/* Active Voice Reading Indicator Badge on Card */}
        {isCardBeingRead && (
          <div className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/95 text-white text-[10px] font-bold shadow-sm backdrop-blur-md">
            <AudioWaveformVisualizer isPlaying={!isPaused} barCount={4} size="sm" />
            <span>Đang thuyết minh</span>
          </div>
        )}

        {/* Subtle Brand Color Radial Tint */}
        <div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
          style={{
            background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)`,
          }}
        />

        {/* Watermark Background Icon */}
        <div
          className="absolute -right-5 -bottom-5 w-20 h-20 sm:w-24 sm:h-24 rotate-12 pointer-events-none transition-all duration-500 ease-in-out z-0 select-none opacity-10 dark:opacity-15 group-hover/mcard:rotate-6 group-hover/mcard:scale-110 group-hover/mcard:opacity-20"
          style={{ color: item.color }}
        >
          <WebIcon name={mainIcon} className="w-full h-full" />
        </div>

        {/* Header: Company Logo & Name & Role on Left, Year Badge Pill on Right */}
        <div className="w-full flex items-start sm:items-center justify-between gap-2 pb-2.5 mb-2 border-b border-slate-200/70 dark:border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 text-left">
            <div
              className={`flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/mcard:scale-105 ${
                item.id === 'card-2018'
                  ? 'w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-500/15 dark:bg-purple-500/25 border-2 border-purple-500/35 shadow-[0_0_15px_rgba(168,85,247,0.25)] p-1.5'
                  : 'w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/80 p-1.5 shadow-2xs'
              }`}
            >
              <img
                src={item.logo}
                alt={item.company}
                className={`w-full h-full object-contain ${
                  item.id === 'card-2018' ? 'rounded-full' : ''
                }`}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[14px] sm:text-[16px] font-black tracking-tight leading-snug truncate text-slate-900 dark:text-white font-play">
                {item.company}
              </h4>
              <div
                className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-bold mt-0.5 min-w-0"
                style={{ color: item.color }}
              >
                <WebIcon name={roleIcon} className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate dark:brightness-125">{`Vị trí: ${item.roleVi}`}</span>
              </div>
            </div>
          </div>

          {/* Year Badge Pill with Gradient */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-white text-[10px] sm:text-[11px] font-black font-mono tabular-nums shadow-2xs tracking-wider uppercase shrink-0 whitespace-nowrap ml-auto ${item.yearBadgeGradient}`}
          >
            {item.yearLabelVi}
          </span>
        </div>

        {/* Body: Text with full width readability */}
        <div className="w-full flex-1 my-0.5 text-left relative z-10 flex flex-col justify-center min-h-0">
          <p className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-200 text-left font-medium break-words">
            {renderFormattedText(item.descVi)}
          </p>

          {isExpanded && (
            <p className="text-[11.5px] sm:text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/60">
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

        {/* Bottom Highlight Box */}
        <div
          className="w-full mt-2 p-2 sm:p-2.5 rounded-xl flex items-start sm:items-center gap-2 text-[11.5px] sm:text-[12px] text-slate-800 dark:text-slate-100 font-semibold relative z-10 border shrink-0"
          style={{
            backgroundColor: `${item.color}14`,
            borderColor: `${item.color}35`,
          }}
        >
          <span style={{ color: item.color }} className="shrink-0 mt-0.5 sm:mt-0 dark:brightness-125">
            <WebIcon name={highlightIcon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
          <span className="flex-1 leading-snug text-left break-words line-clamp-2">
            {item.highlightVi}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full max-w-full flex-1 min-h-0 flex flex-col gap-2.5 justify-between relative z-10 text-slate-800 dark:text-slate-100 select-none overflow-y-auto lg:overflow-hidden glass-scrollbar">
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
      {/* CẶP NÚT TRÒN ĐIỀU HƯỚNG SLIDE BÊN TRÁI & PHẢI (CĂN CENTER CHIỀU DỌC)        */}
      {/* ========================================================================= */}
      <button
        type="button"
        onClick={handlePrevSlide}
        className="fixed lg:absolute left-1.5 sm:left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.16)] backdrop-blur-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-40 group"
        title="Slide trước (Phím ←)"
        aria-label="Slide trước"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8] transition-transform duration-200 group-hover:-translate-x-0.5 text-blue-600 dark:text-cyan-400"
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
        className="fixed lg:absolute right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.16)] backdrop-blur-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-40 group"
        title="Slide kế tiếp (Phím →)"
        aria-label="Slide kế tiếp"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8] transition-transform duration-200 group-hover:translate-x-0.5 text-blue-600 dark:text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ========================================================================= */}
      {/* SLIDE 1: THÔNG ĐIỆP HỢP TÁC CHIẾN LƯỢC & BANNER                           */}
      {/* ========================================================================= */}
      {currentSlide === 0 && (
        <div
          key="slide-1"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-3 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Top Hero Banner with interactive slide switcher */}
          <HeroBanner
            badgeText="Thư ngỏ"
            title="Thư Ngỏ Đối Tác"
            subtitle="Thông điệp hợp tác – Định hướng phát triển bền vững cùng doanh nghiệp"
            quote="“Trải nghiệm hôm nay kiến tạo giá trị bền vững ngày mai.”"
            quoteAuthor="— Nguyễn Hùng Thái"
            badgeColor="text-rose-400"
            titleColor="text-amber-300"
            videoSrc="https://cdn.scena.ai/project/10223/613f6772f425f2e4b9526e40970b5a3295a59dba54cbbdddc912ba437fb02ca4.mp4"
            bottomControls={
              <div className="w-full flex items-center justify-between gap-2">
                {renderSectionSwitcher()}
              </div>
            }
          />

          {/* Main Letter Content: Thông điệp hợp tác chiến lược */}
          <div
            id="card-main-letter-content"
            className={`w-full flex-1 min-h-0 relative overflow-hidden p-4 sm:p-5 lg:p-6 rounded-2xl flex flex-col justify-center group z-10 border ${getGlassCardClass()} ${
              activeTargetId === 'card-main-letter-content'
                ? 'ring-2 ring-emerald-500/80 dark:ring-cyan-400/80 shadow-[0_0_25px_rgba(16,185,129,0.22)]'
                : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full min-h-0">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-8 w-full flex flex-col justify-between relative z-10 text-left min-w-0">
                <div>
                  <AnimatedCardTitle
                    iconName="book"
                    title="Thông điệp hợp tác"
                    subtitle="Tầm nhìn & Định hướng phát triển bền vững"
                    colorPreset="emerald"
                    animateIcon={true}
                    matchTitleColor={true}
                  />

                  {/* Salutation Line in Vibrant Orange */}
                  <p className="text-[#f95700] dark:text-[#fb923c] font-extrabold text-[15px] sm:text-[17px] lg:text-[18px] leading-snug mb-2 font-play">
                    Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự.
                  </p>

                  {/* Body Content */}
                  <div className="text-slate-800 dark:text-slate-200 text-[13.5px] sm:text-[14.5px] leading-relaxed font-medium text-left space-y-2">
                    <p>
                      Tôi là{' '}
                      <strong className="font-black text-[#0f172a] dark:text-white">
                        Nguyễn Hùng Thái
                      </strong>
                      , Trưởng phòng Chăm sóc khách hàng với hơn{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">
                        22 năm kinh nghiệm (2002 - 2026+)
                      </strong>{' '}
                      thực chiến trong lĩnh vực xây dựng, vận hành và chuyển đổi số hệ thống dịch vụ khách hàng chuyên nghiệp.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      Trong bối cảnh thị trường không ngừng biến động, trải nghiệm khách hàng (Customer Experience - CX) và năng lực tự động hóa bằng công nghệ chính là lợi thế cạnh tranh cốt lõi. Tôi luôn hướng đến mục tiêu đồng hành cùng các tổ chức kiến tạo mô hình vận hành tinh gọn, đạt chuẩn quốc tế và tạo ra giá trị đo lường được bằng doanh thu và lòng trung thành của người dùng.
                    </p>
                  </div>
                </div>

                {/* 3 Trụ cột hợp tác */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800/80 shrink-0">
                  <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800/60 flex items-center gap-2.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-mono font-black text-xs shadow-2xs">
                      01
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-black font-mono text-blue-700 dark:text-blue-300 uppercase block truncate">
                        01. Vận hành quốc tế
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                        Chuẩn COPC & ISO
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/50 border border-purple-200/70 dark:border-purple-800/60 flex items-center gap-2.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 font-mono font-black text-xs shadow-2xs">
                      02
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-black font-mono text-purple-700 dark:text-purple-300 uppercase block truncate">
                        02. Công nghệ & AI
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                        Tối ưu 60%+ tác vụ
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/60 flex items-center gap-2.5 transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-mono font-black text-xs shadow-2xs">
                      03
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-black font-mono text-emerald-700 dark:text-emerald-300 uppercase block truncate">
                        03. Giá trị bền vững
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                        CSAT 96% & Giảm rời bỏ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Video Showcase / AI Robot Companion */}
              <div className="lg:col-span-4 w-full h-48 sm:h-56 lg:h-full min-h-[190px] relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-md bg-slate-900 group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10.5px] font-bold text-white border border-white/30 self-start mb-1">
                    <WebIcon name="sparkles" className="w-3 h-3 text-emerald-300" />
                    <span>AI Robot Companion</span>
                  </div>
                  <span className="text-xs text-slate-200 font-semibold leading-snug">
                    Trợ lý ảo & Hạ tầng tự động hóa dịch vụ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Quote Banner Bottom */}
          <div id="quote-banner-slide-1" className="w-full relative group/banner overflow-hidden z-10 shrink-0">
            <div
              className={`relative z-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-white py-3 px-4 sm:px-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/20 dark:border-indigo-500/30 backdrop-blur-[16px] ${
                activeTargetId === 'quote-banner-slide-1'
                  ? 'ring-2 ring-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.35)]'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0 shadow-2xs backdrop-blur-md">
                  <span className="text-lg font-serif font-black leading-none">“</span>
                </div>
                <p className="text-white text-xs sm:text-sm lg:text-[15px] font-bold leading-snug tracking-wide font-play text-center sm:text-left">
                  "Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự."
                </p>
              </div>
              <span className="text-xs text-sky-200 font-bold shrink-0 font-play">
                — Nguyễn Hùng Thái
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 2: HÀNH TRÌNH SỰ NGHIỆP ĐỘT PHÁ (4 THẺ: 2002 - 2013)                 */}
      {/* ========================================================================= */}
      {currentSlide === 1 && (
        <div
          key="slide-2"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-3 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Header Card */}
          <div className={`w-full p-3.5 sm:p-4 rounded-2xl border shrink-0 ${getGlassCardClass()}`}>
            <AnimatedCardTitle
              iconName="rocket"
              title="Hành trình sự nghiệp đột phá (Phần 1: 2002 - 2013)"
              subtitle="4 cột mốc đầu tiên đặt nền móng viễn thông, call center quốc tế, truyền hình và thể thao điện tử"
              colorPreset="cyan"
              actionRight={
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/60 text-blue-800 dark:text-sky-300 font-bold italic text-xs">
                    <span>Trải nghiệm hôm nay · Tạo giá trị ngày mai</span>
                  </div>
                  {renderSectionSwitcher()}
                </div>
              }
            />
          </div>

          {/* 4 Cards Grid (2 Cột x 2 Hàng) */}
          <div className="w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 gap-3 sm:gap-[15px] items-stretch">
            {CAREER_MILESTONES_DATA.slice(0, 4).map((item) => renderCareerCard(item))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 3: HÀNH TRÌNH SỰ NGHIỆP ĐỘT PHÁ (4 THẺ: 2013 - 2026+)                */}
      {/* ========================================================================= */}
      {currentSlide === 2 && (
        <div
          key="slide-3"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-3 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Header Card */}
          <div className={`w-full p-3.5 sm:p-4 rounded-2xl border shrink-0 ${getGlassCardClass()}`}>
            <AnimatedCardTitle
              iconName="briefcase"
              title="Hành trình sự nghiệp đột phá (Phần 2: 2013 - 2026+)"
              subtitle="4 cột mốc bứt phá trong kỷ nguyên TMĐT, Bảo hiểm nhân thọ, Fintech & Chuyển đổi số AI"
              colorPreset="purple"
              actionRight={
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-800 dark:text-purple-300 font-bold italic text-xs">
                    <span>Đổi mới không ngừng · Tối ưu vận hành toàn diện</span>
                  </div>
                  {renderSectionSwitcher()}
                </div>
              }
            />
          </div>

          {/* 4 Cards Grid (2 Cột x 2 Hàng) */}
          <div className="w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 gap-3 sm:gap-[15px] items-stretch">
            {CAREER_MILESTONES_DATA.slice(4, 8).map((item) => renderCareerCard(item))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 4: TRIẾT LÝ QUẢN TRỊ, TÂM THƯ TRI ÂN & GIÁ TRỊ CỐT LÕI               */}
      {/* ========================================================================= */}
      {currentSlide === 3 && (
        <div
          key="slide-4"
          className={`w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-3 ${
            slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* Upper Section: Triết lý quản trị vận hành (Left) & Tâm thư tri ân phụng sự (Right) */}
          <div
            id="card-philosophy-gratitude"
            className={`w-full flex-1 min-h-0 relative overflow-hidden p-4 sm:p-5 rounded-2xl group text-left border flex flex-col justify-center ${getGlassCardClass()} ${
              activeTargetId === 'card-philosophy-gratitude'
                ? 'ring-2 ring-purple-500/80 dark:ring-cyan-400/80 shadow-[0_0_25px_rgba(168,85,247,0.22)]'
                : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch relative z-10 h-full min-h-0">
              {/* Left Column: TRIẾT LÝ QUẢN TRỊ VẬN HÀNH */}
              <div className="flex flex-col justify-between gap-2.5 border-b lg:border-b-0 lg:border-r border-slate-200/70 dark:border-slate-800/80 pb-4 lg:pb-0 lg:pr-5 min-w-0">
                <div className="flex flex-col items-start text-left w-full">
                  <AnimatedCardTitle
                    iconName="sparkles"
                    title="Triết lý quản trị vận hành"
                    subtitle="Nguyên tắc cốt lõi kiến tạo dịch vụ xuất sắc"
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

                  <div className="grid grid-cols-1 gap-2">
                    {OPERATIONAL_PRINCIPLES_DATA.map((principle, idx) => {
                      const iconName = idx === 0 ? 'layers' : idx === 1 ? 'users' : 'network';
                      return (
                        <div
                          key={principle.id}
                          className={`p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/75 border dark:border-white/10 shadow-2xs text-left flex items-center gap-3 transition-all hover:translate-x-1 duration-200 ${principle.borderClass}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${principle.bgClass} dark:bg-opacity-20`}
                          >
                            <WebIcon name={iconName} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-extrabold text-[13px] sm:text-[13.5px] text-slate-900 dark:text-white font-play leading-snug truncate">
                              {principle.titleVi}
                            </h4>
                            <p className="text-[11px] sm:text-[11.5px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium leading-tight break-words">
                              {principle.descVi}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: TÂM THƯ TRI ÂN PHỤNG SỰ */}
              <div className="flex flex-col justify-between gap-2.5 min-w-0">
                <div className="flex flex-col gap-2">
                  <AnimatedCardTitle
                    iconName="heart"
                    title="Tâm thư tri ân phụng sự"
                    subtitle="Tận tâm lắng nghe & Đồng hành cùng khách hàng"
                    colorPreset="rose"
                  />

                  <div className="text-[12.5px] sm:text-[13.5px] text-slate-700 dark:text-slate-200 leading-relaxed space-y-2 font-medium">
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
                      , nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu.
                    </p>
                    <p>
                      Bên cạnh công nghệ, tôi luôn xem{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">
                        con người
                      </strong>{' '}
                      là yếu tố quyết định thành công. Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng.
                    </p>
                  </div>
                </div>

                {/* Quote box synthesis */}
                <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950/90 dark:to-slate-950 p-3 rounded-xl border border-amber-400/40 relative flex items-center gap-2.5 shadow-sm">
                  <span className="text-amber-400 font-serif font-black text-xl leading-none shrink-0">
                    “
                  </span>
                  <p className="text-amber-300 font-bold italic text-xs sm:text-[13px] leading-snug">
                    “Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.”
                  </p>
                </div>

                {/* Bottom - Signature Block */}
                <div className="w-full flex flex-wrap items-center justify-between gap-2 relative z-10 text-left pt-2 border-t border-slate-200/70 dark:border-slate-800/80">
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
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      TRẢI NGHIỆM
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      KẾT NỐI
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      PHÁT TRIỂN
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
              actionRight={renderSectionSwitcher()}
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
                    className={`relative overflow-hidden flex flex-col justify-between p-3.5 bg-gradient-to-br dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 border dark:border-white/15 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[125px] text-left group rounded-2xl ${val.colorTheme.bgGradient} ${val.colorTheme.border} ${
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
                    <div
                      className="absolute -right-4 -bottom-4 w-16 h-16 opacity-10 dark:opacity-15 rotate-12 pointer-events-none"
                      style={{ color: val.colorTheme.primary }}
                    >
                      <WebIcon name={valIconName} className="w-full h-full" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110 ${val.colorTheme.iconBg} dark:bg-slate-800 dark:border-white/15`}
                      >
                        <WebIcon name={valIconName} className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
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
                      <h4
                        className={`text-sm sm:text-[15px] font-black tracking-normal mb-0.5 font-play ${val.colorTheme.titleText} dark:text-white`}
                      >
                        {val.titleVi}
                      </h4>
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
      {/* MODAL CHI TIẾT CỘT MỐC SỰ NGHIỆP KHI CLICK VÀO THẺ                        */}
      {/* ========================================================================= */}
      {selectedMilestone && (
        <Modal
          isOpen={!!selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
          title={`${selectedMilestone.company} (${selectedMilestone.yearLabelVi})`}
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
                    {selectedMilestone.company}
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
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                  Trách nhiệm & Phạm vi vận hành
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {renderFormattedText(selectedMilestone.descVi)}
                </p>
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
    </div>
  );
};

export default LetterView;
