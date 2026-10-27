# THEME REGISTRY: HỆ THỐNG GIAO DIỆN HỢP NHẤT
**Dự án:** Hung Thai Executive Portal  
**Quản lý cơ chế:** Change UI Modal & Persistent Storage  
**Phiên bản:** 2.0.0 — Multi-Theme Governance  

---

## 1. DANH SÁCH THEME CHÍNH THỨC (OFFICIAL REGISTERED THEMES)

Hệ thống hỗ trợ 4 theme hoàn chỉnh, độc lập và tương thích 100% với nhau:

| Theme ID | Tên Tiếng Anh | Tên Tiếng Việt | Vai Trò | Thuộc Tính DOM | Nền Chủ Đạo | Màu Nhấn |
|---|---|---|---|---|---|---|
| `light-glass` | **Glass UI Light Multicolor** | Kính sáng đa sắc | **Mặc định & Cốt lõi** | `data-theme="light-glass"` | Lavender `#F5F3FF` + Trắng ngà | Blue Clay `#60A5FA` |
| `luminous-glass` | **NDesign Luminous Glass Showcase** | Kính sáng quang phổ | Phong cách Codepen NDesign | `data-theme="luminous-glass"` | Mesh radial gradient (Cyan/Pink/Purple/Green) | Vivid Sky Cyan `#38BDF8` |
| `light-glass-dashboard` | **Light Glass Multicolor Dashboard** | Kính sáng Dashboard | Dashboard Kính Hiện Đại | `data-theme="light-glass-dashboard"` | Ice Blue `#EAF4FF` + Lavender | Cyan `#22C1DC` |
| `flat-rainbow` | **Flat UI Light Multicolor** | Phẳng sáng đa sắc | Tùy chọn phẳng tối giản | `data-theme="flat-rainbow"` | Trắng sữa `#F8FAFF` | Emerald Green `#34D399` |
| `dark-neon` | **Glass UI Dark Neon Multicolor** | Kính tối Neon | Tùy chọn nền tối vũ trụ | `data-theme="dark-neon"` + `.dark` | Nền đen sâu `#070A14` | Neon Purple `#A855F7` |

---

## 2. KIẾN TRÚC QUẢN LÝ VÀ CHUYỂN ĐỔI THEME (THEME ARCHITECTURE)

### 2.1. State Management & Chuyển Đổi Tập Trung
- `currentTheme: SiteTheme` được quản lý ở tầng gốc tại [src/app/page.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/page.tsx).
- Truyền đồng bộ xuống toàn bộ thành phần:
  - `<Header currentTheme={currentTheme} />`: Tự động nhận diện theme để kích hoạt gradient capsule hoặc glowing neon tab.
  - `<FloatingIcons theme={currentTheme} />`: Tự kích hoạt `neonGlow` tương ứng khi ở `dark-neon`.
  - `<Footer currentTheme={currentTheme} />`: Đồng bộ dock bóng mờ hoặc viền neon cyan.
  - `<ThemeSelectorModal />`: Hiển thị 4 thẻ xem trước sống động, cho phép chuyển đổi 1-click tức thì.

### 2.2. Cơ Chế Lưu Trữ Kép Bền Vững (Dual Persistence Keys)
Mỗi khi người dùng chọn theme mới, hệ thống tự động ghi nhận tức thì vào `localStorage`:
```typescript
localStorage.setItem('portfolio-theme', newTheme);
localStorage.setItem('hungthai_site_theme', newTheme);
```

### 2.3. Lá Chắn Ngăn Ngừa Chớp Nháy (FOUC Hydration Shield)
Trong [src/app/layout.tsx](file:///c:/Users/My%20Profile/.gemini/antigravity/scratch/cvnew/src/app/layout.tsx), một đoạn inline script được thực thi ngay trong `<head>` trước khi quá trình render bắt đầu:
```javascript
(function() {
  try {
    var saved = localStorage.getItem('portfolio-theme') || localStorage.getItem('hungthai_site_theme') || 'light-glass';
    document.documentElement.setAttribute('data-theme', saved);
    if (saved === 'dark-neon') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
```

### 2.4. Hiệu Ứng Chuyển Cảnh Khí Quyển (Ambient Theme Shift)
- Khi chuyển đổi giữa các theme, lớp phủ quang phổ mềm `.theme-vivid-overlay` kích hoạt trong 750ms với hiệu ứng mờ nhòe nhẹ, bảo đảm quá trình biến đổi màu sắc diễn ra êm ái, thị giác người dùng không bị chói hoặc giật khung hình.

---

## 3. NGUYÊN TẮC BẢO TOÀN THEME CŨ KHI BỔ SUNG THEME MỚI
1. **Không can thiệp CSS Global**: Mọi token màu sắc, bề mặt kính và biến thể card của theme mới phải được bao bọc dưới selector `[data-theme="..."]`.
2. **Kế thừa và Fallback an toàn**: Nếu một component không có styling riêng cho theme mới, component đó phải tự động kế thừa style từ hệ thống token chung mà không bị vỡ bố cục.
3. **Phân cấp Typography**: Theme tối (`dark-neon`) bắt buộc có các lớp ghi đè màu chữ (`#F8FAFC`, `#CBD5E1`) để không bị hiện tượng chữ tối trên nền tối.
4. **Kiểm thử đa theme**: Trước khi xuất xưởng, bắt buộc phải duyệt qua cả 4 theme để đảm bảo không có rò rỉ style (style leakage) giữa các theme.
