/*
  Warnings:

  - You are about to drop the column `ratingNum` on the `Place` table. All the data in the column will be lost.
  - Added the required column `eventTime` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "ratingNum",
ADD COLUMN     "eventTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
