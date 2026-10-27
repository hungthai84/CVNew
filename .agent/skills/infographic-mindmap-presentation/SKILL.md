---
name: infographic-mindmap-presentation
description: Design system, architectural specifications, and interactive implementation patterns for presenting Mindmap Infographics on websites (Next.js, React, Tailwind CSS, SVG Bezier Curves, Glassmorphism). Supports organic radial hubs, flowing bezier connector lines, interactive leaf nodes with metrics, dual Light Glass and Dark Neon themes, zoom/pan navigation, and audio synchronization. Strictly enforces the 4-word sentence-case title rule, no &, color tokens, and 100% data fidelity.
---

# Mindmap Infographic Presentation System & Architecture

Tài liệu đặc tả toàn diện và quy chuẩn kiến trúc cho giải pháp **Trình bày Sơ Đồ Tư Duy Dạng Infographic (Infographic Mindmap Presentation)** trên nền tảng **Next.js, React, Tailwind CSS và Glassmorphism**.
Mục tiêu: Biến các cấu trúc dữ liệu kỹ năng, chuyên môn, hệ sinh thái và năng lực quản trị thành trải nghiệm thị giác sống động, phân tầng rõ rệt, tính tương tác cao (Zoom/Pan/Click/Audio) và tương thích hoàn hảo giữa 2 chế độ **Light Glass (Kính Sáng)** và **Dark Neon (Neon Tối)**.

---

## 1. 6 NGUYÊN TẮC BẮT BUỘC TRONG THIẾT KẾ MINDMAP INFOGRAPHIC

1. **Bảo Tồn 100% Dữ Liệu Gốc (Data First)**:
   - Mindmap chỉ là một góc nhìn trình bày (presentation view) của dữ liệu. Tuyệt đối không thay đổi, cắt xén, bịa đặt số liệu hay nội dung so với nguồn dữ liệu (`skills.ts`, `systems.ts`, v.v.).
2. **Quy Tắc Tiêu Đề Node Chuẩn 4 Từ (Sentence Case 4-Word Title)**:
   - Tiêu đề của các Branch Node hoặc Leaf Node phải súc tích với độ dài **tối đa 4 từ**.
   - Tuyệt đối **KHÔNG dùng ký tự "&" hoặc từ "và"** trong tiêu đề node.
   - Định dạng: Viết hoa chữ đầu, còn lại viết thường (Sentence case).
   - Ngoại lệ: Giữ nguyên viết hoa các từ viết tắt công nghệ/chuyên môn (AI, CX, CSKH, CRM, ERP, KPI, SLA, SOP, Kaizen...).
3. **Khung Hợp Nhất Cho Icon & Tiêu Đề Node (Unified Capsule Frame)**:
   - Cấm bọc icon bằng khung tròn cô lập. Icon và tiêu đề node luôn nằm trong một khối capsule pill liền lạc bo góc mềm mại.
4. **Đồng Bộ Màu Nhận Diện Phân Nhánh (Branch Color Continuity)**:
   - Mỗi phân nhánh lớn (Major Branch) sở hữu một mã màu chủ đạo (Accent Color Token). Toàn bộ đường dẫn SVG, viền node, hào quang ánh sáng (glow), phần trăm metric và icon trong nhánh đó phải kế thừa trực tiếp mã màu này.
5. **Thích Ứng Kép Hoàn Hảo Sáng (Light Glass) & Tối (Dark Neon)**:
   - **Light Glass**: Đường cong kết nối bán trong suốt `rgba(accent, 0.35)`, nền node `rgba(255,255,255,0.85)` phủ `backdrop-blur-xl`, đổ bóng tinh tế `0 10px 25px -5px rgba(0,0,0,0.06)`, chữ `text-slate-800`.
   - **Dark Neon**: Đường cong kết nối phát sáng neon `drop-shadow(0 0 6px accent)`, nền node `rgba(15,23,42,0.88)` với viền neon `rgba(accent, 0.45)`, chữ `text-slate-100`.
