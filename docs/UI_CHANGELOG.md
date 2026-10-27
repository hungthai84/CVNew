# NHẬT KÝ THAY ĐỔI GIAO DIỆN (UI CHANGELOG)---

## [4.58.0] - 2026-10-27
### Chuẩn Hóa Font Body Text, Đồng Bộ 100% Icon Lucide-React, Thiết Kế Lại Thanh Dock Bên Phải (Thư Ngỏ & Giới Thiệu) & Tối Giản Khối Phân Trang Giai Đoạn
- **1. Phân Tích & Chuẩn Hóa Cỡ Font Body Text (`variables.css`)**:
  - Phân tích đoạn trích dẫn chuẩn: *"Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng."*
  - Đoạn text trên được thiết lập ở kích thước `text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed`.
  - Cập nhật biến token toàn cục `--font-body` trong `src/styles/variables.css` thành `clamp(0.8125rem, 0.785rem + 0.15vw, 0.875rem)` (chuẩn 13px - 14px) để toàn bộ nội dung body text website đồng bộ hoàn hảo theo chuẩn typography này.
- **2. Chuyển Đổi Hệ Thống Icon Website Sang 100% Lucide Icons (`WebIcon.tsx`)**:
  - Viết lại toàn bộ component `src/components/ui/WebIcon.tsx` tích hợp 100% icon vector chính thức từ thư viện `lucide-react`.
  - Bổ sung bộ phân giải kebab-case sang PascalCase, hỗ trợ bí danh icon chuẩn xác, strokeWidth đồng nhất 1.85, tương thích hoàn toàn với tất cả các chế độ Light Glass và Dark Neon.
- **3. Thanh Bên Phải Trang Thư Ngỏ (`LetterView.tsx`) - Nút Ngang Tinh Gọn (Icon & Tiêu Đề 2 Chữ Viết Hoa Chữ Đầu)**:
  - Bố trí lại 9 nút điều khiển theo hàng ngang tinh tế, loại bỏ subtext dài dòng bên dưới nút:
    1. **Thuyết trình** (Icon `play`/`pause`)
    2. **Nhạc nền** (Icon `music`)
    3. **Một trang** (Icon `book`)
    4. **Trình chiếu** (Icon `monitor`)
    5. **Nghe thư** (Icon `volume-2`/`pause`)
    6. **Ngôn ngữ** (Icon `globe`)
    7. **Đổi tên** (Icon `users`)
    8. **Tải pdf** (Icon `download`)
    9. **Lưu chuẩn** (Icon `save`)
- **4. Thanh Bên Phải Trang Giới Thiệu (`AboutView.tsx`) - Đồng Bộ Giao Diện Như Trang Thư Ngỏ**:
  - Áp dụng cấu trúc thanh dock bám sát bên phải, bo cong góc trên-trái và dưới-trái, nền kính mờ đồng bộ header.
  - Chuẩn hóa 7 nút điều khiển: icon & tiêu đề 2 chữ viết hoa chữ đầu:
    1. **Trình chiếu** (Icon `monitor`)
    2. **Xem bento** (Icon `layout-grid`)
    3. **Bộ màu** (Icon `palette`)
    4. **Thuyết minh** (Icon `volume-2`)
    5. **Lật thẻ** (Icon `rotate-cw`)
    6. **Giới thiệu** (Icon `play`)
    7. **Lưu chuẩn** (Icon `save`)
- **5. Tối Giản Khối Phân Trang Giai Đoạn Tại Trang Kinh Nghiệm (`ExperienceView.tsx`)**:
  - Tại khối `<div>` *"Giai Đoạn 1: 2003 – 2013 (MobiFone • V247 • HTVC • V...)"*:
    - Xóa nút Tự cuộn (Auto-scroll).
    - Xóa các nút lướt tới và lùi ở thanh công cụ.
    - Xóa cặp nút Floating Left & Floating Right điều hướng trong khung carousel.
    - Giữ lại các Tabs Giai đoạn 1, Giai đoạn 2 và huy hiệu Logo hiện tại trang nhã, tập trung tối đa vào nội dung thực chiến.
- **6. Kiểm Tra Toàn Diện Hệ Thống**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev Server đang hoạt động tốt trên port 3001 (**HTTP 200 OK**).
  - Bảo toàn 100% dữ liệu gốc của website.

---

## [4.57.0] - 2026-10-27
### Phối Màu Đa Sắc Độc Nhất Cho Toàn Bộ 6 Nút Tiện Ích Xếp Chồng Tại Footer (Footer.tsx)
- **1. Phân Tích & Chuẩn Hóa Màu Sắc 6 Nút Tiện Ích Xếp Chồng (`Footer.tsx`)**:
  - Nhóm nút tiện ích xếp chồng (Overlapping Pill Dock) ở góc dưới bên phải Footer hiển thị trên mọi trang (bao gồm Thư Ngỏ) bao gồm 6 nút chức năng: `Ngôn Ngữ`, `Hình Nền`, `Hiển Thị`, `Giao Diện`, `Hùng Thái`, `AI hỗ trợ`.
  - Trước đây, một số nút có màu sắc trùng lặp (ví dụ: nút Hiển Thị và nút Hùng Thái đều mang tông màu Sky/Blue; nút Ngôn Ngữ và nút AI hỗ trợ đều mang tông màu xanh tím Indigo/Purple).
  - Triển khai hệ thống 6 gam màu quang phổ riêng biệt, độc nhất 100%, phong cách Pastel Glassmorphism ở Light Mode và Cyber Neon ở Dark Mode:
    1. **Nút 1: Ngôn Ngữ (Song ngữ)** - 🟢 **Xanh Ngọc Bích (Emerald / Teal)**:
       - *Light*: Nền chuyển sắc `rgba(209, 250, 229, 0.95)` đến `rgba(167, 243, 208, 0.85)`, viền `border-emerald-300/90`, chữ `#065f46`, phụ đề `#047857`.
       - *Dark*: Nền `rgba(6, 78, 59, 0.92)` đến `rgba(6, 95, 70, 0.88)`, viền `border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.3)]`, chữ `#a7f3d0`.
    2. **Nút 2: Hình Nền (Tùy chỉnh)** - 🔴 **Hồng Sen (Rose / Magenta Pink)**:
       - *Light*: Nền chuyển sắc `rgba(255, 228, 230, 0.95)` đến `rgba(254, 205, 211, 0.88)`, viền `border-rose-300/90`, chữ `#9f1239`, phụ đề `#be123c`.
       - *Dark*: Nền `rgba(76, 5, 25, 0.92)` đến `rgba(136, 19, 55, 0.88)`, viền `border-rose-400/60 shadow-[0_0_12px_rgba(251,113,133,0.3)]`, chữ `#fecdd3`.
    3. **Nút 3: Hiển Thị (Mặc định: 100%)** - 🔵 **Xanh Da Trời (Sky Blue / Cyan)**:
       - *Light*: Nền chuyển sắc `rgba(224, 242, 254, 0.95)` đến `rgba(186, 230, 253, 0.88)`, viền `border-sky-300/90`, chữ `#075985`, phụ đề `#0284c7`.
       - *Dark*: Nền `rgba(8, 47, 73, 0.92)` đến `rgba(12, 74, 110, 0.88)`, viền `border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.3)]`, chữ `#bae6fd`.
    4. **Nút 4: Giao Diện (Chọn giao diện)** - 🟡 **Vàng Hổ Phách (Amber Gold)**:
       - *Light*: Nền chuyển sắc `rgba(254, 243, 199, 0.95)` đến `rgba(253, 230, 138, 0.9)`, viền `border-amber-300/90`, chữ `#92400e`, phụ đề `#b45309`.
       - *Dark*: Nền `rgba(69, 26, 3, 0.92)` đến `rgba(120, 53, 15, 0.88)`, viền `border-amber-400/60 shadow-[0_0_14px_rgba(251,191,36,0.3)]`, chữ `#fde68a`.
    5. **Nút 5: Hùng Thái (Chuyên gia CSKH)** - 🟣 **Xanh Chàm Hoàng Gia (Royal Indigo / Sapphire)**:
       - *Light*: Nền chuyển sắc `rgba(238, 242, 255, 0.95)` đến `rgba(224, 231, 255, 0.9)`, viền `rgba(165, 180, 252, 0.9)`, chữ `#3730a3`, phụ đề `#4f46e5`.
       - *Dark*: Nền `rgba(30, 27, 75, 0.94)` đến `rgba(49, 46, 129, 0.9)`, viền `rgba(129, 140, 248, 0.65) shadow-[0_0_16px_rgba(129,140,248,0.35)]`, chữ `#c7d2fe`, phụ đề `#a5b4fc`.
    6. **Nút 6: AI hỗ trợ (Trợ lý 24/7)** - 🟪 **Tím Thạch Anh (Neon Violet / Purple)**:
       - *Light*: Nền chuyển sắc `rgba(250, 245, 255, 0.95)` đến `rgba(243, 232, 255, 0.9)`, viền `border-purple-300/90`, chữ `#6b21a8`, phụ đề `#9333ea`.
       - *Dark*: Nền `rgba(59, 7, 100, 0.92)` đến `rgba(88, 28, 135, 0.88)`, viền `border-purple-400/60 shadow-[0_0_16px_rgba(192,132,252,0.35)]`, chữ `#f3e8ff`, phụ đề `#d8b4fe`.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - Giữ nguyên 100% kích thước, tỷ lệ xếp chồng (`-ml-[64px]`), hiệu ứng hover bung nở (`z-70`, `scale(1.05)`) và các tính năng popup mở menu.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.

---

## [4.56.0] - 2026-10-27
### Tích Hợp Hệ Thống 3 Màn Hình Video Nền Trang Chủ & Bộ Điều Hướng Trái / Phải Tự Động Phát Video Tạm (HomeView.tsx)
- **1. Thiết Lập 3 Màn Hình Video Cho Trang Chủ (`HomeView.tsx`)**:
  - **Màn hình Video 1 (Video Tạm 1)**:
    - *Chủ đề*: `"Phong Thái Lãnh Đạo & Tầm Nhìn"`.
    - *URL*: `https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4`.
    - *Mô tả*: Phong thái chuyên gia quản trị trải nghiệm khách hàng cao cấp.
  - **Màn hình Video 2 (Màn Hình Video Hiện Tại - Cài Đặt Gốc)**:
    - *Chủ đề*: `"Chân Dung Chuyên Gia & Lời Chào"`.
    - *URL Idle*: `https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4`.
    - *URL Intro*: `https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4`.
    - *Mặc định*: Hệ thống khởi đầu luôn hiển thị Màn hình 2 theo đúng yêu cầu *"màn hình video hiện tại là màn hình video 2"*.
  - **Màn hình Video 3 (Video Tạm 3)**:
    - *Chủ đề*: `"Không Gian Số Hóa & Hệ Sinh Thái"`.
    - *URL*: `https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4`.
    - *Mô tả*: Hạ tầng công nghệ tự động hóa và kiến trúc giải pháp hiện đại.
- **2. Bố Trí Nút Điều Hướng Chính Giữa Bên Trái & Bên Phải (`HomeView.tsx`)**:
  - *Vị trí chuẩn xác*:
    - Nút Trái: `absolute left-2.5 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 z-30`.
    - Nút Phải: `absolute right-2.5 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-30`.
  - *Kiểu dáng Glassmorphism cao cấp*:
    - Thiết kế hình tròn `w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full`, nền kính mờ `bg-white/85 dark:bg-slate-900/85`, viền sáng bóng `border-white/70 dark:border-white/20`, đổ bóng sâu đa tầng `shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(78,86,246,0.7)]`.
    - Tích hợp âm thanh kính mờ `SoundEngine.playGlassChime()` mỗi khi nhấp chuột chuyển màn hình.
    - Hiển thị Toast thông báo trạng thái tức thời cùng tooltip trực quan.
- **3. Thanh Chỉ Báo Capsule (Video 1 • 2 • 3) Ở Cạnh Trên**:
  - Hiển thị thanh mini capsule `[Màn hình] 1 • 2 • 3` căn giữa phía trên (`top-3 sm:top-4 left-1/2 -translate-x-1/2`).
  - Hỗ trợ nhấp trực tiếp vào từng số để nhảy ngay tới màn hình mong muốn.
  - Tự động phát video ngay khi chuyển đổi (`autoPlay`, nhận trạng thái âm thanh `isMuted`, `key={activeVideoUrl}`).
- **4. Bảo Toàn Tính Năng Hiện Có**:
  - Xấp thẻ 14 trang ở góc dưới bên trái (`HomeCardStacksLeft`) và Nút Giới Thiệu (Laser Beam Capsule) ở góc dưới bên phải hoạt động hoàn hảo và độc lập.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.

---

## [4.55.0] - 2026-10-27
### Khôi Phục Cài Đặt Gốc Cho Banner Trang Học Vấn & Khối Scrim HeroBanner Chuẩn Toàn Website (EducationView.tsx & HeroBanner.tsx)
- **1. Khôi Phục Cài Đặt Gốc Cho Khối Header Trong HeroBanner (`HeroBanner.tsx`)**:
  - Khôi phục hoàn toàn khối kính mờ bảo vệ Scrim chuẩn ban đầu (`px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl bg-black/40 dark:bg-black/60 backdrop-blur-md border border-white/15 dark:border-white/10 shadow-md`).
  - Loại bỏ hoàn toàn lớp đè can thiệp tạm thời `p-[5px]` và `background: transparent`.
  - Giữ nguyên hiệu ứng `textShadow` tương phản cao ở cả Tiêu đề và Câu nói hay, bảo đảm tính cân đối, thanh thoát và độ sắc nét 100% trên nền video chất lượng cao tại trang Học Vấn và toàn hệ thống.
- **2. Chuẩn Hóa Cấu Trúc Banner Trang Học Vấn (`EducationView.tsx`)**:
  - Duy trì đầy đủ các thông số chuẩn gốc của HeroBanner:
    - `badgeText="Học tập"`, `titleIcon="graduation"`.
    - `title="Học Vấn & Chứng Chỉ"` với màu thương hiệu xanh ngọc lục bảo Emerald đặc trưng (`#059669`).
    - `subtitle="14 Chứng chỉ & Khóa học Chuyên ngành • Chuẩn hóa năng lực quản trị"`.
    - `quote="“Học hỏi không ngừng để nâng tầm tri thức và năng lực vận hành.”"`, `quoteAuthor="— Nguyễn Hùng Thái"`.
    - `videoSrc="https://cdn.scena.ai/project/10223/cc5a8e558d2380dc8bfb96fd26cd877e444d63b6a7036a8530abd823d6d6da63.mp4"`.
    - Bộ lọc danh mục 14 khóa học & chứng chỉ tại `bottomControls` nằm góc dưới bên phải với hiệu ứng kính mờ và màu sắc chuyển động mượt mà.
- **3. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc 14 khóa học, chứng chỉ và hình bằng cấp.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001` (biên dịch 1967 modules).

---

## [4.54.0] - 2026-10-27
### Cài Đặt Mặc Định Chế Độ Slide, Tích Hợp Thanh Bên Phải & Chuyển Trọn Vẹn "Điều Khiển Hồ Sơ" Vào Thanh Bên Phải Trang Giới Thiệu (AboutView.tsx & page.tsx)
- **1. Trang Giới Thiệu: Mặc Định Hiển Thị Dạng Slide (`AboutView.tsx`)**:
  - Chuyển giá trị mặc định của `viewMode` từ `'bento'` sang `'slides'` (`useState<'bento' | 'slides'>('slides')`).
  - Khi người xem truy cập trang Giới Thiệu, giao diện mở ra trực tiếp dạng trình chiếu slide 3 phần súc tích, sang trọng với các thẻ card kích thước tối ưu, không cần bấm chuyển đổi thủ công.
- **2. Tích Hợp Thanh Bên Phải Chuẩn Form Vào Trang Giới Thiệu (`AboutView.tsx` & `page.tsx`)**:
  - *Định Dạng Thanh Dock Chuẩn*:
    - Bám sát mép phải website (`fixed right-0 top-[70px] sm:top-[76px] md:top-[78px] bottom-[76px] sm:bottom-[80px] md:bottom-[82px] z-40`), chiều cao đồng bộ hoàn hảo với thẻ chính `#center-card`.
    - Không bo cong 4 góc, chỉ bo cong góc trên bên trái và góc dưới bên trái (`rounded-none rounded-tl-[22px] rounded-bl-[22px] border-r-0 border-y-2 border-l-2`).
    - Nền kính mờ chuẩn mực giống Header (`bg-white/80` ở Light Glass và `bg-slate-950/80 border-cyan-400/35` ở Dark Neon).
    - Hiệu ứng Ambient Neon Edge Pulse kép với 2 vệt sáng neon chạy dọc góc trên-trái và dưới-trái.
  - *Chuẩn Hóa Khoảng Cách 15px Giữa Thẻ Chính & Thanh Bên Phải*:
    - Tại `src/app/page.tsx`, mở rộng điều kiện định vị cho cả trang Giới Thiệu (`currentPage === 1 || currentPage === 2`).
    - Thẻ chính `#center-card` tự động căn lề phải: `!mr-[61px] !max-w-[calc(100%-61px-12px)] md:!mr-[245px] md:!max-w-[calc(100%-245px-24px)] !ml-auto`.
    - Khoảng cách hình học giữa mép phải thẻ chính và mép trái thanh bên phải: $245\text{px} - 230\text{px} = \mathbf{15\text{px}}$ trên Desktop/Tablet và $61\text{px} - 46\text{px} = \mathbf{15\text{px}}$ trên Mobile.
- **3. Chuyển Toàn Bộ Khối "Điều Khiển Hồ Sơ" Vào Trực Tiếp Thanh Bên Phải (`AboutView.tsx`)**:
  - Thay thế nút lơ lửng cũ bằng bảng điều khiển nằm trọn vẹn bên trong thanh dock bên phải:
    - *Tiêu Đề Card*: `"Điều khiển hồ sơ"` kèm chấm neon pulse và nút thu gọn/mở rộng `SoundEngine.playGlassChime()`.
    - *Nhóm Chế Độ Xem*:
      - Nút **Trình Chiếu Slide** (kèm badge Bật khi active).
      - Khối 3 Tabs chuyển nhanh giữa 3 Slide: `1. Tổng Quan & Video`, `2. Thông Tin Cá Nhân`, `3. Trụ Cột & Triết Lý`.
      - Nút **Bento View (1 Trang)** để xem toàn cảnh 8 ô Bento.
    - *Bộ Lọc Màu Bento*: Menu chọn nhanh 4 gam màu Bento Palette (Pastel Sáng, Cyber Neon, Royal Emerald, Rose Velvet).
    - *Tiện Ích Tương Tác Nhanh*:
      - Nút **Thuyết Minh AI**: Trợ lý Tí Chuột đọc diễn cảm 3 Trụ Cột Vận Hành.
      - Nút **Lật Thẻ Nhân Khẩu**: Lật xem lộ trình di chuyển Q7 - Mỹ Tho.
    - *Hướng Dẫn Phím Tắt*: Chuyển slide bằng `← / →`, phím `ESC` đóng video/modal.
  - *Nút Mũi Tên Next Slide*: Đặt gọn bên trong mép phải thẻ chính (`absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2`), không bị thanh bên phải che.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200 OK).

## [4.53.0] - 2026-10-27
### Chuẩn Hóa Khoảng Cách 15px Giữa Thẻ Chính & Thanh Bên Phải, Thiết Lập Luôn Hiển Thị Thanh Bên Phải Trang Thư Ngỏ (LetterView.tsx & page.tsx)
- **1. Khoảng Cách Giữa Thẻ Chính & Thanh Bên Phải Luôn Đạt Chuẩn 15px (`src/app/page.tsx` & `LetterView.tsx`)**:
  - *Nguyên Nhân Cũ*: Thanh dock bên phải nằm ở `fixed right-0` với chiều rộng `230px`, trong khi thẻ chính `#center-card` được căn `mx-auto` ở giữa màn hình. Ở các độ phân giải 1366px - 1440px, thanh dock bị chồm lên đè che khuất mép phải của thẻ chính; ở màn hình 1920px thì khoảng cách lại hở ra quá xa (~130px).
  - *Giải Pháp Chuẩn Xác*:
    - Tại `src/app/page.tsx`, khi ở Trang Thư Ngỏ (`currentPage === 1`), thẻ chính `#center-card` được gán khoảng cách lề phải chuẩn xác: `!mr-[61px] !max-w-[calc(100%-61px-12px)] md:!mr-[245px] md:!max-w-[calc(100%-245px-24px)] !ml-auto`.
    - Tính toán hình học:
      - Trên màn hình Desktop/Tablet (`md:` trở lên): Cạnh phải thẻ chính `#center-card` kết thúc ở vị trí cách mép phải màn hình `245px`. Thanh bên phải bám sát mép phải màn hình (`right-0`) có độ rộng `230px`. Khoảng cách giữa thẻ chính và thanh bên phải: `245px - 230px = 15px` chính xác 100%!
      - Trên màn hình Mobile (`< 768px`): Cạnh phải thẻ chính kết thúc ở vị trí cách mép phải `61px`. Thanh dock có độ rộng `46px`. Khoảng cách: `61px - 46px = 15px` chuẩn xác!
    - Khi người dùng điều hướng sang các trang khác (Trang Chủ, Học Vấn, Kinh Nghiệm, Kỹ Năng...), thẻ chính `#center-card` tự động khôi phục vị trí `mx-auto` căn giữa truyền thống.
- **2. Thanh Bên Phải Luôn Hiển Thị Đầy Đủ Ở Trang Thư Ngỏ (`LetterView.tsx`)**:
  - Chuyển giá trị mặc định của `isRightDockCollapsed` thành `false` (`useState<boolean>(false)`).
  - Thanh bên phải luôn ở trạng thái mở rộng đầy đủ (`isExpanded = true`), hiển thị trọn vẹn 9 nút điều khiển chuyên nghiệp (Thuyết trình tự động Lo-Fi, Bật/Tắt Lo-Fi 432Hz, Xem một trang, Đọc Karaoke AI, Đổi ngôn ngữ, Chọn giọng đọc, Tốc độ đọc, Tự động chuyển slide, Tải PDF).
  - Loại bỏ hoàn toàn tình trạng thanh bị co cụm thành dải mảnh 40px gây khó nhìn khi mới vào trang.
- **3. Tối Ưu Định Vị Nút Chuyển Slide Kế Tiếp (`handleNextSlide`)**:
  - Chuyển class nút next slide từ `fixed lg:absolute` thành `absolute right-2 sm:right-3.5 lg:right-4 top-1/2 -translate-y-1/2`.
  - Nút mũi tên chuyển slide kế tiếp nằm gọn gàng bên trong mép phải của thẻ chính, hoàn toàn tự do và không bị thanh bên phải che khuất.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200 OK).

## [4.52.0] - 2026-10-27
### Nâng Cấp Bố Cục Trang Chủ & Trải Nghiệm Tương Tác Slide Trụ Cột / Triết Lý Trang Giới Thiệu (HomeView.tsx & AboutView.tsx)
- **1. Trang Chủ: Tắt Tự Động Đổi Thẻ & Bố Trí Lại Vị Trí Các Khối Dưới Đáy (`HomeCardStacksLeft.tsx` & `HomeView.tsx`)**:
  - *Tắt Tự Động Đổi Card*: Đổi giá trị mặc định của `isAutoPlay` thành `false` trong `HomeCardStacksLeft.tsx`, thẻ dừng tự động lật sau mỗi 6.5s để người dùng hoàn toàn chủ động click trải nghiệm theo ý muốn.
  - *Di Chuyển Xấp Thẻ Sang Góc Dưới Bên Trái*: Xấp thẻ card xếp tầng `HomeCardStacksLeft` được gán vào góc dưới bên trái màn hình (`items-end justify-start`), nằm sát cạnh trái một cách tinh tế và không che khuất background.
  - *Di Chuyển Nút "Giới Thiệu" Sang Góc Dưới Bên Phải*: Nút capsule laser beam chuyển từ góc trái sang góc dưới bên phải (`items-end justify-end mb-1`), tạo thế cân bằng đối xứng hoàn hảo trên trang chủ.
- **2. Trang Giới Thiệu (Slide 3 "Trụ Cột & Triết Lý"): Tích Hợp Trọn Vẹn 5 Tính Năng Nâng Cấp Cao Cấp (`AboutView.tsx`)**:
  - *Tính Năng 1 - Hiệu Ứng Hologram Lật Thẻ Tương Tác 3D Cho 3 Giá Trị Cốt Lõi (3D Card Flip on Click)*:
    - Cả 3 thẻ Giá Trị Cốt Lõi (*Sự Tận Tâm*, *Kịp Thời Nhanh Nhạy*, *Đồng Cảm Chân Thành*) được nâng cấp hiệu ứng lật không gian 3D Hologram (`perspective: 1000px`, `transform-style: preserve-3d`, `rotateY(180deg)`).
    - Mặt trước: Giữ nguyên icon, tiêu đề, phụ đề, mô tả và thêm thanh tiến trình Value Pulse Indicator.
    - Mặt sau: Hiển thị Case Study CSKH thực chiến cụ thể:
      - *Sự Tận Tâm*: Chiến dịch hỗ trợ sự cố viễn thông bão số 9 xuyên đêm (FCR 94.5%, CSAT 99.2%, 0 phát sinh khiếu nại).
      - *Kịp Thời*: Quy trình Fast-Track dập khiếu nại nóng 24/7 dưới 12 phút (SLA < 15p đạt 98.8%, đúng hẹn 99.5%).
      - *Đồng Cảm Chân Thành*: Chuyển đổi khách hàng bức xúc thành Đại sứ thương hiệu (Gắn kết 96%, CSAT 98.6%, tái ký 3 năm).
    - Nút lật thẻ hai chiều (`RotateCw` / `RotateCcw`) kèm âm thanh kính `SoundEngine.playCardFlip()`.
  - *Tính Năng 2 - Bộ Chỉ Số Đo Lường Nhanh Từng Giá Trị (Value Pulse Indicators)*:
    - Tích hợp thanh tiến trình (Progress Bar) dạng vạch neon phát sáng trên mặt trước của từng thẻ:
      - Thẻ 01 (*Sự tận tâm*): Tỷ lệ FCR cam kết `94.5%` với vạch vàng hổ phách.
      - Thẻ 02 (*Kịp thời*): Tỷ lệ đáp ứng SLA phản hồi tức thì `98.8%` với vạch hồng ngọc.
      - Thẻ 03 (*Đồng cảm chân thành*): Chỉ số hài lòng CSAT `98.6%` với vạch tím thạch anh.
  - *Tính Năng 3 - Hiệu Ứng Ánh Sáng Quét Viền Khi Di Chuột (Prismatic Border Shimmer)*:
    - Thẻ Giới Thiệu Bản Thân (thẻ ảnh GIF Ti Chuột) được bao bọc bởi lớp viền kép Prismatic Border Shimmer (`border-transparent group-hover:border-cyan-400/80 shadow-[inset_0_0_18px_rgba(56,189,248,0.22)]`).
    - Lớp ánh sáng đa sắc phản chiếu lướt quanh mép kính khi rê chuột, làm tôn lên chiều sâu của ảnh GIF chuyển động bên dưới.
  - *Tính Năng 4 - Nút Nghe Thuyết Minh Từng Giá Trị & Trụ Cột Bằng Trợ Lý AI (Audio Narration Pills)*:
    - Tích hợp nút loa tròn mini (`Volume2` / `VolumeX`) cạnh các huy hiệu số 01, 02, 03 của cả hàng 3 Trụ Cột Vận Hành lẫn hàng 3 Giá Trị Cốt Lõi.
    - Nhấp nút loa kích hoạt Web Speech API (tối ưu qua `findBestVoice`) đọc diễn cảm thông điệp ngắn 5-7s của từng trụ cột/giá trị với hiệu ứng nhấp nháy âm thanh sống động.
  - *Tính Năng 5 - Chế Độ Đối Chiếu Tương Quan Trụ Cột & Giá Trị (Cross-Highlight Connection)*:
    - Thiết lập liên kết logic hai chiều:
      - Hover *Trụ cột 01 (Hiệu Quả)* ⟷ Tự động sáng viền neon *Giá trị 02 (Kịp Thời)*.
      - Hover *Trụ cột 02 (Nhân Văn)* ⟷ Tự động sáng viền neon *Giá trị 03 (Đồng Cảm Chân Thành)*.
      - Hover *Trụ cột 03 (Bền Vững)* ⟷ Tự động sáng viền neon *Giá trị 01 (Sự Tận Tâm)*.
    - Hiệu ứng phát sáng neon `ring-2 shadow-[0_0_24px_rgba(...)] scale-[1.02] -translate-y-1` thể hiện rõ nét sự đồng điệu giữa triết lý lãnh đạo và cam kết phụng sự thực tế.
- **3. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200 OK).

## [4.51.0] - 2026-10-27
### Cố Định Chế Độ Xem Sơ Đồ Tư Duy & Định Tuyến Đường Line Xuất Phát Từ Top/Bot Hình Tròn Trang Kỹ Năng (SkillsView.tsx & InfographicMindmap.tsx)
- **1. Cố Định Trang Kỹ Năng Duy Nhất Dạng View Sơ Đồ Tư Duy (`viewMode = 'mindmap'`)**:
  - Chuyển chế độ xem của trang Kỹ Năng thành duy nhất dạng Sơ Đồ Tư Duy Infographic Mindmap.
  - Loại bỏ hoàn toàn khối Banner lớn và cụm nút chuyển đổi "Lưới Thẻ / Sơ Đồ Tư Duy", giúp không gian sơ đồ tư duy thoáng đãng, tập trung tối đa vào trải nghiệm khám phá năng lực.
  - Giữ lại thanh Minimal Header Bar tinh giản hiển thị biểu tượng sơ đồ tư duy cùng tiêu đề `"Sơ đồ tư duy kỹ năng"` và nhãn phân loại chuyên nghiệp.
  - Bảo toàn 100% modal xem chi tiết thẻ (`selectedCard`), cho phép người xem nhấp vào bất kỳ nhánh kỹ năng nào trên sơ đồ tư duy để mở bung toàn màn hình tra cứu KPIs và dự án áp dụng thực tế.
- **2. Định Tuyến Đường Line Xuất Phát Từ Đỉnh TOP & Đáy BOT Của Hình Tròn Trung Tâm (`InfographicMindmap.tsx`)**:
  - *Thuật Toán getTopBotOrthogonalPath*:
    - Xóa bỏ việc kéo đường line từ hông trái/phải (`x = 420` / `x = 580`), chuyển toàn bộ 100% các đường line xuất phát từ 2 cực **TOP** (`startY = 220`) và **BOT** (`startY = 380`) của hình tròn trung tâm hạt nhân quản trị (`500, 300`, `R = 80`).
    - *Nhánh trên (Card 0)*: Xuất phát từ **TOP** (`startX = 485/515, startY = 220`), đi thẳng lên đến độ cao `targetY = 110`, bo cong góc vuông mượt mà (`radius = 16px`) rẽ ngang sang trái (`300`) hoặc sang phải (`700`).
    - *Nhánh giữa (Card 1)*: Xuất phát từ **TOP** (`startX = 465/535, startY = 226`), đi lên một đoạn ngắn thoát khỏi khối tròn (`exitY = 175`), bo cong rẽ ngang sang `midX` (`360/640`), bo cong rẽ dọc xuống `targetY = 300`, sau đó bo cong rẽ ngang vào cạnh card.
    - *Nhánh dưới (Card 2)*: Xuất phát từ **BOT** (`startX = 485/515, startY = 380`), đi thẳng xuống đến độ cao `targetY = 490`, bo cong góc vuông mượt mà rẽ ngang sang trái (`300`) hoặc sang phải (`700`).
  - *Chốt Cổng Phát Sáng Năng Lượng (Hub Port Terminals)*:
    - Bổ sung 2 điểm chốt năng lượng phát sáng tại đỉnh TOP `(500, 220)` và đáy BOT `(500, 380)` với vầng sáng neon đồng bộ chủ đề, tạo điểm nhấn kỹ thuật thị giác ấn tượng.
    - Cập nhật hạt photon chuyển động (`animateMotion`) và hiệu ứng hào quang (`filter="url(#mindmap-energy-glow)"`) chạy mượt mà theo đúng đường gấp vuông bo cong mới.
  - *Đồng Bộ Tính Năng Xuất Ảnh SVG / PNG HD*:
    - Cập nhật cả thuật toán vẽ vector trong hàm xuất ảnh `handleExportMindmap` để file SVG/PNG xuất ra cũng phản ánh chính xác cấu trúc đường line xuất phát từ TOP và BOT.
- **3. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).
### Cập Nhật Nút Footer Tiện Ích, Khắc Phục Lỗi Hình Ảnh & Phóng To Banner Trang Kinh Nghiệm, Dọn Dẹp Khối Tạm Dừng Sync Thư Ngỏ
- **1. Nút Footer Tiện Ích: Đổi Tiêu Đề Nút Avatar AI & Thêm Sub-tiêu Đề Cho 2 Nút**:
  - *Nút Avatar AI* (`Footer.tsx`): Đổi tiêu đề thành `"AI hỗ trợ"`, bổ sung sub-tiêu đề `"Trợ lý 24/7"`.
  - *Nút Hùng Thái* (`Footer.tsx`): Bổ sung sub-tiêu đề `"Chuyên gia CSKH"` dưới tên `"Hùng Thái"`.
  - *Đồng Bộ CSS variables.css*: Tăng kích thước nút `.avatar-morph-btn` lên `130px x 50px` (đồng bộ hoàn hảo với `.footer-util-btn`), tăng `.avatar-morph-text` `max-width: 82px` để hiển thị 2 dòng tiêu đề và sub-tiêu đề rõ ràng, không bị che khuất; giữ nguyên cơ chế morph thu tròn `48px` bay lên khi mở Circle Menu.
- **2. Xóa Bỏ Khối "Tạm dừng Sync" Tại Trang Thư Ngỏ (`LetterView.tsx`)**:
  - Xóa bỏ hoàn toàn lớp overlay `<div> "Tạm dừng Sync"` (chứa badge AI Robot Live/Tạm dừng, nút Play to và nút Sync) theo yêu cầu inspector.
  - Gắn sự kiện `onClick={toggleFloatingVideoPlay}` trực tiếp lên container video tròn giúp người dùng click trực tiếp vào video để phát/tạm dừng mượt mà và thông thoáng tầm nhìn.
- **3. Trang Kinh Nghiệm: Khắc Phục Triệt Để Lỗi Hình Sản Phẩm, Phóng To Logo & Hình Banner (`ExperienceView.tsx`)**:
  - *Sửa Lỗi Hình Sản Phẩm*: Chuẩn hóa liên kết dữ liệu giữa `activeMilestone` và `roadmapCards` (`p.name || p.alt`, `p.logo || p.src`). Các sản phẩm nổi bật của từng mốc sự nghiệp (MobiFone, Call 247, HTVC, Garena, Shopee, AirPay/ShopeePay, GCafe, Prudential, MoMo, Finviet ECO, Power Service) hiển thị chính xác 100%, không bị fallback sai tên hoặc mất logo.
  - *Phóng To Logo*:
    - Logo tại khối *"Thương hiệu tiêu biểu"*: Tăng chiều cao container từ `h-9` lên `h-12 sm:h-13`, ảnh logo tăng lên `max-h-9 sm:max-h-10 max-w-[90%]` kèm hiệu ứng nổi `hover:scale-105 shadow-xs`.
    - Logo tại *Brand strip* dưới Hero Banner: Tăng kích thước pill lên `p-1.5 px-3`, ảnh logo tăng lên `h-6 sm:h-7 max-w-[100px]`.
    - Logo sản phẩm trong *từng thẻ timeline*: Nâng cấp lên `w-14 h-14 sm:w-16 sm:h-16`, padding `p-1`, ảnh `object-contain` sắc nét không bị cắt xén viền.
  - *Phóng To Hình Banner*:
    - Mở rộng chiều rộng khung ảnh banner từ `w-2/5` lên `w-1/2 sm:w-[48%]`, tăng độ hiển thị từ `opacity-80` lên `opacity-90 sm:opacity-95`.
    - Bổ sung hiệu ứng phóng to mượt mà `group-hover/banner:scale-105 transition-transform duration-700` và gradient chuyển sắc chiều sâu sang trọng.
    - Phóng to logo công ty trong banner lên `h-7 sm:h-8 max-w-[90px]`.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).
### Chuẩn Hóa Thanh Điều Khiển Tiện Ích Bên Phải Bám Sát Mép Cho Trang Thư Ngỏ (LetterView.tsx)
- **1. Thiết Kế Bám Sát Mép Phải Website (`fixed right-0`)**:
  - Chuyển thanh điều khiển từ dạng nút lơ lửng (`fixed right-3 sm:right-4`) thành dải thanh dock bám dính sát mép phải màn hình (`fixed right-0 top-[70px] sm:top-[76px] md:top-[78px] bottom-[76px] sm:bottom-[80px] md:bottom-[82px]`).
  - Cạnh phải phẳng lỳ (`border-r-0`, `rounded-tr-none rounded-br-none`), tạo sự liền mạch hoàn mỹ với viền website.
- **2. Quy Tắc Bo Góc Chuẩn Xác (Chỉ Bo Góc Trên-Trái & Dưới-Trái)**:
  - Không bo cong 4 góc, chỉ bo cong góc trên bên trái và góc dưới bên trái (`rounded-none rounded-tl-[22px] rounded-bl-[22px] border-r-0 border-y-2 border-l-2`).
  - Tích hợp 2 vệt sáng neon chạy dọc góc trên-trái và dưới-trái (Ambient Neon Edge Pulse) tạo hiệu ứng chiều sâu 3D sang trọng.
- **3. Nền Đồng Bộ 100% Theo Nền Header**:
  - Giao diện tối (Dark Neon): `border-cyan-400/35 bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_45px_-6px_rgba(0,0,0,0.75),0_0_24px_rgba(34,211,238,0.22),inset_0_1px_1px_rgba(255,255,255,0.15)]`.
  - Giao diện sáng (Light Glass): `border-white/85 bg-white/85 backdrop-blur-xl shadow-[0_14px_40px_-6px_rgba(30,27,75,0.18),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]`.
- **4. Cơ Chế Thu Gọn / Mở Rộng Linh Hoạt (Collapsible Side Dock)**:
  - Trạng thái thu gọn (`isRightDockCollapsed`): dải thanh mảnh `w-[40px] sm:w-[46px]` hiển thị icon Thư ngỏ/Slide, nút nhanh thuyết trình tự động, Lo-Fi, cờ ngôn ngữ (VI/EN) và nút mở rộng `«`.
  - Trạng thái mở rộng: bung ra `w-[220px] sm:w-[230px]` hiển thị đầy đủ tiêu đề `"Điều khiển thư ngỏ"` cùng toàn bộ 9 nút điều khiển chuyên sâu.
  - Hỗ trợ thao tác nhấp đúp chuột (`onDoubleClick`) hoặc click nút chuyển đổi kèm âm thanh kính mờ cao cấp `SoundEngine.playGlassChime()`.
- **5. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).



## [4.48.0] - 2026-10-27
### Nâng Cấp Bố Cục Slide Trụ Cột & Triết Lý Trang Giới Thiệu (AboutView.tsx)
- **1. Thẻ Giới Thiệu Bản Thân Lấy Hình GIF Làm Nền Card**:
  - Chuyển hình ảnh hoạt họa Ti Chuột GIF (`https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif`) thành lớp hình nền chìm phía sau card với hiệu ứng mờ kính nhẹ nhàng (`opacity-30 dark:opacity-25 filter blur-[0.3px] scale-105 transition-transform duration-700 group-hover:scale-110`).
  - Phủ lớp kính mờ Frost Glass Scrim (`bg-gradient-to-t from-white/95 via-white/85 to-blue-50/80 dark:from-slate-900/95 dark:via-slate-900/85 dark:to-slate-950/80 backdrop-blur-[1px]`) giúp bảo đảm độ tương phản và khả năng đọc chữ rõ nét tuyệt đối.
  - Chữ ký thư pháp `"Luôn bên bạn ♡"` và huy hiệu `"Chuyên gia CSKH"` nổi bật trên lớp bề mặt nổi `relative z-10`.
- **2. Thẻ 3 Trụ Cột Vận Hành (Hiệu Quả, Nhân Văn, Bền Vững)**:
  - Bổ sung nội dung tóm tắt súc tích, chuẩn hóa SLAs/KPIs và kết quả đo lường rõ ràng cho từng trụ cột.
  - Tích hợp icon watermark kích thước lớn (`w-20 h-20 text-white/15 dark:text-white/10`) chìm dưới đáy góc phải của từng thẻ (`BarChart3`, `Heart`, `Leaf`), tạo hiệu ứng chiều sâu 3D sang trọng.
  - Tuân thủ nghiêm ngặt Rule 8 (tiêu đề 4 từ, Sentence case, không dùng ký tự `&`): `"Hiệu quả vận hành"`, `"Nhân văn con người"`, `"Bền vững dài hạn"`.
- **3. Giá Trị Cốt Lõi Tạo 3 Thẻ Riêng Biệt Tương Tự Thẻ 3 Trụ Cột**:
  - Tách khối Giá Trị Cốt Lõi thành 3 thẻ con Bento chuyên nghiệp:
    1. **Thẻ 01 - Sự tận tâm**: Nền gradient hổ phách hoàng kim (`amber-500 via-amber-600 to-orange-600`), icon `Award` watermark chìm góc dưới.
    2. **Thẻ 02 - Kịp thời**: Nền gradient hoàng hôn năng động (`orange-500 via-rose-500 to-pink-600`), icon `Clock` watermark chìm góc dưới.
    3. **Thẻ 03 - Đồng cảm chân thành**: Nền gradient hồng tím cảm xúc (`pink-500 via-purple-600 to-indigo-700`), icon `HeartHandshake` watermark chìm góc dưới.
  - Mỗi thẻ sở hữu huy hiệu số `01`, `02`, `03`, tiêu đề 4 từ, phụ đề rõ ràng và nút tương tác âm thanh `SoundEngine.playPop()`.
- **4. Chuyển Chữ Ký "Khách hàng là trung tâm ♡" Sang Thẻ Triết Lý Tầm Nhìn**:
  - Chuyển dải chữ thư pháp viết tay nghệ thuật `"Khách hàng là trung tâm ♡"` sang đặt trang trọng tại chân thẻ Triết Lý Tầm Nhìn, hòa hợp hoàn hảo với thông điệp *"Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng"* và chữ ký 22+ năm vận hành của chuyên gia Nguyễn Hùng Thái.
- **5. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).



## [4.47.0] - 2026-10-27
### Đồng Bộ Hệ Màu Bento Đa Sắc Cho Thẻ Hệ Thống, Nâng Cấp Sơ Đồ Tư Duy 3D & Hiệu Ứng Neon Dock Bên Phải
- **1. Đồng Bộ Hệ Màu Bento Đa Sắc Cho 12 Thẻ Hệ Thống (`SystemsView.tsx`)**:
  - Tham khảo và kế thừa 100% bảng màu Bento Glass rực rỡ từ trang Giới thiệu (`AboutView.tsx`): Cyber Neon Indigo, Royal Emerald, Rose Gold / Fuchsia, Amber Sunset, Sky Azure, Magenta Violet, Ruby Crimson...
  - Mỗi thẻ hệ thống sở hữu nhận diện màu sắc đặc trưng, viền sáng và gradient nền kính mờ sắc nét, tương thích hoàn hảo cả Light Glass và Dark Neon mode.
  - Tích hợp bộ lọc 5 nhóm chuyên mục sinh thái: Tất cả (12), Vận hành & Dịch vụ (SDP, CRM, CSC), Tài chính & Thương mại (ERP, POS, CLP), Chiến lược & Trí tuệ (OKR, BI, AI), Nhân sự & Đào tạo (HRM, LMS).
  - Tích hợp âm thanh lật thẻ pha lê `SoundEngine.playCardFlip()`, widget **Mini Benchmark Simulator** (mô phỏng ROI theo quy mô 10-100 nhân sự), và chế độ xem video toàn màn hình (Cinema Theater Modal).
- **2. Nâng Cấp Giao Diện Sơ Đồ Tư Duy Kỹ Năng (`SkillsView.tsx`, `InfographicMindmap.tsx`)**:
  - Bổ sung bộ hình ảnh minh họa 3D phong cách lĩnh vực (`SKILL_ILLUSTRATIONS`) sắc nét cho từng thẻ kỹ năng nhánh trái và nhánh phải.
  - Ẩn hoàn toàn Hero Banner khi ở chế độ xem Sơ đồ tư duy (`viewMode === 'mindmap'`), giải phóng không gian hiển thị rộng rãi, bổ sung thanh Header tối giản giúp dễ dàng quay lại dạng Lưới Thẻ.
  - Cải tiến thuật toán nối nhánh `getRoundedOrthogonalPath`: Đường line gấp vuông nhưng bo tròn mềm mại tại các góc gấp (Rounded Orthogonal Routing, bán kính bo 18px bằng Quadratic Bezier `Q`), tăng tính hiện đại và trực quan.
- **3. Thanh Tiện Ích Bên Phải & Hiệu Ứng Neon Đột Phá (`WallpaperView.tsx`, `SoundEngine.ts`)**:
  - **Ambient Neon Edge Pulse**: Vệt sáng neon chạy dọc góc trên-trái và dưới-trái của dock bên phải (`rounded-tl-[22px]`, `rounded-bl-[22px]`), tạo chiều sâu tương tự vỏ phi thuyền không gian.
  - **Collapsible Side Dock**: Chế độ thu gọn/mở rộng thanh dock bên phải với nút toggle `«` / `»` hoặc nhấp đúp chuột, thu nhỏ còn dải 36px/40px.
  - **Pomodoro Zen Pill**: Bộ đếm thời gian làm việc & thư giãn tích hợp (25 phút tập trung / 5 phút giải lao) kèm vòng tròn đếm ngược trực quan.
  - **Crystal Panel Sound FX**: Bổ sung `SoundEngine.playGlassChime()` với âm hưởng kính mờ cao cấp khi thao tác trên thanh tiện ích.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).



## [4.46.0] - 2026-10-27
### Xóa Bỏ Khối Hero Banner & Khối Tiêu Đề Điều Khiển Trùng Lặp Tại Chế Độ Toàn Văn Thư Ngỏ (LetterView.tsx)
- **1. Xóa Khối Banner `"Thư Ngỏ Đối Tác"` (`<HeroBanner />`)**:
  - Đã loại bỏ hoàn toàn khối banner mở đầu chứa tiêu đề `"Thư Ngỏ Đối Tác"` cùng câu trích dẫn *“Trải nghiệm hôm nay kiến tạo giá trị bền vững ngày mai.”*.
  - Giúp giải phóng toàn bộ không gian phía trên, tránh lặp lại hình ảnh và thông điệp đầu trang.
- **2. Xóa Khối Tiêu Đề `"Toàn Văn Thư Ngỏ Hợp Tác"` (`<AnimatedCardTitle />`)**:
  - Đã loại bỏ hoàn toàn khối `<div>` chứa thẻ tiêu đề `"Toàn Văn Thư Ngỏ Hợp Tác (Bản Đọc Liền Mạch 1 Trang)"` cùng phụ đề *"Người gửi: Nguyễn Hùng Thái (22+ Năm Kinh Nghiệm CSKH) · Kính gửi:..."*.
  - Giao diện chế độ xem 1 trang (`viewMode === 'one-page'`) giờ đây trực tiếp đưa người đọc vào ngay tờ thư trang trọng "Executive Formal Letter Sheet" với đầy đủ Letterhead, các nút phát âm thanh, in ấn và toàn văn nội dung liền mạch.
- **3. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).


## [4.45.0] - 2026-10-27
### Tối Ưu Bố Cục Nội Bộ Từng Thẻ Bento Glass UI Đa Màu Sắc Cho Slide 1 Thư Ngỏ (LetterView.tsx)
- **1. Thẻ Lời Chào Đối Tác (`#callout-salutation`)**:
  - Tối ưu hóa padding `px-3.5 sm:px-4 py-2 sm:py-2.5` và Flexbox `items-center justify-between gap-2.5`.
  - Khung icon thư bo góc tròn hiện đại `w-7.5 sm:w-8 h-7.5 sm:h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white shadow-xs ring-2 ring-amber-300/40 dark:ring-amber-500/30`.
  - Typography lời chào chuẩn hóa `text-[14.5px] sm:text-[16px] leading-snug font-play font-black`, không bị tràn trên thiết bị nhỏ.
  - Nút bấm `+ Tên Công ty` / `Đổi tên` với nền kính `bg-white/95 dark:bg-slate-900/90`, viền amber và hiệu ứng tương tác micro-interaction `hover:scale-105 active:scale-95`.
- **2. Thẻ Video Thuyết Minh Thư Ngỏ (`#bento-letter-video`)**:
  - Chuẩn hóa tiêu đề card theo Rule 8: `"Thuyết minh thư ngỏ"` (Sentence case: viết hoa chữ đầu, còn lại viết thường, đúng 4 từ).
  - Khung icon play `w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xs ring-1 ring-cyan-300/30` căn thẳng hàng hoàn hảo với tiêu đề.
  - Khung video 16:9 sắc nét với viền kính `border border-white/10`, nút Play overlay trung tâm kính mờ `w-12 h-12 rounded-full backdrop-blur-xs border border-white/30` cùng thanh tiến trình chuyển sắc mượt mà.
  - Phân tách rõ ràng các nút điều khiển âm lượng, tạm dừng/phát và đồng bộ slide ở footer card với khoảng cách `gap-1.5` bội số 4px/8px chuẩn mực.
- **3. Thẻ Thông Điệp Hợp Tác & Cam Kết Đồng Hành (`#bento-commitment`)**:
  - Huy hiệu tiêu đề chuẩn hóa: `"Thông điệp hợp tác"` kết hợp tag tác giả font-mono `"Nguyễn Hùng Thái"` được căn chỉnh tinh tế ở hai đầu header.
  - Giữ nguyên 100% nội dung văn bản giới thiệu bản thân và thông điệp gửi tới đối tác, tối ưu nhịp thở spacing `space-y-3`, typography `text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed font-medium`.
  - Tách bạch phần lời cảm ơn và chữ ký số bằng đường kẻ viền kính phân cách `border-t border-indigo-200/60 dark:border-white/10 pt-2.5 mt-3`.
- **4. Bộ 3 Trụ Cột Nền Tảng (Quy Trình, Con Người, Công Nghệ)**:
  - Đồng bộ cấu trúc cả 3 thẻ trụ cột: Hộp icon `w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs` kết hợp tiêu đề 4 từ rõ ràng (`"Quy trình nền tảng"`, `"Con người giá trị"`, `"Công nghệ đòn bẩy"`).
  - Phụ đề mô tả tách biệt rõ ràng, tương phản cao trên cả nền sáng và nền tối, chiều cao đồng bộ `min-h-[78px] sm:min-h-[84px]`.
  - Hệ màu sắc Glass UI đa sắc hài hòa: Trụ cột 1 (Xanh dương / Blue), Trụ cột 2 (Tím hồng / Purple), Trụ cột 3 (Xanh ngọc / Emerald).
- **5. Thẻ Banner Câu Nói Phương Châm Phụng Sự (`#quote-banner-slide-1`)**:
  - Hộp icon trích dẫn `w-7.5 sm:w-8 h-7.5 sm:h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow-xs`.
  - Typography câu nói tinh tế, uyển chuyển `font-play font-bold text-xs sm:text-[13.5px] lg:text-[14px] italic`, tên tác giả `— Nguyễn Hùng Thái` màu vàng kim nổi bật trên dải chuyển sắc xanh chàm.
- **6. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).


## [4.44.0] - 2026-10-27
### Loại Bỏ Hiệu Ứng Over Mouse, Cơ Chế Thẻ Hệ Thống Phóng To 12 Thẻ & Ma Trận Luồng Dữ Liệu 12 Nodes Liên Thông Toàn Diện (SystemsView.tsx, DataFlowMatrixModal.tsx)
- **1. Loại Bỏ Hoàn Toàn Hiệu Ứng Over Mouse Của Các Card (`SystemsView.tsx`)**:
  - Đã xóa bỏ triệt để hiệu ứng hover mouse làm phát video preview hoặc giấu tiêu đề/làm tối nền khi người dùng di chuột ngang qua thẻ.
  - Các thẻ hệ thống giữ trạng thái tĩnh ổn định, màu sắc hiển thị đồng nhất, sắc nét, không còn rung lắc hay nhảy hình ngoài ý muốn khi rê chuột.
- **2. Chi Tiết Thẻ Hệ Thống Click Phóng To Bằng Đúng Kích Thước 12 Thẻ Cộng Lại (`SystemsView.tsx`)**:
  - Khi nhấp vào bất kỳ thẻ hệ thống nào trong 12 thẻ (SDP, CSC, CRM, CLP, BPM, OKR, LMS, POS, ERP, HRM, BI, AI), thẻ sẽ mượt mà mở rộng kích thước bao trùm toàn bộ diện tích của 12 thẻ cộng lại trong lưới (`absolute inset-0 z-40 rounded-[18px] p-3.5 sm:p-5 border backdrop-blur-2xl transition-all duration-500 ease-out animate-in zoom-in-95 fade-in shadow-2xl`).
  - **Bố cục Bento phóng to 2 cột chuyên nghiệp**:
    - **Cột trái**: Video minh họa kích thước lớn sắc nét 100%, có đầy đủ nút điều khiển Play/Pause, Mute/Unmute âm thanh và bộ 3 chỉ số vận hành thực tế (CSAT 98.5%, SLA < 30s, Automation 85%).
    - **Cột phải**: Phân tích chi tiết tổng quan giải pháp, năng lực cốt lõi, danh sách các phân hệ tích hợp và nút kích hoạt nhanh *"Xem luồng dữ liệu"* kết nối trực tiếp vào Modal ma trận.
    - **Nút thu nhỏ**: Cho phép người dùng bấm *"Thu nhỏ"* để co mượt mà trở lại lưới 12 thẻ ban đầu bất kỳ lúc nào.
- **3. Ma Trận Dòng Chảy Dữ Liệu Liên Kết 12 Thẻ Hệ Thống Toàn Diện (`DataFlowMatrixModal.tsx`)**:
  - Mở rộng sơ đồ luồng dữ liệu từ 5 node ban đầu thành mạng lưới hoàn chỉnh **12 Nodes hệ thống** (SDP, CSC, CRM, CLP, BPM, OKR, LMS, POS, ERP, HRM, BI, AI).
  - Tích hợp 16 liên kết dữ liệu nghiệp vụ chéo với giao thức kỹ thuật cao cấp (WebRTC, SIP Trunking, WebSocket, gRPC, Apache Kafka, BigQuery ML, Redis Cache, BPMN 2.0 Engine...).
  - Đồ họa SVG với hiệu ứng hạt photon phát sáng chuyển động (`animateMotion`) hai chiều, quầng sáng neon tương tác và thanh thanh tra luồng dữ liệu trực quan theo thời gian thực.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).


## [4.43.0] - 2026-10-27
### Xóa Nút Debug Wi-Fi Ở Trang Chủ & Tạo Thanh Tiện Ích Bên Phải Ở Trang Hình Nền (Footer.tsx, WallpaperView.tsx, page.tsx)
- **1. Xóa Bỏ Nút "Debug Wi-Fi Quét QR" Tại Trang Chủ & Toàn Bộ Cụm Tiện Ích (`Footer.tsx`)**:
  - Đã loại bỏ hoàn toàn nút bấm `<button id="network-debug-footer-btn">` khỏi thanh footer điều hướng.
  - Tinh giản giao diện, không còn nút Debug Wi-Fi chiếm diện tích góc phải màn hình.
- **2. Bổ Sung Sub Tiêu Đề Đồng Bộ Cho Tất Cả Các Nút Tiện Ích (`Footer.tsx` & `WallpaperView.tsx`)**:
  - **Nút Ngôn Ngữ**: Bổ sung sub tiêu đề `"Song ngữ"` (hoặc chuyển đổi giữa Tiếng Việt và English).
  - **Nút Hình Nền**: Bổ sung sub tiêu đề `"Tùy chỉnh"`.
  - **Nút Hiển Thị**: Duy trì sub tiêu đề `"Mặc định: 100%"` (hoặc tỷ lệ % hiện tại).
  - **Nút Giao Diện**: Duy trì sub tiêu đề `"Chọn theme"`.
  - **Nút Hùng Thái**: Bổ sung sub tiêu đề `"Liên hệ"`.
  - Toàn bộ các nút đạt tỷ lệ 2 dòng cân đối, rõ ràng và tuân thủ chặt chẽ Rule 8.
- **3. Tạo Thanh Tiện Ích Bên Phải Bám Sát Mép Phải Website Tại Trang Hình Nền (`WallpaperView.tsx`)**:
  - **Chiều cao bằng thẻ chính**: Định vị chính xác `top-[70px] sm:top-[76px] md:top-[78px] bottom-[76px] sm:bottom-[80px] md:bottom-[82px]`, khớp 100% với chiều cao của Center Card.
  - **Bám sát mép phải website**: `fixed right-0 z-40`, không chừa khoảng trống bên phải.
  - **Bo cong đặc thù**: Không bo cong 4 góc, chỉ bo cong góc trên bên trái và góc dưới bên trái (`rounded-none rounded-tl-[20px] rounded-bl-[20px] border-r-0 border-y-2 border-l-2`).
  - **Nền giống nền header**: Áp dụng chất liệu `glass-panel` với `backdrop-blur-xl`, viền và đổ bóng phân tầng cao cấp tương ứng theo Dark Neon (`border-cyan-400/35 bg-slate-950/85`) hoặc Light Glass (`border-white/85 bg-white/85`).
  - **Cơ chế tương tác hoàn chỉnh**: Các menu chọn ngôn ngữ, cài đặt hiển thị LiveDisplaySettings, bảng chọn theme và kênh liên hệ Zalo/LinkedIn đều mở popover sang bên trái thanh dock mượt mà.
  - Khi ở trang Hình Nền (`currentPage === 13`), cụm nút ở Footer tự động ẩn để nhường quyền hiển thị trọn vẹn cho thanh bên phải.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript Check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).

## [4.42.0] - 2026-10-27
### Nâng Cấp Trải Nghiệm Video Nền Rõ Nét & Đổi Mới Icon 3D Hệ Thống (SystemsView.tsx)
- **1. Video Nền Hover Rõ Nét, Trong Trẻo & Sống Động Tuyệt Đối**:
  - Tối ưu hóa bộ lọc video khi rê chuột: Tăng cường `brightness-110 contrast-110 saturate-110` kết hợp `transition-all duration-300`, giúp video mô tả của 12 hệ thống phát sáng rực rỡ, trung thực và sắc nét.
  - Loại bỏ lớp phủ gradient tối dày trước đây (`bg-gradient-to-t from-black/65 via-black/20 to-black/45`), thay thế bằng dải mờ siêu mỏng nhẹ chỉ ở chân thẻ (`bg-gradient-to-t from-black/55 via-transparent to-transparent`) để bảo toàn độ sáng của 90% diện tích video.
- **2. Ẩn Tất Cả Tiêu Đề Khi Hover - Giải Phóng Tầm Nhìn Video**:
  - Khi người dùng rê chuột vào thẻ đang phát video: Ẩn hoàn toàn tiêu đề thẻ (`config.displayTitle`), phụ đề, mã phân hệ viết tắt (`item.abbr`) và huy hiệu `"Video Preview"`.
  - Chỉ hiển thị một nhãn chỉ dẫn con nhộng duy nhất đặt tinh tế ở đáy thẻ: `"Click xem nội dung thẻ ↻"` với hiệu ứng kính mờ `bg-black/75 backdrop-blur-md text-cyan-300 border border-cyan-400/60 shadow-lg animate-pulse`.
- **3. Thay Thế Icon Hệ Thống Bằng Hình Ảnh Minh Họa 3D Phong Cách Lĩnh Vực**:
  - Thay thế icon phẳng đơn sắc bằng bộ sưu tập **hình ảnh minh họa 3D Clay Illustration** tham khảo từ các lĩnh vực hoạt động trong `DOMAINS_DATA`:
    - `sdp` (Cổng làm việc CSKH), `bpm` (Quản lý quy trình), `bi` (Báo cáo phân tích): Sử dụng hình 3D Xây dựng hệ thống (`Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png`).
    - `erp` (Tài chính kế toán): Sử dụng hình 3D Thanh toán điện tử (`hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png`).
    - `crm` (Quản lý khách hàng), `csc` (Trung tâm chăm sóc): Sử dụng hình 3D CSKH Viễn thông (`4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png`).
    - `hrm` (Quản lý nhân lực), `lms` (Quản lý đào tạo): Sử dụng hình 3D Dịch vụ bảo hiểm con người (`B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png`).
    - `okr` (Quản lý mục tiêu), `ai` (Trợ lý trí tuệ): Sử dụng hình 3D Công nghệ eSports (`pBKmWZHc/Game-e-Sports-removebg-preview.png`).
    - `clp` (Khách hàng thân thiết), `pos` (Quản lý bán hàng): Sử dụng hình 3D Thương mại điện tử (`fY3Nqny0/Th-ng-m-i-i-n-t-removebg-preview.png`).
  - Tích hợp tính năng tự động fallback về icon vector nếu kết nối mạng của hình ảnh gặp sự cố.
- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - TypeScript check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).

## [4.41.0] - 2026-10-27
### Tinh Chỉnh Giao Diện Trang Chủ & Thư Ngỏ Theo Yêu Cầu (HomeView.tsx, HomeCardStacksLeft.tsx, LetterView.tsx, LiveDisplaySettings.tsx)
- **1. Trang Chủ (`HomeView.tsx` & `HomeCardStacksLeft.tsx`) - Tinh Giản Tiêu Đề & Bộ Lọc Thẻ**:
  - **Ẩn Khối `"Tất cả chuyên mục 10/14"`**: Đã áp dụng `hidden` cho khối tiêu đề danh mục và đếm số trang trên đỉnh xấp thẻ, chuyển cụm điều khiển auto-swap/lật thẻ sang bên phải gọn gàng.
  - **Ẩn Khối Bộ Lọc `"Tất cả chuyên mục 14 Hồ sơ năng lực 6..."`**: Đã áp dụng `hidden` cho khối tab danh mục phía trên xấp thẻ để giao diện tập trung hoàn toàn vào xấp thẻ bài 3D chuyển lớp sống động.
  - **Sửa text nút giới thiệu thành `"Giới thiệu"`**: Thay thế dòng chữ cũ `"PHÁT GIỚI THIỆU (23S)"` thành `"Giới thiệu"` ngắn gọn, tinh tế.
  - **Chuyển nút Giới thiệu nằm dưới card**: Di dời nút Giới thiệu (Laser Beam Capsule Button với vòng xoay ánh sáng neon đa sắc) từ vị trí header trên đỉnh xuống nằm ngay phía dưới xấp thẻ ở cột bên trái, tạo sự liên kết tự nhiên giữa thẻ bài và video giới thiệu.

- **2. Trang Thư Ngỏ (`LetterView.tsx` & `LiveDisplaySettings.tsx`) - Xóa Khối Xem Trước**:
  - **Xóa bỏ khối `"XEM TRƯỚC TRỰC TIẾP (LIVE PREVIEW) 100% Nguyễn Hùng ..."`**: Đã xóa bỏ hoàn toàn khối mini-card live preview trong cài đặt hiển thị giao diện theo đúng phạm vi yêu cầu.

- **3. Trang Thư Ngỏ (`LetterView.tsx`) - Bổ Sung Menu Danh Sách Chọn Ngôn Ngữ**:
  - **Nâng cấp nút bấm `"Ngôn Ngữ"`**: Khi người dùng bấm vào nút `"Ngôn ngữ thuyết minh"` trên bảng điều khiển bên phải, hệ thống mở một menu danh sách cho phép lựa chọn trực tiếp giữa:
    - 🇻🇳 **Tiếng Việt**: Giọng đọc chuẩn mực truyền cảm hứng.
    - 🇬🇧 **Tiếng Anh (EN)**: Giọng đọc tiếng Anh chuyên nghiệp chuẩn quốc tế.
  - Hiển thị dấu tích chọn (✓) trực quan tại ngôn ngữ đang kích hoạt.
  - Tự động đóng menu khi người dùng bấm ra ngoài hoặc sau khi chọn xong ngôn ngữ.

- **4. Kiểm Thử Hệ Thống & Trạng Thái Server**:
  - Kiểm tra TypeScript (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`, HTTP 200).

## [4.40.0] - 2026-10-27
### Tối Ưu Hóa Bento View Thư Ngỏ & Hồ Sơ, Chuyển Khối Điều Khiển Vào Thanh Bên Phải (LetterView.tsx, AboutView.tsx)
- **1. Trang Thư Ngỏ (`LetterView.tsx`) - Slide 2 & Slide 3 Xóa Mốc Năm**:
  - **Xóa mốc năm khỏi Header Card**:
    - Slide 2: Chuẩn hóa tiêu đề thành `"Hành trình sự nghiệp"` (Sentence case, 4 từ), làm sạch subtitle loại bỏ các chuỗi năm `(2002)`, `(2007)`, `(2011)` mà giữ nguyên tên các doanh nghiệp (`MobiFone`, `Viễn Liên V247`, `LBC HTV`).
    - Slide 3: Chuẩn hóa tiêu đề thành `"Hành trình bứt phá"` (Sentence case, 4 từ), làm sạch subtitle loại bỏ `(2013)`, `(2016)`, `(2018)`, `(2023)`.
  - **Loại bỏ Timeline Mini**: Xóa hoàn toàn `{renderInteractiveMiniTimeline()}` ở cả Slide 2 và Slide 3.
  - **Cập nhật hàm `renderCareerCard` với cờ `hideYear = true`**:
    - Tự động lọc sạch các cụm số năm `(20xx)` trong tiêu đề của thẻ sự nghiệp, định dạng chuẩn Sentence case theo Rule 8.
    - Ẩn hoàn toàn badge năm `item.yearLabelVi` trên các thẻ sự nghiệp tại Slide 2 và Slide 3.

- **2. Trang Thư Ngỏ (`LetterView.tsx`) - Slide 1 Chuyển Thông Điệp Hợp Tác Vào Thẻ Giới Thiệu**:
  - Tách bạch rõ vai trò của 2 khối:
    - **Khối chào đối tác (`callout-salutation`)**: Chuyển thành Lời chào trang trọng `Kính chào {companyDisplay}!` với icon phong thư và nút Đổi tên đối tác.
    - **Thẻ nội dung mở đầu & cam kết (`bento-commitment`)**: Đưa huy hiệu và tiêu đề `"Thông điệp hợp tác"` vào phần đầu thẻ, gộp trọn vẹn đoạn văn: *"Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng..."* làm nội dung cốt lõi của thông điệp.

- **3. Chuyển Khối "Điều Khiển Thư Ngỏ" Vào Thanh Bên Phải (`LetterView.tsx`)**:
  - Chuyển toàn bộ cụm điều khiển (thuyết trình tự động Lo-Fi, bật/tắt nhạc nền, thuyết minh song ngữ VI/EN, tốc độ đọc, chuyển đổi chế độ xem và chọn slide) thành thanh dock cố định bên phải: `fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40`.
  - Hỗ trợ chế độ thu gọn thành nút nổi Glassmorphism và mở rộng thành bảng điều khiển dọc thanh lịch.

- **4. Trang Hồ Sơ Chuyên Gia (`AboutView.tsx`) - Chuyển Khối Điều Khiển Vào Thanh Bên Phải**:
  - Chuyển khối `<div>` điều hướng chế độ xem (`Bento View (1 Trang) - Trình Chiếu Slide - Bộ Màu Bento`) từ vị trí thanh ngang chiếm diện tích ở đỉnh trang sang thanh dock cố định bên phải: `fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40`.
  - **Trạng thái thu gọn**: Nút nổi Glassmorphism với icon chế độ (`LayoutGrid` hoặc `BookOpen`), chỉ báo dot màu Bento hiện tại, bấm hoặc rê chuột để mở.
  - **Trạng thái mở rộng**: Panel dọc `w-[210px] sm:w-[220px]` với tiêu đề `"Điều khiển hồ sơ"` (Rule 8), nút `✕` đóng nhanh, 2 nút chọn chế độ Bento View / Trình chiếu Slide, 3 tab chuyển slide trực tiếp và bộ chọn màu Bento đa sắc (Pastel, Cyber, Emerald, Rose).
  - Tối ưu không gian hiển thị cho toàn bộ 8 ô Bento Grid và 3 Slide mở rộng tối đa theo chiều dọc.

- **5. Tối Ưu Hóa Bento Responsive View Từ Slide 1 Đến Slide 4 (`LetterView.tsx`)**:
  - Slide 1: Bố cục lưới 12 cột cân đối, thẻ Video 5 cột, thẻ Thông điệp 7 cột, 3 thẻ Trụ cột 4 cột, Quote banner 12 cột.
  - Slide 2: 3 thẻ sự nghiệp được cân đối 6 cột (MobiFone, V247) và 12 cột (LBC HTV).
  - Slide 3: 4 thẻ sự nghiệp chia 12 cột (Garena Shopee) và 3 thẻ 4 cột (Prudential, MoMo, Ví ECO).
  - Slide 4: Khối Triết lý 2 cột lớn, 4 thẻ Giá trị cốt lõi đa sắc tự động chuyển 1 cột trên Mobile, 2 cột trên Tablet và 4 cột trên Desktop.
  - Kiểm tra TypeScript (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động ổn định liên tục (`http://localhost:3001`).

## [4.39.0] - 2026-10-27
### Mở Rộng Chế Độ Thuyết Minh Song Ngữ (Bilingual Narration Switcher: VI & EN) Cho Thư Ngỏ (LetterView.tsx, speechVoice.ts)
- **1. Xây Dựng Kịch Bản Thuyết Minh Song Ngữ Toàn Diện (Bilingual Narration Script)**:
  - Tích hợp 2 kịch bản đọc song song bám sát dữ liệu gốc trong [`letterData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/letterData.ts):
    - **Giọng đọc Tiếng Việt chuẩn mực (`lang = 'vi-VN'`)**: Kịch bản tiếng Việt sâu sắc, truyền cảm hứng qua 4 phần thư ngỏ (Lời chào mở đầu, 3 Cột mốc khởi đầu, 4 Cột mốc quản trị lớn, Triết lý & 4 Giá trị cốt lõi).
    - **Giọng đọc Tiếng Anh chuyên nghiệp (`lang = 'en-US'`)**: Kịch bản tiếng Anh lưu loát, chuẩn văn phong quốc tế dành cho đối tác C-Level toàn cầu (`Warmest greetings to...`, `roleEn`, `descEn`, `highlightEn`, `titleEn`, `descEn`).
  - Tự động thay đổi nội dung đọc và nhãn hiển thị tương ứng với ngôn ngữ được lựa chọn.

- **2. Lựa Chọn Giọng Đọc AI Tối Ưu Tự Động (Intelligent Voice Selector)**:
  - Bổ sung hàm `findBestEnglishVoice()` trong [`speechVoice.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/speechVoice.ts): Tự động ưu tiên các giọng đọc cao cấp chuẩn Studio / Neural Online (Google US English, Microsoft Jenny Online Natural, Guy, Samantha, Alex, Daniel...).
  - Duy trì hàm `findBestVoice()` cho Tiếng Việt (Microsoft Nam Minh Online, Hoài My, Google Tiếng Việt 5).

- **3. Cơ Chế Chuyển Đổi Mượt Mà Không Gián Đoạn (Seamless Switcher Engine)**:
  - State `narrationLanguage`: Khởi tạo và lưu trạng thái bền vững trong `localStorage ('hungthai_narration_lang')`.
  - Khi người dùng bấm chuyển đổi ngôn ngữ:
    - Nếu đang trong quá trình thuyết minh, hệ thống tự động phát lại đoạn hiện tại bằng ngôn ngữ mới tức thì mà không cần bấm dừng.
    - Hiển thị Toast thông báo trạng thái: `🇻🇳 Đã chuyển sang Giọng đọc Tiếng Việt chuẩn mực` / `🇬🇧 Switched to Professional English Voice Narration`.

- **4. Giao Diện Điều Khiển Đồng Bộ & Chuẩn Hóa Rule 8**:
  - **Trên Panel Menu Phải**: Bổ sung nút `"Thuyết minh song ngữ"` tuân thủ 100% Rule 8 (4 từ, Sentence case, không dùng ký tự `&`), hiển thị badge `VI` / `EN` trực quan.
  - **Trên Thanh Dock Nổi Đọc Thư (`Floating Narration Bar`)**: Thêm nút chuyển đổi dạng pill `[🇻🇳 VI | 🇬🇧 EN]` nằm cạnh nút chỉnh tốc độ và tự chuyển phần.
  - **Trên Thanh Dock Thuyết Trình Tự Động (`Floating Autoplay Dock`)**: Thêm nút chuyển nhanh `VI / EN` để người dùng linh hoạt đổi ngôn ngữ trong khi xem video và 4 slide trình chiếu.

- **5. Bảo Toàn Dữ Liệu & Kiểm Thử Hệ Thống**:
  - Bảo toàn 100% dữ liệu gốc trong `src/data/letterData.ts`.
  - Kiểm tra TypeScript (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động liên tục ổn định (`http://localhost:3001`).

## [4.38.0] - 2026-10-27
### Tích Hợp Hình Nền Mới Radial Gradient Hoàng Hôn Cam Hồng Pastel 7 Sắc (wallpapers.ts)
- **1. Tích Hợp Hình Nền Mới Theo Yêu Cầu**:
  - Mã định danh: `radial-sunset-pastel-glow`.
  - Tên hiển thị: `"Hoàng Hôn Cam Hồng Pastel"`.
  - Loại hình nền: `gradient`.
  - Công thức Gradient 7 dải màu chuyển tiếp:
    ```css
    radial-gradient(
      125% 125% at -2% 101%,
      rgba(245, 87, 2, 1) 10.5%,
      rgba(245, 120, 2, 1) 16%,
      rgba(245, 140, 2, 1) 17.5%,
      rgba(245, 170, 100, 1) 25%,
      rgba(238, 174, 202, 1) 40%,
      rgba(202, 179, 214, 1) 65%,
      rgba(148, 201, 233, 1) 100%
    )
    ```
- **2. Đồng Bộ Giao Diện & Tương Thích Toàn Hệ Thống**:
  - Hiển thị đầy đủ trong danh sách hình nền có sẵn của trang Hình Nền & Giao Diện ([`WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx)).
  - Tự động nằm trong nhóm tab lọc: `Tất cả`, `☀️ Nền Sáng`, `Gradient`, `Mã CSS`.
  - Hỗ trợ xem trước 1-click, lưu làm hình nền mặc định dài lâu, và tương thích hoàn hảo trong chế độ Zen Mode và Trình chiếu tự động (Slideshow).
  - Tự động trích xuất màu nhấn hoàng hôn cam rực rỡ (`#f55702`) làm điểm nhấn ánh sáng cho toàn trang web.
- **3. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Hoạt động liên tục ổn định.

## [4.37.0] - 2026-10-27
### Sửa Chữa Chạy Website & Nâng Cấp Hiển Thị Hình Nền CodePen Toàn Diện (WallpaperView.tsx, wallpapers.ts, wallpaperStorage.ts)
- **1. Sửa Chữa & Duy Trì Vận Hành Website**:
  - Kiểm tra và đảm bảo Next.js Dev Server (port 3001) hoạt động ổn định liên tục, biên dịch trơn tru trong 950ms - 1.2s.
  - Phản hồi HTTP 200 OK ngay lập tức cho các yêu cầu duyệt web (`http://localhost:3001`).

- **2. Bổ Sung Tab Lọc & Nhận Diện Hình Nền CodePen (CodePen Category Filter)**:
  - Thêm tab lọc chuyên biệt `⚡ Nền CodePen` trên thanh điều hướng hình nền của `WallpaperView.tsx`.
  - Cập nhật logic lọc `filterType === 'codepen'` tự động trích lọc chính xác các hình nền loại `codepen` hoặc có nguồn gốc từ CodePen.

- **3. Sửa Chữa Hiển Thị Thumbnail & Live Animation Cho Thẻ CodePen**:
  - Khắc phục tình trạng thẻ CodePen trước đây chỉ hiển thị một khối xám tĩnh với icon code.
  - Sửa đổi cơ chế hiển thị:
    - Nhúng `<iframe>` thu nhỏ (`scale-50`, `loading="lazy"`, sandbox an toàn) trực tiếp trên mặt thẻ giúp người dùng nhìn thấy chuyển động thực tế sống động của CodePen.
    - Hiển thị badge nhận diện `CodePen Live` rực rỡ ở góc dưới thẻ.
  - Trong Modal Thêm Hình Nền: Khung xem trước (Live Preview) tự động render iframe trực tiếp thay vì khối chữ thông thường.

- **4. Thêm Bộ Sưu Tập Hình Nền Mẫu Từ CodePen**:
  - Bổ sung hình nền **Nền CodePen Card Stacks** (trích xuất ảnh nền từ CodePen Card Stacks của người dùng).
  - Bổ sung các hình nền CodePen sống động chuẩn C-Level:
    - *Nền CodePen Sóng 3D Lập Thể* (`codepen-waves-3d`)
    - *Nền CodePen Ma Trận Hạt Canvas* (`codepen-particles-canvas`)
    - *Nền CodePen Cực Quang Fluid WebGL* (`codepen-aurora-webgl`)

- **5. Bóc Tách Thông Minh Khi Dán Mã Nguồn HTML/CSS Từ CodePen**:
  - Nâng cấp `detectWallpaperType` trong `wallpaperStorage.ts`: Khi người dùng dán toàn bộ đoạn code HTML/CSS từ CodePen (chứa `background-image: url(...)`, `.stack`, `card-stacks`...), hệ thống tự động bóc tách đường dẫn ảnh gốc và tạo hình nền chất lượng cao tức thì.
  - Nâng cấp `normalizeCodepenUrl`: Tự động loại bỏ header/footer của CodePen và chuyển sang chế độ embed dark view tràn viền mượt mà.

- **6. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js: Sẵn sàng tại `http://localhost:3001`.

## [4.36.0] - 2026-10-27
### Triển Khai Bộ Lọc Chuyên Mục, Kéo Vuốt Cảm Ứng, Âm Thanh Xào Bài Cổ Điển & Vòng Đếm Ngược Neon (HomeCardStacksLeft.tsx, SoundEngine.ts)
- **1. Hiệu Ứng Kéo Vuốt Cảm Ứng (Touch & Pointer Swipe Card Gesture)**:
  - Tích hợp khả năng bắt cử chỉ cảm ứng (`onTouchStart`, `onTouchMove`, `onTouchEnd`) trên thiết bị di động, tablet cũng như kéo rê chuột (`onPointerDown`, `onPointerMove`, `onPointerUp`) trên màn hình máy tính.
  - Khi ngón tay kéo: Thẻ trên cùng di chuyển phản hồi lực kéo thời gian thực (`dragOffset`), hơi nghiêng góc xoay tự nhiên (`rotate(dragOffset.x * 0.06deg)`).
  - Khi thả ngón tay:
    - **Vuốt lên** (`dy < -55px`) hoặc **vuốt ngang lệch mạnh** (`|dx| > 70px`): Kích hoạt hiệu ứng CodePen Swap đưa thẻ bay lên cao và trượt xuống đáy xấp bài.
    - **Vuốt xuống** (`dy > 60px`): Rút thẻ từ đáy lên đầu xấp bài (Prev Card).
    - **Chưa vượt ngưỡng**: Thẻ đàn hồi mềm mại trở lại vị trí trung tâm (`spring-back`).

- **2. Âm Thanh Lật Thẻ Giấy / Xào Bài Cổ Điển Chân Thực (Realistic Paper Deck Shuffle SFX)**:
  - Bổ sung phương thức `SoundEngine.playPaperDeckShuffle()` sử dụng Web Audio API tổng hợp thuật toán 2 pha độc quyền:
    - **Pha 1 (Swoosh giấy lướt gió - 0 -> 240ms)**: Tiếng xột xoạt của mép giấy cứng lướt trong gió với bộ lọc Bandpass Filter quét từ 850Hz lên 1750Hz và hạ về 650Hz.
    - **Pha 2 (Snap / Drop - 320 -> 480ms)**: Tiếng thẻ giấy tiếp đất nhẹ nhàng vào đáy xấp bài với bộ lọc Lowpass Filter suy giảm theo hàm mũ mộc mạc.
  - Tự động kích hoạt khi người dùng nhấp thẻ, vuốt cảm ứng, chuyển tab bộ lọc hoặc khi vòng đếm ngược 6.5s tự động đổi thẻ.

- **3. Bộ Lọc Thẻ Theo Nhóm Chuyên Mục Chuẩn Rule 8 (Category Filter Tabs)**:
  - Bổ sung 4 tab lọc nhanh trên đầu xấp thẻ:
    - `"Tất cả chuyên mục"` (14 trang).
    - `"Hồ sơ năng lực"` (6 trang: Thư ngỏ, Giới thiệu, Học vấn, Lĩnh vực, Kỹ năng, Kinh nghiệm).
    - `"Hệ thống dự án"` (5 trang: Dự án, Hệ thống, Phỏng vấn, Tử vi, Kỷ niệm).
    - `"Tương tác kết nối"` (3 trang: Trang chủ, Liên hệ, Hình nền).
  - Tuân thủ nghiêm ngặt **Quy tắc Rule 8**: Đúng 4 từ, Sentence case, loại bỏ hoàn toàn ký tự `&`.
  - Có hiệu ứng chuyển sắc Gradient nổi bật khi tab được chọn, tự động lọc lại stack và reset bộ đếm thời gian.

- **4. Thanh Tiến Trình Neon Đếm Ngược 6.5s Tự Đổi Thẻ (Auto-Swap Progress Ring)**:
  - Vòng tròn SVG viền Neon phát sáng (`text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.9)]`) ôm quanh nút chuyển thẻ.
  - Đếm ngược mượt mà chu kỳ **6.5s** (`AUTOSWAP_DURATION_MS = 6500`).
  - Tự động tạm dừng đếm ngược khi người dùng rê chuột (`isHovered`), khi đang kéo vuốt ngón tay (`isDragging`) hoặc khi đang trong quá trình chuyển động bay của thẻ (`swappingCardId`).
  - Tích hợp nút Play/Pause mini cho phép người dùng chủ động bật hoặc dừng tính năng tự đổi thẻ bất kỳ lúc nào.

- **5. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc trong `src/data/pageShowcaseData.ts`.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Biên dịch thành công tức thì trong 1.1s (`http://localhost:3001`).

## [4.35.0] - 2026-10-27
### Triển Khai Chế Độ Thuyết Trình Tự Động Kèm Nhạc Nền Lo-Fi Tinh Tế (Autoplay Presentation with Ambient Audio & Audio Ducking)
- **1. Chế Độ Thuyết Trình Tự Động Bám Sát Dòng Thời Gian Video (Autoplay Presentation Engine)**:
  - Tự động chạy lần lượt 4 slide của Thư Ngỏ (`Slide 1 -> 4`) đồng bộ với tiến trình phát của Video thuyết minh chính thức (`LETTER_SLIDE_1_VIDEO_URL = transition-studio-take_24.mp4`) dựa theo danh sách 7 mốc thời gian `PRESENTATION_VIDEO_CUES`:
    - Slide 0 (Slide 1): 0% -> 42% (3 phân đoạn: Mở đầu lời chào, Thông điệp hợp tác, Triết lý phục vụ).
    - Slide 1 (Slide 2): 42% -> 56% (1 phân đoạn: 3 Trụ cột cốt lõi).
    - Slide 2 (Slide 3): 56% -> 84% (2 phân đoạn: Hành trình cam kết, Năng lực chuyên môn).
    - Slide 3 (Slide 4): 84% -> 100% (1 phân đoạn: Lời kết & Thông tin liên hệ).
  - Tự động ghi nhớ thời gian phát video qua `savedVideoTimeRef` để khi chuyển đổi giữa các slide hoặc các chế độ hiển thị, luồng video và âm thanh không bị gián đoạn hay reset về 0.

- **2. Nhạc Nền Lo-Fi Tinh Tế & Cơ Chế Giảm Âm Lượng Tự Động (Ambient Audio Ducking Engine)**:
  - Tích hợp động cơ âm thanh thuật toán độc lập `AmbientSoundEngine` (Web Audio API tần số 432Hz & 528Hz chuẩn Cosmos Ambient Pad) mang lại không gian thư giãn, sang trọng và không phụ thuộc file mp3 hay tài nguyên mạng ngoài.
  - **Cơ Chế Audio Ducking Đẳng Cấp**:
    - Khi có giọng đọc AI TTS (`isNarrating && !isPaused`) hoặc khi Video thuyết minh đang phát có tiếng (`isVideoPlaying && !isVideoMuted`): Nhạc nền Lo-Fi tự động hạ âm lượng êm dịu xuống **12%** (`isDuckingActive = true`), giúp giọng thuyết minh luôn sắc nét, nổi bật và dễ nghe.
    - Khi giọng đọc hoặc video dừng/tắt tiếng: Âm lượng Lo-Fi tự động nâng mượt mà trở lại mức thư thái **32%** (`isDuckingActive = false`).
  - Hỗ trợ công tắc bật/tắt riêng biệt cho Nhạc Nền Lo-Fi trên menu điều khiển và thanh dock.
  - Tự động dọn dẹp âm thanh (`AmbientSoundEngine.stop()`) khi rời khỏi trang Thư Ngỏ.

- **3. Thanh Điều Khiển Nổi Cao Cấp (Floating Autoplay Dock Controller)**:
  - Thanh dock thiết kế chuẩn Glassmorphism đa tầng (`backdrop-blur-2xl`, viền phát sáng cyan/indigo, bóng đổ 3D mềm mại) cố định ở vị trí đáy màn hình:
    - Hiệu ứng chấm nhấp nháy chuyển động và nhãn tiến trình `Slide X/4` kèm tiêu đề phân đoạn thực tế.
    - Badge trạng thái Ducking thông minh: `Lo-Fi êm (12%)` khi đang có thuyết minh và `Lo-Fi nền (32%)` khi phát nhạc thư giãn.
    - Thanh tiến trình mini hiển thị % thời gian video chạy ngang mượt mà.
    - Bộ nút điều khiển tiện ích: Lùi slide (←), Play/Pause video, Mute/Unmute video, Tiến slide (→), Bật/Tắt Lo-Fi, và nút Dừng thuyết trình.

- **4. Nút Điều Khiển Trên Menu Phải Chuẩn Hóa Rule 8**:
  - Bổ sung 2 nút điều khiển tại panel bên phải:
    - Nút `"Thuyết trình tự động"`: Chuẩn hóa đúng 4 từ, Sentence case, không dùng ký tự `&`.
    - Nút `"Nhạc nền Lo-Fi"`: Hiển thị trạng thái Bật/Tắt trực quan.
  - Tương thích 100% trên cả 2 chế độ Giao diện Sáng (Light Glass) và Giao diện Tối (Dark Neon).

- **5. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Bảo toàn 100% dữ liệu gốc trong `src/data/letterData.ts`.
  - Kiểm tra TypeScript (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js port 3001: Biên dịch thành công tức thì trong 559ms (`http://localhost:3001`).

## [4.34.0] - 2026-10-27
### Tối Ưu Hóa Toàn Diện Giao Diện & Bố Cục Trang Kinh Nghiệm (ExperienceView.tsx)
- **1. Chuẩn Hóa Tiêu Đề Thẻ 100% Theo Quy Tắc Rule 8**:
  - Chuẩn hóa toàn bộ tiêu đề thẻ card thành **đúng 4 từ súc tích**, **Sentence case** (Viết hoa chữ đầu còn lại viết thường, giữ nguyên các từ viết tắt chuyên môn như CX, CSKH, KPI, SLA, SOP, AI, CRM, FCR, NPS...):
    - Tiêu đề Hero: `"Hành trình sự nghiệp"` (4 từ chuẩn Sentence case).
    - Thẻ Timeline Cột Mốc: Loại bỏ hoàn toàn class `uppercase`, áp dụng `formatCardTitle` chuẩn mực (`"MobiFone"`, `"Viễn Liên V247"`, `"LBC HTVC"`, `"VED Garena"`, `"Prudential"`, `"Ví MoMo"`, `"Finviet ECO"`, `"Power Service"`).
    - Popover Chỉ số: `"Chỉ số KPI nổi bật"` (thay cho chuỗi có ký tự `&` và viết hoa toàn bộ).
    - Tab Lộ trình phát triển: `"Lộ trình phát triển"`, 4 Trụ cột CX: `"Con người văn hóa"`, `"Quy trình tiêu chuẩn"`, `"Công nghệ AI CRM"`, `"Dữ liệu giá trị"`.
    - Thẻ chi tiết công tác (Job Card): `"Lĩnh vực hoạt động"`, `"Thương hiệu tiêu biểu"`, `"Hình ảnh kỷ niệm"`, `"Triết lý quản trị"`, `"Mô tả công việc"`, `"Dự án trọng điểm"`, `"Cam kết chất lượng"`, `"Chỉ số KPI đạt"`.
  - **Loại bỏ triệt để ký tự `&`** trên toàn bộ các tiêu đề thẻ card trong trang Kinh nghiệm.

- **2. Khắc Phục Lỗi Hiển Thị & Đồng Bộ Giao Diện Sáng / Tối (Light Glass & Dark Neon)**:
  - Khởi tạo state `isDark` kết hợp `MutationObserver` theo dõi thuộc tính `class="dark"` và `data-theme` thời gian thực.
  - Sửa lỗi thẻ Timeline bị dính inline style `background` màu sáng khi ở chế độ Dark Mode:
    - Trong Dark Mode, áp dụng nền Dark Glass đa tầng: `radial-gradient(circle at top right, ${item.primaryColor}22 0%, transparent 70%), linear-gradient(160deg, rgba(15, 23, 42, 0.94) 0%, rgba(2, 6, 23, 0.98) 100%)`.
    - Viền phát sáng neon `${item.primaryColor}` khi được chọn hoặc hover.
    - Màu chữ, badge số lượng, nhãn thời gian và các thanh tiến trình KPI đồng bộ sắc nét với độ tương phản cao trên cả nền Sáng và Tối.

- **3. Tối Ưu Bố Cục & Trải Nghiệm Tương Tác**:
  - Tối ưu khoảng cách (gap, padding), bo góc chuẩn `rounded-[14px]` cho các thẻ.
  - Ẩn thanh cuộn thô cứng với `no-scrollbar` ở các khối danh sách dài (Dự án trọng điểm, Mô tả công việc).
  - Tinh chỉnh các nút cuộn ngang carousel và thanh điều hướng mốc công tác mượt mà trên mọi kích thước màn hình (Desktop, Tablet, Mobile).

- **4. Bảo Toàn Dữ Liệu & Kiểm Thử Hệ Thống**:
  - Bảo toàn 100% dữ liệu gốc trong `src/data/experience.ts`.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Khởi động lại và duy trì Next.js Dev Server ngầm trên port 3001: Đã biên dịch xong toàn bộ modules (`✓ Compiled / in 33.6s`), trang web sẵn sàng tại `http://localhost:3001`.

## [4.33.0] - 2026-10-27
### Triển Khai Chế Độ Hover Video Preview Cho Tất Cả 12 Thẻ Hệ Thống & Biểu Đồ Ma Trận Dòng Chảy Dữ Liệu Tương Tác (SystemsView.tsx, DataFlowMatrixModal.tsx)
- **1. Chế Độ Xem Video Nền Khi Rê Chuột Cho Toàn Bộ 12 Thẻ Hệ Thống (Hover Video Preview)**:
  - Mở rộng cơ chế hover video từ thẻ CLP sang **toàn bộ 12 thẻ hệ thống** trong `SystemsView.tsx` (`SDP`, `ERP`, `CRM`, `HRM`, `BPM`, `OKR`, `CLP`, `LMS`, `CSC`, `BI`, `AI`, `POS`) sử dụng mảng dữ liệu chính thức `SYSTEMS_DATA`.
  - Quản lý hover đa thẻ bằng `hoveredCardId` và mảng `cardVideoRefs`:
    - Khi rê chuột vào thẻ: Video mô tả phát tự động (`currentTime = 0`, `play()`, `opacity-100`, `scale-100`, `brightness-105`), nền thẻ chuyển `#020617` với viền phát sáng neon `${cardTheme}bb` và bóng đổ đa chiều `0 0 25px ${cardTheme}66`.
    - Lớp gradient phủ nhẹ `from-black/65 via-black/20 to-black/45` đảm bảo video rõ nét sống động mà vẫn bảo vệ khả năng đọc chữ tối đa.
    - Hiển thị badge viết tắt (`SDP`, `ERP`...), nhãn trạng thái `"Video Preview"` và nút nhấp lật thẻ dạng con nhộng kính mờ `Nhấp để lật thẻ ↻`.
    - Khi rời chuột: Video tự động tạm dừng (`pause()`), thẻ trả về diện mạo mặc định mượt mà trong 300ms.
  - Bảo toàn 100% tính năng lật thẻ 3D (`isFlipped`) để người dùng xem chi tiết tính năng, đường dẫn và video toàn màn hình.

- **2. Biểu Đồ Ma Trận Dòng Chảy Dữ Liệu Tương Tác (System Architecture Data-Flow Diagram)**:
  - Thêm nút `"Xem luồng dữ liệu"` tại Header lưới 12 hệ thống cạnh tiêu đề `Hệ Thống Vận Hành`, có hiệu ứng gradient và icon `Activity` phát sáng nhấp nháy êm dịu.
  - Xây dựng component modal tương tác cao cấp `src/components/ui/DataFlowMatrixModal.tsx`:
    - **Sơ Đồ Mạng 5 Node Cốt Lõi**:
      - `SDP` (Service Delivery Platform) đặt tại trung tâm điều phối.
      - 4 Node vệ tinh: `CRM` (Khách hàng), `ERP` (Nguồn lực & Tài chính), `AI` (Trợ lý thông minh), `BI` (Phân tích dữ liệu & Báo cáo).
    - **Dòng Chảy Dữ Liệu Hạt Photon Phát Sáng (SVG Bezier Particle Motion)**:
      - Sử dụng `<path>` Bezier bậc 3 kết hợp `<animateMotion>` phát các chùm hạt phát sáng neon chạy liên tục biểu thị luồng dữ liệu thời gian thực giữa các hệ thống.
    - **Bảng Điều Khiển Tương Tác (Interactive Flow Controls)**:
      - Nút Tạm dừng / Tiếp tục (`isPaused`).
      - Nhấp chọn từng đường luồng để xem chi tiết: Giao thức (REST/GraphQL/gRPC), Tần suất (Thời gian thực / Theo sự kiện), Dữ liệu truyền tải (Payload Data).
      - Thống kê thời gian thực: 5 Phân hệ lõi, 6 Đường luồng đồng bộ, 99.98% Tỷ lệ toàn vẹn dữ liệu, Tốc độ đồng bộ <150ms.
    - Hỗ trợ toàn diện 2 chế độ Giao diện Sáng (Light Glass) và Giao diện Tối (Dark Neon).

- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc của 12 hệ thống trong `src/data/systems.ts`.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js tại port 3001: Hoạt động ổn định liên tục.

## [4.32.0] - 2026-10-27
### Tích Hợp Xấp Thẻ Tương Tác Chuyển Lớp (CodePen Card Stacks Swap) Vào Cột Bên Trái Trang Chủ (HomeCardStacksLeft.tsx, HomeView.tsx)
- **1. Phân Tích Kỹ Thuật Nguồn Tham Khảo CodePen Card Stacks**:
  - **Bố cục xếp chồng lớp (Stack Transforms)**:
    - Thẻ trên cùng (k = 0): `transform: translate(-50%, calc(-50% + 15px)) scale(1.05)`, z-index 10, bóng đổ 3D đậm nét.
    - Thẻ thứ 2 (k = 1): `transform: translate(-50%, calc(-50%)) scale(1.0)`, z-index 8.
    - Thẻ thứ 3 (k = 2): `transform: translate(-50%, calc(-50% - 15px)) scale(0.95)`, z-index 6.
    - Thẻ thứ 4 trở đi (k = 3): `transform: translate(-50%, calc(-50% - 30px)) scale(0.90)`, z-index 4, độ mờ nhẹ.
  - **Hiệu ứng hoán đổi (Swap Animation)**:
    - Khi click vào thẻ trên cùng: Thẻ bay vút lên trên `-170px`, xoay nghiêng nhẹ `-7deg`, sau đó lướt nhẹ ra phía sau và chui xuống đáy xấp thẻ trong 700ms. Thẻ kế tiếp đẩy lên phía trước với tỷ lệ `scale(1.05)`.
- **2. Chuyển Đổi Sang React Component Đẳng Cấp (`HomeCardStacksLeft.tsx`)**:
  - Đặt tại **Cột Bên Trái** của Trang Chủ (`HomeView.tsx`), kích thước thanh thoát `w-[320px] sm:w-[350px] md:w-[375px] h-[330px] sm:h-[350px]`, không che khuất phong thái chuyên gia trong video nền.
  - Tích hợp toàn bộ **14 thẻ đại diện cho 14 trang** từ `src/data/pageShowcaseData.ts`:
    - **Header Thẻ**: Khung hợp nhất bao trùm Icon + Tiêu đề 4 chữ Sentence Case (Rule 8: `"Trang chủ tổng quan"`, `"Thư ngỏ đối tác"`, `"Hồ sơ chuyên gia"`, `"Học vấn chứng chỉ"`...), kèm Badge số trang `01` - `14` đồng bộ màu nhận diện `item.theme`.
    - **Body Thẻ**: Phân loại danh mục, đoạn mô tả tóm tắt đặc biệt từ trang, cùng 2 điểm nhấn nổi bật (`highlights`) kèm icon tia sáng `sparkles`.
    - **Footer Thẻ**: Nút `"Khám phá trang"` (chuyển trang ngay lập tức) và nút `"Đổi thẻ tiếp"` (hoán đổi sang thẻ tiếp theo theo hiệu ứng CodePen).
  - Tương tác bổ trợ: Nút Prev / Next mini, chỉ báo số trang `thẻ / 14`, tính năng tự động đổi thẻ (Auto Swap) sau 6.5s (tự động dừng khi hover).
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc, video nền chuyên gia, các đường link chuyển trang.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js tại port 3001: **HTTP 200 OK**.


## [4.31.0] - 2026-10-27
### Đồng Bộ Màu Ánh Sáng Mặt Trời Theo Giờ Thực Tế (Sun Position Ambient Glow) Cho WeatherWidget (WeatherWidget.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"Đồng Bộ Màu Ánh Sáng Mặt Trời Theo Giờ Thực (Sun Position Ambient Glow): Tự động chuyển tông màu ánh sáng của icon thời tiết từ sắc vàng ban mai, rực rỡ trưa hè sang ánh hoàng hôn cam ấm áp theo giờ thực tế của địa phương."*
  - Đối tượng: Icon thời tiết và quầng phát sáng (Ambient Glow) trong component `WeatherWidget.tsx`.
- **2. Triển Khai Kỹ Thuật Quang Phổ Mặt Trời Theo Giờ Thực**:
  - **Hệ Thống 4 Pha Ánh Sáng Mặt Trời (Solar Time-Phase Palette)**:
    1. **Sắc Vàng Ban Mai (05:00 - 09:59)**: Gradient mặt trời vàng kem ban mai (`#FEF9C3` -> `#FDE047` -> `#F59E0B`), quầng sáng dịu nhẹ ấm áp (`rgba(253, 224, 71, 0.5)`).
    2. **Rực Rỡ Trưa Hè (10:00 - 15:59)**: Gradient quang năng chói chang nhiệt đới (`#FFFFFF` -> `#FACC15` -> `#EA580C`), quầng sáng năng lượng cao rực rỡ (`rgba(250, 204, 21, 0.65)`).
    3. **Hoàng Hôn Cam Ấm Áp (16:00 - 18:59)**: Gradient cam san hô pha đỏ tía hoàng hôn (`#FED7AA` -> `#F97316` -> `#E11D48`), quầng sáng cam đỏ ấm áp thơ mộng (`rgba(249, 115, 22, 0.6)`).
    4. **Ánh Trăng Huyền Ảo (19:00 - 04:59)**: Gradient ánh trăng bạc và chàm đêm tinh tú (`#F0FDF4` -> `#818CF8` -> `#4338CA`), quầng sáng xanh lam huyền bí (`rgba(129, 140, 248, 0.45)`).
  - **Tích Hợp Quầng Sáng Tự Nhiên (Sun Position Ambient Glow Aura)**:
    - Bổ sung lớp `radial-gradient` phát sáng mờ ảo (`blur-md`, `scale(1.45)`) ngay sau icon thời tiết, chuyển tông màu mượt mà theo thời gian thực (`transition-all duration-1000`).
    - Các SVG icon `Sunny` và `Cloudy` kế thừa trực tiếp gradient động `#dynamicSunD` và `#dynamicSunA`.
    - Hạt bụi thời tiết (Particle Burst) khi click vào thời tiết nắng tự động kế thừa bộ màu quang phổ thực tế.
  - **Chỉ Báo Vi Điểm Tinh Tế (Micro Indicator Dot)**:
    - Bổ sung chấm chỉ báo phát sáng nhấp nháy êm ái cạnh tên địa điểm (TP. Hồ Chí Minh) phản ánh trực quan tông màu mặt trời hiện thời.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu nhiệt độ, đồng bộ Open-Meteo GPS và giao diện kính mờ nền trong suốt.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js tại port 3001: **HTTP 200 OK**.


## [4.30.0] - 2026-10-27
### Nâng Cấp Khối Thông Điệp Hợp Tác & Lời Chào Mở Đầu Sang Bento Grid Layout Responsive (LetterView.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"[Trang: Thư Ngỏ Gửi Quý Đối Tác & Khách Quý | File: src/components/views/LetterView.tsx] Tại Thư Ngỏ Gửi Quý Đối Tác & Khách Quý, với Khối <div> "Thông điệp hợp tác Kính chào Quý Công ty! + Tên Công..." (<div>): Kiểu dáng - Bento Grid Layout Repondsive (Phạm vi: Áp dụng trong toàn bộ Thư Ngỏ Gửi Quý Đối Tác & Khách Quý)."*
  - Đối tượng: Khối Header & Salutation mở đầu Thư Ngỏ chứa tiêu đề "Thông điệp hợp tác", lời chào "Kính chào Quý Công ty!" và nút "+ Tên Công ty".
  - Phạm vi: Áp dụng đồng bộ cho cả chế độ Trình Chiếu Slide (`currentSlide === 0`) và Chế Độ Toàn Văn Một Trang (`viewMode === 'one-page'`).
- **2. Triển Khai Bento Grid Layout Responsive Chuẩn Mực**:
  - **Tích hợp vào thuần Bento Grid 12 Cột**:
    - Khối Thông điệp hợp tác & Lời chào mở đầu trở thành **Top Bento Tile (`col-span-12`)** liền khối và kết nối trực tiếp với mạng lưới Bento Grid của Thư Ngỏ, loại bỏ hoàn toàn tình trạng 2 thanh ngang riêng biệt chiếm nhiều diện tích dọc.
    - **Bên trái**: Khung hợp nhất (Unified Pill Frame) bao trùm Icon sách + Tiêu đề đúng 4 chữ chuẩn Sentence Case: `"Thông điệp hợp tác"` với tone xanh Emerald đồng bộ.
    - **Ở giữa**: Lời chào trang trọng cá nhân hóa `"Kính chào {companyDisplay}!"` với icon `sparkles`, màu hổ phách/cam rực rỡ, font Play nổi bật.
    - **Bên phải**: Nút con nhộng Bento Glass `"+ Tên Công ty"` / `"Đổi tên"` kèm icon người dùng `users`, hỗ trợ tương tác mở modal hoặc chia sẻ link đối tác.
    - Tự động hiển thị Live Note Pill đếm ngược nếu video đang thuyết minh đoạn này.
  - **Đồng bộ hóa 3 Trụ Cột Thành Tiêu Đề 4 Chữ Chuẩn Sentence Case**:
    - Trụ cột 1: `"Quy trình nền tảng"` (Icon khiên `shield`, chuẩn hóa KPI).
    - Trụ cột 2: `"Con người giá trị"` (Icon người dùng `users`, lắng nghe & thấu cảm).
    - Trụ cột 3: `"Công nghệ đòn bẩy"` (Icon CPU `cpu`, CRM, Dashboard & AI).
  - **Tự Thích Ứng Đa Nền Tảng (Responsive)**:
    - Desktop (`1440px`, `1280px`): Vừa khít 100% chiều cao khung nhìn màn hình, không bị cắt xén, các thẻ tự co giãn linh hoạt.
    - Tablet (`1024px`, `768px`): Chia lưới Bento 12 cột thông minh với các thẻ `col-span-12`, `md:col-span-5`/`md:col-span-7`, và 3 thẻ trụ cột `sm:col-span-4`.
    - Mobile (`375px` - `430px`): Tự động chuyển đổi thành 1 cột dọc liên mạch (`grid-cols-1`), cuộn mượt mà với thanh cuộn kính mờ.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu văn bản, 22 năm kinh nghiệm của Nguyễn Hùng Thái, logic phát video, voice AI karaoke và xuất PDF.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server Next.js tại port 3001: **HTTP 200 OK**.


## [4.29.0] - 2026-10-27
### Định Dạng Bảng Điều Khiển Thư Ngỏ Theo Chiều Dọc: Icon Trên, Tiêu Đề 4 Chữ Dưới (LetterView.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"[Trang: Thư Ngỏ Gửi Quý Đối Tác & Khách Quý | File: src/components/views/LetterView.tsx] Tại Thư Ngỏ Gửi Quý Đối Tác & Khách Quý, với Khối <div> "ĐIỀU KHIỂN THƯ NGỎ ✕ Xem 1 Trang Thuyết Trình Nghe T..." (<div>): Kiểu dáng - Hiển thị theo chiều dọc : icon và tiêu đề 4 chữ (Phạm vi: Chỉ áp dụng cho đối tượng này)."*
  - Đối tượng: Khối panel điều khiển mở rộng của Thư Ngỏ (`renderTopNavigationBar` trong `LetterView.tsx`).
  - Mục tiêu 1: Toàn bộ danh sách nút chức năng bên trong được bố trí theo **chiều dọc** (Vertical Column Stack) gọn gàng, thanh thoát và tự co giãn linh hoạt (`max-h-[85vh] overflow-y-auto custom-scrollbar`), không bao giờ bị tràn màn hình.
  - Mục tiêu 2: Trong mỗi nút, **icon và tiêu đề hiển thị theo chiều dọc** (`flex flex-col items-center justify-center text-center gap-1`):
    - Icon nằm ở trên trong khung bo góc mềm mại, phóng to nhẹ khi hover (`group-hover:scale-110`).
    - Tiêu đề nằm ở dưới, căn giữa chuẩn xác, định dạng font Play đậm nét thanh lịch.
  - Mục tiêu 3: Chuẩn hóa toàn bộ tiêu đề các nút thành **đúng 4 từ (4-word title)**, viết hoa chữ đầu còn lại viết thường (**Sentence case**), tuyệt đối không dùng ký tự `&`, giữ nguyên viết tắt công nghệ/chuyên môn quốc tế (AI, PDF) theo quy tắc chuẩn mực `AGENTS.md`:
    - Header: `"Điều khiển thư ngỏ"` (4 từ, Sentence case, loại bỏ CSS `uppercase`).
    - Nút 1: `"Xem một trang thư"` (4 từ, chuyển đổi chế độ xem 1 trang toàn văn).
    - Nút 2: `"Trình chiếu thuyết trình"` (4 từ, chuyển đổi chế độ trình chiếu slide).
    - Nút 3: `"Lắng nghe thư AI"` / `"Đang đọc thư AI"` / `"Tiếp tục nghe thư"` (4 từ, tích hợp visualizer sóng âm và karaoke).
    - Nút 4: `"Cá nhân hóa tên"` (4 từ, điền và tùy biến tên công ty gửi đối tác).
    - Nút 5: `"Tải bản PDF chuẩn"` (4 từ, xuất tệp PDF bản chuẩn A4 có chữ ký số).
    - Nút 6: `"Lưu thiết lập chuẩn"` (4 từ, lưu mặc định giọng đọc AI và chế độ xem).
- **2. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc, logic phát giọng nói AI, chia sẻ link đối tác và xuất PDF.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server tại port 3001: **HTTP 200 OK**.


## [4.28.0] - 2026-10-27
### Cập Nhật Nội Dung 12 Hệ Thống Vận Hành & Video Giới Thiệu Chạy Viền Màu (SystemsView.tsx, systems.ts)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu cập nhật Trang Hệ Thống (`SystemsView.tsx` & `systems.ts`):
    - **9.0. Video giới thiệu**:
      - Video 1: `https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4`
      - Giao diện nút Giới thiệu: Nhóm icon speaker (mặc định tắt âm, bấm vào mở âm video) và nút Play phát Video 2 thành một cụm nút bo tròn cao cấp.
      - Tiêu đề: "Giới thiệu bản thân" kèm icon.
      - Hiệu ứng: Chạy viền màu liên tục (`conic-gradient`), hiệu ứng chuyển động và phát sáng rực rỡ khi hover (`shadow-[0_0_24px_rgba(56,189,248,0.7)]`).
      - Video 2: `https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4`
      - Giao diện điều khiển khi đang phát Video 2: Hiển thị như nút Video 1 nhưng tiêu đề thay bằng "Dừng nghe", kèm icon Stop và đồng hồ đếm ngược, màu nút chuyển sang tone đỏ hồng Neon (`Rose/Pink gradient`, viền xoay đa sắc đỏ vàng).
    - **9.1 - 9.12. Cập nhật chi tiết 12 Hệ thống**:
      - Cập nhật chính xác 100% Tên Hệ thống, Tên viết tắt, Tên đầy đủ quốc tế, Mô tả tổng quan, Danh sách tính năng cốt lõi, Đường dẫn cổng vận hành, và Video mô tả Cloudinary cho từng hệ sinh thái:
        - 9.1. SDP - Cổng làm việc CSKH (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039071/SDP_-_C%E1%BB%95ng_l%C3%A0m_vi%E1%BB%87c_CSKH.mp4`)
        - 9.2. ERP - Tài chính kế toán (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039070/ERP_-_T%C3%A0i_ch%C3%ADnh_k%E1%BA%BF_to%C3%A1n.mp4`)
        - 9.3. CRM - Quản lý Quan hệ Khách hàng (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039070/CRM_-_Qu%E1%BA%A3n_l%C3%BD_Quan_h%E1%BB%87_Kh%C3%A1ch_h%C3%A0ng.mp4`)
        - 9.4. HRM - Quản lý Nguồn nhân lực (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039066/._HRM_-_Qu%E1%BA%A3n_l%C3%BD_Ngu%E1%BB%93n_nh%C3%A2n_l%E1%BB%B1c.mp4`)
        - 9.5. BPM - Quản lý Quy trình Nghiệp vụ (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039069/BPM_-_Qu%E1%BA%A3n_l%C3%BD_Quy_tr%C3%ACnh_Nghi%E1%BB%87p_v%E1%BB%A5.mp4`)
        - 9.6. OKR - Quản lý Mục tiêu & Kết quả (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039068/._OKR_-_Qu%E1%BA%A3n_l%C3%BD_M%E1%BB%A5c_ti%C3%AAu_K%E1%BA%BFt_qu%E1%BA%A3.mp4`)
        - 9.7. CLP - Khách hàng Thân thiết (Loyalty) (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039069/CLP_-_Kh%C3%A1ch_h%C3%A0ng_Th%C3%A2n_thi%E1%BA%BFt.mp4`)
        - 9.8. LMS - Quản lý Đào tạo (Learning) (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039070/LMS_-_Qu%E1%BA%A3n_l%C3%BD_%C4%90%C3%A0o_t%E1%BA%A1o.mp4`)
        - 9.9. CSC - Trung tâm Chăm sóc Khách hàng (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793041064/CSC_-_Trung_t%C3%A2m_Ch%C4%83m_s%C3%B3c_Kh%C3%A1ch_h%C3%A0ng.mp4`)
        - 9.10. BI Dashboard - Báo cáo & Phân tích (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039068/BI_Dashboard_-_B%C3%A1o_c%C3%A1o_Ph%C3%A2n_t%C3%ADch.mp4`)
        - 9.11. AI Assistant - Trợ lý Trí tuệ Nhân tạo (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039076/AI_Assistant_-_Tr%E1%BB%A3_l%C3%BD_Tr%C3%AD_tu%E1%7E%A7_Nh%C3%A2n_t%E1%BA%A1o.mp4`)
        - 9.12. POS - Quản lý Bán hàng tại Quầy (`https://res.cloudinary.com/q5tpzaxk/video/upload/v1793039072/POS_-_Qu%E1%BA%A3n_l%C3%BD_B%C3%A1n_h%C3%A0ng_t%E1%BA%A1i_Qu%E1%BA%A7y.mp4`)
- **2. Nâng Cấp Modal Chi Tiết Hệ Thống**:
  - Tích hợp trực tiếp trình phát Video HTML5 Full HD 1080p cho từng hệ thống ngay trong Modal Chi tiết khi người dùng nhấn xem thông tin.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc, liên kết cổng vận hành và danh sách tính năng.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server tại port 3001: **HTTP 200 OK**.


## [4.27.0] - 2026-10-27
### Chỉnh Nền Trong Suốt & Chuyển Đổi Đồng Hồ Flip Sang Đồng Hồ Số Điện Tử Đồng Bộ Giao Diện (WeatherWidget.tsx, Clock.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"[Trang: Thư Ngỏ Gửi Quý Đối Tác & Khách Quý | File: src/components/views/LetterView.tsx] Tại Thư Ngỏ Gửi Quý Đối Tác & Khách Quý, với Khối <div> "32 °C Nắng đẹp rực rỡ TP. Hồ Chí Minh 01 01 AM 52 52..." (<div>): Kiểu dáng - chỉnh nền trong suốt , xóa format đồng hồ filp chuyển sang đồng hồ đồng bộ với giao diện (Phạm vi: Chỉ áp dụng cho đối tượng này)."*
  - Đối tượng: Khối thẻ Thời tiết & Đồng hồ trung tâm (`WeatherWidget` & `Clock`).
  - Mục tiêu 1: Chỉnh nền khối thẻ thành **hoàn toàn trong suốt (`background: transparent !important`)**, loại bỏ nền đục và đổ bóng dày, giữ viền kính mảnh tinh tế hài hòa với thanh layout.
  - Mục tiêu 2: **Xóa bỏ hoàn toàn định dạng Flip Clock cồng kềnh** (loại bỏ cơ chế thẻ cắt đôi `digit-top`/`digit-bottom` gây hiện tượng trùng lặp số `01 01 AM 52 52...`).
  - Mục tiêu 3: Chuyển sang **Đồng Hồ Số Điện Tử Kính Mờ (Theme-Aligned Glass Digital Clock)** đồng bộ 100% với từng giao diện:
    - Hiển thị số giờ : phút (`HH:MM`) sắc nét, dấu `:` nhấp nháy êm ái, kèm huy hiệu `AM/PM/24H` bo góc mềm mại.
    - Màu sắc tự động đồng bộ theo 3 chủ đề: Light Glass (`#1E1B4B` & Indigo), Dark Neon (`#22D3EE` & Neon Violet) và Luminous Glass (`#0284C7` & Sky Blue).
    - Bảo toàn toàn bộ chức năng cao cấp: Nhấp đúp chuột chuyển 12H/24H, rê chuột hiển thị bảng múi giờ quốc tế 5 trung tâm tài chính lớn thế giới, đồng bộ thời tiết GPS Open-Meteo.
- **2. Triển Khai Kỹ Thuật**:
  - [`WeatherWidget.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/WeatherWidget.tsx): Cập nhật `getContainerThemeStyle()` gán `background: 'transparent'`, `boxShadow: 'none'`, giữ viền mảnh trong suốt đồng điệu.
  - [`Clock.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Clock.tsx): Loại bỏ 120 dòng CSS Flip Clock phức tạp; thay thế bằng cấu trúc DOM số học hiện đại font Play / mono tinh gọn, sắc sảo.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu nhiệt độ, điều kiện thời tiết, vị trí GPS và múi giờ.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server tại port 3001: **HTTP 200 OK**.


## [4.26.0] - 2026-10-27
### Triển Khai Bộ Ba Tính Năng: Local Network QR Code, Smart Port Conflict Resolver & Instant Hot-Reload Guard
- **1. Phân Tích & Giải Quyết Toàn Diện Yêu Cầu**:
  - **A. Chế Độ Debug Network Qua Mạng Cục Bộ (Local Network QR Code)**:
    - Tạo script dev server thông minh [`scripts/dev-server.mjs`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/scripts/dev-server.mjs) sử dụng `qrcode-terminal` sinh mã QR ASCII sắc nét ngay trên terminal khi chạy `pnpm dev`.
    - Tự động phát hiện IPv4 nội bộ Wi-Fi/Ethernet (`http://192.168.x.x:3001`), hiển thị bảng địa chỉ trực quan.
    - Bổ sung **Network Debug Modal** trên UI ([`NetworkDebugModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/NetworkDebugModal.tsx)) kèm nút quét nhanh `Debug Wi-Fi` trên Footer và phím tắt nhanh `Alt + Q`.
  - **B. Tự Động Kiểm Tra & Xử Lý Xung Đột Cổng (Smart Port Conflict Resolver)**:
    - Khi cổng 3001 bị ứng dụng khác chiếm giữ, hệ thống tự động dò tìm PID đang lắng nghe qua Windows `netstat`.
    - Tự động giải phóng cổng mồ côi (`taskkill /F /PID <pid>`), hoặc nếu không thể giải phóng sẽ tự động nhảy thông minh sang cổng dự phòng rỗi kế tiếp (3002, 3003...) và thông báo rõ ràng trên console.
    - Cập nhật đồng bộ các launcher: `package.json` (`pnpm dev`), `start-website.bat`, `.vscode/tasks.json`.
  - **C. Cơ Chế Khôi Phục Nhanh Khi Gặp Lỗi Build (Instant Hot-Reload Guard)**:
    - Xây dựng component bảo vệ phiên làm việc [`InstantHotReloadGuard.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/InstantHotReloadGuard.tsx) bọc trong [`layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx) cùng trang lỗi chuẩn Next.js [`src/app/error.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/error.tsx).
    - Ngăn chặn hoàn toàn hiện tượng sập màn hình trắng (White Screen of Death); tự động hiển thị chỉ báo sửa lỗi Glassmorphism với các nút: *Khôi phục ngay (Hot Reset)*, *Tải lại trang (Reload)*, *Sao chép Stack Trace gửi AI* và *Thu nhỏ thành Badge góc màn hình*.
  - **D. Khắc Phục Lỗi Hiển Thị Thanh Điều Khiển Thư Ngỏ Trên Màn Hình Nhỏ / Mobile**:
    - Nâng cấp cơ chế căn chỉnh thông minh: Nếu khoảng cách mép phải nhỏ hơn 290px, bảng điều khiển tự động co giãn trong vùng an toàn, không bao giờ bị tràn (overflow) mép phải màn hình.
    - Trên màn hình hẹp (< 1280px / Mobile), chuyển thành Floating Action Pill góc dưới phải an toàn (`bottom: 84px, right: 16px`), không che chữ văn bản.
    - Bổ sung cơ chế click outside đóng mở mượt mà cho cả chuột lẫn màn hình cảm ứng di động.
- **2. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc, các chỉ số, văn bản và chữ ký số.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server tại port 3001: **HTTP 200 OK**.


## [4.25.0] - 2026-10-27
### Di Chuyển Thanh Điều Khiển Thư Ngỏ Ra Nằm Bên Phải Center Website Cách 24px (LetterView.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"[Trang: Thư Ngỏ Gửi Quý Đối Tác & Khách Quý | File: src/components/views/LetterView.tsx] Tại Thư Ngỏ Gửi Quý Đối Tác & Khách Quý, với Khối <div> "Xem 1 Trang Thuyết Trình Nghe Thư Ngỏ AI Cá nhân hóa..." (<div>): Kiểu dáng - chuyển ra nằm bên phải center website cách thẻ chính thư ngỏ 24px (Phạm vi: Chỉ áp dụng cho đối tượng này)."*
  - Đối tượng: Thanh điều khiển các tính năng của Thư Ngỏ (chứa nút "Xem 1 Trang", "Thuyết Trình", "Nghe Thư Ngỏ AI", "Cá nhân hóa Quý Công ty", "Tải PDF", "Lưu mặc định").
  - Vị trí mới: Tách khỏi dòng chảy nội dung bên trong thẻ thư ngỏ, chuyển ra **nằm bên phải center website cách thẻ chính `#center-card` đúng 24px**, căn giữa theo chiều dọc (`top-1/2 -translate-y-1/2`).
- **2. Thách Thức Kỹ Thuật & Giải Pháp**:
  - Khung thẻ chính `#center-card` có thuộc tính `overflow: hidden` và thẻ con `#content-display` có `overflow-y-auto`. Nếu dùng `position: absolute` đơn thuần trong `LetterView`, khối điều khiển sẽ bị che khuất hoặc cắt xén khi hiển thị ngoài biên lề.
  - **Giải pháp React Portal**:
    - Sử dụng `createPortal(navContent, document.body)` để đưa toàn bộ khối điều khiển ra lớp cao nhất (`z-index: 50`).
    - Lắng nghe kích thước màn hình qua `useEffect` đo tọa độ thời gian thực của `#center-card`: `left = rect.right + 24`, `top = rect.top + rect.height / 2`.
    - Hỗ trợ responsive: Trên các màn hình hẹp hơn không đủ khoảng trống 70px lề phải, hệ thống tự động ghim sát biên phải (`right: 12px`) đảm bảo người dùng luôn tương tác trơn tru.
  - **Thiết Kế UI/UX Cao Cấp**:
    - **Chế độ Collapsed**: Nút Pill dọc bo tròn Glassmorphism siêu gọn với biểu tượng Settings/Sliders xoay nhẹ khi hover, tích hợp badge trạng thái LED tinh tế.
    - **Chế độ Expanded**: Bảng điều khiển Quick Action Menu dạng Floating Glass nổi, viền phát sáng nhẹ theo theme (Light Glass / Dark Neon), phân nhóm trực quan các tác vụ xem, nghe, cá nhân hóa và xuất PDF.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Giữ nguyên 100% dữ liệu văn bản, audio AI, video thuyết minh và logic cá nhân hóa.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.


## [4.24.0] - 2026-10-27
### Cập Nhật Video Thuyết Minh Thư Ngỏ Cloudinary Transition Studio (LetterView.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"Update video thư ngỏ : https://res.cloudinary.com/q5tpzaxk/video/upload/v1793040322/transition-studio-take_24.mp4"*.
  - Vị trí cập nhật: Toàn bộ video thuyết minh Thư Ngỏ trong [`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx).
- **2. Triển Khai Kỹ Thuật**:
  - Cập nhật hằng số tập trung `LETTER_SLIDE_1_VIDEO_URL = 'https://res.cloudinary.com/q5tpzaxk/video/upload/v1793040322/transition-studio-take_24.mp4'`.
  - Đồng bộ nguồn phát chất lượng cao từ Cloudinary CDN tại cả 2 vị trí:
    1. Card Video Bento 16:9 sắc nét trong Thẻ Thông Điệp Hợp Tác (Slide 1).
    2. Khung Floating Circle PiP Video Player khi chuyển qua các slide mốc thời gian tiếp theo.
  - Giữ nguyên các chức năng quản trị âm lượng, điều khiển Play/Pause và đồng bộ hóa trình phát.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% nội dung chữ, chữ ký số và dữ liệu các slide Thư Ngỏ.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

## [4.23.0] - 2026-10-27
### Kích Hoạt Dev Server & Cấu Hình Tự Động Khởi Chạy Mặc Định Khi Mở Antigravity (.vscode/tasks.json, .agent/hooks.json, AGENTS.md)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"Chạy website và mặc định khi mở antigravity thì chạy website này"*.
  - Mục tiêu 1: Chạy ngay Next.js dev server trên port 3001 trong background process.
  - Mục tiêu 2: Thiết lập cấu hình tự động khởi chạy ngầm (Auto-Run) khi mở Antigravity/mở workspace dự án để người dùng không cần phải chạy lệnh thủ công.
- **2. Triển Khai Kỹ Thuật**:
  - **A. Khởi Động Dev Server Ngầm**:
    - Khởi động thành công `pnpm exec next dev -p 3001` (Task daemon).
    - Kiểm tra phản hồi: `http://localhost:3001` trả về **HTTP 200 OK**.
  - **B. Cấu Hình Tự Động Khởi Chạy Với Antigravity IDE (`.vscode/tasks.json`)**:
    - Thiết lập tác vụ nền `Auto Start Hung Thai Portal Server` với trigger `runOptions.runOn: "folderOpen"`.
    - Khi bất kỳ lúc nào mở workspace dự án trong Antigravity IDE, hệ thống tự động kích hoạt dev server ngầm.
  - **C. Cấu Hình Antigravity Lifecycle Hook (`.agent/hooks.json` & `.agents/hooks.json`)**:
    - Thiết lập sự kiện `SessionStart` tự động kiểm tra port 3001 và khởi chạy server nếu chưa có tiến trình lắng nghe.
  - **D. Thiết Lập Quy Tắc Quản Trị Tự Động Trong `AGENTS.md`**:
    - Thêm chỉ thị bắt buộc AI luôn tự động kiểm tra và duy trì server port 3001 trong mọi phiên làm việc mới.
  - **E. Tạo File Khởi Chạy Nhanh 1-Click (`start-website.bat`)**:
    - Đặt tại thư mục gốc để người dùng có thể nhấp đúp trực tiếp bất kỳ lúc nào từ Windows Explorer.
- **3. Kiểm Thử & Trạng Thái Hoạt Động**:
  - `curl http://localhost:3001`: **HTTP 200 OK**.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).

## [4.22.0] - 2026-10-27
### Xóa Banner Slide 1 Thư Ngỏ & Tắt Tự Động Phát Video Thuyết Trình Mặc Định (LetterView.tsx)
- **1. Phân Tích Hiện Trạng & Yêu Cầu**:
  - Người dùng yêu cầu: *"Trang thư ngỏ xóa banner slide 1 , mặc định thuyết trình không auto play"*.
  - Mục tiêu 1: Xóa khối `<HeroBanner ... />` ở Slide 1 (Thông Điệp Hợp Tác) để thẻ Bento View mở rộng chiếm trọn vẹn 100% chiều cao màn hình, co giãn tối ưu và khoáng đạt.
  - Mục tiêu 2: Tắt chế độ `autoPlay` mặc định của video thuyết trình/thuyết minh để người xem không bị giật mình bởi âm thanh/chuyển động khi vừa truy cập trang.
- **2. Triển Khai Kỹ Thuật ([LetterView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **A. Xóa Hero Banner Ở Slide 1 (`currentSlide === 0`)**:
    - Loại bỏ thẻ `<HeroBanner ... />` nằm trên đầu Slide 1.
    - Thẻ Thông Điệp Hợp Tác (`#card-main-letter-content`) giờ đây mở rộng toàn bộ diện tích viewport (`w-full h-full flex-1`), giúp Card Video 16:9 và Card Lời Cam Kết Đồng Hành đạt tỷ lệ hiển thị cân đối và rõ nét nhất.
  - **B. Tắt Mặc Định Auto Play Của Video Thuyết Minh**:
    - Chuyển giá trị khởi tạo `isVideoPlaying` từ `true` sang `false` (`useState<boolean>(false)`).
    - Cập nhật hàm `handleFloatingVideoLoadedMetadata`: không tự động gọi `.play()`, giữ video ở trạng thái tạm dừng sẵn sàng với thumbnail nét đầu tiên.
    - Loại bỏ thuộc tính `autoPlay` khỏi cả 2 thẻ `<video>`: Card Bento 16:9 và Floating Circle PiP Player.
    - Nút phát lớn ở giữa video và thanh điều khiển luôn sẵn sàng kích hoạt ngay khi người dùng chủ động nhấn Play.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% nội dung chữ, các thẻ trụ cột, câu phương châm và chữ ký số chính thức.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server (port 3001): **HTTP 200 OK**.

## [4.21.0] - 2026-10-27
### Cập Nhật Video Thuyết Minh Slide 1 Thư Ngỏ (LetterView.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"update video thư ngõ slide 1 : https://cdn.scena.ai/project/10223/73bc236e3e9c7f6be95f2e882e26e6ff67b5f2a108d180fba8b33518146ff2b7.mp4"*
  - Vị trí cập nhật: Cả trong Card Video Bento của Thẻ Thông Điệp Hợp Tác (Slide 0/Slide 1 Thư Ngỏ) và cửa sổ Floating PiP Video khi chuyển slide trong [`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx).
- **2. Triển Khai Kỹ Thuật**:
  - Khai báo hằng số dùng chung `LETTER_SLIDE_1_VIDEO_URL = 'https://cdn.scena.ai/project/10223/73bc236e3e9c7f6be95f2e882e26e6ff67b5f2a108d180fba8b33518146ff2b7.mp4'`.
  - Đồng bộ cập nhật nguồn video tại cả 2 khung hiển thị: Card Bento 16:9 (`aspect-video`) và Floating Circle PiP Player.
  - Giữ nguyên các chức năng đồng bộ âm lượng `audioPreference.ts`, thanh sóng âm nhảy thời gian thực và tự động đồng bộ lật slide.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% nội dung chữ, chữ ký số và dữ liệu các slide Thư Ngỏ.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

## [4.20.0] - 2026-10-27
### Nâng Cấp Hệ Thống Biểu Tượng Website Sang Dạng Lucide Mảng Đặc (Lucide Solid / Filled Icons System)
- **1. Phân Tích Hiện Trạng & Yêu Cầu**:
  - Người dùng yêu cầu: *"chuyển icon website dạng icon luci Mảng đặc"*.
  - Hiện trạng: Biểu tượng Lucide và SVG trên website trước đây chủ yếu ở định dạng đường viền (outline/stroke), dễ tạo cảm giác mảnh và thiếu điểm nhấn thị giác trên nền kính mờ Glass UI và Dark Neon.
  - Mục tiêu: Chuyển toàn bộ biểu tượng trên website sang phong cách **Mảng Đặc (Solid / Filled)** đồng bộ, sắc nét, đầy đặn, tăng cường độ tương phản và đẳng cấp nhận diện thương hiệu.
- **2. Triển Khai Kỹ Thuật (globals.css, WebIcon.tsx, PillIconLabel.tsx)**:
  - **A. Quy Tắc CSS Toán Học SVG Cấp Cao (`globals.css`)**:
    - Nhắm mục tiêu toàn diện các phần tử biểu tượng: `.lucide`, `svg.lucide`, `svg[class*="lucide"]`, `.web-icon-solid`, `.card-title-icon`, `.theme-card-icon svg`, `.animated-service-icon svg`, `.theme-pastel-card svg`.
    - **Đổ màu mảng đặc (`fill: currentColor !important`)**:
      - Tự động áp dụng cho các hình khối khép kín nguyên thủy: `polygon`, `rect`, `circle`, `ellipse`.
      - Tự động áp dụng cho toàn bộ các đường cong khép kín thông qua lệnh ClosePath SVG chuẩn W3C: `path[d*="Z"]` và `path[d*="z"]`.
    - **Bảo toàn đường nét mở (Line, Polyline)**:
      - Loại trừ các đường nét line mở (như kim đồng hồ, dấu X, mũi tên, dấu gạch nối) để đảm bảo không bị biến dạng hình học hay méo nét.
    - **Tối ưu 100% Solid cho các nhóm biểu tượng trọng điểm**:
      - `Star`, `Heart`, `Shield`, `Award`, `Trophy`, `Bookmark`, `Sparkles`, `Flame`, `Zap`, `Bell`, `CheckCircle`, `Folder`, `Mail`, `User`, `Users`, `GraduationCap`, `Briefcase`, `Play`, `Pause` đều hiển thị mảng đặc tuyệt đối.
  - **B. Đồng Bộ Component Trung Tâm (`WebIcon.tsx`)**:
    - Tích hợp tự động class `web-icon-solid` cho toàn bộ các biểu tượng vector SVG được render trên website.
  - **C. Đồng Bộ Thẻ Nhãn Biểu Tượng (`PillIconLabel.tsx`)**:
    - Cấu hình mặc định `iconType: 'solid'` đảm bảo các Pill Badge luôn mang diện mạo mảng đặc nổi bật.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu văn bản, chỉ số và hành vi tương tác trên mọi trang.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

## [4.19.0] - 2026-10-27
### Loại Bỏ Khối Thẻ "01 Executive Hub Tổng Quan & Điều Hành" Tại Trang Chủ (HomeView.tsx)
- **1. Phân Tích Yêu Cầu**:
  - Người dùng yêu cầu: *"Tại Trang Chủ Hùng Thái - Giới Thiệu, Năng Lực & Thành Tựu, với Khối <div> "01 EXECUTIVE HUB TỔNG QUAN & ĐIỀU HÀNH Trang Chủ Tra..." (<div>): Kiểu dáng - xóa (Phạm vi: Chỉ áp dụng cho đối tượng này)."*
  - Đối tượng chỉ định: Khối thẻ `HomePages3DCarouselLeft` (`01 EXECUTIVE HUB TỔNG QUAN & ĐIỀU HÀNH Trang Chủ`) hiển thị ở cột bên trái của Trang Chủ ([`HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx)).
- **2. Thực Thi Kỹ Thuật**:
  - Đã loại bỏ hoàn toàn component và khung <div> chứa thẻ `HomePages3DCarouselLeft` tại `HomeView.tsx`.
  - Dọn dẹp sạch sẽ phần import `HomePages3DCarouselLeft` không còn sử dụng.
  - Tối ưu không gian Trang Chủ trở nên thoáng đãng, sang trọng, tập trung 100% vào video nền chuyên gia tương tác và nút capsule phát giới thiệu laser-beam.
- **3. Kiểm Thử & Đảm Bảo Tính Toàn Vẹn**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server (port 3001): **HTTP 200 OK**.
  - Bảo toàn toàn bộ dữ liệu hệ thống, các chức năng phát video giới thiệu và các trang liên quan khác.

## [4.18.0] - 2026-10-27
### Khắc Phục Triệt Để Lỗi Dòng Màu Đen Trên Top Và Bot Của Hình Nền CodePen (BackgroundLayer.tsx, wallpaperStorage.ts)
- **1. Phân Tích Hiện Trạng & Nguyên Nhân Gốc (Root Cause Analysis)**:
  - Yêu cầu người dùng: *"Hình nền kiểm tra lại các hình nền từ code pen bị lỗi xuất hiện dòng màu đen trên top và bot , tiến hành xóa đi"*
  - **Nguyên nhân cốt lõi**:
    1. Khi nhúng một hình nền CodePen (`type: 'codepen'`) vào website qua `iframe`, trang embed chuẩn của CodePen luôn tự động render thêm:
       - **Thanh Header màu đen ở trên đỉnh (`~56px`)**: Chứa logo CodePen, tên Pen, tên tác giả và nút "Edit on CodePen".
       - **Thanh Footer màu đen ở dưới đáy (`~48px`)**: Chứa nút "Rerun", "Resources" và copyright.
    2. Cấu trúc trước đây của `BackgroundLayer.tsx` để thẻ `iframe` có kích thước `w-full h-full` vừa khít viewport, khiến hai thanh điều hướng màu đen này xuất hiện như 2 vệt đen (letterbox bars) cắt ngang mép trên và mép dưới của trang web.
    3. Ngoài ra, với các hình nền dạng mã CSS phức tạp chứa `&::before`, `&::after` hoặc `@keyframes` sao chép từ CodePen, cơ chế bọc CSS nesting cũ có thể khiến bộ chọn bị lồng sai cú pháp gây sụp đổ về nền đen mặc định.
- **2. Giải Pháp Triển Khai Kỹ Thuật (Negative Offset & Dynamic Cropping)**:
  - **A. Kỹ Thuật Negative Offset + Dynamic Oversizing Trong `BackgroundLayer.tsx`**:
    - Khung chứa `div` cha của iframe được thiết lập `relative w-full h-full overflow-hidden`.
    - Thẻ `iframe` được định vị `absolute left-0 right-0 w-full origin-center`:
      - `top: -64px`: Dịch chuyển âm lên phía trên 64px, đẩy toàn bộ thanh Header màu đen của CodePen (~56px) ra ngoài khung nhìn của container `overflow-hidden`.
      - `height: calc(100% + 128px)` & `minHeight: calc(100vh + 128px)`: Chiều cao vượt thêm 128px, do đó sau khi bị dịch lên 64px ở đỉnh, phần đáy sẽ tràn xuống dưới đúng 64px, đẩy toàn bộ thanh Footer màu đen của CodePen (~48px) ra ngoài khung nhìn của container `overflow-hidden`.
    - Kết quả: Toàn bộ vùng hiển thị trên màn hình người dùng (100% viewport) là canvas / WebGL / CSS animation động tràn viền tuyệt đối, **xóa sạch 100% hai dòng màu đen ở top và bot**.
  - **B. Tối Ưu Hóa Bộ Phân Giải URL CodePen Trong `src/utils/wallpaperStorage.ts`**:
    - Cập nhật hàm `normalizeCodepenUrl`:
      - Tự động chuyển đổi các định dạng link `/pen/`, `/full/` thành `/embed/`.
      - Bổ sung các cờ tối ưu: `default-tab=result&theme-id=dark&editable=false` giúp trang embed tải trực tiếp kết quả thị giác, không hiển thị các nút thao tác chỉnh sửa không cần thiết.
  - **C. Tách Lọc CSS Trực Tiếp Từ CodePen Trong `BackgroundLayer.tsx`**:
    - Nâng cấp parser cho `wallpaperRawCss`: Phân tách thông minh giữa các thuộc tính CSS gốc và các selector `&::before`, `&::after`, `@keyframes`, giúp mã CSS hiệu ứng lấy từ CodePen luôn render chuẩn xác mà không bị xung đột lồng lặp hay rơi về nền đen.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Bảo toàn 100% toàn bộ hình nền đã lưu, thông số và dữ liệu hệ thống trong `importedWallpapers.json`.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

## [4.17.0] - 2026-10-27
### Nâng Cấp Bố Cục Bento View Co Giãn Tối Ưu & Tích Hợp Card Video Thuyết Minh Hợp Tác Trong Thẻ Thông Điệp Hợp Tác Trang Thư Ngỏ (LetterView.tsx, audioPreference.ts)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu: *"Thẻ Thông điệp hợp tác trang thư ngỏ chế độ view bento co giản tối ưu, thêm card video vào."*
  - Hiện trạng: Thẻ Thông Điệp Hợp Tác (Slide 1 Thư Ngỏ) trước đây phân tách thành các khối văn bản rời rạc và video thuyết minh chỉ hiển thị ở dạng Floating Circle PiP tách biệt ở góc dưới màn hình.
  - Mục tiêu: Tái cấu trúc thành hệ thống lưới Bento View co giãn tối ưu, tích hợp trực tiếp **Card Video Thuyết Minh Scena AI** vào bố cục chính của thẻ Thông Điệp Hợp Tác, đồng thời bảo toàn 100% nội dung văn bản, thông số và chữ ký số.
- **2. Triển Khai Thực Thi Kỹ Thuật (Responsive Bento Grid Architecture)**:
  - **A. Card Video Thuyết Minh Hợp Tác (`bento-letter-video` - `col-span-12 lg:col-span-5`)**:
    - Thiết kế Card Bento công nghệ cao với viền gradient phát quang `from-cyan-400 via-indigo-500 to-emerald-400`.
    - Header: Icon Play phát sáng, tiêu đề *"Thuyết Minh Thư Ngỏ"* kèm bộ 3 cột sóng âm mini nhảy nhót thời gian thực và badge *"Scena AI"*.
    - Khung Video 16:9 sắc nét, tỉ lệ co giãn responsive theo chiều ngang và dọc màn hình (`aspect-video`), tự động phát, tích hợp nút Play/Pause lớn khi rê chuột.
    - Thanh tiến trình video (Progress Bar) chạy thực tế theo tỷ lệ phần trăm thời gian phát.
    - Footer Controls: Nút Loa bật/tắt âm thanh (đồng bộ `saveMutedPref`), nút Play/Pause nhanh và nút Bật/Tắt tự động lật slide (`autoSyncVideoWithSlides`).
  - **B. Card Thông Điệp Hợp Tác & Cam Kết Đồng Hành (`bento-commitment` - `col-span-12 lg:col-span-7`)**:
    - Đặt song song cân xứng với Card Video, tạo bố cục tỷ lệ vàng 5:7 chuẩn Bento UI.
    - Chứa đầy đủ: Lời giới thiệu 22 năm kinh nghiệm thực chiến + Cam kết đồng hành cùng Quý Công ty xây dựng hệ thống CSKH hiện đại lấy khách hàng làm trung tâm + Lời cảm ơn chân thành.
    - Đính kèm chữ ký vector chính thức `SignatureSvg` của chuyên gia Nguyễn Hùng Thái ở góc dưới, tăng tính trang trọng và uy tín chuyên nghiệp.
  - **C. 3 Trụ Cột Nền Tảng Vận Hành (`col-span-12 md:col-span-4 lg:col-span-4` x 3)**:
    - Bố trí 3 card trụ cột đồng đều cân xứng ở hàng tiếp theo:
      1. *Quy Trình Tạo Nền Tảng* (Chuẩn hóa KPI & Chất lượng dịch vụ)
      2. *Con Người Tạo Giá Trị* (Lắng nghe, thấu hiểu & đồng cảm)
      3. *Công Nghệ Tạo Đòn Bẩy* (CRM, Dashboard & AI Chatbot)
  - **D. Khối Phương Châm Phụng Sự (`col-span-12`)**:
    - Banner câu nói phương châm phụng sự trải rộng 12 cột tạo phần chân trang vững chắc.
  - **E. Tối Ưu Chuyển Đổi Trạng Thái Video (Slide 0 ⇄ Slide 1, 2, 3)**:
    - Khi ở Slide 0 (Thẻ Thông Điệp Hợp Tác), Card Video nằm trang trọng trong layout Bento.
    - Khi chuyển sang Slide 1, 2, 3, hệ thống tự động kích hoạt cửa sổ Floating PiP ở góc dưới để tiếp tục thuyết minh theo slide mà không bị gián đoạn hay trùng lặp 2 video.
  - **F. Đồng Bộ Quản Trị Âm Thanh Toàn Trang (`audioPreference.ts`)**:
    - Kết nối `LetterView.tsx` với `getSavedMutedPref` và `saveMutedPref` qua `AUDIO_PREF_EVENT`, giúp lựa chọn âm lượng ở Thư Ngỏ tự động đồng bộ sang Trang Giới Thiệu và Cổng Hệ Thống.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Bảo toàn 100% nội dung văn bản, tên công ty cá nhân hóa và các chỉ số kinh nghiệm.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

---

## [4.16.0] - 2026-10-27
### Cập Nhật Đồng Bộ Hình Ảnh 3D Minh Họa Thẻ Dịch Vụ & Lĩnh Vực Hoạt Động (DomainsView.tsx, domains.ts, types/index.ts)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng cung cấp danh sách 6 hình ảnh minh họa transparent 3D mới cho 6 thẻ lĩnh vực / dịch vụ:
    1. **Dịch vụ viễn thông**: `https://i.ibb.co/4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png`
    2. **Dịch vụ bảo hiểm**: `https://i.ibb.co/B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png`
    3. **Game eSports**: `https://i.ibb.co/pBKmWZHc/Game-e-Sports-removebg-preview.png`
    4. **Thanh toán điện tử**: `https://i.ibb.co/hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png`
    5. **Xây dựng hệ thống**: `https://i.ibb.co/Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png`
    6. **Thương mại điện tử**: `https://i.ibb.co/fY3Nqny0/Th-ng-m-i-i-n-t-removebg-preview.png` (cập nhật mới từ URL `xqcR1Yw3`).
- **2. Triển Khai Thực Thi Kỹ Thuật (Data-First Architecture)**:
  - **A. Nâng cấp Type Definition (`src/types/index.ts`)**:
    - Bổ sung trường `illustrationSrc?: string;` vào interface `DomainData` để chuẩn hóa cấu trúc dữ liệu thẻ dịch vụ.
  - **B. Đồng bộ Data First (`src/data/domains.ts`)**:
    - Gán trường `illustrationSrc` cho toàn bộ 6 domain (`01` đến `06`) với đường link CDN hình ảnh tương ứng.
  - **C. Cập nhật Giao diện hiển thị (`src/components/views/DomainsView.tsx`)**:
    - Cập nhật hàm `renderCard3DIllustration`: thay thế hình ảnh minh họa Thương Mại Điện Tử thành `https://i.ibb.co/fY3Nqny0/Th-ng-m-i-i-n-t-removebg-preview.png`.
    - Cập nhật trường `heroImage` trong Modal chi tiết chuyên sâu của lĩnh vực Thương Mại Điện Tử (`case '02'`).
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Giữ nguyên 100% số liệu, nội dung văn bản và cấu trúc nghiệp vụ của 6 lĩnh vực.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

---

## [4.15.0] - 2026-10-27
### Bộ 5 Nâng Cấp Tương Tác Sống Động Cho Card Thời Tiết & Đồng Hồ: Hiệu Ứng Bụi Mưa / Tia Nắng (Particle Burst), Chuyển Đổi Định Dạng Giờ 12H / 24H (Time Switcher), Đồng Bộ Thời Tiết Thực Tế Qua Open-Meteo API (Live Geo-Weather), Âm Thanh Phản Hồi Xúc Giác (Audio Micro-Feedback) & Popup Múi Giờ Quốc Tế (Global Multi-Timezone Tooltip) (WeatherWidget.tsx, Clock.tsx, SoundEngine.ts)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu triển khai đồng bộ 5 tính năng nâng cao cho cụm Card Thời Tiết & Đồng Hồ:
    1. **Hiệu Ứng Bụi Mưa / Tia Nắng Tương Tác (Micro Weather Particle Burst)**: Khi người dùng nhấp vào Card thời tiết để đổi trạng thái, một luồng hiệu ứng hạt nhỏ (hạt mưa rơi, tia nắng lóe sáng hoặc tia chớp neon) sẽ bừng sáng nhẹ quanh thẻ trong 0.8s tạo cảm giác phản hồi xúc giác sống động.
    2. **Tùy Chọn Chuyển Đổi Định Dạng Giờ 12H / 24H (Time Format Switcher)**: Cho phép nhấp đúp (double click) vào đồng hồ để chuyển đổi nhanh giữa chế độ 12 giờ (kèm AM/PM) và 24 giờ quân đội (Military time).
    3. **Đồng Bộ Dữ Liệu Thời Tiết Thực Tế Qua Open-Meteo API (Live Geo-Weather Fetch)**: Thêm nút bấm nhỏ cho phép đồng bộ tự động thời tiết và nhiệt độ thực tế theo vị trí địa lý thực (GPS / IP) của người đang truy cập website.
    4. **Âm Thanh Tích Tắc Kim Đồng Hồ Hoặc Tiếng Mưa Nhẹ Khi Chạm (Audio Micro-Feedback)**: Tích hợp âm thanh tích tắc kim đồng hồ cơ hoặc tiếng giọt mưa tí tách siêu nhỏ thông qua SoundEngine khi người dùng hover hoặc click đổi thời tiết.
    5. **Hiển Thị Múi Giờ Quốc Tế Khi Phỏng Vấn (Global Multi-Timezone Tooltip)**: Rê chuột vào đồng hồ sẽ hiển thị popup nhỏ hiển thị giờ hiện tại của các trung tâm tài chính lớn (New York, London, Tokyo, Singapore, TP. Hồ Chí Minh) phục vụ làm việc với đối tác quốc tế.
- **2. Triển Khai Thực Thi Kỹ Thuật**:
  - **A. Âm Thanh Phản Hồi Xúc Giác Tinh Tế Thuần Web Audio API (`SoundEngine.ts`)**:
    - Bổ sung `playClockTick()`: âm thanh click kim đồng hồ cơ Thụy Sĩ siêu nhỏ, tần số 2400Hz -> 1200Hz với bộ lọc High-pass filter 1800Hz trong 12ms.
    - Bổ sung `playRainDrop()`: tiếng giọt mưa tí tách trong trẻo (sine 1650Hz -> 750Hz trong 35ms).
    - Bổ sung `playSunChime()`: tia nắng lóe sáng hòa âm pha lê (nốt B5 987Hz -> E6 1318Hz trong 80ms).
    - Bổ sung `playElectricSpark()`: tia chớp neon lách tách (sawtooth 3200Hz -> 400Hz trong 40ms).
    - Bổ sung `playWeatherFeedback(condition)`: tự động phân tích điều kiện thời tiết (rain, thunder, sun...) để phát âm thanh tương ứng.
  - **B. Hiệu Ứng Bụi Mưa / Tia Nắng Tương Tác (Micro Weather Particle Burst - `WeatherWidget.tsx`)**:
    - Khi nhấp đổi trạng thái thời tiết, sản sinh 14 hạt particle với góc, khoảng cách, kích thước và màu sắc tương thích hoàn toàn với thời tiết:
      - Nắng (`Sunny`): Tia nắng vàng chanh `#FBBF24`, cam rực `#F59E0B`, vàng nhạt `#FEF08A`.
      - Mưa (`Heavy Rain`): Hạt nước giọt mưa xanh lam `#38BDF8`, xanh ngọc `#60A5FA` dạng elip giọt rơi.
      - Sấm sét (`Thunder Storm`, `Lightning`): Tia chớp neon tím `#C084FC`, xanh điện `#22D3EE`, vàng rực `#FDE047`.
      - Mây mù (`Cloudy`, `Overcast`): Hạt ánh sáng bồng bềnh trắng bạc `#E2E8F0`, lam nhạt `#BAE6FD`.
    - Keyframes `weatherParticleBurst` bung tỏa và tan biến mượt mà trong 0.75s, không che khuất hay cản trở thao tác tiếp theo.
  - **C. Chuyển Đổi Định Dạng Giờ 12H / 24H (Time Format Switcher - `Clock.tsx`)**:
    - Nhấp đúp (`onDoubleClick`) vào đồng hồ để chuyển đổi nhanh giữa 12H và 24H.
    - Lưu cấu hình vào `localStorage` (`hungthai_clock_format`) để giữ nguyên định dạng khi duyệt web.
    - Phát âm thanh `playClockTick()` và hiển thị Toast thông báo trạng thái.
    - Chế độ 24H: hiển thị giờ từ 00-23 kèm nhãn `24h`. Chế độ 12H: hiển thị 01-12 kèm `am`/`pm`.
  - **D. Đồng Bộ Dữ Liệu Thời Tiết Thực Tế Qua Open-Meteo API (Live Geo-Weather - `WeatherWidget.tsx`)**:
    - Tích hợp nút icon radar GPS (`Radio`) nhỏ tinh tế cạnh cụm nhiệt độ.
    - Bấm nút kích hoạt Geolocation quét tọa độ thực tế của người dùng (fallback TP. Hồ Chí Minh nếu không cấp quyền).
    - Gọi API Open-Meteo (`https://api.open-meteo.com/v1/forecast`), chuyển đổi mã WMO weather code thành trạng thái thời tiết trực quan và cập nhật nhiệt độ thực tế theo thời gian thực.
    - Hiển thị Toast thông báo và lưu trạng thái `liveWeather` với badge GPS nổi bật.
  - **E. Popup Múi Giờ Quốc Tế (Global Multi-Timezone Tooltip - `Clock.tsx`)**:
    - Khi rê chuột vào đồng hồ, hiển thị Tooltip Glassmorphism cao cấp chứa 5 trung tâm tài chính lớn thế giới:
      - 🇻🇳 **TP. Hồ Chí Minh** (`Asia/Ho_Chi_Minh` - ICT)
      - 🇸🇬 **Singapore** (`Asia/Singapore` - SGT UTC+8)
      - 🇯🇵 **Tokyo** (`Asia/Tokyo` - JST UTC+9)
      - 🇬🇧 **London** (`Europe/London` - GMT/BST)
      - 🇺🇸 **New York** (`America/New_York` - EST/EDT)
    - Tính toán giờ chính xác từng giây theo `Intl.DateTimeFormat` (đồng bộ chế độ 12H/24H).
    - Đính kèm chỉ báo trạng thái thị trường tài chính (Market Open / Closed) theo giờ làm việc địa phương.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Bảo toàn 100% dữ liệu gốc trong hồ sơ chuyên gia và các phân hệ hệ thống.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

---

## [4.14.0] - 2026-10-27
### Bộ Ba Nâng Cấp Trải Nghiệm Video & Âm Thanh Toàn Diện: Bộ Đếm Thời Lượng Nghe Trực Quan (Audio Duration Pill), Ghi Nhớ Trạng Thái Âm Thanh Người Dùng (Audio Preference Storage) & Cửa Sổ Thu Nhỏ Góc Màn Hình (Picture-in-Picture Mini Player) (SystemsView.tsx, AboutView.tsx, audioPreference.ts)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu triển khai đồng bộ 3 tính năng cao cấp cho trải nghiệm nghe thuyết minh video trên toàn hệ thống:
    1. **Bộ đếm thời lượng nghe trực quan (Audio Duration Pill)**: Hiển thị thời gian đếm ngược (ví dụ 01:45) kèm mini-waveform sóng âm chuyển động ngay trong nút "Dừng nghe" khi đang phát Video 2 (Giới thiệu bản thân).
    2. **Ghi nhớ trạng thái âm thanh người dùng (Audio Preference Storage)**: Lưu lựa chọn bật/tắt âm thanh vào `localStorage` và đồng bộ qua CustomEvent toàn trang, giúp người dùng chuyển qua lại giữa các view (Trang Chủ, Giới Thiệu, Cổng Hệ Thống, Dự Án...) mà âm lượng không bị reset ngẫu nhiên.
    3. **Chế độ xem thu nhỏ góc màn hình (Picture-in-Picture Mini Player)**: Khi người dùng cuộn chuột xuống xem danh sách chi tiết các hệ thống trong Cổng Hệ Thống (`SystemsView.tsx`), video giới thiệu tự động thu nhỏ thành cửa sổ PiP nổi ở góc dưới bên phải màn hình để vừa nghe thuyết minh vừa duyệt nội dung.
- **2. Triển Khai Thực Thi Kỹ Thuật**:
  - **A. Module Quản Lý Trạng Thái Âm Thanh Dùng Chung (`src/utils/audioPreference.ts`)**:
    - Khởi tạo key `hungthai_video_muted_pref` trong `localStorage` và sự kiện tùy chỉnh `hungthai_audio_pref_change` (`AUDIO_PREF_EVENT`).
    - Cung cấp 2 hàm thuần `getSavedMutedPref(defaultValue = true)` và `saveMutedPref(muted: boolean)` tự động phát tán CustomEvent tới tất cả các component đang mở.
  - **B. Bộ Đếm Thời Lượng Nghe Trực Quan & Mini-Waveform Sóng Âm (Audio Duration Pill)**:
    - Tích hợp viên thuốc thời lượng (Duration Pill) nền `bg-rose-500/25` viền `border-rose-400/40` vào nút "Dừng nghe" ở cả `SystemsView.tsx` và `AboutView.tsx` (cả chế độ Bento view và Slide view).
    - Hiển thị 3 cột sóng âm animate-pulse chuyển động sinh động kèm chuỗi thời gian đếm ngược chuẩn xác định dạng `mm:ss` (ví dụ `01:45` -> `00:00`).
  - **C. Chế Độ Xem Thu Nhỏ Góc Màn Hình (Picture-in-Picture Mini Player)**:
    - Bắt sự kiện cuộn `onScroll` trên container danh sách 12 hệ thống (`systemsGridRef`).
    - Khi người dùng cuộn qua ngưỡng `scrollTop > 130px` và đang phát Video 2, tự động kích hoạt cửa sổ PiP nổi ở góc màn hình (`fixed bottom-5 right-5 z-50 w-72 sm:w-80 rounded-2xl...`).
    - Cửa sổ PiP gồm:
      - Header: Tiêu đề "Đang phát thuyết minh" + sóng âm 3 cột màu ngọc lục bảo + nút Phóng to/cuộn lên đầu (`Maximize2`) + nút Tạm ẩn (`X`).
      - Khung Video preview mini sắc nét với badge thời gian đếm ngược thời gian thực.
      - Footer: Nút bật/tắt âm thanh (đồng bộ thời gian thực) và nút "Dừng nghe" tiện lợi.
    - Tự động thu về video chính khi người dùng cuộn ngược lên đầu (`scrollTop < 40px`).
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Bảo toàn 100% dữ liệu gốc trong hồ sơ chuyên gia và các phân hệ hệ thống.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Next.js Dev Server port 3001: **HTTP 200 OK**.

---

## [4.13.0] - 2026-10-27
### Nâng Cấp Hệ Thống Logo Thương Hiệu Đối Tác: Vầng Hào Quang Thương Hiệu (Brand Glow Aura), Tooltip Vai Trò Thực Chiến, Bộ Lọc Kết Hợp Multi-Select, Xếp Chồng Đan Xen (Overlapping Avatar Stack) & Huy Hiệu Bảo Chứng Đối Tác Chiến Lược (DomainsView.tsx, domains.ts)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu triển khai đồng bộ 5 tính năng nâng cao cho logo thương hiệu đối tác:
    1. **Hiệu ứng vầng hào quang thương hiệu khi hover (Brand Glow Aura)**: Khi rê chuột vào từng logo tròn (như Shopee, MoMo, MobiFone, Garena, Prudential...), xuất hiện một vệt sáng mờ nhẹ mang màu sắc đặc trưng của thương hiệu (Shopee cam, MoMo hồng, MobiFone xanh, Garena đỏ...).
    2. **Tooltip thông tin vai trò dự án với thương hiệu (Brand Project Role Tooltip)**: Rê chuột vào logo hiển thị popup nhỏ: Ví dụ di vào *Shopee* -> *"Quản lý CSKH & Chống gian lận 300+ nhân sự"*.
    3. **Bộ lọc thương hiệu kết hợp (Brand Interactive Filter Multi-Select)**: Nhấp vào logo thương hiệu để làm nổi bật các thẻ lĩnh vực mà chuyên gia từng hợp tác cùng thương hiệu đó.
    4. **Hiệu ứng xếp chồng logo đan xen (Overlapping Avatar Stack)**: Đối với các lĩnh vực có từ 3 logo trở lên, tạo hiệu ứng xếp đè nhẹ 25% với khoảng cách âm (`-space-x-2.5 sm:-space-x-3`), và bung xòe mượt mà khi hover.
    5. **Xem nhanh huy hiệu chứng nhận đối tác (Partner Verified Badge)**: Thêm một icon dấu tích xanh nhỏ ở góc logo đối tác chiến lược thể hiện các chứng nhận hoặc giải thưởng đã đạt được trong quá trình hợp tác.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **A. Xây Dựng Bảng Siêu Dữ Liệu Thương Hiệu (`BRAND_METADATA` & `getBrandMeta`)**:
    - Chuẩn hóa thông tin nhận diện cho toàn bộ đối tác: Shopee, ShopeePay, MoMo, MobiFone, Garena, VED, Prudential, Finviet, V247, LBC, HTVC, GCafe, AirPay, FWD, Power Service.
    - Bao gồm: Mã màu thương hiệu hex, vầng hào quang rgba glow, vai trò dự án thực chiến chuẩn xác 100%, phân loại đối tác, cờ xác thực đối tác chiến lược (`verified: boolean`) và giải thưởng đã đạt được.
  - **B. Hiệu Ứng Vầng Hào Quang Thương Hiệu (Brand Glow Aura)**:
    - Khi rê chuột vào logo, lớp ánh sáng mềm mại `blur-[8px]` mang màu sắc nhận diện đặc trưng bung tỏa phía sau logo (`opacity-100`), đi kèm hiệu ứng nổi bóng phát sáng `boxShadow: 0 0 16px ${brandMeta.glow}`.
  - **C. Tooltip Vai Trò Dự Án Thực Chiến (Brand Project Role Tooltip)**:
    - Xây dựng component Tooltip Glassmorphism cao cấp xuất hiện tức thì phía trên logo khi rê chuột (`hoveredLogoKey`):
      - Header: Chấm sáng động theo màu thương hiệu + Tên đối tác + Huy hiệu "Đối tác" nếu là đối tác chiến lược.
      - Body: Vai trò thực chiến cô đọng (Ví dụ Shopee: "Quản lý CSKH & Chống gian lận 300+ nhân sự", MoMo: "Tối ưu hóa vận hành ví điện tử & Xử lý khiếu nại giao dịch"...).
      - Footer: Giải thưởng đạt được (nếu có) + Gợi ý "✦ Nhấp để lọc".
  - **D. Bộ Lọc Thương Hiệu Kết Hợp Đa Điểm (Brand Interactive Filter Multi-Select)**:
    - Cho phép chọn cùng lúc 1 hoặc nhiều thương hiệu (`selectedBrands: string[]`) bằng cách nhấp trực tiếp vào logo trên thẻ card hoặc trên thanh lọc.
    - Thẻ lĩnh vực có chứa bất kỳ đối tác nào được chọn sẽ sáng rực lên với viền phát quang `ring-2 ring-cyan-400 shadow-[0_0_32px_rgba(56,189,248,0.55)] scale-[1.015]`, các thẻ không liên quan sẽ mờ đi nhẹ nhàng (`opacity-35 grayscale-[50%]`).
    - Bổ sung nút "Xóa lọc (X)" tiện lợi trên thanh lọc.
  - **E. Hiệu Ứng Xếp Chồng Đan Xen (Overlapping Avatar Stack)**:
    - Nhóm các logo đối tác trong từng lĩnh vực thành cụm avatar stack xếp đè nhẹ 25% (`-space-x-2.5 sm:-space-x-3`) với viền tròn bảo vệ tương phản cao `ring-2 ring-white dark:ring-slate-900`.
    - Khi người dùng rê chuột vào cụm, các logo bung xòe mượt mà (`group-hover/stack:space-x-1.5`) và nhấc nhẹ lên (`hover:-translate-y-1 hover:scale-115`), tạo cảm giác tương tác cực kỳ cao cấp.
  - **F. Huy Hiệu Bảo Chứng Đối Tác Chiến Lược (Partner Verified Badge)**:
    - Đính kèm huy hiệu dấu tích xanh bảo chứng (`Check` icon viền trắng) ở góc dưới bên phải các đối tác chiến lược, thể hiện độ tin cậy và dấu ấn thực chiến đã nghiệm thu.
- **3. Bảo Toàn Dữ Liệu & Kiểm Thử**:
  - Bảo toàn 100% dữ liệu gốc trong `domains.ts`.
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001: **HTTP 200 OK**.

---

## [4.12.0] - 2026-10-27
### Chuẩn Hóa Chiều Cao Bằng Nhau Cho Tất Cả 10 Thẻ Card Trong Bài Viết Chi Tiết Dự Án & Tối Ưu Hóa Trình Bày Infographic Mindmap (ProjectDetailView.tsx, projects.ts, projectSpecGenerator.ts)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu:
    "Bài viết chi tiết dự án : chỉnh chiều cao của các card bằng nhau có kích thước full chiều cao nằm gọn trong thẻ chính. Tối ưu hóa nội dung trong các thẻ bằng skill mind map inforaphic"
  - Vấn đề trước đó: Các thẻ card nội dung trong chi tiết dự án (`ProjectDetailView.tsx`) có độ dài văn bản không đồng đều (như mục 7 Thách thức hoặc 7 Hạng mục triển khai rất dài trong khi các mục khác ngắn hơn), dẫn đến chiều cao co giãn bất đối xứng, làm trải nghiệm cuộn tầng xếp lớp (stacking deck / tarot cards) bị gián đoạn và chữ tràn khỏi khung nhìn.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **A. Chuẩn Hóa Chiều Cao 100% Đồng Bộ Nằm Gọn Trong Thẻ Chính**:
    - Thiết lập chuẩn kích thước thống nhất cho toàn bộ 10 thẻ section card (`#sec-mindmap`, `#sec-overview`, `#sec-context`, `#sec-objectives`, `#sec-scope`, `#sec-methodology`, `#sec-metrics`, `#sec-roles`, `#sec-outcomes`, `#sec-philosophy`):
      `className="u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300..."`
    - Đảm bảo thẻ luôn nằm trọn vẹn trong vùng làm việc của màn hình desktop, tablet và mobile mà không bị tràn hoặc quá thấp.
  - **B. Tái Cấu Trúc Khung 3 Tầng Cho Toàn Bộ 10 Card Section**:
    - **Tầng 1 - Header Card (`shrink-0 pb-2.5 border-b`)**: Hiển thị Số thứ tự font mono đậm, icon định danh đồng màu, tiêu đề chuẩn 4 từ súc tích Sentence case (không dùng ký tự `&`), và badge phân loại năng lực.
    - **Tầng 2 - Body Card Cuộn Mượt Mà (`flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left`)**: Tách biệt vùng nội dung cuộn bên trong card bằng thanh cuộn tinh tế glass-scrollbar. Dù dự án có nội dung dài hay ngắn, chiều cao của card vẫn được giữ cố định tuyệt đối, giúp việc xếp lớp (stacking cards) hoạt động mượt mà như một cỗ bài tarot.
    - **Tầng 3 - Footer Card Chuyển Tiếp (`shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto`)**: Tóm tắt nhanh giá trị đạt được của section và cung cấp nút bấm chuyển tiếp nhanh sang section kế tiếp (`scrollToSection(...)`), kèm nút cuộn về đầu trang tại card cuối cùng.
  - **C. Tối Ưu Hóa Trình Bày Theo Chuẩn Skill Infographic Mindmap**:
    - Chuyển đổi các khối văn bản thuần sang cấu trúc infographic trực quan:
      - **Section 00 (Sơ đồ tư duy)**: Nhúng trực tiếp bản thu nhỏ của sơ đồ tư duy tương tác kèm nút phóng to toàn màn hình.
      - **Section 01 (Tổng quan dự án)**: Tách thành các Bento Pill Cards: Thời gian, Quy mô ngân sách, Nhân sự nòng cốt, Kênh tương tác, Đối tác công nghệ.
      - **Section 02 (Bối cảnh thách thức)**: Grid bento 7 điểm nghẽn thực tế với màu sắc nhận diện amber/rose và huy hiệu số thứ tự.
      - **Section 03 (Mục tiêu chiến lược)**: 3 card mục tiêu Tổ chức, Vận hành và Tăng trưởng bền vững.
      - **Section 04 (Hạng mục triển khai)**: 7 Workstreams chuẩn SOP với danh sách nhiệm vụ và kết quả đầu ra nghiệm thu.
      - **Section 05 (Lộ trình vận hành)**: Quy trình 5 giai đoạn triển khai tuyến tính có mốc thời gian rõ ràng.
      - **Section 06 (Chỉ số hiệu quả)**: Dashboard ma trận KPI và SLA với các chỉ số đo lường thực tế.
      - **Section 07 (Vai trò trách nhiệm)**: Cây phân quyền lãnh đạo PM Governance và ma trận RACI.
      - **Section 08 (Kết quả đạt được)**: 6 khía cạnh giá trị thực chiến đã nghiệm thu.
      - **Section 09 (Triết lý quản trị)**: 3 trụ cột (Công nghệ tốc độ · Quy trình nhất quán · Con người trọng tâm) và thông điệp lời vàng của lãnh đạo.
- **3. Bảo Toàn Dữ Liệu & Quy Tắc Thiết Kế**:
  - Bảo toàn 100% dữ liệu gốc của 21 dự án trong `PROJECTS_DATA` và `projectSpecGenerator.ts`.
  - Nghiêm túc áp dụng quy tắc 4 từ Sentence case cho tiêu đề card, không sử dụng ký tự `&`.
  - Hỗ trợ hoàn hảo 2 chế độ Giao diện Sáng (Light Glass) và Giao diện Tối (Dark Neon).
- **4. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001: **HTTP 200 OK**.

---

## [4.11.0] - 2026-10-27
### Nâng Cấp Toàn Diện Sơ Đồ Tư Duy Infographic Kỹ Năng: Hiệu Ứng Hạt Năng Lượng Động, Thanh Trượt Lọc Tinh Thông, Xuất Ảnh Vector SVG/PNG HD & Liên Kết Nhanh Đến 21 Dự Án Thực Chiến (InfographicMindmap.tsx, SkillsView.tsx, page.tsx)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu tích hợp 4 tính năng nâng cao vào Sơ đồ tư duy Infographic Mindmap của phân hệ Kỹ Năng:
    1. **Hiệu ứng Đường Năng Lượng Động (Animated Energy Particle Stream)**: Thêm các hạt photon ánh sáng chuyển động dọc theo các nhánh cong SVG từ tâm điểm tỏa ra các node kỹ năng khi hover.
    2. **Bộ Lọc Cấp Độ Năng Lực (Skill Level Filter)**: Bổ sung thanh trượt lọc kỹ năng theo tỷ lệ tinh thông (ví dụ: chỉ hiện các năng lực đạt từ 90% trở lên).
    3. **Xuất Ảnh Sơ Đồ Tư Duy (Export to SVG / High-Res PNG)**: Cho phép tải toàn bộ sơ đồ tư duy infographic về máy dưới dạng hình ảnh chất lượng cao để đính kèm hồ sơ năng lực điều hành.
    4. **Liên Kết Nhanh Đến Dự Án Thực Chiến (Cross-link to Projects)**: Nhấn vào từng kỹ năng trong sơ đồ tư duy để mở popup gợi ý danh sách các dự án thực tế đã áp dụng kỹ năng đó.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **A. Triển Khai Hiệu Ứng Hạt Năng Lượng Động (Animated Energy Particle Stream)**:
    - Xây dựng lớp SVG Canvas Overlay (`viewBox="0 0 1000 600"`) kết nối tâm điểm hạt nhân (Central Hub) với 6 thẻ nhánh lớn ở 2 cánh (Trái: Điểm mạnh, Cơ hội, Ngôn ngữ & AI; Phải: Hoàn thiện, Công nghệ & AI, Thách thức).
    - Sử dụng các đường cong Cubic Bézier mượt mà kết hợp bộ lọc phát quang ánh sáng `filter="url(#mindmap-energy-glow)"`.
    - Tích hợp các hạt photon ánh sáng SVG `<circle>` chuyển động dọc theo đường cong bằng `<animateMotion>` với nhịp độ tuần hoàn (`repeatCount="indefinite"`), tự động tăng tốc và rực sáng khi người dùng rê chuột (hover) vào thẻ nhánh tương ứng.
  - **B. Tích Hợp Thanh Trượt Lọc Cấp Độ Năng Lực (Skill Level Filter Slider)**:
    - Bổ sung thanh trượt trực quan trên thanh công cụ HUD: `minProficiency` từ 0% đến 95%, bước nhảy 5%, đi kèm icon `Zap` phát xung ánh sáng và các nút preset nhanh (85%+, 90%+, 95%+).
    - Các node kỹ năng (leaf skill pills) đạt tỷ lệ điểm $\ge$ `minProficiency` sẽ được bôi đậm, viền sáng và phóng to nhẹ; những kỹ năng dưới mức lọc sẽ tự động mờ đi (`opacity-25`), giúp nhà tuyển dụng định vị ngay những đỉnh cao năng lực của Nguyễn Hùng Thái.
  - **C. Chức Năng Xuất Ảnh Sơ Đồ Tư Duy (Vector SVG & HD PNG)**:
    - Bổ sung nút bấm **"Xuất Ảnh Sơ Đồ"** với menu tùy chọn linh hoạt:
      - **Xuất Vector SVG (.svg)**: Trích xuất toàn bộ cấu trúc sơ đồ tư duy infographic thành file SVG độc lập, độ phân giải vô hạn, in ấn khổ lớn hoặc nhúng bài thuyết trình.
      - **Xuất Ảnh HD PNG (.png)**: Vẽ trực tiếp sơ đồ lên HTML5 Canvas độ nét cao (1600x1000), xuất ra file PNG chất lượng cao sắc nét đến từng chi tiết nhỏ.
    - Tích hợp thông báo Toast xác nhận thành công và âm thanh phản hồi `SoundEngine.playPop()`.
  - **D. Modal Liên Kết Nhanh Đến Dự Án Thực Chiến (Cross-link to Projects)**:
    - Nhấn vào bất kỳ Leaf Skill Pill nào trên sơ đồ tư duy sẽ mở ngay hộp thoại kính mờ **"Dự Án Áp Dụng Thực Chiến"**.
    - Sử dụng thuật toán matching thông minh trích xuất từ nguồn dữ liệu `PROJECTS_DATA` (21 dự án trọng điểm): hiển thị mã dự án, tên dự án, vai trò Trưởng phòng CSKH, kết quả cốt lõi đạt được và nút "Mở dự án này".
    - Kết nối prop `onNavigatePage` chuyển thẳng đến trang Dự Án (trang 7) mượt mà không cần tải lại trang.
- **3. Bảo Toàn Dữ Liệu & Quy Tắc**:
  - Bảo toàn 100% dữ liệu gốc trong `skills.ts` và `projects.ts`.
  - Tuân thủ quy tắc 4 từ Sentence case, không dùng ký tự `&` trong tiêu đề node, sử dụng nhãn "Mức độ tác động" cho nhóm Thách thức.
- **4. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001: **HTTP 200 OK**.

---

## [4.10.0] - 2026-10-27
### Cập Nhật Banner Trang Thư Ngỏ Sang Hình Ảnh Mới Chuẩn Sắc Nét (LetterView.tsx, HeroBanner.tsx)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu cập nhật banner cho trang **Thư Ngỏ**:
    - URL hình ảnh mới: `https://i.ibb.co/W9VBBv3/Th-ng-2.png`
- **2. Triển Khai Thực Thi Thực Tế**:
  - **A. Tối Ưu Cơ Chế Phân Giải Nền Trong [`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx)**:
    - Điều chỉnh logic tính `activeVideoSrc` để ưu tiên `imageSrc`: Nếu một view cung cấp `imageSrc` mà không truyền `videoSrc`, `HeroBanner` sẽ tự động hủy kích hoạt video mặc định fallback để hiển thị hình ảnh `imageSrc` với lớp phủ tương phản cao, chống lóa và bảo vệ độ rõ nét của chữ trên cả nền Sáng và Tối.
  - **B. Cập Nhật Banner Trong [`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx)**:
    - Cập nhật banner ở cả 2 chế độ:
      1. Chế độ xem 1 trang toàn văn ([`viewMode === 'one-page'`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx#L1913)): `imageSrc="https://i.ibb.co/W9VBBv3/Th-ng-2.png"`.
      2. Chế độ trình chiếu Slide ([`viewMode === 'slides' && currentSlide === 0`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx#L2170)): `imageSrc="https://i.ibb.co/W9VBBv3/Th-ng-2.png"`.
    - Giữ nguyên toàn bộ tiêu đề, thông điệp, câu nói hay, tác giả và cấu trúc nội dung thư ngỏ gốc.
- **3. Bảo Toàn Dữ Liệu & Quy Tắc**:
  - Bảo toàn 100% văn bản, số liệu, cựu mốc thời gian và triết lý vận hành.
  - Không phá vỡ layout hay cấu trúc của các slide khác.
- **4. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`): **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001: **HTTP 200 OK**.

---

## [4.9.0] - 2026-10-27
### Nâng Cấp Toàn Diện Trang Giới Thiệu Sang Bento View Đa Sắc, Tích Hợp 7 Video Banners Phân Hệ, Cụm Nút Giới Thiệu Bản Thân Chạy Viền Màu & Chuẩn Hóa Dữ Liệu Nhân Khẩu Học (AboutView.tsx, aboutData.ts, page.tsx)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu cập nhật trang Giới Thiệu ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx)):
    1. **Bento View Hiện Đại**: Cập nhật nội dung vào dạng Bento View tổng hợp toàn diện.
    2. **Tích Hợp 7 Video Banners Phân Hệ**:
       - Banner Học vấn: `https://cdn.scena.ai/project/10223/cc5a8e558d2380dc8bfb96fd26cd877e444d63b6a7036a8530abd823d6d6da63.mp4`
       - Banner Tử vi: `https://cdn.scena.ai/project/10223/ddb11f6544a9a76e2b6c5946ee6805f53a61b1f57a3049bfba7856d2f52ee367.mp4`
       - Banner Dự án: `https://cdn.scena.ai/project/10223/cc106cb37b8d219cca59af9a71a4d7a8cd019515a3e9a8282d16909bb21d88b9.mp4`
       - Banner Kinh nghiệm: `https://cdn.scena.ai/project/10223/50cd00ea3adfb39fb5860c632402df091d620960b69aae65fd2bb08f4bea4fc6.mp4`
       - Banner Liên hệ: `https://cdn.scena.ai/project/10223/50b7b30031d4b9124af4948a069cdf530ca8f0942767f6e6b713c350cb8bd6b2.mp4`
       - Banner Giới thiệu: `https://cdn.scena.ai/project/10223/f5d9a4cf1ce874ff8473d34cff75c13836b03aabf9a707004fcd2d9547b0725c.mp4`
       - Banner Hệ thống: `https://cdn.scena.ai/project/10223/7bd12b39b9758378cc8f15b6169d42368b4778ad2f2f322b1ef8403c90268f24.mp4`
    3. **Video Giới Thiệu Thực Chiến & Cụm Nút Điều Khiển Thống Nhất**:
       - **Video 1 (Mặc định)**: `https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4` (phát ngầm).
       - Cụm nút Giới thiệu thống nhất: Nhóm nút Speaker (mặc định tắt âm, bấm vào bật/tắt âm) đi liền với nút Play/Giới thiệu bản thân.
       - Hiệu ứng nút: Chạy viền màu liên tục (`conic-gradient`), chuyển động sóng xung quanh, phát sáng khi rê chuột (`hover:shadow`).
       - **Video 2 (Khi bấm Giới thiệu)**: `https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4`.
       - Giao diện khi ở Video 2: Tiêu đề chuyển thành **"Dừng nghe"**, màu nút đổi sang tông màu khác (gradient Rose/Red) tương phản, giữ nguyên viền xoay và hiệu ứng phát quang.
    4. **Cập Nhật 100% Nội Dung Giới Thiệu (Mục 3.2)**: Tuyên ngôn thực chiến 22+ năm trải nghiệm khách hàng với 3 giá trị cốt lõi "Hiệu quả – Nhân văn – Bền vững".
    5. **Cập Nhật 100% Thông Tin Cá Nhân (Mục 3.3)**: 10 trường dữ liệu nhân khẩu học C-Level (Nam giới / Kinh, Độc thân, 22/06/1984 - Giáp Tý, Quận 7 TP.HCM, TP. Mỹ Tho, Email, Hotline/Zalo, Portfolio Netlify, Official Domain, LinkedIn).
- **2. Triển Khai Thực Thi Thực Tế**:
  - **A. Cập Nhật Data ([`aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts))**:
    - Cập nhật interface `DemographicItem` hỗ trợ `subtitleVi?`.
    - Chuẩn hóa mảng `PERSONAL_DEMOGRAPHICS` với đầy đủ 10 trường thông tin cá nhân, hỗ trợ liên kết tương tác (`zalo.me`, `mailto`, `tel`, website Netlify, powerservice.one, linkedin).
    - Khai báo mảng `ECOSYSTEM_BANNERS` chứa đầy đủ 7 video banner với mã phân hệ, tiêu đề 4 từ chuẩn mực, số trang tương ứng và mô tả chức năng.
  - **B. Tích Hợp Cụm Nút Unified Pill Button Viền Chuyển Động ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
    - Thiết kế nút con nhộng đôi hợp nhất (Unified Pill Button) với viền xoay conic gradient chuyển động 360 độ siêu mượt.
    - Cụm nút tích hợp:
      - Nút loa ngoài (Speaker Toggle) kèm biểu tượng sóng âm, tooltip giải thích rõ ràng.
      - Nút chuyển trạng thái "Giới thiệu bản thân" (xanh Cyan-Blue) $\leftrightarrow$ "Dừng nghe" (đỏ Rose-Amber).
    - Áp dụng đồng bộ cho cả Hero Card trong Bento View và Slide 1 trong chế độ trình chiếu Slides.
  - **C. Xây Dựng Ecosystem Video Banner Hub Trong Bento View ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
    - Thêm Thẻ Bento Hub Video Hệ Thống với khung video tỷ lệ 16:9, thanh chuyển tab nhanh 7 phân hệ với huy hiệu màu sắc riêng biệt.
    - Tích hợp nút điều hướng nhanh "Mở phân hệ [Tên]" kết nối trực tiếp với hàm `onNavigatePage` chuyển trang toàn trang mượt mà.
  - **D. Điều Hướng & Kết Nối Trang Chủ ([`page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
    - Bổ sung prop `onNavigatePage={setCurrentPage}` vào component `<AboutView />` trong `page.tsx` giúp người dùng chuyển trang ngay từ Video Banner Hub.
- **3. Bảo Toàn Dữ Liệu & Thẩm Mỹ**:
  - Bảo toàn 100% dữ liệu gốc của website.
  - Chuẩn hóa typography, độ tương phản chuẩn WCAG trên cả 2 nền Light Glass và Dark Neon.
  - Tuân thủ quy tắc 4 từ trong tiêu đề thẻ card, không dùng ký tự `&`.
- **4. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`) đạt **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001 phản hồi **HTTP 200 OK**.

---

## [4.8.0] - 2026-10-26
### Chuyển Khối 4 Thẻ Chỉ Số Vận Hành (Kinh Nghiệm CX & CS 22+ Năm...) Từ Slide 1 Sang Slide 3 (AboutView.tsx)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Tại trang **Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân** ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx)), ở chế độ trình chiếu Slide (`viewMode === 'slides'`), Slide 1 trước đây hiển thị khối 4 thẻ chỉ số vận hành (`ABOUT_PROFILE_STATS`: *Kinh nghiệm CX & CS 22+ NĂM, Quy mô lớn 8+ MÔI TRƯỜNG, Tự động hoá 24/7 AI CRM, Tỷ lệ hài lòng KH 99%*) chen chúc cùng khối thông tin nhân khẩu học.
  - Người dùng yêu cầu: Chuyển khối thẻ này qua **Slide 3** (Trụ cột & Triết lý vận hành), phạm vi chỉ áp dụng riêng cho đối tượng này.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **Tối Ưu Slide 1 (`Tổng Quan & Video`)**:
    - Dời khối `ABOUT_PROFILE_STATS` ra khỏi Slide 1.
    - Cột bên phải của Slide 1 giờ đây tập trung hiển thị trọn vẹn và thoáng đãng danh sách Thẻ Thông Tin Cá Nhân (`PERSONAL_DEMOGRAPHICS`: Giới tính, Năm sinh, Cư trú, Tạm trú, Chức danh, Học vấn) với khoảng cách `gap-2` thoải mái, không bị nén chật chội.
  - **Tích Hợp Khối 4 Thẻ Chỉ Số Vào Đầu Slide 3 (`Trụ Cột & Triết Lý`)**:
    - Bố trí khối 4 Thẻ Chỉ Số Vận Hành thành dải Bento Grid 4 cột (`grid grid-cols-2 sm:grid-cols-4 gap-2.5`) nằm ngay bên dưới Header Card của Slide 3.
    - Mỗi thẻ giữ nguyên icon chuyên môn, mã màu đặc trưng (Sky Blue, Purple, Emerald, Rose), số liệu nổi bật (`font-mono font-black`) cùng hiệu ứng hover tương tác âm thanh `SoundEngine.playPop()`.
    - Tạo sự kết nối logic chặt chẽ: Khi mở Slide 3, người xem lập tức nhìn thấy 4 thước đo thực chiến cấp cao trước khi đọc sâu vào 3 Trụ Cột Vận Hành Chiến Lược và Giá Trị Cốt Lõi.
- **3. Bảo Toàn Dữ Liệu & Quy Tắc**:
  - Bảo toàn 100% dữ liệu số liệu, văn bản, icon và logic nghiệp vụ.
  - Chế độ Bento View 1 trang vẫn hoạt động ổn định và giữ nguyên đầy đủ tính năng.
- **4. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`) đạt **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001 phản hồi **HTTP 200 OK**.

---

## [4.7.0] - 2026-10-26
### Nâng Cấp Toàn Diện Popup Chat AI Sang Phong Cách Matrix Cyberpunk & Bổ Sung Nút "Lưu Vào Làm Mặc Định" Giọng Đọc & Chuẩn Hóa Thứ Tự Mục Lục Dự Án (AiChatModal.tsx, ProjectDetailView.tsx)
- **1. Phân Tích Yêu Cầu & Bối Cảnh Thực Tế**:
  - Người dùng yêu cầu 2 nội dung chính:
    1. Chuyển đổi toàn bộ popup chat AI ([`AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx)) sang giao diện phong cách **Matrix Cyberpunk** (nền tối đen ma trận, ánh xanh neon emerald, scanline hạt kỹ thuật số, viền phát sáng, terminal console). Đồng thời trong hộp thoại cài đặt giọng đọc, thêm nút to và nổi bật **"Lưu vào làm mặc định"**.
    2. Tại trang **Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm** ([`ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx)), chỉnh lại thứ tự nội dung các nút bấm mục lục thành: **Số thứ tự & Icon & Tiêu đề** (áp dụng cho mục "10. Triết Lý Quản Trị" và toàn bộ các mục còn lại).
- **2. Triển Khai Thực Thi Thực Tế**:
  - **A. Nâng Cấp Giao Diện Popup Chat AI Sang Phong Cách Matrix Cyberpunk ([`AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx), [`variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css))**:
    - **Vỏ Khung Cửa Sổ Matrix Console**:
      - Gradient nền ma trận đen sâu: `linear-gradient(180deg, #020a07 0%, #04140f 50%, #020705 100%)`.
      - Viền kép xanh ngọc lục bảo: `border-2 border-emerald-500/60` với bóng đổ phát quang đa tầng `shadow-[0_0_35px_rgba(16,185,129,0.35),0_25px_60px_rgba(0,0,0,0.9)]`.
      - Hạt ô vuông ma trận bung nở khi mở (`.ai-tile-matrix-particle`) chuyển đổi đồng bộ sang màu xanh Matrix Green rực rỡ (`rgba(5, 150, 105, 0.85)`).
    - **Header Matrix Terminal**:
      - Avatar Tí Chuột AI với vòng hào quang phát sáng `shadow-[0_0_12px_#10b981]`, chấm trạng thái xanh lá chớp tắt `SYS.ONLINE • Matrix Agent`.
      - Huy hiệu số hiệu công nghệ: `MATRIX v4.6` màu xanh neon.
      - Các nút điều khiển cửa sổ (Cài đặt, Làm mới, Thu nhỏ, Đóng) với nền `bg-emerald-950/80` và hiệu ứng hover phát sáng `hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]`.
    - **Hộp Thoại Cấu Hình Giọng Đọc & Nút "Lưu Vào Làm Mặc Định"**:
      - Thiết kế hộp thoại Matrix Neural Voice Engine tông màu đen tuyền ngọc lục bảo viền `border-2 border-emerald-500/70`.
      - Nạp và tự động khôi phục các thông số từ `localStorage`: giọng đọc (`hungthai_default_voice_uri`), tốc độ (`hungthai_ai_speech_rate`), cao độ (`hungthai_ai_speech_pitch`), tự động đọc (`hungthai_ai_auto_speak`).
      - Bổ sung nút bấm to, nổi bật ở cuối hộp thoại: **"Lưu vào làm mặc định"** (`handleSaveAsDefault`), nền gradient `from-emerald-500 via-teal-500 to-emerald-600` tương phản cao, phát sáng `shadow-[0_0_20px_rgba(16,185,129,0.5)]`, có icon checkmark và âm thanh phản hồi xác nhận.
    - **Bong Bóng Tin Nhắn & Khung Nhập Terminal**:
      - **Tin nhắn AI**: Nền đen ngọc bích `bg-[#051712]/92`, viền `border-emerald-500/40`, văn bản `text-emerald-100`, từ khóa bôi đậm `text-emerald-300`, nút phát giọng đọc xanh emerald.
      - **Tin nhắn User**: Nền gradient `from-emerald-600 to-teal-700`, viền `border-emerald-400/50`, bóng đổ `shadow-[0_0_15px_rgba(16,185,129,0.35)]`.
      - **Gợi ý câu hỏi nhanh**: Nền kính đen viền ngọc lục bảo, chip câu hỏi phát quang nhẹ `shadow-[0_0_8px_rgba(16,185,129,0.15)]`.
      - **Khung nhập liệu & Menu câu hỏi**: Nền đen terminal `bg-[#020a07]`, input `bg-[#010c08] border-emerald-500/50 text-emerald-100 placeholder:text-emerald-700/80`.
  - **B. Chuẩn Hóa Thứ Tự Mục Lục Dự Án ([`ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
    - Tại thanh điều hướng mục lục chi tiết dự án (Table of Contents), tái cấu trúc thứ tự hiển thị của toàn bộ 10 mục:
      - **Cấu trúc mới**: `Số thứ tự (num)` -> `Icon (WebIcon)` -> `Tiêu đề (title sentence case)`.
      - Đảm bảo mục số 10 hiển thị chuẩn xác: `10.` -> `<WebIcon name="sparkles" />` -> `Triết lý quản trị`.
- **3. Bảo Toàn Dữ Liệu & Quy Tắc**:
  - Bảo toàn 100% dữ liệu 21 dự án, dữ liệu phản hồi AI và logic tra cứu tri thức.
  - Tuân thủ nghiêm ngặt quy tắc định dạng Sentence Case và chuẩn hóa tiêu đề.
- **4. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`) đạt **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001 phản hồi **HTTP 200 OK**.

---

## [4.6.0] - 2026-10-26
### Đồng Bộ Hóa Toàn Diện Card Thời Tiết & Giao Diện Đồng Hồ Theo Giao Diện Đang Chọn (WeatherWidget.tsx, Clock.tsx, Footer.tsx)
- **1. Phân Tích & Nâng Cấp Bố Cục ([`WeatherWidget.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/WeatherWidget.tsx), [`Clock.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Clock.tsx))**:
  - Trước đây, Card thời tiết ở góc trái Footer sử dụng nền trong suốt (`bg-transparent border-transparent`), khiến các thành phần thời tiết và khối đồng hồ số lật 3D hiển thị tách rời nhau, thiếu tính thống nhất của một chiếc thẻ card hoàn chỉnh.
  - Người dùng yêu cầu: Cập nhật giao diện đồng hồ theo giao diện/theme đang được chọn và tạo sự đồng bộ trọn vẹn cho toàn bộ thẻ thời tiết.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **Khởi Tạo Unified Glass Weather & Clock Card**:
    - Chuyển đổi container thẻ thành một khối Card bo góc tròn `rounded-[16px]`, chiều cao `h-[46px] sm:h-[50px]`, hiệu ứng kính mờ `backdrop-blur-xl` cùng viền phản chiếu ánh sáng và đổ bóng đa tầng:
      - **Light Glass**: Kính trắng ngọc trai `rgba(255, 255, 255, 0.82)`, viền sáng `border-white/95`, bóng đổ mềm `shadow-[0_4px_16px_-2px_rgba(30,27,75,0.08)]`.
      - **Dark Neon**: Kính đen sâu `rgba(15, 23, 42, 0.72)`, viền cyan neon `border-cyan-400/35`, phát sáng neon `shadow-[0_0_16px_-2px_rgba(34,211,238,0.2)]`.
      - **Luminous Glass**: Kính quang phổ `rgba(255, 255, 255, 0.68)`, viền xanh băng `border-sky-300/45`, bóng đổ `shadow-[0_8px_24px_-4px_rgba(56,189,248,0.2)]`.
  - **Tích Hợp Thanh Phân Cách Thanh Lịch (Station Divider)**:
    - Bổ sung một vách ngăn mỏng `h-6 w-[1px] rounded-full` đồng bộ màu viền theo theme giữa khu vực Thời Tiết và khu vực Đồng Hồ.
  - **Đồng Bộ Giao Diện Đồng Hồ Lật 3D (`Clock.tsx`) Theo Từng Theme**:
    - **Light Glass**: Mặt số thẻ lật màu chàm đậm `#1E1B4B`, nền gradient trắng tuyết viền tím lavender, AM/PM chàm tím `#4F46E5`.
    - **Dark Neon**: Mặt số thẻ lật neon Cyan `#22D3EE` tỏa sáng rực rỡ (`text-shadow: 0 0 8px #22D3EE, 0 0 18px rgba(34,211,238,0.85)`), thẻ số đen huyền bí viền tím neon `#A855F7`, AM/PM tím fuchsia `#C084FC`.
    - **Luminous Glass**: Mặt số thẻ lật xanh biển `#0369A1`, thẻ số viền xanh băng `#38BDF8`, AM/PM xanh cobalt `#0284C7`.
    - Chuẩn hóa font **Play** (`'Play', system-ui, sans-serif`) cho các nhãn thứ, ngày tháng tiếng Việt ("Chủ Nhật", "Thứ Hai",...).
  - **Đồng Bộ Màu Chữ Thời Tiết**:
    - Nhiệt độ (°C), tên trạng thái thời tiết và tên thành phố (`TP. Hồ Chí Minh`) tự động cập nhật màu sắc và độ bóng theo theme đang kích hoạt.
  - **Bảo Toàn 100% Chức Năng & Dữ Liệu**:
    - Giữ nguyên toàn bộ logic click đổi trạng thái thời tiết (`onCycle`), vị trí, số liệu nhiệt độ và ngày giờ thực tế.
- **3. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`) đạt **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001 phản hồi **HTTP 200 OK**.

---

## [4.5.0] - 2026-10-26
### Chuyển Khối Thông Tin Dự Án Vào Trong Hình Banner Nằm Ở Mép Dưới (GridToListMorph.tsx, ProjectsView.tsx)
- **1. Phân Tích Yêu Cầu & Bố Cục ([`ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx), [`GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**:
  - Tại trang **Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm**, khối thông tin `span.cp-card-category` (chứa mã dự án, nhóm dự án và trạng thái tiến độ, ví dụ: `"1.2 • 2 DỰ ÁN · 1.1 & 1.2 • GIAI ĐOẠN 1 - ĐANG TRIỂN KHAI (80%)"`) trước đây nằm ở đầu phần nội dung thẻ (`.cp-card-body`), nằm bên dưới hình ảnh banner.
  - Người dùng yêu cầu chuyển khối `<span>` này vào bên trong hình banner và nằm cố định ở mép dưới của hình banner trên toàn bộ 21 thẻ dự án.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **Tích Hợp Khối Overlay Bên Trong Hình Banner (`.cp-banner-bottom-bar`)**:
    - Chuyển toàn bộ cấu trúc `span.cp-card-category` vào bên trong thẻ `<figure className="u308-ph cp-card-media">`.
    - Định vị tuyệt đối ở mép dưới của banner: `position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;`.
    - Phủ lớp scrim chuyển màu sang trọng: `linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.45) 25%, rgba(15, 23, 42, 0.90) 100%)` kết hợp hiệu ứng kính mờ `backdrop-filter: blur(6px)`.
    - Đường viền mỏng tinh tế ở cạnh trên: `border-top: 1px solid rgba(255, 255, 255, 0.15)`.
  - **Thiết Kế Thành Phần Thông Tin Đậm Nét, Rõ Ràng**:
    - **Mã dự án (`.cp-code-badge`)**: Badge nền kính mờ `rgba(255, 255, 255, 0.22)`, chữ màu vàng hoàng kim hổ phách (`#facc15`), font mono đậm nét 800.
    - **Dấu chấm ngăn cách (`.cp-dot`)**: Màu trắng mờ thanh lịch (`rgba(255, 255, 255, 0.65)`).
    - **Nhóm dự án (`.cp-pill-text`)**: Màu trắng sáng rõ nét (`#f8fafc`), font semibold 600.
    - **Tiến độ (`.cp-progress-text`)**: Màu ngọc bích emerald (`#6ee7b7`), font bold 700.
  - **Tối Ưu Thân Thẻ (`.cp-card-body`)**:
    - Loại bỏ khối `span` cũ trong `.cp-card-body` để tránh trùng lặp.
    - Tiêu đề dự án (`.cp-card-title`) trở thành điểm nhấn đầu tiên trong thân thẻ, padding thẻ được tinh chỉnh cân đối (`16px 20px 20px 20px`).
  - **Đồng Bộ Hoàn Hảo Cả 2 Theme (Light Glass & Dark Neon)**:
    - Khi chuyển sang Dark Neon, lớp overlay tự động điều chỉnh gradient tương thích với màu nền sâu `rgba(7, 10, 20, 0.94)` và viền phản quang `rgba(34, 211, 238, 0.25)`.
  - **Bảo Toàn 100% Dữ Liệu**:
    - Giữ nguyên toàn bộ mã dự án (`proj.code`), tên nhóm/số lượng dự án (`parentGroup.pillText`) và tiến độ triển khai (`proj.progressText`).
- **3. Kiểm Thử Hệ Thống**:
  - TypeScript compilation check (`pnpm exec tsc --noEmit`) đạt **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001 phản hồi **HTTP 200 OK**.

---

## [4.4.0] - 2026-10-26
### Chuẩn Hóa Kích Thước Font Chữ (Fluid Typography Tokens) & Sửa Lỗi Đồng Bộ Giao Diện Sáng/Tối Toàn Diện (variables.css, globals.css, page.tsx, Views)
- **1. Chuẩn Hóa Kích Thước Font Chữ (Typography Standardization)**:
  - Đồng bộ hóa toàn bộ hệ thống phân cấp: H1, H2, H3, H4, H5, H6, tiêu đề card, nội dung body, caption, button, navigation, số liệu thống kê sang hệ thống Typography Tokens dùng chung.
  - Sử dụng đơn vị `rem`, `clamp()` và CSS Variables (`--font-hero`, `--font-h1` -> `--font-h6`, `--font-card-title`, `--font-body`, `--font-stat`, v.v.) giúp văn bản tự động co giãn mượt mà (fluid scaling) theo chiều rộng màn hình từ Mobile (375px) đến Tablet (768px - 1024px) đến Desktop (1280px - 1440px+).
  - Khắc phục triệt để tình trạng tràn chữ, giật khung khi chuyển kích thước màn hình hoặc tiêu đề bị cắt.
  - Giữ nguyên 100% font chữ **Play** chủ đạo, thiết lập line-height chuẩn từ `1.28` đến `1.62` bảo đảm tiếng Việt hiển thị trọn vẹn đầy đủ dấu (mũ, ngã, hỏi, sắc, nặng) mà không bị xén đỉnh.
- **2. Khắc Phục Triệt Để & Đồng Bộ Giao Diện Sáng / Tối (Light/Dark Theme Synchronization)**:
  - Rà soát toàn diện trên toàn bộ 14 trang/views, modal, popup và biểu mẫu thay vì chỉ sửa cục bộ.
  - Cập nhật [`page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx) truyền prop `currentTheme={currentTheme}` tức thời và đồng bộ cho toàn bộ các View: [`SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx), [`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx), [`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx), [`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx), [`InterviewView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx), [`HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx), [`MemoriesView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/MemoriesView.tsx), [`ContactView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx).
  - Tích hợp lớp `.logo-pill-light` cùng biến thể dark mode chuẩn xác cho dải thương hiệu tại [`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx).
  - Đảm bảo trạng thái lưu trữ theme trong `localStorage` (`hungthai_site_theme`) khôi phục chính xác 100% khi tải lại trang, đồng bộ cả thuộc tính `data-theme` và class `dark` trên thẻ `<html>`.
- **3. Kiểm Thử Hệ Thống & Checklist**:
  - Chạy kiểm tra tĩnh `pnpm exec tsc --noEmit` đạt **Exit Code 0** (0 lỗi).
  - Dev server HTTP port 3001 phản hồi **HTTP 200 OK**.
  - Thiết lập bảng checklist nghiệm thu toàn diện trước khi bàn giao.

---

## [4.3.0] - 2026-10-26
### Nâng Cấp Logo Thẻ Lĩnh Vực: Tăng 1/2 Kích Thước (48px), Lắp Đầy Hình Tròn, Không Tạo Viền, Loại Bỏ Logo GIF (DomainsView.tsx, domains.ts, variables.css)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - Tại các thẻ **Lĩnh Vực Hoạt Động Chuyên Môn (6 Lĩnh Vực)**, khối logo đối tác ở góc dưới bên phải trước đây có kích thước 30-32px kèm viền ngoài (`border border-black/5 dark:border-white/10`).
  - Logo VED trước đây sử dụng định dạng `.gif` cần được chuẩn hóa sang định dạng tĩnh sắc nét `.png`.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **Tăng thêm 1/2 kích thước logo**:
    - Nâng kích thước từ `30px - 32px` lên `45px - 48px` (`w-[45px] h-[45px] sm:w-[48px] sm:h-[48px]`), tăng đúng 50% (+1/2) diện tích hiển thị giúp nhận diện thương hiệu đối tác rõ nét và ấn tượng hơn.
  - **Lắp đầy hình tròn & Loại bỏ hoàn toàn viền logo**:
    - Bỏ triệt để các lớp viền ngoài (`border-0 border-none outline-none`).
    - Ảnh logo bên trong mở rộng lấp đầy 100% khung tròn: `w-full h-full object-cover block rounded-full`.
    - Dọn dẹp override giới hạn 28px/padding 4px trong [`variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css).
  - **Loại bỏ hoàn toàn hình ảnh logo GIF**:
    - Cập nhật logo VED trong [`domains.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/domains.ts) từ `Logo-VED.gif` sang `VED.png` tĩnh chất lượng cao (`https://i.ibb.co/fYPJLfbw/VED.png`).
    - Bổ sung bộ lọc an toàn tại [`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx) tự động chuyển đổi bất kỳ đường dẫn logo `.gif` nào sang `.png`.
  - Đồng bộ trên cả giao diện thẻ chính và cửa sổ xem chi tiết (Detail Modal).
- **3. Kiểm Thử Hệ Thống**:
  - TypeScript build (`pnpm exec tsc --noEmit`) đạt **0 lỗi**.
  - Dev server phản hồi **HTTP 200 OK**.
  - Tương thích hoàn hảo trên cả Giao diện Sáng và Tối.

---

## [4.2.0] - 2026-10-26
### Đồng Bộ Định Dạng Mô Tả Cho Toàn Bộ 6 Thẻ Lĩnh Vực Hoạt Động Chuyên Môn (DomainsView.tsx)
- **1. Phân Tích & Định Dạng Bố Cục ([`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - Tại trang **Lĩnh Vực Hoạt Động Chuyên Môn (6 Lĩnh Vực)**, khối thẻ chứa tiêu đề, tag và đoạn mô tả định hướng.
  - Trước đây, nội dung mô tả hiển thị thô dạng text thường, chưa có nhãn định danh và dấu trích dẫn đồng bộ.
- **2. Triển Khai Thực Thi Thực Tế Trên Toàn Bộ 6 Thẻ Lĩnh Vực**:
  - Bổ sung nhãn `Mô tả : ` đậm nét (`font-bold font-play text-slate-800 dark:text-slate-100`) đặt phía trước đoạn trích dẫn.
  - Đóng gói câu mô tả cốt lõi trong dấu ngoặc kép chuẩn `“...”` đồng nhất.
  - Kết quả hiển thị trực quan:
    - **Lĩnh vực 01 (Viễn thông)**: `Mô tả : “Kết nối người dùng, xây dựng hạ tầng số, đem lại giá trị bền vững cho cộng đồng.”`
    - **Lĩnh vực 02 (Thương mại điện tử)**: `Mô tả : “Giải quyết tranh chấp 3 bên (Người mua - Người bán - Đơn vị vận chuyển), phòng chống gian lận khuyến mãi/đơn ảo và tối ưu tốc độ phản hồi Chat mùa Mega-Sale.”`
    - **Lĩnh vực 03 (Bảo hiểm)**: `Mô tả : “Yêu cầu tính chính xác minh bạch tuyệt đối về pháp lý hợp đồng, xử lý nhạy cảm các ca chi trả quyền lợi và đảm bảo liên tục kinh doanh (BCP).”`
    - **Lĩnh vực 04 (Game & eSports)**: `Mô tả : “Khôi phục sự cố tài khoản/vật phẩm tức thì, chịu tải siêu cao khi ra mắt Game/Sự kiện eSports và kiểm soát lừa đảo/hack tài khoản.”`
    - **Lĩnh vực 05 (Thanh toán điện tử)**: `Mô tả : “Tra soát khiếu nại tài chính phức tạp, kiểm soát gian lận giao dịch tiền thật, xử lý lỗi kết nối Core Banking và khủng hoảng nghẽn lệnh.”`
    - **Lĩnh vực 06 (Xây dựng hệ thống)**: `Mô tả : “Chuyển đổi CSKH từ Cost Center thành Value Center, tái cấu trúc phòng ban thiếu quy trình và số hóa trải nghiệm khách hàng.”`
- **3. Kiểm Thử Hệ Thống**:
  - TypeScript build (`pnpm exec tsc --noEmit`) đạt **0 lỗi**.
  - Dev server phản hồi **HTTP 200 OK**.
  - Đảm bảo độ tương phản cao, dễ đọc trên cả Giao diện Sáng và Tối.

---

## [4.1.0] - 2026-10-26
### Cập Nhật Thông Tin 12 Thẻ Hệ Thống & Bộ Điều Khiển Video Đa Năng: Nút Nhóm Speaker + Giới Thiệu Bản Thân / Dừng Nghe (SystemsView.tsx, systems.ts, HeroBanner.tsx)
- **1. Cập Nhật Chuẩn Hóa Dữ Liệu 12 Phân Hệ ([`systems.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/systems.ts), [`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Tiếp nhận và cập nhật 100% nội dung chính xác từ yêu cầu của người dùng cho toàn bộ 12 phân hệ:
    1. **9.1. SDP**: Cổng làm việc CSKH (Service Delivery Platform)
    2. **9.2. ERP**: Tài chính kế toán (Enterprise Resource Planning)
    3. **9.3. CRM**: Quản lý khách hàng (Customer Relationship Management)
    4. **9.4. HRM**: Quản lý nhân lực (Human Resource Management)
    5. **9.5. BPM**: Quản lý quy trình (Business Process Management)
    6. **9.6. OKR**: Quản lý mục tiêu (Objectives & Key Results)
    7. **9.7. CLP**: Khách hàng thân thiết (Customer Loyalty Program)
    8. **9.8. LMS**: Quản lý đào tạo (Learning Management System)
    9. **9.9. CSC**: Trung tâm chăm sóc (Customer Service Center)
    10. **9.10. BI Dashboard**: Báo cáo phân tích (Business Intelligence Dashboard)
    11. **9.11. AI Assistant**: Trợ lý trí tuệ (Artificial Intelligence Assistant)
    12. **9.12. POS**: Quản lý bán hàng (Point of Sale)
  - Áp dụng triệt để Quy tắc Định dạng Tiêu đề Card: Chuẩn hóa đúng 4 từ súc tích, tuyệt đối không dùng từ/ký tự "&", viết hoa chữ cái đầu còn lại viết thường (Sentence Case) và bảo toàn viết hoa các từ viết tắt chuyên môn (CSKH, ERP, CRM, HRM, BPM, OKR, CLP, LMS, CSC, BI, AI, POS).
  - Cập nhật đồng bộ các trường `nameVi`, `descVi`, `featuresVi`, `url` và `SYSTEM_DESIGN_MAP` giữa cả hai giao diện Sáng và Tối.

- **2. Tích Hợp Video 1 & Video 2 Mới Kèm Bộ Điều Khiển Thông Minh ([`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx), [`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - **Video 1 (Hệ thống)**: `https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4`
  - **Video 2 (Giới thiệu bản thân)**: `https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4`
  - Hỗ trợ prop `isMuted` trong [`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx) kèm React `useEffect` điều khiển âm thanh HTML5 video theo thời gian thực.
  - **Khối Nút Nhóm Đột Phá (Unified Button Group)**:
    - **Nút Speaker Tích Hợp**: Nằm chung trong khung nút giới thiệu, mặc định tắt âm (`VolumeX`), nhấp vào mở âm video (`Volume2` có animation nhịp nhàng).
    - **Trạng thái Video 1**:
      - Tiêu đề: **Giới thiệu bản thân** kèm icon `Play`.
      - Màu sắc: Gradient Indigo/Slate/Cyan thanh lịch.
      - Hiệu ứng: Viền chuyển sắc xoay chuyển liên tục (chạy viền màu conic-gradient 360 độ), hiệu ứng chuyển động nảy nhẹ, và phát sáng neon cyan khi rê chuột (`hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]`).
      - Nhấp vào: Chuyển sang phát Video 2, tự động bật âm thanh để người dùng nghe phần giới thiệu.
    - **Trạng thái Video 2**:
      - Tiêu đề: **Dừng nghe** kèm icon `Square`.
      - Màu sắc: Đổi sang bảng màu Rose/Pink/Amber nổi bật khác biệt hoàn toàn với Video 1.
      - Hiệu ứng: Viền chạy màu ấm vàng hồng rực rỡ, phát sáng neon rose khi rê chuột (`hover:shadow-[0_0_24px_rgba(244,63,94,0.75)]`).
      - Nhấp vào: Dừng phát Video 2, quay về Video 1 và tắt âm.

- **3. Kiểm Thử Kỹ Thuật & Tính Tương Thích**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi (Exit Code 0)**.
  - Dev server hoạt động trơn tru tại port 3001, HTTP 200 OK.
  - Đảm bảo hiển thị hoàn hảo trên cả Giao diện Sáng (Light Glass) và Giao diện Tối (Dark Neon).

---

## [4.0.0] - 2026-10-26
### Tối Ưu Hiệu Ứng Phát Video Thẻ "Voice Of Customer" (CLP): Video Sắc Nét 100%, Tinh Giản Chỉ Hiển Thị Tên Thẻ & Ghi Chú Lật Thẻ (SystemsView.tsx)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Thẻ **Voice Of Customer** (`item.id === 'clp'`) sở hữu hiệu ứng phát video nền tự động khi người dùng rê chuột vào.
  - Trước đây, khi rê chuột phát video, mặt thẻ bị che mờ bởi:
    - Hiệu ứng sóng tròn trắng lan tỏa (`clp-ripple-active`) làm lóa và che khuất màn hình video.
    - Lớp màng tối (`from-black/50 via-transparent to-black/60`).
    - Các thành phần chữ phụ (Mô tả subtitle "Thu thập & phân tích trải nghiệm khách", icon lớn `WebIcon`, mã phân hệ và badge VIDEO) chiếm diện tích lớn làm che khuất video.
- **2. Triển Khai Thực Thi Thực Tế**:
  - **Tối Ưu Độ Rõ Nét Video (100% Video Clarity)**:
    - Loại bỏ hoàn toàn lớp sóng tròn trắng `clp-ripple-active` che mờ video.
    - Thay thế lớp phủ tối dày bằng lớp phủ gradient siêu mỏng `from-black/55 via-transparent to-black/35`, giúp video hiện lên cực kỳ trong trẻo, chân thực và sắc nét.
  - **Chế Độ Hiển Thị Tinh Gọn Khi Phát Video**:
    - Khi đang phát video (`isClp && isClpHovered`), mặt thẻ chỉ hiển thị duy nhất 2 thành phần cốt lõi:
      1. **Tên thẻ**: `Voice Of Customer` (font Play đậm 15-16px, chữ trắng sắc nét với `drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`).
      2. **Ghi chú lật thẻ**: Huy hiệu con nhộng kính mờ `Nhấp để lật thẻ ↻` với icon xoay lật `RotateCw` màu cyan phát sáng ở góc dưới thẻ.
    - Ẩn toàn bộ mô tả phụ, icon lớn và mã phân hệ khi video phát để toàn bộ khung hình video được phô diễn trọn vẹn.
    - Khi rời chuột, thẻ tự động khôi phục giao diện tĩnh đầy đủ thông tin chuẩn ban đầu.
- **3. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên vẹn 100% dữ liệu hệ thống, video stream mp4 và cơ chế lật thẻ 3D.

---

## [3.99.0] - 2026-10-26
### Nhóm Icon Và Tiêu Đề Liền Khối Cho Nút "Ngôn Ngữ" & Toàn Bộ Cụm Điều Khiển Trang Kỹ Năng Chuyên Môn (SkillsView.tsx)
- **1. Phân Tích Yêu Cầu & Bố Cục ([`SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Trang **Kỹ Năng Chuyên Môn & Ma Trận Quản Trị** (tương ứng `SkillsView.tsx`, Trang 5 theo `pages.tsx`) sở hữu thanh bộ lọc năng lực trên HeroBanner gồm: *Tất cả (6)*, *Điểm mạnh (S)*, *Hoàn thiện (W)*, *Cơ hội (O)*, *Thách thức (T)*, và *Ngôn ngữ*.
  - Trước đây, nút bấm "Ngôn Ngữ" và các nút lọc chưa có khung nhóm thống nhất, icon và text đứng tách biệt dễ bị co kéo lệch trục hoặc phân mảnh thị giác.
- **2. Triển Khai Thực Thi Thực Tế Theo Chuẩn Design System**:
  - **Khung Hợp Nhất Nút Lọc (Unified Pill Filter Buttons)**:
    - Gom icon và tiêu đề của nút "Ngôn ngữ" cùng toàn bộ các nút lọc phân loại vào một khung pill liền khối:
      `<span className="inline-flex items-center gap-1.5 shrink-0 select-none">`
    - Cố định kích thước `shrink-0` cho icon vector `w-3.5 h-3.5`, đi kèm hiệu ứng vi mô `group-hover/filter-btn:scale-110` mượt mà.
    - Tiêu đề chữ font Play đậm, chuẩn Sentence Case, không bao giờ bị ngắt dòng (`whitespace-nowrap`).
  - **Khung Hợp Nhất Tiêu Đề Thẻ (Unified Header Frame Trên Toàn Bộ Thẻ Kỹ Năng)**:
    - Tái cấu trúc cụm tiêu đề của toàn bộ 6 thẻ năng lực (bao gồm Thẻ 6: *Ngôn ngữ : Giao tiếp & làm việc*):
      - Gom Icon và Tiêu đề vào một khung pill hợp nhất `inline-flex items-center gap-2 px-2.5 py-1 rounded-full border backdrop-blur-sm shadow-2xs`.
      - Nền kính mờ hòa sắc pastel theo mã màu nhận diện của từng thẻ (`card.themeColor`), viền bán trong suốt.
      - Loại bỏ sự phân mảnh giữa icon trần và text, tạo cảm giác thẻ công nghệ cao cấp, gọn gàng và tinh tế.
- **3. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên 100% dữ liệu năng lực, âm thanh AI 15s và tính năng lật thẻ KPI.

---

## [3.98.0] - 2026-10-26
### Khắc Phục Triệt Để Lỗi Rê Chuột (Hover) Vào Card Gây Nảy Lên Và Làm Mất Card (3D Flip Transform Culling Bug)
- **1. Phân Tích Nguyên Nhân Gốc Rễ (Root Cause Analysis)**:
  - **Xung Đột Transform Trên Mặt Thẻ Lật 3D**:
    - Tại [`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx), 12 thẻ hệ thống sử dụng cấu trúc lật 3D gồm Wrapper (`perspective: 1000px`), Inner (`transform-style: preserve-3d`), và 2 mặt Front/Back (`backface-visibility: hidden`).
    - Mặt trước `.system-flip-front` mang class `.system-item`. Khi rê chuột vào, cả CSS nội bộ (`.system-item:hover { transform: translateY(-5px); }`) lẫn CSS toàn cục tại [`globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css) (`transform: translateY(-4px) scale(1.012) !important;`) đồng thời ghi đè thuộc tính `transform: rotateY(0deg)` của mặt trước thành phép biến đổi 2D.
    - Trong Chromium/WebKit, một phần tử mang `backface-visibility: hidden` nằm trong không gian 3D `preserve-3d` khi bị ép nhận `translateY` 2D mà mất đi vector xoay 3D sẽ kích hoạt thuật toán culling (loại bỏ mặt khuất), khiến trình duyệt tính toán sai góc nhìn và **làm biến mất hoàn toàn (tàng hình/mất card)** ngay khi chuột vừa chạm vào.
    - Khi thẻ biến mất, con trỏ chuột lập tức rơi ra ngoài thẻ (`mouseleave`), thẻ quay lại vị trí cũ và hiện ra, rồi chuột lại chạm vào (`mouseenter`), gây ra hiện tượng nhấp nháy liên tục (jitter loop) cực kỳ khó chịu.
  - **Tác Động Tương Tự Trên Thẻ Lật Tại SkillsView & DomainsView**:
    - Tại [`SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx) và [`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx), thẻ con mặt trước chứa class `hover:-translate-y-1.5` nằm trực tiếp dưới container `transformStyle: 'preserve-3d'`, gây ra hiện tượng xê dịch 3D và xung đột tương tự.
- **2. Giải Pháp Khắc Phục Triệt Để & Bền Vững**:
  - **Tách Biệt Điểm Tác Động Nâng Thẻ (Hover Elevation Isolation)**:
    - Chuyển hiệu ứng nâng thẻ (`hover: translateY(-4px)`) ra thẻ bọc ngoài cùng (`.system-flip-wrap:hover`), nâng toàn bộ khối thẻ trên không gian 2D mà không can thiệp vào không gian xoay 3D bên trong.
    - Xóa bỏ triệt để `transform: translateY(-5px)` trên `.system-item:hover` trong [`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx).
    - Khóa cứng vĩnh viễn: `.system-flip-front { transform: rotateY(0deg) !important; }` và `.system-flip-back { transform: rotateY(180deg) !important; }`.
  - **Cập Nhật Design System Toàn Cục ([`globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
    - Loại bỏ `.system-item:hover` và `article.system-item:hover` khỏi khối `transform: translateY(-4px) scale(1.012) !important;`.
    - Thiết lập rào chắn bảo vệ tuyệt đối (Strict 3D Face Guards) cấm mọi CSS bên ngoài ghi đè `transform` của `.system-flip-front` và `.system-flip-back`.
    - Vô hiệu hóa pseudo-element quét sáng `::before` trên các container 3D (`[style*="perspective"]`, `[style*="preserve-3d"]`, `.system-flip-*`) để tránh che khuất mặt thẻ.
  - **Loại Bỏ `hover:-translate-y-1.5` Trên Mặt Thẻ Con ([`SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx), [`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
    - Xóa bỏ class `hover:-translate-y-1.5` trên div mặt trước, đảm bảo mặt thẻ lật 3D luôn ổn định 100%, không bị xê dịch lệch trục hoặc biến mất.
- **3. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Thử nghiệm rê chuột trên toàn bộ 12 thẻ hệ thống C-Level, 6 thẻ kinh nghiệm thực chiến và các thẻ lĩnh vực: **Hiệu ứng nâng mượt mà, ổn định tuyệt đối 100%, không còn hiện tượng mất card hay nhấp nháy.**
  - Bảo toàn 100% dữ liệu, tính năng lật thẻ, video nền CLP và liên kết hiện có.

---

## [3.97.0] - 2026-10-26
### Chuẩn Hóa Tiêu Đề Card Toàn Hệ Thống: Giới Hạn Tối Đa 4 Từ, Tuyệt Đối Không Dùng Ký Tự "&", Viết Hoa Chữ Đầu (Sentence Case)
- **1. Phân Tích & Thiết Lập Quy Tắc Hệ Thống ([`AGENTS.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/AGENTS.md), [`SKILL.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agent/skills/card-presentation-system/SKILL.md), [`utils.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/lib/utils.ts))**:
  - **Quy tắc bắt buộc đối với tiêu đề Card**:
    - **TUYỆT ĐỐI KHÔNG** sử dụng ký tự `&` (hoặc từ `và`) trong toàn bộ tiêu đề card.
    - **GIỚI HẠN CHUẨN MỰC**: Tiêu đề card phải ngắn gọn, súc tích, tối đa **4 từ**.
    - **ĐỊNH DẠNG**: Áp dụng **Sentence case** — Viết hoa chữ cái đầu tiên, các chữ tiếp theo viết thường toàn bộ.
    - **NGOẠI LỆ DUY NHẤT**: Giữ nguyên chữ HOA cho các từ viết tắt chuyên môn, chứng chỉ quốc tế và công nghệ (AI, CX, CSKH, CRM, ERP, KPI, SLA, COPC, ISO, MBA, UI/UX, CCNA, MCSA...).
  - **Nâng cấp hàm tiện ích `formatCardTitle` & `formatSentenceCase` trong [`src/lib/utils.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/lib/utils.ts)**:
    - Tự động thay thế `&` bằng khoảng trắng, lọc bỏ `&` và `và`.
    - Cắt tỉa mảng từ tối đa 4 từ (`.slice(0, 4)`).
    - Chuẩn hóa viết hoa chữ đầu, chữ thường các từ sau, giữ nguyên các acronyms chuyên ngành.
- **2. Rà Soát & Cập Nhật Triệt Để Trên Toàn Bộ Các View**:
  - **Trang Học Vấn ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
    - Chuẩn hóa toàn bộ 14 card học vấn & chứng chỉ thành đúng 4 từ không chứa `&`:
      - `Thiết kế web UI/UX` (4 từ)
      - `Phân tích dữ liệu số` (4 từ)
      - `Quản trị rủi ro vận hành` (4 từ)
      - `Quản trị dự án thực chiến` (4 từ)
      - `Quản trị cấp cao chiến lược` (4 từ)
      - `Quản lý cấp trung thực chiến` (4 từ)
      - `Kỹ năng đào tạo nội bộ` (4 từ)
      - `Kỹ năng thuyết trình chuyên sâu` (4 từ)
      - `Kỹ năng phỏng vấn tuyển dụng` (4 từ)
      - `Kỹ năng tuyển dụng nhân sự` (4 từ)
      - `Cử nhân công nghệ thông tin` (4 từ)
      - `Chuyên viên tổng đài MobiFone` (4 từ)
      - `Quản trị mạng CCNA Cisco` (4 từ)
      - `Quản trị hệ thống MCSA` (4 từ)
  - **Trang Giới Thiệu ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
    - Thay thế `Thông Tin Cá Nhân & Vị Trí Cư Trú` bằng `formatCardTitle("Thông tin cá nhân cư trú")` (4 từ, không `&`).
    - Thay thế `Trụ cột vận hành & triết lý` bằng `formatCardTitle("Trụ cột vận hành triết lý")` (4 từ, không `&`).
  - **Trang Lĩnh Vực Vận Hành ([`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
    - Thay thế `Vai trò & Trách nhiệm` bằng `formatCardTitle("Vai trò trách nhiệm thực thi")` (4 từ, không `&`).
    - Thay thế `Công nghệ & Hệ thống` bằng `formatCardTitle("Công nghệ hệ thống vận hành")` (4 từ, không `&`).
    - Duy trì `Quy mô đội ngũ` (4 từ, không `&`).
- **3. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu gốc và liên kết trong toàn bộ website.

---
### Thiết Lập Quy Tắc Định Dạng Tiêu Đề: Cấm Viết Hoa Toàn Bộ Chữ, Chuyển Sang "Viết Hoa Chữ Đầu Còn Lại Viết Thường" (Sentence Case Rule)
- **1. Phân Tích & Thiết Lập Quy Tắc Hệ Thống ([`AGENTS.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/AGENTS.md), [`SKILL.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agent/skills/card-presentation-system/SKILL.md), [`utils.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/lib/utils.ts))**:
  - **Khắc ghi quy tắc bắt buộc vào Design Rules & Agent Guidelines**:
    - **CẤM** tạo tiêu đề viết hoa toàn bộ các từ (KHÔNG dùng ALL CAPS hoặc class CSS `uppercase`), ví dụ như tiêu đề của Thẻ học vấn, Thẻ kỹ năng, Thẻ hệ thống...
    - **BẮT BUỘC** chuyển sang định dạng: **Viết hoa chữ đầu còn lại viết thường (Sentence Case)**.
    - Quy tắc: Chỉ viết hoa duy nhất chữ cái đầu tiên của câu/tiêu đề, toàn bộ các chữ cái tiếp theo viết thường.
    - Ngoại lệ duy nhất: Bảo toàn chữ HOA cho các từ viết tắt chuyên môn, chứng chỉ quốc tế và công nghệ (AI, CX, CSKH, CRM, ERP, KPI, SLA, COPC, ISO, MBA, UI/UX, IT, SOP, OKR...).
    - Bổ sung hàm tiện ích chuẩn hóa `formatSentenceCase(title: string)` vào [`src/lib/utils.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/lib/utils.ts).
- **2. Triển Khai Thực Thi Thực Tế Trên Thẻ Học Vấn ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - Xóa bỏ triệt để class CSS `uppercase` tại tiêu đề thẻ học vấn (`card-title`).
  - Áp dụng `formatSentenceCase` cho toàn bộ 14 khóa học và modal chứng chỉ (ví dụ: `Thiết kế web UI/UX`, `Phân tích dữ liệu`, `Cử nhân quản trị kinh doanh`, `Quản trị trải nghiệm khách hàng CX`...).
- **3. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu khóa học, chứng chỉ và hình ảnh banner.

---

## [3.95.0] - 2026-10-26
### Tích Hợp Toàn Bộ Thẻ Thông Tin Cá Nhân Vào Khối Chỉ Số Vận Hành Slide 1 Trang Giới Thiệu (AboutView.tsx)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Tái cấu trúc khối bên phải Slide 1 thành cụm thẻ Profile Đa Năng (Dual-Cluster Profile Hub)**:
    - Nhóm 1: Tối ưu 4 thẻ chỉ số kinh nghiệm cốt lõi (`ABOUT_PROFILE_STATS`: 22+ Năm CX, 8+ Môi trường, 24/7 AI CRM, 99% CSAT) thành dạng lưới 2 cột nhỏ gọn, thanh lịch.
    - Nhóm 2: **Tích hợp trực tiếp 6 thẻ thông tin cá nhân chuẩn mực (`PERSONAL_DEMOGRAPHICS`)** ngay trong khối này, gồm:
      - 👤 Giới tính: Nam giới
      - 👥 Dân tộc: Kinh
      - 💖 Tình trạng: Độc thân
      - 🎂 Sinh nhật: 22/06/1984
      - 📍 Tạm trú: Q7, Hồ Chí Minh (kèm icon xem bản đồ tương tác)
      - 🏠 Cư trú: Mỹ Tho, Tiền Giang (kèm icon xem bản đồ tương tác)
    - Kích thước khối được mở rộng linh hoạt `w-full sm:w-[320px] lg:w-[360px]` với chiều cao cân đối, giúp người xem nắm bắt trọn vẹn cả năng lực vận hành lẫn thông tin cá nhân ngay từ màn hình Slide 1 mà không bắt buộc phải chuyển sang Slide 2.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên vẹn 100% dữ liệu cá nhân, liên kết mở bản đồ cư trú và chức năng phát video giới thiệu AI.

---

## [3.94.0] - 2026-10-26
### Loại Bỏ Nút Chuông Thông Báo & Popup Dropdown Hệ Thống Khỏi Thanh Điều Hướng Header (Header.tsx)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - **Xóa bỏ hoàn toàn nút Chuông Thông Báo Thông Minh (Animate UI Bell Button)**:
    - Loại bỏ nút chuông thông báo cùng chấm đỏ chưa đọc ở góc phải thanh điều hướng Header.
    - Xóa bỏ toàn bộ popup dropdown thông báo hệ thống kính mờ Glassmorphism.
    - Dọn sạch các import không còn sử dụng (`Bell` từ `@/components/animate-ui/icons/bell`) và các state liên quan (`isNotifOpen`, `hasUnreadNotifs`).
    - Giúp thanh điều hướng Header trở nên tinh gọn, tối giản, giải phóng không gian cho hệ thống menu chuyển trang chính và triệt tiêu các thành phần gây xao nhãng.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên vẹn 100% hệ thống menu điều hướng 13 trang, hiệu ứng xếp chồng thông minh và các nút chức năng cốt lõi.

---

## [3.93.0] - 2026-10-26
### Nâng Cấp Kích Thước Logo Sản Phẩm Lên Gấp Đôi, Thiết Kế Lấp Đầy Hình Tròn Tràn Viền Không Border (ExperienceView)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - **Tăng kích thước logo sản phẩm tiêu biểu lên gấp đôi**:
    - Nâng cấp từ cỡ mini `w-7 h-7 sm:w-8 sm:h-8` (28–32px) lên kích thước nổi bật `w-13 h-13 sm:w-15 sm:h-15` (52–60px), giúp nhận diện thương hiệu sản phẩm (MobiFone, HTVC, Shopee, AirPay, MoMo, Finviet...) trở nên ấn tượng và cao cấp hơn.
  - **Lấp đầy hình tròn hoàn toàn (Circular Medallion Style) & Loại bỏ triệt để viền border**:
    - Chuyển đổi khung bo góc (`rounded-xl`) sang dạng hình tròn chuẩn xác (`rounded-full overflow-hidden p-0`).
    - Bỏ toàn bộ viền `border` và `outline`: Thiết lập `border-0 p-0 shadow-[0_4px_14px_rgba(0,0,0,0.12)]`.
    - Hình ảnh logo áp dụng `object-cover w-full h-full` lấp đầy 100% hình tròn không để khoảng hở viền trống, đồng điệu với phong cách huy hiệu Medallion ở TIER 2 của trang.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên vẹn 100% dữ liệu sản phẩm, tooltip tên và tương tác người dùng.

---

## [3.92.0] - 2026-10-26
### Loại Bỏ Nhãn Chữ "SẢN PHẨM TIÊU BIỂU", Tinh Gọn Khối Logo Thương Hiệu Trong Thẻ Pastel Hành Trình Sự Nghiệp (ExperienceView)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - **Xóa bỏ hoàn toàn nhãn `<span> "SẢN PHẨM TIÊU BIỂU"`**:
    - Loại bỏ nhãn chữ tiêu đề phụ in hoa bên trong Khối 2 của thẻ Soft Pastel Milestone.
    - Chuyển đổi khung chứa logo sản phẩm sang dạng thanh ngang tinh gọn (`p-1.5 rounded-xl flex items-center justify-center gap-1.5 flex-wrap`), chỉ tập trung phô diễn bộ nhận diện thương hiệu trực quan (Logo MobiFone, V247, HTVC, Shopee, AirPay, MoMo, Finviet...).
    - Giảm thiểu độ dày thừa của thẻ, tăng tính thẩm mỹ tối giản, chuyên nghiệp và giúp các thông tin cốt lõi (vị trí đảm nhiệm, quy mô nhân sự, nhiệm vụ chính) nổi bật rõ ràng hơn.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên vẹn 100% hình ảnh logo sản phẩm, tooltip tên sản phẩm khi rê chuột và dữ liệu công tác.

---

## [3.91.0] - 2026-10-26
### Thiết Lập Bố Cục Full Chiều Cao (Full-Height Responsive Elevation) Cho Toàn Bộ Khối Infographic Timeline Hành Trình Sự Nghiệp (ExperienceView)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - **Tối ưu toàn diện container Timeline Infographic đạt chuẩn Full Chiều Cao (Full-Height Grid Elevation)**:
    - Chuyển container Timeline Infographic chính từ `flex flex-col justify-center` thành `w-full h-full flex-1 min-h-0 flex flex-col justify-between`, tận dụng 100% không gian hiển thị dọc của màn hình.
    - Cấu hình khung carousel track cuộn ngang (`relative w-full flex-1 min-h-0 h-full overflow-hidden py-1 flex flex-col justify-between`) và track trượt ngang (`flex w-full h-full flex-1 min-h-0`) để thẻ các giai đoạn không bị co rút hay lơ lửng.
    - Lưới 4 thẻ trong từng trang (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch px-1 w-full h-full flex-1 min-h-0 shrink-0`) mở rộng chạm đáy khung nhìn.
  - **Tối ưu phân bổ không gian bên trong Thẻ Card Soft Pastel (TIER 3 Card Layout)**:
    - Thẻ `theme-pastel-card` nhận `flex-1 h-full min-h-0 flex flex-col items-center justify-between`.
    - Khối 3 (Nhiệm vụ cốt lõi) được cấp thuộc tính `flex-1 flex flex-col justify-center`, giúp phân bổ đều khoảng cách giữa Khối Công ty, Sản phẩm tiêu biểu và Nút chi tiết công tác một cách cân đối, sang trọng.
    - Đồng bộ hóa chế độ xem Lộ Trình Năng Lực (Career Development Tab) với `flex-1 min-h-0 items-stretch` để đảm bảo trải nghiệm thống nhất.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu lịch sử công tác 2003 - 2026+, logo sản phẩm, thuyết minh karaoke và hiệu ứng lướt ngang.

---

## [3.90.0] - 2026-10-26
### Tinh Gọn Thẻ Hệ Thống C-Level: Loại Bỏ Hàng Đáy "Lật Thẻ" Và Tối Ưu Chiều Cao Compact Trên Toàn Cổng Bento SystemsView
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - **Loại bỏ hoàn toàn khối `<div>` đáy chứa văn bản "CRM Lật thẻ" (Bottom Row Action)**:
    - Loại bỏ hàng `div` biên dưới vốn chứa nút "Lật thẻ" và mã phân hệ viết tắt nhằm giải phóng chiều cao bị chiếm dụng.
    - Chuyển mã phân hệ viết tắt (`item.abbr` như CRM, ERP, LMS, CLP...) cùng dấu chấm trạng thái hoạt động (`statusInfo.dotColor`) lên thành badge pill mini tinh tế đặt ngay trên đầu tiêu đề thẻ.
    - Duy trì 100% trải nghiệm tương tác: Toàn bộ thẻ vẫn hỗ trợ nhấp chuột để lật 3D xem mặt sau và chi tiết hệ thống mượt mà (`system-flip-inner`).
  - **Thu gọn kích thước thẻ toàn diện (Ultra-Compact Card Elevation)**:
    - Giảm padding mặt trước từ `p-3.5 sm:p-4` xuống `p-2.5 sm:p-3` với cấu trúc căn giữa `flex flex-col justify-center`.
    - Giảm kích thước icon vector không đóng khung từ `w-12 h-12 sm:w-14 sm:h-14` xuống `w-8 h-8 sm:w-9 sm:h-9` thanh thoát và đồng điệu với tiêu đề.
    - Giảm `min-height` từ `94px` xuống `80px` trong CSS `.system-flip-wrap` và `.system-flip-inner`.
    - Tối ưu mặt sau `system-flip-back` với padding `p-2 sm:p-2.5` và nút bấm mini cân đối.
    - Kết quả: Toàn bộ 12 thẻ hệ thống (3 cột x 4 hàng) hiển thị vừa vặn, trọn vẹn trong khung hình màn hình máy tính mà không gây tràn hay phát sinh thanh cuộn dài.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Giữ nguyên vẹn 100% dữ liệu 12 hệ thống, video CLP nền, liên kết URL và chức năng mở modal chi tiết.

---

## [3.89.0] - 2026-10-26
### Đồng Bộ Và Khắc Sâu Cơ Chế Lưu Hình Nền Mặc Định Vĩnh Viễn Khi Người Dùng Chọn (Persistent Default Wallpaper Engine)
- **1. Phân Tích & Tinh Chỉnh Kiến Trúc ([`page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx), [`WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx), [`wallpaperStorage.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/wallpaperStorage.ts))**:
  - **Tách bạch 2 hành vi người dùng rõ rệt: Xem thử (Preview) và Đặt làm mặc định (Set as Default)**:
    - *Nhấp 1 lần (Single-click)*: Áp dụng hình nền tức thì để người dùng xem thử phông nền mà không làm thay đổi hình nền mặc định đã lưu.
    - *Bấm nút "Đặt mặc định" / Ngôi sao ⭐ / Nhấp đúp (Double-click)*: Xác nhận chọn hình nền làm mặc định vĩnh viễn, lưu đồng thời vào `localStorage` (`hungthai_default_wallpaper_id`) và IndexedDB (`setDefaultWallpaperId`).
  - **Khắc phục triệt để lỗi Shadowing & Nạp Ưu Tiên khi Reload Website**:
    - Trong `src/app/page.tsx`, trước đây biến state cục bộ `defaultWallpaperId` vô tình trùng tên hàm tiện ích `setDefaultWallpaperId` từ storage module, dẫn đến việc lưu mặc định không được gọi. Đã đổi thành `persistDefaultWallpaperId` và liên kết trực tiếp vào callback `onSetDefaultWallpaper`.
    - Khi tải lại trang web hoặc mở tab mới, hệ thống luôn ưu tiên đọc `hungthai_default_wallpaper_id` trước `hungthai_active_wallpaper_id`, đảm bảo hình nền đã lưu làm mặc định luôn được hiển thị đầu tiên 100%.
  - **Bổ sung các điểm tương tác trực quan cao cấp trên giao diện**:
    - *Top Toolbar*: Xuất hiện nút nổi bật `[⭐ Đặt "{Tên}" làm mặc định]` khi hình nền đang xem thử khác với hình nền mặc định.
    - *Góc trên bên phải mỗi thẻ card*: Bổ sung nút ngôi sao ⭐ (nhấn 1 chạm đặt mặc định ngay lập tức; card mặc định sẽ có sao vàng rực).
    - *Chân mỗi thẻ card*: Hiển thị nhãn `⭐ Mặc định` với thẻ đang là mặc định, và nút `⭐ Đặt mặc định` khi di chuột vào thẻ khác.
    - *Thông báo Toast phản hồi*: Hiển thị thông điệp xác nhận rõ ràng với icon ngôi sao khi lưu mặc định thành công.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu văn bản, danh sách hình nền có sẵn và các hình nền tùy biến của người dùng.

---

## [3.88.0] - 2026-10-26
### Thiết Lập Hệ Thống Hiệu Ứng Đổ Bóng Đa Tầng (Multi-Layer Depth Elevation & Neon Ambient Glow) Cho Tất Cả Các Dạng Thẻ Card Trên Toàn Bộ Website
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css), [`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx), [`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx), [`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx), [`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx), [`SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx), [`GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx), [`InterviewView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx), [`HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx), [`MemoriesView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/MemoriesView.tsx), [`ContactView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx))**:
  - **Kiến trúc đổ bóng 3 tầng lập thể (3-Layer Depth Elevation Architecture)**:
    - *Tầng 1 (Ambient Shadow)*: Bóng khuếch tán diện rộng tạo khoảng cách nâng thẻ khỏi phông nền (`0 10px 30px -4px rgba(15, 23, 42, 0.08)` trên Light Glass; `0 14px 38px -6px rgba(0, 0, 0, 0.75)` trên Dark Neon).
    - *Tầng 2 (Contact / Key Light Shadow)*: Bóng tiếp xúc cự ly gần tạo độ sắc nét và chân thực cho chân thẻ (`0 4px 12px -2px rgba(15, 23, 42, 0.04)`).
    - *Tầng 3 (Specular Inset Rim)*: Đường vát phản quang gương mỏng mép trên tạo hiệu ứng kính pha lê 3D (`inset 0 1px 1.5px rgba(255, 255, 255, 0.95)` trên Light Glass; `inset 0 1px 1.5px rgba(255, 255, 255, 0.15)` trên Dark Neon).
  - **Hiệu ứng quầng sáng Neon Glow thích ứng theo màu sắc thẻ (Adaptive Accent Neon Glow)**:
    - Ở chế độ Dark Neon, mỗi thẻ tự động thừa hưởng màu chủ đạo nhận diện của thẻ (`var(--card-accent-color)`) để tỏa ra vầng hào quang neon viền êm dịu (`0 0 18px -2px var(--card-accent-color, rgba(56, 189, 248, 0.18))`), loại bỏ triệt để hiện tượng thẻ bị chìm hoặc lẫn vào nền tối.
  - **Hiệu ứng nâng thẻ khi rê chuột (Hover Elevation & Volumetric Diffusion)**:
    - Tự động nhấc thẻ `translateY(-4px)` kết hợp khuếch tán bóng đổ rộng mở (`0 20px 42px -6px rgba(15, 23, 42, 0.16)` ở Light Mode; `0 24px 52px -8px rgba(0, 0, 0, 0.88), 0 0 30px var(--card-accent-color)` ở Dark Mode).
  - **Áp dụng đồng bộ trên toàn bộ 5 Archetypes Card và tất cả các trang**:
    - *Trang Lĩnh Vực (`DomainsView.tsx`)*: 6 thẻ lưới 3x2 (mặt trước, mặt sau và thẻ chi tiết mở rộng toàn lưới).
    - *Trang Học Vấn (`EducationView.tsx`)*: 14 thẻ khóa học và modal chứng chỉ.
    - *Trang Thư Ngỏ (`LetterView.tsx`)*: Thẻ Thông Điệp Hợp Tác, Thẻ Bento kinh nghiệm, các mốc lộ trình.
    - *Trang Kinh Nghiệm (`ExperienceView.tsx`)*: 8 Thẻ Milestone Soft Pastel và popover chỉ số KPI.
    - *Trang Dự Án (`GridToListMorph.tsx`)*: 21 thẻ dự án thực chiến.
    - *Trang Kỹ Năng (`SkillsView.tsx`)*: 6 nhóm kỹ năng và thẻ SWOT.
    - *Trang Hệ Thống (`SystemsView.tsx`)*: 12 thẻ hệ thống lật 3D 2 mặt.
    - *Trang Phỏng Vấn, Tử Vi, Kỷ Niệm, Liên Hệ*: Toàn bộ thẻ nội dung và form liên lạc.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu văn bản, số liệu và tương tác người dùng.

---

## [3.87.0] - 2026-10-26
### Tách HeroBanner Độc Lập Khỏi Thẻ Thông Điệp Hợp Tác Trong Cùng Slide 1 Của Thư Ngỏ (LetterView)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Tách HeroBanner ra đứng riêng bên ngoài thẻ Thông Điệp Hợp Tác trong Slide 1**:
    - Trước đây, `<HeroBanner>` bị nhét vào bên trong container `#card-main-letter-content` (dưới tiêu đề "Thông Điệp Hợp Tác").
    - Đã tách `<HeroBanner>` ra thành một component độc lập ở hàng trên cùng của Slide 1 (`key="slide-1"`), mang đầy đủ video Scena AI 4K, tiêu đề "Thư Ngỏ Đối Tác", và câu nói hay "Trải nghiệm hôm nay kiến tạo giá trị bền vững ngày mai".
    - Thẻ "Thông Điệp Hợp Tác" (`#card-main-letter-content`) giờ đây là một khối card độc lập nằm bên dưới, giữ vai trò chứa toàn văn thông điệp: lời chào kính gửi, 2 khối Bento kinh nghiệm & cam kết, 3 trụ cột và phương châm phụng sự.
    - Cả hai khối (HeroBanner và Thẻ Thông Điệp Hợp Tác) vẫn cùng hiện diện hài hòa, vừa vặn trong **Slide 1** trên một màn hình chuẩn xác mà không gây thanh cuộn ngoài ý muốn.
  - **Đồng bộ hóa chế độ xem toàn văn 1 trang (One-Page Complete View)**:
    - Bổ sung `<HeroBanner>` đứng đầu trang ở chế độ đọc liền mạch 1 trang để mang lại trải nghiệm thị giác cao cấp và thống nhất.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu văn bản, karaoke thuyết minh và chức năng xuất PDF A4.

---

## [3.86.0] - 2026-10-26
### Loại Bỏ Chế Độ Xem Infographic 3D Cover Khỏi Trang Lĩnh Vực (DomainsView), Tinh Gọn Giao Diện Lưới 6 Lĩnh Vực Chuẩn Mực
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx), [`Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - **Xóa bỏ hoàn toàn dạng view Infographic 3D Cover**:
    - Loại bỏ state chuyển đổi `viewMode` và thanh trượt tỷ lệ `infographicScale`.
    - Loại bỏ cụm nút bấm chuyển đổi `[🎴 Thẻ Lưới Luminous]` vs `[🔢 Infographic 3D Cover]` cùng thanh trượt zoom khỏi thanh điều khiển dưới `HeroBanner`.
    - Xóa bỏ toàn bộ khối render Infographic 3D Number Cover View (hơn 350 dòng mã dư thừa), giúp code sạch sẽ và tối ưu hiệu suất render.
  - **Giữ nguyên vẹn 100% dữ liệu và trải nghiệm cao cấp của Lưới 6 Lĩnh Vực**:
    - Trang Lĩnh Vực tập trung hoàn toàn vào giao diện lưới CSS Grid 3 cột × 2 hàng chuẩn mực với hiệu ứng **Grid Card Expansion Transition** mượt mà khi người dùng nhấp vào xem chi tiết một lĩnh vực.
    - Giữ đầy đủ các tính năng: Loa thuyết minh AI 15s, Lật thẻ 3D xem nhanh 4 chỉ số KPI, Bộ lọc thương hiệu đối tác liên quan, và phân loại theo 3 danh mục.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu của 6 lĩnh vực hoạt động.

---

## [3.85.0] - 2026-10-26
### Tối Ưu Hóa & Debug Bố Cục Masonry Chuẩn Mực Cho Thẻ Thông Điệp Hợp Tác (LetterView)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Khắc phục triệt để 5 vấn đề cốt lõi của bố cục Masonry (Scoped riêng cho `#card-main-letter-content`)**:
    1. *Khắc phục lỗi thẻ bị cắt đôi giữa các cột (Cards splitting across columns)*: Bổ sung thuộc tính bảo vệ `break-inside: avoid !important; page-break-inside: avoid !important; -webkit-column-break-inside: avoid !important` trên toàn bộ các khối thẻ `.masonry-card-item`. Đảm bảo không bao giờ có hiện tượng thẻ bị phân mảnh hay đứt đoạn khi hiển thị trên các màn hình khác nhau.
    2. *Đảm bảo thứ tự đọc chuẩn theo hàng (Row-Major Reading Order)*: Thiết kế hệ thống lưới CSS Grid thông minh (`.letter-masonry-container`) duy trì thứ tự đọc từ trái qua phải, từ trên xuống dưới (Block kinh nghiệm → Cam kết → 3 Trụ cột → Phương châm) thay vì đọc dọc từ đỉnh xuống đáy cột đầu tiên như hạn chế của CSS columns thông thường.
    3. *Khắc phục lỗi các hàng bị kéo cao bằng nhau (Equal-height rows appearing)*: Cấu hình `align-items: start` và `align-self: start; height: auto` trong khối fallback `@supports not (grid-template-rows: masonry)`. Mỗi thẻ co giãn theo đúng dung lượng nội dung thực tế, loại bỏ hoàn toàn khoảng trống chết phía dưới các thẻ ngắn.
    4. *Khắc phục hiện tượng xáo trộn layout khi tải hình ảnh/video (Wall reshuffling / CLS = 0)*: Bảo toàn tỷ lệ khung hình cố định và kích thước dự trữ của toàn bộ các banner, video và icon bên trong, ngăn chặn hiện tượng nhảy giật khung hình khi tải tài nguyên mạng.
    5. *Khắc phục xung đột giữa margin của thẻ và khoảng cách cột (Margins fighting column-gap)*: Chuẩn hóa `margin: 0 !important; margin-bottom: 0 !important` trên các thẻ con, giao toàn bộ quyền điều phối khoảng cách cho `gap: 10px` đồng bộ, loại bỏ triệt để hiện tượng vỡ layout do margin collapse.
  - **Hỗ trợ kép Native Masonry & Bulletproof Fallback**:
    - Khi trình duyệt hỗ trợ `grid-template-rows: masonry`: Tự động kích hoạt cơ chế Native Masonry mượt mà nhất.
    - Khi trình duyệt chưa hỗ trợ native masonry: Khối `@supports not (grid-template-rows: masonry)` kích hoạt lưới Bento Grid thích ứng tự nhiên theo từng breakpoint (1 cột mobile, 2 cột tablet, 12 cột desktop).
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001` (Content length: 78735).
  - Bảo toàn 100% dữ liệu văn bản và các tính năng tương tác thuyết minh / đổi tên công ty đối tác.

---

## [3.84.0] - 2026-10-26
### Nâng Cấp Khối Tiêu Đề & Câu Nói Hay Trong HeroBanner: Chỉnh Nền Trong Suốt 100% (Phạm Vi Toàn Website)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - **Chỉnh nền trong suốt 100% tinh khiết (`bg-transparent`, `background: transparent`)**:
    - Khối `<div>` bao quanh Tiêu đề chính ("Học Vấn & Chứng Chỉ") và Câu nói hay ("Học hỏi không ngừng để nâng tầm...") được loại bỏ hoàn toàn các lớp phủ nền đen/kính mờ (`bg-black/40`, `bg-black/60`), đường viền và bóng đổ thẻ.
    - Chuyển sang nền trong suốt 100% (`bg-transparent`, `style={{ padding: '5px', background: 'transparent' }}`), giúp hiển thị trọn vẹn và sống động lớp video hoặc hình ảnh nền nghệ thuật bên dưới trên toàn bộ website.
    - Giữ nguyên hiệu ứng `textShadow` tương phản cao ở cả tiêu đề chính và câu trích dẫn màu vàng kim, đảm bảo chữ luôn sắc nét và dễ đọc 100% ở cả giao diện Sáng và Tối mà không cần đóng hộp đục.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001`.
  - Bảo toàn 100% dữ liệu gốc và tính năng trên toàn bộ website.

---

## [3.83.0] - 2026-10-26
### Nâng Cấp Khối Header Banner Tiêu Chuẩn Toàn Website (Padding 5px) & Chuyển Đổi Icon Tiêu Đề Sang Dạng Icon Pill
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx), [`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - **Kiểu dáng Padding 5px cho khối Header Tiêu đề & Câu nói hay (Phạm vi: Toàn website)**:
    - Cập nhật khối `<div>` bảo vệ kính mờ (Scrim Container) bao quanh Tiêu đề và Câu nói hay trong [`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx) sang `p-[5px]` và `style={{ padding: '5px' }}`.
    - Giúp khối Scrim thanh thoát, gọn gàng, tăng không gian thoáng đãng cho phần nền Banner trên tất cả 14 phân hệ trang của website.
  - **Chuyển đổi Icon tiêu đề sang dạng Icon Pill cao cấp**:
    - *Tại HeroBanner*: Thay thế icon trần thông thường bằng một **Icon Pill** tinh tế (`banner-icon-pill inline-flex items-center justify-center px-2 py-1 rounded-full bg-white/15 dark:bg-white/10 border border-white/25 dark:border-white/20 backdrop-blur-md shadow-xs`), giữ nguyên màu sắc đồng nhất với chữ tiêu đề (`--banner-theme-color`) và hiệu ứng hover nhẹ nhàng.
    - *Tại trang Học Vấn ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))*: Đồng bộ toàn bộ icon tiêu đề của 14 khóa học & chứng chỉ ở cả chế độ lưới (Grid Card) và chế độ xem chi tiết sang dạng Icon Pill capsule (`rounded-full border backdrop-blur-sm shadow-2xs`), mang màu sắc nhận diện đặc trưng của từng khóa học.
- **2. Kiểm Thử Hệ Thống & Trạng Thái Hoạt Động**:
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**.
  - Next.js Dev Server phản hồi **HTTP 200 OK** tại `http://localhost:3001` (Thời gian biên dịch: 15.1s, 1821 modules).
  - Bảo toàn 100% dữ liệu, không ảnh hưởng đến bất kỳ cấu trúc logic hiện có.

---

## [3.82.0] - 2026-10-26
### Nâng Cấp Toàn Diện Trang Tùy Biến Hình Nền: Tự Động Đặt Tên Thông Minh, Hợp Nhất Gradient Studio, Gom Nút Tùy Chỉnh & Sửa Lỗi Hiển Thị Triệt Để (CSS, CodePen, Video, Hình Ảnh)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx), [`wallpaperStorage.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/wallpaperStorage.ts), [`BackgroundLayer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/BackgroundLayer.tsx), [`page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
  - **Tự động đặt tên thông minh khi tạo hình nền (`generateAutoWallpaperName`)**:
    - Khi dán URL, chọn file hoặc đổi loại phương tiện, hệ thống tự động nhận diện và sinh tên trực quan theo ngữ cảnh: *"Video Nghệ Thuật N"*, *"Ảnh Nền Sắc Nét N"*, *"CodePen Nghệ Thuật N"*, *"Nền Gradient Tinh Tế N"*, *"Mã Nền CSS Động N"*.
    - Bổ sung nút tiện ích "🔄 Tên Auto" trong form thêm hình nền để người dùng tạo nhanh tên ngẫu nhiên mà không cần gõ phím.
  - **Hợp nhất Gradient Studio vào chung khung thêm hình nền**:
    - Gộp toàn bộ bộ công cụ Gradient Studio trước đây vào chung một modal Glass UI (`isAddingOpen`) với 2 tab chuyển đổi mượt mà:
      - *Tab 1: "🔗 Dán Link / Tải Tệp"*: Nhận diện tự động link ảnh, tệp mp4/webm, CodePen URL và mã Raw CSS.
      - *Tab 2: "🎨 Tạo Nền Gradient"*: Bộ studio trực quan đầy đủ tính năng (Linear, Radial, Conic, Mesh Gradient, Điều chỉnh góc quay 360°, Thêm/bớt điểm dừng màu Color Stops, Chia sẻ Preset qua mã ngắn gọn HTG1 hoặc chuỗi JSON, Quét mã QR).
  - **Gom toàn bộ tùy chỉnh vào 1 nút duy nhất trên thanh điều khiển**:
    - Gom các nút phân tán trước đây (Trình chiếu tự động, Zen mode, Bộ lọc làm mờ) thành 1 nút nổi bật: **"Tùy Chỉnh Hình Nền"** kèm hiệu ứng viền ánh sáng và badge chỉ báo trạng thái kích hoạt.
    - Khi bấm nút, một Drawer/Bảng điều khiển Glass UI tinh gọn hiển thị với 3 tab chức năng:
      1. *Trình Chiếu Tự Động*: Bật/tắt slideshow, cấu hình khoảng thời gian chuyển đổi (5s–120s), chọn chế độ ngẫu nhiên/tuần tự, thanh đếm ngược tiến trình trực quan.
      2. *Độ Tối Mờ Nền*: 2 thanh trượt điều chỉnh real-time Độ Mờ (Blur 0px–20px) và Độ Tối Lớp Phủ (Scrim Dimmer 0%–80%) với chế độ xem thử ngay lập tức.
      3. *Zen Mode*: Chế độ tập trung giúp ẩn bớt thanh công cụ để trải nghiệm trọn vẹn vẻ đẹp của hình nền.
  - **Sửa chữa triệt để lỗi hiển thị của cả 4 loại hình nền**:
    - *Mã CSS / Raw CSS*: Bổ sung cơ chế dynamic `<style>` block với selector `.hungthai-raw-css-bg` trong [`BackgroundLayer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/BackgroundLayer.tsx), giải quyết triệt để vấn đề CSS đa dòng, nesting SCSS/LESS (`&::before/after`), và hiệu ứng `@keyframes` chuyển động phức tạp.
    - *CodePen Live Animation*: Thêm type `'codepen'` vào hệ thống, tự động chuẩn hóa URL embed (`normalizeCodepenUrl`), nhúng thẻ `<iframe>` toàn màn hình với `pointer-events-none` và `z-0`, hỗ trợ tương tác mượt mà không xung đột giao diện.
    - *Video động*: Khắc phục dứt điểm lỗi gán link `.mp4` vào thuộc tính CSS `backgroundImage: url(...)` (vốn là cú pháp không hợp lệ). Chuyển hoàn toàn sang render bằng thẻ `<video autoPlay loop muted playsInline className="w-full h-full object-cover">` trong cả thẻ thumbnail lẫn hình nền toàn trang.
    - *Hình ảnh*: Tối ưu hiển thị `<img>` với `object-cover`, tích hợp bộ xử lý `onError` tự động chuyển đổi sang background gradient dự phòng nếu URL bị hỏng hoặc lỗi CORS.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc của kho hình nền mặc định và các cấu hình lưu trữ localStorage của người dùng.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK** (Status 200, Content Length: 78735).

---

## [3.81.0] - 2026-10-26
### Tích Hợp Hiệu Ứng Grid Card Expansion Transition: Thẻ Mở Rộng Toàn Bộ Lưới 3 Cột × 2 Hàng Không Gian Lĩnh Vực
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - **Bố cục ban đầu chuẩn CSS Grid 3 cột × 2 hàng**:
    - Hiển thị 6 thẻ theo dạng CSS Grid 3 cột × 2 hàng (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-[15px]`), khoảng cách đồng nhất, vừa khít container nội dung chính.
  - **Hiệu ứng Grid Card Expansion Transition (Framer Motion Shared Layout)**:
    - Khi click vào bất kỳ thẻ nào, thẻ được chọn nở rộng mượt mà (`duration: 0.55s`, `ease: [0.25, 1, 0.5, 1]`) từ tọa độ và kích thước ban đầu để chiếm trọn vẹn 100% diện tích của toàn bộ 6 thẻ trong lưới.
    - Không mở rộng vượt khỏi container cha, không che khuất HeroBanner phía trên và không đè lên thanh điều hướng phía dưới. Hoàn toàn không dùng modal popup hay chuyển trang.
    - Đồng bộ `layoutId` đa cấp: `domain-card-${id}`, `domain-icon-${id}`, `domain-title-${id}`, và `domain-illustration-${id}` giúp tiêu đề, icon và mô hình 3D lướt chuyển liên tục, không hề bị giật hoặc nhảy layout.
  - **Nội dung sau khi mở rộng & Điều hướng đóng mượt mà**:
    - Trình bày trọn vẹn: Định hướng chiến lược, mô tả điều hành, 3D Illustration, logo đối tác tiêu biểu, 3 trụ cột vận hành (Vai trò, Đội ngũ, Công nghệ) và 4 chỉ số KPI thành tựu cốt lõi.
    - Bổ sung nút quay lại "Quay lại 6 lĩnh vực" và nút đóng "✕", hỗ trợ phím `Escape` (A11y keyboard navigation).
    - Khi đóng, thẻ thu nhỏ trở về đúng vị trí và kích thước ô thẻ ban đầu trong lưới bằng hiệu ứng chuyển động ngược mượt mà.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc của 6 lĩnh vực, các chỉ số thành tựu, đối tác và thuyết minh âm thanh AI 15s.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.80.0] - 2026-10-26
### Nâng Cấp Thẻ Học Vấn: Bỏ Lớp Phủ Màu Nền Lộ Rõ Hình Nền Banner Khóa Học & Chuyển Màu Thành Viền Thẻ Nổi Bật
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - **Bỏ lớp phủ màu nền để lộ rõ hình nền banner khóa học**:
    - *Header thẻ*: Loại bỏ lớp phủ gradient màu đặc (`linear-gradient(to bottom left, ${grad.c1}, ${grad.c2})`), bỏ hiệu ứng `mix-blend-overlay opacity-30`. Hình nền banner khóa học ([`getEducationBannerUrl`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx)) hiển thị với `opacity-100` sáng rõ nét, chân thực 100%.
    - Bổ sung lớp phủ scrim siêu nhẹ ở mép thẻ để giữ cho các huy hiệu "Chứng chỉ" và "Năm 2024" luôn dễ đọc.
    - *Thân thẻ & Thẻ chi tiết*: Bỏ nền màu đục `bg-white dark:bg-slate-900`, chuyển sang nền kính trong suốt thanh thoát `bg-white/70 dark:bg-slate-900/70 backdrop-blur-md`, cho phép nhìn xuyên qua thấy được không gian nền tổng thể.
  - **Chuyển màu chủ đạo thành viền cho thẻ (Accent Border)**:
    - Loại bỏ viền trắng/xám đục thông thường (`border-white dark:border-slate-800`), thay thế bằng viền dày dặn `border-[2.5px]` mang trực tiếp màu sắc thương hiệu của từng khóa học (`borderColor: grad.c1`).
    - Tích hợp hiệu ứng đổ bóng hào quang viền đồng màu `boxShadow: 0 8px 24px -4px ${grad.c1}28`, nâng cao độ nhận diện và vẻ đẹp công nghệ cao cấp.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu 14 khóa học & chứng chỉ chuyên ngành.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.79.0] - 2026-10-26
### Khôi Phục Định Dạng Mặc Định Tiêu Đề & Câu Nói Hay Trong HeroBanner, Nâng Cấp Tương Phản Sắc Nét Ở Cả Giao Diện Sáng & Tối
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - **Khôi phục định dạng tiêu đề về mặc định**:
    - Hàm `formatBannerTitle` loại bỏ logic ép kiểu chữ thường (lowercase), giữ nguyên 100% cách viết hoa/thường nguyên bản và các danh xưng, từ viết tắt chuyên môn do từng trang truyền vào.
  - **Khôi phục định dạng câu nói hay (Quote) về mặc định**:
    - Loại bỏ font chữ thư pháp `'Italianno'` (dễ gây lỗi dấu tiếng Việt và khó đọc), chuyển sang sử dụng font mặc định chuẩn hệ thống Google Font "Play" (`font-play italic font-bold`).
    - Màu sắc hiển thị vàng kim rực rỡ `text-amber-200 dark:text-yellow-200`, đổ bóng tương phản cao `textShadow: 0 2px 8px rgba(0,0,0,0.95), 0 0 12px rgba(250,204,21,0.4)`.
  - **Nâng cấp độ rõ nét tương phản cao ở cả giao diện Sáng và Tối (Crystal-Clear Contrast)**:
    - Bổ sung khối bảo vệ kính mờ (Background Scrim): `px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl bg-black/40 dark:bg-black/60 backdrop-blur-md border border-white/15 dark:border-white/10 shadow-md` bao quanh toàn bộ Tiêu đề và Câu nói hay.
    - Tăng cường lớp phủ chuyển sắc kép toàn Banner (`from-black/60 via-black/35 to-black/50 dark:from-black/75 dark:via-black/50 dark:to-black/65`), đảm bảo tiêu đề và câu nói hay luôn hiển thị sắc nét 100%, không bao giờ bị chìm vào video/ảnh nền ở cả Light Mode và Dark Mode.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% nội dung tiêu đề và câu trích dẫn của tất cả các trang.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.78.0] - 2026-10-26
### Cập Nhật Mô Tả Thẻ Dịch Vụ: "Kết Nối Người Dùng, Xây Dựng Hạ Tầng Số, Đem Lại Giá Trị Bền Vững Cho Cộng Đồng"
- **1. Phân Tích & Tinh Chỉnh Dữ Liệu ([`domains.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/domains.ts))**:
  - Cập nhật trường định hướng và mô tả cốt lõi (`orientationVi` & `descVi`) của thẻ **Dịch Vụ Viễn Thông (Domain 01)**:
    - *Mô tả mới*: `“Kết nối người dùng, xây dựng hạ tầng số, đem lại giá trị bền vững cho cộng đồng.”`
    - Đồng bộ hiển thị trực tiếp lên toàn bộ các dạng hiển thị của thẻ: Grid Card, CodePen Bento Card, cũng như tóm tắt năng lực trong [`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx).
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% các dữ liệu liên quan khác (chỉ số SLA, CSAT 99%, đối tác MobiFone/V247, đội ngũ 130 nhân sự).
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.77.0] - 2026-10-26
### Tối Ưu Hóa Giao Diện & Bố Cục Trang Giới Thiệu Bento Grid (8 Ô - 3 Hàng)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Phân cấp thị giác & Trải nghiệm đọc (Visual Hierarchy & Readability)**:
    - *Row 1 - Item 1 (Hero Bento Banner)*: Tăng cường tỷ lệ khung hình chuẩn (`min-h-[280px] sm:min-h-[300px]`), lớp video mờ hòa sắc điện ảnh `mix-blend-luminosity opacity-40 hover:opacity-50 transition-opacity`, tiêu đề font Play `Unleash CX Excellence` to rõ nét, badge chào mừng kính mờ và nút Call-to-Action tương tác video mượt mà.
    - *Row 1 - Item 2 (4 Dấu Ấn Năng Lực)*: Tinh chỉnh bố cục lưới 2x2 nút con cân xứng hoàn hảo, typography số liệu to đậm font Play (`text-xl font-black`), mỗi ô nhỏ có hover glow chuyển động và âm thanh haptic tương tác (`SoundEngine.playPop()`).
    - *Row 2 - Item 3 (Địa Lý & Cư Trú)*: Khung bản đồ Google Maps nâng cấp bo góc mềm mại, 2 nút toggle "Tạm trú Q7" và "Cư trú Mỹ Tho" dạng Glass Pill tương phản cao, dễ tương tác trên cả di động và máy tính.
    - *Row 2 - Item 4 (Hồ Sơ Chuyên Gia)*: Nâng cấp dải avatar 3 lớp cao cấp (Nguyễn Hùng Thái với đèn xanh online, Trợ lý AI Tí Chuột, Huy hiệu Bảo chứng ShieldCheck), badge thông tin Canh Thân 1980 nổi bật.
    - *Row 2 - Item 5 (01 • HIỆU QUẢ)*: Gradient vàng cam rực rỡ, icon `Zap` to góc nền kết hợp icon nổi, mô tả cam kết SLA/KPI vượt chuẩn ngành.
    - *Row 3 - Item 6 (02 • NHÂN VĂN)*: Gradient hồng tím với đốm sáng blur vàng nghệ thuật, icon `Heart` vàng rực, tiêu đề gradient kim cương thấu cảm.
    - *Row 3 - Item 7 (Hành Trình Sự Nghiệp)*: Tinh chỉnh đường timeline đứt khúc gradient rực rỡ với các chấm LED phát sáng (Blue, Cyan, Purple, Pink) kết nối 4 mốc quan trọng (2003, 2013, 2018, 2026+).
    - *Row 3 - Item 8 (03 • BỀN VỮNG)*: Gradient xanh chàm - tím thạch anh, 2 đốm sáng blur vàng & hồng đối xứng, icon `Award` vàng kim loại, lan tỏa triết lý phụng sự dài hạn.
  - **Đồng bộ hóa Modal Focus**: Toàn bộ 8 thẻ Bento đều được trang bị nút Phóng to kính mờ (`Maximize2`) góc trên bên phải, hỗ trợ nhấp đúp hoặc bấm để mở rộng xem chi tiết toàn màn hình.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc: Video Intro, số liệu năng lực, địa lý cư trú 68km, nhân khẩu học và 3 trụ cột chiến lược.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.76.0] - 2026-10-26
### Tái Cấu Trúc Bento View Giới Thiệu (1 Trang): Tích Hợp Chính Xác 100% Cấu Trúc Bento Grid 3 Hàng Kèm Creative Third Row
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Chuyển đổi sang cấu trúc lưới phẳng Bento 3 Cột (`grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5`)**:
    - *Row 1 - Item 1 (`md:col-span-2`)*: Hero Bento Banner lớn với gradient tím/indigo (`from-purple-600 to-indigo-800`), tích hợp video nền Scena AI, tiêu đề lớn `Unleash CX Excellence`, phụ đề và nút Call-To-Action dạng viên nang kèm mũi tên `arrow-right`.
    - *Row 1 - Item 2 (`col-span-1`)*: Quick Access dạng khối xám đậm (`bg-gray-800 dark:bg-slate-900`), bên trong chia lưới 2x2 nút con (22+ Năm kinh nghiệm, 130+ Nhân sự quản lý, 85% AI CRM Bot, 98% CSAT hài lòng).
    - *Row 2 - Item 3 (`col-span-1`)*: Feature Spotlight với gradient xanh lá (`from-green-500 to-emerald-700`), ảnh/bản đồ Google Maps mini cover phía trên kèm bộ chuyển tab Tạm trú Q7 / Cư trú Mỹ Tho.
    - *Row 2 - Item 4 (`col-span-1`)*: Community Showcase dạng xám đậm (`bg-gray-800 dark:bg-slate-900`) với dải avatar tròn (Nguyễn Hùng Thái, Tí Chuột AI, CX Shield) và nội dung nhân khẩu học.
    - *Row 2 - Item 5 (`col-span-1`)*: Lightning Fast với gradient vàng/cam rực rỡ (`from-yellow-400 to-orange-600 text-gray-950`), icon to `<Zap className="w-12 h-12" />`, thể hiện Trụ cột 01 • HIỆU QUẢ.
    - *Row 3 - Item 6 (`col-span-1`)*: Extensive Docs sáng tạo với gradient hồng/tím (`from-pink-500 to-purple-600`), đốm sáng blur vàng mờ ảo góc trên phải, icon to `<Heart className="w-12 h-12 text-yellow-300" />` và tiêu đề Gradient Text, thể hiện Trụ cột 02 • NHÂN VĂN.
    - *Row 3 - Item 7 (`col-span-1`)*: Event Timeline dạng xám đậm với lớp phủ gradient chìm xanh-tím (`opacity-20`), thể hiện 4 mốc hành trình sự nghiệp với kết nối ngang dot-line tinh tế (2003 MobiFone → 2013 VED → 2018 MoMo → 2026+ CX Director).
    - *Row 3 - Item 8 (`col-span-1`)*: Achievements với gradient xanh/indigo (`from-blue-600 to-indigo-800`), 2 đốm sáng blur vàng và hồng đối xứng 2 góc, icon to `<Award className="w-12 h-12 text-yellow-300" />` và tiêu đề Gradient Text, thể hiện Trụ cột 03 • BỀN VỮNG & Triết lý phụng sự CX.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu thực tế: Profile, video tương tác, 4 chỉ số thực chiến, bản đồ cư trú Q7/Mỹ Tho, 3 trụ cột Hiệu Quả - Nhân Văn - Bền Vững và các mốc thời gian 22 năm.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.75.0] - 2026-10-26
### Nâng Cấp Trang Kinh Nghiệm: Timeline Đường Đứt Khúc, Bỏ Tab Phát Triển Sự Nghiệp, Cuộn Lướt Từng Logo, Sản Phẩm Chỉ Để Logo, Bổ Sung Icon Vị Trí & Số Lượng Quản Lý
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - **Chuyển Timeline thành đường nét đứt (Dashed Timeline Lines)**:
    - Trục kết nối ngang giữa các mốc logo (`TIER 2`) được chuyển đổi từ đường liền khối sang đường đứt khúc thanh thoát (`border-t-[3px] border-dashed`), đồng bộ màu sắc thương hiệu của từng công ty.
    - Cuống liên kết dọc (`Vertical stem` ở `TIER 1`) từ huy hiệu năm xuống logo cũng chuyển sang nét đứt (`border-l-[2px] border-dashed`), tạo hiệu ứng sơ đồ infographic đồ họa kỹ thuật tinh tế.
  - **Xóa bỏ tab "Phát triển sự nghiệp"**:
    - Loại bỏ nút tab chuyển đổi "Phát triển sự nghiệp" khỏi thanh điều khiển trên Hero Banner, tối ưu hóa giao diện tập trung toàn bộ chiều sâu vào Lịch sử công tác và Timeline tương tác.
  - **Nâng cấp tính năng nút Scroll lướt qua từng logo (Step-by-Step Logo Navigation)**:
    - Cặp nút điều hướng cuộn (mũi tên trên thanh công cụ và 2 nút Floating bên sườn) được tích hợp hàm `handleScrollNextLogo` và `handleScrollPrevLogo`.
    - Khi bấm cuộn, hệ thống lướt chuyển mượt mà qua từng logo một (`2003 → 2007 → 2011 → 2013 → 2016 → 2018 → 2023 → 2026+`), tự động highlight logo được chọn và tự động trượt trang timeline khi vượt qua ngưỡng 4 đối tượng.
    - Bổ sung huy hiệu theo dõi trạng thái trực tiếp: `Logo X/8 · [Tên Công Ty]` với chấm LED phát sáng.
  - **Sản phẩm chỉ hiển thị logo, không để tên**:
    - Khối "SẢN PHẨM TIÊU BIỂU" trên các thẻ kinh nghiệm đã loại bỏ hoàn toàn phần text tên sản phẩm (`item.productSummary`), chỉ giữ lại các biểu trưng logo với kích thước mở rộng (`w-7 h-7 sm:w-8 sm:h-8`), bo góc `rounded-xl`, bóng đổ nhẹ và hover scale 1.15.
    - Dải thương hiệu ở chân banner chi tiết công tác cũng chuyển sang định dạng chỉ hiển thị logo.
  - **Thêm icon trước vị trí & Hiển thị số lượng nhân viên quản lý**:
    - Bổ sung biểu tượng `<Briefcase className="w-3 h-3" />` trực tiếp trước chức danh/vị trí đảm nhiệm trên cả thẻ Timeline lẫn thẻ chi tiết công việc `JobCard`.
    - Tích hợp huy hiệu số lượng nhân viên quản lý chuẩn xác (`Quản lý: 12 Nhân sự`, `Quản lý: 130 Nhân sự`, `Quản lý: 60 Nhân sự`,...) kèm biểu tượng `<Users className="w-2.5 h-2.5" />` nổi bật, mang lại dữ liệu năng lực lãnh đạo trực quan cho nhà tuyển dụng.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc trong [`experience.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/experience.ts).
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.74.0] - 2026-10-26
### Nâng Cấp Thẻ Học Vấn & Chứng Chỉ: Di Dời Biểu Tượng Trước Tiêu Đề, Xóa Mã 5.1, Thêm "Năm", Tối Ưu Tương Tác Nhấp Thẻ & Bo Tròn Nền Màu Thẻ Chi Tiết
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - **Chuyển icon xuống trước tiêu đề khóa học**:
    - Loại bỏ khung tròn lớn cô lập ở giữa `card-header`, hạ chiều cao header xuống tỷ lệ vàng tinh tế (`h-28 sm:h-32`) giữ trọn vẹn đường cong khuyết hữu cơ CodePen.
    - Đặt biểu tượng vector (`<WebIcon name={meta.icon} />`) trực tiếp phía trước tiêu đề khóa học trong `card-content`, kế thừa đồng màu sắc thương hiệu với tiêu đề (`style={{ color: grad.c1 }}`), tuân thủ nghiêm ngặt Card Presentation System.
  - **Xóa bỏ chữ số 5.1 (mã `book.code`) trên toàn bộ thẻ học vấn**:
    - Loại bỏ hoàn toàn badge hiển thị mã số `5.1` (và các mã tương tự `5.2`, `5.3`,...) ở góc trên phải của thẻ ngoài.
    - Xóa badge mã ở đầu thanh Header Bar của thẻ chi tiết `selectedBookDetail`.
    - Thay thế chỉ số "Mã khóa học" ở khối 4 Metrics thành chỉ số "Trạng thái: Đã chứng thực / Tốt nghiệp chính quy".
    - Xóa tiền tố mã số trong tiêu đề phóng to bằng cấp (Lightbox Zoom).
  - **Thêm chữ "Năm " trước số năm đào tạo**:
    - Cập nhật hiển thị thời gian trên toàn bộ các thẻ từ `{book.year}` thành `Năm {book.year}` (ví dụ: `Năm 2024`, `Năm 2022`,...).
  - **Xóa nút "XEM CHI TIẾT" & Cho phép nhấp trực tiếp vào thẻ**:
    - Loại bỏ nút bấm riêng biệt `.card-btn` ở chân thẻ ngoài giúp không gian nội dung thông thoáng, chữ tóm tắt và chips kỹ năng hiển thị rõ ràng hơn.
    - Toàn bộ thẻ `motion.article` kích hoạt `onClick={() => setSelectedBookDetail(book)}` kèm hiệu ứng hover nổi bật (`hover:scale-[1.03] hover:-translate-y-1.5`) và chỉ dẫn tương tác tinh tế ở đáy thẻ.
  - **Thẻ chi tiết bo cong 4 góc & hòa sắc nền theo màu thẻ bên ngoài**:
    - Bo cong 4 góc đồng bộ với bán kính mềm mại `rounded-[24px]`.
    - Thẻ chi tiết kế thừa trực tiếp cặp mã màu gradient của thẻ bên ngoài (`EDUCATION_CODEPEN_GRADIENTS[book.id]`), bổ sung lớp phủ kính mờ `opacity-15 dark:opacity-20` và 2 quả cầu ánh sáng ambient theo cặp màu đặc trưng của từng khóa học, đảm bảo tính thẩm mỹ cao cấp, độ trong trẻo và tương phản sắc nét ở cả Light Mode lẫn Dark Mode.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc trong [`education.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/education.ts).
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.73.0] - 2026-10-26
### Nâng Cấp Bảng Điều Khiển Thư Ngỏ: Chuyển Đổi Thanh Điều Hướng Thành Nút Nổi Thu Gọn & Tự Động Bung Mở Đầy Đủ Khi Rê Chuột (Hover Expandable Floating Pill)
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Khắc phục thanh ngang chiếm dụng chiều cao**: Trước đây, thanh điều hướng `renderTopNavigationBar` dàn ngang cố định ở đầu trang, chiếm một hàng dọc lớn và đẩy nội dung các slide xuống dưới.
  - **Chuyển thành Nút nổi Thu gọn (Floating Expandable Pill)**:
    - Đặt nổi cố định ở góc trên bên phải trang Thư Ngỏ (`absolute top-2 right-2 sm:right-3.5 z-40`).
    - *Trạng thái thu gọn mặc định*: Hiển thị dưới dạng một Pill kính mờ sang trọng (`rounded-full`, `h-9`, viền phát sáng nhẹ), hiển thị icon động + nhãn chế độ hiện tại (`Thuyết Trình (Slide 1/4)` hoặc `Xem 1 Trang`), kèm trạng thái đọc AI (nếu đang phát) và biểu tượng mũi tên mở rộng.
    - *Trạng thái bung mở khi rê chuột (Over Mouse)*: Khi người dùng rê chuột qua (`onMouseEnter`) hoặc chạm vào, khối nổi tự động bung nở mượt mà sang trái (`animate-fadeIn`, `backdrop-blur-2xl`), hiển thị trọn vẹn 100% tất cả các nút chức năng:
      1. Nút `Xem 1 Trang`
      2. Nút `Thuyết Trình`
      3. Vạch ngăn phân đoạn
      4. Nút `Nghe Thư Ngỏ AI` (tích hợp visualizer sóng âm)
      5. Nút `Cá nhân hóa Quý Công ty` (hiển thị `Gửi: ${companyDisplay}`)
      6. Nút `Tải PDF Chuẩn A4`
      7. Nút `Lưu mặc định`
      8. Nút thu gọn nhanh `x`
    - *Tự động thu gọn khi rời chuột*: Khi người dùng di chuyển chuột ra ngoài (`onMouseLeave`) hoặc bấm ra ngoài (`handleClickOutside`), thanh nổi tự động co lại trạng thái pill nhỏ gọn, trả lại 100% không gian thoáng đãng cho slide và nội dung thư.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu văn bản, chức năng chuyển đổi chế độ, thuyết minh AI, xuất PDF và cá nhân hóa tên Quý Công ty.
  - Hoạt động trơn tru trên cả Desktop (hover) lẫn Mobile/Tablet (tap/click toggle).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.72.0] - 2026-10-26
### Tái Cấu Trúc Trang Thư Ngỏ: Tích Hợp Hero Banner Vào Trực Tiếp Thẻ Thông Điệp Hợp Tác
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Khắc phục tình trạng chia cắt 2 hộp độc lập**: Trước đây ở Slide 1 (chế độ Thuyết Trình), khối `<HeroBanner>` nằm bên ngoài thẻ `<div id="card-main-letter-content">`, tạo thành 2 khung viền kính rời rạc xếp chồng lên nhau.
  - **Chuyển Banner vào bên trong thẻ "Thông Điệp Hợp Tác"**:
    - Đưa toàn bộ thành phần `<HeroBanner>` (video thuyết trình Scena AI, badge "Thư ngỏ", tiêu đề "Thư Ngỏ Đối Tác", câu danh ngôn chiến lược và tác giả) vào bên trong thẻ chính `card-main-letter-content`.
    - Thẻ `card-main-letter-content` giờ đây là khối container duy nhất bao bọc toàn bộ Slide 1 với chiều cao co giãn tối ưu (`w-full h-full flex-1 min-h-0 flex flex-col justify-between`).
    - Bố cục bên trong thẻ được sắp xếp chuẩn mực theo visual hierarchy:
      1. Tiêu đề chính thẻ: `<AnimatedCardTitle title="Thông Điệp Hợp Tác" iconName="book" colorPreset="emerald" />`
      2. Hero Banner trực quan tích hợp video thuyết trình nghệ thuật và câu nói triết lý.
      3. Lời chào trang trọng (`callout-salutation`) kèm nút tùy biến tên Quý Công ty đối tác.
      4. 2 Khối Bento đa sắc màu: Bề dày kinh nghiệm 22 năm (`bento-experience-intro`) & Thông điệp đồng hành (`bento-commitment`).
      5. 3 Trụ cột vận hành cốt lõi: Quy trình, Con người, Công nghệ (`bento-three-pillars`).
      6. Phương châm phụng sự chân thành (`quote-banner-slide-1`).
  - **Responsive & Cuộn Mượt Mà**:
    - Bổ sung `overflow-y-auto lg:overflow-hidden glass-scrollbar` cho container nội dung thẻ, giúp trên màn hình Desktop lớn các thành phần tự động co giãn vừa vặn (`justify-between`), trong khi trên màn hình laptop nhỏ, tablet hoặc mobile người dùng có thể cuộn xem êm ái mà không bị che khuất văn bản.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% nội dung văn bản, đường dẫn video, câu danh ngôn, các mốc thời gian và logic đồng bộ thuyết minh AI Karaoke / Scena AI Cues.
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.71.0] - 2026-10-26
### Nâng Cấp Hệ Thống Hình Nền: Kiểm Tra Tính Năng Đặt Làm Hình Nền Dạng CSS & Phân Loại Riêng Nhóm "Nền Mờ" (Blurred)
- **1. Kiểm Tra & Tối Ưu Tính Năng Đặt Hình Nền Dạng CSS ([`wallpaperStorage.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/wallpaperStorage.ts), [`page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx), [`WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx))**:
  - **Khắc phục triệt để lỗi parse selector CSS block**: Nâng cấp hàm `parseCssToReactStyle` để trích xuất đầy đủ các khai báo bên trong các selector lồng nhau như `body { ... }`, `.wallpaper { ... }`, `:root { ... }` và các pseudo-elements (`&::before`, `&::after`), không còn bị xóa trắng toàn bộ nội dung do regex cũ.
  - **Mở rộng các thuộc tính CSS được phép**: Bổ sung hỗ trợ đầy đủ cho `backdrop-filter` (`backdropFilter`), `-webkit-backdrop-filter`, `box-shadow`, `filter`, `background-blend-mode`, `opacity`, `mix-blend-mode`.
  - **Khử xung đột shorthand/longhand React CSS**: Tự động chuyển đổi và tách biệt `background` và `backgroundImage` / `backgroundColor` / `backgroundSize` giúp React không báo lỗi và hình nền gradient hiển thị trọn vẹn, không bị đen màn hình.
  - **Lưu trữ & Áp dụng bền vững**: Tích hợp lưu vĩnh viễn vào `localStorage` (`hungthai_active_wallpaper_id`, `hungthai_default_wallpaper_id`) và IndexedDB, không dùng cookie tạm thời, duy trì chính xác hình nền khi tải lại trang web.
  - **Hỗ trợ className mở rộng**: Đồng bộ `wp.className` khi kích hoạt hình nền CSS hoặc gradient trong `applyWallpaperOption`.
- **2. Phân Loại Riêng Nhóm Hình Nền Mờ (Blurred / Frosted / Bokeh / Mesh) ([`WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx))**:
  - **Hàm nhận diện thông minh `isBlurredWallpaper(wp)`**: Phân tích tự động dựa trên:
    - ID danh mục đặc thù: `aurora`, `preset-aurora-mesh`, `preset-pastel-day`, `css-aurora-borealis`, `css-sunset-mesh`, `css-bryce-4color-gradient`, `css-deep-space`, các preset chứa từ khóa `blur`, `mesh`, `bokeh`, `frosted`.
    - Từ khóa tên gọi: `mờ`, `blur`, `bokeh`, `mesh`, `cực quang`, `aurora`, `frosted`, `khói`, `sương`, `pastel`, `lăng kính`, `tinh vân`.
    - Thuộc tính kỹ thuật: Các hình nền chứa `blur(`, `backdrop-filter`, cấu trúc đa lớp `radial-gradient(circle at ...)` (Mesh Gradient) hoặc class `aurora-bg`.
  - **Thêm Tab Bộ Lọc Riêng "🌫️ Nền Mờ"**: Bổ sung nút lọc `🌫️ Nền Mờ` tại thanh công cụ Banner Quản Lý Hình Nền, cho phép xem nhanh toàn bộ kho hình nền hiệu ứng mờ nghệ thuật.
  - **Huy Hiệu Trực Quan (Badge) Trên Thẻ**: Hiển thị badge nhận diện `🌫️ Nền Mờ` nổi bật trên từng thẻ hình nền thuộc nhóm này.
  - **Thông Báo Dynamic Island Mini (Pill Toast)**: Hiển thị tag `🌫️ Nền Mờ` khi chuyển đổi sang hình nền thuộc danh mục mờ.
- **3. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc trong [`wallpapers.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/wallpapers.ts) và [`importedWallpapers.json`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/importedWallpapers.json).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript compilation (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.70.0] - 2026-10-26
### Nâng Cấp Thẻ 3 Trụ Cột Vận Hành & 4 Dấu Ấn Năng Lực Trang Giới Thiệu: Tạo Hình Icon Nền Dưới Thẻ & Tối Ưu Bố Cục Fill Trọn Vẹn
- **1. Nâng Cấp Card 3.1: 3 Trụ Cột Vận Hành Chiến Lược ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Tạo hình icon nền chìm dưới thẻ (Watermark Icon)**:
    - Bổ sung biểu tượng chuyên ngành kích thước lớn (`w-14 h-14`), đặt chìm ở góc dưới bên phải mỗi thẻ với độ mờ tinh tế (`text-white/15 dark:text-white/10 pointer-events-none transform -rotate-12`).
    - Tương tác vi mô: Biểu tượng nền phóng to và xoay về 0 độ khi rê chuột (`group-hover/pillar:scale-110 group-hover/pillar:rotate-0`).
    - *Pillar 1 (Hiệu Quả)*: Icon `BarChart3` nền chìm, gradient Xanh Dương (Blue).
    - *Pillar 2 (Nhân Văn)*: Icon `Heart` nền chìm, gradient Đỏ Hồng (Rose/Pink).
    - *Pillar 3 (Bền Vững)*: Icon `Leaf` nền chìm, gradient Xanh Ngọc Lục Bảo (Emerald/Teal).
  - **Tối ưu nội dung thẻ fill trọn vẹn (Fuller Card Layout)**:
    - Hàng trên: Biểu tượng chính trong khung kính mờ phản quang `w-6 h-6 rounded-md bg-white/20 backdrop-blur-md` kết hợp huy hiệu số thứ tự `01`, `02`, `03`.
    - Hàng dưới: Tiêu đề in hoa đậm nét (`12.5px font-black font-play`), nhãn phụ định hướng (`Tối ưu & Kết quả`, `Đồng cảm & Thấu hiểu`, `Giá trị & Tin cậy`) kèm đoạn mô tả 2 dòng súc tích, lấp đầy hoàn toàn khoảng trống chiều dọc của thẻ.
- **2. Nâng Cấp Card 1.2: 4 Dấu Ấn Năng Lực Cốt Lõi ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Tạo hình icon nền chìm dưới thẻ**:
    - Thêm Watermark Icon (`Calendar`, `Building2`, `Bot`, `Heart`) kích thước `w-12 h-12` chìm nhẹ (`opacity-10`) ở góc dưới mỗi ô chỉ số.
  - **Nội dung thẻ fill trọn vẹn, mạnh mẽ**:
    - Tăng kích thước số liệu nổi bật lên `text-[20px] sm:text-[22px] font-black font-play leading-none`.
    - Gắn kết số liệu với đơn vị đo lường (`NĂM`, `MÔI TRƯỜNG`, `AI CRM`, `CSAT`) thẳng hàng chân đế (baseline alignment).
    - Bổ sung dòng tag định danh thực tế bên dưới (`Vận hành thực chiến`, `Tập đoàn đa quốc gia`, `Chuyển đổi số & Bot`, `Tỷ lệ hài lòng CSAT`) cùng chấm chỉ thị nhấp nháy chuyển động (`animate-pulse`).
- **3. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu gốc trong [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.69.0] - 2026-10-26
### Chuẩn Hóa Nhãn Tab Địa Lý Trang Giới Thiệu: Chuyển Đổi Q7 Thành "Tạm trú" & Mỹ Tho Thành "Cư trú"
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Khối đối tượng áp dụng**: Nhóm nút chuyển tab bản đồ tại Card 3.2 (Bản Đồ Địa Lý & Vị Trí Làm Việc) trên Bento Slide 3.
  - **Cập nhật nội dung hiển thị**:
    - Thay thế nhãn viết tắt `Q7` thành nhãn đầy đủ, chuyên nghiệp: **`Tạm trú`** (giữ nguyên trigger kích hoạt tab `tam_tru` và âm thanh micro-interaction `SoundEngine.playPop()`).
    - Thay thế nhãn `Mỹ Tho` thành nhãn chuẩn mực nhân sự: **`Cư trú`** (giữ nguyên trigger kích hoạt tab `cu_tru`).
    - Đồng bộ nhãn nút bấm trong Modal phóng to bản đồ: `Tạm trú (Q7)` & `Cư trú (Mỹ Tho)`.
  - **Nâng cao tính chuẩn mực & pháp lý trong hồ sơ ứng tuyển**:
    - Thể hiện rõ ràng tình trạng cư trú và tạm trú sẵn sàng cho công tác Onsite / Hybrid tại TP.HCM hoặc Tiền Giang, giúp nhà tuyển dụng và đối tác nắm bắt ngay lập tức trạng thái địa lý của chuyên gia.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu gốc trong [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.68.0] - 2026-10-26
### Đồng Bộ Kích Thước & Kiểu Dáng Thứ, Ngày Tháng Năm Hài Hòa Tuyệt Đối Với Card Thời Tiết
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`Clock.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Clock.tsx) & [`WeatherWidget.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/WeatherWidget.tsx))**:
  - **Khắc phục lỗi tỷ lệ font thu nhỏ (Scale Distortion)**:
    - Trước đây, thuộc tính `scale-[0.40] sm:scale-[0.48]` được áp dụng lên toàn bộ thẻ chứa cha, khiến văn bản Thứ và Ngày tháng bị co rút xuống chỉ còn ~5px (quá nhỏ, mất cân đối so với khối 32°C và đồng hồ số lật).
    - Tách biệt vùng thu phóng: Chỉ áp dụng `scale` cục bộ cho khối đồng hồ 3D Flip Clock (`.clock-wrap`), đưa khối thông tin Thứ, Ngày Tháng Năm ra ngoài luồng scale để hiển thị font chữ 1:1 sắc nét, rõ ràng.
  - **Chuẩn hóa kích thước & phân cấp thị giác hài hòa với Card thời tiết**:
    - **Thứ trong tuần (`dayOfWeek`)**: Nâng cấp từ `Thứ 2` sang định dạng chuẩn tiếng Việt `Thứ Hai`, `Thứ Ba`... Kích thước `text-[11px] sm:text-[11.5px] font-black`, tương thích 100% với dòng trạng thái thời tiết (`Nắng đẹp rực rỡ` - 11px font-black).
    - **Ngày tháng năm (`dateStr`)**: Bổ sung đầy đủ năm `YYYY` (`DD/MM/YYYY`, ví dụ: `26/10/2026`). Kích thước `text-[9.5px] sm:text-[10px] font-bold font-mono`, cân xứng hoàn hảo với dòng địa danh (`TP. Hồ Chí Minh` - 9.5px).
    - **Vách ngăn viền kính mờ (`borderLeft`)**: Viền ngăn cách mảnh tinh tế `1.5px solid` đồng bộ theo dải màu nhận diện của từng Theme (Kính sáng tím, Kính tối Neon cyan, Quang phổ xanh dương).
  - **Tối ưu hiển thị đa thiết bị**:
    - Hiển thị mượt mà trên cả Desktop và Tablet (`hidden md:flex`), căn giữa thẳng hàng theo trục dọc với khối thời tiết mà không gây tràn khung footer.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu gốc trong [`src/data/weather.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/weather.ts).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.67.0] - 2026-10-26
### Nâng Cấp Bố Cục Thẻ Dự Án: Chuẩn Hóa Lưới 2 Cột Rộng Rãi, Sang Trọng & Tối Ưu Tầm Nhìn
- **1. Chuyển Đổi Bố Cục Thẻ Dự Án Sang 2 Cột ([`GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**:
  - **Tối ưu hóa lưới hiển thị (`.u308-g`)**:
    - Chuyển đổi định dạng từ 3 cột hẹp (`repeat(3, minmax(0, 1fr))`) sang **2 cột rộng rãi cân đối (`repeat(2, minmax(0, 1fr))`)** trên cả màn hình Desktop (`min-width: 1024px`) và Tablet (`min-width: 640px`).
    - Khoảng cách (gap) giữa các thẻ được tinh chỉnh ở mức `1.35rem` (22px), tạo không gian thở thoáng đãng.
    - Trên màn hình di động nhỏ (`< 640px`), hệ thống tự động co giãn về 1 cột chuẩn Responsive.
  - **Nâng cao trải nghiệm thị giác & khả năng đọc nội dung**:
    - Mỗi thẻ dự án đạt độ rộng lý tưởng (~440px - 480px), giúp hình ảnh banner dự án (`aspect-ratio: 16 / 10.5`) hiển thị sắc nét, không bị che khuất chi tiết quan trọng.
    - Tiêu đề dự án (`cp-card-title`), phân loại nhóm và tiến độ (`100% Hoàn thành`) hiển thị liền mạch, hạn chế tối đa việc bị cắt bớt ký tự.
    - Đoạn tóm tắt mô tả STAR (`cp-card-desc`) có nhiều không gian hiển thị đầy đủ ngữ cảnh bài toán và giải pháp thực chiến.
    - Nút bấm *"Xem dự án →"* và huy hiệu chức danh (*Trưởng Dự Án*) được dàn hàng ngang cân đối, sang trọng.
  - **Cập nhật nhãn và tương tác điều khiển**:
    - Nhãn số lượng dự án hiển thị trạng thái chuẩn xác: `"{total} dự án • Lưới 2 cột"`.
    - Nút chuyển đổi View Mode (Lưới 2 cột vs Danh sách dọc) hoạt động mượt mà với hiệu ứng chuyển đổi trạng thái hình học FLIP Morph Animation.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu gốc của 21 dự án trong [`src/data/projects.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/projects.ts).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.66.0] - 2026-10-26
### Tinh Gọn Khối Khám Phá Trang Chủ: Ẩn Toàn Bộ Thanh Header & Khối Chi Tiết, Chỉ Hiển Thị Thẻ 01 EXECUTIVE HUB TỔNG QUAN & ĐIỀU HÀNH
- **1. Phân Tích & Tinh Chỉnh Bố Cục ([`HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx) & [`HomePages3DCarouselLeft.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HomePages3DCarouselLeft.tsx))**:
  - **Khối đối tượng áp dụng**: Khối `<div>` bao ngoài "Khám Phá Toàn Cảnh 14 Trang 3D CYLINDRICAL CAROUSEL ...".
  - **Thực hiện ẩn toàn bộ các thành phần rườm rà**:
    - Ẩn thanh Header: Tiêu đề "Khám Phá Toàn Cảnh 14 Trang", nhãn "3D Cylindrical Carousel • Trang 01/14" và nút Toggle Auto-Play.
    - Ẩn khung cuộn dọc và các nút mũi tên điều hướng Up / Down.
    - Ẩn khối chi tiết phía dưới: Đoạn mô tả vắn tắt, 2 điểm nổi bật, nút "Mở trang" và dãy 14 chấm tròn mini.
  - **Chỉ hiển thị duy nhất thẻ `01 EXECUTIVE HUB TỔNG QUAN & ĐIỀU HÀNH Trang Chủ`**:
    - Kích thước thẻ gọn gàng, tinh tế: `w-[270px] sm:w-[295px] md:w-[315px] h-[140px] sm:h-[150px]`.
    - Bo góc cong `rounded-[14px]`, viền kính mờ phản quang với màu nhận diện thương hiệu của Trang Chủ (`#0284c7`).
    - Giữ nguyên 100% dữ liệu số trang `01`, huy hiệu `EXECUTIVE HUB`, phân loại `TỔNG QUAN & ĐIỀU HÀNH`, tiêu đề `Trang Chủ`, tên đầy đủ `Trang Chủ Hùng Thái - Giới Thiệu, Năng Lực & Thành Tựu` và biểu tượng Home.
    - Giúp giải phóng toàn bộ không gian trung tâm và bên phải cho video nền AI giới thiệu phong thái chuyên gia.
  - **Trải nghiệm tương tác mượt mà**:
    - Nhấp chuột vào thẻ kích hoạt âm thanh phản hồi `SoundEngine.playTap()`.
    - Tự động mở Modal 3D Carousel toàn màn hình (`onOpenPagesCarousel`) cho phép xem đầy đủ cả 14 trang khi người dùng có nhu cầu khám phá sâu mà không làm vỡ bố cục trang chủ.
- **2. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu gốc trong [`src/data/pageShowcaseData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/pageShowcaseData.ts).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.65.0] - 2026-10-26
### Nâng Cấp Thẻ Học Vấn Theo Chuẩn CodePen Organic Wave & Gradient Pill Card
- **1. Phân Tích & Chuyển Đổi Thiết Kế Từ CodePen ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - **Khung thẻ `.card-wrap`**:
    - Bo góc cong ấn tượng `rounded-[24px]`, viền dày tinh tế `border-[3.5px] border-white/90 dark:border-slate-800/90`.
    - Đổ bóng đa lớp nổi khối 3D (`shadow-[0_10px_25px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.45)]`).
    - Hiệu ứng hover nhấc nổi mượt mà `hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300`.
  - **Phần đầu sóng khuyết bất đối xứng `.card-header`**:
    - Tái tạo chính xác đường cong đặc trưng CodePen `border-radius: 100% 0% 100% 0% / 0% 50% 50% 100%`.
    - Dải màu Gradient đa sắc phối hợp hài hòa: Flame Amber (`#f12711` -> `#f5af19`), Royal Purple (`#7F00FF` -> `#E100FF`), Indigo Sky (`#3f2b96` -> `#a8c0ff`), Emerald Mint (`#11998e` -> `#38ef7d`), Coral Orange (`#ff416c` -> `#ff4b2b`), Cyber Teal (`#00b09b` -> `#96c93d`), Sunset Rose (`#ee0979` -> `#ff6a00`), Electric Violet (`#8a2387` -> `#e94057`).
    - Lồng ghép ảnh bìa thực tế của chứng chỉ phủ mờ (`mix-blend-overlay opacity-30`) phía sau gradient, giúp lưu giữ ngữ cảnh thực của từng bằng cấp.
    - Icon trung tâm đặt trong khung tròn viền kính mờ `w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-xs border-2 border-white/40 shadow-lg flex items-center justify-center text-white`.
    - Huy hiệu thời gian và hình thức đào tạo được ghim nổi sang trọng ở góc trên.
  - **Nội dung thẻ `.card-content`**:
    - **Tiêu đề (`.card-title`)**: Viết hoa trang trọng, màu sắc chuyển sắc đồng bộ gradient nhận diện của từng khóa học, căn giữa sắc nét.
    - **Đơn vị đào tạo & lĩnh vực**: Thể hiện rõ nét với badge tinh xảo `bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300`.
    - **Tóm tắt mô tả (`.card-text`)**: Giới hạn 2 dòng súc tích `line-clamp-2`, dễ theo dõi trên màn hình nhỏ.
    - **Hệ thống Tags / Kỹ năng cốt lõi**: Thẻ chips thu gọn hiển thị các module và năng lực chính.
  - **Nút hành động `.card-btn`**:
    - Nút bấm dạng viên thuốc bo tròn hoàn toàn `rounded-full`, sử dụng dải màu gradient tương ứng của thẻ.
    - Hiệu ứng hover sáng rực rỡ, icon mũi tên mở rộng tương tác mở Modal chi tiết khóa học.
- **2. Bảo Toàn Dữ Liệu Tuyệt Đối & Tương Thích Giao Diện Sáng / Tối**:
  - Giữ nguyên 100% dữ liệu gốc trong [`src/data/education.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/education.ts).
  - Tương thích hoàn hảo cả hai chế độ **Giao diện Sáng (Light Glass)** và **Giao diện Tối (Dark Neon)**.
  - Đạt chuẩn Responsive trên Desktop, Tablet và Mobile.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server HTTP **200 OK**.

---

## [3.64.0] - 2026-10-26
### Rà Soát Toàn Diện Banner Các Trang: Chuẩn Hóa Hiển Thị Giao Diện Sáng & Tối, Bố Cục Tiêu Đề Góc Trái, Câu Nói Hay Góc Phải & Nhóm Nút Góc Phải Dưới Cùng
- **1. Bố Cục Chuẩn Mực Tỷ Lệ Vàng Cho Banner Tất Cả Các Trang ([`HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - **Tiêu đề nằm bên trên góc trái (Top-Left)**:
    - Biểu tượng trang (WebIcon) kết hợp hiệu ứng nhịp thở êm ái (`animate-banner-icon`) cùng tiêu đề chính (`displayTitle`), hiển thị trang trọng, thẳng hàng tại góc trên bên trái.
    - Màu sắc tiêu đề và biểu tượng đồng bộ 100% theo màu nhận diện thương hiệu của từng phân hệ.
  - **Câu nói hay nằm ở bên trên góc phải (Top-Right)**:
    - Đưa khối trích dẫn (`quote`) và tác giả (`quoteAuthor`) lên cùng hàng trên cùng, căn lề phải (`items-end text-right`).
    - Sử dụng font chữ nghệ thuật Ý `Italianno`, dải màu vàng hổ phách / vàng kim rực rỡ (`text-amber-300 dark:text-yellow-300`) kèm gạch chỉ viền gradient và chấm tròn sang trọng.
  - **Nhóm nút nằm dưới góc bên phải (Bottom-Right)**:
    - Toàn bộ nhóm nút điều khiển (`bottomControls` & `children`): bao gồm các nút chuyển tab, bộ lọc danh mục, nút chuyển đổi view mode (Luminous / Infographic), thanh trượt tỷ lệ và ô tìm kiếm được gom gọn gàng, căn lề phải tuyệt đối (`justify-end ml-auto`).
- **2. Khắc Phục Triệt Để Lỗi Hiển Thị Giữa Giao Diện Sáng & Giao Diện Tối**:
  - **Khắc phục lỗi ghi đè biến màu `--banner-theme-color`**: Loại bỏ biến inline hardcode cố định màu sáng, cho phép CSS Variables (`--banner-theme-color-light` / `--banner-theme-color-dark`) chuyển đổi mượt mà theo class `.dark` và `[data-theme="dark-neon"]`.
  - **Viền và độ nổi khối (Border & Shadows)**:
    - Khung banner: `border-slate-200/90 dark:border-white/15` tạo độ sắc nét, tương phản rõ rệt trên nền sáng, không còn hiện tượng viền trắng bị chìm mờ trên nền sáng.
    - Lớp phủ nền chuyển sắc hai chế độ (`bg-gradient-to-t from-black/35 via-black/10 to-black/25 dark:from-black/50 dark:via-black/15 dark:to-black/35`) giúp chữ và các chi tiết video luôn sáng nét 100%.
  - **Chuẩn hóa các nhóm nút trong từng trang**:
    - **Trang Học Vấn ([`EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**: Chuyển các nút danh mục về góc dưới bên phải (`justify-end ml-auto`), màu active ngọc lục bảo Emerald, chế độ sáng/tối đồng bộ `bg-white/90 dark:bg-slate-900/90`.
    - **Trang Lĩnh Vực ([`DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**: Căn chỉnh nhóm nút đổi chế độ `[🎴 Thẻ Lưới Luminous]` vs `[🔢 Infographic 3D Cover]`, slider tỷ lệ và các tab lĩnh vực về góc dưới bên phải (`justify-end ml-auto`).
    - **Trang Kinh Nghiệm ([`ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**: Đưa các tab Lịch sử công tác, Phát triển sự nghiệp, Nút Trình chiếu tự động và ô tìm kiếm về góc dưới bên phải (`justify-end ml-auto`), bổ sung đầy đủ style Dark Mode cho nút bấm và ô tìm kiếm (`dark:bg-slate-900/90 dark:border-white/15`).
    - **Trang Tử Vi ([`HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx))**: Đưa 4 tab Bát Trạch & Quản Trị, bộ Stepper chuyển slide và nút Thiền Định về góc dưới bên phải (`justify-end ml-auto`), chuẩn hóa viền và màu nền Sáng/Tối.
    - **Trang Tùy Biến Giao Diện ([`WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx))**: Nhóm viên thuốc lọc hình nền chuyển sang góc dưới bên phải (`justify-end ml-auto`), tối ưu tương phản cả nền Sáng và Tối.
    - **Trang Kỹ Năng ([`SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx)) & Kỷ Niệm ([`MemoriesView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/MemoriesView.tsx))**: Đảm bảo nhóm nút filter nằm gọn ở góc dưới bên phải, giữ nguyên cấu trúc chuẩn.
- **3. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Không làm thay đổi hay mất bất kỳ dữ liệu text, số liệu hay chức năng hiện có của các trang.
  - TypeScript type check (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev server phản hồi mã **HTTP 200 OK**.

---

## [3.63.0] - 2026-10-26
### Nâng Cấp Toàn Diện Bento View Trang Giới Thiệu: Bộ Lọc Đổi Màu Sắc, Âm Thanh Micro-Interactions, Thuyết Minh AI 3 Trụ Cột, Lật Thẻ Mini Lộ Trình & Focus Modal Toàn Màn Hình
- **1. Bộ Lọc Đổi Màu Sắc Chủ Đạo Bento (Bento Palette Theme Switcher)**:
  - Tích hợp dropdown chuyển đổi màu sắc Bento ngay góc phải thanh điều hướng (`Top Slide Navigation Bar`) tại [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx).
  - Cung cấp 4 bộ màu phong cách thời thượng:
    - **Pastel Sáng (Mặc định)**: Viền tím - chàm ngọc lam, vầng sáng mềm mại (`hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)]`).
    - **Cyber Neon**: Viền lục lam - xanh neon công nghệ, ánh sáng phát quang hiện đại (`hover:shadow-[0_10px_30px_rgba(6,182,212,0.25)]`).
    - **Royal Emerald**: Viền ngọc lục bảo hoàng gia, tông xanh lá - vàng kim phú quý (`hover:shadow-[0_10px_30px_rgba(16,185,129,0.22)]`).
    - **Rose Gold**: Viền vàng hồng quý phái, gradient ấm áp sang trọng (`hover:shadow-[0_10px_30px_rgba(244,63,94,0.22)]`).
  - Tự động lưu lựa chọn bộ màu vào `localStorage ('hungthai_bento_palette')` để duy trì nguyên vẹn ở các lần truy cập tiếp theo.
- **2. Âm Thanh Tương Tác Micro-Interactions Cho Card Bento**:
  - Nâng cấp bộ tạo âm `SoundEngine.playPop()` trong [`src/components/ui/SoundEngine.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/SoundEngine.ts) với dải tần sine wave êm dịu (480Hz -> 950Hz -> 420Hz).
  - Kích hoạt âm thanh pop micro-interaction mượt mà khi người dùng tương tác vào từng ô chỉ số thành tựu (22+ Năm, 8+ Môi trường, 24/7 AI CRM, 99% CSAT) hoặc khi chuyển đổi tab bản đồ Quận 7 / Mỹ Tho.
- **3. Thuyết Minh Giọng Đọc AI Trực Tiếp Cho 3 Trụ Cột Vận Hành**:
  - Bổ sung nút loa thuyết minh AI mini ngay trên header Card 3.1 (3 Trụ Cột Vận Hành Chiến Lược).
  - Tích hợp Web Speech API với cơ chế chọn lọc giọng đọc tiếng Việt mượt mà (`findBestVoice`), cho phép AI Trợ Lý Tí Chuột đọc truyền cảm bản tóm tắt thông điệp điều hành 22 năm:
    - *01. Hiệu Quả & Quy Trình tạo nền tảng vững chắc.*
    - *02. Nhân Văn & Con Người tạo giá trị thấu hiểu từ tâm.*
    - *03. Bền Vững & Công Nghệ tạo đòn bẩy đột phá AI CRM.*
  - Hiệu ứng animation xoay vòng biểu tượng loa và phát sáng dải gradient báo hiệu trạng thái thuyết minh trực quan.
- **4. Hiệu Ứng Lật Mặt Sau Mini Cho Card Nhân Khẩu Học (Flip Demographic Card)**:
  - Thêm nút lật mặt sau mini (`RotateCw`) trên Card 2.1.
  - Cho phép người dùng bấm lật giữa **6 thông tin cá nhân** (Giới tính, Dân tộc, Tình trạng, Sinh nhật, Tạm trú, Cư trú) và **Thẻ Lộ Trình Di Chuyển Q7 - Mỹ Tho**:
    - Khoảng cách: ~68 km qua Tuyến Cao tốc TP.HCM - Trung Lương.
    - Thời gian: 50 – 65 phút, lộ trình thông thoáng, xe đưa đón liên tỉnh liên tục.
    - Sẵn sàng đáp ứng làm việc 100% Onsite tại TP.HCM hoặc mô hình Hybrid linh hoạt, có chỗ tạm trú thuận lợi tại Quận 7.
- **5. Chế Độ Focus Toàn Màn Hình Từng Card Bento (Bento Expand Modal)**:
  - Cho phép người dùng nhấp đúp (`onDoubleClick`) vào bất kỳ thẻ Bento nào hoặc bấm vào icon phóng to (`Maximize2`) góc trên mỗi card để mở modal chi tiết:
    - **Card 1.1 (Hero Video)**: Video intro lớn, tiểu sử chuyên gia và trợ lý ảo.
    - **Card 1.2 (Stats)**: 4 Dấu ấn vận hành phóng to với phân tích sâu về phương pháp luận quản trị dữ liệu.
    - **Card 2.1 (Demographics)**: Lưới 6 nhân khẩu học kết hợp phân tích chuyên sâu lộ trình kết nối giao thông Q7 - Mỹ Tho.
    - **Card 2.2 (Interactive Map)**: Google Maps tương tác kích thước lớn với 2 tab chuyển đổi Quận 7 và Mỹ Tho.
    - **Card 3.1 (Pillars)**: 3 Trụ cột vận hành trình bày trực quan kèm nút nghe thuyết minh AI trực tiếp.
    - **Card 3.2 (Philosophy)**: Giá trị cốt lõi và Triết lý tầm nhìn CX 2026+ phân tích toàn diện.
  - Hỗ trợ đóng modal linh hoạt bằng phím `Escape`, nút Đóng hoặc click vùng nền ngoài.
- **6. Kiểm Thử Kỹ Thuật & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc trong [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts).
  - TypeScript build (`pnpm exec tsc --noEmit`) đạt **0 lỗi (Exit Code 0)**. Dev Server biên dịch thành công.

---

## [3.62.0] - 2026-10-26
### Thư Ngỏ Thuyết Trình: Video Scena AI Thu Nhỏ Hình Tròn Nổi (Floating PIP Cam) & Đồng Bộ Thuyết Minh Toàn Diện
- **1. Video Scena AI Thu Nhỏ Thành Hình Tròn Nổi Góc Dưới Phải (Floating Circle PIP Cam)**:
  - Khi xem ở **Chế độ Thuyết Trình (`viewMode === 'slides'`)** tại [`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx), video Slide 1 được thu nhỏ thành một khung tròn nổi cố định (`fixed bottom-20 right-3 sm:right-6 lg:bottom-24 lg:right-8 z-40`).
  - Đường viền tròn phát sáng hào quang gradient cyan-emerald-blue kết hợp vòng tròn tiến trình SVG (`strokeDashoffset`) hiển thị trực quan tỷ lệ % thời lượng video đã phát theo thời gian thực.
  - Video phát liên tục xuyên suốt 4 slide trong chế độ thuyết trình, đi kèm các điều khiển trực tiếp trên cam: Nút Play/Pause, Nút bật/tắt tiếng (Loa), Badge trạng thái "AI Robot Live" và nút gạt kích hoạt/hủy kích hoạt Auto-Sync Slide.
- **2. Mở Rộng Toàn Bộ Diện Tích Slide 1 Sang Trọng (12 Cột Toàn Cảnh)**:
  - Dời video tĩnh cũ ở cột phải `lg:col-span-4` của Slide 1, mở rộng cột nội dung sang `lg:col-span-12`.
  - Giúp các khối Bento: Lời chào đối tác, Bề dày 22 năm kinh nghiệm, Cam kết đồng hành, Bộ 3 trụ cột và Khối phương châm phụng sự được dàn đều, thoáng đãng, sang trọng và chuẩn mực tỷ lệ vàng.
- **3. Hệ Thống 7 Mốc Thuyết Minh & Ghi Chú Trực Quan (Timecode Cues)**:
  - Xây dựng mảng `PRESENTATION_VIDEO_CUES` phân bổ đồng bộ chính xác 100% theo tiến trình video:
    - **Mốc 1 (0% - 14%)**: Lời Mở Đầu (`callout-salutation`) — Lời chào trân trọng và lời chúc hợp tác thịnh vượng đến Quý Đối Tác.
    - **Mốc 2 (14% - 28%)**: Bề Dày 22 Năm (`bento-experience-intro`) — Chuyên gia xây dựng, vận hành và phát triển hệ thống CSKH đa kênh.
    - **Mốc 3 (28% - 42%)**: Bộ 3 Trụ Cột Nền Tảng (`bento-three-pillars`) — Quy trình tạo nền tảng · Con người tạo giá trị · Công nghệ tạo đòn bẩy.
    - **Mốc 4 (42% - 56%)**: Nền Tảng Viễn Thông (`card-2002`) — MobiFone (2002) và bước ngoặt quản trị toàn diện tại HTV-TMS (2011).
    - **Mốc 5 (56% - 70%)**: Bứt Phá TMĐT Shopee & Garena (`card-2013`) — Triệu người dùng, CSAT 99% và đào tạo 100.000+ nhân sự.
    - **Mốc 6 (70% - 84%)**: Tài Chính & Fintech (`card-2016`) — Chuẩn mực dịch vụ tài chính bảo hiểm Prudential & MoMo.
    - **Mốc 7 (84% - 100%)**: Triết Lý Phụng Sự (`card-philosophy-gratitude`) — Chân thành, đồng cảm kịp thời và phát triển bền vững.
- **4. Hiệu Ứng Tô Màu, Viền Hào Quang & Thẻ Ghi Chú Nổi Bật (Live Highlight & Floating Callout Notes)**:
  - Khi video phát đến mốc nào:
    - Khối/thẻ thông tin tương ứng tự động được viền hào quang phát quang rực rỡ (`ring-4 ring-offset-1 ring-emerald-500 dark:ring-cyan-400 shadow-[0_0_32px_rgba(16,185,129,0.35)] scale-[1.008]`).
    - Hiển thị **Thẻ Ghi Chú Trực Quan Nổi (Floating Presentation Callout Note Badge)** ngay trên thẻ với icon lấp lánh và tiêu đề/tóm tắt điểm nhấn thuyết minh.
    - Tô màu neon nổi bật các cụm từ khóa cốt lõi (`Nguyễn Hùng Thái`, `22 năm kinh nghiệm`, `MobiFone`, `Shopee`, `Prudential`, `CSAT 99%`...).
    - Cơ chế **Auto-Sync Slide**: Hệ thống tự động chuyển tiếp giữa Slide 0 -> Slide 1 -> Slide 2 -> Slide 3 một cách mượt mà theo tiến trình video kèm hiệu ứng âm thanh chuyển trang nhẹ nhàng từ `SoundEngine`.
- **5. Kiểm Thử Kỹ Thuật & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc trong [`src/data/letterData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/letterData.ts).
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server biên dịch thành công (`GET / 200 in 1159ms`).

---

## [3.61.0] - 2026-10-26
### Tối Ưu Hóa Tính Năng Display Settings & Cơ Chế Tự Động Dùng Làm Mặc Định Trở Về Sau
- **1. Khắc Phục Lỗi Gốc Mất Trạng Thái Khi Tải Lại Trang**:
  - Loại bỏ hoàn toàn các câu lệnh xóa (`localStorage.removeItem('hungthai_font_scale_percent')` và `localStorage.removeItem('hungthai_font_scale')`) từng tồn tại trong [`src/app/layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx) và [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx).
  - Đảm bảo các thiết lập hiển thị của người dùng không bao giờ bị ghi đè hoặc đặt lại về 16px ngoài ý muốn.
- **2. Khởi Động Không Nhấp Nháy (Zero-FOUC Pre-hydration Loading)**:
  - Tối ưu đoạn script inline trong `layout.tsx` để đọc `hungthai_font_scale_percent` và các cờ trợ năng A11y (`high_contrast`, `highlight_links`, `wide_lines`) trực tiếp từ `localStorage`.
  - Thiết lập tức thì `document.documentElement.style.fontSize`, biến CSS `--a11y-fs` và thuộc tính `data-font-scale` ngay trước khi trình duyệt render cây DOM, đảm bảo trải nghiệm thị giác mượt mà không bị giật cỡ chữ.
- **3. Cơ Chế Tự Động Lưu Mặc Định Ngay Lập Tức (Instant Auto-persist As Default)**:
  - Tại [`src/components/ui/LiveDisplaySettings.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/LiveDisplaySettings.tsx):
    - Tích hợp hàm `persistDisplaySettings`: Tự động đồng bộ và lưu vĩnh viễn vào `localStorage` mọi thay đổi (tăng/giảm ±5%, chọn preset 85%-120%, hoặc gạt switch trợ năng).
    - Người dùng chỉ cần chọn xong là cài đặt sẽ tự động dùng làm mặc định cho tất cả các lần truy cập trở về sau.
    - Cung cấp nút xác nhận chủ động kèm âm thanh phản hồi từ `SoundEngine` và thông báo xác nhận: `"✓ Đã lưu cài đặt ({scalePercent}%) làm mặc định trở về sau!"`.
    - Nút khôi phục chuẩn ban đầu đặt lại 100% và lưu giá trị 100% làm mặc định mới.
- **4. Tối Ưu Hóa Nút Hiển Thị Tại Footer (`Footer.tsx`)**:
  - Tại [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx):
    - Lắng nghe sự kiện `hungthai-font-scale-change` để cập nhật huy hiệu phần trăm (`100%`, `105%`, `115%`...) ngay trên nút Footer `Display settings`.
    - Hiển thị phụ đề trạng thái rõ ràng: `"Mặc định: {scalePercent}%"` giúp người dùng luôn nhận biết tỷ lệ đang áp dụng.
- **5. Kiểm Thử Kỹ Thuật**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server biên dịch thành công (`GET / 200 in 825ms`).

---

## [3.60.0] - 2026-10-26
### Nâng Cấp Hệ Thống Biểu Tượng Động Animate UI Icons (@animate-ui/react/icons)
- **1. Cài Đặt Lõi Hoạt Họa & Bộ Icon Chuẩn Animate UI**:
  - Cài đặt package lõi `@animate-ui/react` (v2.3.0) hỗ trợ motion engine và animation triggers.
  - Thiết lập thư mục mã nguồn icon độc lập tại [`src/components/animate-ui/icons/`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/animate-ui/icons/):
    - **`bell.tsx`**: Biểu tượng chuông với hiệu ứng rung lắc dao động tự nhiên (`rotate: [0, 20, -10, 10, -5, 3, 0]`) kết hợp quả lắc `path1`.
    - **`volume-2.tsx`** & **`volume-x.tsx`**: Hiệu ứng sóng âm thanh nhấp nháy phát quang (`opacity: [1, 0.25, 1], scale: [1, 0.85, 1]`).
    - **`rotate-cw.tsx`**: Hiệu ứng xoay tròn mượt mà khi lật xem nhanh chỉ số KPI.
    - **`sparkles.tsx`**: Hiệu ứng lấp lánh sao ma thuật cho tính năng AI & Visual effects.
    - **`play.tsx`**, **`pause.tsx`**, **`settings.tsx`**, **`user.tsx`**, **`chevron-right.tsx`**, **`arrow-right.tsx`**, **`check.tsx`**.
    - **`index.ts`**: Xuất khẩu tập trung các component icon và types chuẩn TypeScript.
- **2. Đồng Bộ Hệ Thống Biểu Tượng Toàn Trang (`WebIcon.tsx`)**:
  - Tại [`src/components/ui/WebIcon.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/WebIcon.tsx):
    - Bổ sung prop `animateOnHover?: boolean` (mặc định: `true`).
    - Tích hợp trực tiếp các component icon Animate UI vào các case: `bell`, `volume-2`, `volume-x`, `rotate-cw`, `sparkles`, `play`, `pause`, `settings`, `user`, `chevron-right`, `arrow-right`, `check`.
- **3. Tích Hợp Nút Chuông Thông Báo Executive (Notification Bell) Trên Header**:
  - Tại [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx):
    - Đặt nút Chuông Thông Báo Thông Minh bên phải thanh Header sử dụng `<Bell animateOnHover />`.
    - Khi hover chuột: Chuông rung lắc nhịp nhàng theo vật lý thực.
    - Chấm đỏ nhấp nháy báo thông báo mới; khi click mở Popup kính mờ Glassmorphism hiển thị các thông báo cập nhật hệ thống và tính năng mới của portal.
- **4. Kiểm Thử Kỹ Thuật**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server biên dịch thành công (`GET / 200 in 256ms`).

---

## [3.59.0] - 2026-10-26
### Tích Hợp Chế Độ Xem Infographic 3D Number Cover Morphing (CodePen Reference) Cho Trang Lĩnh Vực (DomainsView)
- **1. Phân Tích & Chuyển Đổi Bố Cục CodePen (Infographic Number Cover)**:
  - Trích xuất cấu trúc cốt lõi từ CodePen:
    - Khối `.numberWrap` chứa số nổi 3D cỡ đại `01` - `06` mang màu sắc nhận diện riêng (`cfg.accentColor`) của từng lĩnh vực.
    - Lớp túi `.coverWrap` xoay chéo 130 độ chứa nắp bầu dục `.numberCover` với hiệu ứng morphing `group-hover:rounded-full`, kết hợp đa tầng bóng mờ và viền thủy tinh (`backdrop-filter: blur(16px)`).
    - Khối nội dung offset: Icon vector nổi không đóng khung tròn (`getDomainBadgeIcon`), tiêu đề chuẩn 4 chữ viết hoa (`formatCardTitle`), thẻ vị trí & năm điều hành, mô tả tóm tắt năng lực và lưới 4 mini KPI cốt lõi.
- **2. Bổ Sung Bộ Điều Khiển Chuyển Đổi Chế Độ Xem (View Switcher & Scale Controls)**:
  - Tích hợp cụm nút chuyển đổi linh hoạt trên thanh `HeroBanner.bottomControls` của [`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx):
    - **`🎴 Thẻ Lưới Luminous`**: Xem dạng lưới 6 thẻ kính viền phát quang đa tầng 3x2.
    - **`🔢 Infographic 3D Cover`**: Xem dạng lưới 6 thẻ số nổi 3D Pocket Morphing.
  - Tích hợp thanh trượt tỷ lệ **`Tỷ lệ: 0.85x - 1.15x`** (tương tự Codepen `Scale in rems`) cho phép người dùng tự do phóng to / thu nhỏ thẻ theo sở thích.
- **3. Bảo Toàn 100% Chức Năng Cốt Lõi & Dữ Liệu Thực Tế**:
  - Giữ nguyên 100% dữ liệu gốc trong [`src/data/domains.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/domains.ts) (6 lĩnh vực: Viễn thông, TMĐT, Bảo hiểm số, Game eSports, Ví điện tử, Xây dựng hệ thống).
  - Tích hợp đầy đủ trên chế độ mới:
    - **Lật Thẻ Mặt Sau Xem Nhanh Chỉ Số (Quick KPI Flip Mini-Card)**: Lật 3D xem 4 chỉ số KPI cốt lõi (CSAT 99%, SLA 100%, Tăng trưởng 32%, v.v.).
    - **Loa Thuyết Minh AI 15s**: Đồng bộ với giọng đọc của AI Trợ Lý đang dùng (`getSavedVoiceURI()`, `findBestVoice()`).
    - **Bộ Lọc Logo Đối Tác**: Click logo tròn (MobiFone, Shopee, Prudential, Garena...) để làm nổi bật thẻ liên quan và làm mờ các thẻ khác.
    - **Xem Chi Tiết Toàn Màn Hình**: Click mở rộng thẻ chi tiết hợp nhất.
- **4. Kiểm Thử Kỹ Thuật**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server biên dịch thành công (`GET / 200 in 255ms`).

---

## [3.58.0] - 2026-10-26
### Đồng Bộ 100% Format Giao Diện Thẻ Kỹ Năng (SkillsView) Theo Chuẩn Thẻ Lĩnh Vực (DomainsView)
- **1. Đồng Bộ Format Bố Cục Thẻ Mặt Trước (Front Face - CodePen Luminous Glass Showcase)**:
  - Áp dụng cấu trúc chuẩn mực của Thẻ Lĩnh Vực ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx)) vào Thẻ Kỹ Năng ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx)):
    - **Header**: Icon vector tự do không đóng khung tròn (`animate-icon-floating`), tiêu đề chuẩn 4 chữ viết hoa (`text-[18px] sm:text-[19px] lg:text-[20px] font-black font-play`), màu chữ đồng bộ 100% với màu nhận diện của nhóm kỹ năng.
    - **Cụm nút tương tác Header**:
      - Nút **`AI 15s`**: Phát thuyết minh tóm tắt năng lực cốt lõi trong 15 giây sử dụng chung giọng đọc với AI Trợ Lý đang dùng (`getSavedVoiceURI()`, `findBestVoice()`).
      - Nút **`KPI ↻`**: Lật thẻ xem nhanh chỉ số % năng lực cốt lõi.
    - **Thân thẻ (Middle Section - Grid 12 cột)**:
      - Cột trái (7 cols): Cụm thẻ con nhộng (`tag-lines`) gồm badge phân loại năng lực có mũi tên `->` và badge số lượng năng lực; đoạn mô tả súc tích `line-clamp-3`.
      - Cột phải (5 cols): Hình minh họa 3D Illustration lớn, nổi bật (`min-h-[115px] sm:min-h-[125px] lg:min-h-[135px]`) với hiệu ứng nghiêng nhẹ `rotate-[4.5deg] group-hover/card:rotate-0 group-hover/card:scale-110` và bóng đổ sâu `drop-shadow`.
    - **Thanh Thuyết Minh AI 15s**: Xuất hiện thanh nổi tại đáy thẻ khi phát âm thanh với 5 cột sóng âm nhịp nhàng (`waveform`), đếm ngược thời gian thực `15s ... 0s`, thanh tiến trình gradient và phụ đề thuyết minh.
    - **Đáy thẻ (Bottom Row)**:
      - Bên trái: Nút viên thuốc CTA `Xem kỹ năng ->` (gradient pill, hover scale 105, arrow translate-x-1).
      - Bên phải: Cụm huy hiệu mini hiển thị 3 năng lực tiêu biểu kèm điểm số % (`95%`, `92%`, `90%`...).
- **2. Bổ Sung Cơ Chế Lật Thẻ Mặt Sau Xem Nhanh Chỉ Số (Quick KPI Flip Mini-Card - Back Face)**:
  - Tích hợp không gian 3D `perspective: 1200px` và `rotateY(180deg)`.
  - Mặt sau hiển thị:
    - Header: Icon + Tiêu đề + Huy hiệu chỉ số đánh giá (`Chỉ số năng lực cốt lõi` hoặc `Mức độ tác động` đối với Thách thức theo Quy tắc #17) + Nút `RotateCw` lật lại mặt trước.
    - Lưới 2x2 hoặc 2x3 gồm các thẻ chỉ số KPI: Tên kỹ năng, điểm số % to bản `text-[18px] sm:text-[20px] font-black font-play` mang màu theme của thẻ, và mô tả vắn tắt.
    - Footer mặt sau: Nút `Mặt trước` và nút `Xem chi tiết` mở toàn màn hình.
- **3. Bảo Toàn Dữ Liệu Tuyệt Đối (Data First)**:
  - Giữ nguyên 100% toàn bộ 27 mục kỹ năng thuộc 5 nhóm SWOT và Ngôn ngữ từ [`src/data/skills.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/skills.ts) (`STRENGTHS_DATA`, `WEAKNESSES_DATA`, `OPPORTUNITIES_DATA`, `THREATS_DATA`, `LANGUAGES_DATA`).
  - Giữ nguyên toàn bộ chế độ xem chi tiết toàn màn hình (`selectedCard`) với đầy đủ tỷ lệ %, thanh tiến trình và mô tả chi tiết của từng mục.
- **4. Kiểm Thử Kỹ Thuật**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server biên dịch thành công (`GET / 200`).

---

## [3.57.0] - 2026-10-26
### Tinh Gọn Khối Điều Hướng Chế Độ Xem Trang Thư Ngỏ (LetterView): Giữ Lại Duy Nhất 2 Nút "Xem 1 Trang" và "Thuyết Trình"
- **1. Tinh Gọn Khối Switcher Điều Hướng Top Bar**:
  - Tại file [`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx), trong hàm `renderTopNavigationBar()`, tại khối `<div>` điều hướng bên trái:
    - Loại bỏ danh sách 4 nút phân đoạn slide (`1. Thông Điệp Hợp Tác`, `2. Sự Nghiệp 2002 - 2011`, `3. Sự Nghiệp 2013 - 2023+`, `4. Triết Lý Quản Trị`).
    - Giữ lại chính xác **2 nút chế độ độc lập và trực quan**:
      - **Nút 1: `Xem 1 Trang`**:
        - Icon: `WebIcon name="book"`.
        - Khi click: `setViewMode('one-page')` với hiệu ứng âm thanh `SoundEngine.playTap()`.
        - Trạng thái Active: Gradient Tím - Hồng (`bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-xs`).
      - **Nút 2: `Thuyết Trình`**:
        - Icon: `WebIcon name="monitor"`.
        - Khi click: `setViewMode('slides')` với hiệu ứng âm thanh `SoundEngine.playTap()`.
        - Trạng thái Active: Gradient Xanh Dương - Chàm (`bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-xs`).
- **2. Phạm Vi & Tính Toàn Vẹn**:
  - **Phạm vi áp dụng**: Chỉ tác động chính xác lên khối `<div>` chuyển đổi chế độ xem ở thanh điều hướng trên cùng của trang Thư Ngỏ theo đúng yêu cầu người dùng.
  - Các nút tính năng lân cận (Nghe Thư Ngỏ AI, Cá nhân hóa Quý Công ty, Tải PDF chuẩn A4, Lưu mặc định) và hệ thống điều hướng slide bằng phím mũi tên `← / →`, nút nổi 2 bên màn hình vẫn được bảo toàn nguyên vẹn 100%.
  - Bảo toàn 100% dữ liệu gốc trong [`src/data/letterData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/letterData.ts).
- **3. Kiểm Thử Kỹ Thuật**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server phản hồi 200 OK.

---

## [3.56.0] - 2026-10-26
### Nâng Cấp Trang Giới Thiệu: Chế Độ Bento View Đa Màu Sắc 1 Trang Nằm Gọn Trong Slide (Responsive Bento View Cards)
- **1. Bổ sung Chế độ Bento View Đa Sắc 1 Trang (`viewMode = 'bento'`)**:
  - Tích hợp thanh toggle tiện lợi ở Top Bar: `[🍱 Bento View (1 Trang)]` (active gradient tím-hồng) và `[🎞️ Trình Chiếu Slide]`, kèm badge chỉ báo trạng thái trực quan.
  - Thiết lập chế độ mặc định là **Bento View 1 Trang**, hiển thị toàn diện mọi dữ liệu giới thiệu chỉ trong một khung nhìn duy nhất.
- **2. Bố cục Bento Grid 3 Cột Nằm Gọn Gàng 100% Trong Khung Nhìn Desktop**:
  - Cấu trúc lưới 3 cột cân xứng (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full min-h-0 overflow-hidden`), chiều cao tự động co giãn vừa vặn trong màn hình slide, không phát sinh thanh cuộn dọc ngoài ý muốn trên Desktop:
    - **Cột 1 (Hero Video & 4 Chỉ Số Hồ Sơ)**:
      - *Card 1.1 (Hero Video Profile)*: Video chuyên gia Hùng Thái tương tác 2 chế độ (Idle / Phát intro 23s), High-contrast Scrim Overlay, lời chào *"Nguyễn Hùng Thái ✨"*, nút kích hoạt *"Bắt đầu trò chuyện (Phát video)"* và nét chữ thư pháp *"Luôn bên bạn ♡"*.
      - *Card 1.2 (4 Profile Stats Bento)*: 4 ô stat mini rực rỡ sắc màu (Sky Blue `#0284c7` cho 22+ Năm, Purple `#9333ea` cho 8+ Môi trường, Emerald `#059669` cho 24/7 AI CRM, Rose `#e11d48` cho 99% CSAT).
    - **Cột 2 (Thông Tin Nhân Khẩu Học & Bản Đồ Cư Trú Tương Tác)**:
      - *Card 2.1 (6 Thông Tin Cá Nhân)*: 6 ô mini bento đa màu sắc (Nam giới - Blue, Kinh - Purple, Độc thân - Rose, Sinh nhật 22/06/1984 - Amber, Tạm trú Q7 - Indigo, Cư trú Tiền Giang - Emerald) với icon và viền đồng điệu.
      - *Card 2.2 (Bản Đồ Cư Trú Tương Tác)*: 2 tab chuyển đổi nhanh `Q7, TP.HCM` vs `Mỹ Tho, Tiền Giang`, nhúng Google Maps iframe trực quan, nút *"Phóng to"* mở modal bản đồ vệ tinh toàn cảnh.
    - **Cột 3 (3 Trụ Cột Vận Hành Chiến Lược, Giá Trị Cốt Lõi & Triết Lý Tầm Nhìn CX 2026+)**:
      - *Card 3.1 (3 Trụ Cột Vận Hành Chiến Lược)*: 3 Pillar Gradient Cards (01. Hiệu Quả - Blue/Sky, 02. Nhân Văn - Rose/Pink, 03. Bền Vững - Emerald/Teal), đoạn tâm huyết 22 năm, Mascot Tí Chuột GIF và chữ ký thư pháp.
      - *Card 3.2 (Giá Trị Cốt Lõi & Triết Lý Tầm Nhìn)*: Khối Giá Trị Cốt Lõi (Gradient Amber/Orange) & Khối Triết Lý Tầm Nhìn (Gradient Cyan/Sky) với câu danh ngôn điều hành *"Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng"*.
- **3. Toàn Vẹn Responsive & Chuẩn Thiết Kế**:
  - Tuân thủ nghiêm ngặt **bo góc 14px (`rounded-[14px]`)** theo Quy tắc #6.
  - Trên Mobile và Tablet: Bento tự động chuyển đổi thành layout cuộn dọc mượt mà với thanh cuộn kính mờ (`glass-scrollbar`), các ô card chạm lướt êm ái, tối ưu hoá khoảng cách hiển thị.
  - Bảo toàn nguyên vẹn 100% chế độ trình chiếu Slide 3 bước cũ (`viewMode = 'slides'`) để người dùng có thể linh hoạt chuyển đổi theo sở thích.
  - Bảo toàn 100% dữ liệu gốc trong [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts).
- **4. Kiểm Thử Kỹ Thuật**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev Server hoạt động ổn định trên cổng 3001.

---

## [3.55.0] - 2026-10-26
### Tái Cấu Trúc Bố Cục Trang Chủ: Tích Hợp Thẻ Khám Phá Toàn Cảnh 14 Trang (3D Cylindrical Carousel) Trực Tiếp Nằm Bên Trái & Xóa Thẻ Dấu Ấn Vận Hành
- **1. Xóa Thẻ Dấu Ấn Vận Hành & Năng Lực Khỏi Trang Chủ**:
  - Gỡ bỏ hoàn toàn khối `HomeFannedTestimonials` khỏi giao diện Trang Chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx)).
  - Giữ lại file component `HomeFannedTestimonials.tsx` trong kho dữ liệu, bảo toàn 100% dữ liệu gốc của dự án.
- **2. Đưa Thẻ Khám Phá Toàn Cảnh 14 Trang (3D Cylindrical Carousel) Ra Ngoài Trang Chủ Nằm Bên Trái**:
  - Xây dựng component chuyên biệt [`src/components/ui/HomePages3DCarouselLeft.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HomePages3DCarouselLeft.tsx) thiết kế theo phong cách Glass Soft cao cấp:
    - **Bo góc 14px (`rounded-[14px]`)** theo đúng Quy tắc #6.
    - **Kích thước & Bố cục bên trái**: Chiều rộng tối ưu (`max-w-[440px] - 480px`), chiều cao co giãn vừa khít thẻ chính trang chủ. Nằm gọn gàng ở nửa bên trái, tạo sự cân đối thị giác hoàn hảo với không gian thoáng đãng bên phải hiển thị video nền chuyên gia Hùng Thái.
    - **Hệ thống 3D Cylindrical Carousel Track**:
      - Tái lập hiệu ứng chiều sâu `perspective: 900px`, `transformStyle: preserve-3d`.
      - Thẻ Center nổi bật ở giữa với `scale(1.04)`, viền phát sáng theo màu sắc của trang (`theme`), hình ảnh minh họa chân thực, số trang và huy hiệu.
      - Thẻ Up 1, Down 1 và Up 2, Down 2 lùi sâu vào không gian 3D với độ mờ và thang xám mượt mà.
      - Tích hợp đa dạng tương tác: Nút Mũi Tên Lên / Xuống (Up / Down), cuộn chuột (Mouse Wheel), vuốt cảm ứng (Touch swipe) và phím mũi tên.
      - Nút bật/tắt Tự Xoay (`Auto: BẬT / TẮT`) 4.5 giây/lần.
    - **Khối Thông Tin Chi Tiết**:
      - Phân loại trang, số trang, tiêu đề đầy đủ của trang đang chọn.
      - Đoạn mô tả vắn tắt cùng 2 điểm nổi bật hàng đầu của trang.
      - Nút CTA chuyển thẳng tới trang: *"Mở trang →"* (`onNavigatePage(currentItem.pageId)`).
      - Dãy 14 dots tròn mini để định vị và chuyển nhanh đến bất kỳ trang nào.
- **3. Tinh Chỉnh Top Header Section**:
  - Nút Laser Capsule Giới Thiệu Chuyên Gia (`Phát Giới Thiệu 23s`) được căn lề phải gọn gàng, tạo bố cục thông thoáng, tinh tế và chuyên nghiệp.
- **4. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server hoạt động bình thường trên cổng 3001.

---

## [3.54.0] - 2026-10-26
### Nâng Cấp Tương Tác Trang Lĩnh Vực: Lật Thẻ Xem Nhanh Chỉ Số (Quick KPI Flip), Bộ Lọc Đối Tác Thông Minh (Brand Filter) & Thuyết Minh AI 15 Giây (Executive Audio Summary)
- **1. Lật Thẻ Mặt Sau Xem Nhanh Chỉ Số (Quick KPI Flip Mini-Card)** ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx)):
  - **Cơ chế 3D Flip Card**: Tích hợp phối cảnh `perspective: 1200px`, `transform-style: preserve-3d` và `transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)`.
  - **Nút lật góc thẻ (`KPI ↻`)**: Bấm vào nút `KPI ↻` trên từng thẻ (kèm âm thanh lật trang `SoundEngine.playPageFlip()`) để xoay 180° xem ngay mặt sau mà không cần chuyển toàn màn hình.
  - **Giao diện Mặt sau**:
    - Header: Icon nhận diện thương hiệu, tiêu đề lĩnh vực và huy hiệu *"4 Chỉ số thành tựu cốt lõi"*.
    - Thân thẻ: Lưới 2x2 gồm 4 chỉ số KPI thành tựu cốt lõi trích xuất 100% từ dữ liệu thực tế (ví dụ: Viễn thông: Doanh thu `+32%`, CSAT `99%`, Xử lý sự cố `-40%`, Mở rộng đội ngũ `+50%`).
    - Footer: Nút *"Mặt trước"* để lật lại và nút *"Mở chi tiết"* để xem toàn màn hình.
- **2. Bộ Lọc Theo Logo Đối Tác Thông Minh (Brand Interactive Filter)**:
  - **Tương tác trực tiếp trên Logo**: Bấm vào bất kỳ huy hiệu logo tròn nào dưới góc phải của thẻ (MobiFone, Shopee, Prudential, Garena, MoMo, Finviet...) để kích hoạt bộ lọc.
  - **Thanh Brand Filter Bar**: Bổ sung dải nút đối tác tiêu biểu ngay trên `bottomControls` của `HeroBanner`.
  - **Hiệu ứng Focus & Auto-Center**: Thẻ thuộc lĩnh vực có đối tác được chọn sẽ phát sáng nổi bật với viền `ring-2 ring-cyan-400`, quầng sáng `shadow-[0_0_32px_rgba(56,189,248,0.55)]` và tự động cuộn căn giữa khung nhìn (`scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })`). Các thẻ không liên quan được làm mờ nhẹ (`opacity-35 grayscale-[50%]`) để dồn sự tập trung.
- **3. Thanh Phát Thuyết Minh AI Tóm Tắt Từng Lĩnh Vực (15s Executive Audio Summary)**:
  - **Đồng bộ 100% giọng đọc với AI Trợ Lý**: Tích hợp trực tiếp hệ thống quản lý giọng đọc [`src/utils/speechVoice.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/speechVoice.ts), tự động dùng chung giọng đọc đang được thiết lập của AI Trợ Lý Tí Chuột (`getSavedVoiceURI()`, `findBestVoice()`).
    - Microsoft Edge: Tự động dùng giọng *Microsoft Nam Minh Online (Natural) - Tiếng Việt*.
    - Google Chrome: Tự động dùng giọng *Google Tiếng Việt 5 (Chrome Online AI Natural)*.
    - Lắng nghe sự kiện `VOICE_CHANGE_EVENT` (`hungthai-voice-change`): Khi người dùng thay đổi giọng đọc trong cài đặt Trợ Lý AI, giọng thuyết minh trang Lĩnh Vực cập nhật đồng bộ ngay lập tức.
  - **Executive Audio Waveform Bar**: Khi phát, xuất hiện thanh điều khiển mini với 5 cột sóng âm nhịp nhàng (`waveform`), nhãn hiển thị tên giọng đọc AI đang dùng (`AI 15s • Nam Minh AI / Tiếng Việt 5 AI`), bộ đếm lùi thời gian thực (`15s ... 0s`), thanh tiến trình gradient (`0% -> 100%`) và phụ đề văn bản hiển thị song song.
- **4. Bảo Toàn Quy Chuẩn & Dữ Liệu**:
  - Giữ nguyên 100% dữ liệu gốc trong `src/data/domains.ts`.
  - Tuân thủ bo góc **14px** (`rounded-[14px]`) theo Quy tắc #6.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server chạy ổn định trên cổng 3001.

---

## [3.52.0] - 2026-10-26
### Phân Tích CodePen Team Carousel & Tạo Hệ Thống 3D Cylindrical Carousel Giới Thiệu 14 Trang & Các Điểm Nổi Bật (3D Page Showcase)
- **1. Phân Tích Logic & Bố Cục Kỹ Thuật Từ CodePen Tham Khảo**:
  - **Khung nhìn 3D Trụ Dọc (Vertical 3D Cylindrical Track)**: Tái lập hệ thống phối cảnh `perspective: 1000px`, `transform-style: preserve-3d` với các vị trí tính toán theo offset xoay vòng:
    - `.center`: Thẻ trung tâm nổi bật `scale: 1.08`, `translateZ: 0`, rõ nét, viền phát quang theo theme của trang.
    - `.up-1` / `.down-1`: Thẻ trên/dưới 1 bậc `translateY(±135px) scale(0.9) translateZ(-110px)`, độ mờ 88%, giảm bão hòa màu 60%.
    - `.up-2` / `.down-2`: Thẻ trên/dưới 2 bậc `translateY(±250px) scale(0.78) translateZ(-240px)`, độ mờ 65%, thang xám 90%.
    - `.hidden`: Các thẻ còn lại lùi sâu về hậu cảnh và ẩn đi `opacity: 0`.
    - Chuyển động mượt mà: `transition: all 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
  - **Khối Điều Khiển & Thông Tin Chi Tiết (.controls-section)**:
    - Tiêu đề trang (`member-name`) với vạch kẻ trang trí đồng màu hai bên.
    - Phân loại trang (`member-role`) dạng uppercase tracking rộng.
    - Phần giới thiệu tổng quan và Lưới điểm nổi bật (Key Highlights Grid).
    - Nút CTA chuyển thẳng tới trang ("Mở Xem Trang [Tên] →").
    - Dãy 14 chấm tròn (`dots`) đồng bộ trạng thái active phóng to và đổi màu theo theme.
- **2. Tách Biệt Data Cốt Lõi (Data-First Architecture)** ([`src/data/pageShowcaseData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/pageShowcaseData.ts)):
  - Khai báo trọn vẹn thông tin 14 trang: từ Trang 01 (Trang Chủ) đến Trang 14 (Hình Nền).
  - Mỗi trang sở hữu: Mã số, Tiêu đề đầy đủ, Phân loại, Huy hiệu, Mô tả tổng quan, 4 Điểm nổi bật cốt lõi, Mã màu theme và Hình ảnh minh họa chất lượng cao.
- **3. Xây Dựng Component 3D Carousel & Modal Tương Tác** ([`src/components/ui/Pages3DCarousel.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/Pages3DCarousel.tsx) & [`src/components/ui/Pages3DCarouselModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/Pages3DCarouselModal.tsx)):
  - Tích hợp đa phương thức điều khiển: Click chọn thẻ trực tiếp, Nút Mũi tên Lên/Xuống, Phím tắt mũi tên, Cuộn chuột (Mouse Wheel debounce) và Vuốt cảm ứng (Touch swipe).
  - Tích hợp chế độ Tự Xoay (Auto-play Slideshow) 4.5 giây/lần.
  - Tích hợp nút mở nhanh trên thanh Header của Trang Chủ (`HomeView`) và bên trong popup danh sách trang của `Footer`.
- **4. Bảo Toàn Quy Chuẩn Thiết Kế & Dữ Liệu**:
  - Tuân thủ bo góc **14px** (`rounded-[14px]`) trên toàn bộ các thẻ và khung bọc (Quy tắc #6).
  - Không thay đổi bất kỳ dữ liệu hiện có nào của website.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server hoạt động bình thường trên cổng 3001.

---

## [3.51.0] - 2026-10-26
### Phân Tích & Tích Hợp Hiệu Ứng Sticky Cards: Fade & Scale Overlap Scroll Animation (GSAP ScrollTrigger) Vào Chi Tiết Bài Viết Dự Án
- **1. Phân Tích Logic Kỹ Thuật Từ CodePen Tham Khảo**:
  - **Cơ chế Stacking Overlap**: Dùng ScrollTrigger để ghim các thẻ khi cuộn tới đỉnh (`pin: true`, `pinSpacing: false` hoặc CSS `position: sticky; top: 16px;`). Khi thẻ tiếp theo trượt lên, nó đè lên thẻ trước với `z-index` tăng dần.
  - **Fade & Scale Timeline**: Khi thẻ tiếp theo tiếp cận đỉnh, thẻ đang ghim sẽ mờ dần (`opacity: 1 -> 0.18`), thu nhỏ tỷ lệ (`scale: 1 -> 0.88`, `transform-origin: center top`) và phủ mờ nhẹ (`filter: blur(2px)`).
  - **Thẻ cuối cùng độc lập**: Thẻ cuối cùng (Index = 9: Triết lý quản trị) không bị co lại (`opacity: 1, scale: 1`) để người dùng đọc trọn vẹn và tiếp tục cuộn xuống footer navigation.
- **2. Tích Hợp GSAP & ScrollTrigger Vào Chi Tiết Bài Viết Dự Án** ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx)):
  - Cài đặt thư viện chính thức `gsap@^3.15.0`.
  - Thiết lập hook `gsap.context` quản lý toàn bộ ScrollTrigger bên trong vùng cuộn cục bộ `scrollContainerRef`.
  - Tích hợp `scrub: 0.4` tạo độ giảm chấn mượt mà, không giật lag khi cuộn nhanh bằng chuột hay cảm ứng.
  - Nút chuyển trạng thái nhanh trên Banner Dự Án: `[Sticky Cards GSAP: BẬT / TẮT]` cho phép người dùng linh hoạt trải nghiệm hoặc tắt hiệu ứng bất kỳ lúc nào.
- **3. Chuẩn Hóa Thiết Kế Thẻ Theo Hệ Quy Chuẩn**:
  - Toàn bộ 10 thẻ chính đều được cập nhật padding **24px** (`p-6`) theo đúng Quy tắc #5.
  - Bo cong các thẻ chính, Banner và Mục lục đồng bộ **14px** (`rounded-[14px]`) theo đúng Quy tắc #6.
  - Bổ sung lớp phần cứng tăng tốc GPU `.sticky-card-active` (`will-change: transform, opacity, filter`) trong [`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css).
- **4. Bảo Toàn Tuyệt Đối 100% Dữ Liệu**:
  - Giữ nguyên toàn bộ 10 phần dữ liệu chuyên sâu (Sơ đồ tư duy, Tổng quan, Thách thức, Mục tiêu, 7 hạng mục phạm vi, 5 bước quy trình, Chỉ số KPI/SLA, Vai trò, 6 khía cạnh giá trị, Triết lý cốt lõi) trên toàn bộ 21 dự án.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server hoạt động bình thường trên cổng 3001.

---

## [3.50.0] - 2026-10-26
### Phân Tích Codepen NDesign Luminous Glass Showcase & Bổ Sung Giao Diện Mới Vào Nút Giao Diện (Theme System)
- **1. Phân Tích Kỹ Thuật & Ngôn Ngữ Thiết Kế Từ Codepen Tham Khảo**:
  - **Ambient Mesh Gradient Background**: Tái lập hiệu ứng chuyển động quang phổ mềm `.mesh-gradient-bg` kết hợp 4 điểm sáng radial gradient (`#38bdf8`, `#f472b6`, `#a78bfa`, `#34d399`) với chuyển động sóng `ambientShift 18s ease infinite alternate`.
  - **Floating Colorful Glass Blobs**: Tích hợp 3 khối cầu thủy tinh đa sắc chuyển động nổi bồng bềnh (`blob-1`, `blob-2`, `blob-3`) phủ bộ lọc `blur(50px)` tạo chiều sâu ánh sáng khúc xạ.
  - **Luminous Glassmorphism Cards**: Bề mặt kính trong suốt `rgba(255, 255, 255, 0.48 - 0.52)`, kết hợp `backdrop-filter: blur(24px) saturate(190%)`, viền phản chiếu ánh sáng trắng bạc `border: 1px solid rgba(255, 255, 255, 0.85)`, bóng đổ tán sắc `0 20px 45px -15px rgba(0, 0, 0, 0.08)`.
  - **Micro-Interactions & Glow State**: Hover chuyển động nâng nhẹ `-4px scale(1.01)`, tăng độ mờ bề mặt và phát quang bóng viền xanh cyan `#38bdf8` (`0 25px 50px -10px rgba(56, 189, 248, 0.22)`).
- **2. Tích Hợp Vào Hệ Thống Quản Lý Theme Độc Lập**:
  - Bổ sung `'luminous-glass'` vào union `SiteTheme` ([`src/types/index.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/types/index.ts)).
  - Đăng ký Theme hoàn chỉnh tại [`src/data/themes.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/themes.ts): `id: 'luminous-glass'`, `fourWordName: 'Kính sáng quang phổ'`, `accentColor: '#38BDF8'`, `icon: 'Sparkles'`.
  - Cập nhật [`src/components/ui/ThemeSelectorModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/ThemeSelectorModal.tsx) với thẻ xem trước sống động riêng biệt, huy hiệu "Luminous Glass (Mới)", hiệu ứng phát quang đặc trưng.
  - Cập nhật [`src/components/layout/Clock.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Clock.tsx) với phong cách đồng hồ quang phổ kính trong suốt, text cyan `#0369A1` và ngày tháng hồng đào `#F472B6`.
- **3. Cập Nhật Nút Chọn Giao Diện & Popup Danh Sách Ở Footer**:
  - Tại [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx):
    - Khi kích hoạt `luminous-glass`, nút giao diện tự động đổi nhãn thành **Kính Quang Phổ**, icon `sparkles`, viền cyan pastel phát sáng `border-cyan-400/80 shadow-[0_2px_12px_rgba(56,189,248,0.25)]`.
    - Menu popup tự động hiển thị đầy đủ 3 giao diện với biểu tượng chuẩn (`sun` cho Kính sáng, `sparkles` cho Kính quang phổ, `moon` cho Kính tối Neon) và chỉ báo trạng thái "Đang dùng".
- **4. Bảo Toàn Dữ Liệu & Khả Năng Lưu Trữ (Theme Persistence)**:
  - Đồng bộ `localStorage` khóa kép (`portfolio-theme` & `hungthai_site_theme`).
  - Thêm script inline chống chớp tắt (FOUC) tại [`src/app/layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx).
  - Giữ nguyên 100% dữ liệu hồ sơ, chức danh, kinh nghiệm và dự án.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**. Dev server Next.js chạy mượt mà trên cổng 3001.

---

## [3.49.0] - 2026-10-26
### Phân Chia Trang Kinh Nghiệm Hiển Thị 4 Đối Tượng / Lần & Tích Hợp Hiệu Ứng Cuộn Trượt Từ Trái Qua Phải (Smooth 4-Item Carousel Scroll)
- **1. Phân Chia 4 Đối Tượng Trên Một Khung Nhìn (4-Item Paging Track)** ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx)):
  - Thay thế hệ thống 8 cột dồn ép trước đây bằng cấu trúc phân trang 4 đối tượng / lần hiển thị:
    - **Trang 1: Giai Đoạn 2003 – 2013 (4 Đối Tượng)**: `MobiFone` (2003) • `Viễn Liên V247` (2007) • `LBC - HTVC` (2011) • `Vietnam Esports VED` (2013).
    - **Trang 2: Giai Đoạn 2016 – 2026+ (4 Đối Tượng)**: `Prudential` (2016) • `Ví MoMo` (2018) • `Finviet ECO SCC` (2023) • `Power Service CX 2026+` (2026+).
  - Tăng gấp đôi diện tích chiều ngang cho mỗi thẻ (từ ~110px lên ~260px trên Desktop), giúp tên công ty, sản phẩm tiêu biểu, 3 nhiệm vụ cốt lõi và quy mô nhân sự hiển thị sắc nét, thoáng đãng và sang trọng.
- **2. Hiệu Ứng Cuộn Trượt Từ Trái Qua Phải Mượt Mà (Smooth Horizontal Scroll Animation)**:
  - Tích hợp Carousel Track với chuyển động mượt mà: `transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`, biến dịch `translateX(-${timelinePage * 100}%)`.
  - Bổ sung 2 nút điều hướng dạng Floating Button (`ChevronLeft`, `ChevronRight`) với hiệu ứng kính mờ và bóng đổ phát sáng ở 2 mép timeline, click là trượt mượt mà từ trái qua phải.
  - Tích hợp các nút chuyển tiếp mini ở cuối trang 1 (`2016+ →`) và đầu trang 2 (`← 2003-13`) trực tiếp trên đường connector giữa các logo medallion.
- **3. Thanh Điều Hướng Timeline Paging & Chế Độ Tự Cuộn (Auto-Scroll Carousel Mode)**:
  - Thanh Tab phía trên timeline cho phép chuyển đổi tức thì giữa 2 giai đoạn với chỉ báo màu sắc sinh động.
  - Tích hợp nút **Tự Cuộn (Auto-Scroll Carousel Mode)** tự động lướt qua lại giữa 2 trang sau mỗi 8 giây.
  - Tự động đồng bộ: Khi người dùng chọn bất kỳ mốc nào (hoặc khi chế độ Trình Chiếu Hành Trình chạy đến mốc 2016+), hệ thống tự động trượt mượt mà sang đúng trang chứa mốc đó.
- **4. Bảo Toàn Dữ Liệu & Quy Chuẩn Thiết Kế**:
  - Giữ nguyên 100% dữ liệu lịch sử công tác, sản phẩm, bullets nhiệm vụ và quy mô nhân sự từ [`src/data/experience.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/experience.ts).
  - Toàn bộ các thẻ đều tuân thủ bo góc **14px** (`rounded-[14px]`) đồng bộ với Design System.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**. Dev server Next.js chạy mượt mà trên cổng 3001.

---

## [3.48.0] - 2026-10-26
### Nhóm Slide 3 & Slide 4 Thành 1 Slide Thống Nhất Trong Trang Giới Thiệu (About Slide Unification)
- **1. Cấu Trúc Lại Số Lượng Slide (3 Slides Thống Nhất)** ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx)):
  - Rút gọn toàn bộ trang Giới thiệu từ 4 slides xuống **3 slides** tinh gọn, mạch lạc:
    - **Slide 1**: `Tổng Quan & Video` (Chân dung chuyên gia, video trợ lý ảo tương tác, thông điệp mở đầu).
    - **Slide 2**: `Thông Tin Cá Nhân` (6 mục nhân khẩu học & bản đồ số tương tác Google Maps Q7 - Mỹ Tho).
    - **Slide 3**: `Trụ Cột & Triết Lý` (Nhóm hợp nhất 3 Trụ Cột Vận Hành Chiến Lược + Giới Thiệu Chân Dung + Giá Trị Cốt Lõi & Triết Lý Tầm Nhìn CX 2026+).
- **2. Bố Cục Bento Grid Phân Tầng Cân Xứng Cho Slide 3 Mới**:
  - **Tầng Trên (Row 1)**:
    - *Bên Trái (5 cột)*: Thẻ giới thiệu chuyên gia 22 năm kinh nghiệm + Chữ viết tay "Luôn bên bạn ♡" + Mascot Ti Chuột GIF sinh động.
    - *Bên Phải (7 cột)*: 3 Trụ Cột Vận Hành Chiến Lược (01. Hiệu Quả - Xanh Lam, 02. Nhân Văn - Hồng Đào, 03. Bền Vững - Xanh Ngọc).
  - **Tầng Dưới (Row 2)**:
    - *Bên Trái (7 cột)*: Thẻ Giá Trị Cốt Lõi ("Sự hài lòng không đến từ sự hoàn hảo tuyệt đối... Khách hàng là trung tâm ♡") với dấu ngoặc kép trích dẫn nghệ thuật.
    - *Bên Phải (5 cột)*: Thẻ Triết Lý Tầm Nhìn CX 2026+ ("Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng") kèm chữ ký định danh 22+ năm vận hành.
- **3. Chuẩn Hóa Bo Góc 14px Toàn Cục & Cập Nhật Huy Hiệu Tiến Trình (Pill Badge)**:
  - Tất cả các thẻ con, card chính và khung bọc trong cả 3 slide đều tuân thủ bo góc **14px** (`rounded-[14px]`).
  - Cập nhật huy hiệu góc phải: `Slide 1 / 3`, `Slide 2 / 3`, `Slide 3 / 3` và thanh điều hướng phía trên tự động nhận diện tổng 3 slide.
- **4. Bảo Toàn Tuyệt Đối 100% Dữ Liệu**:
  - Giữ nguyên toàn bộ nội dung từ [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts), không làm mất hoặc thay đổi bất kỳ thông điệp, trích dẫn hay số liệu nào.
- **5. Kiểm Thử & Biên Dịch**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server hoạt động bình thường trên cổng 3001.

---

## [3.47.0] - 2026-10-26
### Xóa Bỏ Hoàn Toàn Hiệu Ứng Nghiêng & Chuẩn Hóa Lưới Thẻ Dự Án Dạng Responsive Grid Card View
- **1. Xóa Bỏ Triệt Để Hiệu Ứng Thẻ Nghiêng (Complete Tilt Removal)** ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx)):
  - Loại bỏ hoàn toàn các biến góc xoay `--tilt`, `--shift-y`, `TILT_PRESETS`, `SHIFT_PRESETS` và thuộc tính inline style xoay ngẫu nhiên trên thẻ dự án.
  - Các thẻ card `.cp-card` nằm ngay ngắn, vuông vắn, trực quan và chuẩn mực (`rotate: 0deg; translate: none; transform: none;`).
  - Hiệu ứng rê chuột (Hover Interaction) được thiết kế lại theo tiêu chuẩn hiện đại: nâng nhẹ thẻ mượt mà `transform: translateY(-6px)` và tỏa bóng mờ thanh lịch, hoàn toàn không xoay lệch góc.
- **2. Định Dạng Lưới Thẻ Dự Án Dạng Responsive Grid Card View (1 / 2 / 3 Cột)**:
  - Cấu trúc lưới `.u308-g` được chuẩn hóa responsive theo từng điểm ngắt màn hình:
    - **Điện thoại di động (< 640px)**: 1 cột hiển thị rộng rãi (`grid-template-columns: repeat(1, minmax(0, 1fr))`, `gap: 1.25rem`).
    - **Máy tính bảng (640px - 1024px)**: 2 cột cân xứng (`grid-template-columns: repeat(2, minmax(0, 1fr))`, `gap: 1.25rem`).
    - **Màn hình lớn Desktop (>= 1024px)**: 3 cột đều đặn (`grid-template-columns: repeat(3, minmax(0, 1fr))`, `gap: 1.5rem`).
  - Tối ưu khung hình ảnh `.cp-card-media` theo tỷ lệ `16 / 10.5` với góc bo trên `10px`, tạo cảm giác thẻ dự án sắc sảo, cao cấp và không bị quá thưa hay xô lệch.
- **3. Thích Ứng Đồng Bộ Cả 2 Giao Diện Sáng (Light Glass) & Tối (Dark Neon)**:
  - Nền Light Glass sử dụng bóng đổ phân tầng mềm mại `box-shadow: 0 4px 18px -2px rgba(15,23,42,0.07)`.
  - Nền Dark Neon sử dụng ánh sáng huyền ảo phát quang nhẹ `box-shadow: 0 6px 20px -2px rgba(0,0,0,0.65), 0 0 16px rgba(34,211,238,0.06)`.
- **4. Kiểm Thử & Nghiệm Thu**:
  - Bảo toàn 100% dữ liệu 21 dự án trong [`src/data/projects.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/projects.ts).
  - Hoàn tất kiểm thử `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server chạy ổn định trên cổng 3001.

---

## [3.46.0] - 2026-10-26
### Chuẩn Hóa Toàn Bộ Card Trên Website Bo Cong 14px (Universal Card Border Radius 14px)
- **1. Thiết Lập Quy Tắc Toàn Cục (Global CSS Rules & Design Tokens)**:
  - Cập nhật Design Tokens tại [`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css):
    - Đặt `--card-radius: 14px;`, `--radius-lg: 14px;`, `--radius-xl: 14px;`, `--radius-2xl: 14px;`.
  - Tích hợp bộ chọn CSS bao quát toàn bộ các lớp Card trong [`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css):
    - `.theme-pastel-card`, `.bento-card`, `.bento-view-card`, `.edu-grid-card`, `.edu-stack-card`, `.system-item`, `.system-flip-front`, `.system-flip-back`, `.system-flip-inner`, `.card-104`, `.cp-card`, `.u308-it`, `.glass-card`, `.glass-panel-card`, `.editorial-card`, `.bento-cell`, `.hero-banner-card`, `.hero-banner`, `.theme-hero-banner`, `.smart-adaptive-card`, `#center-card`, `main#center-card`, `.u223-c` đều nhận `border-radius: 14px !important;`.
  - Cấu hình Tailwind CSS trong [`tailwind.config.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/tailwind.config.ts):
    - Mở rộng `borderRadius: { card: '14px', '2xl': '14px', '3xl': '14px' }`, tự động chuyển đổi toàn bộ tiện ích `rounded-2xl` và `rounded-3xl` thành **14px**.
- **2. Đồng Bộ Hóa Trực Tiếp Trên Từng Phân Hệ Giao Diện**:
  - **Khung Thẻ Chính (`#center-card`)**: [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Thẻ Hệ Thống 3D Flip**: [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx) bo tròn 14px cho cả mặt trước, mặt sau và khung banner.
  - **Thẻ Dự Án (CodePen Card)**: [`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx) bo tròn 14px `.cp-card`.
  - **Thẻ Lĩnh Vực (Bento Card)**: [`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Thẻ Kỹ Năng (Pastel Card)**: [`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Thẻ Học Vấn (Certificate / Book Card)**: [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Thẻ Kinh Nghiệm & Thẻ Job**: [`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx) đồng bộ toàn bộ 12 khối card về 14px (`rounded-[14px]`).
  - **Thẻ Thư Ngỏ (Bento View Card)**: [`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Thẻ Tử Vi (4 Slide Sections)**: [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Thẻ Liên Hệ (2 Side-by-Side Cards)**: [`src/components/views/ContactView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx) bo tròn 14px (`rounded-[14px]`).
  - **Hero Banners & Glass Panels**: [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx) và [`src/components/ui/GlassPanel.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GlassPanel.tsx) bo tròn 14px.
  - **Hộp Thoại Modal & AI Assistant Modal**: [`src/components/ui/Modal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/Modal.tsx) và [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx) bo tròn 14px.
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**. Dev server chạy ổn định trên cổng 3001.

---

## [3.45.0] - 2026-10-26
### Chuẩn Hóa Toàn Bộ Nội Dung Trong Thẻ Chính Với Padding 24px Đồng Bộ Toàn Hệ Thống
- **1. Chuẩn Hóa Padding 24px Trên Khung Thẻ Chính (`#center-card` / `#content-display`) ([`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
  - Nâng cấp vùng hiển thị nội dung trung tâm `#content-display` từ `md:p-[15px]` lên chuẩn **`md:p-[24px]`** (`p-4 sm:p-5 md:p-[24px]`).
  - Đồng bộ `scroll-pt-[24px]` và khoảng cách nhịp độ layout `gap-4 sm:gap-5 md:gap-[24px]`.
  - Toàn bộ 14 trang nội dung (Trang 0 đến Trang 13) khi hiển thị trong thẻ chính đều được canh lề cách viền thẻ chính chính xác 24px, mang lại bố cục cân đối, thoáng đãng, dễ đọc và đạt tỷ lệ vàng thị giác.
- **2. Đồng Bộ Padding 24px Trên Trang Chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - Container giao diện tương tác lớp trên của Trang Chủ được điều chỉnh sang `p-4 sm:p-5 md:p-[24px]`, đảm bảo nền video phủ trọn thẻ chính bo 20px nhưng các nút bấm, lời chào và thẻ tóm tắt đều cách đều mép 24px.
- **3. Tối Ưu Hóa Trang Giới Thiệu Khử Trùng Lặp Padding ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Gỡ bỏ lớp đệm lồng ghép thừa `p-3 sm:p-4 lg:p-5` ở thẻ bọc ngoài `section#about`, giúp các slide Bento của Giới Thiệu nhận chuẩn xác 24px padding từ thẻ chính mà không bị co hẹp diện tích.
- **4. Tối Ưu Khối Nội Dung Thẻ Dự Án 24px ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**:
  - Khối nội dung thẻ dự án `.cp-card-body` được chuẩn hóa `padding: 24px`, giúp tiêu đề, thông tin vai trò, mô tả và nút hành động trong thẻ chính dự án có khoảng đệm 24px sang trọng.
- **5. Kiểm Thử Toàn Diện**:
  - Hoàn tất kiểm thử `pnpm exec tsc --noEmit` đạt **0 lỗi (Exit Code 0)**. Dev server hoạt động mượt mà.

---

## [3.44.0] - 2026-10-26
### Nâng Cấp Tiêu Đề Thẻ Dự Án (Project Cards): Tên Đầy Đủ, Số Thứ Tự Nhận Diện & Màu Sắc Đồng Bộ Theo Icon Nhóm
- **1. Hiển Thị Đầy Đủ Tên Dự Án (Full Project Title Restoration)**:
  - Loại bỏ hoàn toàn quy tắc cắt ngắn tiêu đề 4 chữ trên các thẻ dự án trong [`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx).
  - Tách lọc chuỗi thông minh giữ trọn vẹn toàn bộ câu chữ nguyên bản của từng dự án từ [`src/data/projects.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/projects.ts), ví dụ: `Xây dựng và vận hành Phòng Dịch vụ Khách hàng`, `Chiến lược Lấy Khách hàng làm Trung tâm & Khung TQA chuẩn COPC`, `Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH`.
- **2. Bổ Sung Số Nhận Diện Phía Trước Tiêu Đề (Project Code / Number Prefix)**:
  - Ghép tiền tố mã số chuẩn hóa theo định dạng `${proj.code} · ${tên đầy đủ}`, ví dụ:
    - `1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng`
    - `1.2 · Thiết lập mục tiêu phòng ban`
    - `2.1 · Chiến lược Trải nghiệm Khách hàng`
    - `3.1 · Nâng cao chất lượng trải nghiệm khách hàng`
    - `5.4 · Chiến lược Lấy Khách hàng làm Trung tâm & Khung TQA chuẩn COPC`
    - `5.6 · Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH`
  - Đảm bảo hiển thị đồng bộ cả trong chế độ Lưới (Grid view) lẫn chế độ Danh sách (List view).
- **3. Đồng Bộ Màu Sắc Tiêu Đề Giống 100% Màu Icon Nhóm (Icon-to-Title Color Matching)**:
  - Thiết lập thuộc tính `style={{ color: cfg.accentColor }}` trực tiếp cho tiêu đề thẻ `h2.cp-card-title`, `span` nội dung và thẻ tiêu đề trong danh sách `b`.
  - Cập nhật quy tắc CSS `.cp-card-title` và selector `[data-theme="dark-neon"] .cp-card-title` thành `color: inherit`, giúp màu sắc thương hiệu của từng nhóm chuyên môn (Sky Blue `#0284c7`, Warm Orange `#ea580c`, Rose Ruby `#e11d48`, Violet `#7c3aed`, Mint Emerald `#059669`) tự động phản chiếu rực rỡ và hài hòa giữa icon và tiêu đề chữ.
- **4. Bảo Toàn Dữ Liệu & Kiểm Thử Toàn Diện**:
  - Bảo toàn 100% dữ liệu gốc trong [`src/data/projects.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/projects.ts) (21 dự án thực chiến).
  - Hoàn tất kiểm thử `pnpm exec tsc --noEmit` với **0 lỗi (Exit Code 0)**. Dev server chạy ổn định trên cổng 3001.

---

## [3.43.0] - 2026-10-26
### Tối Ưu Hóa Bố Cục & Giao Diện Trang Thư Ngỏ (LetterView) & Chuyển Trang Giới Thiệu (AboutView) Sang Hệ Thống Slide Trình Chiếu
- **1. Tối Ưu Hóa Bố Cục & Giao Diện Trang Thư Ngỏ ([`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Thanh Điều Hướng Trung Tâm Cố Định Trên Cùng (Executive Glass Navigation Bar)**:
    - Nhóm các công cụ điều khiển cốt lõi lên một thanh bar glassmorphism sang trọng, cố định ngay trên đầu trang cho cả chế độ 4 Slide và chế độ Toàn Văn 1 Trang.
    - Chuyển đổi linh hoạt giữa `Chế Độ 4 Slide` và `Xem Toàn Văn (1 Trang)`.
    - Tab 4 Slide có đánh số thứ tự trực quan: `1. Thông Điệp Hợp Tác`, `2. Sự Nghiệp 2002 - 2011`, `3. Sự Nghiệp 2013 - 2023+`, `4. Triết Lý Quản Trị`.
    - Tích hợp nhanh: Nút Giọng Đọc AI (kèm sóng âm thanh Waveform), Cá Nhân Hóa Tên Quý Công Ty (`?company=...`), Xuất File PDF A4 và Lưu Mặc Định.
  - **Khử Trùng Lặp & Tinh Chỉnh Bố Cục Slide**:
    - Loại bỏ việc lặp lại 7 nút điều khiển trong tiêu đề của từng slide con, giúp các slide 1, 2, 3, 4 trở nên tinh tế, thoáng đãng và có trật tự thị giác rõ ràng.
    - Cặp nút tròn điều hướng trái/phải (`prev` / `next`) được tối ưu z-index và hiệu ứng hover neon cao cấp.
    - Bảo toàn 100% dữ liệu lịch sử công tác (`CAREER_MILESTONES_DATA`), triết lý quản trị và 4 giá trị cốt lõi (`CORE_VALUES_DATA`).
- **2. Chuyển Đổi Trang Giới Thiệu Thành Hệ Thống Trình Chiếu Slide ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - **Cấu Trúc 4 Slide Trình Chiếu Chuyên Biệt**:
    - **Slide 1 - Tổng Quan & Video Trợ Lý Ảo**: Khung Hero Video banner đa tương tác (phát video phỏng vấn, mở rộng toàn màn hình, nút "Hủy (Dừng video)" phím ESC, tắt/bật âm thanh), lời chào Nguyễn Hùng Thái, chữ viết tay "Luôn bên bạn ♡" và 4 thẻ thống kê nổi bật (`ABOUT_PROFILE_STATS`: 22+ Năm Kinh Nghiệm, 8+ Môi Trường, 24/7 AI CRM, 99% CSAT).
    - **Slide 2 - Thông Tin Cá Nhân & Vị Trí Cư Trú**: Bố cục Bento 2 cột với bên trái là 6 thẻ thông tin nhân khẩu (`PERSONAL_DEMOGRAPHICS`: Giới tính, Dân tộc, Tình trạng, Sinh nhật, Tạm trú Q7, Cư trú Tiền Giang) và bên phải là Khung Bản Đồ Google Maps tương tác trực quan với nút chuyển đổi nhanh giữa Tạm trú & Cư trú kèm nút "Mở Google Maps".
    - **Slide 3 - Chân Dung Vận Hành & 3 Trụ Cột Chiến Lược**: Bento Cell giới thiệu 22 năm kinh nghiệm thực chiến + Mascot GIF Tí Chuột, kết hợp bộ 3 card trụ cột gradient 3D hiện đại (01. Hiệu Quả - Xanh Lam, 02. Nhân Văn - Hồng Đào, 03. Bền Vững - Xanh Ngọc).
    - **Slide 4 - Giá Trị Cốt Lõi & Triết Lý Tầm Nhìn**: Thẻ Giá Trị Cốt Lõi ("Sự hài lòng không đến từ sự hoàn hảo tuyệt đối...") và Thẻ Triết Lý Tầm Nhìn ("Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng - CX 2026+").
  - **Tính Năng Điều Hướng & Trải Nghiệm Người Dùng**:
    - Thanh điều hướng kính mờ trên đầu với 4 tab slide, huy hiệu tiến trình `Slide 1 / 4` và nút chuyển chế độ `Chế Độ Slide` ↔ `Xem Toàn Bộ (1 Trang)`.
    - Cặp nút tròn chuyển slide trái/phải (`←` / `→`) bám sát mép màn hình với hiệu ứng hover scale và viền sáng phát quang.
    - Hỗ trợ phím tắt toàn cục: Mũi tên trái `←` (Slide trước) và Mũi tên phải `→` (Slide tiếp theo).
    - Chuyển cảnh mượt mà giữa các slide bằng `animate-slide-next` và `animate-slide-prev`.
- **3. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu gốc trong [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts) và [`src/data/letterData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/letterData.ts).
  - Tương thích pixel-perfect cả 2 giao diện Sáng (`Light Glass`) và Tối (`Dark Neon`).
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**. Dev server chạy ổn định trên cổng 3001.

---

## [3.42.0] - 2026-10-26
### Nâng Cấp Hệ Thống Trình Chiếu Nền Tự Động (Slideshow 2.0): Đếm Ngược, Cross-Fade, Phím Tắt, Giờ Thực & Dynamic Island Pill
- **1. Thanh Tiến Trình Đếm Ngược Hình Nền (Live Countdown Progress Bar)**:
  - Tích hợp thanh line siêu mỏng `h-[3px]` cố định góc đáy màn hình (`fixed bottom-0`), hiển thị dải gradient `cyan-400 -> indigo-500 -> fuchsia-500` và đổ bóng phát sáng `shadow-[0_0_8px_rgba(34,211,238,0.7)]` cập nhật mượt mà theo chu kỳ mỗi 100ms.
  - Đi kèm huy hiệu đếm ngược số giây thực tế còn lại (`Nền kế tiếp: Xs`) với đèn tín hiệu xanh ngọc nhấp nháy ở góc phải đáy màn hình (`fixed bottom-1.5 right-3`).
- **2. Hiệu Ứng Chuyển Cảnh Cross-Fade Mượt Mà (Transition Effects)**:
  - Bổ sung 3 tùy chọn hòa trộn chuyển cảnh trong [`src/components/layout/BackgroundLayer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/BackgroundLayer.tsx):
    - `Hòa tan (Dissolve)`: Chuyển dịch độ mờ mềm mại với `@keyframes wp-dissolve`.
    - `Mờ ảo (Blur Dissolve)`: Hòa trộn mờ quang học `blur(8px) -> blur(0px)` với `@keyframes wp-blur-dissolve`.
    - `Phóng nhẹ (Zoom Out)`: Phóng nhẹ từ `scale(1.05) -> scale(1.0)` với `@keyframes wp-zoom-out`.
  - Tự động kích hoạt mỗi khi hình nền thay đổi (qua hẹn giờ slideshow, phím tắt hoặc nút bấm thủ công).
- **3. Phím Tắt Toàn Cục Điều Khiển Trình Chiếu (Global Keyboard Shortcuts)**:
  - Nhấn `Space` hoặc phím `P`: Bật / Tạm dừng nhanh chế độ trình chiếu hình nền từ bất kỳ trang nào.
  - Nhấn phím Mũi tên Phải (`→`): Chuyển ngay lập tức sang hình nền tiếp theo trong danh sách và reset lại bộ đếm thời gian.
  - Tích hợp cơ chế thông minh nhận diện và bỏ qua phím tắt khi người dùng đang nhập văn bản trong `input`, `textarea`, `select`, `contentEditable` hoặc khi đang mở hộp thoại Modal AI Assistant.
- **4. Trình Chiếu Theo Khung Giờ Thực (Time-of-Day Adaptive Wallpaper)**:
  - Tích hợp tùy chọn `Theo giờ thực ⏰` (`time-of-day`) trong bộ lọc giao diện trình chiếu:
    - Ban ngày (`6:00 - 18:00`): Tự động ưu tiên chọn các hình nền có tông sáng, bình minh, pastel, bầu trời và kính mờ.
    - Ban đêm (`18:00 - 6:00`): Tự động ưu tiên chọn các hình nền có tông tối, cực quang, dạ quang neon và không gian vũ trụ sâu.
- **5. Thông Báo Mini Khi Đổi Nền (Subtle Dynamic Island Pill Toast)**:
  - Khi hình nền tự động hoặc thủ công chuyển sang ảnh mới, hiển thị một viên thuốc nổi siêu nhỏ (pill toast) tại đỉnh màn hình (`fixed top-3.5 sm:top-4`) trong 2.4 giây.
  - Hiển thị tên tác phẩm hình nền, nhãn tông màu (`Nền Sáng` / `Nền Tối`) và định dạng nền (`IMAGE`, `CSS`, `GRADIENT`, `VIDEO`, `CLASS`).
- **6. Kiểm Thử Hệ Thống & Bảo Toàn Dữ Liệu**:
  - Bảo toàn 100% dữ liệu hình nền hiện có và tương thích hoàn hảo cả 2 chế độ Sáng (`Light Glass`) và Tối (`Dark Neon`).
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.41.0] - 2026-10-26
### Tích Hợp Bố Cục, Màu Sắc, Giao Diện Thẻ & Hiệu Ứng CodePen Vào Thẻ Lĩnh Vực (Bảo Toàn 100% Data)
- **1. Phân Tích & Chuyển Đổi Giao Diện Thẻ Lĩnh Vực ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - **Khung thẻ Kính Acrylic Cao Cấp**: Ứng dụng dải nền `bg-gradient-to-b from-white/75 to-white/42` (Giao diện Sáng) và `from-slate-900/88 to-slate-950/78` (Giao diện Tối), độ mờ kính mờ `backdrop-blur-[0.65em]`, viền mảnh tinh tế `border border-white/60 dark:border-white/10`, bo góc `rounded-2xl` và bóng đổ sâu `shadow-[0_12px_32px_-6px_rgba(28,7,8,0.12)]`.
  - **Bố cục 2 Cột Đối Xứng**:
    - **Cột Trái (Nội dung & Hành động)**:
      - Tiêu đề Domain với icon vector đồng bộ cùng màu nhấn `accentColor` và text-shadow nổi nhẹ.
      - Hàng tag badges đặc trưng `.tag-lines` và `.tag`: thẻ tag bo góc `5px`, nền xám sáng `hsl(0deg 0% 96% / 90%)`, hiển thị kinh nghiệm công tác và từ khóa chuyên ngành.
      - Đoạn mô tả định hướng chuyên môn `p.text-sm` với độ tương phản cao, dễ đọc trên cả 2 nền Sáng/Tối.
      - Nút CTA dạng viên thuốc `.panel-heading` / `.panel-title a`: Nút "Xem lĩnh vực" bo tròn `rounded-full` với màu gradient rực rỡ, đổ bóng sáng viền inset `inset 0px 1px 0px 0px rgba(255,255,255,0.45)`, mũi tên trượt sang phải khi hover.
      - Bộ huy hiệu tròn logo thương hiệu đối tác (`logo-pill-light`) được đặt tinh tế cạnh nút CTA.
    - **Cột Phải (Hình 3D Phối Cảnh & Đổ Bóng Sâu)**:
      - Tái hiện phong cách `img.recipe_img` từ mẫu CodePen: hình minh họa 3D nghiêng nhẹ `rotate-[4.5deg]` với bộ lọc đổ bóng sâu `drop-shadow(4.5px 6px 10px rgba(28,7,8,0.22)) saturate(1.25) contrast(0.95)`, khi hover thẻ sẽ xoay về `rotate-0` và phóng nổi nhẹ `scale-110`.
- **2. Bảo Toàn 100% Dữ Liệu Lĩnh Vực (`DOMAINS_DATA`)**:
  - Giữ nguyên tuyệt đối toàn bộ 6 lĩnh vực, ID, tiêu đề tiếng Việt/tiếng Anh, số năm kinh nghiệm, định hướng chiến lược, danh sách đối tác và toàn bộ chế độ xem chi tiết Full-screen STAR.
- **3. Kiểm Thử Hệ Thống**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.40.0] - 2026-10-26
### Tạo Nút Bật/Mở Bảng Điều Khiển "Trình Chiếu Tự Động" (Reveal on Click)
- **1. Cơ Chế Thu Gọn & Mở Theo Nhu Cầu Tại [`src/components/views/WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx)**:
  - Bổ sung trạng thái `isSlideshowOpen` (mặc định đóng `false`) giúp giao diện luôn tinh gọn, thoáng đãng khi người dùng duyệt kho ảnh nền.
  - **Nút "Trình Chiếu Tự Động" trên thanh công cụ Banner**: Tích hợp nút dạng viên thuốc cao cấp cạnh `Zen Mode` và `Gradient Studio`, hiển thị icon động, nhãn `Trình Chiếu Tự Động` / `Đóng Trình Chiếu` và chấm xanh pulsing khi đang chạy luân chuyển nền ngầm.
  - **Khối Trigger thu gọn trong Bảng điều khiển nền**: Khi chưa mở (`!isSlideshowOpen`), hiển thị thẻ tóm tắt trạng thái (Đang chạy / Đang tắt, thời gian lặp) cùng nút **"Mở cài đặt"** kèm icon chevron. Khi bấm vào, bảng điều khiển chi tiết bung ra mượt mà (`animate-fadeIn`) kèm nút `Thu gọn` để dễ dàng đóng lại.
  - Giữ nguyên 100% các tính năng: bật/tắt luân chuyển nền, chọn chu kỳ (30s, 1p, 3p, 5p), lọc hình nền theo giao diện (Tự động ☀️🌙, Chỉ nền Sáng ☀️, Chỉ nền Tối 🌙, Tất cả nền), chế độ Chỉ hình nền Yêu thích, và nút đổi nền kế tiếp.
- **2. Đồng Bộ Nhãn Nút Trình Chiếu Tại [`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx)**:
  - Đồng bộ nhãn nút bấm chế độ thuyết minh hành trình sự nghiệp thành `Trình Chiếu Tự Động` / `Dừng Trình Chiếu`, bấm vào sẽ kích hoạt phát giọng đọc AI và mở thanh thuyết minh Timeline 8 cột mốc (2003 → 2026+).
- **3. Kiểm Thử Hệ Thống**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.39.0] - 2026-10-26
### Tích Hợp Giao Diện, Hệ Màu OKLCH & Hiệu Ứng Nghiêng Vật Lý CodePen Vào Thẻ Dự Án (Bảo Toàn 100% Dữ Liệu)
- **1. Phân Tích & Áp Dụng Cấu Trúc Giao Diện CodePen ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**:
  - Chuyển đổi khung thẻ dự án ở chế độ Lưới (`Grid Mode`) sang cấu trúc ngữ nghĩa của CodePen: `<article className="u308-it cp-card">` bao gồm `<figure className="u308-ph cp-card-media">`, `<div className="cp-card-body">`, `<span className="cp-card-category">`, `<h2 className="cp-card-title">`, `<p className="cp-card-desc">` và `<div className="cp-card-action">` chứa nút viên thuốc `.cp-button` kèm mũi tên `.cp-arrow` (`→`).
  - Áp dụng chính xác bảng màu không gian màu **OKLCH** từ CodePen cho Giao diện Sáng (`Light Mode`):
    - Nền thẻ `.cp-card`: `#fff`, bo góc `border-radius: 8px`, đệm trong `padding: 12px`, viền `1px solid oklch(92% 0.01 260)`.
    - Khung ảnh `.cp-card-media`: tỷ lệ `aspect-ratio: 16 / 11`, bo góc `border-radius: 4px`, nền chờ `oklch(94% 0.01 260)`.
    - Nhãn phân loại `.cp-card-category`: `font-size: 0.65rem`, `font-weight: 700`, `letter-spacing: 0.14em`, `text-transform: uppercase`, màu `oklch(52% 0.02 260)`.
    - Tiêu đề `.cp-card-title`: `font-weight: 700`, `letter-spacing: -0.02em`, `line-height: 1.22`, màu `oklch(18% 0.02 260)`.
    - Mô tả `.cp-card-desc`: `font-size: 0.875rem`, `line-height: 1.55`, màu `oklch(45% 0.02 260)`.
    - Nút hành động `.cp-button`: dạng pill `border-radius: 999px`, nền `oklch(95% 0.01 260)`, chữ `oklch(20% 0.02 260)`, khi hover chuyển sang nền `oklch(20% 0.02 260)` và chữ `#fff`.
  - Đồng bộ hoàn hảo với Giao diện Tối (`Dark Neon Mode` — `[data-theme="dark-neon"]` / `.dark`) bằng hệ màu OKLCH tương ứng (`oklch(21% 0.025 260)`, viền `oklch(32% 0.03 260)`, nút hover `oklch(82% 0.14 210)`).
- **2. Hiệu Ứng Nghiêng Vật Lý (`--tilt`, `--shift-y`) & Tương Tác Rê Chuột (`:hover`, `:focus-visible`)**:
  - Tích hợp cả quy tắc `@supports (opacity: random(0, 1))` nguyên bản từ CodePen lẫn biến CSS định sẵn theo từng thẻ (`--card-tilt`, `--card-tilt-abs`, `--card-shift-y`) để hiệu ứng nghiêng ngẫu nhiên tự nhiên (`rotate: calc(var(--tilt) * 1deg)`, `translate: 0 var(--shift-y)`, bóng đổ lệch hướng `box-shadow: calc(var(--tilt) * 2px) calc(10px + var(--tilt-abs) * 1px) 28px oklch(20% 0.02 260 / 0.07)`) hoạt động tức thì trên mọi trình duyệt (Chrome, Edge, Safari, Firefox).
  - Khi rê chuột (`:hover`) hoặc focus bàn phím (`:focus-visible` / `:has(.cp-button:focus-visible)`):
    - Thẻ tự động cân bằng về `rotate: 0deg`, nhấc nổi lên `translate: 0 -10px`, `z-index: 10` với bóng đổ sâu `0 20px 44px oklch(20% 0.02 260 / 0.12), 0 2px 6px oklch(20% 0.02 260 / 0.04)`.
    - Ảnh dự án phóng nhẹ `scale: 1.03` (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
    - Mũi tên `.cp-arrow` trượt sang phải `translate: 4px 0`.
  - Hỗ trợ đầy đủ `@media (prefers-reduced-motion: reduce)` và giữ nguyên hiệu ứng chuyển đổi mượt mà FLIP giữa chế độ Lưới (`Grid`) và Danh sách (`List`).
- **3. Bảo Toàn 100% Dữ Liệu Dự Án (`PROJECTS_DATA`)**:
  - Giữ nguyên tuyệt đối toàn bộ 21 dự án, mã dự án (`proj.code`), nhóm lĩnh vực (`parentGroup.pillText`), tiến độ (`proj.progressText`), icon, tiêu đề (`proj.title`), mô tả (`proj.description`), vai trò (`proj.role`) và sự kiện mở Modal chi tiết STAR (`onOpenProject`).

---

## [3.38.0] - 2026-10-26
### Audit & Fix Toàn Diện Giao Diện Sáng (Light Glass) & Giao Diện Tối (Dark Neon) Toàn Bộ Website
- **1. Khắc Phục Triệt Để Lỗi Chớp Giao Diện Khi Tải / Làm Mới Trang (FOUC Prevention) ([`src/app/layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx))**:
  - Bổ sung đoạn mã đồng bộ tức thì (`pre-paint script`) trong `<head>` đọc `localStorage.getItem('hungthai_site_theme')` trước khi trình duyệt render khung hình đầu tiên, thiết lập thuộc tính `data-theme` (`light-glass` hoặc `dark-neon`) và class `.dark` trên `document.documentElement`.
  - Bổ sung `dark:bg-slate-950 dark:text-slate-100` trên thẻ `<body>` để triệt tiêu hoàn toàn hiện tượng lóe nền trắng khi làm mới (F5) ở chế độ Dark Mode.
- **2. Chuẩn Hóa Design Tokens & CSS Overrides Gốc Tại [`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css)**:
  - Khai báo `color-scheme: light` cho `:root, [data-theme="light-glass"]` và `color-scheme: dark` cho `[data-theme="dark-neon"], html.dark` để thanh cuộn trình duyệt, menu `<select>` và các control gốc tự động đồng bộ theo chủ đề.
  - Gỡ bỏ quy tắc ghi đè cứng `[data-theme="dark-neon"] .font-play` và `strong` ép `color: #f8fafc !important` kèm bóng phát sáng 3 lớp 35px gây nhòe chữ nội dung nhỏ và làm mất màu nhấn thương hiệu (`accentColor`) trên tiêu đề/icon.
  - Tách biệt độ trong suốt bề mặt trong Dark Mode: Các thẻ nội dung (`.bg-white/40` → `.bg-white/85`) sử dụng nền kính tối `rgba(15, 23, 42, 0.68)`, trong khi các bề mặt Modal, Popup, Dropdown có độ đặc cao (`.bg-white/90`, `.bg-white/95`, `.bg-white/98`, `.bg-white`) sử dụng nền kính tối đậm `rgba(15, 23, 42, 0.92)` có độ tương phản cao, ngăn chữ nền phía sau xuyên qua gây rối mắt.
  - Bảo vệ class `.logo-pill-light` bằng `:not(.logo-pill-light)` để các huy hiệu logo thương hiệu/đối tác luôn giữ nền sáng rõ nét trong cả Light Mode và Dark Mode.
- **3. Đồng Bộ Hóa Toàn Bộ Component Dùng Chung & Modal/Popup**:
  - **Component [`Modal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/Modal.tsx) & [`Toast.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/Toast.tsx)**: Bổ sung đầy đủ hệ class `dark:bg-slate-900/95`, `dark:border-white/15`, `dark:text-slate-100`, `dark:border-slate-800` cho khung Modal, tiêu đề, phụ đề, nút đóng và thông báo Toast.
  - **Component [`ThemeSelectorModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/ThemeSelectorModal.tsx)**: Cố định hộp xem trước (Preview Box) của giao diện `Kính Sáng Đa Sắc (Light Glass)` bằng `.logo-pill-light` và style nội tuyến để luôn hiển thị đúng mẫu giao diện sáng ngay cả khi đang mở từ chế độ tối.
  - **Component [`HomeFannedTestimonials.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HomeFannedTestimonials.tsx)**: Kích hoạt đầy đủ biến `isDark` cho cả chế độ xếp quạt (`Fanned Stack`) và chế độ danh sách (`Reduced Motion List`), cũng như khung minh họa chân dung (`DrawnPortraitIllustration`). Giữ nguyên 100% thông số Light Shadcn (`#FAFAFA` / `#FFFFFF` / `#09090B` / `#4F46E5`) ở chế độ Sáng và chuyển sang Dark Shadcn/Neon (`bg-slate-900/90` / `#1E293B` / `#F8FAFC` / `#818CF8`) ở chế độ Tối.
  - **Component [`AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx)**: Bổ sung đồng bộ class `dark:` cho Header, các nút điều khiển cửa sổ, Modal Cấu Hình Giọng Nói AI, vùng lịch sử tin nhắn, bong bóng phản hồi của Tí Chuột AI, thanh gợi ý câu hỏi nhanh, Popup Menu 6 Nhóm Câu Hỏi và thanh nhập liệu.
- **4. Đồng Bộ Bảng Màu Kính Đa Sắc Sáng / Tối Tại Các Trang Chuyên Mục**:
  - **Trang Lĩnh Vực ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx), [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**: Bổ sung cấu hình `isDark` cho cả 6 thẻ lĩnh vực (`01` Viễn thông, `02` TMĐT, `03` Bảo hiểm, `04` eSports, `05` FinTech, `06` Hệ thống) với dải nền kính tối đa sắc (`darkCardBg`), viền neon và pill badge tương ứng; gắn `.logo-pill-light` cho toàn bộ huy hiệu tròn logo công ty đối tác.
  - **Trang Dự Án ([`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx)) & Trang Liên Hệ ([`src/components/views/ContactView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx))**: Cập nhật bảng màu `getCardVisualConfig` theo `isLight` cho 5 nhóm dự án trọng điểm và đồng bộ `dark:text-slate-100` trên khung chính trang Liên Hệ.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.37.0] - 2026-10-26
### Tối Ưu Hóa Trang Card Hệ Thống Theo Giao Diện Sáng (Light Glass) & Giao Diện Tối (Dark Neon)
- **Tối Ưu Kép 12 Thẻ Hệ Thống Lật 3D (Mặt Trước & Mặt Sau) ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx), [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
  1. **Giao diện Sáng (`Light Mode / Light Pastel Glass`)**:
     - Mặt trước (`system-flip-front`) của cả 12 thẻ hệ thống (`CRM`, `Contact Center`, `Omnichannel`, `Quản Trị KPI`, `SOP & Quy Trình`, `Voice Of Customer`, `AI Chatbot`, `RPA & Workflow`, `Knowledge Base`, `QA & Quality`, `LMS & Đào Tạo`, `BI & Báo Cáo`) chuyển sang hệ bảng màu **Pastel Glass Đa Sắc** (`lightBg`, `lightBorder`) kết hợp vầng sáng ambient nhẹ nhàng, đồng bộ ngôn ngữ thiết kế với các trang Lĩnh Vực, Kỹ Năng và Dự Án.
     - Khắc phục triệt để xung đột `.system-item h3 { color: inherit !important; }`: Tiêu đề 4 chữ viết hoa (`h3`) và Vector Icon bên phải tự động đồng bộ 100% cùng tông màu thương hiệu đậm nét (`lightAccent`), mô tả phụ (`subtitle`) hiển thị màu `text-slate-700` có độ tương phản cao trên nền sáng.
     - Thanh đáy thẻ hiển thị huy hiệu mã phân hệ (`abbr`) kèm chấm trạng thái hoạt động (`dotColor`) và nút `Lật thẻ` dạng kính trắng trong suốt (`bg-white/90 border-slate-200/90`).
  2. **Giao diện Tối (`Dark Mode / Dark Neon Gradient`)**:
     - Mặt trước giữ trọn vẹn dải màu **Vivid Neon Multicolor Gradient** (`config.gradient`), viền sáng `rgba(255,255,255,0.28)` và hiệu ứng đổ bóng phát sáng (`0 0 18px ${cardTheme}35`), tiêu đề và icon vector hiển thị sắc trắng tinh khiết (`#ffffff`).
     - Riêng thẻ `CLP` khi rê chuột (`isClpHovered`) tự động kích hoạt chế độ phát video nền toàn thẻ kèm hiệu ứng sóng lan tỏa và chuyển chữ/icon sang màu trắng nổi bật trên cả 2 chế độ Sáng/Tối.
  3. **Mặt Sau Thẻ Lật 3D (`system-flip-back`) & Hệ Thống Control / Modal**:
     - Đồng bộ hóa nền kính mặt sau (`#ffffff` pha sắc thái pastel ở chế độ Sáng; `#090e17` pha radial glow neon ở chế độ Tối), hiển thị trạng thái trực tuyến, nút `Chi tiết` và `Mở cổng`.
     - Đồng bộ hóa hộp tìm kiếm, menu lọc danh mục Drop Top trong Banner dọc, Modal phát Video hệ thống và Modal chi tiết phân hệ theo cả 2 chế độ Sáng & Tối.
  4. **Bảo Toàn 100% Dữ Liệu (`SYSTEMS_DATA`)**:
     - Giữ nguyên tuyệt đối toàn bộ 12 phân hệ, tên gọi, đường dẫn URL, mô tả tiếng Việt/tiếng Anh và danh sách tính năng.

---

## [3.36.0] - 2026-10-25
### Cập Nhật & Phân Bổ Lại 6 Thẻ Kỹ Năng Tại Trang Kỹ Năng (Bảo Toàn 100% Dữ Liệu Gốc)
- **Chuẩn Hóa & Phân Bổ Hợp Lý 5 Nhóm Dữ Liệu (27 Mục) Vào 6 Thẻ Bento ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx), [`src/data/skills.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/skills.ts))**:
  1. **Thẻ 1 (`skill-01` — Điểm mạnh : Nền tảng vận hành & lãnh đạo)**:
     - Mô tả: *"Những năng lực cốt lõi đã được chứng minh qua thực tiễn quản lý, vận hành và phát triển hệ thống Dịch vụ Khách hàng."*
     - Hiển thị đầy đủ 6 kỹ năng ngay trên mặt thẻ (lưới 2 cột × 3 hàng) và trong trang chi tiết: `Trải nghiệm khách hàng (98%)`, `CRM Contact Center (96%)`, `Quản trị Hiệu suất (96%)`, `Lãnh đạo & Đội ngũ (95%)`, `SOP & Chuẩn hóa (95%)`, `Xử lý Khủng hoảng (94%)`.
  2. **Thẻ 2 (`skill-02` — Hoàn thiện : Nâng cao năng lực quản trị)**:
     - Mô tả: *"Những năng lực cần tiếp tục hoàn thiện để nâng tầm vai trò quản lý từ vận hành hiệu quả sang quản trị chiến lược và phát triển bền vững."*
     - Hiển thị đầy đủ 6 kỹ năng ngay trên mặt thẻ (lưới 2 cột × 3 hàng) và trong trang chi tiết: `Tư duy dịch vụ (92%)`, `Giao tiếp & Đàm phán (90%)`, `Tư duy Chiến lược (88%)`, `Quản trị Dự án (88%)`, `Công nghệ Đổi mới (86%)`, `Thiết kế & Lập trình (78%)`.
  3. **Thẻ 3 (`skill-03`) & Thẻ 4 (`skill-04`) — Phân bổ cân đối nhóm `Cơ hội : Công nghệ & chuyển đổi dịch vụ`**:
     - Mô tả: *"Những năng lực tạo đòn bẩy để nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi mô hình Dịch vụ Khách hàng trong thời đại số."*
     - **Thẻ 3 (Chuyển Đổi Dịch Vụ)**: Mặt ngoài hiển thị 3 mục chuyển đổi & tối ưu (`Kaizen & Cải tiến 94%`, `Tối ưu Chi phí 93%`, `Chuyển đổi Số 92%`), mở chi tiết hiển thị trọn bộ 6 mục Cơ hội.
     - **Thẻ 4 (Công Nghệ & AI)**: Mặt ngoài hiển thị 3 mục công nghệ, dữ liệu & hạ tầng (`AI & Tự động hóa 94%`, `Quản trị Dữ liệu 91%`, `Thiết kế Hệ thống 87%`), mở chi tiết hiển thị trọn bộ 6 mục Cơ hội.
  4. **Thẻ 5 (`skill-05` — Thách thức : Thích ứng & quản trị biến động)**:
     - Mô tả: *"Những yếu tố bên ngoài tác động trực tiếp đến chất lượng dịch vụ, nhân sự và hiệu quả vận hành, đòi hỏi khả năng thích ứng và quản trị chủ động."*
     - Tuân thủ Quy tắc #17: Gắn nhãn **"Mức độ tác động"** (thay vì *"Mức độ kỹ năng"*) cho cả 6 yếu tố: `Tối ưu Chi phí (94%)`, `AI & Thay đổi CSKH (92%)`, `Công nghệ Đổi mới (90%)`, `Quản trị Rủi ro (90%)`, `Cạnh tranh Nhân sự (88%)`, `Phối hợp Liên phòng (86%)`.
  5. **Thẻ 6 (`skill-06` — Ngôn ngữ : Giao tiếp & làm việc)**:
     - Mô tả: *"Khả năng sử dụng ngôn ngữ linh hoạt kết hợp công cụ AI hỗ trợ giao tiếp và làm việc hiệu quả trong môi trường quốc tế."*
     - Hiển thị đầy đủ 3 mục ngôn ngữ: `Tiếng Việt (90%)`, `Tiếng Anh (60%)`, `Ứng dụng AI (85%)`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.35.0] - 2026-10-25
### Cập Nhật Toàn Diện Nội Dung 8 Thẻ Công Tác (Job Cards 4.1 → 4.8) Tại Trang Kinh Nghiệm
- **Cập Nhật Dữ Liệu Nguồn ([`src/data/experienceUpdates.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/experienceUpdates.ts), [`src/types/index.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/types/index.ts))**:
  - Cập nhật chính xác 100% nội dung cho toàn bộ 8 cột mốc sự nghiệp (`4.1` đến `4.8`):
    - **4.1 (`2026`)**: `Sẵn sàng cho thử thách mới` — `Head of CX / CS Director / Trưởng Phòng Dịch vụ Khách hàng` (Banner: `https://i.ibb.co/WWNJ329X`, Ảnh kỷ niệm: `https://i.ibb.co/fYVwSxRW/T-m-C-h-i.png`).
    - **4.2 (`2023`)**: `Công ty Cổ phần Công nghệ Finviet (Ví điện tử ECO)` — `Trưởng Phòng Dịch vụ Khách hàng` (Logo: `https://i.ibb.co/7NtSSz4d/Finviet.png`, Banner: `https://i.ibb.co/rRfg2BGL`, Ảnh kỷ niệm: `https://i.ibb.co/cSXPhWcp/Finviet.png`, 11 dự án trọng điểm).
    - **4.3 (`2018`)**: `Công ty Cổ phần Mservice (Ví điện tử MoMo)` — `Trưởng Phòng Dịch vụ Khách hàng` (Logo: `https://i.ibb.co/k2QtrgTw/Momo.png`, Banner: `https://i.ibb.co/KxkWBZ8Z`, Ảnh kỷ niệm: `https://i.ibb.co/GQLRGwrw/Momo.png`, 8 dự án trọng điểm).
    - **4.4 (`2016`)**: `Công ty Bảo hiểm Nhân thọ Prudential Vietnam` — `Trưởng Phòng Call Center` (Logo: `https://i.ibb.co/XfpQphWF/Prudential.png`, Banner: `https://i.ibb.co/k2sMHMjH`, Ảnh kỷ niệm: `https://i.ibb.co/whFY0YV0/Prudentinal.png`, 5 dự án trọng điểm).
    - **4.5 (`2013`)**: `Công ty Cổ phần Việt Nam eSport (VED, Shopee, Garena, ShopeePay)` — `Trưởng Phòng Dịch vụ Khách hàng` (Logo: `https://i.ibb.co/fYPJLfbw/VED.png`, Banner: `https://i.ibb.co/qYT35B2m`, Ảnh kỷ niệm: `https://i.ibb.co/jknPRhj3/VED.png`, 6 dự án trọng điểm).
    - **4.6 (`2011`)**: `Công ty CPTT Băng Rộng Cuộc Sống - LBC HTVC` — `Trưởng Phòng Dịch vụ Khách hàng` (Logo: `https://i.ibb.co/R4YXWyzF/LBC.png`, Banner: `https://i.ibb.co/KcxptYYt`, Ảnh kỷ niệm: `https://i.ibb.co/Mykxzbbz/LBC.png`, 6 dự án trọng điểm).
    - **4.7 (`2007`)**: `Công ty Viễn Liên V247` — `Giám sát chăm sóc khách` (Logo: `https://i.ibb.co/QvtbdnfP/V247.png`, Banner: `https://i.ibb.co/LXWZDXw1`, Ảnh kỷ niệm: `https://i.ibb.co/bMZKjMhX/v247.png`, 3 dự án trọng điểm).
    - **4.8 (`2003`)**: `Công ty Viễn thông Mobifone` — `Nhân viên CSKH` (Logo: `https://i.ibb.co/hxHm9TsZ/Mobifone.png`, Banner: `https://i.ibb.co/n8LkPVSM`, Ảnh kỷ niệm: `https://i.ibb.co/KzryKQHx/Mobifone.png`, 3 dự án trọng điểm).
- **Đồng Bộ Giao Diện Thẻ Job Card ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - Loại bỏ các dữ liệu ghi đè cứng cũ, kết nối trực tiếp 100% trường dữ liệu từ `activeMilestone`: Mã mục (`4.1`–`4.8`), Tên công ty, Logo, Hình banner (kèm cơ chế fallback sang `memoryImg`), Thời gian công tác, Chức vụ, Quy mô quản lý, Lĩnh vực, 3 trụ cột Giới thiệu + Triết Lý Quản Trị (hiển thị đầy đủ văn bản không bị cắt chữ), Mô tả công việc, Dự án trọng điểm, Cam kết chất lượng, Kết quả KPI (`displayValue`) và Hình ảnh kỷ niệm.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.34.0] - 2026-10-25
### Nâng Cấp 5 Tính Năng Đột Phá Tại Trang Thư Ngỏ (One-Page Mode, Cá Nhân Hóa Quý Công Ty, Xuất PDF A4, Timeline Mini Tương Tác & Karaoke Word Sync)
- **Triển Khai Đồng Bộ Tại [`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx)**:
  1. **Chế Độ Xem Toàn Văn Thư Ngỏ Trên 1 Trang Cuộn (`One-Page Executive Letter Mode`)**:
     - Thêm nút chuyển đổi trực tiếp giữa **Chế Độ 4 Slide Bento** và **Xem Toàn Văn (1 Trang)** (`viewMode: 'slides' | 'one-page'`).
     - Trình bày toàn bộ bức thư ngỏ trang trọng liền một mạch (Tiêu đề thư, Lời chào, 7 cột mốc sự nghiệp 2002–2023+, Triết lý quản trị, 3 nguyên tắc cốt lõi, Trích dẫn tâm niệm, Lời kết và Chữ ký số Nguyễn Hùng Thái).
  2. **Cá Nhân Hóa Tên "Quý Công Ty" Theo Link Chia Sẻ (`?company=FPT`)**:
     - Tự động nhận diện tham số `?company=...` (hoặc `?doitac=...`, `?partner=...`) từ URL và tích hợp Modal tùy chỉnh nhanh tên Quý Công ty (kèm gợi ý chọn nhanh `FPT`, `Viettel`, `VNG`, `MoMo`, `Shopee`, `Techcombank`, `ACB`, `Prudential` và nút **Áp dụng & Copy Link Chia Sẻ**).
     - Đồng bộ hiển thị `"Kính chào Quý Công ty [Tên]!"` trên cả 4 Slide, chế độ 1 Trang, giọng đọc thuyết minh AI và bản xuất PDF A4.
  3. **Nút Tải Bản PDF "Thư Ngỏ Nguyễn Hùng Thái" Chuẩn A4 (`handleExportLetterPDF`)**:
     - Xuất trực tiếp toàn văn Thư Ngỏ ra cửa sổ in chuẩn khổ giấy A4 (`@page { size: A4 portrait; margin: 12mm 15mm; }`) với font `Play`, đầy đủ 7 cột mốc sự nghiệp, 3 nguyên tắc cốt lõi, chữ ký số vector và thông tin người nhận cá nhân hóa.
  4. **Timeline Mini Tương Tác Ngay Trên Đầu Slide 2 & Slide 3 (`renderInteractiveMiniTimeline`)**:
     - Thanh mốc năm `2002 → 2007 → 2011 → 2013 → 2016 → 2018 → 2023` hiển thị trực quan trên đầu Slide 2, Slide 3 và chế độ 1 Trang.
     - Nhấn vào năm bất kỳ để mở ngay Popup chi tiết cột mốc đó hoặc nhấn biểu tượng Loa trên từng mốc năm để phát ngay giọng đọc AI của cột mốc đó.
  5. **Hiệu Ứng Highlight Từ Khóa Theo Giọng Đọc (`Karaoke Word Sync`)**:
     - Theo dõi tiến độ đọc thực tế (`karaokeProgress` kết hợp `utterance.onboundary` và bộ đếm thời gian mượt `90ms`) để làm sáng tuần tự từng cụm từ khóa in đậm (`MobiFone`, `Viễn Liên V247`, `LBC`, `Garena`, `Liên Minh Huyền Thoại`, `Shopee`, `129 nhân sự`, `Prudential Việt Nam`, `MoMo`, `Ví ECO`, v.v.) trong thẻ đang được thuyết minh.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.33.0] - 2026-10-25
### Nâng Cấp Khối "Dấu Ấn Vận Hành & Năng Lực" Tại Trang Chủ Theo Chuẩn Light Shadcn Fanned Portrait Stack
- **Tái Cấu Trúc Component Độc Lập ([`src/components/ui/HomeFannedTestimonials.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HomeFannedTestimonials.tsx))**:
  - **Light Shadcn Section Register**: Nền Ground `#FAFAFA`, thẻ `#FFFFFF`, chữ chính Ink `#09090B`, chữ phụ Muted `#71717A`, viền mảnh `1px solid #E4E4E7`, điểm nhấn duy nhất Indigo `#4F46E5`, bo góc `12px–16px`, đổ bóng đơn `0 1px 2px rgba(9, 9, 11, 0.04)`, không dùng gradient trang trí hay ảnh chụp, font `Inter` (`400` cho nội dung, `600` cho tên & chức danh, `700` cho tiêu đề).
  - **Fanned Stack of Portrait Cards (`DrawnPortraitIllustration`)**:
    - Tách cột bộ bài chân dung xếp quạt (Portrait Cards) với thẻ đang chọn (`diff === 0`) đứng thẳng (`rotate(0deg)`), các thẻ lân cận xoè cánh quạt theo khoảng cách vòng lặp (`getWrappedDistance`) tạo thành vòng tròn khép kín (loop deck) thay vì đường thẳng.
    - Mỗi thẻ chân dung chứa bản vẽ vector (`DrawnPortraitIllustration`) đóng khung độc lập để nếu thay thế bằng thẻ `<img />` thì thứ tự xếp chồng (`z-index`), góc xoay (`rotate`) và vị trí (`translate3d`) vẫn giữ nguyên 100%.
  - **Initial-Based Coloured Disc Avatars (`InitialDiscAvatar`)**:
    - Tạo avatar từ chữ cái viết tắt (`HT`, `LĐ`, `AI`, `CS`, `OM`, `WF`, `HL`, `BI`, `TC`) trên đĩa màu tròn, không phụ thuộc tài nguyên ảnh bên ngoài.
  - **Responsive Reflow & Reduced-Motion Fallback**:
    - Bố cục tự động chuyển từ 2 cột (`sm:grid-cols-[172px_1fr]`) về 1 cột dọc trên màn hình nhỏ (`<= 390px`), đảm bảo không tràn viewport.
    - Khi hệ thống bật `prefers-reduced-motion: reduce` (hoặc người dùng bấm nút chuyển chế độ danh sách), toàn bộ cơ chế chuyển động xếp quạt được gỡ bỏ và thay bằng bố cục danh sách đọc trực diện.
    - Toàn bộ chuyển động sử dụng hàm điều tốc `cubic-bezier(0.16, 1, 0.3, 1)`.
  - **Bảo Toàn Dữ Liệu 100%**: Giữ nguyên toàn bộ 9 mục dữ liệu trong `TESTIMONIAL_DATA`.

---

## [3.32.0] - 2026-10-25
### Chuẩn Hóa Hệ Thống Typography Design System Toàn Bộ Website Nguyễn Hùng Thái
- **Thiết Lập Typography Design Tokens Tập Trung ([`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css), [`tailwind.config.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/tailwind.config.ts), [`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
  - Định nghĩa đầy đủ hệ thống CSS Variables chuẩn hóa tại `:root` và responsive `@media (max-width: 767px)`:
    - **Tiêu đề & Nội dung chính**: `--font-hero` (36px / 28px), `--font-h1` (32px / 26px), `--font-h2` (26px / 22px), `--font-h3` (22px / 20px), `--font-h4` (18px), `--font-h5` (16px), `--font-h6` (14px), `--font-body` (15px), `--font-body-sm` (14px), `--font-caption` (12px), `--font-overline` (12px).
    - **Thành phần giao diện**: `--font-nav` (14px), `--font-button` (14px), `--font-label` (13px), `--font-input` (14px Desktop / 16px Mobile chống auto-zoom), `--font-card` (14px), `--font-card-title` (18px / 16px), `--font-stat` (28px / 24px), `--font-stat-label` (12px), `--font-breadcrumb` (12px), `--font-tooltip` (12px), `--font-table` (13px), `--font-code` (13px).
    - **Font Weight**: Chuẩn hóa `--weight-regular` (400), `--weight-medium` (500), `--weight-semibold` (600), `--weight-bold` (700); ánh xạ các lớp `font-extrabold` / `font-black` về `var(--weight-bold, 700)` để loại bỏ hoàn toàn độ đậm 800/900 tùy tiện.
    - **Line-height & Letter-spacing**: Thiết lập `--line-heading` (1.2), `--line-subheading` (1.3), `--line-body` (1.6), `--line-body-sm` (1.5), `--line-compact` (1.4); giới hạn `letter-spacing` của văn bản viết hoa ở mức tối đa `0.04em` (`--tracking-overline`) để tiếng Việt luôn rõ dấu, dễ đọc.
- **Đồng Bộ Component Dùng Chung & Toàn Bộ 13 Trang ([`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx), [`src/components/ui/Modal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/Modal.tsx), [`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - Loại bỏ khối `@media (max-width: 639px)` ghi đè `clamp(...) !important` gây xung đột trên `h1, h2, h3` trong `globals.css`.
  - Đồng bộ `.typo-h2`, `.typo-h3`, `.typo-card-title`, `.typo-caption`, `.domain-card-title`, `.edu-card-title`, `.skill-card-title`, `.system-card-title`, `.project-card-title`, `label`, `input`, `textarea`, `select`, `table`, `code` trên tất cả các giao diện Sáng / Tối.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.31.0] - 2026-10-25
### Cập Nhật Toàn Diện Nội Dung Trang Thư Ngỏ (7 Cột Mốc Sự Nghiệp, Triết Lý Quản Trị & Lời Kết Đồng Hành)
- **Cập Nhật Dữ Liệu Thư Ngỏ ([`src/data/letterData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/letterData.ts))**:
  - Cập nhật nguyên văn 7 cột mốc sự nghiệp:
    1. **Năm 2002 – Khởi đầu tại MobiFone** (`card-2002`)
    2. **Năm 2007 – Phát triển năng lực quản lý tại Viễn Liên V247** (`card-2007`)
    3. **Năm 2011 – Bước ngoặt tại LBC – Truyền hình Cáp HTV** (`card-2011`)
    4. **Năm 2013 – Garena và hành trình chuyển đổi số** (`card-2013` – hiển thị đầy đủ 2 đoạn chuyên sâu về Liên Minh Huyền Thoại, Vietnam eSport, Shopee, AirPay, Gcafe, Liên Quân Mobile và quản trị 129 nhân sự)
    5. **Năm 2016 – Prudential Việt Nam** (`card-2016`)
    6. **Năm 2018 – MoMo** (`card-2018`)
    7. **Năm 2023 – Ví ECO** (`card-2023`)
  - Cập nhật 3 nguyên tắc cốt lõi trong `OPERATIONAL_PRINCIPLES_DATA`:
    1. *Quy trình tạo nền tảng.*
    2. *Con người tạo giá trị.*
    3. *Công nghệ tạo đòn bẩy.*
- **Đồng Bộ Giao Diện & Giọng Đọc AI 4 Phần Thư Ngỏ ([`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Slide 1 (Thông Điệp Hợp Tác)**: Cập nhật lời chào *"Kính chào Quý Công ty!"*, đoạn giới thiệu hơn 22 năm kinh nghiệm, thông điệp mong muốn đồng hành cùng Quý Công ty, lời cảm ơn và 3 trụ cột nguyên tắc đa màu sắc.
  - **Slide 2 (Sự Nghiệp 2002 - 2011)**: Bố cục Bento Grid 12 cột cho 3 cột mốc nền tảng (`MobiFone` 6 cột, `Viễn Liên V247` 6 cột, `LBC – Truyền hình Cáp HTV` 12 cột).
  - **Slide 3 (Sự Nghiệp 2013 - 2023+)**: Bố cục Bento Grid 12 cột gồm thẻ `Năm 2013 – Garena và hành trình chuyển đổi số` trải rộng 12 cột (chia 2 cột con bên trong hiển thị trọn vẹn nội dung) và 3 thẻ `Prudential Việt Nam`, `MoMo`, `Ví ECO` (mỗi thẻ 4 cột).
  - **Slide 4 (Triết Lý Quản Trị & Tâm Thư Đồng Hành)**: Cập nhật đầy đủ nội dung Triết lý quản trị, 3 nguyên tắc cốt lõi, câu tâm niệm *"Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời."* và lời kết cảm ơn Quý Công ty.
  - Đồng bộ toàn bộ kịch bản đọc thuyết minh AI (`narrationSegments`) khớp 100% với nội dung mới.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.30.0] - 2026-10-25
### Tích Hợp Phương Châm Phụng Sự Vào Thẻ Thông Điệp Hợp Tác & Thiết Kế Bố Cục Nội Dung Bên Trong Đa Màu Sắc
- **Tích Hợp Khối Châm Ngôn Vào Thẻ Thông Điệp Hợp Tác ([`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - Chuyển toàn bộ khối châm ngôn *"Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự." — Nguyễn Hùng Thái* (`id="quote-banner-slide-1"`) từ bên ngoài vào trực tiếp bên trong thẻ **Thông Điệp Hợp Tác** (`id="card-main-letter-content"`), giữ nguyên 100% nội dung và khả năng đồng bộ highlight giọng đọc thuyết minh AI.
- **Tái Cấu Trúc Bố Cục Nội Dung Bên Trong Đa Màu Sắc (Multicolor Bento Layout)**:
  - **Lời chào mở đầu (Tone Amber – Orange – Rose)**: Đặt trong dải callout đa sắc ấm áp (`from-amber-50/95 via-orange-50/90 to-rose-50/90`) với thanh nhấn trái màu cam rực rỡ (`#f95700`) và biểu tượng `sparkles`.
  - **2 Khối Nội Dung Chính Đa Sắc Màu (12-Column Bento Sub-Cards)**:
    - *Khối 1 — Định Danh & Bề Dày Kinh Nghiệm (Tone Sky – Cyan – Blue)*: Làm nổi bật tên **Nguyễn Hùng Thái** và huy hiệu **22 năm kinh nghiệm (2002 - 2026+)** với thanh viền đỉnh chuyển sắc `from-sky-500 via-cyan-500 to-blue-600`.
    - *Khối 2 — Tầm Nhìn CX & Tự Động Hóa (Tone Violet – Purple – Fuchsia)*: Nhấn màu đa sắc cho các từ khóa trọng tâm (*trải nghiệm khách hàng*, *tự động hóa bằng công nghệ*, *doanh thu và lòng trung thành của người dùng*) cùng thanh viền đỉnh `from-violet-500 via-purple-500 to-pink-500`.
  - **3 Trụ Cột Hợp Tác Đa Sắc (Blue-Cyan, Purple-Pink, Emerald-Teal)**: Mỗi trụ cột sở hữu dải màu nền kính mờ, viền, thanh nhấn đỉnh và màu chữ/icon đồng bộ riêng biệt.
  - **Khối Phương Châm Phụng Sự Nội Khu**: Nổi bật với dải màu `from-blue-600 via-indigo-600 to-purple-700` (Dark Mode: `from-indigo-950/95 via-purple-950/90 to-rose-950/90`) và huy hiệu ngoặc kép ánh vàng cam (`from-amber-400 to-orange-500`).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.29.0] - 2026-10-25
### Cập Nhật Video Banner Hệ Thống, Video Banner Kỹ Năng, Tăng Size Icon Hệ Thống, Tối Ưu Timeline Công Ty/Sản Phẩm & Format Bento Chân Dung Vận Hành
- **Cập Nhật Video & Tăng Size Icon Cổng Bento Hệ Thống ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Xóa khối 3 trụ cột (12 Phân Hệ Hợp Nhất 100%, Ai Agent 60%+, Sla Uptime 99.98%) trong banner dọc giúp bố cục thoáng đãng, tập trung.
  - Cập nhật Video 1: `https://cdn.scena.ai/project/10223/7bd12b39b9758378cc8f15b6169d42368b4778ad2f2f322b1ef8403c90268f24.mp4`
  - Cập nhật Video 2: `https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4`
  - Tích hợp nút chuyển đổi trực tiếp Video 1 / Video 2 ngay tại banner và trong lightbox player.
  - Tăng kích thước toàn bộ icon trên 12 thẻ hệ thống lên `w-12 h-12 sm:w-14 sm:h-14` (tương đương 48px - 56px), đường nét vector trắng sắc nét và đổ bóng nổi khối rõ ràng.
- **Cập Nhật Video Banner Kỹ Năng ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx), [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Cập nhật đường dẫn video banner Kỹ năng chuyên môn chính thức: `https://cdn.scena.ai/project/10223/77ef8e82bfd312ece2cc4aeb85366976458389627f1ce2317cd128516dd34f17.mp4`.
- **Tối Ưu Bố Cục Timeline Phân Định Rõ Rệt Công Ty & Sản Phẩm ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - Tái cấu trúc từng cột trong 8 cột mốc sự nghiệp:
    - **Phần CÔNG TY**: Đặt ở đầu thẻ, hiển thị rõ tên công ty in hoa (`item.shortName`), icon đặc trưng và chức danh đảm nhiệm.
    - **Phần SẢN PHẨM**: Tách riêng thành một khung thẻ riêng biệt có nhãn `SẢN PHẨM`, hiển thị logo tròn của từng sản phẩm kèm tên tóm tắt (`item.productSummary`).
    - **Phần NHIỆM VỤ & QUY MÔ**: 3 gạch đầu dòng nhiệm vụ trọng tâm cùng huy hiệu quy mô nhân sự ở chân thẻ.
- **Format Bento Responsive Grid Card Cho Chân Dung Vận Hành ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Tái định dạng toàn bộ khối "Chân Dung Vận Hành" thành chuẩn Bento Grid 12 cột mềm mại:
    - Cell 1 (4 cột): Giới thiệu bản thân + châm ngôn + chữ ký + Avatar Tí Chuột GIF.
    - Cell 2, 3, 4: 3 Trụ Cột Vận Hành (01. Hiệu Quả, 02. Nhân Văn, 03. Bền Vững) dạng bento mini cards.
    - Cell 5, 6: Giá Trị Cốt Lõi (7 cột) & Triết Lý Tầm Nhìn (5 cột) với bo góc 20px, bóng nhẹ và tương phản hoàn hảo.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.28.0] - 2026-10-25
### Chuẩn Hóa Kiểu Dáng Thẻ Job Bo Cong 4 Góc Cho Khối Điều Hướng Chi Tiết Kinh Nghiệm Thực Chiến
- **Tạo Thẻ Job Bo Cong 4 Góc Cho Khối Điều Hướng ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - Tại trang *Kinh Nghiệm Thực Chiến & Cột Mốc Quản Trị (2003 - 2026+)* khi mở xem chi tiết công tác (`showJobCard`), khối `<div>` chứa nút *"Quay lại danh sách Kinh Nghiệm"* và thanh nút năm cột mốc `2003 2007 2011 2013 2016 2018 2023 2026+` đã được đóng gói thành một **Thẻ Job Card bo cong 4 góc (`rounded-[20px] sm:rounded-[24px]`)** hoàn chỉnh.
  - Áp dụng hiệu ứng nền mờ kính mờ `bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl`, viền tinh tế `border border-white/95 dark:border-white/10`, đổ bóng chiều sâu sang trọng `shadow-[0_10px_30px_-5px_rgba(30,27,75,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]` đồng bộ 100% với toàn bộ các thẻ bên dưới.
  - Bổ sung breadcrumb nhỏ gọn ở giữa hiển thị tên công ty và thời gian công tác của mốc đang xem kèm chấm tín hiệu pulsing.
  - Nút *"Quay lại danh sách Kinh Nghiệm"* được nâng cấp viền pill trang nhã, biểu tượng mũi tên đổi màu xanh chủ đạo `text-blue-600 dark:text-blue-400`.
  - Áp dụng đồng bộ và mượt mà cho tất cả các mốc lịch sử từ 2003 đến 2026+.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.27.0] - 2026-10-25
### Tích Hợp Component Fanned Stack Testimonial Chuẩn Shadcn Light Lên Trang Chủ
- **Tạo Mới Component Thẻ Chồng Xòe Quạt Fanned Stack ([`src/components/ui/HomeFannedTestimonials.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HomeFannedTestimonials.tsx))**:
  - Tuân thủ chính xác 100% tài liệu kỹ thuật Shadcn Light Section Register:
    - Nền ground `#FAFAFA`, thẻ card `#FFFFFF`, màu mực `#09090B`, màu muted `#71717A`, viền 1px hairline `#E4E4E7`, điểm nhấn màu chàm Indigo `#4F46E5`.
    - Bo góc tiêu chuẩn 14px–16px, đổ bóng tối giản 1px lift `0 1px 2px rgba(9,9,11,0.04)`, không sử dụng gradient trang trí rườm rà.
    - Typography Inter: 400 cho phần nội dung trích dẫn, 600 cho tên và vai trò, 700 cho tiêu đề.
  - **Fanned Stack Mechanism (Bố cục chồng xòe quạt lặp vòng vô tận)**:
    - Thẻ kích hoạt luôn đứng thẳng (`upright`, `rotate: 0deg`, `scale: 1`, `z-index: 30`).
    - Các thẻ kế cận xòe góc nghiêng nhẹ (`diff * 4.2deg`) và dạt sang hai bên (`diff * 18px`).
    - Tính toán khoảng cách theo thuật toán modulo khép kín (`Wrap Distance Loop`), chuyển đổi bộ bài thành một vòng lặp liên tục mượt mà.
    - Chuyển động siêu êm ái với đường cong bezier `cubic-bezier(0.16, 1, 0.3, 1)`.
  - **Drawn Portrait Placeholder (Avatar vẽ vector độc lập không phụ thuộc ảnh)**:
    - Vẽ vector silhouette tối giản trên đĩa tròn màu nhấn cùng huy hiệu viết tắt initials chữ cái đầu (VD: `HT`, `LĐ`, `AI`, `CS`, `OM`, `WF`, `HL`, `BI`, `TC`).
    - Cấu trúc sẵn sàng để thay thế bằng thẻ `<img />` mà không ảnh hưởng đến thứ tự z-order và góc xoay fanned.
  - **Cơ Chế Dự Phòng Cho Người Dùng Giảm Chuyển Động (Reduced-motion Fallback)**:
    - Tự động nhận diện `prefers-reduced-motion: reduce`. Thay vì đóng băng chuyển động 3D dở dang, component chuyển đổi sang dạng danh sách trực quan, dễ đọc, có thể cuộn và duyệt bình thường.
  - **Bảo Toàn 100% Dữ Liệu**:
    - Giữ trọn vẹn toàn bộ 9 mốc thành tựu & năng lực thực tế của Hùng Thái từ hệ thống, số liệu và liên kết điều hướng sang các trang chi tiết.
- **Tích Hợp Vào Trang Chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - Thay thế khối câu chuyện cũ bằng component fanned stack mới, kết hợp hoàn hảo cùng video nền và nút phát video giới thiệu.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.26.0] - 2026-10-25
### Hoàn Thiện Quy Chuẩn Tiêu Đề Thẻ, Danh Sách Kỹ Năng Có % Bên Ngoài Thẻ Chính, Chuyển Động Tại Chỗ & Nền Pastel Cho Lĩnh Vực & Kỹ Năng
- **Hiển Thị Danh Sách Kỹ Năng Có % Trực Quan Bên Ngoài Thẻ Chính ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Tái cấu trúc khu vực bên trái của 6 thẻ kỹ năng chính (`lg:grid-cols-3`): Thay thế cách trình bày cũ bằng **danh sách 3 kỹ năng then chốt dạng cột** trực quan.
  - Mỗi hàng kỹ năng bao gồm: Bullet tròn màu chủ đề + Tên kỹ năng in đậm (`font-bold text-[10.5px]`) + Điểm phần trăm tỷ lệ (`%`) nổi bật với font mono (`font-black`) + Thanh tiến trình mượt mà (`progress bar`) tỷ lệ chuẩn xác và tự co giãn.
  - Phía dưới là dòng tóm tắt mô tả thu gọn (`line-clamp-1`) cùng nút bấm tròn hành động mũi tên xoay 45° khi hover.
- **Đồng Bộ Màu Tiêu Đề Thẻ Trùng Màu Icon ([`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css), [`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Bổ sung bộ quy tắc CSS chuyên biệt cho `.skill-card-title` kế thừa biến `--card-accent-color` với độ ưu tiên `!important`, đảm bảo trên tất cả các chủ đề (Light Glass, Dark Neon, Midnight Dark, Vivid Glass), màu chữ tiêu đề luôn khớp 100% với màu của icon.
  - Thêm hiệu ứng phát sáng dạ quang `text-shadow: 0 0 12px currentColor` trên các theme nền tối.
- **Chuyển Động Tại Chỗ Nhịp Nhàng & Màu Nền Pastel Cho Thẻ Lĩnh Vực & Kỹ Năng ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css), [`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx), [`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Bổ sung 2 animation chuyên dụng `@keyframes icon-floating` (nhịp lượn lờ êm dịu 3s) và `@keyframes float-slow` (nhịp thở bồng bềnh 5.5s).
  - Áp dụng `animate-icon-floating` cho icon đầu thẻ và `animate-float-slow` cho hình ảnh minh họa 3D trong thẻ.
  - Tinh chỉnh dải nền gradient pastel mềm mại (`rgba(..., 0.72)`) tương đồng với sắc độ của khối minh họa 3D.
- **Chuẩn Hóa Tiêu Đề Thẻ & Đồng Bộ Cỡ Chữ Toàn Hệ Thống**:
  - Áp dụng triệt để quy tắc: icon không đóng khung + tiêu đề tối đa 4 từ viết hoa chữ đầu (`formatCardTitle`) + màu tiêu đề trùng màu icon + loại bỏ hoàn toàn sub-title hay nhãn phụ bên phải.
  - Đồng bộ kích thước font chữ cho các thành phần cùng cấp độ trên toàn bộ trang.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.24.0] - 2026-10-25
### Cập Nhật Hệ Thống Hướng Dẫn Kỹ Thuật Agent & Đồng Bộ Ảnh Mascot GIF Tí Chuột Toàn Website
- **Thay Thế Hình GIF Mascot Tí Chuột ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Tại trang *Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân*, thay thế hình ảnh tĩnh `about-mouse-mascot.png` bằng ảnh GIF sinh động chính thức: `https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif` (đồng bộ hoàn hảo với Avatar Tí Chuột AI tại Footer và Hộp thoại Trợ lý AI).
- **Cập Nhật Toàn Bộ Bộ Quy Chuẩn & Hướng Dẫn Dành Cho AI Agent ([`AGENTS.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/AGENTS.md), [`.agent/rules/agent-instructions.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agent/rules/agent-instructions.md), [`docs/AGENT_GUIDELINES.md`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/docs/AGENT_GUIDELINES.md))**:
  - Tích hợp trọn vẹn 29 điều khoản nguyên tắc hoạt động, ưu tiên bảo toàn dữ liệu 100% (*Data First*).
  - Chuẩn hóa quy định xử lý giao diện Sáng/Tối (*Light/Dark Mode*), hệ thống Theme mở rộng không giới hạn (*Theme Token Architecture*).
  - Quy chuẩn kỹ thuật phòng chống tràn nội dung (*Overflow Prevention*), kiểm soát kích thước đa màn hình (*Desktop 1440/1280px, Tablet 1024/768px, Mobile 430/390/375px*).
  - Luôn sử dụng tiếng Việt giao tiếp và thường xuyên đề xuất ít nhất 5 tính năng mới hữu ích.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.
  - Máy chủ Next.js biên dịch hoàn chỉnh.

---

## [3.23.0] - 2026-10-25
### Khắc Phục Triệt Để Lỗi Tên Công Ty Bị Co Rúm Chạy Dọc & Chuẩn Hóa Danh Xưng Doanh Nghiệp Cả 8 Mốc Sự Nghiệp
- **Sửa Lỗi Hiển Thị Tên Công Ty Bị Ép Dọc 1 Ký Tự/Dòng ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - **Nguyên nhân cốt lõi**: Khối "Quy mô đội ngũ" độc lập bên phải (`shrink-0` ~180px) cùng 2 khối Lĩnh vực và Thương hiệu đã chiếm trọn chiều ngang trên màn hình 1024px, ép `div` chứa tên công ty về `width: 0`, khiến chữ bị bẻ từng ký tự xuống dòng (`t \n N \n a \n m \n e \n s \n p \n o \n r \n t ...`).
  - **Tái cấu trúc Section 1 Profile Card**:
    - Chuyển thông tin "Quy mô đội ngũ" thành huy hiệu pill nhỏ gọn tinh tế đặt cạnh huy hiệu "Thời gian công tác" ngay dưới tên vai trò, giải phóng toàn bộ 180px bề ngang.
    - Cân chỉnh kích thước khung logo (`w-14 h-14 sm:w-16 sm:h-16`) hài hòa với tổng thể.
    - Khai báo thuộc tính chống vỡ dòng `break-words leading-snug whitespace-normal` cho thẻ `h3` tên công ty.
    - Nhờ đó, cột thông tin công ty chiếm trọn 5 cột (`lg:col-span-5`) với không gian > 350px, hiển thị tên công ty trang nhã, liền mạch, không bao giờ bị vỡ dòng trên bất kỳ kích thước màn hình nào.
- **Chuẩn Hóa Danh Xưng & Sửa Lỗi Chính Tả Tên Công Ty ([`src/data/experienceUpdates.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/experienceUpdates.ts), [`src/data/experience.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/experience.ts))**:
  - **Mốc 2013 (Vietnam Esports)**:
    - Sửa lỗi chính tả `Việt Nam eSport` (chữ thường, thiếu s) và loại bỏ nhồi nhét thương hiệu con gây trùng lặp với danh sách thương hiệu bên cạnh.
    - Chuẩn hóa thành: `Công ty CP Phát triển Thể thao Điện tử Việt Nam (Vietnam Esports - VED)` và `Vietnam Esports (VED)`.
    - Xóa sản phẩm nhầm lẫn `V247` khỏi mảng `products` của VED, bổ sung chính xác logo `Shopee` và `ShopeePay`.
  - **Mốc 2003 (MobiFone)**:
    - Sửa chữ `Mobifone` thường thành tên thương hiệu chuẩn `Tổng Công ty Viễn thông MobiFone` (chữ `F` hoa).
  - **Mốc 2018 (MoMo)**:
    - Sửa `Mservice` thiếu gạch dưới thành `Công ty Cổ phần Dịch vụ Di động Trực tuyến (Ví MoMo - M_Service)`.
  - **Mốc 2016 (Prudential)**:
    - Chuẩn hóa tên pháp nhân: `Công ty TNHH Bảo hiểm Nhân thọ Prudential Việt Nam`.
  - **Mốc 2011 (LBC - HTVC)**:
    - Chuẩn hóa: `Công ty CP Truyền Thông Băng Rộng Cuộc Sống (LBC - HTVC)`.
  - **Mốc 2007 (V247)**:
    - Chuẩn hóa: `Công ty Viễn Liên V247 (V247 Telecom)`.
  - **Mốc 2023 (Finviet)**:
    - Chuẩn hóa: `Công ty Cổ phần Công nghệ Finviet (Ví ECO)`.
  - **Mốc 2026+ (Power Service)**:
    - Chuẩn hóa: `Nền Tảng Dịch Vụ Năng Lượng & AI (Power Service)`.
- **Loại Bỏ Dấu Ba Chấm Cắt Cụt Trên Thẻ Lộ Trình 8 Cột Timeline ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - `LBC - HTVC CAB...` ➔ `LBC - HTVC`
  - `VED...` ➔ `VIETNAM ESPORTS`
  - `MOMO` ➔ `VÍ MOMO`
  - `FINVIET` ➔ `FINVIET ECO`
  - `CS STRATEGY 2...` ➔ `POWER SERVICE`
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.
  - Máy chủ Next.js biên dịch hoàn hảo, tương thích trọn vẹn cả 2 giao diện Sáng (*Light Glass*) và Tối (*Dark Neon*).

---

## [3.22.0] - 2026-10-25
### Tối Ưu Hóa Thẻ Chi Tiết Job Trang Kinh Nghiệm, Thẻ Hệ Thống CLP Phát Video & Sắp Xếp Logo Dọc
- **Tối Ưu Hóa Toàn Diện Thẻ Chi Tiết Job Trang Kinh Nghiệm ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - **Dữ liệu động hóa 100% cho 8 mốc sự nghiệp**: Khắc phục triệt để hiện tượng mọi công ty đều hiển thị nội dung mẫu của VED/Garena. Tích hợp từ điển nội dung chuyên sâu `MILESTONE_CUSTOM_CONTENT` cho tất cả các mốc (2003 MobiFone, 2007 V247 Telecom, 2011 HTVC Cable, 2013-2015 VED/Garena, 2016 Prudential VN, 2018 MoMo Fintech, 2023 Finviet ECO, 2026+ Power Service Platform).
  - **Thanh chuyển nhanh giữa các mốc sự nghiệp (Quick Milestone Switcher)**: Tích hợp thanh pill điều hướng trực tiếp ngay góc trên bên phải header của Thẻ Chi Tiết Job, cho phép chuyển đổi tức thì giữa các cột mốc công việc mà không cần phải đóng mở thẻ.
  - **Section 2 (Hero Banner Tùy Biến)**: Gradient màu nền nhận diện thương hiệu đặc thù (Xanh MoMo, Đỏ Prudential, Xanh lá Finviet, Xanh MobiFone, Đỏ Garena...), tiêu đề và mô tả định vị sứ mệnh chiến lược chuẩn xác cho từng mốc.
  - **Section 3 (4 Trụ Cột Chiến Lược)**: Hiển thị 4 thẻ trụ cột vận hành đặc thù riêng biệt theo từng tổ chức (ví dụ MoMo: 30M+ Users, 99.99% Uptime, AI Chatbot, 24/7 CSKH; Prudential: Bancassurance, Khách Hàng VIP, Tuân Thủ Tài Chính, Số Hóa Hợp Đồng; MobiFone: BSS/OSS Telecom, Thuê Bao Di Động, Call Center 24/7, Mạng Lưới Phân Phối).
  - **Section 4 (Cam Kết Vận Hành & An Ninh)**: Hiển thị 2 cam kết chuẩn mực chuyên biệt tương ứng cho từng đơn vị (PCI DSS 4.0, ISO 27001, SLA 99.9%, chuẩn tài chính - bảo hiểm).
  - **Thương hiệu & Lĩnh vực động**: Section 1 tự động nạp danh sách sản phẩm/nhãn hàng và lĩnh vực trực thuộc của từng công ty được chọn.
  - **Chuẩn hóa thẩm mỹ**: Font chữ `Play` sắc nét, màu sắc icon và tiêu đề đồng nhất, độ tương phản hoàn hảo ở cả 2 chế độ Sáng (*Light Glass*) và Tối (*Dark Neon*).
- **Thẻ Hệ Thống CLP: Hiệu Ứng Sóng Tròn Trắng & Video Sắc Nét ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Tích hợp hiệu ứng sóng tròn lan tỏa màu trắng tinh khiết (`white radial pulse ripple`) bùng nổ từ icon quà tặng ra khắp toàn bộ diện tích thẻ khi rê chuột vào (*hover*).
  - Tự động phát video demo tương tác của thẻ CLP với chất lượng hiển thị sắc nét (`opacity-100`, `brightness-110 contrast-105`), loại bỏ lớp phủ mờ đục.
- **Thẻ Kinh Nghiệm: Hiển Thị Logo Theo Chiều Dọc Ở Khung Bên Dưới ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx))**:
  - Tại Tier 3 (Khung bên dưới của thẻ Timeline mốc kinh nghiệm), các logo sản phẩm và dự án được sắp xếp theo chiều dọc (`flex-col -space-y-1.5`) với viền phân cách tinh tế thay vì dàn hàng ngang.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.
  - Máy chủ phát triển Next.js phản hồi **HTTP 200 OK**.

---

## [3.21.0] - 2026-10-25
### Nâng Cấp Giao Diện Sáng/Tối Trang Hình Nền, Trình Chiếu Tự Động Phân Loại Sáng/Tối, Hiệu Ứng Hover Card Toàn Website, Đặt Lịch Hẹn Liên Hệ, Banner Dọc Chi Tiết Dự Án 1.1 & Tối Ưu Chi Tiết Thẻ Lĩnh Vực
- **Sửa Chữa Lỗi Giao Diện Sáng & Tối Trang Hình Nền ([`src/components/views/WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx))**:
  - Tích hợp `isDark` tracking theo dõi realtime qua `MutationObserver` trên `document.documentElement` (`class="dark"` và `data-theme`).
  - Sửa toàn bộ lỗi tương phản ở bảng điều khiển Độ tối & Độ mờ (*Dimmer & Blur*), Trình chiếu tự động, Ô thêm hình nền tự động (*Smart Add Box*), tương thích hoàn hảo cả 2 chế độ Sáng (*Light Glass*) và Tối (*Dark Neon*).
- **Phân Loại Hình Nền Phù Hợp Cho Giao Diện Sáng & Tối Khi Trình Chiếu Tự Động ([`src/utils/wallpaperStorage.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/wallpaperStorage.ts), [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
  - Bổ sung helper `getWallpaperTone(wp)` và thuộc tính `slideshowThemeMode`:
    - `auto`: Tự động chỉ trình chiếu hình nền Sáng khi đang ở giao diện Sáng (*Light Glass*), và chỉ trình chiếu hình nền Tối/Neon khi ở giao diện Tối (*Dark Neon*).
    - `light-only`: Chỉ trình chiếu hình nền Sáng.
    - `dark-only`: Chỉ trình chiếu hình nền Tối.
    - `all`: Trình chiếu toàn bộ kho hình nền.
  - Trên từng thẻ hình nền trong kho: Hiển thị huy hiệu nhận diện phân loại `☀️ Sáng` hoặc `🌙 Tối`.
  - Trên thanh lọc banner: Bổ sung 2 tab lọc trực tiếp `☀️ Nền Sáng` và `🌙 Nền Tối`.
- **Rà Soát Tiêu Đề Card: Icon Và Tiêu Đề Bằng Nhau, Đồng Màu & Tuyệt Đối Không Đóng Khung Thẻ**:
  - Xóa bỏ các khung pill/box bao quanh tiêu đề thẻ trên toàn bộ hệ thống (`SystemsView.tsx`, `ProjectDetailView.tsx`, `DomainsView.tsx`, `WallpaperView.tsx`).
  - Icon và chữ tiêu đề đặt song song tự nhiên với kích thước tỷ lệ hài hòa, màu sắc chữ kế thừa 100% từ màu icon thương hiệu.
- **Thêm Hiệu Ứng Over Mouse & Micro-Interactions Cho Card ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
  - Bổ sung hiệu ứng nâng thẻ 3D mượt mà `hover:-translate-y-1 hover:scale-[1.012]`, tăng bóng đổ chiều sâu và viền phản chiếu ánh sáng specular glow trên tất cả các dạng thẻ: `.theme-pastel-card`, `.card-104`, `.system-item`, `.bento-card`.
  - Hiệu ứng phản ứng cho icon tiêu đề khi hover vào thẻ (`group-hover:scale-112 group-hover:rotate-2`), cùng phản hồi nhấn chuột `active:scale-[0.985]`.
- **Trang Liên Hệ: Bổ Sung Tính Năng Chọn Lịch & Thời Gian Đặt Hẹn ([`src/components/views/ContactView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx))**:
  - Tích hợp Tab *"Đặt lịch hẹn"* kèm nút truy cập nhanh trên thẻ thông tin liên hệ trực tiếp.
  - **Chọn ngày**: Danh sách 14 ngày làm việc tiếp theo dạng chip cuộn ngang trực quan, hiển thị Thứ và Ngày/Tháng.
  - **Chọn giờ**: 6 khung giờ 45 phút khả dụng (Sáng: 09:00, 10:00, 11:00; Chiều: 14:00, 15:15, 16:30 GMT+7).
  - **Mục đích & Hình thức**: Hỗ trợ Google Meet, MS Teams, Trực tiếp tại TP.HCM hoặc Gọi điện thoại.
  - **Hành động 1 chạm**: Nút xác nhận đồng bộ trực tiếp sang Google Calendar và nút tải tệp lịch tiêu chuẩn `.ics` cho Outlook / Apple Calendar.
- **Banner Bên Phải Bài Viết Chi Tiết Dự Án 1.1 ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Căn giữa hình ảnh nền banner dọc (`object-cover object-center`), giảm độ đục của lớp phủ gradient scrim giúp nhìn rõ toàn bộ hình ảnh nền dự án sống động bên dưới.
  - Tiêu đề *"Mục Lục Dự Án"* bỏ khung bao bọc, icon và chữ tiêu đề đồng bộ màu sắc nhận diện thương hiệu.
  - Cả 10 mục lục điều hướng hiển thị chữ đậm rõ nét trên nền kính trong suốt.
- **Tối Ưu Hóa Giao Diện, Bố Cục, Font Chữ, Màu Sắc Chi Tiết Thẻ Lĩnh Vực ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - Nâng cấp giao diện chi tiết lĩnh vực sang chuẩn Acrylic Glassmorphism cao cấp cho cả 2 chế độ Sáng và Tối.
  - Tháo dỡ toàn bộ khung đóng viền tiêu đề ở Hero Card, 3 trụ cột vận hành (*Vai trò & Trách nhiệm*, *Quy mô đội ngũ*, *Công nghệ & Hệ thống*) và khối *Mô tả chi tiết lĩnh vực*.
  - Font chữ `Play` đồng bộ toàn diện, tăng kích thước chữ dễ đọc, màu sắc kế thừa màu nhận diện đặc thù của từng lĩnh vực.
  - Các thẻ kết quả thành tựu nổi bật và đối tác tiêu biểu có hiệu ứng hover nâng thẻ và bóng đổ mượt mà.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.
  - Máy chủ Next.js phản hồi **HTTP 200 OK**.

---

## [3.20.0] - 2026-10-25
### Chuẩn Hóa Font Mặc Định Play & Font Italianno Cho Quote Banner, Drop Top Menu Hệ Thống, Xóa Nút Giới Thiệu Lĩnh Vực & Nâng Cấp Nền Banner Mục Lục Dự Án
- **Thiết Lập Font Chữ Mặc Định Toàn Website Là Play & Font Câu Nói Hay Italianno ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css), [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Nhập bộ font Google Font `Italianno` và `Play` chính thức.
  - Khai báo chuẩn mực áp dụng font `Play` mặc định (`font-family: 'Play', system-ui, sans-serif !important;`) cho tất cả thẻ ngữ nghĩa: `*`, `body`, `button`, `input`, `textarea`, `h1`-`h6`, `p`, `span`, `div`, `a`, `table`, `ul`, `ol`.
  - Riêng câu nói hay (quote) trong tất cả các banner sử dụng font nghệ thuật `Italianno` (`font-family: 'Italianno', cursive !important;`), tăng kích cỡ tương xứng (`1.4em`), màu vàng hổ phách nổi bật trên mọi nền banner.
- **Trang Hệ Thống: Sửa Menu Dropdown Lọc Danh Mục Thành Drop Top ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Chuyển menu dropdown của nút *"Danh mục: Tất cả (12)"* từ thả xuống dưới thành **Drop Top** (`bottom-full mb-2`), mở ngược lên trên, chống tràn màn hình và không che khuất cụm nút tương tác phía dưới.
  - Tích hợp `useRef` và trình lắng nghe sự kiện click-outside, tự động đóng menu khi nhấp chuột ra ngoài.
- **Trang Lĩnh Vực: Xóa Hoàn Toàn Nút Bấm "Giới Thiệu" ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - Xóa bỏ nút bấm *"Giới Thiệu"* tại góc dưới của cả 6 thẻ lĩnh vực hoạt động chuyên môn.
  - Xóa bỏ nút bấm *"Giới Thiệu"* trong banner chi tiết của từng lĩnh vực theo đúng yêu cầu.
- **Trang Dự Án: Sửa Màu Font Chữ Giao Diện Sáng Cho Toàn Bộ 21 Dự Án & Nâng Cấp Banner Mục Lục ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - **Màu Font Chữ Giao Diện Sáng (Áp dụng toàn bộ 21 dự án)**:
    - Xây dựng hệ thống `getProjectGroupTheme` chuyên biệt cho cả 5 nhóm dự án (Chiến lược, Chuẩn hóa SOP, Trải nghiệm CX, Công nghệ CRM/AI, Đào tạo & Văn hóa).
    - Tiêu đề chính hiển thị `text-slate-900` có độ tương phản cao trên nền sáng, phụ đề tiếng Anh và nhãn vai trò hiển thị màu nhận diện thương hiệu đậm nét của từng nhóm.
    - Hộp trích dẫn triết lý (*Tagline Box*) hiển thị màu chữ đậm `text-slate-800 font-bold` trên nền kính trắng `bg-white/90` kèm viền màu của từng nhóm.
  - **Khối Banner Mục Lục Dự Án Cột Phải**:
    - **Làm cho nền banner nhìn rõ hơn**: Tăng độ hiển thị của hình ảnh nền dự án lên `opacity-75 dark:opacity-65`, sử dụng lớp phủ chuyển sắc mờ trong suốt `from-white/70 via-white/45 to-white/70` để lộ rõ chi tiết hình vẽ/ảnh nền banner.
    - **Chuẩn hóa tiêu đề 4 chữ & icon đồng màu**: Header đổi thành khung hợp nhất mang tiêu đề 4 chữ chuẩn *"Mục Lục Dự Án"*, icon và chữ cùng màu xanh tím/xanh ngọc.
    - Cả 10 mục lục điều hướng và 2 nút hành động chân banner (*"Sơ Đồ Tư Duy"*, *"Đóng Bài Viết"*) đều được chuẩn hóa màu chữ tiêu đề đồng bộ tuyệt đối với màu icon.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.19.0] - 2026-10-25
### Nâng Cấp Giao Diện Sáng Cho Thẻ Chiến Lược & Cấu Trúc Vận Hành CSKH Trong Bài Viết Chi Tiết Dự Án
- **Bài Viết Chi Tiết Dự Án: Đồng Bộ Phản Ứng Đổi Giao Diện Realtime ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Tích hợp `MutationObserver` theo dõi liên tục thuộc tính `class` và `data-theme` trên thẻ `<html>` (`document.documentElement`).
  - Đảm bảo trạng thái `isLightMode` chuyển đổi ngay lập tức giữa Giao diện Sáng (Light Glass) và Giao diện Tối (Dark Neon) theo thời gian thực mà không yêu cầu tải lại hay remount component.
- **Executive Project Title Banner: Bảng Màu Nhận Diện Sky Blue Light Glass Sang Trọng**:
  - Nền banner cho Nhóm 1 (*Chiến lược & Cấu trúc Vận hành CSKH*): Chuyển sắc thanh nhã `bg-gradient-to-br from-white via-sky-50/85 to-indigo-50/75` trên nền viền `border-sky-200/90` và bóng đổ đa tầng xanh nhạt `shadow-[0_14px_40px_-10px_rgba(2,132,199,0.12)]`.
  - Huy hiệu Nhóm Dự Án: Thể hiện phong cách kính sáng Sky Blue `bg-sky-100 text-sky-800 border-sky-300 shadow-2xs`.
  - Khối Trích Dẫn Triết Lý (*Tagline Box*): Khắc phục triệt để lỗi chữ mờ trắng/xám trên nền sáng; áp dụng nền kính trắng `bg-white/85`, viền trái dày nổi bật `border-l-4 border-l-sky-500`, và màu chữ ghi đậm sắc nét `text-slate-700`.
  - Nhãn Vai Trò & Hashtags: Chữ tiêu đề *"Vai trò:"* và *"Hashtags:"* mang màu xanh da trời đậm `text-sky-700`, kèm các thẻ hashtag con nhộng `bg-sky-50 text-sky-800 border-sky-200/90`.
  - Nút Điều Hướng Sang Sơ Đồ Tư Duy: Đặt trong khung kính sáng `bg-white/85 border-sky-200/90 text-slate-800`, nút *"Xem sơ đồ vẽ lại ↓"* mang màu nhấn `text-sky-700 hover:text-sky-950`.
- **Sơ Đồ Tư Duy Kiến Trúc (Section 00) Nhóm Chiến Lược**:
  - Tiêu đề mục và icon não bộ đồng bộ màu xanh thương hiệu `text-sky-600 dark:text-sky-400`.
  - **Khối Hub Trung Tâm (Central Hub Node)**: Bo viền kép `border-2 border-sky-300/90`, bóng hào quang nhẹ `shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)]`, biểu tượng trung tâm chuyển sắc `from-sky-600 via-indigo-600 to-blue-600`, nhãn mã dự án và nhóm dự án mang phong cách kính sáng Sky Blue `bg-sky-100 text-sky-800 border-sky-300`.
  - Thanh phân cách 4 nhánh tỏa sáng: Chuyển sắc qua `via-sky-300 dark:via-sky-600/50` kèm chấm nhịp tim đập `bg-sky-500 animate-ping`.
  - Bộ chuyển chế độ hiển thị (*Sơ đồ nút tương tác* vs *Bản vẽ đồ họa gốc*): Nút kích hoạt mang dải chuyển sắc `from-sky-600 to-indigo-600 text-white`.
- **Banner Mục Lục Dự Án Cột Phải (Sticky Navigation Sidebar)**:
  - Khối thẻ mục lục phía bên phải đồng bộ nền kính sáng `bg-white/95 text-slate-800 border-sky-200/90` với lớp phủ chuyển sắc mờ trong trẻo `from-white/95 via-sky-50/85 to-white/95`.
  - Tiêu đề mục lục và icon hiển thị xanh Sky Blue `text-sky-600 dark:text-sky-300`.
  - Trạng thái mục đang chọn (*Active Section*): Nổi bật với dải màu `bg-gradient-to-r from-sky-600 to-indigo-600 text-white border-sky-400 shadow-md ring-1 ring-sky-400/40`.
  - Nút tắt mở sơ đồ tư duy phía chân sidebar mang kiểu dáng kính sáng `bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.18.0] - 2026-10-25
### Tái Cấu Trúc Bento Responsive View Card Cho Thư Ngỏ & Tinh Chỉnh Padding 2px Cho Header Trang Chủ
- **Đưa Kích Thước Font Chữ Về Mặc Định Hệ Thống ([`src/app/layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx), [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
  - Đặt kích thước font chữ toàn hệ thống về chuẩn mặc định 100%: `fontSize = '16px'`, tỉ lệ `--a11y-fs = '1.0'`, `data-font-scale = 'md'`, và mức co phóng `zoom = 1`.
  - Tự động dọn sạch các giá trị tỷ lệ font cũ trong bộ nhớ trình duyệt (`localStorage.removeItem('hungthai_font_scale_percent')` & `localStorage.removeItem('hungthai_font_scale')`).
  - Đảm bảo thẻ `<html>` được thiết lập thuộc tính `data-font-scale="md"` ngay từ SSR ban đầu, loại bỏ hiện tượng lệch cỡ chữ khi tải trang.
- **Trang Thư Ngỏ: Bố Cục Lại Các Sub-Card Thành Bento Responsive View Card ([`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - **Thẻ Cột Mốc Sự Nghiệp (Slide 2 & 3)**:
    - Bố cục lưới Bento Grid 12 cột co giãn linh hoạt: Cặp so le bất đối xứng `7 cols - 5 cols` (Hàng 1) và `5 cols - 7 cols` (Hàng 2), tự động xếp chồng 1 cột trên mobile.
    - Bo góc Bento cao cấp `rounded-[22px]` với lớp kính mờ chiều sâu, quầng sáng tỏa tròn ambient radial tint theo màu thương hiệu.
    - Logo công ty đặt trong khung kính phẳng bo góc (`rounded-xl`), loại bỏ viền tròn lỗi thời.
    - Vai trò đảm nhiệm bọc trong khung kính hợp nhất (`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border`) với màu chữ tiệp màu icon.
    - Đáy thẻ trang bị Bento Capsule nổi bật kèm icon điểm nhấn và nút tương tác *"Chi tiết ↗"*.
  - **3 Trụ Cột Hợp Tác (Slide 1)**:
    - Nâng cấp thành 3 sub-card Bento với khối số thứ tự nổi bật (`01`, `02`, `03`), tên tiêu đề 4 chữ viết hoa và chỉ số KPI đo lường được.
  - **3 Nguyên Tắc Quản Trị & 4 Giá Trị Cốt Lõi (Slide 4)**:
    - Bỏ khung tròn cô lập quanh icon, tích hợp khung viền hợp nhất bao trùm cả icon và tiêu đề theo đúng màu chủ đạo của từng giá trị.
    - Hiển thị số thứ tự neon sắc sảo và nhãn danh mục phong cách Bento hiện đại.
  - **Chuẩn Hóa Tiêu Đề AnimatedCardTitle**:
    - Khung kính bao trọn cả icon chuyển động và tiêu đề chuẩn 4 chữ viết hoa chữ cái đầu.
- **Trang Chủ: Tinh Chỉnh Padding 2px Cho Thanh Điều Hướng Header ([`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - Tại Trang Chủ (`currentPage === 0`), padding của thanh menu điều hướng `<header>` và `<nav>` được thiết lập chuẩn xác 2px (`p-[2px]`).
  - Phạm vi áp dụng: Chỉ kích hoạt cho Trang Chủ, giữ nguyên cấu hình chuyên biệt của các trang khác.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.17.0] - 2026-10-25
### Rà Soát Toàn Diện: Làm Rõ Nền Video Banner, Khung Hợp Nhất Icon & Tiêu Đề 4 Chữ Đồng Màu Toàn Website, Đồng Bộ Giao Diện
- **Toàn Website: Nâng Cấp HeroBanner Chuẩn Hóa Tiêu Đề 4 Chữ & Màu Đồng Bộ Icon ([`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Chuẩn hóa hàm `formatBannerTitle`: Đảm bảo tiêu đề lấy 4 từ và viết hoa chữ cái đầu của cả 4 từ (*Title Case* 4 từ).
  - Bọc icon và thẻ tiêu đề `<h2>` bên trong một khung viền kính hợp nhất (`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl border backdrop-blur-md shadow-xs`), xóa bỏ hoàn toàn khung viền tròn riêng lẻ.
  - Màu chữ tiêu đề đồng bộ tuyệt đối với màu icon theo chủ đề trang (`color: menuThemeColor`), kèm viền và nền tiệp màu độ trong suốt 18%.
  - Tinh giảm lớp phủ chuyển sắc (gradient scrims) xuống mức siêu nhẹ (`from-slate-950/35 via-slate-950/10 to-slate-950/25`), bảo đảm video và hình nền banner luôn trong suốt, sáng rõ trên mọi thiết bị.
- **Trang Đối Thoại AI: Làm Rõ Nền Video & Khung Hợp Nhất Tiêu Đề ([`src/components/views/InterviewView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx))**:
  - Tăng độ sáng và tương phản video phỏng vấn (`opacity-100 brightness-[1.15] contrast-[1.1]`).
  - Giảm độ mờ đục của các lớp gradient phủ từ 90%/65% xuống còn 30%-40%, làm nổi bật toàn bộ video chuyển động nền.
  - Tinh chỉnh thanh header banner thành kính mờ trong trẻo (`bg-white/45 dark:bg-slate-950/45 backdrop-blur-md`).
  - Tạo khung bao trùm icon và tiêu đề 4 chữ *"Phỏng Vấn Thực Chiến"*, chữ màu hồng neon `#f472b6` đồng bộ tuyệt đối với icon `WebIcon name="chat"`.
  - Chuẩn hóa thẻ *"Chi Tiết Câu Trả Lời"* ở cột bên phải với khung viền kính hợp nhất bao quanh icon và tiêu đề đồng màu hồng neon.
- **Trang Hệ Thống: Làm Rõ Nền Video Banner Dọc & 3 Trụ Cột ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Loại bỏ lớp phủ gradient trắng dày đục (`from-white/92 via-white/85 to-white/90`), thay thế bằng lớp kính siêu mỏng (`from-white/20 via-white/10 to-white/20`), giúp video banner dọc 260px hiển thị rõ nét và sống động.
  - Chuẩn hóa widget *"12 Phân Hệ Vận Hành"* với khung hợp nhất và màu chữ tím neon đồng bộ icon.
  - Chuẩn hóa 3 trụ cột cốt lõi: *"12 Phân Hệ Hợp Nhất"* (xanh da trời), *"Ai Agent Tự Động"* (tím), *"Sla Uptime Hệ Thống"* (xanh ngọc lục bảo) – đều được bọc trong khung hợp nhất với màu chữ tiệp màu icon.
- **Trang Hình Nền: Làm Rõ Nền Video Banner Ngang ([`src/components/views/WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx))**:
  - Thay thế lớp kính trắng đục trên thanh điều khiển banner bằng lớp kính mỏng nhẹ `from-white/20 via-white/10 to-white/20`, trả lại độ trong suốt và sắc nét tuyệt đối cho video nền.
- **Rà Soát Toàn Bộ Các Trang Về Khả Năng Áp Dụng Giao Diện Đang Chọn**:
  - Toàn bộ 14 phân hệ / trang (Home, About, Skills, Domains, Experience, Education, Projects, Systems, Interview, Horoscope, Memories, Letter, Contact, Wallpaper) phản hồi tức thì với chế độ giao diện được chọn (`data-theme="light-glass"` và `data-theme="dark-neon"`).
  - Tất cả các thẻ card, popover, modal, danh sách, chip trạng thái và banner đều có đủ cặp lớp tương phản (`bg-... dark:bg-...`, `text-... dark:text-...`, `border-... dark:border-...`).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi (Exit Code 0)**.

---

## [3.16.0] - 2026-10-25
### Nâng Cấp Tap-Through Stories Trang Chủ, Tăng Chiều Cao & Làm Rõ Nền Banner, Menu Icon Selected, Thẻ Lật 3D Hệ Thống & Video Hero Trợ Lý Ảo
- **Trang Chủ: Tích Hợp Tap-Through Stories (Prompt #376) ([`src/components/ui/HomeTapThroughStories.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HomeTapThroughStories.tsx), [`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - Thay thế khối carousel cũ bằng thành phần Tap-through stories đạt chuẩn Lucian UX/UI Prompt #376.
  - Hiệu ứng thanh tiến trình (progress bars) trên đỉnh tự động làm đầy và chuyển cảnh mượt mà.
  - Chạm bên phải màn hình để tới cảnh tiếp theo, chạm bên trái để quay lại cảnh trước.
  - Nhấn và giữ (press & hold > 260ms) để tạm dừng chuyển cảnh, ẩn mờ thanh tiêu đề và hiển thị trạng thái *"Đang tạm dừng..."*.
  - Hiệu ứng xoay khối lập phương 3D (3D rotating cube với `perspective: 1000px`, `transform: translateZ(-160px) rotateY(--ry)`) khi chuyển đổi giữa các nhóm nội dung: *Giới Thiệu*, *Năng Lực Cốt Lõi*, *Dấu Ấn Thành Tựu*.
  - Giữ nguyên 100% dữ liệu thực chiến, chỉ số KPI và các nút điều hướng trang.
  - Tương thích hoàn hảo cả giao diện Sáng (Light Glass) và Tối (Dark Neon), hỗ trợ đầy đủ `prefers-reduced-motion`.
- **Rà Soát Banner: Tăng 50px Chiều Cao Cho Tất Cả Banner Ngang & Làm Rõ Nền ([`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Tăng chiều cao banner ngang thêm 50px (`minHeight: 185px`, `min-h-[180px] sm:min-h-[185px]`, `py-3 sm:py-3.5`).
  - Nâng cấp độ hiển thị nền video/hình ảnh: tăng độ sáng & tương phản (`opacity-100 brightness-[1.15] contrast-[1.1]`).
  - Tinh giảm độ dày của lớp phủ chuyển sắc (gradient overlay scrim) từ 60-75% xuống 35-50% giúp nền banner hiển thị trong trẻo, sắc nét và nổi bật.
  - Cân bằng khoảng đệm nội dung (`px-4 py-3 sm:px-5 sm:py-3.5 lg:px-6 lg:py-4 gap-2`) tạo cảm giác thoáng đãng, chuyên nghiệp.
- **Header Menu: Màu Tiêu Đề Khi Được Chọn Đồng Màu Với Icon ([`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - Khi một mục menu được chọn (`isSelected`), màu tiêu đề chữ được thiết lập đồng nhất với màu icon tương ứng (`titleColor = iconColor`), thay vì màu trắng như trước.
  - Hiệu ứng phát quang text-shadow được tăng cường ở chế độ Dark Neon và sắc nét tinh tế ở chế độ Light Glass.
- **Chuẩn Hóa Tiêu Đề Thẻ & Menu: Bỏ Khung Tròn, Tạo Khung Bao Trùm Icon & Tiêu Đề, 4 Từ Đầu Viết Hoa Chữ Đầu, Màu Tiêu Đề Giống Màu Icon ([`src/lib/utils.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/lib/utils.ts), [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx), [`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx), [`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx), [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx), [`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx), [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - Tiện ích `formatCardTitle`: Tự động viết hoa chữ cái đầu của 4 từ đầu tiên, các từ còn lại viết thường toàn bộ theo đúng quy chuẩn ngôn ngữ giao diện.
  - Xóa bỏ các khung tròn riêng biệt bao quanh icon (`w-8 h-8 rounded-full`).
  - Thiết kế khung viền hợp nhất (`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl border`) ôm trọn cả icon và tiêu đề.
  - Màu chữ tiêu đề đồng bộ tuyệt đối với màu icon tương ứng (`color: iconColor`).
  - Áp dụng trên toàn bộ các trang: Kỹ Năng (Skills), Lĩnh Vực (Domains), Hồ Sơ (About), Kinh Nghiệm (Experience - Roadmap cards), Học Vấn (Education) và Menu Header.
- **Hồ Sơ Chuyên Gia: Video Hero Nền Rõ Nét & Đổi Video Kèm Nút Hủy ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Video phỏng vấn 1 chạy trực tiếp làm nền thẻ Hero Banner với lớp phủ trong suốt, nhìn rõ ràng và sắc nét.
  - Khi bấm *"Bắt đầu trò chuyện (Phát video)"*, video nền tự động thay thế bằng Video giới thiệu 2 có âm thanh.
  - Hiển thị nút *"Hủy phát (Trở về video 1)"* màu đỏ nổi bật với icon `X`; khi bấm sẽ dừng Video 2 và đưa nền về lại Video 1 ban đầu.
  - Tích hợp nút bật/tắt âm lượng (`Volume2` / `VolumeX`) và tự động trở về Video 1 khi Video 2 kết thúc.
- **Trang Hệ Thống: Hiệu Ứng Lật Thẻ 3D (Card Flip) ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Nhấp vào bất kỳ thẻ hệ thống nào sẽ kích hoạt hiệu ứng lật thẻ 3D xoay 180 độ mượt mà (`rotateY(180deg)`).
  - Mặt trước: Thông tin định danh hệ thống, animated icon và huy hiệu *"Lật thẻ"*.
  - Mặt sau: Lớp kính tối mô tả chi tiết chức năng, các nút thao tác *"Quay lại"*, *"Chi tiết"* và *"Mở cổng"*.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi (Exit Code 0)**.
  - Next.js dev server chạy ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---


## [3.15.0] - 2026-10-25
### Xóa Nút Chuyển Slide 1 & Trang Bị Giao Diện Tối Chuyên Sâu Cho Khối "Dân Tộc Kinh"
- **Hồ Sơ Chuyên Gia: Xóa Khối "Quay lại Slide 1: Xin chào & Thông tin cá nhân" ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Xóa bỏ khối `<div>` chứa nút chuyển slide ở dưới cùng của Slide 2: `<div className="flex justify-start pt-1"> <button ...>Quay lại Slide 1: Xin chào & Thông tin cá nhân</button> </div>` theo đúng yêu cầu.
- **Hồ Sơ Chuyên Gia: Thêm Giao Diện Tối Cho Khối "Dân Tộc Kinh" ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx), [`src/data/aboutData.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/aboutData.ts))**:
  - Bổ sung giao diện tối độc bản chuẩn Dark Neon Glass cho khối thẻ *"Dân tộc Kinh"* (`id: 'ethnicity'`):
    - Lớp nền đêm sang trọng: `dark:bg-[#150d2a]/95`.
    - Viền tím neon phát quang: `dark:border-purple-500/50 hover:dark:border-purple-400`.
    - Quầng sáng đa tầng: `dark:shadow-[0_4px_16px_rgba(168,85,247,0.22)]`.
    - Icon Users tím sáng với hiệu ứng đèn neon: `dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 dark:shadow-[0_0_10px_rgba(168,85,247,0.45)]`.
    - Nhãn và giá trị hiển thị tương phản cao: nhãn `dark:text-purple-300/80`, giá trị "Kinh" `dark:text-purple-100`.
  - Giữ nguyên giao diện sáng Light Glass thanh lịch, trang nhã.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi (Exit Code 0)**.
  - Dev server Next.js biên dịch hoàn tất trong 323ms, phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.14.0] - 2026-10-25
### Cập Nhật Font Chữ "Playwrite New Zealand Guides" & Màu Vàng Cho Banner Câu Nói Hay; Tinh Gọn Thẻ Kỹ Năng & Hồ Sơ Chuyên Gia
- **Banner Câu Nói Hay: Cập Nhật Font & Màu Vàng Rực Rỡ ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css), [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Tích hợp và cấu hình font chữ viết tay nghệ thuật quốc tế **`Playwrite New Zealand Guides`** (`Playwrite NZ Guides`) cho toàn bộ câu trích dẫn banner câu nói hay trên website qua lớp `.font-banner-quote`.
  - Thiết lập màu sắc chữ chuyển sang **màu vàng tươi sáng rực rỡ** (`#facc15` / `text-yellow-400 dark:text-yellow-300`) với quầng sáng chữ vàng hổ phách tinh tế (`textShadow: 0 2px 8px rgba(0,0,0,0.95), 0 0 10px rgba(250,204,21,0.45)`).
  - Đồng bộ chuẩn hóa hiển thị trên tất cả các banner: `HeroBanner.tsx`, `InterviewView.tsx`, `SystemsView.tsx`, `WallpaperView.tsx`.
- **Trang Kỹ Năng Chuyên Môn: Xóa Khối Điểm Chỉ Số Kỹ Năng ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Xóa bỏ hoàn toàn khối `<div>` hiển thị các chỉ số score pills `"Trải nghiệm KH 98% CRM Center 96% Hiệu suất 96%"` ở cuối thẻ trong toàn bộ trang Kỹ Năng Chuyên Môn theo đúng chỉ định.
- **Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân: Xóa Đoạn Văn Giới Thiệu Cốt Lõi ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Xóa bỏ đoạn văn `<p>`: *"Giá trị cốt lõi tạo nên trải nghiệm khách hàng đặc biệt"* bên dưới tiêu đề *"Chân dung & Triết lý vận hành"* theo đúng yêu cầu.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi (Exit Code 0)**.
  - Dev server Next.js biên dịch hoàn tất trong 1416ms, phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.13.0] - 2026-10-25
### Tối Ưu Hóa Trực Quan: Menu Hover Đa Sắc, Thẻ Kỹ Năng Tinh Gọn, Trang Học Vấn & Phỏng Vấn AI, Cấu Hình Giọng Nói Đa Trình Duyệt
- **Menu Header: Hiệu Ứng Mouseover Đồng Màu Icon ([`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - Khi rà chuột (mouse hover) vào bất kỳ nút menu nào, nền nút (`itemBg`), viền nút (`itemBorder`), quầng sáng (`boxShadow`), icon và tiêu đề (`titleColor`) đều đồng bộ phát sáng rực rỡ theo đúng mã màu icon độc bản của trang đó (cả ở chế độ Dark Neon và Light Glass).
- **Trang Kỹ Năng: Tiêu Đề Đồng Màu Icon, Xóa Tag & Nút Bottom ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Tiêu đề thẻ kỹ năng (`card.title`) được thiết lập hiển thị đồng màu tuyệt đối với icon đại diện (`style={{ color: card.themeColor }}`).
  - Xóa bỏ tag danh mục (`categoryFilter`) ở góc trên bên phải và sub-tag mũi tên (`subTag`).
  - Xóa bỏ nút tròn mũi tên ở góc dưới (`<button ...><ChevronRight /></button>`).
  - Hiển thị trực quan toàn bộ danh sách các năng lực thực chiến (`card.details`) ngay trên thẻ, tinh giản không gian và nâng cao trải nghiệm tra cứu.
- **Trang Học Vấn: Xóa View Băng Chuyền, Xóa Tìm Kiếm Banner & Xóa Icon Filter ([`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - Xóa bỏ hoàn toàn chế độ xem Băng chuyền (Carousel) và cụm nút chuyển đổi Lưới/Băng chuyền, mặc định hiển thị giao diện Card Grid hiện đại, mượt mà.
  - Xóa ô tìm kiếm trong phần điều khiển Banner (`bottomControls`).
  - Xóa toàn bộ icon trong các nút bộ lọc danh mục (chỉ giữ lại nhãn chữ tinh gọn, trang nhã).
- **Trang Phỏng Vấn AI: Xóa Khối "CÂU 01 Sẵn sàng" ([`src/components/views/InterviewView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx))**:
  - Xóa bỏ thẻ trạng thái `<div className="flex items-center gap-1.5"> ... CÂU 01 ... Sẵn sàng ... </div>` trong thẻ Chi Tiết Câu Trả Lời theo đúng yêu cầu.
  - Cập nhật giao diện sáng (Light Glass) cho khối thanh tiêu đề banner trên cùng ("ĐỐI THOẠI Phỏng vấn thực chiến Sẵn sàng · 00:00 - 00...").
- **Cấu Hình Giọng Nói AI Đa Ngôn Ngữ & Tiếng Việt ([`src/utils/speechVoice.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/speechVoice.ts), [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx))**:
  - Bổ sung bộ lọc linh hoạt giữa **Tiếng Việt** và **Đa ngôn ngữ** (English, Japanese, Korean, Chinese, French,...) kèm ô tìm kiếm giọng nói nhanh.
  - Chủ động thêm sẵn các giọng đọc chuẩn từ Microsoft (Nam Minh, Hoài My, An) và Chrome (Google Tiếng Việt 5, Standard).
  - Tự động nhận diện trình duyệt:
    - Trình duyệt **Microsoft Edge**: Mặc định kích hoạt giọng **Nam Minh**.
    - Trình duyệt **Google Chrome**: Mặc định kích hoạt giọng **Tiếng Việt 5**.
  - Bổ sung phím tắt 1 chạm chọn nhanh giọng Microsoft Nam Minh & Google Tiếng Việt 5.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js biên dịch thành công trong 578ms, phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.12.0] - 2026-10-25
### Banner Mục Lục Dự Án Lấy Ảnh Thẻ Làm Nền & Thẻ Thông Tin Cá Nhân Đồng Bộ Giao Diện Sáng / Tối
- **Kho 21 Dự Án: Dùng Hình Banner Của Thẻ Dự Án Làm Nền Cho Khối Mục Lục ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Gắn trực tiếp ảnh banner nghệ thuật độ phân giải cao của dự án (`selectedArticle.image`) làm hình nền cho khối Banner Mục Lục bên phải (`aside [data-banner-aspect="sidebar"]`).
  - Phủ lớp kính mờ chuyển sắc đa tầng (`bg-gradient-to-b from-slate-950/92 via-indigo-950/85 to-slate-950/92 backdrop-blur-[1.5px]`), hiệu ứng hover zoom nhẹ tinh tế (`scale-105 group-hover:scale-100 opacity-30 group-hover:opacity-40`), giúp bức tranh dự án hòa quyện vào phông nền trong khi 10 nút mục lục, badge code và nút hành động vẫn sắc nét, dễ đọc.
  - **Phạm vi áp dụng**: Áp dụng duy nhất cho khối Mục Lục trong chi tiết dự án theo đúng chỉ định.
- **Hồ Sơ Chuyên Gia: Thêm Giao Diện Sáng & Giao Diện Tối Cho Khối Thông Tin Cá Nhân ([`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx))**:
  - Tái thiết kế khối Thông tin cá nhân (1.2) chuẩn responsive đa giao diện:
    - *Giao diện sáng (Light Glass)*: Nền kính trắng ngọc trai `bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_-4px_rgba(30,27,75,0.08)]`, viền màu pastel tươi sáng, icon màu xanh dương `text-blue-600 bg-blue-50`.
    - *Giao diện tối (Dark Neon)*: Nền kính đêm `dark:bg-slate-900/90 dark:border-cyan-500/30 dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.7),0_0_16px_rgba(34,211,238,0.12)]`, dải sáng Ambient Light cyan ở cạnh trên, icon phát sáng đa tầng với `shadow-[0_0_8px_currentColor]`.
    - 6 thẻ nhân khẩu học con (Giới tính, Dân tộc, Tình trạng, Sinh nhật, Tạm trú, Cư trú) tự động đổi màu viền, nền và độ tương phản chữ hoàn hảo theo theme đang chọn.
  - **Phạm vi áp dụng**: Áp dụng chuẩn xác duy nhất cho khối Thông tin cá nhân theo đúng chỉ định.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js biên dịch hoàn tất và phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.11.0] - 2026-10-25
### Menu Căn Giữa Cụm Icon & Đèn Neon Đa Sắc Trong Dark Mode; Bổ Sung Giao Diện Sáng Cho Banner Bento Hệ Thống
- **Menu Header: Căn Giữa Cụm Icon & Tiêu Đề Trong Khung Nút ([`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - Đóng gói icon và tiêu đề vào khung nhóm chuyên biệt (`<div className="flex items-center justify-center gap-1.5 w-full mx-auto overflow-hidden">`), căn giữa đối xứng hoàn hảo trong toàn bộ khung nút menu.
  - Loại bỏ căn lệch trái cũ, bảo đảm khoảng cách đệm và độ đồng đều trên toàn bộ 13 tab điều hướng.
- **Giao Diện Tối Glass Neon: Nút Menu Icon Màu Neon Đèn Khác Nhau**:
  - Thiết lập bảng mã màu đèn neon độc bản (`PAGE_NEON_COLORS`) phát quang rực rỡ riêng biệt cho từng nút menu:
    - *Trang Chủ*: Electric Sky Blue (`#38BDF8`)
    - *Thư Ngỏ*: Neon Rose Red (`#FB7185`)
    - *Giới Thiệu*: Neon Violet (`#C084FC`)
    - *Học Vấn*: Emerald Neon (`#34D399`)
    - *Lĩnh Vực*: Amber Gold Neon (`#FBBF24`)
    - *Kỹ Năng*: Electric Cyan Neon (`#22D3EE`)
    - *Kinh Nghiệm*: Indigo Laser Neon (`#818CF8`)
    - *Dự Án*: Magenta Neon (`#E879F9`)
    - *Hệ Thống*: Radiant Orange Neon (`#FB923C`)
    - *Phỏng Vấn*: Hot Pink Neon (`#F472B6`)
    - *Tử Vi*: Mystic Purple Neon (`#F0ABFC`)
    - *Kỷ Niệm*: Lime Mint Neon (`#4ADE80`)
    - *Liên Hệ*: Electric Teal Neon (`#2DD4BF`)
  - Tích hợp hiệu ứng ánh sáng đèn neon phát quang đa tầng (`drop-shadow(0 0 6px neonColor) drop-shadow(0 0 12px neonColor)`) và quầng sáng viền `box-shadow` đồng màu theo chuẩn Glass Neon.
- **Cổng Bento Hệ Thống: Thêm Giao Diện Sáng Cho Banner Phải ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**:
  - Bổ sung lớp nền kính sáng `bg-white/85-92% backdrop-blur-md` dành riêng cho chế độ Light Glass.
  - Tinh chỉnh tương phản màu sắc văn bản, quote hổ phách (`text-amber-800`), thẻ thống kê 12 phân hệ, 3 khối trụ cột cốt lõi, ô tìm kiếm và menu dropdown lọc danh mục hiển thị sắc nét, trang nhã ở giao diện sáng trong khi giữ nguyên toàn bộ giao diện tối sang trọng.
  - **Phạm vi áp dụng**: Áp dụng chuẩn xác duy nhất cho khối Banner Kiến Trúc Hệ Thống theo đúng chỉ định.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js biên dịch hoàn tất, phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.10.0] - 2026-10-25
### Kho 21 Dự Án: Chuyển Khối Mục Lục Thành Banner Bên Phải
- **Tái Cấu Trúc Khối Mục Lục Thành Banner Bên Phải ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Gỡ bỏ thanh ngang dính (sticky header) "MỤC LỤC: 1. Sơ đồ tư duy 2. Tổng quan dự án 3. Bối c..." nằm phía trên luồng đọc nội dung.
  - Chuyển thành **Banner bên phải chuyên biệt (`aside`)** dạng thẻ tráng gương cao cấp (`bg-gradient-to-b from-slate-900/95 via-indigo-950/95 to-slate-900/95 backdrop-blur-2xl`) bám dọc cạnh phải giao diện chi tiết dự án.
  - Thiết kế đầy đủ 10 mục điều hướng có trạng thái Active rõ ràng (đổi màu xanh Cyan phát sáng, badge active, hiệu ứng hover mượt mà) khi cuộn trang hoặc bấm nhảy nhanh đến từng mục:
    1. Sơ đồ tư duy
    2. Tổng quan dự án
    3. Bối cảnh thách thức
    4. Mục tiêu chiến lược
    5. Hạng mục triển khai
    6. Lộ trình vận hành
    7. Chỉ số hiệu quả
    8. Vai trò trách nhiệm
    9. Kết quả đạt được
    10. Triết lý quản trị
  - Tích hợp nút tác vụ nhanh "Sơ đồ tư duy" và "Đóng bài viết" ngay dưới chân banner.
  - Bố cục 2 cột linh hoạt (`lg:flex-row`): Cột bài viết cuộn độc lập bên trái (`flex-1 overflow-y-auto glass-scrollbar`), Banner mục lục cố định tinh tế bên phải (`w-full lg:w-[230px] xl:w-[255px] h-full`).
  - **Phạm vi áp dụng**: Chỉ áp dụng cho đối tượng khối Mục Lục trong Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm theo đúng yêu cầu.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js biên dịch hoàn tất và phản hồi bình thường.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.9.0] - 2026-10-25
### Tối Ưu Trang Tử Vi: Slide Không Trùng, Phong Cách Quản Trị Tinh Gọn, Ưu Thế Làm Việc & Đồng Bộ Chiều Cao 2 Thẻ
- **Slide 1 Tử Vi Bát Trạch: Loại Bỏ Trùng Lặp & Tối Ưu Nội Dung ([`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx))**:
  - Tinh giản thông tin cột phải: giữ lại 4 thẻ thông số nhân thân cốt lõi (Khởi Sinh Dương & Âm, Giờ Sinh & Can Chi, Bản Mệnh Nạp Âm, Cung Mệnh & Cục Vận).
  - Loại bỏ khối Ngũ Hành bị trùng lặp với các slide quản trị và ưu thế.
  - Tích hợp 4 Hướng Cát Bát Trạch (Tây Bắc Sinh Khí, Tây Nam Diên Niên, Đông Bắc Thiên Y, Chính Tây Phục Vị) trình bày súc tích, gắn với phong thủy làm việc.
- **Slide 2 Phong Cách Quản Trị: Dễ Hiểu & Ít Chữ**:
  - Rút gọn 4 trụ cột quản trị thành các điểm gạch đầu dòng cô đọng, dễ đọc:
    - *Quyết Đoán & Kỷ Luật*: Chuẩn hóa SOP & kiểm soát rủi ro; Giám sát SLA 99% nghiêm ngặt.
    - *Thấu Cảm & Nhân Hòa*: Lắng nghe đa chiều, tôn trọng nhân sự; Văn hóa phụng sự gắn kết 150+ nhân sự.
    - *Tư Duy Data-Driven*: Ra quyết định trên số liệu thực tế Dashboard BI; Tối ưu FCR, AHT, NPS và OKRs.
    - *Đổi Mới Công Nghệ AI*: Ứng dụng AI Agent Workflows & tự động hóa; Chuyển đổi trung tâm số đa kênh.
- **Slide 3 Chuyển Thành "Ưu Thế Khi Làm Việc"**:
  - Chuyển hóa toàn bộ nội dung Lục Cung & Ngũ Hành thành 6 ưu thế vận hành vượt trội:
    1. *Bản Lĩnh & Quyết Đoán* (Hành Kim · Cung Mệnh)
    2. *Điều Hành & Chuẩn Hóa SOP* (Hành Hỏa · Cung Quan Lộc)
    3. *Tối Ưu Chi Phí & ROI* (Hành Thổ · Cung Tài Bạch)
    4. *Tâm Thế Phụng Sự Khách Hàng* (Hành Mộc · Cung Phúc Đức)
    5. *Thích Ứng & Mở Rộng Đối Ngoại* (Hành Thủy · Cung Thiên Di)
    6. *Thu Phục Nhân Tâm & Trao Quyền* (Hành Thủy · Cung Nô Bộc)
- **Slide 4 Triết Lý Lãnh Đạo: Tái Cấu Trúc Bố Cục**:
  - Đặt Banner "Châm Ngôn Điều Hành" sang trọng ở trên cùng, bên dưới là lưới 6 thẻ giá trị cốt lõi (01 - 06) cân đối, gọn gàng và không bị tràn khung.
- **Đổi Tên "Tra Hợp Công Việc" Thành "Công Cụ Hợp Việc" & Đồng Bộ Chiều Cao 2 Thẻ**:
  - Đổi tên thẻ bên phải thành **"Công cụ hợp việc"**.
  - Đồng bộ chiều cao thẻ trái (Slide nội dung) và thẻ phải (Công cụ hợp việc) **bằng nhau 100%** bằng cấu trúc Flexbox `items-stretch h-full`.
  - Cả 2 thẻ nằm trọn vẹn và gọn gàng bên trong thẻ chính (`h-full flex-1 min-h-0 overflow-hidden`), các khối danh sách bên trong tự cuộn mượt mà không gây vỡ bố cục trang.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js hoạt động ổn định và phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.8.0] - 2026-10-25
### Trang Chủ Tối Ưu Slide 1/3 Góc Phải & Thẻ Học Vấn Responsive Card Grid View
- **Tối Ưu Trang Chủ: Nhập Thẻ Customer Service & CX Leader Vào Slide Giới Thiệu ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - Gộp toàn bộ thông tin thẻ chính (Badge `Customer Service & CX Leader` với chấm xung nhịp pulse, tiêu đề `Nguyễn Hùng Thái`, chức danh `Trưởng phòng Chăm sóc Khách hàng`, phần giới thiệu và 3 chỉ số cốt lõi `22+ Năm`, `100+ Nhân sự`, `CX Chuyên gia`) vào thẳng **Slide 01 · Giới thiệu**.
  - Giải phóng hoàn toàn trung tâm màn hình, tôn vinh video nền chất lượng cao.
- **Slide Thu Nhỏ Kích Thước 1/3 & Đặt Nằm Bên Dưới Bên Phải**:
  - Thu gọn kích thước cụm Slide Carousel xuống chuẩn tỷ lệ 1/3 (`max-w-[365px] sm:max-w-[380px]`) với các tab chuyển trang mini, chuyển toàn bộ khối slide sang neo góc **dưới cùng bên phải (bottom-right)** trang chủ.
  - Thiết kế kính mờ cao cấp (`backdrop-blur-2xl bg-white/92 dark:bg-[#0B1020]/92`) với hiệu ứng lật trang mượt mà giữa 3 slide: `01 Giới thiệu`, `02 Năng lực`, `03 Thành tựu`.
- **Video Nền Full Thẻ Chính, Cố Định Tuyệt Đối Không Trượt Lên Xuống**:
  - Chuyển container trang chủ sang `overflow-hidden w-full h-full`, video tràn viền 100% thẻ chính (`absolute inset-0 object-cover`).
  - Toàn bộ nội dung vừa vặn hoàn hảo trong khung hiển thị, loại bỏ hoàn toàn hiện tượng thanh cuộn dọc hoặc giao diện bị trượt lên xuống khi di chuột hay thao tác.
  - Phía trên bố trí thanh tinh gọn gồm thẻ trích dẫn thư pháp (`“Khách hàng là trung tâm của mọi hành động”`) bên trái và nút Capsule Laser Beam phát video giới thiệu 23s bên phải.
- **Thẻ Học Vấn: Định Dạng Responsive Card Grid View ([`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - Định dạng toàn bộ 14 thẻ khóa học & bằng cấp thành **Responsive Card Grid View** linh hoạt:
    - Màn hình di động: `grid-cols-1`
    - Máy tính bảng / Màn hình vừa: `sm:grid-cols-2`
    - Laptop / Màn hình lớn: `md:grid-cols-3`
    - Màn hình máy tính để bàn rộng: `xl:grid-cols-4`
  - Mỗi thẻ học vấn được thiết kế chiều cao bằng nhau (`h-full`), có ảnh bìa chứng chỉ đồ họa sắc nét (`h-36 sm:h-40`), tag định dạng, mã khóa học, năm đào tạo, tiêu đề có màu đồng bộ màu icon, đơn vị cấp, đoạn mô tả tóm tắt, tag năng lực và nút bấm **"Xem chi tiết bằng cấp"**.
  - Tích hợp Modal xem chi tiết chuyên sâu khi bấm vào thẻ hoặc nút: hiển thị toàn bộ nội dung môn học (modules có dấu tích xanh), năng lực đạt được (ngôi sao vàng), thực hành thực tế, giá trị ứng dụng nghề nghiệp và nút phóng to hình ảnh bằng cấp sắc nét.
  - Bổ sung bộ chuyển đổi nhanh chế độ xem giữa **Lưới (Card Grid)** và **Băng chuyền (Carousel)** trên thanh công cụ Hero Banner.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js hoạt động ổn định và phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.7.0] - 2026-10-25
### Bảng Cài Đặt Hiển Thị Trực Tiếp (Display Settings), Bước Chỉnh 5% & Lưu Làm Mặc Định Vĩnh Viễn Không Dùng Cookie
- **Bảng Cài Đặt Hiển Thị Xuất Hiện Trực Tiếp Khi Bấm Nút ([`src/components/ui/LiveDisplaySettings.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/LiveDisplaySettings.tsx), [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx))**:
  - Khi người dùng nhấn nút **"Hiển Thị"** trên thanh Footer, hộp thoại **"Display settings"** sẽ xuất hiện ngay lập tức với đầy đủ công cụ điều khiển, không còn bị ẩn sau nút tròn floating person icon.
  - Tích hợp nút đóng nhanh `✕` ở góc trên cùng bên phải và hỗ trợ bấm ra ngoài để đóng tiện lợi.
- **Tăng / Giảm Cỡ Chữ Chính Xác 5% Mỗi Lần Nhấn**:
  - Nâng cấp hệ thống Text Size Stepper: mỗi lần nhấn nút `+5%` hoặc `-5%` sẽ điều chỉnh đúng **5%** (ví dụ: `85%`, `90%`, `95%`, `100%`, `105%`, `110%`, `115%`, `120%`, v.v.).
  - Hiển thị trực quan chỉ số phần trăm lớn cùng giá trị font base `(16.0px base, 16.8px base...)` theo thời gian thực.
  - Tích hợp hàng nút preset chọn nhanh các mức phổ biến: `85%`, `90%`, `95%`, `100%`, `105%`, `110%`, `115%`, `120%`.
  - Khung xem trước trực tiếp (Live Preview) cập nhật ngay lập tức kích thước font chữ và các tùy chọn trợ năng (Độ tương phản cao, Nổi bật liên kết, Giãn cách dòng).
- **Lưu Làm Mặc Định Vĩnh Viễn Toàn Website Không Dùng Cookie ([`src/components/ui/LiveDisplaySettings.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/LiveDisplaySettings.tsx), [`src/app/layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx), [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx))**:
  - Thêm nút nổi bật **"💾 Lưu làm mặc định cho website"** kèm thông báo xác nhận thành công `✓ Đã lưu cài đặt hiển thị làm mặc định!`.
  - Tự động đồng bộ và lưu trữ lâu dài trong `localStorage` (`hungthai_font_scale_percent`, `hungthai_font_scale`, cùng các cờ trợ năng).
  - Khởi tạo ngay trong thẻ `<script>` của [`src/app/layout.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx) khi tải trang, đảm bảo website áp dụng đúng cỡ chữ đã lưu ngay từ mili-giây đầu tiên, không bị giật trang (zero layout shift / flicker) và hoàn toàn không sử dụng cookie.
- **Chuẩn Hóa Nút "Giới Thiệu" Padding 2px Tại Trang 6 Lĩnh Vực ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - Thêm nút bấm `<button>` với nhãn / tooltip "Giới Thiệu" có padding tiêu chuẩn đúng 2px (`p-[2px]`) áp dụng nhất quán trên toàn bộ 6 thẻ lĩnh vực và chế độ xem chi tiết.
- **Lưu Trữ Hình Nền Lâu Dài Không Dùng Cookie ([`src/utils/wallpaperStorage.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/wallpaperStorage.ts), [`src/components/views/WallpaperView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/WallpaperView.tsx))**:
  - Toàn bộ lựa chọn hình nền (chọn 1 chạm, nhấn đúp, tải ảnh cá nhân, gradient studio) đều được lưu trực tiếp vào `localStorage` & `IndexedDB`, hoạt động ổn định lâu dài qua mọi lần mở trình duyệt mà không dùng cookie.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server Next.js chạy ổn định và phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.6.0] - 2026-10-24
### Hiển Thị Hình Banner Infographic Sắc Nét Cho Thẻ Dự Án Bên Ngoài Danh Sách
- **Nâng Cấp Khung Cover Banner Thẻ Dự Án ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx), [`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
  - Gỡ bỏ lớp phủ tạo sóng nước CSS che lấp ảnh (`repeating-radial-gradient`) và gỡ bỏ `opacity: 0.35; mix-blend-mode: overlay;` khiến hình dự án bị chìm mờ trước đây.
  - Hiển thị hình ảnh banner infographic chuyên nghiệp của từng dự án (`proj.image`) với độ rõ nét 100% (`opacity: 1; object-fit: cover;`).
  - Mở rộng chiều cao khung banner cover từ 112px lên **140px**, tạo tỷ lệ thị giác hài hòa, nổi bật nội dung dự án ngay trên mặt thẻ ngoài danh sách.
  - Tích hợp lớp gradient bảo vệ tương phản (`from-black/45 via-transparent to-black/15`) giúp pill nhóm dự án ở góc trên và tab thời gian đọc (`card-104__tab`) với góc cong lượn lòng chảo (concave corner) nổi bật sắc nét.
  - Thêm hiệu ứng phóng nhẹ ảnh banner mượt mà (`transform: scale(1.06)`) khi di chuột vào thẻ (`hover`).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.5.0] - 2026-10-24
### Tối Ưu Cấu Hình Giọng Nói AI Nằm Giữa Popup Chat & Chuẩn Hóa Menu Icon Khung Bao Trùm
- **Cấu Hình Giọng Nói AI Nằm Chính Giữa Popup Chat ([`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx))**:
  - Di chuyển bảng popup **"Cấu Hình Giọng Nói AI"** từ góc trên bên phải (bị neo vào icon bánh răng) ra **chính giữa tuyệt đối** (centered) của cửa sổ chat popup.
  - Sử dụng lớp phủ kính mờ nhẹ (`absolute inset-0 z-50 flex items-center justify-center p-3.5 bg-slate-950/45 backdrop-blur-[2px]`) bao trùm toàn bộ không gian popup chat, tạo chiều sâu thị giác tập trung.
  - Hộp thoại được bo góc 3D mềm mại (`rounded-3xl border border-indigo-200/90 shadow-[0_25px_60px_rgba(0,0,0,0.35)]`), căn chỉnh tỷ lệ tối ưu (`max-w-[340px] max-h-[92%]`) với thanh cuộn mượt mà.
  - Tích hợp nút đóng `✕` tinh tế cùng cơ chế bấm ra ngoài vùng hộp thoại (backdrop click) hoặc bấm lại nút bánh răng để đóng mở nhanh chóng và tiện lợi.
- **Menu Icon: Bỏ Khung Tròn Của Icon, Tạo Khung Bao Trùm Cả Icon Và Tiêu Đề ([`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx), [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx))**:
  - **Loại bỏ khung tròn riêng biệt của icon**: Gỡ bỏ thẻ container tròn (`neonav-icon-box w-7 h-7 rounded-full` với viền và nền riêng) bao quanh icon. Icon vector SVG giờ đây hiển thị thoáng đãng, sắc nét và hòa quyện cùng màu chủ đạo của thẻ.
  - **Tạo khung bao trùm đồng bộ icon và tiêu đề**: Nút menu đóng vai trò là một khung viền container hoàn chỉnh (`rounded-xl border h-[36px] sm:h-[38px] px-2.5 gap-1.5 flex items-center justify-center`), ôm trọn cả icon và tiêu đề bên trong với khoảng cách cân đối, hiệu ứng hover mượt mà và bóng đổ thanh lịch.
  - Đồng bộ format trên popup menu chọn trang nhanh ở Footer (`Footer.tsx`).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.4.0] - 2026-10-24
### Tối Ưu Thẻ Dự Án 1.1: Xóa Banner Phải Khi Xem Chi Tiết, Đánh Số Mục Con Cấp 2, Tiêu Đề Viết Thường Đồng Màu Icon
- **Xóa Banner Bên Phải Khi Vào Chi Tiết Dự Án ([`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx))**:
  - Tự động ẩn hoàn toàn khối banner dọc `<aside data-banner-aspect="1.5:16">` bên phải khi `selectedArticle` được chọn.
  - Cho phép giao diện chi tiết dự án ([`ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx)) mở rộng toàn màn hình (100% full-width), giải phóng không gian hiển thị thông thoáng và chuyên nghiệp.
- **Đánh Số Thứ Tự & Đánh Số Mục Con Cấp 2 Dạng X.Y ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Chuẩn hóa 10 thẻ chính theo số tự nhiên từ 1 đến 10:
    - `1. Sơ đồ tư duy`, `2. Tổng quan dự án`, `3. Bối cảnh thách thức`, `4. Mục tiêu chiến lược`, `5. Hạng mục triển khai`, `6. Lộ trình vận hành`, `7. Chỉ số hiệu quả`, `8. Vai trò trách nhiệm`, `9. Kết quả đạt được`, `10. Triết lý quản trị`.
  - Đánh số phân cấp các mục con (sub-items) tương ứng theo tiền tố thẻ cha:
    - *Mục 1*: `1.1 · Bối cảnh vận hành`, `1.2 · Mục tiêu kỳ vọng`, `1.3 · Trụ cột vận hành`, `1.4 · Kết quả định lượng`.
    - *Mục 2*: `2.1 · Con người vận hành`, `2.2 · Quy trình chuẩn hóa`, `2.3 · Công nghệ tổng đài`, `2.4 · Dữ liệu đo lường`.
    - *Mục 3 (ví dụ của người dùng)*: `3.1 · Phân định trách nhiệm`, `3.2 · Quy trình thống nhất`, `3.3 · Phân bổ nguồn lực`, `3.4 · Tập trung dữ liệu`, `3.5 · Đồng bộ chất lượng`, `3.6 · Hệ thống đo lường`, `3.7 · Phối hợp liên phòng`.
    - *Mục 4*: `4.1 · Mô hình tổ chức`, `4.2 · Chuẩn hóa vận hành`, `4.3 · Nền tảng phát triển`.
    - *Mục 5*: `5.1 · Khảo sát hiện trạng`, `5.2 · Cơ cấu tổ chức`, `5.3 · Mô hình vận hành`, `5.4 · Chuẩn hóa quy trình`, `5.5 · Hoạch định nhân sự`, `5.6 · Hệ thống công nghệ`, `5.7 · Đào tạo vận hành`.
    - *Mục 6*: `6.1 · Khảo sát yêu cầu`, `6.2 · Thiết kế mô hình`, `6.3 · Triển khai thử nghiệm`, `6.4 · Vận hành kiểm soát`, `6.5 · Đánh giá cải tiến`.
    - *Mục 7*: `7.1 · Khả năng đáp ứng`, `7.2 · Hiệu quả xử lý`, `7.3 · Chất lượng dịch vụ`, `7.4 · Trải nghiệm khách hàng`, `7.5 · Quản trị tồn đọng`, `7.6 · Hiệu quả nguồn lực`, `7.7 · Tuân thủ quy trình`.
    - *Mục 8*: `8.1 · Định hướng mô hình`, `8.2 · Tổ chức bộ máy`, `8.3 · Điều hành vận hành`, `8.4 · Kết nối liên phòng`, `8.5 · Phát triển nhân sự`, `8.6 · Cải tiến liên tục`, `8.7 · Duy trì tiêu chuẩn`.
    - *Mục 9*: `9.1 · Tổ chức tinh gọn`, `9.2 · Vận hành thống nhất`, `9.3 · Chuẩn hóa nhân sự`, `9.4 · Công nghệ tập trung`, `9.5 · Nhất quán phục vụ`, `9.6 · Nền tảng bền vững`.
    - *Mục 10*: `10.1 · Công nghệ tốc độ`, `10.2 · Quy trình nhất quán`, `10.3 · Con người trọng tâm`.
- **Chuẩn Hóa Tiêu Đề Chỉ Viết Hoa Chữ Đầu & Màu Tiêu Đề Giống Màu Icon ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Gỡ bỏ toàn bộ `uppercase` trên tiêu đề thẻ chính và thẻ con, chuyển sang viết hoa chữ đầu câu (Sentence/Title case) trang nhã.
  - Màu sắc tiêu đề của từng thẻ chính và thẻ con thừa hưởng chính xác mã màu của icon tương ứng (Fuchsia, Cyan, Amber, Teal, Purple, Emerald, Rose, Violet).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.3.0] - 2026-10-24
### Tối Ưu Thẻ Kỹ Năng: Kích Thước Hình Bằng Nhau, Tiêu Đề Cùng Màu Icon, Hiển Thị Mô Tả & List Kỹ Năng Ra Ngoài
- **Chuẩn Hóa Kích Thước Hình Minh Họa 3D Bằng Nhau Hoàn Hảo ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Cố định khung chứa hình 3D cho toàn bộ 6 thẻ kỹ năng thành khung vuông `w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] aspect-square` với `col-span-5 h-[96px] sm:h-[104px] flex items-center justify-center relative pointer-events-none`.
  - Hình ảnh áp dụng `w-full h-full object-contain drop-shadow-md group-hover/card:scale-108 transition-transform duration-300` cùng hiệu ứng quầng sáng `blur-xl opacity-35` đồng màu thẻ, đảm bảo cả 6 thẻ đều có hình minh họa cùng kích thước, không bị co kéo hay lệch tỷ lệ.
- **Tiêu Đề Thẻ Cùng Màu Với Icon ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Đồng bộ màu chữ tiêu đề `<h3>` theo đúng mã màu của icon (`card.themeColor`) với font `font-black font-play text-[19px] sm:text-[20px] lg:text-[21px]`.
  - Icon vector SVG không khung hiển thị sắc nét cùng màu `card.themeColor`, tạo nên sự đồng nhất hoàn hảo giữa icon và tên thẻ.
- **Hiển Thị Mô Tả & List Kỹ Năng Trực Tiếp Ra Ngoài Thẻ ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Giữ nguyên định hướng với Sub-tag và đoạn mô tả tổng quan (`card.desc`).
  - Bổ sung khối **Kỹ năng thực chiến** dạng danh sách (list) trực tiếp trên mặt thẻ: hiển thị 3 kỹ năng cốt lõi kèm bullet phát quang và chỉ số đánh giá % năng lực (`item.percent%`), giúp người xem nắm bắt ngay năng lực mà không cần bấm vào chi tiết.
  - Tích hợp thanh pill tags và nút chuyển động tròn xem chi tiết ở chân thẻ.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.2.0] - 2026-10-24
### Đồng Bộ Format Banner Trang Kỹ Năng Theo Chuẩn Format Banner Lĩnh Vực
- **Xóa Khối Banner Ảnh Tĩnh & Header Thừa ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Gỡ bỏ hoàn toàn thẻ `<img src="/images/skills/hero-banner.png" ... />` tĩnh và phần header `Kỹ Năng Chuyên Môn` tách rời.
  - Gỡ bỏ thanh `HORIZONTAL FILTER BAR & SEARCH` tách rời ở giữa trang để tích hợp trực tiếp vào Banner.
- **Tích Hợp HeroBanner Chuẩn Format Lĩnh Vực ([`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Sử dụng component `<HeroBanner>` với video nền chuyển động mượt mà, hiệu ứng kính Glassmorphism đa sắc và câu quote định hướng:
    - `badgeText="Khám phá"`
    - `title="Kỹ Năng Chuyên Môn"`
    - `titleIcon="bolt"`
    - `quote="“Làm chủ công nghệ – Nâng tầm quản trị vận hành xuất sắc.”"`
    - `quoteAuthor="— Nguyễn Hùng Thái"`
  - **Tích hợp thanh bộ lọc `bottomControls` vào góc dưới HeroBanner**:
    - Chuẩn hóa các nút tab lọc bo tròn viên thuốc mềm mại `rounded-full text-[11px] font-bold font-play tracking-wide`:
      - `Tất cả (6)`
      - `Nền tảng (S)`
      - `Quản trị (W)`
      - `Biến động (T)`
      - `Chuyển đổi & AI (O)`
      - `Cộng đồng`
    - Tự động ẩn thanh điều khiển khi người dùng mở chi tiết thẻ (`!selectedCard`), hoàn toàn đồng bộ 100% với hành vi của `DomainsView`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.1.0] - 2026-10-24
### Tối Ưu Hóa Trang Chi Tiết Dự Án 1.1: Chuẩn Hóa Tiêu Đề Thẻ 4 Chữ, Icon Không Khung, Màu Nền Đa Sắc & Chiều Cao Bằng Nhau
- **Chuẩn Hóa Tiêu Đề Thẻ Theo Công Thức: `Số & Icon Không Khung & Tiêu Đề 4 Chữ` ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Loại bỏ toàn bộ khung viền / hộp bao quanh icon (bỏ `rounded-xl`, bỏ `bg-white/90`, bỏ viền viền hộp); đưa icon vector SVG thành biểu tượng không khung phát quang tinh tế.
  - Cấu trúc số thứ tự sắc nét font mono black (`00`, `01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`) đi kèm icon độc lập và tiêu đề chuẩn xác **4 chữ**:
    - **00. SƠ ĐỒ TƯ DUY** *(Architecture Mind Map)*
    - **01. TỔNG QUAN DỰ ÁN** *(Executive Summary)*
    - **02. BỐI CẢNH THÁCH THỨC** *(Context & Challenges)*
    - **03. MỤC TIÊU CHIẾN LƯỢC** *(Strategic Objectives)*
    - **04. HẠNG MỤC TRIỂN KHAI** *(Key Workstreams)*
    - **05. LỘ TRÌNH VẬN HÀNH** *(5-Phase Roadmap)*
    - **06. CHỈ SỐ HIỆU QUẢ** *(KPI & SLA Framework)*
    - **07. VAI TRÒ TRÁCH NHIỆM** *(PM Leadership)*
    - **08. KẾT QUẢ ĐẠT ĐƯỢC** *(Value Outcomes)*
    - **09. TRIẾT LÝ QUẢN TRỊ** *(Leadership Philosophy)*
- **Chuẩn Hóa Tiêu Đề 4 Chữ & Icon Không Khung Cho Toàn Bộ Thẻ Con (Sub-Cards)**:
  - *Sơ đồ tư duy (4 nhánh)*: `01 · BỐI CẢNH VẬN HÀNH`, `02 · MỤC TIÊU KỲ VỌNG`, `03 · TRỤ CỘT VẬN HÀNH`, `04 · KẾT QUẢ ĐỊNH LƯỢNG`.
  - *4 Trụ cột cốt lõi*: `01 · CON NGƯỜI VẬN HÀNH`, `02 · QUY TRÌNH CHUẨN HÓA`, `03 · CÔNG NGHỆ TỔNG ĐÀI`, `04 · DỮ LIỆU ĐO LƯỜNG`.
  - *7 Thách thức điểm nghẽn*: `01 · PHÂN ĐỊNH TRÁCH NHIỆM`, `02 · QUY TRÌNH THỐNG NHẤT`, `03 · PHÂN BỔ NGUỒN LỰC`, `04 · TẬP TRUNG DỮ LIỆU`, `05 · ĐỒNG BỘ CHẤT LƯỢNG`, `06 · HỆ THỐNG ĐO LƯỜNG`, `07 · PHỐI HỢP LIÊN PHÒNG`.
  - *3 Mục tiêu trọng tâm*: `01 · MÔ HÌNH TỔ CHỨC`, `02 · CHUẨN HÓA VẬN HÀNH`, `03 · NỀN TẢNG PHÁT TRIỂN`.
  - *7 Hạng mục công việc*: `01 · KHẢO SÁT HIỆN TRẠNG`, `02 · CƠ CẤU TỔ CHỨC`, `03 · MÔ HÌNH VẬN HÀNH`, `04 · CHUẨN HÓA QUY TRÌNH`, `05 · HOẠCH ĐỊNH NHÂN SỰ`, `06 · HỆ THỐNG CÔNG NGHỆ`, `07 · ĐÀO TẠO VẬN HÀNH`.
  - *5 Giai đoạn lộ trình*: `01 · KHẢO SÁT YÊU CẦU`, `02 · THIẾT KẾ MÔ HÌNH`, `03 · TRIỂN KHAI THỬ NGHIỆM`, `04 · VẬN HÀNH KIỂM SOÁT`, `05 · ĐÁNH GIÁ CẢI TIẾN`.
  - *7 Nhóm chỉ số KPI/SLA*: `01 · KHẢ NĂNG ĐÁP ỨNG`, `02 · HIỆU QUẢ XỬ LÝ`, `03 · CHẤT LƯỢNG DỊCH VỤ`, `04 · TRẢI NGHIỆM KHÁCH HÀNG`, `05 · QUẢN TRỊ TỒN ĐỌNG`, `06 · HIỆU QUẢ NGUỒN LỰC`, `07 · TUÂN THỦ QUY TRÌNH`.
  - *7 Vai trò quản lý*: `01 · ĐỊNH HƯỚNG MÔ HÌNH`, `02 · TỔ CHỨC BỘ MÁY`, `03 · ĐIỀU HÀNH VẬN HÀNH`, `04 · KẾT NỐI LIÊN PHÒNG`, `05 · PHÁT TRIỂN NHÂN SỰ`, `06 · CẢI TIẾN LIÊN TỤC`, `07 · DUY TRÌ TIÊU CHUẨN`.
  - *6 Khía cạnh kết quả*: `01 · TỔ CHỨC TINH GỌN`, `02 · VẬN HÀNH THỐNG NHẤT`, `03 · CHUẨN HÓA NHÂN SỰ`, `04 · CÔNG NGHỆ TẬP TRUNG`, `05 · NHẤT QUÁN PHỤC VỤ`, `06 · NỀN TẢNG BỀN VỮNG`.
  - *3 Chân kiềng triết lý*: `01 · CÔNG NGHỆ TỐC ĐỘ`, `02 · QUY TRÌNH NHẤT QUÁN`, `03 · CON NGƯỜI TRỌNG TÂM`.
- **Màu Sắc Nền Đa Dạng & Chiều Cao Bằng Nhau Cho Tất Cả Các Thẻ**:
  - Áp dụng hệ bảng màu pastel thủy tinh Light mode và neon glassmorphism Dark mode độc lập cho từng thẻ (Sky, Emerald, Purple, Amber, Rose, Cyan, Indigo).
  - Tối ưu hóa cấu trúc CSS Grid `items-stretch` kết hợp `h-full flex flex-col justify-between` giúp toàn bộ các thẻ trong cùng hàng luôn có chiều cao bằng nhau tuyệt đối.
  - Tích hợp hình ảnh mô tả chuyên nghiệp, sơ đồ tư duy tương tác và huy hiệu kết quả đầu ra (Deliverable) nổi bật.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---

## [3.0.0] - 2026-10-24
### Tích Hợp Recipe Card-002 (Tagged Photo Content Card) Vào Thẻ Học Vấn & Chứng Chỉ
- **Áp Dụng Công Thức Card-002 Chuẩn Plain CSS ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
  - Tích hợp chuẩn xác công thức thiết kế từ https://designforai.dev/snippet/card-002.md:
    - Kích thước thẻ: `width: 300px`, padding `12px`, bo góc `20px`, màu nền `#fafaf9`, đổ bóng nhẹ `0 1px 2px rgba(0,0,0,.06)`.
    - Khối ảnh nắp thẻ `.card-002__img`: Chiều cao `180px`, bo góc `14px`, dải màu `linear-gradient(160deg, #fed7aa, #fb923c 70%, #ea580c)`.
    - Nhãn pill nổi góc trên bên trái `span`: Bo tròn viên thuốc `999px`, nền trắng trong suốt 85% (`rgba(255,255,255,.85)`), chữ `12px` semibold, màu `#9a3412`.
    - Tiêu đề `h3`: Cỡ chữ `17px`, font đậm 700, margin `14px 6px 6px`.
    - Đoạn mô tả `p`: Cỡ chữ `14px`, line-height `1.5`, màu `#57534e`, margin `0 6px 6px`.
    - Hỗ trợ đầy đủ Dark Mode (`[data-theme="dark-neon"]` / `.dark`) với tông nền `#18181b`, chữ sáng `#f4f4f5` và viền tinh tế.
- **Áp Dụng Cho Thẻ Học Vấn ([`src/components/ui/DragAndSnapCardCarousel.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/DragAndSnapCardCarousel.tsx) & [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - Chuyển đổi toàn bộ 14 thẻ khóa học trong thanh trượt sang thẻ ngữ nghĩa `<article class="card-002 u339-cd">`.
  - Khối ảnh 180px kết hợp hình ảnh chứng chỉ với lớp phủ gradient ấm áp `#fed7aa -> #ea580c`.
  - Nhãn tag pill 12px semibold `#9a3412` hiển thị hình thức chứng chỉ đào tạo.
  - Tích hợp đầy đủ nút phóng to xem bằng cấp trên hover, huy hiệu năm học, mã môn và nút xem chi tiết chương trình.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.99.0] - 2026-10-24
### Đổi Tên Thẻ "Giao Tiếp Cộng Đồng", Tích Hợp Chi Tiết Đồng Bộ Với Lĩnh Vực & Cập Nhật 6 Ảnh 3D
- **Cập Nhật Tên Thẻ 06 ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Đổi tên thẻ thứ 6 thành **Giao Tiếp Cộng Đồng** *(thay cho "Giao Tiếp Quốc Tế")*, căn chỉnh subtag sang *"Gắn kết & truyền thông cộng đồng"*, hoàn thiện các chỉ số đo lường NPS (+75), tỷ lệ thấu cảm (98%) và tương tác cộng đồng tích cực (92%).
  - Cập nhật tab bộ lọc từ *"Ngôn ngữ"* thành *"Cộng đồng"* với biểu tượng `MessageCircle`.
- **Cập Nhật Toàn Bộ 6 Hình Minh Họa 3D Mới Từ Người Dùng**:
  1. Card 01 - Nền Tảng Vận Hành: `https://i.ibb.co/BH1N9dkx/N-n-T-ng-V-n-H-nh.png`
  2. Card 02 - Nâng Tầm Quản Trị: `https://i.ibb.co/Q7JzbKjW/N-ng-T-m-Qu-n-Tr.png`
  3. Card 03 - Quản Trị Biến Động: `https://i.ibb.co/0pshM6HN/Qu-n-Tr-Bi-n-ng.png`
  4. Card 04 - Chuyển Đổi Dịch Vụ: `https://i.ibb.co/wrJm7r1z/Chuy-n-i-D-ch-V.png`
  5. Card 05 - Trí Tuệ Nhân Tạo: `https://i.ibb.co/gMw15CKB/Tr-Tu-Nh-n-T-o.png`
  6. Card 06 - Giao Tiếp Cộng Đồng: `https://i.ibb.co/RV23vvj/Giao-Ti-p-C-ng-ng.png`
- **Đồng Bộ Format Chi Tiết Khi Click Thẻ Chuẩn 100% Theo Thẻ Lĩnh Vực**:
  - Thay thế popup modal truyền thống bằng giao diện chi tiết In-Place cao cấp:
    - **Thanh Breadcrumb đỉnh trang**: Nút badge `[⚡ KỸ NĂNG CHUYÊN MÔN] > [Tên kỹ năng 4 chữ]`, đi kèm nút `[← Quay lại danh sách]` trở về lưới 6 thẻ mượt mà.
    - **ROW 1**:
      - *Cột trái (5 Cols)*: Hero Card bo góc `26px` mang màu gradient chủ đạo, Unframed Icon phát quang, tiêu đề 4 chữ, mô tả định hướng, pill strip và ảnh 3D nổi khối bên phải.
      - *Cột phải (7 Cols)*: 3 Thẻ Pillar (Cột trụ năng lực: Năng lực lãnh đạo/thực chiến, Phương pháp chuẩn hóa SOP, Hệ thống công nghệ) + Thẻ mô tả chuyên sâu năng lực.
    - **ROW 2**:
      - *Cột trái (7 Cols)*: Chi Tiết Khung Năng Lực & Điểm Đánh Giá với 4 thẻ tiến độ thanh đo % phát sáng.
      - *Cột phải (5 Cols)*: Chỉ Số Cam Kết & Thành Tựu Nổi Bật (4 ô metric: CSAT, SLA, Tốc độ, FCR...).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.98.0] - 2026-10-24
### Chuẩn Hóa Thẻ Kỹ Năng: Tiêu Đề 4 Chữ & Icon Bỏ Khung Đồng Bộ Với Thẻ Lĩnh Vực
- **Đồng Bộ Tiêu Đề 4 Chữ Cho 6 Thẻ Kỹ Năng ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Chuẩn hóa tiêu đề thành cấu trúc 4 chữ ngắn gọn, dứt khoát và đẳng cấp tương đồng với thẻ Lĩnh vực (`DomainsView`):
    1. Card 01 (Điểm mạnh S): **Nền Tảng Vận Hành** *(thay cho "Nền Tảng Vận Hành & Lãnh Đạo")*
    2. Card 02 (Hoàn thiện W): **Nâng Tầm Quản Trị** *(thay cho "Nâng Cao Năng Lực Quản Trị")*
    3. Card 03 (Thách thức T): **Quản Trị Biến Động** *(thay cho "Thích Ứng & Quản Trị Biến Động")*
    4. Card 04 (Cơ hội O): **Chuyển Đổi Dịch Vụ** *(thay cho "Công Nghệ & Chuyển Đổi Dịch Vụ")*
    5. Card 05 (AI & Dữ liệu): **Trí Tuệ Nhân Tạo** *(thay cho "Hệ Thống Trí Tuệ Nhân Tạo AI")*
    6. Card 06 (Ngôn ngữ): **Giao Tiếp Quốc Tế** *(thay cho "Ngôn Ngữ & Giao Tiếp Quốc Tế")*
- **Thiết Kế Icon Bỏ Khung (Unframed Icon) Giống Lĩnh Vực**:
  - Loại bỏ hoàn toàn khối hộp nền vuông bo tròn (`w-10 h-10 rounded-2xl` gradient) bao quanh icon.
  - Chuyển sang dạng **Unframed Icon** đứng trần thanh thoát với hiệu ứng `animate-pulse`, kích thước `20px - 24px` tương xứng trực tiếp với kích thước chữ tiêu đề.
  - Bố trí Icon và Tiêu đề 4 chữ nằm cùng 1 hàng ngang sắc nét ở đầu thẻ (`Top Row`), mang màu sắc nhận diện chủ đạo (`themeColor`), liền mạch với subtag, mô tả và hình minh họa 3D bên dưới.
  - Đồng bộ hoá Unframed Icon và tiêu đề 4 chữ trong cả cửa sổ chi tiết Modal khi người dùng nhấp vào thẻ.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.97.0] - 2026-10-24
### Tinh Chỉnh Kích Thước Con Trỏ Chuột Về Chuẩn Kích Thước Windows (32×32)
- **Tối Ưu Hóa Kích Thước Con Trỏ Chuột ([`public/cursors/`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/public/cursors/))**:
  - Khắc phục triệt để hiện tượng con trỏ hiển thị quá khổ trên trình duyệt do tệp gốc chứa nhiều lớp phân giải (lên đến 128×128 / 96×96) khiến Chromium/Edge tự động chọn kích thước lớn nhất.
  - Tách và trích xuất nguyên bản frame ảnh **32×32 pixel** - kích cỡ chuẩn gốc của con trỏ chuột hệ điều hành Windows cho toàn bộ 17 trạng thái con trỏ ở cả hai bộ sưu tập:
    - [`public/cursors/dark/`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/public/cursors/dark/): Giao diện tối (Dark Mode / Neon Glass)
    - [`public/cursors/light/`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/public/cursors/light/): Giao diện sáng (Light Mode / Light Glass)
  - Chuyển đổi trạng thái bận và chạy ngầm từ animated (`.ani`) sang định dạng `.cur` chuẩn 32×32 tương thích hoàn hảo 100% với tất cả trình duyệt hiện đại:
    - `03_working_in_background.cur` (hotspot `9, 9`)
    - `04_busy.cur` (hotspot `9, 9`)
- **Định Nghĩa Hotspot Chuẩn Xác Trong CSS ([`src/styles/cursors.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/cursors.css))**:
  - Khai báo toạ độ điểm nhấp (hotspot pixel) chuẩn xác đến từng pixel trực tiếp trong các biến CSS và fallback native:
    - Normal Select: `2 2`
    - Help Select: `2 2`
    - Text Select: `15 16`
    - Link / Pointer Select: `7 3`
    - Move: `16 16`
    - Alternate / Grab: `16 2`
    - Resize Dọc / Ngang / Chéo: `8 19`, `11 8`, `16 11`, `11 12`
    - Busy / Wait: `9 9`
- **Cập Nhật Bộ Xem Trước ([`src/components/ui/CursorShowcase.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/CursorShowcase.tsx))**:
  - Gắn nhãn chuẩn Windows 32×32 và cung cấp trải nghiệm rê chuột nhỏ gọn, sắc nét, phản hồi chuẩn xác theo chuyển động tay người dùng.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.96.0] - 2026-10-24
### Tích Hợp Recipe Card-104 (Water Ripples Article Card) Vào Thẻ Dự Án
- **Thêm Bộ Quy Tắc CSS Card-104 Bằng Plain CSS ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
  - Tích hợp chuẩn xác công thức từ https://designforai.dev/snippet/card-104.md:
    - Kích thước thẻ tiêu chuẩn: `width: 264px` (tương thích grid linh hoạt).
    - Viền và góc bo: `1px solid #dfe4e1`, bo góc `18px`, `overflow: hidden`, nền `white` (`#ffffff`).
    - Nắp ảnh Cover `112px` hiệu ứng sóng nước tĩnh lặng (*calm water ripples*):
      - 2 lớp `repeating-radial-gradient` các vòng `rgba(10, 55, 80, 0.22)` tâm đặt tại `74% 70%`.
      - Lớp nền `radial-gradient` dải màu từ `#8cd0dc` sang `#2c7a9b`.
    - Thẻ nhãn Pill Tag góc trên bên trái: Nền trắng, chữ đậm 12px (`font-size: 12px; font-weight: 700;`).
    - Tab thời gian đọc Reading-time Tab cao `30px`:
      - Nằm sát mép dưới bên trái nắp cover (`flush left at the bottom of the cover`).
      - Nền trắng, icon đồng hồ, chữ đậm 12px (`6 min read` / `6 phút đọc`).
      - Bo tròn góc trên bên phải `12px` (`border-top-right-radius: 12px`).
      - Góc lõm cong mềm mại Concave Corner `12px` liền kề bên phải được vẽ bằng `::after` với `radial-gradient(circle at 100% 0, transparent 12px, #fff 12.5px)`.
    - Phần thân bài viết `.card-104__body`: Tiêu đề `h3` sắc nét font Playfair, mô tả `p` 2 dòng gọn gàng, hỗ trợ đầy đủ Dark Mode (`[data-theme="dark-neon"]` / `.dark`).
- **Áp Dụng Cho Thẻ Dự Án ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**:
  - Tại trang 21 Dự Án Trọng Điểm (`ProjectsView.tsx`), chuyển đổi toàn bộ thẻ dự án ở chế độ Lưới (Grid View) sang chuẩn kiến trúc `card-104`:
    - Cover sóng nước 112px kết hợp ảnh dự án mờ nghệ thuật.
    - Pill nhãn danh mục ("Chiến lược", "Vận hành", "Nhân sự", "Công nghệ").
    - Tab thời gian đọc với góc lõm cong concave 12px mượt mà.
    - Thân thẻ hiển thị mã dự án, huy hiệu hoàn thành SLA, tiêu đề và mô tả xúc tích.
    - Duy trì khả năng morphing mượt mà sang List View (FLIP animation).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.95.0] - 2026-10-24
### Chuyển Khối Nhóm Dự Án & Tiêu Đề Bài Viết Thành Banner Bên Phải
- **Chuyển Khối `<div>` "NHÓM 1 · NHÓM CHIẾN LƯỢC & CẤU TRÚC VẬN HÀNH CSKH 1...." Thành Banner Bên Phải ([`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx))**:
  - Chuyển toàn bộ thông tin khối nhận diện Nhóm dự án & Tiêu đề bài viết (*"NHÓM 1 · NHÓM CHIẾN LƯỢC & CẤU TRÚC VẬN HÀNH CSKH - 1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng"*) sang **Thanh Banner Dọc Phía Phải** (`HeroBanner`):
    - **Header Banner**: Tích hợp huy hiệu nhóm dự án phát quang với chấm tròn neon `cyan-400` nhấp nháy, mã dự án, và icon đại diện nhóm tương thích màu visual theme.
    - **Thẻ Nhận Diện Dự Án**: Trình bày tiêu đề bài viết font Playfair/Play chữ trắng sắc nét, phụ đề tiếng Anh và trạng thái tiến độ (`Đang vận hành & Chuẩn hóa toàn diện`).
    - **Nút Thao Tác Nhanh**: Tích hợp nút *"Quay lại"* (đóng bài viết về 21 dự án) và nút *"Sơ đồ"* (phóng to sơ đồ tư duy) dạng kính mờ đồng bộ.
  - Tinh gọn giao diện bài viết bên trái ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx)): Thay thế thanh header trùng lặp bằng thanh Quick Tabs (Mục lục nhảy nhanh) thanh thoát, gọn gàng, liền mạch với Executive Banner bên dưới.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.94.0] - 2026-10-24
### Xóa Khối Thẻ Mục Lục Bài Viết Khỏi Thanh Hero Banner Dọc Phía Phải
- **Xóa Khối `<div>` "Mục lục bài viết MỤC LỤC BÀI VIẾT 1.1 1.1 · Xây dựng..." ([`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx))**:
  - Theo yêu cầu của người dùng đối với khối `<div>` này (Phạm vi: Chỉ áp dụng cho đối tượng này):
    - Đã loại bỏ hoàn toàn thẻ Mục lục bài viết (TOC Card) bên trong thanh `<HeroBanner>` dọc bên phải khi đang mở bài viết chi tiết dự án.
    - Giúp thanh HeroBanner dọc giữ trọn vẹn không gian video minh họa, trích dẫn danh ngôn lãnh đạo và tiêu đề sắc nét mà không bị che khuất bởi khối danh sách mục lục.
    - Việc điều hướng bài viết dự án đã được tích hợp đầy đủ, tiện lợi trực tiếp tại thanh Executive Banner đỉnh trang của [`ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx) thông qua dải Quick Tabs điều hướng nhanh.
  - Dọn dẹp các mảng dữ liệu và hàm không còn sử dụng (`SPEC_TOC_SECTIONS`, `STAR_TOC_SECTIONS`, `scrollToSection`) trong `ProjectsView.tsx`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.93.0] - 2026-10-24
### Chuyển Thẻ Tên Dự Án 1.1 Sang Dạng Banner & Xóa Hiệu Ứng Chuyển Động Thẻ
- **Chuyển Thẻ Tên Dự Án 1.1 Thành Banner Chuẩn Executive ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Tái thiết kế khối Hero Title của bài viết dự án **1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng** từ thẻ card thông thường thành một **Executive Banner** hoàn chỉnh:
    - **Nền Banner**: Sử dụng dải màu gradient đa tầng `bg-gradient-to-br from-slate-950 via-indigo-950/95 to-slate-900` kết hợp hiệu ứng phát quang môi trường (ambient cyan/purple neon glow blobs) và viền kính `border border-indigo-400/30`.
    - **Thanh Huy hiệu**: Huy hiệu mã dự án phát quang `MÃ DỰ ÁN: 1.1` dải màu `cyan-500` đến `indigo-600`, huy hiệu nhóm dự án mờ ảo và trạng thái vận hành với chấm xanh phát sáng `emerald-400`.
    - **Kiến trúc Tiêu đề**: Tiêu đề chính cỡ lớn `h1` phong cách Headline Banner (font Playfair/Play, chữ trắng sắc nét) cùng phụ đề tiếng Anh `cyan-200` thanh lịch.
    - **Khối Châm ngôn Triết lý (Tagline)**: Dải viền cyan nổi bật với nền glassmorphism trong suốt và trích dẫn nghiêng phong cách lãnh đạo cấp cao.
    - **Thông tin Vai trò & Hashtags**: Bố cục chip thông tin nằm trọn trong banner với độ tương phản cao, dễ đọc.
    - **Khung Preview Sơ đồ tư duy**: Tích hợp gọn gàng trong banner, loại bỏ các hiệu ứng phóng to/co giãn khi rê chuột (`scale-105`), giữ hình ảnh tĩnh ổn định.
- **Xóa Toàn Bộ Hiệu Ứng Chuyển Động Thẻ (Card Motion Removal)**:
  - **Gỡ bỏ cơ chế Co giãn & Chồng thẻ Động (Stacking Scale Motion)**:
    - Trong [`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css): Cấu hình lại `.u223-c` thành `position: relative`, `transform: none !important`, `transition: none !important`, ẩn hoàn toàn lớp đổ bóng chuyển động `.u223-sh`.
    - Trong [`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx):
      - Loại bỏ vòng lặp tính toán `depth` và câu lệnh `c.style.transform = scale(...)` trong `useEffect` gây hiệu ứng co giãn/chuyển động thẻ khi cuộn.
      - Chuyển toàn bộ 9 section đặc tả (Tổng quan, Bối cảnh, Mục tiêu, 7 Hạng mục, Lộ trình, KPI & SLA, Vai trò, Triết lý) và 4 section khung STAR từ thẻ dính (`data-sticky-card="true"`, `top: calc(...)`) sang dòng chảy tĩnh tự nhiên (`data-section-card="true"`).
      - Xóa các hiệu ứng co giãn hover (`group-hover:scale-105`, `group-hover:scale-102`) trên toàn bộ hình ảnh thẻ để giao diện hiển thị tĩnh, sắc nét, không bị rung giật khi cuộn trang.
      - Duy trì chức năng thanh Quick Tabs (Mục lục nhảy nhanh) hoạt động mượt mà dựa trên sự kiện cuộn tự nhiên.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.92.0] - 2026-10-24
### Chuyển Khối Tiêu Đề Nhóm Dự Án Sang Kiểu Dáng Thanh Banner Chuẩn Executive
- **Chuyển Khối `<div>` "NHÓM 1 · NHÓM CHIẾN LƯỢC & CẤU TRÚC VẬN HÀNH CSKH 1...." Thành Thanh Banner ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Tái cấu trúc khối header bài viết từ một khối thẻ phẳng thành **Thanh Banner Đỉnh Bài Viết**:
    - **Nền Banner**: Sử dụng gradient sang trọng `linear-gradient(to right, slate-900, indigo-950, slate-900)`, viền `indigo-400/30` với hiệu ứng kính mờ `backdrop-blur-2xl` và ánh sáng phát quang viền trên (ambient top highlight line `cyan-400/60`).
    - **Huy hiệu Nhóm Dự Án**: Dòng chữ *"NHÓM 1 · NHÓM CHIẾN LƯỢC & CẤU TRÚC VẬN HÀNH CSKH"* được đặt trong pill badge phát quang với chấm tròn neon `cyan-400` nhấp nháy sinh động.
    - **Tiêu đề Dự án**: Trình bày cỡ lớn, chữ trắng sắc nét theo phong cách Headline Banner.
    - **Thao tác Action**: Các nút *"Sơ Đồ Tư Duy"* và *"Đóng"* được bo tròn kính mờ đồng bộ hoàn hảo với Banner.
- **Đồng Bộ Vào Thanh Banner Đứng ([`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx))**:
  - Tại thanh HeroBanner dọc bên phải, bổ sung thông tin nhóm dự án (*"NHÓM 1 · NHÓM CHIẾN LƯỢC & CẤU TRÚC VẬN HÀNH CSKH"*) ngay phía trên chip tiêu đề bài viết để đồng bộ thông tin nhận diện.
- **Phạm Vi Áp Dụng**:
  - Chỉ áp dụng cho đối tượng khối header nhóm dự án này, không ảnh hưởng đến các thành phần khác.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.91.0] - 2026-10-24
### Tích Hợp Recipe Card-003 Vào Thẻ Dự Án (Portrait Gradient Card 300x380px)
- **Thêm Bộ Quy Tắc CSS Card-003 Bằng Plain CSS ([`src/styles/globals.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css))**:
  - Tích hợp chuẩn xác công thức từ https://designforai.dev/snippet/card-003.md:
    - Kích thước thẻ đứng: `width: 300px; height: 380px;`.
    - Bo tròn góc: `border-radius: 18px;`.
    - Lớp nền gradient: `200deg` từ `#0ea5e9` sang `#6366f1` tới `#312e81`.
    - Lớp phủ mờ (Fade Overlay): Từ dưới lên `linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 55%)`.
    - Lớp nội dung: Chứa `.card-003__body`, tiêu đề `h3`, mô tả `p`, tag `span`.
- **Áp Dụng Cho Thẻ Dự Án ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**:
  - Tại trang 21 Dự Án Trọng Điểm (`ProjectsView.tsx`), cấu hình thẻ dự án ở chế độ Lưới (Grid view) đồng bộ với kiểu dáng `card-003`:
    - Bo góc `18px`, chiều cao tiêu chuẩn chân dung `380px`.
    - Phủ lớp gradient `200deg` rực rỡ và lớp fade mờ `55%` từ dưới lên để đảm bảo độ tương phản tuyệt đối cho văn bản và huy hiệu mã dự án.
    - Duy trì khả năng chuyển đổi mượt mà giữa Grid View và List View (FLIP animation).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.90.0] - 2026-10-24
### Tích Hợp Bộ Con Trỏ Chuột Simplify Handy (Light & Dark) & Tạo Component CursorShowcase Bento Grid
- **Giải Nén & Thiết Lập Tài Nguyên Con Trỏ Chuột**:
  - Giải nén toàn bộ 17 tệp con trỏ `.cur` và `.ani` từ tệp zip `Simplify Handy Dark.zip` vào 2 thư mục tương ứng:
    - [`public/cursors/light/`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/public/cursors/light/): Chứa 17 con trỏ giao diện Sáng.
    - [`public/cursors/dark/`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/public/cursors/dark/): Chứa 17 con trỏ giao diện Tối.
- **Thiết Lập Hệ Thống CSS Toàn Cục & Biến Con Trỏ ([`src/styles/cursors.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/cursors.css))**:
  - Hỗ trợ đầy đủ 3 chế độ:
    1. **Mặc định (Light Mode)**: Trỏ đến `/cursors/light/`.
    2. **Chế độ Hệ Thống (System Preference)**: `@media (prefers-color-scheme: dark)` tự động trỏ đến `/cursors/dark/`.
    3. **Chế độ Tối Tường Minh**: Áp dụng khi có class `.dark` hoặc thuộc tính `[data-theme="dark-neon"]`.
  - Áp dụng các tệp `.cur` cho từng thành phần giao diện:
    - Toàn bộ ứng dụng (`body`, `html`): `01_normal_select.cur, auto`
    - Thao tác nhấp (`button`, `a`, `[role="button"]`, `.cursor-pointer`): `15_link_select.cur, pointer`
    - Form controls (`input`, `textarea`, `[contenteditable]`): `06_text_select.cur, text`
    - Trạng thái vô hiệu hóa (`:disabled`, `[disabled]`, `.disabled`, `.cursor-not-allowed`): `08_unavailable.cur, not-allowed`
    - Thẻ trợ giúp / Tooltip (`[data-tooltip]`, `abbr`, `.cursor-help`): `02_help_select.cur, help`
    - Mở rộng thêm: Kéo thả (`13_move.cur`, `14_alternate_select.cur`), Tọa độ (`05_precision_select.cur`), Bút vẽ (`07_handwriting.cur`), Co giãn (`09_vertical_resize.cur`, `10_horizontal_resize.cur`), Chờ bận (`04_busy.ani`, `03_working_in_background.ani`).
- **Mở Rộng Cấu Hình Tailwind CSS ([`tailwind.config.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/tailwind.config.ts))**:
  - Bổ sung cấu hình `theme.extend.cursor` ánh xạ trực tiếp các biến CSS con trỏ (`default`, `pointer`, `text`, `not-allowed`, `help`, `move`, `grab`, `crosshair`, `wait`).
- **Cung Cấp Component Mẫu Bento Grid ([`src/components/ui/CursorShowcase.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/CursorShowcase.tsx))**:
  - Giao diện Bento Grid Glassmorphism với 7 card tương tác trực tiếp:
    1. Card Link & Button Select (15_link_select)
    2. Card Form Controls & Text (06_text_select)
    3. Card Disabled & Unavailable (08_unavailable)
    4. Card Help & Tooltip (02_help_select)
    5. Card Draggable & Move Elements (13_move & 14_alternate_select)
    6. Card Precision & Handwriting (05_precision & 07_handwriting)
    7. Card Resize & Busy States (09/10 resize & 04 busy)
  - Tích hợp công tắc chuyển nhanh Light / Dark mode ngay trên header component để người dùng trực tiếp trải nghiệm sự thay đổi màu sắc con trỏ.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.89.0] - 2026-10-24
### Tối Ưu Toàn Diện Giao Diện Sáng & Tối, Dọn Dẹp Header & Chuẩn Hóa Danh Sách Chọn Giao Diện
- **Dọn Dẹp Nút Chuyển Sáng/Tối Tại Header**:
  - [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx): Xóa bỏ hoàn toàn nút bấm chuyển đổi theme sáng/tối và các props/imports không sử dụng.
  - [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx): Xóa bỏ overlay animation `.u219-global-reveal`, hàm `handleToggleThemeWithReveal`, dọn sạch mã nguồn liên quan.
  - Xóa bỏ tệp `src/components/ui/CircularRevealDarkMode.tsx` không còn sử dụng.
- **Sửa Lỗi Hiển Thị Giao Diện Tối & Sáng Trên Toàn Bộ Các Trang**:
  - **Trang Kỹ Năng ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**: Tích hợp biến trạng thái `isDark` động; bổ sung `cardDarkBg` cho 6 thẻ kỹ năng chuyên môn; sửa đổi màu chữ đảo ngược; đồng bộ nền modal hero header ở chế độ tối.
  - **Trang Kinh Nghiệm ([`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx) & [`src/components/ui/LivingBentoJobGrid.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/LivingBentoJobGrid.tsx))**: Bổ sung biến CSS Surface/Ink chuẩn dark mode cho Living Bento Grid; thêm các class `dark:` cho modal chi tiết kinh nghiệm (Profile card, badge, lĩnh vực hoạt động, hình ảnh kỷ niệm).
  - **Trang Hệ Thống ([`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx))**: Thêm class chế độ tối cho hộp trạng thái tìm kiếm trống, modal chi tiết phân hệ hệ thống (System Detail Modal) và modal Kiến trúc sư (Author Modal).
  - **Trang Kỷ Niệm ([`src/components/views/MemoriesView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/MemoriesView.tsx))**: Thêm class chế độ tối cho nút lọc công ty, popup bộ lọc đơn vị, container trạng thái trống và đường viền card hình ảnh.
  - **Trang Học Vấn & Bằng Cấp ([`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**: Bổ sung đầy đủ class chế độ tối cho thẻ nội dung chi tiết bằng cấp (header, module chuyên môn, năng lực đạt được, thực hành thực tế, giá trị ứng dụng).
  - **Trang Dự Án ([`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx))**: Đồng bộ selector `.dark .u308` song song với `[data-theme="dark-neon"] .u308` cho cả chế độ lưới và danh sách.
- **Chuẩn Hóa Danh Sách Chọn Giao Diện Theo Yêu Cầu**:
  - [`src/data/themes.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/themes.ts): Chuẩn hóa tiêu đề giao diện sang đúng 4 chữ: **"Kính sáng đa sắc"** & **"Kính tối đa sắc"**.
  - [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx): Tại menu popup chọn giao diện, chỉ hiển thị icon và tiêu đề giao diện 4 chữ kèm huy hiệu trạng thái "Đang dùng"; loại bỏ hoàn toàn phần sub tiêu đề (`theme.name`).
  - [`src/components/ui/ThemeSelectorModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/ThemeSelectorModal.tsx): Tinh gọn chỉ hiển thị icon và tiêu đề 4 chữ, loại bỏ sub tiêu đề và phần mô tả dài.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.88.0] - 2026-10-24
### Tái Cấu Trúc Thứ Tự Trang & Cập Nhật Toàn Diện Trang Kỹ Năng Chuẩn 100% Theo Thiết Kế
- **Di Chuyển Vị Trí Trang Kỹ Năng Đứng Cạnh Trang Lĩnh Vực**:
  - Cập nhật thứ tự các trang trong [`src/data/pages.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/pages.tsx):
    - Đổi vị trí trang **Kỹ Năng** sang vị trí `id: 5` (nằm ngay sau trang **Lĩnh Vực** `id: 4`).
    - Đổi vị trí trang **Kinh Nghiệm** sang `id: 6` (sau trang Kỹ Năng).
  - Cập nhật định tuyến hiển thị trang tương ứng trong [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx) (`currentPage === 5` render `<SkillsView />`, `currentPage === 6` render `<ExperienceView />`).
  - Đồng bộ liên kết điều hướng nút khám phá kỹ năng tại trang chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx)) trỏ chính xác về `onNavigatePage(5)`.

- **Cập Nhật Giao Diện Trang Kỹ Năng Khớp 100% Ảnh Thiết Kế ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  1. **Banner Toàn Cảnh (Hero Banner Artwork)**:
     - Tích hợp banner ngang chuẩn tỷ lệ đồ họa `/images/skills/hero-banner.png` (1920x500):
     - Nhân vật đại diện 3D, các biểu tượng công nghệ nổi trôi (AI, Database, Automation, Chart).
     - Tiêu đề nghệ thuật *"Làm Chủ Công Nghệ – Nâng Tầm Quản Trị"*, khẩu hiệu dẫn dắt *"Hội tụ tư duy chiến lược và năng lực làm chủ công nghệ thực chiến..."*, cùng khối trích dẫn triết lý bên phải *"Làm chủ công nghệ và rèn giũa kỹ năng quản trị."*.
  2. **Thanh Tiêu Đề Mục (Section Title Bar)**:
     - Huy hiệu icon tròn màu cyan với bánh đà công nghệ (`Wheel/Disc3`), tiêu đề song ngữ *"Kỹ Năng Chuyên Môn - Core Competencies & Skills"*, cùng bộ đếm định lượng sinh động (120+ Skill Items • SWOT Matrix • 6 Lĩnh Vực).
  3. **Thanh Lọc Tab & Ô Tìm Kiếm (Filter Bar & Search)**:
     - 6 Tab phân loại chuẩn xác: `Tất cả (6)`, `Điểm mạnh (S)`, `Hoàn thiện (W)`, `Cơ hội (O)`, `Thách thức (T)`, `Ngôn ngữ & AI`.
     - Ô tìm kiếm thời gian thực với icon kính lúp và placeholder *"Tìm lĩnh vực, dịch vụ, ..."*.
  4. **Lưới 6 Thẻ Kỹ Năng Chuyên Môn Chuẩn 100% Chi Tiết (3x2 Grid)**:
     - **Thẻ 1 (Blue)**: Nền Tảng Vận Hành & Lãnh Đạo | Icon Kim cương 💎 | Tag `➔ Năng lực lõi quản lý 24/7` | Mô tả hạ tầng dịch vụ | Hình minh họa CSKH 3D | 3 Viên thuốc điểm: `Trải nghiệm KH 98%`, `CRM Center 96%`, `Hiệu suất 96%` | Nút tròn mũi tên chuyển động.
     - **Thẻ 2 (Amber)**: Nâng Cao Năng Lực Quản Trị | Icon Biểu đồ cột 📊 | Tag `➔ Tư duy chiến lược & quản trị` | Mô tả giải quyết toàn diện 3 bên | Hình minh họa Bảng phân tích & hồng tâm phi tiêu 3D | 3 Viên thuốc điểm: `Tư duy dịch vụ 92%`, `Đàm phán 90%`, `Dự án 88%`.
     - **Thẻ 3 (Rose)**: Thích Ứng & Quản Trị Biến Động | Icon Khiên bảo vệ 🛡️ | Tag `➔ Quản trị rủi ro & tối ưu` | Mô tả yêu cầu bảo hiểm, pháp lý hợp đồng | Hình minh họa Khiên bảo mật 3D | 3 Viên thuốc điểm: `Tối ưu chi phí 94%`, `Thay đổi CSKH 92%`, `Khủng hoảng 94%`.
     - **Thẻ 4 (Purple)**: Công Nghệ & Chuyển Đổi Dịch Vụ | Icon Tên lửa 🚀 | Tag `➔ Tự động hóa & Kaizen` | Mô tả tựa game, giải đấu eSports | Hình minh họa Tên lửa cất cánh 3D | 3 Viên thuốc điểm: `AI & Tự động hóa 94%`, `Kaizen 94%`, `SOP 95%`.
     - **Thẻ 5 (Pink)**: Hệ Thống Trí Tuệ Nhân Tạo AI | Icon Robot thông minh 🤖 | Tag `➔ Ứng dụng GenAI thông minh` | Mô tả phương thức thanh toán an toàn | Hình minh họa Robot AI 3D | 3 Viên thuốc điểm: `GenAI 94%`, `BI Data 92%`, `Omnichannel 95%`.
     - **Thẻ 6 (Emerald)**: Ngôn Ngữ & Giao Tiếp Quốc Tế | Icon Địa cầu 🌐 | Tag `➔ Kết nối & đàm phán đa phương` | Mô tả Value Center & số hóa | Hình minh họa Quả địa cầu đeo tai nghe 3D | 3 Viên thuốc điểm: `Tiếng Việt 90%`, `Tiếng Anh 60%`, `Đàm phán 90%`.
  5. **Modal Chi Tiết Tương Tác Chuyên Nghiệp**:
     - Khi bấm vào bất kỳ thẻ kỹ năng nào, mở modal hiển thị đầy đủ danh sách kỹ năng thành phần, thang điểm phần trăm, vạch tiến trình (progress bar) và diễn giải chi tiết.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server Next.js phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.87.0] - 2026-10-24
### Xóa Khối Nút "☀️ Sáng 🌙 Tối" Tại Chi Tiết Bài Viết 21 Dự Án & Xóa Hoàn Toàn Hiệu Ứng Chọn Trang Trên Menu Icon Header
- **Xóa Khối Nút "☀️ Sáng 🌙 Tối" Tại Chi Tiết Bài Viết ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Tại trang Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm (`ProjectsView.tsx`), khi mở chi tiết bài viết dự án (`ProjectDetailView.tsx`):
  - Xóa bỏ hoàn toàn khối `<div>` chứa 2 nút chọn giao diện cục bộ `"☀️ Sáng 🌙 Tối"` trên thanh công cụ sticky header.
  - Thẻ chi tiết tự động đồng bộ thống nhất theo giao diện toàn cục (`currentTheme`), giữ cho thanh tiêu đề tinh gọn và trang nhã, chỉ còn nút *"Sơ Đồ Tư Duy"* và nút *"Đóng"*.
- **Xóa Hoàn Toàn Hiệu Ứng Chọn Trang Trên Menu Icon Header ([`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx))**:
  - Loại bỏ toàn bộ các hiệu ứng biến đổi trạng thái chọn trang (`isActive`) trên thanh điều hướng NeoNav:
    1. Không thay đổi màu nền (`itemBg`) hoặc phủ lớp gradient sáng khi chọn trang.
    2. Không thay đổi màu viền (`itemBorder`) sang viền nổi hay neon cyan/purple.
    3. Không kích hoạt bóng phát quang (`itemBoxShadow` giữ nguyên trạng thái phẳng/hover tự nhiên).
    4. Không thay đổi màu chữ (`itemColor`) và không đổi nền/viền/màu của hộp icon tròn (`iconBg`, `iconColor`, `iconBorder`).
    5. Loại bỏ class `active is-active shadow-xs`, giúp tất cả các menu icon duy trì diện mạo hài hòa, đồng bộ và tinh tế ở mọi trang mà không bị phân biệt hay nổi bật một cách mất cân đối.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.86.0] - 2026-10-24
### Trang Chủ: Gom Các Thẻ Thành Slide Trình Chiếu Carousel Hiện Đại & Mượt Mà (AnimatePresence Motion Transitions)
- **Tái Cấu Trúc Khối Nội Dung Trang Chủ Thành Slide Trình Chiếu ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - Chuyển đổi hoàn toàn cơ chế thẻ xếp chồng 3D cũ (vốn có nhược điểm về độ cao và hiển thị đè lớp) thành **Hệ thống Slide Carousel trình chiếu hiện đại**:
    1. **Mở Rộng Không Gian Hiển Thị Hợp Lý (`max-w-2xl mx-auto`)**:
       - Tăng chiều rộng khung slide giúp các khối nội dung, số liệu thống kê (CSAT 98%, 22+ năm, 100+ nhân sự, AI Workflows) và các hàng thông tin dàn trải tự nhiên, thoáng đãng và dễ đọc hơn rất nhiều trên cả thiết bị di động lẫn máy tính bàn.
    2. **Điều Hướng Slide Đa Tầng Tiện Lợi**:
       - **Thanh Segmented Tabs Phía Trên**: 3 tab chọn nhanh (`01 Giới thiệu`, `02 Năng Lực Cốt Lõi`, `03 Dấu Ấn Thành Tựu`) với hiệu ứng highlight màu gradient chủ đề riêng biệt cho từng thẻ.
       - **Bộ Đếm Trạng Thái & Nút Lật Nhanh**: Huy hiệu hiển thị `Slide (X/3)` kèm cặp nút mũi tên tròn điều hướng lùi/tiến.
       - **Hai Nút Mũi Tên Trôi Nổi (Floating Nav Buttons)**: Hai nút chuyển slide tròn lớn nổi bật ở hai bên cạnh trái (`ChevronLeft`) và cạnh phải (`ChevronRight`) của khung slide trên màn hình tablet/desktop với hiệu ứng hover `scale-110` và phát quang.
       - **Chấm Phân Trang Tương Tác (Interactive Pagination Dots)**: Nằm ở góc dưới bên phải mỗi slide, chuyển đổi trạng thái viên thuốc dài cho slide đang hoạt động và cho phép nhảy trực tiếp đến bất kỳ slide nào.
    3. **Hiệu Ứng Chuyển Cảnh Trượt Mượt Mà (`AnimatePresence` + `motion.div`)**:
       - Nhận diện hướng chuyển động lướt slide (`slideDirection: 1` hoặc `-1`) để trượt ngang tự nhiên (`x: 36px` -> `0` -> `-36px`), kết hợp hiệu ứng làm mờ dần nhẹ nhàng (`opacity: 0` -> `1` -> `0`) mang lại trải nghiệm tương tác liền mạch, chuyên nghiệp.
    4. **Bảo Tồn Toàn Bộ Dữ Liệu & Liên Kết Điều Hướng**:
       - **Slide 1**: Hồ sơ tổng quan, kinh nghiệm 22+ năm, 100+ nhân sự, CX Chuyên gia cấp cao, nút *"Xem chi tiết hồ sơ"*.
       - **Slide 2**: Customer Centricity & Tech, CSAT 98%, Contact Center 24/7 SLA/KPI, AI Workflows & Automation, nút *"Khám phá kỹ năng chuyên môn"*.
       - **Slide 3**: Hành trình 2002–2026+, Lãnh đạo 100+ nhân sự, Dashboard Power BI C-Level, Giảm 25% Cost-to-Serve, nút *"Xem dự án tiêu biểu"*.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì trạng thái **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.85.0] - 2026-10-24
### Trang Chủ: Tái Thiết Kế Nút "Phát Giới Thiệu" Đồng Bộ Chuẩn Giao Diện Laser Beam Capsule Nút "Phát Phỏng Vấn"
- **Đồng bộ Định dạng Nút Giới Thiệu tại Trang Chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - Chuyển đổi 2 nút bấm rời rạc cũ (nút Bật/Tắt âm thanh và nút Phát Giới Thiệu) thành **Laser Beam Capsule Button** tích hợp cao cấp giống 100% giao diện nút tại trang Phỏng Vấn (`InterviewView.tsx`).
  - **Cấu trúc & Hiệu ứng Chuyển động Đỉnh cao**:
    1. **Viền Laser Conic Xoay Tròn 360 độ**: Khung viền viên thuốc (capsule) với lớp hiệu ứng quét tia laser phát quang đa sắc không ngừng chuyển động `bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)]` cùng bóng đổ neon tím xanh `shadow-[0_0_20px_rgba(78,86,246,0.5)]`.
    2. **Nút Loa Âm Thanh (Bật / Tắt Tiếng)**: Tích hợp hình tròn tròn sắc nét bên trái với màu xanh `#4E56F6` khi đang bật và màu đỏ cảnh báo `#E60026` khi tắt tiếng, kèm bóng phát quang sinh động.
    3. **Vạch Phân Cách Kính Mờ (Divider)**: Dải vạch sáng tinh tế bo tròn `w-[1.5px] h-4 sm:h-5 bg-white/40`.
    4. **Nút Thao Tác Video (Phát Giới Thiệu 23s / Dừng phát)**: Nằm bên phải với chữ in hoa nổi bật, hỗ trợ chuyển đổi trạng thái giữa icon Play và icon Pause/Stop, hoạt động nhịp nhàng khi kích hoạt hoặc dừng video giới thiệu chuyên gia.
  - Tối ưu hóa tương thích hoàn hảo trên cả 2 giao diện Sáng Kính Mờ (`light-glass`) và Tối Neon Đa Sắc (`dark-neon`).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.84.0] - 2026-10-24
### Chuẩn Hóa Banner Ngang Tỉ Lệ 16 : 2 & Nâng Cấp Trang Kỹ Năng: Thu Gọn Thẻ Chuẩn Thẻ Lĩnh Vực Kèm Hiệu Ứng Mở Rộng Mượt Mà (Shared Layout Expansion)
- **Chuẩn hóa Tỉ lệ Banner Ngang 16 : 2 ([`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css) & [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx))**:
  - Khắc phục triệt để tình trạng Banner ngang bị kéo giãn theo tỉ lệ cũ `16 / 2.5` và thuộc tính `min-height: 120px` / `md:min-h-[110px]`.
  - Cập nhật quy tắc CSS cốt lõi `.hero-banner:not(.hero-banner-vertical):not(.hero-banner-compact)` và `.hero-banner[data-banner-aspect="16:2"]` sang `aspect-ratio: 16 / 2 !important;` (tỉ lệ điện ảnh 8:1 siêu thanh thoát).
  - Tinh chỉnh khoảng cách đệm `py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5`, kích thước font tiêu đề `text-[22px] - [24px]` và font trích dẫn thư pháp `font-banner-quote`, giúp nội dung hiển thị vừa vặn, không bị tràn viền hay che khuất trên mọi độ phân giải.
- **Tái Thiết Kế Trang Kỹ Năng (`SkillsView.tsx`): Thu Gọn Thẻ Tương Đồng Thẻ Lĩnh Vực ([`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx))**:
  - Thay thế các khối danh sách mở dài truyền thống bằng **Lưới thẻ Pastel Glass thu gọn (Compact Cards Grid)**:
    1. **Icon và Tiêu Đề Nằm Cùng Một Hàng**:
       - Icon vector trực tiếp (`getCategoryBadgeIcon`) và Tiêu đề nhóm năng lực (`cat.titleVi`) cùng nằm ngang `w-full flex items-center gap-2.5 flex-nowrap`.
       - Kích thước Tiêu đề bằng chính xác kích thước Icon (`20px` Mobile, `22px` Tablet, `24px` Desktop, `leading-none flex items-center`).
    2. **Khối Nội Dung Trung Tâm Cân Đối 7/5**:
       - Cột trái (7 cols): Huy hiệu điểm số trung bình kèm mũi tên chuyển động (`TB: 95.7% • 6 Kỹ năng`), đoạn mô tả ngắn gọn định hướng phát triển, và chip preview các kỹ năng tiêu biểu.
       - Cột phải (5 cols): Hình minh họa 3D sắc nét với hiệu ứng phóng to `scale-110` khi rê chuột (hover).
    3. **Chân Thẻ & Nút Thao Tác Tròn**:
       - Hiển thị mã danh mục chuẩn hóa (`Mã 7.1`, `7.2`, `7.3`, `7.4`, `7.5`).
       - Nút hành động mũi tên tròn `>` với hiệu ứng bóng phát quang và chuyển động pop-up mời gọi tương tác xem chi tiết.
    4. **Hiệu Ứng Thẻ Mở Rộng Từ Từ Chiếm Toàn Bộ Không Gian (Smooth Shared Layout Expansion)**:
       - Tích hợp `motion.div` với `layoutId={`skill-card-${cat.id}`}` và đường cong chuyển động cao cấp `duration: 0.52s, ease: [0.22, 1, 0.36, 1]`.
       - Khi người dùng click vào bất kỳ thẻ kỹ năng nào (Thế mạnh, Hoàn thiện, Cơ hội, Thách thức, Ngoại ngữ), thẻ đó sẽ mượt mà phóng to từ vị trí ban đầu và mở rộng chiếm trọn toàn bộ khung nội dung.
       - Chế độ xem chi tiết sâu (Detail View) cung cấp thanh điều hướng Breadcrumb, tiêu đề lớn, thống kê phần trăm, danh sách thanh đo tiến độ có phát quang (Progress Bars) kèm mô tả chi tiết của từng kỹ năng.
       - Hỗ trợ nút *"Quay lại lưới ma trận kỹ năng"* để thu nhỏ mượt mà trở lại vị trí ban đầu trong lưới.
    5. **Đồng Bộ Bộ Lọc Với Banner Dọc**:
       - Người dùng có thể lọc nhanh theo từng nhóm (S, W, O, T, Ngoại ngữ) hoặc xem tất cả ngay từ Banner bên phải hoặc trực tiếp trên lưới thẻ.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.83.0] - 2026-10-24
### Chi Tiết Bài Viết 1.1: Tích Hợp Thẻ Mục Lục Trực Tiếp Vào Banner Dọc Bên Cạnh (Side Banner Table of Contents)
- **Tích hợp Thẻ Mục Lục Tương Tác vào Cột Banner Dọc ([`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx))**:
  - Khi xem chi tiết bất kỳ bài viết/dự án nào (đặc biệt là bài viết 1.1 `p1_1` · *Xây dựng và vận hành Phòng Dịch vụ Khách hàng*), Banner dọc bên phải (`HeroBanner`) tự động biến đổi thành **Thẻ Mục Lục Bài Viết (Table of Contents Card)** cao cấp.
  - Cấu trúc Thẻ Mục Lục trên Banner:
    1. **Header Tiêu Điểm**: Biểu tượng `list`, tiêu đề *"MỤC LỤC BÀI VIẾT"*, huy hiệu mã bài viết `1.1` và nhãn danh mục/tiêu đề rút gọn của dự án.
    2. **Danh sách các mục điều hướng (SPEC Project 1.1)**:
       - `00. Sơ đồ tư duy` (`sec-mindmap`)
       - `01. Tổng quan dự án` (`sec-overview`)
       - `02. Bối cảnh & Thách thức` (`sec-context`)
       - `03. Mục tiêu chiến lược` (`sec-objectives`)
       - `04. 7 Hạng mục công việc` (`sec-scope`)
       - `05. Lộ trình 5 bước` (`sec-methodology`)
       - `06. KPI & SLA vận hành` (`sec-metrics`)
       - `07. Vai trò & Giá trị` (`sec-outcomes`)
       - `08. Triết lý quản trị` (`sec-philosophy`)
    3. **Danh sách các mục chuẩn hóa cho dự án STAR**:
       - `1. Bối cảnh & Thách thức` (`sec-star-situation`)
       - `2. Phương pháp tiếp cận` (`sec-star-approach`)
       - `3. Hành động triển khai` (`sec-star-actions`)
       - `4. Kết quả định lượng` (`sec-star-results`)
    4. **Tương tác hai chiều & Cuộn trang thời gian thực (Real-time Scroll Spy & Sync)**:
       - Bấm vào bất kỳ mục nào trên Thẻ Mục Lục ở Banner sẽ cuộn mượt mà (`smooth scrollIntoView`) bài viết chi tiết đến đúng tiêu đề tương ứng.
       - Khi người dùng cuộn nội dung bài viết, mục tương ứng trên Thẻ Mục Lục tại Banner sẽ tự động phát hiện vị trí hiện tại, kích hoạt hiệu ứng Gradient Pill và chấm xung nhịp (pulsing dot) đồng bộ tức thì.
    5. **Tiện ích Footer tại Banner**:
       - Nút *"Quay lại"* hỗ trợ đóng nhanh bài viết để trở về lưới 21 dự án.
       - Nút *"Sơ đồ"* mở Modal Mindmap toàn màn hình trực quan.
- **Nâng cấp và Đồng bộ Giao diện Chi tiết ([`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx))**:
  - Bổ sung `activeSection` và `onSectionChange` vào `ProjectDetailViewProps`.
  - Cập nhật cơ chế theo dõi vị trí thẻ (`canvas-card`) bằng `window.scrollY` và thông báo ngược về Banner bên ngoài khi cuộn qua từng phần.
  - Gán ID cuộn chuẩn hóa (`sec-star-situation`, `sec-star-approach`, `sec-star-actions`, `sec-star-results`) kèm lớp `scroll-mt-24` cho các dự án STAR.
- **Tương thích Giao diện Sáng / Tối**:
  - Giao diện Kính sáng (`light-glass`): Nền kính acrylic trong trẻo, đổ bóng mịn, thẻ mục lục tương phản sắc nét với gradient xanh/tím thanh lịch.
  - Giao diện Kính tối Neon (`dark-neon`): Viền phát quang đa sắc huyền ảo, text dạ quang nổi bật, hiệu ứng glow định vị mục đang đọc chuẩn xác.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.82.0] - 2026-10-24
### Tinh Gọn Hệ Thống Giao Diện: Xóa Bỏ 3 Theme (Kính Sáng Dashboard, Phẳng Sáng Đa Sắc, Tối Giản Đa Sắc) & Làm Sạch Toàn Diện Mã Nguồn
- **Xóa bỏ triệt để 3 giao diện khỏi hệ thống**:
  1. `light-glass-dashboard` (Kính sáng Dashboard)
  2. `flat-rainbow` (Phẳng sáng đa sắc)
  3. `soft-minimal` (Tối giản đa sắc)
- **Chuẩn hóa hệ thống chỉ còn 2 Theme cốt lõi cao cấp**:
  - `light-glass`: Giao diện Kính sáng Đa sắc (Light Mode chuẩn mực, hiện đại, kính mờ đa sắc sang trọng).
  - `dark-neon`: Giao diện Kính tối Neon Đa sắc (Dark Mode cyberpunk cao cấp, tương phản sâu, phát quang sinh động).
- **Các tệp nguồn đã được làm sạch và tái cấu trúc**:
  - [`src/types/index.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/types/index.ts): Rút gọn kiểu `SiteTheme` thành `export type SiteTheme = 'light-glass' | 'dark-neon';`.
  - [`src/data/themes.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/themes.ts): Cập nhật danh sách `THEME_LIST` chỉ còn 2 theme tương ứng.
  - [`src/components/ui/ThemeSelectorModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/ThemeSelectorModal.tsx): Xóa bỏ các card preview và lựa chọn của 3 giao diện cũ trong bảng chọn giao diện.
  - [`src/components/layout/Clock.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Clock.tsx): Tinh giản bảng phong cách đồng hồ, loại bỏ cấu hình riêng cho 3 theme cũ.
  - [`src/components/layout/WeatherWidget.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/WeatherWidget.tsx): Chuyển đổi switch-case phức tạp sang biểu thức nhị phân tinh gọn `isDark ? darkStyles : lightStyles`.
  - [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx): Tinh gọn kiểm tra giao diện, nút bấm và badge theo `isDark`.
  - [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx): Đơn giản hóa hiển thị theme active và biểu tượng mặt trăng / mặt trời.
  - [`src/components/layout/BackgroundLayer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/BackgroundLayer.tsx): Loại bỏ các hiệu ứng pháo sáng pastel không dùng đến.
  - [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx): Khởi tạo giao diện an toàn giữa `'light-glass'` và `'dark-neon'`, dọn dẹp các đường viền chuyển cảnh.
  - [`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx): Xóa hoàn toàn các biến `isDashboard`, `isFlat`, `isSoftMinimal` cùng toàn bộ chuỗi toán tử ba ngôi lồng nhau ở Hero, Quote Card, Video Intro Controller và 3 Thẻ Xếp Chồng (Giới thiệu, Năng lực cốt lõi, Dấu ấn thành tựu), giúp giảm hơn 150 dòng code dư thừa và tăng hiệu năng render.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn thành với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.81.0] - 2026-10-24
### Trang Lĩnh Vực Hoạt Động: Icon Cùng Hàng Tiêu Đề, Kích Thước Bằng Nhau & Hiệu Ứng Mở Rộng Thẻ Chiếm Trọn Không Gian (Smooth Shared Expansion)
- **Nâng cấp kiểu dáng và tương tác Thẻ Lĩnh Vực Hoạt Động ([`src/components/views/DomainsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/DomainsView.tsx))**:
  - **Icon và Tiêu Đề nằm trên cùng một hàng**:
    - Đưa Icon biểu tượng đặc thù (`getDomainBadgeIcon`) và Tiêu đề dịch vụ (`domain.titleVi`) lên hàng đầu tiên toàn chiều rộng thẻ (`w-full flex items-center gap-2.5 flex-nowrap`).
    - Khắc phục triệt để tình trạng tiêu đề bị bó hẹp trong cột 6/12 dẫn đến xuống dòng gãy khúc, đảm bảo trên mọi kích thước màn hình icon và tiêu đề luôn nằm ngang thẳng hàng thanh thoát.
  - **Kích thước Tiêu đề bằng chính xác kích thước Icon**:
    - Chuẩn hóa kích thước khung Icon SVG và cỡ chữ Tiêu đề về cùng một tỷ lệ chuẩn: `20px` (trên Mobile), `22px` (trên Tablet) và `24px` (trên Desktop).
    - Áp dụng `leading-none flex items-center`, giúp chiều cao quang học của biểu tượng vector và chữ cái hoàn toàn cân đối 1:1.
  - **Hiệu ứng Thẻ tăng kích thước từ từ chiếm hết không gian các thẻ còn lại (Smooth Card Expansion)**:
    - Tích hợp `motion.div` với cơ chế `layoutId={`domain-card-${domain.id}`}` và đường cong chuyển động vật lý cao cấp `duration: 0.52s, ease: [0.22, 1, 0.36, 1]`.
    - Khi người dùng click vào bất kỳ thẻ nào trong lưới 6 thẻ, thẻ đó sẽ mượt mà phóng to và mở rộng từ tọa độ thực tế của nó cho đến khi chiếm trọn toàn bộ diện tích của 5 thẻ còn lại.
    - Nội dung chi tiết chuyên sâu của lĩnh vực xuất hiện dần mượt mà ngay khi thẻ mở rộng hoàn tất.
    - Khi bấm nút *"Quay lại danh sách"*, thẻ chi tiết mượt mà thu nhỏ trở lại vị trí ô lưới ban đầu mà không bị giật lag.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì phản hồi **HTTP 200 OK** ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.80.0] - 2026-10-24
### Thư Ngỏ: Xóa Bỏ Dòng Phụ Đề "Tầm nhìn & Định hướng phát triển bền vững" tại Khối Thông Điệp Hợp Tác
- **Xóa bỏ phụ đề tại Trang Thư Ngỏ ([`src/components/views/LetterView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx))**:
  - Tại khối thẻ Thông điệp hợp tác (`#card-main-letter-content`), đã loại bỏ thuộc tính phụ đề `subtitle="Tầm nhìn & Định hướng phát triển bền vững"` khỏi `<AnimatedCardTitle />`.
  - Thẻ tiêu đề chỉ còn hiển thị biểu tượng quyển sách và tiêu đề chính `Thông điệp hợp tác`, tạo cảm giác tinh gọn, thoáng đãng và dẫn dắt người xem thẳng vào lời chào mở đầu trang trọng `"Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự."`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì phản hồi **HTTP 200 OK** ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.79.0] - 2026-10-24
### Trang Chủ: Nâng Cấp Kiểu Dáng Thanh Điều Hướng 3 Thẻ Xếp Chồng (01 Giới thiệu, 02 Năng Lực Cốt Lõi, 03 Dấu Ấn Thành Tựu) Cho Cả Giao Diện Sáng & Tối
- **Nâng cấp kiểu dáng khối thanh điều hướng Segmented Controller & Chỉ báo Thẻ Xếp Chồng ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - **Khắc phục lỗi mờ nhạt / chìm nền trên Giao diện Sáng (`Light Glass`, `Dashboard Glass`, `Flat`, `Soft Minimal`)**:
    - Thay thế viền `border-white/95` và nền `bg-white/80` (dễ bị chìm trên nền video động) bằng khối kính cường lực `bg-white/90 border-slate-200/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl`.
    - Thêm thanh cuộn ngang mượt mà tự động ẩn (`max-w-full overflow-x-auto no-scrollbar`) và các nút không bị co rúm (`shrink-0`), giúp hiển thị hoàn hảo trên các màn hình di động nhỏ (< 400px).
    - Các nút tab không hoạt động (inactive tabs): Nâng cấp từ `text-slate-600` sang `text-slate-700 hover:text-slate-950 font-bold hover:bg-white/80`, kết hợp các huy hiệu số `01`, `02`, `03` dạng pill `bg-slate-200/80 text-slate-800 font-mono font-black text-[10px]`.
    - Tab hoạt động (active tabs):
      - Tab 01 (Giới thiệu): Gradient xanh dương `from-blue-600 to-sky-600 text-white font-bold shadow-md shadow-blue-500/25`.
      - Tab 02 (Năng Lực Cốt Lõi): Gradient tím hồng `from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-500/25`.
      - Tab 03 (Dấu Ấn Thành Tựu): Gradient hổ phách `from-amber-500 to-orange-500 text-white font-bold shadow-md shadow-amber-500/25`.
  - **Tối ưu hóa Giao diện Tối (`Dark Neon`)**:
    - Nền đen không gian kính mờ `bg-[#0B1020]/90 border border-cyan-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.45)]`.
    - Nút tab inactive: Chữ xanh cyan dạ quang rõ nét `text-cyan-200/90 hover:text-white hover:bg-white/10` cùng số thẻ có viền neon tinh tế.
    - Tab active phát sáng neon rực rỡ với bóng dạ quang 3D (`shadow-[0_0_14px_rgba(...)]`).
  - **Nâng cấp Cụm Chỉ Báo Bước & Điều Khiển Chu Kỳ (Cycle Controls)**:
    - Huy hiệu `Thẻ xếp chồng (X/3)` được bọc trong pill kính mờ bo tròn sang trọng `bg-white/90 border-slate-200/90 text-slate-800` (ở Light mode) và `bg-[#0B1020]/80 border-cyan-400/30 text-cyan-200` (ở Dark mode).
    - Hai nút Chevron điều hướng `Trước` / `Sau`: Tăng độ tương phản chữ và viền, phản hồi click mượt mà `active:scale-95`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì phản hồi **HTTP 200 OK** ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.78.0] - 2026-10-24
### Trang Chủ: Tối Ưu Hóa Kiểu Dáng Cụm Giới Thiệu Chuyên Gia "Customer Service & CX Leader..." Cho Cả Giao Diện Sáng & Tối
- **Nâng cấp kiểu dáng khối giới thiệu tiêu đề chính tại Trang Chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - **Bọc khối trong thẻ kính phân tầng (Glass Panel) cân đối tuyệt đối với khối trích dẫn**:
    - Khối `Customer Service & CX Leader Xin chào! Tôi là Nguyễn Hùng Thái...` được đưa vào thẻ kính cường lực `backdrop-blur-md` bo góc tròn `rounded-2xl`, đồng bộ phong cách với khối Quote ở phía đối diện.
    - **Giao diện Sáng (`Light Glass`, `Dashboard Glass`, `Flat`, `Soft Minimal`)**:
      - Nền kính mờ `bg-white/85 backdrop-blur-md` kết hợp viền sáng `border-white/90` hoặc `border-sky-200/80` và bóng đổ đa tầng.
      - Huy hiệu chức danh `Customer Service & CX Leader`: Chấm xanh chuyển động nhẹ, nền xanh pastel `bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-200/90 text-indigo-800`.
      - Tiêu đề chính `Xin chào! Tôi là`: Chữ đậm nét `text-[#1E1B4B]` / `text-[#0F2A59]`.
      - Tên chuyên gia `Nguyễn Hùng Thái`: Hiệu ứng chuyển sắc đa tầng `bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent`.
      - Đoạn văn mô tả (Bio): Chữ `text-slate-800` sắc nét, dễ đọc trên mọi phân cảnh sáng tối của video nền.
    - **Giao diện Tối (`Dark Neon`)**:
      - Nền kính tối sâu lắng `bg-slate-950/70 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.2)]`.
      - Huy hiệu phát sáng neon `bg-cyan-950/80 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]`.
      - Tiêu đề chữ trắng `text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]` cùng tên chuyên gia gradient neon rực rỡ `text-[#22D3EE] drop-shadow-[0_0_14px_rgba(34,211,238,0.55)]`.
      - Đoạn văn mô tả: Chữ `text-slate-200 drop-shadow-2xs` nổi bật rõ nét.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì phản hồi **HTTP 200 OK** ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.77.0] - 2026-10-24
### Trang Chủ: Tối Ưu Hóa Kiểu Dáng Khối Trích Dẫn "Khách hàng là trung tâm..." Cho Cả Giao Diện Sáng & Tối & Khắc Phục Lỗi Cache Dev Server
- **Nâng cấp kiểu dáng khối trích dẫn tại Trang Chủ ([`src/components/views/HomeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HomeView.tsx))**:
  - **Khắc phục lỗi tương phản nền video trên cả Giao diện Sáng & Tối**:
    - Bọc khối câu nói trích dẫn trong thẻ kính phân tầng (`glass panel`) sang trọng với `backdrop-blur-md`, viền mềm mại và bóng đổ nổi bật.
    - **Giao diện Sáng (`Light Glass`, `Dashboard Glass`, `Flat`, `Soft Minimal`)**: Áp dụng nền kính trắng mờ `bg-white/85 backdrop-blur-md` kết hợp viền sáng `border-white/90` hoặc `border-sky-200/80`, chữ trích dẫn đậm nét `text-[#1E1B4B]` / `text-[#0F2A59]`, giúp câu nói nổi bật sắc nét trên mọi phân cảnh chuyển động của video nền.
    - **Giao diện Tối (`Dark Neon`)**: Áp dụng nền kính tối huyền bí `bg-slate-950/70 border border-cyan-400/40`, chữ trích dẫn phát sáng neon xanh ngọc `text-[#22D3EE] drop-shadow-[0_0_12px_rgba(34,211,238,0.55)]` kết hợp tên tác giả màu tím lavender `text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]` và dải gradient cyan-purple dạ quang.
  - **Bổ sung icon trang trí & tối ưu hiển thị Mobile**:
    - Tích hợp biểu tượng dấu ngoặc kép xoay ngược (`Quote`) trang nhã.
    - Chuyển từ ẩn trên điện thoại (`hidden sm:block`) thành hiển thị linh hoạt trên mọi kích thước màn hình (`block`), căn chỉnh tự động trên thiết bị di động.
- **Khắc phục triệt để lỗi biên dịch website (Routes-manifest ENOENT)**:
  - Dọn sạch thư mục `.next`, khởi động lại quy trình Next.js dev server trên cổng 3001.
  - Kiểm tra kết nối HTTP qua fetch: Phản hồi **HTTP 200 OK** tức thì trong 875ms.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì hoạt động ổn định và mượt mà.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.76.0] - 2026-10-24
### Tích Hợp Carousel Thẻ Học Vấn: Drag-and-snap Card Carousel (Lucian UX/UI Prompt #339) & Kiểm Tra Toàn Bộ Website
- **Tạo mới component chuyên biệt** tại [`src/components/ui/DragAndSnapCardCarousel.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/DragAndSnapCardCarousel.tsx):
  - Chuẩn hóa theo thiết kế Lucian UX/UI Prompt #339 (MIT License).
  - **Cơ chế kéo thả quán tính & tự động hít vào thẻ gần nhất (Drag-and-snap & Inertia Glide)**:
    - Kéo chuột / cảm ứng sang ngang: Khối thẻ bám sát cử chỉ tay (`pointerdown`, `pointermove`, `setPointerCapture`), có lực cản đàn hồi khi kéo quá 2 đầu biên (`resistance`).
    - Thả tay: Hàng thẻ trượt quán tính (`glide`) theo gia tốc vung tay (`velocity flung`), áp dụng đường cong chuyển động `cubic-bezier(0.2, 0.8, 0.2, 1)` và tự động hít (`snap`) vào thẻ gần nhất.
    - Cụm nút điều hướng mũi tên góc trên bên phải (`.u339-pv`, `.u339-nx`): Di chuyển từng thẻ một cách mượt mà, tự động làm mờ khi chạm đầu hoặc cuối danh sách.
    - Thanh tiến trình thông minh (`.u339-pg`): Đồng bộ vị trí trượt theo thời gian thực và tự lấp đầy tương ứng.
    - Hỗ trợ đầy đủ phím mũi tên `ArrowLeft` / `ArrowRight` / `Home` / `End` và `@media (prefers-reduced-motion: reduce)`.
- **Tích hợp vào Trang Học Vấn & Chứng Chỉ ([`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx))**:
  - Thay thế khối `.edu-deck-row` cũ bằng `DragAndSnapCardCarousel`.
  - Tích hợp trọn vẹn dữ liệu 14 khóa học thực tế: hiển thị năm, mã khóa học, banner chứng chỉ, nhãn tổ chức đào tạo, tóm tắt, chips năng lực, nút "Xem chi tiết bằng cấp", lightbox phóng to chứng chỉ và chi tiết bằng cấp mở rộng.
- **Kiểm Tra & Khắc Phục Lỗi Toàn Bộ Website**:
  - Sửa lỗi comment TypeScript trong component carousel mới.
  - Khởi động lại Next.js server trên cổng 3001, dọn sạch bộ nhớ webpack cache.
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK** mượt mà trên tất cả 14 phân hệ.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.75.0] - 2026-10-24
### Trang Phỏng Vấn: Gộp Toàn Diện Kích Thước Video & Banner Phỏng Vấn Thành Một Khối Banner Video Hợp Nhất
- **Tái cấu trúc bố cục Trang Phỏng Vấn ([`src/components/views/InterviewView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx))**:
  - **Hợp nhất (Merge) khối Video phỏng vấn và khối Banner**:
    - Thay thế bố cục 3 cột bị chật chội trước đây (`[Vùng Video độc lập] [HeroBanner 260px] [Thẻ chi tiết]`) thành bố cục 2 cột chuẩn hệ thống:
      - **Cột bên trái (`flex-1 min-w-0 h-full`)**: Banner Phỏng Vấn Hợp Nhất Video mang toàn bộ kích thước gộp của cả Video và Banner.
      - **Cột bên phải (`w-full lg:w-[350px] xl:w-[380px] shrink-0 h-full`)**: Thẻ chi tiết câu trả lời Q&A.
  - **Tích hợp toàn diện các thành phần Banner trực tiếp trên nền Video HD**:
    - **Header**: Tiêu đề "Phỏng vấn thực chiến" với Animated Chat Icon màu hồng `#ec4899`, huy hiệu "Đối thoại", status capsule đếm timecode ("Đang phát câu 0X" / "Sẵn sàng phỏng vấn" · "00:00 - 00:28") và chip hồ sơ ứng viên (Avatar GIF Nguyễn Hùng Thái).
    - **Khối trích dẫn (Quote)**: Màu hổ phách vàng amber sang trọng: *“Đối thoại chân thực khẳng định bản lĩnh và năng lực quản trị.”* — Nguyễn Hùng Thái.
    - **Controls dưới đáy**: Dropdown menu lọc theo 14 câu hỏi/danh mục kết hợp cùng cụm nút xoay phát sáng Laser Beam (Bật/Tắt âm thanh + Phát/Dừng video phỏng vấn).
  - Loại bỏ hoàn toàn tình trạng hai video chạy đè lên nhau và loại bỏ animation ẩn banner (`w-0`) bất tiện khi phát video.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì hoạt động mượt mà.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.74.0] - 2026-10-24
### Trang Kỹ Năng: Thay Thế Ký Tự SWOT & Badge Ngoại Ngữ Bằng Ảnh Đồ Họa Trực Quan & Khảo Sát Gemini Live API
- **Thay thế ký tự SWOT bằng hình ảnh đồ họa tương ứng** tại [`src/components/views/SkillsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx):
  - **S - Thế mạnh vận hành**: Thay thế huy hiệu ký tự `S` trên thẻ chính và nút lọc bằng hình ảnh đồ họa `https://i.ibb.co/F4GKNJrL/Th-m-nh-v-n-h-nh.png`.
  - **W - Hoàn thiện quản trị**: Thay thế huy hiệu ký tự `W` trên thẻ chính và nút lọc bằng hình ảnh đồ họa `https://i.ibb.co/GQLW1Hqh/Ho-n-thi-n-qu-n-tr.png`.
  - **O - Cơ hội bứt phá**: Thay thế huy hiệu ký tự `O` trên thẻ chính và nút lọc bằng hình ảnh đồ họa `https://i.ibb.co/jvKdsPGx/C-h-i-b-t-ph.png`.
  - **T - Thách thức thích ứng**: Thay thế huy hiệu ký tự `T` trên thẻ chính và nút lọc bằng hình ảnh đồ họa `https://i.ibb.co/23DqjVtq/Th-ch-th-c-th-ch-ng.png`.
  - Cập nhật đồng bộ các hình thu nhỏ trong thanh điều hướng và chỉ số đo lường SWOT tại HeroBanner dọc.
- **Thay thế văn bản huy hiệu ngôn ngữ**:
  - Thay thế dòng chữ `Native · Professional · AI-Assisted` tại tiêu đề phân hệ "Năng lực ngôn ngữ & Giao tiếp quốc tế" bằng hình ảnh đồ họa `https://i.ibb.co/xSKmpxP8/N-ng-l-c-ng-n-ng-Giao-ti-p-qu-c-t.png`.
- **Khảo Sát Kiến Trúc Gemini Live API (`gemini-live-api-dev`)**:
  - Nghiên cứu mô hình truyền phát âm thanh 2 chiều thời gian thực (Bidirectional Streaming qua WebSocket) với mô hình `gemini-3.8-live` để chuẩn bị cho việc nâng cấp tương tác âm thanh trực tiếp độ trễ cực thấp (< 500ms) kết hợp với công nghệ voice recorder vừa tích hợp.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` duy trì hoạt động ổn định.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.73.0] - 2026-10-24
### Tích Hợp Voice Chat Cho Trợ Lý AI: Slide-to-cancel Voice Recorder (Lucian UX/UI Prompt #333)
- **Tạo mới component chuyên biệt** tại [`src/components/ui/SlideToCancelVoiceRecorder.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/SlideToCancelVoiceRecorder.tsx):
  - Khởi tạo theo thiết kế chuẩn Lucian UX/UI Prompt #333 với giấy phép MIT License.
  - **Cơ chế ghi âm & thao tác cử chỉ (Gestures)**:
    - Nhấn giữ nút Mic: Kích hoạt ghi âm tức thì, hiển thị chấm đỏ nhấp nháy (`.u333-dot`), đồng hồ đếm thời gian thực (`.u333-tm`) và thanh sóng âm (`.u333-wv`) đồng bộ biên độ âm lượng.
    - Trượt sang trái để hủy: Theo dõi tọa độ `pointermove` kết hợp `setPointerCapture`, làm mờ dần chữ `‹ Trượt sang trái để hủy`. Khi trượt quá ngưỡng -100px: Thùng rác trồi lên từ đáy (`.u333-trash`), nắp thùng xoay mở (`.lid`), khối tròn ghi âm màu đỏ văng cung parabol rơi vào thùng (`.u333-bl`), nắp đóng sập và lắc nhẹ, đồng thời hiển thị thông báo hệ thống "Đã hủy ghi âm" (`.u333-sys`).
    - Thả tay để gửi: Gửi trực tiếp tin nhắn thoại vào hội thoại.
  - **Tích hợp Web Speech API (vi-VN)**:
    - Tự động nhận diện và chuyển đổi giọng nói tiếng Việt thành văn bản (`SpeechRecognition`), gửi câu hỏi trực tiếp cho Tí Chuột AI phân tích và phản hồi.
  - **Hỗ trợ đầy đủ bàn phím & Reduced Motion**:
    - Phím `Space` / `Enter`: Nhấn giữ để nói, thả để gửi; phím `Escape`: Hủy ghi âm.
    - `@media (prefers-reduced-motion: reduce)`: Vô hiệu hóa hiệu ứng chuyển động, hiển thị trạng thái tức thì.
- **Tích hợp vào Trợ lý AI Tí Chuột** tại [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
  - Mở rộng kiểu dữ liệu `ChatMessage` với các trường âm thanh (`isVoice`, `voiceDuration`, `voiceBars`, `transcription`, `isSystem`).
  - Hiển thị bong bóng tin nhắn thoại `.u333-vm` với nút Play, 18 vạch sóng âm và thời lượng ghi âm; nhấp vào để phát lại âm thanh.
  - Tự động chuyển đổi mượt mà giữa nút Gửi máy bay giấy (khi có văn bản nhập) và nút Mic ghi âm (khi ô nhập trống).
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi mượt mà.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.72.0] - 2026-10-24
### Kiểm Tra & Chuẩn Hóa Toàn Diện Nội Dung Nằm Gọn Trong Thẻ Chính Với Padding 15px & Bố Cục Thích Ứng Đa Thiết Bị
- **Chuẩn hóa cấu trúc khung thẻ chính `#center-card` và `#content-display`** tại [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
  - **Khung thẻ chính (`#center-card`)**: Giữ kích thước tiêu chuẩn `w-[1200px] max-w-[calc(100%-40px)] mx-auto my-[8px] sm:my-[10px]` đồng bộ tuyệt đối với Header và Footer, bo tròn `rounded-[20px]`, hiệu ứng kính phân tầng cao cấp (`glass-panel`).
  - **Vùng hiển thị nội dung (`#content-display`)**:
    - **Áp dụng padding chuẩn `p-[15px]`** trên toàn bộ 14 trang (từ Trang 0 đến Trang 13).
    - Trang 0 (`HomeView`): Áp dụng `p-[15px]` ở container nội dung bên trong, đảm bảo nền video chuyển động phủ trọn 4 góc bo 20px mà toàn bộ tiêu đề, thẻ kỹ năng và cụm nút tương tác đều nằm chuẩn xác cách đều mép 15px.
    - Nhóm trang giao diện khóa chiều cao trên Desktop (`[1, 3, 4, 5, 6, 8, 9, 12]`): Thiết lập `lg:overflow-hidden` trên màn hình lớn để cố định tỉ lệ 1.5:16 và 16:2 của các HeroBanner mà không bị sinh thanh cuộn kép; tự động chuyển sang `overflow-y-auto` trên thiết bị di động / máy tính bảng (`< 1024px`).
    - Nhóm trang tài liệu cuộn tự nhiên (`[2, 7, 10, 11, 13]`): Đồng bộ đầy đủ `h-full w-full relative p-[15px] overflow-y-auto flex flex-col gap-[15px]`.
- **Bảo đảm tính tương thích thích ứng (Responsive Layout)**:
  - Tất cả các trang đều sử dụng cấu trúc `flex-col lg:flex-row` hoặc `grid` linh hoạt kết hợp với `overflow-x-auto no-scrollbar` cho các bảng biểu kích thước lớn (như timeline 8 cột tại `ExperienceView`), ngăn chặn tuyệt đối tình trạng tràn ngang (horizontal overflow) ngoài thẻ chính trên màn hình điện thoại di động và máy tính bảng.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi mượt mà.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.71.0] - 2026-10-24
### Cập Nhật Video Nền Cho 7 HeroBanner (Học Vấn, Tử Vi, Dự Án, Kinh Nghiệm, Liên Hệ, Giới Thiệu, Hệ Thống)
- **Cập nhật link video MP4 chất lượng cao từ CDN Scena cho 7 phân hệ giao diện**:
  - **Banner Học Vấn**: `https://cdn.scena.ai/project/10223/cc5a8e558d2380dc8bfb96fd26cd877e444d63b6a7036a8530abd823d6d6da63.mp4` tại [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx)
  - **Banner Tử Vi**: `https://cdn.scena.ai/project/10223/ddb11f6544a9a76e2b6c5946ee6805f53a61b1f57a3049bfba7856d2f52ee367.mp4` tại [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx)
  - **Banner Dự Án**: `https://cdn.scena.ai/project/10223/cc106cb37b8d219cca59af9a71a4d7a8cd019515a3e9a8282d16909bb21d88b9.mp4` tại [`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx)
  - **Banner Kinh Nghiệm**: `https://cdn.scena.ai/project/10223/50cd00ea3adfb39fb5860c632402df091d620960b69aae65fd2bb08f4bea4fc6.mp4` tại [`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx)
  - **Banner Liên Hệ**: `https://cdn.scena.ai/project/10223/50b7b30031d4b9124af4948a069cdf530ca8f0942767f6e6b713c350cb8bd6b2.mp4` tại [`src/components/views/ContactView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx)
  - **Banner Giới Thiệu**: `https://cdn.scena.ai/project/10223/f5d9a4cf1ce874ff8473d34cff75c13836b03aabf9a707004fcd2d9547b0725c.mp4` tại [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx)
  - **Banner Hệ Thống**: `https://cdn.scena.ai/project/10223/7bd12b39b9758378cc8f15b6169d42368b4778ad2f2f322b1ef8403c90268f24.mp4` tại [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx)
- **Tối ưu hóa tầng lõi HeroBanner** tại [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
  - Khai báo và xuất hằng số URL chuẩn xác cho từng phân hệ (`EDUCATION_BANNER_VIDEO`, `HOROSCOPE_BANNER_VIDEO`, `PROJECTS_BANNER_VIDEO`, `EXPERIENCE_BANNER_VIDEO`, `CONTACT_BANNER_VIDEO`, `ABOUT_BANNER_VIDEO`, `SYSTEMS_BANNER_VIDEO`).
  - Bổ sung hàm tự động điều hướng `resolveDefaultBannerVideo()` giúp HeroBanner luôn tự động gán đúng video nền tương ứng theo ngữ cảnh trang kể cả khi không truyền prop `videoSrc`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi mượt mà.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.70.0] - 2026-10-24
### Thẻ Dự Án: Bỏ Toàn Bộ Phần Trong Ngoặc Đơn ( ) Ở Tên Dự Án
- **Chuẩn hóa tên gọi các dự án trong hệ thống**:
  - Tại [`src/data/projects.ts`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/projects.ts): Loại bỏ hoàn toàn phần chú thích tiếng Anh trong ngoặc đơn `(...)` của toàn bộ 20 dự án còn lại (1.2, 3.1, 3.2, 3.3, 3.4, 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6) để đồng bộ hoàn hảo với dự án 1.1.
  - Tại [`src/components/ui/LayeredEditorialCard.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/LayeredEditorialCard.tsx) và [`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx): Bổ sung biểu thức chính quy tự động cắt bỏ phần trong ngoặc đơn, đảm bảo hiển thị tiêu đề súc tích, tinh gọn và thẩm mỹ.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.69.0] - 2026-10-24
### Kiểm Tra & Hoàn Thiện Tương Phản Giao Diện Sáng & Tối Của HeroBanner
- **Kiểm tra và nâng cấp hiển thị HeroBanner ở cả 2 chế độ Sáng (Light) & Tối (Dark)**:
  - **Lớp phủ Scrim Gradient thích ứng** tại [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Chế độ Sáng (`light-glass`, `light-glass-dashboard`, `flat-rainbow`, `soft-minimal`): Lớp phủ chuyển sắc thông minh `from-slate-950/60 via-slate-950/25 to-slate-950/50` giúp video nền và hình ảnh vẫn hiển thị rõ ràng, đồng thời làm nổi bật tiêu đề và câu nói Quote màu hổ phách.
    - Chế độ Tối (`dark-neon`): Bổ sung gradient sâu hơn `dark:from-slate-950/75 dark:via-slate-950/35 dark:to-slate-950/60` kết hợp bóng đổ phát quang viền neon tinh tế, mang lại chiều sâu không gian tối chân thực.
  - **Đồng bộ hóa các điều khiển bên trong Banner theo Dark/Light**:
    - Tại [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx): Bổ sung đầy đủ các biến thể `dark:bg-slate-900/80`, `dark:text-slate-200`, `dark:border-white/15`, `dark:placeholder:text-slate-500` cho hàng nút lọc danh mục, ô nhập tìm kiếm và nút đặt lại bộ lọc.
    - Tại [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx) & [`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx): Đảm bảo các ô tìm kiếm, khối thống kê và menu dropdown luôn giữ độ trong suốt kính mờ chuẩn nét với nhãn chữ trắng có độ tương phản cao trên nền video.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.68.0] - 2026-10-24
### Xóa Khối Tiêu Đề Phụ Trong Vùng Thẻ Học Vấn & Chứng Chỉ (EducationView.tsx)
- **Cập nhật giao diện trang Học Vấn & Chứng Chỉ** tại [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx):
  - **Xóa khối đối tượng `<div>` tiêu đề phụ bên trên hàng thẻ**:
    - Xóa bỏ khối `<div>` chứa dòng chữ thông tin đếm khóa học và chú thích `"Toàn bộ 14 Chứng chỉ & Khóa học Chuyên ngành (5.1 - 5.14) · Di chuột vào thẻ để xòe mở chi tiết →"`.
    - Toàn bộ hàng 14 thẻ bài học vấn dạng Xếp Lớp (Card Deck) giờ đây bung mở trọn vẹn 100% chiều cao vùng nội dung, không còn thanh phụ chia cắt, mang lại bố cục liền mạch và thoáng đãng tuyệt đối.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.67.0] - 2026-10-24
### Chuyển Ô Tìm Kiếm Hệ Thống Vào HeroBanner (Trang Cổng Bento Hệ Thống CSKH)
- **Cập nhật giao diện trang Cổng Bento Hệ Thống CSKH** tại [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
  - **Chuyển ô tìm kiếm hệ thống vào Banner bên phải**:
    - Di chuyển input tìm kiếm (`searchQuery`) cùng icon kính lúp và nút xóa nhanh (x) vào bên trong HeroBanner dọc, đặt ngay phía trên menu xổ lọc danh mục.
    - Thiết kế giao diện kính mờ cao cấp `bg-white/20 border-white/30 text-white placeholder-white/70 backdrop-blur-md focus:border-cyan-300`, hòa nhập hoàn hảo vào HeroBanner tỉ lệ `1.5:16`.
  - **Tối ưu hóa toàn diện không gian lưới 12 thẻ Bento bên trái**:
    - Loại bỏ hoàn toàn khối tìm kiếm phía trên lưới 12 thẻ, giúp khu vực lưới Bento đạt chiều cao tối đa, căn chỉnh cân đối, trực quan và không bị che khuất tầm nhìn.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.66.0] - 2026-10-24
### Xóa Hiệu Ứng Nổi & Đổ Bóng Thanh Tiêu Đề Chi Tiết Dự Án, Xóa Chế Độ Xem Lưới Trang Học Vấn
- **Xóa Hiệu Ứng Nổi & Đổ Bóng Khối Tiêu Đề Nhóm Dự Án**:
  - Tại [`src/components/views/ProjectDetailView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx) (thuộc luồng hiển thị chi tiết dự án trong [`ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx)):
  - Khối `<div>` sticky chứa tiêu đề `"NHÓM 1 · NHÓM CHIẾN LƯỢC & CẤU TRÚC VẬN HÀNH CSKH ..."` được thiết lập `shadow-none`, loại bỏ hoàn toàn bóng đổ `shadow-[0_10px_30px_rgba(0,0,0,0.12)]` và hiệu ứng nổi.
  - Khối icon bên trong cũng được chuyển sang `shadow-none`, mang lại phong cách phẳng, tinh gọn và hòa quyện mượt mà vào khung nội dung.
- **Xóa Dạng View Lưới Tại Trang Học Vấn & Bằng Cấp (`EducationView.tsx`)**:
  - Tại [`src/components/views/EducationView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/EducationView.tsx):
  - Xóa bỏ nút chuyển đổi chế độ xem Lưới (`layoutMode === 'grid'`) ở thanh công cụ.
  - Xóa bỏ toàn bộ khối mã render dạng lưới 2 hàng (`TRADITIONAL 2-ROW GRID VIEW`).
  - Thiết lập cố định 100% hiển thị định dạng **Xếp Lớp Độc Đáo (Card Stacking Deck)**, tối ưu diện tích hàng ngang, cho phép di chuột xòe thẻ mượt mà và trực quan nhất.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.65.0] - 2026-10-24
### Tích Hợp Chuyển Đổi Dạng Xem Dự Án Thẻ Grid-To-List Morph (Lucian #308), Tối Ưu Giao Diện Tối & Sáng, Bo Góc Header/Footer Bám Sát Mép
- **Tích hợp phần tử Grid-to-list Morph (Lucian UX/UI Prompt #308)**:
  - Khởi tạo component [`src/components/ui/GridToListMorph.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GridToListMorph.tsx) (MIT License (c) 2026 Seokwoooo):
    - Chuyển đổi mượt mà giữa chế độ Lưới (Grid) và Danh Sách (List) bằng cặp nút bấm ở góc trên bên phải (`.u308-vs`).
    - **Nguyên lý chuyển động FLIP (Web Animations API)**: Khi chuyển chế độ, các ô ảnh banner (`.u308-ph`) không biến mất mà trượt và co giãn tỷ lệ (scale & translate) từ vị trí cũ sang vị trí mới với thời gian 560ms, gia tốc `cubic-bezier(.3,1.15,.4,1)` và độ trễ tuần tự `i * 25ms`.
    - **Hiển thị thông tin trong chế độ danh sách**: Khối mô tả (`.u308-tx`) chỉ xuất hiện trong chế độ List và mờ dần vào vị trí (fade-in & slide từ `translateX(-10px)`) với thời lượng 320ms và độ trễ `300 + i * 30ms` sau khi ảnh đã an vị.
    - Ánh xạ đầy đủ dữ liệu thực chiến 21 dự án CSKH/CX/CRM, hỗ trợ mở trực tiếp Modal Case Study STAR, tương thích hoàn toàn chuẩn trợ năng `prefers-reduced-motion` và bàn phím (Enter/Space).
  - Tích hợp vào [`src/components/views/ProjectsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx).
- **Kiểm Tra & Khắc Phục Toàn Diện Hiển Thị Giao Diện Tối (Dark) & Sáng (Light)**:
  - Khắc phục logic nút chuyển đổi giao diện Sun/Moon trong [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx): Kiểm tra chuẩn xác `isCurrentlyDark = currentTheme === 'dark-neon'` để luôn chuyển đổi mượt mà giữa Tối (`dark-neon`) và Sáng (`light-glass`), khắc phục lỗi kẹt theme khi đang ở các biến thể sáng khác (`light-glass-dashboard`, `flat-rainbow`, `soft-minimal`).
  - Định dạng Menu Icon và Tabs Header trong [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx) theo 5 theme chuẩn:
    - `dark-neon`: Nền kính tối sâu, viền neon cyan/purple phát sáng, icon box rực rỡ sắc xanh cyan.
    - `light-glass-dashboard`: Viên thuốc sắc tím lavender, viền xanh dương/sky phát sáng, icon box gradient cyan-indigo.
    - `flat-rainbow`: Nền phẳng sắc nét không hiệu ứng mờ nhòe, viền dứt khoát 1.5px, icon box tương phản cao.
    - `soft-minimal`: Thiết kế tối giản đen trắng hiện đại, viền mỏng thanh lịch, icon box xám Slate.
    - `light-glass`: Kính mờ trong suốt pastel sang trọng, viền trắng mờ tinh tế.
  - Truyền `currentTheme` đồng bộ sang [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx) và các phân trang để toàn bộ hệ thống giao diện phản ánh đồng bộ theo theme đang chọn.
- **Header & Footer Bám Sát Mép Website & Tùy Chỉnh Bo Góc**:
  - **Header** tại [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx): Bám sát phía trên website (bỏ khoảng cách padding trên của layout `pt-0`), không bo cong 2 góc trên, **chỉ bo cong 2 góc dưới** (`rounded-t-none rounded-b-[20px] border-t-0 border-x border-b`).
  - **Footer** tại [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx): Bám sát phía dưới website (bỏ khoảng cách padding dưới của layout `pb-0`), không bo cong 2 góc dưới, **chỉ bo cong 2 góc trên** (`rounded-b-none rounded-t-[20px] border-b-0 border-x border-t`).
  - Căn chỉnh lề thẻ trung tâm (`#center-card`) thành `my-[8px] sm:my-[10px]` để cân bằng thẩm mỹ giữa Header và Footer.
- **Banner Chiều Dọc Tỉ Lệ 1.5 : 16**:
  - Tối ưu hóa tỷ lệ banner dọc thành `1.5:16` (`aspect-ratio: 1.5 / 16 !important; width: 260px`) tại [`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css), [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx) và 4 trang trọng điểm: `ProjectsView.tsx`, `SystemsView.tsx`, `SkillsView.tsx`, `InterviewView.tsx`.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.64.0] - 2026-10-24
### Thiết Lập Chiều Cao Bằng Nội Dung Bên Trong Cho Thẻ "Tử Vi Bát Trạch" Và Thẻ "Tra Hợp Công Việc"
- **Cập nhật giao diện trang Bản Đồ Tử Vi & Phong Thủy Quản Trị** tại [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
  - **Khối thẻ "Tử vi bát trạch" (`#tuvi-section-1`)**:
    - Thiết lập `h-auto` (thay vì cố định `h-full`), loại bỏ thanh cuộn ép buộc `overflow-y-auto` bên trong vùng nội dung để toàn bộ các khối (La Bàn Âm Dương, Hồ Sơ Nhân Thân, Ngũ Hành Vận Hành, Hướng Cát Bát Trạch) tự động bung mở vừa khít với chiều cao thực tế của nội dung.
  - **Khối thẻ "Tra Hợp Công Việc" (`#tuvi-tool-zodiac`)**:
    - Thiết lập `h-auto` (thay vì cố định `h-full`), điều chỉnh danh sách 12 con giáp và khối chi tiết con giáp sang `w-full h-auto` tự co giãn vừa vặn với nội dung hiển thị thực tế mà không bị kéo giãn hay bó buộc chiều cao.
  - **Căn chỉnh khung bố cục chung (`#info-card-tuvi`)**:
    - Chuyển `items-stretch lg:min-h-[620px]` thành `items-start h-auto`, giúp cột nội dung bên trái và cột công cụ bên phải định kích thước độc lập theo đúng độ cao nội dung của từng đối tượng.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.63.0] - 2026-10-24
### Chuyển Các Thẻ Ngũ Hành (Mộc, Thủy, Hỏa, Thổ) Ra Thẻ Tử Vi Bát Trạch (Slide 1)
- **Cập nhật giao diện trang Bản Đồ Tử Vi & Phong Thủy Quản Trị** tại [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
  - **Hợp nhất đầy đủ 5 Hành Tố vào Slide 1 (Thẻ "Tử vi bát trạch")**:
    - Chuyển 4 thẻ Hành Tố còn lại (**Hành Mộc Phát Triển**, **Hành Thủy Linh Hoạt**, **Hành Hỏa Nhiệt Huyết**, **Hành Thổ Bền Vững**) sang thẻ Tử vi bát trạch (Slide 1), kết hợp cùng **Hành Kim Kỷ Luật** (đã chuyển trước đó) để tạo thành lưới Ngũ Hành Vận Hành hoàn chỉnh 5 cột (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`).
    - Mỗi thẻ hành tố được thiết kế với màu sắc ngũ hành tương sinh tương khắc, tiêu đề rõ ràng, huy hiệu "Bản Mệnh" (đối với Hành Kim) / "Hành Tố" (Mộc, Thủy, Hỏa, Thổ) cùng nội dung triết lý vận hành quản trị sâu sắc.
  - **Giải phóng không gian Slide 3 (Lục Cung Tử Vi)**:
    - Loại bỏ khối 4 hành tố ở chân Slide 3, giúp không gian 6 Cung cốt lõi (Mệnh, Quan Lộc, Tài Bạch, Phúc Đức, Phu Thê, Thiên Di) trở nên rộng rãi, thông thoáng và trực quan hơn.
  - **Cập nhật nhãn Tab điều hướng Slide**:
    - Tab 01: `01. Bát Trạch & Ngũ Hành`
    - Tab 03: `03. Lục Cung Tử Vi`
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.62.0] - 2026-10-24
### Chuyển Khối "12 Phân Hệ Vận Hành C-Level" Vào HeroBanner (Trang Hệ Thống CSKH)
- **Cập nhật giao diện trang Cổng Bento Hệ Thống CSKH** tại [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
  - **Chuyển khối thống kê phân hệ vào Banner**: Di chuyển đối tượng `<div> "12 phân hệ vận hành C-level Hiển thị: ... / 12 phân hệ"` từ thanh điều khiển phía trên lưới sang vị trí đầu tiên trong phần nội dung của HeroBanner bên phải.
  - **Kiểu dáng kính mờ hài hòa (Glassmorphism)**: Thẻ trong banner được thiết kế với nền kính `bg-white/10 border-white/15 backdrop-blur-md text-white`, icon phân hệ nhấp nháy chuyển động (`animate-pulse`), cùng badge chỉ số đếm phân hệ (`{filteredSystems.length}/12`) nổi bật bằng sắc xanh neon `text-cyan-300 font-mono`.
  - **Tối ưu thanh tìm kiếm bên trái**: Khung tìm kiếm hệ thống (`input`) được mở rộng toàn chiều rộng `w-full`, giúp không gian lưới 12 thẻ Bento thông thoáng, tập trung và dễ thao tác.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.61.0] - 2026-10-24
### Nâng Cấp Thẻ Dự Án: Hình Banner Lắp Đầy Thẻ & Cập Nhật Toàn Bộ 21 Banner Ảnh Dự Án
- **Cập nhật giao diện thẻ bài viết dự án (`LayeredEditorialCard.tsx`)**:
  - **Lắp đầy thẻ với hình ảnh banner dự án (`.u049-art`)**: Thẻ dự án hiển thị hình ảnh banner thực tế (`proj.image`) chiếm trọn toàn bộ diện tích thẻ (`position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center;`).
  - **Loại bỏ các lớp đồ họa SVG che khuất**: Xóa bỏ hoàn toàn lớp đồi núi xa (`.u049-l2`), đồi núi tiền cảnh đặc màu và hàng thông vẽ tay (`.u049-l3`) vốn che kín hơn nửa dưới thẻ, đồng thời gỡ bỏ các hình tròn mặt trời SVG làm mờ đục ảnh banner.
  - **Lớp phủ Scrim chuyển sắc kính sang trọng (`.u049-shade`)**: Bổ sung gradient kính thông minh mờ nhẹ ở phần trên (để hình ảnh banner hiển thị rõ nét) và chuyển dần sang nền tối (hoặc nền sáng ở chế độ Light) ở phần dưới thẻ giúp các nội dung: mã dự án, tiến độ hoàn thành, tiêu đề, tóm tắt và nút "Xem STAR" đạt độ tương phản chuẩn nét 100%.
  - **Hiệu ứng thu phóng mượt mà (Smooth Zoom)**: Khi rê chuột (hover) hoặc bấm mở (open), hình banner phóng to nhẹ nhàng `scale(1.08)` kết hợp dịch chuyển tương tác theo góc nhìn (parallax depth).
  - **Đồng bộ bo cong 4 góc**: Cập nhật viền bo góc của thẻ dự án sang `rounded-[20px]` (`border-radius: 20px;`) đồng nhất với hệ thống thiết kế toàn trang.
- **Xác nhận 21 liên kết ảnh banner dự án (`src/data/projects.ts`)**:
  - Toàn bộ 21 banner tỷ lệ chuẩn 16:9 chất lượng cao từ người dùng cung cấp (`1.1` đến `6.3`) đã được tích hợp đầy đủ và hiển thị sắc nét, sống động trên từng thẻ.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.60.0] - 2026-10-24
### Xóa Bỏ Hoàn Toàn Hiệu Ứng Con Trỏ Chuột (Cursor Spotlight / Radial Glow)
- **Gỡ bỏ hiệu ứng quầng sáng theo con trỏ chuột** tại [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
  - Xóa bỏ state theo dõi tọa độ chuột `cardMousePos`.
  - Gỡ bỏ sự kiện `onMouseMove` và `onMouseLeave` trên thẻ chính `<main id="center-card">`, loại bỏ việc tính toán lại tọa độ chuột liên tục giúp cải thiện hiệu năng render.
  - Xóa bỏ thẻ quầng sáng `<div className="glass-spotlight" ... />` chạy theo chuột.
- **Vô hiệu hóa lớp CSS `glass-spotlight`** tại [`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css):
  - Thiết lập `.glass-spotlight { display: none !important; }` để triệt tiêu mọi hiệu ứng tương tác quầng sáng chuột.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.59.0] - 2026-10-24
### Xóa Bỏ Hoàn Toàn Khối Điều Hướng Tab Slide "👋 01. Xin Chào & Thông Tin 02. Chân Dung & Triết Lý"
- **Cập nhật giao diện trang Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân** tại [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx):
  - Xóa bỏ hoàn toàn thanh điều hướng slide trung gian (chứa 2 tab `"👋 01. Xin Chào & Thông Tin"` và `"02. Chân Dung & Triết Lý"`) bên dưới HeroBanner theo yêu cầu Visual Inspector (`Kiểu dáng - xóa`).
  - Giao diện giữa HeroBanner và khung nội dung slide trở nên hoàn toàn liền mạch, thông thoáng.
  - Các thao tác chuyển slide vẫn vận hành mượt mà thông qua 2 nút nổi lớn bám mép slide trái/phải (`ChevronLeft` / `ChevronRight`), phím mũi tên bàn phím (`←` / `→`) và nút điều hướng chuyển slide cuối mỗi trang.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.58.0] - 2026-10-24
### Đồng Bộ Bo Cong 4 Góc (20px) Cho Toàn Bộ Các Thành Phần Giao Diện
- **Đồng bộ bo cong Header & Footer**:
  - Tại [`src/components/layout/Header.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx): Thay thế các lớp bo cong cục bộ `rounded-b-[20px] rounded-t-none border-b-2 border-x` thành **bo cong đều cả 4 góc `rounded-[20px]`** cùng viền bao quanh toàn diện `border-2`.
  - Tại [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx): Thay thế các lớp bo cong cục bộ `rounded-t-[18px] rounded-b-none border-t-2 border-x` thành **bo cong đều cả 4 góc `rounded-[20px]`** cùng viền bao quanh toàn diện `border-2`.
- **Căn chỉnh bố cục chính (`src/app/page.tsx`)**:
  - Cập nhật [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx): Thêm khoảng đệm `py-1.5 sm:py-2` vào khung gốc `app-root-layout` và điều chỉnh khoảng cách thẻ giữa `my-[10px] sm:my-[12px]`, giúp cả 4 góc bo cong 20px của Header, Center Card và Footer đều hiển thị trọn vẹn, không bị cấn sát mép trình duyệt.
- **Đồng bộ các thành phần giao diện khác**:
  - Tại [`src/components/ui/GlassPanel.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/GlassPanel.tsx): Chuẩn hóa các biến thể `header`, `footer`, `default`, `subtle` sang bo cong đồng nhất `rounded-[20px]`.
  - Tại [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx): Chuẩn hóa banner ngang sang `rounded-[20px]` đồng nhất với banner dọc và center card.
  - Tại [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx): Bỏ `rounded-br-none` và `rounded-bl-none`, đồng bộ bo cong tròn cả 4 góc `rounded-2xl` cho bong bóng tin nhắn.
- **Kiểm Thử & Nghiệm Thu**:
  - Quét toàn bộ mã nguồn không còn bất kỳ thành phần nào bị bo góc lệch/bất đối xứng.
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.57.0] - 2026-10-24
### Sửa Chữa & Đồng Bộ Giao Diện HeroBanner Ở Cả Hai Chế Độ Sáng Và Tối (Light & Dark Mode)
- **Sửa lỗi đè kiểu dáng trong giao diện Sáng (`light-glass`)** tại [`src/styles/variables.css`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css):
  - Loại bỏ hoàn toàn quy tắc ép kiểu màu chữ `color: #1E1B4B !important;` trên thẻ tiêu đề `h1, h2, h3` của Banner trong chế độ Sáng. Trước đây quy tắc này ghi đè lên màu nhận diện trang (`menuThemeColor`), làm tiêu đề chuyển sang màu tím than tối và chìm vào nền video.
  - Gỡ bỏ nền gradient trắng đục 88% `background: linear-gradient(...) !important;` đè lên thẻ Banner, thay bằng viền kính sáng bóng tinh tế (`border: 1.5px solid rgba(255, 255, 255, 0.85)`) và đổ bóng chiều sâu cao cấp (`box-shadow: 0 12px 32px -6px rgba(30, 27, 75, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.65)`).
- **Nâng cấp giao diện Banner đồng bộ Sáng & Tối** tại [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
  - **Lớp phủ Scrim chuyển sắc thông minh**: Thiết lập 2 tầng gradient (`from-slate-950/60 via-slate-950/25 to-slate-950/50` theo chiều ngang và `from-slate-950/35 via-transparent to-slate-950/25` theo chiều dọc) giúp bảo toàn độ tương phản tối đa cho tiêu đề, câu nói vàng (quote), và các thanh điều khiển `bottomControls` nhưng vẫn giữ trọn độ nét của video nền.
  - **Bảng màu nhận diện trang phát sáng (Luminous Theme Colors)**: Tinh chỉnh các gam màu của 12 trang (Tím, Lục bảo, Chàm, Xanh cyan, Hồng cánh sen, Hổ phách, Cam san hô, Vàng kim...) với độ sáng rực rỡ, sắc nét trên nền video.
  - **Đổ bóng chữ chống lóa kép**: Đặt `textShadow: '0 2px 8px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.9)'` cho tiêu đề và ánh sáng vàng hổ phách `text-amber-300 dark:text-yellow-300` với vầng quang `0 0 10px rgba(245,158,11,0.35)` cho câu nói vàng (Quote), hiển thị hoàn hảo ở cả giao diện Sáng và Tối.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.56.0] - 2026-10-24
### Tối Ưu Hiển Thị Rõ Nét Video Nền Tại Khối Giới Thiệu "Luôn Bên Bạn ♡ 👋 Xin Chào..."
- **Cập nhật giao diện khối Hero Banner Card** tại [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx):
  - **Tăng độ hiển thị video nền**: Điều chỉnh độ trong suốt của thẻ `<video>` lên `opacity-100` giúp video nền hiển thị sắc nét, sống động.
  - **Giảm độ cản trở của lớp phủ scrim**: Thay thế lớp phủ mờ dày 95% và hiệu ứng `backdrop-blur-[1.5px]` trước đây bằng dải màu gradient mượt mà (`from-white/85 via-white/40 to-transparent` và `dark:from-slate-950/85 dark:via-slate-950/35 dark:to-transparent`), tập trung bảo vệ độ tương phản cho cột văn bản bên trái, đồng thời mở thông không gian trung tâm và bên phải để video nền hiển thị hoàn toàn rõ nét.
  - **Nâng cấp độ tương phản văn bản & thẻ thống kê**: Bổ sung `drop-shadow` cho chữ và kính mờ `backdrop-blur-md` cho 4 thẻ thống kê nổi bên phải.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.55.0] - 2026-10-24
### Ẩn Khối Điều Hướng Tab Slide "👋 01. Xin Chào & Thông Tin 02. Chân Dung & Triết Lý" Trên Trang Hồ Sơ
- **Cập nhật giao diện trang Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân** tại [`src/components/views/AboutView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/AboutView.tsx):
  - Ẩn khối `<div>` chứa 2 tab phân đoạn slide `"👋 01. Xin Chào & Thông Tin 02. Chân Dung & Triết Lý"` bằng lớp `hidden` theo đúng chỉ thị Visual Inspector (`Kiểu dáng - ẩn`, phạm vi chỉ áp dụng cho đối tượng này).
  - Duy trì tính thông thoáng, gọn gàng cho khu vực trên cùng bên dưới HeroBanner.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.54.0] - 2026-10-24
### Tối Ưu Hóa Công Cụ Tra Hợp Công Việc: Mặc Định Hiển Thị 12 Con Giáp & Thay Thế Vị Trí Khi Tra Cứu
- **Cập nhật giao diện công cụ Tra Hợp Công Việc** tại [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
  - **Trạng thái Mặc Định (`!hasSearched || !currentZodiac`)**:
    - Hiển thị toàn bộ danh sách 12 con giáp chiếm trọn chiều cao thanh cuộn (`flex-1 overflow-y-auto min-h-0`).
    - Ẩn hoàn toàn khung chi tiết con giáp và lược bỏ khung placeholder gây chật chội, tạo không gian thoáng đãng, dễ dàng cuộn và duyệt qua 12 con giáp.
  - **Trạng thái Khi Chọn Hoặc Tìm Kiếm Thành Công (`hasSearched && currentZodiac`)**:
    - Danh sách 12 con giáp được ẩn đi ngay lập tức.
    - Khối chi tiết con giáp được chọn (hoặc con giáp ứng với năm sinh vừa tìm) xuất hiện **ngay tại vị trí danh sách 12 con giáp** với hoạt ảnh mượt mà `animate-fadeIn`.
    - Hiển thị đầy đủ thông tin: Biểu tượng con giáp, tên tuổi, mối quan hệ, năm sinh, môi trường làm việc phù hợp, hướng bàn làm việc, lời khuyên hợp tác thực chiến và điểm số tương hợp.
    - Bổ sung nút quay lại nổi bật `← Danh sách 12 con giáp` và nút đóng `✕` (cùng nút tắt `12 Con giáp` trên thanh tiêu đề) giúp người dùng nhanh chóng quay về danh sách 12 con giáp chỉ với một cú nhấp chuột.
- **Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` đạt **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Hệ thống:** Hung Thai Executive Portal  ---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
**Quy trình:** Chế độ UI CHANGE Protocol---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
------

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
## [1.0.0] - 2026-10-24---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
### 1. Khởi tạo & Tích hợp Theme Mới---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Theme**: `Glass UI Light Multicolor` (`light-glass`) chính thức trở thành theme thiết kế mặc định và cốt lõi của website.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Design Tokens**: Bổ sung đầy đủ hệ thống token màu nền (Lavender `#F5F3FF`, White `#FFFFFF`, Soft Blue/Green/Yellow/Coral/Purple), màu nhấn Clay, và màu chữ Ink `#1E1B4B`.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Bề mặt kính**: Triển khai `Parent Glass Card` với hiệu ứng `backdrop-filter: blur(14px - 16px)` và 5 biến thể thẻ con kính pastel (`.subcard-blue-glass`, `.subcard-green-glass`, `.subcard-yellow-glass`, `.subcard-coral-glass`, `.subcard-purple-glass`).---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
### 2. Chuẩn Hóa 12 Nhóm Thành Phần---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Header & Navigation**: Cập nhật kính bán trong suốt, trạng thái menu chọn nổi bật với sắc tím pastel và viền tinh tế.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Hero & Banner**: Cập nhật gradient mềm, hiển thị sắc nét chữ Ink và các số liệu Clay Blue/Purple.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Card System**: Tự động mở rộng theo nội dung (Smart Adaptive Layout), nâng nhẹ `translateY(-3px)` khi hover.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Buttons & Form Controls**: Chuẩn hóa độ tương phản nút bấm và viền focus ring tỏa sáng êm dịu.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Footer**: Đồng bộ phong cách kính sáng, căn chỉnh khoảng cách và padding hợp lý.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
### 3. Tương Thích & Đa Giao Diện (Theme Registry)---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- Cập nhật Theme Registry với 3 theme:---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
  1. `Glass UI Light Multicolor` (`light-glass`) — Mặc định.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
  2. `Flat UI Light Multicolor` (`flat-rainbow`) — Bảo toàn 100%.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
  3. `Glass UI Dark Neon Multicolor` (`dark-neon`) — Bảo toàn 100%.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- Cập nhật `<ThemeSelectorModal>` với các thẻ xem trước trực quan cho từng theme.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- Kích hoạt chuyển theme động qua `page.tsx` và lưu trữ trạng thái bền vững trong `localStorage`.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
### 4. Kết Quả Kiểm Thử & Nghiệm Thu---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **TypeScript Compile**: `pnpm exec tsc --noEmit` đạt 0 lỗi (Exit Code 0).---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **HTTP Server**: Cổng 3001 phản hồi HTTP 200 OK.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Dữ liệu & Routing**: Bảo toàn toàn bộ 13 màn hình nghiệp vụ, dữ liệu video HomeView, và chi tiết dự án 1.1 STAR.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
- **Chuyển đổi giao diện**: Kiểm tra chuyển đổi qua lại giữa `light-glass`, `flat-rainbow`, và `dark-neon` mượt mà, không xung đột CSS hay reset state.---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
------

## [2.50.0] - 2026-10-24
### Đồng Bộ Chiều Cao Banner Ngang, Tối Ưu Trang Tử Vi, Cài Đặt Giọng Nói AI & Chuyển Nút Display Settings
- **1. Chiều Cao Banner Ngang Bằng Chiều Dài / Kích Thước Banner Dọc (300px)**:
  - Cập nhật [`src/components/ui/HeroBanner.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Đặt chiều cao của HeroBanner nằm ngang đồng nhất với kích thước 300px của HeroBanner dọc (`w-full h-[260px] sm:h-[280px] lg:h-[300px] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]`).
    - Nâng cấp độ thoáng đãng cho tiêu đề, câu nói vàng (quote), tác giả và toàn bộ thanh điều khiển `bottomControls`.
- **2. Tối Ưu Hóa Trang Bản Đồ Tử Vi & Phong Thủy Quản Trị**:
  - Cập nhật [`src/components/views/HoroscopeView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx):
    - Bổ sung thanh 4 Tab điều hướng slide trực quan ngay trên `HeroBanner.bottomControls`: `01. Bát Trạch & Mệnh Quái`, `02. Phong Cách Quản Trị`, `03. Lục Cung & Ngũ Hành`, `04. Triết Lý Lãnh Đạo`.
    - Tích hợp bộ đếm bước `[ ◀ ] (Slide 1 / 4) [ ▶ ]` cùng nút chuyển âm thanh thiền định `Âm Hưởng Thiền 432Hz`.
    - Chuẩn hóa vị trí 2 nút trôi nổi chuyển slide trái/phải (`absolute left-2` & `absolute right-2`) bám sát thẻ slide, sắc nét với viền kính và ánh vàng hổ phách.
- **3. AI Chat: Bổ Sung Icon Settings Đưa Cấu Hình Giọng Nói Vào Trong**:
  - Cập nhật [`src/components/ui/AiChatModal.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx):
    - Thay thế nút chữ "Giọng nói" bằng nút icon bánh răng Settings tinh tế trên thanh tiêu đề của Tí Chuột AI.
    - Xây dựng bảng cài đặt kính mờ (Glass Settings Panel) đầy đủ tính năng:
      - Danh sách chọn giọng đọc AI (ưu tiên và gắn nhãn các giọng tiếng Việt chuẩn `VN`).
      - Điều chỉnh tốc độ đọc (Chậm 0.8x, Chuẩn 1.0x, Nhanh 1.2x).
      - Tinh chỉnh âm vực / cao độ (Trầm, Tự nhiên, Trong trẻo).
      - Công tắc Bật/Tắt tự động đọc tin nhắn khi AI phản hồi.
      - Nút "Nghe Thử Giọng Nói" để kiểm tra âm thanh trực tiếp.
- **4. Nút Display Settings Chuyển Vào Footer, Nằm Trên Nút Hình Nền & Dưới Nút Giao Diện**:
  - Cập nhật [`src/components/layout/Footer.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx) & [`src/app/page.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Thiết kế nút "Hiển Thị" (Display Settings) có giao diện giống hoàn toàn nút "Hình Nền" (viên thuốc bo cong tròn, icon trong vòng tròn `36x36px`, nhãn chữ nét đậm, màu xanh ngọc sky dịu mát).
    - Đặt vị trí xếp chồng chính xác: nằm TRÊN nút Hình Nền (`zIndex: 24 > 18`) và nằm DƯỚI nút Giao Diện (`zIndex: 24 < 30`) với hiệu ứng lấn mép `-ml-[64px]`.
    - Tích hợp popup `LiveDisplaySettings` mở trực tiếp ngay phía trên nút khi nhấp chọn, tự đóng khi click ra ngoài.
    - Gỡ bỏ nút trôi nổi góc dưới bên trái màn hình ở `page.tsx` giúp giao diện thông thoáng, tinh gọn.
- **5. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server `http://localhost:3001` phản hồi **HTTP 200 OK**.
---

## [2.51.0] - 2026-10-24
### Tỉ Lệ Banner Ngang 16:2 & Banner Dọc 2:16, Đồng Bộ Giọng Đọc Toàn Website, Cập Nhật 21 Banner Dự Án
- **1. Cố Định Chuẩn Tỉ Lệ Đối Xứng Banner**:
  - Cập nhật [src/components/ui/HeroBanner.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - **Banner ngang**: Tỉ lệ chuẩn **16:2** (spect-[16/2], spectRatio: '16 / 2', data-banner-aspect="16:2").
    - **Banner dọc**: Tỉ lệ chuẩn **2:16** (spect-[2/16], spectRatio: '2 / 16', data-banner-aspect="2:16").
- **2. Đồng Bộ Giọng Đọc AI Chat Làm Giọng Đọc Mặc Định Toàn Website**:
  - Khởi tạo module quản lý giọng đọc tập trung [src/utils/speechVoice.ts](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/utils/speechVoice.ts).
  - Tự động lưu Voice URI vào localStorage (hungthai_default_voice_uri) và phát sự kiện hungthai-voice-change ngay khi người dùng chọn giọng trong AI Chat.
  - Đồng bộ tức thì tới toàn bộ các tính năng đọc văn bản trên hệ thống:
    - Trợ lý AI Tí Chuột ([src/components/ui/AiChatModal.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/AiChatModal.tsx)).
    - Audio Book đọc Thư Ngỏ ([src/components/views/LetterView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/LetterView.tsx)).
    - Bản tin phát thanh radio kinh nghiệm thực chiến ([src/components/views/ExperienceView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx)).
- **3. Cập Nhật & Kiểm Tra 21 Hình Banner Dự Án**:
  - Xác nhận toàn bộ 21 banner hình ảnh dự án (1.1 đến 6.3) đã được tích hợp đúng 100% trong [src/data/projects.ts](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/data/projects.ts).
  - Hiển thị trực quan, sắc nét trên thẻ Layered Editorial Card ([src/components/ui/LayeredEditorialCard.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/LayeredEditorialCard.tsx)) và trang chi tiết dự án STAR ([src/components/views/ProjectDetailView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectDetailView.tsx)).
- **4. Kiểm Thử & Nghiệm Thu**:
  - pnpm exec tsc --noEmit hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server http://localhost:3001 phản hồi **HTTP 200 OK**.

---

## [2.52.0] - 2026-10-24
### Chuẩn Hóa Toàn Diện Tỉ Lệ 2 : 16 Cho Banner Chiều Đứng (Vertical Banner)
- **1. Thiết Lập Quy Tắc CSS & Thuộc Tính Tỉ Lệ 2:16**:
  - Cập nhật [src/styles/variables.css](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css):
    - Khởi tạo quy tắc spect-ratio: 2 / 16 !important; cho .hero-banner.hero-banner-vertical, .hero-banner[data-banner-aspect="2:16"] và .hero-banner[data-banner-orientation="vertical"].
    - Duy trì chiều rộng cố định 300px trên Desktop chuẩn hệ thống, kết hợp tỷ lệ đối xứng 2 : 16 hoàn hảo với Banner ngang 16 : 2.
  - Cập nhật [src/components/ui/HeroBanner.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/HeroBanner.tsx):
    - Khai báo thuộc tính data-banner-aspect="2:16", spectRatio: '2 / 16', và class spect-[2/16].
- **2. Đồng Bộ Hóa Khối Chứa <aside> Tại Toàn Bộ Các Trang Có Banner Đứng**:
  - Tích hợp data-banner-aspect="2:16" vào các thẻ <aside> bao bọc:
    - Trang Kho 21 Dự Án: [src/components/views/ProjectsView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx).
    - Trang Kỹ Năng & Năng Lực Cốt Lõi: [src/components/views/SkillsView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SkillsView.tsx).
    - Trang Cổng Bento 12 Hệ Thống: [src/components/views/SystemsView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx).
    - Trang Phỏng Vấn Thực Chiến: [src/components/views/InterviewView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx).
- **3. Kiểm Thử & Nghiệm Thu**:
  - pnpm exec tsc --noEmit hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server http://localhost:3001 phản hồi **HTTP 200 OK**.

---

## [2.53.0] - 2026-10-24
### Chuyển Khối "Hành Kim Kỷ Luật" Sang Slide 1 Tại Trang Tử Vi & Phong Thủy
- **1. Đối Tượng Xử Lý**:
  - Khối thẻ <div> "Hành Kim Kỷ Luật" ("Nguyên tắc thép, chuẩn hóa quy trình vận hành, giám sát SLA 99% nghiêm ngặt và kiểm soát rủi ro hệ thống.") tại [src/components/views/HoroscopeView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/HoroscopeView.tsx).
- **2. Chi Tiết Thực Hiện**:
  - **Chuyển sang Slide 1 (Bát Trạch & Bản Mệnh Giáp Tý 1984 Hải Trung Kim)**:
    - Bố trí khối "Hành Kim Kỷ Luật" vào Slide 1 (enderSection1BatTrach()) ngay dưới 4 huy hiệu thông số bản mệnh (Giờ Sinh Can Chi, Bản Mệnh Nạp Âm, Cung Mệnh Đoài Kim, Kim Tứ Cục Vận) và trên lưới hướng cát Bát Trạch.
    - Tạo điểm nhấn bản mệnh Hải Trung Kim nhất quán với triết lý quản trị kỷ luật sắt và chuẩn hóa SOP.
  - **Cân Đối Lại Slide 3 (Lục Cung & Ngũ Hành)**:
    - Slide 3 (enderSection3Palaces()) loại bỏ khối "Hành Kim Kỷ Luật" theo đúng phạm vi yêu cầu, chuyển 4 hành tố còn lại (Hành Mộc, Hành Thủy, Hành Hỏa, Hành Thổ) thành lưới 4 cột cân đối, thanh lịch (grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4).
- **3. Kiểm Thử & Nghiệm Thu**:
  - pnpm exec tsc --noEmit hoàn tất với **0 lỗi** (Exit Code 0).
  - Dev server http://localhost:3001 phản hồi **HTTP 200 OK**.


---

## [2.54.0] - 2026-10-25
### Cập Nhật Thẻ Hệ Thống Giao Diện Sáng & Tối + Thiết Lập Skill Thiết Kế Card Đồng Nhất
- **1. Nâng Cấp Giao Diện Thẻ Hệ Thống (SystemsView.tsx) Thích Ứng Sáng & Tối (Light Glass & Dark Neon)**:
  - Cập nhật [src/components/views/SystemsView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
    - Tích hợp reactive state `isDark` kết hợp `MutationObserver` theo dõi biến động `class="dark"` và `data-theme` trên `<html>`.
    - **Chế độ Sáng (Light Glass)**: Nền kính trắng ngọc bích gradient `linear-gradient(135deg, #ffffff 0%, ${cardTheme}12 55%, ${cardTheme}22 100%)`, viền mềm mại `${cardTheme}40`, chữ đậm `text-slate-800` tương phản cao, badge lật thẻ kính mờ thanh lịch.
    - **Chế độ Tối (Dark Neon)**: Nền đen obsidian huyền bí `radial-gradient(circle at top right, ${cardTheme}35, transparent 70%), linear-gradient(145deg, #090e17 0%, #0d1527 100%)`, viền neon phát sáng `${cardTheme}55`, bóng hào quang neon `0 0 16px ${cardTheme}25`, icon phát quang `drop-shadow(0 0 8px ${cardTheme})`, chữ viết tắt `abbr` có neon text-shadow.
    - **Mặt sau (Back Face)**: Mặt sau tự động thích ứng với nền kính sáng mờ chữ đen hoặc nền kính đen tuyền chữ sáng kèm nút CTA màu thương hiệu.
- **2. Khởi Tạo & Đăng Ký Skill Thiết Kế Card Đồng Nhất (card-presentation-system)**:
  - Khởi tạo Skill chuẩn Antigravity tại [.agents/skills/card-presentation-system/SKILL.md](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agents/skills/card-presentation-system/SKILL.md) và đồng bộ tại [.agent/skills/card-presentation-system/SKILL.md](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agent/skills/card-presentation-system/SKILL.md).
  - Chuẩn hóa 5 dạng Card chuẩn mực:
    1. **3D Flip System Card** (Thẻ lật 3D 2 mặt tại Cổng 12 Hệ Thống).
    2. **Bento Responsive View Card** (Thẻ lưới Bento phi đối xứng 12 cột tại Thư Ngỏ & Trang Chủ).
    3. **Pastel Glass Grid Card** (Thẻ lưới kính đa sắc tại Lĩnh Vực, Kỹ Năng, Học Vấn).
    4. **Timeline Milestone Pill Card** (Thẻ mốc lộ trình con nhộng tại Kinh Nghiệm).
    5. **Hero Video Banner Card** (Thẻ banner toàn cảnh có video nền, +50px chiều cao).
  - Ban hành 6 quy tắc thiết kế cốt lõi:
    - Bỏ khung tròn riêng của icon (`bỏ khung tròn`).
    - Khung hợp nhất bao trùm cả icon và tiêu đề.
    - Tiêu đề 4 chữ viết hoa chữ cái đầu (`formatCardTitle`).
    - Màu chữ tiêu đề đồng bộ tuyệt đối với màu icon.
    - Thích ứng kép 100% Sáng (Light Glass) và Tối (Dark Neon).
    - Banner nền trong suốt tinh khiết lộ rõ hình nền/video.
  - Cung cấp mã nguồn mẫu React TypeScript tại [.agents/skills/card-presentation-system/examples/CardExamples.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agents/skills/card-presentation-system/examples/CardExamples.tsx).
  - Lập bảng tra cứu ánh xạ 14 trang tại [.agents/skills/card-presentation-system/references/card-types.md](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/.agents/skills/card-presentation-system/references/card-types.md).
  - Đăng ký vào [skills-lock.json](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/skills-lock.json).
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).

---

## [2.57.0] - 2026-10-25
### Trang Kinh Nghiệm: Hiển Thị Logo Theo Chiều Dọc Ở Khung Bên Dưới (Timeline Detail Card)
- **1. Cập Nhật Bố Cục Logo Sản Phẩm Dọc (Vertical Logo Cluster)**:
  - Cập nhật [`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx):
    - Tại cụm Card thông tin Tier 3 ("Khung bên dưới" thẻ mốc thời gian trên Timeline Lịch sử công tác), chuyển đổi bố cục hiển thị nhóm logo sản phẩm (`item.products && item.products.length > 1`) từ dạng hàng ngang chồng lấn (`flex items-center -space-x-1.5`) sang bố cục cột dọc thanh thoát (`flex flex-col items-center justify-center -space-y-1.5`).
    - Bổ sung hiệu ứng viền nhẹ tinh tế `border border-slate-100 dark:border-white/10 shadow-xs`, cùng cơ chế hover mở rộng độc lập `hover:scale-120 hover:z-30 transition-all duration-200` giúp quét rõ từng thương hiệu / sản phẩm (Garena, Shopee, AirPay, Gcafe hoặc ECO SCC, Finviet) mà không che khuất nhau.
- **2. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Next.js dev server biên dịch hoàn tất thành công (200 OK).

---

## [2.58.0] - 2026-10-25
### Trang Hệ Thống (SystemsView): Thẻ CLP - Hiệu Ứng Sóng Tròn Trắng Từ Icon & Tự Động Phát Video Khi Rê Chuột
- **1. Hiệu Ứng Sóng Tròn Trắng Lan Tỏa Từ Icon (White Radial Ripple Wave)**:
  - Cập nhật [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
    - Khởi tạo hệ thống keyframes `@keyframes clp-ripple-wave` và `@keyframes clp-ring-pulse` mô phỏng 3 lớp sóng xung kích ánh sáng trắng (`clp-wave-1`, `clp-wave-2`, `clp-wave-3`) phát xuất chuẩn xác từ tọa độ tâm của Icon quà tặng ở góc dưới bên phải thẻ CLP.
    - Khi con trỏ rê vào (`onMouseEnter`), làn sóng trắng bùng nổ và lan tỏa phủ khắp toàn bộ thẻ với ánh sáng neon trắng cao cấp, tự động reset animation theo `clpHoverKey` mỗi lần tương tác.
- **2. Tích Hợp Video Nền Tự Động Phát (CLP Live Video Loop)**:
  - Tích hợp video stream chính thức từ CDN: `https://cdn.scena.ai/project/10223/fcec73d22dd54308ca9dde1590b8914ad92afdae78541e455cfba580ae02fc12.mp4` với chế độ `muted playsInline loop`.
  - Tự động kích hoạt phát lại từ giây đầu tiên (`currentTime = 0; play()`) khi rê chuột vào và tạm dừng (`pause()`) mượt mà khi rê chuột ra ngoài (`onMouseLeave`).
  - Bổ sung lớp scrim chuyển sắc bảo đảm các tiêu đề, tên viết tắt "CLP", tên đầy đủ "Customer Loyalty Program" và các nút hành động luôn đạt độ tương phản và sắc nét tối đa trên cả 2 giao diện Sáng Glass và Tối Neon.
  - Hiển thị Live Badge "VIDEO CLP" nhấp nháy phát sáng thời gian thực thay thế nút "Lật thẻ" trong thời gian video đang phát.
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Next.js dev server biên dịch hoàn tất thành công (200 OK).

---

## [2.59.0] - 2026-10-25
### Trang Hệ Thống (SystemsView): Tối Ưu Hóa Video Thẻ CLP Đạt Độ Trong Suốt & Sắc Nét Tối Đa
- **1. Tăng Cường Độ Trong Suốt & Độ Sáng Của Video (Crystal Clear Video Rendering)**:
  - Cập nhật [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
    - Tăng độ mờ hiển thị video từ `opacity-90` lên **`opacity-100`** nguyên bản, bổ sung bộ lọc hình ảnh tăng cường `brightness-110 contrast-105` giúp mọi chi tiết trong video trở nên rực rỡ, sống động và sắc nét.
    - Loại bỏ hoàn toàn lớp phủ tối mờ dày (`from-slate-950/85 via-slate-950/45 to-slate-900/75`), thay bằng dải chuyển sắc siêu mỏng `bg-gradient-to-b from-black/50 via-transparent to-black/60` chỉ xuất hiện ở viền mép trên và dưới, giữ cho toàn bộ phần trung tâm của video hoàn toàn thông thoáng và rõ ràng 100%.
    - Thiết lập nền thẻ về `#020617` khi video phát để triệt tiêu hiện tượng lọt sáng gradient thẻ phía sau, kết hợp viền neon cyan phản quang rực rỡ `0 0 25px rgba(56, 189, 248, 0.6)`.
    - Tự động ẩn hoàn toàn Watermark nền (`opacity-0`) khi hover để không che khuất hình ảnh video.
- **2. Tối Ưu Hóa Tốc Độ Sóng Trắng Khởi Đầu (Rapid Opening Ripple)**:
  - Tinh chỉnh thời lượng hiệu ứng sóng trắng tròn bùng nổ từ `1.25s` xuống **`0.85s`**, tạo hiệu ứng mở màn chớp nhoáng đầy năng lượng rồi nhường trọn không gian cho video sắc nét.
  - Tăng độ tương phản cho tiêu đề và tên viết tắt `CLP` bằng viền bóng chữ đen sâu `drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]` và ánh sáng phát quang neon cyan `textShadow: 0 0 16px #38bdf8`.
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Next.js dev server biên dịch hoàn tất thành công (200 OK).
  - Server Next.js phản hồi **HTTP 200 OK**.


---

## [2.55.0] - 2026-10-25
### Nâng Cấp Hệ Thống Responsive Toàn Diện: Chống Tràn Chữ & Chống Lệch Bố Cục UI/UX
- **1. Triển Khai Bộ Quy Chuẩn Chống Tràn Chữ (Text Overflow Shield)**:
  - Cập nhật [src/styles/globals.css](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/globals.css):
    - Khởi tạo quy tắc tự động ngắt dòng tự nhiên `overflow-wrap: break-word !important; word-wrap: break-word;` cho toàn bộ các thẻ văn bản (`p`, `span`, `h1`-`h6`, `li`, `a`, `label`, `blockquote`, `th`, `td`).
    - Tích hợp chuẩn CSS hiện đại: `text-wrap: balance` cho các cấp tiêu đề (`h1` - `h6`) triệt tiêu hiện tượng rớt chữ mồ côi (orphan words); `text-wrap: pretty` cho đoạn văn `p` giúp dàn trang đều đặn, không bị lởm chởm.
    - Kích hoạt Fluid Typography với hàm `clamp()` trên màn hình mobile (`max-width: 639px`), tự động co giãn kích thước font theo tỉ lệ chiều rộng màn hình, triệt tiêu nguy cơ tiêu đề dài làm vỡ khung Card.
- **2. Khắc Phục Triệt Để Hiện Tượng Lệch Giao Diện & Bị Cắt Khối (Layout Distortion Shield)**:
  - Cập nhật [src/app/page.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx):
    - Chuyển đổi chiều cao root từ `100vh` sang `100dvh` (Dynamic Viewport Height) cho `#app-root-layout`, tương thích hoàn hảo với thanh địa chỉ tự co/giãn của trình duyệt mobile (iOS Safari & Android Chrome), không còn bị che khuất Footer.
    - Loại bỏ hoàn toàn thuộc tính hạn chế `lg:overflow-hidden` tại `#content-display` trên các trang: Đảm bảo mọi nội dung luôn có thể cuộn dọc mượt mà (`overflow-y-auto`) trên các màn hình laptop có tỷ lệ thu phóng (125%, 150%) hoặc độ phân giải 1366x768, không bao giờ bị cắt cụt phần đáy thẻ.
    - Đồng bộ độ rộng co giãn thông minh `max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)]` cho cả **Header**, **Center Card** và **Footer** ([src/components/layout/Header.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Header.tsx), [src/components/layout/Footer.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/layout/Footer.tsx)), tối ưu hóa không gian hiển thị trên điện thoại màn hình hẹp (360px - 430px).
- **3. Chuẩn Hóa Co Giãn Cho Banner Đứng Trên Thiết Bị Di Động**:
  - Cập nhật [src/components/views/SystemsView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx), [src/components/views/ProjectsView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ProjectsView.tsx), [src/components/views/InterviewView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/InterviewView.tsx):
    - Đưa `<aside>` của Banner Dọc về `w-full lg:w-[260px] min-w-0 lg:min-w-[260px] lg:max-w-[260px] shrink-0 h-auto lg:h-full`.
    - Cập nhật [src/styles/variables.css](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/styles/variables.css): bổ sung quy tắc `@media (max-width: 1023px)` thiết lập `aspect-ratio: auto !important; width: 100% !important; min-height: 200px !important;` giúp banner khi hiển thị trên mobile/tablet chuyển thành banner ngang toàn chiều rộng tự nhiên, loại bỏ khối 260px bị lệch.
  - Tích hợp `safe-area-inset` hỗ trợ các dòng máy có tai thỏ / Dynamic Island.
- **4. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).


---

## [2.56.0] - 2026-10-25
### Tích Hợp Element Lucian UX/UI #052: Thẻ Danh Thiếp Lãnh Đạo CSKH 3D (ExecutiveCard3D)
- **1. Lựa Chọn & Port Element Từ Kỹ Năng lucian-uxui**:
  - Chọn element: **#052 Flip-around membership card** thuộc danh mục *Cards & Content*.
  - Khởi tạo [src/components/ui/ExecutiveCard3D.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/ui/ExecutiveCard3D.tsx) tuân thủ giấy phép MIT License và quy chuẩn kiến trúc Next.js App Router ('use client').
  - **Mặt trước (Front Face)**:
    - Chip thẻ EMV ánh kim Gold Metallic cao cấp.
    - Dải quang phổ Holographic sheen phản chiếu theo góc nghiêng trỏ chuột và lực kéo (`mix-blend-mode: screen`).
    - Thông số thương hiệu: `HÙNG THÁI · C-LEVEL CX`, Hạng thẻ `EXECUTIVE VIP`, Mã số thẻ `1984 • 2002 • 2024 • 9999`, Tên chủ thẻ `NGUYỄN HÙNG THÁI`, Thời hạn `LIFETIME`.
  - **Mặt sau (Back Face)**:
    - Dải từ tính bảo mật đen sâu và chữ ký số an toàn `VIP 84`.
    - 3 Đặc quyền năng lực lãnh đạo (Core Perks): `22+ NĂM Kinh Nghiệm`, `99.4% SLA Cam Kết`, `AI & CX Tự Động Hóa`.
  - **Cơ chế tương tác vật lý 3D**:
    - Kéo vuốt (drag) xoay thẻ 3D tự do trên màn hình cảm ứng hoặc chuột với gia tốc quán tính thực và tự động snap vào mặt gần nhất khi nhả tay.
    - Nhấp hoặc nhấn phím Space / Enter để lật 180 độ.
    - Nút chức năng "Khóa thẻ / Mở khóa" chuyển thẻ sang thang độ xám (grayscale) với biểu tượng ổ khóa neon phát sáng bảo vệ thông tin.
- **2. Tích Hợp Vào Trang Liên Hệ (ContactView.tsx)**:
  - Cập nhật [src/components/views/ContactView.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ContactView.tsx):
    - Bổ sung Tab thứ 3 **"Danh thiếp 3D"** trong thanh Pill Tabs của Thẻ bên phải.
    - Bổ sung nút truy cập nhanh **"Thẻ 3D"** tại thanh Trust Panel của Thẻ bên trái.
    - Trang bị cụm thao tác nhanh: Sao chép Email, Gọi hotline `0908 559 884`, và chuyển sang mẫu gửi tin nhắn trực tiếp.
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).

---

## [2.57.0] - 2026-10-25
### Trang Kinh Nghiệm: Hiển Thị Logo Theo Chiều Dọc Ở Khung Bên Dưới (Timeline Detail Card)
- **1. Cập Nhật Bố Cục Logo Sản Phẩm Dọc (Vertical Logo Cluster)**:
  - Cập nhật [`src/components/views/ExperienceView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/ExperienceView.tsx):
    - Tại cụm Card thông tin Tier 3 ("Khung bên dưới" thẻ mốc thời gian trên Timeline Lịch sử công tác), chuyển đổi bố cục hiển thị nhóm logo sản phẩm (`item.products && item.products.length > 1`) từ dạng hàng ngang chồng lấn (`flex items-center -space-x-1.5`) sang bố cục cột dọc thanh thoát (`flex flex-col items-center justify-center -space-y-1.5`).
    - Bổ sung hiệu ứng viền nhẹ tinh tế `border border-slate-100 dark:border-white/10 shadow-xs`, cùng cơ chế hover mở rộng độc lập `hover:scale-120 hover:z-30 transition-all duration-200` giúp quét rõ từng thương hiệu / sản phẩm (Garena, Shopee, AirPay, Gcafe hoặc ECO SCC, Finviet) mà không che khuất nhau.
- **2. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Next.js dev server biên dịch hoàn tất thành công (200 OK).

---

## [2.58.0] - 2026-10-25
### Trang Hệ Thống (SystemsView): Thẻ CLP - Hiệu Ứng Sóng Tròn Trắng Từ Icon & Tự Động Phát Video Khi Rê Chuột
- **1. Hiệu Ứng Sóng Tròn Trắng Lan Tỏa Từ Icon (White Radial Ripple Wave)**:
  - Cập nhật [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
    - Khởi tạo hệ thống keyframes `@keyframes clp-ripple-wave` và `@keyframes clp-ring-pulse` mô phỏng 3 lớp sóng xung kích ánh sáng trắng (`clp-wave-1`, `clp-wave-2`, `clp-wave-3`) phát xuất chuẩn xác từ tọa độ tâm của Icon quà tặng ở góc dưới bên phải thẻ CLP.
    - Khi con trỏ rê vào (`onMouseEnter`), làn sóng trắng bùng nổ và lan tỏa phủ khắp toàn bộ thẻ với ánh sáng neon trắng cao cấp, tự động reset animation theo `clpHoverKey` mỗi lần tương tác.
- **2. Tích Hợp Video Nền Tự Động Phát (CLP Live Video Loop)**:
  - Tích hợp video stream chính thức từ CDN: `https://cdn.scena.ai/project/10223/fcec73d22dd54308ca9dde1590b8914ad92afdae78541e455cfba580ae02fc12.mp4` với chế độ `muted playsInline loop`.
  - Tự động kích hoạt phát lại từ giây đầu tiên (`currentTime = 0; play()`) khi rê chuột vào và tạm dừng (`pause()`) mượt mà khi rê chuột ra ngoài (`onMouseLeave`).
  - Bổ sung lớp scrim chuyển sắc bảo đảm các tiêu đề, tên viết tắt "CLP", tên đầy đủ "Customer Loyalty Program" và các nút hành động luôn đạt độ tương phản và sắc nét tối đa trên cả 2 giao diện Sáng Glass và Tối Neon.
  - Hiển thị Live Badge "VIDEO CLP" nhấp nháy phát sáng thời gian thực thay thế nút "Lật thẻ" trong thời gian video đang phát.
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Next.js dev server biên dịch hoàn tất thành công (200 OK).

---

## [2.59.0] - 2026-10-25
### Trang Hệ Thống (SystemsView): Tối Ưu Hóa Video Thẻ CLP Đạt Độ Trong Suốt & Sắc Nét Tối Đa
- **1. Tăng Cường Độ Trong Suốt & Độ Sáng Của Video (Crystal Clear Video Rendering)**:
  - Cập nhật [`src/components/views/SystemsView.tsx`](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/components/views/SystemsView.tsx):
    - Tăng độ mờ hiển thị video từ `opacity-90` lên **`opacity-100`** nguyên bản, bổ sung bộ lọc hình ảnh tăng cường `brightness-110 contrast-105` giúp mọi chi tiết trong video trở nên rực rỡ, sống động và sắc nét.
    - Loại bỏ hoàn toàn lớp phủ tối mờ dày (`from-slate-950/85 via-slate-950/45 to-slate-900/75`), thay bằng dải chuyển sắc siêu mỏng `bg-gradient-to-b from-black/50 via-transparent to-black/60` chỉ xuất hiện ở viền mép trên và dưới, giữ cho toàn bộ phần trung tâm của video hoàn toàn thông thoáng và rõ ràng 100%.
    - Thiết lập nền thẻ về `#020617` khi video phát để triệt tiêu hiện tượng lọt sáng gradient thẻ phía sau, kết hợp viền neon cyan phản quang rực rỡ `0 0 25px rgba(56, 189, 248, 0.6)`.
    - Tự động ẩn hoàn toàn Watermark nền (`opacity-0`) khi hover để không che khuất hình ảnh video.
- **2. Tối Ưu Hóa Tốc Độ Sóng Trắng Khởi Đầu (Rapid Opening Ripple)**:
  - Tinh chỉnh thời lượng hiệu ứng sóng trắng tròn bùng nổ từ `1.25s` xuống **`0.85s`**, tạo hiệu ứng mở màn chớp nhoáng đầy năng lượng rồi nhường trọn không gian cho video sắc nét.
  - Tăng độ tương phản cho tiêu đề và tên viết tắt `CLP` bằng viền bóng chữ đen sâu `drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]` và ánh sáng phát quang neon cyan `textShadow: 0 0 16px #38bdf8`.
- **3. Kiểm Thử & Nghiệm Thu**:
  - `pnpm exec tsc --noEmit` hoàn tất với **0 lỗi** (Exit Code 0).
  - Next.js dev server biên dịch hoàn tất thành công (200 OK).
