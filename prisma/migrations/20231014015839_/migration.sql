-- AlterTable
ALTER TABLE `Client` ADD COLUMN `idAccountOwner` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_idAccountOwner_fkey` FOREIGN KEY (`idAccountOwner`) REFERENCES `AccountOwner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
