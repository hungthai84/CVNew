const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');
console.log(`Checking ${files.length} files...`);

files.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineIdx) => {
    if (line.includes('<svg')) {
      // check if w- or h- or width/height or className is present
      const hasW = line.includes('w-') || line.includes('width') || line.includes('w=[');
      const hasH = line.includes('h-') || line.includes('height') || line.includes('h=[');
      if (!hasW || !hasH) {
        console.log(`Potential issue at ${f}:${lineIdx + 1} -> ${line.trim()}`);
      }
    }
  });
});