6. **Mức Độ Tác Động Trong Nhóm Thách Thức (Threats Metric Rule)**:
   - Khi hiển thị phần trăm trong nhánh Thách thức (T), bắt buộc sử dụng nhãn **"Mức độ tác động"**, tuyệt đối KHÔNG ghi "Mức độ kỹ năng" để tránh gây hiểu nhầm về năng lực cá nhân.

---

## 2. KIẾN TRÚC HÌNH THÁI SƠ ĐỒ (MINDMAP TOPOLOGY)

```
                              ┌────────────────────────┐
                              │     Leaf Node 1.1      │
                              └───────────▲────────────┘
                                          │ (Bezier Path)
    ┌──────────────────────┐  (Bezier)  ┌─┴──────────────────┐
    │     Leaf Node 2.1    │◄───────────┤   BRANCH 1 (S)     │
    └──────────────────────┘            │ Điểm mạnh vận hành │
                                        └─────────▲──────────┘
                                                  │
                                                  │ (Energy Pulse)
                       ┌──────────────────────────┴──────────────────────────┐
                       │                   CENTRAL HUB CORE                  │
                       │         Kỹ Năng Cốt Lõi - Nguyễn Hùng Thái          │
                       │             (Executive Nucleus Ring)                │
                       └──────────────────────────┬──────────────────────────┘
                                                  │
                                                  │ (Energy Pulse)
                                        ┌─────────┴──────────┐
                                        │   BRANCH 3 (O)     ├───────────►┌──────────────────────┐
                                        │ Cơ hội chuyển đổi  │  (Bezier)  │     Leaf Node 3.1    │
                                        └─────────┬──────────┘            └──────────────────────┘
                                          │ (Bezier Path)
                              ┌───────────▼────────────┐
                              │     Leaf Node 3.2      │
                              └────────────────────────┘
```

### A. Tâm Điểm Trung Tâm (Central Hub Core)
- Biểu tượng hạt nhân với 3 vòng hào quang đồng tâm (Pulsating Rings) tạo chiều sâu 3D.
- Chứa Avatar / Logo biểu trưng, tên chủ thể và danh hiệu điều hành cấp cao.
- Nút phát hiệu ứng sóng âm hoặc thuyết minh tổng quan.

### B. Nhánh Chính Cấp 1 (Primary Branches / Quadrants)
- Đại diện cho các nhóm chiến lược lớn (ví dụ ma trận SWOT: S - Điểm mạnh, W - Hoàn thiện, O - Cơ hội, T - Thách thức, LANG - Ngôn ngữ & AI).
- Phân bố dạng tỏa tròn đối xứng (Radial Symmetrical) trên màn hình lớn hoặc phân tầng hình cây (Hierarchical Flow) linh hoạt.

### C. Node Lá Cấp 2 (Leaf Nodes / Skill Elements)
- Hiển thị từng kỹ năng chuyên biệt: Icon + Tiêu đề chuẩn 4 từ + Thang điểm phần trăm dạng badge + Mô tả ngắn súc tích.
- Tương tác: Click để mở Modal Chi Tiết, lật thẻ mini KPI, hoặc phát Audio tóm tắt 15 giây.

---

## 3. THUẬT TOÁN ĐƯỜNG CONG SVG BEZIER (CURVED CONNECTORS)

Để tạo cảm giác infographic hữu cơ mượt mà, các đường kết nối giữa Hub và các Node con sử dụng đường cong Bézier bậc ba (Cubic Bézier):

```typescript
/**
 * Tính toán tọa độ đường cong Cubic Bézier mượt mà giữa hai điểm (x1, y1) và (x2, y2)
 */
export function getBezierPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature: number = 0.5
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  // Điểm điều khiển 1 và 2 uốn cong theo trục ngang hoặc dọc tùy vào khoảng cách
  const cx1 = x1 + dx * curvature;
  const cy1 = y1;
  const cx2 = x1 + dx * (1 - curvature);
  const cy2 = y2;
  
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}
```

