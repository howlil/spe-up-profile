/*
  Warnings:

  - The `status` column on the `articles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `partnerships` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'WRITER', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropIndex
DROP INDEX "partnerships_status_idx";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "status",
ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "partnerships" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'SUPERADMIN';

-- DropTable
DROP TABLE "analytics";

-- CreateIndex
CREATE INDEX "articles_status_idx" ON "articles"("status");
