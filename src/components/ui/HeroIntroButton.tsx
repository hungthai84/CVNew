'use client';

import React from 'react';
import { Play, Volume2, VolumeX, Square } from 'lucide-react';

export interface HeroIntroButtonProps {
  isPlayingIntro: boolean;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onPlayIntro: () => void;
  onCancelIntro: () => void;
  lang?: string;
  className?: string;
}

export const HeroIntroButton: React.FC<HeroIntroButtonProps> = ({
  isPlayingIntro,
  isAudioOn,
  onToggleAudio,
  onPlayIntro,
  onCancelIntro,
  lang = 'vi',
  className = '',
}) => {
  const isVi = lang === 'vi';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!isPlayingIntro ? (
        <button
          type="button"
          onClick={onPlayIntro}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-3 h-3 fill-current" />
          </div>
          <span>{isVi ? 'Xem Video Giới Thiệu' : 'Watch Intro Video'}</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleAudio}
            className="p-2 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-all cursor-pointer"
            title={isAudioOn ? 'Tắt tiếng' : 'Bật tiếng'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
          <button
            type="button"
            onClick={onCancelIntro}
            className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>{isVi ? 'Đóng Video' : 'Close Video'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
