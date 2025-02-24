/*
  Warnings:

  - Added the required column `accepted` to the `Cusines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cusines" ADD COLUMN     "accepted" BOOLEAN NOT NULL;
