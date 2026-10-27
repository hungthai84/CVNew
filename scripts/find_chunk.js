const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('Luôn bên bạn') && content.includes('Tôi là trợ lý ảo')) {
        console.log('Found in chunk:', full, 'size:', stat.size);
      }
    }
  }
}

searchDir('.next');
