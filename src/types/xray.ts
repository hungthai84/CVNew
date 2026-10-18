export interface XRayPromptTemplate {
  id: string;
  createdAt: number;
  pageName: string;
  pageId: number;
  elementSummary: string;
  elementTag: string;
  elementClasses?: string;
  actionType: 'modify' | 'delete' | 'add' | 'restyle' | 'optimize';
  actionLabel: string;
  scope: 'element' | 'page' | 'global';
  userInstruction: string;
  generatedPrompt: string;
  category: 'Giao diện' | 'Nội dung' | 'Bố cục & Lưới' | 'Tính năng' | 'Tối ưu khác';
  tags?: string[];
}

export interface XRaySelectedElementInfo {
  tag: string;
  id?: string;
  className?: string;
  innerTextSummary: string;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  suggestedSelector: string;
  pageId: number;
  pageName: string;
}
