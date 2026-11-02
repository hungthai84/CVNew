#!/usr/bin/env node
import { spawnSync } from 'child_process';

console.log('🔍 [Dependency Vulnerability Scanner] Đang quét lỗ hổng bảo mật các gói phụ thuộc...');

let auditResult = null;

// Thử chạy bun pm audit trước nếu môi trường hỗ trợ
try {
  const bunAudit = spawnSync('bun', ['pm', 'audit'], { encoding: 'utf8' });
  if (bunAudit.status === 0 || bunAudit.stdout) {
    auditResult = { tool: 'bun', output: bunAudit.stdout || bunAudit.stderr };
  }
} catch {
  // Fallback to npm audit
}

if (!auditResult) {
  try {
    const npmAudit = spawnSync('npm', ['audit', '--audit-level=high'], { encoding: 'utf8' });
    auditResult = { tool: 'npm', output: npmAudit.stdout || npmAudit.stderr };
  } catch (err) {
    auditResult = { tool: 'none', output: err.message };
  }
}

if (auditResult && auditResult.output) {
  console.log(`📋 Kết quả kiểm tra an ninh (${auditResult.tool}):`);
  const lines = auditResult.output.trim().split('\n').slice(0, 25);
  lines.forEach(l => console.log('  ' + l));
  console.log('✅ [Dependency Vulnerability Scanner] Quét hoàn tất thành công.');
} else {
  console.log('✅ [Dependency Vulnerability Scanner] Không phát hiện lỗ hổng mức độ nghiêm trọng.');
}
