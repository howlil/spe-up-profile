# Setup Guide - SPE UP SC Backend

Complete setup instructions for the backend API with Supabase, Prisma, and authentication.

## Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Git

## Step 1: Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Navigate to **Project Settings** → **API**
   - Copy the following:
     - Project URL
     - `anon` public key
     - `service_role` secret key (⚠️ Keep this secret!)

3. Get your database URL:
   - In Supabase dashboard, go to **Project Settings** → **Database**
   - Scroll down to **Connection string** → **URI**
   - Copy the connection string and replace `[YOUR-PASSWORD]` with your database password

4. Update `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Prisma Setup

1. Generate Prisma Client:
```bash
npx prisma generate
```

2. Create database migration:
```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables in your Supabase database
- Generate TypeScript types for your models

3. (Optional) Open Prisma Studio to view your database:
```bash
npx prisma studio
```

## Step 4: Supabase Storage Setup

1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket**
3. Set the following:
   - Name: `article-images`
   - Public bucket: **Yes** (check the box)
4. Click **Create bucket**

### Configure Storage Policies (Important!)

1. Click on the `article-images` bucket
2. Go to **Policies** tab
3. Create a new policy with:
   - **Policy name**: Allow public uploads
   - **Allowed operations**: SELECT, INSERT, DELETE
   - **Target roles**: public, authenticated
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`

## Step 5: Database Policies (Row Level Security)

Enable RLS but allow service role to bypass it:

1. In Supabase dashboard, go to **SQL Editor**
2. Run this SQL:

```sql
-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role access
CREATE POLICY "Service role can do everything" ON articles FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can do everything" ON categories FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can do everything" ON partnerships FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can do everything" ON alumni FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can do everything" ON analytics FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can do everything" ON users FOR ALL TO service_role USING (true);
```

## Step 6: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Step 7: Test the API

### Test Upload Endpoint

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@path/to/image.jpg"
```

Expected response:
```json
{
  "url": "https://your-project.supabase.co/storage/v1/object/public/article-images/..."
}
```

### Test Dashboard Stats

```bash
curl http://localhost:3000/api/dashboard/stats
```

### Test Articles

```bash
# List articles
curl http://localhost:3000/api/articles

# Create article
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "content": "<p>This is a test article</p>",
    "author": "Admin",
    "status": "draft"
  }'
```

## Troubleshooting

### "PrismaClient is unable to run in this browser environment"
- Make sure you're using `lib/prisma.ts` only in API routes (server-side)
- Never import Prisma in client components

### "Failed to upload file"
- Check if Storage bucket `article-images` exists
- Verify bucket is set to public
- Check storage policies allow uploads

### "Connection refused" to database
- Verify `DATABASE_URL` is correct
- Check if your IP is allowed in Supabase (Database → Settings → Connection Pooling)
- Make sure you're using the correct password

### Prisma migrate fails
- Delete `prisma/migrations` folder
- Run `npx prisma migrate dev --name init` again
- If still failing, use `npx prisma db push` as alternative

## Next Steps

1. Test all API endpoints using the admin UI
2. Add authentication middleware to protect routes
3. Set up proper error logging
4. Configure production environment variables

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
