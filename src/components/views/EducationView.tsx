'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Building2,
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
  Calendar,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  Award,
  Briefcase,
  Cpu,
  BookOpen,
  Target,
  ArrowLeft,
  Activity,
  TrendingUp,
  Palette,
  Layout,
  BarChart3,
  Database,
  ShieldAlert,
  CheckSquare,
  Kanban,
  Crown,
  UserCheck,
  Radio,
  PhoneCall,
  Headphones,
  HeartHandshake,
  Bot,
  ClipboardCheck,
  FileCheck,
  Globe,
  MessagesSquare,
  BadgeDollarSign,
  Coins,
  AlertTriangle,
  Tag,
  RotateCw,
  Users,
  Search,
} from 'lucide-react';
import {
  EDUCATION_COURSES,
  EducationCourse,
  CREDENTIAL_VERIFICATION_MAP,
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

// Tự động gán Icon chuyên môn chuẩn xác theo tên từng Tag Kỹ Năng
export function getTagIcon(skillName: string, className = 'w-3 h-3 shrink-0') {
  const s = skillName.toLowerCase();

  // Thiết kế / Giao diện / Figma
  if (
    s.includes('figma') ||
    s.includes('ui') ||
    s.includes('ux') ||
    s.includes('design') ||
    s.includes('wireframe') ||
    s.includes('prototype') ||
    s.includes('journey')
  ) {
    return <Palette className={className} />;
  }

  // Dữ liệu / Phân tích / Báo cáo BI
  if (
    s.includes('data') ||
    s.includes('power bi') ||
    s.includes('analytics') ||
    s.includes('bi') ||
    s.includes('statistical') ||
    s.includes('forecast')
  ) {
    return <BarChart3 className={className} />;
  }

  // Quản trị rủi ro / An toàn / Bảo mật / BCP
  if (
    s.includes('risk') ||
    s.includes('rủi ro') ||
    s.includes('bcp') ||
    s.includes('drp') ||
    s.includes('security') ||
    s.includes('compliance') ||
    s.includes('protocol') ||
    s.includes('bảo mật')
  ) {
    return <ShieldCheck className={className} />;
  }

  // Dự án / PMP / Agile / Scrum / OKR
  if (
    s.includes('pmp') ||
    s.includes('agile') ||
    s.includes('scrum') ||
    s.includes('project') ||
    s.includes('dự án') ||
    s.includes('planning') ||
    s.includes('budget') ||
    s.includes('allocation') ||
    s.includes('stakeholder')
  ) {
    return <CheckSquare className={className} />;
  }

  // Lãnh đạo cấp cao / Tầm nhìn / Chiến lược / Văn hóa
  if (
    s.includes('leadership') ||
    s.includes('lãnh đạo') ||
    s.includes('executive') ||
    s.includes('strategic') ||
    s.includes('vision') ||
    s.includes('culture') ||
    s.includes('governance')
  ) {
    return <Crown className={className} />;
  }

  // Đội ngũ / Huấn luyện / Quản trị nhân sự
  if (
    s.includes('team') ||
    s.includes('coaching') ||
    s.includes('đội ngũ') ||
    s.includes('nhân sự') ||
    s.includes('kpi') ||
    s.includes('performance') ||
    s.includes('motivation') ||
    s.includes('conflict')
  ) {
    return <Users className={className} />;
  }

  // Viễn thông / Call Center / Mạng / VoIP / CCNA / MCSA
  if (
    s.includes('call center') ||
    s.includes('telecom') ||
    s.includes('viễn thông') ||
    s.includes('voip') ||
    s.includes('ccna') ||
    s.includes('mcsa') ||
    s.includes('network') ||
    s.includes('hạ tầng')
  ) {
    return <Radio className={className} />;
  }

  // CRM / Trải nghiệm khách hàng / CSAT / NPS
  if (
    s.includes('crm') ||
    s.includes('csat') ||
    s.includes('khách hàng') ||
    s.includes('cx') ||
    s.includes('nps') ||
    s.includes('ces') ||
    s.includes('fcr') ||
    s.includes('retention')
  ) {
    return <Headphones className={className} />;
  }

  // AI / Tự động hóa / Bot / Công nghệ
  if (
    s.includes('ai') ||
    s.includes('tự động') ||
    s.includes('automation') ||
    s.includes('bot') ||
    s.includes('digital') ||
    s.includes('tech')
  ) {
    return <Cpu className={className} />;
  }

  // QA / SOP / Quy chuẩn / Kiểm định chất lượng
  if (
    s.includes('qa') ||
    s.includes('sop') ||
    s.includes('quy chuẩn') ||
    s.includes('quality') ||
    s.includes('audit') ||
    s.includes('iso') ||
    s.includes('copc')
  ) {
    return <FileCheck className={className} />;
  }

  // Ngôn ngữ / Tiếng Anh / Giao tiếp
  if (
    s.includes('english') ||
    s.includes('tiếng anh') ||
    s.includes('toeic') ||
    s.includes('ngôn ngữ') ||
    s.includes('communication') ||
    s.includes('giao tiếp')
  ) {
    return <Globe className={className} />;
  }

  // Tài chính / Chi phí / Đầu tư / ROI / TCO
  if (
    s.includes('finance') ||
    s.includes('tài chính') ||
    s.includes('tco') ||
    s.includes('roi') ||
    s.includes('cost') ||
    s.includes('ngân sách')
  ) {
    return <BadgeDollarSign className={className} />;
  }

  // Thử nghiệm A/B Testing, giải pháp
  if (s.includes('testing') || s.includes('kiểm thử') || s.includes('giải pháp')) {
    return <Target className={className} />;
  }

  // Mặc định: Sparkles
  return <Sparkles className={className} />;
}

export const EducationView: React.FC<EducationViewProps> = ({ currentTheme }) => {
  const isDark = currentTheme === 'dark-neon';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'carousel'>('compact');
  // Bộ lọc năm tốt nghiệp Timeline (2003 - 2024)
  const [maxYearFilter, setMaxYearFilter] = useState<number>(2024);
  const [exactYearFilter, setExactYearFilter] = useState<number | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<EducationCourse | null>(null);
  const [verifyingCourse, setVerifyingCourse] = useState<EducationCourse | null>(null);
  const [copiedCredentialId, setCopiedCredentialId] = useState<string | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);

  // Hỗ trợ phím Escape đóng thẻ mở rộng quay lại lưới học vấn ban đầu (chuẩn A11y & format giống trang dịch vụ)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (verifyingCourse) {
          setVerifyingCourse(null);
        } else if (selectedCourse) {
          SoundEngine.playTap();
          setSelectedCourse(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCourse, verifyingCourse, isLightboxOpen]);

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
    SoundEngine.playPageFlip();
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
    setActiveCarouselIdx(0);
  };

  const safeCarouselIndex = filteredCourses.length > 0 ? Math.min(activeCarouselIdx, filteredCourses.length - 1) : 0;

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-3.5 overflow-hidden select-none text-left relative">
      <AnimatePresence mode="wait">
        {!selectedCourse ? (
          /* ========================================================================= */
          /* MẶT CHÍNH: LƯỚI HỌC VẤN / COMPACT VIEW / TRÌNH CHIẾU                      */
          /* ========================================================================= */
          <motion.div
            key="education-list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex flex-col gap-3 sm:gap-3.5 overflow-y-auto no-scrollbar pb-6"
          >
            {/* HERO BANNER PANORAMA NHƯ HÌNH ĐÍNH KÈM */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-white/10 shrink-0 aspect-[16/4] sm:aspect-[16/3.3] max-h-[160px] sm:max-h-[195px] bg-slate-900">
              <img
                src="/images/education/hero-banner.png"
                alt="Banner Học Vấn & Chứng Chỉ Chuyên Ngành"
                className="w-full h-full object-cover object-center"
              />
            </div>
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
              /* CHẾ ĐỘ TRÌNH CHIẾU / BĂNG CHUYỀN (CAROUSEL VIEW) */
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
                          </div>

                          {/* Tiêu đề trùng màu icon (activeCourse.accentColor) */}
                          <h2
                            className="text-xl sm:text-2xl font-black font-play tracking-tight transition-colors"
                            style={{ color: activeCourse.accentColor || '#059669' }}
                          >
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
                            <span
                              className="text-xs font-bold tracking-wider block"
                              style={{ color: activeCourse.accentColor }}
                            >
                              Chuyên đề đào tạo cốt lõi
                            </span>
                            <ul className="space-y-1">
                              {activeCourse.modules.map((m, mIdx) => (
                                <li key={mIdx} className="text-xs flex items-start gap-1.5 font-medium">
                                  <CheckCircle2
                                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                    style={{ color: activeCourse.accentColor }}
                                  />
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                          {/* Tags kỹ năng với Icon tương ứng */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {activeCourse.skills.map((s, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/60 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/10"
                              >
                                <span style={{ color: activeCourse.accentColor }}>
                                  {getTagIcon(s, 'w-3 h-3 shrink-0')}
                                </span>
                                <span>{s}</span>
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() => handleOpenDetail(activeCourse)}
                              className="px-4 py-2 rounded-xl text-xs font-bold font-play text-white shadow-md transition cursor-pointer flex items-center gap-1.5 shrink-0"
                              style={{
                                backgroundColor: activeCourse.accentColor || '#059669',
                              }}
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
              /* CHẾ ĐỘ LƯỚI (GRID VIEW & COMPACT 2-WORD TITLE VIEW) */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5 items-stretch">
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
                      className={`group relative rounded-[14px] overflow-hidden p-3 sm:p-3.5 flex flex-col justify-between border select-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                        isDark
                          ? 'bg-slate-900/50 border-slate-700/70 hover:border-emerald-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-slate-100'
                          : 'bg-white/75 border-slate-200/90 hover:border-emerald-500/60 shadow-md text-slate-800'
                      }`}
                      style={{
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.55)' : 'rgba(255, 255, 255, 0.78)',
                        backdropFilter: 'blur(16px)',
                        ['--card-accent-color' as string]: course.accentColor,
                      }}
                      title="Bấm để xem chi tiết bằng cấp (Format giống trang dịch vụ)"
                    >
                      {/* Khối Ảnh Bằng Cấp / Khóa Học */}
                      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/50 shrink-0 border border-black/10 dark:border-white/10 shadow-xs mb-2 group/img">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                        {/* Huy hiệu Năm và Mã chứng chỉ trên góc ảnh */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold bg-black/65 text-emerald-300 border border-white/20 backdrop-blur-md shadow-xs">
                            <Calendar className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
                            <span>Năm {course.year}</span>
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
                      <div className="flex-1 flex flex-col justify-between space-y-1.5 min-h-0">
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
                          </div>

                          {/* TIÊU ĐỀ GIỐNG MÀU ICON (course.accentColor) & KÍCH THƯỚC BẰNG THẺ DỊCH VỤ */}
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className="font-black font-play text-[17px] sm:text-[18.5px] lg:text-[19.5px] leading-snug tracking-tight transition-opacity flex items-start gap-1.5 min-w-0 hover:opacity-85 line-clamp-2 min-h-[2.5em]"
                              style={{ color: course.accentColor }}
                            >
                              <span
                                className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                                style={{ color: course.accentColor }}
                              >
                                {renderCategoryIcon(course.category, 'w-3.5 h-3.5')}
                              </span>
                              <span className="line-clamp-2 break-words">
                                {formatCardTitle(course.title).split(/\s+/).slice(0, 6).join(' ')}
                              </span>
                            </h3>
                          </div>

                          <p className={`text-[11px] leading-snug line-clamp-2 mt-1 font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            {course.desc}
                          </p>
                        </div>

                        {/* Tags kỹ năng cốt lõi dựa vào tên tag tạo icon tương ứng + Cụm nút hành động */}
                        <div className="pt-2 border-t border-black/10 dark:border-white/10">
                          <div className="flex items-center gap-1 flex-wrap mb-2">
                            {course.skills.slice(0, 3).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                              >
                                <span style={{ color: course.accentColor }}>
                                  {getTagIcon(skill, 'w-2.5 h-2.5 shrink-0')}
                                </span>
                                <span>{skill}</span>
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
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* MẶT CHI TIẾT: FORMAT GIỐNG TRANG DỊCH VỤ (DOMAINS VIEW DETAILED FORMAT)    */
          /* Kích thước mở rộng toàn bộ lưới, 12 cột, 3 trụ cột cốt lõi + 4 chỉ số KPI */
          /* ========================================================================= */
          (() => {
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
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.94) 0%, rgba(10, 15, 30, 0.88) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 250, 252, 0.88) 100%)',
                  ['--card-accent-color' as string]: course.accentColor,
                }}
                className="theme-pastel-card w-full h-full flex-1 min-h-0 rounded-[14px] border border-white/60 dark:border-white/10 p-[15px] sm:p-4 lg:p-5 shadow-[0_16px_40px_-6px_rgba(15,23,42,0.18),0_6px_16px_-2px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_0_32px_var(--card-accent-color,rgba(16,185,129,0.35)),inset_0_1px_1.5px_rgba(255,255,255,0.18)] relative overflow-hidden flex flex-col justify-between text-left font-play transition-all duration-300"
              >
                {/* Soft ambient background glows */}
                <div
                  className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full pointer-events-none opacity-80 blur-3xl"
                  style={{ background: `${course.accentColor}33` }}
                />
                <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/40 dark:bg-white/5 blur-2xl pointer-events-none" />

                {/* 1. Header Bar chuẩn trang dịch vụ: Huy hiệu tròn 3D + Tiêu đề + Mũi tên > + Pill năm/mã + Nút Quay lại & X */}
                <div className="w-full flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-black/10 dark:border-white/10 relative z-10 flex-wrap sm:flex-nowrap">
                  {/* Left: 3D Circular Icon & Title & Chevron & Badges */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-wrap sm:flex-nowrap">
                    <motion.div
                      layoutId={`education-icon-${course.id}`}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center text-white shadow-md border border-white/60"
                      style={{
                        background: course.gradient || course.accentColor,
                        boxShadow: `0 6px 14px -2px ${course.accentColor}66, inset 0 2px 3px rgba(255,255,255,0.65)`,
                      }}
                    >
                      <GraduationCap className="w-5 h-5 text-white" />
                    </motion.div>

                    <motion.h3
                      layoutId={`education-title-${course.id}`}
                      className="text-[18px] sm:text-[21px] lg:text-[23px] font-black font-play leading-none tracking-tight truncate flex items-center gap-1.5"
                      style={{ color: course.accentColor }}
                      title={course.title}
                    >
                      <span>{formatCardTitle(course.title)}</span>
                      <ChevronRight className="w-4 h-4 opacity-70 shrink-0" />
                    </motion.h3>

                    {/* Pill Badge Năm & Mã Khóa Học */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border shadow-2xs bg-sky-100/90 dark:bg-slate-800/90 border-sky-300/80 dark:border-white/15 text-sky-800 dark:text-sky-300 shrink-0">
                      <Calendar className="w-3 h-3 shrink-0" style={{ color: course.accentColor }} />
                      <span>Năm {course.year} • {course.code}</span>
                    </span>

                    {/* Pill Danh Mục & Đơn Vị Phát Hành */}
                    <span className="hidden md:inline-flex px-3 py-1 rounded-full text-[11px] font-semibold bg-white/85 dark:bg-slate-800/85 border border-slate-200/90 dark:border-white/15 text-slate-700 dark:text-slate-200 shadow-2xs">
                      {getShortCategoryLabel(course.category)} • {course.issuer}
                    </span>
                  </div>

                  {/* Right: Nút Quay lại danh sách học vấn & Nút Đóng X chuẩn trang dịch vụ */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        SoundEngine.playTap();
                        setSelectedCourse(null);
                      }}
                      className="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                      title="Quay lại danh sách học vấn (Phím Esc)"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Quay lại học vấn</span>
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

                {/* 2. Main Content Layout: Banner Panorama -> 3 Bento Columns -> 5 KPI Cards */}
                <div className="w-full flex-1 min-h-0 my-2 flex flex-col justify-between gap-3 relative z-10 overflow-y-auto lg:overflow-hidden glass-scrollbar pr-0.5">
                  {/* Tier 1: Panoramic Hero Banner (Tràn chiều ngang 100%) */}
                  <div className="w-full rounded-2xl bg-gradient-to-r from-sky-50/90 via-blue-50/80 to-indigo-50/90 dark:from-slate-900/90 dark:via-blue-950/60 dark:to-slate-900/90 border border-sky-200/90 dark:border-white/10 p-4 sm:p-5 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
                    {/* Floating ambient glow */}
                    <div
                      className="absolute right-0 top-0 w-96 h-full pointer-events-none opacity-40 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${course.accentColor} 0%, transparent 70%)` }}
                    />

                    {/* Left Info: Kicker + Title + Desc */}
                    <div className="flex-1 min-w-0 text-left space-y-1.5 relative z-10">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: course.accentColor }}
                        />
                        <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                          TỔNG QUAN GIÁ TRỊ ĐÀO TẠO
                        </span>
                      </div>
                      <h4
                        className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight font-play"
                        style={{ color: course.accentColor }}
                      >
                        “{course.title}”
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl">
                        {course.desc}
                      </p>
                    </div>

                    {/* Right Banner / Image Preview */}
                    <div className="relative shrink-0 w-full md:w-80 lg:w-96 h-28 sm:h-32 rounded-xl overflow-hidden shadow-md border border-white/80 dark:border-white/20 group cursor-pointer"
                      onClick={() => handleOpenLightbox(course.image, course.title)}
                      title="Bấm để xem bằng cấp đầy đủ"
                    >
                      <img
                        src="/images/education/hero-banner.png"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = course.image;
                        }}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 text-white text-[10.5px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Xem ảnh bằng cấp</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tier 2: 3 Bento Columns (Chuyên đề đào tạo | Ứng dụng thực chiến | Năng lực kỹ năng) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0 items-stretch">
                    {/* Column 1: Chuyên đề đào tạo cốt lõi */}
                    <div className="rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-3.5 sm:p-4 shadow-sm flex flex-col justify-between gap-2 relative overflow-hidden">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-white/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                              <BookOpen className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <h4 className="text-xs sm:text-[13.5px] font-black font-play text-blue-800 dark:text-sky-300 leading-tight">
                              Chuyên đề đào tạo
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-blue-100/90 dark:bg-blue-950/70 text-blue-800 dark:text-sky-300 border border-blue-200 dark:border-blue-800 shrink-0">
                            {course.modules.length} HỌC PHẦN CỐT LÕI
                          </span>
                        </div>

                        <ul className="space-y-2 mt-3 text-[11px] sm:text-[11.5px] text-slate-700 dark:text-slate-200 font-medium">
                          {course.modules.map((m, i) => (
                            <li key={i} className="flex items-start gap-2 leading-snug">
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500"
                              />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Column 2: Ứng dụng thực chiến */}
                    <div className="rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-3.5 sm:p-4 shadow-sm flex flex-col justify-between gap-2 relative overflow-hidden">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-white/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                              <Briefcase className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <h4 className="text-xs sm:text-[13.5px] font-black font-play text-emerald-800 dark:text-emerald-300 leading-tight">
                              Ứng dụng thực chiến
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                            VẬN HÀNH THỰC TIỄN 100%
                          </span>
                        </div>

                        <p className="text-[11.5px] sm:text-[12px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed my-3">
                          {course.application}
                        </p>
                      </div>

                      {/* Bottom Role Chips */}
                      <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-1">
                          {['CX', 'CS', 'PM', 'BI'].map((chip, idx) => (
                            <span
                              key={idx}
                              className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white text-[9.5px] font-bold flex items-center justify-center shadow-xs"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300 font-play">
                          Thực chiến doanh nghiệp
                        </span>
                      </div>
                    </div>

                    {/* Column 3: Năng lực kỹ năng */}
                    <div className="rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-3.5 sm:p-4 shadow-sm flex flex-col justify-between gap-2 relative overflow-hidden">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-white/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                              <Cpu className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <h4 className="text-xs sm:text-[13.5px] font-black font-play text-purple-800 dark:text-purple-300 leading-tight">
                              Năng lực kỹ năng
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-purple-100/90 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shrink-0">
                            {course.skills.length} KỸ NĂNG CHUYÊN MÔN
                          </span>
                        </div>

                        {/* Interactive Skill Pills */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-2.5">
                          {course.skills.map((skill, skIdx) => (
                            <div
                              key={skIdx}
                              className="px-2.5 py-1.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/70 dark:border-purple-800/50 flex items-center justify-between text-[11px] font-bold text-purple-900 dark:text-purple-200 shadow-2xs hover:border-purple-400 transition-colors"
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                {getTagIcon(skill, 'w-3.5 h-3.5 text-purple-600 shrink-0')}
                                <span className="truncate">{skill}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 text-purple-400 shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Capsule Bar */}
                      <div className="mt-auto pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10.5px]">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-sky-500 text-white font-mono font-black text-[9.5px]">
                            {course.code}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-mono font-black text-[9.5px]">
                            CERT
                          </span>
                        </div>
                        <span className="font-bold text-purple-700 dark:text-purple-300 font-play flex items-center gap-0.5">
                          <span>Năng lực cốt lõi</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tier 3: 5 Stat Bento Cards (1 Hàng 5 Thẻ) */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 shrink-0">
                    <div className="p-2.5 rounded-xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                          ĐƠN VỊ CẤP CHỨNG CHỈ
                        </span>
                        <p className="text-xs font-black text-slate-900 dark:text-white truncate font-play">
                          {course.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                          Năm tốt nghiệp
                        </span>
                        <p className="text-xs font-black text-sky-600 dark:text-sky-400 truncate font-play">
                          {course.year}
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                          Mã văn bằng
                        </span>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 truncate font-play">
                          {course.code}
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                          Chuyên đề đào tạo
                        </span>
                        <p className="text-xs font-black text-amber-600 dark:text-amber-400 truncate font-play">
                          {course.modules.length} Modules
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                          Trạng thái văn bằng
                        </span>
                        <p className="text-xs font-black text-rose-600 dark:text-rose-400 truncate font-play flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>100% Hợp lệ</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Footer Action Bar */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 shrink-0 relative z-10">
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(course.image, course.title)}
                    className="px-4 py-1.5 rounded-full text-xs font-bold font-play flex items-center gap-1.5 text-white transition cursor-pointer shadow-md hover:scale-105 active:scale-95 bg-teal-600 hover:bg-teal-700"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Xem bằng cấp toàn màn hình</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-1.5 rounded-full text-xs font-bold font-play border border-slate-300 dark:border-white/20 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Quay lại lưới học vấn</span>
                  </button>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>

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
              {/* Header popup */}
              <div className="flex items-start justify-between gap-3 border-b border-black/10 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-400/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black font-play leading-tight">
                      Xác Thực Chứng Chỉ Số
                    </h4>
                    <p className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 mt-0.5">
                      {verifyInfo.registryName}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setVerifyingCourse(null)}
                  className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Thông tin chứng thực */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block">
                    Khóa học / Văn bằng
                  </span>
                  <p
                    className="font-black font-play text-sm leading-snug mt-0.5"
                    style={{ color: verifyingCourse.accentColor }}
                  >
                    {verifyingCourse.title}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300">
                      Mã định danh chứng chỉ (Credential ID)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCredential(verifyInfo.credentialId)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-cyan-700 dark:text-cyan-300 hover:underline cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-sm font-black font-mono tracking-wider select-all py-1 px-2 rounded-lg bg-black/10 dark:bg-black/30 border border-black/10 dark:border-white/10">
                    {verifyInfo.credentialId}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                    <span className="text-slate-500 dark:text-slate-400 block">Năm cấp bằng</span>
                    <span className="font-bold font-mono">Năm {verifyingCourse.year}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                    <span className="text-slate-500 dark:text-slate-400 block">Trạng thái xác minh</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{verifyInfo.status}</span>
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {verifyingCourse.desc}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/10 dark:border-white/10">
                <a
                  href={verifyInfo.verifyUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold font-play text-white bg-cyan-600 hover:bg-cyan-700 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Cổng tra cứu trực tuyến</span>
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

      {/* 6. LIGHTBOX PHÓNG TO ẢNH BẰNG CẤP FULL MÀN HÌNH */}
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
