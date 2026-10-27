# UI INVENTORY: COMPONENT CATALOG, PAGES & STATES
**Dự án:** Hung Thai Executive Portal  
**Kiến trúc:** Next.js 15 App Router (Single-Page Interactive Architecture)  
**Phiên bản:** 2.0.0 — Comprehensive System Audit & Inventory  

---

## 1. DANH MỤC TRANG, VIEW & PAGE TEMPLATES

Hệ thống quản lý 14 View chuyên biệt thông qua Router State trung tâm `activePageId` (0 đến 13) với khả năng đồng bộ URL hash:

| ID | Tên Trang | View Component | Template / Layout Chính | Chức Năng Chính |
|---|---|---|---|---|
| `0` | **Trang Chủ** | [`HomeView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx) | Bento Grid + 3D Stacked Deck | Hero banner, video intro modal, 3 thẻ xếp chồng (Giới thiệu, Năng lực, Thành tựu). |
| `1` | **Thư Ngỏ** | [`LetterView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx) | Executive Document Template | Bức thư trang trọng, con dấu sáp đỏ, chữ ký số, thẻ danh thiếp chuyên gia. |
| `2` | **Giới Thiệu** | [`AboutView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx) | Profile & Timeline Template | Tiểu sử 22+ năm, triết lý lãnh đạo, các mốc son sự nghiệp và sở thích cá nhân. |
| `3` | **Học Vấn** | [`EducationView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx) | Dual-Mode Card Catalog | 14 chứng chỉ/bằng cấp, chế độ CodePen 3D Deck & Lưới 2 hàng, Lightbox bằng cấp. |
| `4` | **Lĩnh Vực** | [`DomainsView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx) | Multi-Domain Bento Grid | 6 lĩnh vực quản trị cốt lõi, thương hiệu đối tác, chỉ số vận hành và công cụ. |
| `5` | **Kinh Nghiệm** | [`ExperienceView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx) | Interactive Timeline & Milestones | Mốc lịch sử 2003-2026+, bộ lọc năm, 3 thẻ tổng kết cuối trang `h-fit` ôm sát nội dung. |
| `6` | **Kỹ Năng** | [`SkillsView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx) | Radar Chart & SWOT Matrix | Đánh giá năng lực đa chiều, ma trận SWOT quản trị, danh mục kỹ năng cốt lõi. |
| `7` | **Dự Án** | [`ProjectsView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx) / [`ProjectDetailView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx) | Master-Detail STAR System | 21 dự án chiến lược, phân tích 1.1 STAR chi tiết (Situation, Task, Action, Result). |
| `8` | **Hệ Thống** | [`SystemsView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx) | Bento Tech Stack Grid | 12 hệ thống CSKH C-Level (CRM, Omni-channel, WFM, QA, KMS, AI Workflows). |
| `9` | **Phỏng Vấn** | [`InterviewView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx) | Interactive AI Q&A Template | Đối thoại mô phỏng với ứng viên, bộ câu hỏi phỏng vấn quản lý cấp cao. |
| `10` | **Tử Vi** | [`HoroscopeView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx) | Feng Shui & Astrological Matrix | Bản đồ tử vi cá nhân, cung mạng Bát Trạch và triết lý phong thủy quản trị. |
| `11` | **Kỷ Niệm** | [`MemoriesView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/MemoriesView.tsx) | Photo Album & Milestone Grid | Khoảnh khắc đồng hành cùng đội ngũ qua các thời kỳ, hình ảnh hoạt động văn hóa. |
| `12` | **Liên Hệ** | [`ContactView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx) | Contact Form & Channel Grid | Biểu mẫu gửi thông điệp, danh thiếp vCard, các kênh mạng xã hội chuyên nghiệp. |
| `13` | **Hình Nền** | [`WallpaperView`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx) | Visual Background Customizer | Thư viện hình nền cao cấp, tải lên tùy biến, xem trước theo thời gian thực. |

---

## 2. DANH MỤC LAYOUT CHÍNH (LAYOUT REGISTRY PREVIEW)

1. **3D Interactive Layered Cards Deck**: Bố cục 3 thẻ xếp chồng 3 tầng có thanh điều khiển Segmented Tab và lùi/tiến mũi tên (`HomeView`).
2. **CodePen 3D Stack Deck**: Bố cục 14 thẻ xếp lớp ngang có thể lật mở chi tiết (`EducationView`).
3. **2-Row Responsive Grid**: Bố cục lưới 2 hàng cho thẻ học vấn (`EducationView`).
4. **Split Master-Detail Timeline**: Bố cục chia đôi danh sách mốc thời gian và chi tiết sâu (`ExperienceView`, `ProjectsView`).
5. **Floating Capsule Navigation & Dock**: Thanh điều hướng treo capsule trên đỉnh và thanh dock nổi dưới đáy (`Header`, `Footer`).
6. **Bento Tech Grid**: Bố cục lưới ô không đồng đều phân cấp thị giác (`HomeView`, `SystemsView`, `DomainsView`).

---

## 3. DANH SÁCH COMPONENT DÙNG CHUNG (SHARED COMPONENTS)

