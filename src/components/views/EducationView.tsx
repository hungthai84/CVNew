'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  X,
  LayoutGrid,
  Layers,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  ShieldCheck,
  Radar,
  Calendar,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  Award,
} from 'lucide-react';
import {
  EDUCATION_COURSES,
  EducationCourse,
  CREDENTIAL_VERIFICATION_MAP,
  ACADEMIC_COMPETENCY_RADAR,
  AcademicRadarAxis,
} from '@/data/education';
import { SiteTheme } from '@/types';
import { formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface EducationViewProps {
  currentTheme?: SiteTheme;
}

// Danh mục bộ lọc chuẩn 2 chữ (không dùng ký tự &)
const TWO_WORD_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'degree', label: 'Cử nhân' },
  { id: 'management', label: 'Quản trị' },
  { id: 'tech', label: 'Công nghệ' },
  { id: 'skills', label: 'Kỹ năng' },
] as const;

// Các mốc năm tốt nghiệp thực tế từ 2003 đến 2024
const GRADUATION_YEARS = [2003, 2006, 2007, 2018, 2019, 2020, 2021, 2022, 2023, 2024] as const;

// Rút gọn tiêu đề thành đúng 2 chữ súc tích khi ở chế độ Dạng view tiêu đề 2 chữ
function formatTwoWordTitle(course: EducationCourse): string {
  const verifyInfo = CREDENTIAL_VERIFICATION_MAP[course.id];
  if (verifyInfo?.twoWordTitle) return verifyInfo.twoWordTitle;
  const cleaned = formatCardTitle(course.title);
  return cleaned.split(/\s+/).slice(0, 2).join(' ');
}

// Nhãn danh mục 2 chữ trên từng thẻ (loại bỏ hoàn toàn dấu &)
function getShortCategoryLabel(category: EducationCourse['category']): string {
  switch (category) {
    case 'degree':
      return 'Cử nhân';
    case 'management':
      return 'Quản trị';
    case 'tech':
      return 'Công nghệ';
    case 'skills':
    default:
      return 'Kỹ năng';
  }
}

