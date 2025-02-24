-- CreateTable
CREATE TABLE "Cusines" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cusines_pkey" PRIMARY KEY ("id")
);
