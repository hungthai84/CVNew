// Lucian UX/UI Prompt #333 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#333
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface SlideToCancelVoiceRecorderProps {
  onSendVoice: (durationStr: string, bars: number[], transcription?: string) => void;
  onCancel?: () => void;
  isInputEmpty: boolean;
  disabled?: boolean;
}

export const SlideToCancelVoiceRecorder: React.FC<SlideToCancelVoiceRecorderProps> = ({
  onSendVoice,
  onCancel,
  isInputEmpty,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLButtonElement>(null);
  const tmRef = useRef<HTMLSpanElement>(null);
  const wvRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLSpanElement>(null);
  const lidRef = useRef<SVGGElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false);

  const recStateRef = useRef({
    rec: false,
    t0: 0,
    sx: 0,
    k: 1,
    lv: 0,
    bars: [] as number[],
    canceled: false,
    transcription: '',
  });

  const ivRef = useRef<NodeJS.Timeout | null>(null);
  const ttRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const fmt = (s: number) => {
    const total = Math.floor(s);
    const m = Math.floor(total / 60);
    const sec = String(total % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const startRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event: any) => {
          let text = '';
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }
          recStateRef.current.transcription = text;
        };
        recognition.onerror = () => {};
        recognition.start();
        recognitionRef.current = recognition;
      } catch {
        // Ignore speech recognition errors
      }
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
      recognitionRef.current = null;
    }
  };

  const start = useCallback(
    (clientX: number) => {
      if (disabled) return;
      const root = containerRef.current;
      const mic = micRef.current;
      const wv = wvRef.current;
      const tm = tmRef.current;
      if (!root || !mic || !wv || !tm) return;

      SoundEngine.playTap();

      const st = recStateRef.current;
      st.rec = true;
      st.canceled = false;
      st.t0 = performance.now();
      st.bars = [];
      st.transcription = '';
      st.lv = 0;

      wv.innerHTML = '';
      tm.textContent = '0:00';

      const r = root.getBoundingClientRect();
      st.k = root.offsetWidth / (r.width || 1);
      st.sx = clientX;

      setIsRecording(true);
      root.classList.add('is-rec');
      root.style.setProperty('--dx', '0px');
      root.style.setProperty('--o', '1');

      startRecognition();

      if (ivRef.current) clearInterval(ivRef.current);
      ivRef.current = setInterval(() => {
        if (!st.rec) return;
        const elapsed = (performance.now() - st.t0) / 1000;
        tm.textContent = fmt(elapsed);

        // Sound waveform variation curve
        st.lv +=
          ((0.25 + Math.random() * 0.75) * (Math.sin(elapsed * 5) * 0.3 + 0.7) - st.lv) * 0.5;
        mic.style.setProperty('--lv', st.lv.toFixed(2));

        const bar = document.createElement('b');
        bar.style.height = `${Math.max(3, st.lv * 26).toFixed(0)}px`;
        wv.appendChild(bar);
        st.bars.push(st.lv);

        if (wv.children.length > 50) {
          wv.removeChild(wv.firstChild as Node);
        }
      }, 70);
    },
    [disabled]
  );

  const stop = useCallback(
    (send: boolean) => {
      const st = recStateRef.current;
      if (!st.rec) return;
      st.rec = false;

      if (ivRef.current) clearInterval(ivRef.current);
      stopRecognition();

      const root = containerRef.current;
      if (root) {
        root.classList.remove('is-rec');
        root.style.setProperty('--dx', '0px');
      }
      setIsRecording(false);

      const dur = (performance.now() - st.t0) / 1000;
      if (send && dur > 0.4) {
        SoundEngine.playPop();
        const durationStr = fmt(dur);
        const barsCopy = [...st.bars];
        const transcript = st.transcription.trim();
        onSendVoice(durationStr, barsCopy, transcript);
      }
    },
    [onSendVoice]
  );

  const cancel = useCallback(() => {
    const st = recStateRef.current;
    if (st.canceled) return;
    st.canceled = true;

    stop(false);
    setIsTrashActive(true);

    const root = containerRef.current;
    const trash = trashRef.current;
    const lid = lidRef.current;
    const blob = blobRef.current;

    if (root) root.classList.add('is-trash');
    if (ttRef.current) clearTimeout(ttRef.current);

    const rm =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const D = rm ? 0 : 1300;

    if (!rm && trash && lid && blob && trash.animate) {
      trash.animate(
        [
          { opacity: 0, transform: 'translateY(26px)' },
          { opacity: 1, transform: 'none', offset: 0.18 },
          { opacity: 1, transform: 'none', offset: 0.6 },
          { opacity: 1, transform: 'rotate(-8deg)', offset: 0.65 },
          { opacity: 1, transform: 'rotate(7deg)', offset: 0.71 },
          { opacity: 1, transform: 'rotate(-3deg)', offset: 0.77 },
          { opacity: 1, transform: 'none', offset: 0.84 },
          { opacity: 0, transform: 'translateY(26px)' },
        ],
        { duration: D, easing: 'ease-out' }
      );

      lid.animate(
        [
          { transform: 'none' },
          { transform: 'none', offset: 0.1 },
          { transform: 'rotate(-40deg)', offset: 0.24 },
          { transform: 'rotate(-40deg)', offset: 0.52 },
          { transform: 'rotate(5deg)', offset: 0.58 },
          { transform: 'none', offset: 0.63 },
          { transform: 'none' },
        ],
        { duration: D }
      );

      blob.animate(
        [
          { opacity: 0, transform: 'translate(130px,0) scale(1.2)' },
          { opacity: 1, transform: 'translate(118px,-14px) scale(1.15) rotate(-8deg)', offset: 0.12 },
          { opacity: 1, transform: 'translate(64px,-52px) scale(.95) rotate(-20deg)', offset: 0.5 },
          { opacity: 1, transform: 'translate(1px,-14px) scale(.6) rotate(-35deg)', offset: 0.86 },
          { opacity: 0, transform: 'translate(1px,2px) scale(.3) rotate(-40deg)' },
        ],
        { duration: 620, delay: 140, easing: 'cubic-bezier(.3,0,.6,1)' }
      );
    }

    if (onCancel) onCancel();

    ttRef.current = setTimeout(() => {
      if (root) root.classList.remove('is-trash');
      setIsTrashActive(false);
    }, D);
  }, [stop, onCancel]);

  useEffect(() => {
    return () => {
      if (ivRef.current) clearInterval(ivRef.current);
      if (ttRef.current) clearTimeout(ttRef.current);
      stopRecognition();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    start(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const st = recStateRef.current;
    if (!st.rec) return;
    const dx = Math.min(0, (e.clientX - st.sx) * st.k);
    const root = containerRef.current;
    if (root) {
      root.style.setProperty('--dx', `${Math.max(-120, dx).toFixed(0)}px`);
      root.style.setProperty('--o', `${Math.max(0, 1 + dx / 90).toFixed(2)}`);
    }
    if (dx < -100) {
      cancel();
    }
  };

  const handlePointerUp = () => {
    stop(true);
  };

  const handlePointerCancel = () => {
    stop(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !recStateRef.current.rec && !e.repeat) {
      e.preventDefault();
      start(0);
    }
    if (e.key === 'Escape' && recStateRef.current.rec) {
      cancel();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      stop(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`u333-recorder-wrapper ${isRecording ? 'is-rec' : ''} ${
        isTrashActive ? 'is-trash' : ''
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .u333-recorder-wrapper {
          --ux-page: #F4F2EE;
          --ux-surface: #FFFFFF;
          --ux-surface-2: #F5F3EF;
          --ux-surface-3: #EAE7E1;
          --ux-ink: #16151B;
          --ux-ink-2: #57535F;
          --ux-ink-3: #8E8A97;
          --ux-line: rgba(22,21,27,.09);
          --ux-line-2: rgba(22,21,27,.17);
          --ux-accent: #6A57F2;
          --ux-accent-2: #2F8FE0;
          --ux-accent-soft: rgba(106,87,242,.12);
          --ux-accent-ink: #FFFFFF;
          --ux-mint: #119C72;
          --ux-warn: #D6731E;
          --ux-danger: #D93A55;
          --ux-glass: rgba(255,255,255,.58);
          --ux-glass-line: rgba(255,255,255,.85);
          --ux-shadow: rgba(40,30,80,.14);
          --ux-shadow-strong: rgba(40,30,80,.3);
          --ux-grad: linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A);
          --ux-ease: cubic-bezier(.2,.8,.2,1);
          --ux-spring: cubic-bezier(.34,1.45,.64,1);
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
        }

        .dark .u333-recorder-wrapper,
        [data-theme="dark"] .u333-recorder-wrapper,
        [data-theme="dark-neon"] .u333-recorder-wrapper {
          --ux-page: #07080D;
          --ux-surface: #13141C;
          --ux-surface-2: #1A1B25;
          --ux-surface-3: #252632;
          --ux-ink: #F4F0E8;
          --ux-ink-2: rgba(244,240,232,.68);
          --ux-ink-3: rgba(244,240,232,.42);
          --ux-line: rgba(255,255,255,.08);
          --ux-line-2: rgba(255,255,255,.16);
          --ux-accent: #8B5CF6;
          --ux-accent-2: #7DB4FF;
          --ux-accent-soft: rgba(183,164,255,.15);
          --ux-accent-ink: #FFFFFF;
          --ux-mint: #7EE8C0;
          --ux-warn: #FFB26B;
          --ux-danger: #FF7D8C;
          --ux-glass: rgba(255,255,255,.07);
          --ux-glass-line: rgba(255,255,255,.18);
          --ux-shadow: rgba(0,0,0,.45);
          --ux-shadow-strong: rgba(0,0,0,.72);
          --ux-grad: linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3);
        }

        .u333-rec-overlay {
          position: absolute;
          left: 0;
          right: 50px;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          border-radius: 9999px;
          background: var(--ux-surface-2);
          opacity: 0;
          pointer-events: none;
          transition: opacity .25s var(--ux-ease);
          z-index: 20;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.06);
        }
        .u333-recorder-wrapper.is-rec .u333-rec-overlay {
          opacity: 1;
          pointer-events: auto;
        }

        .u333-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ux-danger);
          animation: u333-blink 1s steps(2) infinite;
          flex-shrink: 0;
        }
        @keyframes u333-blink {
          50% { opacity: .25; }
        }

        .u333-tm {
          font: 700 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
          color: var(--ux-ink);
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
        }

        .u333-wv {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2px;
          height: 24px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 30%);
          mask-image: linear-gradient(90deg, transparent, #000 30%);
        }
        .u333-wv b {
          flex: none;
          width: 3px;
          border-radius: 2px;
          background: var(--ux-ink-2);
        }

        .u333-cx {
          position: absolute;
          right: 54px;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 750;
          color: var(--ux-ink-3);
          opacity: 0;
          pointer-events: none;
          transition: opacity .2s;
          z-index: 25;
          white-space: nowrap;
        }
        .u333-recorder-wrapper.is-rec .u333-cx {
          opacity: var(--o, 1);
        }

        .u333-trash {
          position: absolute;
          left: 10px;
          top: 50%;
          width: 24px;
          height: 26px;
          margin-top: -13px;
          opacity: 0;
          pointer-events: none;
          transform-origin: 50% 100%;
          z-index: 30;
        }
        .u333-trash svg {
          width: 100%;
          height: 100%;
          fill: none;
          stroke: var(--ux-danger);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          overflow: visible;
        }
        .u333-trash .bd {
          fill: color-mix(in srgb, var(--ux-danger) 15%, transparent);
        }
        .u333-trash .lid {
          transform-box: view-box;
          transform-origin: 3.5px 8px;
        }

        .u333-bl {
          position: absolute;
          left: 11px;
          top: 50%;
          width: 24px;
          height: 12px;
          margin-top: -6px;
          border-radius: 6px;
          background: repeating-linear-gradient(90deg, transparent 0 3px, rgba(255,255,255,.9) 3px 5px) 2px 2px/20px 8px no-repeat, var(--ux-danger);
          box-shadow: 0 4px 10px -3px color-mix(in srgb, var(--ux-danger) 60%, transparent);
          opacity: 0;
          pointer-events: none;
          z-index: 31;
        }

        .u333-mic {
          position: relative;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: #ffffff;
          touch-action: none;
          cursor: pointer;
          transition: transform .35s var(--ux-spring), background-color .3s;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
          flex-shrink: 0;
          z-index: 26;
        }
        .u333-mic:hover {
          filter: brightness(1.08);
          transform: scale(1.04);
        }
        .u333-mic svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }
        .u333-recorder-wrapper.is-rec .u333-mic {
          transform: translateX(var(--dx, 0px)) scale(1.3);
          background: var(--ux-danger);
          transition: background-color .3s;
          box-shadow: 0 4px 16px rgba(217, 58, 85, 0.45);
        }
        .u333-mic::before {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: var(--ux-danger);
          opacity: 0;
          transform: scale(calc(.9 + var(--lv, 0) * .5));
          pointer-events: none;
        }
        .u333-recorder-wrapper.is-rec .u333-mic::before {
          opacity: .25;
        }

        @media (prefers-reduced-motion: reduce) {
          .u333-recorder-wrapper,
          .u333-recorder-wrapper * {
            animation-duration: .001ms !important;
            transition-duration: .001ms !important;
          }
        }
      `,
        }}
      />

      {/* Recording Overlay Bar */}
      <div className="u333-rec-overlay" aria-hidden={!isRecording}>
        <i className="u333-dot" />
        <span ref={tmRef} className="u333-tm">
          0:00
        </span>
        <div ref={wvRef} className="u333-wv" />
      </div>

      {/* Cancel Instruction Hint */}
      <span className="u333-cx" aria-hidden="true">
        ‹ Trượt sang trái để hủy
      </span>

      {/* Animated Trash Can */}
      <span ref={trashRef} className="u333-trash" aria-hidden="true">
        <svg viewBox="0 0 28 30">
          <path className="bd" d="M6 11h16l-1.3 14.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8z" />
          <path d="M11.5 15v8M16.5 15v8" />
          <g ref={lidRef} className="lid">
            <path d="M3.5 8h21M10.5 8V5.8a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1V8" />
          </g>
        </svg>
      </span>

      {/* Red Recording Flying Blob */}
      <span ref={blobRef} className="u333-bl" aria-hidden="true" />

      {/* Mic Trigger Button */}
      <button
        ref={micRef}
        type="button"
        className="u333-mic"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-label="Giữ nút mic để nói, thả ra để gửi, trượt sang trái để hủy"
        title="Nhấn giữ để ghi âm thoại, trượt sang trái để hủy"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
        </svg>
      </button>
    </div>
  );
};
