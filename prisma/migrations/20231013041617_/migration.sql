/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `UserWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserWallet_externalId_key` ON `UserWallet`(`externalId`);
