#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🛡️ [Lockfile Integrity Guard] Đang kiểm tra tính toàn vẹn của package.json và bun.lock...');

let hasError = false;

// 1. Kiểm tra package.json
const pkgPath = path.join(rootDir, 'package.json');
let pkgData = null;
try {
  const pkgRaw = fs.readFileSync(pkgPath, 'utf8');
  pkgData = JSON.parse(pkgRaw);
  console.log('  ✅ package.json: Cú pháp JSON hợp lệ 100%.');
} catch (err) {
  console.error('  ❌ package.json: LỖI CÚ PHÁP JSON!', err.message);
  hasError = true;
}

// 2. Kiểm tra bun.lock
const lockPath = path.join(rootDir, 'bun.lock');
let lockData = null;
if (!fs.existsSync(lockPath)) {
  console.error('  ❌ bun.lock: Không tìm thấy tệp bun.lock!');
  hasError = true;
} else {
  try {
    const lockRaw = fs.readFileSync(lockPath, 'utf8');
    lockData = JSON.parse(lockRaw);
    console.log('  ✅ bun.lock: Cú pháp Strict JSON hợp lệ 100% (không lỗi dấu phẩy thừa).');
  } catch (err) {
    console.error('  ❌ bun.lock: LỖI CÚ PHÁP STRICT JSON!', err.message);
    hasError = true;
  }
}

// 3. Đối chiếu đồng bộ giữa package.json và bun.lock
if (pkgData && lockData) {
  const rootWorkspace = lockData.workspaces && lockData.workspaces[''];
  if (rootWorkspace) {
    const lockDeps = Object.keys(rootWorkspace.dependencies || {});
    const pkgDeps = Object.keys(pkgData.dependencies || {});
    const missingDeps = pkgDeps.filter(d => !lockDeps.includes(d));

    if (missingDeps.length > 0) {
      console.warn('  ⚠️ Cảnh báo: Các gói chưa có trong bun.lock:', missingDeps.join(', '));
    } else {
      console.log(`  ✅ Đối chiếu: Toàn bộ ${pkgDeps.length} dependencies đã được khóa chuẩn xác trong bun.lock.`);
    }
  }
}

if (hasError) {
  console.error('🚨 [Lockfile Integrity Guard] Phát hiện lỗi. Vui lòng sửa trước khi deploy!');
  process.exit(1);
} else {
  console.log('🎉 [Lockfile Integrity Guard] Kiểm tra hoàn tất thành công. Sẵn sàng Deploy!');
  process.exit(0);
}
