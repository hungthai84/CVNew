/* Lucian UX/UI Prompt #228 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#228 */

'use client';

import React, { useEffect, useRef } from 'react';
import { Zap, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';
import { formatCardTitle } from '@/lib/utils';

export interface GlowingCardItem {
  id: string;
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}

export interface LucianGlowingCardGridProps {
  className?: string;
  cards?: GlowingCardItem[];
}

const DEFAULT_CARDS: GlowingCardItem[] = [
  {
    id: 'ops',
    title: 'Vận Hành Xuất Sắc',
    desc: 'Tối ưu quy trình & vận hành liên tục chuẩn quốc tế.',
    color: '#8B5CF6', // Violet
    icon: <Zap className="w-4 h-4 text-[#8B5CF6]" />,
  },
  {
    id: 'data',
    title: 'Dữ Liệu Trực Quan',
    desc: 'Hệ thống báo cáo KPI & phân tích dữ liệu thời gian thực.',
    color: '#06B6D4', // Cyan
    icon: <BarChart3 className="w-4 h-4 text-[#06B6D4]" />,
  },
  {
    id: 'security',
    title: 'Bảo Mật Hệ Thống',
    desc: 'Kiểm soát tuân thủ & bảo mật thông tin đa tầng vững chắc.',
    color: '#10B981', // Emerald
    icon: <ShieldCheck className="w-4 h-4 text-[#10B981]" />,
  },
  {
    id: 'growth',
    title: 'Tăng Trưởng Bền Vững',
    desc: 'Định hình chiến lược phát triển dài hạn & mở rộng quy mô.',
    color: '#F59E0B', // Amber
    icon: <TrendingUp className="w-4 h-4 text-[#F59E0B]" />,
  },
];

export const LucianGlowingCardGrid: React.FC<LucianGlowingCardGridProps> = ({
  className = '',
  cards = DEFAULT_CARDS,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let p = { x: -500, y: -500 };
    let o = 0;
    let oT = 0;
    let raf = 0;
    let last = 0;

    const apply = () => {
      const rb = root.getBoundingClientRect();
      const k = root.offsetWidth / (rb.width || 1);

      cardsRef.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const lx = p.x - (r.left - rb.left) * k;
        const ly = p.y - (r.top - rb.top) * k;

        el.style.setProperty('--cx', `${lx.toFixed(1)}px`);
        el.style.setProperty('--cy', `${ly.toFixed(1)}px`);
        el.style.setProperty('--o', o.toFixed(3));

        const inner = el.firstElementChild as HTMLElement;
        if (inner) {
          inner.style.setProperty('--cx', `${(lx - 1.5).toFixed(1)}px`);
          inner.style.setProperty('--cy', `${(ly - 1.5).toFixed(1)}px`);
        }
      });
    };

    const frame = (now: number) => {
      raf = 0;
      if (!root.isConnected) return;
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      o += (oT - o) * (rm ? 1 : Math.min(1, dt * (oT ? 8 : 2.5)));
      apply();
      if (Math.abs(oT - o) > 0.005) {
        raf = requestAnimationFrame(frame);
      }
    };

    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const b = root.getBoundingClientRect();
      const k = root.offsetWidth / (b.width || 1);
      p = {
        x: (e.clientX - b.left) * k,
        y: (e.clientY - b.top) * k,
      };
      oT = 1;
      apply();
      kick();
    };

    const handlePointerLeave = () => {
      oT = 0;
      kick();
    };

    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerleave', handlePointerLeave);
    apply();

    return () => {
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cards]);

  return (
    <div
      ref={rootRef}
      className={`ux u228 select-none ${className}`}
      role="region"
      aria-label="Lưới thẻ năng lực phát sáng theo con trỏ chuột"
    >
      <div className="u228-gd" role="list" aria-label="Bốn trụ cột năng lực cốt lõi">
        {cards.map((card, index) => {
          const formattedTitle = formatCardTitle(card.title);
          return (
            <div
              key={card.id || index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="u228-c"
              role="listitem"
            >
              <div className="u228-in">
                <span
                  className="u228-ic"
                  style={{
                    backgroundColor: `${card.color}15`,
                    boxShadow: `inset 0 0 0 1px ${card.color}35`,
                  }}
                >
                  {card.icon}
                </span>
                <b style={{ color: card.color }}>{formattedTitle}</b>
                <span>{card.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
