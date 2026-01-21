SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------
-- 1. TABLES INDÉPENDANTES (NIVEAU 1)
-- ------------------------------------------------------

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `street_number` int DEFAULT NULL,
  `street` varchar(150) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `e_mail` varchar(100) NOT NULL,
  `newsletter` tinyint DEFAULT NULL,
  `user_role` varchar(45) DEFAULT NULL,
  `user_photo` varchar(2048) DEFAULT NULL,
  `user_describe` longtext,
  `password` varchar(150) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `e_mail_UNIQUE` (`e_mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `case_material`;
CREATE TABLE `case_material` (
  `idcase_material` int NOT NULL AUTO_INCREMENT,
  `case_material_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idcase_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `movement_type`;
CREATE TABLE `movement_type` (
  `idmovement_type` int NOT NULL AUTO_INCREMENT,
  `movement_type` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idmovement_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `clasp_type`;
CREATE TABLE `clasp_type` (
  `idclasp_type` int NOT NULL AUTO_INCREMENT,
  `clasp_type_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idclasp_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `dial_finish`;
CREATE TABLE `dial_finish` (
  `iddial_finish` int NOT NULL AUTO_INCREMENT,
  `dial_finish_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`iddial_finish`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `functions`;
CREATE TABLE `functions` (
  `idfunctions` int NOT NULL AUTO_INCREMENT,
  `function_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idfunctions`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `hour_maker_type`;
CREATE TABLE `hour_maker_type` (
  `idhour_maker_type` int NOT NULL AUTO_INCREMENT,
  `hour_maker_type_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idhour_maker_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `strap_material`;
CREATE TABLE `strap_material` (
  `idstrap_material` int NOT NULL AUTO_INCREMENT,
  `strap_material_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idstrap_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `market_data`;
CREATE TABLE `market_data` (
  `idmarket_data` int NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT NULL,
  `price_date` datetime DEFAULT NULL,
  PRIMARY KEY (`idmarket_data`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- 2. TABLES AVEC DÉPENDANCES (NIVEAU 2)
-- ------------------------------------------------------

DROP TABLE IF EXISTS `model`;
CREATE TABLE `model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `brand_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_model_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `idarticles` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(100) DEFAULT NULL,
  `subtitle` varchar(200) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `content` longtext,
  `reference_source` varchar(45) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `user_iduser` int NOT NULL,
  PRIMARY KEY (`idarticles`),
  CONSTRAINT `fk_articles_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `idcart` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `user_iduser` int DEFAULT NULL,
  PRIMARY KEY (`idcart`),
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- 3. LA TABLE WATCH (NIVEAU 3)
-- ------------------------------------------------------

DROP TABLE IF EXISTS `watch`;
CREATE TABLE `watch` (
  `idwatch` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `brand_id` int NOT NULL,
  `model_id` int NOT NULL,
  `ref_no` int DEFAULT NULL,
  `production_year` date DEFAULT NULL,
  `is_limited_edition` tinyint DEFAULT NULL,
  `edition_number` varchar(45) DEFAULT NULL,
  `watch_gender` varchar(45) DEFAULT NULL,
  `watch_sell_status` varchar(45) DEFAULT NULL,
  `watch_price` int DEFAULT NULL,
  `case_material_id` int DEFAULT NULL,
  `diameter_mm` int DEFAULT NULL,
  `thickness_mm` int DEFAULT NULL,
  `water_resistance_bar` int DEFAULT NULL,
  `dial_color` varchar(45) DEFAULT NULL,
  `dial_finish_id` int DEFAULT NULL,
  `hour_marker_type_id` int DEFAULT NULL,
  `strap_material_id` int DEFAULT NULL,
  `strap_color` varchar(45) DEFAULT NULL,
  `clasp_type_id` int DEFAULT NULL,
  `lug_width_mm` int DEFAULT NULL,
  `watch_condition` varchar(45) DEFAULT NULL,
  `movement_type_id` int DEFAULT NULL,
  `caliber` varchar(45) DEFAULT NULL,
  `functions_id` int DEFAULT NULL,
  `power_reserve_hours` int DEFAULT NULL,
  `frequency_hz` int DEFAULT NULL,
  `jewel_count` int DEFAULT NULL,
  `market_data_id` int NULL,
  `order_archive_id` int NULL,
  `order_archive_watch_id` int NULL,
  `scope` ENUM('SHOP', 'COLLECTION') NOT NULL DEFAULT 'SHOP',
  PRIMARY KEY (`idwatch`),
  CONSTRAINT `fk_watch_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`),
  CONSTRAINT `fk_watch_model` FOREIGN KEY (`model_id`) REFERENCES `model`(`id`),
  CONSTRAINT `fk_watch_case_material` FOREIGN KEY (`case_material_id`) REFERENCES `case_material` (`idcase_material`),
  CONSTRAINT `fk_watch_movement_type` FOREIGN KEY (`movement_type_id`) REFERENCES `movement_type` (`idmovement_type`),
  CONSTRAINT `fk_watch_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- 4. TABLES DE LIAISON & PHOTOS
-- ------------------------------------------------------

DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(2048) NOT NULL,
  `type` ENUM('watch', 'certificate') NOT NULL,
  `watch_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_photo_watch` FOREIGN KEY (`watch_id`) REFERENCES `watch`(`idwatch`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `is_favorite`;
CREATE TABLE `is_favorite` (
  `user_iduser` int NOT NULL,
  `watch_idwatch` int NOT NULL,
  PRIMARY KEY (`user_iduser`,`watch_idwatch`),
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_fav_watch` FOREIGN KEY (`watch_idwatch`) REFERENCES `watch` (`idwatch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `watch_has_cart`;
CREATE TABLE `watch_has_cart` (
  `watch_idwatch` int NOT NULL,
  `cart_idcart` int NOT NULL,
  PRIMARY KEY (`watch_idwatch`,`cart_idcart`),
  CONSTRAINT `fk_whc_cart` FOREIGN KEY (`cart_idcart`) REFERENCES `cart` (`idcart`),
  CONSTRAINT `fk_whc_watch` FOREIGN KEY (`watch_idwatch`) REFERENCES `watch` (`idwatch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `faq`;
CREATE TABLE `faq` (
  `idtable1` int NOT NULL AUTO_INCREMENT,
  `question` longtext,
  `answer` longtext,
  PRIMARY KEY (`idtable1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;