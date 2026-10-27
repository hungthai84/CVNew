'use client';

import React, { useEffect } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('🛡️ [Next.js Error Boundary]', error);
  }, [error]);

  const handleCopy = () => {
    SoundEngine.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${error.name}: ${error.message}\nDigest: ${error.digest || 'none'}\nStack: ${error.stack || ''}`);
      alert('Đã sao chép mã lỗi để gửi AI sửa!');
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 rounded-3xl bg-white/90 dark:bg-slate-900/95 border border-rose-400/40 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <WebIcon name="alert-triangle" className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-black font-play text-slate-900 dark:text-white">
            Instant Hot-Reload Guard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hệ thống đã tự động bắt lỗi và duy trì an toàn giao diện.
          </p>
        </div>
        <div className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left">
          <p className="text-xs font-mono text-rose-600 dark:text-rose-300 break-words">
            {error.message || 'Lỗi Runtime không mong muốn.'}
          </p>
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              SoundEngine.playTap();
              reset();
            }}
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
          >
            Thử Lại (Reset)
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            Chép Mã Lỗi
          </button>
        </div>
      </div>
    </div>
  );
}
