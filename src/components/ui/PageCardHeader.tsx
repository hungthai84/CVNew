'use client';

import React from 'react';
import { PAGES } from '@/data/pages';
import { WebIcon } from './WebIcon';

export interface PageCardHeaderProps {
  pageId: number | string;
  className?: string;
}

export const PageCardHeader: React.FC<PageCardHeaderProps> = ({ pageId, className = '' }) => {
  const pageMeta = typeof pageId === 'number' 
    ? PAGES[pageId] 
    : PAGES.find(p => p.shortTitle.toLowerCase().includes(String(pageId).toLowerCase())) || PAGES[2];

  return (
    <div className={`w-full p-4 sm:p-5 rounded-[20px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/90 dark:border-white/15 shadow-sm flex items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md text-white"
          style={{ background: pageMeta?.theme || '#0284c7' }}
        >
          {pageMeta?.iconSvg || <WebIcon name="sparkles" className="w-5 h-5" />}
        </div>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-black font-play text-slate-900 dark:text-white leading-tight">
            {pageMeta?.fullName || 'Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân'}
          </h1>
        </div>
      </div>
    </div>
  );
};
