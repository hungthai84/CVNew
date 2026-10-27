// Lucian UX/UI Prompt #005 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#005
'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';

export interface PaperPlaneSendButtonProps {
  onSend: () => void;
  canSend: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  inputContainerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  triggerRef?: React.MutableRefObject<(() => void) | null>;
}

export const PaperPlaneSendButton: React.FC<PaperPlaneSendButtonProps> = ({
  onSend,
  canSend,
  containerRef,
  inputRef,
  inputContainerRef,
  className = '',
  triggerRef,
}) => {
  const [status, setStatus] = useState<'idle' | 'fly' | 'done' | 'back'>('idle');
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const maskId = useId().replace(/:/g, '') + '-u005-m';

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateRoute = (btnEl: HTMLElement, rootEl: HTMLElement) => {
    const b = btnEl.getBoundingClientRect();
    const r = rootEl.getBoundingClientRect();
    const k = rootEl.offsetWidth / (r.width || 1);
    const x = (b.left - r.left + b.width / 2) * k;
    const y = (b.top - r.top + b.height / 2) * k;

    return (
      'M' + x + ' ' + y +
      ' C' + (x - 30) + ' ' + (y - 60) + ' ' + (x - 150) + ' ' + (y - 70) + ' ' + (x - 150) + ' ' + (y - 140) +
      ' C' + (x - 150) + ' ' + (y - 205) + ' ' + (x - 70) + ' ' + (y - 215) + ' ' + (x - 60) + ' ' + (y - 165) +
      ' C' + (x - 50) + ' ' + (y - 120) + ' ' + (x - 125) + ' ' + (y - 110) + ' ' + (x - 120) + ' ' + (y - 170) +
      ' C' + (x - 115) + ' ' + (y - 235) + ' ' + (x - 10) + ' ' + (y - 280) + ' ' + (x + 90) + ' ' + (y - 330)
    );
  };

  const executeSend = () => {
    if (status === 'fly' || status === 'done') return;

    if (!canSend) {
      if (inputContainerRef?.current) {
        inputContainerRef.current.classList.remove('shake');
        void inputContainerRef.current.offsetWidth;
        inputContainerRef.current.classList.add('shake');
      }
      inputRef?.current?.focus();
      return;
    }

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = isReduced ? 0 : 1400;

    setStatus('fly');
    onSend();

    const rootEl = containerRef.current;
    const btnEl = buttonRef.current;

    if (!isReduced && rootEl && btnEl) {
      const d = calculateRoute(btnEl, rootEl);
      if (trailPathRef.current) {
        trailPathRef.current.setAttribute('d', d);
        trailPathRef.current.style.opacity = '0.75';
      }
      if (maskPathRef.current) {
        maskPathRef.current.setAttribute('d', d);
      }

      // Flying paper plane
      const fp = document.createElement('div');
      fp.className = 'u005-fp';
      fp.innerHTML = `
        <svg viewBox="0 0 28 24">
          <path d="M1 3 27 12 10 13Z" fill="#fff"/>
          <path d="M10 13 27 12 6 22Z" fill="#D8E0FF"/>
          <path d="M10 13 27 12 12.5 17Z" fill="#A3B4FF"/>
          <path d="M1 3 27 12 10 13Z" fill="none" stroke="#7B61FF" stroke-width=".8" stroke-linejoin="round"/>
          <path d="M10 13 27 12 6 22Z" fill="none" stroke="#7B61FF" stroke-width=".8" stroke-linejoin="round"/>
        </svg>
      `;
      rootEl.appendChild(fp);

      const ease = 'cubic-bezier(.45, 0, .3, 1)';
      const canPath = typeof window !== 'undefined' && window.CSS && CSS.supports && CSS.supports('offset-path', 'path("M0 0L1 1")');

      if (canPath && fp.animate) {
        fp.style.offsetPath = `path("${d}")`;
        fp.style.offsetRotate = 'auto';
        fp.animate(
          [
            { offsetDistance: '0%', transform: 'scale(.75)' },
            { offsetDistance: '35%', transform: 'scale(1.25)', offset: 0.35 },
            { offsetDistance: '100%', transform: 'scale(.7)' },
          ],
          { duration: dur, easing: ease, fill: 'forwards' }
        );
      } else if (fp.animate) {
        const p = d.split(/[ MC]+/).filter(Boolean).map(Number);
        fp.animate(
          [
            { transform: `translate(${p[0] - 16}px, ${p[1] - 14}px)` },
            { transform: `translate(${p[p.length - 2] - 16}px, ${p[p.length - 1] - 14}px) rotate(-40deg)` },
          ],
          { duration: dur, easing: ease, fill: 'forwards' }
        );
      }

      if (maskPathRef.current && maskPathRef.current.animate) {
        maskPathRef.current.animate(
          [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
          { duration: dur, easing: ease, fill: 'forwards' }
        );
      }

      setTimeout(() => {
        fp.remove();
        if (trailPathRef.current) trailPathRef.current.style.opacity = '0';
      }, dur + 80);
    }

    setTimeout(() => {
      setStatus('done');
    }, Math.max(0, dur - 100));

    setTimeout(() => {
      setStatus('back');
      setTimeout(() => {
        setStatus('idle');
      }, 600);
    }, isReduced ? 0 : dur + 900);
  };

  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = executeSend;
    }
  });

  const skyOverlay = mounted && containerRef.current ? createPortal(
    <svg className="u005-sky" aria-hidden="true">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-100" y="-100" width="1000" height="1200">
          <path
            ref={maskPathRef}
            className="u005-mk"
            fill="none"
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1 1"
            strokeDashoffset="1"
          />
        </mask>
      </defs>
      <path ref={trailPathRef} className="u005-tr" mask={`url(#${maskId})`} />
    </svg>,
    containerRef.current
  ) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .u005-btn {
          position: relative;
          flex: none;
          width: 38px;
          height: 38px;
          border: 0;
          padding: 0;
          border-radius: 50%;
          background: linear-gradient(140deg, #7B61FF, #3D8BFF);
          box-shadow: 0 6px 14px -6px #4F5BFF;
          display: grid;
          place-items: center;
          transition: transform 0.35s cubic-bezier(0.34, 1.45, 0.64, 1), background 0.35s, box-shadow 0.35s;
          cursor: pointer;
          z-index: 10;
        }
        .u005-btn:active {
          transform: scale(0.9);
        }
        .u005-btn:focus-visible {
          outline: 2px solid #7B61FF;
          outline-offset: 3px;
        }
        .u005-btn.disabled {
          background: #CBD5E1;
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .u005-pl {
          width: 22px;
          height: 20px;
          transform: translate(-1px, 1px) rotate(-18deg);
          transition: transform 0.45s cubic-bezier(0.34, 1.45, 0.64, 1), opacity 0.2s;
          pointer-events: none;
        }
        .u005-btn.fly .u005-pl {
          opacity: 0;
          transform: translate(10px, -10px) rotate(-30deg) scale(0.6);
          transition: none;
        }
        .u005-btn.back .u005-pl {
          animation: u005-back 0.6s cubic-bezier(0.2, 1.2, 0.4, 1) both;
        }
        @keyframes u005-back {
          from {
            opacity: 0;
            transform: translate(-26px, 14px) rotate(10deg) scale(0.7);
          }
        }

        .u005-rg {
          position: absolute;
          inset: -4px;
          width: 46px;
          height: 46px;
          transform: rotate(-90deg);
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .u005-rg circle {
          fill: none;
          stroke: #7B61FF;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 145;
          stroke-dashoffset: 145;
        }
        .u005-btn.fly .u005-rg {
          opacity: 1;
        }
        .u005-btn.fly .u005-rg circle {
          transition: stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.3, 1);
          stroke-dashoffset: 0;
        }

        .u005-ck {
          position: absolute;
          width: 20px;
          height: 20px;
          fill: none;
          stroke: #fff;
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          opacity: 0;
          pointer-events: none;
        }
        .u005-btn.done {
          background: linear-gradient(140deg, #37B24D, #20C997) !important;
          box-shadow: 0 8px 16px -8px #2B8A3E !important;
        }
        .u005-btn.done .u005-ck {
          opacity: 1;
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.35s 0.05s;
        }
        .u005-btn.done .u005-pl {
          opacity: 0;
        }

        .u005-sky {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
          z-index: 45;
        }
        .u005-tr {
          fill: none;
          stroke: #7B61FF;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-dasharray: 2 6;
          opacity: 0.75;
          transition: opacity 0.6s;
        }
        .u005-fp {
          position: absolute;
          left: 0;
          top: 0;
          width: 32px;
          height: 28px;
          margin: 0;
          pointer-events: none;
          filter: drop-shadow(0 6px 8px rgba(60, 40, 160, 0.3));
          z-index: 50;
        }
        .u005-fp svg {
          width: 100%;
          height: 100%;
        }

        .u005-cp.shake {
          animation: u005-sh 0.4s;
        }
        @keyframes u005-sh {
          25% { transform: translateX(-6px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
        }

        .u005-bb.pop {
          animation: u005-pop 0.5s cubic-bezier(0.3, 1.5, 0.5, 1) both;
        }
        @keyframes u005-pop {
          from {
            opacity: 0;
            transform: translate(10px, 18px) scale(0.6);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .u005-btn,
          .u005-pl,
          .u005-rg circle,
          .u005-ck,
          .u005-bb.pop,
          .u005-cp.shake {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}} />

      {skyOverlay}

      <button
        ref={buttonRef}
        type="button"
        onClick={executeSend}
        disabled={!canSend && (status === 'fly' || status === 'done')}
        title="Gửi tin nhắn"
        aria-label="Send message"
        className={`u005-btn ${status !== 'idle' ? status : ''} ${!canSend && status === 'idle' ? 'disabled' : ''} ${className}`}
      >
        {/* Progress Ring */}
        <svg className="u005-rg" viewBox="0 0 50 50" aria-hidden="true">
          <circle cx="25" cy="25" r="23" />
        </svg>

        {/* Paper Plane in Button */}
        <svg className="u005-pl" viewBox="0 0 28 24" aria-hidden="true">
          <path d="M1 3 27 12 10 13Z" fill="#fff" />
          <path d="M10 13 27 12 6 22Z" fill="#D8E0FF" />
          <path d="M10 13 27 12 12.5 17Z" fill="#A3B4FF" />
        </svg>

        {/* Checkmark Icon */}
        <svg className="u005-ck" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10.5 8.3 14.5 16 6" />
        </svg>
      </button>
    </>
  );
};
