import { XRayPromptTemplate } from '@/types/xray';

const STORAGE_KEY = 'hungthai_xray_prompt_templates_v1';

export const DEFAULT_TEMPLATES: XRayPromptTemplate[] = [
  {
    id: 'default-1',
    createdAt: Date.now() - 3600000 * 24,
    pageName: 'Trang Thư Ngỏ',
    pageId: 1,
    elementSummary: 'Khối video minh họa AI Robot',
    elementTag: 'video',
    elementClasses: 'rounded-2xl shadow-inner',
    actionType: 'restyle',
    actionLabel: 'Đổi kiểu dáng & hiệu ứng',
    scope: 'element',
    userInstruction: 'Thêm viền phát sáng gradient màu tím pastel khi di chuột vào',
    generatedPrompt: 'Tại Trang Thư Ngỏ, với Khối video minh họa AI Robot (<video>): Đổi kiểu dáng & hiệu ứng - Thêm viền phát sáng gradient màu tím pastel khi di chuột vào (Phạm vi: Chỉ áp dụng cho đối tượng này).',
    category: 'Giao diện',
    tags: ['Video', 'Border', 'Hover'],
  },
  {
    id: 'default-2',
    createdAt: Date.now() - 3600000 * 12,
    pageName: 'Trang Hệ Thống',
    pageId: 8,
    elementSummary: 'Thẻ dọc giới thiệu Kiến Trúc Sư bên phải',
    elementTag: 'aside',
    elementClasses: 'system-item rounded-2xl',
    actionType: 'optimize',
    actionLabel: 'Tối ưu hóa hiển thị',
    scope: 'page',
    userInstruction: 'Giữ chiều cao luôn tự động co giãn bằng 3 hàng thẻ hệ thống trên mọi cỡ màn hình lớn',
    generatedPrompt: 'Tại Trang Hệ Thống, với Thẻ dọc giới thiệu Kiến Trúc Sư bên phải (<aside>): Tối ưu hóa hiển thị - Giữ chiều cao luôn tự động co giãn bằng 3 hàng thẻ hệ thống trên mọi cỡ màn hình lớn (Phạm vi: Áp dụng trong toàn bộ trang này).',
    category: 'Bố cục & Lưới',
    tags: ['Layout', 'Flex', 'Height'],
  },
  {
    id: 'default-3',
    createdAt: Date.now() - 3600000 * 4,
    pageName: 'Toàn Website',
    pageId: -1,
    elementSummary: 'Nút bấm tương tác trên thanh Header & Footer',
    elementTag: 'button',
    elementClasses: 'rounded-full border shadow-sm',
    actionType: 'modify',
    actionLabel: 'Chỉnh sửa chức năng',
    scope: 'global',
    userInstruction: 'Bổ sung hiệu ứng rung nhẹ haptic feedback và âm thanh click khi người dùng chuyển trang',
    generatedPrompt: 'Tại Toàn Website, với Nút bấm tương tác trên thanh Header & Footer (<button>): Chỉnh sửa chức năng - Bổ sung hiệu ứng rung nhẹ haptic feedback và âm thanh click khi người dùng chuyển trang (Phạm vi: Áp dụng trên toàn website).',
    category: 'Tính năng',
    tags: ['Sound', 'Feedback', 'Global'],
  },
];

export function loadSavedTemplates(): XRayPromptTemplate[] {
  if (typeof window === 'undefined') return DEFAULT_TEMPLATES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TEMPLATES));
      return DEFAULT_TEMPLATES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_TEMPLATES;
  } catch (e) {
    console.error('Failed to load X-Ray templates from storage', e);
    return DEFAULT_TEMPLATES;
  }
}

export function saveTemplates(templates: XRayPromptTemplate[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error('Failed to save X-Ray templates to storage', e);
  }
}

export function addTemplate(template: XRayPromptTemplate): XRayPromptTemplate[] {
  const current = loadSavedTemplates();
  const updated = [template, ...current.filter((t) => t.id !== template.id)];
  saveTemplates(updated);
  return updated;
}

export function updateTemplate(id: string, partial: Partial<XRayPromptTemplate>): XRayPromptTemplate[] {
  const current = loadSavedTemplates();
  const updated = current.map((t) => (t.id === id ? { ...t, ...partial } : t));
  saveTemplates(updated);
  return updated;
}

export function deleteTemplate(id: string): XRayPromptTemplate[] {
  const current = loadSavedTemplates();
  const updated = current.filter((t) => t.id !== id);
  saveTemplates(updated);
  return updated;
}
