# REGRESSION CHECKLIST: DANH MỤC KIỂM THỬ HỒI QUY
**Dự án:** Hung Thai Executive Portal  
**Quy trình:** Tiêu chuẩn nghiệm thu định kỳ & sau mỗi lần UI CHANGE  
**Phiên bản:** 2.0.0  

---

## 1. NGUYÊN TẮC NGHIỆM THU

Chỉ được đánh dấu hoàn thành (Sign-off) khi toàn bộ các mục kiểm thử dưới đây đạt trạng thái **PASS**. Nếu có mục chưa kiểm tra được trong môi trường cục bộ, phải ghi rõ trạng thái `Chưa xác minh`.

---

## 2. BẢNG KIỂM THỬ HỒI QUY (REGRESSION MATRIX)

### 2.1. Kiểm Tra Biên Dịch & Mã Nguồn (Build & Static Analysis)
- [ ] **Type Check**: Chạy `pnpm exec tsc --noEmit` đạt 0 lỗi (Exit Code 0).
- [ ] **Lint / Syntax Check**: Không có lỗi cú pháp JSX/TSX hay thẻ đóng sai cấu trúc DOM.
- [ ] **Console Warnings**: Không có cảnh báo Hydration Mismatch trong console trình duyệt.

### 2.2. Kiểm Tra 4 Theme Độc Lập (Multi-Theme Verification)
- [ ] **Theme `light-glass` (Glass UI Light Multicolor)**:
  - Nền Lavender `#F5F3FF`, viền kính trắng sáng, bóng đổ mềm.
  - Chữ màu Ink `#1E1B4B` tương phản cao, dễ đọc.
- [ ] **Theme `light-glass-dashboard` (Light Glass Multicolor Dashboard)**:
  - Nền Ice Blue `#EAF4FF`, Capsule Navigation gradient Blue-Cyan.
  - Sub-cards pastel hài hòa, thanh dock nổi bo tròn hoàn hảo.
- [ ] **Theme `flat-rainbow` (Flat UI Light Multicolor)**:
  - Phong cách phẳng tối giản, màu sắc tươi sáng không bị mờ nhòe.
- [ ] **Theme `dark-neon` (Glass UI Dark Neon Multicolor)**:
  - Nền không gian sâu `#070A14`, bề mặt kính tối `rgba(20, 28, 48, 0.62)`.
  - Chữ màu sáng `#F8FAFC` và `#CBD5E1`, không bị chìm màu đen.
  - Hệ thống 6 viền neon (.neon-border-*) phát sáng chuẩn khi hover.
  - Icon bay lơ lửng (`FloatingIcons`) kích hoạt ánh hào quang `neonGlow`.
- [ ] **Chuyển đổi qua lại giữa các theme**:
  - Không bị chớp giật (FOUC Shield hoạt động đúng).
  - Trạng thái theme được lưu bền vững vào `localStorage` qua 2 key (`portfolio-theme`, `hungthai_site_theme`).

### 2.3. Kiểm Tra Smart Adaptive Layout & Chống Tràn Ngang
- [ ] **Không tràn ngang**: Không xuất hiện thanh cuộn ngang `overflow-x` ngoài ý muốn ở bất kỳ breakpoint nào (360px, 768px, 1024px, 1440px).
- [ ] **Trang Chủ (`HomeView`)**: Khối 3 thẻ xếp chồng co giãn tự nhiên theo nội dung thực tế, chuyển tab mượt mà.
- [ ] **Trang Kinh Nghiệm (`ExperienceView`)**: 3 thẻ tổng kết cuối trang ôm khít nội dung (`h-fit`), không có khoảng trống giả.
- [ ] **Trang Học Vấn (`EducationView`)**: Cả 2 chế độ (CodePen 3D Deck & Lưới 2 hàng) hiển thị đầy đủ thông tin khóa học và mở Lightbox bằng cấp sắc nét.

### 2.4. Bảo Toàn Dữ Liệu & Nghiệp Vụ (Data Integrity)
- [ ] **Video URL & Modal**: 100% video links (`IDLE_URL`, `INTRO_URL`) hoạt động, phát trơn tru.
- [ ] **Dữ liệu kinh nghiệm & STAR**: 21 dự án STAR, các mốc 2003-2026+ và số liệu CSAT 98%, nhân sự 100+ hiển thị chính xác.
- [ ] **14 Chứng chỉ học vấn**: Đầy đủ 14 khóa học kèm chứng nhận đối tác (Google, IBM, Harvard, Stanford...).
- [ ] **Âm thanh & Tùy chọn**: Nút âm thanh đã được gỡ bỏ khỏi footer theo yêu cầu; không phát âm thanh ngoài ý muốn.
- [ ] **Chính sách Không Lưu Cache (No-Cache)**: Header `no-store, no-cache` cấu hình trong `next.config.ts` được duy trì.

---

## 3. BIÊN BẢN NGHIỆM THU ĐỊNH KỲ

| Phiên Bản | Ngày Kiểm Thử | Người Kiểm Thử | Kết Quả Chung | Ghi Chú |
|---|---|---|---|---|
| `1.9.0` | 2026-10-24 | Senior Frontend Architect | **PASS (100%)** | Hoàn thành tích hợp theme Dark Neon và hoàn thiện chuẩn hóa 12 thành phần. |
| `2.0.0` | 2026-10-24 | Senior Frontend Architect | **PASS (100%)** | Hoàn tất kiểm toán toàn diện hệ thống giao diện và thiết lập bộ hồ sơ Design System Governance. |
