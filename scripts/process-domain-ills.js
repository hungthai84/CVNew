const sharp = require('sharp');
const path = require('path');

async function processAllFlawless() {
  const dir = path.join(__dirname, '../public/images/domains');

  for (let i = 1; i <= 6; i++) {
    const input = path.join(dir, `ill-0${i}.png.bak`);
    const output = path.join(dir, `ill-0${i}.png`);
    const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
    const { width, height } = info;
    const outData = Buffer.from(data);

    // 1. Specific repairs:
    if (i === 6) {
      // Infill the bottom-left corner where old button was cut
      for (let y = 62; y < height; y++) {
        for (let x = 0; x < 33; x++) {
          const idx = (y * width + x) * 4;
          const refIdx = (y * width + 33) * 4;
          outData[idx] = outData[refIdx];
          outData[idx + 1] = outData[refIdx + 1];
          outData[idx + 2] = outData[refIdx + 2];
          // Smooth fade out towards left edge
          outData[idx + 3] = Math.round(outData[refIdx + 3] * (x / 33));
        }
      }
    }

    if (i === 2) {
      // Fade out top-right corner artifact if any
      for (let y = 0; y < 15; y++) {
        for (let x = width - 15; x < width; x++) {
          const idx = (y * width + x) * 4;
          const factor = (width - 1 - x) / 15;
          outData[idx + 3] = Math.round(outData[idx + 3] * factor);
        }
      }
    }

    // 2. High-precision 4x upscale using Lanczos3 + Sharpen
    const targetW = width * 4;
    const targetH = height * 4;

    await sharp(outData, { raw: { width, height, channels: 4 } })
      .resize(targetW, targetH, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .sharpen({ sigma: 1.15, m1: 1.7, m2: 2.3 })
      .png({ compressionLevel: 9 })
      .toFile(output);

    console.log(`Generated flawless ill-0${i}.png (${targetW}x${targetH})`);
  }
}

processAllFlawless().catch(console.error);
