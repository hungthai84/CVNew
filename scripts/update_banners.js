const fs = require('fs');
const path = require('path');

// Helper to ensure HeroBanner is imported
function ensureHeroBannerImport(content) {
  if (content.includes("from '@/components/ui/HeroBanner'")) {
    return content;
  }
  return content.replace(
    /import { WebIcon } from '@\/components\/ui\/WebIcon';/,
    "import { WebIcon } from '@/components/ui/WebIcon';\nimport { HeroBanner } from '@/components/ui/HeroBanner';"
  );
}

// 1. ExperienceView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/ExperienceView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const startMarker = '{/* =====================================================================\n          1. TOP HERO BANNER (Hành trình Kiến Tạo Giá Trị Khách Hàng)';
  const endMarker = '{/* =====================================================================\n          2. SECTION HEADER & SEARCH BAR: Lịch Sử Công Tác';
  
  const sIdx = code.indexOf(startMarker);
  const eIdx = code.indexOf(endMarker);
  
  if (sIdx !== -1 && eIdx !== -1) {
    const banner = `      {/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Hành trình"
        title="Hành Trình Sự Nghiệp & Đóng Góp"
        subtitle="Hơn 22 năm cống hiến – Vận hành chuẩn mực & Kiến tạo giá trị bền vững"
        quote="“Khách hàng là trung tâm – Tạo giá trị bền vững.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-blue-600"
      />\n\n      `;
    code = code.slice(0, sIdx) + banner + code.slice(eIdx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated ExperienceView.tsx');
  } else {
    console.log('Could not find markers in ExperienceView.tsx', sIdx, eIdx);
  }
} catch (e) {
  console.error('Error ExperienceView:', e);
}

