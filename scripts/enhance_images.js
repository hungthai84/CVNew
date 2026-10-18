const sharp = require('sharp');
const fs = require('fs');

async function enhance() {
  for (let i = 1; i <= 6; i++) {
    const name = 'ill-0' + i + '.png';
    const original = 'public/images/domains/' + name + '.bak';
    if (!fs.existsSync(original)) {
      continue;
    }
    
    const meta = await sharp(original).metadata();
    const targetW = 400;
    const targetH = Math.round(targetW * (meta.height / meta.width));
    
    // Create soft rounded fade mask to eliminate square card border artifacts
    const maskSvg = `<svg width="${targetW}" height="${targetH}">
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="56%">
          <stop offset="68%" stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="90%" stop-color="#ffffff" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${targetW}" height="${targetH}" rx="32" fill="url(#vignette)"/>
    </svg>`;

    const upscaledBuffer = await sharp(original)
      .resize({
        width: targetW,
        height: targetH,
        kernel: sharp.kernel.lanczos3
      })
      .sharpen({
        sigma: 1.5,
        m1: 1.2,
        m2: 2.6
      })
      .toBuffer();

    await sharp(upscaledBuffer)
      .composite([{
        input: Buffer.from(maskSvg),
        blend: 'dest-in'
      }])
      .png({ quality: 100, compressionLevel: 8 })
      .toFile('public/images/domains/' + name);
      
    console.log(name, `enhanced to ${targetW}x${targetH} with crisp lanczos3 and rounded alpha mask`);
  }
}

enhance().then(() => console.log('Done!')).catch(console.error);
