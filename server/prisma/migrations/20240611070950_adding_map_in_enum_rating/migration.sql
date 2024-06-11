/*
  Warnings:

  - The values [five,four,three,two,one] on the enum `reviews_rating` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` ENUM('5', '4', '3', '2', '1') NOT NULL;
