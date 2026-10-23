'use client';

import React, { useState, useEffect } from 'react';
import { SiteTheme } from '@/types';

export interface ClockProps {
  isLight?: boolean;
  currentTheme?: SiteTheme;
}

export const Clock: React.FC<ClockProps> = ({ isLight = true, currentTheme = 'light-glass' }) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="flex items-center text-xs font-mono text-slate-400">
        --:--
      </div>
    );
  }

  const hour24 = time.getHours();
  const minute = time.getMinutes();
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const hourStr = hour12 < 10 ? '0' + hour12 : '' + hour12;
  const minStr = minute < 10 ? '0' + minute : '' + minute;
  const meridiem = hour24 >= 12 ? 'pm' : 'am';

  // Day of week in Vietnamese
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const dayOfWeek = days[time.getDay()];
  const dateStr = `${time.getDate() < 10 ? '0' + time.getDate() : time.getDate()}/${
    time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  }`;

  return (
    <div className="relative z-10 flex items-center gap-2 select-none shrink-0 scale-[0.40] sm:scale-[0.48] origin-left -my-10">
      <style jsx>{`
        .clock-wrap {
          width: 210px;
          margin: 0 auto;
          padding: 4px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 8px;
          box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .min-wrap,
        .hour-wrap {
          width: 95px;
          height: 95px;
          display: inline-block;
          position: relative;
        }
        .digit-top,
        .digit-bottom {
          width: 95px;
          height: 46px;
          position: absolute;
        }
        .clock-wrap .front,
        .clock-wrap .back {
          width: 95px;
          height: 46px;
          position: absolute;
          overflow: hidden;
          color: #fff;
          text-align: center;
          font-size: 72px;
          font-weight: 700;
          line-height: 92px;
          text-shadow: 1px 1px 1px #000;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
          transition: transform 600ms ease;
          background-image: linear-gradient(to top, #111111 0%, #222222 100%);
        }
        .clock-wrap .front {
          z-index: 30;
          border-radius: 4px 4px 0px 0px;
          transform-origin: 0px 46px;
        }
        .clock-wrap .back {
          z-index: 20;
          top: 47px;
          border-radius: 0px 0px 4px 4px;
          transform-origin: 0px 0px;
          transform: rotateX(180deg);
        }
        .digit-top {
          border-radius: 4px 4px 1px 1px;
          top: 2px;
          z-index: 10;
        }
        .digit-bottom {
          top: 49px;
          background-color: #222;
          border-radius: 1px 1px 4px 4px;
          z-index: 5;
        }
        .digit-bottom .front {
          border-radius: 0px 0px 4px 4px;
          line-height: 0px;
        }
        .meridiem {
          font-size: 14px;
          position: absolute;
          left: 8px;
          top: 12px;
          line-height: 1;
        }
      `}</style>

      <div className="clock-wrap">
        {/* Hour Wrap */}
        <div className="hour-wrap">
          <div className="digit-top">
            <div className="front">{hourStr}</div>
          </div>
          <div className="digit-bottom">
            <div className="front">
              {hourStr}
              <div className="meridiem">{meridiem}</div>
            </div>
          </div>
        </div>

        {/* Min Wrap */}
        <div className="min-wrap">
          <div className="digit-top">
            <div className="front">{minStr}</div>
          </div>
          <div className="digit-bottom">
            <div className="front">{minStr}</div>
          </div>
        </div>
      </div>

      {/* Day & Date info */}
      <div className={`hidden lg:flex flex-col items-start leading-tight pl-2 border-l ${
        currentTheme === 'dark-neon'
          ? 'border-cyan-500/40 text-cyan-300'
          : isLight
          ? 'border-slate-300 text-slate-900'
          : 'border-white/30 text-white'
      }`}>
        <span className="text-[11px] font-black">{dayOfWeek}</span>
        <span className="text-[10px] font-extrabold opacity-85">{dateStr}</span>
      </div>
    </div>
  );
};
