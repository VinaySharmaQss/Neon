/*
  Warnings:

  - You are about to drop the column `acesssToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "acesssToken",
ADD COLUMN     "accessToken" TEXT;
