/*
  Warnings:

  - You are about to drop the column `birth_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `point_balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referral_code` on the `User` table. All the data in the column will be lost.
  - Added the required column `referralCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `birth_date`,
    DROP COLUMN `point_balance`,
    DROP COLUMN `referral_code`,
    ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `expiredPoint` INTEGER NULL,
    ADD COLUMN `isVerified` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `phone` BIGINT NULL,
    ADD COLUMN `pointBalance` INTEGER NULL,
    ADD COLUMN `referenceCode` VARCHAR(191) NULL,
    ADD COLUMN `referralCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `voucherId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `schedule` DATETIME(3) NOT NULL,
    `start_event` DATETIME(3) NOT NULL,
    `end_event` DATETIME(3) NOT NULL,
    `city` ENUM('Jakarta', 'Bandung', 'Surabaya') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `terms_condition` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voucher` INTEGER NOT NULL,
    `expired_date` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
