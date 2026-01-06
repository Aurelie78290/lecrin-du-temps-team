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

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `idarticles` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(100) DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `content` longtext,
  `reference_source` varchar(45) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
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
INSERT INTO `articles` VALUES (1,'Rolex Submariner : une icône intemporelle','La Rolex Submariner, montre de plongée légendaire, allie robustesse, élégance et précision, séduisant amateurs, collectionneurs et sportifs depuis plus de 70 ans.','2025-05-10','Depuis sa création en 1953, la Rolex Submariner est devenue une référence absolue dans le monde de l’horlogerie. Conçue pour résister aux conditions extrêmes de la plongée sous-marine, elle séduit aujourd’hui autant les sportifs que les collectionneurs.','Rolex','https://i.pinimg.com/1200x/51/f4/52/51f4525c5f44c86aa4ddf8087ff7040e.jpg',3),(2,'Patek Philippe : l’art de la transmission','Patek Philippe incarne l’excellence suisse, combinant héritage, techniques horlogères avancées et montres conçues pour traverser les générations avec raffinement.','2025-08-15','Patek Philippe est synonyme d’excellence horlogère depuis 1839. Chaque montre est conçue pour durer et se transmettre de génération en génération.','Le Point','https://i.pinimg.com/1200x/b0/49/27/b0492785efa2860ac95002605145d103.jpg',3),(3,'Audemars Piguet Royal Oak','La Royal Oak, montre iconique, a révolutionné le luxe avec son design octogonal, son bracelet intégré et son style sport-chic devenu un classique intemporel.','2025-10-20','Présentée en 1972, la Royal Oak d’Audemars Piguet a bouleversé les codes de l’horlogerie de luxe avec son boîtier octogonal et son bracelet intégré.  ','Horloger','https://i.pinimg.com/1200x/ab/0b/47/ab0b470061b50522bbaff7e4d3126530.jpg',3),(4,'Omega Speedmaster : la montre lunaire','La Speedmaster, premier chronographe sur la Lune, allie précision, robustesse et design emblématique, célébrant l’exploration spatiale et l’excellence horlogère.','2025-11-25','L’Omega Speedmaster est célèbre pour avoir accompagné les astronautes lors des missions Apollo. Testée et approuvée par la NASA, elle est devenue la première montre portée sur la Lune en 1969.  ','Le Monde','https://i.pinimg.com/1200x/22/e8/f9/22e8f9163b1027f5273ca20f82546adc.jpg',3),(5,'Les 10 meilleures marques de montres de tous les temps','Un classement détaillé des maisons horlogères les plus prestigieuses, explorant leur histoire, leur influence et leurs créations emblématiques à travers le temps.','2025-12-01','L’univers de l’horlogerie de luxe regorge de marques prestigieuses qui ont marqué l’histoire. Voici un classement des 10 maisons incontournables :  ','Le Point','https://i.pinimg.com/736x/1f/18/a1/1f18a10cc0617ae6066e8b28701813e2.jpg',3);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

INSERT INTO articles (
  article_title,
  subtitle,
  release_date,
  content,
  reference_source,
  photo,
  user_iduser
)
VALUES (
  'Richard Mille : l’horlogerie du futur',
  'Richard Mille combine design futuriste et technologies avancées, créant des montres légères, performantes et spectaculaires, véritables exploits d’ingénierie contemporaine.',
  '2026-01-05',
  'Richard Mille a révolutionné l’horlogerie contemporaine en combinant innovation technique, matériaux high-tech et design futuriste. Chaque montre est conçue comme un exploit d’ingénierie...',
  'Richard Mille',
  'https://i.pinimg.com/736x/25/11/05/251105e10415063dfc556b9f7187c7ea.jpg',
  3
);

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
INSERT INTO `faq` (question, answer) 
VALUES ('Comment acheter une montre sur le site l''Écrin du temps?', 'Parcourez notre catalogue, ajoutez votre montre au panier et suivez les étapes de paiement sécurisé. Un e-mail de confirmation vous sera envoyé.'),
('Que comprend le prix de vente d''une montre?', 'Le prix inclut la montre, son certificat d''authenticité, l''écrin d''origine, une garantie de 24 mois et le contrôle technique de nos experts.'),
('À quoi correspond le numéro de référence d''une montre de luxe?', 'C''est l''identifiant unique du modèle qui précise la marque, la collection et les matériaux utilisés. C''est essentiel pour la traçabilité.'),
('Dois-je être inscrit sur l''Écrin du Temps pour passer commande?', 'Oui, l''inscription est obligatoire. La création d''un compte client nous permet de sécuriser vos transactions et de gérer vos garanties.'),
('Comment faire part de mes doutes concernant l''authenticité d''une montre?', 'L''authenticité est notre priorité. Utilisez la section "Contact" située juste en dessous de cette FAQ pour nous envoyer un message direct.'),
('Quels sont les délais de livraison et les frais d''expédition d''une montre?', 'Expédition sous 48h et livraison en 3 à 5 jours. Les frais sont calculés au panier selon la valeur et la destination.'),
('Suis-je assuré(e) en cas de dommage ou de vol pendant le transport?', 'Absolument. Toutes nos expéditions sont couvertes par une assurance "ad valorem" à hauteur de la valeur réelle de la montre.');
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
INSERT INTO photo (
  url_photo1,
  url_photo2,
  url_photo3,
  url_photo4,
  url_photo5
) VALUES

