# DÂNHD SÁCH BẢN ĐỒ SỬ DỤNG TÀI NGUYÊN DỰ ÁN (FILE USAGE MAP)

Tài liệu này liệt kê phân loại trạng thái sử dụng của toàn bộ các tệp tin trong hệ thống **CVNew**.

---

## 1. CẤU HÌNH GỐC DỰ ÁN (CONFIG)

| Tệp tin | Trạng thái | Mô tả chức năng |
|---|---|---|
| `package.json` | `CONFIG` | Khai báo phụ thuộc, scripts nâng cấp CI/CD và tối ưu hóa |
| `bun.lock` | `CONFIG` | Khóa phiên bản gói phụ thuộc ở dạng JSON chuẩn hợp lệ |
| `next.config.ts` | `CONFIG` | Cấu hình Next.js App Router, hình ảnh remotePatterns |
| `tsconfig.json` | `CONFIG` | Cấu hình TypeScript compiler |
| `postcss.config.mjs` | `CONFIG` | Cấu hình PostCSS & Tailwind CSS v4 |
| `tailwind.config.ts` | `CONFIG` | Thừa hành Tailwind CSS tokens |
| `netlify.toml` | `CONFIG` | Cấu hình triển khai thuần Web trên Netlify |
| `firebase-applet-config.json` | `CONFIG` | Kết nối dự án Firebase Firestore & Auth |
| `firebase-blueprint.json` | `CONFIG` | Blueprint schema dữ liệu Firestore |
| `firestore.rules` | `CONFIG` | Quy tắc bảo mật Firestore Security Rules |
| `metadata.json` | `CONFIG` | Metadata ứng dụng AI Studio |

---

## 2. THÀNH PHẦN GIAO DIỆN CHÍNH (USED COMPONENTS)

### A. Layout & Core Core Components (`src/components/`)
| Tệp / Thư mục | Trạng thái | Nhiệm vụ |
|---|---|---|
| `src/app/layout.tsx` | `USED` | Root Layout chuẩn Next.js App Router, tích hợp ThemeProvider, SoundEngine, OfflineFallback & SmartResourcePreloader |
| `src/app/page.tsx` | `USED` | Trang chủ tổng hợp giới thiệu, kinh nghiệm, dịch vụ, bento grid & chatbot AI |
| `src/components/ui/OfflineFallback.tsx` | `USED` | Giao diện cảnh báo khi mất kết nối mạng và hỗ trợ gọi hotline trực tiếp |
| `src/components/ui/SmartResourcePreloader.tsx` | `USED` | Cơ chế tải trước trang tiếp theo khi di chuột lên navigation link |
| `src/components/ui/SoundEngine.ts` | `USED` | Bộ tổng hợp âm thanh Web Audio API (chime, tap, flip, rain, spark) |
| `src/components/ui/Header.tsx` | `USED` | Navigation Header hỗ trợ switch Theme & Sound Toggle |
| `src/components/ui/Footer.tsx` | `USED` | Footer chứa thông tin bản quyền và liên hệ |
| `src/components/ui/BentoGrid.tsx` | `USED` | Hiển thị bố cục Bento Grid hiện đại cho dự án và kỹ năng |
| `src/components/ui/GlassCard.tsx` | `USED` | Card Glassmorphism đa màu sắc co giãn linh hoạt |

---

## 3. DỮ LIỆU CỐ ĐỊNH NỀN TẢNG (`src/data/` & `public/`)

| Tệp tin | Trạng thái | Mô tả dữ liệu |
|---|---|---|
| `src/data/profile.ts` | `USED` | Thông tin hồ sơ chuyên gia Nguyễn Hùng Thái |
| `src/data/experience.ts` | `USED` | Dữ liệu hành trình kinh nghiệm và cột mốc công ty |
| `src/data/skills.ts` | `USED` | Danh mục kỹ năng, ma trận SWOT và phần trăm năng lực |
| `src/data/services.ts` | `USED` | Các gói giải pháp và dịch vụ tư vấn |
| `cloudinary_resources.json` | `USED` | Danh mục đường dẫn ảnh Cloudinary tối ưu |
| `all_custom_cloudinary.json` | `USED` | Dữ liệu tài nguyên ảnh đám mây dự phòng |

---

## 4. TÀI LIỆU LƯU TRỮ VÀ THỰC THI (DOCS & ARCHIVE)

| Tệp tin | Trạng thái | Vị trí / Ghi chú |
|---|---|---|
| `CLEANUP_REPORT.md` | `DOCS` | Báo cáo chi tiết quá trình dọn dẹp dự án |
| `FILE_USAGE_MAP.md` | `DOCS` | Bản đồ phân loại file trong hệ thống |
| `CLEANUP_MANIFEST.md` | `DOCS` | Danh sách kiểm soát chi tiết dọn dẹp |
| `PERFORMANCE_OPTIMIZATION_REPORT.md` | `DOCS` | Báo cáo kiểm toán hiệu suất website |
| `WEB_MIGRATION_REPORT.md` | `DOCS` | Báo cáo chuyển đổi kiến trúc thuần Web |
| `CACHE_AUDIT_REPORT.md` | `DOCS` | Báo cáo kiểm toán bộ nhớ đệm |
| `docs/archive/thu_ngo_full.txt` | `ARCHIVE` | Tài liệu văn bản thư ngỏ lưu trữ |
| `docs/archive/check-svgs.js` | `ARCHIVE` | Script kiểm tra SVG cũ |
