'use client';

import React, { useState, useRef, useEffect } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { Modal } from '@/components/ui/Modal';
import { CAREER_MILESTONES_DATA, CareerMilestoneItem } from '@/data/letterData';
import { getSavedMutedPref, saveMutedPref, AUDIO_PREF_EVENT } from '@/utils/audioPreference';

const LETTER_VIDEO_URL =
  'https://res.cloudinary.com/q5tpzaxk/video/upload/v1793040322/transition-studio-take_24.mp4';

// Chữ ký điện tử Nguyễn Hùng Thái đúng chuẩn thiết kế
const DashboardSignatureSvg = () => (
  <svg
    className="w-24 sm:w-28 h-7 sm:h-8 text-blue-600 dark:text-cyan-400 opacity-95 select-none pointer-events-none shrink-0"
    viewBox="0 0 220 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
    <path d="M 38 42 L 185 34" strokeWidth="2.2" />
    <path d="M 82 10 L 82 65" strokeWidth="3" />
  </svg>
);

export interface TimelineStageCardData {
  id: string;
  milestoneId: string;
  year: string;
  periodLabel: string;
  company: string;
  role: string;
  staffCount: string;
  staffLabel: string;
  logo: string;
  yearPillBg: string;
  companyColor: string;
  activeBorder: string;
  bullets: {
    icon: string;
    iconColor: string;
    text: string;
  }[];
  summaryTitle: string;
  summaryText: string;
  metrics: {
    icon: string;
    value: string;
    label: string;
  }[];
  skills: {
    label: string;
    pct: number;
    pctText: string;
    barGradient: string;
    icon: string;
    iconBg: string;
  }[];
}

