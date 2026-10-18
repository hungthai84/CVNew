'use client';

import React, { useState, useEffect } from 'react';
import { EXPERIENCE_MILESTONES } from '@/data/experience';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export const ExperienceView: React.FC = () => {
  const { showToast } = useToast();
  const [activeKey, setActiveKey] = useState<string>('2013');
  const [showJobCard, setShowJobCard] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [carouselSlideIdx, setCarouselSlideIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState<boolean>(false);

  const activeMilestone = EXPERIENCE_MILESTONES[activeKey] || EXPERIENCE_MILESTONES['2013'];

  // 3-second Auto-carousel for photos
  useEffect(() => {
    if (isPaused || !activeMilestone.photos || activeMilestone.photos.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselSlideIdx((prev) => (prev + 1) % activeMilestone.photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeMilestone, isPaused]);

  // Reset slide index when milestone changes
  useEffect(() => {
    setCarouselSlideIdx(0);
  }, [activeKey]);

  const handleSelectMilestone = (key: string) => {
    setActiveKey(key);
    showToast(`Đã chọn mốc: ${EXPERIENCE_MILESTONES[key]?.company || key}`);
  };

  const handleOpenJobCard = (key: string) => {
    setActiveKey(key);
    setShowJobCard(true);
    showToast(`Chi tiết công tác: ${EXPERIENCE_MILESTONES[key]?.company || key}`);
  };

  // 8 Timeline Cards matching the exact uploaded image
  const roadmapCards = [
    {
      key: '2003',
      yearBadge: 'Năm 2003',
      shortName: 'MOBIFONE',
      roleSummary: 'Nhân viên CSKH',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png',
      bullets: [
        'Tiếp nhận & xử lý yêu cầu khách hàng',
        'Hỗ trợ dịch vụ di động và internet',
      ],
      badgeBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      badgeColor: '#2563eb',
      cardBg: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 50%, #e6f2ff 100%)',
      borderColor: 'border-blue-200/90 hover:border-blue-400',
      activeRing: 'ring-blue-400',
      titleColor: 'text-[#1E3A6D] dark:text-cyan-300',
      pillBg: 'bg-blue-50/90 text-blue-700 border-blue-200/90 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
      arrowBg: '#3b82f6',
    },
    {
      key: '2007',
      yearBadge: 'Năm 2007',
      shortName: 'VIỄN LIÊN V247',
      roleSummary: 'Trưởng nhóm CSKH / Giám sát (Supervisor)',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/QvtbdnfP/V247.png',
      bullets: [
        'Quản lý nhóm 5-10 người',
        'Nâng cao chất lượng dịch vụ và KPI',
      ],
      badgeBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      badgeColor: '#7c3aed',
      cardBg: 'linear-gradient(180deg, #faf5ff 0%, #ffffff 50%, #f3e8ff 100%)',
      borderColor: 'border-purple-200/90 hover:border-purple-400',
      activeRing: 'ring-purple-400',
      titleColor: 'text-purple-800 dark:text-purple-300',
      pillBg: 'bg-purple-50/90 text-purple-700 border-purple-200/90 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
      arrowBg: '#8b5cf6',
    },
    {
      key: '2011',
      yearBadge: 'Năm 2011',
      shortName: 'LBC - HTVC CAB...',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/R4YXWyzF/LBC.png',
      extraLogo: 'https://i.ibb.co/1fNw0hBq/HTVC.png',
      bullets: [
        'Xây dựng quy trình chăm sóc khách hàng',
        'Đào tạo & phát triển đội ngũ',
      ],
      badgeBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      badgeColor: '#059669',
      cardBg: 'linear-gradient(180deg, #ecfdf5 0%, #ffffff 50%, #d1fae5 100%)',
      borderColor: 'border-emerald-200/90 hover:border-emerald-400',
      activeRing: 'ring-emerald-400',
      titleColor: 'text-emerald-800 dark:text-emerald-300',
      pillBg: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/90 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      arrowBg: '#10b981',
    },
    {
      key: '2013',
      yearBadge: 'Năm 2013',
      shortName: 'VED...',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '130 Nhân sự',
      logo: 'https://i.ibb.co/BSVS4xf/Shopee.png',
      bullets: [
        'Quản lý vận hành CSKH',
        'Tối ưu trải nghiệm khách hàng',
      ],
      badgeBg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      badgeColor: '#ea580c',
      cardBg: 'linear-gradient(180deg, #fff7ed 0%, #ffffff 50%, #ffedd5 100%)',
      borderColor: 'border-orange-200/90 hover:border-orange-400',
      activeRing: 'ring-orange-400',
      titleColor: 'text-orange-800 dark:text-orange-300',
      pillBg: 'bg-orange-50/90 text-orange-700 border-orange-200/90 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
      arrowBg: '#f97316',
    },
    {
      key: '2016',
      yearBadge: 'Năm 2015',
      shortName: '_ VED...',
      roleSummary: 'Trưởng Phòng CallCenter',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/XfpQphWF/Prudential.png',
      bullets: [
        'Tổ chức vận hành Call Center',
        'Tăng hiệu suất & chất lượng dịch vụ',
      ],
      badgeBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
      badgeColor: '#e11d48',
      cardBg: 'linear-gradient(180deg, #fff1f2 0%, #ffffff 50%, #ffe4e6 100%)',
      borderColor: 'border-rose-200/90 hover:border-rose-400',
      activeRing: 'ring-rose-400',
      titleColor: 'text-rose-800 dark:text-rose-300',
      pillBg: 'bg-rose-50/90 text-rose-700 border-rose-200/90 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
      arrowBg: '#fb7185',
    },
    {
      key: '2018',
      yearBadge: 'Năm 2018',
      shortName: 'MOMO',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '60 Nhân sự',
      logo: 'https://i.ibb.co/k2QtrgTw/Momo.png',
      bullets: [
        'Xây dựng chiến lược CSKH',
        'Đạt chỉ số hài lòng KH cao',
      ],
      badgeBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
      badgeColor: '#db2777',
      cardBg: 'linear-gradient(180deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%)',
      borderColor: 'border-pink-200/90 hover:border-pink-400',
      activeRing: 'ring-pink-400',
      titleColor: 'text-pink-800 dark:text-pink-300',
      pillBg: 'bg-pink-50/90 text-pink-700 border-pink-200/90 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800',
      arrowBg: '#f472b6',
    },
    {
      key: '2023',
      yearBadge: 'Năm 2023',
      shortName: 'FINVIET',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '17 Nhân sự',
      logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png',
      bullets: [
        'Tái cấu trúc quy trình',
        'Ứng dụng công nghệ vào CSKH',
      ],
      badgeBg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      badgeColor: '#f59e0b',
      cardBg: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 50%, #fef3c7 100%)',
      borderColor: 'border-amber-200/90 hover:border-amber-400',
      activeRing: 'ring-amber-400',
      titleColor: 'text-amber-800 dark:text-amber-300',
      pillBg: 'bg-amber-50/90 text-amber-800 border-amber-200/90 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      arrowBg: '#fbbf24',
    },
    {
      key: '2026',
      yearBadge: 'Năm 2026+',
      shortName: 'CS STRATEGY 2...',
      roleSummary: 'Head of CS / CS Director',
      headcountLabel: '100 Nhân sự',
      logo: 'https://i.ibb.co/G4QnNzWb/Power-Service.png',
      bullets: [
        'Xây dựng chiến lược CSKH',
        'Phát triển hệ thống đa kênh',
      ],
      badgeBg: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      badgeColor: '#0284c7',
      cardBg: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 50%, #e0f2fe 100%)',
      borderColor: 'border-sky-200/90 hover:border-sky-400',
      activeRing: 'ring-sky-400',
      titleColor: 'text-sky-800 dark:text-sky-300',
      pillBg: 'bg-sky-50/90 text-sky-700 border-sky-200/90 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
      arrowBg: '#0ea5e9',
    },
  ];

  // Filter roadmap cards if user types in search box
  const filteredRoadmapCards = roadmapCards.filter((c) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const ms = EXPERIENCE_MILESTONES[c.key];
    return (
      c.shortName.toLowerCase().includes(q) ||
      c.yearBadge.toLowerCase().includes(q) ||
      c.roleSummary.toLowerCase().includes(q) ||
      (ms && ms.company.toLowerCase().includes(q)) ||
      (ms && ms.industry?.toLowerCase().includes(q))
    );
  });

  const allMilestoneKeys = Object.keys(EXPERIENCE_MILESTONES);
  const currentKeyIndex = allMilestoneKeys.indexOf(activeKey);
  const prevKey = currentKeyIndex > 0 ? allMilestoneKeys[currentKeyIndex - 1] : null;
  const nextKey = currentKeyIndex < allMilestoneKeys.length - 1 ? allMilestoneKeys[currentKeyIndex + 1] : null;

  return (
    <div
      className={`w-full h-full flex-1 flex flex-col justify-between gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 ${
        showJobCard ? 'overflow-y-auto no-scrollbar pb-4' : 'overflow-hidden'
      }`}
    >
      {!showJobCard && (
        <>
          {/* 1. TOP HERO BANNER: HÀNH TRÌNH SỰ NGHIỆP */}
          <div className="w-full relative rounded-[22px] overflow-hidden px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#eaf4ff]/95 via-[#f2f7ff]/90 to-[#ffffff]/95 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 border border-white/90 dark:border-white/10 shadow-[0_8px_30px_rgba(62,115,180,0.08)] flex flex-col md:flex-row items-center justify-between gap-3 min-h-[148px] shrink-0">
            {/* Left: Title & Subtitle & History Pill */}
            <div className="flex-1 flex flex-col justify-between h-full text-left z-10">
              <div>
                <span className="font-serif italic font-bold text-blue-600 dark:text-blue-400 text-base sm:text-lg block leading-tight">
                  Hành trình
                </span>
                <h2 className="text-xl sm:text-[25px] font-black text-[#1E3A6D] dark:text-white tracking-tight font-play leading-tight">
                  Hành trình sự nghiệp
                </h2>
                <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 my-1" />
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm leading-snug">
                  Từ những bước đi đầu tiên đến hành trình kiến tạo giá trị cùng những người đồng hành tuyệt vời.
                </p>
              </div>

              {/* Lịch Sử Công Tác pill */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-play">
                    Lịch Sử Công Tác
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-700/50">
                    2003 – 2026+
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Character Image (Executive with Headset & 3D Robot) */}
            <div className="relative shrink-0 flex items-center justify-center h-[135px] sm:h-[148px] self-end z-10 pointer-events-none">
              <img
                src="/images/experience/hero-character.png"
                alt="Nguyễn Hùng Thái & AI Assistant"
                className="h-full w-auto object-contain drop-shadow-md select-none"
              />
            </div>

            {/* Right: Quote & Search Capsule */}
            <div className="flex-1 flex flex-col justify-between h-full items-end text-right z-10">
              <div className="flex flex-col items-end">
                <div className="flex items-start gap-1">
                  <span className="text-2xl text-blue-400 font-serif leading-none">“</span>
                  <p className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200 italic leading-snug">
                    Khách hàng là trung tâm – Tạo giá trị bền vững. ”
                  </p>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  — Nguyễn Hùng Thái
                </span>
              </div>

              {/* Search Input Capsule */}
              <div className="mt-2.5 relative flex items-center w-full max-w-[280px]">
                <svg
                  className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm công ty, vị trí, thời gian..."
                  className="w-full pl-8 pr-8 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    title="Làm mới bộ lọc"
                    className="absolute right-2.5 w-4 h-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 cursor-pointer text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. 8-CARD HORIZONTAL TIMELINE (Năm 2003 -> Năm 2026+) */}
          <div className="w-full flex-1 min-h-0 rounded-[22px] p-3 sm:p-4 bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[18px] shadow-[0_8px_30px_rgba(62,115,180,0.08)] overflow-x-auto no-scrollbar relative flex flex-col justify-center">
            <div className="w-full h-full min-w-[980px] grid grid-cols-8 gap-2.5 items-stretch">
              {filteredRoadmapCards.map((item, idx) => {
                const isSelected = activeKey === item.key;
                const isLast = idx === filteredRoadmapCards.length - 1;

                return (
                  <div key={item.key} className="relative flex flex-col items-center h-full min-h-0">
                    {/* Top Year Pill Badge with Downward Pointer */}
                    <div className="flex flex-col items-center -mb-2 z-20">
                      <div
                        className={`px-3 py-0.5 rounded-full text-white font-extrabold text-[10px] tracking-tight shadow-xs flex items-center justify-center transition-all duration-300 whitespace-nowrap ${
                          isSelected ? 'scale-105 ring-2 ring-white shadow-sm' : ''
                        }`}
                        style={{ background: item.badgeBg }}
                      >
                        <span>{item.yearBadge}</span>
                      </div>
                      <div
                        className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[4px]"
                        style={{ borderTopColor: item.badgeColor }}
                      />
                    </div>

                    {/* Card Body */}
                    <div
                      onClick={() => handleSelectMilestone(item.key)}
                      style={{ background: item.cardBg }}
                      className={`theme-pastel-card w-full flex-1 min-h-0 rounded-[18px] pt-3.5 pb-2.5 px-2 border transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between gap-1.5 relative group ${
                        item.borderColor
                      } ${
                        isSelected
                          ? `ring-2 ${item.activeRing} shadow-md -translate-y-0.5`
                          : 'shadow-2xs hover:shadow-xs hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Logo Area: White Rounded Box */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenJobCard(item.key);
                        }}
                        title={`Click để mở chi tiết công tác ${item.shortName}`}
                        className="w-full h-13 rounded-xl bg-white shadow-2xs border border-slate-100 flex items-center justify-center p-1.5 group/logo cursor-pointer shrink-0 transition-transform group-hover/logo:scale-102"
                      >
                        {item.extraLogo ? (
                          <div className="flex items-center justify-center gap-1.5 w-full h-full">
                            <img
                              src={item.logo}
                              alt={item.shortName}
                              className="h-7 max-w-[45%] object-contain"
                            />
                            <img
                              src={item.extraLogo}
                              alt="HTVC"
                              className="h-7 max-w-[45%] object-contain"
                            />
                          </div>
                        ) : (
                          <img
                            src={item.logo}
                            alt={item.shortName}
                            className="h-8 max-h-full max-w-[85%] object-contain"
                          />
                        )}
                      </div>

                      {/* Company Short Name */}
                      <h4
                        className={`text-[10.5px] font-black font-play tracking-wide uppercase line-clamp-1 w-full px-0.5 shrink-0 ${item.titleColor}`}
                      >
                        {item.shortName}
                      </h4>

                      {/* Role Label & Summary */}
                      <div className="space-y-0.5 w-full shrink-0">
                        <span className="text-[8.5px] font-semibold text-slate-400 block leading-none">
                          Vị trí
                        </span>
                        <p className="text-[9.5px] font-bold text-slate-700 dark:text-slate-200 leading-tight line-clamp-2 px-0.5 min-h-[26px] flex items-center justify-center">
                          {item.roleSummary}
                        </p>
                      </div>

                      {/* Bullet points */}
                      <div className="w-full flex-1 flex flex-col justify-center px-0.5 my-0.5">
                        <ul className="space-y-1 text-left w-full">
                          {item.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-[8.5px] sm:text-[9px] leading-snug text-slate-600 dark:text-slate-300 font-medium flex items-start gap-1"
                            >
                              <span className="text-slate-400 font-bold leading-none shrink-0">•</span>
                              <span className="line-clamp-2">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Headcount Pill at Bottom */}
                      <div className="w-full pt-1 shrink-0 mt-auto">
                        <div
                          className={`w-full py-1 px-1 rounded-full border text-[9px] font-bold flex items-center justify-center gap-1 shadow-2xs ${item.pillBg}`}
                        >
                          <svg className="w-2.5 h-2.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          <span className="truncate">{item.headcountLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connector Chevron ( > ) between cards */}
                    {!isLast && (
                      <div
                        className="absolute top-[48%] -right-[6px] z-30 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center shadow-xs pointer-events-none"
                        style={{ backgroundColor: item.arrowBg }}
                      >
                        <svg className="w-2 h-2 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          5. THẺ CHI TIẾT CỘT MỐC ĐANG CHỌN (CHỈ HIỆN KHI CLICK VÀO LOGO)
          (KHI HIỂN THỊ THÌ ẨN TẤT CẢ KỂ CẢ BANNER)
          ===================================================================== */}
      {showJobCard && (
        <div className="w-full p-5 sm:p-6 rounded-[24px] bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/15 shadow-xl flex flex-col gap-5 text-left transition-all duration-300 backdrop-blur-2xl mt-1 animate-fadeIn">
          {/* Header Bar with X button on the top right corner */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Chi tiết công tác: <strong className="text-slate-800 dark:text-white font-bold">{activeMilestone.company}</strong>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/80 dark:border-blue-800/40">
                {activeMilestone.period}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowJobCard(false)}
              title="Đóng chi tiết kinh nghiệm"
              aria-label="Đóng chi tiết kinh nghiệm"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-500 dark:bg-slate-800 dark:hover:bg-rose-600 text-slate-600 hover:text-white dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-rose-500 shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0 active:scale-90"
            >
              <svg className="w-4 h-4 stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/* Header Cột mốc & Công ty */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Khung chứa Logo Công Ty & Sản Phẩm Chung Khung Bên Dưới */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/15 shadow-sm flex flex-col items-center gap-1.5 shrink-0">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={activeMilestone.logo}
                      alt={activeMilestone.company}
                      className="w-full h-full object-contain rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/60x60/4f46e5/ffffff?text=Logo';
                      }}
                    />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 shadow-xs" />
              </div>

              {/* Logo sản phẩm chung khung bên dưới logo */}
              {activeMilestone.products && activeMilestone.products.length > 0 && (
                <div className="flex flex-col items-center gap-1 pt-1.5 border-t border-slate-200/80 dark:border-white/10 w-full">
                  <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Sản phẩm
                  </span>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-[160px]">
                    {activeMilestone.products.map((prod) => (
                      <div
                        key={prod.alt}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-700/80 border border-slate-200 dark:border-white/10 shadow-2xs hover:scale-105 transition-transform"
                        title={prod.alt}
                      >
                        <img src={prod.src} alt={prod.alt} className="w-3.5 h-3.5 object-contain rounded-full shrink-0" />
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 font-play whitespace-nowrap">{prod.alt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {activeMilestone.code && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-mono font-black shadow-2xs">
                    {activeMilestone.code}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight font-play">
                  {activeMilestone.company}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {activeMilestone.industry && (
                  <span className="text-xs text-indigo-700 dark:text-indigo-300 font-extrabold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800/60 shadow-2xs">
                    {activeMilestone.industry}
                  </span>
                )}
                <span
                  className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-black font-mono shadow-xs uppercase tracking-wider"
                  style={{ backgroundColor: activeMilestone.hexColor }}
                >
                  {activeMilestone.tag}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/70 border border-blue-200/80 dark:border-white/15 shadow-xs text-blue-700 dark:text-blue-300 font-mono font-bold text-xs sm:text-sm">
              <WebIcon name="calendar" className="w-4 h-4 shrink-0" />
              <span>{activeMilestone.period}</span>
            </div>
          </div>
        </div>

        {/* Master Row: Thông tin vị trí + Lĩnh vực hoạt động & Sản phẩm */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] items-stretch">
          {/* Cột 1: Thông tin vị trí */}
          <div className="p-4 sm:p-5 rounded-3xl border border-blue-200/80 dark:border-white/15 bg-gradient-to-br from-white/90 via-blue-50/40 to-indigo-50/50 dark:from-slate-900/90 dark:via-indigo-950/40 dark:to-slate-900/80 shadow-md flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-blue-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <WebIcon name="briefcase" className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <h4 className="text-sm sm:text-base font-black text-indigo-900 dark:text-white font-play">
                    Thông Tin Vị Trí
                  </h4>
                </div>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-mono truncate max-w-[180px]">
                  {activeMilestone.code ? `Mốc ${activeMilestone.code}` : activeMilestone.company}
                </span>
              </div>

              <div className="grid grid-cols-12 gap-3 items-stretch">
                <div className="col-span-12 sm:col-span-6 p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-pink-200/80 dark:border-pink-500/30 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-base">
                    <WebIcon name="trophy" className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-pink-600 dark:text-pink-400 font-mono block">
                      Chức vụ
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-snug block mt-0.5">
                      {activeMilestone.roleTitle}
                    </span>
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-6 p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-blue-200/80 dark:border-blue-500/30 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-base">
                    <WebIcon name="users" className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 font-mono block">
                      Quy mô quản lý
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-snug block mt-0.5">
                      {activeMilestone.scaleDesc || `${activeMilestone.headcount} Nhân sự`}
                    </span>
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-6 p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-indigo-200/80 dark:border-indigo-500/30 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-base">
                    <WebIcon name="clock" className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 font-mono block">
                      Thời gian công tác
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-snug block mt-0.5">
                      {activeMilestone.period}
                    </span>
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-6 p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-fuchsia-200/80 dark:border-fuchsia-500/30 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-base">
                    <WebIcon name="globe" className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-fuchsia-600 dark:text-fuchsia-400 font-mono block">
                      Lĩnh vực
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-snug block mt-0.5 line-clamp-2">
                      {activeMilestone.industry || activeMilestone.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2: Thẻ Lĩnh Vực Hoạt Động */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <WebIcon name="globe" className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-play">
                    Lĩnh Vực Hoạt Động
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  DOMAINS &amp; SCOPE
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {activeMilestone.domains.map((d) => (
                  <div
                    key={d.title}
                    className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2.5 hover:border-violet-300 dark:hover:border-violet-400 transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                        <WebIcon name="sparkles" className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white block truncate">
                            {d.title}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-bold font-mono border border-violet-200 dark:border-violet-800/60">
                            {d.tag}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1 mt-0.5">
                          {d.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hàng bất đối xứng: Hình ảnh kỷ niệm (Col 4) + Banner & Giới thiệu (Col 8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch">
          {/* Col 4: Carousel ảnh kỷ niệm 3s với nút điều khiển & Lightbox */}
          <div className="lg:col-span-4 p-4 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-3 text-left">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <WebIcon name="camera" className="w-4 h-4 text-pink-600 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 font-play">
                    Hình Ảnh Kỷ Niệm
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    className="text-[10px] font-mono text-slate-500 hover:text-indigo-600 px-1.5 py-0.5 rounded bg-slate-200/80 cursor-pointer inline-flex items-center gap-1"
                  >
                    {isPaused ? (
                      <>
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                        <span>Chạy</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                        <span>Dừng</span>
                      </>
                    )}
                  </button>
                  <span className="text-[10px] font-mono text-slate-400">3s</span>
                </div>
              </div>

              <div
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 shadow-inner group cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => setIsPhotoLightboxOpen(true)}
                title="Bấm để xem ảnh phóng to"
              >
                <img
                  src={
                    activeMilestone.photos[carouselSlideIdx]?.src ||
                    activeMilestone.memoryImg ||
                    activeMilestone.logo
                  }
                  alt="Kỷ niệm"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      activeMilestone.memoryImg || activeMilestone.logo;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-600 text-white font-bold inline-block mb-0.5 max-w-fit shadow-xs">
                    Kỷ niệm {carouselSlideIdx + 1}/{activeMilestone.photos.length}
                  </span>
                  <h5 className="text-xs font-bold text-white tracking-wide truncate">
                    {activeMilestone.photos[carouselSlideIdx]?.title || activeMilestone.company}
                  </h5>
                  <p className="text-[10px] text-amber-300 font-medium line-clamp-1">
                    {activeMilestone.photos[carouselSlideIdx]?.desc ||
                      'Hành trình cống hiến & phát triển cùng tập thể'}
                  </p>
                </div>

                {/* Left & Right Arrow Buttons inside Carousel */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselSlideIdx((prev) =>
                      prev > 0 ? prev - 1 : activeMilestone.photos.length - 1
                    );
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-pink-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselSlideIdx((prev) =>
                      prev < activeMilestone.photos.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-pink-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer"
                >
                  ›
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-2">
                {activeMilestone.photos.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setCarouselSlideIdx(pIdx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      pIdx === carouselSlideIdx
                        ? 'w-4 h-1.5 bg-pink-600'
                        : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-400/30 text-center">
              <span className="text-[11px] font-black text-indigo-700 tracking-wider font-mono">
                Khát vọng • Kỷ luật • Thành công
              </span>
            </div>
          </div>

          {/* Col 8: Hình Banner & Giới thiệu + Triết lý quản trị */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {(activeMilestone.bannerUrl || activeMilestone.memoryImg) && (
              <div className="w-full rounded-2xl overflow-hidden aspect-[24/6] bg-slate-900/10 border border-slate-200 shadow-xs group">
                <img
                  src={activeMilestone.bannerUrl || activeMilestone.memoryImg}
                  alt={`${activeMilestone.company} Banner`}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const fallback =
                      activeMilestone.memoryImg ||
                      activeMilestone.photos[0]?.src ||
                      activeMilestone.logo;
                    if (img.src !== fallback) {
                      img.src = fallback;
                    }
                  }}
                />
              </div>
            )}

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <WebIcon name="target" className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-blue-700 tracking-wider font-mono">
                      Giới Thiệu &amp; Định Hướng Quản Trị
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
                    {activeMilestone.period}
                  </span>
                </div>

                {/* Danh sách Giới thiệu đánh số 1, 2, 3 */}
                {activeMilestone.intro && activeMilestone.intro.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {activeMilestone.intro.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-indigo-300 transition flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-indigo-900 font-play leading-tight">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-700 leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium text-justify">
                      {activeMilestone.highlightText}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                        <span className="text-[10.5px] font-black text-indigo-700 tracking-wider block mb-0.5 font-play">
                          Mở rộng hệ sinh thái
                        </span>
                        <p className="text-xs text-slate-700 leading-snug">
                          {activeMilestone.paragraphs[0] ||
                            'Quản trị quy trình chăm sóc khách hàng đa kênh.'}
                        </p>
                      </div>
                      <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                        <span className="text-[10.5px] font-black text-amber-700 tracking-wider block mb-0.5 font-play">
                          Chuyển đổi số &amp; tối ưu
                        </span>
                        <p className="text-xs text-slate-700 leading-snug">
                          {activeMilestone.paragraphs[1] ||
                            'Tối ưu hóa quy trình, tích hợp dữ liệu số và kiểm soát rủi ro.'}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Triết Lý Quản Trị */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 border border-indigo-200/80">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-serif text-xl leading-none">“</span>
                  <p className="text-xs text-indigo-950 font-semibold leading-relaxed">
                    <span className="font-black tracking-wider text-indigo-700 font-play">
                      Triết Lý Quản Trị:
                    </span>{' '}
                    {activeMilestone.philosophy ||
                      'Xây dựng hệ thống vững chắc trước khi mở rộng quy mô — Con người song hành công nghệ — Luôn lấy trải nghiệm khách hàng làm kim chỉ nam.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lưới 3 cột thực thi (01: Mô tả công việc - 02: Dự án trọng điểm - 03: Cam kết chất lượng & Kết quả KPI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] items-stretch pt-1">
          {/* 01. Mô tả công việc */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-200">
                <span className="text-xl font-mono font-black text-indigo-600">01</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 font-play">
                  Mô Tả Công Việc
                </span>
              </div>
              <div className="space-y-2">
                {activeMilestone.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 leading-snug"
                  >
                    <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 02. Dự Án Trọng Điểm */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-200">
                <span className="text-xl font-mono font-black text-amber-600">02</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 font-play">
                  Dự Án Trọng Điểm
                </span>
              </div>
              <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                {activeMilestone.projects.map((proj) => (
                  <div
                    key={proj}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs"
                  >
                    <WebIcon name="folder" className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="leading-snug">{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 03. Cam Kết Chất Lượng & Kết Quả KPI */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-3">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-200">
                  <span className="text-xl font-mono font-black text-emerald-600">03</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-play">
                    Cam Kết &amp; Kết Quả KPI
                  </span>
                </div>

                {/* Cam kết chất lượng */}
                {activeMilestone.commitments && activeMilestone.commitments.length > 0 && (
                  <div className="mb-3 p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                    <span className="text-[10.5px] font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 font-play">
                      <WebIcon name="shield" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Cam kết chất lượng:</span>
                    </span>
                    {activeMilestone.commitments.map((c, cIdx) => (
                      <p
                        key={cIdx}
                        className="text-[11px] text-emerald-950 font-medium leading-snug flex items-start gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                        <span>{c}</span>
                      </p>
                    ))}
                  </div>
                )}

                {/* Kết quả KPI */}
                <div className="space-y-2.5">
                  {activeMilestone.kpis.map((kpi) => (
                    <div key={kpi.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold gap-2">
                        <span className="text-slate-800 truncate">{kpi.label}</span>
                        <span className="text-emerald-600 font-mono font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] shrink-0">
                          {kpi.percent}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${kpi.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Milestone Navigation Bar: Prev & Next Milestone */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 flex-wrap">
          {prevKey ? (
            <button
              type="button"
              onClick={() => handleSelectMilestone(prevKey)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 transition-all text-xs font-bold cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m12 19-7-7 7-7M19 12H5" /></svg>
              <span>Trước: {EXPERIENCE_MILESTONES[prevKey]?.company}</span>
            </button>
          ) : (
            <div />
          )}

          {nextKey ? (
            <button
              type="button"
              onClick={() => handleSelectMilestone(nextKey)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all text-xs font-bold cursor-pointer ml-auto"
            >
              <span>Tiếp theo: {EXPERIENCE_MILESTONES[nextKey]?.company}</span>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
      )}

      {/* Lightbox Modal for Photo */}
      {isPhotoLightboxOpen && (
        <div
          onClick={() => setIsPhotoLightboxOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl relative"
          >
            <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center">
              <img
                src={
                  activeMilestone.photos[carouselSlideIdx]?.src ||
                  activeMilestone.memoryImg ||
                  activeMilestone.logo
                }
                alt="Kỷ niệm phóng to"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setIsPhotoLightboxOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-white">
              <h4 className="text-sm font-bold">
                {activeMilestone.photos[carouselSlideIdx]?.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {activeMilestone.photos[carouselSlideIdx]?.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
