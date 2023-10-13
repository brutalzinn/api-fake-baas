/*
  Warnings:

  - You are about to drop the column `uptadeAt` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `uptadeAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uptadeAt` on the `UserMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `uptadeAt` on the `UserWallet` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `UserMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `UserWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transactions` DROP COLUMN `uptadeAt`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `uptadeAt`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserAddress` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserMetadata` DROP COLUMN `uptadeAt`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserWallet` DROP COLUMN `uptadeAt`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `ApiKey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `expireAt` DATETIME(3) NOT NULL,
    `lastUseAt` DATETIME(3) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
