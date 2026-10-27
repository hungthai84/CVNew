import net from 'net';
import os from 'os';
import { execSync, spawn } from 'child_process';
import qrcodeTerminal from 'qrcode-terminal';

const DEFAULT_PORT = 3001;

// Lấy IPv4 cục bộ trong mạng Wi-Fi/Ethernet
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Kiểm tra xem cổng có đang mở/rỗi không
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      resolve(false);
    });
    server.once('listening', () => {
      server.close(() => {
        resolve(true);
      });
    });
    server.listen(port, '0.0.0.0');
  });
}

// Tìm PID chiếm giữ cổng trên Windows
function findProcessOnPort(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const lines = output.trim().split('\n');
    for (const line of lines) {
      if (line.includes('LISTENING') && line.includes(`:${port}`)) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(parseInt(pid, 10)) && parseInt(pid, 10) !== process.pid) {
          return parseInt(pid, 10);
        }
      }
    }
  } catch {
    // Không tìm thấy
  }
  return null;
}

// Giải phóng tiến trình chiếm cổng
function killProcessByPid(pid) {
  try {
    execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Smart Port Conflict Resolver: Giải phóng cổng hoặc chuyển sang cổng rỗi tiếp theo
async function resolvePort(preferredPort) {
  let port = preferredPort;
  let available = await isPortAvailable(port);

  if (available) {
    return port;
  }

  console.log(`\x1b[33m[Smart Port Resolver]\x1b[0m Cổng ${port} đang bị chiếm dụng. Đang kiểm tra tiến trình...`);
  const conflictingPid = findProcessOnPort(port);

  if (conflictingPid) {
    console.log(`\x1b[33m[Smart Port Resolver]\x1b[0m Phát hiện PID ${conflictingPid} đang chiếm cổng ${port}. Tiến hành giải phóng cổng...`);
    const killed = killProcessByPid(conflictingPid);
    if (killed) {
      // Đợi 800ms để hệ điều hành nhả cổng hoàn toàn
      await new Promise((r) => setTimeout(r, 800));
      available = await isPortAvailable(port);
      if (available) {
        console.log(`\x1b[32m[Smart Port Resolver]\x1b[0m Đã giải phóng cổng ${port} thành công!\x1b[0m`);
        return port;
      }
    }
  }

  // Nếu không giải phóng được cổng 3001, tự động tìm cổng rỗi dự phòng tiếp theo
  console.log(`\x1b[33m[Smart Port Resolver]\x1b[0m Đang tìm cổng dự phòng rỗi tiếp theo...`);
  for (let candidate = preferredPort + 1; candidate < preferredPort + 20; candidate++) {
    if (await isPortAvailable(candidate)) {
      console.log(`\x1b[36m[Smart Port Resolver]\x1b[0m Chuyển thông minh sang cổng dự phòng rỗi: \x1b[1m${candidate}\x1b[0m`);
      return candidate;
    }
  }

  return preferredPort;
}

// Hiển thị mã QR và thông tin mạng
function printNetworkQr(port) {
  const localIp = getLocalIpAddress();
  const localUrl = `http://localhost:${port}`;
  const networkUrl = `http://${localIp}:${port}`;

  console.log('\n\x1b[36m╔════════════════════════════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[36m║\x1b[0m  \x1b[1m\x1b[35mHÙNG THÁI EXECUTIVE PORTAL - LOCAL NETWORK DEBUG QR CODE\x1b[0m          \x1b[36m║\x1b[0m');
  console.log('\x1b[36m╠════════════════════════════════════════════════════════════════════╣\x1b[0m');
  console.log(`\x1b[36m║\x1b[0m  \x1b[32m● Local Access:\x1b[0m    \x1b[4m${localUrl}\x1b[0m`);
  console.log(`\x1b[36m║\x1b[0m  \x1b[33m● Network Access:\x1b[0m  \x1b[1m\x1b[4m${networkUrl}\x1b[0m`);
  console.log('\x1b[36m║\x1b[0m  \x1b[90mQuét mã QR dưới đây bằng camera điện thoại trên cùng Wi-Fi:\x1b[0m        \x1b[36m║\x1b[0m');
  console.log('\x1b[36m╚════════════════════════════════════════════════════════════════════╝\x1b[0m\n');

  qrcodeTerminal.generate(networkUrl, { small: true }, (qr) => {
    console.log(qr);
  });
}

async function startServer() {
  const port = await resolvePort(DEFAULT_PORT);
  printNetworkQr(port);

  console.log(`\x1b[32m🚀 Đang khởi động Next.js Dev Server trên cổng ${port}...\x1b[0m\n`);

  const isWin = process.platform === 'win32';
  const bin = isWin ? 'pnpm.cmd' : 'pnpm';
  const args = ['exec', 'next', 'dev', '-p', String(port)];

  const nextProcess = spawn(bin, args, {
    stdio: 'inherit',
    shell: false,
    env: { ...process.env, PORT: String(port) },
  });

  nextProcess.on('error', (err) => {
    console.error(`\x1b[31m[Dev Server Error]\x1b[0m ${err.message}`);
  });

  const cleanup = () => {
    try {
      nextProcess.kill('SIGINT');
    } catch {}
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

startServer();
