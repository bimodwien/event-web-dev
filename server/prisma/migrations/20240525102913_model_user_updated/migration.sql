-- AlterTable
ALTER TABLE `User` MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('male', 'female') NULL,
    MODIFY `image_profile` LONGBLOB NULL,
    MODIFY `role` ENUM('event_organizer', 'customer') NULL,
    MODIFY `referral_code` VARCHAR(191) NULL,
    MODIFY `point_balance` INTEGER NULL;
