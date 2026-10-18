'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export const ContactView: React.FC = () => {
  const { showToast } = useToast();
  const [topic, setTopic] = useState<string>('Tư vấn CS & CS');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'message' | 'faq'>('message');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyEmail = () => {
    const targetEmail = 'hungthai848@gmail.com';
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
      showToast('Đã chèn mẫu tin nhắn gợi ý!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = 'hungthai848@gmail.com';
    const subject = encodeURIComponent(`[Loop Contact - ${topic}] Tin nhắn từ ${name || 'Đối tác'}`);
    const body = encodeURIComponent(
      `Chào Nguyễn Hùng Thái,\n\n` +
        `Họ và tên: ${name}\n` +
        `Email: ${email}\n` +
        `Số điện thoại: ${phone || 'N/A'}\n` +
        `Công ty: ${company || 'N/A'}\n` +
        `Chủ đề: ${topic}\n\n` +
        `Nội dung trao đổi:\n${message}\n\n` +
        `--\nGửi từ Website Portfolio Nguyễn Hùng Thái`
    );

    setIsSuccess(true);
    showToast('Đang mở ứng dụng gửi thư của bạn!');
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col gap-2.5 sm:gap-3 max-w-7xl mx-auto justify-start select-none relative text-slate-800 dark:text-slate-100 text-left overflow-hidden">
      {/* 1. TOP HERO BANNER: KẾT NỐI HỢP TÁC (Khớp 100% hình tham chiếu) */}
      <div className="relative w-full h-[132px] sm:h-[145px] lg:h-[150px] shrink-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-sky-200/60 dark:border-sky-800/40 bg-gradient-to-r from-sky-50 via-white to-sky-50">
        <img
          src="/images/contact/hero-banner.png"
          alt="Liên Hệ - Kết Nối Hợp Tác"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* 2. BỐ CỤC 2 THẺ SIDE-BY-SIDE: TRÁI 38%, PHẢI 62% */}
      <div className="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-2.5 sm:gap-3.5 items-stretch relative z-10 overflow-hidden">
        {/* ================= THẺ TRÁI (38%): KẾT NỐI & TRÒ CHUYỆN CÙNG CHUYÊN GIA ================= */}
        <div className="w-full lg:w-[38%] xl:w-[38%] shrink-0 relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-xl flex flex-col justify-between p-3.5 sm:p-4 text-left h-full min-h-0">
          {/* Header Thẻ Trái */}
          <div className="space-y-1 relative z-10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25 shrink-0">
                <WebIcon name="chat" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <h4 className="text-sm sm:text-[15px] font-black text-slate-900 dark:text-white tracking-tight font-play">
                Kết nối & Trò chuyện cùng chuyên gia
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-300 pt-0.5">
              Bạn có câu hỏi, đề xuất hợp tác hoặc cần tư vấn chi tiết về các dịch vụ, giải pháp? Hãy{' '}
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className="font-bold text-blue-600 dark:text-blue-400 underline decoration-blue-500 underline-offset-2 hover:text-blue-700 cursor-pointer"
              >
                gửi
              </button>{' '}
              tin nhắn hoặc{' '}
              <a
                href="mailto:hungthai848@gmail.com"
                className="font-bold text-blue-600 dark:text-blue-400 underline decoration-blue-500 underline-offset-2 hover:text-blue-700"
              >
                gọi email trực tiếp
              </a>.
            </p>
          </div>

          {/* 3 Khối Kênh Liên Hệ Trực Tiếp */}
          <div className="space-y-2 relative z-10 flex-1 flex flex-col justify-center min-h-0 py-1">
            {/* 1. Email Direct */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#f0f7ff] dark:bg-slate-800/80 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between gap-2.5 hover:border-blue-300 transition-all shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <WebIcon name="mail" className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8.5px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 block font-mono">
                    EMAIL DIRECT
                  </span>
                  <a
                    href="mailto:hungthai848@gmail.com"
                    className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-slate-100 hover:text-blue-600 truncate block"
                  >
                    hungthai848@gmail.com
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Sao chép Email"
                className="p-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition border border-slate-200/80 dark:border-slate-600 shadow-2xs cursor-pointer shrink-0"
              >
                <WebIcon name="copy" className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Trụ sở làm việc */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#fff1f2] dark:bg-slate-800/80 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between gap-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0">
                  <WebIcon name="map-pin" className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8.5px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 block font-mono">
                    TRỤ SỞ LÀM VIỆC
                  </span>
                  <p className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-slate-100 truncate">
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              <span className="text-[9.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300/80 dark:border-emerald-700/80 shrink-0 flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Hiện tại / Remote</span>
              </span>
            </div>

            {/* 3. Khung giờ hỗ trợ */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#f0fdf4] dark:bg-slate-800/80 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between gap-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <WebIcon name="clock" className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8.5px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 block font-mono">
                    KHUNG GIỜ HỖ TRỢ
                  </span>
                  <p className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-slate-100 truncate">
                    Thứ 2 - Thứ 6 (08:00 - 18:00 GMT+7)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dải chân Thẻ Trái: Mạng xã hội + Nhãn bảo mật & phản hồi */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 relative z-10 shrink-0">
            {/* 4 Nút mạng xã hội tròn: LinkedIn, Facebook, Zalo, YouTube */}
            <div className="flex items-center gap-1.5 select-none">
              <a
                href="https://linkedin.com/in/hungthai84"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="w-7 h-7 rounded-full bg-[#0077b5] text-white flex items-center justify-center font-bold text-[11px] shadow-xs hover:scale-105 transition"
              >
                in
              </a>
              <a
                href="https://facebook.com/hungthai84"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:scale-105 transition"
              >
                f
              </a>
              <a
                href="https://zalo.me/0903011699"
                target="_blank"
                rel="noreferrer"
                title="Zalo"
                className="w-7 h-7 rounded-full bg-[#0068ff] text-white flex items-center justify-center font-bold text-[8.5px] shadow-xs hover:scale-105 transition"
              >
                Zalo
              </a>
              <a
                href="https://youtube.com/@hungthai84"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                className="w-7 h-7 rounded-full bg-[#ff0000] text-white flex items-center justify-center font-bold text-[10px] shadow-xs hover:scale-105 transition"
              >
                ▶
              </a>
            </div>

            <div className="hidden sm:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700" />

            {/* Nhãn Bảo mật 100% & Phản hồi <24h */}
            <div className="flex items-center gap-2 text-[10.5px] font-bold text-slate-600 dark:text-slate-300">
              <div className="inline-flex items-center gap-1">
                <span className="text-rose-500 text-xs">❤️</span>
                <span>Bảo mật 100%</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <span className="text-blue-500 text-xs">⚡</span>
                <span>Phản hồi &lt;24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= THẺ PHẢI (62%): BIỂU MẪU GỬI THÔNG ĐIỆP ================= */}
        <div className="w-full lg:w-[62%] xl:w-[62%] shrink-0 relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-xl flex flex-col justify-between p-3.5 sm:p-4 text-left h-full min-h-0">
          {/* Header Thẻ Phải: 2 Tab Pill & Subtitle */}
          <div className="flex items-center justify-between gap-2 relative z-10 pb-2 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
            {/* Pill Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400 shadow-2xs font-black'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <span className="text-xs">✈️</span>
                <span>Gửi thông điệp trực tiếp</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'faq'
                    ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400 shadow-2xs font-black'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <span className="text-xs">❓</span>
                <span>Câu hỏi thường gặp</span>
              </button>
            </div>

            <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline-block">
              {activeTab === 'message' ? 'Tư vấn chuyên sâu & Phản hồi nhanh' : 'Giải đáp 5 câu hỏi cốt lõi'}
            </span>
          </div>

          {/* TAB 1: Gửi thông điệp trực tiếp */}
          {activeTab === 'message' && (
            <div className="flex-1 flex flex-col justify-between gap-2 relative z-10 min-h-0 pt-1">
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-2 min-h-0">
                {/* Row 1: 1. CHỦ ĐỀ TRAO ĐỔI * & 2. MẪU TIN NHẮN NHANH * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 shrink-0">
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                      1. CHỦ ĐỀ TRAO ĐỔI *
                    </label>
                    <div className="relative">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 pr-8 shadow-2xs"
                      >
                        <option value="Tư vấn CS & CS">Tư vấn CS & CS</option>
                        <option value="Tối ưu vận hành Contact Center">Tối ưu vận hành Contact Center</option>
                        <option value="Chiến lược Trải nghiệm Khách hàng (CX)">Chiến lược Trải nghiệm Khách hàng (CX)</option>
                        <option value="Tự động hóa AI & Omnichannel AICC">Tự động hóa AI & Omnichannel AICC</option>
                        <option value="Hợp tác chiến lược & Đối tác">Hợp tác chiến lược & Đối tác</option>
                        <option value="Góp ý & Khác">Góp ý & Khác</option>
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                      2. MẪU TIN NHẮN NHANH *
                    </label>
                    <div className="relative">
                      <select
                        onChange={(e) => handleApplyPreset(e.target.value)}
                        defaultValue=""
                        className="w-full rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 pr-8 shadow-2xs"
                      >
                        <option value="">- Mẫu tin nhắn gợi ý -</option>
                        <option value="Tôi cần tư vấn xây dựng và chuẩn hóa phòng Dịch vụ Khách hàng (CSKH).">
                          Thiết lập & Chuẩn hóa CSKH
                        </option>
                        <option value="Tôi cần tư vấn tái cấu trúc và tối ưu hóa hệ thống Contact Center quy mô 100+ nhân sự.">
                          Chiến lược Contact Center 100+
                        </option>
                        <option value="Tôi muốn tìm hiểu chương trình đào tạo kỹ năng thấu cảm và quy trình QA cho đội ngũ CSKH.">
                          Đào tạo kỹ năng QA & CSKH
                        </option>
                        <option value="Tôi cần tư vấn tích hợp AI Chatbot và Omni-channel Contact Center (AICC).">
                          Tích hợp AI & Omnichannel AICC
                        </option>
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: HỌ VÀ TÊN * & ĐỊA CHỈ EMAIL * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 shrink-0">
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                      HỌ VÀ TÊN *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 shadow-2xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                      ĐỊA CHỈ EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 3: SỐ ĐIỆN THOẠI * & TÊN CÔNG TY / TỔ CHỨC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 shrink-0">
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                      SỐ ĐIỆN THOẠI *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090 123 4567"
                      className="w-full rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 shadow-2xs"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                      TÊN CÔNG TY / TỔ CHỨC
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Công ty ABC"
                      className="w-full rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 4: NỘI DUNG TRAO ĐỔI CHI TIẾT * */}
                <div className="space-y-0.5 flex-1 min-h-0 flex flex-col">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                    NỘI DUNG TRAO ĐỔI CHI TIẾT *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập nội dung tin nhắn, yêu cầu tư vấn hoặc dự án..."
                    className="w-full flex-1 min-h-[50px] max-h-[70px] rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 shadow-2xs resize-none"
                  />
                </div>

                {/* Row 5: Nút bấm Gửi thông điệp ngay */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#0ea5e9] via-[#3b82f6] to-[#a855f7] hover:brightness-105 active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition cursor-pointer shrink-0"
                >
                  <span className="text-sm">✈️</span>
                  <span>Gửi thông điệp ngay</span>
                </button>

                {isSuccess && (
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                    <span>✓</span>
                    <span>Đã chuẩn bị sẵn thư gửi qua Ứng dụng Email của bạn!</span>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 2: Câu hỏi thường gặp (FAQ) */}
          {activeTab === 'faq' && (
            <div className="flex-1 flex flex-col justify-between gap-2 relative z-10 min-h-0 overflow-hidden pt-1">
              <div className="p-2 rounded-xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-100 dark:border-blue-900/40 flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 shrink-0">
                <WebIcon name="bulb" className="w-3.5 h-3.5 shrink-0" />
                <span>Các câu hỏi phổ biến từ đối tác & doanh nghiệp:</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-1.5 pr-0.5">
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
                  <div key={idx} className="rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-hidden transition-all shadow-2xs">
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
                      <div className="px-3 pb-2.5 text-[11.5px] font-medium leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-2">
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
                  className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
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
