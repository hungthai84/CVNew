'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';

interface NetworkDebugModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkDebugModal: React.FC<NetworkDebugModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [networkUrl, setNetworkUrl] = useState<string>('');
  const [localUrl, setLocalUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hostname = window.location.hostname;
    const port = window.location.port || '3001';
    const protocol = window.location.protocol;

    const currentUrl = `${protocol}//${hostname}:${port}`;
    setLocalUrl(`http://localhost:${port}`);
    setNetworkUrl(currentUrl);

    QRCode.toDataURL(currentUrl, {
      width: 260,
      margin: 1.5,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    SoundEngine.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(networkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-sm rounded-3xl p-6 bg-white/90 dark:bg-slate-900/95 border border-white/80 dark:border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl text-slate-800 dark:text-slate-100 flex flex-col items-center gap-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          type="button"
          onClick={() => {
            SoundEngine.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-500 hover:text-rose-600 dark:text-slate-400 flex items-center justify-center transition cursor-pointer"
        >
          ✕
        </button>

        {/* Tiêu đề & Huy hiệu */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/60 border border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Mạng Cục Bộ (Local Wi-Fi)</span>
          </div>
          <h3 className="text-base font-black font-play text-slate-900 dark:text-white mt-1">
            Quét Mã QR Xem Trên Điện Thoại
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[260px]">
            Mở camera điện thoại cùng mạng Wi-Fi để xem giao diện Responsive tức thì.
          </p>
        </div>

        {/* Khung QR Code */}
        <div className="p-3 bg-white rounded-2xl shadow-lg border border-slate-200/80 flex items-center justify-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Network Debug QR" className="w-48 h-48 rounded-lg" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
              Đang tạo mã QR...
            </div>
          )}
        </div>

        {/* Thông tin URL & Nút Copy */}
        <div className="w-full flex flex-col gap-2">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2">
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Địa chỉ thiết bị:
              </span>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-300 truncate">
                {networkUrl}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 hover:bg-blue-50 text-slate-700 dark:text-slate-200 shadow-2xs border border-slate-200 dark:border-slate-600 transition cursor-pointer shrink-0 flex items-center gap-1"
            >
              <WebIcon name={copied ? 'check' : 'copy'} className="w-3.5 h-3.5" />
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Nút đóng hoàn tất */}
        <button
          type="button"
          onClick={() => {
            SoundEngine.playTap();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md transition cursor-pointer text-center"
        >
          Xong & Đóng Cửa Sổ
        </button>
      </div>
    </div>
  );
};
