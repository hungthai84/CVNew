'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Compass, RotateCw, Radio, Sparkles } from 'lucide-react';
import { WeatherPreset, SiteTheme } from '@/types';
import { Clock } from './Clock';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { useToast } from '@/components/ui/Toast';

export interface WeatherWidgetProps {
  currentPreset: WeatherPreset;
  onCycle: () => void;
  currentTheme?: SiteTheme;
}

// Cấu hình quang phổ ánh sáng mặt trời theo giờ thực tế (Sun Position Ambient Glow)
export interface SunAmbientConfig {
  phase: 'morning' | 'noon' | 'sunset' | 'night';
  label: string;
  sunGlow: string;
  sunHaloFill: string;
  sunHaloOpacity: number;
  stop1: string;
  stop2: string;
  stop3: string;
  strokeColor: string;
  ambientShadow: string;
  timeString: string;
}

export const getSunAmbientConfig = (date: Date = new Date()): SunAmbientConfig => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // 1. Sắc vàng ban mai (05:00 - 09:59)
  if (hours >= 5 && hours < 10) {
    return {
      phase: 'morning',
      label: 'Sắc vàng ban mai',
      sunGlow: 'rgba(253, 224, 71, 0.5)',
      sunHaloFill: '#FBBF24',
      sunHaloOpacity: 0.28,
      stop1: '#FEF9C3', // vàng kem nhạt ban mai
      stop2: '#FDE047', // vàng chanh tươi sáng
      stop3: '#F59E0B', // vàng hổ phách dịu
      strokeColor: '#FEF08A',
      ambientShadow: '0 0 16px rgba(253, 224, 71, 0.45)',
      timeString,
    };
  }

  // 2. Rực rỡ trưa hè (10:00 - 15:59)
  if (hours >= 10 && hours < 16) {
    return {
      phase: 'noon',
      label: 'Rực rỡ trưa hè',
      sunGlow: 'rgba(250, 204, 21, 0.65)',
      sunHaloFill: '#FF7A00',
      sunHaloOpacity: 0.35,
      stop1: '#FFFFFF', // đỉnh trắng chói chang năng lượng cao
      stop2: '#FACC15', // vàng rực rỡ nhiệt đới
      stop3: '#EA580C', // cam lửa ấm nóng rạng rỡ
      strokeColor: '#FDE047',
      ambientShadow: '0 0 24px rgba(234, 88, 12, 0.5)',
      timeString,
    };
  }

  // 3. Ánh hoàng hôn cam ấm áp (16:00 - 18:59)
  if (hours >= 16 && hours < 19) {
    return {
      phase: 'sunset',
      label: 'Hoàng hôn cam ấm áp',
      sunGlow: 'rgba(249, 115, 22, 0.6)',
      sunHaloFill: '#F97316',
      sunHaloOpacity: 0.32,
      stop1: '#FED7AA', // cam phấn hoàng hôn
      stop2: '#F97316', // cam san hô nồng ấm
      stop3: '#E11D48', // đỏ hoàng hôn tía quyến rũ
      strokeColor: '#FDBA74',
      ambientShadow: '0 0 20px rgba(249, 115, 22, 0.45)',
      timeString,
    };
  }

  // 4. Ban đêm / Ánh trăng huyền ảo (19:00 - 04:59)
  return {
    phase: 'night',
    label: 'Ánh trăng huyền ảo',
    sunGlow: 'rgba(129, 140, 248, 0.45)',
    sunHaloFill: '#818CF8',
    sunHaloOpacity: 0.25,
    stop1: '#F0FDF4', // trắng bạc trăng non
    stop2: '#818CF8', // tím lam tinh tú
    stop3: '#4338CA', // chàm thẫm màn đêm
    strokeColor: '#A5B4FC',
    ambientShadow: '0 0 16px rgba(129, 140, 248, 0.35)',
    timeString,
  };
};

