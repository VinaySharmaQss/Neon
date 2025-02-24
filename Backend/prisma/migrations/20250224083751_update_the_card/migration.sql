/*
  Warnings:

  - You are about to drop the column `footerLink` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `readMore` on the `Place` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "footerLink",
DROP COLUMN "readMore",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
