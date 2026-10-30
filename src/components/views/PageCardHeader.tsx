'use client';

import React from 'react';
import { Sparkles, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageCardHeaderProps {
  pageId: string;
  className?: string;
}

export const PageCardHeader: React.FC<PageCardHeaderProps> = ({ pageId, className }) => {
  return (
    <div className={cn("w-full flex items-center justify-between p-3.5 sm:p-4 rounded-[14px] bg-white/80 dark:bg-slate-900/85 border border-slate-200/80 dark:border-white/10 shadow-xs backdrop-blur-xl mb-1", className)}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <Brain className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h2 className="section-title font-bold font-play text-slate-900 dark:text-white leading-tight">
            07. KHUNG NĂNG LỰC & KỸ NĂNG CỐT LÕI
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Khung phân tích SWOT 4 Ma Trận & Năng lực Ngôn ngữ Giao tiếp Quốc tế
          </p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold font-mono">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>SWOT Framework</span>
      </div>
    </div>
  );
};

export default PageCardHeader;
