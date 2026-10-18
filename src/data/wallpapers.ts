import { WallpaperOption } from '@/types';
import importedWallpapersRaw from './importedWallpapers.json';

export const IMPORTED_WALLPAPERS: WallpaperOption[] = (importedWallpapersRaw as unknown) as WallpaperOption[];

export const BUILTIN_WALLPAPERS: WallpaperOption[] = [
  {
    id: 'aurora',
    name: 'Aurora Đa Sắc',
    type: 'class',
    value: 'aurora-bg',
    className: 'aurora-bg',
    previewStyle: {
      background: 'radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.7) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.7) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.6) 0%, transparent 60%), #f8fafc',
    },
  },
  {
    id: 'pure-white',
    name: 'Sáng Thuần Khiết',
    type: 'color',
    value: '#f8fafc',
    previewStyle: { background: '#f8fafc' },
  },
  {
    id: 'ocean',
    name: 'Đại Dương Xanh',
    type: 'gradient',
    value: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 100%)',
    previewStyle: { background: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 100%)' },
  },
  {
    id: 'sunset',
    name: 'Hoàng Hôn',
    type: 'gradient',
    value: 'linear-gradient(135deg, #ffedd5 0%, #fdba74 50%, #f43f5e 100%)',
    previewStyle: { background: 'linear-gradient(135deg, #ffedd5 0%, #fdba74 50%, #f43f5e 100%)' },
  },
  {
    id: 'rainforest',
    name: 'Rừng Nhiệt Đới',
    type: 'gradient',
    value: 'linear-gradient(135deg, #dcfce7 0%, #22c55e 100%)',
    previewStyle: { background: 'linear-gradient(135deg, #dcfce7 0%, #22c55e 100%)' },
  },
  {
    id: 'purple',
    name: 'Tím Huyền Bí',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f3e8ff 0%, #a855f7 100%)',
    previewStyle: { background: 'linear-gradient(135deg, #f3e8ff 0%, #a855f7 100%)' },
  },
  {
    id: 'autumn',
    name: 'Cát Vàng Mùa Thu',
    type: 'gradient',
    value: 'linear-gradient(to right, #fef3c7, #fde68a)',
    previewStyle: { background: 'linear-gradient(to right, #fef3c7, #fde68a)' },
  },
  {
    id: 'night',
    name: 'Bầu Trời Đêm',
    type: 'gradient',
    value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    previewStyle: { background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
  },
  {
    id: 'matte-black',
    name: 'Đen Nhám Cổ Điển',
    type: 'color',
    value: '#121212',
    previewStyle: { background: '#121212' },
  },
];

export const WALLPAPER_OPTIONS: WallpaperOption[] = [
  ...BUILTIN_WALLPAPERS,
  ...IMPORTED_WALLPAPERS,
];

