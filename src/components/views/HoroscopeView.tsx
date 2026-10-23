'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  TU_VI_PROFILE,
  WORK_PERSONALITY_TRAITS,
  SIX_CORE_PALACES,
  FIVE_ELEMENTS_GOVERNANCE,
  ZODIAC_SYNERGY_LIST,
  ACTION_PHILOSOPHY_CARDS,
} from '@/data/tuviData';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { useToast } from '@/components/ui/Toast';

export const HoroscopeView: React.FC = () => {
  const { showToast } = useToast();

  // View Mode: 'grid' (Responsive Grid Card View - Default) | 'slide' (Slide Deck View)
  const [viewMode, setViewMode] = useState<'grid' | 'slide'>('grid');

  // Active Slide State: 0 (Slide 1), 1 (Slide 2), 2 (Slide 3), 3 (Slide 4)
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

  // Keyboard navigation for slides when in slide mode
  useEffect(() => {
    if (viewMode !== 'slide') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNextSlide, handlePrevSlide]);

  // Audio Playback State for Yin-Yang Circle
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Zodiac Synergy Tab / Interactive Lookup State
  const [selectedZodiacId, setSelectedZodiacId] = useState<string>('than');
  const [searchYearInput, setSearchYearInput] = useState<string>('');
  const [zodiacFilterTier, setZodiacFilterTier] = useState<string>('all');
  const [hasSearched, setHasSearched] = useState<boolean>(true);

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
      showToast('Đang phát âm thanh thiền định tĩnh tâm');
    }
  }, [isAudioPlaying, showToast]);

  // Memoize active zodiac data
  const currentZodiac = useMemo(() => {
    return (
      ZODIAC_SYNERGY_LIST.find((z) => z.id === selectedZodiacId) ||
      ZODIAC_SYNERGY_LIST[0]
    );
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
      meaning: 'Thu hút tài lộc, danh tiếng & thăng tiến',
      tag: 'Cát Tinh bậc 1',
      color:
        'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
    },
    {
      direction: 'Tây Nam',
      star: 'Diên Niên',
      meaning: 'Củng cố các mối quan hệ & đồng đội gắn kết',
      tag: 'Cát Tinh bậc 2',
      color: 'border-teal-500/40 bg-teal-500/10 text-teal-800 dark:text-teal-300',
    },
    {
      direction: 'Đông Bắc',
      star: 'Thiên Y',
      meaning: 'Cải thiện sức khỏe, trường thọ & bình an',
      tag: 'Cát Tinh bậc 3',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-800 dark:text-cyan-300',
    },
    {
      direction: 'Chính Tây',
      star: 'Phục Vị',
      meaning: 'Củng cố sức mạnh tinh thần, may mắn thi cử',
      tag: 'Cát Tinh bậc 4',
      color:
        'border-indigo-500/40 bg-indigo-500/10 text-indigo-800 dark:text-indigo-300',
    },
  ];

  // Shared Renderer for Section 1: Tử vi bát trạch
  const renderSection1BatTrach = () => (
    <div
      id="tuvi-section-1"
      className="w-full h-full bg-gradient-to-br from-white/95 via-purple-50/25 to-amber-50/30 dark:from-slate-900/95 dark:via-purple-950/20 dark:to-slate-900/95 border border-purple-200/80 dark:border-purple-800/60 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-[0_8px_32px_0_rgba(147,51,234,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden group"
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-purple-200/50 dark:border-purple-800/40 flex-wrap gap-2.5 shrink-0">
        <h2 className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-300 flex items-center gap-2 font-play">
          <WebIcon
            name="compass"
            className="w-4.5 h-4.5 text-purple-600 dark:text-purple-300 animate-pulse shrink-0 inline-block"
          />
          <span>Tử vi bát trạch</span>
        </h2>
        <span className="text-[10.5px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-300/40">
          Giáp Tý 1984 · Tây Tứ Mệnh
        </span>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto glass-scrollbar pt-3 pr-0.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
          {/* Cột trái: La Bàn Âm Dương */}
          <div className="lg:col-span-4 bg-gradient-to-br from-purple-500/15 via-white/80 dark:via-slate-800/80 to-amber-500/15 border border-purple-300/60 dark:border-purple-700/50 rounded-2xl p-3.5 sm:p-4 flex flex-col items-center justify-between text-center space-y-3 shadow-sm backdrop-blur-xl relative overflow-hidden min-w-0">
            <div className="flex items-center justify-between pb-2 border-b border-purple-200/50 dark:border-purple-800/40 w-full text-left flex-wrap gap-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-3.5 bg-gradient-to-b from-purple-600 to-amber-500 rounded-full shrink-0" />
                <WebIcon
                  name="sparkles"
                  className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0"
                />
                <h4 className="text-xs sm:text-sm font-black text-purple-800 dark:text-purple-300 tracking-wide truncate">
                  La Bàn Âm Dương
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCompassMode(compassMode === 'yinyang' ? 'battrach' : 'yinyang')
                }
                className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-xs cursor-pointer transition-all shrink-0"
                title="Chuyển chế độ xem Âm Dương / Bát Trạch"
              >
                {compassMode === 'yinyang' ? 'Xem Bát Trạch' : 'Xem Âm Dương'}
              </button>
            </div>

            {compassMode === 'yinyang' ? (
              <div className="relative my-1">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isAudioPlaying
                      ? 'Tắt âm thanh tĩnh tâm'
                      : 'Phát âm thanh thiền định'
                  }
                  onClick={toggleAudio}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAudio();
                    }
                  }}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 shadow-md flex items-center justify-center cursor-pointer transition-all duration-500 group relative ${
                    isAudioPlaying
                      ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 ring-3 ring-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.65)]'
                      : 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-2 ring-amber-300/40 hover:brightness-105'
                  }`}
                  title={
                    isAudioPlaying
                      ? 'Tắt âm thanh tĩnh tâm'
                      : 'Phát âm thanh thiền định'
                  }
                >
                  <div className="w-full h-full rounded-full bg-slate-950 border-2 border-amber-300 flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center">
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
                    </div>

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

                    <span className="absolute top-1 text-[9px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">
                      N
                    </span>
                    <span className="absolute bottom-1 text-[9px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">
                      S
                    </span>
                    <span className="absolute left-1.5 text-[9px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">
                      W
                    </span>
                    <span className="absolute right-1.5 text-[9px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">
                      E
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative my-1 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-indigo-400/50 bg-indigo-950/80 p-1.5 flex items-center justify-center text-white shadow-inner">
                <div className="w-full h-full rounded-full border border-indigo-300/30 flex flex-col items-center justify-center relative text-center">
                  <div className="text-[10px] font-black text-amber-300">TÂY TỨ MỆNH</div>
                  <div className="text-sm sm:text-base font-black text-cyan-300 my-0.5 font-play">
                    Đoài Kim
                  </div>
                  <div className="text-[8px] text-slate-300">Kim Tứ Cục · Cung Tý</div>
                  <span className="absolute top-0.5 text-[8px] font-black text-emerald-300 bg-emerald-950/70 px-1 rounded">
                    TB Sinh Khí
                  </span>
                  <span className="absolute bottom-0.5 text-[8px] font-black text-teal-300 bg-teal-950/70 px-1 rounded">
                    TN Diên Niên
                  </span>
                  <span className="absolute left-0.5 text-[8px] font-black text-cyan-300 bg-cyan-950/70 px-1 rounded">
                    ĐB Thiên Y
                  </span>
                  <span className="absolute right-0.5 text-[8px] font-black text-indigo-300 bg-indigo-950/70 px-1 rounded">
                    T Phục Vị
                  </span>
                </div>
              </div>
            )}

            <div className="w-full flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1.5 h-3">
                {[40, 70, 100, 60, 90, 50, 80, 40].map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isAudioPlaying
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    style={{ height: isAudioPlaying ? `${height}%` : '30%' }}
                  />
                ))}
              </div>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                {isAudioPlaying
                  ? 'Đang phát âm thanh thiền định tĩnh tâm'
                  : 'Nhấp la bàn để nghe thiền định 432Hz'}
              </p>
            </div>
          </div>

          {/* Cột phải: Thẻ chi tiết thông số nhân thân */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-3 min-w-0">
            <div className="space-y-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-purple-200/70 dark:border-purple-800/60 shadow-sm backdrop-blur-xl h-full flex flex-col justify-between min-w-0">
              <div className="w-full flex flex-col gap-1.5 pb-2 border-b border-purple-200/40 dark:border-purple-800/40">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <WebIcon
                      name="user"
                      className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0"
                    />
                    <h4 className="text-xs sm:text-sm font-black text-purple-800 dark:text-purple-300 tracking-wide">
                      Hồ Sơ Nhân Thân
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shrink-0 shadow-2xs">
                    Hải Trung Kim • Đoài Kim
                  </span>
                </div>
              </div>

              {/* 6 Thẻ thông số: Responsive Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                <div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/40 flex items-start gap-2 transition-all hover:border-indigo-400 shadow-2xs text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <WebIcon name="calendar" className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                      Dương Lịch Khởi Sinh
                    </div>
                    <div className="text-[11px] font-black text-slate-900 dark:text-slate-100 break-words">
                      {TU_VI_PROFILE.birthDateSolar}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/40 flex items-start gap-2 transition-all hover:border-purple-400 shadow-2xs text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <WebIcon name="moon" className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 truncate">
                      Âm Lịch Giáp Tý
                    </div>
                    <div className="text-[11px] font-black text-slate-900 dark:text-slate-100 break-words">
                      {TU_VI_PROFILE.birthDateLunar}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/40 flex items-start gap-2 transition-all hover:border-amber-400 shadow-2xs text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <WebIcon name="clock" className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 truncate">
                      Giờ Sinh Can Chi
                    </div>
                    <div className="text-[11px] font-black text-slate-900 dark:text-slate-100 break-words">
                      {TU_VI_PROFILE.birthHourLunar}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 flex items-start gap-2 transition-all hover:border-emerald-400 shadow-2xs text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <WebIcon name="shield" className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 truncate">
                      Bản Mệnh Nạp Âm
                    </div>
                    <div className="text-[11px] font-black text-emerald-800 dark:text-emerald-300 break-words">
                      {TU_VI_PROFILE.elementNapAm}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-cyan-50/70 dark:bg-cyan-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/40 flex items-start gap-2 transition-all hover:border-cyan-400 shadow-2xs text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <WebIcon name="compass" className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 truncate">
                      Cung Mệnh Đoài Kim
                    </div>
                    <div className="text-[11px] font-black text-cyan-800 dark:text-cyan-300 break-words">
                      {TU_VI_PROFILE.menhQuai}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200/50 dark:border-rose-800/40 flex items-start gap-2 transition-all hover:border-rose-400 shadow-2xs text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <WebIcon name="hash" className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 truncate">
                      Kim Tứ Cục Vận
                    </div>
                    <div className="text-[11px] font-black text-rose-700 dark:text-rose-300 break-words">
                      {TU_VI_PROFILE.cucVan}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bát Trạch: Responsive 4-Card Grid */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700 dark:text-slate-300">
                    <WebIcon
                      name="compass"
                      className="w-3 h-3 text-indigo-600 dark:text-indigo-400"
                    />
                    <span>Hướng Cát Bát Trạch</span>
                  </div>
                  <span className="text-[9.5px] font-bold text-slate-500">
                    Tây Tứ Trạch
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {batTrachCat.map((item) => (
                    <div
                      key={item.direction}
                      className={`p-2.5 rounded-xl border text-left shadow-2xs min-w-0 ${item.color}`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black gap-1">
                        <span>{item.direction}</span>
                        <span className="opacity-90">{item.star}</span>
                      </div>
                      <p className="text-[10.5px] font-semibold mt-1 leading-snug break-words">
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

  // Shared Renderer for Section 2: Phong cách quản trị
  const renderSection2Management = () => (
    <div
      id="tuvi-section-2"
      className="w-full h-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-blue-400/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-blue-200/50 dark:border-blue-800/50 shrink-0 flex-wrap gap-2">
        <h2 className="text-base sm:text-lg font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-2 font-play">
          <WebIcon
            name="briefcase"
            className="w-[25px] h-[25px] text-blue-600 dark:text-cyan-400 animate-pulse shrink-0 inline-block card-title-icon"
          />
          <span>Phong cách quản trị</span>
        </h2>
        <span className="text-[10.5px] font-mono font-bold text-blue-600 dark:text-cyan-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-300/40">
          4 Trụ Cột Điều Hành
        </span>
      </div>

      <div className="flex-1 overflow-y-auto glass-scrollbar pt-3 pr-0.5">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            viewMode === 'grid' ? 'xl:grid-cols-4' : 'md:grid-cols-2'
          } gap-3.5 text-left items-stretch`}
        >
          {WORK_PERSONALITY_TRAITS.map((trait, index) => {
            const colorPalette = [
              {
                bar: 'bg-sky-600',
                text: 'text-sky-700 dark:text-sky-300',
                bg: 'bg-sky-500/10',
                badgeText: 'text-sky-800 dark:text-sky-300',
                border: 'border-sky-500/25 dark:border-sky-500/35',
                glow: 'hover:border-sky-400 dark:hover:border-sky-400/70',
              },
              {
                bar: 'bg-violet-600',
                text: 'text-violet-700 dark:text-violet-300',
                bg: 'bg-violet-500/10',
                badgeText: 'text-violet-800 dark:text-violet-300',
                border: 'border-violet-500/25 dark:border-violet-500/35',
                glow: 'hover:border-violet-400 dark:hover:border-violet-400/70',
              },
              {
                bar: 'bg-emerald-600',
                text: 'text-emerald-700 dark:text-emerald-300',
                bg: 'bg-emerald-500/10',
                badgeText: 'text-emerald-800 dark:text-emerald-300',
                border: 'border-emerald-500/25 dark:border-emerald-500/35',
                glow: 'hover:border-emerald-400 dark:hover:border-emerald-400/70',
              },
              {
                bar: 'bg-amber-600',
                text: 'text-amber-700 dark:text-amber-300',
                bg: 'bg-amber-500/10',
                badgeText: 'text-amber-800 dark:text-amber-300',
                border: 'border-amber-500/25 dark:border-amber-500/35',
                glow: 'hover:border-amber-400 dark:hover:border-amber-400/70',
              },
            ][index % 4];

            return (
              <div
                key={trait.id}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/75 border ${colorPalette.border} ${colorPalette.glow} shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-2.5 backdrop-blur-md h-full min-w-0`}
              >
                <div className="space-y-2 min-w-0">
                  <div
                    className={`w-full flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b ${colorPalette.border}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`w-1.5 h-4 ${colorPalette.bar} rounded-full shrink-0`}
                      />
                      <WebIcon
                        name="sparkles"
                        className={`w-3.5 h-3.5 ${colorPalette.text} shrink-0`}
                      />
                      <h4
                        className={`text-xs sm:text-sm font-black ${colorPalette.text} tracking-wide truncate`}
                      >
                        {trait.title}
                      </h4>
                    </div>
                    <span
                      className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${colorPalette.bg} ${colorPalette.badgeText} border ${colorPalette.border} shrink-0`}
                    >
                      {trait.tag}
                    </span>
                  </div>

                  <p className="text-[11.5px] sm:text-xs text-slate-700 dark:text-slate-200 text-justify pt-0.5 leading-relaxed break-words">
                    {trait.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-1.5">
                  {trait.highlights.map((h, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${colorPalette.bg} ${colorPalette.text} border ${colorPalette.border} shadow-2xs`}
                    >
                      #{h}
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

  // Shared Renderer for Section 3: Lục cung ngũ hành
  const renderSection3Palaces = () => (
    <div
      id="tuvi-section-3"
      className="w-full h-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-emerald-400/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left"
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-emerald-200/50 dark:border-emerald-800/50 shrink-0 flex-wrap gap-2">
        <h2 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-play">
          <WebIcon
            name="target"
            className="w-[25px] h-[25px] text-emerald-600 dark:text-emerald-400 animate-pulse shrink-0 inline-block card-title-icon"
          />
          <span>Lục cung ngũ hành</span>
        </h2>
        <span className="text-[10.5px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-300/40">
          6 Cung Trọng Yếu · 5 Hành Tố
        </span>
      </div>

      <div className="flex-1 overflow-y-auto glass-scrollbar pt-3 pr-0.5 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
          {SIX_CORE_PALACES.map((palace, index) => {
            const palette = [
              {
                bar: 'bg-rose-600',
                text: 'text-rose-700 dark:text-rose-300',
                bg: 'bg-rose-500/10',
                badgeText: 'text-rose-800 dark:text-rose-300',
                border: 'border-rose-500/25 dark:border-rose-500/35',
              },
              {
                bar: 'bg-amber-600',
                text: 'text-amber-700 dark:text-amber-300',
                bg: 'bg-amber-500/10',
                badgeText: 'text-amber-800 dark:text-amber-300',
                border: 'border-amber-500/25 dark:border-amber-500/35',
              },
              {
                bar: 'bg-emerald-600',
                text: 'text-emerald-700 dark:text-emerald-300',
                bg: 'bg-emerald-500/10',
                badgeText: 'text-emerald-800 dark:text-emerald-300',
                border: 'border-emerald-500/25 dark:border-emerald-500/35',
              },
              {
                bar: 'bg-cyan-600',
                text: 'text-cyan-700 dark:text-cyan-300',
                bg: 'bg-cyan-500/10',
                badgeText: 'text-cyan-800 dark:text-cyan-300',
                border: 'border-cyan-500/25 dark:border-cyan-500/35',
              },
              {
                bar: 'bg-indigo-600',
                text: 'text-indigo-700 dark:text-indigo-300',
                bg: 'bg-indigo-500/10',
                badgeText: 'text-indigo-800 dark:text-indigo-300',
                border: 'border-indigo-500/25 dark:border-indigo-500/35',
              },
              {
                bar: 'bg-purple-600',
                text: 'text-purple-700 dark:text-purple-300',
                bg: 'bg-purple-500/10',
                badgeText: 'text-purple-800 dark:text-purple-300',
                border: 'border-purple-500/25 dark:border-purple-500/35',
              },
            ][index % 6];

            return (
              <div
                key={palace.id}
                className={`p-3.5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/80 border ${palette.border} shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-2.5 backdrop-blur-md h-full min-w-0`}
              >
                <div className="space-y-1.5 min-w-0">
                  <div
                    className={`flex items-center justify-between gap-2 pb-1.5 border-b ${palette.border}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`w-1.5 h-4 ${palette.bar} rounded-full shrink-0`}
                      />
                      <h5
                        className={`text-xs sm:text-[13px] font-black ${palette.text} tracking-wide truncate`}
                      >
                        {palace.name}
                      </h5>
                    </div>
                    <span
                      className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${palette.bg} ${palette.badgeText} border ${palette.border} shrink-0`}
                    >
                      {palace.tag}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 text-justify leading-relaxed break-words">
                    {palace.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div className="flex flex-wrap gap-1">
                    {palace.stars.map((star, i) => (
                      <span
                        key={i}
                        className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md ${
                          star.main
                            ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                            : 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20'
                        }`}
                      >
                        ★ {star.name}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-0.5 pt-0.5">
                    {palace.checkpoints.map((cp, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-300 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="break-words">{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5 Hành tố vận hành */}
        <div className="space-y-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 items-stretch">
            {FIVE_ELEMENTS_GOVERNANCE.map((el) => (
              <div
                key={el.element}
                className={`p-3 rounded-xl ${el.bgColor} border ${el.borderColor} flex flex-col justify-between space-y-1.5 text-left shadow-2xs h-full min-w-0`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-black/5 dark:border-white/5">
                    <h5 className={`text-[11px] font-black truncate ${el.titleColor}`}>
                      {el.element}
                    </h5>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${el.iconBg}`}
                    >
                      Hành Tố
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                    {el.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Shared Renderer for Section 4: Triết lý lãnh đạo
  const renderSection4Philosophy = () => (
    <div
      id="tuvi-section-5"
      className="w-full h-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-amber-400/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left"
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-amber-200/50 dark:border-amber-800/50 shrink-0 flex-wrap gap-2">
        <h2 className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 font-play">
          <WebIcon
            name="award"
            className="w-[25px] h-[25px] text-amber-600 dark:text-amber-400 animate-pulse shrink-0 inline-block card-title-icon"
          />
          <span>Triết lý lãnh đạo</span>
        </h2>
        <span className="text-[10.5px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-300/40">
          6 Giá Trị Cốt Lõi
        </span>
      </div>

      <div className="flex-1 overflow-y-auto glass-scrollbar pt-3 pr-0.5 space-y-3.5">
        <div
          id="tuvi-philosophy-cards"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full items-stretch"
        >
          {ACTION_PHILOSOPHY_CARDS.map((card, idx) => {
            const iconName =
              card.iconType === 'target'
                ? 'target'
                : card.iconType === 'trending'
                ? 'trend-up'
                : card.iconType === 'heart'
                ? 'heart'
                : card.iconType === 'compass'
                ? 'compass'
                : card.iconType === 'bookmark'
                ? 'bookmark'
                : card.iconType === 'zap'
                ? 'zap'
                : 'award';

            return (
              <div
                key={card.id}
                className="rounded-xl sm:rounded-2xl p-3.5 bg-white dark:bg-slate-900/90 border border-amber-200/90 dark:border-amber-500/25 shadow-2xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-400/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left gap-2.5 group h-full min-w-0"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
                      <WebIcon name={iconName} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[9.5px] font-mono font-black px-1.5 py-0.5 rounded-full bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 shrink-0">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-[13px] font-bold text-amber-950 dark:text-amber-200 tracking-tight leading-snug pt-0.5">
                    {card.title}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal break-words">
                    {card.description}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-amber-100 dark:border-amber-900/40 flex items-center gap-1.5 text-[9.5px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  <WebIcon name="sparkles" className="w-2.5 h-2.5 shrink-0" />
                  <span>Giá trị cốt lõi</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hero Quote Card */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-[#1c1842] dark:bg-[#120e33] text-white border border-indigo-900/60 shadow-md backdrop-blur-xl text-left">
          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-amber-300">
                <WebIcon name="sparkles" className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                  Châm Ngôn Dẫn Mệnh
                </span>
              </div>
            </div>

            <p className="font-serif italic text-xs sm:text-sm lg:text-base text-slate-100 dark:text-slate-100 leading-relaxed max-w-4xl">
              “Lãnh đạo bằng bản lĩnh Kim kiên định – Đồng hành cùng nhân sự bằng tấm lòng thấu cảm – Vận hành chuẩn hóa SOP và làm chủ công nghệ AI kiến tạo giá trị phụng sự bền vững.”
            </p>

            <div className="flex items-center justify-between pt-1.5 border-t border-indigo-800/50 flex-wrap gap-2 text-[10.5px]">
              <span className="font-mono font-bold text-cyan-300">
                Nguyễn Hùng Thái · Giáp Tý 1984
              </span>
              <span className="font-mono font-semibold text-slate-400">
                Hải Trung Kim · Đoài Kim Tây Tứ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Responsive Grid Card Section for 12 Zodiac Synergy ("Tra Hợp Công Việc")
  const renderZodiacResponsiveGridCards = () => (
    <div
      id="tuvi-zodiac-grid-section"
      className="w-full bg-white/90 dark:bg-slate-900/90 border border-teal-200/90 dark:border-teal-500/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col gap-4 text-left"
    >
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-teal-200/50 dark:border-teal-800/50">
        <div className="flex items-center gap-2">
          <WebIcon
            name="users"
            className="w-[25px] h-[25px] text-teal-600 dark:text-teal-400 animate-pulse shrink-0 card-title-icon"
          />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-teal-700 dark:text-teal-300 font-play">
              Tra hợp công việc 12 con giáp
            </h2>
          </div>
        </div>

        {/* Search Year & Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <WebIcon
                name="search"
                className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="number"
                placeholder="Nhập năm sinh (1920-2040)..."
                value={searchYearInput}
                onChange={(e) => setSearchYearInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleYearSearch()}
                className="w-44 sm:w-52 pl-8 pr-3 py-1.5 rounded-full text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              />
            </div>
            <button
              type="button"
              onClick={handleYearSearch}
              className="px-3.5 py-1.5 rounded-full text-xs font-black bg-teal-600 hover:bg-teal-700 text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              Tra Năm
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'Tất cả (12)' },
              { id: 'best', label: 'Tam / Lục Hợp' },
              { id: 'support', label: 'Tương Trợ' },
              { id: 'caution', label: 'Tránh Xung' },
            ].map((tab) => {
              const active = zodiacFilterTier === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setZodiacFilterTier(tab.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${
                    active
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-500 shadow-xs'
                      : 'bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive Grid Card View of 12 Zodiac Animals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-stretch">
        {filteredZodiacList.map((item) => {
          const isSelected = selectedZodiacId === item.id;
          const theme = getZodiacTheme(item.tier);

          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedZodiacId(item.id);
                setHasSearched(true);
              }}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2.5 h-full min-w-0 hover:-translate-y-0.5 ${
                isSelected ? theme.bgSelected : `${theme.bgUnselected} hover:shadow-md`
              }`}
            >
              {/* Card Header */}
              <div className="space-y-2 min-w-0">
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-2xl leading-none shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate font-play">
                        Tuổi {item.nameVi} ({item.animalVi})
                      </h4>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 block truncate">
                        {item.relationshipVi}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-black shrink-0 ${theme.badge}`}
                  >
                    {item.score}
                  </span>
                </div>

                {/* Metadata Grid */}
                <div className="space-y-1.5 text-[10.5px]">
                  <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      📅 Năm sinh:{' '}
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold break-words">
                      {item.years}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      🏢 Môi trường:{' '}
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold break-words">
                      {item.workplaceFitVi}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      🧭 Hướng bàn:{' '}
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold break-words">
                      {item.deskDirectionVi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Advice Footer */}
              <div className={`p-2 rounded-xl ${theme.accentBg} border text-[10.5px]`}>
                <span className={`font-bold ${theme.textColor} block mb-0.5`}>
                  💡 Lời khuyên phối hợp:
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-snug break-words">
                  {item.workplaceAdviceVi}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="tuvi"
      className="relative w-full h-auto flex flex-col justify-start items-stretch font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent pb-8"
    >
      {/* Main Container */}
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start select-none">
        {/* HERO BANNER VỚI NÚT CHUYỂN CHẾ ĐỘ LƯỚI THẺ (RESPONSIVE GRID CARD) & ÂM THANH THIỀN */}
        <HeroBanner
          title="Tử Vi Tương Hợp"
          subtitle="Giáp Tý 1984 · Hải Trung Kim · Đoài Kim Tây Tứ Mệnh · Hòa hợp nhân duyên & phát triển sự nghiệp"
          quote="“Thiên thời – Địa lợi – Nhân hòa: Hòa khí sinh tài, đồng tâm đắc lợi.”"
          quoteAuthor="— Nguyễn Hùng Thái"
          videoSrc="https://cdn.scena.ai/project/10223/a333574db47ac4b8323deae8d3863918a26f626c40a08a507cf96db0297a65e0.mp4"
          bottomControls={
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'grid' ? 'slide' : 'grid')}
                className={`px-3 py-1 rounded-full text-[11px] font-black border shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400'
                    : 'bg-white/90 dark:bg-slate-900/90 text-purple-700 dark:text-purple-300 border-purple-300 hover:bg-purple-50'
                }`}
                title="Chuyển đổi giữa chế độ Lưới Thẻ Responsive (Grid Card) và Chế độ Slide"
              >
                <WebIcon
                  name={viewMode === 'grid' ? 'layers' : 'compass'}
                  className="w-3.5 h-3.5"
                />
                <span>
                  {viewMode === 'grid'
                    ? 'Chế độ: Lưới Thẻ (Grid Card)'
                    : 'Chế độ: Slide Trình Chiếu'}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleAudio}
                className={`px-3 py-1 rounded-full text-[11px] font-black border shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-amber-500 text-white border-amber-400 animate-pulse'
                    : 'bg-white/90 dark:bg-slate-900/90 text-amber-700 dark:text-amber-300 border-amber-300 hover:bg-amber-50'
                }`}
                title="Bật/Tắt âm thanh thiền định tĩnh tâm"
              >
                <WebIcon
                  name={isAudioPlaying ? 'pause' : 'play'}
                  className="w-3.5 h-3.5"
                />
                <span>
                  {isAudioPlaying ? 'Thiền Định Đang Phát' : 'Âm Hưởng Thiền 432Hz'}
                </span>
              </button>
            </div>
          }
        />

        {viewMode === 'grid' ? (
          /* ================= CHẾ ĐỘ RESPONSIVE GRID CARD VIEW TOÀN DIỆN ================= */
          <div className="w-full flex flex-col gap-[15px] relative z-10">
            {/* 1. Tử vi bát trạch & Hồ sơ nhân thân */}
            {renderSection1BatTrach()}

            {/* 2. Phong cách quản trị (Responsive 4-Card Grid) */}
            {renderSection2Management()}

            {/* 3. Lục cung ngũ hành (Responsive 6-Card + 5-Card Grid) */}
            {renderSection3Palaces()}

            {/* 4. Tra hợp công việc 12 Con Giáp (Responsive 12-Card Grid) */}
            {renderZodiacResponsiveGridCards()}

            {/* 5. Triết lý lãnh đạo & Châm ngôn dẫn mệnh (Responsive 6-Card Grid) */}
            {renderSection4Philosophy()}
          </div>
        ) : (
          /* ================= CHẾ ĐỘ SLIDE 2 CỘT (TRÁI 80% SLIDE, PHẢI 20% TRA HỢP) ================= */
          <div
            id="info-card-tuvi"
            className="w-full flex flex-col lg:flex-row gap-4 items-stretch lg:h-[620px] xl:h-[640px] relative z-10"
          >
            {/* CỘT TRÁI (80%): CHỨA CÁC SLIDE NỘI DUNG */}
            <div className="w-full lg:w-[78%] xl:w-[80%] flex flex-col min-w-0 relative h-full">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="fixed lg:absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.18)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-40 group"
                title="Slide trước (Phím ←)"
                aria-label="Slide trước"
              >
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.8] transition-transform duration-200 group-hover:-translate-x-0.5 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                className="fixed lg:absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.18)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-40 group"
                title="Slide kế tiếp (Phím →)"
                aria-label="Slide kế tiếp"
              >
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.8] transition-transform duration-200 group-hover:translate-x-0.5 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {currentSlide === 0 && (
                <div
                  key="slide-1"
                  className={`w-full h-full flex flex-col ${
                    slideDirection === 'next'
                      ? 'animate-slide-next'
                      : 'animate-slide-prev'
                  }`}
                >
                  {renderSection1BatTrach()}
                </div>
              )}

              {currentSlide === 1 && (
                <div
                  key="slide-2"
                  className={`w-full h-full flex flex-col ${
                    slideDirection === 'next'
                      ? 'animate-slide-next'
                      : 'animate-slide-prev'
                  }`}
                >
                  {renderSection2Management()}
                </div>
              )}

              {currentSlide === 2 && (
                <div
                  key="slide-3"
                  className={`w-full h-full flex flex-col ${
                    slideDirection === 'next'
                      ? 'animate-slide-next'
                      : 'animate-slide-prev'
                  }`}
                >
                  {renderSection3Palaces()}
                </div>
              )}

              {currentSlide === 3 && (
                <div
                  key="slide-4"
                  className={`w-full h-full flex flex-col ${
                    slideDirection === 'next'
                      ? 'animate-slide-next'
                      : 'animate-slide-prev'
                  }`}
                >
                  {renderSection4Philosophy()}
                </div>
              )}
            </div>

            {/* CỘT PHẢI (20%): CÔNG CỤ TRA HỢP CÔNG VIỆC */}
            <div className="w-full lg:w-[22%] xl:w-[20%] shrink-0 flex flex-col min-w-0 h-full">
              <div
                id="tuvi-tool-zodiac"
                className="w-full h-full bg-white/90 dark:bg-slate-900/90 border border-teal-200/90 dark:border-teal-500/30 rounded-2xl p-3 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left"
              >
                <div className="flex items-center justify-between pb-2 border-b border-teal-200/50 dark:border-teal-800/50 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <WebIcon name="users" className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <h3 className="text-xs sm:text-sm font-black font-play bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                      Tra Hợp Công Việc
                    </h3>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto glass-scrollbar pt-2 pr-0.5 space-y-2 flex flex-col">
                  <div className="space-y-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 w-full">
                      <div className="relative flex-1">
                        <WebIcon
                          name="search"
                          className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                        <input
                          type="number"
                          placeholder="Năm sinh (vd: 1992)..."
                          value={searchYearInput}
                          onChange={(e) => setSearchYearInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleYearSearch()}
                          className="w-full pl-7 pr-7 py-1 rounded-lg text-[10.5px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const order = ['all', 'best', 'support', 'caution'];
                            const nextIdx =
                              (order.indexOf(zodiacFilterTier) + 1) % order.length;
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
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 dark:text-teal-400 hover:text-teal-700 cursor-pointer flex items-center justify-center"
                        >
                          <WebIcon name="filter" className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleYearSearch}
                        className="px-2 py-1 rounded-lg text-[10.5px] font-black bg-teal-600 hover:bg-teal-700 text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                      >
                        Tra
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-1 shrink-0 p-0.5 max-h-[260px] overflow-y-auto glass-scrollbar">
                    {filteredZodiacList.map((item) => {
                      const isSelected = selectedZodiacId === item.id;
                      const theme = getZodiacTheme(item.tier);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedZodiacId(item.id);
                            setHasSearched(true);
                          }}
                          className={`p-1.5 px-2 rounded-lg flex items-center justify-between text-left transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? theme.bgSelected
                              : `${theme.bgUnselected} hover:brightness-105`
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-lg leading-none shrink-0">
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

                  {hasSearched &&
                    currentZodiac &&
                    (() => {
                      const activeTheme = getZodiacTheme(currentZodiac.tier);
                      return (
                        <div
                          className={`p-2 rounded-xl bg-gradient-to-br ${activeTheme.gradientBox} border space-y-1.5 text-xs shrink-0 animate-fadeIn`}
                        >
                          <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-200/50 dark:border-slate-800/60">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-xl shrink-0">
                                {currentZodiac.icon}
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-[11px] font-black text-slate-900 dark:text-white truncate">
                                  Tuổi {currentZodiac.nameVi} (
                                  {currentZodiac.animalVi})
                                </h4>
                                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
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
                            <div className="p-1 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50">
                              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                                📅 Năm sinh:
                              </span>
                              <span className="text-slate-900 dark:text-white font-medium">
                                {currentZodiac.years}
                              </span>
                            </div>
                            <div className="p-1 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50">
                              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                                🏢 Môi trường:
                              </span>
                              <span className="text-slate-900 dark:text-white font-medium">
                                {currentZodiac.workplaceFitVi}
                              </span>
                            </div>
                            <div className="p-1 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50">
                              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                                🧭 Hướng bàn:
                              </span>
                              <span className="text-slate-900 dark:text-white font-medium">
                                {currentZodiac.deskDirectionVi}
                              </span>
                            </div>
                            <div
                              className={`p-1 rounded-md ${activeTheme.accentBg} border`}
                            >
                              <span
                                className={`font-bold ${activeTheme.textColor} block`}
                              >
                                💡 Lời khuyên:
                              </span>
                              <p className="text-slate-800 dark:text-slate-200 leading-snug">
                                {currentZodiac.workplaceAdviceVi}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
