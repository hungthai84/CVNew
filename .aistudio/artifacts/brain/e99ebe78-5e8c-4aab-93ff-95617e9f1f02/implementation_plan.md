# Kế Hoạch Triển Khai: Nâng Cấp Tương Tác Timeline Kinh Nghiệm 2003–2026+

Kế hoạch xây dựng và tích hợp 3 tính năng tương tác cao cấp cho trang **Kinh Nghiệm (Hành Trình Sự Nghiệp)**:
1. **Hiệu ứng Dòng Chảy Ánh Sáng (Animated Pulse Flow)** trên trục nối ngang và nút `»`.
2. **Thẻ Nổi Xem Trước Thành Tựu Nhanh (Quick KPI Popover)** khi rê chuột vào huy hiệu Logo.
3. **Chế Độ Trình Chiếu Hành Trình Sự Nghiệp Tự Động (Auto-Play Career Story Mode)** với thanh thuyết minh nổi, tiến trình tự động và hỗ trợ giọng đọc tiếng Việt.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Toàn bộ 100% dữ liệu gốc trong `experience.ts` và `experienceUpdates.ts` được bảo toàn nguyên vẹn. Các tính năng mới chỉ bổ sung thêm tầng tương tác, hiệu ứng thị giác và trải nghiệm thuyết minh.

- **Đã xác nhận (Phase 1)**: Chế độ Trình chiếu Hành trình sẽ hiển thị thanh thuyết minh nổi gắn trên sơ đồ kèm thanh tiến trình từng mốc và nút bật/tắt giọng đọc tiếng Việt (Web Speech API).
- **Đã xác nhận (Phase 1)**: Thẻ nổi Quick KPI Popover hiển thị 3 chỉ số KPI tiêu biểu nhất, quy mô nhân sự và nút bấm xem chi tiết công tác.
- **Đã xác nhận (Phase 1)**: Tia sáng Pulse Flow chuyển động tuần tự mượt mà từ mốc 2003 qua các nút `»` đến mốc 2026+.

---

## 1. Overview & Core Concept

- **Mục tiêu**: Nâng cấp trang Kinh nghiệm từ một bảng sơ đồ tĩnh thành một trải nghiệm kể chuyện nghề nghiệp tương tác sống động, giúp nhà tuyển dụng và đối tác nắm bắt ngay các thành tựu cốt lõi và hành trình 22+ năm lãnh đạo qua từng thời kỳ.
- **Đối tượng**: Nhà tuyển dụng cấp cao, đối tác chiến lược, khách hàng tìm hiểu hồ sơ năng lực.
- **Giá trị cốt lõi**: Trải nghiệm xem hồ sơ trực quan, tiết kiệm thời gian tiếp cận thông tin và tạo ấn tượng chuyên nghiệp vượt trội.

---

## 2. User Experience & Visual Design

### A. Dòng Chảy Ánh Sáng Trên Trục Timeline (Animated Pulse Flow)
- Một dải sáng gradient chuyển động mượt dọc theo thanh ray ngang kết nối 8 cột mốc.
- Khi dải sáng đi qua nút tròn kép `»`, nút tròn sẽ phát sáng nhẹ (glow pulse), biểu thị năng lượng và dòng thời gian phát triển liên tục từ 2003 đến 2026+.
- Tích hợp chuẩn `@media (prefers-reduced-motion: reduce)` để tắt animation khi người dùng có thiết lập hạn chế chuyển động.

### B. Thẻ Nổi Quick KPI Popover Khi Rê Chuột
- Khi di chuột (hover) vào vòng tròn Logo công ty ở Tầng 2:
  - Xuất hiện thẻ Popover với hiệu ứng kính mờ (Glassmorphism), viền sáng tinh tế, bóng đổ mềm.
  - Nội dung gồm: Logo, Tên công ty, Chức danh, Quy mô nhân sự, và 3 chỉ số KPI cao nhất với thanh tiến độ màu sắc trực quan (CSAT, SLA, Tỷ lệ chuẩn hóa SOP...).
  - Nút bấm *"Xem toàn bộ chi tiết công tác"* mở ngay bảng chi tiết công tác.
  - Tự động định vị không bị che khuất hoặc tràn lề màn hình.

