'use client';

import React from 'react';
import { WebIcon } from '@/components/ui/WebIcon';

interface ProjectArticleRendererProps {
  content: string;
  englishTitle?: string;
}

export const ProjectArticleRenderer: React.FC<ProjectArticleRendererProps> = ({
  content,
  englishTitle,
}) => {
  // Parse markdown content line by line into structured blocks
  const lines = content.split('\n');

  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let keyIndex = 0;

  const flushTable = () => {
    if (inTable && tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${keyIndex++}`} className="my-4 overflow-x-auto rounded-2xl border border-blue-200/80 dark:border-white/10 shadow-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-blue-600/10 dark:bg-blue-950/60 border-b border-blue-200/80 dark:border-white/10">
                {tableHeaders.map((th, hIdx) => (
                  <th key={hIdx} className="p-3 font-black text-blue-900 dark:text-blue-300 font-play">
                    {th.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {tableRows.map((tr, rIdx) => (
                <tr key={rIdx} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition">
                  {tr.map((td, dIdx) => (
                    <td key={dIdx} className={`p-3 text-slate-700 dark:text-slate-300 leading-relaxed ${dIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : ''}`}>
                      {td.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeaders = [];
      tableRows = [];
    }
  };

  const renderInlineFormatted = (text: string) => {
    // Process bold **...**
    const parts = text.split('**');
    return parts.map((part, pIdx) => {
      if (pIdx % 2 === 1) {
        return (
          <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      if (inTable) flushTable();
      continue;
    }

    // Markdown Table
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());

      // Check if separator line (|---|---|)
      if (cells.every((c) => /^[-:]+$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // H1 Heading (# ...)
    if (line.startsWith('# ')) {
      const titleText = line.replace('# ', '').trim();
      elements.push(
        <div key={`h1-${keyIndex++}`} className="mb-2 pb-2 border-b border-slate-200/80 dark:border-white/10">
          <h1 className="text-xl sm:text-2xl font-black font-play text-slate-900 dark:text-white tracking-tight leading-tight">
            {titleText}
          </h1>
        </div>
      );
      continue;
    }

    // English Subtitle (**Customer Service...**)
    if (line.startsWith('**') && line.endsWith('**') && !line.includes(':') && i < 5) {
      const enText = line.slice(2, -2).trim();
      elements.push(
        <div key={`en-${keyIndex++}`} className="mb-2">
          <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 font-mono tracking-wide">
            {enText}
          </span>
        </div>
      );
      continue;
    }

    // Italic Quote (*Xây dựng nền tảng...*)
    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**') && i < 6) {
      const quoteText = line.slice(1, -1).trim();
      elements.push(
        <div key={`quote-${keyIndex++}`} className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 dark:from-slate-800/90 dark:via-blue-950/40 dark:to-slate-800/90 border border-blue-200/70 dark:border-white/10 my-3 text-left shadow-2xs">
          <p className="text-xs sm:text-sm italic font-semibold text-blue-950 dark:text-cyan-200 leading-relaxed font-play">
            “{quoteText}”
          </p>
        </div>
      );
      continue;
    }

    // H2 Section (## 1. Tổng quan...)
    if (line.startsWith('## ')) {
      const h2Text = line.replace('## ', '').trim();
      const numMatch = h2Text.match(/^(\d+)\.\s*(.*)$/);
      const secNum = numMatch ? numMatch[1] : null;
      const secTitle = numMatch ? numMatch[2] : h2Text;

      elements.push(
        <div key={`h2-${keyIndex++}`} className="mt-6 mb-3 pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center gap-2.5">
          {secNum && (
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {secNum}
            </span>
          )}
          <h2 className="text-base sm:text-lg font-black font-play text-slate-900 dark:text-white tracking-tight">
            {secTitle}
          </h2>
        </div>
      );
      continue;
    }

    // H3 Subsection (### 3.1. ... hoặc ### Hạng mục 1: ...)
    if (line.startsWith('### ')) {
      const h3Text = line.replace('### ', '').trim();
      const isHangMuc = h3Text.toLowerCase().includes('hạng mục');

      elements.push(
        <div key={`h3-${keyIndex++}`} className={`mt-4 mb-2 ${isHangMuc ? 'p-2 rounded-lg bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-white/5' : ''}`}>
          <h3 className="text-xs sm:text-sm font-bold text-indigo-700 dark:text-cyan-300 font-play flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <span>{h3Text}</span>
          </h3>
        </div>
      );
      continue;
    }

    // Bullet point (- ...)
    if (line.startsWith('- ')) {
      const itemText = line.replace('- ', '').trim();
      elements.push(
        <div key={`li-${keyIndex++}`} className="flex items-start gap-2.5 my-1 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 mt-2 shrink-0" />
          <div className="flex-1">{renderInlineFormatted(itemText)}</div>
        </div>
      );
      continue;
    }

    // Output result highlight (**Kết quả đầu ra:** ...)
    if (line.startsWith('**Kết quả đầu ra:**')) {
      const outText = line.replace('**Kết quả đầu ra:**', '').trim();
      elements.push(
        <div key={`out-${keyIndex++}`} className="my-2 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 flex items-start gap-2 text-xs">
          <WebIcon name="check-circle" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
            <strong className="font-bold text-emerald-800 dark:text-emerald-300 mr-1">Kết quả đầu ra:</strong>
            <span>{renderInlineFormatted(outText)}</span>
          </div>
        </div>
      );
      continue;
    }

    // Core message highlight (**Thông điệp cốt lõi:** ...)
    if (line.startsWith('**Thông điệp cốt lõi:**')) {
      const coreText = line.replace('**Thông điệp cốt lõi:**', '').trim();
      elements.push(
        <div key={`core-${keyIndex++}`} className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border-2 border-amber-400/80 dark:border-amber-500/40 shadow-sm text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">⭐</span>
            <span className="text-xs font-black uppercase font-mono tracking-wider text-amber-700 dark:text-amber-300">
              Thông điệp cốt lõi
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed font-play">
            {coreText}
          </p>
        </div>
      );
      continue;
    }

    // General Paragraph
    elements.push(
      <p key={`p-${keyIndex++}`} className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal my-2">
        {renderInlineFormatted(line)}
      </p>
    );
  }

  if (inTable) flushTable();

  return (
    <div className="w-full space-y-1 text-left select-text">
      {elements}
    </div>
  );
};