### Hiệu Ứng Dòng Năng Lượng Động (Animated Energy Stream)
Đường cong SVG được phủ 2 lớp:
1. **Lớp nền tĩnh (Track Layer)**: Viền bán mờ tạo dáng nhánh cây.
2. **Lớp xung năng lượng (Pulse Stream Layer)**: Sử dụng thuộc tính `stroke-dasharray` và `stroke-dashoffset` với CSS keyframe animation chạy dọc theo đường cong từ trung tâm tỏa ra các node ngoại vi.

---

## 4. BẢNG MÃ MÀU TOKENS CHO CÁC PHÂN NHÁNH

| Phân Nhánh | Token Name | Light Glass Code | Dark Neon Code | Ý Nghĩa Chiến Lược |
| :--- | :--- | :--- | :--- | :--- |
| **S - Điểm Mạnh** | `branch-strengths` | `#0284c7` (Sky) | `#38bdf8` (Neon Cyan) | Nền tảng điều hành vững chắc |
| **W - Hoàn Thiện** | `branch-weaknesses` | `#2563eb` (Blue) | `#60a5fa` (Neon Blue) | Nâng cao năng lực quản trị |
| **O - Cơ Hội** | `branch-opportunities`| `#d97706` (Amber) | `#fbbf24` (Neon Amber) | Chuyển đổi số & Kaizen |
| **AI - Công Nghệ** | `branch-tech-ai` | `#7c3aed` (Violet) | `#c084fc` (Neon Violet) | Tự động hóa & Trí tuệ nhân tạo |
| **T - Thách Thức** | `branch-threats` | `#e11d48` (Rose) | `#fb7185` (Neon Rose) | Quản trị rủi ro & biến động |
| **LANG - Ngôn Ngữ** | `branch-language` | `#059669` (Emerald) | `#34d399` (Neon Mint) | Giao tiếp toàn cầu & Song ngữ |

---

## 5. BỘ ĐIỀU KHIỂN TƯƠNG TÁC (INTERACTIVE CONTROLS)

Hệ thống Mindmap Infographic trên website cung cấp bộ phím điều hướng nổi (Floating HUD Toolbar):
- **Phóng to / Thu nhỏ (Zoom In / Zoom Out)**: Thang đo từ `0.6x` đến `1.5x` mượt mà với chuột lăn (wheel) hoặc nút bấm.
- **Tái lập khung nhìn (Reset View 1:1)**: Tự động căn giữa màn hình về vị trí Hub trung tâm.
- **Lọc theo nhánh (Branch Quadrant Filter)**: Nhấn để làm nổi bật nhánh được chọn (Focus Highlight) và làm mờ các nhánh còn lại (`opacity: 0.25`).
- **Thuyết minh đồng bộ giọng đọc (Audio Sync)**: Kích hoạt tóm tắt âm thanh 15 giây tích hợp công nghệ Speech Synthesis đồng bộ với Trợ Lý AI.
- **Chuyển đổi góc nhìn (View Switcher)**: Cho phép người dùng linh hoạt đổi giữa **Góc Nhìn Lưới Thẻ (Card Grid)** và **Góc Nhìn Sơ Đồ Tư Duy (Infographic Mindmap)**.

---

## 6. QUY CHUẨN THÍCH ỨNG DI ĐỘNG (MOBILE RESPONSIVE STRATEGY)

Trên thiết bị màn hình nhỏ (< 768px):
1. **Chế độ Canvas trượt tự do (Touch Pan & Pinch Zoom)**: Cho phép người dùng chạm vuốt đa điểm để khám phá toàn bộ sơ đồ.
2. **Mini-map Navigator ở góc phải**: Hiển thị radar thu nhỏ vị trí đang xem trên toàn sơ đồ.
3. **Danh sách phân nhánh thông minh (Branch Drawer / Tabs)**: Có các chip tròn ở cạnh trên màn hình để nhảy nhanh (Jump-to-node) đến nhánh tương ứng mà không cần phải cuộn tìm kiếm.
