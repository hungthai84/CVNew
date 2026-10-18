'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  INTERVIEW_QUESTIONS,
  INTERVIEW_VIDEO_1_URL,
  INTERVIEW_VIDEO_2_URL,
} from '@/data/interview';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export const InterviewView: React.FC = () => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(405); // 06:45 = 405s
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalQuestions = INTERVIEW_QUESTIONS.length;
  const currentQ = INTERVIEW_QUESTIONS[currentQIdx] || INTERVIEW_QUESTIONS[0];

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTimeSec(video.currentTime);

    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      setDurationSec(video.duration);
    }

    // Auto sync active question with video playback timestamp
    if (isPlaying) {
      const matchedIdx = INTERVIEW_QUESTIONS.findIndex(
        (item) => video.currentTime >= item.startSec && video.currentTime < item.endSec
      );
      if (matchedIdx !== -1 && matchedIdx !== currentQIdx) {
        setCurrentQIdx(matchedIdx);
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      setDurationSec(video.duration);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPlaying) {
      if (!video.src.includes('87d892c1c37f70cfae99aa55e5888f93ea6b7015050fe44e5d1f54418f0b06b9')) {
        video.src = INTERVIEW_VIDEO_2_URL;
        video.currentTime = currentQ.startSec;
      }
      video.muted = isMuted;
      video.play().catch(() => {});
      setIsPlaying(true);
      showToast(`Đang phát phỏng vấn: Câu ${currentQIdx + 1}/${totalQuestions}`);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const selectQuestion = (idx: number) => {
    const clamped = Math.max(0, Math.min(totalQuestions - 1, idx));
    setCurrentQIdx(clamped);
    const targetQ = INTERVIEW_QUESTIONS[clamped];

    const video = videoRef.current;
    if (!video) return;

    if (!isPlaying || !video.src.includes('87d892c1c37f70cfae99aa55e5888f93ea6b7015050fe44e5d1f54418f0b06b9')) {
      video.src = INTERVIEW_VIDEO_2_URL;
      video.currentTime = targetQ.startSec;
      video.muted = isMuted;
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.currentTime = targetQ.startSec;
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    showToast(`Đã chuyển sang Câu ${clamped + 1}/${totalQuestions}`);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;
    showToast(nextMuted ? 'Đã tắt tiếng' : 'Đã bật tiếng');
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSec = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    if (!video.src.includes('87d892c1c37f70cfae99aa55e5888f93ea6b7015050fe44e5d1f54418f0b06b9')) {
      video.src = INTERVIEW_VIDEO_2_URL;
    }
    video.currentTime = targetSec;
    setCurrentTimeSec(targetSec);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <section
      id="interview"
      className="w-full h-full max-h-full flex flex-col justify-start items-stretch font-sans text-slate-800 transition-colors duration-500 select-none bg-transparent overflow-hidden text-left"
    >
      {/* Outer Card Container */}
      <div className="w-full h-full flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-[24px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 shadow-sm backdrop-blur-xl overflow-hidden gap-3.5">
        {/* 1. TOP HEADER BAR: TỌA ĐÀM PHỎNG VẤN & TRÍCH DẪN */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-white/5 shrink-0">
          {/* Left: Video Camera Icon + Title + Subtitle */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center shrink-0 shadow-2xs">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 4.5A2.5 2.5 0 0 0 1.5 7v10A2.5 2.5 0 0 0 4 19.5h11a2.5 2.5 0 0 0 2.5-2.5v-2.28l3.66 2.44A1.25 1.25 0 0 0 23 16.12V7.88a1.25 1.25 0 0 0-1.84-1.04L17.5 9.28V7A2.5 2.5 0 0 0 15 4.5H4Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold font-play text-blue-600 dark:text-blue-400 tracking-tight leading-tight">
                Tọa đàm phỏng vấn
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                Chia sẻ kinh nghiệm, góc nhìn và những bài học quý giá từ các chuyên gia trong ngành.
              </p>
            </div>
          </div>

          {/* Right: Handwriting Quote */}
          <div className="shrink-0 text-right hidden sm:block">
            <p className="font-banner-quote text-base sm:text-lg text-blue-600 dark:text-blue-400 font-normal leading-snug italic">
              “Học hỏi từ những người đi trước là cách nhanh nhất để trưởng thành.”
            </p>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block text-right mt-0.5">
              — Nguyễn Hùng Thái
            </span>
          </div>
        </div>

        {/* 2. MAIN CONTENT AREA: 2 CỘT (VIDEO PLAYER BÊN TRÁI & CHI TIẾT PHỎNG VẤN BÊN PHẢI) */}
        <div className="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-4 items-stretch overflow-hidden">
          {/* CỘT BÊN TRÁI: KHUNG VIDEO PLAYER CHUYÊN NGHIỆP */}
          <div
            ref={containerRef}
            className="flex-[1.4] min-w-0 h-full flex flex-col justify-between rounded-[22px] overflow-hidden bg-black relative border border-slate-200/60 dark:border-white/10 shadow-lg group select-none"
          >
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src={isPlaying ? INTERVIEW_VIDEO_2_URL : INTERVIEW_VIDEO_1_URL}
              autoPlay
              loop={!isPlaying}
              muted={isMuted || !isPlaying}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Gradient Scrims */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Top-Left Badge: Video giới thiệu sẵn sàng */}
            <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Video giới thiệu sẵn sàng</span>
            </div>

            {/* Big Center Circular Play Button (khi đang tạm dừng) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Phát video phỏng vấn"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-white" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            )}

            {/* Floating Pill on Bottom Right: ▶ Phát phỏng vấn > */}
            <div className="absolute bottom-14 right-3.5 z-20">
              <button
                type="button"
                onClick={togglePlay}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-600 text-white font-bold text-xs shadow-xl flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all cursor-pointer border border-white/30"
              >
                <div className="w-5 h-5 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0">
                  {isPlaying ? (
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-2.5 h-2.5 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </div>
                <span>{isPlaying ? 'Tạm dừng phỏng vấn' : 'Phát phỏng vấn'}</span>
                <span className="text-white/80">›</span>
              </button>
            </div>

            {/* Subtitle Caption Overlay (khi bật CC) */}
            {showSubtitles && isPlaying && (
              <div className="absolute bottom-16 inset-x-4 z-20 flex justify-center pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-xs text-white text-xs sm:text-sm font-medium text-center max-w-xl shadow-md border border-white/10">
                  {currentQ.answerVi.slice(0, 110)}...
                </span>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="relative z-30 p-2.5 sm:p-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col gap-1.5 text-white">
              {/* Progress Slider Bar */}
              <div className="w-full relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={durationSec}
                  step="0.5"
                  value={currentTimeSec}
                  onChange={handleSeek}
                  aria-label="Thanh thời gian video"
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Controls Buttons Row */}
              <div className="flex items-center justify-between gap-2 text-xs">
                {/* Left Controls: Play + Time */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
                    className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition cursor-pointer"
                  >
                    {isPlaying ? (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 ml-0.5 fill-current" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    {formatTime(currentTimeSec)} / {formatTime(durationSec)}
                  </span>
                </div>

                {/* Right Controls: Volume + CC + Settings + Fullscreen */}
                <div className="flex items-center gap-2">
                  {/* Volume Toggle */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label="Bật/Tắt âm thanh"
                    className="p-1 rounded text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>

                  {/* CC Subtitles Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    aria-label="Bật/Tắt phụ đề"
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                      showSubtitles
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-transparent text-slate-400 border-slate-600 hover:text-white'
                    }`}
                  >
                    CC
                  </button>

                  {/* Settings Gear */}
                  <button
                    type="button"
                    onClick={() => showToast('Tùy chỉnh độ phân giải HD 1080p tự động')}
                    aria-label="Cài đặt video"
                    className="p-1 rounded text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </button>

                  {/* Fullscreen Toggle */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Toàn màn hình"
                    className="p-1 rounded text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT BÊN PHẢI: CHI TIẾT PHỎNG VẤN (CARD TRẮNG SÁNG CHUẨN MOCKUP) */}
          <div className="flex-1 min-w-0 h-full flex flex-col justify-between rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 shadow-sm text-left overflow-hidden">
            {/* Top Row: Icon + Tiêu đề 'Chi tiết phỏng vấn' + Badge 'Câu 1 / 13' */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-play text-slate-800 dark:text-white leading-tight">
                  Chi tiết phỏng vấn
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200/80 dark:border-blue-800">
                Câu {currentQIdx + 1} / {totalQuestions}
              </span>
            </div>

            {/* Middle Content: Số câu + Thời lượng + Chủ đề + Câu hỏi + Câu trả lời */}
            <div className="flex-1 min-h-0 py-3 flex flex-col justify-start overflow-y-auto custom-scrollbar pr-1">
              {/* Row: Circle Number + Time */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {currentQIdx + 1}
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium font-mono flex items-center gap-1">
                  <span>🕒</span>
                  <span>{currentQ.timestamp} (0g)</span>
                </span>
              </div>

              {/* Topic Pill Badge */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                  <span>🎯</span>
                  <span>Chủ đề: {currentQ.categoryVi}</span>
                </span>
              </div>

              {/* Question Title (In đậm rõ nét) */}
              <h4 className="text-sm sm:text-base font-bold font-play text-slate-900 dark:text-white leading-snug mb-3">
                {currentQ.questionVi}
              </h4>

              {/* Answer Content */}
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {currentQ.answerVi}
              </p>
            </div>

            {/* Bottom Row: Navigation Buttons (← Câu trước | 1 / 13 | Câu tiếp theo →) */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5 shrink-0 gap-2">
              <button
                type="button"
                disabled={currentQIdx === 0}
                onClick={() => selectQuestion(currentQIdx - 1)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer ${
                  currentQIdx === 0
                    ? 'text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60'
                    : 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80'
                }`}
              >
                <span>←</span>
                <span>Câu trước</span>
              </button>

              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                {currentQIdx + 1} / {totalQuestions}
              </span>

              <button
                type="button"
                disabled={currentQIdx === totalQuestions - 1}
                onClick={() => selectQuestion(currentQIdx + 1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  currentQIdx === totalQuestions - 1
                    ? 'text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60'
                    : 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 shadow-2xs'
                }`}
              >
                <span>Câu tiếp theo</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
