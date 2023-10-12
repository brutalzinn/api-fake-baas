-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE') NOT NULL DEFAULT 'PENDING',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uptadeAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_document_key`(`document`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `stateCode` VARCHAR(3) NOT NULL,

    UNIQUE INDEX `UserAddress_idUser_key`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMetadata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uptadeAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserMetadata_idUser_key_key`(`idUser`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` LONGTEXT NOT NULL,
    `idUser` INTEGER NULL,
    `enviroment` ENUM('GLOBAL', 'USER', 'SYSTEM') NOT NULL DEFAULT 'GLOBAL',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Settings_idUser_key_key`(`idUser`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `externalId` VARCHAR(191) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uptadeAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserWallet_idUser_key`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWalletHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUserWallet` INTEGER NOT NULL,
    `direction` ENUM('IN', 'OUT') NOT NULL,
    `balanceBefore` DECIMAL(65, 30) NOT NULL,
    `balanceAfter` DECIMAL(65, 30) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `Idtransaction` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `transactionType` ENUM('P2P', 'PIX') NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `senderWalletId` INTEGER NOT NULL,
    `receiverWalletId` INTEGER NOT NULL,
    `expireAt` DATETIME(3) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uptadeAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Transactions_externalId_key`(`externalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMetadata` ADD CONSTRAINT `UserMetadata_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWallet` ADD CONSTRAINT `UserWallet_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWalletHistory` ADD CONSTRAINT `UserWalletHistory_idUserWallet_fkey` FOREIGN KEY (`idUserWallet`) REFERENCES `UserWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_senderWalletId_fkey` FOREIGN KEY (`senderWalletId`) REFERENCES `UserWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_receiverWalletId_fkey` FOREIGN KEY (`receiverWalletId`) REFERENCES `UserWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
