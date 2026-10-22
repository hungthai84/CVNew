'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WALLPAPER_OPTIONS } from '@/data/wallpapers';
import { WallpaperOption } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';
import {
  loadCustomWallpapers,
  saveCustomWallpapers,
  getDefaultWallpaperId,
  setDefaultWallpaperId,
  loadDeletedWallpaperIds,
  saveDeletedWallpaperIds,
  detectWallpaperType,
  exportWallpapersToJsonFile,
  parseWallpapersJson,
} from '@/utils/wallpaperStorage';

export interface WallpaperViewProps {
  onSelectWallpaper: (option: WallpaperOption) => void;
  activeWallpaperId?: string;
  defaultWallpaperId?: string;
  onSetDefaultWallpaper?: (option: WallpaperOption) => void;
  onSelectWeather?: (idx: number) => void;
}

export const WallpaperView: React.FC<WallpaperViewProps> = ({
  onSelectWallpaper,
  activeWallpaperId = 'aurora',
  defaultWallpaperId: propDefaultId,
  onSetDefaultWallpaper,
}) => {
  const { showToast } = useToast();

  const [customList, setCustomList] = useState<WallpaperOption[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [defaultId, setDefaultId] = useState<string>(propDefaultId || 'aurora');
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);

  // Single smart input state
  const [inputValue, setInputValue] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  // Load custom wallpapers, deleted IDs and default wallpaper from persistent storage on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      const stored = await loadCustomWallpapers();
      const defId = await getDefaultWallpaperId();
      const delIds = await loadDeletedWallpaperIds();
      if (mounted) {
        setCustomList(stored);
        setDeletedIds(delIds);
        if (defId) setDefaultId(defId);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Update defaultId if prop changes
  useEffect(() => {
    if (propDefaultId) {
      setDefaultId(propDefaultId);
    }
  }, [propDefaultId]);

  // Real-time detection from single input
  const detection = detectWallpaperType(inputValue);

  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'gradient' | 'css'>('all');

  // Combined wallpapers: Custom first, then built-in (excluding deleted IDs & deduplicating)
  const combinedWallpapers: WallpaperOption[] = React.useMemo(() => {
    const raw = [...customList, ...WALLPAPER_OPTIONS];
    const seenIds = new Set<string>();
    const seenValues = new Set<string>();
    const unique: WallpaperOption[] = [];

    for (const wp of raw) {
      if (deletedIds.includes(wp.id)) continue;
      if (seenIds.has(wp.id)) continue;

      const normValue = (wp.value || '').trim();
      if (normValue && seenValues.has(normValue)) continue;

      seenIds.add(wp.id);
      if (normValue) seenValues.add(normValue);
      unique.push(wp);
    }
    return unique;
  }, [customList, deletedIds]);

  const allWallpapers: WallpaperOption[] = combinedWallpapers.filter((wp) => {
    if (filterType === 'all') return true;
    if (filterType === 'image') return wp.type === 'image';
    if (filterType === 'video') return wp.type === 'video';
    if (filterType === 'gradient') return wp.type === 'gradient' || wp.type === 'color';
    if (filterType === 'css') return wp.type === 'css' || wp.type === 'class' || wp.type === 'gradient' || wp.type === 'color';
    return true;
  });

  // 1. Single click: Apply wallpaper for preview
  const handleSingleClick = (wp: WallpaperOption) => {
    onSelectWallpaper(wp);
    showToast(`Đã áp dụng: ${wp.name} (Nhấp 2 lần để lưu làm Mặc Định)`);
  };

  // 2. Double click: Apply AND set as default wallpaper
  const handleDoubleClick = async (wp: WallpaperOption) => {
    onSelectWallpaper(wp);
    setDefaultId(wp.id);
    await setDefaultWallpaperId(wp.id);
    if (onSetDefaultWallpaper) {
      onSetDefaultWallpaper(wp);
    }
    showToast(`Đã đặt "${wp.name}" làm hình nền mặc định!`);
  };

  // Handle local file read into Data URL
  const handleFileChosen = (file: File) => {
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      showToast('Vui lòng chọn tệp hình ảnh (.jpg, .png, .gif, .webp) hoặc video (.mp4, .webm)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setInputValue(result);
        if (!customName.trim()) {
          const suggestedName = file.name.replace(/\.[^/.]+$/, '');
          setCustomName(suggestedName);
        }
        showToast(`Đã nhận diện tệp cục bộ: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add custom wallpaper
  const handleAddWallpaper = async () => {
    if (!inputValue.trim()) {
      showToast('Vui lòng dán link hình ảnh, link video, mã CSS hoặc chọn tệp từ máy.');
      return;
    }

    const newId = `custom-${Date.now()}`;
    const finalName = customName.trim() || `Hình nền ${detection.label} #${customList.length + 1}`;

    const newOption: WallpaperOption = {
      id: newId,
      name: finalName,
      type: detection.type,
      value: detection.cleanedValue,
      previewStyle: detection.previewStyle,
      isCustom: true,
      createdAt: Date.now(),
    };

    const updated = [newOption, ...customList];
    setCustomList(updated);
    await saveCustomWallpapers(updated);

    // Apply immediately
    onSelectWallpaper(newOption);

    // Reset input
    setInputValue('');
    setCustomName('');
    setIsAddingOpen(false);

    showToast(`Đã thêm thành công hình nền: ${finalName}!`);
  };

  // Delete wallpaper (both custom & built-in)
  const handleDeleteWallpaper = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();

    // 1. Remove from customList if it's custom
    const updatedCustom = customList.filter((w) => w.id !== id);
    if (updatedCustom.length !== customList.length) {
      setCustomList(updatedCustom);
      await saveCustomWallpapers(updatedCustom);
    }

    // 2. Add to deletedIds list to hide persistently
    const updatedDeleted = Array.from(new Set([...deletedIds, id]));
    setDeletedIds(updatedDeleted);
    await saveDeletedWallpaperIds(updatedDeleted);

    // 3. Reset default if the deleted one was default
    if (defaultId === id) {
      setDefaultId('aurora');
      await setDefaultWallpaperId('aurora');
    }

    showToast(`Đã xóa hình nền: "${name}"`);
  };

  // Restore deleted wallpapers
  const handleRestoreDeleted = async () => {
    setDeletedIds([]);
    await saveDeletedWallpaperIds([]);
    showToast('Đã khôi phục tất cả hình nền mặc định đã xóa!');
  };

  // Export JSON
  const handleExportJson = () => {
    try {
      exportWallpapersToJsonFile(customList);
      showToast('Đã tải xuống tệp hung-thai-wallpapers.json thành công!');
    } catch {
      showToast('Lỗi khi xuất tệp JSON.');
    }
  };

  // Import JSON
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const { wallpapers: importedWallpapers, selectedId } = parseWallpapersJson(text);

        if (importedWallpapers.length === 0) {
          showToast('Tệp JSON không chứa hình nền hợp lệ.');
          return;
        }

        // Merge: avoid duplicated IDs
        const existingIds = new Set(customList.map((w) => w.id));
        const newItems = importedWallpapers.filter((w) => !existingIds.has(w.id));
        const merged = [...newItems, ...customList];

        setCustomList(merged);
        await saveCustomWallpapers(merged);

        if (selectedId) {
          const selectedOption = merged.find((w) => w.id === selectedId) || WALLPAPER_OPTIONS.find((w) => w.id === selectedId);
          if (selectedOption) {
            onSelectWallpaper(selectedOption);
            setDefaultId(selectedOption.id);
            await setDefaultWallpaperId(selectedOption.id);
            if (onSetDefaultWallpaper) onSetDefaultWallpaper(selectedOption);
          }
        }

        showToast(`Đã nhập thành công ${importedWallpapers.length} hình nền từ JSON!`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Lỗi khi nhập JSON';
        showToast(message);
      } finally {
        if (jsonInputRef.current) jsonInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full flex-grow flex flex-col gap-4 max-w-7xl mx-auto justify-start select-none relative text-slate-800 pb-10 text-left p-0">
      {/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        title="Tùy Biến Giao Diện"
        subtitle="Tùy biến phong cách đa dạng – Video động, Ảnh chất lượng cao & Gradient nghệ thuật"
        quote="“Nhấp 1 lần xem thử • Nhấp đúp lưu làm Mặc Định lâu dài.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        videoSrc="https://cdn.scena.ai/project/10223/85c60f965c31d8901995509ba70ec1c48bc618b045821510b3dee9f89646a8d1.mp4"
        bottomControls={
          <div className="w-full flex flex-wrap items-center justify-between gap-2.5 pt-1 px-1">
            {/* BÊN TRÁI: Nút nhóm lọc hình nền */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 p-1 rounded-[999px] bg-white/80 dark:bg-black/40 border border-slate-200/80 dark:border-white/20 shadow-xs backdrop-blur-md">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'image', label: 'Hình ảnh' },
                  { id: 'video', label: 'Video động' },
                  { id: 'gradient', label: 'Gradient' },
                  { id: 'css', label: 'Mã CSS' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilterType(tab.id as typeof filterType)}
                    className={`px-2.5 py-1 rounded-[999px] text-[11px] font-bold transition-all cursor-pointer ${
                      filterType === tab.id
                        ? 'bg-fuchsia-600 text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 hover:bg-white/60 dark:hover:bg-white/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Restore button if any are deleted */}
              {deletedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleRestoreDeleted}
                  className="px-2.5 py-1 rounded-[999px] text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Khôi phục các hình nền đã xóa"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                  <span>Khôi phục ({deletedIds.length})</span>
                </button>
              )}
            </div>

            {/* BÊN PHẢI: Nút Thêm hình nền đặt gần các nút JSON (Nhập JSON, Xuất JSON) */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Nút bật/tắt ô thêm hình nền */}
              <button
                type="button"
                onClick={() => setIsAddingOpen(!isAddingOpen)}
                className={`px-3.5 py-1.5 rounded-[999px] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all duration-200 cursor-pointer ${
                  isAddingOpen
                    ? 'bg-fuchsia-600 text-white shadow-fuchsia-500/25'
                    : 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 text-white shadow-indigo-500/20 active:scale-95'
                }`}
              >
                {isAddingOpen ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5v14" /></svg>
                )}
                <span>{isAddingOpen ? 'Đóng ô thêm' : 'Thêm hình nền'}</span>
              </button>

              {/* Nút Nhập JSON */}
              <button
                type="button"
                onClick={() => jsonInputRef.current?.click()}
                title="Nhập danh sách hình nền từ tệp .json"
                className="px-3 py-1.5 rounded-[999px] text-xs font-semibold bg-white/90 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 border border-slate-300/80 shadow-2xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Nhập JSON</span>
              </button>
              <input
                ref={jsonInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleImportJsonFile}
              />

              {/* Nút Xuất JSON */}
              <button
                type="button"
                onClick={handleExportJson}
                title="Tải về tệp sao lưu .json tất cả hình nền tùy chỉnh"
                className="px-3 py-1.5 rounded-[999px] text-xs font-semibold bg-white/90 hover:bg-fuchsia-50 text-slate-800 hover:text-fuchsia-600 border border-slate-300/80 shadow-2xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Xuất JSON</span>
              </button>
            </div>
          </div>
        }
      />

      {/* Ô THÊM DUY NHẤT VỚI AUTO NHẬN DIỆN (Single Smart Auto-detect Box) */}
      {isAddingOpen && (
        <div
          className={`w-full p-4 sm:p-5 rounded-2xl bg-white/95 border shadow-lg backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 text-left ${
            isDragging ? 'border-fuchsia-500 ring-2 ring-fuchsia-400/40' : 'border-slate-200'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileChosen(file);
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-600 animate-ping" />
              <h4 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                Thêm Hình Nền Mới (Ô Nhận Diện Tự Động Duy Nhất)
              </h4>
            </div>

            {/* Badge nhận diện loại tự động */}
            {inputValue.trim() && (
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${detection.badgeColor}`}>
                Auto nhận diện: {detection.label}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {/* Cột 1 & 2: Ô Nhập Duy Nhất */}
            <div className="md:col-span-2 flex flex-col gap-2.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-600 block">
                Dán URL hình ảnh, video, mã CSS hoặc kéo thả tệp từ máy:
              </label>

              <div className="relative">
                <textarea
                  rows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ví dụ:
• Link hình: https://images.unsplash.com/...
• Link video: https://cdn.site.com/nature.mp4
• Mã CSS: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
• Hoặc bấm nút 'Chọn tệp từ máy' bên dưới..."
                  className="w-full p-3 rounded-xl text-xs font-mono bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 shadow-inner resize-none"
                />

                {inputValue && (
                  <button
                    type="button"
                    onClick={() => setInputValue('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 text-xs px-1.5 py-0.5 rounded bg-white border border-slate-200 cursor-pointer"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Tên hình nền & Nút duyệt tệp Local */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Tên hình nền (tùy chọn)..."
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                />

                {/* Nút chọn tệp từ máy */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-[999px] text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span>Chọn tệp Local (Ảnh / Video)</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChosen(file);
                  }}
                />
              </div>
            </div>

            {/* Cột 3: Khung xem trước (Live Preview) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-600 block">
                Xem trước (Preview):
              </label>

              <div className="w-full h-[115px] rounded-xl border-2 border-slate-300 overflow-hidden relative flex items-center justify-center bg-slate-100 shadow-inner">
                {detection.type === 'video' && detection.cleanedValue ? (
                  <video
                    src={detection.cleanedValue}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : detection.previewStyle ? (
                  <div className="w-full h-full" style={detection.previewStyle} />
                ) : (
                  <div className="text-center p-3 text-[11px] text-slate-400">
                    Chưa có nội dung xem trước
                  </div>
                )}

                {detection.type === 'video' && (
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                    <WebIcon name="video" className="w-2.5 h-2.5" />
                    <span>Video</span>
                  </span>
                )}
              </div>

              {/* Nút lưu */}
              <button
                type="button"
                onClick={handleAddWallpaper}
                className="w-full mt-1 py-2 px-4 rounded-[999px] text-xs font-bold text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 shadow-md shadow-fuchsia-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                <span>Lưu & Áp Dụng Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid danh sách hình nền (Custom + Mặc định hệ thống) */}
      <div className="w-full flex items-center justify-between gap-2.5 pt-1 px-1">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Kho Hình Nền ({allWallpapers.length} mẫu):
        </span>

        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold italic flex items-center gap-1">
          <WebIcon name="bulb" className="w-3.5 h-3.5" />
          <span>Click 2 lần liên tiếp vào hình nền bất kỳ để làm mặc định</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allWallpapers.map((wp) => {
          const isDefault = defaultId === wp.id;
          const isActive = activeWallpaperId === wp.id;

          return (
            <div
              key={wp.id}
              onClick={() => handleSingleClick(wp)}
              onDoubleClick={() => handleDoubleClick(wp)}
              className={`p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col gap-2 select-none relative ${
                isDefault
                  ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-md'
                  : isActive
                  ? 'bg-white border-fuchsia-500 ring-2 ring-fuchsia-200 shadow-md'
                  : 'bg-white/75 border-slate-200/90 shadow-2xs hover:bg-white hover:border-fuchsia-300 hover:shadow-md'
              }`}
              title="Nhấp 1 lần: Xem thử • Nhấp 2 lần (double-click): Đặt làm mặc định"
            >
              {/* Badges: Default or Active */}
              <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1 items-start">
                {isDefault && (
                  <span className="px-2 py-0.5 rounded-full text-[9.5px] font-black bg-amber-500 text-white shadow-xs flex items-center gap-1 animate-pulse">
                    <WebIcon name="sparkles" className="w-3 h-3" />
                    <span>Mặc định</span>
                  </span>
                )}
                {isActive && !isDefault && (
                  <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-fuchsia-600 text-white shadow-xs flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                    <span>Đang chọn</span>
                  </span>
                )}
              </div>

              {/* Nút xóa hình nền (hỗ trợ xóa cả hình nền tùy chỉnh lẫn hình ảnh có sẵn) */}
              <button
                type="button"
                onClick={(e) => handleDeleteWallpaper(e, wp.id, wp.name)}
                title={`Xóa "${wp.name}"`}
                className="absolute top-3.5 right-3.5 z-10 w-6 h-6 rounded-full bg-black/50 hover:bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>

              {/* Thumbnail preview */}
              <div
                className={`w-full h-24 rounded-xl border border-black/10 overflow-hidden relative transition-transform duration-300 group-hover:scale-102 flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${
                  wp.className || ''
                }`}
                style={wp.previewStyle}
              >
                {/* 1. Video Thumbnail: Preload metadata and video loop muted */}
                {wp.type === 'video' && (
                  <>
                    <video
                      src={wp.value}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <WebIcon name="video" className="w-2.5 h-2.5 text-cyan-400" />
                      <span>Video</span>
                    </span>
                  </>
                )}

                {/* 2. Image Thumbnail */}
                {wp.type === 'image' && (
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs shadow-xs">
                    Ảnh
                  </span>
                )}

                {/* 3. CSS / Gradient Thumbnail */}
                {(wp.type === 'css' || wp.type === 'gradient' || wp.type === 'color') && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <WebIcon name="palette" className="w-2.5 h-2.5 text-fuchsia-400" />
                      <span>CSS</span>
                    </span>
                  </>
                )}
              </div>

              {/* Tên hình nền */}
              <div className="flex items-center justify-between gap-1 mt-0.5">
                <span
                  className={`text-xs font-bold truncate flex-1 ${
                    isDefault
                      ? 'text-amber-800 font-black'
                      : isActive
                      ? 'text-fuchsia-700'
                      : 'text-slate-700 group-hover:text-fuchsia-600'
                  }`}
                >
                  {wp.name}
                </span>

                {wp.isCustom && (
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                    Tự tạo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
