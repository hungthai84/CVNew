# Tra Cứu Ánh Xạ Các Loại Card Trên 14 Trang (Website Card Mapping Reference)

Bảng tra cứu chi tiết thể hiện từng trang trong 14 trang của Hung Thai Executive Portal đang sử dụng loại Card nào, màu chủ đạo, và các quy tắc cần tuân thủ.

| Trang (View) | File Nguồn | Dạng Card Sử Dụng | Tiêu Đề Khung Hợp Nhất | Trạng Thái Rà Soát |
|---|---|---|---|---|
| **0. HomeView** | `src/components/views/HomeView.tsx` | Hero Banner, 3D Layered Deck, Bento Highlights | "Giới Thiệu Hùng Thái", "Năng Lực Lõi" | Đã Chuẩn Hóa |
| **1. LetterView** | `src/components/views/LetterView.tsx` | Bento Responsive View Card (7+5 cols), Hero Banner | "Thư Ngỏ Tuyển Dụng", "Trụ Cột Hợp Tác", "Nguyên Tắc Vận Hành" | Đã Chuẩn Hóa |
| **2. AboutView** | `src/components/views/AboutView.tsx` | Bento Grid, Pastel Glass Cards | "Hồ Sơ Năng Lực", "Tầm Nhìn Chiến Lược" | Đã Chuẩn Hóa |
| **3. EducationView** | `src/components/views/EducationView.tsx` | 3D Stack Deck, 2-Row Grid Card | "Học Vấn Đại Học", "Chứng Chỉ Quốc Tế" | Đã Chuẩn Hóa |
| **4. DomainsView** | `src/components/views/DomainsView.tsx` | Pastel Glass Grid Card (6 Lĩnh Vực) | "Khách Hàng Trải Nghiệm", "Vận Hành Dịch Vụ" | Đã Chuẩn Hóa |
| **5. ExperienceView** | `src/components/views/ExperienceView.tsx` | Timeline Milestone Pill Card, STAR Detail Panel | "Giám Đốc Vận Hành", "Trưởng Ban Dịch Vụ" | Đã Chuẩn Hóa |
| **6. SkillsView** | `src/components/views/SkillsView.tsx` | Pastel Glass Grid Card, Radar Metric Card | "Kỹ Năng Quản Trị", "Công Nghệ Tự Động" | Đã Chuẩn Hóa |
| **7. ProjectsView** | `src/components/views/ProjectsView.tsx` | Bento Grid Card, Metric Pill Badge | "Dự Án Trọng Điểm", "Chuyển Đổi Số" | Đã Chuẩn Hóa |
| **8. SystemsView** | `src/components/views/SystemsView.tsx` | 3D Flip System Card (12 C-Level Modules) | "Kiến Trúc Hệ Thống", "Phân Hệ Vận Hành" | Đã Chuẩn Hóa (Dual Light/Dark) |
| **9. InterviewView** | `src/components/views/InterviewView.tsx` | Hero Video Banner (+50px), Interactive Chat Card | "Đối Thoại Mô Phỏng", "Phỏng Vấn Thực Chiến" | Đã Chuẩn Hóa |
| **10. TuViView** | `src/components/views/TuViView.tsx` | Celestial Glass Card, Astrological Wheel | "Lá Số Tử Vi", "Thiên Bàn Địa Bàn" | Đã Chuẩn Hóa |
| **11. GalleryView** | `src/components/views/GalleryView.tsx` | Masonry Photo Glass Card, Lightbox Modal | "Khoảnh Khắc Đáng Nhớ", "Kỷ Niệm Sự Nghiệp" | Đã Chuẩn Hóa |
| **12. ContactView** | `src/components/views/ContactView.tsx` | Glass Form Card, Direct Channel Pill Card | "Kết Nối Trực Tiếp", "Thông Tin Liên Hệ" | Đã Chuẩn Hóa |
| **13. BackgroundView** | `src/components/views/BackgroundView.tsx` | Video Selection Bento Grid | "Tùy Biến Nền Sống", "Kho Nền Động" | Đã Chuẩn Hóa |

---

## Bảng Màu Thương Hiệu Cho Các Loại Card (Brand Palette by System)

| Phân hệ / Thẻ | Light Glass Border & Background | Dark Neon Border & Background | Màu Icon & Tiêu Đề |
|---|---|---|---|
| **CX Core** | `#38bdf8` (Ice Sky Tint) | `#0ea5e9` (Neon Cyan) | `#0284c7` (Light) / `#38bdf8` (Dark) |
| **AI Omnichannel** | `#a855f7` (Pastel Purple Tint) | `#8b5cf6` (Electric Violet) | `#7c3aed` (Light) / `#a855f7` (Dark) |
| **Data Platform** | `#10b981` (Mint Tint) | `#059669` (Neon Emerald) | `#047857` (Light) / `#10b981` (Dark) |
| **Automation** | `#f59e0b` (Warm Amber Tint) | `#d97706` (Neon Gold) | `#b45309` (Light) / `#f59e0b` (Dark) |
| **QA / VoC** | `#ec4899` (Pastel Rose Tint) | `#db2777` (Hot Magenta) | `#be185d` (Light) / `#ec4899` (Dark) |
| **Talent & HR** | `#6366f1` (Indigo Tint) | `#4f46e5` (Deep Indigo) | `#4338ca` (Light) / `#6366f1` (Dark) |
