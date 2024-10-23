-- DDL definition of the Database structure.
DROP DATABASE IF EXISTS `Tasks-db`;
CREATE DATABASE `Tasks-db`;
USE `Tasks-db`;

-- User table definition.
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(60) NOT NULL UNIQUE,
    `password` VARCHAR(150) NOT NULL
);

-- Task table definition.
DROP TABLE IF EXISTS `Task`;
CREATE TABLE `Task` (
    `taskId` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `userId` INT UNSIGNED NOT NULL,

    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(300),
    `deadline` DATETIME,
    `status` ENUM("pending", "complete") DEFAULT "pending",

    CONSTRAINT `UserFK` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);