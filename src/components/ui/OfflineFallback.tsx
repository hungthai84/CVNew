'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, Phone, Mail, RotateCw, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SoundEngine } from './SoundEngine';

export const OfflineFallback: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Kiểm tra trạng thái mạng ban đầu
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      setIsDismissed(false);
      SoundEngine.playTap();
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnectedToast(true);
      SoundEngine.playSuccess();
      const timer = setTimeout(() => {
        setShowReconnectedToast(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleRetryConnection = () => {
    SoundEngine.playTap();
    if (typeof window !== 'undefined' && navigator.onLine) {
      setIsOffline(false);
      setShowReconnectedToast(true);
      setTimeout(() => setShowReconnectedToast(false), 3000);
    } else {
      // Hiệu ứng lắc nhẹ nếu vẫn offline
      setIsDismissed(false);
    }
  };

  return (
    <>
      {/* Toast thông báo khi kết nối mạng được phục hồi */}
      <AnimatePresence>
        {showReconnectedToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-emerald-600/95 text-white border border-emerald-400/50 shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold pointer-events-auto"
          >
            <Wifi className="w-4 h-4 text-emerald-200 animate-pulse" />
            <span>Đã khôi phục kết nối Internet thành công!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner / Modal Chế độ Ngoại Tuyến (Offline Mode) */}
      <AnimatePresence>
        {isOffline && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[99] rounded-2xl p-4 sm:p-5 bg-slate-900/95 dark:bg-slate-950/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header: Cảnh báo ngoại tuyến */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black font-play text-white">Chế Độ Ngoại Tuyến (Offline)</h4>
                  <p className="text-[11px] text-slate-300">Mất kết nối Internet tạm thời</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Ẩn thông báo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nội dung thông báo & cam kết bảo toàn */}
            <div className="py-3 space-y-2 text-xs text-slate-200 leading-relaxed">
              <p>
                Toàn bộ dữ liệu hồ sơ năng lực và các trang bạn đã tải đều được lưu trữ an toàn trong bộ nhớ thiết bị.
              </p>
              
              {/* Thông tin liên hệ nhanh trực tiếp */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Liên hệ trực tiếp Quản lý CSKH:</span>
                </div>
                <div className="text-[11.5px] font-semibold text-white">Nguyễn Hùng Thái</div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-cyan-400" />
                    <span>trinhan.virtual@gmail.com</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">2026+ Ready</span>
                </div>
              </div>
            </div>

            {/* Footer hành động: Nút thử kết nối lại */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleRetryConnection}
                className="flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-md cursor-pointer active:scale-98"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Thử kết nối lại</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                Tiếp tục xem
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
