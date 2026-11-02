'use client';

import React, { useEffect } from 'react';

// Danh sách các tài nguyên hình ảnh hero quan trọng nhất của các trang
const CRITICAL_PAGE_ASSETS = [
  '/images/about-hero.jpg',
  '/images/education/hero-banner.png',
  '/images/domains/hero-banner-extended.png',
  'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042012/K%E1%BB%B7_n%C4%83ng.png',
  'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042018/Kinh_nghi%E1%BB%87m.png',
];

export const SmartResourcePreloader: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefetchAssets = () => {
      // 1. Tải lót các hình ảnh hero trang khi trình duyệt rảnh rỗi (idle)
      CRITICAL_PAGE_ASSETS.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // 2. Lắng nghe hover trên các nút chuyển trang để nạp trước (0ms latency transition)
      const handleNavHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const navItem = target?.closest('[data-page-index], [data-target-page]');
        if (navItem) {
          const pageIdx = navItem.getAttribute('data-page-index') || navItem.getAttribute('data-target-page');
          if (pageIdx !== null) {
            // Đánh dấu để trình duyệt ưu tiên giải mã trang tiếp theo
            window.dispatchEvent(new CustomEvent('hungthai:prefetch-page', { detail: { pageIndex: Number(pageIdx) } }));
          }
        }
      };

      document.addEventListener('mouseover', handleNavHover, { passive: true });
      return () => {
        document.removeEventListener('mouseover', handleNavHover);
      };
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(prefetchAssets, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(prefetchAssets, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};
