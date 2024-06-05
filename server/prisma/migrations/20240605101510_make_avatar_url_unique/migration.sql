/*
  Warnings:

  - A unique constraint covering the columns `[avatarUrl]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_avatarUrl_key` ON `users`(`avatarUrl`);
