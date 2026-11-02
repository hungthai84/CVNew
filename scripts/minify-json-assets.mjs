#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('⚡ [Static Asset Minifier] Đang tối ưu hóa dung lượng các tệp JSON tĩnh...');

const targetFiles = [
  'all_custom_cloudinary.json',
  'cloudinary_resources.json',
];

let totalSavedBytes = 0;

targetFiles.forEach((fileName) => {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  try {
    const originalRaw = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(originalRaw, 'utf8');

    // Parse và serialize lại không có khoảng trắng thừa
    const parsed = JSON.parse(originalRaw);
    const minified = JSON.stringify(parsed);
    const minifiedSize = Buffer.byteLength(minified, 'utf8');

    const saved = originalSize - minifiedSize;
    if (saved > 0) {
      fs.writeFileSync(filePath, minified, 'utf8');
      totalSavedBytes += saved;
      const percent = ((saved / originalSize) * 100).toFixed(1);
      console.log(`  📦 ${fileName}: ${(originalSize / 1024).toFixed(1)}KB ➔ ${(minifiedSize / 1024).toFixed(1)}KB (giảm ${percent}%, tiết kiệm ${(saved / 1024).toFixed(1)}KB)`);
    } else {
      console.log(`  📦 ${fileName}: Đã ở trạng thái nén tối ưu (${(originalSize / 1024).toFixed(1)}KB).`);
    }
  } catch (err) {
    console.warn(`  ⚠️ Bỏ qua ${fileName} do lỗi:`, err.message);
  }
});

console.log(`✨ [Static Asset Minifier] Hoàn thành! Tổng dung lượng tiết kiệm: ${(totalSavedBytes / 1024).toFixed(1)}KB.`);
