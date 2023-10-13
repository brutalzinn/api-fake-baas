/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `AccountOwner` will be added. If there are existing duplicate values, this will fail.
  - The required column `externalId` was added to the `AccountOwner` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `AccountOwner` ADD COLUMN `externalId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AccountOwner_externalId_key` ON `AccountOwner`(`externalId`);
