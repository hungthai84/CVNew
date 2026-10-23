'use client';

import React, { useState } from 'react';
import { DOMAINS_DATA } from '@/data/domains';
import { DomainData } from '@/types';

import { HeroBanner } from '@/components/ui/HeroBanner';

export const DomainsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<DomainData | null>(null);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState<boolean>(false);

  // Unframed vector icon before each domain title (matching title size & color)
  // Unframed vector icon before each domain title (matching title size & color)
  const getDomainBadgeIcon = (id: string) => {
    switch (id) {
      case '01': // Viễn thông - Radio Signal Tower (( A ))
        return (
          <svg className="w-[25px] h-[25px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M4.8 6.2a9 9 0 0 0 0 10.6M19.2 6.2a9 9 0 0 1 0 10.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7.6 8.5a5.2 5.2 0 0 0 0 6M16.4 8.5a5.2 5.2 0 0 1 0 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="10.5" r="1.9" fill="currentColor" />
            <path d="M12 12.2L8.8 20M12 12.2L15.2 20M10 17h4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case '02': // E-Commerce - Bold Shopping Cart
        return (
          <svg className="w-[25px] h-[25px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2.2l2.2 9.5a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.4-1l1.8-6.7H6.2" />
            <circle cx="9.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="16.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
          </svg>
        );
      case '03': // Bảo hiểm - Shield with Checkmark
        return (
          <svg className="w-[25px] h-[25px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.8L19 5.6v5.6c0 5-3 8.8-7 10.2-4-1.4-7-5.2-7-10.2V5.6L12 2.8z"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinejoin="round"
            />
            <path
              d="M9.2 12.2l2 2 4-4.2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case '04': // eSports - Gamepad
        return (
          <svg className="w-[25px] h-[25px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 7.5h12c2.2 0 3.8 2 3.4 4.2l-.7 4.2c-.3 1.8-2.1 2.7-3.6 1.7l-2.1-1.5H9l-2.1 1.5c-1.5 1-3.3.1-3.6-1.7l-.7-4.2C2.2 9.5 3.8 7.5 6 7.5z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M8 10.5v3.5M6.25 12.25h3.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
            <circle cx="15.5" cy="11" r="1" fill="currentColor" />
            <circle cx="17.5" cy="13" r="1" fill="currentColor" />
          </svg>
        );
      case '05': // FinTech - Wallet
        return (
          <svg className="w-[25px] h-[25px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M6.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h8.5A1.5 1.5 0 0 1 18 6v1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor" />
          </svg>
        );
      case '06': // Hệ thống CSKH - Globe
      default:
        return (
          <svg className="w-[25px] h-[25px] shrink-0" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="2" />
            <path d="M3.5 12h17M4.8 8.2h14.4M4.8 15.8h14.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Visual theme config & title per card ID matching user's requested names
  // Sampled directly from the surroundings and ambient atmosphere of each 3D descriptive illustration
  const getCardVisualConfig = (id: string) => {
    switch (id) {
      case '01': // Viễn thông (Sky/Blue) - Background 50% opacity matching icon
        return {
          fourWordTitle: 'Dịch Vụ Viễn Thông',
          accentColor: '#0284c7',
          cardBg: 'linear-gradient(135deg, rgba(224, 242, 254, 0.5) 0%, rgba(186, 230, 253, 0.5) 100%)',
          cardBorder: 'border-[#38bdf8]/60 hover:border-[#0284c7]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(190, 221, 249, 0.5) 0%, rgba(196, 226, 250, 0.3) 55%, transparent 75%)',
          titleColor: 'text-[#0284c7]',
          pillBg: 'bg-sky-100/90 border-sky-200/90 text-[#0369a1]',
          arrowBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          arrowShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
        };
      case '02': // E-commerce (Orange) - Background 50% opacity matching icon
        return {
          fourWordTitle: 'Thương Mại Điện Tử',
          accentColor: '#ea580c',
          cardBg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(253, 230, 138, 0.5) 100%)',
          cardBorder: 'border-[#fb923c]/60 hover:border-[#ea580c]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(251, 210, 166, 0.5) 0%, rgba(252, 204, 155, 0.3) 55%, transparent 75%)',
          titleColor: 'text-[#ea580c]',
          pillBg: 'bg-orange-100/80 border-orange-200/90 text-[#c2410c]',
          arrowBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
          arrowShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
        };
      case '03': // Bảo hiểm (Rose/Red) - Background 50% opacity matching icon
        return {
          fourWordTitle: 'Dịch Vụ Bảo Hiểm',
          accentColor: '#e11d48',
          cardBg: 'linear-gradient(135deg, rgba(255, 228, 230, 0.5) 0%, rgba(254, 205, 211, 0.5) 100%)',
          cardBorder: 'border-[#f43f5e]/60 hover:border-[#e11d48]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(253, 216, 207, 0.5) 0%, rgba(249, 179, 177, 0.3) 55%, transparent 75%)',
          titleColor: 'text-[#e11d48]',
          pillBg: 'bg-rose-100/80 border-rose-200/90 text-[#be123c]',
          arrowBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
          arrowShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
        };
      case '04': // eSports (Purple) - Background 50% opacity matching icon
        return {
          fourWordTitle: 'Game eSports',
          accentColor: '#7c3aed',
          cardBg: 'linear-gradient(135deg, rgba(243, 232, 255, 0.5) 0%, rgba(233, 213, 255, 0.5) 100%)',
          cardBorder: 'border-[#a855f7]/60 hover:border-[#7c3aed]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(217, 208, 251, 0.5) 0%, rgba(157, 126, 243, 0.3) 55%, transparent 75%)',
          titleColor: 'text-[#7c3aed]',
          pillBg: 'bg-purple-100/80 border-purple-200/90 text-[#5b21b6]',
          arrowBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          arrowShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        };
      case '05': // FinTech (Pink) - Background 50% opacity matching icon
        return {
          fourWordTitle: 'Thanh Toán Điện Tử',
          accentColor: '#db2777',
          cardBg: 'linear-gradient(135deg, rgba(252, 231, 243, 0.5) 0%, rgba(251, 207, 232, 0.5) 100%)',
          cardBorder: 'border-[#ec4899]/60 hover:border-[#db2777]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(233, 198, 228, 0.5) 0%, rgba(224, 199, 239, 0.3) 55%, transparent 75%)',
          titleColor: 'text-[#db2777]',
          pillBg: 'bg-pink-100/80 border-pink-200/90 text-[#be185d]',
          arrowBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
          arrowShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
        };
      case '06': // Xây Dựng Hệ Thống (Emerald) - Background 50% opacity matching icon
      default:
        return {
          fourWordTitle: 'Xây Dựng Hệ Thống',
          accentColor: '#059669',
          cardBg: 'linear-gradient(135deg, rgba(209, 250, 229, 0.5) 0%, rgba(167, 243, 208, 0.5) 100%)',
          cardBorder: 'border-[#10b981]/60 hover:border-[#059669]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(171, 217, 214, 0.5) 0%, rgba(177, 223, 221, 0.3) 55%, transparent 75%)',
          titleColor: 'text-[#059669]',
          pillBg: 'bg-emerald-100/80 border-emerald-200/90 text-[#047857]',
          arrowBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          arrowShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
        };
    }
  };

  // State to track which card is currently hovered
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // High-resolution transparent illustration images according to user request
  const renderCard3DIllustration = (id: string, isHovered: boolean = false) => {
    const imgMap: Record<string, { src: string; alt: string }> = {
      '01': {
        src: 'https://i.ibb.co/4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png',
        alt: 'Dịch vụ viễn thông',
      },
      '02': {
        src: 'https://i.ibb.co/xqcR1Yw3/Th-ng-m-i-i-n-t-removebg-preview.png',
        alt: 'Thương mại điện tử',
      },
      '03': {
        src: 'https://i.ibb.co/B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png',
        alt: 'Dịch vụ bảo hiểm',
      },
      '04': {
        src: 'https://i.ibb.co/pBKmWZHc/Game-e-Sports-removebg-preview.png',
        alt: 'Game e Sports',
      },
      '05': {
        src: 'https://i.ibb.co/hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png',
        alt: 'Thanh toán điện tử',
      },
      '06': {
        src: 'https://i.ibb.co/Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png',
        alt: 'Xây dựng hệ thống',
      },
    };
    const item = imgMap[id] || imgMap['01'];

    return (
      <img
        src={item.src}
        alt={item.alt}
        className={`w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] select-none pointer-events-none transition-transform duration-300 ${
          isHovered ? 'scale-110 brightness-105' : 'scale-100 opacity-95'
        }`}
        loading="eager"
      />
    );
  };

  const filteredDomains = DOMAINS_DATA.filter((d) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'telecom' && d.id === '01') ||
      (filter === 'commerce' && (d.id === '02' || d.id === '05')) ||
      (filter === 'finance' && (d.id === '03' || d.id === '05')) ||
      (filter === 'gaming' && d.id === '04') ||
      (filter === 'systems' && d.id === '06');

    return matchesFilter;
  });

  return (
    <div
      className={`w-full h-full flex-1 flex flex-col justify-between gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 ${
        selectedDomain ? 'overflow-y-auto no-scrollbar pb-2' : 'overflow-hidden'
      }`}
    >
      {/* 1. TOP HERO BANNER */}
      <HeroBanner
        badgeText="Khám phá"
        title="Lĩnh Vực Hoạt Động"
        titleIcon="globe"
        titleColor="text-sky-300"
        quote="“Thực chiến đa ngành kiến tạo giải pháp dịch vụ xuất sắc.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-sky-400"
        bottomControls={
          <div className="w-full flex items-center justify-end pointer-events-auto">
          {!selectedDomain && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar relative">
              {/* Button Giao Diện */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="px-3 py-1 rounded-full text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-xs hover:brightness-110"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span>Giao Diện</span>
                </button>

                {/* Dropdown danh sách giao diện: icon & tiêu đề (4 chữ) */}
                {isThemeDropdownOpen && (
                  <div className="absolute right-0 sm:left-0 mt-1 w-48 rounded-xl bg-slate-900/95 text-white backdrop-blur-md border border-slate-700 shadow-xl z-50 p-1.5 space-y-1">
                    {[
                      { title: 'Sáng Trong', icon: '☀️', desc: 'Giao diện sáng' },
                      { title: 'Tối Neon', icon: '🌙', desc: 'Giao diện tối' },
                      { title: 'Phẳng Sắc', icon: '🎨', desc: 'Thiết kế phẳng' },
                      { title: 'Ngọc Trai', icon: '✨', desc: 'Pastel nhẹ' },
                    ].map((themeItem) => (
                      <button
                        key={themeItem.title}
                        type="button"
                        onClick={() => setIsThemeDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors text-left"
                      >
                        <span className="text-sm">{themeItem.icon}</span>
                        <span className="font-play font-bold tracking-tight">{themeItem.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {[
                {
                  key: 'all',
                  label: 'Tất cả (6)',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z" />
                    </svg>
                  ),
                },
                {
                  key: 'telecom',
                  label: 'Viễn thông',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                    </svg>
                  ),
                },
                {
                  key: 'commerce',
                  label: 'E-Commerce',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                    </svg>
                  ),
                },
                {
                  key: 'finance',
                  label: 'FinTech & Bảo hiểm',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  key: 'gaming',
                  label: 'eSports',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-1.5 3A2 2 0 0117.264 17H6.736a2 2 0 01-1.789-1.106l-1.5-3A2 2 0 015.236 10H10" />
                    </svg>
                  ),
                },
                {
                  key: 'systems',
                  label: 'Xây dựng hệ thống',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  ),
                },
              ].map((item) => {
                const isActive = filter === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-blue-600 shadow-xs'
                        : 'bg-white/95 text-slate-700 border-slate-200/90 hover:bg-white shadow-2xs'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      }
      />

      {/* 3. VÙNG HIỂN THỊ NỘI DUNG LĨNH VỰC (GRID 6 THẺ CĂN CHỈNH CHIỀU CAO NẰM GỌN TRONG THẺ CHÍNH) */}
      <div className="w-full flex-1 min-h-0 relative flex flex-col">
        {!selectedDomain ? (
          /* Grid View 3x2 tự động co giãn chiều cao vừa khít thẻ chính với khoảng cách 15px */
          <div className="w-full h-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-[15px] items-stretch">
            {filteredDomains.map((domain) => {
              const cfg = getCardVisualConfig(domain.id);
              return (
                <div
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain)}
                  onMouseEnter={() => setHoveredCardId(domain.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    background: cfg.cardBg,
                  }}
                  className={`theme-pastel-card rounded-[20px] px-4 py-2.5 border ${cfg.cardBorder} shadow-[0_10px_26px_-4px_rgba(15,23,42,0.12),0_4px_10px_-2px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_24px_50px_-8px_rgba(15,23,42,0.24),0_12px_24px_-4px_rgba(15,23,42,0.12),inset_0_1px_2px_rgba(255,255,255,1)] hover:-translate-y-2 hover:scale-[1.018] active:scale-[0.985] cursor-pointer group/card overflow-hidden relative transition-all duration-300 ease-out flex flex-col justify-between h-full min-h-0 text-left`}
                  title="Bấm để xem chi tiết đầy đủ"
                >
                  {/* Soft ambient background */}
                  <div
                    className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full pointer-events-none transition-all duration-500 opacity-75 group-hover/card:opacity-100 group-hover/card:scale-120 blur-2xl"
                    style={{ background: cfg.ambientGlow }}
                  />
                  <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/60 blur-xl pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />

                  {/* Top & Middle Section: Left Content (6 cols) + Right 2x 3D Illustration (6 cols) */}
                  <div className="relative z-10 grid grid-cols-12 gap-2 items-center flex-1 min-h-0">
                    {/* Left 6 cols: Icon + Tiêu đề dịch vụ + Experience Pill + Font mô tả */}
                    <div className="col-span-6 flex flex-col justify-center gap-1.5 pr-0.5 min-w-0">
                      {/* Header row: Unframed Icon moving in place + Tiêu đề (viết hoa chữ đầu) màu giống icon */}
                      <div
                        className="flex items-start gap-1.5 transition-transform duration-300 group-hover/card:translate-x-0.5"
                        style={{ color: cfg.accentColor }}
                      >
                        <div className="w-[25px] h-[25px] shrink-0 mt-0.5 flex items-center justify-center animate-pulse">
                          {getDomainBadgeIcon(domain.id)}
                        </div>
                        <h4
                          className="text-[13px] sm:text-[14px] font-extrabold font-play leading-tight tracking-tight break-words flex-1"
                          style={{ color: cfg.accentColor }}
                        >
                          {domain.titleVi ? domain.titleVi.charAt(0).toUpperCase() + domain.titleVi.slice(1).toLowerCase() : ''}
                        </h4>
                      </div>

                      {/* Experience Pill Badge with arrow */}
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs truncate max-w-full leading-tight transition-transform duration-300 group-hover/card:scale-105 ${cfg.pillBg}`}
                        >
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" /></svg>
                          <span className="truncate">{domain.experienceVi}</span>
                        </span>
                      </div>

                      {/* Orientation Description (Kích thước bằng mô tả thẻ học vấn: text-[10.5px]) */}
                      <p className="text-[10.5px] font-medium text-slate-700 line-clamp-2 leading-tight">
                        {domain.orientationVi}
                      </p>
                    </div>

                    {/* Right 6 cols: Hình GIF mô tả tăng gấp đôi kích thước và phát animation khi over mouse */}
                    <div className="col-span-6 h-[140px] sm:h-[155px] lg:h-[165px] flex items-center justify-center relative pointer-events-none overflow-visible">
                      <div className="w-full h-full flex items-center justify-center p-1">
                        {renderCard3DIllustration(domain.id, hoveredCardId === domain.id)}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Partner Brand Pills (Logo tăng gấp đôi kích thước w-6 h-6) + Circular Chevron Button */}
                  <div className="relative z-10 pt-1.5 mt-0.5 border-t border-white/70 flex items-center justify-between gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto no-scrollbar">
                      {domain.logos.map((logo) => (
                        <div
                          key={logo.name}
                          className="logo-pill-light h-[32px] px-2.5 rounded-full bg-white/95 border border-white shadow-2xs flex items-center gap-1.5 hover:scale-108 transition-transform shrink-0"
                          title={logo.name}
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="w-6 h-6 object-contain rounded-full shrink-0"
                            loading="lazy"
                          />
                          <span className="logo-pill-text text-[11px] font-extrabold text-slate-700 whitespace-nowrap">
                            {logo.alt}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Circular Action Arrow Button ( > ) with over mouse pop effect */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDomain(domain);
                      }}
                      style={{
                        background: cfg.arrowBg,
                        boxShadow: cfg.arrowShadow,
                      }}
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:scale-115 group-hover/card:shadow-lg cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <svg className="w-3.5 h-3.5 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Detail View: Compact, Harmonious, Optimized Layout with Full Dark Glass Neon Support */
          <div
            style={{ borderRadius: '22px' }}
            className={`w-full p-4 sm:p-5 border ${selectedDomain.colorTheme.border} dark:border-white/20 shadow-2xl flex flex-col gap-3.5 relative overflow-hidden text-left glass-panel bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl`}
          >
            {/* 1. Header Bar: Compact & Integrated */}
            <div className="w-full flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80 dark:border-white/10">
              <div
                className="flex items-center gap-2.5 min-w-0"
                style={{ color: getCardVisualConfig(selectedDomain.id).accentColor }}
              >
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/80 dark:border-white/20 flex items-center justify-center shrink-0">
                  {getDomainBadgeIcon(selectedDomain.id)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/15 shadow-2xs">
                      Lĩnh vực #{selectedDomain.code}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold tracking-tight font-play text-slate-900 dark:text-white truncate">
                      {selectedDomain.titleVi}
                    </h3>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDomain(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-500 dark:bg-slate-800 dark:hover:bg-rose-600 text-slate-600 hover:text-white dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-rose-500 shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0 active:scale-90"
                title="Đóng chi tiết"
                aria-label="Đóng chi tiết"
              >
                <svg className="w-4 h-4 stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 2. Main Content Grid: Balanced 12-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              
              {/* Left Column (5 cols): Hero Pastel Card with 3D Illustration + Experience & Vision */}
              <div
                style={{ background: getCardVisualConfig(selectedDomain.id).cardBg }}
                className={`theme-pastel-card relative lg:col-span-5 p-4 rounded-2xl border ${selectedDomain.colorTheme.border} dark:border-white/20 flex flex-col justify-between gap-3 shadow-xs overflow-hidden dark:bg-slate-900/80`}
              >
                {/* Dark overlay for dark mode readability */}
                <div className="absolute inset-0 bg-transparent dark:bg-slate-950/70 pointer-events-none transition-colors" />

                {/* Soft ambient background sampled directly from descriptive illustration surroundings */}
                <div
                  className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full pointer-events-none transition-all duration-500 opacity-75 blur-2xl"
                  style={{ background: getCardVisualConfig(selectedDomain.id).ambientGlow }}
                />
                <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/60 dark:bg-white/5 blur-xl pointer-events-none" />
                <div className="flex items-start justify-between gap-2.5 relative z-10">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shadow-2xs border ${selectedDomain.colorTheme.badgeBg} ${selectedDomain.colorTheme.badgeText} dark:bg-slate-800/90 dark:border-white/20 dark:text-sky-300`}
                    >
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      <span>{selectedDomain.experienceVi}</span>
                    </span>
                    <h4
                      className="text-base sm:text-lg font-black tracking-tight leading-tight font-play"
                      style={{ color: getCardVisualConfig(selectedDomain.id).accentColor }}
                    >
                      {selectedDomain.titleVi}
                    </h4>
                  </div>
                  <div className="w-24 h-24 shrink-0 flex items-center justify-center">
                    {renderCard3DIllustration(selectedDomain.id)}
                  </div>
                </div>

                {/* Vision Box */}
                <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white dark:border-white/15 shadow-2xs space-y-1 relative z-10">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider" style={{ color: getCardVisualConfig(selectedDomain.id).accentColor }}>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                    </svg>
                    <span>TẦM NHÌN & ĐỊNH HƯỚNG VẬN HÀNH</span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    {selectedDomain.orientationVi}
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Operational Key Specs (3 Cards) + Narrative Overview */}
              <div className="lg:col-span-7 flex flex-col gap-3 justify-between">
                
                {/* 3 Metric Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Role Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50/90 via-white/90 to-sky-50/90 dark:from-blue-950/60 dark:via-slate-900/80 dark:to-sky-950/60 border border-sky-200/80 dark:border-sky-500/30 shadow-2xs flex flex-col justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-sky-700 dark:text-sky-400">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>VAI TRÒ VẬN HÀNH</span>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 dark:text-slate-100 leading-tight block">
                      {selectedDomain.roleVi}
                    </span>
                  </div>

                  {/* Team Size Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-white/90 to-teal-50/90 dark:from-emerald-950/60 dark:via-slate-900/80 dark:to-teal-950/60 border border-emerald-200/80 dark:border-emerald-500/30 shadow-2xs flex flex-col justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-emerald-700 dark:text-emerald-400">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>QUY MÔ ĐỘI NGŨ</span>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 dark:text-slate-100 leading-tight block">
                      {selectedDomain.teamSizeVi}
                    </span>
                  </div>

                  {/* Technology Tools Card */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-50/90 via-white/90 to-fuchsia-50/90 dark:from-purple-950/60 dark:via-slate-900/80 dark:to-fuchsia-950/60 border border-purple-200/80 dark:border-purple-500/30 shadow-2xs flex flex-col justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-purple-700 dark:text-purple-400">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>CÔNG NGHỆ & HỆ THỐNG</span>
                    </div>
                    <span className="text-xs sm:text-[11.5px] font-bold font-mono text-purple-900 dark:text-purple-300 leading-tight block">
                      {selectedDomain.toolsVi}
                    </span>
                  </div>
                </div>

                {/* Narrative Description Card */}
                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex-1 flex flex-col justify-center gap-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider text-indigo-700 dark:text-indigo-400">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span>MÔ TẢ CHI TIẾT NĂNG LỰC & KINH NGHIỆM</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {selectedDomain.descVi}
                  </p>
                </div>
              </div>

              {/* Bottom Left (7 cols): Key Accomplishments & Highlights */}
              <div className="lg:col-span-7 p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-wider text-emerald-700 dark:text-emerald-400">
                  <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                  <span>KẾT QUẢ & THÀNH TỰU NỔI BẬT ĐÃ ĐẠT ĐƯỢC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDomain.highlightsVi.map((item, idx) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/70 dark:border-white/10 flex items-start gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300/60 dark:border-emerald-600/40">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Right (5 cols): Brands & Partner Ecosystem */}
              <div className="lg:col-span-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-50/90 via-white/95 to-sky-50/80 dark:from-slate-900/80 dark:via-slate-800/90 dark:to-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 border border-sky-300/40 dark:border-sky-700/40">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase block">
                      ĐỐI TÁC & THƯƠNG HIỆU
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-play">
                      {selectedDomain.partnersVi}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-200/60 dark:border-white/10">
                  {selectedDomain.logos.map((logo) => (
                    <div
                      key={logo.name}
                      className="h-8 px-2.5 rounded-full bg-white dark:bg-slate-800/90 flex items-center gap-1.5 shadow-2xs border border-slate-200 dark:border-white/15 hover:border-sky-300 dark:hover:border-sky-400 transition-colors"
                      title={logo.name}
                    >
                      <img src={logo.src} alt={logo.alt} className="w-4 h-4 object-contain rounded-full shrink-0" loading="lazy" />
                      <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">{logo.alt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
