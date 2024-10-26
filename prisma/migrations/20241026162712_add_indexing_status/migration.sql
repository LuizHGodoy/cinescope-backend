-- CreateTable
CREATE TABLE "IndexingStatus" (
    "id" SERIAL NOT NULL,
    "lastIndexedPage" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndexingStatus_pkey" PRIMARY KEY ("id")
);
