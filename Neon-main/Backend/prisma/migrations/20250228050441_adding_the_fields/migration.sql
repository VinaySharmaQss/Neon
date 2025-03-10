/*
  Warnings:

  - You are about to drop the column `Image` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Cusines` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventEndTime` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "eventEndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Cusines";

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "Cuisines" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuisines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
