'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  TU_VI_PROFILE,
  ZODIAC_SYNERGY_LIST,
  ACTION_PHILOSOPHY_CARDS,
} from '@/data/tuviData';
import { WebIcon } from '@/components/ui/WebIcon';
import { useToast } from '@/components/ui/Toast';
import { cn, formatCardTitle } from '@/lib/utils';
import {
  Shield,
  Heart,
  BarChart3,
  Cpu,
  Compass,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Globe,
  Smile,
  Layers,
  CheckCircle2,
  Calendar,
  Clock,
  Moon,
} from 'lucide-react';

export interface HoroscopeViewProps {
  currentTheme?: string;
}

export const HoroscopeView: React.FC<HoroscopeViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();

  // Active Slide State: 0 (Bát Trạch & Bản Mệnh), 1 (Phong Cách Quản Trị), 2 (Ưu Thế Khi Làm Việc), 3 (Triết Lý Lãnh Đạo)
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const handlePrevSlide = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 3));
  }, []);

  const handleNextSlide = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // Audio Playback State for Yin-Yang Circle
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Zodiac Synergy Tab / Interactive Lookup State
  const [selectedZodiacId, setSelectedZodiacId] = useState<string | null>(null);
  const [searchYearInput, setSearchYearInput] = useState<string>('');
  const [zodiacFilterTier, setZodiacFilterTier] = useState<string>('all');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Compass view mode: Âm Dương hoặc Bát Trạch Quái
  const [compassMode, setCompassMode] = useState<'yinyang' | 'battrach'>('yinyang');

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://cdn.scena.ai/project/9626/b40b848d5a2ad108760073e8c64bd80f963850ab7e79c19af228c82a83f6419d.mp3'
      );
      audioRef.current.loop = true;
    }
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
      showToast('Đã tạm dừng âm thanh thiền định');
    } else {
      audioRef.current.play().catch(() => {});
      setIsAudioPlaying(true);
      showToast('Đang phát âm thanh thiền định tĩnh tâm 432Hz');
    }
  }, [isAudioPlaying, showToast]);

  // Memoize active zodiac data
  const currentZodiac = useMemo(() => {
    if (!selectedZodiacId) return null;
    return ZODIAC_SYNERGY_LIST.find((z) => z.id === selectedZodiacId) || null;
  }, [selectedZodiacId]);

  // Handle year search
  const handleYearSearch = useCallback(() => {
    const year = parseInt(searchYearInput.trim(), 10);
    if (!isNaN(year) && year >= 1920 && year <= 2040) {
      const zodiacOrder = [
        'than',
        'dau',
        'tuat',
        'hoi',
        'ty',
        'suu',
        'dan',
        'mao',
        'thin',
        'ty_snake',
        'ngo',
        'mui',
      ];
      const targetId = zodiacOrder[year % 12];
      setSelectedZodiacId(targetId);
      setHasSearched(true);
      const found = ZODIAC_SYNERGY_LIST.find((z) => z.id === targetId);
      if (found) {
        showToast(
          `Tra cứu năm ${year}: Tuổi ${found.nameVi} (${found.animalVi}) · ${found.score}`
        );
      }
    } else {
      showToast('Vui lòng nhập năm sinh từ 1920 đến 2040');
    }
  }, [searchYearInput, showToast]);

  const filteredZodiacList = useMemo(() => {
    const list = ZODIAC_SYNERGY_LIST.filter((item) => {
      if (zodiacFilterTier === 'all') return true;
      if (zodiacFilterTier === 'best')
        return item.tier === 'best' || item.tier === 'luc_hop';
      return item.tier === zodiacFilterTier;
    });

    const traditionalOrder = [
      'ty',
      'suu',
      'dan',
      'mao',
      'thin',
      'ty_snake',
      'ngo',
      'mui',
      'than',
      'dau',
      'tuat',
      'hoi',
    ];
    return [...list].sort(
      (a, b) => traditionalOrder.indexOf(a.id) - traditionalOrder.indexOf(b.id)
    );
  }, [zodiacFilterTier]);

  const getZodiacTheme = (tier: string) => {
    if (tier === 'best') {
      return {
        accent: 'emerald',
        badge: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs',
        bgUnselected:
          'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-100',
        bgSelected:
          'bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-emerald-600/30 border-emerald-400 dark:border-emerald-400 ring-2 ring-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.35)]',
        textColor: 'text-emerald-700 dark:text-emerald-300',
        accentBg: 'bg-emerald-500/10 border-emerald-500/30',
        gradientBox:
          'from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border-emerald-500/40 dark:border-emerald-400/50',
      };
    }
    if (tier === 'support') {
      return {
        accent: 'cyan',
        badge: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs',
        bgUnselected:
          'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 dark:border-cyan-500/40 text-cyan-900 dark:text-cyan-100',
        bgSelected:
          'bg-gradient-to-br from-cyan-500/25 via-sky-500/20 to-blue-600/30 border-cyan-400 dark:border-cyan-400 ring-2 ring-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.35)]',
        textColor: 'text-cyan-700 dark:text-cyan-300',
        accentBg: 'bg-cyan-500/10 border-cyan-500/30',
        gradientBox:
          'from-cyan-500/15 via-sky-500/10 to-blue-500/15 border-cyan-500/40 dark:border-cyan-400/50',
      };
    }
    if (tier === 'luc_hop') {
      return {
        accent: 'purple',
        badge: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-xs',
        bgUnselected:
          'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 dark:border-purple-500/40 text-purple-900 dark:text-purple-100',
        bgSelected:
          'bg-gradient-to-br from-purple-500/25 via-fuchsia-500/20 to-pink-600/30 border-purple-400 dark:border-purple-400 ring-2 ring-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.35)]',
        textColor: 'text-purple-700 dark:text-purple-300',
        accentBg: 'bg-purple-500/10 border-purple-500/30',
        gradientBox:
          'from-purple-500/15 via-fuchsia-500/10 to-pink-500/15 border-purple-500/40 dark:border-purple-400/50',
      };
    }
    return {
      accent: 'amber',
      badge: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs',
      bgUnselected:
        'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 dark:border-amber-500/40 text-amber-900 dark:text-amber-100',
      bgSelected:
        'bg-gradient-to-br from-amber-500/25 via-orange-500/20 to-amber-600/30 border-amber-400 dark:border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.35)]',
      textColor: 'text-amber-700 dark:text-amber-300',
      accentBg: 'bg-amber-500/10 border-amber-500/30',
      gradientBox:
        'from-amber-500/15 via-orange-500/10 to-amber-500/15 border-amber-500/40 dark:border-amber-400/50',
    };
  };

  const batTrachCat = [
    {
      direction: 'Tây Bắc',
      star: 'Sinh Khí',
      meaning: 'Thu hút cơ hội, danh tiếng & thăng tiến',
      tag: 'Cát Tinh bậc 1',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
    },
    {
      direction: 'Tây Nam',
      star: 'Diên Niên',
      meaning: 'Gắn kết đội ngũ & hòa hợp các mối quan hệ',
      tag: 'Cát Tinh bậc 2',
      color: 'border-teal-500/40 bg-teal-500/10 text-teal-800 dark:text-teal-300',
    },
    {
      direction: 'Đông Bắc',
      star: 'Thiên Y',
      meaning: 'Trường thọ, tinh thần minh mẫn & bình an',
      tag: 'Cát Tinh bậc 3',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-800 dark:text-cyan-300',
    },
    {
      direction: 'Chính Tây',
      star: 'Phục Vị',
      meaning: 'Vững vàng nội lực & kiên định mục tiêu',
      tag: 'Cát Tinh bậc 4',
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-800 dark:text-indigo-300',
    },
  ];

  // 1. SLIDE 1: Tử vi bát trạch - Tối ưu nội dung không trùng lặp, gọn gàng
  const renderSection1BatTrach = () => (
    <div
      id="tuvi-section-1"
      className="w-full h-full bg-gradient-to-br from-white/95 via-purple-50/25 to-amber-50/30 dark:from-slate-900/95 dark:via-purple-950/20 dark:to-slate-900/95 border border-purple-200/80 dark:border-purple-800/60 rounded-[14px] p-4 sm:p-5 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_22px_-2px_rgba(168,85,247,0.25)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden relative group text-left font-play"
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-purple-200/50 dark:border-purple-800/40 shrink-0">
        <h2 className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-300 flex items-center gap-2 font-play">
          <Compass className="w-5 h-5 text-purple-600 dark:text-purple-300 animate-pulse shrink-0" />
          <span>{formatCardTitle("Tử Vi Bát Trạch")}</span>
        </h2>
      </div>

      {/* Body: La Bàn Âm Dương (Trái) & Hồ Sơ Nhân Thân + 4 Hướng Cát (Phải) */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pt-3 pr-0.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch h-full">
          {/* Cột trái: La Bàn Âm Dương & Âm thanh thiền */}
          <div className="lg:col-span-4 bg-gradient-to-br from-purple-500/15 via-white/80 dark:via-slate-800/80 to-amber-500/15 border border-purple-300/60 dark:border-purple-700/50 rounded-2xl p-3.5 flex flex-col items-center justify-between text-center space-y-2.5 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.65),0_0_16px_rgba(168,85,247,0.2)] backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-1.5 border-b border-purple-200/50 dark:border-purple-800/40 w-full text-left flex-wrap gap-1">
              <div className="flex items-center gap-1.5 min-w-0 text-purple-600 dark:text-purple-300">
                <Compass className="w-4 h-4 text-purple-600 dark:text-purple-300 shrink-0" />
                <h4 className="text-xs sm:text-sm font-black font-play text-purple-600 dark:text-purple-300 tracking-wide truncate">
                  {formatCardTitle("La Bàn Âm Dương")}
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCompassMode(compassMode === 'yinyang' ? 'battrach' : 'yinyang')
                }
                className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-xs cursor-pointer transition-all shrink-0"
              >
                {compassMode === 'yinyang' ? 'Bát Trạch' : 'Âm Dương'}
              </button>
            </div>

            {compassMode === 'yinyang' ? (
              <div className="relative my-1">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={toggleAudio}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAudio();
                    }
                  }}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 shadow-md flex items-center justify-center cursor-pointer transition-all duration-500 group relative ${
                    isAudioPlaying
                      ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 ring-3 ring-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.65)]'
                      : 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-2 ring-amber-300/40 hover:brightness-105'
                  }`}
                  title={isAudioPlaying ? 'Tắt âm thanh tĩnh tâm' : 'Phát âm thanh thiền định 432Hz'}
                >
                  <div className="w-full h-full rounded-full bg-slate-950 border-2 border-amber-300 flex items-center justify-center relative overflow-hidden shadow-inner">
                    <img
                      src="https://i.ibb.co/nsKpgT8V/Yin-Yan.jpg"
                      alt="Yin Yang Compass"
                      className={`w-full h-full rounded-full object-cover transition-all duration-700 ${
                        isAudioPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/200x200/1e1b4b/fbbf24?text=Yin-Yang';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/30 rounded-full flex items-center justify-center transition-opacity group-hover:bg-slate-950/45">
                      <div
                        className={`p-2 rounded-full text-white shadow-lg backdrop-blur-sm border border-white/50 transition-all ${
                          isAudioPlaying
                            ? 'bg-amber-500 shadow-amber-500/50 ring-2 ring-white'
                            : 'bg-black/70 hover:brightness-110'
                        }`}
                      >
                        <WebIcon
                          name={isAudioPlaying ? 'pause' : 'play'}
                          className="w-3.5 h-3.5 fill-current"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative my-1 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-indigo-400/50 bg-indigo-950/90 p-1.5 flex items-center justify-center text-white shadow-inner">
                <div className="w-full h-full rounded-full border border-indigo-300/30 flex flex-col items-center justify-center relative text-center">
                  <div className="text-[9.5px] font-black text-amber-300">TÂY TỨ MỆNH</div>
                  <div className="text-sm font-black text-cyan-300 my-0.5">Đoài Kim</div>
                  <div className="text-[8px] text-slate-300">Kim Tứ Cục · Cung Tý</div>
                  <span className="absolute top-0.5 text-[7.5px] font-black text-emerald-300 bg-emerald-950/70 px-1 rounded">
                    TB Sinh Khí
                  </span>
                  <span className="absolute bottom-0.5 text-[7.5px] font-black text-teal-300 bg-teal-950/70 px-1 rounded">
                    TN Diên Niên
                  </span>
                  <span className="absolute left-0.5 text-[7.5px] font-black text-cyan-300 bg-cyan-950/70 px-1 rounded">
                    ĐB Thiên Y
                  </span>
                  <span className="absolute right-0.5 text-[7.5px] font-black text-indigo-300 bg-indigo-950/70 px-1 rounded">
                    T Phục Vị
                  </span>
                </div>
              </div>
            )}

            <div className="w-full flex flex-col items-center gap-1">
              <p className="text-[10.5px] font-bold text-slate-700 dark:text-slate-200">
                {isAudioPlaying ? 'Đang phát thiền định tĩnh tâm' : 'Nhấp la bàn nghe thiền định 432Hz'}
              </p>
            </div>
          </div>

          {/* Cột phải: Hồ Sơ Nhân Thân & 4 Hướng Cát (Không trùng lặp, rõ ràng) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-3 min-w-0">
            <div className="space-y-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-purple-200/70 dark:border-purple-800/60 shadow-sm backdrop-blur-xl h-full flex flex-col justify-between min-w-0">
              {/* Header profile */}
              <div className="w-full flex items-center justify-between pb-2 border-b border-purple-200/40 dark:border-purple-800/40">
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-black font-play text-purple-600 dark:text-purple-400 tracking-wide">
                    {formatCardTitle("Hồ Sơ Bát Trạch")}
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xs">
                  Nguyễn Hùng Thái
                </span>
              </div>

              {/* 4 Thẻ Thông Số Cốt Lõi (gọn gàng, loại bỏ trùng lặp) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/40 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                      Khởi Sinh (Dương &amp; Âm)
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100 block">
                      {TU_VI_PROFILE.birthDateSolar} · {TU_VI_PROFILE.birthDateLunar}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/40 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                      Giờ Sinh &amp; Can Chi
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100 block">
                      {TU_VI_PROFILE.birthHourLunar} · Tuổi Giáp Tý
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                      Bản Mệnh Nạp Âm
                    </span>
                    <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 block">
                      {TU_VI_PROFILE.elementNapAm} (Vàng dưới biển)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-cyan-50/70 dark:bg-cyan-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/40 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                      Cung Mệnh &amp; Cục Vận
                    </span>
                    <span className="text-xs font-black text-cyan-800 dark:text-cyan-300 block">
                      {TU_VI_PROFILE.menhQuai} · {TU_VI_PROFILE.cucVan}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Hướng Cát Bát Trạch (Ứng dụng phong thủy làm việc) */}
              <div className="pt-2 border-t border-purple-200/40 dark:border-purple-800/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-black text-purple-900 dark:text-purple-300">
                    <Compass className="w-3.5 h-3.5 text-purple-600" />
                    <span>4 Hướng Cát Phong Thủy Làm Việc</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">Tây Tứ Trạch</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {batTrachCat.map((item) => (
                    <div
                      key={item.direction}
                      className={`p-2.5 rounded-xl border text-left shadow-2xs ${item.color}`}
                    >
                      <div className="flex items-center justify-between text-[10.5px] font-black">
                        <span>{item.direction}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-white/40 dark:bg-black/40">
                          {item.star}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium mt-1 leading-snug">
                        {item.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. SLIDE 2: Phong cách quản trị - Trình bày dễ hiểu, ít chữ, tập trung vào điểm mạnh cốt lõi
  const renderSection2Management = () => {
    const managementTraitsConcise = [
      {
        id: 'trait-1',
        title: 'Quyết Đoán & Kỷ',
        tag: 'Bản lĩnh Kim',
        icon: Shield,
        color: 'border-sky-400/40 bg-sky-50/70 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300',
        bar: 'bg-sky-600',
        points: [
          'Chuẩn hóa quy trình vận hành SOP & kiểm soát rủi ro.',
          'Kiên trì giám sát SLA 99% nghiêm ngặt, bám sát mục tiêu.',
        ],
        tags: ['#SOP_Chuẩn_Hóa', '#SLA_99%', '#Kỷ_Luật_Thép'],
      },
      {
        id: 'trait-2',
        title: 'Thấu Cảm & Nhân',
        tag: 'Đồng đội',
        icon: Heart,
        color: 'border-purple-400/40 bg-purple-50/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
        bar: 'bg-purple-600',
        points: [
          'Lắng nghe đa chiều, đặt khách hàng & nhân sự làm trọng tâm.',
          'Xây dựng văn hóa phụng sự, gắn kết đội ngũ 150+ nhân sự.',
        ],
        tags: ['#CSAT_96%', '#Văn_Hóa_Phụng_Sự', '#Gắn_Kết_150+'],
      },
      {
        id: 'trait-3',
        title: 'Tư Duy Data Driven',
        tag: 'Chiến lược',
        icon: BarChart3,
        color: 'border-emerald-400/40 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
        bar: 'bg-emerald-600',
        points: [
          'Ra quyết định điều hành dựa trên số liệu thực tế qua Dashboard BI.',
          'Tối ưu các chỉ số FCR, AHT, NPS và quản trị mục tiêu OKRs.',
        ],
        tags: ['#Realtime_BI', '#FCR_AHT', '#OKRs_Thực_Chiến'],
      },
      {
        id: 'trait-4',
        title: 'Đổi Mới Công Nghệ',
        tag: 'Tiên phong số',
        icon: Cpu,
        color: 'border-amber-400/40 bg-amber-50/70 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300',
        bar: 'bg-amber-600',
        points: [
          'Ứng dụng AI Agent Workflows, Smart IVR và tự động hóa quy trình.',
          'Chuyển đổi Contact Center thành trung tâm trải nghiệm số đa kênh.',
        ],
        tags: ['#AI_Workflows', '#AICC_Cloud', '#Tự_Động_Hóa'],
      },
    ];

    return (
      <div
        id="tuvi-section-2"
        className="w-full h-full bg-white/90 dark:bg-slate-900/90 border border-blue-200/90 dark:border-blue-400/30 rounded-[14px] p-4 sm:p-5 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_22px_-2px_rgba(56,189,248,0.25)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left font-play"
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-blue-200/50 dark:border-blue-800/50 shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-2 font-play">
            <Target className="w-5 h-5 text-blue-600 dark:text-cyan-400 animate-pulse shrink-0" />
            <span>{formatCardTitle("Phong Cách Quản Trị")}</span>
          </h2>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto glass-scrollbar pt-3 pr-0.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch h-full">
            {managementTraitsConcise.map((trait) => {
              const IconComp = trait.icon;
              return (
                <div
                  key={trait.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border ${trait.color} shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_34px_-4px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.8)]  transition-all flex flex-col justify-between space-y-2`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <IconComp className="w-4 h-4 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-black font-play tracking-wide">
                          {formatCardTitle(trait.title)}
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {trait.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1.5">
                    {trait.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-white/80 dark:bg-black/30 border border-slate-200/60 dark:border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // 3. SLIDE 3: Chuyển "Lục cung ngũ hành" thành "Ưu Thế Khi Làm Việc"
  const renderSection3WorkAdvantages = () => {
    const workAdvantages = [
      {
        id: 'adv-1',
        title: 'Bản Lĩnh & Quyết Đoán',
        subtitle: 'Hành Kim · Cung Mệnh',
        icon: Shield,
        desc: 'Trầm tĩnh trước áp lực, kiên định bảo vệ chuẩn mực chất lượng dịch vụ và giữ chữ Tín hàng đầu.',
        impact: 'Xử lý khủng hoảng vận hành vững vàng',
        color: 'border-rose-400/40 bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300',
      },
      {
        id: 'adv-2',
        title: 'Điều Hành & Chuẩn Hóa SOP',
        subtitle: 'Hành Hỏa · Cung Quan Lộc',
        icon: Award,
        desc: 'Năng lực xây dựng bộ máy 150+ nhân sự, chuẩn hóa quy trình SOP và điều hành SLA/KPI xuất sắc.',
        impact: 'Bộ máy vận hành trơn tru, bền bỉ',
        color: 'border-amber-400/40 bg-amber-50/70 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300',
      },
      {
        id: 'adv-3',
        title: 'Tối Ưu Chi Phí & ROI',
        subtitle: 'Hành Thổ · Cung Tài Bạch',
        icon: TrendingUp,
        desc: 'Chuyển hóa Cost Center thành Value Center, cắt giảm 20-25% lãng phí qua tối ưu tự động hóa.',
        impact: 'Gia tăng giá trị kinh doanh dài hạn',
        color: 'border-emerald-400/40 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
      },
      {
        id: 'adv-4',
        title: 'Tâm Thế Phụng Sự Khách Hàng',
        subtitle: 'Hành Mộc · Cung Phúc Đức',
        icon: Heart,
        desc: 'Lấy sự thỏa mãn của khách hàng và uy tín thương hiệu làm kim chỉ nam xuyên suốt mọi hành động.',
        impact: 'Duy trì chỉ số CSAT > 96% bền vững',
        color: 'border-cyan-400/40 bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300',
      },
      {
        id: 'adv-5',
        title: 'Thích Ứng & Mở Rộng Đối Ngoại',
        subtitle: 'Hành Thủy · Cung Thiên Di',
        icon: Globe,
        desc: 'Thích ứng linh hoạt với công nghệ mới, mở rộng kết nối đối tác và chuyển đổi số Contact Center.',
        impact: 'Tiên phong hội nhập hệ sinh thái số',
        color: 'border-indigo-400/40 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300',
      },
      {
        id: 'adv-6',
        title: 'Thu Phục Nhân Tâm & Trao Quyền',
        subtitle: 'Hành Thủy · Cung Nô Bộc',
        icon: Users,
        desc: 'Tôn trọng và truyền cảm hứng cho từng cá nhân, xây dựng lộ trình thăng tiến rõ ràng cho cấp dưới.',
        impact: 'Tỷ lệ gắn kết nhân sự đạt > 95%',
        color: 'border-purple-400/40 bg-purple-50/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
      },
    ];

    return (
      <div
        id="tuvi-section-3"
        className="w-full h-full bg-white/90 dark:bg-slate-900/90 border border-emerald-200/90 dark:border-emerald-400/30 rounded-[14px] p-4 sm:p-5 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_22px_-2px_rgba(16,185,129,0.25)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left font-play"
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-emerald-200/50 dark:border-emerald-800/50 shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-play">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse shrink-0" />
            <span>{formatCardTitle("Ưu Thế Làm Việc")}</span>
          </h2>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto glass-scrollbar pt-3 pr-0.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
            {workAdvantages.map((adv) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={adv.id}
                  className={`p-3.5 rounded-2xl border ${adv.color} shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-2`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <IconComp className="w-4 h-4 shrink-0" />
                        <h4 className="text-xs sm:text-[13px] font-black font-play truncate">
                          {formatCardTitle(adv.title)}
                        </h4>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold opacity-80 block font-mono">
                      {adv.subtitle}
                    </span>
                    <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-200">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{adv.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // 4. SLIDE 4: Triết lý lãnh đạo - Bố cục lại thanh lịch, gọn gàng trong thẻ chính
  const renderSection4Philosophy = () => (
    <div
      id="tuvi-section-4"
      className="w-full h-full bg-white/90 dark:bg-slate-900/90 border border-amber-200/90 dark:border-amber-400/30 rounded-[14px] p-4 sm:p-5 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_22px_-2px_rgba(245,158,11,0.25)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left font-play"
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-amber-200/50 dark:border-amber-800/50 shrink-0">
        <h2 className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 font-play">
          <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-pulse shrink-0" />
          <span>{formatCardTitle("Triết Lý Lãnh Đạo")}</span>
        </h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto glass-scrollbar pt-3 pr-0.5 space-y-3">
        {/* Banner Châm Ngôn Dẫn Mệnh tái cấu trúc sang trọng */}
        <div className="relative overflow-hidden rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white border border-amber-400/40 shadow-md">
          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-mono font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Châm Ngôn Điều Hành</span>
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-slate-100 leading-relaxed">
              “Lãnh đạo bằng bản lĩnh Kim kiên định – Đồng hành cùng nhân sự bằng tấm lòng thấu cảm – Vận hành chuẩn hóa SOP và làm chủ công nghệ AI kiến tạo giá trị phụng sự bền vững.”
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[9.5px] font-mono">
              <span className="text-amber-300 font-bold">Nguyễn Hùng Thái · Giáp Tý 1984</span>
              <span className="text-slate-400">Hải Trung Kim · Đoài Kim Tây Tứ Mệnh</span>
            </div>
          </div>
        </div>

        {/* 6 Thẻ Triết Lý Hành Động */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full items-stretch">
          {ACTION_PHILOSOPHY_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="rounded-xl p-3 bg-white dark:bg-slate-900/90 border border-amber-200/90 dark:border-amber-500/25 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between text-left gap-2"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <h4 className="text-xs font-black font-play text-amber-600 dark:text-amber-400 leading-snug">
                      {formatCardTitle(card.title)}
                    </h4>
                  </div>
                  <span className="text-[9.5px] font-mono font-black px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="tuvi"
      className="relative w-full h-full flex-1 flex flex-col justify-between items-stretch font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-hidden max-w-7xl mx-auto gap-3"
    >
      {/* 2. CHẾ ĐỘ 2 CỘT CÂN BẰNG CHIỀU CAO (NẰM GỌN TRONG THẺ CHÍNH) */}
      <div
        id="info-card-tuvi"
        className="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-3.5 sm:gap-4 items-stretch relative z-10"
      >
        {/* CỘT TRÁI (78%): CHỨA SLIDE NỘI DUNG VỚI CHIỀU CAO ĐỒNG NHẤT */}
        <div className="w-full lg:flex-1 flex flex-col min-w-0 relative h-full">
          {/* Nút Prev nổi bên trái */}
          <button
            type="button"
            onClick={handlePrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-md backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer z-40 group"
            title="Slide trước (Phím ←)"
            aria-label="Slide trước"
          >
            <svg
              className="w-4 h-4 stroke-[2.8] text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Nút Next nổi bên phải */}
          <button
            type="button"
            onClick={handleNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-md backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer z-40 group"
            title="Slide kế tiếp (Phím →)"
            aria-label="Slide kế tiếp"
          >
            <svg
              className="w-4 h-4 stroke-[2.8] text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Nội dung Slide chuyển đổi theo state */}
          <div className="w-full h-full flex-1 min-h-0 flex flex-col">
            {currentSlide === 0 && renderSection1BatTrach()}
            {currentSlide === 1 && renderSection2Management()}
            {currentSlide === 2 && renderSection3WorkAdvantages()}
            {currentSlide === 3 && renderSection4Philosophy()}
          </div>
        </div>

        {/* CỘT PHẢI: CÔNG CỤ HỢP VIỆC - CHIỀU CAO BẰNG CỘT TRÁI & NẰM GỌN TRONG THẺ CHÍNH */}
        <div className="w-full lg:w-[280px] xl:w-[310px] shrink-0 flex flex-col min-w-0 h-full">
          <div
            id="tuvi-tool-zodiac"
            className="w-full h-full bg-white/90 dark:bg-slate-900/90 border border-teal-200/90 dark:border-teal-500/30 rounded-2xl p-3 sm:p-3.5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left font-play"
          >
            {/* Header: Đổi tên thành "Công Cụ Hợp Việc" theo yêu cầu */}
            <div className="flex items-center justify-between pb-2 border-b border-teal-200/50 dark:border-teal-800/50 shrink-0">
              <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                <Users className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <h3 className="text-xs sm:text-sm font-black font-play text-teal-600 dark:text-teal-400">
                  Công Cụ Hợp Việc
                </h3>
              </div>
              {hasSearched && currentZodiac && (
                <button
                  type="button"
                  onClick={() => {
                    setHasSearched(false);
                    setSelectedZodiacId(null);
                  }}
                  className="px-2 py-0.5 rounded-md text-[9px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition flex items-center gap-1 cursor-pointer"
                  title="Quay lại danh sách 12 con giáp"
                >
                  <span>12 Con giáp</span>
                </button>
              )}
            </div>

            {/* Ô tìm kiếm năm sinh và bộ lọc (luôn hiển thị trên đầu) */}
            <div className="pt-2 shrink-0 pb-1.5 space-y-1">
              <div className="flex items-center gap-1.5 w-full">
                <div className="relative flex-1">
                  <input
                    type="number"
                    placeholder="Nhập năm sinh (vd: 1992)..."
                    value={searchYearInput}
                    onChange={(e) => setSearchYearInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleYearSearch()}
                    className="w-full pl-3 pr-7 py-1 rounded-lg text-[10.5px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const order = ['all', 'best', 'support', 'caution'];
                      const nextIdx = (order.indexOf(zodiacFilterTier) + 1) % order.length;
                      const nextTier = order[nextIdx];
                      setZodiacFilterTier(nextTier);
                      showToast(
                        `Đã lọc: ${
                          nextTier === 'all'
                            ? 'Tất cả 12 Giáp'
                            : nextTier === 'best'
                            ? 'Tam / Lục Hợp'
                            : nextTier === 'support'
                            ? 'Tương Trợ'
                            : 'Tránh Xung'
                        }`
                      );
                    }}
                    title={`Lọc: ${zodiacFilterTier} (Click để đổi)`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-600 dark:text-teal-400 hover:text-teal-700 cursor-pointer"
                  >
                    <WebIcon name="filter" className="w-3 h-3" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleYearSearch}
                  className="px-2.5 py-1 rounded-lg text-[10.5px] font-black bg-teal-600 hover:bg-teal-700 text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                >
                  Tra
                </button>
              </div>
            </div>

            {/* VÙNG CUỘN NỘI DUNG 12 CON GIÁP HOẶC CHI TIẾT TƯƠNG HỢP */}
            <div className="flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-0.5 pt-1">
              {!hasSearched || !currentZodiac ? (
                <div className="w-full space-y-1">
                  <div className="grid grid-cols-1 gap-1">
                    {filteredZodiacList.map((item) => {
                      const theme = getZodiacTheme(item.tier);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedZodiacId(item.id);
                            setHasSearched(true);
                          }}
                          className={`p-1.5 px-2 rounded-lg flex items-center justify-between text-left transition-all duration-200 cursor-pointer border ${theme.bgUnselected} hover:brightness-105 hover:border-teal-400/50 hover:shadow-xs active:scale-[0.99]`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base leading-none shrink-0">
                              {item.icon}
                            </span>
                            <span className="text-[10.5px] font-bold text-slate-900 dark:text-white truncate">
                              Tuổi {item.nameVi} ({item.animalVi})
                            </span>
                          </div>
                          <span
                            className={`text-[8.5px] font-mono font-black px-1.5 py-0.2 rounded-xs shrink-0 ${theme.badge}`}
                          >
                            {item.score.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                (() => {
                  const activeTheme = getZodiacTheme(currentZodiac.tier);
                  return (
                    <div className="w-full flex flex-col space-y-2 animate-fadeIn">
                      {/* Nút quay lại danh sách */}
                      <button
                        type="button"
                        onClick={() => {
                          setHasSearched(false);
                          setSelectedZodiacId(null);
                        }}
                        className="w-full py-1.5 px-2 rounded-lg border border-teal-300/80 dark:border-teal-700/80 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 text-teal-800 dark:text-teal-200 text-[10px] font-bold flex items-center justify-between transition cursor-pointer shrink-0"
                      >
                        <span>← Danh sách 12 con giáp</span>
                        <span className="text-[8.5px] opacity-80">Đổi tuổi</span>
                      </button>

                      {/* Khối chi tiết con giáp */}
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${activeTheme.gradientBox} border space-y-2 text-xs shrink-0`}
                      >
                        <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-200/50 dark:border-slate-800/60">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-lg shrink-0">{currentZodiac.icon}</span>
                            <div className="min-w-0">
                              <h4 className="text-[11px] font-black text-slate-900 dark:text-white truncate">
                                Tuổi {currentZodiac.nameVi} ({currentZodiac.animalVi})
                              </h4>
                              <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 block truncate">
                                {currentZodiac.relationshipVi}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[8.5px] font-black shrink-0 ${activeTheme.badge}`}
                          >
                            {currentZodiac.score}
                          </span>
                        </div>

                        <div className="space-y-1 text-[9.5px]">
                          <div className="p-1.5 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50">
                            <span className="font-bold text-slate-700 dark:text-slate-300 block">
                              📅 Năm sinh:
                            </span>
                            <span className="text-slate-900 dark:text-white font-medium">
                              {currentZodiac.years}
                            </span>
                          </div>
                          <div className="p-1.5 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50">
                            <span className="font-bold text-slate-700 dark:text-slate-300 block">
                              🏢 Môi trường hợp tác:
                            </span>
                            <span className="text-slate-900 dark:text-white font-medium">
                              {currentZodiac.workplaceFitVi}
                            </span>
                          </div>
                          <div className="p-1.5 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50">
                            <span className="font-bold text-slate-700 dark:text-slate-300 block">
                              🧭 Hướng bàn phong thủy:
                            </span>
                            <span className="text-slate-900 dark:text-white font-medium">
                              {currentZodiac.deskDirectionVi}
                            </span>
                          </div>
                          <div className={`p-1.5 rounded-md ${activeTheme.accentBg} border`}>
                            <span className={`font-bold ${activeTheme.textColor} block mb-0.5`}>
                              💡 Lời khuyên làm việc:
                            </span>
                            <p className="text-slate-800 dark:text-slate-200 leading-snug">
                              {currentZodiac.workplaceAdviceVi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
