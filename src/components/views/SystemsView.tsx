'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SYSTEMS_DATA } from '@/data/systems';
import { SystemData } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { useLanguage } from '@/context/LanguageContext';

interface SystemItemConfig {
  id: string;
  categoryTag: string;
  categoryGroup: 'core' | 'support' | 'other';
  abbr: string;
  fullName: string;
  desc: string;
  icon: string;
  gradient: string;
}

const SYSTEMS_CONFIG: SystemItemConfig[] = [
  {
    id: 'sdp',
    categoryTag: 'Công nghệ & Dịch vụ',
    categoryGroup: 'core',
    abbr: 'SDP',
    fullName: 'Service Delivery Platform',
    desc: 'Nền tảng cung cấp dịch vụ, quản lý và vận hành dịch vụ trên kênh số.',
    icon: 'cloud',
    gradient: 'linear-gradient(135deg, #4f8ef7, #3b82f6)',
  },
  {
    id: 'erp',
    categoryTag: 'Tài chính & Kế toán',
    categoryGroup: 'core',
    abbr: 'ERP',
    fullName: 'Enterprise Resource Planning',
    desc: 'Quản trị nguồn lực doanh nghiệp, tài chính, kế toán và vận hành tổng thể.',
    icon: 'chart',
    gradient: 'linear-gradient(135deg, #2dd4bf, #0d9488)',
  },
  {
    id: 'crm',
    categoryTag: 'Quản lý Quan hệ Khách hàng',
    categoryGroup: 'core',
    abbr: 'CRM',
    fullName: 'Customer Relationship Management',
    desc: 'Quản lý thông tin khách hàng, tăng trải nghiệm và giữ chân khách hàng.',
    icon: 'headphones',
    gradient: 'linear-gradient(135deg, #fb923c, #ea580c)',
  },
  {
    id: 'hrm',
    categoryTag: 'Quản lý Nguồn nhân lực',
    categoryGroup: 'core',
    abbr: 'HRM',
    fullName: 'Human Resource Management',
    desc: 'Quản lý nhân sự, tuyển dụng, đào tạo, đánh giá và phát triển nguồn lực.',
    icon: 'users',
    gradient: 'linear-gradient(135deg, #c084fc, #9333ea)',
  },
  {
    id: 'bpm',
    categoryTag: 'Quản lý Quy trình nghiệp vụ',
    categoryGroup: 'core',
    abbr: 'BPM',
    fullName: 'Business Process Management',
    desc: 'Tối ưu hóa và tự động hóa các quy trình nghiệp vụ.',
    icon: 'workflow',
    gradient: 'linear-gradient(135deg, #818cf8, #4f46e5)',
  },
  {
    id: 'okr',
    categoryTag: 'Quản lý Mục tiêu & Kết quả',
    categoryGroup: 'support',
    abbr: 'OKR',
    fullName: 'Objective & Key Results',
    desc: 'Đặt mục tiêu, theo dõi và đo lường hiệu quả công việc.',
    icon: 'target',
    gradient: 'linear-gradient(135deg, #fb7185, #e11d48)',
  },
  {
    id: 'clp',
    categoryTag: 'Khách hàng Thân thiết',
    categoryGroup: 'support',
    abbr: 'CLP',
    fullName: 'Customer Loyalty Program',
    desc: 'Chương trình khách hàng thân thiết, chăm sóc và gia tăng giá trị.',
    icon: 'shield',
    gradient: 'linear-gradient(135deg, #38bdf8, #0891b2)',
  },
  {
    id: 'lms',
    categoryTag: 'Quản lý Đào tạo',
    categoryGroup: 'support',
    abbr: 'LMS',
    fullName: 'Learning Management System',
    desc: 'Đào tạo trực tuyến, quản lý khóa học và phát triển năng lực.',
    icon: 'graduation',
    gradient: 'linear-gradient(135deg, #34d399, #059669)',
  },
  {
    id: 'csc',
    categoryTag: 'Trung tâm Chăm sóc Khách hàng',
    categoryGroup: 'core',
    abbr: 'CSC',
    fullName: 'Customer Service Center',
    desc: 'Hỗ trợ và chăm sóc khách hàng đa kênh (voice, chat, email, social).',
    icon: 'phone',
    gradient: 'linear-gradient(135deg, #60a5fa, #0284c7)',
  },
  {
    id: 'bi',
    categoryTag: 'Phân tích Dữ liệu',
    categoryGroup: 'other',
    abbr: 'BI Dashboard',
    fullName: 'Business Intelligence Dashboard',
    desc: 'Trực quan hóa dữ liệu, hỗ trợ ra quyết định chiến lược.',
    icon: 'trending',
    gradient: 'linear-gradient(135deg, #6366f1, #3730a3)',
  },
  {
    id: 'ai',
    categoryTag: 'Trợ lý Trí tuệ Nhân tạo',
    categoryGroup: 'other',
    abbr: 'AI Assistant',
    fullName: 'Artificial Intelligence Assistant',
    desc: 'Hỗ trợ thông minh, tự động hóa và nâng cao hiệu suất làm việc.',
    icon: 'cpu',
    gradient: 'linear-gradient(135deg, #d946ef, #9333ea)',
  },
  {
    id: 'pos',
    categoryTag: 'Quản lý Bán hàng tại Quầy',
    categoryGroup: 'support',
    abbr: 'POS',
    fullName: 'Point of Sale',
    desc: 'Quản lý bán hàng, thanh toán và kho tại điểm bán.',
    icon: 'card',
    gradient: 'linear-gradient(135deg, #22d3ee, #0284c7)',
  },
];

