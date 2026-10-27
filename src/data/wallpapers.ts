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
  {
    id: 'radial-sunset-pastel-glow',
    name: 'Hoàng Hôn Cam Hồng Pastel',
    type: 'gradient',
    value: 'radial-gradient(125% 125% at -2% 101%, rgba(245, 87, 2, 1) 10.5%, rgba(245, 120, 2, 1) 16%, rgba(245, 140, 2, 1) 17.5%, rgba(245, 170, 100, 1) 25%, rgba(238, 174, 202, 1) 40%, rgba(202, 179, 214, 1) 65%, rgba(148, 201, 233, 1) 100%)',
    previewStyle: {
      background: 'radial-gradient(125% 125% at -2% 101%, rgba(245, 87, 2, 1) 10.5%, rgba(245, 120, 2, 1) 16%, rgba(245, 140, 2, 1) 17.5%, rgba(245, 170, 100, 1) 25%, rgba(238, 174, 202, 1) 40%, rgba(202, 179, 214, 1) 65%, rgba(148, 201, 233, 1) 100%)',
    },
  },
  {
    id: 'codepen-card-stacks-sky',
    name: 'Nền CodePen Card Stacks',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1555&q=80',
    previewStyle: {
      backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1555&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },
  {
    id: 'codepen-waves-3d',
    name: 'Nền CodePen Sóng 3D',
    type: 'codepen',
    value: 'https://codepen.io/zadvorsky/embed/vOErOB?default-tab=result&theme-id=dark&editable=false',
    previewStyle: {
      background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #064e3b 100%)',
    },
  },
  {
    id: 'codepen-particles-canvas',
    name: 'Nền CodePen Ma Trận Hạt',
    type: 'codepen',
    value: 'https://codepen.io/aliev/embed/ExgQzR?default-tab=result&theme-id=dark&editable=false',
    previewStyle: {
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
    },
  },
  {
    id: 'codepen-aurora-webgl',
    name: 'Nền CodePen Cực Quang Fluid',
    type: 'codepen',
    value: 'https://codepen.io/klevron/embed/WVrYmq?default-tab=result&theme-id=dark&editable=false',
    previewStyle: {
      background: 'linear-gradient(135deg, #18032e 0%, #032b30 100%)',
    },
  },
];

export const WALLPAPER_OPTIONS: WallpaperOption[] = [
  ...BUILTIN_WALLPAPERS,
  ...IMPORTED_WALLPAPERS,
];

