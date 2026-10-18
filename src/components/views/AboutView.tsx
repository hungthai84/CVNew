'use client';

import React, { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { WebIcon } from '@/components/ui/WebIcon';

export interface AboutViewProps {
  onNavigateContact: () => void;
  onOpenAiChat?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateContact, onOpenAiChat }) => {
  const { showToast } = useToast();

  // Map Modal State
  const [mapModalOpen, setMapModalOpen] = useState<boolean>(false);
  const [mapTitle, setMapTitle] = useState<string>('Vị trí bản đồ');
  const [mapAddress, setMapAddress] = useState<string>('');
  const [mapQuery, setMapQuery] = useState<string>('');

  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const INTRO_VIDEO_URL =
    'https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4';

  const openMap = (title: string, address: string, query: string) => {
    setMapTitle(title);
    setMapAddress(address);
    setMapQuery(query);
    setMapModalOpen(true);
  };

  const handleStartChat = () => {
    if (onOpenAiChat) {
      onOpenAiChat();
    } else {
      showToast('Đang mở trợ lý AI...');
    }
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-2 lg:gap-2.5 max-w-7xl mx-auto select-none overflow-y-auto lg:overflow-hidden text-slate-800 dark:text-slate-100 font-play">
      {/* ========================================================================= */}
      {/* SECTION 1 (TOP ROW): HERO AI BANNER + THÔNG TIN CÁ NHÂN                    */}
      {/* ========================================================================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch shrink-0 lg:h-[225px] xl:h-[235px]">
        {/* 1.1 HERO BANNER: TRỢ LÝ AI & STAT CAPSULES (8 COLS) */}
        <div className="lg:col-span-8 relative rounded-[20px] lg:rounded-[24px] overflow-hidden p-3.5 sm:p-4 bg-gradient-to-r from-[#eaf4ff]/95 via-[#f2f7ff]/90 to-[#ffffff]/95 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 border border-white/90 dark:border-white/10 shadow-[0_4px_20px_rgba(62,115,180,0.08)] flex flex-col sm:flex-row justify-between items-stretch gap-3 h-full">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-56 h-56 rounded-full bg-cyan-300/10 blur-3xl pointer-events-none" />

          {/* Left Text Block */}
          <div className="relative z-10 flex flex-col justify-between max-w-full sm:max-w-[270px] lg:max-w-[280px] text-left py-0.5">
            <div>
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-blue-200/70 dark:border-blue-500/30 text-blue-600 dark:text-cyan-400 text-[10px] font-bold tracking-wide backdrop-blur-md shadow-2xs">
                <span>👑</span>
                <span>TRỢ LÝ AI • CUSTOMER SERVICE</span>
              </div>

              {/* Headings */}
              <div className="mt-1.5 sm:mt-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1E3A6D] dark:text-white leading-tight">
                  Xin chào,
                </h2>
                <h1 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[32px] font-black tracking-tight leading-[1.1] mt-0.5">
                  <span className="text-[#2563EB]">Tôi </span>
                  <span className="text-[#312E81] dark:text-white">là trợ lý ảo</span>
                  <br />
                  <span className="text-[#312E81] dark:text-white">của </span>
                  <span className="text-[#2563EB] dark:text-cyan-400">bạn!</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-[11.5px] text-slate-500 dark:text-slate-300 font-medium leading-snug mt-1.5 line-clamp-2">
                Tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi về các dịch vụ ngân hàng và tài chính.
              </p>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-2 mt-2 pt-0.5">
              <button
                type="button"
                onClick={handleStartChat}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-sm shadow-blue-500/25 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <WebIcon name="chat" className="w-3.5 h-3.5" />
                <span>Bắt đầu trò chuyện</span>
                <span className="font-bold text-sm leading-none">›</span>
              </button>

              {/* Video Preview Button */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-rose-500 hover:text-rose-600 hover:scale-110 active:scale-95 transition flex items-center justify-center shadow-xs cursor-pointer"
                title="Xem Video Chân Dung Giới Thiệu"
                aria-label="Xem Video Chân Dung"
              >
                <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Center Illustration: Executive + Laptop + Mouse Mascot */}
          <div className="hidden md:flex absolute left-[50%] lg:left-[52%] bottom-0 -translate-x-1/2 h-full items-end justify-center pointer-events-none select-none z-0">
            <img
              src="/images/about/hero-character.png"
              alt="Chuyên gia & Trợ lý ảo"
              className="h-full max-h-[220px] xl:max-h-[230px] object-contain drop-shadow-md"
            />
          </div>

          {/* Right Stat Pills Column */}
          <div className="relative z-10 flex flex-col justify-between shrink-0 w-full sm:w-[190px] xl:w-[200px] py-0.5 gap-1.5">
            {/* 1. Kinh nghiệm CX & CS */}
            <div className="flex items-center justify-between p-1.5 px-2.5 rounded-xl bg-white/85 dark:bg-slate-800/85 border border-white/90 dark:border-white/10 shadow-2xs backdrop-blur-md hover:scale-[1.02] transition cursor-default">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <WebIcon name="calendar" className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate">
                    Kinh nghiệm CX & CS
                  </span>
                  <span className="text-[11.5px] font-black text-[#1E3A6D] dark:text-cyan-300 tracking-tight leading-none">
                    22+ NĂM
                  </span>
                </div>
              </div>
              <span className="text-slate-400 dark:text-slate-500 font-bold text-xs ml-1">›</span>
            </div>

            {/* 2. Quy mô lớn */}
            <div className="flex items-center justify-between p-1.5 px-2.5 rounded-xl bg-white/85 dark:bg-slate-800/85 border border-white/90 dark:border-white/10 shadow-2xs backdrop-blur-md hover:scale-[1.02] transition cursor-default">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <WebIcon name="building" className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate">
                    Quy mô lớn
                  </span>
                  <span className="text-[11.5px] font-black text-purple-700 dark:text-purple-300 tracking-tight leading-none">
                    8+ MÔI TRƯỜNG
                  </span>
                </div>
              </div>
              <span className="text-slate-400 dark:text-slate-500 font-bold text-xs ml-1">›</span>
            </div>

            {/* 3. Tự động hoá */}
            <div className="flex items-center justify-between p-1.5 px-2.5 rounded-xl bg-white/85 dark:bg-slate-800/85 border border-white/90 dark:border-white/10 shadow-2xs backdrop-blur-md hover:scale-[1.02] transition cursor-default">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <WebIcon name="clock" className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate">
                    Tự động hoá
                  </span>
                  <span className="text-[11.5px] font-black text-teal-600 dark:text-teal-300 tracking-tight leading-none">
                    24/7 AI CRM
                  </span>
                </div>
              </div>
              <span className="text-slate-400 dark:text-slate-500 font-bold text-xs ml-1">›</span>
            </div>

            {/* 4. Tỷ lệ hài lòng KH */}
            <div className="flex items-center justify-between p-1.5 px-2.5 rounded-xl bg-white/85 dark:bg-slate-800/85 border border-white/90 dark:border-white/10 shadow-2xs backdrop-blur-md hover:scale-[1.02] transition cursor-default">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/70 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <WebIcon name="heart" className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate">
                    Tỷ lệ hài lòng KH
                  </span>
                  <span className="text-[11.5px] font-black text-rose-600 dark:text-rose-300 tracking-tight leading-none">
                    99%
                  </span>
                </div>
              </div>
              <span className="text-slate-400 dark:text-slate-500 font-bold text-xs ml-1">›</span>
            </div>
          </div>
        </div>

        {/* 1.2 THÔNG TIN CÁ NHÂN CARD (4 COLS) */}
        <div className="lg:col-span-4 rounded-[20px] lg:rounded-[24px] p-3 sm:p-3.5 bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[18px] shadow-[0_4px_20px_rgba(62,115,180,0.06)] flex flex-col justify-between text-left h-full">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <WebIcon name="user" className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-black text-[#1E3A6D] dark:text-white">
                Thông tin cá nhân
              </h3>
            </div>
            <span className="text-slate-400 font-bold text-xs">›</span>
          </div>

          {/* 6 Demographic Items */}
          <div className="flex flex-col justify-between flex-1 gap-1 my-1">
            {/* 1. Giới tính */}
            <div className="p-1.5 px-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <WebIcon name="user" className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-blue-600 dark:text-blue-400 tracking-wider block leading-none">
                    Giới tính
                  </span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">Nam giới</span>
                </div>
              </div>
              <span className="text-slate-400 font-bold text-[10px]">›</span>
            </div>

            {/* 2. Dân tộc */}
            <div className="p-1.5 px-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <WebIcon name="users" className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-purple-600 dark:text-purple-400 tracking-wider block leading-none">
                    Dân tộc
                  </span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">Kinh</span>
                </div>
              </div>
              <span className="text-slate-400 font-bold text-[10px]">›</span>
            </div>

            {/* 3. Tình trạng */}
            <div className="p-1.5 px-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-rose-50 dark:bg-rose-950/70 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <WebIcon name="heart" className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-rose-600 dark:text-rose-400 tracking-wider block leading-none">
                    Tình trạng
                  </span>
                  <span className="text-[11px] font-black text-rose-600 dark:text-rose-400 leading-tight">Độc thân</span>
                </div>
              </div>
              <span className="text-rose-400 font-bold text-[10px]">›</span>
            </div>

            {/* 4. Sinh nhật */}
            <div className="p-1.5 px-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <WebIcon name="calendar" className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-amber-600 dark:text-amber-400 tracking-wider block leading-none">
                    Sinh nhật
                  </span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">22/06/1984</span>
                </div>
              </div>
              <span className="text-slate-400 font-bold text-[10px]">›</span>
            </div>

            {/* 5. Tạm trú */}
            <div
              onClick={() =>
                openMap(
                  'Địa Chỉ Tạm Trú',
                  'Quận 7, TP. Hồ Chí Minh',
                  'Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
                )
              }
              className="p-1.5 px-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-violet-300 dark:hover:border-violet-500 hover:bg-violet-50/30 transition flex items-center justify-between shadow-2xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-violet-50 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                  <WebIcon name="location" className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-violet-600 dark:text-violet-400 tracking-wider block leading-none">
                    Tạm trú
                  </span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">
                    Q7, Hồ Chí Minh
                  </span>
                </div>
              </div>
              <span className="text-violet-400 font-bold text-[10px]">›</span>
            </div>

            {/* 6. Cư trú */}
            <div
              onClick={() =>
                openMap(
                  'Địa Chỉ Cư Trú Thường Trú',
                  'TP. Mỹ Tho, Tiền Giang',
                  'Mỹ Tho, Tiền Giang, Việt Nam'
                )
              }
              className="p-1.5 px-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50/30 transition flex items-center justify-between shadow-2xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <WebIcon name="home" className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block leading-none">
                    Cư trú
                  </span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">
                    Mỹ Tho, Tiền Giang
                  </span>
                </div>
              </div>
              <span className="text-emerald-400 font-bold text-[10px]">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 (BOTTOM ROW): CHÂN DUNG & TRIẾT LÝ VẬN HÀNH                      */}
      {/* ========================================================================= */}
      <div className="w-full flex-1 min-h-0 flex flex-col justify-between gap-1.5 lg:gap-2">
        {/* Section Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1 shrink-0">
          <div className="flex items-center gap-2 text-left">
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shadow-2xs">
              <WebIcon name="target" className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-black text-[#1E3A6D] dark:text-white tracking-tight leading-tight">
                Chân dung & Triết lý vận hành
              </h3>
              <div className="w-10 h-0.5 rounded-full bg-blue-500 mt-0.5" />
            </div>
          </div>
          <div className="text-xs sm:text-[12.5px] font-medium italic text-slate-500 dark:text-slate-300 font-serif">
            “Giá trị cốt lõi tạo nên trải nghiệm khác biệt.”
          </div>
        </div>

        {/* Content Grid: Left Intro Card + Right Pillars & Values */}
        <div className="w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
          {/* 2.1 GIỚI THIỆU BẢN THÂN TÔI (4 COLS) */}
          <div className="lg:col-span-4 rounded-[20px] lg:rounded-[24px] p-3.5 sm:p-4 bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[18px] shadow-[0_4px_20px_rgba(62,115,180,0.06)] flex flex-col justify-between relative overflow-hidden text-left h-full min-h-0">
            <div>
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <WebIcon name="user" className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-black text-[#1E3A6D] dark:text-white">
                  Giới thiệu bản thân tôi
                </h4>
              </div>

              <div className="my-2 text-[11px] sm:text-[11.5px] xl:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium space-y-1.5">
                <p>
                  Một chuyên gia dịch vụ khách hàng với{' '}
                  <strong className="text-[#1E3A6D] dark:text-cyan-300 font-bold">
                    hơn 22 năm kinh nghiệm
                  </strong>{' '}
                  thực chiến.
                </p>
                <p>
                  Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành.
                </p>
                <p>
                  Mỗi cuộc trò chuyện, mỗi khoảnh khắc, đều là một cơ hội quý giá để lắng nghe, để
                  thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                </p>
              </div>
            </div>

            {/* Bottom Signature & Mascot */}
            <div className="flex items-end justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 shrink-0">
              <span className="font-handwriting text-blue-600 dark:text-cyan-400 text-lg sm:text-xl font-bold tracking-wide select-none drop-shadow-xs">
                Luôn bên bạn! ♡
              </span>
              <div className="w-13 h-13 sm:w-14 sm:h-14 xl:w-16 xl:h-16 shrink-0 select-none pointer-events-none -mb-1">
                <img
                  src="/images/about/mouse-mascot-pure.png"
                  alt="Mascot Chuột May Mắn"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* 2.2 RIGHT AREA: BA TRỤ CỘT + GIÁ TRỊ CỐT LÕI & TRIẾT LÝ (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-1.5 sm:gap-2 h-full min-h-0">
            {/* 2.2.1 BA TRỤ CỘT VẬN HÀNH */}
            <div className="flex flex-col gap-1.5 flex-1 min-h-0 justify-between">
              <div className="flex items-center gap-1.5 px-0.5 text-left shrink-0">
                <WebIcon name="layers" className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <h4 className="text-[11px] sm:text-xs font-black text-[#1E3A6D] dark:text-white uppercase tracking-wider">
                  Ba trụ cột vận hành
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
                {/* Pillar 1: HIỆU QUẢ */}
                <div className="rounded-[18px] p-2.5 sm:p-3 bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white shadow-md relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300 text-left">
                  <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-20 h-20 flex items-center justify-center">
                    <WebIcon name="chart" className="w-16 h-16" />
                  </div>
                  <div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 shadow-2xs">
                      <WebIcon name="chart" className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h5 className="text-xs sm:text-[13px] font-black tracking-tight leading-tight">
                      01. HIỆU QUẢ
                    </h5>
                    <span className="text-[10px] font-bold text-blue-100 block tracking-wide">
                      Tối ưu & Kết quả
                    </span>
                    <p className="text-[10.5px] text-white/90 font-medium leading-tight mt-1">
                      Tối ưu hiệu suất, tạo kết quả đã hướng được.
                    </p>
                  </div>
                  <div className="self-end mt-1">
                    <div className="w-5 h-5 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-600 flex items-center justify-center transition cursor-pointer font-bold text-[10px]">
                      ›
                    </div>
                  </div>
                </div>

                {/* Pillar 2: NHÂN VĂN */}
                <div className="rounded-[18px] p-2.5 sm:p-3 bg-gradient-to-br from-[#FB7185] via-[#F43F5E] to-[#E11D48] text-white shadow-md relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300 text-left">
                  <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-20 h-20 flex items-center justify-center">
                    <WebIcon name="heart" className="w-16 h-16" />
                  </div>
                  <div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 shadow-2xs">
                      <WebIcon name="heart" className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h5 className="text-xs sm:text-[13px] font-black tracking-tight leading-tight">
                      02. NHÂN VĂN
                    </h5>
                    <span className="text-[10px] font-bold text-rose-100 block tracking-wide">
                      Đồng cảm & Thấu hiểu
                    </span>
                    <p className="text-[10.5px] text-white/90 font-medium leading-tight mt-1">
                      Lắng nghe, thấu hiểu, về đích cùng con người làm trung tâm.
                    </p>
                  </div>
                  <div className="self-end mt-1">
                    <div className="w-5 h-5 rounded-full bg-white/20 hover:bg-white text-white hover:text-rose-600 flex items-center justify-center transition cursor-pointer font-bold text-[10px]">
                      ›
                    </div>
                  </div>
                </div>

                {/* Pillar 3: BỀN VỮNG */}
                <div className="rounded-[18px] p-2.5 sm:p-3 bg-gradient-to-br from-[#34D399] via-[#10B981] to-[#059669] text-white shadow-md relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300 text-left">
                  <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-20 h-20 flex items-center justify-center">
                    <WebIcon name="shield" className="w-16 h-16" />
                  </div>
                  <div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 shadow-2xs">
                      <WebIcon name="shield" className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h5 className="text-xs sm:text-[13px] font-black tracking-tight leading-tight">
                      03. BỀN VỮNG
                    </h5>
                    <span className="text-[10px] font-bold text-emerald-100 block tracking-wide">
                      Giá trị & Tin cậy
                    </span>
                    <p className="text-[10.5px] text-white/90 font-medium leading-tight mt-1">
                      Xây dựng niềm tin và giá trị bền vững.
                    </p>
                  </div>
                  <div className="self-end mt-1">
                    <div className="w-5 h-5 rounded-full bg-white/20 hover:bg-white text-white hover:text-emerald-600 flex items-center justify-center transition cursor-pointer font-bold text-[10px]">
                      ›
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.2.2 GIÁ TRỊ CỐT LÕI + TRIẾT LÝ VÀ TẦM NHÌN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 items-stretch shrink-0">
              {/* Card 1: Giá trị cốt lõi */}
              <div className="rounded-[18px] p-2.5 sm:p-3 bg-[#FFFBEB] dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-800/50 shadow-xs flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <WebIcon name="star" className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <h5 className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                      Giá trị cốt lõi
                    </h5>
                  </div>
                  <p className="text-[10.5px] text-slate-700 dark:text-slate-300 font-medium leading-snug italic">
                    “Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{' '}
                    <strong className="text-amber-900 dark:text-amber-200 font-bold not-italic">
                      sự tận tâm kịp thời và đồng cảm chân thành.
                    </strong>”
                  </p>
                </div>
                <div className="self-end mt-1">
                  <span className="font-handwriting text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-bold">
                    Khách hàng là trung tâm ♡
                  </span>
                </div>
              </div>

              {/* Card 2: Triết lý và tầm nhìn */}
              <div className="rounded-[18px] p-2.5 sm:p-3 bg-[#F0F7FF] dark:bg-slate-900/60 border border-blue-200/70 dark:border-blue-900/40 shadow-xs flex flex-col justify-between text-left relative overflow-hidden">
                <div className="absolute right-2 top-2 text-blue-200/60 dark:text-blue-900/40 text-2xl font-serif select-none pointer-events-none">
                  ❝
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <WebIcon name="target" className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                    <h5 className="text-xs font-extrabold text-[#1E3A6D] dark:text-white">
                      Triết lý và tầm nhìn
                    </h5>
                  </div>
                  <h6 className="text-[11px] font-black text-[#1E3A6D] dark:text-cyan-300 leading-snug my-0.5">
                    “Tạo Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
                  </h6>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium leading-tight">
                    Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý.
                    Và trên hết, để mỗi khách hàng cảm nhận được: họ luôn được lắng nghe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: GOOGLE MAPS MODAL                                                */}
      {/* ========================================================================= */}
      <Modal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        title={mapTitle}
        subtitle={mapAddress}
        icon={<WebIcon name="location" className="w-5 h-5 text-indigo-600" />}
        maxWidth="2xl"
      >
        <div className="p-4 flex flex-col gap-3">
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            {mapModalOpen && (
              <iframe
                title="Google Maps Location"
                className="w-full h-full border-0"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  mapQuery
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            )}
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <WebIcon name="location" className="w-3.5 h-3.5 text-rose-500" />
              <span>Google Maps Embed</span>
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-[999px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition inline-flex items-center gap-1"
              >
                <span>Mở Tab Google Maps</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setMapModalOpen(false)}
                className="px-4 py-1.5 rounded-[999px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 2: INTRO PORTRAIT VIDEO MODAL                                       */}
      {/* ========================================================================= */}
      <Modal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title="Video Chân Dung & Lời Giới Thiệu"
        subtitle="Nguyễn Hùng Thái — Trưởng Phòng CSKH"
        icon={<WebIcon name="user" className="w-5 h-5 text-blue-600" />}
        maxWidth="md"
      >
        <div className="p-4 flex flex-col items-center gap-3">
          <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-700">
            {videoModalOpen && (
              <video
                src={INTRO_VIDEO_URL}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-full flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Chân dung lãnh đạo 22+ năm CX & CS
            </span>
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
