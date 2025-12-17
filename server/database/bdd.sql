-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema EcrinDuTemps
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema EcrinDuTemps
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `EcrinDuTemps` DEFAULT CHARACTER SET utf8 ;
USE `EcrinDuTemps` ;

-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`cart` (
  `idcart` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL,
  `update_at` DATETIME NULL,
  `status` VARCHAR(45) NULL,
  `total_amount` INT NULL,
  PRIMARY KEY (`idcart`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `street_number` INT NULL,
  `street` VARCHAR(150) NULL,
  `zip_code` INT NULL,
  `city` VARCHAR(100) NULL,
  `birthdate` DATE NULL,
  `gender` VARCHAR(45) NULL,
  `user_type` VARCHAR(45) NULL,
  `tel` INT NULL,
  `e_mail` VARCHAR(100) NOT NULL,
  `newsletter` TINYINT NULL,
  `user_role` VARCHAR(45) NULL,
  `user_photo` VARCHAR(2048) NULL,
  `reviews_idreviews` INT NOT NULL,
  `cart_idcart` INT NOT NULL,
  `user_describe` LONGTEXT NULL,
  `password` VARCHAR(150) NULL,
  PRIMARY KEY (`iduser`, `reviews_idreviews`, `cart_idcart`),
  INDEX `fk_user_cart1_idx` (`cart_idcart` ASC) VISIBLE,
  UNIQUE INDEX `e_mail_UNIQUE` (`e_mail` ASC) VISIBLE,
  CONSTRAINT `fk_user_cart1`
    FOREIGN KEY (`cart_idcart`)
    REFERENCES `EcrinDuTemps`.`cart` (`idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`case_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`case_material` (
  `idcase_material` INT NOT NULL AUTO_INCREMENT,
  `case_material_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idcase_material`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`crystal_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`crystal_type` (
  `idcrystal_type` INT NOT NULL AUTO_INCREMENT,
  `crystal_type_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idcrystal_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`case_back_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`case_back_type` (
  `idcase_back_type` INT NOT NULL AUTO_INCREMENT,
  `case_back_type_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idcase_back_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`photo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`photo` (
  `idphoto` INT NOT NULL AUTO_INCREMENT,
  `url_photo1` VARCHAR(2048) NULL,
  `url_photo2` VARCHAR(2048) NULL,
  `url_photo3` VARCHAR(2048) NULL,
  `url_photo4` VARCHAR(2048) NULL,
  `url_photo5` VARCHAR(2048) NULL,
  PRIMARY KEY (`idphoto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`dial_finish`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`dial_finish` (
  `iddial_finish` INT NOT NULL AUTO_INCREMENT,
  `dial_finish_name` VARCHAR(150) NULL,
  PRIMARY KEY (`iddial_finish`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`hour_maker_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`hour_maker_type` (
  `idhour_maker_type` INT NOT NULL AUTO_INCREMENT,
  `hour_maker_type_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idhour_maker_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`lume_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`lume_type` (
  `idlume_type` INT NOT NULL AUTO_INCREMENT,
  `lume_type_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idlume_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`hand_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`hand_type` (
  `idhand_type` INT NOT NULL AUTO_INCREMENT,
  `hand_type_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idhand_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`strap_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`strap_material` (
  `idstrap_material` INT NOT NULL AUTO_INCREMENT,
  `strap_material_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idstrap_material`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`clasp_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`clasp_type` (
  `idclasp_type` INT NOT NULL AUTO_INCREMENT,
  `clasp_type_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idclasp_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`photo_certif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`photo_certif` (
  `idphoto_certif` INT NOT NULL AUTO_INCREMENT,
  `url_photo_certif1` VARCHAR(2048) NULL,
  `url_photo_certif2` VARCHAR(2048) NULL,
  `url_photo_certif3` VARCHAR(2048) NULL,
  `url_photo_certif4` VARCHAR(2048) NULL,
  `url_photo_certif5` VARCHAR(2048) NULL,
  PRIMARY KEY (`idphoto_certif`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`certificate_id`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`certificate_id` (
  `idcertificate_id` INT NOT NULL AUTO_INCREMENT,
  `certificate_name` VARCHAR(150) NULL,
  `photo_certif_idphoto_certif` INT NOT NULL,
  PRIMARY KEY (`idcertificate_id`, `photo_certif_idphoto_certif`),
  INDEX `fk_certificate_id_photo_certif1_idx` (`photo_certif_idphoto_certif` ASC) VISIBLE,
  CONSTRAINT `fk_certificate_id_photo_certif1`
    FOREIGN KEY (`photo_certif_idphoto_certif`)
    REFERENCES `EcrinDuTemps`.`photo_certif` (`idphoto_certif`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`movement_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`movement_type` (
  `idmovement_type` INT NOT NULL AUTO_INCREMENT,
  `movement_type` VARCHAR(150) NULL,
  PRIMARY KEY (`idmovement_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`functions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`functions` (
  `idfunctions` INT NOT NULL AUTO_INCREMENT,
  `function_name` VARCHAR(150) NULL,
  PRIMARY KEY (`idfunctions`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`market_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`market_data` (
  `idmarket_data` INT NOT NULL AUTO_INCREMENT,
  `price` INT NULL,
  `price_date` DATETIME NULL,
  PRIMARY KEY (`idmarket_data`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`order_archive`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`order_archive` (
  `idorder` INT NOT NULL AUTO_INCREMENT,
  `user_saler_id` INT NOT NULL,
  `user_order_id` INT NOT NULL,
  `watch_id` INT NOT NULL,
  `price` INT NULL,
  `purchase_date` DATETIME NULL,
  `street_number` INT NULL,
  `street` VARCHAR(200) NULL,
  `zip_code` INT NULL,
  `city` VARCHAR(100) NULL,
  `watch_idwatch` INT NOT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idorder`, `watch_idwatch`, `user_iduser`),
  INDEX `fk_order_archive_user1_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_order_archive_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `EcrinDuTemps`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`watch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`watch` (
  `idwatch` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `ref_no` INT NULL,
  `production_year` DATE NULL,
  `is_limited_edition` TINYINT NULL,
  `edition_number` VARCHAR(45) NULL,
  `photo_id` VARCHAR(200) NULL,
  `watch_gender` VARCHAR(45) NULL,
  `watch_sell_status` VARCHAR(45) NULL,
  `watch_price` INT NULL,
  `case_material_id` INT NULL,
  `diameter_mm` INT NULL,
  `thickness_mm` INT NULL,
  `water_resistance_bar` INT NULL,
  `crystal_type_id` INT NULL,
  `case_back_type_id` INT NULL,
  `dial_color` VARCHAR(45) NULL,
  `dial_finish_id` INT NULL,
  `hour_marker_type_id` INT NULL,
  `lume_type_id` INT NULL,
  `hand_type_id` INT NULL,
  `strap_material_id` INT NULL,
  `strap_color` VARCHAR(45) NULL,
  `clasp_type_id` INT NULL,
  `lug_width_mm` INT NULL,
  `watch_condition` VARCHAR(45) NULL,
  `certificate_id` INT NULL,
  `movement_type_id` INT NULL,
  `caliber` VARCHAR(45) NULL,
  `functions_id` INT NULL,
  `power_reserve_hours` INT NULL,
  `frequency_hz` INT NULL,
  `jewel_count` INT NULL,
  `case_material_idcase_material` INT NOT NULL,
  `crystal_type_idcrystal_type` INT NOT NULL,
  `case_back_type_idcase_back_type` INT NOT NULL,
  `photo_idphoto` INT NOT NULL,
  `dial_finish_iddial_finish` INT NOT NULL,
  `hour_maker_type_idhour_maker_type` INT NOT NULL,
  `lume_type_idlume_type` INT NOT NULL,
  `hand_type_idhand_type` INT NOT NULL,
  `strap_material_idstrap_material` INT NOT NULL,
  `clasp_type_idclasp_type` INT NOT NULL,
  `certificate_id_idcertificate_id` INT NOT NULL,
  `movement_type_idmovement_type` INT NOT NULL,
  `functions_idfunctions` INT NOT NULL,
  `market_data_idmarket_data` INT NOT NULL,
  `order_archive_idorder` INT NOT NULL,
  `order_archive_watch_idwatch` INT NOT NULL,
  PRIMARY KEY (`idwatch`, `case_material_idcase_material`, `crystal_type_idcrystal_type`, `case_back_type_idcase_back_type`, `photo_idphoto`, `dial_finish_iddial_finish`, `hour_maker_type_idhour_maker_type`, `lume_type_idlume_type`, `hand_type_idhand_type`, `strap_material_idstrap_material`, `clasp_type_idclasp_type`, `certificate_id_idcertificate_id`, `movement_type_idmovement_type`, `functions_idfunctions`, `market_data_idmarket_data`, `order_archive_idorder`, `order_archive_watch_idwatch`),
  INDEX `fk_watch_case_material1_idx` (`case_material_idcase_material` ASC) INVISIBLE,
  INDEX `fk_watch_crystal_type1_idx` (`crystal_type_idcrystal_type` ASC) VISIBLE,
  INDEX `fk_watch_case_back_type1_idx` (`case_back_type_idcase_back_type` ASC) VISIBLE,
  INDEX `fk_watch_photo1_idx` (`photo_idphoto` ASC) VISIBLE,
  INDEX `fk_watch_dial_finish1_idx` (`dial_finish_iddial_finish` ASC) VISIBLE,
  INDEX `fk_watch_hour_maker_type1_idx` (`hour_maker_type_idhour_maker_type` ASC) VISIBLE,
  INDEX `fk_watch_lume_type1_idx` (`lume_type_idlume_type` ASC) VISIBLE,
  INDEX `fk_watch_hand_type1_idx` (`hand_type_idhand_type` ASC) VISIBLE,
  INDEX `fk_watch_strap_material1_idx` (`strap_material_idstrap_material` ASC) VISIBLE,
  INDEX `fk_watch_clasp_type1_idx` (`clasp_type_idclasp_type` ASC) VISIBLE,
  INDEX `fk_watch_certificate_id1_idx` (`certificate_id_idcertificate_id` ASC) VISIBLE,
  INDEX `fk_watch_movement_type1_idx` (`movement_type_idmovement_type` ASC) VISIBLE,
  INDEX `fk_watch_functions1_idx` (`functions_idfunctions` ASC) VISIBLE,
  INDEX `fk_watch_market_data1_idx` (`market_data_idmarket_data` ASC) VISIBLE,
  INDEX `fk_watch_order_archive1_idx` (`order_archive_idorder` ASC, `order_archive_watch_idwatch` ASC) VISIBLE,
  CONSTRAINT `fk_watch_case_material1`
    FOREIGN KEY (`case_material_idcase_material`)
    REFERENCES `EcrinDuTemps`.`case_material` (`idcase_material`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_crystal_type1`
    FOREIGN KEY (`crystal_type_idcrystal_type`)
    REFERENCES `EcrinDuTemps`.`crystal_type` (`idcrystal_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_case_back_type1`
    FOREIGN KEY (`case_back_type_idcase_back_type`)
    REFERENCES `EcrinDuTemps`.`case_back_type` (`idcase_back_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_photo1`
    FOREIGN KEY (`photo_idphoto`)
    REFERENCES `EcrinDuTemps`.`photo` (`idphoto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_dial_finish1`
    FOREIGN KEY (`dial_finish_iddial_finish`)
    REFERENCES `EcrinDuTemps`.`dial_finish` (`iddial_finish`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_hour_maker_type1`
    FOREIGN KEY (`hour_maker_type_idhour_maker_type`)
    REFERENCES `EcrinDuTemps`.`hour_maker_type` (`idhour_maker_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_lume_type1`
    FOREIGN KEY (`lume_type_idlume_type`)
    REFERENCES `EcrinDuTemps`.`lume_type` (`idlume_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_hand_type1`
    FOREIGN KEY (`hand_type_idhand_type`)
    REFERENCES `EcrinDuTemps`.`hand_type` (`idhand_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_strap_material1`
    FOREIGN KEY (`strap_material_idstrap_material`)
    REFERENCES `EcrinDuTemps`.`strap_material` (`idstrap_material`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_clasp_type1`
    FOREIGN KEY (`clasp_type_idclasp_type`)
    REFERENCES `EcrinDuTemps`.`clasp_type` (`idclasp_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_certificate_id1`
    FOREIGN KEY (`certificate_id_idcertificate_id`)
    REFERENCES `EcrinDuTemps`.`certificate_id` (`idcertificate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_movement_type1`
    FOREIGN KEY (`movement_type_idmovement_type`)
    REFERENCES `EcrinDuTemps`.`movement_type` (`idmovement_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_functions1`
    FOREIGN KEY (`functions_idfunctions`)
    REFERENCES `EcrinDuTemps`.`functions` (`idfunctions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_market_data1`
    FOREIGN KEY (`market_data_idmarket_data`)
    REFERENCES `EcrinDuTemps`.`market_data` (`idmarket_data`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_order_archive1`
    FOREIGN KEY (`order_archive_idorder` , `order_archive_watch_idwatch`)
    REFERENCES `EcrinDuTemps`.`order_archive` (`idorder` , `watch_idwatch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`is_favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`is_favorite` (
  `user_iduser` INT NOT NULL,
  `watch_idwatch` INT NOT NULL,
  PRIMARY KEY (`user_iduser`, `watch_idwatch`),
  INDEX `fk_user_has_watch_watch1_idx` (`watch_idwatch` ASC) VISIBLE,
  INDEX `fk_user_has_watch_user_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_watch_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `EcrinDuTemps`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_watch_watch1`
    FOREIGN KEY (`watch_idwatch`)
    REFERENCES `EcrinDuTemps`.`watch` (`idwatch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`reviews` (
  `idreviews` INT NOT NULL AUTO_INCREMENT,
  `review_title` VARCHAR(45) NULL,
  `note` INT NULL,
  `comment` LONGTEXT NULL,
  `user_iduser` INT NOT NULL,
  `user_reviews_idreviews` INT NOT NULL,
  PRIMARY KEY (`idreviews`, `user_iduser`, `user_reviews_idreviews`),
  INDEX `fk_reviews_user1_idx` (`user_iduser` ASC, `user_reviews_idreviews` ASC) VISIBLE,
  CONSTRAINT `fk_reviews_user1`
    FOREIGN KEY (`user_iduser` , `user_reviews_idreviews`)
    REFERENCES `EcrinDuTemps`.`user` (`iduser` , `reviews_idreviews`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`articles` (
  `idarticles` INT NOT NULL AUTO_INCREMENT,
  `article_title` VARCHAR(100) NULL,
  `subtitle` VARCHAR(100) NULL,
  `release_date` DATETIME NULL,
  `url_photoArticle` VARCHAR(2048) NULL,
  `content` LONGTEXT NULL,
  `reference_source` VARCHAR(45) NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idarticles`),
  INDEX `fk_articles_user1_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_articles_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `EcrinDuTemps`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`faq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`faq` (
  `idtable1` INT NOT NULL AUTO_INCREMENT,
  `question` LONGTEXT NULL,
  `answer` LONGTEXT NULL,
  PRIMARY KEY (`idtable1`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EcrinDuTemps`.`watch_has_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EcrinDuTemps`.`watch_has_cart` (
  `watch_idwatch` INT NOT NULL,
  `cart_idcart` INT NOT NULL,
  PRIMARY KEY (`watch_idwatch`, `cart_idcart`),
  INDEX `fk_watch_has_cart_cart1_idx` (`cart_idcart` ASC) VISIBLE,
  INDEX `fk_watch_has_cart_watch1_idx` (`watch_idwatch` ASC) VISIBLE,
  CONSTRAINT `fk_watch_has_cart_watch1`
    FOREIGN KEY (`watch_idwatch`)
    REFERENCES `EcrinDuTemps`.`watch` (`idwatch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watch_has_cart_cart1`
    FOREIGN KEY (`cart_idcart`)
    REFERENCES `EcrinDuTemps`.`cart` (`idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
