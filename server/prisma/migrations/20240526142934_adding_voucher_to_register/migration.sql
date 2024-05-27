/*
  Warnings:

  - You are about to drop the column `expiredPoint` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pointBalance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referenceCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expired_date` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `voucher` on the `Voucher` table. All the data in the column will be lost.
  - Added the required column `ammount` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredDate` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `expiredPoint`,
    DROP COLUMN `pointBalance`,
    DROP COLUMN `referenceCode`,
    ADD COLUMN `usedReferralCode` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Voucher` DROP COLUMN `expired_date`,
    DROP COLUMN `voucher`,
    ADD COLUMN `ammount` INTEGER NOT NULL,
    ADD COLUMN `expiredDate` DATETIME(3) NOT NULL,
    ADD COLUMN `isUsed` BOOLEAN NOT NULL DEFAULT false;
