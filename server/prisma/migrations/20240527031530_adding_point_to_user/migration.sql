/*
  Warnings:

  - You are about to drop the column `expiredDate` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `Voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `point` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pointExpiredDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Voucher` DROP COLUMN `expiredDate`,
    DROP COLUMN `point`;
