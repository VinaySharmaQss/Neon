/*
  Warnings:

  - Added the required column `userId` to the `Cuisines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuisines" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cuisines" ADD CONSTRAINT "Cuisines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
