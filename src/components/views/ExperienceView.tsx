'use client';

import React, { useState, useEffect } from 'react';
import { EXPERIENCE_MILESTONES } from '@/data/experience';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { useLanguage } from '@/context/LanguageContext';

export const ExperienceView: React.FC = () => {
  const { lang } = useLanguage();
  const isVi = lang === 'vi';
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

  // Keyboard navigation: Escape closes Job Card or Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPhotoLightboxOpen) {
          setIsPhotoLightboxOpen(false);
        } else if (showJobCard) {
          setShowJobCard(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoLightboxOpen, showJobCard]);

  const handleSelectMilestone = (key: string) => {
    setActiveKey(key);
    showToast(
      isVi
        ? `Đã chọn mốc: ${EXPERIENCE_MILESTONES[key]?.company || key}`
        : `Selected: ${EXPERIENCE_MILESTONES[key]?.company || key}`
    );
  };

  const handleOpenJobCard = (key: string) => {
    setActiveKey(key);
    setShowJobCard(true);
    showToast(
      isVi
        ? `Chi tiết công tác: ${EXPERIENCE_MILESTONES[key]?.company || key}`
        : `Milestone details: ${EXPERIENCE_MILESTONES[key]?.company || key}`
    );
  };

  // 8 Timeline Milestones matching exact design in media_1792691307558_e31ceccc.png (2003 -> 2026+)
  const roadmapCards = [
    {
      key: '2003',
      yearBadge: isVi ? 'Năm 2003' : 'Year 2003',
      company: 'MobiFone',
      shortName: 'MOBIFONE',
      roleSummary: isVi ? 'Nhân viên CSKH' : 'Customer Support Specialist',
      headcountLabel: isVi ? '12 Nhân sự' : '12 Members',
      badgeColor: '#0284c7',
      circleLogo: '/images/experience/milestones/logo-2003.png',
      fallbackLogo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png',
      phaseTitle: isVi ? 'Khởi động\nkế hoạch' : 'Plan\nInitiation',
      cardBg: 'linear-gradient(180deg, #f0f7ff 0%, #e1effe 100%)',
      cardBorder: 'rgba(191, 219, 254, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284c7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a2 2 0 100 4 2 2 0 000-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 5.5L7 21h10l-3.5-15.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 13h7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a5 5 0 010 7M8 8a5 5 0 000 7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 5a9 9 0 010 13M5 5a9 9 0 000 13" />
        </svg>
      ),
    },
    {
      key: '2007',
      yearBadge: isVi ? 'Năm 2007' : 'Year 2007',
      company: 'CallV247.com',
      shortName: 'VIỄN LIÊN V247',
      roleSummary: isVi ? 'Giám sát Supervisor' : 'CS Supervisor / Team Lead',
      headcountLabel: isVi ? '12 Nhân sự' : '12 Members',
      badgeColor: '#7c3aed',
      circleLogo: '/images/experience/milestones/logo-2007.png',
      fallbackLogo: 'https://i.ibb.co/QvtbdnfP/V247.png',
      phaseTitle: isVi ? 'Tuyển dụng\nnhân sự' : 'Talent\nRecruitment',
      cardBg: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 100%)',
      cardBorder: 'rgba(233, 213, 255, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7c3aed]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-1a4 4 0 00-4-4H9a4 4 0 00-4 4v1" />
          <circle cx="11" cy="7" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 20v-1a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      key: '2011',
      yearBadge: isVi ? 'Năm 2011' : 'Year 2011',
      company: 'LBC',
      shortName: 'LBC - HTVC',
      roleSummary: isVi ? 'Trưởng Phòng CSKH' : 'Customer Care Manager',
      headcountLabel: isVi ? '12 Nhân sự' : '12 Members',
      badgeColor: '#059669',
      circleLogo: '/images/experience/milestones/logo-2011.png',
      fallbackLogo: 'https://i.ibb.co/R4YXWyzF/LBC.png',
      phaseTitle: isVi ? 'Phát triển\nthương hiệu LB' : 'LB Brand\nBuilding',
      cardBg: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)',
      cardBorder: 'rgba(167, 243, 208, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#059669]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 15l4-4 4 3 6-7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 7h4v4" />
        </svg>
      ),
    },
    {
      key: '2013',
      yearBadge: isVi ? 'Năm 2013' : 'Year 2013',
      company: 'VIETNAM ESPORTS',
      shortName: 'VED / GARENA',
      roleSummary: isVi ? 'Trưởng Phòng CSKH' : 'Customer Support Manager',
      headcountLabel: isVi ? '130 Nhân sự' : '130 Members',
      badgeColor: '#06b6d4',
      circleLogo: '/images/experience/milestones/logo-2013.png',
      fallbackLogo: 'https://i.ibb.co/fYPJLfbw/VED.png',
      phaseTitle: isVi ? 'Thiết kế\nsản phẩm' : 'Product\nDesign',
      cardBg: 'linear-gradient(180deg, #f0fdfa 0%, #cffafe 100%)',
      cardBorder: 'rgba(165, 243, 252, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#06b6d4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: '2016',
      yearBadge: isVi ? 'Năm 2016' : 'Year 2016',
      company: 'PRUDENTIAL',
      shortName: 'PRUDENTIAL',
      roleSummary: isVi ? 'Trưởng Phòng Call Center' : 'Call Center Manager',
      headcountLabel: isVi ? '52 Nhân sự' : '52 Members',
      badgeColor: '#ea580c',
      circleLogo: '/images/experience/milestones/logo-2016.png',
      fallbackLogo: 'https://i.ibb.co/XfpQphWF/Prudential.png',
      phaseTitle: isVi ? 'Sản xuất\nsản phẩm' : 'Product\nOperations',
      cardBg: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)',
      cardBorder: 'rgba(254, 215, 170, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h20M3 20V9l5 4V9l5 4V5h7v15" />
          <line x1="17" y1="9" x2="17.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="17" y1="13" x2="17.01" y2="13" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: '2018',
      yearBadge: isVi ? 'Năm 2018' : 'Year 2018',
      company: 'MoMo',
      shortName: 'MOMO',
      roleSummary: isVi ? 'Trưởng Phòng CSKH' : 'Customer Support Manager',
      headcountLabel: isVi ? '60 Nhân sự' : '60 Members',
      badgeColor: '#db2777',
      circleLogo: '/images/experience/milestones/logo-2018.png',
      fallbackLogo: 'https://i.ibb.co/k2QtrgTw/Momo.png',
      phaseTitle: isVi ? 'Ra mắt\ntrên MoMo' : 'MoMo\nLaunch',
      cardBg: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
      cardBorder: 'rgba(251, 207, 232, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#db2777]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="10" y1="4" x2="14" y2="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: '2023',
      yearBadge: isVi ? 'Năm 2023' : 'Year 2023',
      company: 'Finviet',
      shortName: 'FINVIET',
      roleSummary: isVi ? 'Trưởng Phòng CSKH' : 'Customer Support Manager',
      headcountLabel: isVi ? '17 Nhân sự' : '17 Members',
      badgeColor: '#d97706',
      circleLogo: '/images/experience/milestones/logo-2023.png',
      fallbackLogo: 'https://i.ibb.co/7NtSSz4d/Finviet.png',
      phaseTitle: isVi ? 'Truyền thông\n& Marketing' : 'Marketing\n& Comms',
      cardBg: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
      cardBorder: 'rgba(253, 230, 138, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#d97706]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l18-5v12L3 14v-3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 9a3 3 0 010 6" />
        </svg>
      ),
    },
    {
      key: '2026',
      yearBadge: isVi ? 'Năm 2026+' : 'Year 2026+',
      company: 'CS Strategy AI',
      shortName: 'CS STRATEGY',
      roleSummary: isVi ? 'Head of CS / CS Director' : 'Head of CS / CS Director',
      headcountLabel: isVi ? '100+ Nhân sự' : '100+ Members',
      badgeColor: '#0284c7',
      circleLogo: '/images/experience/milestones/logo-2026.png',
      fallbackLogo: 'https://i.ibb.co/G4QnNzWb/Power-Service.png',
      phaseTitle: isVi ? 'Đánh giá\n& Mở rộng' : 'Evaluation\n& Scale',
      cardBg: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)',
      cardBorder: 'rgba(186, 230, 253, 0.95)',
      cardIcon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284c7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
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
      c.company.toLowerCase().includes(q) ||
      c.phaseTitle.toLowerCase().includes(q) ||
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
      className={`w-full h-full flex-1 flex flex-col justify-between gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 dark:text-slate-100 ${
        showJobCard ? 'overflow-y-auto no-scrollbar pb-6' : 'overflow-hidden'
      }`}
    >
      {!showJobCard && (
        <>
          {/* 1. TOP HERO BANNER: HÀNH TRÌNH SỰ NGHIỆP */}
          <div className="w-full relative rounded-[22px] overflow-hidden px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#eaf4ff]/95 via-[#f2f7ff]/90 to-[#ffffff]/95 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 border border-white/90 dark:border-white/10 shadow-[0_8px_30px_rgba(62,115,180,0.08)] flex flex-col md:flex-row items-center justify-between gap-3 min-h-[148px] shrink-0">
            {/* Left: Title & Subtitle & History Pill */}
            <div className="flex-1 flex flex-col justify-between h-full text-left z-10">
              <div>
                <h2 className="text-xl sm:text-[25px] font-black tracking-tight font-play leading-tight flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <span className="inline-flex animate-banner-icon shrink-0 text-indigo-600 dark:text-indigo-400">
                    <WebIcon name="briefcase" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <span>{isVi ? 'Kinh Nghiệm Thực Chiến' : 'Professional Experience'}</span>
                </h2>
                <div className="w-10 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 my-1" />
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm leading-snug">
                  {isVi
                    ? 'Từ những bước đi đầu tiên đến hành trình kiến tạo giá trị cùng những người đồng hành tuyệt vời.'
                    : 'From initial foundations to the journey of creating lasting CX value with exceptional teams.'}
                </p>
              </div>

              {/* Lịch Sử Công Tác pill */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                    <WebIcon name="calendar" className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-play">
                    {isVi ? 'Lịch Sử Công Tác' : 'Career Timeline'}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-700/50">
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
                <p className="font-banner-quote text-2xl sm:text-3xl lg:text-[32px] text-amber-500 dark:text-amber-300 font-normal leading-tight select-none">
                  {isVi ? '“Khách hàng là trung tâm – Tạo giá trị bền vững.”' : '“Customer-centricity – Creating sustainable value.”'}
                </p>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-600/90 dark:text-amber-200/90 mt-0.5 block tracking-wider font-play">
                  — Nguyễn Hùng Thái
                </span>
                <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent relative mt-1 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                </div>
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
                  placeholder={isVi ? 'Tìm công ty, vị trí, năm...' : 'Search company, role, year...'}
                  className="w-full pl-8 pr-8 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    title={isVi ? 'Làm mới bộ lọc' : 'Clear search'}
                    className="absolute right-2.5 w-4 h-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 cursor-pointer text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. TIMELINE KINH NGHIỆM THỰC CHIẾN (CHÍNH XÁC THEO THIẾT KẾ ĐÍNH KÈM) */}
          <div className="w-full flex-1 min-h-0 rounded-[22px] px-3 sm:px-5 py-4 bg-white/85 dark:bg-[#121218]/85 border border-white/90 dark:border-white/10 backdrop-blur-[20px] shadow-[0_10px_35px_rgba(62,115,180,0.09)] overflow-x-auto no-scrollbar relative flex flex-col justify-center items-center">
            <div className="w-full min-w-[960px] flex items-center justify-between gap-1 sm:gap-2 px-1 relative my-auto">
              {/* Horizontal Connecting Track between the circular logo badges */}
              <div className="absolute top-[82px] sm:top-[92px] left-[5%] right-[5%] h-[2.5px] bg-slate-200 dark:bg-slate-700/80 -z-0 rounded-full" />

              {filteredRoadmapCards.map((item, idx) => {
                const isSelected = activeKey === item.key;
                const isLast = idx === filteredRoadmapCards.length - 1;

                return (
                  <div key={item.key} className="flex-1 flex flex-col items-center justify-between h-full py-1 relative z-10 group">
                    {/* 1. TOP YEAR PILL BADGE & VERTICAL CONNECTOR */}
                    <div className="flex flex-col items-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSelectMilestone(item.key)}
                        className={`px-3.5 py-1 rounded-full text-white font-black text-[11px] sm:text-xs tracking-tight whitespace-nowrap cursor-pointer transition-all duration-300 shadow-sm ${
                          isSelected
                            ? 'scale-110 ring-2 ring-white shadow-md'
                            : 'hover:scale-105 opacity-95 hover:opacity-100'
                        }`}
                        style={{ background: item.badgeColor }}
                      >
                        {item.yearBadge}
                      </button>

                      {/* Vertical line with dot */}
                      <div
                        className="w-[2px] h-3.5 sm:h-5 relative flex items-center justify-center my-0.5"
                        style={{ background: item.badgeColor }}
                      >
                        <span
                          className="w-2 h-2 rounded-full border-2 border-white dark:border-slate-800 shadow-xs"
                          style={{ background: item.badgeColor }}
                        />
                      </div>
                    </div>

                    {/* 2. CENTER CIRCULAR LOGO BADGE & CONNECTING CHEVRON » */}
                    <div className="relative flex items-center justify-center shrink-0 my-1">
                      {/* Circular Logo Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenJobCard(item.key)}
                        title={isVi ? `Bấm xem chi tiết: ${item.company}` : `Click to view details: ${item.company}`}
                        className={`w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-full bg-white p-1.5 sm:p-2 flex items-center justify-center cursor-pointer transition-all duration-300 relative z-10 ${
                          isSelected
                            ? 'scale-110 shadow-xl'
                            : 'hover:scale-105 shadow-md hover:shadow-lg'
                        }`}
                        style={{
                          border: `3px solid ${item.badgeColor}`,
                          boxShadow: isSelected
                            ? `0 0 24px ${item.badgeColor}85, 0 4px 14px rgba(0,0,0,0.15)`
                            : `0 0 16px ${item.badgeColor}35, 0 2px 8px rgba(0,0,0,0.06)`,
                        }}
                      >
                        <img
                          src={item.circleLogo}
                          alt={item.company}
                          className="w-full h-full object-contain rounded-full transition-transform duration-200 group-hover:scale-105 select-none"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = item.fallbackLogo;
                          }}
                        />
                      </button>

                      {/* Connecting Chevron Arrow Pill ( » ) to next circle */}
                      {!isLast && (
                        <div className="absolute -right-[15px] sm:-right-[18px] z-20 pointer-events-none">
                          <div
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white shadow-sm border-2 border-white dark:border-slate-800"
                            style={{ background: item.badgeColor }}
                          >
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7M15 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. VERTICAL CONNECTOR TO BOTTOM CARD */}
                    <div
                      className="w-[2px] h-3.5 sm:h-5 relative flex items-center justify-center my-0.5 shrink-0"
                      style={{ background: item.badgeColor }}
                    >
                      <span
                        className="w-2 h-2 rounded-full border-2 border-white dark:border-slate-800 shadow-xs"
                        style={{ background: item.badgeColor }}
                      />
                    </div>

                    {/* 4. BOTTOM PASTEL INFORMATION CARD */}
                    <div
                      onClick={() => handleOpenJobCard(item.key)}
                      className={`w-full rounded-[16px] sm:rounded-[20px] py-2.5 sm:py-3 px-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border shrink-0 min-h-[96px] sm:min-h-[104px] ${
                        isSelected
                          ? 'scale-105 ring-2 ring-white shadow-md'
                          : 'hover:scale-[1.02] shadow-2xs hover:shadow-xs'
                      }`}
                      style={{
                        background: item.cardBg,
                        borderColor: item.cardBorder,
                      }}
                      title={isVi ? `Bấm xem chi tiết: ${item.company}` : `Click to view details: ${item.company}`}
                    >
                      {/* Circular Vector Icon Container */}
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-2xs flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shrink-0"
                        style={{ color: item.badgeColor }}
                      >
                        {item.cardIcon}
                      </div>

                      {/* Phase Title (Exact matching image) */}
                      <h4 className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 dark:text-slate-100 font-play leading-tight px-0.5 whitespace-pre-line">
                        {item.phaseTitle}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Footer hint */}
            <div className="mt-2 text-[10.5px] font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 pointer-events-none select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>
                {isVi
                  ? 'Bấm vào logo hoặc thẻ để xem hồ sơ công tác, thành tựu & sản phẩm chi tiết'
                  : 'Click on logo or card to view detailed milestone portfolio & achievements'}
              </span>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          3. THẺ CHI TIẾT CỘT MỐC ĐANG CHỌN (CHỈ HIỆN KHI CLICK VÀO LOGO / XEM CHI TIẾT)
          ===================================================================== */}
      {showJobCard && (
        <div className="w-full p-4 sm:p-6 rounded-[24px] bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/15 shadow-xl flex flex-col gap-5 text-left transition-all duration-300 backdrop-blur-2xl mt-1 animate-fadeIn">
          {/* Header Bar with Breadcrumbs & Close button */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 flex-wrap gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setShowJobCard(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs font-bold border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>{isVi ? 'Quay lại dòng thời gian' : 'Back to timeline'}</span>
              </button>

              <span className="text-slate-300 dark:text-slate-600">|</span>

              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                {isVi ? 'Chi tiết:' : 'Milestone:'}{' '}
                <strong className="text-slate-800 dark:text-white font-bold">{activeMilestone.company}</strong>
              </span>

              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/80 dark:border-blue-800/40 shrink-0">
                {activeMilestone.period}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowJobCard(false)}
              title={isVi ? 'Đóng chi tiết kinh nghiệm (ESC)' : 'Close details (ESC)'}
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
              <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/15 shadow-sm flex flex-col items-center gap-1.5 shrink-0">
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
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {isVi ? 'Sản phẩm' : 'Products'}
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
                      {isVi ? 'Thông Tin Vị Trí' : 'Position Information'}
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
                        {isVi ? 'Chức vụ' : 'Role Title'}
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
                        {isVi ? 'Quy mô quản lý' : 'Team Scale'}
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-white leading-snug block mt-0.5">
                        {activeMilestone.scaleDesc || `${activeMilestone.headcount} ${isVi ? 'Nhân sự' : 'Members'}`}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-indigo-200/80 dark:border-indigo-500/30 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-base">
                      <WebIcon name="clock" className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 font-mono block">
                        {isVi ? 'Thời gian công tác' : 'Tenure Period'}
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
                        {isVi ? 'Lĩnh vực' : 'Industry'}
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
                      {isVi ? 'Lĩnh Vực Hoạt Động' : 'Operating Domains'}
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
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-bold font-mono border border-violet-200 dark:border-violet-800/60">
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
            <div className="lg:col-span-4 p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between gap-3 text-left">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <WebIcon name="camera" className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                      {isVi ? 'Hình Ảnh Kỷ Niệm' : 'Memory Gallery'}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsPaused(!isPaused)}
                      className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700/80 cursor-pointer inline-flex items-center gap-1"
                    >
                      {isPaused ? (
                        <>
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                          <span>{isVi ? 'Chạy' : 'Play'}</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                          <span>{isVi ? 'Dừng' : 'Pause'}</span>
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
                  title={isVi ? 'Bấm để xem ảnh phóng to' : 'Click to enlarge'}
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
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-600 text-white font-bold inline-block mb-0.5 max-w-fit shadow-xs">
                      {isVi ? 'Kỷ niệm' : 'Memory'} {carouselSlideIdx + 1}/{activeMilestone.photos.length}
                    </span>
                    <h5 className="text-xs font-bold text-white tracking-wide truncate">
                      {activeMilestone.photos[carouselSlideIdx]?.title || activeMilestone.company}
                    </h5>
                    <p className="text-[10px] text-amber-300 font-medium line-clamp-1">
                      {activeMilestone.photos[carouselSlideIdx]?.desc ||
                        (isVi ? 'Hành trình cống hiến & phát triển cùng tập thể' : 'Journey of dedication with team')}
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
                          : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 border border-pink-400/30 text-center">
                <span className="text-[11px] font-black text-indigo-700 dark:text-indigo-300 tracking-wider font-mono">
                  {isVi ? 'Khát vọng • Kỷ luật • Thành công' : 'Aspiration • Discipline • Excellence'}
                </span>
              </div>
            </div>

            {/* Col 8: Hình Banner & Giới thiệu + Triết lý quản trị */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              {(activeMilestone.bannerUrl || activeMilestone.memoryImg) && (
                <div className="w-full rounded-2xl overflow-hidden aspect-[24/6] bg-slate-900/10 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 shadow-xs group">
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

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800/85 border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <WebIcon name="target" className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-300 tracking-wider font-mono">
                        {isVi ? 'Giới Thiệu & Định Hướng Quản Trị' : 'Introduction & Management Orientation'}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/60 font-mono">
                      {activeMilestone.period}
                    </span>
                  </div>

                  {/* Danh sách Giới thiệu đánh số 1, 2, 3 */}
                  {activeMilestone.intro && activeMilestone.intro.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {activeMilestone.intro.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500 transition flex flex-col gap-1"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-black text-indigo-900 dark:text-indigo-300 font-play leading-tight">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium text-justify">
                        {activeMilestone.highlightText}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/40">
                          <span className="text-[10.5px] font-black text-indigo-700 dark:text-indigo-300 tracking-wider block mb-0.5 font-play">
                            {isVi ? 'Mở rộng hệ sinh thái' : 'Ecosystem Expansion'}
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                            {activeMilestone.paragraphs[0] ||
                              (isVi ? 'Quản trị quy trình chăm sóc khách hàng đa kênh.' : 'Managing omnichannel customer service.')}
                          </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/40">
                          <span className="text-[10.5px] font-black text-amber-700 dark:text-amber-300 tracking-wider block mb-0.5 font-play">
                            {isVi ? 'Chuyển đổi số & tối ưu' : 'Digital Transformation'}
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                            {activeMilestone.paragraphs[1] ||
                              (isVi ? 'Tối ưu hóa quy trình, tích hợp dữ liệu số và kiểm soát rủi ro.' : 'Process optimization, digital data integration and risk control.')}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Triết Lý Quản Trị */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 dark:from-indigo-950/50 dark:via-blue-950/50 dark:to-teal-950/50 border border-indigo-200/80 dark:border-indigo-800/50">
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-serif text-xl leading-none">“</span>
                    <p className="text-xs text-indigo-950 dark:text-indigo-200 font-semibold leading-relaxed">
                      <span className="font-black tracking-wider text-indigo-700 dark:text-indigo-300 font-play">
                        {isVi ? 'Triết Lý Quản Trị:' : 'Management Philosophy:'}
                      </span>{' '}
                      {activeMilestone.philosophy ||
                        (isVi
                          ? 'Xây dựng hệ thống vững chắc trước khi mở rộng quy mô — Con người song hành công nghệ — Luôn lấy trải nghiệm khách hàng làm kim chỉ nam.'
                          : 'Build solid foundations before scaling — People aligned with technology — Always keeping customer experience as the guiding compass.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lưới 3 cột thực thi (01: Mô tả công việc - 02: Dự án trọng điểm - 03: Cam kết chất lượng & Kết quả KPI) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] items-stretch pt-1">
            {/* 01. Mô tả công việc */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-200 dark:border-white/10">
                  <span className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400">01</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                    {isVi ? 'Mô Tả Công Việc' : 'Key Responsibilities'}
                  </span>
                </div>
                <div className="space-y-2">
                  {activeMilestone.tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug"
                    >
                      <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 02. Dự Án Trọng Điểm */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-200 dark:border-white/10">
                  <span className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">02</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                    {isVi ? 'Dự Án Trọng Điểm' : 'Key Strategic Projects'}
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
                  {activeMilestone.projects.map((proj) => (
                    <div
                      key={proj}
                      className="p-2 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs hover:border-amber-300 transition"
                    >
                      <WebIcon name="folder" className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="leading-snug">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 03. Cam Kết Chất Lượng & Kết Quả KPI */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-200 dark:border-white/10">
                    <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">03</span>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                      {isVi ? 'Cam Kết & Kết Quả KPI' : 'Commitments & KPIs'}
                    </span>
                  </div>

                  {/* Cam kết chất lượng */}
                  {activeMilestone.commitments && activeMilestone.commitments.length > 0 && (
                    <div className="mb-3 p-2.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 space-y-1">
                      <span className="text-[10.5px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 font-play">
                        <WebIcon name="shield" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{isVi ? 'Cam kết chất lượng:' : 'Quality Commitment:'}</span>
                      </span>
                      {activeMilestone.commitments.map((c, cIdx) => (
                        <p
                          key={cIdx}
                          className="text-[11px] text-emerald-950 dark:text-emerald-200 font-medium leading-snug flex items-start gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
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
                          <span className="text-slate-800 dark:text-slate-200 truncate">{kpi.label}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40 text-[11px] shrink-0">
                            {kpi.percent}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
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

          {/* Bottom Milestone Navigation Bar: Prev, Back, Next Milestone */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-white/10 flex-wrap">
            {prevKey ? (
              <button
                type="button"
                onClick={() => handleSelectMilestone(prevKey)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-white/10 transition-all text-xs font-bold cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m12 19-7-7 7-7M19 12H5" /></svg>
                <span>{isVi ? 'Trước:' : 'Prev:'} {EXPERIENCE_MILESTONES[prevKey]?.company}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => setShowJobCard(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all text-xs font-bold cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{isVi ? 'Quay lại dòng thời gian' : 'Back to timeline'}</span>
            </button>

            {nextKey ? (
              <button
                type="button"
                onClick={() => handleSelectMilestone(nextKey)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all text-xs font-bold cursor-pointer ml-auto"
              >
                <span>{isVi ? 'Tiếp theo:' : 'Next:'} {EXPERIENCE_MILESTONES[nextKey]?.company}</span>
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