| Component | Vị Trí File | Vai Trò & Mô Tả |
|---|---|---|
| `<Header>` | `src/components/layout/Header.tsx` | Thanh điều hướng capsule kính nổi, tích hợp logo, các tab trang, và nút chọn theme. |
| `<Footer>` | `src/components/layout/Footer.tsx` | Thanh dock nổi kính mờ, tích hợp widget thời tiết, đồng hồ số và menu chuyển trang nhanh. |
| `<FloatingIcons>` | `src/components/layout/FloatingIcons.tsx` | Cụm icon vũ trụ bay lơ lửng, hỗ trợ hiệu ứng phát sáng `neonGlow` trong dark mode. |
| `<BackgroundLayer>` | `src/components/layout/BackgroundLayer.tsx` | Lớp nền khí quyển đa tầng với các gradient động êm ái. |
| `<HeroBanner>` | `src/components/ui/HeroBanner.tsx` | Banner tiêu đề trang phân cấp typography sắc nét, hỗ trợ nhãn nghệ thuật Dancing Script. |
| `<Button>` | `src/components/ui/Button.tsx` | Nút bấm chuẩn hóa với các biến thể (Primary, Secondary, Success, Warning, Danger, Ghost). |
| `<Badge>` | `src/components/ui/Badge.tsx` | Huy hiệu thông số, thẻ tag phân loại với 6 biến thể màu sắc. |
| `<GlassPanel>` | `src/components/ui/GlassPanel.tsx` | Thẻ kính chuẩn hóa đa tầng với backdrop-blur và bo góc đồng bộ. |
| `<Modal>` | `src/components/ui/Modal.tsx` | Cửa sổ hội thoại nổi đa năng, hỗ trợ nút đóng, backdrop nhòe và esc-listener. |
| `<ThemeSelectorModal>` | `src/components/ui/ThemeSelectorModal.tsx` | Modal chuyển đổi 4 theme với các thẻ xem trước trực quan và nhãn sắc sảo. |
| `<AiChatModal>` | `src/components/ui/AiChatModal.tsx` | Hộp thoại trợ lý AI tư vấn năng lực và hỏi đáp hồ sơ. |
| `<WebIcon>` | `src/components/ui/WebIcon.tsx` | Thư viện biểu tượng vector SVG toàn diện theo chuẩn Lucide. |
| `<ProgressBar>` | `src/components/ui/ProgressBar.tsx` | Thanh tiến độ trực quan cho các chỉ số KPI và năng lực chuyên môn. |
| `<Toast>` | `src/components/ui/Toast.tsx` | Thông báo nổi thông tin hệ thống. |
| `<WeatherWidget>` | `src/components/layout/WeatherWidget.tsx` | Tiện ích dự báo thời tiết thời gian thực gắn tại dock. |
| `<Clock>` | `src/components/layout/Clock.tsx` | Đồng hồ kỹ thuật số giờ Việt Nam (GMT+7). |

---

## 4. DANH SÁCH COMPONENT TRANG ĐƠN LẺ (SINGLE-PAGE COMPONENTS)

- `XRayEditor.tsx` & `XRayLibraryModal.tsx`: Công cụ chỉnh sửa và bóc tách bố cục giao diện nội bộ.
- `CareerMindmap.tsx`: Sơ đồ tư duy con đường sự nghiệp 22+ năm của Hùng Thái.
- `DynamicVideoStoryOverlay.tsx`: Lớp phủ trình chiếu video ngắn tự động.
- `PageCardHeader.tsx`: Tiêu đề thẻ nội bộ trong một số view chi tiết.

---

## 5. BẢNG KIỂM TRA TRẠNG THÁI GIAO DIỆN (UI STATES)

Toàn bộ các component cốt lõi đều được triển khai đủ 11 trạng thái giao diện:
1. `Default`: Nền kính bán trong suốt, viền sáng mảnh, chữ tương phản cao.
2. `Hover`: Nâng nhẹ `translateY(-2px đến -3px)`, viền phát sáng nhẹ, bóng đổ sâu hơn.
3. `Focus`: Vòng hào quang nét mảnh `focus:ring-2 focus:ring-offset-2`.
4. `Active / Pressed`: Nhấn nhẹ `scale-[0.98]`, giữ chắc chắn phản hồi xúc giác.
5. `Selected`: Viền sáng màu nhấn chủ đạo hoặc gradient neon nổi bật.
6. `Disabled`: Độ mờ `opacity-50`, vô hiệu hóa con trỏ `cursor-not-allowed`.
7. `Loading (Skeleton)`: Hiệu ứng quét sáng `animate-pulse` trên nền kính mờ.
8. `Success`: Điểm xuyết màu xanh ngọc `#34D399`.
9. `Warning`: Điểm xuyết màu hổ phách `#FCD34D`.
10. `Error / Danger`: Điểm xuyết màu hồng san hô `#FB7185`.
11. `Empty State`: Khung viền nét đứt nhẹ nhàng kèm icon vector và thông điệp hướng dẫn rõ ràng.
