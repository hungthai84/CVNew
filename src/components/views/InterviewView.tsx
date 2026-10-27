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
import { formatCardTitle } from '@/lib/utils';

export interface InterviewViewProps {
  currentTheme?: string;
}

export const InterviewView: React.FC<InterviewViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [progressPct, setProgressPct] = useState<number>(0);

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
    <div className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[12px] sm:gap-[15px] max-w-7xl mx-auto justify-start select-none relative text-slate-800 dark:text-slate-100 overflow-hidden text-left">
      {/* 1. VÙNG BÊN TRÁI: BANNER PHỎNG VẤN HỢP NHẤT VIDEO (GỘP KÍCH THƯỚC VIDEO VÀ BANNER) */}
      <div className="flex-1 min-w-0 flex flex-col h-full min-h-[380px] lg:min-h-0 relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_40px_-6px_rgba(0,0,0,0.85),0_0_24px_-2px_rgba(78,86,246,0.3)] bg-slate-950 group">
        {/* Nền Video phỏng vấn trực tiếp */}
        <video
          ref={videoRef}
          autoPlay
          loop={!isVideoPlaying}
          muted={!isAudioOn}
          playsInline
          src={isVideoPlaying ? INTERVIEW_VIDEO_2_URL : INTERVIEW_VIDEO_1_URL}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 opacity-100 brightness-[1.15] contrast-[1.1] select-none pointer-events-none"
        />

        {/* Lớp phủ chuyển sắc trong suốt siêu nhẹ, giúp nền video hiển thị sáng rõ nét 100% */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/10 dark:from-black/35 dark:via-transparent dark:to-black/15" />

        {/* Nội dung Banner Phỏng Vấn (Controls) */}
        <div className="relative z-20 w-full h-full p-3.5 sm:p-4 lg:p-5 flex flex-col justify-end pointer-events-none">
          {/* DÒNG DƯỚI CÙNG: DROPDOWN LỌC DANH MỤC + CỤM NÚT ĐIỀU KHIỂN LASER BEAM */}
          <div className="w-full flex items-center justify-between gap-3 pointer-events-auto pt-2 flex-wrap sm:flex-nowrap">
            {/* Cụm trái: Dropdown chọn danh mục 14 câu hỏi */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold font-play tracking-wide transition-all border cursor-pointer flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 text-white border-white/30 shadow-md backdrop-blur-md active:scale-95"
              >
                <WebIcon name="filter" className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span className="truncate max-w-[170px] sm:max-w-[200px]">
                  Danh mục: {
                    INTERVIEW_TABS.find((t) => t.key === activeFilter)?.labelVi || 'Tất cả (14)'
                  }
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isFilterDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-56 p-1.5 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 flex flex-col gap-1">
                  {INTERVIEW_TABS.map((tab) => {
                    const isActive = activeFilter === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => {
                          setActiveFilter(tab.key);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-300 shadow-md'
                            : 'bg-white/5 hover:bg-white/15 text-white/90 border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <WebIcon name="compass" className="w-3.5 h-3.5 shrink-0 text-pink-300" />
                          <span className="truncate">{tab.labelVi}</span>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cụm phải: Laser Beam Capsule Button (Loa Bật/Tắt + Nút Phát/Dừng) */}
            <div className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-[44px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50">
              <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

              <div className="relative z-10 inline-flex items-center justify-between w-auto h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-2.5 py-1 gap-2 shadow-inner backdrop-blur-md">
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
      <div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 flex flex-col h-auto lg:h-full overflow-hidden">
        <div className="w-full h-full flex-1 rounded-2xl border border-white/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/90 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.04)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_20px_-2px_rgba(244,114,182,0.25)] transition-all duration-300 text-left flex flex-col justify-between gap-3 relative overflow-hidden">
          <div className="space-y-2.5 flex-1 flex flex-col min-h-0 relative z-10">
            {/* Header Tiêu đề thẻ */}
            <div className="space-y-2 shrink-0">
              <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <div
                  className="flex items-center gap-2 text-pink-600 dark:text-pink-400"
                >
                  <svg className="w-4 h-4 stroke-[2.3] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h4 className="text-xs sm:text-sm font-black font-play tracking-tight leading-none text-pink-600 dark:text-pink-400">
                    {formatCardTitle('Chi Tiết Trả Lời')}
                  </h4>
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
