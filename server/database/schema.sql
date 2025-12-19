-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: ecrindutemps
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `idarticles` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(100) DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `content` longtext,
  `reference_source` varchar(45) DEFAULT NULL,
  `user_iduser` int NOT NULL,
  PRIMARY KEY (`idarticles`),
  KEY `fk_articles_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_articles_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Rolex Submariner : une icône intemporelle','La montre de plongée devenue légendaire','2025-05-10','Depuis sa création en 1953, la Rolex Submariner est devenue une référence absolue dans le monde de l’horlogerie. Conçue pour résister aux conditions extrêmes de la plongée sous-marine, elle séduit aujourd’hui autant les sportifs que les collectionneurs.  ','Rolex',2),(2,'Patek Philippe : l’art de la transmission','Des montres conçues pour traverser les générations','2025-08-15 00:00:00','Patek Philippe est synonyme d’excellence horlogère depuis 1839. Chaque montre est conçue pour durer et se transmettre de génération en génération.  ','Le Point',2),(3,'Audemars Piguet Royal Oak','La montre qui a révolutionné le luxe','2025-10-20 00:00:00','Présentée en 1972, la Royal Oak d’Audemars Piguet a bouleversé les codes de l’horlogerie de luxe avec son boîtier octogonal et son bracelet intégré.  ','Horloger',2),(4,'Omega Speedmaster : la montre lunaire','Un chronographe entré dans l’histoire','2025-11-25 00:00:00','L’Omega Speedmaster est célèbre pour avoir accompagné les astronautes lors des missions Apollo. Testée et approuvée par la NASA, elle est devenue la première montre portée sur la Lune en 1969.  ','Le Monde',2),(5,'Les 10 meilleures marques de montres de tous les temps','Un classement des maisons horlogères les plus emblématiques','2025-12-01 00:00:00','L’univers de l’horlogerie de luxe regorge de marques prestigieuses qui ont marqué l’histoire. Voici un classement des 10 maisons incontournables :  ','Le Point',2);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `idcart` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `user_iduser` int DEFAULT NULL,
  PRIMARY KEY (`idcart`),
  KEY `fk_cart_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_material`
--

DROP TABLE IF EXISTS `case_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `case_material` (
  `idcase_material` int NOT NULL AUTO_INCREMENT,
  `case_material_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idcase_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_material`
--

LOCK TABLES `case_material` WRITE;
/*!40000 ALTER TABLE `case_material` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate_id`
--

DROP TABLE IF EXISTS `certificate_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate_id` (
  `idcertificate_id` int NOT NULL AUTO_INCREMENT,
  `certificate_name` varchar(150) DEFAULT NULL,
  `photo_certif_idphoto_certif` int NOT NULL,
  PRIMARY KEY (`idcertificate_id`),
  KEY `fk_certificate_id_photo_certif1_idx` (`photo_certif_idphoto_certif`),
  CONSTRAINT `fk_certificate_id_photo_certif1` FOREIGN KEY (`photo_certif_idphoto_certif`) REFERENCES `photo_certif` (`idphoto_certif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_id`
--

LOCK TABLES `certificate_id` WRITE;
/*!40000 ALTER TABLE `certificate_id` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasp_type`
--

DROP TABLE IF EXISTS `clasp_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clasp_type` (
  `idclasp_type` int NOT NULL AUTO_INCREMENT,
  `clasp_type_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idclasp_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasp_type`
--

LOCK TABLES `clasp_type` WRITE;
/*!40000 ALTER TABLE `clasp_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `clasp_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dial_finish`
--

DROP TABLE IF EXISTS `dial_finish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dial_finish` (
  `iddial_finish` int NOT NULL AUTO_INCREMENT,
  `dial_finish_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`iddial_finish`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dial_finish`
--

LOCK TABLES `dial_finish` WRITE;
/*!40000 ALTER TABLE `dial_finish` DISABLE KEYS */;
/*!40000 ALTER TABLE `dial_finish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `idtable1` int NOT NULL AUTO_INCREMENT,
  `question` longtext,
  `answer` longtext,
  PRIMARY KEY (`idtable1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functions` (
  `idfunctions` int NOT NULL AUTO_INCREMENT,
  `function_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idfunctions`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hour_maker_type`
--

DROP TABLE IF EXISTS `hour_maker_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hour_maker_type` (
  `idhour_maker_type` int NOT NULL AUTO_INCREMENT,
  `hour_maker_type_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idhour_maker_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hour_maker_type`
--

LOCK TABLES `hour_maker_type` WRITE;
/*!40000 ALTER TABLE `hour_maker_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `hour_maker_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `is_favorite`
--

DROP TABLE IF EXISTS `is_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `is_favorite` (
  `user_iduser` int NOT NULL,
  `watch_idwatch` int NOT NULL,
  PRIMARY KEY (`user_iduser`,`watch_idwatch`),
  KEY `fk_user_has_watch_watch1_idx` (`watch_idwatch`),
  KEY `fk_user_has_watch_user_idx` (`user_iduser`),
  CONSTRAINT `fk_user_has_watch_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_user_has_watch_watch1` FOREIGN KEY (`watch_idwatch`) REFERENCES `watch` (`idwatch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `is_favorite`
--

LOCK TABLES `is_favorite` WRITE;
/*!40000 ALTER TABLE `is_favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `is_favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `market_data`
--

DROP TABLE IF EXISTS `market_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `market_data` (
  `idmarket_data` int NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT NULL,
  `price_date` datetime DEFAULT NULL,
  PRIMARY KEY (`idmarket_data`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `market_data`
--

LOCK TABLES `market_data` WRITE;
/*!40000 ALTER TABLE `market_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `market_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movement_type`
--

DROP TABLE IF EXISTS `movement_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movement_type` (
  `idmovement_type` int NOT NULL AUTO_INCREMENT,
  `movement_type` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idmovement_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movement_type`
--

LOCK TABLES `movement_type` WRITE;
/*!40000 ALTER TABLE `movement_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `movement_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_archive`
--

DROP TABLE IF EXISTS `order_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_archive` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `user_saler_id` int NOT NULL,
  `user_order_id` int NOT NULL,
  `price` int DEFAULT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `street_number` int DEFAULT NULL,
  `street` varchar(200) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `watch_id` int NOT NULL,
  `user_iduser` int NOT NULL,
  PRIMARY KEY (`idorder`),
  KEY `fk_order_archive_user1_idx` (`user_iduser`),
  KEY `fk_order_archive_watch1_idx` (`watch_id`),
  CONSTRAINT `fk_order_archive_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_order_archive_watch1` FOREIGN KEY (`watch_id`) REFERENCES `watch` (`idwatch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_archive`
--

LOCK TABLES `order_archive` WRITE;
/*!40000 ALTER TABLE `order_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `idphoto` int NOT NULL AUTO_INCREMENT,
  `url_photo1` varchar(2048) DEFAULT NULL,
  `url_photo2` varchar(2048) DEFAULT NULL,
  `url_photo3` varchar(2048) DEFAULT NULL,
  `url_photo4` varchar(2048) DEFAULT NULL,
  `url_photo5` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`idphoto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_certif`
--

DROP TABLE IF EXISTS `photo_certif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo_certif` (
  `idphoto_certif` int NOT NULL AUTO_INCREMENT,
  `url_photo_certif1` varchar(2048) DEFAULT NULL,
  `url_photo_certif2` varchar(2048) DEFAULT NULL,
  `url_photo_certif3` varchar(2048) DEFAULT NULL,
  `url_photo_certif4` varchar(2048) DEFAULT NULL,
  `url_photo_certif5` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`idphoto_certif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_certif`
--

LOCK TABLES `photo_certif` WRITE;
/*!40000 ALTER TABLE `photo_certif` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo_certif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `idreviews` int NOT NULL AUTO_INCREMENT,
  `review_title` varchar(45) DEFAULT NULL,
  `note` int DEFAULT NULL,
  `comment` longtext,
  `user_iduser` int DEFAULT NULL,
  PRIMARY KEY (`idreviews`),
  KEY `fk_reviews_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_reviews_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strap_material`
--

DROP TABLE IF EXISTS `strap_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `strap_material` (
  `idstrap_material` int NOT NULL AUTO_INCREMENT,
  `strap_material_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idstrap_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strap_material`
--

LOCK TABLES `strap_material` WRITE;
/*!40000 ALTER TABLE `strap_material` DISABLE KEYS */;
/*!40000 ALTER TABLE `strap_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `e_mail_UNIQUE` (`e_mail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
TRUNCATE TABLE `user`;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (firstname, lastname, birthdate, user_type, e_mail, user_role) 
VALUES ('Anaïs','B','1980-01-01','Developpeur Web','anaisberthome@gmail.com','admin'),('Aurélie','Dumotier','1986-02-14','Developpeur Web','aurelie.dumotier@gmail.com','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watch`
--

DROP TABLE IF EXISTS `watch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watch` (
  `idwatch` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `brand` varchar(45) NOT NULL,
  `model` varchar(100) NOT NULL,
  `ref_no` int DEFAULT NULL,
  `production_year` date DEFAULT NULL,
  `is_limited_edition` tinyint DEFAULT NULL,
  `edition_number` varchar(45) DEFAULT NULL,
  `photo_id` int DEFAULT NULL,
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
  `certificate_id` int DEFAULT NULL,
  `movement_type_id` int DEFAULT NULL,
  `caliber` varchar(45) DEFAULT NULL,
  `functions_id` int DEFAULT NULL,
  `power_reserve_hours` int DEFAULT NULL,
  `frequency_hz` int DEFAULT NULL,
  `jewel_count` int DEFAULT NULL,
  `market_data_id` int NOT NULL,
  `order_archive_id` int NOT NULL,
  `order_archive_watch_id` int NOT NULL,
  PRIMARY KEY (`idwatch`),
  KEY `fk_watch_market_data1_idx` (`market_data_id`),
  KEY `fk_watch_case_material1_idx` (`case_material_id`),
  KEY `fk_watch_dial_finish1_idx` (`dial_finish_id`),
  KEY `fk_watch_hour_maker_type1_idx` (`hour_marker_type_id`),
  KEY `fk_watch_photo1_idx` (`photo_id`),
  KEY `fk_watch_strap_material1_idx` (`strap_material_id`),
  KEY `fk_watch_clasp_type1_idx` (`clasp_type_id`),
  KEY `fk_watch_certificate_id1_idx` (`certificate_id`),
  KEY `fk_watch_movement_type1_idx` (`movement_type_id`),
  KEY `fk_watch_functions1_idx` (`functions_id`),
  CONSTRAINT `fk_watch_case_material1` FOREIGN KEY (`case_material_id`) REFERENCES `case_material` (`idcase_material`),
  CONSTRAINT `fk_watch_certificate_id1` FOREIGN KEY (`certificate_id`) REFERENCES `certificate_id` (`idcertificate_id`),
  CONSTRAINT `fk_watch_clasp_type1` FOREIGN KEY (`clasp_type_id`) REFERENCES `clasp_type` (`idclasp_type`),
  CONSTRAINT `fk_watch_dial_finish1` FOREIGN KEY (`dial_finish_id`) REFERENCES `dial_finish` (`iddial_finish`),
  CONSTRAINT `fk_watch_functions1` FOREIGN KEY (`functions_id`) REFERENCES `functions` (`idfunctions`),
  CONSTRAINT `fk_watch_hour_maker_type1` FOREIGN KEY (`hour_marker_type_id`) REFERENCES `hour_maker_type` (`idhour_maker_type`),
  CONSTRAINT `fk_watch_market_data1` FOREIGN KEY (`market_data_id`) REFERENCES `market_data` (`idmarket_data`),
  CONSTRAINT `fk_watch_movement_type1` FOREIGN KEY (`movement_type_id`) REFERENCES `movement_type` (`idmovement_type`),
  CONSTRAINT `fk_watch_photo1` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`idphoto`),
  CONSTRAINT `fk_watch_strap_material1` FOREIGN KEY (`strap_material_id`) REFERENCES `strap_material` (`idstrap_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watch`
--

LOCK TABLES `watch` WRITE;
/*!40000 ALTER TABLE `watch` DISABLE KEYS */;
/*!40000 ALTER TABLE `watch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watch_has_cart`
--

DROP TABLE IF EXISTS `watch_has_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watch_has_cart` (
  `watch_idwatch` int NOT NULL,
  `cart_idcart` int NOT NULL,
  PRIMARY KEY (`watch_idwatch`,`cart_idcart`),
  KEY `fk_watch_has_cart_cart1_idx` (`cart_idcart`),
  KEY `fk_watch_has_cart_watch1_idx` (`watch_idwatch`),
  CONSTRAINT `fk_watch_has_cart_cart1` FOREIGN KEY (`cart_idcart`) REFERENCES `cart` (`idcart`),
  CONSTRAINT `fk_watch_has_cart_watch1` FOREIGN KEY (`watch_idwatch`) REFERENCES `watch` (`idwatch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watch_has_cart`
--

LOCK TABLES `watch_has_cart` WRITE;
/*!40000 ALTER TABLE `watch_has_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `watch_has_cart` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-18 15:12:02
