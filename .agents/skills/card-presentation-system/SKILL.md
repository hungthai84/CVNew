---
name: card-presentation-system
description: Design system, architectural specifications, and implementation patterns for all presentation card types across the Hung Thai Executive Portal (Next.js, Tailwind CSS, Glassmorphism). Standardizes 5 core card archetypes: 3D Flip System Cards, Bento Responsive View Cards, Pastel Glass Grid Cards, Timeline Milestone Pill Cards, and Hero Video Banner Cards. Strictly enforces unified icon+title frames, no isolated circular icon frames, 4-word capitalized titles, icon-to-title color matching, +50px banner height, crystal-clear background scrims, and dual Light Glass & Dark Neon theme support.
---

# Card Presentation Design System & Architecture

Tài liệu đặc tả toàn diện và quy chuẩn kiến trúc cho toàn bộ các dạng Card (Thẻ hiển thị) trên website **Hung Thai Executive Portal**.
Mục tiêu: Đảm bảo tính nhất quán 100% về mặt thị giác, trải nghiệm tương tác, khả năng tương thích 2 chế độ Sáng (Light Glass) / Tối (Dark Neon), và sự đồng bộ cấu trúc giữa 14 phân hệ trang.

---

## 1. 6 NGUYÊN TẮC BẮT BUỘC (INVIOLABLE RULES)

Mọi Card khi được khởi tạo hoặc hiệu chỉnh trên toàn bộ website bắt buộc phải tuân thủ tuyệt đối 6 quy tắc sau:

### Quy tắc 1: Bỏ khung tròn riêng của Icon (No Isolated Circular Icon Frame)
- **CẤM**: Bao bọc icon bằng khung tròn độc lập như `w-10 h-10 rounded-full border border-sky-400 bg-sky-500/10 flex items-center justify-center mr-3`.
- **Lý do**: Khung tròn riêng lẻ gây chia cắt thị giác, phân mảnh thiết kế và xung đột với ngôn ngữ hình khối chữ nhật bo góc của Card.
- **Đúng**: Icon nằm trực tiếp bên trong Khung Hợp Nhất (Unified Pill Frame) cùng với tiêu đề, hoặc icon hiển thị trần với hiệu ứng `drop-shadow` neon.

### Quy tắc 2: Tạo Khung Hợp Nhất Bao Trùm Icon và Tiêu Đề (Unified Frame)
- Icon và Tiêu đề phải được gom chung vào một khung pill / capsule liền khối:
  ```tsx
  <div 
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300"
    style={{
      backgroundColor: isDark ? `${cardColor}15` : `${cardColor}10`,
      borderColor: isDark ? `${cardColor}40` : `${cardColor}30`,
    }}
  >
    <WebIcon name={item.icon} className="w-4 h-4 shrink-0" style={{ color: cardColor }} />
    <span className="text-xs font-bold tracking-wide uppercase" style={{ color: cardColor }}>
      {formatCardTitle(item.title)}
    </span>
  </div>
  ```

### Quy tắc 3: Tiêu Đề Chuẩn 4 Chữ & Viết Hoa Chữ Đầu (4-Word Capitalized Title)
- Mọi tiêu đề thẻ con và tiêu đề khối phải được chuẩn hóa về độ dài **4 chữ** (hoặc 4 từ ngắn gọn, súc tích).
- Tất cả các chữ cái đầu phải được viết hoa.
- Luôn sử dụng helper function `formatCardTitle`:
  ```typescript
  export function formatCardTitle(str: string): string {
    if (!str) return '';
    const clean = str.replace(/[•\-_:]/g, ' ').replace(/\s+/g, ' ').trim();
    const words = clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    return words.slice(0, 4).join(' ');
  }
  ```

### Quy tắc 4: Màu Chữ Tiêu Đề Phải Đồng Bộ Tuyệt Đối Với Màu Icon
- Màu sắc của chữ tiêu đề (`color` hoặc `text-[var(--accent)]`) phải kế thừa trực tiếp từ màu sắc của Icon (`item.color` hoặc `accentColor`).
- Không được để màu chữ tiêu đề xám mờ (`text-slate-400`) khi icon đang mang màu nhận diện thương hiệu.
- Áp dụng trên cả thẻ Card, Menu Header khi được chọn, và thanh Dock Điều Hướng.

### Quy tắc 5: Thích Ứng Kép Hoàn Hảo Sáng (Light Glass) & Tối (Dark Neon)
Mỗi thẻ phải tự động điều chỉnh bảng màu nền và viền dựa theo thuộc tính `document.documentElement` (`class="dark"` hoặc `data-theme`):
- **Light Glass**:
  - Nền: `linear-gradient(135deg, #ffffff 0%, ${cardColor}12 55%, ${cardColor}22 100%)` hoặc `bg-white/85 backdrop-blur-xl`.
  - Viền: `border-${cardColor}35` đến `${cardColor}45`.
  - Màu chữ: `text-slate-800` / `text-slate-900` có độ tương phản cao trên nền sáng.
  - Bóng đổ: `shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]`.
