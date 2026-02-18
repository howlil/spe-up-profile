/**
 * Konversi PNG → WebP saja.
 * Scan public/, tulis file .webp di folder yang sama (nama sama, ekstensi .webp).
 * Setelah berhasil, file .png asli dihapus.
 *
 * Jalankan: pnpm run optimize:images
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getPngFiles(dir: string, list: string[] = []): string[] {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      getPngFiles(full, list);
    } else if (e.isFile() && path.extname(e.name).toLowerCase() === '.png') {
      list.push(full);
    }
  }
  return list;
}

async function main() {
  console.log('🔍 Mencari file .png di public/ ...\n');
  const files = getPngFiles(PUBLIC_DIR);
  console.log(`   Ditemukan ${files.length} file PNG.\n`);

  if (files.length === 0) {
    console.log('   Tidak ada file PNG.');
    return;
  }

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const filePath of files) {
    const dir = path.dirname(filePath);
    const base = path.basename(filePath, '.png');
    const outPath = path.join(dir, `${base}.webp`);
    const rel = path.relative(PUBLIC_DIR, filePath);

    if (fs.existsSync(outPath)) {
      console.log(`   ⏭️  Skip (WebP ada): ${rel}`);
      fs.unlinkSync(filePath);
      console.log(`   🗑️  PNG dihapus: ${rel}`);
      skip++;
      continue;
    }

    try {
      await sharp(filePath).webp().toFile(outPath);
      fs.unlinkSync(filePath);
      console.log(`   ✅ ${rel} → ${path.relative(PUBLIC_DIR, outPath)} | PNG dihapus`);
      ok++;
    } catch (err) {
      console.log(`   ❌ ${rel}: ${err instanceof Error ? err.message : err}`);
      fail++;
    }
  }

  console.log('\n--- Selesai ---');
  console.log(`   Berhasil: ${ok} | Skip: ${skip} | Gagal: ${fail}`);
  console.log('   File .png asli telah dihapus.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
