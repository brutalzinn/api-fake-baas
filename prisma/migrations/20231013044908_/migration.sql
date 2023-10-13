/*
  Warnings:

  - You are about to drop the column `balanceAfter` on the `UserWalletHistory` table. All the data in the column will be lost.
  - You are about to drop the column `balanceBefore` on the `UserWalletHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserWalletHistory` DROP COLUMN `balanceAfter`,
    DROP COLUMN `balanceBefore`;
