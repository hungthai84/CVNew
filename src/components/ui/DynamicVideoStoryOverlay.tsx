'use client';

import React from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

export interface DynamicVideoStoryOverlayProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  onClose: () => void;
  onSeek: (time: number) => void;
}

export const DynamicVideoStoryOverlay: React.FC<DynamicVideoStoryOverlayProps> = ({
  currentTime,
  duration,
  isPlaying,
  isMuted,
  onToggleMute,
  onTogglePlay,
  onClose,
  onSeek,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = Math.floor(secs % 60);
    return `${mins}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex flex-col gap-2.5">
      <div 
        className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          onSeek(pos * duration);
        }}
      >
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-white text-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <span className="font-mono text-[11px] text-slate-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-rose-600/90 hover:bg-rose-600 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
