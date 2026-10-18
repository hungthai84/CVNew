'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SYSTEMS_DATA } from '@/data/systems';
import { SystemData } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export const SystemsView: React.FC = () => {
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<SystemData | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [isFloatingVideo2Open, setIsFloatingVideo2Open] = useState<boolean>(false);

  const VIDEO_1_URL =
    'https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4';
  const VIDEO_2_URL =
    'https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4';

  const MP4_VIDEO_URL =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'Tất cả (12)', icon: 'globe' },
    { id: 'cskh', label: 'CSKH & Tiếp cận (3)', icon: 'headphones' },
    { id: 'erp', label: 'Quản trị & Nguồn lực (3)', icon: 'chart' },
    { id: 'data_ai', label: 'Dữ liệu & AI (3)', icon: 'robot' },
    { id: 'ops', label: 'Quy trình & An toàn (3)', icon: 'shield' },
  ];

  // Helper mapping for category
  const getSystemCategory = (id: string): string => {
    if (['sdp', 'crm', 'csc'].includes(id)) return 'cskh';
    if (['erp', 'hrm', 'okr', 'pos'].includes(id)) return 'erp';
    if (['ai', 'bi', 'clp'].includes(id)) return 'data_ai';
    return 'ops';
  };

  const filteredSystems = useMemo(() => {
    let list = SYSTEMS_DATA;
    if (activeCategory !== 'all') {
      list = list.filter((item) => getSystemCategory(item.id) === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const matchVi = item.nameVi.toLowerCase().includes(q) || item.descVi.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q);
        const matchCode = item.abbr.toLowerCase().includes(q) || item.fullName.toLowerCase().includes(q);
        return matchVi || matchEn || matchCode;
      });
    }
    return list;
  }, [activeCategory, searchQuery]);

  const handleCardClick = (item: SystemData) => {
    if (item.id === 'bi' || !item.url) {
      showToast('Hệ thống BI Dashboard đang được hoàn thiện tích hợp kết nối API thời gian thực!');
      setSelectedSystem(item);
      return;
    }
    setSelectedSystem(item);
  };

  const handleOpenUrl = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết Cổng Hệ Thống vào clipboard!');
    } else {
      showToast('Chia sẻ liên kết thành công!');
    }
  };

  // Format date string for live clock
  const formattedTime = currentTime.toTimeString().split(' ')[0];
  const dayNames = ['CHỦ NHẬT', 'THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'];
  const formattedDate = `${dayNames[currentTime.getDay()]}, ${currentTime.getDate()} THG ${
    currentTime.getMonth() + 1
  }`;

  // Icon mapping for each system
  const systemIconMap: Record<string, string> = {
    sdp: 'headphones',
    erp: 'chart',
    crm: 'users',
    hrm: 'briefcase',
    bpm: 'bolt',
    okr: 'target',
    clp: 'gift',
    lms: 'graduation',
    csc: 'phone',
    bi: 'trending',
    ai: 'robot',
    pos: 'card',
  };

  const systemStatusBadge: Record<string, { text: string; dotColor: string }> = {
    sdp: { text: 'Trực tuyến', dotColor: 'bg-emerald-400' },
    erp: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    crm: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    hrm: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    bpm: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    okr: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    clp: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    lms: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    csc: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    bi: { text: 'Đang tích hợp API', dotColor: 'bg-amber-400' },
    ai: { text: 'AI Trực Tuyến', dotColor: 'bg-fuchsia-400' },
    pos: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
  };

  return (
    <section
      id="systems"
      className="relative w-full h-full max-h-full flex flex-col justify-start items-stretch font-sans text-slate-800 transition-colors duration-500 select-none bg-transparent overflow-hidden text-left"
    >
      {/* 100% Matching Animation CSS Rules */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes watermark-drift {
          0%, 100% {
            transform: rotate(-12deg) translate(0px, 0px) scale(1);
          }
          33% {
            transform: rotate(-6deg) translate(-8px, -10px) scale(1.05);
          }
          66% {
            transform: rotate(-16deg) translate(6px, -5px) scale(0.97);
          }
        }

        .card-watermark {
          position: absolute;
          right: -8px;
          bottom: -14px;
          opacity: 0.15;
          pointer-events: none;
          transform-origin: center center;
          animation: watermark-drift 8.5s ease-in-out infinite;
          transition: opacity 0.45s ease;
          font-size: 5rem;
          line-height: 1;
        }

        .system-item:hover .card-watermark {
          opacity: 0.28;
          animation-duration: 4s;
        }

        @keyframes icon-floating {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-5px) rotate(2deg) scale(1.07);
          }
        }

        .animated-service-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: icon-floating 3.2s ease-in-out infinite;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.28));
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .system-item:hover .animated-service-icon {
          transform: scale(1.15) translateY(-3px);
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.4));
        }

        .system-item {
          border-radius: 18px !important;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .system-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.8) !important;
        }

        @keyframes ring-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }

        .video-circle-halo {
          animation: ring-pulse 2.2s infinite;
        }
      `,
        }}
      />

      <div className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[15px] items-stretch justify-start relative z-10 overflow-hidden">
        {/* VÙNG BÊN TRÁI: THANH LỌC & LƯỚI 12 HỆ THỐNG C-LEVEL */}
        <div className="flex-1 min-h-0 flex flex-col gap-[12px] h-full overflow-hidden">
          {/* Thanh điều khiển: Nút lọc danh mục & Hộp tìm kiếm */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full shrink-0">
            {/* Thống kê phân hệ & Trạng thái */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
                <WebIcon name="layers" className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>12 Phân Hệ Vận Hành C-Level</span>
              </span>
              <span className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                Hiển thị: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{filteredSystems.length}</strong> / 12 phân hệ
              </span>
            </div>

            {/* Real-time Search Box */}
            <div className="relative w-full sm:w-64 md:w-72">
              <svg
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm mã hoặc tên hệ thống..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 text-xs"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>

          {/* Lưới 12 thẻ hệ thống (4 Cột x 3 Hàng) */}
          {filteredSystems.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white/50 rounded-3xl border border-slate-200/80 backdrop-blur-md flex flex-col items-center justify-center flex-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
                <WebIcon name="search" className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-slate-700 font-play">
                Không tìm thấy hệ thống phù hợp
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Hãy thử nhập từ khóa khác như "CRM", "ERP", "LMS" hoặc "CSKH"...
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                Xem lại tất cả 12 hệ thống
              </button>
            </div>
          ) : (
            <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 items-stretch overflow-y-auto no-scrollbar py-0.5">
              {filteredSystems.map((item) => {
                const icon = systemIconMap[item.id] || 'cog';

                return (
                  <article
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    title={`Nhấp xem chi tiết ${item.abbr} - ${item.fullName}`}
                    className="system-item cursor-pointer relative overflow-hidden p-2.5 sm:p-3 text-white flex flex-col justify-between select-none rounded-2xl group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[92px] h-full"
                    style={{ background: item.gradient }}
                  >
                    {/* Floating Watermark */}
                    <div className="card-watermark opacity-15 group-hover:opacity-30 pointer-events-none">
                      <WebIcon name={icon} className="w-14 h-14" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full gap-1.5">
                      {/* DÒNG 1: Tên tiếng Việt hệ thống + Mũi tên liên kết */}
                      <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/15">
                        <span className="text-[11px] font-bold text-white/95 font-play truncate">
                          {item.nameVi}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-white/90 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>

                      {/* DÒNG 2: Tên viết tắt lớn + Tên đầy đủ + Animated Icon */}
                      <div className="flex items-center justify-between gap-1.5 pt-0.5">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xl sm:text-2xl font-black font-play tracking-wider text-white drop-shadow-sm leading-none">
                            {item.abbr}
                          </span>
                          <span
                            className="text-[10px] text-white/90 font-medium font-play leading-tight mt-1 truncate"
                            title={item.fullName}
                          >
                            {item.fullName}
                          </span>
                        </div>
                        <div className="animated-service-icon text-white shrink-0 ml-1">
                          <WebIcon name={icon} className="w-7 h-7" />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* VÙNG BÊN PHẢI: BANNER THEO CHIỀU DỌC (CĂN CHỈNH CHIỀU CAO VỪA VẶN THẺ CHÍNH) */}
        <aside className="w-full lg:w-[310px] xl:w-[335px] shrink-0 h-full flex flex-col overflow-hidden">
          <div
            className="theme-hero-banner relative rounded-[20px] overflow-hidden border-none shadow-xl flex flex-col justify-between p-3 sm:p-3.5 text-white h-full group/banner overflow-y-auto no-scrollbar"
            style={{
              background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 45%, #0c4a6e 100%)',
            }}
          >
            {/* Background Video with Poster fallback (Hình nền sáng rõ, sắc nét) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/domains/hero-banner.webp"
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-85 brightness-[1.10] contrast-[1.08] group-hover/banner:scale-105 transition-transform duration-700"
            >
              <source src="/videos/domains-banner.mp4" type="video/mp4" />
              <source
                src="https://cdn.scena.ai/project/10169/e07c498cfd5e7e1a0a537b3f12eeaaf42cb878f5300f99d73c9b02a7aa05efce.mp4"
                type="video/mp4"
              />
            </video>

            {/* Dark Ambient Overlay nhẹ mỏng để lộ rõ hình nền sống động */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/30 to-slate-950/80 pointer-events-none" />

            {/* Ambient Watermark */}
            <div className="card-watermark opacity-15 pointer-events-none -right-4 -bottom-6">
              <WebIcon name="layers" className="w-24 h-24 text-sky-400" />
            </div>

            {/* PHẦN 1: HEADER BANNER (Tiêu đề, Badge, Subtitle & Quote) */}
            <div className="relative z-10 flex flex-col gap-1.5 shrink-0">
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/15">
                <span className="font-handwriting font-bold text-xl sm:text-2xl text-sky-400 leading-none drop-shadow-xs">
                  Kiến trúc
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9.5px] font-extrabold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Trực tuyến · 24/7</span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-black font-play text-white tracking-tight leading-snug drop-shadow-xs">
                Kiến Trúc Hệ Thống & Tự Động Hóa
              </h2>
              <p className="text-[10.5px] font-medium text-slate-200 leading-tight">
                PowerService – Hạ tầng số hoá tập trung 12 phân hệ quản trị
              </p>

              {/* Decorative Amber Accent Line */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 shadow-xs" />

              {/* Quote Block Fleur De Leah */}
              <div className="pt-1 bg-transparent border-none shadow-none">
                <p className="font-banner-quote text-xl sm:text-2xl text-amber-300 font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  “Số hóa quy trình – Tự động hóa vận hành toàn diện.”
                </p>
                <span className="text-[10px] font-bold text-amber-200/90 mt-0.5 block tracking-wider font-play drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                  — Nguyễn Hùng Thái
                </span>
              </div>
            </div>

            {/* PHẦN 2: ARCHITECT ROW & VIDEO DEMO PREVIEW */}
            <div className="relative z-10 my-2 flex flex-col gap-2 shrink-0">
              {/* Architect Row */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-sky-300/50 shadow-md shrink-0 bg-slate-900">
                  <img
                    src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                    alt="Kiến Trúc Sư"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black font-play text-white truncate tracking-wide">
                    Nguyễn Hùng Thái
                  </span>
                  <span className="text-[10px] font-bold text-sky-200 truncate">
                    Kiến Trúc Sư Hệ Thống CX
                  </span>
                  <span className="text-[9px] text-slate-300 truncate">
                    Enterprise Suite · 12 Phân hệ
                  </span>
                </div>
              </div>

              {/* Video Demo Frame */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsFloatingVideo2Open(true)}
                className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/20 bg-black cursor-pointer group/video shadow-md hover:border-sky-400 transition-all shrink-0"
                title="Nhấp để phát video demo toàn màn hình"
              >
                <video
                  src={VIDEO_1_URL}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 group-hover/video:bg-black/45 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-rose-600/90 group-hover/video:bg-rose-500 text-white flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform border border-white/80">
                    <svg className="w-3.5 h-3.5 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-1 left-1.5 text-[8.5px] font-black text-white/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Demo Video Vận Hành</span>
                </span>
              </div>
            </div>

            {/* PHẦN 3: 3 TRỤ CỘT CỐT LÕI */}
            <div className="relative z-10 flex flex-col gap-1.5 shrink-0">
              <div className="p-1.5 px-2 rounded-lg bg-white/10 border border-white/10 flex items-center justify-between text-left">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-sky-500/30 text-sky-300 flex items-center justify-center shrink-0">
                    <WebIcon name="layers" className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white">12 Phân Hệ Hợp Nhất</span>
                    <span className="text-[8.5px] text-slate-300">Single Sign-On & Portal SDP</span>
                  </div>
                </div>
                <span className="text-[9.5px] font-black font-mono text-cyan-300">100%</span>
              </div>

              <div className="p-1.5 px-2 rounded-lg bg-white/10 border border-white/10 flex items-center justify-between text-left">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <WebIcon name="robot" className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white">AI Agent & Tự Động Hóa</span>
                    <span className="text-[8.5px] text-slate-300">Tối ưu 60%+ tác vụ lặp lại</span>
                  </div>
                </div>
                <span className="text-[9.5px] font-black font-mono text-purple-300">60%+</span>
              </div>

              <div className="p-1.5 px-2 rounded-lg bg-white/10 border border-white/10 flex items-center justify-between text-left">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
                    <WebIcon name="shield" className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white">SLA & Uptime Hệ Thống</span>
                    <span className="text-[8.5px] text-slate-300">Microservices API Gateway</span>
                  </div>
                </div>
                <span className="text-[9.5px] font-black font-mono text-emerald-300">99.98%</span>
              </div>
            </div>

            {/* NHÓM NÚT LỌC DANH MỤC HỆ THỐNG TRONG BANNER */}
            <div className="relative z-10 flex flex-col gap-1 w-full pt-1.5 border-t border-white/20 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-200 font-black flex items-center justify-between pb-0.5">
                <span>Danh mục phân hệ</span>
                <span className="text-[9.5px] text-emerald-300 font-mono">12 Phân hệ</span>
              </span>
              <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar pb-0.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center justify-between gap-1.5 cursor-pointer border ${
                        isActive
                          ? 'bg-gradient-to-r from-sky-500 via-indigo-600 to-indigo-700 text-white border-sky-400 shadow-md shadow-sky-500/30 scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <WebIcon name={cat.icon} className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cat.label}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PHẦN 4: HÀNH ĐỘNG TƯƠNG TÁC */}
            <div className="relative z-10 pt-2 border-t border-white/15 flex flex-col gap-1.5 shrink-0">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsFloatingVideo2Open(true)}
                  className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10.5px] font-bold flex items-center justify-center gap-1 shadow-md shadow-indigo-500/30 transition cursor-pointer active:scale-95"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Xem Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthorModalOpen(true)}
                  className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[10.5px] font-bold flex items-center justify-center gap-1 transition cursor-pointer active:scale-95"
                >
                  <WebIcon name="user" className="w-2.5 h-2.5" />
                  <span>Kiến Trúc Sư</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium px-0.5">
                <span>Kiến trúc Omnichannel</span>
                <span className="text-cyan-400 font-bold">2026+ Ready</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* VIDEO PLAYER LIGHTBOX MODAL (PHÁT LINK MP4) */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col text-left"
          >
            {/* Video Header */}
            <div className="p-3.5 sm:p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-400 text-xs">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide font-play">
                    Video Giới Thiệu Hệ Thống Vận Hành
                  </h4>
                  <p className="text-[11px] text-slate-400">PowerService Enterprise Digital Architecture</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 flex items-center justify-center text-sm transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* HTML5 MP4 Video Player Frame */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              >
                <source src={MP4_VIDEO_URL} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ phát video HTML5.
              </video>
            </div>

            {/* Video Footer */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                <span>Định dạng: MP4 Full HD 1080p</span>
              </span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                Đóng Video
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <WebIcon name={systemIconMap[selectedSystem.id] || 'cog'} className="w-6 h-6" />
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
                className="relative z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
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
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTHOR ARCHITECT INFO MODAL */}
      {isAuthorModalOpen && (
        <div
          onClick={() => setIsAuthorModalOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative"
          >
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-indigo-500/30 mb-3 shadow-md">
              <img
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                alt="Kiến Trúc Sư"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-play">
              Kiến Trúc Sư Hệ Thống CX/CSKH
            </h3>
            <p className="text-xs text-indigo-600 font-semibold mb-3">
              PowerService Enterprise Suite
            </p>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Hệ sinh thái gồm 12 phân hệ tích hợp toàn diện, chuẩn hóa dữ liệu tập trung theo mô hình Omnichannel, tự động hóa quy trình nghiệp vụ và tích hợp Trợ lý Trí tuệ Nhân tạo 24/7.
            </p>
            <button
              type="button"
              onClick={() => setIsAuthorModalOpen(false)}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* NÚT NỔI HÌNH TRÒN CHỨA VIDEO 1, CÓ NÚT PLAY BẤM VÀO SẼ PHÁT VIDEO 2 */}
      <div
        onClick={() => setIsFloatingVideo2Open(true)}
        className="fixed bottom-24 left-5 sm:left-8 z-40 group cursor-pointer"
        title="Nhấp nút Play để xem Video 2 giới thiệu hệ thống"
      >
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
          <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white/95 bg-black">
            {/* Video 1 phát lặp bên trong hình tròn */}
            <video
              src={VIDEO_1_URL}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-full"
            />
            {/* Lớp phủ có nút Play ở giữa */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-600/95 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-white/90">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tooltip hiển thị khi hover */}
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white text-[10px] font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Phát Video 2
          </span>
        </div>
      </div>

      {/* MODAL PHÁT VIDEO 2 */}
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
                    Video 2: Giới Thiệu Chuyên Sâu Kiến Trúc Hệ Thống Vận Hành
                  </h4>
                  <p className="text-[11px] text-slate-400">PowerService Enterprise Digital Architecture</p>
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

            {/* Video 2 Player */}
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
