-- CreateTable
CREATE TABLE `property` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(250) NOT NULL,
    `address` VARCHAR(250) NOT NULL,
    `city` VARCHAR(250) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `zip_code` VARCHAR(8) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `property_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_details` (
    `id` VARCHAR(36) NOT NULL,
    `property_id` VARCHAR(191) NOT NULL,
    `bedrooms` INTEGER NOT NULL,
    `garage_spaces` INTEGER NOT NULL,
    `swimming_pool` BOOLEAN NOT NULL,
    `size` INTEGER NOT NULL,
    `type` ENUM('HOUSE', 'APARTMENT') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `property_details_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property_value` (
    `id` VARCHAR(36) NOT NULL,
    `property_id` VARCHAR(191) NOT NULL,
    `rental_amount` DOUBLE NOT NULL,
    `condo_fee` DOUBLE NOT NULL,
    `property_tax` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `property_value_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `property_details` ADD CONSTRAINT `property_details_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_value` ADD CONSTRAINT `property_value_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
