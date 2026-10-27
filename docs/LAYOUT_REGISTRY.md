# LAYOUT REGISTRY: DANH MỤC BỐ CỤC CHUẨN HÓA
**Dự án:** Hung Thai Executive Portal  
**Quản lý kiến trúc:** Layout System & Responsive Grid  
**Phiên bản:** 2.0.0 — Unified Layout Governance  

---

## 1. NGUYÊN TẮC BỐ CỤC (LAYOUT PRINCIPLES)

1. **Smart Adaptive Sizing**: Mọi container và card phải tự thích ứng theo lượng nội dung thực tế (`height: auto` hoặc `height: fit-content`), không ép cứng chiều cao cố định dẫn đến tràn chữ hoặc tạo khoảng trống giả vô nghĩa.
2. **Horizontal Overflow Prevention**: Luôn đảm bảo không có thanh cuộn ngang ngoài ý muốn trên mọi độ phân giải (Mobile 360px -> 4K Desktop).
3. **Responsive Breakpoints**:
   - `sm`: 640px (Mobile xoay ngang / Phablet)
   - `md`: 768px (Tablet dọc)
   - `lg`: 1024px (Tablet ngang / Laptop nhỏ)
   - `xl`: 1280px (Desktop tiêu chuẩn)
   - `2xl`: 1536px (Màn hình lớn / TV trình chiếu)
4. **Dock & Navigation Clearance**: Luôn chừa khoảng đệm an toàn phía trên (`pt-20` đến `pt-24`) cho Header capsule và phía dưới (`pb-24` đến `pb-28`) cho thanh Footer dock.

---

## 2. DANH MỤC CÁC PATTERN BỐ CỤC CHÍNH (LAYOUT CATALOG)

### 2.1. 3D Interactive Layered Cards Deck
- **Nơi áp dụng**: [`HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx)
- **Đặc điểm**:
  - Gộp 3 thẻ Bento thành một cụm duy nhất có chiều sâu 3 tầng.
  - Thẻ kích hoạt nằm ở tầng trên cùng (`z-30, scale-100`), 2 thẻ sau nhô xuống dưới (`translate-y-4` và `translate-y-8`, `scale-[0.98]` và `scale-[0.96]`).
  - Thanh điều hướng Segmented Tab bo cong với nhãn phân cấp màu và cụm nút mũi tên lùi/tiến.
  - Hỗ trợ click trực tiếp vào mép thẻ sau để trồi lên phía trước.

### 2.2. CodePen 3D Stack Deck
- **Nơi áp dụng**: [`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx)
- **Đặc điểm**:
  - 14 thẻ chứng chỉ xếp lớp theo chiều ngang với góc nghiêng và độ trượt tinh tế.
  - Hover làm thẻ nổi lên; nhấp chuột sẽ mở rộng thẻ (`is-active`) với hình ảnh bằng cấp, các module đào tạo và nút mở Lightbox xem chi tiết.

### 2.3. 2-Row Responsive Grid
- **Nơi áp dụng**: Chế độ xem thứ 2 của [`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx)
- **Đặc điểm**:
  - Phân chia danh sách thành 2 hàng thẻ cân đối trên màn hình lớn (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
  - Phù hợp cho việc quét nhanh toàn bộ 14 chứng chỉ trong một khung nhìn.

### 2.4. Split Master-Detail Timeline Layout
- **Nơi áp dụng**: [`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx), [`ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx)
- **Đặc điểm**:
  - Cột bên trái/phía trên: Bộ lọc mốc thời gian, danh mục hoặc danh sách thẻ tóm tắt.
  - Khung nội dung chính: Thẻ chi tiết sâu (STAR Framework, hình ảnh chứng minh, KPIs, nhiệm vụ thực thi).
  - Khối thẻ tổng kết cuối trang áp dụng `items-start` và `h-fit` ôm sát nội dung.

### 2.5. Bento Tech Grid Layout
- **Nơi áp dụng**: [`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx), [`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx)
- **Đặc điểm**:
  - Hệ thống lưới phi đối xứng với các ô thẻ kích thước linh hoạt (1x1, 2x1, 2x2).
  - Tối ưu hóa phân bổ thị giác giữa số liệu thống kê (KPIs) và nội dung giải thích công nghệ.

### 2.6. Floating Capsule Navigation & Dock Layout
- **Nơi áp dụng**: [`Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx), [`Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx)
- **Đặc điểm**:
  - Thanh Header capsule cố định phía trên (`fixed top-4 left-1/2 -translate-x-1/2 z-50`).
  - Thanh Footer dock cố định phía dưới (`fixed bottom-4 left-1/2 -translate-x-1/2 z-50`), bo tròn 999px.
  - Tích hợp linh hoạt các micro-widget: Thời tiết, Đồng hồ, Nút đổi giao diện, Menu trang.
