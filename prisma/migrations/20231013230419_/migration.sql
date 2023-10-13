/*
  Warnings:

  - You are about to drop the column `idUser` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserWallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserWalletHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idAccountOwner,key]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Settings` DROP FOREIGN KEY `Settings_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_receiverWalletId_fkey`;

-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_senderWalletId_fkey`;

-- DropForeignKey
ALTER TABLE `UserAddress` DROP FOREIGN KEY `UserAddress_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `UserMetadata` DROP FOREIGN KEY `UserMetadata_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `UserWallet` DROP FOREIGN KEY `UserWallet_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `UserWalletHistory` DROP FOREIGN KEY `UserWalletHistory_idUserWallet_fkey`;

-- DropIndex
DROP INDEX `Settings_idUser_key_key` ON `Settings`;

-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `idUser`,
    ADD COLUMN `idAccountOwner` INTEGER NULL;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `UserAddress`;

-- DropTable
DROP TABLE `UserMetadata`;

-- DropTable
DROP TABLE `UserWallet`;

-- DropTable
DROP TABLE `UserWalletHistory`;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE') NOT NULL DEFAULT 'PENDING',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Client_document_key`(`document`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idClient` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `stateCode` VARCHAR(3) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ClientAddress_idClient_key`(`idClient`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientMetadata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idClient` INTEGER NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ClientMetadata_idClient_key_key`(`idClient`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientWallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idClient` INTEGER NOT NULL,
    `externalId` VARCHAR(191) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ClientWallet_idClient_key`(`idClient`),
    UNIQUE INDEX `ClientWallet_externalId_key`(`externalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientWalletHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idClientWallet` INTEGER NOT NULL,
    `direction` ENUM('IN', 'OUT') NOT NULL,
    `balanceBefore` DECIMAL(65, 30) NOT NULL,
    `balanceAfter` DECIMAL(65, 30) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Settings_idAccountOwner_key_key` ON `Settings`(`idAccountOwner`, `key`);

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_idAccountOwner_fkey` FOREIGN KEY (`idAccountOwner`) REFERENCES `AccountOwner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientAddress` ADD CONSTRAINT `ClientAddress_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientMetadata` ADD CONSTRAINT `ClientMetadata_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientWallet` ADD CONSTRAINT `ClientWallet_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientWalletHistory` ADD CONSTRAINT `ClientWalletHistory_idClientWallet_fkey` FOREIGN KEY (`idClientWallet`) REFERENCES `ClientWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_senderWalletId_fkey` FOREIGN KEY (`senderWalletId`) REFERENCES `ClientWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_receiverWalletId_fkey` FOREIGN KEY (`receiverWalletId`) REFERENCES `ClientWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