export const SystemsView: React.FC = () => {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isVi = lang === 'vi';

  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'support' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [selectedSystem, setSelectedSystem] = useState<SystemData | null>(null);
  const [isFloatingVideo2Open, setIsFloatingVideo2Open] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const VIDEO_1_URL =
    'https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4';
  const VIDEO_2_URL =
    'https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4';

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSystems = useMemo(() => {
    let list = SYSTEMS_CONFIG;
    if (activeCategory !== 'all') {
      list = list.filter((item) => item.categoryGroup === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        return (
          item.abbr.toLowerCase().includes(q) ||
          item.fullName.toLowerCase().includes(q) ||
          item.categoryTag.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [activeCategory, searchQuery]);

  const handleCardClick = (item: SystemItemConfig) => {
    const sysData = SYSTEMS_DATA.find((s) => s.id === item.id);
    if (!sysData) return;

    if (item.id === 'bi' || !sysData.url) {
      showToast('Hệ thống BI Dashboard đang được hoàn thiện tích hợp kết nối API thời gian thực!');
      setSelectedSystem(sysData);
      return;
    }
    setSelectedSystem(sysData);
  };

  const handleOpenUrl = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getDropdownLabel = () => {
    switch (activeCategory) {
      case 'core':
        return isVi ? 'Cốt lõi (6)' : 'Core (6)';
      case 'support':
        return isVi ? 'Hỗ trợ (4)' : 'Support (4)';
      case 'other':
        return isVi ? 'Khác (2)' : 'Other (2)';
      default:
        return isVi ? 'Tất cả danh mục' : 'All Categories';
    }
  };

  return (
    <section
      id="systems"
      className="relative w-full h-full max-h-full flex flex-col justify-center items-center font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none bg-transparent overflow-hidden text-left"
    >
      <div className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[15px] items-stretch justify-center max-w-7xl mx-auto relative z-10 overflow-hidden my-auto">
        {/* VÙNG BÊN TRÁI: THANH TÌM KIẾM/LỌC & LƯỚI 12 THẺ HỆ THỐNG */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-2.5 h-full overflow-hidden lg:order-1 my-auto">
          {/* Thanh tìm kiếm & Dropdown danh mục */}
          <div className="flex items-center justify-between gap-3 px-1 py-0.5 shrink-0">
            {/* Input tìm kiếm */}
            <div className="flex-1 relative flex items-center">
              <svg
                className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder={isVi ? "Tìm kiếm hệ thống, từ khóa, công nghệ..." : "Search systems, keywords, tech..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 shadow-2xs transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa tìm kiếm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 text-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown Tất cả danh mục */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-400 shadow-2xs transition cursor-pointer"
              >
                <WebIcon name="layout-dashboard" className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{getDropdownLabel()}</span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-xl p-1.5 z-50 flex flex-col gap-1 backdrop-blur-xl animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition flex items-center justify-between cursor-pointer ${
                      activeCategory === 'all'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Tất cả danh mục (12)</span>
                    {activeCategory === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('core');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition flex items-center justify-between cursor-pointer ${
                      activeCategory === 'core'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Cốt lõi (6)</span>
                    {activeCategory === 'core' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('support');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition flex items-center justify-between cursor-pointer ${
                      activeCategory === 'support'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Hỗ trợ (4)</span>
                    {activeCategory === 'support' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('other');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition flex items-center justify-between cursor-pointer ${
                      activeCategory === 'other'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Khác (2)</span>
                    {activeCategory === 'other' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Lưới 12 thẻ hệ thống (3 Cột x 4 Hàng) */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 py-0.5 flex flex-col justify-center">
            {filteredSystems.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 backdrop-blur-md flex flex-col items-center justify-center h-full my-auto">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                  <WebIcon name="search" className="w-6 h-6" />
                </div>
                <p className="text-base font-bold text-slate-700 dark:text-slate-200 font-play">
                  {isVi ? 'Không tìm thấy hệ thống phù hợp' : 'No matching systems found'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {isVi
                    ? 'Hãy thử nhập từ khóa khác như "CRM", "ERP", "LMS" hoặc "CSKH"...'
                    : 'Try another keyword like "CRM", "ERP", "LMS" or "CS"...'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                >
                  {isVi ? 'Xem lại tất cả 12 hệ thống' : 'View all 12 systems'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pb-2 my-auto">
                {filteredSystems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    style={{ background: item.gradient }}
                    className="relative rounded-[20px] p-3.5 sm:p-4 text-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group min-h-[128px]"
                    title={`Nhấp để xem chi tiết ${item.abbr} - ${item.fullName}`}
                  >
                    {/* Top: Icon bên trái (hộp squircle bán trong suốt) + Phân loại, Tên viết tắt, Tên đầy đủ */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-106 transition-transform duration-300">
                        <WebIcon name={item.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] text-white/85 font-medium block truncate">
                          {item.categoryTag}
                        </span>
                        <h3 className="text-xl sm:text-[22px] font-black leading-tight tracking-tight text-white font-play mt-0.5">
                          {item.abbr}
                        </h3>
                        <p className="text-[10.5px] sm:text-[11px] text-white/80 font-medium leading-tight truncate mt-0.5">
                          {item.fullName}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Mô tả 2 dòng + Nút tròn mũi tên chuyển trang */}
                    <div className="flex items-center justify-between gap-2 mt-3 pt-1 border-t border-white/15">
                      <p className="text-[10.5px] text-white/90 leading-snug line-clamp-2 flex-1 pr-1 font-medium">
                        {item.desc}
                      </p>
                      <button
                        type="button"
                        aria-label={`Xem chi tiết ${item.abbr}`}
                        className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-white/25 group-hover:bg-white/40 text-white flex items-center justify-center shrink-0 transition-all duration-200 group-hover:translate-x-0.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* VÙNG BÊN PHẢI: BANNER KIẾN TRÚC HỆ THỐNG (CHUẨN 300px THEO HÌNH ĐÍNH KÈM) */}
        <aside className="w-full lg:w-[300px] xl:w-[300px] shrink-0 h-full rounded-[22px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 p-3.5 sm:p-4 shadow-sm backdrop-blur-xl flex flex-col justify-between overflow-y-auto custom-scrollbar select-none text-left gap-2.5 lg:order-2 my-auto">
          {/* PHẦN 1: HEADER BANNER (Badge Kiến trúc & Badge Trực tuyến 24/7) */}
          <div className="flex items-center justify-between pb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
              <WebIcon name="box" className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Kiến trúc</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Trực tuyến · 24/7</span>
            </div>
          </div>

          {/* PHẦN 2: TIÊU ĐỀ & PHỤ ĐỀ */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <WebIcon name="box" className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-black font-play text-slate-900 dark:text-white leading-tight">
                Kiến Trúc Hệ Thống
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Power+Service+ – Hệ thống số hóa toàn diện, 12 phân hệ quản trị vận hành xuyên suốt.
              </p>
            </div>
          </div>

          {/* PHẦN 3: TRÍCH DẪN NGHỆ THUẬT (QUOTE) */}
          <div className="py-0.5">
            <p className="font-banner-quote text-[17px] sm:text-lg text-slate-800 dark:text-slate-200 font-normal leading-snug italic">
              “Công nghệ không chỉ là công cụ, mà là nền tảng cho sự phát triển bền vững.”
            </p>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 block text-right">
              — Nguyễn Hùng Thái
            </span>
          </div>

          {/* PHẦN 4: KHUNG VIDEO DEMO TỔNG QUAN */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsFloatingVideo2Open(true)}
            className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-slate-200/60 dark:border-white/10 cursor-pointer group/video"
            title="Nhấp để phát video demo kiến trúc hệ thống"
          >
            <video
              src={VIDEO_1_URL}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-500"
            />
            {/* Center Pink Play Button */}
            <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/35 transition-colors flex items-center justify-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-500/95 group-hover/video:bg-rose-500 text-white flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform border border-white/80">
                <svg className="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            {/* Time badge */}
            <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[10px] font-bold">
              03:45
            </span>
            {/* Bottom Title bar */}
            <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
              <p className="text-[10px] font-bold text-white truncate text-left pl-1">
                Demo Tổng quan Kiến trúc Hệ thống
              </p>
            </div>
          </div>

          {/* PHẦN 5: 4 THẺ THỐNG KÊ (2x2 GRID) */}
          <div className="grid grid-cols-2 gap-2">
            {/* Card 1: 12 Phân hệ */}
            <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-slate-800/60 border border-blue-100/80 dark:border-white/5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <WebIcon name="box" className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black font-play text-slate-800 dark:text-white block leading-tight">
                  12
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  Phân hệ hệ thống
                </span>
              </div>
            </div>

            {/* Card 2: 100% Tích hợp dữ liệu */}
            <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-slate-800/60 border border-blue-100/80 dark:border-white/5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <WebIcon name="link" className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black font-play text-slate-800 dark:text-white block leading-tight">
                  100%
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  Tích hợp dữ liệu
                </span>
              </div>
            </div>

            {/* Card 3: 5 Nền tảng công nghệ */}
            <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-slate-800/60 border border-blue-100/80 dark:border-white/5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <WebIcon name="layers" className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black font-play text-slate-800 dark:text-white block leading-tight">
                  5
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  Nền tảng công nghệ
                </span>
              </div>
            </div>

            {/* Card 4: 24/7 Vận hành liên tục */}
            <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-slate-800/60 border border-blue-100/80 dark:border-white/5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <WebIcon name="clock" className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black font-play text-slate-800 dark:text-white block leading-tight">
                  24/7
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  Vận hành liên tục
                </span>
              </div>
            </div>
          </div>

          {/* PHẦN 6: DANH MỤC HỆ THỐNG */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Danh mục hệ thống
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="text-[10.5px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Xem tất cả</span>
                <span>→</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-1 py-1.5 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-0.5 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-blue-400'
                }`}
              >
                <WebIcon name="layout-dashboard" className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">Tất cả (12)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('core')}
                className={`px-1 py-1.5 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-0.5 cursor-pointer ${
                  activeCategory === 'core'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-blue-400'
                }`}
              >
                <span className="truncate">Cốt lõi (6)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('support')}
                className={`px-1 py-1.5 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-0.5 cursor-pointer ${
                  activeCategory === 'support'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-blue-400'
                }`}
              >
                <span className="truncate">Hỗ trợ (4)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('other')}
                className={`px-1 py-1.5 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-0.5 cursor-pointer ${
                  activeCategory === 'other'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-blue-400'
                }`}
              >
                <span className="truncate">Khác (2)</span>
              </button>
            </div>
          </div>

          {/* PHẦN 7: KHỐI GHI CHÚ KIẾN TRÚC MỞ */}
          <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2 text-slate-600 dark:text-slate-300 text-[10px] leading-snug">
            <span className="text-blue-500 text-xs shrink-0">💡</span>
            <p>
              Các hệ thống được xây dựng theo kiến trúc mở, linh hoạt, dễ dàng mở rộng và tích hợp.
            </p>
          </div>
        </aside>
      </div>

      {/* SYSTEM DETAIL MODAL */}
      {selectedSystem && (
        <div
          onClick={() => setSelectedSystem(null)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative z-50 text-left"
          >
            {/* Modal Header Banner */}
            <div
              className="p-5 text-white flex items-center justify-between relative overflow-hidden"
              style={{ background: selectedSystem.gradient }}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl shadow-inner p-1">
                  <WebIcon name={SYSTEMS_CONFIG.find(c => c.id === selectedSystem.id)?.icon || 'box'} className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-black/25 text-white uppercase tracking-wider font-mono">
                    {selectedSystem.abbr}
                  </span>
                  <h3 className="text-lg font-bold font-play leading-tight mt-0.5">
                    {selectedSystem.nameVi}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSystem(null)}
                aria-label="Đóng cửa sổ"
                className="relative z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto font-play">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                  Tên đầy đủ quốc tế
                </h4>
                <p className="text-sm font-semibold text-slate-800 italic">
                  {selectedSystem.fullName}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                  Mô tả tổng quan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedSystem.descVi}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  Các tính năng & Ưu điểm cốt lõi
                </h4>
                <ul className="space-y-2">
                  {selectedSystem.featuresVi.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                {selectedSystem.id === 'bi'
                  ? 'Đang hoàn thiện kết nối API'
                  : 'Cổng hoạt động chính thức'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSystem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                >
                  Đóng
                </button>

                {selectedSystem.url && selectedSystem.url !== '#' && (
                  <button
                    type="button"
                    onClick={(e) => handleOpenUrl(e, selectedSystem.url)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition cursor-pointer"
                  >
                    <span>Mở Cổng Vận Hành</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PHÁT VIDEO DEMO TOÀN MÀN HÌNH */}
      {isFloatingVideo2Open && (
        <div
          onClick={() => setIsFloatingVideo2Open(false)}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[9999] flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col text-left"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-600/30 border border-rose-400/50 flex items-center justify-center text-rose-400 text-xs">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide font-play">
                    Video Demo Tổng Quan Kiến Trúc Hệ Thống
                  </h4>
                  <p className="text-[11px] text-slate-400">Power+Service+ Enterprise Digital Architecture</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFloatingVideo2Open(false)}
                className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 flex items-center justify-center text-sm transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={VIDEO_2_URL}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
