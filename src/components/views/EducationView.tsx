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
  Brain,
} from 'lucide-react';
import { SkillsView } from './SkillsView';
import { cn } from '@/lib/utils';
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

  const [mainSection, setMainSection] = useState<'education' | 'skills'>('education');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Chế độ xem: cố định duy nhất 'grid'
  const [viewMode] = useState<'grid'>('grid');
  // Bộ lọc năm tốt nghiệp Timeline (2005 - 2026)
  const [maxYearFilter, setMaxYearFilter] = useState<number>(2026);
  const [exactYearFilter, setExactYearFilter] = useState<number | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<EducationCourse | null>(null);
  const [verifyingCourse, setVerifyingCourse] = useState<EducationCourse | null>(null);
  const [copiedCredentialId, setCopiedCredentialId] = useState<string | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [isBannerMuted, setIsBannerMuted] = useState<boolean>(true);
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);

  const bannerVideoRef = useRef<HTMLVideoElement | null>(null);

  // Lọc danh sách theo danh mục + năm tốt nghiệp (2003 - 2024)
  const filteredCourses = useMemo(() => {
    return EDUCATION_COURSES.filter((c) => {
      const courseYear = parseInt(c.year, 10) || 2024;
      const matchCategory = activeCategory === 'all' || c.category === activeCategory;
      const matchYear = exactYearFilter !== null ? courseYear === exactYearFilter : courseYear <= maxYearFilter;
      return matchCategory && matchYear;
    });
  }, [activeCategory, maxYearFilter, exactYearFilter]);

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
      {/* Cụm Tabs Chuyển Đổi Nhanh: 04. Học Vấn & 07. Khung Kỹ Năng SWOT */}
      <div className="w-full flex items-center justify-between p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs shrink-0">
        <button
          type="button"
          onClick={() => {
            SoundEngine.playTap();
            setMainSection('education');
          }}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold font-play flex items-center justify-center gap-2 transition cursor-pointer",
            mainSection === 'education'
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <GraduationCap className="w-4 h-4" />
          <span>05. Hồ Sơ Học Vấn &amp; Bằng Cấp (14)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            SoundEngine.playTap();
            setMainSection('skills');
          }}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold font-play flex items-center justify-center gap-2 transition cursor-pointer",
            mainSection === 'skills'
              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Brain className="w-4 h-4" />
          <span>07. Khung Năng Lực &amp; Kỹ Năng SWOT (7.1 - 7.5)</span>
        </button>
      </div>

      {mainSection === 'skills' ? (
        <div className="w-full flex-1 min-h-0">
          <SkillsView currentTheme={currentTheme} />
        </div>
      ) : (
        <>
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
        <div className="relative min-h-[185px] sm:min-h-[210px] w-full overflow-hidden flex flex-col justify-between">
          <img
            src="https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042016/H%E1%BB%8Dc_v%E1%BA%A5n.png"
            alt="Học Vấn & Bằng Cấp"
            className="absolute inset-0 w-full h-full object-cover object-[75%_22%] sm:object-[center_20%] filter brightness-100 dark:brightness-[0.95] contrast-[1.05] opacity-95 dark:opacity-90 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-black/15 pointer-events-none z-0" />
          
          <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 backdrop-blur-md flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Hồ Sơ Học Vấn &amp; Chứng Chỉ Chuyên Môn</span>
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

          {/* Integrated Toolbar Section Inside Banner */}
          <div className="relative z-20 w-full p-2.5 sm:p-3 bg-black/20 backdrop-blur-md border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
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
                        : 'bg-white/60 hover:bg-white text-slate-700 border border-slate-200'
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

            {/* Cụm Nút Đặt lại */}
            <div className="flex items-center gap-1.5 self-end md:self-auto shrink-0 flex-wrap">
              {(activeCategory !== 'all' || exactYearFilter !== null) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  title="Đặt lại tất cả bộ lọc"
                  className="px-3 py-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-rose-500 text-white transition cursor-pointer text-xs font-bold font-play flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại bộ lọc</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* 4. NỘI DUNG CHÍNH: DẠNG LƯỚI HOẶC CHI TIẾT (NỀN TRONG SUỐT 50%) */}
      {filteredCourses.length === 0 ? (
        <div
          className="w-full p-8 rounded-2xl border border-slate-300/60 dark:border-slate-700/60 text-center space-y-2"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <p className="text-sm font-bold font-play">Không tìm thấy chứng chỉ nào khớp với bộ lọc hiện tại.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer"
          >
            Hiển thị tất cả 14 chứng chỉ
          </button>
        </div>
      ) : selectedCourse ? (
        /* Rendered below as a conditional block to maintain clean logic */
        null
      ) : (
        /* CHẾ ĐỘ LƯỚI (GRID VIEW) - NỀN TRONG SUỐT 50% */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
          {filteredCourses.map((course) => {
            const verifyInfo = CREDENTIAL_VERIFICATION_MAP[course.id];
            const displayTitle = formatCardTitle(course.title);

            return (
              <motion.article
                key={course.id}
                layoutId={`education-card-${course.id}`}
                onClick={() => handleOpenDetail(course)}
                className={`group relative rounded-2xl overflow-hidden p-3 sm:p-3.5 flex flex-col justify-between border select-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-700/70 hover:border-emerald-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-slate-100'
                    : 'bg-white/90 border-slate-200/90 hover:border-emerald-500/60 shadow-md text-slate-800'
                }`}
                style={{
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
                      {verifyInfo && (
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
            className={`theme-pastel-card w-full h-full flex-1 min-h-0 rounded-[12px] border p-3.5 sm:p-4 lg:p-5 shadow-[0_16px_40px_-6px_rgba(15,23,42,0.18),0_6px_16px_-2px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_0_32px_rgba(16,185,129,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.18)] relative overflow-hidden flex flex-col justify-between text-left font-play transition-all duration-300 ${
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div
                  onClick={() => handleOpenLightbox(course.courseImg || course.image, course.title)}
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black shadow-md border border-black/15 dark:border-white/15 cursor-pointer group"
                >
                  <img
                    src={course.courseImg || course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 text-white text-[10px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Xem ảnh khóa học</span>
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => handleOpenLightbox(course.certImg || course.image, `Bằng cấp/Chứng chỉ: ${course.title}`)}
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black shadow-md border border-black/15 dark:border-white/15 cursor-pointer group"
                >
                  <img
                    src={course.certImg || course.image}
                    alt="Chứng chỉ"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Award className="w-3.5 h-3.5" />
                      <span>Xem bằng cấp chính quy</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                    Hình thức & Định hướng học tập
                  </span>
                  <p className="text-xs leading-relaxed font-bold text-slate-800 dark:text-slate-200">
                    {course.type}
                  </p>
                  <p className="text-[11px] leading-relaxed mt-1 opacity-90 italic">
                    {course.orientation}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                    Trọng tâm chuyên môn
                  </span>
                  <p className="text-xs leading-relaxed font-medium">
                    {course.focus}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider block text-emerald-600 dark:text-emerald-400">
                  Nội dung môn học & Học phần chuyên đề
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {course.modules.map((mod, idx) => (
                    <li key={idx} className="text-[11.5px] leading-snug flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                    Áp dụng thực tiễn công việc
                  </span>
                  <p className="text-xs leading-relaxed font-medium">
                    {course.application}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                    Kết quả & Chứng nhận đạt được
                  </span>
                  <p className="text-xs leading-relaxed font-black text-emerald-700 dark:text-emerald-300">
                    {course.result}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1.5 text-slate-500 dark:text-slate-400">
                  Năng lực kỹ năng đã được chuẩn hóa:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {course.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10.5px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
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
                  onClick={() => handleOpenLightbox(course.certImg || course.image, `Bằng cấp: ${course.title}`)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-sm"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Xem văn bằng</span>
                </button>

                {CREDENTIAL_VERIFICATION_MAP[course.id] && (
                  <button
                    type="button"
                    onClick={(e) => handleOpenVerifyModal(course, e)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Xác thực số</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold font-play border border-slate-300 dark:border-white/20 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
              >
                Đóng chi tiết
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
        </>
      )}
    </div>
  );
};

export default EducationView;
