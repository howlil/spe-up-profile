-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "author" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "views" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "userId" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partnerships" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT,
    "contactPerson" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "partnershipType" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedBy" TEXT,

    CONSTRAINT "partnerships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumni" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "major" TEXT,
    "currentCompany" TEXT,
    "currentPosition" TEXT,
    "location" TEXT,
    "phone" TEXT,
    "linkedIn" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_status_idx" ON "articles"("status");

-- CreateIndex
CREATE INDEX "articles_categoryId_idx" ON "articles"("categoryId");

-- CreateIndex
CREATE INDEX "articles_userId_idx" ON "articles"("userId");

-- CreateIndex
CREATE INDEX "articles_publishedAt_idx" ON "articles"("publishedAt");

-- CreateIndex
CREATE INDEX "partnerships_status_idx" ON "partnerships"("status");

-- CreateIndex
CREATE INDEX "partnerships_partnershipType_idx" ON "partnerships"("partnershipType");

-- CreateIndex
CREATE UNIQUE INDEX "alumni_email_key" ON "alumni"("email");

-- CreateIndex
CREATE INDEX "alumni_graduationYear_idx" ON "alumni"("graduationYear");

-- CreateIndex
CREATE INDEX "alumni_currentCompany_idx" ON "alumni"("currentCompany");

-- CreateIndex
CREATE INDEX "analytics_resource_resourceId_idx" ON "analytics"("resource", "resourceId");

-- CreateIndex
CREATE INDEX "analytics_createdAt_idx" ON "analytics"("createdAt");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