### C. Chế Độ Trình Chiếu Hành Trình Tự Động (Auto-Play Career Story Mode)
- Nút kích hoạt: Nút nổi bật *"Phát Hành Trình Sự Nghiệp"* nằm ngay bên cạnh nút Mindmap trên thanh điều khiển.
- Khi bật chế độ trình chiếu:
  - Thanh thuyết minh nổi (Floating Story Panel) xuất hiện phía trên timeline với tiêu đề thời kỳ, triết lý vận hành và điểm nhấn thăng tiến.
  - Vòng tròn cột mốc hiện tại tự động được làm nổi bật (active highlight & pulse ring).
  - Thanh tiến trình chạy mượt 4.5 giây cho mỗi mốc trước khi chuyển sang mốc kế tiếp (từ 2003 đến 2026+).
  - Tích hợp nút điều khiển: Tạm dừng / Tiếp tục, Lùi mốc, Tiến mốc, Bật/Tắt giọng đọc thuyết minh tiếng Việt tự nhiên và nút Đóng.

---

## 3. Key Product Decisions & Trade-Offs

- **Quyết định 1: Giọng đọc thuyết minh (Voice Narration)**
  - *Phương án chọn*: Tích hợp Web Speech API (`speechSynthesis`) với giọng tiếng Việt mặc định của hệ điều hành/trình duyệt, có nút bật/tắt rõ ràng và mặc định ở trạng thái tắt để không làm phiền người xem.
  - *Lý do*: Không tốn tài nguyên tải file âm thanh nặng, chạy nhanh và độc lập trên mọi thiết bị.
- **Quyết định 2: Tối ưu chống xung đột sự kiện Hover & Click**
  - *Phương án chọn*: Quick KPI Popover sử dụng debounce 150ms khi hover để tránh chớp nháy; nhấp chuột trực tiếp vào logo vẫn ưu tiên mở Job Card chi tiết.

---

## 4. Technical Architecture & State Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       ExperienceView                        │
│                                                             │
│  ┌─────────────────────── Top Controls ──────────────────┐  │
│  │ [Lịch Sử Công Tác] [Bản Đồ Mindmap] [▶ Phát Hành Trình]│  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌────────── Floating Story Narration Bar (Khi Play) ────┐  │
│  │ 2013: VED - Trưởng Phòng CSKH (130 Nhân sự)           │  │
│  │ [=== Thanh Tiến Trình 4.5s ===] [⏮] [⏸] [⏭] [🔊] [✕] │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌────────── 8-Column Timeline with Pulse Flow ──────────┐  │
│  │ [2003] ──»── [2007] ──»── [2011] ──»── [2013] ──» ... │  │
│  │   │            │            │            │            │  │
│  │ (Logo)       (Logo)       (Logo)       (Logo)         │  │
│  │   ▲            ▲            ▲            ▲            │  │
│  │   └────────────┴────── Quick KPI Popover ┴────────────│  │
│  │   │            │            │            │            │  │
│  │ [Card]       [Card]       [Card]       [Card]         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

- **State Management**:
  - `isStoryModeActive: boolean` — Bật/tắt chế độ trình chiếu.
  - `storyMilestoneIndex: number` — Vị trí cột mốc đang phát (0 → 7).
  - `isStoryPaused: boolean` — Trạng thái dừng/phát.
  - `isVoiceEnabled: boolean` — Trạng thái bật giọng đọc tiếng Việt.
  - `hoveredKey: string | null` — Cột mốc đang được rê chuột để hiển thị Quick KPI Popover.
- **Performance & Cleanup**: Hủy bỏ `setInterval` và `speechSynthesis.cancel()` ngay khi đóng chế độ trình chiếu hoặc chuyển tab.

---

## 5. Verification & Acceptance Criteria

- [ ] Hiệu ứng dải sáng Pulse Flow chạy mượt dọc qua các nút `»` không giật lag.
- [ ] Rê chuột vào từng vòng tròn Logo hiển thị popover chứa đúng 3 KPI và quy mô nhân sự của mốc đó.
- [ ] Nút "Phát Hành Trình Sự Nghiệp" kích hoạt đúng chuỗi tự động từ 2003 → 2026+ kèm thanh tiến trình và giọng đọc (khi bật).
- [ ] 100% dữ liệu chi tiết công tác và giao diện Sáng / Tối / Kính mờ hoạt động ổn định.
- [ ] Ứng dụng biên dịch thành công không có lỗi TypeScript/CSS.
