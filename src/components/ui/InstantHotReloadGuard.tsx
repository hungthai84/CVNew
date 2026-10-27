'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isMinimized: boolean;
}

export class InstantHotReloadGuard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isMinimized: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('🛡️ [Instant Hot-Reload Guard] Phát hiện lỗi Runtime:', error, errorInfo);
  }

  componentDidMount() {
    // Lắng nghe lỗi unhandled rejection từ window
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.warn('🛡️ [Instant Hot-Reload Guard] Bắt promise rejection:', event.reason);
  };

  handleHotRecover = () => {
    SoundEngine.playTap();
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isMinimized: false,
    });
  };

  handleReload = () => {
    SoundEngine.playTap();
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  handleCopyError = () => {
    SoundEngine.playTap();
    const errorDetails = `Lỗi: ${this.state.error?.message || 'Unknown'}\nStack: ${this.state.error?.stack || ''}\nComponentStack: ${this.state.errorInfo?.componentStack || ''}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(errorDetails);
      alert('Đã sao chép chi tiết mã lỗi vào bộ nhớ tạm!');
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.state.isMinimized) {
        // Trạng thái thu gọn thành Badge nhỏ góc dưới bên trái để không chặn màn hình
        return (
          <>
            {this.props.children}
            <div className="fixed bottom-4 left-4 z-[99999] animate-bounce">
              <button
                type="button"
                onClick={() => this.setState({ isMinimized: false })}
                className="px-3 py-1.5 rounded-full bg-rose-600/90 text-white font-bold text-xs shadow-lg border border-rose-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                <span>Hot-Reload Guard: 1 lỗi đã bắt</span>
              </button>
            </div>
          </>
        );
      }

      return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md font-play select-none">
          <div className="w-full max-w-lg rounded-3xl p-6 bg-white/95 dark:bg-[#121624]/95 border border-rose-500/40 shadow-[0_24px_60px_rgba(244,63,94,0.25)] backdrop-blur-2xl text-slate-800 dark:text-slate-100 flex flex-col gap-4 animate-scaleUp">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-md">
                  <WebIcon name="alert-triangle" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Instant Hot-Reload Guard
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Đã bảo vệ phiên làm việc và ngăn chặn sập màn hình
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => this.setState({ isMinimized: true })}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer transition"
                title="Thu nhỏ để tiếp tục xem trang"
              >
                Thu nhỏ ⤓
              </button>
            </div>

            {/* Thông điệp lỗi */}
            <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wide">
                Chi tiết sự cố Runtime:
              </span>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200 break-words max-h-24 overflow-y-auto">
                {this.state.error?.message || 'Lỗi không xác định trong quá trình render component.'}
              </p>
            </div>

            {/* Hành động khôi phục tức thì */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={this.handleHotRecover}
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <WebIcon name="refresh-cw" className="w-3.5 h-3.5" />
                <span>Khôi Phục Ngay (Hot Reset)</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <WebIcon name="rotate-ccw" className="w-3.5 h-3.5" />
                <span>Tải Lại Trang (Reload)</span>
              </button>
            </div>

            {/* Sao chép mã lỗi & Hướng dẫn */}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={this.handleCopyError}
                className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <WebIcon name="copy" className="w-3 h-3" />
                <span>Sao chép Stack Trace để gửi AI sửa</span>
              </button>
              <span className="text-slate-400 text-[10px] font-mono">Status: Protected</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