interface WeatherParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  shape: 'circle' | 'spark' | 'drop';
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ currentPreset, onCycle, currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const isDark = currentTheme === 'dark-neon';
  const isLuminous = currentTheme === 'luminous-glass';
  const isLight = !isDark;

  // State cho hiệu ứng hạt bừng sáng (Micro Weather Particle Burst)
  const [particles, setParticles] = useState<WeatherParticle[]>([]);
  const [isBursting, setIsBursting] = useState<boolean>(false);

  // State cấu hình ánh sáng mặt trời theo giờ thực tế (Sun Position Ambient Glow)
  const [sunConfig, setSunConfig] = useState<SunAmbientConfig>(() => getSunAmbientConfig());

  // Tự động cập nhật ánh sáng mặt trời theo thời gian thực mỗi 30 giây
  useEffect(() => {
    setSunConfig(getSunAmbientConfig());
    const interval = setInterval(() => {
      setSunConfig(getSunAmbientConfig());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // State cho đồng bộ thời tiết thực tế (Live Geo-Weather Fetch via Open-Meteo)
  const [liveWeather, setLiveWeather] = useState<WeatherPreset | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState<boolean>(false);

  // Preset đang hiển thị (Ưu tiên liveWeather nếu người dùng đã đồng bộ GPS)
  const activePreset = liveWeather || currentPreset;

  // Kích hoạt hiệu ứng hạt bừng sáng theo thời tiết (kế thừa quang phổ mặt trời theo giờ thực tế)
  const triggerParticleBurst = (condition: string) => {
    setIsBursting(true);
    const cond = condition.toLowerCase();
    let colors = [sunConfig.stop1, sunConfig.stop2, sunConfig.stop3, sunConfig.sunHaloFill];
    let shape: 'circle' | 'spark' | 'drop' = 'circle';

    if (cond.includes('rain') || cond.includes('mưa')) {
      colors = ['#38BDF8', '#60A5FA', '#93C5FD', '#0284C7'];
      shape = 'drop';
    } else if (cond.includes('thunder') || cond.includes('lightning') || cond.includes('sét')) {
      colors = ['#C084FC', '#22D3EE', '#FDE047', '#E879F9'];
      shape = 'spark';
    } else if (cond.includes('cloud') || cond.includes('overcast') || cond.includes('mây')) {
      colors = ['#E2E8F0', '#BAE6FD', '#DDD6FE', '#CBD5E1'];
      shape = 'circle';
    }

    const newParticles: WeatherParticle[] = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const dist = 32 + Math.random() * 40;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: shape === 'spark' ? 3 + Math.random() * 3 : 4 + Math.random() * 4,
        color: colors[i % colors.length],
        delay: Math.random() * 0.08,
        shape,
      };
    });

    setParticles(newParticles);
    setTimeout(() => {
      setIsBursting(false);
      setParticles([]);
    }, 800);
  };

  // Đồng bộ thời tiết thực tế qua Open-Meteo API
  const handleFetchGeoWeather = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoadingGeo(true);
    SoundEngine.playClockTick();
    showToast('Đang quét tọa độ GPS & tải thời tiết vệ tinh... 🛰️');

    const fetchFromCoords = async (lat: number, lon: number, locName: string) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const res = await fetch(url);
        const data = await res.json();
        const tempVal = Math.round(data.current?.temperature_2m ?? 31);
        const code = data.current?.weather_code ?? 0;

        let condition = 'Sunny';
        let conditionVi = 'Trời nắng';
        if (code === 0) {
          condition = 'Sunny';
          conditionVi = 'Nắng đẹp';
        } else if ([1, 2, 3].includes(code)) {
          condition = 'Cloudy';
          conditionVi = 'Mây rải rác';
        } else if ([45, 48].includes(code)) {
          condition = 'Overcast';
          conditionVi = 'Âm u sương mù';
        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
          condition = 'Heavy Rain';
          conditionVi = 'Mưa thực tế';
        } else if ([95, 96, 99].includes(code)) {
          condition = 'Thunder Storm';
          conditionVi = 'Giông bão';
        }

        const updated: WeatherPreset = {
          temp: String(tempVal),
          condition,
          conditionVi: `${conditionVi} (GPS)`,
          badge: 'GPS LIVE',
          bgStyle: '',
          location: locName,
        };

        setLiveWeather(updated);
        triggerParticleBurst(condition);
        SoundEngine.playWeatherFeedback(condition);
        showToast(`Đã đồng bộ GPS: ${tempVal}°C - ${conditionVi} (${locName}) 🛰️`);
      } catch {
        showToast('Không thể kết nối Open-Meteo. Giữ nguyên trạng thái.');
      } finally {
        setIsLoadingGeo(false);
      }
    };

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchFromCoords(pos.coords.latitude, pos.coords.longitude, 'Vị trí hiện tại');
        },
        () => {
          // Fallback TP. Hồ Chí Minh
          fetchFromCoords(10.7769, 106.7009, 'TP. Hồ Chí Minh (GPS)');
        },
        { timeout: 6000 }
      );
    } else {
      fetchFromCoords(10.7769, 106.7009, 'TP. Hồ Chí Minh (GPS)');
    }
  };

  // Click đổi thời tiết có phản hồi âm thanh và hạt bừng sáng
  const handleCardClick = () => {
    // Nếu đang dùng liveWeather thì click sẽ quay về cycle bình thường
    if (liveWeather) {
      setLiveWeather(null);
    }
    onCycle();
    SoundEngine.playWeatherFeedback(currentPreset.condition);
    triggerParticleBurst(currentPreset.condition);
  };

  // Hover phản hồi âm thanh siêu nhỏ
  const handleCardMouseEnter = () => {
    if (activePreset.condition.toLowerCase().includes('rain')) {
      SoundEngine.playRainDrop();
    } else {
      SoundEngine.playClockTick();
    }
  };

  // Theme-aware container styles for the unified weather & clock card (Nền trong suốt 100% theo yêu cầu)
  const getContainerThemeStyle = (): React.CSSProperties => {
    return {
      background: 'transparent',
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    };
  };

  const getHoverBorderClass = () => {
    return '';
  };

  const getDividerColor = () => {
    if (isDark) return 'rgba(34, 211, 238, 0.4)';
    if (isLuminous) return 'rgba(56, 189, 248, 0.4)';
    return 'rgba(196, 181, 253, 0.65)';
  };

  // Theme-aware colors matching the currently selected theme
  const getTempColor = () => {
    if (isDark) return 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] font-mono';
    if (isLuminous) return 'text-[#0284C7] drop-shadow-xs font-black';
    return 'text-[#1E1B4B] font-black';
  };

  const getConditionColor = () => {
    if (isDark) return 'text-purple-300 drop-shadow-[0_0_6px_rgba(192,132,252,0.6)] font-bold';
    if (isLuminous) return 'text-pink-600 font-extrabold';
    return 'text-indigo-900 font-extrabold';
  };

  const getLocationColor = () => {
    if (isDark) return 'text-slate-400 font-medium';
    if (isLuminous) return 'text-sky-700 font-medium';
    return 'text-slate-600 font-semibold';
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={handleCardMouseEnter}
      title={`Nhấp để đổi trạng thái thời tiết • Thời khắc: ${sunConfig.label} (${sunConfig.timeString}) • Nhấp vào radar GPS để lấy thời tiết thực tế`}
      className="relative w-max max-w-full h-[46px] sm:h-[50px] rounded-[16px] px-1 sm:px-2 flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none transition-all duration-300 bg-transparent border-0 shadow-none overflow-visible group active:scale-[0.98]"
      style={getContainerThemeStyle()}
    >
      <style jsx>{`
        @keyframes weatherParticleBurst {
          0% {
            transform: translate(0, 0) scale(0.3);
            opacity: 1;
          }
          65% {
            opacity: 0.95;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1.15);
            opacity: 0;
          }
        }
        .weather-particle-spark {
          animation: weatherParticleBurst 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 1. Hiệu Ứng Bụi Mưa / Tia Nắng Tương Tác (Micro Weather Particle Burst) */}
      {isBursting && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible flex items-center justify-center">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute pointer-events-none weather-particle-spark"
              style={
                {
                  '--tx': `${p.x}px`,
                  '--ty': `${p.y}px`,
                  width: `${p.size}px`,
                  height: p.shape === 'drop' ? `${p.size * 1.8}px` : `${p.size}px`,
                  borderRadius: p.shape === 'drop' ? '40% 40% 60% 60%' : '50%',
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* 3D Pop-out Graphic kèm Quầng Sáng Mặt Trời Theo Giờ Thực Tế (Sun Position Ambient Glow) */}
      <div className="relative z-20 flex items-center shrink-0 -ml-1">
        {/* Quầng sáng quang phổ thời gian thực tỏa ra từ icon */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-1000 blur-md -z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${sunConfig.sunGlow} 0%, transparent 72%)`,
            transform: 'scale(1.45)',
          }}
        />

        <div className="relative transition-transform duration-500 group-hover:scale-110 weather-float">
          {activePreset.condition === 'Cloudy' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md transition-all duration-700">
              <defs>
                <linearGradient id="dynamicSunA" x2="0" y2="1">
                  <stop stopColor={sunConfig.stop1} />
                  <stop offset=".45" stopColor={sunConfig.stop2} />
                  <stop offset="1" stopColor={sunConfig.stop3} />
                </linearGradient>
                <linearGradient id="cloudA" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#c9eaff" />
                </linearGradient>
              </defs>
              <circle
                cx="38"
                cy="36"
                r="25"
                fill={sunConfig.sunHaloFill}
                opacity={sunConfig.sunHaloOpacity}
                className="transition-all duration-700"
              />
              <circle
                cx="38"
                cy="36"
                r="21"
                fill="url(#dynamicSunA)"
                className="sun-anim transition-all duration-700"
              />
              <path
                d="M20 68C8 68 7 50 20 46C22 31 43 28 52 42C67 36 81 47 78 60C91 65 84 81 69 81H24C13 81 11 72 20 68Z"
                fill="url(#cloudA)"
                stroke="#fff"
                strokeOpacity=".75"
                strokeWidth="2"
                className="cloud-anim"
              />
            </svg>
          )}

          {activePreset.condition === 'Thunder Storm' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
              <defs>
                <linearGradient id="cloudB" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#b8d8ff" />
                </linearGradient>
                <linearGradient id="boltB" x2="0" y2="1">
                  <stop stopColor="#fff45c" />
                  <stop offset="1" stopColor="#ff9700" />
                </linearGradient>
              </defs>
              <path
                d="M17 61C4 57 8 39 23 38C25 17 49 15 59 32C77 24 92 39 86 54C97 62 87 75 73 75H25C15 75 11 67 17 61Z"
                fill="url(#cloudB)"
                stroke="#fff"
                strokeOpacity=".8"
                strokeWidth="2"
                className="cloud-anim"
              />
              <path
                d="M52 67L39 86H51L45 100L70 78H57L64 67Z"
                fill="url(#boltB)"
                stroke="#ffc72c"
                strokeWidth="1.5"
                className="lightning-anim"
              />
              <path
                d="M22 82l-4 8m58-9l-4 8"
                stroke="#5bd8ff"
                strokeWidth="4"
                strokeLinecap="round"
                className="rain-anim"
              />
            </svg>
          )}

          {activePreset.condition === 'Overcast' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
              <defs>
                <linearGradient id="cloudC" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#e5edf5" />
                </linearGradient>
              </defs>
              <path
                d="M18 66C4 62 8 43 23 41C26 20 49 18 60 35C78 28 92 43 86 58C98 66 88 79 73 79H25C14 79 10 71 18 66Z"
                fill="url(#cloudC)"
                stroke="#fff"
                strokeWidth="2"
                className="cloud-anim"
              />
              <ellipse cx="30" cy="72" rx="13" ry="9" fill="#fff" opacity=".8" />
            </svg>
          )}

          {activePreset.condition === 'Sunny' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md transition-all duration-700">
              <defs>
                <radialGradient id="dynamicSunD">
                  <stop stopColor={sunConfig.stop1} />
                  <stop offset=".58" stopColor={sunConfig.stop2} />
                  <stop offset="1" stopColor={sunConfig.stop3} />
                </radialGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="38"
                fill={sunConfig.sunHaloFill}
                opacity={sunConfig.sunHaloOpacity}
                className="transition-all duration-700"
              />
              <circle
                cx="50"
                cy="50"
                r="31"
                fill="url(#dynamicSunD)"
                stroke={sunConfig.strokeColor}
                strokeWidth="2"
                className="sun-anim transition-all duration-700"
              />
            </svg>
          )}

          {activePreset.condition === 'Heavy Rain' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
              <defs>
                <linearGradient id="cloudE" x2="0" y2="1">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#b9d8ff" />
                </linearGradient>
                <linearGradient id="rainE" x2="0" y2="1">
                  <stop stopColor="#baf7ff" />
                  <stop offset="1" stopColor="#1dc8ff" />
                </linearGradient>
              </defs>
              <path
                d="M16 58C3 54 8 35 23 34C26 14 49 13 60 30C78 23 92 38 86 52C97 60 87 73 73 73H25C14 73 10 65 16 58Z"
                fill="url(#cloudE)"
                stroke="#fff"
                strokeWidth="2"
                className="cloud-anim"
              />
              <path
                d="M27 77l-3 12m19-12l-3 17m20-17l-3 12m20-12l-3 17"
                stroke="url(#rainE)"
                strokeWidth="5"
                strokeLinecap="round"
                className="rain-anim"
              />
            </svg>
          )}

          {activePreset.condition === 'Lightning' && (
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
              <defs>
                <linearGradient id="boltF" x2="0" y2="1">
                  <stop stopColor="#fff66b" />
                  <stop offset=".5" stopColor="#ffd21a" />
                  <stop offset="1" stopColor="#ff8c00" />
                </linearGradient>
              </defs>
              <path
                d="M57 5L22 56H43L34 94L78 42H54L67 5Z"
                fill="url(#boltF)"
                stroke="#ffe44d"
                strokeWidth="2"
                strokeLinejoin="round"
                className="lightning-anim"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Temperature & Condition: Icon + Temperature °C display */}
      <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 pl-0.5 shrink-0">
        <div className={`flex items-start tracking-tight drop-shadow-sm font-play shrink-0 ${getTempColor()}`}>
          <span className="text-lg sm:text-xl font-black leading-none">{activePreset.temp}</span>
          <span className="text-xs font-black leading-none ml-0.5">°C</span>
        </div>

        <div className="hidden sm:flex flex-col text-left leading-tight drop-shadow-xs shrink-0">
          <div className="flex items-center gap-1">
            <span className={`text-[11px] font-black tracking-tight whitespace-nowrap ${getConditionColor()}`}>
              {activePreset.conditionVi || activePreset.badge || activePreset.condition}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: sunConfig.sunHaloFill, boxShadow: `0 0 6px ${sunConfig.sunHaloFill}` }}
              title={`Quang phổ: ${sunConfig.label}`}
            />
            <span className={`text-[9.5px] truncate max-w-[90px] ${getLocationColor()}`}>
              {activePreset.location || 'TP. Hồ Chí Minh'}
            </span>
          </div>
        </div>

        {/* 3. Nút Đồng Bộ Dữ Liệu Thời Tiết Thực Tế Qua Open-Meteo API (Live Geo-Weather Fetch) */}
        <button
          type="button"
          onClick={handleFetchGeoWeather}
          title={
            liveWeather
              ? 'Đang dùng dữ liệu GPS thực tế • Bấm để quét lại'
              : 'Bấm để đồng bộ thời tiết thực tế qua GPS (Open-Meteo)'
          }
          className={`p-1 rounded-full transition-all duration-300 hover:scale-115 active:scale-90 cursor-pointer ml-0.5 shrink-0 ${
            liveWeather
              ? 'text-emerald-500 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
              : 'text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:bg-slate-200/50 dark:hover:bg-white/10'
          }`}
        >
          <Radio className={`w-3 h-3 ${isLoadingGeo ? 'animate-spin text-cyan-400' : ''}`} />
        </button>
      </div>

      {/* Divider phân tách Thời Tiết & Đồng Hồ */}
      <div
        className="h-6 w-[1px] rounded-full shrink-0 mx-0.5 opacity-80"
        style={{ backgroundColor: getDividerColor() }}
      />

      {/* Live Clock Component HH:MM */}
      <Clock isLight={isLight} currentTheme={currentTheme} />
    </div>
  );
};
