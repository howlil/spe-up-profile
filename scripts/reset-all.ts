/**
 * Reset semua data: database (drop + migrate + seed) dan isi storage Supabase.
 * Jalankan: pnpm run reset:all
 *
 * Butuh .env: DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import 'dotenv/config'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { execSync } from 'child_process'
import path from 'path'

const BUCKETS = ['article-images', 'alumni-photos', 'partnership-files']
const REMOVE_BATCH_SIZE = 1000

async function listAllPaths(
  supabase: SupabaseClient,
  bucket: string,
  prefix = ''
): Promise<string[]> {
  const { data, error } = await supabase.storage.from(bucket).list(prefix, { limit: 1000 })
  if (error) {
    console.warn(`  ⚠ List ${bucket}/${prefix}:`, error.message)
    return []
  }
  const paths: string[] = []
  for (const item of data) {
    const fullPath = prefix ? `${prefix}/${item.name}` : item.name
    // Cek apakah ini subfolder (prefix): list isi path ini
    const { data: children } = await supabase.storage.from(bucket).list(fullPath, { limit: 1 })
    if (children && children.length > 0) {
      paths.push(...(await listAllPaths(supabase, bucket, fullPath)))
    } else {
      paths.push(fullPath)
    }
  }
  return paths
}

async function emptyBucket(
  supabase: SupabaseClient,
  bucket: string
): Promise<number> {
  const paths = await listAllPaths(supabase, bucket)
  if (paths.length === 0) {
    console.log(`  ${bucket}: kosong`)
    return 0
  }
  let removed = 0
  for (let i = 0; i < paths.length; i += REMOVE_BATCH_SIZE) {
    const batch = paths.slice(i, i + REMOVE_BATCH_SIZE)
    const { error } = await supabase.storage.from(bucket).remove(batch)
    if (error) {
      console.warn(`  ⚠ ${bucket} remove batch:`, error.message)
    } else {
      removed += batch.length
    }
  }
  console.log(`  ${bucket}: ${removed} file dihapus`)
  return removed
}

async function clearStorage(): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.warn('⚠ SUPABASE env tidak ada, lewati reset storage.')
    return
  }
  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  console.log('\n🗑 Menghapus isi storage Supabase...')
  for (const bucket of BUCKETS) {
    await emptyBucket(supabase, bucket)
  }
}

function resetDatabase(): void {
  console.log('\n🔄 Reset database (migrate reset + seed)...')
  const root = path.resolve(process.cwd())
  execSync('npx prisma migrate reset --force', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' },
  })
}

async function main(): Promise<void> {
  console.log('========================================')
  console.log('  RESET SEMUA DATA (DB + Storage)')
  console.log('========================================')

  await clearStorage()
  resetDatabase()

  console.log('\n✅ Selesai. Database sudah di-reset dan di-seed, storage dikosongkan.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
