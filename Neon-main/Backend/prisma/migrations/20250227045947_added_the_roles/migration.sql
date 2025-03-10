/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Cusines" ALTER COLUMN "accepted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'USER';
