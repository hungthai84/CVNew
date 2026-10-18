'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  INTERVIEW_QUESTIONS,
  INTERVIEW_TABS,
  INTERVIEW_VIDEO_1_URL,
  INTERVIEW_VIDEO_2_URL,
} from '@/data/interview';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export const InterviewView: React.FC = () => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [progressPct, setProgressPct] = useState<number>(0);
  // Trạng thái thu gọn chủ đề câu hỏi trong banner (Mặc định thu gọn lại, khi bấm vào sẽ hiện ra)
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  // Trạng thái thu gọn toàn bộ banner phỏng vấn
  const [isBannerCollapsed, setIsBannerCollapsed] = useState<boolean>(false);

  const currentQ = INTERVIEW_QUESTIONS[currentQIdx] || INTERVIEW_QUESTIONS[0];

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    if (activeFilter === 'all') return true;
    return q.categoryKey === activeFilter;
  });

  const selectQuestion = (idx: number) => {
    const clamped = Math.max(0, Math.min(INTERVIEW_QUESTIONS.length - 1, idx));
    setCurrentQIdx(clamped);
    const q = INTERVIEW_QUESTIONS[clamped];

    const video = videoRef.current;
    if (!video) return;

    if (!isVideoPlaying || video.src !== INTERVIEW_VIDEO_2_URL) {
      setIsVideoPlaying(true);
      setIsAudioOn(true);
      video.src = INTERVIEW_VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.currentTime = q.startSec;
      video.play().catch(() => {});
    } else {
      video.currentTime = q.startSec;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
    showToast(`Đã chọn Câu 0${q.stt}: ${q.categoryVi}`);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      setIsVideoPlaying(false);
      video.src = INTERVIEW_VIDEO_1_URL;
      video.loop = true;
      video.muted = true;
      video.play().catch(() => {});
    } else {
      setIsVideoPlaying(true);
      setIsAudioOn(true);
      video.src = INTERVIEW_VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.currentTime = currentQ.startSec;
      video.play().catch(() => {});
    }
  };

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextAudio = !isAudioOn;
    setIsAudioOn(nextAudio);
    video.muted = !nextAudio;
    showToast(nextAudio ? 'Đã bật tiếng video phỏng vấn' : 'Đã tắt tiếng video phỏng vấn');
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const time = video.currentTime;

    if (isVideoPlaying) {
      const matchedIdx = INTERVIEW_QUESTIONS.findIndex(
        (item) => time >= item.startSec && time < item.endSec
      );
      if (matchedIdx !== -1 && matchedIdx !== currentQIdx) {
        setCurrentQIdx(matchedIdx);
      }
    }

    const qDuration = Math.max(1, currentQ.endSec - currentQ.startSec);
    const elapsed = Math.max(0, Math.min(qDuration, time - currentQ.startSec));
    const pct = isVideoPlaying ? (elapsed / qDuration) * 100 : 0;
    setProgressPct(pct);
  };

  const handleEnded = () => {
    if (isVideoPlaying) {
      togglePlay();
    }
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[12px] sm:gap-[15px] max-w-7xl mx-auto justify-start select-none relative text-slate-800 overflow-hidden text-left">
      {/* 1. VÙNG BÊN TRÁI: BANNER THEO CHIỀU DỌC (ĐÃ CHUYỂN QUA BÊN TRÁI, CÓ NÚT THU GỌN / MỞ RỘNG VÀ TỰ ĐỘNG ĐẨY KHI PHÁT VIDEO) */}
      <aside
        className={`shrink-0 h-full flex flex-col overflow-hidden transition-all duration-700 ease-in-out ${
          isVideoPlaying
            ? 'w-0 opacity-0 pointer-events-none -translate-x-full lg:w-0'
            : isBannerCollapsed
            ? 'w-full lg:w-[46px] xl:w-[48px] h-[48px] lg:h-full opacity-100'
            : 'w-full lg:w-[270px] xl:w-[290px] opacity-100 translate-x-0'
        }`}
      >
        {isBannerCollapsed ? (
          <div
            onClick={() => setIsBannerCollapsed(false)}
            className="w-full lg:w-[46px] xl:w-[48px] shrink-0 h-[48px] lg:h-full rounded-[20px] overflow-hidden relative flex flex-row lg:flex-col justify-between items-center p-2.5 sm:p-3 border border-pink-400/50 shadow-md bg-gradient-to-b from-[#0f172a] via-[#3b0764] to-[#1e1b4b] text-white cursor-pointer hover:border-pink-300 group/collapsedBanner transition-all duration-300 select-none z-10"
            title="Bấm để mở rộng Banner Phỏng Vấn"
          >
            <div className="flex items-center gap-2 lg:flex-col lg:gap-3">
              <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0 group-hover/collapsedBanner:scale-110 transition-transform">
                <WebIcon name="chat" className="w-4 h-4 animate-banner-icon" />
              </div>
              <span className="text-[11px] font-black text-pink-200 tracking-wider font-play [writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl] lg:rotate-180 uppercase">
                Banner Phỏng Vấn
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-[10px] font-extrabold text-pink-300 group-hover/collapsedBanner:bg-pink-500 group-hover/collapsedBanner:text-white transition-colors">
              <span>Mở</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ) : (
          <div
            className="theme-hero-banner relative rounded-2xl overflow-hidden border-none shadow-xl flex flex-col justify-between p-3.5 sm:p-4 text-white h-full group/banner overflow-y-auto no-scrollbar w-[270px] xl:w-[290px] max-w-full"
            style={{
              background: 'linear-gradient(160deg, #0f172a 0%, #3b0764 45%, #1e1b4b 100%)',
            }}
          >
            {/* Background Video: banner dọc dùng link video dự án (hình nền sáng rõ) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.scena.ai/project/10223/cc106cb37b8d219cca59af9a71a4d7a8cd019515a3e9a8282d16909bb21d88b9.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none brightness-[1.10] contrast-[1.08] group-hover/banner:scale-105 transition-transform duration-700"
            />

            {/* Dark Ambient Overlay nhẹ mỏng để lộ rõ hình nền sống động */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/65 pointer-events-none" />

            {/* Ambient Watermark */}
            <div className="card-watermark opacity-15 pointer-events-none -right-4 -bottom-6">
              <WebIcon name="headphones" className="w-24 h-24 text-pink-400" />
            </div>

            {/* PHẦN 1: HEADER BANNER (Tiêu đề, Badge, Subtitle & Quote + Nút Thu Gọn) */}
            <div className="relative z-10 flex flex-col gap-1.5 shrink-0">
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/15">
                <span className="font-handwriting font-bold text-xl sm:text-2xl text-pink-400 leading-none drop-shadow-xs">
                  Đối thoại
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-[9.5px] font-extrabold text-pink-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                    <span>Trực tiếp · 24/7</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBannerCollapsed(true);
                    }}
                    className="px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white/90 hover:text-white text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    title="Bấm để thu gọn banner"
                  >
                    <span>Thu gọn</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tiêu đề có icon chuyển động tại chỗ trước tiêu đề, không đóng khung icon */}
              <h2 className="text-base sm:text-lg font-black font-play text-white tracking-tight leading-snug drop-shadow-xs flex items-center gap-2">
                <span className="inline-flex animate-banner-icon shrink-0 text-pink-400">
                  <WebIcon name="chat" className="w-5 h-5" />
                </span>
                <span>Phỏng Vấn Thực Chiến</span>
              </h2>
              <p className="text-[10.5px] font-medium text-slate-200 leading-tight">
                Tương tác trực tiếp – Giải pháp thực chiến – Đo lường vượt trội
              </p>

              {/* Decorative Pink-Purple Accent Line */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 shadow-xs" />

              {/* Quote Block Fleur De Leah */}
              <div className="pt-0.5 bg-transparent border-none shadow-none">
                <p className="font-banner-quote text-xl sm:text-2xl text-amber-300 font-normal leading-tight select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  “Đối thoại chân thực khẳng định bản lĩnh và năng lực quản trị.”
                </p>
                <span className="text-[10px] font-bold text-amber-200/90 mt-0.5 block tracking-wider font-play drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                  — Nguyễn Hùng Thái
                </span>
              </div>
            </div>

            {/* PHẦN 2: PROFILE CANDIDATE ROW */}
            <div className="relative z-10 my-1.5 flex flex-col gap-1.5 shrink-0">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-pink-300/50 shadow-md shrink-0 bg-slate-900">
                  <img
                    src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                    alt="Nguyễn Hùng Thái"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black font-play text-white truncate tracking-wide">
                    Nguyễn Hùng Thái
                  </span>
                  <span className="text-[10px] font-bold text-pink-200 truncate">
                    Trưởng Phòng CSKH
                  </span>
                  <span className="text-[9px] text-slate-300 truncate">
                    22+ Năm Kinh Nghiệm CX
                  </span>
                </div>
              </div>
            </div>

            {/* PHẦN 3: NHÓM NÚT LỌC DANH MỤC CÂU HỎI TRONG BANNER: THU GỌN LẠI, KHI BẤM VÀO SẼ HIỆN RA */}
            <div className="relative z-10 flex flex-col gap-1 w-full shrink-0">
              <button
                type="button"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm transition-all cursor-pointer text-left group/catBtn"
                title={isCategoryOpen ? "Thu gọn danh mục câu hỏi" : "Bấm để mở danh mục câu hỏi"}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-pink-400/20 text-pink-300 flex items-center justify-center shrink-0 animate-icon-inplace">
                    <WebIcon name="layers" className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-pink-200 font-black truncate">
                      Chủ đề câu hỏi
                    </span>
                    <span className="text-[10.5px] text-white font-bold truncate">
                      {INTERVIEW_TABS.find((t) => t.key === activeFilter)?.labelVi || 'Tất cả (14)'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 font-mono">
                    {isCategoryOpen ? 'Thu gọn' : 'Hiện ra'}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-pink-300 transition-transform duration-300 ${
                      isCategoryOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Danh sách chủ đề: thu gọn lại, khi bấm vào sẽ hiện ra */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isCategoryOpen
                    ? 'max-h-[300px] opacity-100 mt-1'
                    : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto no-scrollbar max-h-[190px] pb-0.5">
                  {INTERVIEW_TABS.map((tab) => {
                    const isActive = activeFilter === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveFilter(tab.key)}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center justify-between gap-1.5 cursor-pointer border whitespace-nowrap active:scale-95 ${
                          isActive
                            ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 text-white border-pink-400 shadow-md shadow-pink-500/30 scale-[1.02]'
                            : 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border-white/15'
                        }`}
                      >
                        <span className="truncate">{tab.labelVi}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          {/* PHẦN 4: THỐNG KÊ VÀ HÀNH ĐỘNG TƯƠNG TÁC */}
          <div className="relative z-10 pt-2 border-t border-white/15 flex flex-col gap-1.5 shrink-0">
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                className="px-2 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-[10.5px] font-bold flex items-center justify-center gap-1 shadow-md shadow-pink-500/30 transition cursor-pointer active:scale-95"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  {isVideoPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <polygon points="5 3 19 12 5 21 5 3" />
                  )}
                </svg>
                <span>{isVideoPlaying ? 'Tạm Dừng' : 'Phát Video'}</span>
              </button>

              <button
                type="button"
                onClick={toggleAudio}
                className="px-2 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[10.5px] font-bold flex items-center justify-center gap-1 transition cursor-pointer active:scale-95"
              >
                <WebIcon name={isAudioOn ? 'volume' : 'volume-x'} className="w-2.5 h-2.5" />
                <span>{isAudioOn ? 'Tắt Tiếng' : 'Bật Tiếng'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium px-0.5">
              <span>Trực tiếp HD 1080p</span>
              <span className="text-pink-400 font-bold">14 Phân Cảnh</span>
            </div>
          </div>
        </div>
        )}
      </aside>

      {/* 2. VÙNG VIDEO PHỎNG VẤN TRỰC TIẾP (CHIẾM VỊ TRÍ BANNER KHI PHÁT) */}
      <div className="flex-1 min-w-0 flex flex-col h-full min-h-[340px] lg:min-h-0 transition-all duration-700 ease-in-out">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-950 flex flex-col flex-1 group">
          <video
            ref={videoRef}
            autoPlay
            loop={!isVideoPlaying}
            muted={!isAudioOn}
            playsInline
            src={isVideoPlaying ? INTERVIEW_VIDEO_2_URL : INTERVIEW_VIDEO_1_URL}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="h-full w-full object-cover transition-all duration-700 brightness-105 contrast-100 flex-1 min-h-0"
          />

          {/* Gradient vignette */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/45" />

          {/* Top Left: Active Question Badge & Timecode */}
          <div className="pointer-events-none absolute left-3.5 top-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/20 backdrop-blur-md text-xs font-bold text-white shadow-md truncate max-w-[calc(100%-80px)]">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isVideoPlaying ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'
              }`}
            />
            <span className="font-mono text-cyan-300 tracking-wide">
              {isVideoPlaying ? `Đang phát câu 0${currentQ.stt}` : 'Sẵn sàng phỏng vấn'}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-slate-300 font-mono text-[11px] truncate">
              {currentQ.timestamp}
            </span>
          </div>

          {/* Bottom Right: Rotating Glowing Laser Beam Capsule Button */}
          <div className="pointer-events-auto absolute right-3.5 bottom-3.5 z-20">
            <div className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[42px] sm:h-[46px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50">
              <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

              <div className="relative z-10 inline-flex items-center justify-between w-auto max-w-fit h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-2.5 py-1 gap-2 shadow-inner backdrop-blur-md">
                {/* Speaker Toggle Button */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md ${
                    isAudioOn
                      ? 'bg-[#4E56F6] hover:bg-[#3b43e3] text-white shadow-[0_0_12px_rgba(78,86,246,0.9)]'
                      : 'bg-[#E60026] hover:bg-red-500 text-white shadow-[0_0_12px_rgba(230,0,38,0.9)]'
                  }`}
                  title="Bật/Tắt âm thanh"
                >
                  {isAudioOn ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  )}
                </button>

                <div className="w-[1.5px] h-4 sm:h-5 bg-white/40 shrink-0 mx-0.5 rounded-full" />

                {/* Play / Pause Toggle Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1 flex-1 min-w-0 text-white font-extrabold text-xs tracking-wide transition-all duration-300 cursor-pointer hover:opacity-95 active:scale-98"
                >
                  <span className="drop-shadow-sm font-black uppercase tracking-wider text-xs text-white truncate">
                    {isVideoPlaying ? 'Dừng phát' : 'Phát phỏng vấn'}
                  </span>
                  <span>
                    {isVideoPlaying ? (
                      <svg className="w-4 h-4 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VÙNG BÊN PHẢI: THẺ CHI TIẾT CÂU TRẢ LỜI */}
      <div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 flex flex-col h-full overflow-hidden">
        <div className="w-full h-full flex-1 rounded-2xl border border-white/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/90 p-4 sm:p-5 backdrop-blur-2xl shadow-md transition-all duration-300 text-left flex flex-col justify-between gap-3 relative overflow-hidden">
          <div className="space-y-2.5 flex-1 flex flex-col min-h-0 relative z-10">
            {/* Header Tiêu đề thẻ */}
            <div className="space-y-2 shrink-0">
              <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 stroke-[2.3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                    Chi Tiết Câu Trả Lời
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-mono font-black shadow-xs tracking-wide">
                    CÂU 0{currentQ.stt}
                  </span>
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    <span
                      className={`w-1 rounded-full ${
                        isVideoPlaying ? 'bg-cyan-500 h-3 animate-pulse' : 'bg-slate-400 h-1.5'
                      }`}
                    />
                    <span
                      className={`w-1 rounded-full ${
                        isVideoPlaying ? 'bg-pink-500 h-4 animate-bounce' : 'bg-slate-400 h-2.5'
                      }`}
                    />
                    <span className="ml-1 text-[9px]">
                      {isVideoPlaying ? 'Đang phát' : 'Sẵn sàng'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 shadow-2xs" />
            </div>

            {/* Segment Progress Bar */}
            <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shrink-0 text-xs font-semibold">
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                <WebIcon name="clock" className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{currentQ.timestamp}</span>
              </div>
              <div className="flex items-center gap-2 flex-1 max-w-[150px]">
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full transition-all duration-200"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
                  {Math.round(currentQ.endSec - currentQ.startSec)}s
                </span>
              </div>
            </div>

            {/* Dialogue Bubble: Asker & Answerer & Key Takeaway */}
            <div className="flex-1 space-y-2 overflow-y-auto pr-1 no-scrollbar min-h-0 text-xs">
              {/* Asker (Hiển thị Câu hỏi số ở đầu câu hỏi) */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center gap-1.5">
                  <WebIcon name="building" className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                    {currentQ.askerVi.toUpperCase()}
                  </span>
                </div>
                <h5 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
                  <span className="text-pink-600 dark:text-pink-400 font-extrabold mr-1.5">
                    Câu hỏi {currentQ.stt < 10 ? `0${currentQ.stt}` : currentQ.stt}:
                  </span>
                  <span>{currentQ.questionVi.replace(/^Câu hỏi\s*\d+:\s*/, '')}</span>
                </h5>
              </div>

              {/* Answerer */}
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 space-y-1">
                <div className="flex items-center gap-1.5">
                  <WebIcon name="user" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    {currentQ.answererVi.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  {currentQ.answerVi}
                </p>
              </div>

              {/* Takeaway */}
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2 shrink-0">
                <WebIcon name="trophy" className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11.5px] text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                  <span className="font-extrabold text-amber-800 dark:text-amber-300 inline-flex items-center gap-1 mr-1">
                    <WebIcon name="target" className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                    <span>Trọng tâm:</span>
                  </span>
                  <span>{currentQ.keyTakeawayVi}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto shrink-0 relative z-10">
            <button
              type="button"
              disabled={currentQIdx === 0}
              onClick={() => selectQuestion(currentQIdx - 1)}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span>‹ Trước</span>
            </button>

            <button
              type="button"
              onClick={() => selectQuestion(currentQIdx)}
              className="text-xs font-bold text-indigo-700 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer py-1 px-2"
              title="Phát lại từ đầu đoạn này"
            >
              <WebIcon name="refresh" className="w-3.5 h-3.5" />
              <span>Phát lại</span>
            </button>

            <button
              type="button"
              disabled={currentQIdx === INTERVIEW_QUESTIONS.length - 1}
              onClick={() => selectQuestion(currentQIdx + 1)}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span>Tiếp ›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