- **Dark Neon**:
  - Nền: `radial-gradient(circle at top right, ${cardColor}35, transparent 70%), linear-gradient(145deg, #090e17 0%, #0d1527 100%)` hoặc `bg-slate-950/85 backdrop-blur-xl`.
  - Viền: `border-${cardColor}55` kết hợp bóng hào quang `box-shadow: 0 0 16px ${cardColor}25`.
  - Icon: `filter: drop-shadow(0 0 8px ${cardColor})`.
  - Màu chữ: `text-slate-100` / `text-slate-200`.

### Quy tắc 6: Banner Nền Trong Suốt Tinh Khiết & Tăng Chiều Cao Thêm +50px
- Tất cả Banner ngang trên toàn website được tăng chiều cao thêm `+50px` (chuẩn: `min-h-[290px]` trên mobile, `min-h-[350px]` trên desktop).
- Loại bỏ lớp phủ scrim đen kịt hoặc trắng đục (`bg-black/80`, `bg-white/90`).
- Lớp phủ mờ trong trẻo giúp video/hình ảnh nền lộ rõ sống động:
  ```tsx
  {/* Lớp mờ trong trẻo cho phép nhìn rõ nền banner */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-900/30 to-slate-950/40 backdrop-blur-[2px]" />
  ```

---

## 2. 5 DẠNG CARD CHUẨN MỰC TRÊN WEBSITE (THE 5 CARD ARCHETYPES)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      HỆ THỐNG 5 LOẠI CARD TRÌNH BÀY                          │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ 1. 3D Flip System Card        │ Thẻ lật 3D 2 mặt (SystemsView)              │
│ 2. Bento Responsive View Card │ Thẻ lưới Bento phi đối xứng (Letter, Home)  │
│ 3. Pastel Glass Grid Card     │ Thẻ lưới kính đa sắc (Domains, Skills, Edu) │
│ 4. Timeline Milestone Card    │ Thẻ mốc lộ trình con nhộng (Experience)     │
│ 5. Hero Video Banner Card     │ Thẻ banner toàn cảnh có video nền           │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

### TYPE 1: 3D FLIP SYSTEM CARD (Thẻ Hệ Thống Lật 3D 2 Mặt)
- **Vị trí áp dụng**: Cổng 12 Hệ Thống C-Level (`SystemsView.tsx`).
- **Cơ chế tương tác**: Lật 180 độ 3D khi bấm vào hoặc rê chuột; tương thích cả thiết bị cảm ứng và bàn phím.
- **Cấu trúc 2 mặt**:
  - **Mặt trước (Front Face)**:
    1. Header: Khung hợp nhất chứa Icon + Tiêu đề 4 chữ viết hoa cùng màu.
    2. Mã viết tắt (`abbr`) có hiệu ứng phát sáng Neon / chữ nổi dập nổi.
    3. Mô tả tóm tắt giá trị nghiệp vụ C-Level (2-3 dòng, `line-clamp-3`).
    4. Cụm chỉ số đo lường (3 Chips: ROI, Hiệu suất, Uptime).
    5. Nút gợi ý lật thẻ (`badge-flip`) dạng kính trong suốt.
  - **Mặt sau (Back Face)**:
    1. Tiêu đề kiến trúc kỹ thuật.
    2. 3 Năng lực lõi (Core Capabilities) kèm checkmark chuyên dụng.
    3. Nút CTA kích hoạt hệ thống với màu thương hiệu.
