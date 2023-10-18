/*
  Warnings:

  - Added the required column `updateAt` to the `AccountOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AccountOwner` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastUseAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
