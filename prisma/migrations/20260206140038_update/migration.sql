/*
  Warnings:

  - You are about to drop the column `bio` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `currentCompany` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `currentPosition` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `graduationYear` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `linkedIn` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `companyPhone` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `partnershipType` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `partnerships` table. All the data in the column will be lost.
  - Added the required column `institution` to the `alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `alumni` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `alumni` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `partnerships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `partnerships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `partnerships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `partnerships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `partnerships` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "alumni_currentCompany_idx";

-- DropIndex
DROP INDEX "alumni_graduationYear_idx";

-- DropIndex
DROP INDEX "partnerships_partnershipType_idx";

-- AlterTable
ALTER TABLE "alumni" DROP COLUMN "bio",
DROP COLUMN "currentCompany",
DROP COLUMN "currentPosition",
DROP COLUMN "graduationYear",
DROP COLUMN "linkedIn",
DROP COLUMN "location",
DROP COLUMN "major",
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "isNewData" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "photoPath" TEXT,
ADD COLUMN     "position" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "partnerships" DROP COLUMN "companyEmail",
DROP COLUMN "companyName",
DROP COLUMN "companyPhone",
DROP COLUMN "contactEmail",
DROP COLUMN "contactPerson",
DROP COLUMN "contactPhone",
DROP COLUMN "description",
DROP COLUMN "notes",
DROP COLUMN "partnershipType",
DROP COLUMN "reviewedAt",
DROP COLUMN "submittedAt",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT,
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nda" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subject" TEXT NOT NULL;
