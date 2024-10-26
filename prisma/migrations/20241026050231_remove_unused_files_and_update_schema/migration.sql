/*
  Warnings:

  - Added the required column `adult` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalLanguage` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteAverage` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `overview` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `releaseDate` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "backdropPath" TEXT,
ADD COLUMN     "genreIds" INTEGER[],
ADD COLUMN     "originalLanguage" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "video" BOOLEAN NOT NULL,
ADD COLUMN     "voteAverage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "voteCount" INTEGER NOT NULL,
ALTER COLUMN "overview" SET NOT NULL,
ALTER COLUMN "releaseDate" SET NOT NULL;
