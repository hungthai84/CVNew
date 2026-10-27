// Lucian UX/UI Prompt #044 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#044
'use client';

import React, { useState } from 'react';

export interface LucianAccordionItem {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
}

export interface LucianAccordionProps {
  items: LucianAccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
  onSelectAction?: (item: LucianAccordionItem, index: number) => void;
}

export const LucianAccordion: React.FC<LucianAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  className = '',
  onSelectAction,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % items.length;
      document.getElementById(`lucian-faq-btn-${next}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      document.getElementById(`lucian-faq-btn-${prev}`)?.focus();
    }
  };

  return (
    <div className={`ux flex flex-col gap-2 w-full ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const numStr = i < 9 ? `0${i + 1}` : `${i + 1}`;

        return (
          <div
            key={i}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? 'bg-white/95 dark:bg-slate-800/95 border-indigo-300 dark:border-indigo-500/50 shadow-md -translate-y-0.5'
                : 'bg-white/70 dark:bg-slate-900/60 border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            <button
              id={`lucian-faq-btn-${i}`}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`lucian-faq-ans-${i}`}
              onClick={() => toggle(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className={`text-[11px] font-mono font-black shrink-0 transition-colors ${
                    isOpen
                      ? 'text-indigo-600 dark:text-cyan-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {numStr}
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-100 font-play leading-snug truncate">
                  {item.question}
                </span>
              </div>

              {/* Plus-Minus Spring Indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative ${
                  isOpen
                    ? 'bg-indigo-600 dark:bg-cyan-500 text-white scale-105 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110'
                }`}
                aria-hidden="true"
              >
                <div
                  className={`w-2.5 h-[1.8px] rounded-full transition-transform duration-300 ${
                    isOpen ? 'bg-white' : 'bg-current'
                  }`}
                />
                <div
                  className={`w-2.5 h-[1.8px] rounded-full absolute transition-transform duration-300 ${
                    isOpen ? 'rotate-180 opacity-0 bg-white' : 'rotate-90 opacity-100 bg-current'
                  }`}
                />
              </div>
            </button>

            {/* Answer region with smooth accordion expansion */}
            <div
              id={`lucian-faq-ans-${i}`}
              role="region"
              aria-labelledby={`lucian-faq-btn-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-3.5 pb-3 pt-0.5 pl-9 sm:pl-10 text-[11px] sm:text-[12px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium border-t border-slate-100 dark:border-white/5 mt-1">
                  <p>{item.answer}</p>
                  {item.linkText && (
                    <button
                      type="button"
                      onClick={() => onSelectAction && onSelectAction(item, i)}
                      className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-bold text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer"
                    >
                      <span>{item.linkText}</span>
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
