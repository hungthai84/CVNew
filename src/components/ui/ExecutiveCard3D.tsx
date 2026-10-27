/* Lucian UX/UI Prompt #052 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#052 */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';

export interface ExecutiveCard3DProps {
  className?: string;
  name?: string;
  title?: string;
  phone?: string;
  email?: string;
}

export const ExecutiveCard3D: React.FC<ExecutiveCard3DProps> = ({
  className = '',
  name = 'NGUYỄN HÙNG THÁI',
  title = 'HEAD OF CUSTOMER EXPERIENCE',
  phone = '0908 559 884',
  email = 'hungthai84@gmail.com',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    const root = rootRef.current;
    const card = cardRef.current;
    if (!root || !card) return;

    let ang = 0;
    let sx = 0;
    let start = 0;
    let moved = false;
    let down = false;
    let lastX = 0;
    let vx = 0;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const apply = (a: number) => {
      root.style.setProperty('--ry', `${a}deg`);
      root.style.setProperty('--sh', `${(50 + Math.sin((a * Math.PI) / 180) * 60).toFixed(1)}%`);
    };

    const settle = (a: number) => {
      ang = Math.round(a / 180) * 180;
      apply(ang);
      const back = Math.abs(ang / 180) % 2 === 1;
      setIsFlipped(back);
      card.setAttribute(
        'aria-label',
        `Thẻ danh thiếp điện tử, mặt ${back ? 'sau' : 'trước'}. Nhấp để lật`
      );
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      down = true;
      moved = false;
      sx = lastX = e.clientX;
      start = ang;
      vx = 0;
      card.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        card.classList.add('drag');
      }
      if (!moved) return;
      vx = e.clientX - lastX;
      lastX = e.clientX;
      apply(start + dx * 0.9);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      card.classList.remove('drag');
      if (!moved) return;
      const cur = start + (e.clientX - sx) * 0.9 + vx * 8;
      settle(cur);
    };

    const handleClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        moved = false;
        return;
      }
      settle(ang + 180);
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && !rm) {
        root.style.setProperty('--tilt', '8deg');
      }
    };

    const handlePointerLeave = () => {
      root.style.setProperty('--tilt', '0deg');
    };

    card.addEventListener('pointerdown', handlePointerDown);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerup', handlePointerUp);
    card.addEventListener('pointercancel', handlePointerUp);
    card.addEventListener('click', handleClick);
    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointerleave', handlePointerLeave);

    settle(0);

    return () => {
      card.removeEventListener('pointerdown', handlePointerDown);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerup', handlePointerUp);
      card.removeEventListener('pointercancel', handlePointerUp);
      card.removeEventListener('click', handleClick);
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const handleManualFlip = () => {
    const root = rootRef.current;
    if (!root) return;
    const currentRy = parseFloat(root.style.getPropertyValue('--ry') || '0');
    const target = Math.round(currentRy / 180) * 180 + 180;
    root.style.setProperty('--ry', `${target}deg`);
    root.style.setProperty('--sh', `${(50 + Math.sin((target * Math.PI) / 180) * 60).toFixed(1)}%`);
    setIsFlipped(Math.abs(target / 180) % 2 === 1);
  };

  const handleToggleLock = () => {
    setIsLocked((prev) => !prev);
  };

  return (
    <div
      ref={rootRef}
      className={`ux u052 select-none relative flex flex-col items-center justify-center gap-4 py-2 w-full max-w-[340px] mx-auto ${
        isLocked ? 'is-locked' : ''
      } ${className}`}
      style={
        {
          '--ry': '0deg',
          '--tilt': '0deg',
          '--sh': '50%',
          perspective: '1100px',
        } as React.CSSProperties
      }
    >
      <style jsx global>{`
        /* Lucian UX/UI Prompt #052 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#052 */
        .u052-card {
          position: relative;
          width: 320px;
          max-width: 100%;
          height: 195px;
          border: 0;
          padding: 0;
          background: none;
          border-radius: 20px;
          transform-style: preserve-3d;
          transform: rotateX(var(--tilt)) rotateY(var(--ry));
          transition: transform 0.75s var(--ux-spring);
          cursor: grab;
          touch-action: pan-y;
          color: #fff;
          text-align: left;
        }
        .u052-card.drag {
          transition: none;
          cursor: grabbing;
        }
        .u052-card:focus-visible {
          outline: none;
        }
        .u052-card:focus-visible .u052-f {
          box-shadow: 0 0 0 3px var(--ux-accent), 0 26px 40px -24px rgba(30, 20, 80, 0.55);
        }
        .u052-f {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          overflow: hidden;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          box-shadow: 0 20px 38px -18px rgba(30, 20, 80, 0.55);
          transition: filter 0.6s;
        }
        .u052-front {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 35%, #0284c7 75%, #0d9488 100%);
        }
        .u052-front::before {
          content: '';
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 170, 220, 0.45) 45%,
            rgba(160, 255, 230, 0.45) 52%,
            rgba(170, 190, 255, 0.4) 58%,
            transparent 68%
          );
          transform: translateX(calc(var(--sh) - 50%));
          mix-blend-mode: screen;
          transition: transform 0.75s var(--ux-spring);
        }
        .u052-card.drag .u052-front::before {
          transition: none;
        }
        .u052-front::after {
          content: '';
          position: absolute;
          width: 260px;
          height: 260px;
          right: -90px;
          bottom: -140px;
          border-radius: 50%;
          border: 30px solid rgba(255, 255, 255, 0.08);
        }
        .u052-chip {
          position: absolute;
          left: 20px;
          top: 56px;
          width: 38px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #f7e3a6, #c9a34e);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
        }
        .u052-chip::before {
          content: '';
          position: absolute;
          inset: 6px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .u052-brand {
          position: absolute;
          left: 20px;
          top: 18px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
        .u052-tier {
          position: absolute;
          right: 18px;
          top: 16px;
          height: 22px;
          padding: 0 8px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.08em;
        }
        .u052-num {
          position: absolute;
          left: 20px;
          bottom: 42px;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.12em;
          font-family: monospace;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .u052-name {
          position: absolute;
          left: 20px;
          bottom: 16px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          opacity: 0.95;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }
        .u052-exp {
          position: absolute;
          right: 18px;
          bottom: 16px;
          font-size: 10.5px;
          font-weight: 800;
          opacity: 0.95;
          font-family: monospace;
        }
        .u052-back {
          transform: rotateY(180deg);
          background: linear-gradient(160deg, #090e17 0%, #1e1b4b 60%, #0f172a 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .u052-strip {
          position: absolute;
          left: 0;
          right: 0;
          top: 18px;
          height: 34px;
          background: #020617;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .u052-cvc {
          position: absolute;
          left: 20px;
          right: 20px;
          top: 68px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .u052-cvc i {
          flex: 1;
          height: 26px;
          border-radius: 4px;
          background: repeating-linear-gradient(
            -45deg,
            #ece9f7 0 5px,
            #dcd7ee 5px 10px
          );
        }
        .u052-cvc b {
          height: 26px;
          padding: 0 8px;
          border-radius: 4px;
          display: grid;
          place-items: center;
          background: #fff;
          color: #0f172a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }
        .u052-perk {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 14px;
          display: flex;
          gap: 5px;
        }
        .u052-perk span {
          flex: 1;
          padding: 6px 6px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 9.5px;
          font-weight: 650;
          line-height: 1.25;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
        }
        .u052-perk b {
          display: block;
          font-size: 11.5px;
          font-weight: 850;
          color: #38bdf8;
        }
        .u052-lock {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(10, 10, 20, 0.45);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }
        .u052-lock svg {
          width: 44px;
          height: 44px;
          fill: none;
          stroke: #38bdf8;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 10px #38bdf8);
          transform: scale(0.6);
          transition: transform 0.6s var(--ux-spring);
        }
        .u052.is-locked .u052-f {
          filter: grayscale(1) brightness(0.8);
        }
        .u052.is-locked .u052-lock {
          opacity: 1;
        }
        .u052.is-locked .u052-lock svg {
          transform: none;
        }
        .u052-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
        }
        .u052-b {
          height: 36px;
          padding: 0 14px;
          border: 0;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--ux-surface);
          box-shadow: 0 0 0 1px var(--ux-line), 0 4px 12px rgba(0, 0, 0, 0.05);
          color: var(--ux-ink);
          font-size: 12px;
          font-weight: 750;
          transition: transform 0.35s var(--ux-spring), background-color 0.3s, color 0.3s;
          cursor: pointer;
        }
        .u052-b:hover {
          background: var(--ux-surface-2);
        }
        .u052-b:active {
          transform: scale(0.94);
        }
        .u052-b:focus-visible {
          outline: 2px solid var(--ux-accent);
          outline-offset: 2px;
        }
        .u052-b svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .u052-b[aria-pressed='true'] {
          background: var(--ux-ink);
          color: var(--ux-page);
          box-shadow: none;
        }
      `}</style>

      {/* 3D Physical Card */}
      <button
        ref={cardRef}
        className="u052-card"
        type="button"
        aria-label="Thẻ danh thiếp điện tử, mặt trước. Nhấp để lật"
      >
        {/* FRONT FACE */}
        <span className="u052-f u052-front" aria-hidden="true">
          <span className="u052-brand flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            HÙNG THÁI · C-LEVEL CX
          </span>
          <span className="u052-tier">EXECUTIVE VIP</span>
          <span className="u052-chip" />
          <span className="u052-num">1984 • 2002 • 2024 • 9999</span>
          <span className="u052-name">{name}</span>
          <span className="u052-exp">LIFETIME</span>
          <span className="u052-lock">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
        </span>

        {/* BACK FACE */}
        <span className="u052-f u052-back" aria-hidden="true">
          <span className="u052-strip" />
          <span className="u052-cvc">
            <i />
            <b>VIP 84</b>
          </span>
          <span className="u052-perk">
            <span>
              <b>22+ NĂM</b>Kinh Nghiệm
            </span>
            <span>
              <b>99.4%</b>SLA Cam Kết
            </span>
            <span>
              <b>AI & CX</b>Tự Động Hóa
            </span>
          </span>
          <span className="u052-lock">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
        </span>
      </button>

      {/* Control Action Bar */}
      <div className="u052-bar">
        <button
          className="u052-b u052-flip"
          type="button"
          onClick={handleManualFlip}
          title="Nhấp để lật 180 độ xem mặt trước hoặc mặt sau"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />
          </svg>
          <span>{isFlipped ? 'Xem mặt trước' : 'Lật mặt sau'}</span>
        </button>

        <button
          className="u052-b u052-lk"
          type="button"
          aria-pressed={isLocked}
          onClick={handleToggleLock}
          title={isLocked ? 'Mở khóa thẻ' : 'Khóa thẻ (Hiệu ứng bảo mật)'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span>{isLocked ? 'Mở khóa thẻ' : 'Khóa thẻ'}</span>
        </button>
      </div>
    </div>
  );
};

export default ExecutiveCard3D;
