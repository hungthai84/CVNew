import React from 'react';
import { PageMeta } from '@/types';

export const PAGES: PageMeta[] = [
  {
    id: 0,
    shortTitle: 'Trang Chủ',
    fullName: 'Trang Chủ Hùng Thái - Giới Thiệu, Năng Lực & Thành Tựu',
    theme: '#0284c7',
    bgLight: 'rgba(224, 242, 254, 0.85)',
    bgNormal: 'rgba(224, 242, 254, 0.55)',
    borderColor: 'rgba(56, 189, 248, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 1,
    shortTitle: 'Thư Ngỏ',
    fullName: 'Thư Ngỏ Gửi Quý Đối Tác & Khách Quý',
    theme: '#e11d48',
    bgLight: 'rgba(255, 228, 230, 0.85)',
    bgNormal: 'rgba(255, 228, 230, 0.55)',
    borderColor: 'rgba(244, 63, 94, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    shortTitle: 'Giới Thiệu',
    fullName: 'Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân',
    theme: '#8b5cf6',
    bgLight: 'rgba(243, 232, 255, 0.85)',
    bgNormal: 'rgba(243, 232, 255, 0.55)',
    borderColor: 'rgba(168, 85, 247, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    shortTitle: 'Học Vấn',
    fullName: 'Học Vấn & Chứng Chỉ Chuyên Ngành (14 Khóa Học)',
    theme: '#059669',
    bgLight: 'rgba(209, 250, 229, 0.85)',
    bgNormal: 'rgba(209, 250, 229, 0.55)',
    borderColor: 'rgba(52, 211, 153, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
      </svg>
    ),
  },
  {
    id: 4,
    shortTitle: 'Lĩnh Vực',
    fullName: 'Lĩnh Vực Hoạt Động Chuyên Môn (6 Lĩnh Vực)',
    theme: '#f59e0b',
    bgLight: 'rgba(254, 243, 199, 0.85)',
    bgNormal: 'rgba(254, 243, 199, 0.55)',
    borderColor: 'rgba(251, 191, 36, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 5,
    shortTitle: 'Kinh Nghiệm',
    fullName: 'Kinh Nghiệm Thực Chiến & Cột Mốc Quản Trị (2003 - 2026+)',
    theme: '#4f46e5',
    bgLight: 'rgba(224, 231, 255, 0.85)',
    bgNormal: 'rgba(224, 231, 255, 0.55)',
    borderColor: 'rgba(129, 140, 248, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 6,
    shortTitle: 'Kỹ Năng',
    fullName: 'Bộ Kỹ Năng & Ma Trận SWOT Quản Trị',
    theme: '#0891b2',
    bgLight: 'rgba(207, 250, 254, 0.85)',
    bgNormal: 'rgba(207, 250, 254, 0.55)',
    borderColor: 'rgba(34, 211, 238, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 7,
    shortTitle: 'Dự Án',
    fullName: 'Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm',
    theme: '#9333ea',
    bgLight: 'rgba(245, 232, 255, 0.85)',
    bgNormal: 'rgba(245, 232, 255, 0.55)',
    borderColor: 'rgba(192, 132, 252, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 8,
    shortTitle: 'Hệ Thống',
    fullName: 'Cổng Bento Hệ Thống CSKH (12 Hệ Thống C-Level)',
    theme: '#ea580c',
    bgLight: 'rgba(255, 237, 213, 0.85)',
    bgNormal: 'rgba(255, 237, 213, 0.55)',
    borderColor: 'rgba(251, 146, 60, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 9,
    shortTitle: 'Phỏng Vấn',
    fullName: 'Đối Thoại Mô Phỏng AI & Q&A Tuyển Dụng',
    theme: '#ec4899',
    bgLight: 'rgba(253, 242, 248, 0.85)',
    bgNormal: 'rgba(253, 242, 248, 0.55)',
    borderColor: 'rgba(244, 114, 182, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 10,
    shortTitle: 'Tử Vi',
    fullName: 'Bản Đồ Tử Vi, Bát Trạch & Phong Thủy Quản Trị',
    theme: '#c026d3',
    bgLight: 'rgba(250, 232, 255, 0.85)',
    bgNormal: 'rgba(250, 232, 255, 0.55)',
    borderColor: 'rgba(232, 121, 249, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    id: 11,
    shortTitle: 'Kỷ Niệm',
    fullName: 'Khoảnh Khắc Hành Trình & Kỷ Niệm Đáng Nhớ',
    theme: '#16a34a',
    bgLight: 'rgba(220, 252, 231, 0.85)',
    bgNormal: 'rgba(220, 252, 231, 0.55)',
    borderColor: 'rgba(74, 222, 128, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 12,
    shortTitle: 'Liên Hệ',
    fullName: 'Kênh Kết Nối & Hợp Tác Với Hùng Thái',
    theme: '#0d9488',
    bgLight: 'rgba(204, 251, 241, 0.85)',
    bgNormal: 'rgba(204, 251, 241, 0.55)',
    borderColor: 'rgba(45, 212, 191, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: 13,
    shortTitle: 'Hình Nền',
    fullName: 'Tùy Chỉnh Hình Nền & Giao Diện',
    theme: '#d946ef',
    bgLight: 'rgba(253, 228, 255, 0.85)',
    bgNormal: 'rgba(253, 228, 255, 0.55)',
    borderColor: 'rgba(217, 70, 239, 0.7)',
    iconSvg: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];
