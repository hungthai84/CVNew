# RESTRUCTURING & CLEANUP MANIFEST — CVNEW 2026+

Tài liệu Manifest này tổng hợp toàn bộ danh mục kiểm soát công việc đã hoàn thành trong quy trình kiểm toán, tối ưu hóa và dọn dẹp mã nguồn dự án CVNew.

---

## 1. DANH SÁCH FILE VÀ THƯ MỤC ĐÃ XÓA (DELETED)
- [x] `/.agent` (Thư mục làm việc tạm của công cụ agent - đã xóa)
- [x] `/tmp` (Thư mục tạm chứa script cũ - đã xóa)

---

## 2. DANH SÁCH FILE ĐÃ PHÂN LOẠI & LƯU TRỮ (MOVED / ARCHIVED)
- [x] `thu_ngo_full.txt` ➔ `/docs/archive/thu_ngo_full.txt`
- [x] `tmp/check-svgs.js` ➔ `/docs/archive/check-svgs.js`

---

## 3. SCRIPTS VÀ THÀNH PHẦN MỚI ĐÃ THÊM VÀO HỆ THỐNG (ADDED)
- [x] `scripts/validate-lockfile.mjs` (Script kiểm tra cú pháp JSON hợp lệ cho `bun.lock` & `package.json`)
- [x] `scripts/audit-deps.mjs` (Script quét lỗ hổng bảo mật gói phụ thuộc `bun pm audit`)
- [x] `scripts/minify-json-assets.mjs` (Script tự động nén nhỏ tệp JSON tĩnh)
- [x] `src/components/ui/OfflineFallback.tsx` (Component hiển thị giao diện ngoại tuyến thanh lịch và hotline trợ giúp)
- [x] `src/components/ui/SmartResourcePreloader.tsx` (Component tự động preload tài nguyên khi hover điều hướng)

---

## 4. CHUẨN HÓA GIAO DIỆN NÚT BẤM (UI BUTTON BORDER-RADIUS UNIFICATION)
- [x] `src/styles/variables.css`: Đặt `--radius-button: 999px !important;`
- [x] `src/styles/globals.css`: Đặt thuộc tính `border-radius: 999px !important;` cho tất cả thẻ `button`, `[role="button"]`, `.btn`, `.action-btn`.

---

## 5. TÍNH TOÀN VẸN CỦA DỮ LIỆU & BẢO TOÀN THIẾT KẾ (PRESERVATION CHECKLIST)
- [x] **Dữ liệu**: Bảo toàn 100% nội dung chữ, tên công ty, số liệu kinh nghiệm, thông tin chuyên gia Nguyễn Hùng Thái.
- [x] **Giao diện & Theme**: Giữ nguyên hiệu ứng Glassmorphic, bảng màu chuyển đổi Light/Dark, typography font **Play**, Bento Grid.
- [x] **Tính linh hoạt (Responsive)**: Đảm bảo không bị overflow trên Mobile (320px+), Tablet, Desktop và màn hình Ultra-wide.
- [x] **Biên dịch (Build State)**: Lệnh `compile_applet` thành công với **0 lỗi**.
