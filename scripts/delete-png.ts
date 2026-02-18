/**
 * Hapus file .png di public/.
 * Default: hanya hapus PNG yang sudah punya pasangan .webp (aman).
 * Pakai --all untuk hapus semua PNG (hati-hati).
 *
 * Jalankan: pnpm run delete:png
 * Atau:     pnpm run delete:png -- --all
 */

import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DELETE_ALL = process.argv.includes('--all');

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

function main() {
  console.log('🔍 Mencari file .png di public/ ...\n');
  const files = getPngFiles(PUBLIC_DIR);

  const toDelete = DELETE_ALL
    ? files
    : files.filter((filePath) => {
        const dir = path.dirname(filePath);
        const base = path.basename(filePath, '.png');
        return fs.existsSync(path.join(dir, `${base}.webp`));
      });

  if (toDelete.length === 0) {
    console.log(DELETE_ALL ? '   Tidak ada file PNG.' : '   Tidak ada PNG yang punya pasangan .webp.');
    return;
  }

  console.log(DELETE_ALL ? `   Akan menghapus ${toDelete.length} file PNG.\n` : `   Akan menghapus ${toDelete.length} PNG (yang sudah punya .webp).\n`);

  let ok = 0;
  let fail = 0;

  for (const filePath of toDelete) {
    const rel = path.relative(PUBLIC_DIR, filePath);
    try {
      fs.unlinkSync(filePath);
      console.log(`   🗑️  ${rel}`);
      ok++;
    } catch (err) {
      console.log(`   ❌ ${rel}: ${err instanceof Error ? err.message : err}`);
      fail++;
    }
  }

  console.log('\n--- Selesai ---');
  console.log(`   Terhapus: ${ok} | Gagal: ${fail}`);
}

main();
