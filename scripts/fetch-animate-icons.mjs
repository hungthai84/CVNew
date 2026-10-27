import fs from 'node:fs';
import path from 'node:path';

const icons = [
  'bell',
  'volume-2',
  'volume-x',
  'rotate-cw',
  'sparkles',
  'play',
  'pause',
  'settings',
  'user',
  'home',
  'chevron-right',
  'arrow-right',
  'check'
];

const targetDir = path.resolve('src/components/animate-ui/icons');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadIcon(iconName) {
  const url = `https://animate-ui.com/r/icons-lucide-${iconName}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${iconName}: ${res.status}`);
      return false;
    }
    const data = await res.json();
    if (data.files && data.files.length > 0) {
      const file = data.files[0];
      const filePath = path.join(targetDir, `${iconName}.tsx`);
      fs.writeFileSync(filePath, file.content, 'utf8');
      console.log(`Saved: ${filePath}`);
      return true;
    }
  } catch (err) {
    console.error(`Error fetching ${iconName}:`, err.message);
  }
  return false;
}

async function main() {
  console.log('Fetching Animate UI Icons...');
  for (const icon of icons) {
    await downloadIcon(icon);
  }
  console.log('Done!');
}

main();
