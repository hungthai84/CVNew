'use client';

import React, { useState, useMemo } from 'react';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { ExecutiveCard3D } from '@/components/ui/ExecutiveCard3D';
import { LucianAccordion } from '@/components/ui/LucianAccordion';
import { formatCardTitle } from '@/lib/utils';

export interface ContactViewProps {
  currentTheme?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const [topic, setTopic] = useState<string>('CX & CS Advisory');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'message' | 'schedule' | 'faq' | 'card'>('message');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Appointment Scheduling State (Tính năng chọn lịch & thời gian)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 - 10:15');
  const [meetingMode, setMeetingMode] = useState<'meet' | 'teams' | 'in-person' | 'call'>('meet');
  const [consultTopic, setConsultTopic] = useState<string>('Chiến lược Vận hành CSKH');
  const [scheduleName, setScheduleName] = useState<string>('');
  const [scheduleEmail, setScheduleEmail] = useState<string>('');
  const [schedulePhone, setSchedulePhone] = useState<string>('');
  const [scheduleNotes, setScheduleNotes] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Sinh danh sách 14 ngày làm việc tiếp theo
  const availableDays = useMemo(() => {
    const days: Array<{ dateStr: string; dayName: string; formattedDate: string; isWeekend: boolean }> = [];
    const today = new Date();
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isWeekend = d.getDay() === 0;
      const dateStr = d.toISOString().split('T')[0];
      const dayName = i === 1 ? 'Ngày mai' : dayNames[d.getDay()];
      const formattedDate = `${d.getDate()}/${d.getMonth() + 1}`;
      days.push({ dateStr, dayName, formattedDate, isWeekend });
    }
    return days;
  }, []);

  const timeSlots = [
    { time: '09:00 - 09:45', label: '09:00 - 09:45', period: 'Sáng' },
    { time: '10:00 - 10:45', label: '10:00 - 10:45', period: 'Sáng' },
    { time: '11:00 - 11:45', label: '11:00 - 11:45', period: 'Sáng' },
    { time: '14:00 - 14:45', label: '14:00 - 14:45', period: 'Chiều' },
    { time: '15:15 - 16:00', label: '15:15 - 16:00', period: 'Chiều' },
    { time: '16:30 - 17:15', label: '16:30 - 17:15', period: 'Chiều' },
  ];

  const generateGoogleCalendarUrl = () => {
    const attendee = scheduleName || name || 'Đối tác';
    const title = encodeURIComponent(`[Lịch hẹn Cố vấn CX] Nguyễn Hùng Thái & ${attendee}`);
    const details = encodeURIComponent(
      `Cuộc hẹn cố vấn chiến lược CSKH & Vận hành Contact Center với Nguyễn Hùng Thái.\n\n` +
      `Chủ đề: ${consultTopic}\n` +
      `Hình thức: ${meetingMode === 'meet' ? 'Google Meet' : meetingMode === 'teams' ? 'Microsoft Teams / Zoom' : meetingMode === 'in-person' ? 'Trực tiếp (TP.HCM)' : 'Cuộc gọi điện thoại'}\n` +
      `Người tham gia: ${attendee} (${scheduleEmail || email || 'N/A'})\n` +
      `SĐT/Zalo: ${schedulePhone || phone || 'N/A'}\n` +
      `Ghi chú: ${scheduleNotes || 'Không có'}\n\n` +
      `Gửi từ Hung Thai Executive Portfolio & Contact Hub`
    );

    const startTimeStr = selectedTimeSlot.split(' - ')[0] || '09:00';
    const endTimeStr = selectedTimeSlot.split(' - ')[1] || '09:45';
    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);

    const [y, m, d] = selectedDate.split('-').map(Number);
    const startIso = new Date(Date.UTC(y, m - 1, d, startH - 7, startM)).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endIso = new Date(Date.UTC(y, m - 1, d, endH - 7, endM)).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const location = encodeURIComponent(
      meetingMode === 'in-person'
        ? 'TP. Hồ Chí Minh, Việt Nam'
        : meetingMode === 'call'
        ? `Số điện thoại: ${schedulePhone || phone || '090 123 4567'}`
        : 'Google Meet'
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const handleDownloadIcs = () => {
    const startTimeStr = selectedTimeSlot.split(' - ')[0] || '09:00';
    const endTimeStr = selectedTimeSlot.split(' - ')[1] || '09:45';
    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);
    const [y, m, d] = selectedDate.split('-').map(Number);

    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    const dtStart = `${y}${pad(m)}${pad(d)}T${pad(startH)}${pad(startM)}00`;
    const dtEnd = `${y}${pad(m)}${pad(d)}T${pad(endH)}${pad(endM)}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hung Thai Executive Portal//VN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@hungthai.dev`,
      `DTSTAMP:${dtStart}Z`,
      `DTSTART;TZID=Asia/Ho_Chi_Minh:${dtStart}`,
      `DTEND;TZID=Asia/Ho_Chi_Minh:${dtEnd}`,
      `SUMMARY:[Lịch hẹn Cố vấn CX] Nguyễn Hùng Thái & ${scheduleName || name || 'Đối tác'}`,
      `DESCRIPTION:Chủ đề: ${consultTopic}\\nNgười đặt: ${scheduleName || name}\\nEmail: ${scheduleEmail || email}\\nSĐT: ${schedulePhone || phone}`,
      `LOCATION:${meetingMode === 'in-person' ? 'TP. Hồ Chí Minh' : 'Google Meet'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lich-Hen-Hung-Thai-${selectedDate}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống tệp lịch .ics cho Outlook / Apple Calendar!');
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    showToast(`Đã ghi nhận lịch hẹn vào ngày ${selectedDate} lúc ${selectedTimeSlot}!`);
    const gCalUrl = generateGoogleCalendarUrl();
    window.open(gCalUrl, '_blank');
  };

  const handleCopyEmail = () => {
    const targetEmail = 'hungthai84@gmail.com';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(targetEmail);
      showToast(`Đã sao chép địa chỉ Email: ${targetEmail}`);
    } else {
      showToast(`Email liên hệ: ${targetEmail}`);
    }
  };

  const handleApplyPreset = (preset: string) => {
    if (preset) {
      setMessage(preset);
      showToast('Đã chèn mẫu tin nhắn nhanh!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = 'hungthai84@gmail.com';
    const subject = encodeURIComponent(`[Loop Contact - ${topic}] Message from ${name || 'Đối tác'}`);
    const body = encodeURIComponent(
      `Hi Nguyễn Hùng Thái,\n\n` +
        `Full Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'N/A'}\n` +
        `Company: ${company || 'N/A'}\n` +
        `Topic: ${topic}\n\n` +
        `Message:\n${message}\n\n` +
        `--\nSent from Executive Portfolio & Contact Hub`
    );

    setIsSuccess(true);
    showToast('Đang mở ứng dụng gửi thư của bạn!');
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col gap-[15px] max-w-7xl mx-auto justify-start select-none relative text-slate-800 dark:text-slate-100 text-left overflow-hidden">
      {/* 2. Hai Thẻ Liên Hệ Side-by-Side (5 cols & 7 cols) - Căn chỉnh chiều cao nằm gọn trong thẻ chính */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch flex-1 min-h-0 overflow-hidden">
        {/* CARD 1: Contact Hub, Direct Channels & Trust Badges */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[14px] border border-white/80 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.04)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_20px_-2px_rgba(99,102,241,0.2)] flex flex-col justify-between p-3.5 sm:p-4 gap-2.5 text-left backdrop-blur-xl h-full">
          {/* Header Card 1 */}
          <div className="space-y-1 relative z-10 shrink-0 bg-transparent border-0 shadow-none backdrop-blur-none p-0">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <WebIcon name="chat" className="w-[20px] h-[20px] text-indigo-600 dark:text-indigo-400 animate-[icon-floating_3s_ease-in-out_infinite] shrink-0 inline-block card-title-icon" />
              <h2 className="text-xs sm:text-sm lg:text-[14.5px] font-black font-play text-indigo-600 dark:text-indigo-400 tracking-tight">
                {formatCardTitle("Kết Nối Chuyên Gia")}
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              Bạn có câu hỏi, đề xuất hợp tác hoặc cần tư vấn chiến lược Contact Center & chuyển đổi số? Hãy gửi tin nhắn hoặc{' '}
              <a
                href="mailto:hungthai84@gmail.com"
                className="font-extrabold text-rose-500 dark:text-rose-400 underline decoration-rose-500 dark:decoration-rose-400 decoration-2 underline-offset-2 hover:text-rose-600 dark:hover:text-rose-300"
              >
                gửi email trực tiếp
              </a>.
            </p>
          </div>

          {/* 3 Kênh Liên Hệ Trực Tiếp */}
          <div className="space-y-2 relative z-10 flex-1 flex flex-col justify-center min-h-0">
            {/* Email Direct Card */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-2.5 hover:border-sky-400 dark:hover:border-sky-400 transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-500/15 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block font-mono uppercase">
                    Email Direct
                  </span>
                  <a
                    href="mailto:hungthai84@gmail.com"
                    className="text-xs sm:text-[13px] font-extrabold text-slate-800 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 truncate block"
                  >
                    hungthai84@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Sao chép Email"
                  className="p-1.5 rounded-[999px] bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-600 transition border border-slate-200 dark:border-slate-600 shadow-2xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </button>
                <a
                  href="mailto:hungthai84@gmail.com"
                  title="Gửi mail trực tiếp"
                  className="p-1.5 rounded-[999px] bg-sky-500 text-white hover:bg-sky-600 transition shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-500/15 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block font-mono uppercase">
                    Trụ sở làm việc
                  </span>
                  <p className="text-xs sm:text-[13px] font-extrabold text-slate-800 dark:text-slate-100 truncate">
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
              <span className="text-[9.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 shrink-0">
                Hybrid / Remote
              </span>
            </div>

            {/* Office Hours */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block font-mono uppercase">
                    Khung giờ hỗ trợ
                  </span>
                  <p className="text-xs sm:text-[13px] font-extrabold text-slate-800 dark:text-slate-100 truncate">
                    Thứ 2 – Thứ 6 (08:00 – 18:00 GMT+7)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Mini Illustration / Trust Panel */}
          <div className="relative rounded-xl bg-gradient-to-r from-slate-100 via-sky-50 to-indigo-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 border border-sky-100/80 dark:border-slate-700/80 px-3 py-2 overflow-hidden flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-2 select-none relative z-10">
              <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11l3-1-1 3-3 1 1-3z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#082f49] text-white flex items-center justify-center ring-2 ring-white/20 shadow-xs shrink-0">
                <svg className="w-4 h-4 text-sky-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[10.5px] font-extrabold text-slate-700 dark:text-slate-200 z-10">
              <div className="inline-flex items-center gap-1">
                <WebIcon name="heart" className="w-3 h-3 text-rose-500" />
                <span>Bảo mật 100%</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <WebIcon name="bolt" className="w-3 h-3 text-sky-500" />
                <span>Phản hồi &lt;24h</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] transition cursor-pointer"
                title="Đặt lịch hẹn trao đổi trực tuyến"
              >
                <WebIcon name="calendar" className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Đặt lịch</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-indigo-600 dark:text-cyan-300 font-bold text-[10px] transition cursor-pointer"
                title="Mở Thẻ Danh Thiếp Điện Tử 3D (Lucian UX/UI #052)"
              >
                <WebIcon name="layers" className="w-3 h-3" />
                <span>Thẻ 3D</span>
              </button>
            </div>
          </div>
        </div>

        {/* CARD 2: Tabbed Interface - Gửi Thông Điệp Trực Tiếp & Câu Hỏi Thường Gặp */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-[14px] border border-white/80 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.04)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_20px_-2px_rgba(99,102,241,0.2)] flex flex-col justify-between p-3.5 sm:p-4 gap-2.5 text-left backdrop-blur-xl h-full">
          {/* Tab Selector Header */}
          <div className="flex items-center justify-between gap-2 relative z-10 pb-2 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
            {/* Pill Tabs */}
            <div className="flex items-center p-0.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-[999px] border border-slate-200/90 dark:border-slate-700/90 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`px-3 py-1 rounded-[999px] text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <WebIcon name="sparkles" className="w-3 h-3 text-indigo-600 dark:text-indigo-400 animate-[icon-floating_3s_ease-in-out_infinite]" />
                <span>Gửi tin nhắn</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`px-3 py-1 rounded-[999px] text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <WebIcon name="calendar" className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>Đặt lịch hẹn</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-1 rounded-[999px] text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'faq'
                    ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <WebIcon name="bulb" className="w-3 h-3 text-amber-500" />
                <span>Hỏi đáp</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`px-3 py-1 rounded-[999px] text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'card'
                    ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <WebIcon name="layers" className="w-3 h-3 text-cyan-500" />
                <span>Danh thiếp 3D</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Gửi Thông Điệp Trực Tiếp */}
          {activeTab === 'message' && (
            <div className="flex-1 flex flex-col justify-between gap-2 relative z-10 min-h-0">
              {/* Row 1: Chủ đề trao đổi & Mẫu tin nhắn nhanh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Chủ Đề Trao Đổi
                  </label>
                  <div className="relative">
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 pr-8 shadow-2xs"
                    >
                      <option value="General">Chung (General)</option>
                      <option value="CX & CS Advisory">Tư vấn CX & CS</option>
                      <option value="Partnership">Hợp tác chiến lược</option>
                      <option value="Feedback & Bug">Góp ý & Báo lỗi</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Mẫu Tin Nhắn Gợi Ý
                  </label>
                  <div className="relative">
                    <select
                      onChange={(e) => handleApplyPreset(e.target.value)}
                      defaultValue=""
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 pr-8 shadow-2xs"
                    >
                      <option value="">-- Mẫu tin nhắn gợi ý --</option>
                      <option value="Tôi cần tư vấn tái cấu trúc và tối ưu hóa hệ thống Contact Center quy mô 100+ nhân sự.">
                        Chiến lược Contact Center 100+
                      </option>
                      <option value="Tôi muốn tìm hiểu chương trình đào tạo kỹ năng thấu cảm và quy trình QA cho đội ngũ CSKH.">
                        Đào tạo kỹ năng QA & CSKH
                      </option>
                      <option value="Tôi cần tư vấn tích hợp AI Chatbot và Omni-channel Contact Center (Zendesk / Salesforce).">
                        Tích hợp AI & Omnichannel AICC
                      </option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-2 min-h-0">
                {/* Row 2: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 shadow-2xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 3: Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090 123 4567"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 shadow-2xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Tên công ty / Tổ chức
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Công ty ABC"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 4: Message textarea */}
                <div className="space-y-0.5 flex-1 min-h-0 flex flex-col">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Nội dung trao đổi chi tiết *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập nội dung tin nhắn, yêu cầu tư vấn hoặc dự án..."
                    className="w-full flex-1 min-h-[55px] max-h-[75px] rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 shadow-2xs resize-none"
                  />
                </div>

                {/* Row 5: Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 sm:py-2.5 rounded-[999px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-105 active:scale-[0.99] text-white font-black text-xs sm:text-[13px] flex items-center justify-center gap-2 shadow-md shadow-indigo-500/25 transition cursor-pointer shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Gửi thông điệp ngay</span>
                </button>

                {isSuccess && (
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                    <span>✓</span>
                    <span>Đã chuẩn bị sẵn thư gửi qua Ứng dụng Email của bạn!</span>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 2: Đặt Lịch Hẹn & Chọn Thời Gian Trực Tuyến */}
          {activeTab === 'schedule' && (
            <div className="flex-1 flex flex-col justify-between gap-2.5 relative z-10 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
              {/* Callout Header */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-emerald-950/60 dark:via-teal-950/50 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-700/60 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 font-play">
                    Chọn lịch & khung giờ trao đổi trực tiếp với Nguyễn Hùng Thái
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                  GMT+7 (Giờ VN)
                </span>
              </div>

              {/* 1. Chọn Dịch vụ tư vấn & Hình thức gặp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    1. Mục đích cuộc hẹn
                  </label>
                  <select
                    value={consultTopic}
                    onChange={(e) => setConsultTopic(e.target.value)}
                    className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 shadow-2xs"
                  >
                    <option value="Chiến lược Vận hành CSKH">Tư vấn Chiến lược CSKH (45 phút)</option>
                    <option value="Tối ưu Chi phí & Quy trình CX">Đánh giá & Tối ưu Chi phí CX (30 phút)</option>
                    <option value="Phỏng vấn & Tuyển dụng C-Level">Phỏng vấn Quản lý C-Level (60 phút)</option>
                    <option value="Chuyển đổi số & AI Omnichannel">Chuyển đổi số & AI AICC (45 phút)</option>
                    <option value="Hợp tác Đào tạo & Huấn luyện">Hợp tác Huấn luyện Đội ngũ (45 phút)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    2. Hình thức gặp
                  </label>
                  <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    {[
                      { key: 'meet', label: 'Meet' },
                      { key: 'teams', label: 'Teams' },
                      { key: 'in-person', label: 'Trực tiếp' },
                      { key: 'call', label: 'Gọi thoại' },
                    ].map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setMeetingMode(m.key as any)}
                        className={`py-1 rounded-lg text-[10px] font-bold transition cursor-pointer text-center ${
                          meetingMode === m.key
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Chọn Ngày (Date Chips Carousel / Slider) */}
              <div className="space-y-1 shrink-0">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    3. Chọn ngày hẹn khả dụng
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Đang chọn: {selectedDate}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto glass-scrollbar pb-1">
                  {availableDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        disabled={day.isWeekend}
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`px-3 py-1.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center shrink-0 min-w-[62px] cursor-pointer ${
                          day.isWeekend
                            ? 'opacity-40 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                            : isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-300 dark:ring-emerald-500/50 scale-105'
                            : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400 shadow-2xs'
                        }`}
                      >
                        <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                          {day.dayName}
                        </span>
                        <span className="text-xs font-black font-play">
                          {day.formattedDate}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Chọn Khung Giờ (Time Slots) */}
              <div className="space-y-1 shrink-0">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    4. Khung giờ hẹn (45 phút/phiên)
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Đã chọn: {selectedTimeSlot}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-1.5 px-1 rounded-xl text-[10.5px] font-bold border transition-all cursor-pointer text-center truncate ${
                          isSelected
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-sm scale-102 ring-1 ring-emerald-300'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-teal-400 shadow-2xs'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Thông tin liên hệ & Xác nhận */}
              <form onSubmit={handleBookAppointment} className="flex-1 flex flex-col justify-between gap-2 min-h-0 pt-1 border-t border-slate-200/80 dark:border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0">
                  <div className="space-y-0.5">
                    <label className="block text-[9.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={scheduleName || name}
                      onChange={(e) => setScheduleName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[9.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={scheduleEmail || email}
                      onChange={(e) => setScheduleEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[9.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      Số điện thoại / Zalo
                    </label>
                    <input
                      type="tel"
                      value={schedulePhone || phone}
                      onChange={(e) => setSchedulePhone(e.target.value)}
                      placeholder="090 123 4567"
                      className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-0.5 shrink-0">
                  <label className="block text-[9.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Ghi chú / Câu hỏi trước buổi hẹn (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={scheduleNotes}
                    onChange={(e) => setScheduleNotes(e.target.value)}
                    placeholder="Mục tiêu hoặc tài liệu muốn cùng thảo luận..."
                    className="w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
                  />
                </div>

                {/* Nút hành động */}
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 shrink-0">
                  <button
                    type="submit"
                    className="flex-1 w-full py-2 px-4 rounded-[999px] bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:brightness-105 active:scale-[0.99] text-white font-black text-xs sm:text-[12.5px] flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition cursor-pointer"
                  >
                    <WebIcon name="calendar" className="w-3.5 h-3.5" />
                    <span>Xác Nhận & Thêm Vào Google Calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="px-3.5 py-2 rounded-[999px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
                    title="Tải tệp lịch .ics dùng cho Apple Calendar, Outlook, Thunderbird"
                  >
                    <WebIcon name="download" className="w-3.5 h-3.5" />
                    <span>Tải tệp .ics</span>
                  </button>
                </div>

                {isBooked && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Đã lên lịch thành công: Ngày {selectedDate} lúc {selectedTimeSlot}!</span>
                    </div>
                    <a
                      href={generateGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-emerald-700 dark:text-emerald-300 font-extrabold hover:text-emerald-800"
                    >
                      Mở lại Lịch
                    </a>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 2: Câu Hỏi Thường Gặp (FAQ) */}
          {activeTab === 'faq' && (
            <div className="flex-1 flex flex-col justify-between gap-2 relative z-10 min-h-0 overflow-hidden">
              <div className="p-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 shrink-0">
                <WebIcon name="bulb" className="w-3.5 h-3.5 shrink-0" />
                <span>Các câu hỏi phổ biến từ đối tác & doanh nghiệp:</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
                <LucianAccordion
                  items={[
                    {
                      question: 'Thời gian phản hồi sau khi gửi yêu cầu liên hệ là bao lâu?',
                      answer: 'Tôi luôn ưu tiên phản hồi trong vòng 24 giờ làm việc. Với các đề xuất khẩn cấp hoặc dự án chiến lược, thời gian phản hồi thường trong vòng 2–4 giờ làm việc.',
                      linkText: 'Gửi tin nhắn ưu tiên ngay',
                    },
                    {
                      question: 'Anh Thái có nhận tư vấn dự án ngắn hạn hoặc đào tạo doanh nghiệp không?',
                      answer: 'Có. Tôi nhận tư vấn chiến lược CX/CSKH, thẩm định hệ thống Contact Center, xây dựng bộ tiêu chuẩn QA Scorecard và đào tạo nâng cao kỹ năng cho đội ngũ lãnh đạo & nhân sự CSKH.',
                      linkText: 'Đặt lịch trao đổi chi tiết',
                    },
                    {
                      question: 'Thông tin dự án và ý tưởng trao đổi có được cam kết bảo mật không?',
                      answer: 'Cam kết bảo mật 100%. Mọi dữ liệu trao đổi, số liệu vận hành và ý tưởng chiến lược của doanh nghiệp đều được bảo mật tuyệt đối. Sẵn sàng ký kết thỏa thuận NDA trước khi đi vào chi tiết.',
                    },
                    {
                      question: 'Phương thức hợp tác và các bước triển khai dự án như thế nào?',
                      answer: 'Quy trình gồm 4 bước chuẩn: 1. Khảo sát hiện trạng & nhu cầu; 2. Đề xuất giải pháp và lộ trình; 3. Đồng hành đào tạo, thiết lập SOP & hệ thống; 4. Đánh giá KPI và nghiệm thu chuyển giao.',
                      linkText: 'Xem quy trình triển khai',
                    },
                    {
                      question: 'Có thể kết nối trực tiếp qua Zalo hoặc hẹn gặp tại TP.HCM không?',
                      answer: 'Hoàn toàn sẵn sàng! Bạn có thể nhắn tin qua Zalo số 0903.011.699 hoặc đặt lịch hẹn gặp trực tiếp tại TP. Hồ Chí Minh để cùng thảo luận chi tiết.',
                      linkText: 'Mở tab đặt lịch hẹn',
                    },
                  ]}
                  onSelectAction={(_item, idx) => {
                    if (idx === 1 || idx === 4) {
                      setActiveTab('schedule');
                    } else {
                      setActiveTab('message');
                    }
                  }}
                />
              </div>

              {/* Nút chuyển nhanh sang gửi tin nhắn */}
              <div className="pt-1 flex items-center justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('message')}
                  className="px-3.5 py-1.5 rounded-[999px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <span>Gửi tin nhắn trao đổi ngay</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Thẻ Danh Thiếp Điện Tử Tương Tác 3D (Lucian UX/UI Prompt #052) */}
          {activeTab === 'card' && (
            <div className="flex-1 flex flex-col items-center justify-between gap-2.5 relative z-10 min-h-0 py-1 overflow-y-auto no-scrollbar">
              <div className="text-center space-y-1 shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 text-[10px] font-mono font-bold tracking-wider uppercase">
                  <WebIcon name="layers" className="w-3 h-3 animate-pulse" />
                  <span>Executive Credential Card · Lucian UX/UI #052</span>
                </div>
                <h3 className="text-sm sm:text-base font-black font-play text-slate-900 dark:text-white">
                  Danh Thiếp Lãnh Đạo CSKH 3D
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Rê chuột hoặc vuốt chạm để xoay 3D, kéo ngang để lật thẻ, hoặc bấm Khóa thẻ bảo mật.
                </p>
              </div>

              {/* Component ExecutiveCard3D từ Lucian UX/UI */}
              <div className="w-full flex-1 flex items-center justify-center my-auto min-h-0 py-1">
                <ExecutiveCard3D />
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 w-full shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <WebIcon name="mail" className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Sao chép Email</span>
                </button>
                <a
                  href="tel:0908559884"
                  className="px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <WebIcon name="phone" className="w-3.5 h-3.5" />
                  <span>Gọi 0908 559 884</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('message')}
                  className="px-3 py-1.5 rounded-full border border-indigo-400/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Gửi tin nhắn ngay →</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
