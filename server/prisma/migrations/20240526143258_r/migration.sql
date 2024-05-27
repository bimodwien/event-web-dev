/*
  Warnings:

  - You are about to drop the column `usedReferralCoded` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `usedReferralCoded`,
    ADD COLUMN `usedReferralCode` VARCHAR(191) NULL;
