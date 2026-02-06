/*
  Warnings:

  - You are about to drop the column `color` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedBy` on the `partnerships` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "partnerships" DROP CONSTRAINT "partnerships_reviewedBy_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "color";

-- AlterTable
ALTER TABLE "partnerships" DROP COLUMN "reviewedBy";
