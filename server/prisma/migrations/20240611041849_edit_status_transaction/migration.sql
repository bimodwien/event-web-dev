/*
  Warnings:

  - The values [unpaid] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('cancelled', 'pending', 'paid') NOT NULL;