export const EducationView: React.FC<EducationViewProps> = ({ currentTheme }) => {
  const isDark = currentTheme === 'dark-neon';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  // 4 chế độ xem với tiêu đề nút đúng 2 chữ: 'grid' (Dạng lưới) | 'compact' (Tiêu đề) | 'carousel' (Trình chiếu) | 'radar' (Ma trận)
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'carousel' | 'radar'>('grid');
  // Bộ lọc năm tốt nghiệp Timeline (2003 - 2024)
  const [maxYearFilter, setMaxYearFilter] = useState<number>(2024);
  const [exactYearFilter, setExactYearFilter] = useState<number | null>(null);
  // Bộ lọc theo trục năng lực Radar
  const [selectedRadarAxisId, setSelectedRadarAxisId] = useState<string | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<EducationCourse | null>(null);
  const [verifyingCourse, setVerifyingCourse] = useState<EducationCourse | null>(null);
  const [copiedCredentialId, setCopiedCredentialId] = useState<string | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [isBannerMuted, setIsBannerMuted] = useState<boolean>(true);
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);

  const bannerVideoRef = useRef<HTMLVideoElement | null>(null);

  // Lọc danh sách theo danh mục + năm tốt nghiệp (2003 - 2024) + trục Radar
  const filteredCourses = useMemo(() => {
    const activeRadarAxis = ACADEMIC_COMPETENCY_RADAR.find((a) => a.id === selectedRadarAxisId);

    return EDUCATION_COURSES.filter((c) => {
      const courseYear = parseInt(c.year, 10) || 2024;
      const matchCategory = activeCategory === 'all' || c.category === activeCategory;
      const matchYear = exactYearFilter !== null ? courseYear === exactYearFilter : courseYear <= maxYearFilter;
      const matchRadar = activeRadarAxis ? activeRadarAxis.courseIds.includes(c.id) : true;
      return matchCategory && matchYear && matchRadar;
    });
  }, [activeCategory, maxYearFilter, exactYearFilter, selectedRadarAxisId]);

  const handleOpenDetail = (course: EducationCourse) => {
    SoundEngine.playTap();
    setSelectedCourse(course);
  };

  const handleOpenVerifyModal = (course: EducationCourse, e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    setVerifyingCourse(course);
  };

  const handleCopyCredential = async (credId: string) => {
    SoundEngine.playTap();
    try {
      await navigator.clipboard.writeText(credId);
      setCopiedCredentialId(credId);
      setTimeout(() => setCopiedCredentialId(null), 2000);
    } catch {
      // Fallback ignore
    }
  };

  const handleOpenLightbox = (imgSrc: string, title: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    setLightboxImage(imgSrc);
    setLightboxTitle(title);
    setIsLightboxOpen(true);
  };

  const handleToggleBannerMute = () => {
    const video = bannerVideoRef.current;
    if (!video) return;
    const next = !isBannerMuted;
    setIsBannerMuted(next);
    video.muted = next;
  };

  const handlePrevCarousel = () => {
    SoundEngine.playTap();
    setActiveCarouselIdx((prev) => (prev > 0 ? prev - 1 : Math.max(0, filteredCourses.length - 1)));
  };

  const handleNextCarousel = () => {
    SoundEngine.playTap();
    setActiveCarouselIdx((prev) => (prev < filteredCourses.length - 1 ? prev + 1 : 0));
  };

  const handleResetFilters = () => {
    SoundEngine.playTap();
    setActiveCategory('all');
    setMaxYearFilter(2024);
    setExactYearFilter(null);
    setSelectedRadarAxisId(null);
    setActiveCarouselIdx(0);
  };

  // Tính toán tọa độ đa giác cho Biểu đồ Radar 6 trục
  const radarGeometry = useMemo(() => {
    const cx = 150;
    const cy = 150;
    const maxR = 102;
    const axes = ACADEMIC_COMPETENCY_RADAR;
    const total = axes.length;

    const getPoint = (idx: number, radiusRatio: number) => {
      const angle = (Math.PI * 2 * idx) / total - Math.PI / 2;
      const r = maxR * radiusRatio;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        labelX: cx + (maxR + 30) * Math.cos(angle),
        labelY: cy + (maxR + 24) * Math.sin(angle),
      };
    };

    const gridLevels = [0.25, 0.5, 0.75, 1].map((lvl) => {
      const pts = axes.map((_, idx) => {
        const p = getPoint(idx, lvl);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      });
      return pts.join(' ');
    });

    const dataPoints = axes.map((axis, idx) => {
      const p = getPoint(idx, axis.score / 100);
      const outer = getPoint(idx, 1);
      return {
        axis,
        x: p.x,
        y: p.y,
        outerX: outer.x,
        outerY: outer.y,
        labelX: outer.labelX,
        labelY: outer.labelY,
      };
    });

    const polygonPoints = dataPoints.map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(' ');

    return { cx, cy, maxR, gridLevels, dataPoints, polygonPoints };
  }, []);

  const safeCarouselIndex = filteredCourses.length > 0 ? Math.min(activeCarouselIdx, filteredCourses.length - 1) : 0;

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-3.5 overflow-y-auto no-scrollbar pb-6 select-none text-left">
      {/* 1. HERO BANNER VIDEO - ĐỘ TRONG SUỐT NỀN 50% & DẠNG VIEW TIÊU ĐỀ 2 CHỮ */}
      <section className="relative w-full rounded-2xl overflow-hidden shrink-0 border border-emerald-500/30 dark:border-emerald-400/30 shadow-lg min-h-[168px] sm:min-h-[185px] flex flex-col justify-between p-3.5 sm:p-4 bg-slate-900/50 backdrop-blur-md">
        {/* Video nền hoặc Poster */}
        <video
          ref={bannerVideoRef}
          src="https://cdn.scena.ai/project/10223/cc5a8e558d2380dc8bfb96fd26cd877e444d63b6a7036a8530abd823d6d6da63.mp4"
          poster="/images/education/hero-banner.png"
          autoPlay
          loop
          muted={isBannerMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
        />

        {/* Lớp phủ Scrim độ trong suốt chuẩn 50% bảo vệ độ tương phản chữ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(2, 6, 23, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
          }}
        />

        {/* Khối Header Top: Tiêu đề 4 từ, Badge xác thực số & Cụm nút Dạng View Tiêu Đề 2 Chữ */}
        <div className="relative z-10 flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 shadow-sm backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                <span>Học vấn chứng chỉ</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/15 text-white border border-white/20 backdrop-blur-md">
                {filteredCourses.length} / {EDUCATION_COURSES.length} Văn bằng
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 text-cyan-300" />
                <span>100% Xác thực số</span>
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-black font-play text-white tracking-tight drop-shadow-md">
              Học vấn chứng chỉ
            </h1>

            <p className="text-xs sm:text-sm text-slate-100 font-medium max-w-2xl drop-shadow-sm hidden sm:block">
              14 Chứng chỉ chuyên ngành (2003 – 2024) • Kết hợp nền tảng Công nghệ CNTT và Quản trị vận hành CX C-Level.
            </p>
          </div>

          {/* Nhóm nút góc phải trên: Dạng view tiêu đề 2 chữ (Dạng lưới | Tiêu đề | Trình chiếu | Ma trận) */}
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <div className="bg-black/50 backdrop-blur-md p-0.5 rounded-xl border border-white/20 flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('grid');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Dạng lưới đầy đủ"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[11px]">Dạng lưới</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('compact');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'compact'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Dạng view tiêu đề 2 chữ"
              >
                <Award className="w-3.5 h-3.5" />
                <span className="text-[11px]">Tiêu đề</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('carousel');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'carousel'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Dạng băng chuyền trình chiếu"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="text-[11px]">Trình chiếu</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setViewMode('radar');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'radar'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Biểu đồ Radar Năng lực Học vấn (Academic Competency Matrix)"
              >
                <Radar className="w-3.5 h-3.5" />
                <span className="text-[11px]">Ma trận</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleToggleBannerMute}
              title={isBannerMuted ? 'Bật âm thanh banner' : 'Tắt tiếng banner'}
              className="p-2 rounded-xl bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition cursor-pointer"
            >
              {isBannerMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>
          </div>
        </div>

        {/* Khối Trích Dẫn Triết Lý & Bộ Lọc Nhanh Danh Mục 2 Chữ Dưới Cùng */}
        <div className="relative z-10 pt-2.5 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <p className="text-[11px] sm:text-xs italic text-emerald-200 font-sans tracking-wide">
            “Học hỏi không ngừng để nâng tầm tri thức và năng lực vận hành.” <span className="font-semibold text-white">— Nguyễn Hùng Thái</span>
          </p>

          {/* Bộ lọc danh mục chuẩn 2 chữ */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {TWO_WORD_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setActiveCategory(cat.id);
                    setActiveCarouselIdx(0);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-black border-emerald-300 shadow-sm'
                      : 'bg-black/50 hover:bg-black/70 text-slate-100 border-white/20 hover:border-emerald-400/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. THANH KÉO THỜI GIAN TỐT NGHIỆP (TIMELINE GRADUATION FILTER 2003 - 2024) - NỀN TRONG SUỐT 50% */}
      <section
        className={`w-full rounded-2xl p-3 sm:px-4 sm:py-2.5 border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 shrink-0 ${
          isDark
            ? 'bg-slate-900/50 border-slate-700/60 text-slate-100'
            : 'bg-white/50 border-slate-200/80 text-slate-800'
        }`}
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Cột trái: Nhãn & Thanh kéo Range 2003 - 2024 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-black font-play tracking-tight">
              Hành trình năm (2003 – {exactYearFilter ?? maxYearFilter}):
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <span className="text-[10px] font-mono font-bold opacity-75">2003</span>
            <input
              type="range"
              min={2003}
              max={2024}
              value={exactYearFilter ?? maxYearFilter}
              onChange={(e) => {
                const yr = Number(e.target.value);
                setExactYearFilter(null);
                setMaxYearFilter(yr);
                setActiveCarouselIdx(0);
              }}
              className="w-full h-1.5 bg-emerald-500/30 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              title="Kéo thanh thời gian để lọc hành trình nâng cấp bằng cấp từ 2003 đến 2024"
            />
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {exactYearFilter ?? maxYearFilter}
            </span>
          </div>
        </div>

        {/* Cột phải: Các mốc năm tốt nghiệp nhanh */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => {
              SoundEngine.playTap();
              setExactYearFilter(null);
              setMaxYearFilter(2024);
              setActiveCarouselIdx(0);
            }}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition cursor-pointer shrink-0 ${
              exactYearFilter === null && maxYearFilter === 2024
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-2xs'
                : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-300/70 dark:border-white/15 hover:border-emerald-400'
            }`}
          >
            2003–2024
          </button>
          {GRADUATION_YEARS.map((yr) => {
            const isExact = exactYearFilter === yr;
            return (
              <button
                key={yr}
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  if (exactYearFilter === yr) {
                    setExactYearFilter(null);
                    setMaxYearFilter(2024);
                  } else {
                    setExactYearFilter(yr);
                  }
                  setActiveCarouselIdx(0);
                }}
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition cursor-pointer shrink-0 ${
                  isExact
                    ? 'bg-emerald-500 text-slate-950 font-black border-emerald-300 shadow-2xs scale-105'
                    : yr <= maxYearFilter && exactYearFilter === null
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                    : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-300/50 dark:border-white/10'
                }`}
                title={`Lọc chứng chỉ tốt nghiệp năm ${yr}`}
              >
                {yr}
              </button>
            );
          })}
          {(exactYearFilter !== null || maxYearFilter < 2024 || activeCategory !== 'all' || selectedRadarAxisId !== null) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-400/40 hover:bg-rose-500 hover:text-white transition cursor-pointer flex items-center gap-1 shrink-0"
              title="Đặt lại toàn bộ bộ lọc"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. BIỂU ĐỒ RADAR NĂNG LỰC HỌC VẤN (ACADEMIC COMPETENCY MATRIX) - HIỂN THỊ KHI CHỌN VIEW 'RADAR' HOẶC ĐANG LỌC TRỤC RADAR */}
      {(viewMode === 'radar' || selectedRadarAxisId !== null) && (
        <section
          className={`w-full rounded-2xl p-4 sm:p-5 border shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-5 items-center shrink-0 ${
            isDark
              ? 'bg-slate-900/50 border-cyan-500/40 text-slate-100'
              : 'bg-white/50 border-cyan-300/80 text-slate-800'
          }`}
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Cột Trái (5 cols): Biểu đồ Radar SVG tương tác */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Radar className="w-4 h-4 text-cyan-500 animate-pulse" />
              <h2 className="text-sm sm:text-base font-black font-play text-cyan-600 dark:text-cyan-300">
                {formatCardTitle('Ma trận năng lực')}
              </h2>
            </div>

            <div className="relative w-full max-w-[310px] aspect-square flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible select-none">
                <defs>
                  <linearGradient id="academicRadarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
                  </linearGradient>
                </defs>

                {/* Lưới đa giác đồng tâm */}
                {radarGeometry.gridLevels.map((pts, idx) => (
                  <polygon
                    key={idx}
                    points={pts}
                    fill="none"
                    stroke={isDark ? 'rgba(148, 163, 184, 0.22)' : 'rgba(71, 85, 105, 0.2)'}
                    strokeWidth="1"
                    strokeDasharray={idx < 3 ? '3 3' : undefined}
                  />
                ))}

                {/* Các trục từ tâm ra đỉnh */}
                {radarGeometry.dataPoints.map((d) => (
                  <line
                    key={`axis-${d.axis.id}`}
                    x1={radarGeometry.cx}
                    y1={radarGeometry.cy}
                    x2={d.outerX}
                    y2={d.outerY}
                    stroke={isDark ? 'rgba(148, 163, 184, 0.28)' : 'rgba(71, 85, 105, 0.25)'}
                    strokeWidth="1"
                  />
                ))}

                {/* Vùng đa giác năng lực học vấn */}
                <polygon
                  points={radarGeometry.polygonPoints}
                  fill="url(#academicRadarFill)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Các điểm nút tương tác & Nhãn trên đỉnh */}
                {radarGeometry.dataPoints.map((d) => {
                  const isSelected = selectedRadarAxisId === d.axis.id;
                  return (
                    <g
                      key={d.axis.id}
                      onClick={() => {
                        SoundEngine.playTap();
                        setSelectedRadarAxisId((prev) => (prev === d.axis.id ? null : d.axis.id));
                      }}
                      className="cursor-pointer group/node"
                    >
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r={isSelected ? 7 : 5}
                        fill={d.axis.color}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text
                        x={d.labelX}
                        y={d.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`text-[9.5px] font-bold font-play transition-all ${
                          isSelected
                            ? 'fill-emerald-500 font-black'
                            : isDark
                            ? 'fill-slate-200 group-hover/node:fill-cyan-300'
                            : 'fill-slate-800 group-hover/node:fill-cyan-700'
                        }`}
                      >
                        {d.axis.shortLabel} ({d.axis.score}%)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-[11px] text-center opacity-80 mt-1">
              💡 Nhấp vào đỉnh biểu đồ hoặc thẻ bên phải để lọc văn bằng tương ứng.
            </p>
          </div>

          {/* Cột Phải (7 cols): Sự giao thoa giữa Nền tảng Công nghệ & Năng lực Quản trị */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between gap-2 flex-wrap border-b border-black/10 dark:border-white/10 pb-2">
              <div>
                <h3 className="text-sm sm:text-base font-black font-play text-emerald-700 dark:text-emerald-300">
                  Sự kết hợp hài hòa: Nền tảng Công nghệ &amp; Năng lực Quản trị
                </h3>
                <p className="text-xs opacity-80">
                  Cấu trúc tri thức kép giúp thấu hiểu sâu kiến trúc kỹ thuật (CNTT, CCNA, MCSA) lẫn quản trị vận hành cấp cao (PMP, Risk, TTT).
                </p>
              </div>
              {selectedRadarAxisId && (
                <button
                  type="button"
                  onClick={() => setSelectedRadarAxisId(null)}
                  className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/40 cursor-pointer"
                >
                  Bỏ lọc trục Radar
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ACADEMIC_COMPETENCY_RADAR.map((axis: AcademicRadarAxis) => {
                const isSelected = selectedRadarAxisId === axis.id;
                return (
                  <div
                    key={axis.id}
                    onClick={() => {
                      SoundEngine.playTap();
                      setSelectedRadarAxisId((prev) => (prev === axis.id ? null : axis.id));
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 shadow-md scale-[1.01]'
                        : 'bg-white/40 dark:bg-slate-800/40 border-black/10 dark:border-white/10 hover:border-emerald-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold text-white"
                        style={{ backgroundColor: axis.color }}
                      >
                        {axis.pillarLabel}
                      </span>
                      <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
                        {axis.score}%
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-[13px] font-black font-play">
                      {axis.label}
                    </h4>

                    <p className="text-[11px] opacity-80 truncate">
                      Chứng chỉ: <span className="font-semibold">{axis.certs}</span>
                    </p>

                    <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden mt-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${axis.score}%`, backgroundColor: axis.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. NỘI DUNG CHÍNH: DẠNG LƯỚI / DẠNG VIEW TIÊU ĐỀ 2 CHỮ / TRÌNH CHIẾU (ĐỘ TRONG SUỐT NỀN 50%) */}
      {filteredCourses.length === 0 ? (
        <div
          className="w-full p-8 rounded-2xl border border-slate-300/60 dark:border-slate-700/60 text-center space-y-2"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <p className="text-sm font-bold font-play">Không tìm thấy chứng chỉ nào khớp với bộ lọc năm hoặc danh mục hiện tại.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer"
          >
            Hiển thị tất cả 14 chứng chỉ
          </button>
        </div>
      ) : viewMode === 'carousel' ? (
        /* CHẾ ĐỘ TRÌNH CHIẾU / BĂNG CHUYỀN (CAROUSEL VIEW - NỀN TRONG SUỐT 50%) */
        <div className="flex flex-col gap-3">
          {filteredCourses[safeCarouselIndex] && (() => {
            const activeCourse = filteredCourses[safeCarouselIndex];
            const verifyInfo = CREDENTIAL_VERIFICATION_MAP[activeCourse.id];
            return (
              <div
                className={`p-4 sm:p-6 rounded-2xl border shadow-xl flex flex-col lg:flex-row gap-5 items-stretch ${
                  isDark ? 'border-slate-700/70 text-white' : 'border-slate-200/90 text-slate-900'
                }`}
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Cột trái: Ảnh bằng cấp lớn */}
                <div className="lg:w-1/2 flex flex-col justify-between">
                  <div
                    onClick={() => handleOpenLightbox(activeCourse.image, activeCourse.title)}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/50 shadow-md border border-white/20 cursor-pointer group"
                  >
                    <img
                      src={activeCourse.image}
                      alt={activeCourse.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Phóng to toàn cảnh</span>
                      </span>
                    </div>
                  </div>

                  {/* Điều hướng Carousel mini */}
                  <div className="flex items-center justify-between gap-2 pt-3">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      Bằng cấp {safeCarouselIndex + 1} / {filteredCourses.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrevCarousel}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-white transition cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextCarousel}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-white transition cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cột phải: Thông tin sâu khóa học & Xác thực số */}
                <div className="lg:w-1/2 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40">
                        {getShortCategoryLabel(activeCourse.category)}
                      </span>
                      <span className="text-xs font-mono font-bold opacity-80">
                        Năm {activeCourse.year} • Mã {activeCourse.code}
                      </span>
                      {verifyInfo && (
                        <button
                          type="button"
                          onClick={(e) => handleOpenVerifyModal(activeCourse, e)}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500 hover:text-white transition cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Xác thực: {verifyInfo.credentialId}</span>
                        </button>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black font-play tracking-tight text-emerald-700 dark:text-emerald-400">
                      {formatCardTitle(activeCourse.title)}
                    </h2>

                    <p className="text-xs font-bold font-mono opacity-85">
                      Đơn vị cấp: {activeCourse.issuer}
                    </p>

                    <p className="text-xs sm:text-sm leading-relaxed font-medium">
                      {activeCourse.desc}
                    </p>

                    {/* Modules chuyên đề */}
                    <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-slate-950/40 space-y-1.5">
                      <span className="text-xs font-bold tracking-wider block text-emerald-700 dark:text-emerald-400">
                        Chuyên đề đào tạo cốt lõi
                      </span>
                      <ul className="space-y-1">
                        {activeCourse.modules.map((m, mIdx) => (
                          <li key={mIdx} className="text-xs flex items-start gap-1.5 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-1 flex-wrap">
                      {activeCourse.skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/60 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/10">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleOpenVerifyModal(activeCourse, e)}
                        className="px-3 py-2 rounded-xl text-xs font-bold font-play text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Tra cứu mã số</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenDetail(activeCourse)}
                        className="px-4 py-2 rounded-xl text-xs font-bold font-play text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <span>Xem toàn bộ hồ sơ</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* CHẾ ĐỘ LƯỚI (GRID VIEW & COMPACT 2-WORD TITLE VIEW) - NỀN TRONG SUỐT 50% */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
          {filteredCourses.map((course) => {
            const verifyInfo = CREDENTIAL_VERIFICATION_MAP[course.id];
            const isTwoWordMode = viewMode === 'compact';
            const displayTitle = isTwoWordMode
              ? formatTwoWordTitle(course)
              : formatCardTitle(course.title);

            return (
              <article
                key={course.id}
                onClick={() => handleOpenDetail(course)}
                className={`group relative rounded-2xl overflow-hidden p-3 sm:p-3.5 flex flex-col justify-between border select-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-700/70 hover:border-emerald-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-slate-100'
                    : 'bg-white/50 border-slate-200/90 hover:border-emerald-500/60 shadow-md text-slate-800'
                }`}
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Khối Ảnh Bằng Cấp / Khóa Học */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-950/50 shrink-0 border border-black/10 dark:border-white/10 shadow-xs mb-2.5 group/img">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                  {/* Badge Năm & Mã Khóa Học */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                    <span className="px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold bg-black/65 text-emerald-300 border border-white/20 backdrop-blur-md">
                      {course.year}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-semibold bg-black/55 text-white/95 border border-white/15 backdrop-blur-md">
                      {course.code}
                    </span>
                  </div>

                  {/* Nút phóng to ảnh nhanh */}
                  <button
                    type="button"
                    onClick={(e) => handleOpenLightbox(course.image, course.title, e)}
                    title="Phóng to ảnh bằng cấp"
                    className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/55 hover:bg-emerald-600 text-white flex items-center justify-center transition border border-white/20 backdrop-blur-md opacity-85 group-hover:opacity-100 cursor-pointer shadow-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Nhãn đơn vị cấp ở chân ảnh */}
                  <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white/95 truncate drop-shadow-sm font-sans">
                    {course.issuer}
                  </span>
                </div>

                {/* Phần Thân Card: Phân loại 2 chữ, Huy hiệu Xác thực số, Tiêu đề & Tóm tắt */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: course.accentColor }}
                        />
                        <span className="text-[10px] font-bold font-mono tracking-tight text-emerald-700 dark:text-emerald-400 truncate">
                          {getShortCategoryLabel(course.category)}
                        </span>
                      </div>

                      {/* Huy hiệu Chứng chỉ xác thực số (Credential Verification Badge) */}
                      {verifyInfo && (
                        <button
                          type="button"
                          onClick={(e) => handleOpenVerifyModal(course, e)}
                          title={`Kiểm tra mã xác thực số: ${verifyInfo.credentialId} (${verifyInfo.registryName})`}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-500/15 hover:bg-cyan-500 text-cyan-700 dark:text-cyan-300 hover:text-white border border-cyan-500/30 transition cursor-pointer shrink-0"
                        >
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Xác thực</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        className="font-black font-play text-sm sm:text-[14.5px] leading-tight tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      >
                        {displayTitle}
                      </h3>
                      {!isTwoWordMode && verifyInfo && (
                        <span className="text-[9.5px] font-mono font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                          {verifyInfo.twoWordTitle}
                        </span>
                      )}
                    </div>

                    <p className={`text-[11px] leading-snug line-clamp-2 mt-1.5 font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {course.desc}
                    </p>
                  </div>

                  {/* Tags kỹ năng cốt lõi & Cụm nút hành động */}
                  <div className="pt-2 border-t border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-1 flex-wrap mb-2">
                      {course.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(course)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold font-play flex items-center justify-center gap-1 transition border bg-white/50 hover:bg-emerald-500/20 text-slate-800 hover:text-emerald-800 dark:bg-slate-800/50 dark:hover:bg-emerald-950/60 dark:text-slate-100 dark:hover:text-emerald-300 border-slate-300/80 dark:border-white/15 cursor-pointer shadow-2xs group-hover:border-emerald-400/60"
                      >
                        <span>Xem chi tiết bằng cấp</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>

                      {verifyInfo && (
                        <button
                          type="button"
                          onClick={(e) => handleOpenVerifyModal(course, e)}
                          title="Tra cứu xác thực chứng chỉ trực tuyến"
                          className="p-1.5 rounded-xl border border-cyan-400/40 bg-cyan-500/15 hover:bg-cyan-600 text-cyan-700 dark:text-cyan-300 hover:text-white transition cursor-pointer shrink-0"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 5. POPUP KIỂM TRA MÃ CHỨNG CHỈ & TRA CỨU TRỰC TUYẾN (CREDENTIAL VERIFICATION MODAL) */}
      {verifyingCourse && (() => {
        const verifyInfo = CREDENTIAL_VERIFICATION_MAP[verifyingCourse.id];
        if (!verifyInfo) return null;
        const isCopied = copiedCredentialId === verifyInfo.credentialId;

        return (
          <div
            onClick={() => setVerifyingCourse(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md rounded-2xl border p-5 shadow-2xl space-y-4 ${
                isDark
                  ? 'bg-slate-900/95 border-cyan-400/50 text-white shadow-[0_0_45px_rgba(6,182,212,0.25)]'
                  : 'bg-white/95 border-cyan-300 text-slate-900 shadow-2xl'
              }`}
              style={{ backdropFilter: 'blur(20px)' }}
            >
              <div className="flex items-start justify-between gap-3 border-b border-black/10 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-500 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                      Chứng chỉ xác thực số • Digital Credential
                    </span>
                    <h3 className="text-base font-black font-play">
                      {formatCardTitle(verifyingCourse.title)}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setVerifyingCourse(null)}
                  className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Mã chứng chỉ số:</span>
                    <div className="flex items-center gap-1.5">
                      <code className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-black text-xs border border-emerald-400/30">
                        {verifyInfo.credentialId}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyCredential(verifyInfo.credentialId)}
                        className="p-1 rounded-md bg-white dark:bg-slate-700 hover:bg-emerald-500 hover:text-white border border-slate-300 dark:border-slate-600 transition cursor-pointer"
                        title="Sao chép mã chứng chỉ"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Tổ chức cấp:</span>
                    <span className="font-bold text-right">{verifyInfo.organization}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Hệ thống đăng ký:</span>
                    <span className="font-semibold text-cyan-600 dark:text-cyan-300 text-right">{verifyInfo.registryName}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Năm cấp &amp; Mã hồ sơ:</span>
                    <span className="font-mono font-bold">Năm {verifyingCourse.year} ({verifyingCourse.code})</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Trạng thái xác thực:</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{verifyInfo.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={verifyInfo.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundEngine.playTap()}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold font-play text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <span>Tra cứu trực tuyến</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const img = verifyingCourse.image;
                    const title = verifyingCourse.title;
                    setVerifyingCourse(null);
                    handleOpenLightbox(img, title);
                  }}
                  className="py-2 px-3 rounded-xl text-xs font-bold font-play border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer flex items-center gap-1"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem bản gốc</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. MODAL CHI TIẾT BẰNG CẤP CHUYÊN SÂU (COURSE DETAIL MODAL) */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-y-auto no-scrollbar border shadow-2xl flex flex-col justify-between p-4 sm:p-6 ${
              isDark
                ? 'bg-slate-900 border-emerald-400/50 text-white shadow-[0_0_50px_rgba(16,185,129,0.25)]'
                : 'bg-white border-emerald-300 text-slate-900 shadow-2xl'
            }`}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-400/30">
                    {getShortCategoryLabel(selectedCourse.category)}
                  </span>
                  <span className="text-[11px] font-mono font-bold opacity-75">
                    Năm {selectedCourse.year} • Mã: {selectedCourse.code}
                  </span>
                  {CREDENTIAL_VERIFICATION_MAP[selectedCourse.id] && (
                    <button
                      type="button"
                      onClick={(e) => handleOpenVerifyModal(selectedCourse, e)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500 hover:text-white transition cursor-pointer"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>Mã số: {CREDENTIAL_VERIFICATION_MAP[selectedCourse.id].credentialId}</span>
                    </button>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-black font-play text-emerald-700 dark:text-emerald-400">
                  {formatCardTitle(selectedCourse.title)}
                </h3>
                <p className="text-xs font-bold opacity-80">
                  {selectedCourse.issuer}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-white/20 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950 dark:text-slate-300 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Modal */}
            <div className="py-3 space-y-3.5 flex-1 min-h-0 overflow-y-auto no-scrollbar">
              {/* Hình bằng cấp có thể bấm phóng to */}
              <div
                onClick={() => handleOpenLightbox(selectedCourse.image, selectedCourse.title)}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black shadow-md border border-black/15 dark:border-white/15 cursor-pointer group"
              >
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Bấm để phóng to chứng chỉ</span>
                  </span>
                </div>
              </div>

              {/* Tóm tắt mô tả */}
              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                  Tổng quan mục tiêu giá trị
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  {selectedCourse.desc}
                </p>
              </div>

              {/* Danh sách chuyên đề */}
              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider block text-emerald-600 dark:text-emerald-400">
                  Học phần chuyên đề đào tạo
                </span>
                <ul className="space-y-1.5">
                  {selectedCourse.modules.map((mod, idx) => (
                    <li key={idx} className="text-xs leading-snug flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ứng dụng thực tế */}
              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                  Ứng dụng trong thực chiến quản trị
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  {selectedCourse.application}
                </p>
              </div>

              {/* Kỹ năng đạt được */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1.5 text-slate-500 dark:text-slate-400">
                  Năng lực kỹ năng đạt được:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedCourse.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 shrink-0 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(selectedCourse.image, selectedCourse.title)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem ảnh bằng cấp</span>
                </button>

                {CREDENTIAL_VERIFICATION_MAP[selectedCourse.id] && (
                  <button
                    type="button"
                    onClick={(e) => handleOpenVerifyModal(selectedCourse, e)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Kiểm tra mã chứng chỉ</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold font-play border border-slate-300 dark:border-white/20 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. LIGHTBOX PHÓNG TO ẢNH BẰNG CẤP FULL MÀN HÌNH */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in zoom-in-95 duration-200 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[92vh] flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/20 hover:bg-rose-600 text-white transition cursor-pointer"
              title="Đóng Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt={lightboxTitle}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/20 select-none pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-3 text-sm font-play font-bold text-white/90 drop-shadow-md text-center">
              {lightboxTitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
