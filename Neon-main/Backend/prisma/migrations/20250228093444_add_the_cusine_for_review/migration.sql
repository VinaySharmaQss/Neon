/*
  Warnings:

  - Added the required column `cusineId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "cusineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_cusineId_fkey" FOREIGN KEY ("cusineId") REFERENCES "Cuisines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
