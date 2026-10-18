'use client';

import React, { useState } from 'react';
import { EDUCATION_BOOKS_DATA } from '@/data/education';
import { EducationBook } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';

export const EducationView: React.FC = () => {
  const { showToast } = useToast();
  const [selectedBook, setSelectedBook] = useState<EducationBook | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomCertImage, setZoomCertImage] = useState<boolean>(false);
  // Mặc định hiển thị tổng kết khóa học
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(true);

  // Layout mode: 'deck' (CodePen Card Stacking & Displacement) | 'grid' (Classic Grid)
  const [layoutMode, setLayoutMode] = useState<'deck' | 'grid'>('deck');

  // Filter items based on active category & search query
  const filteredBooks = EDUCATION_BOOKS_DATA.filter((book) => {
    let matchesCategory = true;
    if (activeCategory === 'corp') {
      matchesCategory = [2, 3, 4, 5, 6, 7, 12].includes(book.id);
    } else if (activeCategory === 'upgrade') {
      matchesCategory = [8, 9, 10].includes(book.id);
    } else if (activeCategory === 'standard') {
      matchesCategory = [11, 13, 14].includes(book.id);
    } else if (activeCategory === 'self') {
      matchesCategory = [1].includes(book.id);
    }

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      book.title.toLowerCase().includes(q) ||
      book.code.toLowerCase().includes(q) ||
      book.year.includes(q) ||
      book.org.toLowerCase().includes(q) ||
      book.desc.toLowerCase().includes(q) ||
      (book.modules && book.modules.some((m) => m.toLowerCase().includes(q)))
    );
  });

  // Card meta configuration matching the updated 5.1 - 5.14 education list
  const cardMetaMap: Record<
    number,
    {
      displayTitle: string;
      icon: string;
      themeColor: string;
      buttonBg: string;
      chips: string[];
      summary: string;
    }
  > = {
    1: {
      displayTitle: 'Thiết kế Web UI/UX',
      icon: 'desktop',
      themeColor: 'bg-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      chips: ['HTML5, CSS3, JavaScript, PHP, C++', 'Responsive UI/UX & AI Agent'],
      summary: 'Kỹ thuật lập trình web, thiết kế giao diện UI/UX chuẩn Responsive và AI Agent Workflows.',
    },
    2: {
      displayTitle: 'Phân tích dữ liệu',
      icon: 'chart',
      themeColor: 'bg-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
      chips: ['Phân tích dữ liệu', 'Trực quan hóa Dashboard BI'],
      summary: 'Khai thác, xử lý và mô hình hóa dữ liệu lớn nhằm phục vụ công tác quản trị doanh nghiệp.',
    },
    3: {
      displayTitle: 'Quản trị rủi ro',
      icon: 'shield',
      themeColor: 'bg-rose-600',
      buttonBg: 'bg-rose-600 hover:bg-rose-700',
      chips: ['Đánh giá rủi ro vận hành', 'Xử lý khủng hoảng truyền thông'],
      summary: 'Nhận diện, đánh giá và kiểm soát rủi ro trong hoạt động vận hành và dịch vụ khách hàng.',
    },
    4: {
      displayTitle: 'Quản lý dự án',
      icon: 'briefcase',
      themeColor: 'bg-purple-600',
      buttonBg: 'bg-purple-600 hover:bg-purple-700',
      chips: ['Lập kế hoạch dự án', 'Quản lý tiến độ & ngân sách'],
      summary: 'Khóa học quản trị dự án theo phương pháp luận chuẩn quốc tế, kiểm soát toàn diện vòng đời dự án.',
    },
    5: {
      displayTitle: 'Quản lý cấp cao',
      icon: 'target',
      themeColor: 'bg-amber-500',
      buttonBg: 'bg-amber-500 hover:bg-amber-600',
      chips: ['Tư duy lãnh đạo chiến lược', 'Quản trị sự thay đổi'],
      summary: 'Chương trình phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao.',
    },
    6: {
      displayTitle: 'Quản lý cấp trung',
      icon: 'users',
      themeColor: 'bg-teal-600',
      buttonBg: 'bg-teal-600 hover:bg-teal-700',
      chips: ['Kỹ năng quản trị nhân sự', 'Giám sát hiệu suất'],
      summary: 'Khóa đào tạo kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả.',
    },
    7: {
      displayTitle: 'Kỹ năng Đào tạo',
      icon: 'graduation',
      themeColor: 'bg-indigo-600',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
      chips: ['Giáo trình đào tạo nội bộ', 'Phương pháp truyền đạt sư phạm'],
      summary: 'Phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu.',
    },
    8: {
      displayTitle: 'Kỹ năng Thuyết trình',
      icon: 'megaphone',
      themeColor: 'bg-pink-600',
      buttonBg: 'bg-pink-600 hover:bg-pink-700',
      chips: ['Cấu trúc bài thuyết trình', 'Diễn đạt và ngôn ngữ cơ thể'],
      summary: 'Phương pháp xây dựng bài thuyết trình chuyên nghiệp, truyền đạt ý tưởng mạch lạc và thuyết phục.',
    },
    9: {
      displayTitle: 'Kỹ năng Phỏng vấn',
      icon: 'users',
      themeColor: 'bg-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
      chips: ['Phỏng vấn hành vi (BEI)', 'Khung đánh giá ASK'],
      summary: 'Chương trình đào tạo kỹ thuật phỏng vấn và đánh giá tiềm năng nhân sự chuyên nghiệp.',
    },
    10: {
      displayTitle: 'Kỹ năng Tuyển dụng',
      icon: 'briefcase',
      themeColor: 'bg-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      chips: ['Tiêu chí tuyển dụng', 'Thu hút nhân tài & Tối ưu chi phí'],
      summary: 'Chương trình đào tạo chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng chuyên nghiệp.',
    },
    11: {
      displayTitle: 'Cử nhân CNTT',
      icon: 'graduation',
      themeColor: 'bg-blue-700',
      buttonBg: 'bg-blue-700 hover:bg-blue-800',
      chips: ['Lập trình & CSDL', 'Phân tích thiết kế hệ thống'],
      summary: 'Chương trình đào tạo đại học chính quy về khoa học máy tính, kỹ thuật phần mềm và hệ thống thông tin.',
    },
    12: {
      displayTitle: 'Tổng đài viên MobiFone',
      icon: 'phone',
      themeColor: 'bg-sky-600',
      buttonBg: 'bg-sky-600 hover:bg-sky-700',
      chips: ['Nghiệp vụ viễn thông', 'Lắng nghe & Xử lý khiếu nại'],
      summary: 'Chương trình đào tạo chuẩn hóa nghiệp vụ vận hành Contact Center và chăm sóc khách hàng viễn thông.',
    },
    13: {
      displayTitle: 'Quản trị CCNA',
      icon: 'globe',
      themeColor: 'bg-cyan-600',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700',
      chips: ['Routing & Switching', 'Thiết kế mạng & VLAN'],
      summary: 'Chương trình đào tạo quản trị hạ tầng mạng Cisco tiêu chuẩn quốc tế.',
    },
    14: {
      displayTitle: 'Quản trị MCSA',
      icon: 'desktop',
      themeColor: 'bg-indigo-700',
      buttonBg: 'bg-indigo-700 hover:bg-indigo-800',
      chips: ['Windows Server & AD', 'DNS, DHCP & Phân quyền'],
      summary: 'Khóa đào tạo chuyên sâu về quản trị hạ tầng hệ thống máy chủ doanh nghiệp Microsoft Windows Server.',
    },
  };

  const categories = [
    { id: 'all', label: 'Tất cả (14)', icon: 'globe' },
    { id: 'corp', label: 'Doanh nghiệp (7)', icon: 'briefcase' },
    { id: 'upgrade', label: 'Nâng cao năng lực (3)', icon: 'trending' },
    { id: 'standard', label: 'Chuẩn quốc tế (3)', icon: 'globe' },
    { id: 'self', label: 'Tự học & Nghiên cứu (1)', icon: 'book' },
  ];

  // Render individual CodePen style card
  const renderStackCard = (book: EducationBook) => {
    const meta = cardMetaMap[book.id] || {
      displayTitle: book.title,
      icon: 'graduation',
      themeColor: 'bg-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      chips: [book.modules[0] || '', book.modules[1] || ''],
      summary: book.focus || book.desc,
    };

    return (
      <div
        key={book.id}
        onClick={() => setSelectedBook(book)}
        className="edu-stack-card group text-left"
      >
        {/* 1. card-img: Hình banner khóa học với gradient bóng bẩy chuẩn CodePen */}
        <div className="w-full h-[95px] relative overflow-hidden bg-slate-900 border-b border-slate-200/80 dark:border-white/10 shrink-0">
          <img
            src={`/images/education/card-banner-${String(book.id).padStart(2, '0')}.png`}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                book.bannerImg || book.courseImg || 'https://placehold.co/400x160/10b981/ffffff?text=Education';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-black text-white shadow-xs ${meta.themeColor}`}
          >
            {book.code}
          </span>
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-2xs border border-white/60 dark:border-white/20">
            {book.year}
          </span>

          {/* Floating theme icon */}
          <div
            className={`absolute -bottom-3 left-3 w-6 h-6 rounded-lg ${meta.themeColor} text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800 z-10`}
          >
            <WebIcon name={meta.icon} className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2. card-discription: Tiêu đề, đơn vị đào tạo, tóm tắt & kỹ năng */}
        <div className="p-3 pt-3.5 flex flex-col justify-between flex-1 min-h-0 gap-1 text-left">
          <div className="space-y-1">
            <h3
              className="font-black text-xs sm:text-[12.5px] text-slate-900 dark:text-white uppercase font-play tracking-tight line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors"
              title={meta.displayTitle}
            >
              {meta.displayTitle}
            </h3>

            <span
              className="text-[9px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 px-1.5 py-0.5 rounded block truncate"
              title={book.org}
            >
              {book.org}
            </span>

            <p className="text-[9.5px] text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed mt-0.5">
              {meta.summary}
            </p>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            {meta.chips.slice(0, 2).map((chip, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-full block"
              >
                • {chip}
              </span>
            ))}
          </div>
        </div>

        {/* 3. booknowbtn: Action button xem chi tiết & mở modal */}
        <div className="p-2.5 pt-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBook(book);
            }}
            className={`w-full py-1 px-2.5 rounded-xl text-[10.5px] font-black text-white shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95 ${meta.buttonBg}`}
          >
            <span>Xem chi tiết bằng cấp</span>
            <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 dark:text-slate-100 overflow-hidden text-left">
      {/* 1. TOP HERO BANNER */}
      <HeroBanner
        badgeText="Học tập"
        title="Học Vấn Chứng Chỉ"
        subtitle="Nâng tầm kiến thức – Kiến tạo sự nghiệp"
        quote="“Học hỏi không ngừng để nâng tầm tri thức và năng lực vận hành.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-emerald-600"
        imageSrc="/images/education/hero-banner.png"
        hideTextOverlay={true}
        bottomControls={
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 pointer-events-auto">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap shadow-2xs ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-600 shadow-xs'
                        : 'bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-white'
                    }`}
                  >
                    <WebIcon name={cat.icon} className="w-3.5 h-3.5 shrink-0" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Mode Toggle + Search Box */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Layout Mode Toggle (Card Deck vs Grid) */}
              <button
                type="button"
                onClick={() => {
                  const nextMode = layoutMode === 'deck' ? 'grid' : 'deck';
                  setLayoutMode(nextMode);
                  showToast(nextMode === 'deck' ? 'Đã kích hoạt chế độ Xếp Lớp (Card Deck)' : 'Đã chuyển sang chế độ Lưới (Grid)');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap ${
                  layoutMode === 'deck'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-xs'
                    : 'bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-white'
                }`}
                title="Chuyển chế độ xem Xếp Lớp (Card Deck) / Lưới (Grid)"
              >
                <WebIcon name={layoutMode === 'deck' ? 'layers' : 'grid'} className="w-3.5 h-3.5" />
                <span>{layoutMode === 'deck' ? 'Xếp Lớp (Card Deck)' : 'Lưới (Grid)'}</span>
              </button>

              {/* Search Input Box & Reset button */}
              <div className="flex items-center gap-1.5 flex-1 md:w-64">
                <div className="relative flex-1">
                  <svg
                    className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm môn học, đơn vị, năm..."
                    className="w-full pl-8 pr-7 py-1 rounded-full text-xs bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 border border-slate-200/90 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 shadow-2xs font-semibold"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                    showToast('Đã đặt lại bộ lọc');
                  }}
                  title="Đặt lại bộ lọc"
                  className="w-7 h-7 rounded-full bg-white/95 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-emerald-700 border border-slate-200/90 dark:border-slate-700 shadow-2xs flex items-center justify-center cursor-pointer shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        }
      />

      {/* 2. SUMMARY CARD OF COURSES (CARD TỔNG KẾT KHÓA HỌC - MẶC ĐỊNH HIỂN THỊ) */}
      <div className="w-full relative z-20 shrink-0">
        <div className="w-full rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/80 dark:border-white/10 p-2 sm:p-2.5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
            {/* Left: Summary Title & Quick Badges */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <WebIcon name="graduation" className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight font-play">
                    Tổng Kết Khóa Học & Năng Lực
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    100% Hoàn thành
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  14 khóa học & chứng chỉ chuyên ngành phân bổ theo 4 trụ cột năng lực
                </span>
              </div>
            </div>

            {/* Center: 3 Primary Stat Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
              {/* Stat 1: 3 Bằng cấp */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 transition-all hover:scale-105 hover:shadow-sm">
                <div className="w-5 h-5 rounded-lg bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                  🎓
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-black">3</span>
                  <span className="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold whitespace-nowrap">Bằng cấp</span>
                </div>
              </div>

              {/* Stat 2: 5 Chứng chỉ */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 transition-all hover:scale-105 hover:shadow-sm">
                <div className="w-5 h-5 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                  📜
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-black">5</span>
                  <span className="text-[9px] text-indigo-700 dark:text-indigo-300 font-bold whitespace-nowrap">Chứng chỉ</span>
                </div>
              </div>

              {/* Stat 3: 14 Khóa học chuyên ngành */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 transition-all hover:scale-105 hover:shadow-sm">
                <div className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                  📚
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-black">14</span>
                  <span className="text-[9px] text-emerald-700 dark:text-emerald-300 font-bold whitespace-nowrap">Khóa học</span>
                </div>
              </div>
            </div>

            {/* Right: Collapse/Expand Toggle Button */}
            <button
              type="button"
              onClick={() => setIsSummaryOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-cyan-400 bg-indigo-50/80 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 px-2.5 py-1 rounded-xl border border-indigo-100 dark:border-indigo-800/50 cursor-pointer transition-all"
              title={isSummaryOpen ? 'Thu gọn tổng kết' : 'Mở rộng tổng kết'}
            >
              <span>{isSummaryOpen ? 'Thu gọn' : 'Xem chi tiết'}</span>
              <span className={`transform transition-transform duration-200 text-xs ${isSummaryOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          </div>

          {/* Mặc định hiển thị 4 Trụ Cột Khóa Học & Năng Lực (không ẩn) */}
          {isSummaryOpen && (
            <div className="pt-2 sm:pt-2.5 border-t border-slate-200/60 dark:border-white/10 mt-2 transition-all duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5 text-left">
                {/* Pillar 1: Quản trị DN */}
                <button
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === 'corp' ? 'all' : 'corp')}
                  className={`p-2 rounded-xl transition cursor-pointer text-left border ${
                    activeCategory === 'corp'
                      ? 'bg-blue-100 dark:bg-blue-900/60 border-blue-400 dark:border-blue-500 ring-2 ring-blue-500/30 shadow-xs'
                      : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-800/50 hover:bg-blue-100/90 dark:hover:bg-blue-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-blue-900 dark:text-blue-200">
                    <span className="text-[10.5px] font-bold">Quản trị DN</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black bg-blue-600 text-white shadow-2xs">
                      7 Thẻ
                    </span>
                  </div>
                  <p className="text-[9px] text-blue-700 dark:text-blue-300 mt-0.5 truncate">Dự án, Rủi ro, Lãnh đạo, Dữ liệu</p>
                </button>

                {/* Pillar 2: Nâng cao Năng lực */}
                <button
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === 'upgrade' ? 'all' : 'upgrade')}
                  className={`p-2 rounded-xl transition cursor-pointer text-left border ${
                    activeCategory === 'upgrade'
                      ? 'bg-purple-100 dark:bg-purple-900/60 border-purple-400 dark:border-purple-500 ring-2 ring-purple-500/30 shadow-xs'
                      : 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200/80 dark:border-purple-800/50 hover:bg-purple-100/90 dark:hover:bg-purple-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-purple-900 dark:text-purple-200">
                    <span className="text-[10.5px] font-bold">Nâng cao Năng lực</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black bg-purple-600 text-white shadow-2xs">
                      3 Thẻ
                    </span>
                  </div>
                  <p className="text-[9px] text-purple-700 dark:text-purple-300 mt-0.5 truncate">Đàm phán, Dịch vụ, Kaizen</p>
                </button>

                {/* Pillar 3: Tiêu chuẩn Vận hành */}
                <button
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === 'standard' ? 'all' : 'standard')}
                  className={`p-2 rounded-xl transition cursor-pointer text-left border ${
                    activeCategory === 'standard'
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-500/30 shadow-xs'
                      : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/50 hover:bg-emerald-100/90 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-200">
                    <span className="text-[10.5px] font-bold">Tiêu chuẩn Vận hành</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black bg-emerald-600 text-white shadow-2xs">
                      3 Thẻ
                    </span>
                  </div>
                  <p className="text-[9px] text-emerald-700 dark:text-emerald-300 mt-0.5 truncate">ITIL, An toàn TT, Kế toán</p>
                </button>

                {/* Pillar 4: Tự học & Web/AI */}
                <button
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === 'self' ? 'all' : 'self')}
                  className={`p-2 rounded-xl transition cursor-pointer text-left border ${
                    activeCategory === 'self'
                      ? 'bg-amber-100 dark:bg-amber-900/60 border-amber-400 dark:border-amber-500 ring-2 ring-amber-500/30 shadow-xs'
                      : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/50 hover:bg-amber-100/90 dark:hover:bg-amber-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-amber-900 dark:text-amber-200">
                    <span className="text-[10.5px] font-bold">Tự học & Web/AI</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black bg-amber-600 text-white shadow-2xs">
                      1 Thẻ
                    </span>
                  </div>
                  <p className="text-[9px] text-amber-700 dark:text-amber-300 mt-0.5 truncate">UI/UX, Fullstack, AI Agents</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. MAIN EDUCATION CARDS AREA */}
      <div className="w-full flex-1 min-h-0 relative flex flex-col justify-center">
        {filteredBooks.length === 0 ? (
          <div className="w-full h-full flex-1 min-h-0 py-8 px-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <WebIcon name="graduation" className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Không tìm thấy khóa học phù hợp với từ khóa.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 transition cursor-pointer"
            >
              <span>Xem lại tất cả 14 khóa học</span>
            </button>
          </div>
        ) : layoutMode === 'deck' ? (
          /* CODEPEN CARD STACKING DECK LAYOUT (NHẬP CHUNG 1 HÀNG TOÀN BỘ THẺ) */
          <div className="w-full flex flex-col justify-center py-2">
            <div className="w-full flex flex-col">
              <div className="flex items-center justify-between px-3 pb-1">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 font-play">
                  {filteredBooks.length === 14
                    ? 'Toàn bộ 14 Chứng chỉ & Khóa học Chuyên ngành (5.1 - 5.14)'
                    : `Danh sách ${filteredBooks.length} khóa học được lọc`}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold italic">
                  Di chuột vào thẻ để xòe mở chi tiết →
                </span>
              </div>
              <div className="edu-deck-row no-scrollbar">
                {filteredBooks.map((book) => renderStackCard(book))}
              </div>
            </div>
          </div>
        ) : (
          /* TRADITIONAL 2-ROW GRID VIEW */
          <div className="w-full h-full flex-1 min-h-0 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 grid-rows-2 lg:grid-rows-2 gap-[15px] items-stretch p-1">
            {filteredBooks.map((book) => {
              const meta = cardMetaMap[book.id] || {
                displayTitle: book.title,
                icon: 'graduation',
                themeColor: 'bg-blue-600',
                buttonBg: 'bg-blue-600 hover:bg-blue-700',
                chips: [book.modules[0] || '', book.modules[1] || ''],
                summary: book.focus || book.desc,
              };

              return (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="rounded-[18px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_32px_-6px_rgba(15,23,42,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer h-full min-h-0 text-left"
                >
                  {/* Card Banner Thumbnail Image */}
                  <div className="w-full h-[62px] sm:h-[66px] relative overflow-hidden bg-slate-100/90 dark:bg-slate-800 border-b border-slate-200/70 dark:border-slate-700 shrink-0">
                    <img
                      src={`/images/education/card-banner-${String(book.id).padStart(2, '0')}.png`}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          book.bannerImg || book.courseImg || 'https://placehold.co/400x160/10b981/ffffff?text=Education';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges overlay on banner */}
                    <span
                      className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8.5px] font-mono font-black text-white shadow-xs ${meta.themeColor}`}
                    >
                      {book.code}
                    </span>
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-mono font-bold bg-white/95 dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-2xs border border-white/60 dark:border-slate-700">
                      {book.year}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1 min-h-0 gap-1">
                    <div className="space-y-1 min-h-0">
                      {/* Title & Unframed Icon */}
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${meta.themeColor} text-white shadow-2xs`}
                        >
                          <WebIcon name={meta.icon} className="w-2.5 h-2.5" />
                        </div>
                        <h3
                          className="font-bold text-[11px] text-slate-900 dark:text-white truncate font-play leading-tight"
                          title={meta.displayTitle}
                        >
                          {meta.displayTitle}
                        </h3>
                      </div>

                      {/* Organization / Don vi */}
                      <span
                        className="text-[9px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 px-1.5 py-0.5 rounded block truncate"
                        title={book.org}
                      >
                        {book.org}
                      </span>

                      {/* Summary */}
                      <p className="text-[9.5px] text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-tight">
                        {meta.summary}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 mt-auto shrink-0">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                        <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{book.year}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBook(book);
                        }}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-2xs transition-all flex items-center gap-0.5 cursor-pointer hover:shadow-xs active:scale-95 shrink-0 ${meta.buttonBg}`}
                      >
                        <span>Chi tiết</span>
                        <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. DETAIL MODAL (KHI BẤM "XEM CHI TIẾT BẰNG CẤP") */}
      {selectedBook && (
        <Modal
          isOpen={!!selectedBook}
          onClose={() => {
            setSelectedBook(null);
            setZoomCertImage(false);
          }}
          title={`Học Phần ${selectedBook.code}: ${selectedBook.title}`}
          maxWidth="5xl"
        >
          <div className="flex flex-col gap-5 p-1 text-left font-play">
            {/* Banner Top in Modal */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[24/8] bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <img
                src={selectedBook.bannerImg || selectedBook.certImg}
                alt={selectedBook.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-bold text-xs max-w-fit shadow-xs mb-1">
                  Mã {selectedBook.code} • Năm {selectedBook.year}
                </span>
                <h2 className="text-base sm:text-xl font-black text-white leading-tight">
                  {selectedBook.title}
                </h2>
                <span className="text-xs text-sky-200 font-medium">
                  Đơn vị: {selectedBook.org}
                </span>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">HÌNH THỨC</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedBook.format}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">NĂM ĐÀO TẠO</span>
                <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 mt-0.5 block">Năm {selectedBook.year}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">ĐƠN VỊ ĐÀO TẠO</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">{selectedBook.org}</span>
              </div>
            </div>

            {/* Orientation */}
            {selectedBook.orientation && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60">
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-mono">
                  <WebIcon name="target" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Định hướng học tập</span>
                </span>
                <p className="text-xs text-indigo-950 dark:text-indigo-200 font-medium leading-relaxed">
                  {selectedBook.orientation}
                </p>
              </div>
            )}

            {/* Curriculum Modules */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                <WebIcon name="book" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Nội dung chuyên môn chi tiết</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedBook.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competencies & Practice */}
            {selectedBook.practice && selectedBook.practice.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                  <WebIcon name="wrench" className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>Sản phẩm & Thực hành thực tế</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedBook.practice.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-blue-600 dark:text-cyan-400 font-bold">•</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competencies Achieved */}
            {selectedBook.competencies && selectedBook.competencies.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                  <WebIcon name="award" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Năng lực đạt được</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedBook.competencies.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2"
                    >
                      <span className="text-amber-600 dark:text-amber-400 font-bold">✔</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Value */}
            {selectedBook.careerValue && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/80 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-mono">
                  <WebIcon name="lightbulb" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Giá trị ứng dụng vào nghề nghiệp</span>
                </span>
                <p className="text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                  {selectedBook.careerValue}
                </p>
              </div>
            )}

            {/* Intersection Skills / Outcome */}
            {selectedBook.intersectionSkills && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">
                  Năng lực giao thoa:
                </span>
                <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 font-mono">
                  {selectedBook.intersectionSkills}
                </span>
              </div>
            )}

            {/* Certificate Preview Image */}
            {selectedBook.certImg && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <WebIcon name="scroll" className="w-4 h-4 text-slate-500" />
                    <span>Hình ảnh chứng chỉ / Bằng cấp</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomCertImage(!zoomCertImage)}
                    className="text-xs text-blue-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
                  >
                    {zoomCertImage ? 'Thu nhỏ' : 'Phóng to'}
                  </button>
                </div>

                <div
                  className={`w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 dark:border-slate-700 flex items-center justify-center cursor-pointer transition-all ${
                    zoomCertImage ? 'h-auto max-h-[700px]' : 'h-64'
                  }`}
                  onClick={() => setZoomCertImage(!zoomCertImage)}
                >
                  <img
                    src={selectedBook.certImg}
                    alt={`${selectedBook.title} Chứng chỉ`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setSelectedBook(null);
                  setZoomCertImage(false);
                }}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