- **Mã nguồn mẫu**: Xem [`examples/CardExamples.tsx`](examples/CardExamples.tsx#L15-L85).

---

### TYPE 2: BENTO RESPONSIVE VIEW CARD (Thẻ Bento Lưới Phi Đối Xứng)
- **Vị trí áp dụng**: Thư Ngỏ Tuyển Dụng (`LetterView.tsx`), Trang Chủ (`HomeView.tsx`).
- **Đặc tính bố cục**:
  - Hệ thống lưới 12 cột linh hoạt (`col-span-12 lg:col-span-7` đan xen `col-span-12 lg:col-span-5`).
  - Bo góc mềm mại `rounded-[22px]`.
  - Khung Logo công ty bo tròn `rounded-xl border p-2`.
  - Khung hợp nhất chức danh (Role Capsule): Icon huân chương + Tiêu đề chức vụ cùng màu sắc nhận diện.
  - Thanh chỉ số thành tựu dưới đáy thẻ (Bottom Highlight Bar) dạng con nhộng bento.
- **Mã nguồn mẫu**: Xem [`examples/CardExamples.tsx`](examples/CardExamples.tsx#L90-L150).

---

### TYPE 3: PASTEL GLASS GRID CARD (Thẻ Kính Đa Sắc Đều Nhau)
- **Vị trí áp dụng**: 6 Lĩnh Vực Chuyên Môn (`DomainsView.tsx`), Bản Đồ Kỹ Năng (`SkillsView.tsx`), Học Vấn & Chứng Chỉ (`EducationView.tsx`).
- **Đặc tính bố cục**:
  - Lưới đều đặn 2, 3 hoặc 4 cột (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`).
  - Chiều cao đồng đều (`min-h-[260px] flex flex-col justify-between`).
  - Đường viền trên điểm nhấn (Accent Top Glow Border): `border-t-2 border-t-[var(--accent)]`.
  - Khung hợp nhất Icon + Tiêu đề 4 chữ nằm nổi bật ở góc trên.
  - Vùng nội dung: Thanh thước đo năng lực (%) hoặc danh sách thẻ tags con nhộng linh hoạt.
- **Mã nguồn mẫu**: Xem [`examples/CardExamples.tsx`](examples/CardExamples.tsx#L155-L210).

---

### TYPE 4: TIMELINE MILESTONE PILL CARD (Thẻ Mốc Lộ Trình Thời Gian)
- **Vị trí áp dụng**: Hành Trình Sự Nghiệp (`ExperienceView.tsx`), Lộ Trình Đào Tạo.
- **Đặc tính bố cục**:
  - Trục mốc thời gian nối tiếp (Timeline Spine Line).
  - Khung Hợp Nhất Mốc Sự Kiện: Gom chung Thời Gian (Năm) + Chức Vụ + Tên Doanh Nghiệp trong 1 viền khung mềm mại.
  - Điểm neo (Node Anchor) phát sáng theo theme.
  - Khối nội dung STAR (Situation - Task - Action - Result) thụt lề chuẩn, không có khung tròn phân mảnh.
- **Mã nguồn mẫu**: Xem [`examples/CardExamples.tsx`](examples/CardExamples.tsx#L215-L270).

---

### TYPE 5: HERO VIDEO BANNER CARD (Thẻ Banner Toàn Cảnh)
- **Vị trí áp dụng**: Banner đầu các trang (Home, Interview, Systems, Domains, Letter, Experience).
- **Đặc tính bố cục**:
  - Chiều cao tăng thêm `+50px` (`min-h-[290px] md:min-h-[350px]`).
  - Video nền hoặc hình ảnh chất lượng cao chạy ngầm.
  - Lớp phủ mờ trong suốt siêu mỏng (`bg-black/35` hoặc `bg-white/35 backdrop-blur-[2px]`), tuyệt đối không làm mờ đục hình nền.
  - Khung hợp nhất Tag trang + Tiêu đề 4 chữ cùng màu sắc chủ đạo.
  - Nút chuyển đổi nhanh hoặc nút CTA phỏng vấn thực chiến.
- **Mã nguồn mẫu**: Xem [`examples/CardExamples.tsx`](examples/CardExamples.tsx#L275-L330).

---

## 3. CHECKLIST KIỂM ĐỊNH TỰ ĐỘNG KHI DUYỆT CARD (AUDIT CHECKLIST)

Trước khi xác nhận hoàn thành bất kỳ trang hoặc thành phần Card nào, kiểm tra theo checklist sau:

- [ ] **Icon Frame**: Đã bỏ toàn bộ các thẻ `<div className="rounded-full w-10 h-10...">` bao quanh icon riêng lẻ chưa?
- [ ] **Unified Frame**: Icon và Tiêu đề đã nằm chung trong một khung pill bo tròn chưa?
- [ ] **Title Length**: Tiêu đề có đúng 4 từ súc tích (`formatCardTitle`) và viết hoa chữ đầu chưa?
- [ ] **Color Matching**: Màu chữ tiêu đề có trùng khớp 100% với màu của Icon chưa?
- [ ] **Theme Light**: Thẻ có hiển thị nền kính trắng ngà thanh lịch (`#ffffff` + pastel tint), viền rõ nét, chữ đậm tương phản tốt không?
- [ ] **Theme Dark**: Thẻ có hiển thị nền đen sâu thẳm (`#090e17`), viền neon phát sáng, icon có drop-shadow không?
- [ ] **Banner Height**: Banner có đạt chiều cao tiêu chuẩn (+50px) và video nền có nhìn rõ trong suốt không?
- [ ] **Responsiveness**: Thẻ có co giãn mượt mà trên mobile (360px - 430px) mà không bị tràn ngang không?
