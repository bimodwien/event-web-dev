/*
  Warnings:

  - You are about to drop the column `ticketId` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `ticketId`,
    MODIFY `paid_at` DATETIME(3) NULL,
    MODIFY `paid_proof` BLOB NULL;
