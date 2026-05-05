/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'lib', 'img');

const MAX_WIDTH = 1600;

/**
 * Canonical hero aspect ratio shared by all currencies. The EUR hero is the
 * source of truth — we read its dimensions and crop every other hero / per-
 * denomination photo to match. That way:
 *  - the hero box never jumps when switching between badges within a tab, and
 *  - the hero box never jumps when switching between currency tabs.
 */
const EUR_HERO_PATH = path.join(ROOT, 'Wrapper_EURO', 'ALL.png');

/**
 * Per-currency configuration. Each currency has:
 *  - a `dir` containing the per-denomination source images and an output webp
 *    folder where the optimized files are written
 *  - `hero` source/output filenames (input may be PNG or WEBP)
 *  - `denominations` mapping source filenames → output webp filenames; can be
 *    omitted if the currency has no per-denomination photos.
 */
const currencies = [
  {
    name: 'EUR',
    dir: path.join(ROOT, 'Wrapper_EURO'),
    sourceSubdir: 'Horiz',
    hero: { src: 'ALL.png', out: 'All.webp' },
    denominations: [
      { src: '500_h.png', out: '500.webp' },
      { src: '1000_h.png', out: '1000.webp' },
      { src: '2000_h.png', out: '2000.webp' },
      { src: '5000_h.png', out: '5000.webp' },
      { src: '10000_h.png', out: '10000.webp' },
      { src: '20000_h.png', out: '20000.webp' },
      { src: '50000_h.png', out: '50000.webp' },
    ],
  },
  {
    name: 'CZK',
    dir: path.join(ROOT, 'CZ'),
    sourceSubdir: '.',
    hero: { src: 'MAIN.png', out: 'MAIN.webp' },
    denominations: [
      { src: '10000.png', out: '10000.webp' },
      { src: '20000.png', out: '20000.webp' },
      { src: '50000.png', out: '50000.webp' },
      { src: '100000.png', out: '100000.webp' },
      { src: '200000.png', out: '200000.webp' },
      { src: '500000.png', out: '500000.webp' },
    ],
  },
  {
    name: 'UAH',
    dir: path.join(ROOT, 'UAH'),
    sourceSubdir: '.',
    hero: { src: 'Main.png', out: 'Main.webp' },
    denominations: [],
  },
  {
    name: 'CUSTOM',
    dir: path.join(ROOT, 'CUSTOM_EUR'),
    sourceSubdir: '.',
    hero: { src: 'All.png', out: 'All.webp' },
    denominations: [
      { src: '1000.png', out: '1000.webp' },
      { src: '2000.png', out: '2000.webp' },
      { src: '5000.png', out: '5000.webp' },
      { src: '10000.png', out: '10000.webp' },
      { src: '20000.png', out: '20000.webp' },
      { src: '50000.png', out: '50000.webp' },
    ],
  },
];

async function ensureWebp(srcPath, outPath, opts = {}) {
  const { cropAspect, maxWidth = MAX_WIDTH } = opts;
  if (!fs.existsSync(srcPath)) {
    console.log(`  Skip (missing): ${path.relative(ROOT, srcPath)}`);
    return null;
  }

  const meta = await sharp(srcPath).metadata();
  const srcW = meta.width || 0;
  const srcH = meta.height || 0;

  let pipeline = sharp(srcPath);
  let cropW = srcW;
  let cropH = srcH;

  if (cropAspect && srcW > 0 && srcH > 0) {
    const srcAspect = srcW / srcH;
    if (srcAspect < cropAspect) {
      cropH = Math.round(srcW / cropAspect);
      const top = Math.max(0, Math.round((srcH - cropH) / 2));
      pipeline = pipeline.extract({ left: 0, top, width: srcW, height: cropH });
    } else if (srcAspect > cropAspect) {
      cropW = Math.round(srcH * cropAspect);
      const left = Math.max(0, Math.round((srcW - cropW) / 2));
      pipeline = pipeline.extract({ left, top: 0, width: cropW, height: srcH });
    }
  }

  const targetWidth = Math.min(cropW, maxWidth);
  await pipeline
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outPath);

  const inSize = fs.statSync(srcPath).size;
  const outSize = fs.statSync(outPath).size;
  console.log(
    `  ${path.basename(srcPath).padEnd(18)} ${srcW}x${srcH}` +
      (cropAspect ? ` -> crop ${cropW}x${cropH}` : '') +
      ` -> ${targetWidth}px wide   ${(inSize / 1024).toFixed(0)} KB -> ${(outSize / 1024).toFixed(0)} KB   =>  ${path.basename(outPath)}`
  );
}

(async () => {
  if (!fs.existsSync(EUR_HERO_PATH)) {
    console.error(`EUR reference hero not found: ${EUR_HERO_PATH}`);
    process.exit(1);
  }
  const eurMeta = await sharp(EUR_HERO_PATH).metadata();
  const HERO_ASPECT = (eurMeta.width || 1) / (eurMeta.height || 1);
  console.log(
    `Canonical hero aspect: ${HERO_ASPECT.toFixed(4)} (${eurMeta.width}x${eurMeta.height}, ${path.basename(EUR_HERO_PATH)})\n`
  );

  for (const cur of currencies) {
    console.log(`=== ${cur.name} (${path.relative(ROOT, cur.dir)}) ===`);

    const heroSrcPath = path.join(cur.dir, cur.hero.src);
    const heroOutPath = path.join(cur.dir, cur.hero.out);
    if (heroSrcPath !== heroOutPath) {
      await ensureWebp(heroSrcPath, heroOutPath, { cropAspect: HERO_ASPECT });
    }

    const denomSrcDir = cur.sourceSubdir === '.' ? cur.dir : path.join(cur.dir, cur.sourceSubdir);
    for (const d of cur.denominations) {
      const srcPath = path.join(denomSrcDir, d.src);
      const outPath = path.join(cur.dir, d.out);
      await ensureWebp(srcPath, outPath, { cropAspect: HERO_ASPECT });
    }
    console.log('');
  }
})();