// 2. SystemsView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/SystemsView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const target = `{/* HERO TITLE & VIDEO CIRCLE WIDGET */}`;
  const tIdx = code.indexOf(target);
  if (tIdx !== -1) {
    // Find the end of this div (around line 270)
    const endDivIdx = code.indexOf('{/* FILTER NAVIGATION & SEARCH CONTROLS */}');
    if (endDivIdx !== -1) {
      const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
        <HeroBanner
          badgeText="Kiến trúc"
          title="Kiến Trúc Hệ Thống & Tự Động Hóa"
          subtitle="PowerService – Hạ tầng công nghệ và cổng phần mềm quản trị số hoá tập trung"
          quote="“Số hóa quy trình – Tự động hóa vận hành toàn diện.”"
          quoteAuthor="— Nguyễn Hùng Thái"
          badgeColor="text-indigo-600"
        />\n\n        `;
      code = code.slice(0, tIdx) + banner + code.slice(endDivIdx);
      fs.writeFileSync(p, code, 'utf8');
      console.log('Updated SystemsView.tsx');
    }
  }
} catch (e) {
  console.error('Error SystemsView:', e);
}

// 3. AboutView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/AboutView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* 1. TOP HEADER / BREADCRUMB BAR */}';
  const marker2 = '{/* 2. MAIN TOP SECTION (HERO PORTRAIT + THÔNG TIN CÁ NHÂN) */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Giới thiệu"
        title="Chân Dung & Tầm Nhìn Quản Trị"
        subtitle="Nguyễn Hùng Thái – Chuyên gia Quản trị Trải nghiệm Khách hàng & Vận hành CSKH"
        quote="“Lãnh đạo bằng sự thấu cảm, tối ưu hóa hiệu suất và gắn kết con người.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-blue-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated AboutView.tsx');
  }
} catch (e) {
  console.error('Error AboutView:', e);
}

// 4. ContactView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/ContactView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* Tiêu đề thẻ chính chuẩn hóa */}';
  const marker2 = '{/* 1. HAI CARD CHÍNH CĂN ĐỀU CHIỀU CAO */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Liên hệ"
        title="Kết Nối Hợp Tác & Cơ Hội Mới"
        subtitle="Sẵn sàng đồng hành cùng Doanh nghiệp nâng tầm Dịch vụ Khách hàng"
        quote="“Sẵn sàng kết nối – Kiến tạo tương lai dịch vụ xuất sắc.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-teal-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated ContactView.tsx');
  }
} catch (e) {
  console.error('Error ContactView:', e);
}

// 5. InterviewView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/InterviewView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* Tiêu đề thẻ chính chuẩn hóa */}';
  const marker2 = '{/* Filter Tabs */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Đối thoại"
        title="Bộ Câu Hỏi Phỏng Vấn & Xử Lý Tình Huống"
        subtitle="Tương tác trực tiếp – Giải pháp thực chiến – Đo lường hiệu quả vượt trội"
        quote="“Đối thoại chân thực khẳng định bản lĩnh và năng lực quản trị.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-pink-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated InterviewView.tsx');
  }
} catch (e) {
  console.error('Error InterviewView:', e);
}

// 6. MemoriesView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/MemoriesView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* Tiêu đề thẻ chính chuẩn hóa */}';
  const marker2 = '{/* KPI Stats Overview Bar */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Kỷ niệm"
        title="Khoảnh Khắc Kỷ Niệm & Thư Viện Thực Chiến"
        subtitle="Lưu giữ những khoảnh khắc tự hào trên hành trình hơn 22 năm cống hiến"
        quote="“Khoảnh khắc tự hào lưu giữ hành trình cống hiến thực chiến.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-rose-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated MemoriesView.tsx');
  }
} catch (e) {
  console.error('Error MemoriesView:', e);
}

// 7. LetterView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/LetterView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* Tiêu đề thẻ chính chuẩn hóa */}';
  const marker2 = '{/* ========================================================================= */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Thư ngỏ"
        title="Thư Ngỏ Đối Tác & Tầm Nhìn Chiến Lược"
        subtitle="Thông điệp hợp tác – Định hướng phát triển bền vững cùng doanh nghiệp"
        quote="“Trải nghiệm hôm nay kiến tạo giá trị bền vững ngày mai.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-rose-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated LetterView.tsx');
  }
} catch (e) {
  console.error('Error LetterView:', e);
}

// 8. HoroscopeView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/HoroscopeView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* Tiêu đề thẻ chính chuẩn hóa */}';
  const marker2 = '{/* Cột điều khiển & Bộ lọc con giáp */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Phong thủy"
        title="Tử Vi Tương Hợp & Năng Lượng Phong Thủy"
        subtitle="Cung mệnh Giáp Tý 1984 – Hải Trung Kim – Hòa hợp nhân duyên & phát triển sự nghiệp"
        quote="“Thiên thời – Địa lợi – Nhân hòa: Hòa khí sinh tài, đồng tâm đắc lợi.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-fuchsia-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated HoroscopeView.tsx');
  }
} catch (e) {
  console.error('Error HoroscopeView:', e);
}

// 9. WallpaperView.tsx
try {
  const p = path.join(__dirname, '../src/components/views/WallpaperView.tsx');
  let code = fs.readFileSync(p, 'utf8');
  code = ensureHeroBannerImport(code);
  
  const marker1 = '{/* Tiêu đề thẻ chính chuẩn hóa */}';
  const marker2 = '{/* Thanh công cụ: Thêm hình nền, Nhập JSON, Xuất JSON */}';
  const m1Idx = code.indexOf(marker1);
  const m2Idx = code.indexOf(marker2);
  if (m1Idx !== -1 && m2Idx !== -1) {
    const banner = `{/* 1. TOP HERO BANNER (ĐỒNG BỘ CHUẨN FORM TRANG LĨNH VỰC) */}
      <HeroBanner
        badgeText="Hình nền"
        title="Bộ Sưu Tập Hình Nền & Tùy Biến Giao Diện"
        subtitle="Tùy biến phong cách đa dạng – Video động, Ảnh chất lượng cao & Gradient nghệ thuật"
        quote="“Nhấp 1 lần xem thử • Nhấp đúp lưu làm Mặc Định lâu dài.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-fuchsia-600"
      />\n\n      `;
    code = code.slice(0, m1Idx) + banner + code.slice(m2Idx);
    fs.writeFileSync(p, code, 'utf8');
    console.log('Updated WallpaperView.tsx');
  }
} catch (e) {
  console.error('Error WallpaperView:', e);
}

console.log('All views banner update completed.');
