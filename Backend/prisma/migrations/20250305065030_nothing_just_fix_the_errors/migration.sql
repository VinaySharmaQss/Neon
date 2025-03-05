-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_cusineId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_placeId_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "reviewDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "placeId" DROP NOT NULL,
ALTER COLUMN "cusineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_cusineId_fkey" FOREIGN KEY ("cusineId") REFERENCES "Cuisines"("id") ON DELETE SET NULL ON UPDATE CASCADE;
