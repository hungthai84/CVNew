import { ThemeOption } from '@/types';

export const THEME_LIST: ThemeOption[] = [
  {
    id: 'light-glass',
    name: 'Glass UI Light',
    fourWordName: 'Kính sáng 12 màu',
    icon: 'Sun',
    badge: 'Light Glass',
    description: 'Giao diện kính sáng đa sắc (hơn 10 màu hiện đại), hiệu ứng lăng kính phản chiếu sang trọng',
    accentColor: '#0ea5e9',
    isDark: false,
  },
  {
    id: 'dark-neon',
    name: 'Cyber Sapphire Neon',
    fourWordName: 'Neon tối đa sắc',
    icon: 'Moon',
    badge: 'Dark Neon',
    description: 'Giao diện kính tối Cyber Sapphire kết hợp viền Neon đa sắc rực rỡ, chiều sâu công nghệ cao',
    accentColor: '#38BDF8',
    isDark: true,
  },
  {
    id: 'flat-rainbow',
    name: 'Flat UI 7 Màu Cầu Vồng',
    fourWordName: 'Cầu vồng 7 màu',
    icon: 'Palette',
    badge: 'Flat Rainbow',
    description: 'Giao diện phẳng sắc nét, màu sắc tươi sáng thuần khiết theo dải phổ 7 màu cầu vồng hiện đại',
    accentColor: '#ec4899',
    isDark: false,
  },
];