// Dữ liệu 8 cột mốc trên thanh Hành trình sự nghiệp khớp 100% với hình tham khảo & dữ liệu gốc
export const DASHBOARD_TIMELINE_STAGES: TimelineStageCardData[] = [
  {
    id: 'stage-2002',
    milestoneId: 'card-2002',
    year: '2002',
    periodLabel: '2002 – 2007',
    company: 'MobiFone',
    role: 'Chuyên viên CSKH',
    staffCount: '12',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png',
    yearPillBg: 'bg-emerald-500',
    companyColor: 'text-emerald-700 dark:text-emerald-400',
    activeBorder: 'ring-2 ring-emerald-400/80 border-emerald-400',
    bullets: [
      { icon: 'headphones', iconColor: 'text-emerald-600 bg-emerald-100', text: 'Tổng đài CSKH' },
      { icon: 'layers', iconColor: 'text-teal-600 bg-teal-100', text: 'Quy trình dịch vụ' },
      { icon: 'shield', iconColor: 'text-emerald-600 bg-emerald-100', text: 'Xử lý sự cố' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2002 – 2007',
    summaryText:
      'Bắt đầu sự nghiệp tại MobiFone, tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông. Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm.',
    metrics: [
      { icon: 'users', value: '12', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '3+', label: 'Hệ thống dịch vụ' },
      { icon: 'star', value: '5 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 95, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 92, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 75, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 90, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2007',
    milestoneId: 'card-2007',
    year: '2007',
    periodLabel: '2007 – 2011',
    company: 'Viễn Liên V247',
    role: 'Giám sát CSKH',
    staffCount: '30',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/QvtbdnfP/V247.png',
    yearPillBg: 'bg-blue-600',
    companyColor: 'text-blue-700 dark:text-blue-400',
    activeBorder: 'ring-2 ring-blue-400/80 border-blue-400',
    bullets: [
      { icon: 'monitor', iconColor: 'text-blue-600 bg-blue-100', text: 'Giám sát vận hành' },
      { icon: 'shield', iconColor: 'text-sky-600 bg-sky-100', text: 'Quản lý chất lượng' },
      { icon: 'settings', iconColor: 'text-indigo-600 bg-indigo-100', text: 'Tối ưu quy trình' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2007 – 2011',
    summaryText:
      'Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng, tích lũy kinh nghiệm quản lý quy mô lớn và xây dựng bộ chỉ số đánh giá chất lượng.',
    metrics: [
      { icon: 'users', value: '30', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '24/7', label: 'Trung tâm vận hành' },
      { icon: 'star', value: '4 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 96, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 88, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 78, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 85, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2011',
    milestoneId: 'card-2011',
    year: '2011',
    periodLabel: '2011 – 2013',
    company: 'LBC – HTV Cable',
    role: 'Trưởng phòng CSKH',
    staffCount: '50',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/R4YXWyzF/LBC.png',
    yearPillBg: 'bg-purple-600',
    companyColor: 'text-purple-700 dark:text-purple-400',
    activeBorder: 'ring-2 ring-purple-400/80 border-purple-400',
    bullets: [
      { icon: 'chart', iconColor: 'text-purple-600 bg-purple-100', text: 'Xây dựng quy trình' },
      { icon: 'users', iconColor: 'text-fuchsia-600 bg-fuchsia-100', text: 'Phát triển đội ngũ' },
      { icon: 'sparkles', iconColor: 'text-violet-600 bg-violet-100', text: 'Thiết lập KPI/CSAT' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2011 – 2013',
    summaryText:
      'Dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng tại LBC – Truyền hình Cáp HTV. Tôi trực tiếp điều hành hoạt động của phòng ban, chuẩn hóa quy trình, phát triển đội ngũ và thiết lập hệ thống KPI toàn diện.',
    metrics: [
      { icon: 'users', value: '50', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '5+', label: 'Hệ thống KPI/SLA' },
      { icon: 'star', value: '2 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 98, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 85, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 75, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 88, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2013',
    milestoneId: 'card-2013',
    year: '2013',
    periodLabel: '2013 – 2016',
    company: 'Garena (Vietnam eSport)',
    role: 'Head of Customer Support',
    staffCount: '129',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/h1Md65yV/Garena.png',
    yearPillBg: 'bg-rose-600',
    companyColor: 'text-rose-700 dark:text-rose-400',
    activeBorder: 'ring-2 ring-rose-400/90 border-rose-400 bg-rose-50/40 dark:bg-rose-950/25',
    bullets: [
      { icon: 'gamepad', iconColor: 'text-rose-600 bg-rose-100', text: 'Vận hành CSKH game' },
      { icon: 'users', iconColor: 'text-red-600 bg-red-100', text: 'Đội ngũ hỗ trợ người dùng' },
      { icon: 'rocket', iconColor: 'text-orange-600 bg-orange-100', text: 'Shopee, AirPay, Gcafe, Liên Quân' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2013 – 2016',
    summaryText:
      'Gia nhập Garena, tôi quản lý hoạt động CSKH game trực tuyến, đồng thời tham gia vận hành Shopee, AirPay, Gcafe và Liên Quân Mobile. Giai đoạn này giúp tôi tích lũy nhiều kinh nghiệm quản lý đội ngũ quy mô lớn, xây dựng quy trình vận hành và phát triển dịch vụ khách hàng trong môi trường tăng trưởng nhanh.',
    metrics: [
      { icon: 'users', value: '129', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '4+', label: 'Sản phẩm / Dịch vụ' },
      { icon: 'star', value: '3 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 100, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 80, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 70, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 80, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2015',
    milestoneId: 'card-2013',
    year: '2015',
    periodLabel: '2015 – 2016',
    company: 'Shopee / AirPay',
    role: 'CS & Operations Lead',
    staffCount: '70',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/h1Md65yV/Garena.png',
    yearPillBg: 'bg-amber-500',
    companyColor: 'text-amber-700 dark:text-amber-400',
    activeBorder: 'ring-2 ring-amber-400/80 border-amber-400',
    bullets: [
      { icon: 'shopping-bag', iconColor: 'text-amber-600 bg-amber-100', text: 'Thương mại điện tử' },
      { icon: 'card', iconColor: 'text-orange-600 bg-orange-100', text: 'Ví điện tử' },
      { icon: 'shield', iconColor: 'text-amber-600 bg-amber-100', text: 'Chống gian lận' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2015 – 2016',
    summaryText:
      'Tham gia vào giai đoạn phát triển ban đầu của Shopee và AirPay giúp tôi tiếp cận tư duy quản trị thương mại điện tử và ví điện tử hiện đại, từ hành trình khách hàng, trải nghiệm đa kênh, vận hành quy mô lớn đến ứng dụng dữ liệu và chống gian lận.',
    metrics: [
      { icon: 'users', value: '70', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '2+', label: 'Nền tảng TMĐT & Ví' },
      { icon: 'star', value: '2 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 100, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 85, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 80, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 88, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2016',
    milestoneId: 'card-2016',
    year: '2016',
    periodLabel: '2016 – 2018',
    company: 'Prudential',
    role: 'Quality & Project Manager',
    staffCount: '45',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/XfpQphWF/Prudential.png',
    yearPillBg: 'bg-teal-600',
    companyColor: 'text-teal-700 dark:text-teal-400',
    activeBorder: 'ring-2 ring-teal-400/80 border-teal-400',
    bullets: [
      { icon: 'briefcase', iconColor: 'text-teal-600 bg-teal-100', text: 'Quản lý dự án' },
      { icon: 'shield', iconColor: 'text-emerald-600 bg-emerald-100', text: 'Quản lý rủi ro' },
      { icon: 'heart', iconColor: 'text-teal-600 bg-teal-100', text: 'Tư vấn CX' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2016 – 2018',
    summaryText:
      'Tại Prudential Việt Nam, tôi làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Tôi tập trung quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững qua từng điểm chạm.',
    metrics: [
      { icon: 'users', value: '45', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '98%', label: 'Chỉ số chất lượng QA' },
      { icon: 'star', value: '2 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 100, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 90, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 75, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 92, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2018',
    milestoneId: 'card-2018',
    year: '2018',
    periodLabel: '2018 – 2023',
    company: 'MoMo',
    role: 'CSKH Manager',
    staffCount: '70',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/k2QtrgTw/Momo.png',
    yearPillBg: 'bg-purple-600',
    companyColor: 'text-purple-700 dark:text-purple-400',
    activeBorder: 'ring-2 ring-purple-400/80 border-purple-400',
    bullets: [
      { icon: 'card', iconColor: 'text-purple-600 bg-purple-100', text: 'CSKH FinTech' },
      { icon: 'cpu', iconColor: 'text-fuchsia-600 bg-fuchsia-100', text: 'Vận hành hệ thống' },
      { icon: 'chart', iconColor: 'text-violet-600 bg-violet-100', text: 'Dữ liệu khách hàng' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2018 – 2023',
    summaryText:
      'Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số (FinTech). Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ AI/CRM vào quản trị dịch vụ và cải thiện trải nghiệm người dùng trên nền tảng số.',
    metrics: [
      { icon: 'users', value: '70', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '85%', label: 'Tự động hóa CRM/AI' },
      { icon: 'star', value: '5 năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 100, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 92, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 85, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 94, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
  {
    id: 'stage-2023',
    milestoneId: 'card-2023',
    year: '2023',
    periodLabel: '2023 – 2024+',
    company: 'Finviet / Ví ECO',
    role: 'Trưởng Phòng Dịch vụ KH',
    staffCount: '17',
    staffLabel: 'Nhân sự',
    logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png',
    yearPillBg: 'bg-blue-600',
    companyColor: 'text-blue-700 dark:text-blue-400',
    activeBorder: 'ring-2 ring-blue-400/80 border-blue-400',
    bullets: [
      { icon: 'card', iconColor: 'text-blue-600 bg-blue-100', text: 'FinTech / Ví điện tử' },
      { icon: 'star', iconColor: 'text-indigo-600 bg-indigo-100', text: 'Thiết lập hệ thống CSKH' },
      { icon: 'settings', iconColor: 'text-sky-600 bg-sky-100', text: 'Tối ưu vận hành' },
    ],
    summaryTitle: 'Tổng quan giai đoạn 2023 – 2024+',
    summaryText:
      'Tại Finviet / Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính số, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này hoàn thiện tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại kết hợp quy trình, công nghệ và trải nghiệm.',
    metrics: [
      { icon: 'users', value: '17', label: 'Nhân sự quản lý' },
      { icon: 'layers', value: '98%', label: 'Mức độ hài lòng CSAT' },
      { icon: 'star', value: '2+ năm', label: 'Giai đoạn phát triển' },
    ],
    skills: [
      { label: 'Chuẩn hóa quy trình', pct: 100, pctText: 'text-emerald-600', barGradient: 'from-emerald-400 to-teal-500', icon: 'settings', iconBg: 'bg-blue-100 text-blue-600' },
      { label: 'Phản hồi & Hỗ trợ', pct: 95, pctText: 'text-teal-600', barGradient: 'from-sky-400 to-teal-500', icon: 'chat', iconBg: 'bg-sky-100 text-sky-600' },
      { label: 'Hỗ trợ sự kiện lớn', pct: 85, pctText: 'text-purple-500', barGradient: 'from-indigo-500 to-purple-500', icon: 'chart', iconBg: 'bg-purple-100 text-purple-600' },
      { label: 'Hoàn thành dự án', pct: 96, pctText: 'text-amber-600', barGradient: 'from-amber-400 to-orange-500', icon: 'flag', iconBg: 'bg-amber-100 text-amber-600' },
    ],
  },
];

export interface LetterBentoDashboardProps {
  currentTheme?: string;
  companyName?: string;
  companyDisplay?: string;
  onOpenCompanyModal?: () => void;
  onSwitchToSlides?: () => void;
  onSwitchToOnePage?: () => void;
  onSelectMilestoneModal?: (item: CareerMilestoneItem) => void;
}

export const LetterBentoDashboard: React.FC<LetterBentoDashboardProps> = ({
  companyName = '',
  companyDisplay = 'Quý Công ty',
  onOpenCompanyModal,
  onSwitchToSlides,
  onSelectMilestoneModal,
}) => {
  // Mặc định chọn mốc 2013 (Garena 2013 - 2016) giống 100% hình tham khảo
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-2013');
  const [detailPopupModal, setDetailPopupModal] = useState<'values' | 'skills' | 'stage' | null>(null);

  // Video state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => getSavedMutedPref(true));

  useEffect(() => {
    const handleAudioPref = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.muted === 'boolean') {
        setIsMuted(customEvent.detail.muted);
        if (videoRef.current) {
          videoRef.current.muted = customEvent.detail.muted;
        }
      }
    };
    window.addEventListener(AUDIO_PREF_EVENT, handleAudioPref);
    return () => window.removeEventListener(AUDIO_PREF_EVENT, handleAudioPref);
  }, []);

  const togglePlayVideo = () => {
    SoundEngine.playTap();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMuteVideo = () => {
    SoundEngine.playTap();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    saveMutedPref(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const activeStage =
    DASHBOARD_TIMELINE_STAGES.find((s) => s.id === selectedStageId) || DASHBOARD_TIMELINE_STAGES[3];

  const handleCycleStage = (dir: 'prev' | 'next') => {
    SoundEngine.playTap();
    const idx = DASHBOARD_TIMELINE_STAGES.findIndex((s) => s.id === selectedStageId);
    if (dir === 'prev') {
      const nextIdx = idx > 0 ? idx - 1 : DASHBOARD_TIMELINE_STAGES.length - 1;
      setSelectedStageId(DASHBOARD_TIMELINE_STAGES[nextIdx].id);
    } else {
      const nextIdx = idx < DASHBOARD_TIMELINE_STAGES.length - 1 ? idx + 1 : 0;
      setSelectedStageId(DASHBOARD_TIMELINE_STAGES[nextIdx].id);
    }
  };

  const handleOpenMilestoneDetail = (stage: TimelineStageCardData) => {
    SoundEngine.playTap();
    const found = CAREER_MILESTONES_DATA.find((m) => m.id === stage.milestoneId);
    if (found && onSelectMilestoneModal) {
      onSelectMilestoneModal(found);
    } else {
      setSelectedStageId(stage.id);
      setDetailPopupModal('stage');
    }
  };

  const cardSurfaceClass =
    'bg-white/75 dark:bg-slate-900/85 backdrop-blur-[20px] border border-white/88 dark:border-white/10 shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-none rounded-[20px]';

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto lg:overflow-y-auto glass-scrollbar p-2 sm:p-3 flex flex-col justify-between gap-2.5 select-none font-play text-slate-800 dark:text-slate-100">
      {/* ===================================================================== */}
      {/* HÀNG 1 (ROW 1): VIDEO THUYẾT MINH (4) + THÔNG ĐIỆP HỢP TÁC (4) + 3 NỀN TẢNG & TRIẾT LÝ (4) */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch shrink-0">
        {/* ----------------------------------------------------------------- */}
        {/* CỘT 1 (4 COLS): KHUNG VIDEO THUYẾT MINH                           */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`lg:col-span-4 ${cardSurfaceClass} p-1.5 relative overflow-hidden flex flex-col justify-between min-h-[235px] sm:min-h-[250px] group/vid`}
        >
          <div className="relative w-full h-full flex-1 rounded-[16px] overflow-hidden bg-slate-900 flex flex-col justify-between">
            <video
              ref={videoRef}
              src={LETTER_VIDEO_URL}
              preload="metadata"
              playsInline
              loop
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />

            {/* Lớp phủ trong suốt tinh tế để nổi bật thanh điều khiển */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/35 z-10 pointer-events-none" />

            {/* Thanh trên cùng: "Thuyết minh thu ngắn" + Sóng âm + "Scena AI" */}
            <div className="relative z-20 p-2.5 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/55 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-xs">
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
                  <WebIcon name="play" className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>Thuyết minh thu ngắn</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 h-3 px-1">
                  <span className={`w-0.5 h-2 bg-cyan-300 rounded-full ${isPlaying ? 'animate-pulse' : 'opacity-70'}`} />
                  <span className={`w-0.5 h-3 bg-cyan-400 rounded-full ${isPlaying ? 'animate-pulse' : 'opacity-90'}`} />
                  <span className={`w-0.5 h-1.5 bg-cyan-300 rounded-full ${isPlaying ? 'animate-pulse' : 'opacity-70'}`} />
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-bold">
                  Scena AI
                </span>
              </div>
            </div>

            {/* Nút Play tròn chính giữa + 2 nút mũi tên trái/phải */}
            <div className="relative z-20 flex-1 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() => handleCycleStage('prev')}
                className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition hover:scale-110 cursor-pointer"
                title="Giai đoạn trước"
              >
                <WebIcon name="chevron-left" className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={togglePlayVideo}
                className="w-11 h-11 rounded-full bg-slate-900/65 hover:bg-cyan-600/90 text-white border-2 border-white/70 flex items-center justify-center shadow-xl backdrop-blur-md transition hover:scale-105 active:scale-95 cursor-pointer"
                title={isPlaying ? 'Tạm dừng video' : 'Phát video thuyết minh'}
              >
                <WebIcon name={isPlaying ? 'pause' : 'play'} className="w-4.5 h-4.5 fill-current ml-0.5" />
              </button>

              <button
                type="button"
                onClick={() => handleCycleStage('next')}
                className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition hover:scale-110 cursor-pointer"
                title="Giai đoạn kế tiếp"
              >
                <WebIcon name="chevron-right" className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Thanh điều khiển dưới cùng: [Mở loa] [Phát] ... [Xem giới thiệu] */}
            <div className="relative z-20 p-2.5 flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMuteVideo}
                  className="px-2.5 py-1 rounded-full bg-slate-900/75 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md text-[10.5px] font-bold flex items-center gap-1.5 cursor-pointer transition"
                >
                  <WebIcon name={isMuted ? 'volume-x' : 'volume-2'} className="w-3 h-3 text-cyan-300" />
                  <span>{isMuted ? 'Mở loa' : 'Đang bật'}</span>
                </button>

                <button
                  type="button"
                  onClick={togglePlayVideo}
                  className="px-2.5 py-1 rounded-full bg-slate-900/75 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md text-[10.5px] font-bold flex items-center gap-1.5 cursor-pointer transition"
                >
                  <WebIcon name={isPlaying ? 'pause' : 'play'} className="w-3 h-3 text-white" />
                  <span>{isPlaying ? 'Tạm dừng' : 'Phát'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  if (onSwitchToSlides) {
                    onSwitchToSlides();
                  } else {
                    togglePlayVideo();
                  }
                }}
                className="px-2.5 py-1 rounded-full bg-slate-900/75 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md text-[10.5px] font-bold flex items-center gap-1.5 cursor-pointer transition"
              >
                <WebIcon name="sync" className="w-3 h-3 text-cyan-300" />
                <span>Xem giới thiệu</span>
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CỘT 2 (4 COLS): KHUNG THÔNG ĐIỆP HỢP TÁC                          */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`lg:col-span-4 ${cardSurfaceClass} p-3.5 sm:p-4 flex flex-col justify-between gap-2 text-left`}
        >
          {/* Hàng Pill trên cùng */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60 text-[10.5px] font-bold">
              <WebIcon name="book" className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Thông điệp hợp tác</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  if (onOpenCompanyModal) onOpenCompanyModal();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100/90 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 text-[10px] font-bold cursor-pointer transition"
                title="Cá nhân hóa tên Quý Công ty"
              >
                <WebIcon name="users" className="w-2.5 h-2.5 text-blue-600 dark:text-cyan-400" />
                <span>{companyName ? `+ ${companyName}` : '+ Tên Công ty'}</span>
              </button>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 text-[10px] font-bold">
                Nguyễn Hùng Thái
              </span>
            </div>
          </div>

          {/* Tiêu đề & Nội dung Thư Ngỏ */}
          <div className="space-y-1.5">
            <h1 className="text-lg sm:text-xl font-black text-[#0F2942] dark:text-white tracking-tight leading-snug">
              Kính chào {companyDisplay}!
            </h1>

            <p className="text-[11.5px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Tôi là <strong className="font-bold text-slate-900 dark:text-white">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng{' '}
              <strong className="font-bold text-teal-700 dark:text-cyan-300 underline decoration-teal-400/70 underline-offset-2">
                với hơn 22 năm kinh nghiệm
              </strong>{' '}
              trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng.
            </p>

            <p className="text-[11.5px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Tôi mong muốn được đồng hành cùng <strong className="font-bold text-slate-900 dark:text-white">{companyDisplay}</strong> trong việc xây dựng một hệ{' '}
              <strong className="font-bold text-slate-900 dark:text-white">thống chăm sóc khách hàng hiện đại</strong>, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra{' '}
              <strong className="font-bold text-teal-700 dark:text-cyan-300 underline decoration-teal-400/70 underline-offset-2">
                giá trị phát triển bền vững
              </strong>
              .
            </p>
          </div>

          {/* Hộp danh ngôn trung tâm */}
          <div className="px-3 py-2 rounded-xl bg-sky-50/85 dark:bg-sky-950/40 border border-sky-200/70 dark:border-sky-800/50 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-500 flex items-center justify-center shrink-0">
              <WebIcon name="sparkles" className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] sm:text-[11.5px] font-bold italic text-[#0F2942] dark:text-cyan-200 leading-snug">
              “Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.”
            </p>
          </div>

          {/* Chân chữ ký */}
          <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-200/60 dark:border-white/10">
            <span className="text-[10.5px] font-medium text-slate-600 dark:text-slate-300 leading-tight">
              Xin trân trọng cảm ơn {companyDisplay} đã dành thời gian lắng nghe!
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <DashboardSignatureSvg />
              <div className="text-right">
                <span className="text-[11px] font-black text-[#0F2942] dark:text-white block leading-tight">
                  Nguyễn Hùng Thái
                </span>
                <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  TRƯỞNG PHÒNG CHĂM SÓC KHÁCH HÀNG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CỘT 3 (4 COLS): 3 NỀN TẢNG CỐT LÕI + TRIẾT LÝ QUẢN TRỊ            */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
          {/* Sub-Card 3A: 3 Nền tảng cốt lõi */}
          <div className={`${cardSurfaceClass} p-3 flex flex-col justify-between gap-2 text-left`}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                <WebIcon name="settings" className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-[#0F2942] dark:text-white">
                3 Nền tảng cốt lõi
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Nền tảng 1: Quy trình nền tảng */}
              <div className="p-2 rounded-xl bg-gradient-to-b from-blue-50/90 to-white/95 dark:from-blue-950/40 dark:to-slate-900 border border-blue-200/70 dark:border-blue-800/50 flex flex-col items-center text-center shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 text-white flex items-center justify-center shadow-xs mb-1.5">
                  <WebIcon name="settings" className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] sm:text-[11px] font-black text-[#0F2942] dark:text-white leading-tight">
                  Quy trình nền tảng
                </span>
                <span className="text-[9px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                  Chuẩn hóa KPI &amp; Chất lượng dịch vụ
                </span>
              </div>

              {/* Nền tảng 2: Con người giá trị */}
              <div className="p-2 rounded-xl bg-gradient-to-b from-pink-50/90 to-white/95 dark:from-pink-950/40 dark:to-slate-900 border border-pink-200/70 dark:border-pink-800/50 flex flex-col items-center text-center shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-xs mb-1.5">
                  <WebIcon name="users" className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] sm:text-[11px] font-black text-[#0F2942] dark:text-white leading-tight">
                  Con người giá trị
                </span>
                <span className="text-[9px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                  Lắng nghe, thấu hiểu &amp; đồng cảm
                </span>
              </div>

              {/* Nền tảng 3: Công nghệ đòn bẩy */}
              <div className="p-2 rounded-xl bg-gradient-to-b from-emerald-50/90 to-white/95 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200/70 dark:border-emerald-800/50 flex flex-col items-center text-center shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-xs mb-1.5">
                  <WebIcon name="cpu" className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] sm:text-[11px] font-black text-[#0F2942] dark:text-white leading-tight">
                  Công nghệ đòn bẩy
                </span>
                <span className="text-[9px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                  CRM, Dashboard &amp; AI Chatbot
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Card 3B: Triết lý quản trị */}
          <div className={`${cardSurfaceClass} p-3 flex-1 flex flex-col justify-between gap-1.5 text-left`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <WebIcon name="sparkles" className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <h3 className="text-xs sm:text-[13px] font-black text-[#0F2942] dark:text-white">
                  Triết lý quản trị
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/50 text-[9.5px] font-bold flex items-center gap-1">
                <WebIcon name="sync" className="w-2.5 h-2.5" />
                <span>Ba nguyên tắc cốt lõi</span>
              </span>
            </div>

            <p className="text-[10.5px] sm:text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Tôi tin rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững thông qua trải nghiệm khách hàng.
            </p>

            {/* 3 Pill Nguyên tắc 01 - 02 - 03 */}
            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              <div className="p-1.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/35 border border-blue-200/70 dark:border-blue-800/40 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                  01
                </span>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-black text-[#0F2942] dark:text-white block truncate leading-tight">
                    Quy trình tạo nền tảng
                  </span>
                  <span className="text-[8.5px] text-slate-500 dark:text-slate-400 block truncate">
                    Chuẩn hóa &amp; đo lường
                  </span>
                </div>
              </div>

              <div className="p-1.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/35 border border-purple-200/70 dark:border-purple-800/40 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                  02
                </span>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-black text-[#0F2942] dark:text-white block truncate leading-tight">
                    Con người tạo giá trị
                  </span>
                  <span className="text-[8.5px] text-slate-500 dark:text-slate-400 block truncate">
                    Đào tạo &amp; đồng cảm
                  </span>
                </div>
              </div>

              <div className="p-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/35 border border-emerald-200/70 dark:border-emerald-800/40 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                  03
                </span>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-black text-[#0F2942] dark:text-white block truncate leading-tight">
                    Công nghệ tạo đòn bẩy
                  </span>
                  <span className="text-[8.5px] text-slate-500 dark:text-slate-400 block truncate">
                    Tự động hóa &amp; dữ liệu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* HÀNG 2 (ROW 2): HÀNH TRÌNH SỰ NGHIỆP (8 THẺ TIMELINE NGANG)          */}
      {/* ===================================================================== */}
      <div className={`${cardSurfaceClass} p-3 sm:p-3.5 flex flex-col justify-between gap-2.5 shrink-0`}>
        {/* Header Hành trình sự nghiệp */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
              <WebIcon name="rocket" className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#0F2942] dark:text-white">
              Hành trình sự nghiệp
            </h2>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              <strong className="text-slate-700 dark:text-slate-200">22+ năm kinh nghiệm</strong> trong lĩnh vực Dịch vụ Khách hàng
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                if (onSwitchToSlides) onSwitchToSlides();
              }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-[10.5px] font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <WebIcon name="target" className="w-3 h-3" />
              <span>Xem lộ trình Timeline</span>
            </button>

            <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[10.5px] font-semibold flex items-center gap-1.5">
              <WebIcon name="calendar" className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>
                Từ năm <strong>2002</strong> đến năm <strong>2024</strong>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCycleStage('prev')}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer transition"
                title="Cột mốc trước"
              >
                <WebIcon name="chevron-left" className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => handleCycleStage('next')}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer transition"
                title="Cột mốc kế tiếp"
              >
                <WebIcon name="chevron-right" className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Thẻ Cột Mốc Sự Nghiệp Ngang */}
        <div className="relative pt-2">
          {/* Đường kẻ ngang nối các mốc năm trên Desktop */}
          <div className="hidden lg:block absolute left-8 right-8 top-[14px] h-[2px] bg-gradient-to-r from-emerald-300 via-rose-300 to-blue-300 dark:from-emerald-800 dark:via-rose-800 dark:to-blue-800 z-0 pointer-events-none" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 relative z-10">
            {DASHBOARD_TIMELINE_STAGES.map((stage) => {
              const isSelected = stage.id === selectedStageId;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    SoundEngine.playTap();
                    setSelectedStageId(stage.id);
                  }}
                  className="flex flex-col items-center cursor-pointer group/stage"
                >
                  {/* Pill Năm trên đỉnh */}
                  <div
                    className={`px-3 py-0.5 rounded-full ${stage.yearPillBg} text-white text-[10.5px] font-black shadow-xs mb-1.5 transition-transform group-hover/stage:scale-105`}
                  >
                    {stage.year}
                  </div>

                  {/* Thân Card Cột Mốc */}
                  <div
                    className={`w-full flex-1 rounded-2xl p-2.5 bg-white/95 dark:bg-slate-900/90 border transition-all duration-200 flex flex-col justify-between gap-2 text-left shadow-2xs hover:shadow-md ${
                      isSelected
                        ? stage.activeBorder
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-blue-300'
                    }`}
                  >
                    {/* Header Logo + Tên công ty + Chức danh + Nhân sự */}
                    <div className="flex items-start gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        <img
                          src={stage.logo}
                          alt={stage.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`text-[10.5px] font-black leading-tight truncate ${stage.companyColor}`}
                        >
                          {stage.company}
                        </h4>
                        <span className="text-[9px] text-slate-600 dark:text-slate-300 font-semibold block truncate leading-tight mt-0.5">
                          {stage.role}
                        </span>
                        <span className="text-[8.5px] text-slate-500 dark:text-slate-400 block leading-tight mt-0.5">
                          Quản lý:{' '}
                          <strong className="text-slate-800 dark:text-slate-100 underline">
                            {stage.staffCount}
                          </strong>{' '}
                          {stage.staffLabel}
                        </span>
                      </div>
                    </div>

                    {/* 3 Dòng mô tả trọng tâm có icon */}
                    <div className="space-y-1 border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
                      {stage.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${b.iconColor} dark:bg-opacity-20`}
                          >
                            <WebIcon name={b.icon} className="w-2 h-2" />
                          </span>
                          <span className="text-[9px] text-slate-700 dark:text-slate-300 font-medium truncate">
                            {b.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Nút Xem chi tiết -> */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMilestoneDetail(stage);
                      }}
                      className="w-full py-1 px-2 rounded-full bg-slate-100/90 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-600 dark:text-slate-300 text-[9px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* HÀNG 3 (ROW 3): GIÁ TRỊ CỐT LÕI (5) + TỔNG QUAN GIAI ĐOẠN (4) + KỸ NĂNG & HIỆU QUẢ (3) */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch shrink-0">
        {/* ----------------------------------------------------------------- */}
        {/* CỘT 1 (5 COLS): GIÁ TRỊ CỐT LÕI (4 THẺ MÀU PASTEL)                */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`lg:col-span-5 ${cardSurfaceClass} p-3 sm:p-3.5 flex flex-col justify-between gap-2 text-left`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <WebIcon name="target" className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-[13.5px] font-black text-[#0F2942] dark:text-white shrink-0">
                Giá trị cốt lõi
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate hidden sm:inline">
                4 nguyên lý định hình phong cách làm việc
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setDetailPopupModal('values');
              }}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9.5px] font-bold flex items-center gap-1 shrink-0 cursor-pointer transition"
            >
              <span>Xem chi tiết</span>
              <span>›</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
            {/* Giá trị 01: Tận tâm phục vụ */}
            <div className="p-2.5 rounded-xl bg-gradient-to-b from-rose-50/90 to-pink-50/50 dark:from-rose-950/35 dark:to-slate-900 border border-rose-200/70 dark:border-rose-800/40 flex flex-col justify-between gap-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xs">
                    <WebIcon name="heart" className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-black text-rose-500 font-mono">01</span>
                </div>
                <h4 className="text-[10.5px] font-black text-rose-600 dark:text-rose-400 leading-tight">
                  Tận tâm phục vụ
                </h4>
                <p className="text-[9.5px] text-slate-600 dark:text-slate-300 leading-snug mt-1">
                  Luôn đặt quyền lợi và cảm xúc khách hàng làm kim chỉ nam.
                </p>
              </div>
              <span className="text-[8.5px] font-black tracking-wider uppercase text-rose-600 dark:text-rose-400 pt-1 border-t border-rose-200/50 dark:border-rose-800/40">
                DEDICATION
              </span>
            </div>

            {/* Giá trị 02: Định hướng rõ ràng */}
            <div className="p-2.5 rounded-xl bg-gradient-to-b from-blue-50/90 to-sky-50/50 dark:from-blue-950/35 dark:to-slate-900 border border-blue-200/70 dark:border-blue-800/40 flex flex-col justify-between gap-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                    <WebIcon name="chart" className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-black text-blue-600 font-mono">02</span>
                </div>
                <h4 className="text-[10.5px] font-black text-blue-700 dark:text-blue-400 leading-tight">
                  Định hướng rõ ràng
                </h4>
                <p className="text-[9.5px] text-slate-600 dark:text-slate-300 leading-snug mt-1">
                  Đo lường hiệu quả vận hành bằng các chỉ số chuẩn xác (CSAT, NPS).
                </p>
              </div>
              <span className="text-[8.5px] font-black tracking-wider uppercase text-blue-700 dark:text-blue-400 pt-1 border-t border-blue-200/50 dark:border-blue-800/40">
                GOAL ORIENTED
              </span>
            </div>

            {/* Giá trị 03: Tiên phong đổi mới */}
            <div className="p-2.5 rounded-xl bg-gradient-to-b from-amber-50/90 to-orange-50/50 dark:from-amber-950/35 dark:to-slate-900 border border-amber-200/70 dark:border-amber-800/40 flex flex-col justify-between gap-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xs">
                    <WebIcon name="lightbulb" className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-black text-amber-500 font-mono">03</span>
                </div>
                <h4 className="text-[10.5px] font-black text-amber-700 dark:text-amber-400 leading-tight">
                  Tiên phong đổi mới
                </h4>
                <p className="text-[9.5px] text-slate-600 dark:text-slate-300 leading-snug mt-1">
                  Chủ động ứng dụng AI, công nghệ số và tự động hóa quy trình.
                </p>
              </div>
              <span className="text-[8.5px] font-black tracking-wider uppercase text-amber-600 dark:text-amber-400 pt-1 border-t border-amber-200/50 dark:border-amber-800/40">
                INNOVATION
              </span>
            </div>

            {/* Giá trị 04: Đồng hành bền vững */}
            <div className="p-2.5 rounded-xl bg-gradient-to-b from-emerald-50/90 to-teal-50/50 dark:from-emerald-950/35 dark:to-slate-900 border border-emerald-200/70 dark:border-emerald-800/40 flex flex-col justify-between gap-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                    <WebIcon name="handshake" className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-black text-emerald-600 font-mono">04</span>
                </div>
                <h4 className="text-[10.5px] font-black text-emerald-700 dark:text-emerald-400 leading-tight">
                  Đồng hành bền vững
                </h4>
                <p className="text-[9.5px] text-slate-600 dark:text-slate-300 leading-snug mt-1">
                  Xây dựng quan hệ hợp tác lâu dài giữa khách hàng, đối tác và đội ngũ.
                </p>
              </div>
              <span className="text-[8.5px] font-black tracking-wider uppercase text-emerald-700 dark:text-emerald-400 pt-1 border-t border-emerald-200/50 dark:border-emerald-800/40">
                PARTNERSHIP
              </span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CỘT 2 (4 COLS): TỔNG QUAN GIAI ĐOẠN (MẶC ĐỊNH 2013 – 2016)         */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`lg:col-span-4 ${cardSurfaceClass} p-3 sm:p-3.5 flex flex-col justify-between gap-2 text-left`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <WebIcon name="book" className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-[13.5px] font-black text-[#0F2942] dark:text-white truncate">
                {activeStage.summaryTitle}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => handleOpenMilestoneDetail(activeStage)}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9.5px] font-bold flex items-center gap-1 shrink-0 cursor-pointer transition"
            >
              <span>Chi tiết</span>
              <span>›</span>
            </button>
          </div>

          <p className="text-[10.5px] sm:text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {activeStage.summaryText}
          </p>

          {/* 3 Thẻ Chỉ Số Dưới Cùng: 129 Nhân sự quản lý | 4+ Sản phẩm / Dịch vụ | 3 năm Giai đoạn phát triển */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {activeStage.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-2 rounded-xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-200/70 dark:border-slate-700 flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <WebIcon name={m.icon} className="w-3 h-3" />
                  </span>
                  <span className="text-sm sm:text-base font-black text-blue-800 dark:text-cyan-300 leading-none">
                    {m.value}
                  </span>
                </div>
                <span className="text-[9px] text-slate-600 dark:text-slate-300 font-medium mt-1 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CỘT 3 (3 COLS): KỸ NĂNG VÀ HIỆU QUẢ (4 THANH TIẾN TRÌNH)          */}
        {/* ----------------------------------------------------------------- */}
        <div
          className={`lg:col-span-3 ${cardSurfaceClass} p-3 sm:p-3.5 flex flex-col justify-between gap-2 text-left`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <WebIcon name="trophy" className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-[13.5px] font-black text-[#0F2942] dark:text-white">
                Kỹ năng &amp; Hiệu quả
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setDetailPopupModal('skills');
              }}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9.5px] font-bold flex items-center gap-1 shrink-0 cursor-pointer transition"
            >
              <span>Xem chi tiết</span>
              <span>›</span>
            </button>
          </div>

          <div className="flex flex-col justify-between gap-2 flex-1">
            {activeStage.skills.map((sk, sIdx) => (
              <div key={sIdx} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${sk.iconBg} dark:bg-opacity-20`}
                >
                  <WebIcon name={sk.icon} className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {sk.label}
                    </span>
                    <span className={`font-black font-mono ${sk.pctText}`}>{sk.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${sk.barGradient} transition-all duration-500`}
                      style={{ width: `${sk.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal xem chi tiết Giá trị cốt lõi hoặc Kỹ năng */}
      <Modal
        isOpen={detailPopupModal !== null}
        onClose={() => setDetailPopupModal(null)}
        title={
          detailPopupModal === 'values'
            ? '4 Giá trị cốt lõi định hình phong cách làm việc'
            : detailPopupModal === 'skills'
            ? `Chỉ số Kỹ năng và Hiệu quả (${activeStage.company})`
            : activeStage.summaryTitle
        }
        maxWidth="2xl"
      >
        {detailPopupModal === 'values' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1 font-play">
            <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-slate-800 border border-rose-200 dark:border-rose-800/50">
              <h4 className="text-sm font-black text-rose-600 dark:text-rose-400">01. Tận tâm phục vụ (DEDICATION)</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Luôn đặt quyền lợi và cảm xúc của khách hàng làm kim chỉ nam trong mọi quyết định vận hành.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-slate-800 border border-blue-200 dark:border-blue-800/50">
              <h4 className="text-sm font-black text-blue-600 dark:text-blue-400">02. Định hướng rõ ràng (GOAL ORIENTED)</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Đo lường hiệu quả vận hành bằng các chỉ số chuẩn xác (CSAT, NPS, FCR, SLA).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border border-amber-200 dark:border-amber-800/50">
              <h4 className="text-sm font-black text-amber-600 dark:text-amber-400">03. Tiên phong đổi mới (INNOVATION)</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Chủ động ứng dụng AI, công nghệ số và tự động hóa quy trình liên tục.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/50">
              <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400">04. Đồng hành bền vững (PARTNERSHIP)</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Xây dựng quan hệ hợp tác tin cậy lâu dài giữa khách hàng, đối tác và đội ngũ.
              </p>
            </div>
          </div>
        )}
        {detailPopupModal === 'skills' && (
          <div className="space-y-3 p-1 font-play">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Đánh giá hiệu suất thực thi tại <strong>{activeStage.company}</strong> ({activeStage.periodLabel}):
            </p>
            {activeStage.skills.map((sk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span>{sk.label}</span>
                  <span className={sk.pctText}>{sk.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${sk.barGradient}`} style={{ width: `${sk.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {detailPopupModal === 'stage' && (
          <div className="space-y-3 p-1 font-play">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {activeStage.summaryText}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
