/*
  Warnings:

  - A unique constraint covering the columns `[idAccountOwner,key]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ApiKey` ADD COLUMN `idAccountOwner` INTEGER NULL;

-- CreateTable
CREATE TABLE `AccountOwner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ApiKey_idAccountOwner_key_key` ON `ApiKey`(`idAccountOwner`, `key`);

-- AddForeignKey
ALTER TABLE `ApiKey` ADD CONSTRAINT `ApiKey_idAccountOwner_fkey` FOREIGN KEY (`idAccountOwner`) REFERENCES `AccountOwner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
