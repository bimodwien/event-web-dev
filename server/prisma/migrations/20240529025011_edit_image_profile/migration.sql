/*
  Warnings:

  - You are about to drop the column `image_profile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `image_profile`,
    ADD COLUMN `imageProfile` LONGBLOB NULL;
