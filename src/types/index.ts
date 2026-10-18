import { ReactNode } from 'react';

export interface PageMeta {
  id: number;
  shortTitle: string;
  fullName: string;
  theme: string;
  bgLight: string;
  bgNormal: string;
  borderColor: string;
  iconSvg: ReactNode;
}

export interface WeatherPreset {
  temp: string;
  condition: string;
  conditionVi?: string;
  badge: string;
  bgStyle: string;
  svgHtml?: string;
  location?: string;
  time?: string;
}

export interface EducationBook {
  id: number;
  code: string;
  title: string;
  year: string;
  org: string;
  format: string;
  focus: string;
  desc: string;
  orientation?: string;
  modules: string[];
  practice?: string[];
  competencies?: string[];
  careerValue?: string;
  intersectionSkills?: string;
  proof?: string;
  courseImg?: string;
  outcome: string;
  bannerImg: string;
  certImg: string;
  theme: {
    color: string;
    gradient: string;
  };
}

export interface DomainLogo {
  src: string;
  alt: string;
  name: string;
}

export interface DomainData {
  id: string;
  category: string;
  code: string;
  iconName: string;
  titleVi: string;
  titleEn: string;
  experienceVi: string;
  experienceEn: string;
  roleVi: string;
  roleEn: string;
  teamSizeVi: string;
  teamSizeEn: string;
  toolsVi: string;
  toolsEn: string;
  orientationVi: string;
  orientationEn: string;
  descVi: string;
  descEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  partnersVi: string;
  partnersEn: string;
  logos: DomainLogo[];
  colorTheme: {
    primary: string;
    border: string;
    glow: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    textGradient: string;
  };
}

export interface MilestoneDomain {
  title: string;
  desc: string;
  tag: string;
}

export interface MilestonePhoto {
  src: string;
  title: string;
  desc: string;
}

export interface MilestoneKpi {
  label: string;
  percent: number;
}

export interface ExperienceMilestone {
  key: string;
  year: string;
  cardYearLabel: string;
  cardYearColor: string;
  period: string;
  company: string;
  subCompanies: string;
  tag: string;
  tagCategory: string;
  hexColor: string;
  logo: string;
  bannerUrl: string;
  headcount: number;
  tenure: string;
  roleTitle: string;
  location: string;
  highlightText: string;
  cardDescription: string;
  paragraphs: string[];
  domains: MilestoneDomain[];
  photos: MilestonePhoto[];
  tasks: string[];
  projects: string[];
  kpis: MilestoneKpi[];
  /** Mã mục kinh nghiệm (VD: 4.1) */
  code?: string;
  /** Lĩnh vực hoạt động */
  industry?: string;
  /** Mô tả quy mô quản lý đầy đủ */
  scaleDesc?: string;
  /** Các mục giới thiệu (tiêu đề + nội dung) */
  intro?: { title: string; desc: string }[];
  /** Triết lý quản trị */
  philosophy?: string;
  /** Cam kết chất lượng */
  commitments?: string[];
  /** Logo sản phẩm / thương hiệu liên quan */
  products?: { src: string; alt: string }[];
  /** Hình ảnh kỷ niệm (dùng làm ảnh dự phòng cho banner) */
  memoryImg?: string;
}

export interface ProjectStarAction {
  step: string;
  title: string;
  desc: string;
}

export interface ProjectData {
  id: string;
  code: string;
  number: string;
  title: string;
  groupTitle: string;
  groupKey: 'strategy' | 'cx' | 'sop' | 'tech' | 'learning';
  description: string;
  phase: string;
  progressText: string;
  progressPercent: number;
  role: string;
  hashtags: string[];
  image: string;
  mindmap: string;
  quote: string;
  englishTitle?: string;
  fullContent?: string;
  star: {
    situation: string;
    approach: string;
    actions: ProjectStarAction[];
    results: string[];
  };
}

export interface SystemData {
  id: string;
  abbr: string;
  nameVi: string;
  nameEn: string;
  fullName: string;
  url: string;
  descVi: string;
  descEn: string;
  featuresVi: string[];
  themeColor: string;
  waveColor: string;
  waveSoft: string;
  waveGlow: string;
  gradient: string;
  iconSvg?: string;
}

export interface InterviewQuestion {
  stt: number;
  categoryKey: string;
  categoryVi: string;
  timestamp: string;
  startSec: number;
  endSec: number;
  askerVi: string;
  questionVi: string;
  answererVi: string;
  answerVi: string;
  keyTakeawayVi: string;
}

export interface ZodiacData {
  id: string;
  nameVi: string;
  animalVi: string;
  icon: string;
  tier: 'best' | 'support' | 'caution';
  tierLabelVi: string;
  years: string;
  relationshipVi: string;
  score: string;
  workplaceFitVi: string;
  deskDirectionVi: string;
  workplaceAdviceVi: string;
}

export interface MemoryPhoto {
  id: string;
  companyId: string;
  category: 'awards' | 'team' | 'projects' | 'milestones';
  titleVi: string;
  year: string;
  locationVi: string;
  tagVi: string;
  imageUrl: string;
  descVi: string;
  quoteVi?: string;
  teamSize?: string;
}

export type WallpaperType = 'class' | 'color' | 'gradient' | 'image' | 'video' | 'css';

export interface WallpaperOption {
  id: string;
  name: string;
  type: WallpaperType;
  value: string;
  previewStyle?: React.CSSProperties;
  className?: string;
  isCustom?: boolean;
  createdAt?: number;
}

export type SiteTheme = 'light-glass' | 'light-glass-multicolor' | 'dark-neon' | 'flat-rainbow' | (string & {});

export interface ThemeOption {
  id: SiteTheme;
  name: string;
  fourWordName: string;
  icon: string;
  badge: string;
  description: string;
  accentColor: string;
  isDark?: boolean;
}