-- 1 Rolex Submariner
('watches/1/photo1.webp','watches/1/photo2.webp','watches/1/photo3.webp','watches/1/photo4.webp','watches/1/photo5.webp'),

-- 2 Rolex GMT Batman
('watches/2/photo1.webp','watches/2/photo2.webp','watches/2/photo3.webp','watches/2/photo4.webp','watches/2/photo5.webp'),

-- 3 Omega Speedmaster
('watches/3/photo1.webp','watches/3/photo2.webp','watches/3/photo3.webp','watches/3/photo4.webp','watches/3/photo5.webp'),

-- 4 Omega Seamaster
('watches/4/photo1.webp','watches/4/photo2.webp','watches/4/photo3.webp','watches/4/photo4.webp','watches/4/photo5.webp'),

-- 5 Cartier Santos
('watches/5/photo1.webp','watches/5/photo2.webp','watches/5/photo3.webp','watches/5/photo4.webp','watches/5/photo5.webp'),

-- 6 Cartier Tank
('watches/6/photo1.webp','watches/6/photo2.webp','watches/6/photo3.webp','watches/6/photo4.webp','watches/6/photo5.webp'),

-- 7 Seiko Prospex
('watches/7/photo1.webp','watches/7/photo2.webp','watches/7/photo3.webp','watches/7/photo4.webp','watches/7/photo5.webp'),

-- 8 Seiko 5 GMT
('watches/8/photo1.webp','watches/8/photo2.webp','watches/8/photo3.webp','watches/8/photo4.webp','watches/8/photo5.webp'),

-- 9 Tudor Black Bay 58
('watches/9/photo1.webp','watches/9/photo2.webp','watches/9/photo3.webp','watches/9/photo4.webp','watches/9/photo5.webp'),

-- 10 Tudor Black Bay 41
('watches/10/photo1.webp','watches/10/photo2.webp','watches/10/photo3.webp','watches/10/photo4.webp','watches/10/photo5.webp'),

-- 11 TAG Heuer Carrera
('watches/11/photo1.webp','watches/11/photo2.webp','watches/11/photo3.webp','watches/11/photo4.webp','watches/11/photo5.webp'),

-- 12 TAG Heuer Formula 1
('watches/12/photo1.webp','watches/12/photo2.webp','watches/12/photo3.webp','watches/12/photo4.webp','watches/12/photo5.webp'),

-- 13 IWC Portugieser
('watches/13/photo1.webp','watches/13/photo2.webp','watches/13/photo3.webp','watches/13/photo4.webp','watches/13/photo5.webp'),

-- 14 IWC Mark XX
('watches/14/photo1.webp','watches/14/photo2.webp','watches/14/photo3.webp','watches/14/photo4.webp','watches/14/photo5.webp'),

-- 15 Breitling Navitimer
('watches/15/photo1.webp','watches/15/photo2.webp','watches/15/photo3.webp','watches/15/photo4.webp','watches/15/photo5.webp'),

-- 16 Breitling Superocean
('watches/16/photo1.webp','watches/16/photo2.webp','watches/16/photo3.webp','watches/16/photo4.webp','watches/16/photo5.webp'),

-- 17 Grand Seiko Snowflake
('watches/17/photo1.webp','watches/17/photo2.webp','watches/17/photo3.webp','watches/17/photo4.webp','watches/17/photo5.webp'),

-- 18 Grand Seiko Elegance GMT
('watches/18/photo1.webp','watches/18/photo2.webp','watches/18/photo3.webp','watches/18/photo4.webp','watches/18/photo5.webp'),

-- 19 Longines Moonphase
('watches/19/photo1.webp','watches/19/photo2.webp','watches/19/photo3.webp','watches/19/photo4.webp','watches/19/photo5.webp'),

