/*
  Warnings:

  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(8))`.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `rating` ENUM('five', 'four', 'three', 'two', 'one') NOT NULL;
