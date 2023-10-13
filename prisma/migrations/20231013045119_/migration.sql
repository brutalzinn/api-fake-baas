/*
  Warnings:

  - Added the required column `balanceAfter` to the `UserWalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceBefore` to the `UserWalletHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserWalletHistory` ADD COLUMN `balanceAfter` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `balanceBefore` DECIMAL(65, 30) NOT NULL;
