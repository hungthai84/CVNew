'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Briefcase,
  Cpu,
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

// Các mốc năm tốt nghiệp thực tế từ 2005 đến 2026
const GRADUATION_YEARS = [2005, 2006, 2007, 2013, 2014, 2015, 2016, 2017, 2019, 2026] as const;

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

function renderCategoryIcon(category: string, className = 'w-3.5 h-3.5 shrink-0') {
  switch (category) {
    case 'degree':
      return <GraduationCap className={className} />;
    case 'management':
      return <Briefcase className={className} />;
    case 'tech':
      return <Cpu className={className} />;
    case 'skills':
      return <Sparkles className={className} />;
    case 'all':
    default:
      return <LayoutGrid className={className} />;
  }
}

export const EducationView: React.FC<EducationViewProps> = ({ currentTheme }) => {
  const isDark = currentTheme === 'dark-neon';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  // 4 chế độ xem với tiêu đề nút đúng 2 chữ: 'grid' (Dạng lưới) | 'compact' (Tiêu đề) | 'carousel' (Trình chiếu) | 'radar' (Ma trận)
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'carousel' | 'radar'>('grid');
  // Bộ lọc năm tốt nghiệp Timeline (2005 - 2026)
  const [maxYearFilter, setMaxYearFilter] = useState<number>(2026);
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
    setMaxYearFilter(2026);
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
      {/* 1. HERO BANNER: HỌC VẤN & BẰNG CẤP CHUYÊN MÔN */}
      <section
        className={`relative w-full rounded-2xl overflow-hidden border shadow-lg shrink-0 transition-all ${
          isDark
            ? 'bg-slate-900/60 border-cyan-500/40 text-slate-100'
            : 'bg-white/60 border-cyan-300/80 text-slate-800'
        }`}
        style={{
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="relative h-28 sm:h-32 md:h-36 w-full overflow-hidden">
          <img
            src="/images/education/hero-banner.png"
            alt="Học Vấn & Bằng Cấp"
            className="w-full h-full object-cover object-center filter brightness-[0.88] dark:brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent flex items-center justify-between p-4 sm:p-5">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 backdrop-blur-md flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Hồ Sơ Học Vấn &amp; Năng Lực Cốt Lõi</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 backdrop-blur-md">
                  14 Chứng chỉ chính quy
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl md:text-[26px] font-black font-play text-white drop-shadow-md">
                HỌC VẤN &amp; BẰNG CẤP CHUYÊN MÔN
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-200/90 font-medium line-clamp-1 drop-shadow">
                Sự giao thoa giữa Cử nhân CNTT, Kỹ thuật Hạ tầng Cisco &amp; Microsoft, Quản trị PMP và Đào tạo Nhân sự.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleBannerMute}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white/90 border border-white/20 backdrop-blur-md transition cursor-pointer"
                title={isBannerMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              >
                {isBannerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THANH CÔNG CỤ: DANH MỤC 2 CHỮ, CHẾ ĐỘ XEM & TIMELINE NĂM */}
      <section
        className={`w-full p-2.5 sm:p-3 rounded-2xl border shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 shrink-0 ${
          isDark
            ? 'bg-slate-900/50 border-slate-700/70 text-slate-100'
            : 'bg-white/50 border-slate-200/90 text-slate-800'
        }`}
        style={{
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Bộ lọc danh mục 2 chữ */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {TWO_WORD_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all'
              ? EDUCATION_COURSES.length
              : EDUCATION_COURSES.filter((c) => c.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500 scale-[1.02]'
                    : isDark
                    ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                    : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {renderCategoryIcon(cat.id, 'w-3.5 h-3.5')}
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/10 dark:bg-white/10 opacity-80'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cụm Chế độ xem (4 chế độ 2 chữ) & Nút Đặt lại */}
        <div className="flex items-center gap-1.5 self-end md:self-auto shrink-0 flex-wrap">
          <div className="flex items-center rounded-xl p-0.5 bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('grid');
              }}
              title="Xem dạng lưới đầy đủ"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-play flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Dạng lưới</span>
            </button>

            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('compact');
              }}
              title="Xem tiêu đề 2 chữ súc tích"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-play flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tiêu đề</span>
            </button>

            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('carousel');
              }}
              title="Xem trình chiếu toàn cảnh"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-play flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trình chiếu</span>
            </button>

            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setViewMode('radar');
              }}
              title="Xem ma trận năng lực Radar"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-play flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>Ma trận</span>
            </button>
          </div>

          {(activeCategory !== 'all' || selectedRadarAxisId !== null || exactYearFilter !== null) && (
            <button
              type="button"
              onClick={handleResetFilters}
              title="Đặt lại tất cả bộ lọc"
              className="p-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-slate-800/60 hover:bg-rose-500 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
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
              <motion.article
                key={course.id}
                layoutId={`education-card-${course.id}`}
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
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 min-w-0">
                        <span style={{ color: course.accentColor }} className="shrink-0">
                          {renderCategoryIcon(course.category, 'w-3 h-3')}
                        </span>
                        <span className="text-[10px] font-bold font-mono tracking-tight text-emerald-700 dark:text-emerald-300 truncate">
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
              </motion.article>
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

      {/* 6. EXPANDED COURSE DETAIL CARD (Kích thước chiếm chính xác toàn bộ vùng lưới, hiệu ứng Card Expansion Transition như thẻ dịch vụ) */}
      {selectedCourse && (() => {
        const course = selectedCourse;
        const verifyInfo = CREDENTIAL_VERIFICATION_MAP[course.id];
        return (
          <motion.div
            key={`education-detail-${course.id}`}
            layoutId={`education-card-${course.id}`}
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{
              duration: 0.55,
              ease: [0.25, 1, 0.5, 1],
            }}
            className={`theme-pastel-card w-full h-full flex-1 min-h-0 rounded-[14px] border p-3.5 sm:p-4 lg:p-5 shadow-[0_16px_40px_-6px_rgba(15,23,42,0.18),0_6px_16px_-2px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_0_32px_rgba(16,185,129,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.18)] relative overflow-hidden flex flex-col justify-between text-left font-play transition-all duration-300 ${
              isDark ? 'bg-slate-900 border-emerald-400/50 text-white' : 'bg-white border-emerald-300 text-slate-900'
            }`}
          >
            {/* Soft ambient background glows */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full pointer-events-none opacity-80 blur-3xl bg-emerald-500/20" />
            <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/40 dark:bg-white/5 blur-2xl pointer-events-none" />

            {/* Header Bar: Huy hiệu tròn + Tiêu đề + Mũi tên > + Nút Quay lại & Đóng X */}
            <div className="w-full flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-black/10 dark:border-white/10 relative z-10 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2.5 min-w-0 flex-wrap sm:flex-nowrap">
                <motion.div
                  layoutId={`education-icon-${course.id}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center text-white shadow-md border border-white/60 bg-emerald-600"
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                </motion.div>

                <motion.h3
                  layoutId={`education-title-${course.id}`}
                  className="text-[18px] sm:text-[21px] lg:text-[23px] font-black font-play leading-none tracking-tight truncate flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
                  title={course.title}
                >
                  <span>{formatCardTitle(course.title)}</span>
                  <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
                </motion.h3>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border shadow-2xs bg-emerald-100/90 dark:bg-slate-800/90 border-emerald-300/80 dark:border-white/15 text-emerald-800 dark:text-emerald-300 shrink-0">
                  <span>Năm {course.year} • {course.code}</span>
                </span>
              </div>

              {/* Right: Quay lại & Đóng X */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setSelectedCourse(null);
                  }}
                  className="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                  title="Quay lại danh sách học vấn"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Quay lại danh sách</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setSelectedCourse(null);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center cursor-pointer active:scale-95 shrink-0 border border-slate-300/60 dark:border-white/15"
                  title="Đóng thẻ (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body of detail view */}
            <div className="py-3 space-y-3.5 flex-1 min-h-0 overflow-y-auto no-scrollbar relative z-10">
              <div
                onClick={() => handleOpenLightbox(course.image, course.title)}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black shadow-md border border-black/15 dark:border-white/15 cursor-pointer group"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Bấm để phóng to chứng chỉ</span>
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                  Tổng quan mục tiêu giá trị
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  {course.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider block text-emerald-600 dark:text-emerald-400">
                  Học phần chuyên đề đào tạo
                </span>
                <ul className="space-y-1.5">
                  {course.modules.map((mod, idx) => (
                    <li key={idx} className="text-xs leading-snug flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                  Ứng dụng trong thực chiến quản trị
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  {course.application}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1.5 text-slate-500 dark:text-slate-400">
                  Năng lực kỹ năng đạt được:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {course.skills.map((sk, idx) => (
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

            {/* Footer */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 shrink-0 flex-wrap relative z-10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(course.image, course.title)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem ảnh bằng cấp</span>
                </button>

                {CREDENTIAL_VERIFICATION_MAP[course.id] && (
                  <button
                    type="button"
                    onClick={(e) => handleOpenVerifyModal(course, e)}
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
          </motion.div>
        );
      })()}

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

export default EducationView;
