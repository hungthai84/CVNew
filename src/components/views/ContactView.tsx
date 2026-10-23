'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';

export const ContactView: React.FC = () => {
  const { showToast } = useToast();
  const [topic, setTopic] = useState<string>('CX & CS Advisory');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'message' | 'faq'>('message');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <div className="w-full h-full flex-1 min-h-0 flex flex-col gap-[15px] max-w-7xl mx-auto justify-start select-none relative text-slate-800 text-left overflow-hidden">
      {/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Liên hệ"
        title="Kết Nối Hợp Tác"
        subtitle="Sẵn sàng đồng hành cùng Doanh nghiệp nâng tầm Dịch vụ Khách hàng"
        quote="“Sẵn sàng kết nối – Kiến tạo tương lai dịch vụ xuất sắc.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-teal-600"
        videoSrc="https://cdn.scena.ai/project/10223/04736de7d6f897113c708e6f5ef4a3fdb18e7ca16a35113744667f1adcd6142b.mp4"
      />

      {/* 2. Hai Thẻ Liên Hệ Side-by-Side (5 cols & 7 cols) - Căn chỉnh chiều cao nằm gọn trong thẻ chính */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch flex-1 min-h-0 overflow-hidden">
        {/* CARD 1: Contact Hub, Direct Channels & Trust Badges */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/80 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 shadow-md flex flex-col justify-between p-3.5 sm:p-4 gap-2.5 text-left backdrop-blur-xl h-full">
          {/* Header Card 1 */}
          <div className="space-y-1 relative z-10 shrink-0 bg-transparent border-0 shadow-none backdrop-blur-none p-0">
            <div className="flex items-center gap-2">
              <WebIcon name="chat" className="w-[25px] h-[25px] text-indigo-600 dark:text-indigo-400 animate-[icon-floating_3s_ease-in-out_infinite] shrink-0 inline-block card-title-icon" />
              <h2 className="text-xs sm:text-sm lg:text-[14.5px] font-bold text-indigo-600 dark:text-indigo-400 tracking-tight font-play">
                Kết nối chuyên gia
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
            </div>
          </div>
        </div>

        {/* CARD 2: Tabbed Interface - Gửi Thông Điệp Trực Tiếp & Câu Hỏi Thường Gặp */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/80 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 shadow-md flex flex-col justify-between p-3.5 sm:p-4 gap-2.5 text-left backdrop-blur-xl h-full">
          {/* Tab Selector Header */}
          <div className="flex items-center justify-between gap-2 relative z-10 pb-2 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
            {/* Pill Tabs */}
            <div className="flex items-center p-0.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-[999px] border border-slate-200/90 dark:border-slate-700/90">
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
                <span>Gửi tin nhắn nhanh</span>
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
                <span>Câu hỏi thường gặp</span>
              </button>
            </div>

            <span className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500 font-mono hidden sm:inline-block">
              {activeTab === 'message' ? 'Tư vấn chuyên sâu & Phản hồi nhanh' : 'Giải đáp 5 câu hỏi cốt lõi'}
            </span>
          </div>

          {/* TAB 1: Gửi Thông Điệp Trực Tiếp */}
          {activeTab === 'message' && (
            <div className="flex-1 flex flex-col justify-between gap-2 relative z-10 min-h-0">
              {/* Row 1: Chủ đề trao đổi & Mẫu tin nhắn nhanh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                <div className="space-y-0.5">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    1. Chủ đề trao đổi
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
                    2. Mẫu tin nhắn nhanh
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

          {/* TAB 2: Câu Hỏi Thường Gặp (FAQ) */}
          {activeTab === 'faq' && (
            <div className="flex-1 flex flex-col justify-between gap-2 relative z-10 min-h-0 overflow-hidden">
              <div className="p-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 shrink-0">
                <WebIcon name="bulb" className="w-3.5 h-3.5 shrink-0" />
                <span>Các câu hỏi phổ biến từ đối tác & doanh nghiệp:</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-1.5 pr-0.5">
                {[
                  {
                    q: 'Thời gian phản hồi sau khi gửi yêu cầu liên hệ là bao lâu?',
                    a: 'Tôi luôn ưu tiên phản hồi trong vòng 24 giờ làm việc. Với các đề xuất khẩn cấp hoặc dự án chiến lược, thời gian phản hồi thường trong vòng 2–4 giờ làm việc.',
                  },
                  {
                    q: 'Anh Thái có nhận tư vấn dự án ngắn hạn hoặc đào tạo doanh nghiệp không?',
                    a: 'Có. Tôi nhận tư vấn chiến lược CX/CSKH, thẩm định hệ thống Contact Center, xây dựng bộ tiêu chuẩn QA Scorecard và đào tạo nâng cao kỹ năng cho đội ngũ lãnh đạo & nhân sự CSKH.',
                  },
                  {
                    q: 'Thông tin dự án và ý tưởng trao đổi có được cam kết bảo mật không?',
                    a: 'Cam kết bảo mật 100%. Mọi dữ liệu trao đổi, số liệu vận hành và ý tưởng chiến lược của doanh nghiệp đều được bảo mật tuyệt đối. Sẵn sàng ký kết thỏa thuận NDA trước khi đi vào chi tiết.',
                  },
                  {
                    q: 'Phương thức hợp tác và các bước triển khai dự án như thế nào?',
                    a: 'Quy trình gồm 4 bước chuẩn: 1. Khảo sát hiện trạng & nhu cầu; 2. Đề xuất giải pháp và lộ trình; 3. Đồng hành đào tạo, thiết lập SOP & hệ thống; 4. Đánh giá KPI và nghiệm thu chuyển giao.',
                  },
                  {
                    q: 'Có thể kết nối trực tiếp qua Zalo hoặc hẹn gặp tại TP.HCM không?',
                    a: 'Hoàn toàn sẵn sàng! Bạn có thể nhắn tin qua Zalo số 0903.011.699 hoặc đặt lịch hẹn gặp trực tiếp tại TP. Hồ Chí Minh để cùng thảo luận chi tiết.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 overflow-hidden transition-all shadow-2xs">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-3 py-2 text-left flex items-center justify-between gap-2.5 text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-4.5 h-4.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[9.5px] shrink-0 font-mono">
                          0{idx + 1}
                        </span>
                        <span className="truncate">{item.q}</span>
                      </span>
                      <span
                        className="text-[10px] text-slate-400 transition-transform duration-300 shrink-0"
                        style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        ▼
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-3 pb-2.5 text-[11.5px] font-medium leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/70 pt-2">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
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
        </div>
      </div>
    </div>
  );
};
