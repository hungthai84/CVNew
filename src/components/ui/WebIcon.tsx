'use client';

import React from 'react';

export interface WebIconProps {
  name: string;
  className?: string;
}

/**
 * Hệ thống Lucide Icons Vector SVG chuẩn đồng bộ toàn trang
 * Thay thế hoàn toàn các biểu tượng Emoji/Windows mặc định của hệ điều hành
 * Chuẩn hóa strokeWidth="1.85", viewBox="0 0 24 24", round caps/joins theo Design System Glass UI
 */
export const WebIcon: React.FC<WebIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const normalized = (name || '').trim().toLowerCase();

  switch (normalized) {
    case 'home':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
        </svg>
      );

    case 'menu':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <line strokeLinecap="round" strokeLinejoin="round" x1="4" x2="20" y1="12" y2="12" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="4" x2="20" y1="6" y2="6" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="4" x2="20" y1="18" y2="18" />
        </svg>
      );

    case 'layoutdashboard':
    case 'layout-dashboard':
    case 'panelstopleft':
    case 'panels-top-left':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="7" height="9" x="3" y="3" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect width="7" height="5" x="14" y="3" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect width="7" height="9" x="14" y="12" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect width="7" height="5" x="3" y="16" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'briefcase':
    case 'briefcasebusiness':
    case 'briefcase-business':
    case 'corp':
    case 'hrm':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 13a18.15 18.15 0 0 1-20 0" />
          <rect width="20" height="14" x="2" y="6" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'chart':
    case 'chartnoaxescombined':
    case 'chart-no-axes-combined':
    case 'erp':
    case 'analytics':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 14v7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 10v11" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v7" />
        </svg>
      );

    case 'trend-up':
    case 'trending':
    case 'upgrade':
    case 'bi':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <polyline strokeLinecap="round" strokeLinejoin="round" points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline strokeLinecap="round" strokeLinejoin="round" points="16 7 22 7 22 13" />
        </svg>
      );

    case 'trend-down':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <polyline strokeLinecap="round" strokeLinejoin="round" points="22 17 13.5 8.5 8.5 13.5 2 7" />
          <polyline strokeLinecap="round" strokeLinejoin="round" points="16 17 22 17 22 11" />
        </svg>
      );

    case 'globe':
    case 'standard':
    case 'all':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
        </svg>
      );

    case 'graduation':
    case 'lms':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      );

    case 'book':
    case 'self':
    case 'books':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
        </svg>
      );

    case 'calendar':
    case 'milestones':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
        </svg>
      );

    case 'clock':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polyline strokeLinecap="round" strokeLinejoin="round" points="12 6 12 12 16 14" />
        </svg>
      );

    case 'trophy':
    case 'award':
    case 'awards':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 22h16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );

    case 'play':
      return (
        <svg className={className} fill="currentColor" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      );

    case 'pause':
      return (
        <svg className={className} fill="currentColor" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect width="4" height="16" x="6" y="4" rx="1" />
          <rect width="4" height="16" x="14" y="4" rx="1" />
        </svg>
      );

    case 'users':
    case 'usersround':
    case 'users-round':
    case 'team':
    case 'crm':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 21a8 8 0 0 0-16 0" />
          <circle cx="10" cy="8" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
      );

    case 'user':
    case 'userround':
    case 'user-round':
    case 'contactround':
    case 'contact-round':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      );

    case 'sparkles':
    case 'wandsparkles':
    case 'wand-sparkles':
    case 'star':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
        </svg>
      );

    case 'camera':
    case 'image':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );

    case 'video':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
          <rect width="14" height="12" x="2" y="6" rx="2" />
        </svg>
      );

    case 'target':
    case 'okr':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );

    case 'folder':
    case 'projects':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      );

    case 'shield':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
        </svg>
      );

    case 'rocket':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );

    case 'phone':
    case 'csc':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );

    case 'mail':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );

    case 'messagecircle':
    case 'message-circle':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      );

    case 'bell':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      );

    case 'bot':
    case 'robot':
    case 'ai':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 14h2M20 14h2M15 13v2M9 13v2" />
        </svg>
      );

    case 'brain':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        </svg>
      );

    case 'bolt':
    case 'zap':
    case 'bpm':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      );

    case 'compass':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polygon strokeLinecap="round" strokeLinejoin="round" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );

    case 'bookmark':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      );

    case 'bulb':
    case 'lightbulb':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 22h4" />
        </svg>
      );

    case 'building':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
        </svg>
      );

    case 'headset':
    case 'headphones':
    case 'sdp':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 16v2a4 4 0 0 1-4 4h-5" />
        </svg>
      );

    case 'gift':
    case 'clp':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
      );

    case 'card':
    case 'pos':
    case 'coin':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      );

    case 'desktop':
    case 'laptop':
    case 'monitor':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="8" x2="16" y1="21" y2="21" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="12" x2="12" y1="17" y2="21" />
        </svg>
      );

    case 'mobile':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
        </svg>
      );

    case 'cog':
    case 'settings':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case 'wrench':
    case 'tools':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );

    case 'slidershorizontal':
    case 'sliders-horizontal':
    case 'filter':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <line strokeLinecap="round" strokeLinejoin="round" x1="21" x2="14" y1="4" y2="4" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="10" x2="3" y1="4" y2="4" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="21" x2="12" y1="12" y2="12" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="8" x2="3" y1="12" y2="12" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="21" x2="16" y1="20" y2="20" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="12" x2="3" y1="20" y2="20" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="14" x2="14" y1="2" y2="6" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="8" x2="8" y1="10" y2="14" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="16" x2="16" y1="18" y2="22" />
        </svg>
      );

    case 'database':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      );

    case 'search':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3" />
        </svg>
      );

    case 'location':
    case 'pin':
    case 'map-pin':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );

    case 'heart':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );

    case 'handshake':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
        </svg>
      );

    case 'sync':
    case 'refresh':
    case 'loadercircle':
    case 'loader-circle':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 3v5h-5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H3v5" />
        </svg>
      );

    case 'clipboard':
    case 'cert':
    case 'scroll':
    case 'filetext':
    case 'file-text':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
        </svg>
      );

    case 'gem':
    case 'crystal':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 13L2 9Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3 8 9l4 13 4-13-3-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
        </svg>
      );

    case 'sun':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2m-14.07 7.07 1.41-1.41m11.32-11.32 1.41-1.41" />
        </svg>
      );

    case 'moon':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );

    case 'palette':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );

    case 'network':
    case 'mindmap':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" />
        </svg>
      );

    case 'tag':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      );

    case 'hash':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <line strokeLinecap="round" strokeLinejoin="round" x1="4" x2="20" y1="9" y2="9" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="4" x2="20" y1="15" y2="15" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="10" x2="8" y1="3" y2="21" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="16" x2="14" y1="3" y2="21" />
        </svg>
      );

    case 'megaphone':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3 11 18-5v12L3 14v-3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      );

    case 'check':
    case 'circlecheck':
    case 'circle-check':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
        </svg>
      );

    case 'circlealert':
    case 'circle-alert':
    case 'info':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
        </svg>
      );

    case 'x':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
        </svg>
      );

    case 'chevronleft':
    case 'chevron-left':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
        </svg>
      );

    case 'chevronright':
    case 'chevron-right':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
        </svg>
      );

    case 'arrowleft':
    case 'arrow-left':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m12 19-7-7 7-7M19 12H5" />
        </svg>
      );

    case 'arrowright':
    case 'arrow-right':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      );

    case 'plus':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5v14" />
        </svg>
      );

    case 'pencil':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        </svg>
      );

    case 'trash2':
    case 'trash':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
        </svg>
      );

    case 'copy':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      );

    case 'save':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" />
        </svg>
      );

    case 'download':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      );

    case 'upload':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
      );

    case 'maximize2':
    case 'maximize':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <polyline strokeLinecap="round" strokeLinejoin="round" points="15 3 21 3 21 9" />
          <polyline strokeLinecap="round" strokeLinejoin="round" points="9 21 3 21 3 15" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="21" x2="14" y1="3" y2="10" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="3" x2="10" y1="21" y2="14" />
        </svg>
      );

    case 'minimize2':
    case 'minimize':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <polyline strokeLinecap="round" strokeLinejoin="round" points="4 14 10 14 10 20" />
          <polyline strokeLinecap="round" strokeLinejoin="round" points="20 10 14 10 14 4" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="14" x2="21" y1="10" y2="3" />
          <line strokeLinecap="round" strokeLinejoin="round" d="M3 21 10 14" />
        </svg>
      );

    case 'mousepointer2':
    case 'mouse-pointer-2':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
        </svg>
      );

    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.85" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
        </svg>
      );
  }
};
