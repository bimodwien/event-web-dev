-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image_profile` LONGBLOB NOT NULL,
    `role` ENUM('event_organizer', 'customer') NOT NULL,
    `referral_code` VARCHAR(191) NOT NULL,
    `point_balance` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
