/*
  Warnings:

  - Added the required column `bathrooms` to the `property_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `property_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property_details` ADD COLUMN `bathrooms` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
