-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "weatherLogo" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "ratingNum" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "readMore" TEXT NOT NULL,
    "footerLogo" TEXT NOT NULL,
    "footerDescription" TEXT NOT NULL,
    "footerLink" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userImage" TEXT,
    "userName" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,
    "reviewText" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
