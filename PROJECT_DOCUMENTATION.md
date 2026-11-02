# TÀI LIỆU HƯỚNG DẪN & BÁO CÁO TỔNG HỢP HỆ THỐNG CVNEW (MASTER SYSTEM DOCUMENTATION)

**Dự án:** CVNew – Executive Portfolio & CX Leadership Hub (Nguyễn Hùng Thái)  
**Công nghệ:** Next.js 15+ App Router, React 19, TypeScript 5.7, Tailwind CSS v4, Glass UI, Firebase Firestore, Cloudinary, IndexedDB  
**Cập nhật lần cuối:** Tháng 11/2026  

---

## MỤC LỤC TỔNG QUAN

1. [QUY TẮC NGUYÊN TẮC VÀ NỀN TẢNG PHÁT TRIỂN (DEVELOPMENT CONSTITUTION)](#1-quy-t%E1%BA%AFc-nguy%C3%AAn-t%E1%BA%AFc-v%C3%A0-n%E1%BB%81n-t%E1%BA%A3ng-ph%C3%A1t-tri%E1%BB%83n)
2. [DESIGN SYSTEM, GLASS UI VÀ THÀNH PHẦN GIAO DIỆN](#2-design-system-glass-ui-v%C3%A0-th%C3%A0nh-ph%E1%BA%A7n-giao-di%E1%BB%87n)
3. [CHUẨN HÓA TYPOGRAPHY VÀ KÍCH THƯỚC FONT CHỮ TOÀN WEBSITE](#3-chu%E1%BA%A9n-h%C3%B3a-typography-v%C3%A0-k%C3%ADch-th%C6%B0%E1%BB%9Bc-font-ch%E1%BB%AF-to%C3%A0n-website)
4. [QUẢN LÝ VÀ ĐỒNG BỘ GIAO DIỆN SÁNG / TỐI (LIGHT / DARK THEME SYSTEM)](#4-qu%E1%BA%A3n-l%C3%BD-v%C3%A0-%C4%91%E1%BB%93ng-b%E1%BB%99-giao-di%E1%BB%87n-s%C3%A1ng--t%E1%BB%91i)
5. [QUY TẮC PHÒNG CHỐNG TRÀN NỘI DUNG & RESPONSIVE CHUẨN ĐA THIẾT BỊ](#5-quy-t%E1%BA%AFc-ph%C3%B2ng-ch%E1%BB%91ng-tr%C3%A0n-n%E1%BB%99i-dung--responsive-chu%E1%BA%A9n-%C4%91a-thi%E1%BA%BFt-b%E1%BB%8B)
6. [BÁO CÁO KIỂM TOÁN VÀ DỌN DẸP CẤU TRÚC (CLEANUP REPORT)](#6-b%C3%A1o-c%C3%A1o-ki%E1%BB%83m-to%C3%A1n-v%C3%A0-d%E1%BB%8Dn-d%E1%BA%B9p-c%E1%BA%A5u-tr%C3%BAc)
7. [BÁO CÁO HỆ THỐNG CACHE VÀ TỐI ƯU HIỆU SUẤT (CACHE & PERFORMANCE AUDIT)](#7-b%C3%A1o-c%C3%A1o-h%E1%BB%87-th%E1%BB%91ng-cache-v%C3%A0-t%E1%BB%91i-%C6%B0u-hi%E1%BB%87u-su%E1%BA%A5t)
8. [BÁO CÁO CHUYỂN ĐỔI KIẾN TRÚC THUẦN WEB (WEB-FIRST ARCHITECTURE REPORT)](#8-b%C3%A1o-c%C3%A1o-chuy%E1%BB%83n-%C4%91%E1%BB%95i-ki%E1%BA%BFn-tr%C3%BAc-thu%E1%BA%A7n-web)
9. [BẢN ĐỒ PHÂN LOẠI TÀI NGUYÊN DỰ ÁN (FILE USAGE MAP & MANIFEST)](#9-b%E1%BA%A3n-%C4%91%E1%BB%93-ph%C3%A2n-lo%E1%BA%A1i-t%C3%A0i-nguy%C3%AAn-d%E1%BB%B1-%C3%A1n)

---

## 1. QUY TẮC NGUYÊN TẮC VÀ NỀN TẢNG PHÁT TRIỂN

### 1.1. Nguyên Tắc Bảo Toàn Dữ Liệu (Data First — Source of Truth)
- **Bảo toàn 100% dữ liệu:** Khi cập nhật giao diện hoặc nâng cấp hệ thống, giữ nguyên toàn bộ văn bản, số liệu, tên công ty, chức danh, năm công tác, chi tiết kinh nghiệm và dữ liệu dự án.
- **Tách biệt DATA khỏi UI:**
  - `src/data/profile.ts`: Thông tin chuyên gia Nguyễn Hùng Thái.
  - `src/data/experience.ts`: Hành trình 20+ năm công tác và logo công ty.
  - `src/data/skills.ts`: Ma trận kỹ năng SWOT và tỷ lệ phần trăm.
  - `src/data/services.ts`: Giải pháp vận hành CSKH chuyên sâu.
- **Không bịa dữ liệu:** Nếu phát hiện dữ liệu thiếu, giữ vị trí bằng placeholder rõ ràng và thông báo cho người dùng.

### 1.2. Thống Nhất Bán Kính Bo Cong Nút Bấm
- Tất cả thuộc tính `<button>` hoặc phần tử tương tác dạng nút đều sử dụng **`border-radius: 999px !important;`** (chế độ capsule/pill-shape).
- Quy tắc này áp dụng đồng bộ trong `src/styles/variables.css` và `src/styles/globals.css`.

### 1.3. Quy Tắc Thực Thi Tác Vụ Tuần Tự (Sequential Task Queue Rule)
- **Chạy từng task một:** Khi nhận nhiều yêu cầu chỉnh sửa hoặc nâng cấp, hệ thống bắt buộc đưa các yêu cầu vào **Hàng chờ tác vụ (Task Queue)**.
- **Hoàn thành dứt điểm mới chuyển tiếp:** Chỉ thực thi một task tại một thời điểm (`waitForPreviousTools: true`). Khi task hiện tại đã hoàn thành 100% mới chuyển sang thực thi task kế tiếp trong hàng chờ, tuyệt đối không chạy chồng chéo gây xung đột file hoặc lỗi build.

---

## 2. DESIGN SYSTEM, GLASS UI VÀ THÀNH PHẦN GIAO DIỆN

### 2.1. Glass UI & Claymorphism Standard
- **Glass Card Mặc Định:**
  ```css
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow: 0 10px 30px 0 rgba(100, 110, 140, 0.08);
  ```
- **Dark Glass / Neon Glow Standard:**
  ```css
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 211, 238, 0.35);
  box-shadow: 0 16px 45px -6px rgba(0,0,0,0.75), 0 0 24px rgba(34,211,238,0.22);
  ```

### 2.2. Biểu Tượng Icon Chuẩn (Hugeicons Integration)
- Sử dụng gói thư viện `@hugeicons/react` kết hợp bộ ánh xạ biểu tượng tập trung trong `src/components/ui/WebIcon.tsx`.
- Không tự ý thêm icon SVG hard-code hoặc icon không đúng stroke/semantics.

---

## 3. CHUẨN HÓA TYPOGRAPHY VÀ KÍCH THƯỚC FONT CHỮ TOÀN WEBSITE

### 3.1. Thang Kích Thước Typography (Typography Scale)
Sử dụng font chính **Play** (sans-serif hiện đại) kết hợp font số liệu monospace:

| Vai Trò | Desktop (>= 1024px) | Mobile (<= 768px) | Trọng Lượng & Thuộc Tính |
|---|---|---|---|
| **Display / Hero** | 2.5rem – 3.25rem | 2.0rem – 2.5rem | Font-Black, tracking-tight, line-height 1.15 |
| **H1 (Trang chính)** | 2.0rem – 2.25rem | 1.625rem – 1.875rem | Font-Bold, line-height 1.2 |
| **H2 (Phân khu)** | 1.5rem – 1.75rem | 1.25rem – 1.375rem | Font-Bold, line-height 1.25 |
| **H3 (Thẻ Card)** | 1.125rem – 1.25rem | 1.0rem – 1.125rem | Font-Bold, line-height 1.3 |
| **Body (Đoạn văn)** | 1.0rem (16px) | 0.9375rem (15px) | Font-Normal / Medium, line-height 1.6 |
| **Body Small** | 0.875rem (14px) | 0.8125rem (13px) | Font-Normal, line-height 1.5 |
| **Caption / Time** | 0.75rem (12px) | 0.75rem (12px) | Font-Medium, line-height 1.4 |
| **Metric / Number** | 1.75rem – 2.5rem | 1.375rem – 1.75rem | Font-Mono, Font-Black |

---

## 4. QUẢN LÝ VÀ ĐỒNG BỘ GIAO DIỆN SÁNG / TỐI (LIGHT / DARK THEME SYSTEM)

### 4.1. Chế Độ Theme Hiện Có
1. `dark-neon`: Giao diện tối Neon Glassmorphism với ánh kim cyan/purple rực rỡ.
2. `light-glass`: Giao diện sáng Glass Soft thanh lịch với nền pastel tươi sáng.
3. `luminous-glass`: Giao diện sáng ánh hào quang đa sắc với độ tương phản cao.

### 4.2. Quy Tắc Chuyển Đổi Theme
- Khi người dùng chuyển theme, **100% các phần tử trên website phải cập nhật đồng bộ**: Background, Header, Footer, Cards, Text, Border, Icons, Modals, Popup và Tooltips.
- Lưu trạng thái theme đã chọn vào `localStorage` (`hungthai_theme_mode`) để duy trì khi tải lại trang.

---

## 5. QUY TẮC PHÒNG CHỐNG TRÀN NỘI DUNG & RESPONSIVE CHUẨN ĐA THIẾT BỊ

### 5.1. Quy Tắc Container & Layout
- Mọi container bao ngoài phải có `max-width: 100%` và `box-sizing: border-box`.
- Không gán cứng `width` hoặc `height` bằng pixel cho các vùng chứa nội dung động.
- Dùng CSS Grid linh hoạt: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`.

### 5.2. Quy Tắc Typography & Media Chống Tràn
- Tất cả thẻ chứa văn bản dài (`p`, `span`, `h1`-`h4`) phải có `overflow-wrap: break-word` hoặc `word-break: break-word`.
- Hình ảnh và video: `max-width: 100%; height: auto; object-fit: cover;`.

---

## 6. BÁO CÁO KIỂM TOÁN VÀ DỌN DẸP CẤU TRÚC (CLEANUP REPORT)

- **Các thư mục tạm đã dọn dẹp:** Xóa `/.agent/` và `/tmp/`.
- **Dời file lưu trữ:** `thu_ngo_full.txt` ➔ `/docs/archive/thu_ngo_full.txt`.
- **Bổ sung scripts tự động:**
  - `npm run check:lock` (`scripts/validate-lockfile.mjs`): Kiểm tra cú pháp JSON của `bun.lock`.
  - `npm run audit:deps` (`scripts/audit-deps.mjs`): Quét lỗ hổng gói phụ thuộc.
  - `npm run minify:assets` (`scripts/minify-json-assets.mjs`): Nén nhỏ dung lượng file JSON tĩnh.
- **Tính năng mới bổ sung:** `OfflineFallback.tsx` và `SmartResourcePreloader.tsx`.

---

## 7. BÁO CÁO HỆ THỐNG CACHE VÀ TỐI ƯU HIỆU SUẤT (CACHE & PERFORMANCE AUDIT)

| Tầng Cache | Triển Khai | Chính Sách |
|---|---|---|
| **Static Assets** | `/_next/static/(.*)` | `Cache-Control: public, max-age=31536000, immutable` |
| **API Route** | `/api/*` | `Cache-Control: no-store, no-cache, must-revalidate` |
| **Media Large** | IndexedDB (`HungThaiCV_WallpapersDB`) | Lưu media lớn > 500KB tránh tràn `localStorage` |
| **UI Config** | `localStorage` | Lưu trữ < 500KB cho theme, sound, font scale |

---

## 8. BÁO CÁO CHUYỂN ĐỔI KIẾN TRÚC THUẦN WEB (WEB-FIRST ARCHITECTURE REPORT)

- **Chuẩn Hóa SEO & Trợ Năng:**
  - Tiêu đề, OpenGraph, Schema.org JSON-LD cho hồ sơ chuyên gia Nguyễn Hùng Thái.
  - Viewport trợ năng: `userScalable: true, maximumScale: 5`.
  - Hỗ trợ `robots.ts` và `sitemap.ts` tự động cho Googlebot indexing.

---

## 9. BẢN ĐỒ PHÂN LOẠI TÀI NGUYÊN DỰ ÁN (FILE USAGE MAP & MANIFEST)

### Các Tệp Cấu Hình Chính (Config)
- `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts`, `netlify.toml`, `firebase-applet-config.json`, `firestore.rules`.

### Các Component Giao Diện Sử Dụng (Used Components)
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`.
- `src/components/ui/GlassCard.tsx`, `src/components/ui/BentoGrid.tsx`, `src/components/ui/WebIcon.tsx`, `src/components/ui/SoundEngine.ts`.
- `src/components/ui/OfflineFallback.tsx`, `src/components/ui/SmartResourcePreloader.tsx`, `src/components/ui/SystemDocsModal.tsx`.

### Trạng Thái Kiểm Thử Biên Dịch (Build State)
- **Lệnh thực thi:** `compile_applet` / `tsc --noEmit`
- **Kết quả:** **Build Succeeded — 0 Error** 
