-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NULL,
    `address` VARCHAR(191) NULL,
    `gender` ENUM('male', 'female') NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL DEFAULT 0,
    `pointExpiredDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageProfile` LONGBLOB NULL,
    `phone` BIGINT NULL,
    `isVerified` BOOLEAN NULL DEFAULT false,
    `role` ENUM('eventOrganizer', 'customer') NULL,
    `referralCode` VARCHAR(191) NOT NULL,
    `usedReferralCode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_referralCode_key`(`referralCode`),
    INDEX `users_username_name_email_idx`(`username`, `name`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `referrals` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `ammount` INTEGER NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `referrals_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `city` ENUM('Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Makassar', 'Palembang', 'Depok', 'Tangerang', 'Bekasi', 'Bogor', 'Malang', 'Yogyakarta', 'Solo', 'Bali') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `start_event` DATETIME(3) NOT NULL,
    `end_event` DATETIME(3) NOT NULL,
    `description` TEXT NOT NULL,
    `terms_conditions` TEXT NOT NULL,
    `image` LONGBLOB NOT NULL,
    `category` ENUM('Music', 'Exhibition', 'Workshop', 'Sport') NOT NULL,
    `type` ENUM('free', 'paid') NOT NULL,
    `ticket_available` INTEGER NOT NULL,
    `ticket_price` DOUBLE NULL,
    `max_buy` ENUM('1', '2', '3', '4', '5') NOT NULL,
    `promotion` ENUM('5%', '10%', '15%', '20%', '25%', '40%', '50%') NULL,
    `start_promo` DATETIME(3) NULL,
    `end_promo` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `events_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('unpaid', 'pending', 'paid') NOT NULL,
    `paid_at` DATETIME(3) NOT NULL,
    `paid_proof` BLOB NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `total_ticket` INTEGER NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `review_text` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