-- 20 Longines HydroConquest
('watches/20/photo1.webp','watches/20/photo2.webp','watches/20/photo3.webp','watches/20/photo4.webp','watches/20/photo5.webp');

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
-- TRUNCATE TABLE 'reviews';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO reviews (review_title, note, comment, user_iduser) 
VALUES ('Avis client',5,"La montre était exactement comme décrite par le vendeur. J'ai apprécié les nombreuses photos haute résolution qu'il a fournies et sa réponse rapide à mes questions sur l'historique de révision. La plateforme de l'Ecrin du temps a facilité la mise en relation sécurisée.",2),
('Avis client',4,"C'était la première fois que j'achetais une montre d'occasion aussi chère en ligne à un particulier. Le processus de paiement sécurisé m'a permis d'inspecter la montre avan que le vendeur ne reçoit les fonds. un gage de confiance indispensable pour ce type de transaction. Très professionnel.",2),
('Avis vendeur',3,"J'ai opté pour le service de conciergerie où l’Écrin du temps s'occupe de tout (photos professionnelles, description, négociation). Cela justifie amplement la commission. La montre a été vendue rapidement et je n'ai eu à m'occuper de rien, à part l'envoi sécurisé au centre d'authentification. Une solution parfaite pour vendre une pièce de très haute valeur sans stress.",2),
('Avis vendeur',5,"J'ai vendu ma Cartier en moins de deux semaines via cette plateforme. La commission est juste, et le fait que l'acheteur ait un système de séquestre garantit une vente sérieuse. J'ai été payée immédiatement après la confirmation de l'authentification. Interface de vente très claire et excellent support client pour m'aider à remplir l'annonce.",2);
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
VALUES ('Anaïs','B','1980-01-01','Developpeur Web','anaisberthome@gmail.com','admin'),
('Joachim','Masson','1980-01-01','Developpeur Web','joachim.masson.17@gmail.com','admin'),
('Aurélie','Dumotier','1986-02-14','Developpeur Web','aurelie.dumotier@gmail.com','admin');
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
  `market_data_id` int NULL,
  `order_archive_id` int NULL,
  `order_archive_watch_id` int NULL,
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

INSERT INTO watch (
  user_id,
  brand,
  model,
  ref_no,
  production_year,
  is_limited_edition,
  edition_number,
  photo_id,
  watch_gender,
  watch_sell_status,
  watch_price,
  case_material_id,
  diameter_mm,
  thickness_mm,
  water_resistance_bar,
  dial_color,
  dial_finish_id,
  hour_marker_type_id,
  strap_material_id,
  strap_color,
  clasp_type_id,
  lug_width_mm,
  watch_condition,
  certificate_id,
  movement_type_id,
  caliber,
  functions_id,
  power_reserve_hours,
  frequency_hz,
  jewel_count,
  market_data_id,
  order_archive_id,
  order_archive_watch_id
) VALUES

-- 1 Rolex Submariner No-Date
(1,'Rolex','Submariner No-Date',124060,'2022-01-01',0,NULL,1,'Homme','En vente',12450,
1,41,12,30,'Noir',1,1,1,'Acier',1,21,'Très bon état',1,1,'3230',1,70,4,31,1,1,1),

-- 2 Rolex GMT-Master II Batman
(1,'Rolex','GMT-Master II Batman',126710,'2021-01-01',0,NULL,2,'Homme','En vente',15990,
1,40,12,10,'Noir',1,1,1,'Acier',1,20,'Excellent état',1,1,'3285',3,70,4,31,1,1,1),

-- 3 Omega Speedmaster Moonwatch
(1,'Omega','Speedmaster Moonwatch',31042,'2020-01-01',0,NULL,3,'Homme','En vente',6750,
1,42,13,5,'Noir',1,2,1,'Acier',1,20,'Très bon état',1,2,'3861',2,50,3,26,1,1,1),

-- 4 Omega Seamaster Diver 300M
(1,'Omega','Seamaster Diver 300M',21042,'2022-01-01',0,NULL,4,'Homme','En vente',4650,
1,42,14,30,'Noir',2,1,1,'Acier',1,20,'Excellent état',1,1,'8800',1,55,3,35,1,1,1),

-- 5 Cartier Santos Medium
(1,'Cartier','Santos Medium',4848,'2023-01-01',0,NULL,5,'Unisexe','En vente',6250,
1,35,9,10,'Argent',1,3,1,'Acier',1,18,'Excellent état',1,1,'1847 MC',1,42,4,23,1,1,1),

-- 6 Cartier Tank Must Large
(1,'Cartier','Tank Must Large',9992,'2022-01-01',0,NULL,6,'Unisexe','En vente',3350,
1,34,7,3,'Argent',3,3,2,'Noir',2,19,'Très bon état',1,3,'Quartz Cartier',1,NULL,NULL,NULL,1,1,1),

