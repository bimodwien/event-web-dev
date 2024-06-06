-- AlterTable
ALTER TABLE `events` ADD COLUMN `promo_price` DOUBLE NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `phone` VARCHAR(191) NULL;
