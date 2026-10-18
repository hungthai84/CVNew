'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  TU_VI_PROFILE,
  WORK_PERSONALITY_TRAITS,
  SIX_CORE_PALACES,
  FIVE_ELEMENTS_GOVERNANCE,
  ZODIAC_SYNERGY_LIST,
  ACTION_PHILOSOPHY_CARDS,
  ZodiacSynergyItem,
} from '@/data/tuviData';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { useToast } from '@/components/ui/Toast';

export const HoroscopeView: React.FC = () => {
  const { showToast } = useToast();

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

  // Zodiac Synergy Tab / Interactive Lookup State (Mặc định null: không hiển thị nội dung tra cứu)
  const [selectedZodiacId, setSelectedZodiacId] = useState<string | null>(null);
  const [searchYearInput, setSearchYearInput] = useState<string>('');
  const [zodiacFilterTier, setZodiacFilterTier] = useState<string>('all');
  const [isZodiacFilterOpen, setIsZodiacFilterOpen] = useState<boolean>(false);
  const zodiacFilterRef = useRef<HTMLDivElement>(null);

  // Close zodiac filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zodiacFilterRef.current && !zodiacFilterRef.current.contains(e.target as Node)) {
        setIsZodiacFilterOpen(false);
      }
    };
    if (isZodiacFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isZodiacFilterOpen]);

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
      const found = ZODIAC_SYNERGY_LIST.find((z) => z.id === targetId);
      if (found) {
        showToast(`Tra cứu năm ${year}: Tuổi ${found.nameVi} (${found.animalVi}) · ${found.score}`);
      }
    } else {
      showToast('Vui lòng nhập năm sinh từ 1920 đến 2040');
    }
  }, [searchYearInput, showToast]);

  const filteredZodiacList = useMemo(() => {
    return ZODIAC_SYNERGY_LIST.filter((item) => {
      if (zodiacFilterTier === 'all') return true;
      if (zodiacFilterTier === 'best') return item.tier === 'best' || item.tier === 'luc_hop';
      return item.tier === zodiacFilterTier;
    });
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
      star: 'Thiên Y',
      meaning: 'Thu hút tài lộc, danh tiếng & thăng tiến',
      icon: 'mountain',
      color: 'border-teal-200/80 bg-[#f0fdfa] text-teal-800 dark:bg-slate-800/80 dark:border-teal-800/60 dark:text-teal-300',
      tagColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      direction: 'Tây Nam',
      star: 'Sinh Khí',
      meaning: 'Củng cố các mối quan hệ & đồng đội gắn kết',
      icon: 'sprout',
      color: 'border-emerald-200/80 bg-[#f0fdf4] text-emerald-800 dark:bg-slate-800/80 dark:border-emerald-800/60 dark:text-emerald-300',
      tagColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      direction: 'Đông Bắc',
      star: 'Diên Niên',
      meaning: 'Cải thiện sức khỏe, trường thọ & bình an',
      icon: 'shield',
      color: 'border-sky-200/80 bg-[#f0f9ff] text-sky-800 dark:bg-slate-800/80 dark:border-sky-800/60 dark:text-sky-300',
      tagColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      direction: 'Chính Tây',
      star: 'Phục Vị',
      meaning: 'Củng cố sức mạnh tinh thần, may mắn thi cử',
      icon: 'star',
      color: 'border-purple-200/80 bg-[#faf5ff] text-purple-800 dark:bg-slate-800/80 dark:border-purple-800/60 dark:text-purple-300',
      tagColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const DISPLAY_7_ZODIACS = [
    {
      id: 'than',
      nameVi: 'Thân',
      animalVi: 'Khỉ',
      iconName: 'than',
      displayScore: '100%',
      badgeClass: 'bg-[#10b981]',
      highlight: true,
    },
    {
      id: 'thin',
      nameVi: 'Thìn',
      animalVi: 'Rồng',
      iconName: 'thin',
      displayScore: '98%',
      badgeClass: 'bg-[#10b981]',
      highlight: false,
    },
    {
      id: 'suu',
      nameVi: 'Sửu',
      animalVi: 'Trâu',
      iconName: 'suu',
      displayScore: '90%',
      badgeClass: 'bg-[#a855f7]',
      highlight: false,
    },
    {
      id: 'hoi',
      nameVi: 'Hợi',
      animalVi: 'Heo',
      iconName: 'hoi',
      displayScore: '88%',
      badgeClass: 'bg-[#0ea5e9]',
      highlight: false,
    },
    {
      id: 'tuat',
      nameVi: 'Tuất',
      animalVi: 'Chó',
      iconName: 'tuat',
      displayScore: '88%',
      badgeClass: 'bg-[#0ea5e9]',
      highlight: false,
    },
    {
      id: 'dau',
      nameVi: 'Dậu',
      animalVi: 'Gà',
      iconName: 'dau',
      displayScore: '82%',
      badgeClass: 'bg-[#3b82f6]',
      highlight: false,
    },
    {
      id: 'dan',
      nameVi: 'Dần',
      animalVi: 'Hổ',
      iconName: 'dan',
      displayScore: '80%',
      badgeClass: 'bg-[#3b82f6]',
      highlight: false,
    },
  ];

  return (
    <section
      id="tuvi"
      className="relative w-full h-full flex-1 min-h-0 flex flex-col justify-start items-stretch font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-hidden"
    >
      {/* Main Container */}
      <div className="w-full h-full flex-1 min-h-0 flex flex-col gap-2.5 sm:gap-3 max-w-7xl mx-auto justify-start select-none overflow-hidden">
        {/* HERO BANNER TỬ VI TƯƠNG HỢP (Chuẩn theo thiết kế tham chiếu) */}
        <div className="relative w-full h-[132px] sm:h-[145px] lg:h-[150px] shrink-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-amber-200/50 bg-gradient-to-r from-amber-50 via-white to-amber-50">
          <img
            src="/images/tuvi/hero-banner.png"
            alt="Phong Thủy & Cung Mệnh - Tử Vi Tương Hợp"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
          {/* Nút bấm tương tác phát/tắt Âm Hưởng Thiền 432Hz */}
          <button
            type="button"
            onClick={toggleAudio}
            className="absolute left-[3.5%] bottom-[12%] w-[16%] h-[25%] min-w-[125px] rounded-full cursor-pointer focus:outline-none transition-all flex items-center justify-center group"
            title={isAudioPlaying ? 'Tắt âm thanh thiền định tĩnh tâm' : 'Phát âm hưởng thiền định 432Hz'}
            aria-label="Phát âm hưởng thiền định 432Hz"
          >
            {isAudioPlaying && (
              <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
            )}
          </button>
        </div>

        {/* BỐ CỤC 2 CỘT CÂN BẰNG CHIỀU CAO: TRÁI 74% (SLIDE TỬ VI), PHẢI 26% (TRA HỢP CÔNG VIỆC) */}
        <div id="info-card-tuvi" className="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-2.5 sm:gap-3.5 items-stretch relative z-10 overflow-hidden">
          {/* ================= CỘT TRÁI (74%): CUNG MỆNH BÁT TRẠCH & CÁC SLIDE ================= */}
          <div className="w-full lg:w-[74%] xl:w-[74%] flex flex-col min-w-0 relative h-full min-h-0 overflow-hidden">
            {/* SLIDE 0: Cung Mệnh, La Bàn Âm Dương & Hồ Sơ Nhân Thân (Chuẩn theo hình đính kèm) */}
            {currentSlide === 0 && (
              <div key="slide-1" className={`w-full h-full flex flex-col min-h-0 ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
                <div
                  id="tuvi-section-1"
                  className="w-full h-full bg-white/95 dark:bg-slate-900/95 border border-purple-200/80 dark:border-purple-800/60 rounded-2xl md:rounded-3xl p-3 sm:p-3.5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Header thẻ Cung Mệnh Bát Trạch */}
                  <div className="relative z-10 flex items-center justify-between pb-2 border-b border-purple-100 dark:border-purple-900/40 shrink-0">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center font-bold shadow-sm shadow-purple-500/25 shrink-0">
                        <WebIcon name="compass" className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black tracking-wide font-play bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 dark:from-purple-300 dark:via-indigo-300 dark:to-amber-300 bg-clip-text text-transparent">
                        Cung Mệnh Bát Trạch
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 shadow-2xs flex items-center gap-1.5">
                        <span className="text-xs">☯</span>
                        <span>Đoài Kim Tây Tứ</span>
                      </span>
                    </div>
                  </div>

                  {/* Body chia 2 cột con: Trái La Bàn Âm Dương (34%), Phải Hồ Sơ Nhân Thân (66%) */}
                  <div className="relative z-10 flex-1 min-h-0 pt-2 flex flex-col lg:flex-row gap-2.5 sm:gap-3 items-stretch overflow-hidden">
                    {/* Cột con 1: La Bàn Âm Dương */}
                    <div className="w-full lg:w-[34%] shrink-0 bg-gradient-to-b from-[#faf5ff]/60 to-[#ffffff] dark:from-slate-900/90 dark:to-slate-900/70 border border-purple-200/70 dark:border-purple-800/50 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between items-center text-center shadow-2xs relative overflow-hidden">
                      <div className="flex items-center justify-between pb-1.5 border-b border-purple-100 dark:border-purple-900/40 w-full text-left shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-sm">✦</span>
                          <h4 className="text-xs sm:text-[13px] font-black text-purple-900 dark:text-purple-300 tracking-wide">
                            La Bàn Âm Dương
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCompassMode(compassMode === 'yinyang' ? 'battrach' : 'yinyang')}
                          className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#7c3aed] text-white hover:brightness-110 shadow-xs cursor-pointer transition-all"
                          title="Chuyển chế độ xem Âm Dương / Bát Trạch"
                        >
                          {compassMode === 'yinyang' ? 'Xem Bát Trạch' : 'Xem Âm Dương'}
                        </button>
                      </div>

                      {compassMode === 'yinyang' ? (
                        <div className="relative w-full flex-1 min-h-0 max-h-[195px] flex items-center justify-center my-auto">
                          {/* Đồ hình La Bàn Âm Dương sơn thủy phong thủy */}
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              src="/images/tuvi/compass-view.png"
                              alt="La Bàn Âm Dương"
                              className={`max-h-full max-w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02] ${
                                isAudioPlaying ? 'filter drop-shadow-[0_0_12px_rgba(245,158,11,0.55)]' : ''
                              }`}
                              onClick={toggleAudio}
                              title={isAudioPlaying ? 'Tắt âm thanh thiền định' : 'Nhấp la bàn để nghe thiền định 432Hz'}
                            />

                            {/* Cặp nút điều hướng slide mượt mà trên la bàn */}
                            <button
                              type="button"
                              onClick={handlePrevSlide}
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 dark:bg-slate-800/95 hover:bg-white text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-110 z-20"
                              title="Slide trước"
                              aria-label="Slide trước"
                            >
                              <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>

                            <button
                              type="button"
                              onClick={handleNextSlide}
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 dark:bg-slate-800/95 hover:bg-white text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-110 z-20"
                              title="Slide kế tiếp"
                              aria-label="Slide kế tiếp"
                            >
                              <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative my-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-indigo-400/50 bg-indigo-950/80 p-1.5 flex items-center justify-center text-white shadow-inner">
                          <div className="w-full h-full rounded-full border border-indigo-300/30 flex flex-col items-center justify-center relative text-center">
                            <div className="text-[10px] font-black text-amber-300">TÂY TỨ MỆNH</div>
                            <div className="text-sm sm:text-base font-black text-cyan-300 my-0.5 font-play">Đoài Kim</div>
                            <div className="text-[8px] text-slate-300">Kim Tứ Cục · Cung Tý</div>
                            <span className="absolute top-0.5 text-[8px] font-black text-emerald-300 bg-emerald-950/70 px-1 rounded">TB Sinh Khí</span>
                            <span className="absolute bottom-0.5 text-[8px] font-black text-teal-300 bg-teal-950/70 px-1 rounded">TN Diên Niên</span>
                            <span className="absolute left-0.5 text-[8px] font-black text-cyan-300 bg-cyan-950/70 px-1 rounded">ĐB Thiên Y</span>
                            <span className="absolute right-0.5 text-[8px] font-black text-indigo-300 bg-indigo-950/70 px-1 rounded">T Phục Vị</span>
                          </div>
                        </div>
                      )}

                      {/* Nút bấm nghe thiền định ở chân la bàn */}
                      <button
                        type="button"
                        onClick={toggleAudio}
                        className={`w-full py-1 sm:py-1.5 px-2 rounded-full border text-[10px] sm:text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          isAudioPlaying
                            ? 'bg-amber-500/15 border-amber-400 text-amber-800 dark:text-amber-300 shadow-xs'
                            : 'bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                        }`}
                      >
                        <span className="text-xs">🎧</span>
                        <span>{isAudioPlaying ? 'Đang phát thiền định 432Hz' : 'Nhấp la bàn để nghe thiền định 432Hz'}</span>
                      </button>
                    </div>

                    {/* Cột con 2: Hồ Sơ Nhân Thân & Hướng Cát Bát Trạch */}
                    <div className="w-full lg:w-[66%] flex-1 flex flex-col justify-between rounded-2xl border border-purple-200/70 dark:border-purple-800/50 bg-white/95 dark:bg-slate-900/90 p-2.5 sm:p-3 shadow-2xs overflow-hidden">
                      {/* Tiêu đề Hồ sơ nhân thân */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-purple-100 dark:border-purple-900/40 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <WebIcon name="user" className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <h4 className="text-xs sm:text-[13px] font-black text-purple-900 dark:text-purple-300 tracking-wide">
                            Hồ Sơ Nhân Thân
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs">
                          Hải Trung Kim • Đoài Kim
                        </span>
                      </div>

                      {/* 6 Khối thông số nhân thân (Grid 3 cols x 2 rows) */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 my-auto">
                        {/* 1. Dương Lịch */}
                        <div className="p-1.5 sm:p-2 bg-[#f0f7ff] dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-blue-900/40 flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <WebIcon name="calendar" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
                              DƯƠNG LỊCH KHỞI SINH
                            </div>
                            <div className="text-[10.5px] sm:text-[11px] font-black text-slate-800 dark:text-slate-100 truncate">
                              16/06/1984
                            </div>
                          </div>
                        </div>

                        {/* 2. Âm Lịch */}
                        <div className="p-1.5 sm:p-2 bg-[#faf5ff] dark:bg-slate-800/80 rounded-xl border border-purple-100 dark:border-purple-900/40 flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                            <WebIcon name="clock" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 truncate">
                              ÂM LỊCH GIÁP TÝ
                            </div>
                            <div className="text-[10.5px] sm:text-[11px] font-black text-slate-800 dark:text-slate-100 truncate">
                              17 tháng 05 năm Giáp Tý
                            </div>
                          </div>
                        </div>

                        {/* 3. Giờ Sinh Can Chi */}
                        <div className="p-1.5 sm:p-2 bg-[#fffbeb] dark:bg-slate-800/80 rounded-xl border border-amber-100 dark:border-amber-900/40 flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <WebIcon name="award" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 truncate">
                              GIỜ SINH CAN CHI
                            </div>
                            <div className="text-[10.5px] sm:text-[11px] font-black text-slate-800 dark:text-slate-100 truncate">
                              Giờ Dậu (17h - 19h)
                            </div>
                          </div>
                        </div>

                        {/* 4. Bản Mệnh Nạp Âm */}
                        <div className="p-1.5 sm:p-2 bg-[#f0fdf4] dark:bg-slate-800/80 rounded-xl border border-emerald-100 dark:border-emerald-900/40 flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <WebIcon name="shield" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 truncate">
                              BẢN MỆNH NẠP ÂM
                            </div>
                            <div className="text-[10.5px] sm:text-[11px] font-black text-emerald-800 dark:text-emerald-300 truncate">
                              Hải Trung Kim
                            </div>
                          </div>
                        </div>

                        {/* 5. Cung Mệnh Bối Kim */}
                        <div className="p-1.5 sm:p-2 bg-[#ecfeff] dark:bg-slate-800/80 rounded-xl border border-cyan-100 dark:border-cyan-900/40 flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                            <WebIcon name="globe" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 truncate">
                              CUNG MỆNH BỐI KIM
                            </div>
                            <div className="text-[10.5px] sm:text-[11px] font-black text-cyan-800 dark:text-cyan-300 truncate">
                              Đoài Kim
                            </div>
                          </div>
                        </div>

                        {/* 6. Kim Tứ Cục Vận */}
                        <div className="p-1.5 sm:p-2 bg-[#fff1f2] dark:bg-slate-800/80 rounded-xl border border-rose-100 dark:border-rose-900/40 flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                            <WebIcon name="hash" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 truncate">
                              KIM TỨ CỤC VẬN
                            </div>
                            <div className="text-[10.5px] sm:text-[11px] font-black text-rose-800 dark:text-rose-300 truncate">
                              Kim Tứ Cục (Số 4)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hướng Cát Bát Trạch (4 Thẻ: Tây Bắc, Sinh Khí, Diên Niên, Phục Vị) */}
                      <div className="pt-1.5 border-t border-purple-100 dark:border-purple-900/40 space-y-1 sm:space-y-1.5 shrink-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] font-black text-purple-900 dark:text-purple-300">
                            <WebIcon name="compass" className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            <span>Hướng Cát Bát Trạch</span>
                          </div>
                          <span className="text-[9.5px] font-semibold px-2 py-0.2 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                            Tây Tứ Trạch
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {/* 1. Tây Bắc / Thiên Y */}
                          <div className="p-1.5 sm:p-2 rounded-xl bg-[#f0fdfa] dark:bg-slate-800/80 border border-teal-200/60 dark:border-teal-800/40 text-left shadow-2xs">
                            <div className="flex items-center gap-1 text-[10px] font-black text-teal-900 dark:text-teal-200">
                              <span className="text-teal-600 font-bold">▲</span>
                              <span>Tây Bắc</span>
                            </div>
                            <div className="text-[9px] font-bold text-teal-600 dark:text-teal-400">Thiên Y</div>
                            <p className="text-[9px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug line-clamp-2">
                              Thu hút tài lộc, danh tiếng & thăng tiến
                            </p>
                          </div>

                          {/* 2. Sinh Khí / Tây Nam */}
                          <div className="p-1.5 sm:p-2 rounded-xl bg-[#f0fdf4] dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-800/40 text-left shadow-2xs">
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-900 dark:text-emerald-200">
                              <span className="text-emerald-600 font-bold">🌱</span>
                              <span>Sinh Khí</span>
                            </div>
                            <div className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">Tây Nam</div>
                            <p className="text-[9px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug line-clamp-2">
                              Củng cố các mối quan hệ & đồng đội gắn kết
                            </p>
                          </div>

                          {/* 3. Diên Niên / Đông Bắc */}
                          <div className="p-1.5 sm:p-2 rounded-xl bg-[#f0f9ff] dark:bg-slate-800/80 border border-sky-200/60 dark:border-sky-800/40 text-left shadow-2xs">
                            <div className="flex items-center gap-1 text-[10px] font-black text-sky-900 dark:text-sky-200">
                              <span className="text-sky-600 font-bold">🛡️</span>
                              <span>Diên Niên</span>
                            </div>
                            <div className="text-[9px] font-bold text-sky-600 dark:text-sky-400">Đông Bắc</div>
                            <p className="text-[9px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug line-clamp-2">
                              Cải thiện sức khỏe, trường thọ & bình an
                            </p>
                          </div>

                          {/* 4. Phục Vị / Chính Tây */}
                          <div className="p-1.5 sm:p-2 rounded-xl bg-[#faf5ff] dark:bg-slate-800/80 border border-purple-200/60 dark:border-purple-800/40 text-left shadow-2xs">
                            <div className="flex items-center gap-1 text-[10px] font-black text-purple-900 dark:text-purple-200">
                              <span className="text-purple-600 font-bold">★</span>
                              <span>Phục Vị</span>
                            </div>
                            <div className="text-[9px] font-bold text-purple-600 dark:text-purple-400">Chính Tây</div>
                            <p className="text-[9px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug line-clamp-2">
                              Củng cố sức mạnh tinh thần, may mắn thi cử
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: 2. Phong Cách Quản Trị */}
            {currentSlide === 1 && (
              <div key="slide-2" className={`w-full h-full flex flex-col min-h-0 ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
                <div
                  id="tuvi-section-2"
                  className="w-full h-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-blue-400/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Header thẻ: 4 chữ viết hoa chữ đầu, không tạo sub tiêu đề */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-blue-200/50 dark:border-blue-800/50 shrink-0">
                    <div className="flex items-center gap-2 text-left">
                      <WebIcon name="briefcase" className="w-4.5 h-4.5 text-blue-500 dark:text-cyan-400 shrink-0 drop-shadow-sm" />
                      <h3 className="text-base sm:text-lg font-black tracking-wide font-play bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                        Phong Cách Quản Trị
                      </h3>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                      4 Trụ Cột Quản Trị
                    </span>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-3 pr-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-left">
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
                            className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/75 border ${colorPalette.border} ${colorPalette.glow} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2.5 backdrop-blur-md`}
                          >
                            <div className="space-y-2">
                              {/* Tiêu đề sub card: 4 chữ viết hoa chữ đầu, không tạo sub tiêu đề */}
                              <div className={`w-full flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b ${colorPalette.border}`}>
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-4 ${colorPalette.bar} rounded-full shrink-0`} />
                                  <WebIcon name="sparkles" className={`w-3.5 h-3.5 ${colorPalette.text} shrink-0`} />
                                  <h4 className={`text-xs sm:text-sm font-black ${colorPalette.text} tracking-wide`}>
                                    {trait.title}
                                  </h4>
                                </div>
                                <span
                                  className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${colorPalette.bg} ${colorPalette.badgeText} border ${colorPalette.border} shrink-0`}
                                >
                                  {trait.tag}
                                </span>
                              </div>

                              <p className="text-[11.5px] sm:text-xs text-slate-700 dark:text-slate-200 text-justify pt-0.5 leading-relaxed">
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
              </div>
            )}

            {/* SLIDE 3: 3. Lục Cung Ngũ Hành */}
            {currentSlide === 2 && (
              <div key="slide-3" className={`w-full h-full flex flex-col min-h-0 ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
                <div
                  id="tuvi-section-3"
                  className="w-full h-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-emerald-400/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left"
                >
                  {/* Header thẻ: 4 chữ viết hoa chữ đầu, không tạo sub tiêu đề */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-emerald-200/50 dark:border-emerald-800/50 shrink-0">
                    <div className="flex items-center gap-2">
                      <WebIcon name="target" className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400 shrink-0 drop-shadow-sm" />
                      <h3 className="text-base sm:text-lg font-black tracking-wide font-play bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                        Lục Cung Ngũ Hành
                      </h3>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      Lục Cung & Ngũ Hành
                    </span>
                  </div>

                  {/* 6 Cung cốt lõi & 5 Hành tố */}
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-3 pr-1 space-y-3.5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                            className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/80 border ${palette.border} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2.5 backdrop-blur-md`}
                          >
                            <div className="space-y-1.5">
                              {/* Tiêu đề sub card: 4 chữ viết hoa chữ đầu, không tạo sub tiêu đề */}
                              <div className={`flex items-center justify-between pb-1.5 border-b ${palette.border}`}>
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-4 ${palette.bar} rounded-full shrink-0`} />
                                  <h5 className={`text-xs sm:text-[13px] font-black ${palette.text} tracking-wide`}>
                                    {palace.name}
                                  </h5>
                                </div>
                                <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${palette.bg} ${palette.badgeText} border ${palette.border}`}>
                                  {palace.tag}
                                </span>
                              </div>

                              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 text-justify leading-relaxed">
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
                                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{cp}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 5 Hành tố vận hành: Tiêu đề 4 chữ viết hoa chữ đầu, không sub tiêu đề */}
                    <div className="space-y-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {FIVE_ELEMENTS_GOVERNANCE.map((el) => (
                          <div
                            key={el.element}
                            className={`p-2.5 sm:p-3 rounded-xl ${el.bgColor} border ${el.borderColor} flex flex-col justify-between space-y-1.5 text-left shadow-2xs`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/5">
                                <h5 className={`text-[11px] font-black ${el.titleColor}`}>{el.element}</h5>
                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${el.iconBg}`}>
                                  Hành Tố
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{el.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4: 4. Triết Lý Lãnh Đạo (Đổi tên & tách thành Slide 4) */}
            {currentSlide === 3 && (
              <div key="slide-4" className={`w-full h-full flex flex-col min-h-0 ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
                <div
                  id="tuvi-section-5"
                  className="w-full h-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-amber-400/30 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left"
                >
                  {/* Header thẻ: 4 chữ viết hoa chữ đầu, không tạo sub tiêu đề */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-amber-200/50 dark:border-amber-800/50 shrink-0">
                    <div className="flex items-center gap-2">
                      <WebIcon name="award" className="w-4.5 h-4.5 text-amber-500 dark:text-amber-400 shrink-0 drop-shadow-sm" />
                      <h3 className="text-base sm:text-lg font-black tracking-wide font-play bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        Triết Lý Lãnh Đạo
                      </h3>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                      6 Giá Trị Cốt Lõi
                    </span>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-3 pr-1 space-y-3.5">
                    {/* 6 Thẻ triết lý: Tiêu đề 4 chữ viết hoa chữ đầu, không sub tiêu đề */}
                    <div
                      id="tuvi-philosophy-cards"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full"
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
                            className="rounded-xl sm:rounded-2xl p-3 sm:p-3.5 bg-white dark:bg-slate-900/90 border border-amber-200/90 dark:border-amber-500/25 shadow-2xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-400/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left gap-2.5 group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
                                  <WebIcon name={iconName} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span className="text-[9.5px] font-mono font-black px-1.5 py-0.5 rounded-full bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                                  0{idx + 1}
                                </span>
                              </div>

                              <h4 className="text-xs sm:text-[13px] font-bold text-amber-950 dark:text-amber-200 tracking-tight leading-snug pt-0.5">
                                {card.title}
                              </h4>

                              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
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

                    {/* Hero Quote Card: Tiêu đề 4 chữ viết hoa chữ đầu, không sub tiêu đề */}
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
                          <span className="font-mono font-bold text-cyan-300">Nguyễn Hùng Thái · Giáp Tý 1984</span>
                          <span className="font-mono font-semibold text-slate-400">Hải Trung Kim · Đoài Kim Tây Tứ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= CỘT PHẢI (26%): CÔNG CỤ TRA HỢP CÔNG VIỆC (Chuẩn theo hình đính kèm) ================= */}
          <div className="w-full lg:w-[26%] xl:w-[26%] shrink-0 flex flex-col min-w-0 h-full min-h-0 rounded-2xl md:rounded-3xl border border-teal-200/80 dark:border-teal-800/60 bg-white/95 dark:bg-slate-900/95 p-3 sm:p-3.5 shadow-sm backdrop-blur-2xl overflow-hidden justify-between text-left">
            {/* Header thẻ: Tra Hợp Công Việc & 12 Con giáp */}
            <div className="flex items-center justify-between pb-2 border-b border-teal-100 dark:border-teal-900/40 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <WebIcon name="briefcase" className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black font-play text-teal-800 dark:text-teal-300">
                  Tra Hợp Công Việc
                </h3>
              </div>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1 shadow-2xs">
                <WebIcon name="layers" className="w-3 h-3 text-teal-600" />
                <span>12 Con giáp</span>
              </span>
            </div>

            {/* Ô tìm kiếm năm sinh */}
            <div className="pt-2 pb-1 shrink-0 flex items-center gap-1.5 w-full">
              <div className="relative flex-1">
                <WebIcon
                  name="search"
                  className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <input
                  type="number"
                  placeholder="Năm sinh (vd: 1990, 1988, ...)"
                  value={searchYearInput}
                  onChange={(e) => setSearchYearInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleYearSearch()}
                  className="w-full pl-7 pr-2.5 py-1 rounded-full text-[10.5px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
              <button
                type="button"
                onClick={handleYearSearch}
                className="px-3 py-1 rounded-full text-[10.5px] font-black bg-teal-600 hover:bg-teal-700 text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
              >
                Tra
              </button>
            </div>

            {/* Danh sách 7 Con Giáp tương hợp khớp 100% hình tham chiếu */}
            <div className="flex-1 min-h-0 flex flex-col justify-between py-1 gap-1 sm:gap-1.5 overflow-hidden">
              {DISPLAY_7_ZODIACS.map((item) => {
                const isSelected = selectedZodiacId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedZodiacId(item.id)}
                    className={`w-full p-1.5 px-2.5 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                      item.highlight
                        ? 'bg-[#ecfdf5] dark:bg-teal-950/40 border-teal-300 dark:border-teal-700 shadow-2xs'
                        : isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-400 dark:border-teal-600 shadow-xs ring-1 ring-teal-400/50'
                        : 'bg-white/80 dark:bg-slate-900/80 border-slate-100 dark:border-slate-800 hover:border-teal-200 hover:bg-teal-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={`/images/tuvi/icon-${item.iconName}.png`}
                        alt={item.nameVi}
                        className="w-4.5 h-4.5 object-contain shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-100 truncate">
                        Tuổi {item.nameVi} ({item.animalVi})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white shadow-2xs ${item.badgeClass}`}>
                        {item.displayScore}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">›</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DIALOG CHI TIẾT TƯƠNG HỢP CON GIÁP (Đảm bảo thẻ không bị tràn chiều cao) */}
      {currentZodiac && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedZodiacId(null)}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-teal-200/80 dark:border-teal-700/80 text-left space-y-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-2xl border border-teal-200/50 dark:border-teal-800/50">
                  {currentZodiac.icon}
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    Tuổi {currentZodiac.nameVi} ({currentZodiac.animalVi})
                  </h4>
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    {currentZodiac.relationshipVi}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-teal-600 text-white shadow-xs">
                  {currentZodiac.score}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedZodiacId(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer transition-all"
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chi tiết tương hợp */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">📅 Các năm sinh:</span>
                <span className="text-slate-900 dark:text-white font-medium">{currentZodiac.years}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">🏢 Vị trí cộng tác tối ưu:</span>
                <span className="text-slate-900 dark:text-white font-medium">{currentZodiac.workplaceFitVi}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">🧭 Hướng bàn làm việc cát lợi:</span>
                <span className="text-slate-900 dark:text-white font-medium">{currentZodiac.deskDirectionVi}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/50">
                <span className="font-bold text-teal-800 dark:text-teal-300 block mb-0.5">💡 Lời khuyên phối hợp quản trị:</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                  {currentZodiac.workplaceAdviceVi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
