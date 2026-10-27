'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface BeforeAfterMetric {
  title: string; // 4-word title
  unit: string;
  beforeVal: string;
  afterVal: string;
  diffText: string;
  isPositive: boolean;
  beforeSub: string;
  afterSub: string;
}

export interface BeforeAfterData {
  domainId: string;
  domainName: string;
  tagline: string;
  summary: string;
  metrics: BeforeAfterMetric[];
}

interface BeforeAfterImpactSliderProps {
  data: BeforeAfterData;
  accentColor?: string;
}

export const BeforeAfterImpactSlider: React.FC<BeforeAfterImpactSliderProps> = ({
  data,
  accentColor = '#06b6d4',
}) => {
  // Slider position: 0 (100% Before) -> 50 (Split) -> 100 (100% After)
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handlePreset = (val: number) => {
    SoundEngine.playTap();
    setSliderPos(val);
  };

  return (
    <div className="w-full flex flex-col justify-between h-full space-y-3 font-play">
      {/* 1. Header & Controls: Trực quan hóa kết quả vận hành & Nút chuyển đổi nhanh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/5 dark:border-white/10 shrink-0">
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 animate-pulse" />
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
              Đo lường trước sau
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-100 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
              {data.tagline}
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium line-clamp-1">
            {data.summary}
          </p>
        </div>

        {/* Cụm nút preset nhanh: Trước (0%) / Song song (50%) / Sau (100%) */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100/90 dark:bg-slate-800/80 p-0.5 rounded-full border border-slate-200/60 dark:border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => handlePreset(0)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer",
              sliderPos === 0
                ? "bg-rose-500 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Trước cải tiến
          </button>
          <button
            type="button"
            onClick={() => handlePreset(50)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer",
              sliderPos === 50
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            So sánh 50/50
          </button>
          <button
            type="button"
            onClick={() => handlePreset(100)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer",
              sliderPos === 100
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Sau tối ưu
          </button>
        </div>
      </div>

      {/* 2. Interactive Range Slider Bar */}
      <div className="px-1 py-1 shrink-0">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
          <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Trước cải tiến (Truyền thống)
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            Tỷ lệ so sánh: <span className="text-slate-900 dark:text-white font-bold">{sliderPos}%</span>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            Sau tối ưu (Chuẩn hóa)
            <CheckCircle2 className="w-3 h-3" />
          </span>
        </div>

        <div className="relative flex items-center w-full">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-500 rounded-lg appearance-none cursor-ew-resize accent-cyan-600 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Cards Grid Metrics: 4 Chỉ số so sánh chi tiết */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-0.5">
        {data.metrics.map((item, idx) => {
          // Tính toán độ mờ dựa trên sliderPos
          const beforeOpacity = Math.max(0.2, (100 - sliderPos) / 100);
          const afterOpacity = Math.max(0.2, sliderPos / 100);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-white/80 dark:border-white/10 shadow-2xs flex flex-col justify-between gap-2 relative overflow-hidden group hover:border-cyan-400/50 transition-all"
            >
              {/* Header card metric */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">
                  {item.title}
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-0.5 shadow-2xs",
                    item.isPositive
                      ? "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  )}
                >
                  <TrendingUp className="w-2.5 h-2.5" />
                  {item.diffText}
                </span>
              </div>

              {/* So sánh hai bên Trước & Sau */}
              <div className="grid grid-cols-2 gap-2 items-center pt-1 border-t border-slate-100 dark:border-white/5">
                {/* Cột Trước cải tiến */}
                <div
                  style={{ opacity: beforeOpacity }}
                  className="p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 transition-opacity duration-200 flex flex-col justify-between"
                >
                  <span className="text-[9px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400 block tracking-wider">
                    Trước cải tiến
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-mono font-black text-rose-700 dark:text-rose-300 line-through decoration-rose-400/80">
                      {item.beforeVal}
                    </span>
                    <span className="text-[9.5px] font-medium text-slate-400">{item.unit}</span>
                  </div>
                  <span className="text-[8.5px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                    {item.beforeSub}
                  </span>
                </div>

                {/* Cột Sau tối ưu */}
                <div
                  style={{ opacity: afterOpacity }}
                  className="p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 transition-opacity duration-200 flex flex-col justify-between shadow-xs relative overflow-hidden"
                >
                  {/* Subtle highlight sheen */}
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-emerald-400/20 blur-md pointer-events-none" />

                  <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 block tracking-wider">
                    Sau tối ưu hóa
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-mono font-black text-emerald-600 dark:text-emerald-300">
                      {item.afterVal}
                    </span>
                    <span className="text-[9.5px] font-medium text-emerald-600/80 dark:text-emerald-400/80 font-bold">
                      {item.unit}
                    </span>
                  </div>
                  <span className="text-[8.5px] text-emerald-800 dark:text-emerald-300 font-medium line-clamp-1 mt-0.5">
                    {item.afterSub}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