-- 7 Seiko Prospex Diver
(1,'Seiko','Prospex Diver 200m',1431,'2021-01-01',0,NULL,7,'Homme','En vente',850,
1,41,13,20,'Gris',1,1,1,'Acier',1,20,'Bon état',1,1,'6R35',1,70,3,24,1,1,1),

-- 8 Seiko 5 Sports GMT
(1,'Seiko','5 Sports GMT',3003,'2023-01-01',0,NULL,8,'Homme','En vente',420,
1,43,14,10,'Noir',2,2,1,'Acier',1,22,'Très bon état',1,1,'4R34',3,41,3,24,1,1,1),

-- 9 Tudor Black Bay 58
(1,'Tudor','Black Bay 58',9030,'2020-01-01',0,NULL,9,'Homme','En vente',3150,
1,39,12,20,'Noir',1,1,1,'Acier',1,20,'Très bon état',1,1,'MT5402',1,70,4,27,1,1,1),

-- 10 Tudor Black Bay 41
(1,'Tudor','Black Bay 41 Burgundy',7941,'2023-01-01',0,NULL,10,'Homme','En vente',3850,
1,41,14,20,'Bordeaux',2,1,1,'Acier',1,21,'Excellent état',1,1,'MT5602',1,70,4,25,1,1,1),

-- 11 TAG Heuer Carrera Chronograph
(1,'TAG Heuer','Carrera Chronograph 42',2010,'2021-01-01',0,NULL,11,'Homme','En vente',4650,
1,42,14,10,'Bleu',2,1,1,'Acier',1,22,'Très bon état',1,1,'Heuer 02',2,80,4,33,1,1,1),

-- 12 TAG Heuer Formula 1 Quartz
(1,'TAG Heuer','Formula 1 Quartz',1110,'2019-01-01',0,NULL,12,'Homme','En vente',1100,
1,41,12,20,'Noir',1,2,1,'Acier',1,20,'Bon état',1,3,'Quartz',1,NULL,NULL,NULL,1,1,1),

-- 13 IWC Portugieser Chronograph
(1,'IWC','Portugieser Chronograph',3716,'2022-01-01',0,NULL,13,'Homme','En vente',6150,
1,41,13,3,'Vert',2,1,2,'Vert',2,20,'Excellent état',1,1,'69355',2,46,4,33,1,1,1),

-- 14 IWC Pilot Mark XX
(1,'IWC','Pilot Mark XX',3283,'2023-01-01',0,NULL,14,'Homme','En vente',4950,
1,40,11,10,'Noir',1,2,2,'Brun',2,20,'Excellent état',1,1,'32111',1,120,4,21,1,1,1),

-- 15 Breitling Navitimer B01
(1,'Breitling','Navitimer B01',1341,'2020-01-01',0,NULL,15,'Homme','En vente',6850,
1,43,14,3,'Noir',4,4,1,'Acier',1,22,'Très bon état',1,1,'B01',2,70,4,47,1,1,1),

-- 16 Breitling Superocean 44
(1,'Breitling','Superocean 44',1910,'2021-01-01',0,NULL,16,'Homme','En vente',3250,
1,44,13,100,'Bleu',2,2,1,'Acier',1,22,'Très bon état',1,1,'Breitling 17',1,38,4,26,1,1,1),

-- 17 Grand Seiko Snowflake
(1,'Grand Seiko','Snowflake',211,'2018-01-01',0,NULL,17,'Homme','En vente',5350,
2,41,13,10,'Blanc',4,1,3,'Titane',1,20,'Très bon état',1,1,'9R65',1,72,0,30,1,1,1),

-- 18 Grand Seiko Elegance GMT
(1,'Grand Seiko','Elegance GMT',221,'2019-01-01',0,NULL,18,'Homme','En vente',3950,
1,40,14,3,'Crème',3,4,2,'Brun',2,19,'Très bon état',1,1,'9S66',3,72,4,35,1,1,1),

-- 19 Longines Master Moonphase
(1,'Longines','Master Moonphase',2628,'2020-01-01',0,NULL,19,'Homme','En vente',1850,
1,40,11,3,'Argent',3,3,1,'Acier',1,21,'Bon état',1,1,'L899',4,64,3,21,1,1,1),

-- 20 Longines HydroConquest
(1,'Longines','HydroConquest 41',3781,'2022-01-01',0,NULL,20,'Homme','En vente',1350,
1,41,12,30,'Vert',2,1,1,'Acier',1,21,'Très bon état',1,1,'L888',1,72,3,21,1,1,1);
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
