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
  `subtitle` varchar(200) DEFAULT NULL,
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
INSERT INTO `articles` VALUES (1,'Rolex Submariner : une icône intemporelle','La Rolex Submariner, montre de plongée légendaire, allie robustesse, élégance et précision, séduisant amateurs, collectionneurs et sportifs depuis plus de 70 ans.','2025-05-10','Depuis sa création en 1953, la Rolex Submariner est devenue une référence absolue dans le monde de l’horlogerie. Conçue à l’origine pour répondre aux exigences des plongeurs professionnels, elle fut l’une des premières montres capables de garantir une étanchéité fiable en milieu sous-marin, marquant une avancée majeure à son époque. Sa lunette tournante graduée, son cadran lisible dans l’obscurité et sa robustesse exemplaire ont rapidement fait d’elle un outil indispensable pour l’exploration sous-marine. Au fil des décennies, la Submariner a su évoluer sans jamais renier son identité. Améliorations techniques, mouvements toujours plus précis et matériaux innovants ont renforcé sa fiabilité, tout en conservant des lignes immédiatement reconnaissables. Cette continuité esthétique, rare dans l’horlogerie moderne, contribue largement à son aura intemporelle. Aujourd’hui, la Rolex Submariner dépasse largement son rôle d’instrument de plongée. Elle séduit autant les sportifs que les amateurs de belles mécaniques et les collectionneurs, devenant un véritable symbole de statut et de goût raffiné. Polyvalente, élégante et chargée d’histoire, elle incarne parfaitement l’héritage et l’exigence de qualité qui font la renommée de Rolex à travers le monde.','Rolex','https://i.pinimg.com/1200x/51/f4/52/51f4525c5f44c86aa4ddf8087ff7040e.jpg',3),(2,'Patek Philippe : l’art de la transmission','Patek Philippe incarne l’excellence suisse, combinant héritage, techniques horlogères avancées et montres conçues pour traverser les générations avec raffinement.','2025-08-15','Patek Philippe est synonyme d’excellence horlogère depuis 1839. Chaque montre est conçue pour durer et se transmettre de génération en génération. Les complications horlogères, telles que les calendriers perpétuels ou les répétitions minutes, témoignent d’une maîtrise technique exceptionnelle. Les finitions manuelles, poli miroir ou gravures minutieuses, montrent un savoir-faire rare et précieux. Posséder une Patek Philippe, c’est posséder un héritage, un témoignage d’artisanat suisse haut de gamme et de prestige durable. Au fil des décennies, Patek Philippe a su préserver son indépendance et son exigence absolue en matière de qualité, refusant toute concession à la production de masse. Chaque garde-temps fait l’objet de contrôles rigoureux et respecte des standards internes parmi les plus stricts de l’industrie, garantissant une précision et une fiabilité remarquables dans le temps. La maison genevoise cultive également une relation particulière avec ses collectionneurs, fondée sur la rareté, la transmission et la valeur émotionnelle. Bien plus qu’une montre, une Patek Philippe représente un lien entre les générations, un objet porteur d’histoire et de sens, qui incarne pleinement la philosophie de la manufacture : créer aujourd’hui les montres que le monde admirera demain.','Le Point','https://i.pinimg.com/1200x/b0/49/27/b0492785efa2860ac95002605145d103.jpg',3),(3,'Audemars Piguet Royal Oak','La Royal Oak, montre iconique, a révolutionné le luxe avec son design octogonal, son bracelet intégré et son style sport-chic devenu un classique intemporel.','2025-10-20','Présentée en 1972, la Royal Oak d’Audemars Piguet a bouleversé les codes de l’horlogerie de luxe avec son boîtier octogonal et son bracelet intégré. Ce design audacieux, imaginé par Gérald Genta, a créé une nouvelle catégorie de montres sport-chic, mêlant acier et raffinement. Les finitions de la Royal Oak, notamment le fameux cadran « Tapisserie », restent emblématiques et reconnaissables entre tous. Aujourd’hui, la Royal Oak est un symbole de modernité et d’innovation, portée par les amateurs de design et de mécanique fine à travers le monde. Au-delà de son esthétique révolutionnaire, la Royal Oak se distingue par une qualité d’exécution exceptionnelle. Chaque surface du boîtier et du bracelet fait l’objet d’un travail minutieux alternant satinage et polissage, témoignant du savoir-faire artisanal d’Audemars Piguet. Ce niveau de finition, rarement associé à une montre en acier à sa sortie, a contribué à redéfinir la notion même de luxe horloger. Au fil des décennies, la Royal Oak a donné naissance à de nombreuses déclinaisons, intégrant complications horlogères et matériaux innovants, tout en conservant son identité forte. Véritable icône contemporaine, elle incarne l’audace créative et l’excellence technique de la manufacture, s’imposant comme une référence incontournable pour les passionnés de haute horlogerie et de design avant-gardiste.','Horloger','https://i.pinimg.com/1200x/ab/0b/47/ab0b470061b50522bbaff7e4d3126530.jpg',3),(4,'Omega Speedmaster : la montre lunaire','La Speedmaster, premier chronographe sur la Lune, allie précision, robustesse et design emblématique, célébrant l’exploration spatiale et l’excellence horlogère.','2025-11-25','L’Omega Speedmaster est célèbre pour avoir accompagné les astronautes lors des missions Apollo. Testée et approuvée par la NASA, elle est devenue la première montre portée sur la Lune en 1969. Sa précision, sa robustesse et sa lisibilité ont été mises à l’épreuve dans des conditions extrêmes. Les passionnés d’horlogerie admirent encore aujourd’hui la combinaison unique de technologie et d’histoire contenue dans chaque Speedmaster. Au-delà de sa dimension historique, la Speedmaster reste un chronographe moderne, élégant et performant, idéal pour tous ceux qui recherchent un instrument fiable et emblématique. a Speedmaster occupe également une place particulière dans l’imaginaire collectif. Étroitement associée à la conquête spatiale, elle incarne l’esprit d’aventure, d’innovation et de dépassement de soi. Porter une Speedmaster, c’est ainsi arborer un fragment de l’histoire humaine, tout en affirmant un goût certain pour les montres au caractère affirmé et à la légitimité incontestable.','Le Monde','https://i.pinimg.com/1200x/22/e8/f9/22e8f9163b1027f5273ca20f82546adc.jpg',3),(5,'Les 10 meilleures marques de montres de tous les temps','Un classement détaillé des maisons horlogères les plus prestigieuses, explorant leur histoire, leur influence et leurs créations emblématiques à travers le temps.','2025-12-01','L’univers de l’horlogerie de luxe regorge de marques prestigieuses qui ont marqué l’histoire. Voici un classement des 10 maisons incontournables : 
1. Rolex : Symbole d’élégance et de fiabilité, la Submariner reste une icône intemporelle.  
2. Patek Philippe : L’art de la transmission, chaque montre est un héritage à transmettre.  
3. Audemars Piguet : La Royal Oak a révolutionné le luxe avec son design audacieux.  
4. Omega : La Speedmaster, première montre sur la Lune, un mélange de performance et d’histoire.  
5. Jaeger-LeCoultre : Réputée pour ses mouvements complexes et son raffinement.  
6. Vacheron Constantin : Plus de 260 ans de savoir-faire horloger d’exception.  
7. Cartier : L’élégance à la française, des modèles emblématiques et intemporels.  
8. Richard Mille : Innovation technique et design futuriste, une horlogerie d’avant-garde.  
9. TAG Heuer : Montres sportives et chronographes emblématiques depuis plus d’un siècle.  
10. Breitling : Spécialiste des montres d’aviation, précision et robustesse au programme. Ce classement reflète à la fois l’histoire, l’innovation et l’impact culturel de ces marques dans le monde entier. Chaque maison a su créer un univers unique, mêlant tradition et excellence. ','Le Point','https://i.pinimg.com/736x/1f/18/a1/1f18a10cc0617ae6066e8b28701813e2.jpg',3);
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
  'Richard Mille a révolutionné l’horlogerie contemporaine en combinant innovation technique, matériaux high-tech et design futuriste. Chaque montre est conçue comme un exploit d’ingénierie : du titane aux composites carbone, tout est pensé pour la légèreté, la résistance et la performance. Les mouvements sont visibles, souvent suspendus, révélant le cœur mécanique de l’instrument.Posséder une Richard Mille, c’est investir dans une technologie de pointe et un design audacieux, qui repousse les limites de l’horlogerie traditionnelle. Cette montre emblématique allie robustesse et élégance. Son design a peu évolué au fil des décennies, ce qui en fait un modèle immédiatement reconnaissable. Chaque détail, de la lunette tournante aux index luminescents, a été pensé pour l’efficacité et la lisibilité sous l’eau. Au-delà de la prouesse technique, Richard Mille revendique une approche radicalement moderne de l’horlogerie, inspirée des univers de la compétition automobile, de l’aéronautique et du sport de haut niveau. Ces garde-temps, souvent produits en séries limitées, s’adressent à une clientèle en quête d’exclusivité et de performances extrêmes, où chaque gramme et chaque micron comptent. Porter une Richard Mille, c’est afficher une vision contemporaine du luxe, où l’innovation prime sur la tradition, sans jamais renoncer à l’excellence mécanique. Véritable manifeste horloger, la marque continue de bousculer les codes et d’imposer une identité forte, immédiatement identifiable sur le poignet.',
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
INSERT INTO `order_archive` (user_saler_id, user_order_id, price, purchase_date, watch_id, user_iduser) 
VALUES (2, 3, 4000, 20251225, 2, 2),
(2, 3, 4000, 20260107, 3, 2),
(2, 3, 4000, 20260108, 4, 2),
(2, 3, 4000, 20260109, 5, 2),
(2, 3, 4000, 20260202, 6, 2);
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
INSERT INTO `user` (firstname, lastname, birthdate, user_type, e_mail, user_role, user_describe) 
VALUES ('Anaïs','B','1980-01-01','Directrice Éditoriale & Curatrice','anaisberthome@gmail.com','admin', "Historienne de l'art, elle veille à la qualité des articles et au respect de l'héritage des manufactures. Elle déniche les pièces rares."),
('Joachim','Masson','1980-01-01','Expert Technique & Authentification','joachim.masson.17@gmail.com','admin', "Ancien horloger certifié, il est le garant de la véracité technique et aide à identifier les contrefaçons (le 'LC' pour Legit Check)."),
('Aurélie','Dumotier','1986-02-14','Responsable Communauté & Évenements','aurelie.dumotier@gmail.com','admin', "Spécialiste en communication de luxe, elle gère les membres VIP et organise les rencontres physiques entre passionnés (les 'GTG')."),
('Thomas','P','2000-01-01','Développeur & Webmaster','thomas.p@gmail.com','admin', "Passionné de 'Toolwatches', il assure la fluidité du site, la sécurité des transactions et l'optimisation de l'interface utilisateur."),
('Mathieu', 'H', '2000-01-01', 'Analyste Marché & Cote', 'mathieu.h@gmail.com','admin', "Expert en économie, il suit l'évolution des prix et les ventes aux enchères pour conseiller les membres sur l'investissement horloger."),
('Romain', 'Debas', '1988-02-02', 'Responsable Image & Partenriats', 'romain.debas@gmail.com','admin', "Photographe spécialisé en macro-horlogerie, il gère l'identité visuelle du site et les relations avec les grandes maisons.");
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
  `brand_id` int NOT NULL,
  `model_id` int NOT NULL,
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
  KEY `fk_watch_brand_idx` (`brand_id`),
  KEY `fk_watch_model_idx` (`model_id`),
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
  CONSTRAINT `fk_watch_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`),
  CONSTRAINT `fk_watch_model` FOREIGN KEY (`model_id`) REFERENCES `model`(`id`),
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
  brand_id,
  model_id,
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

-- 1 Rolex Submariner (brand_id=1, model_id=1)
(1, 1, 1, 124060, '2022-01-01', 0, NULL, 1, 'Homme', 'En vente', 12450,
1, 41, 12, 30, 'Noir', 1, 1, 1, 'Acier', 1, 21, 'Très bon état', 1, 1, '3230', 1, 70, 4, 31, 1, 1, 1),

-- 2 Rolex GMT-Master II (brand_id=1, model_id=7)
(1, 1, 7, 126710, '2021-01-01', 0, NULL, 2, 'Homme', 'En vente', 15990,
1, 40, 12, 10, 'Noir', 1, 1, 1, 'Acier', 1, 20, 'Excellent état', 1, 1, '3285', 3, 70, 4, 31, 1, 1, 1),

-- 3 Omega Speedmaster Moonwatch (brand_id=9, model_id=93)
(1, 9, 93, 31042, '2020-01-01', 0, NULL, 3, 'Homme', 'En vente', 6750,
1, 42, 13, 5, 'Noir', 1, 2, 1, 'Acier', 1, 20, 'Très bon état', 1, 2, '3861', 2, 50, 3, 26, 1, 1, 1),

-- 4 Omega Seamaster Diver 300M (brand_id=9, model_id=99)
(1, 9, 99, 21042, '2022-01-01', 0, NULL, 4, 'Homme', 'En vente', 4650,
1, 42, 14, 30, 'Noir', 2, 1, 1, 'Acier', 1, 20, 'Excellent état', 1, 1, '8800', 1, 55, 3, 35, 1, 1, 1),

-- 5 Cartier Santos (brand_id=10, model_id=109)
(1, 10, 109, 4848, '2023-01-01', 0, NULL, 5, 'Unisexe', 'En vente', 6250,
1, 35, 9, 10, 'Argent', 1, 3, 1, 'Acier', 1, 18, 'Excellent état', 1, 1, '1847 MC', 1, 42, 4, 23, 1, 1, 1),

-- 6 Cartier Tank Must (brand_id=10, model_id=116)
(1, 10, 116, 9992, '2022-01-01', 0, NULL, 6, 'Unisexe', 'En vente', 3350,
1, 34, 7, 3, 'Argent', 3, 3, 2, 'Noir', 2, 19, 'Très bon état', 1, 3, 'Quartz Cartier', 1, NULL, NULL, NULL, 1, 1, 1),

-- 7 Seiko Prospex Diver (brand_id=46, model_id=330)
(1, 46, 330, 1431, '2021-01-01', 0, NULL, 7, 'Homme', 'En vente', 850,
1, 41, 13, 20, 'Gris', 1, 1, 1, 'Acier', 1, 20, 'Bon état', 1, 1, '6R35', 1, 70, 3, 24, 1, 1, 1),

-- 8 Seiko 5 Sports (brand_id=46, model_id=338)
(1, 46, 338, 3003, '2023-01-01', 0, NULL, 8, 'Homme', 'En vente', 420,
1, 43, 14, 10, 'Noir', 2, 2, 1, 'Acier', 1, 22, 'Très bon état', 1, 1, '4R34', 3, 41, 3, 24, 1, 1, 1),

-- 9 Tudor Black Bay 58 (brand_id=23, model_id=195)
(1, 23, 195, 9030, '2020-01-01', 0, NULL, 9, 'Homme', 'En vente', 3150,
1, 39, 12, 20, 'Noir', 1, 1, 1, 'Acier', 1, 20, 'Très bon état', 1, 1, 'MT5402', 1, 70, 4, 27, 1, 1, 1),

-- 10 Tudor Black Bay (brand_id=23, model_id=194)
(1, 23, 194, 7941, '2023-01-01', 0, NULL, 10, 'Homme', 'En vente', 3850,
1, 41, 14, 20, 'Bordeaux', 2, 1, 1, 'Acier', 1, 21, 'Excellent état', 1, 1, 'MT5602', 1, 70, 4, 25, 1, 1, 1),

-- 11 TAG Heuer Carrera Chronograph (brand_id=15, model_id=153)
(1, 15, 153, 2010, '2021-01-01', 0, NULL, 11, 'Homme', 'En vente', 4650,
1, 42, 14, 10, 'Bleu', 2, 1, 1, 'Acier', 1, 22, 'Très bon état', 1, 1, 'Heuer 02', 2, 80, 4, 33, 1, 1, 1),

-- 12 TAG Heuer Formula 1 (brand_id=15, model_id=160)
(1, 15, 160, 1110, '2019-01-01', 0, NULL, 12, 'Homme', 'En vente', 1100,
1, 41, 12, 20, 'Noir', 1, 2, 1, 'Acier', 1, 20, 'Bon état', 1, 3, 'Quartz', 1, NULL, NULL, NULL, 1, 1, 1),

-- 13 IWC Portugieser Chronograph (brand_id=11, model_id=127)
(1, 11, 127, 3716, '2022-01-01', 0, NULL, 13, 'Homme', 'En vente', 6150,
1, 41, 13, 3, 'Vert', 2, 1, 2, 'Vert', 2, 20, 'Excellent état', 1, 1, '69355', 2, 46, 4, 33, 1, 1, 1),

-- 14 IWC Pilot Mark XX (brand_id=11, model_id=131)
(1, 11, 131, 3283, '2023-01-01', 0, NULL, 14, 'Homme', 'En vente', 4950,
1, 40, 11, 10, 'Noir', 1, 2, 2, 'Brun', 2, 20, 'Excellent état', 1, 1, '32111', 1, 120, 4, 21, 1, 1, 1),

-- 15 Breitling Navitimer B01 (brand_id=16, model_id=167)
(1, 16, 167, 1341, '2020-01-01', 0, NULL, 15, 'Homme', 'En vente', 6850,
1, 43, 14, 3, 'Noir', 4, 4, 1, 'Acier', 1, 22, 'Très bon état', 1, 1, 'B01', 2, 70, 4, 47, 1, 1, 1),

-- 16 Breitling Superocean (brand_id=16, model_id=171)
(1, 16, 171, 1910, '2021-01-01', 0, NULL, 16, 'Homme', 'En vente', 3250,
1, 44, 13, 100, 'Bleu', 2, 2, 1, 'Acier', 1, 22, 'Très bon état', 1, 1, 'Breitling 17', 1, 38, 4, 26, 1, 1, 1),

-- 17 Grand Seiko Snowflake (brand_id=47, model_id=346)
(1, 47, 346, 211, '2018-01-01', 0, NULL, 17, 'Homme', 'En vente', 5350,
2, 41, 13, 10, 'Blanc', 4, 1, 3, 'Titane', 1, 20, 'Très bon état', 1, 1, '9R65', 1, 72, 0, 30, 1, 1, 1),

-- 18 Grand Seiko Elegance (brand_id=47, model_id=342)
(1, 47, 342, 221, '2019-01-01', 0, NULL, 18, 'Homme', 'En vente', 3950,
1, 40, 14, 3, 'Crème', 3, 4, 2, 'Brun', 2, 19, 'Très bon état', 1, 1, '9S66', 3, 72, 4, 35, 1, 1, 1),

-- 19 Longines Master Collection (brand_id=22, model_id=186)
(1, 22, 186, 2628, '2020-01-01', 0, NULL, 19, 'Homme', 'En vente', 1850,
1, 40, 11, 3, 'Argent', 3, 3, 1, 'Acier', 1, 21, 'Bon état', 1, 1, 'L899', 4, 64, 3, 21, 1, 1, 1),

-- 20 Longines HydroConquest (brand_id=22, model_id=187)
(1, 22, 187, 3781, '2022-01-01', 0, NULL, 20, 'Homme', 'En vente', 1350,
1, 41, 12, 30, 'Vert', 2, 1, 1, 'Acier', 1, 21, 'Très bon état', 1, 1, 'L888', 1, 72, 3, 21, 1, 1, 1);
UNLOCK TABLES;

--
-- Table structure for table `watch_has_cart`
--

DROP TABLE IF EXISTS `model`;
DROP TABLE IF EXISTS `brand`;

CREATE TABLE `brand` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO brand (id, name) VALUES
-- Luxe & Haute Horlogerie Suisse
(1, 'Rolex'),
(2, 'Patek Philippe'),
(3, 'Audemars Piguet'),
(4, 'Vacheron Constantin'),
(5, 'A. Lange & Söhne'),
(6, 'Jaeger-LeCoultre'),
(7, 'Blancpain'),
(8, 'Breguet'),
(9, 'Omega'),
(10, 'Cartier'),
(11, 'IWC'),
(12, 'Panerai'),
(13, 'Zenith'),
(14, 'Hublot'),
(15, 'TAG Heuer'),
(16, 'Breitling'),
(17, 'Chopard'),
(18, 'Girard-Perregaux'),
(19, 'Ulysse Nardin'),
(20, 'Piaget'),
(21, 'Baume & Mercier'),
(22, 'Longines'),
(23, 'Tudor'),
(24, 'Oris'),
(25, 'Bell & Ross'),
(26, 'Maurice Lacroix'),
(27, 'Frederique Constant'),
(28, 'Raymond Weil'),
(29, 'Tissot'),
(30, 'Mido'),
(31, 'Certina'),
(32, 'Hamilton'),
(33, 'Rado'),
(34, 'Richard Mille'),
(35, 'MB&F'),
(36, 'H. Moser & Cie'),
(37, 'Arnold & Son'),
(38, 'Speake-Marin'),
(39, 'Laurent Ferrier'),
(40, 'F.P. Journe'),
(41, 'Greubel Forsey'),
(42, 'De Bethune'),
(43, 'Christophe Claret'),
(44, 'HYT'),
(45, 'Czapek'),

-- Japonaises
(46, 'Seiko'),
(47, 'Grand Seiko'),
(48, 'Citizen'),
(49, 'Casio'),
(50, 'G-Shock'),
(51, 'Orient'),
(52, 'Minase'),
(53, 'Credor'),

-- Allemandes
(54, 'Glashütte Original'),
(55, 'Nomos'),
(56, 'Junghans'),
(57, 'Sinn'),
(58, 'Stowa'),
(59, 'MeisterSinger'),
(60, 'Mühle-Glashütte'),
(61, 'Tutima'),
(62, 'Laco'),
(63, 'Junkers'),
(64, 'Zeppelin'),
(65, 'Hanhart'),

-- Américaines
(66, 'Timex'),
(67, 'Bulova'),
(68, 'Shinola'),
(69, 'Weiss'),
(70, 'RGM'),
(71, 'Vortic'),
(72, 'Marathon'),
(73, 'Ball'),

-- Françaises
(74, 'Pequignet'),
(75, 'Yema'),
(76, 'Herbelin'),
(77, 'Lip'),
(78, 'Baltic'),
(79, 'Routine'),
(80, 'Briston'),
(81, 'Pierre Lannier'),
(82, 'March LA.B'),

-- Britanniques
(83, 'Bremont'),
(84, 'Christopher Ward'),
(85, 'Pinion'),
(86, 'Fears'),
(87, 'Vertex'),
(88, 'Schofield'),

-- Italiennes
(89, 'Bulgari'),
(90, 'Anonimo'),
(91, 'U-Boat'),
(92, 'Locman');

CREATE TABLE `model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `brand_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO model (name, brand_id) VALUES
-- ============================================
-- ROLEX (1)
-- ============================================
('Submariner', 1),
('Submariner Date', 1),
('Daytona', 1),
('Datejust', 1),
('Datejust 36', 1),
('Datejust 41', 1),
('GMT-Master II', 1),
('Explorer', 1),
('Explorer II', 1),
('Sea-Dweller', 1),
('Deepsea', 1),
('Air-King', 1),
('Oyster Perpetual', 1),
('Oyster Perpetual 36', 1),
('Oyster Perpetual 41', 1),
('Sky-Dweller', 1),
('Yacht-Master', 1),
('Yacht-Master II', 1),
('Milgauss', 1),
('Cellini', 1),
('Cellini Moonphase', 1),
('Day-Date', 1),
('Day-Date 36', 1),
('Day-Date 40', 1),
('Lady-Datejust', 1),
('Pearlmaster', 1),

-- ============================================
-- PATEK PHILIPPE (2)
-- ============================================
('Nautilus', 2),
('Nautilus 5711', 2),
('Nautilus 5712', 2),
('Nautilus Chronograph', 2),
('Aquanaut', 2),
('Aquanaut Luce', 2),
('Calatrava', 2),
('Grand Complications', 2),
('Perpetual Calendar', 2),
('World Time', 2),
('Annual Calendar', 2),
('Twenty~4', 2),
('Golden Ellipse', 2),
('Gondolo', 2),
('Complications', 2),

-- ============================================
-- AUDEMARS PIGUET (3)
-- ============================================
('Royal Oak', 3),
('Royal Oak 15500', 3),
('Royal Oak Jumbo', 3),
('Royal Oak Chronograph', 3),
('Royal Oak Offshore', 3),
('Royal Oak Offshore Diver', 3),
('Royal Oak Offshore Chronograph', 3),
('Royal Oak Perpetual Calendar', 3),
('Royal Oak Tourbillon', 3),
('Code 11.59', 3),
('Millenary', 3),
('Jules Audemars', 3),

-- ============================================
-- VACHERON CONSTANTIN (4)
-- ============================================
('Overseas', 4),
('Overseas Chronograph', 4),
('Overseas Dual Time', 4),
('Patrimony', 4),
('Patrimony Perpetual Calendar', 4),
('Traditionnelle', 4),
('Historiques', 4),
('FiftySix', 4),
('Égérie', 4),
('Métiers d''Art', 4),
('Les Cabinotiers', 4),

-- ============================================
-- A. LANGE & SÖHNE (5)
-- ============================================
('Lange 1', 5),
('Lange 1 Daymatic', 5),
('Lange 1 Moon Phase', 5),
('Saxonia', 5),
('Saxonia Thin', 5),
('Saxonia Outsize Date', 5),
('Zeitwerk', 5),
('Datograph', 5),
('Datograph Perpetual', 5),
('1815', 5),
('1815 Chronograph', 5),
('Richard Lange', 5),
('Odysseus', 5),

-- ============================================
-- JAEGER-LECOULTRE (6)
-- ============================================
('Reverso', 6),
('Reverso Classic', 6),
('Reverso Tribute', 6),
('Master Control', 6),
('Master Ultra Thin', 6),
('Master Compressor', 6),
('Polaris', 6),
('Polaris Chronograph', 6),
('Polaris Mariner', 6),
('Duomètre', 6),
('Atmos', 6),
('Rendez-Vous', 6),
('Geophysic', 6),

-- ============================================
-- BLANCPAIN (7)
-- ============================================
('Fifty Fathoms', 7),
('Fifty Fathoms Bathyscaphe', 7),
('Fifty Fathoms Automatique', 7),
('Villeret', 7),
('Villeret Quantième Perpétuel', 7),
('Villeret Ultraplate', 7),
('Léman', 7),
('L-Evolution', 7),
('Air Command', 7),

-- ============================================
-- BREGUET (8)
-- ============================================
('Classique', 8),
('Classique Complications', 8),
('Marine', 8),
('Marine Chronograph', 8),
('Tradition', 8),
('Type XX', 8),
('Type XXI', 8),
('Héritage', 8),
('Reine de Naples', 8),
('La Musicale', 8),

-- ============================================
-- OMEGA (9)
-- ============================================
('Speedmaster', 9),
('Speedmaster Professional', 9),
('Speedmaster Moonwatch', 9),
('Speedmaster Racing', 9),
('Speedmaster 57', 9),
('Speedmaster Dark Side of the Moon', 9),
('Seamaster', 9),
('Seamaster 300', 9),
('Seamaster Diver 300M', 9),
('Seamaster Planet Ocean', 9),
('Seamaster Aqua Terra', 9),
('Seamaster Railmaster', 9),
('Seamaster Ultra Deep', 9),
('Constellation', 9),
('Constellation Globemaster', 9),
('De Ville', 9),
('De Ville Prestige', 9),
('De Ville Trésor', 9),
('De Ville Hour Vision', 9),

-- ============================================
-- CARTIER (10)
-- ============================================
('Santos', 10),
('Santos de Cartier', 10),
('Santos-Dumont', 10),
('Tank', 10),
('Tank Française', 10),
('Tank Américaine', 10),
('Tank Louis Cartier', 10),
('Tank Must', 10),
('Ballon Bleu', 10),
('Panthère', 10),
('Pasha', 10),
('Drive de Cartier', 10),
('Clé de Cartier', 10),
('Ronde', 10),
('Rotonde de Cartier', 10),
('Crash', 10),
('Baignoire', 10),

-- ============================================
-- IWC (11)
-- ============================================
('Portugieser', 11),
('Portugieser Chronograph', 11),
('Portugieser Automatic', 11),
('Portugieser Perpetual Calendar', 11),
('Pilot', 11),
('Pilot Mark XX', 11),
('Big Pilot', 11),
('Pilot Chronograph', 11),
('Pilot Spitfire', 11),
('Pilot Top Gun', 11),
('Aquatimer', 11),
('Ingenieur', 11),
('Da Vinci', 11),
('Portofino', 11),
('Portofino Chronograph', 11),

-- ============================================
-- PANERAI (12)
-- ============================================
('Luminor', 12),
('Luminor Marina', 12),
('Luminor Due', 12),
('Luminor Chrono', 12),
('Luminor GMT', 12),
('Luminor Submersible', 12),
('Radiomir', 12),
('Submersible', 12),
('Submersible Quarantaquattro', 12),

-- ============================================
-- ZENITH (13)
-- ============================================
('El Primero', 13),
('Chronomaster', 13),
('Chronomaster Sport', 13),
('Chronomaster Open', 13),
('Chronomaster Original', 13),
('Defy', 13),
('Defy Classic', 13),
('Defy Skyline', 13),
('Defy Extreme', 13),
('Pilot', 13),
('Pilot Type 20', 13),
('Elite', 13),

-- ============================================
-- HUBLOT (14)
-- ============================================
('Big Bang', 14),
('Big Bang Unico', 14),
('Big Bang Integral', 14),
('Big Bang King', 14),
('Classic Fusion', 14),
('Classic Fusion Chronograph', 14),
('Classic Fusion Ultra-Thin', 14),
('Spirit of Big Bang', 14),
('Square Bang', 14),
('MP Collection', 14),

-- ============================================
-- TAG HEUER (15)
-- ============================================
('Carrera', 15),
('Carrera Chronograph', 15),
('Carrera Heuer 02', 15),
('Monaco', 15),
('Monaco Chronograph', 15),
('Aquaracer', 15),
('Aquaracer Professional 300', 15),
('Aquaracer Professional 200', 15),
('Formula 1', 15),
('Formula 1 Chronograph', 15),
('Autavia', 15),
('Link', 15),
('Connected', 15),

-- ============================================
-- BREITLING (16)
-- ============================================
('Navitimer', 16),
('Navitimer B01', 16),
('Navitimer Automatic', 16),
('Chronomat', 16),
('Chronomat B01', 16),
('Superocean', 16),
('Superocean Heritage', 16),
('Avenger', 16),
('Avenger Chronograph', 16),
('Premier', 16),
('Premier B01', 16),
('Endurance Pro', 16),
('Professional', 16),
('Aerospace', 16),
('Colt', 16),
('Top Time', 16),

-- ============================================
-- CHOPARD (17)
-- ============================================
('Alpine Eagle', 17),
('Alpine Eagle XL', 17),
('L.U.C', 17),
('L.U.C XP', 17),
('L.U.C Perpetual', 17),
('Mille Miglia', 17),
('Happy Sport', 17),
('Happy Diamonds', 17),
('Superfast', 17),
('Classic Racing', 17),
('Imperiale', 17),

-- ============================================
-- GIRARD-PERREGAUX (18)
-- ============================================
('Laureato', 18),
('Laureato Chronograph', 18),
('Laureato Skeleton', 18),
('1966', 18),
('Vintage 1945', 18),
('Cat''s Eye', 18),
('Bridges', 18),
('Three Bridges', 18),
('Tourbillon', 18),

-- ============================================
-- ULYSSE NARDIN (19)
-- ============================================
('Marine', 19),
('Marine Chronometer', 19),
('Marine Torpilleur', 19),
('Diver', 19),
('Diver X', 19),
('Executive', 19),
('Freak', 19),
('Freak X', 19),
('Classico', 19),
('Blast', 19),

-- ============================================
-- PIAGET (20)
-- ============================================
('Altiplano', 20),
('Altiplano Ultimate', 20),
('Polo', 20),
('Polo S', 20),
('Polo Date', 20),
('Polo Skeleton', 20),
('Limelight', 20),
('Limelight Gala', 20),
('Possession', 20),
('Emperador', 20),

-- ============================================
-- BAUME & MERCIER (21)
-- ============================================
('Riviera', 21),
('Clifton', 21),
('Clifton Baumatic', 21),
('Classima', 21),
('Hampton', 21),
('Promesse', 21),

-- ============================================
-- LONGINES (22)
-- ============================================
('Master Collection', 22),
('HydroConquest', 22),
('Conquest', 22),
('Spirit', 22),
('Spirit Zulu Time', 22),
('Heritage', 22),
('Legend Diver', 22),
('DolceVita', 22),
('Flagship', 22),
('Elegant Collection', 22),
('Record', 22),
('Ultra-Chron', 22),

-- ============================================
-- TUDOR (23)
-- ============================================
('Black Bay', 23),
('Black Bay 58', 23),
('Black Bay GMT', 23),
('Black Bay Pro', 23),
('Black Bay Chrono', 23),
('Black Bay Ceramic', 23),
('Black Bay Bronze', 23),
('Pelagos', 23),
('Pelagos FXD', 23),
('Pelagos 39', 23),
('Ranger', 23),
('Royal', 23),
('1926', 23),
('Style', 23),
('Glamour', 23),

-- ============================================
-- ORIS (24)
-- ============================================
('Divers Sixty-Five', 24),
('Aquis', 24),
('Aquis Date', 24),
('Aquis GMT', 24),
('Aquis Depth Gauge', 24),
('Big Crown', 24),
('Big Crown Pointer Date', 24),
('Big Crown ProPilot', 24),
('Artelier', 24),
('ProPilot X', 24),

-- ============================================
-- BELL & ROSS (25)
-- ============================================
('BR 01', 25),
('BR 03', 25),
('BR 05', 25),
('BR V1', 25),
('BR V2', 25),
('BR V3', 25),
('BR X1', 25),
('Vintage', 25),

-- ============================================
-- TISSOT (29)
-- ============================================
('PRX', 29),
('PRX Powermatic 80', 29),
('Gentleman', 29),
('Gentleman Powermatic 80', 29),
('Seastar', 29),
('Seastar 1000', 29),
('Seastar 2000', 29),
('Le Locle', 29),
('Visodate', 29),
('Heritage', 29),
('T-Race', 29),
('T-Touch', 29),
('Supersport', 29),
('Chrono XL', 29),
('Chemin des Tourelles', 29),
('Carson', 29),
('Classic Dream', 29),
('Everytime', 29),

-- ============================================
-- HAMILTON (32)
-- ============================================
('Khaki Field', 32),
('Khaki Field Mechanical', 32),
('Khaki Field Automatic', 32),
('Khaki Aviation', 32),
('Khaki Aviation Pilot', 32),
('Khaki Navy', 32),
('Khaki Navy Scuba', 32),
('Jazzmaster', 32),
('Jazzmaster Open Heart', 32),
('Jazzmaster Viewmatic', 32),
('Ventura', 32),
('Ventura Elvis80', 32),
('American Classic', 32),
('Intra-Matic', 32),
('PSR', 32),

-- ============================================
-- SEIKO (46)
-- ============================================
('Prospex', 46),
('Prospex Speedtimer', 46),
('Prospex Diver', 46),
('Prospex Alpinist', 46),
('Prospex LX', 46),
('Presage', 46),
('Presage Sharp Edged', 46),
('Presage Cocktail Time', 46),
('Astron', 46),
('Astron GPS Solar', 46),
('5 Sports', 46),
('King Seiko', 46),
('Seiko Selection', 46),

-- ============================================
-- GRAND SEIKO (47)
-- ============================================
('Heritage Collection', 47),
('Elegance Collection', 47),
('Sport Collection', 47),
('Evolution 9', 47),
('Spring Drive', 47),
('Snowflake', 47),

-- ============================================
-- CITIZEN (48)
-- ============================================
('Promaster', 48),
('Promaster Diver', 48),
('Promaster Sky', 48),
('Promaster Land', 48),
('Eco-Drive', 48),
('Eco-Drive One', 48),
('Attesa', 48),
('Exceed', 48),
('Satellite Wave', 48),
('Series 8', 48),
('Tsuyosa', 48),

-- ============================================
-- CASIO (49)
-- ============================================
('Edifice', 49),
('Oceanus', 49),
('Pro Trek', 49),
('Wave Ceptor', 49),
('Vintage', 49),
('Databank', 49),

-- ============================================
-- G-SHOCK (50)
-- ============================================
('GA-2100', 50),
('DW-5600', 50),
('DW-6900', 50),
('GW-M5610', 50),
('GM-2100', 50),
('GMW-B5000', 50),
('MR-G', 50),
('MT-G', 50),
('Mudmaster', 50),
('Rangeman', 50),
('Frogman', 50),
('Gravitymaster', 50),
('Gulfmaster', 50),
('G-Steel', 50),
('CasiOak', 50),

-- ============================================
-- ORIENT (51)
-- ============================================
('Bambino', 51),
('Kamasu', 51),
('Mako', 51),
('Ray', 51),
('Triton', 51),
('Sun & Moon', 51),
('Star', 51),
('Defender', 51),
('Symphony', 51),
('Contemporary', 51),

-- ============================================
-- GLASHÜTTE ORIGINAL (54)
-- ============================================
('Senator', 54),
('Senator Excellence', 54),
('Senator Chronometer', 54),
('PanoMatic', 54),
('PanoMaticLunar', 54),
('PanoInverse', 54),
('Seventies', 54),
('SeaQ', 54),
('Spezialist', 54),
('Lady Serenade', 54),
('Pavonina', 54),

-- ============================================
-- NOMOS (55)
-- ============================================
('Tangente', 55),
('Tangente Neomatik', 55),
('Orion', 55),
('Orion Neomatik', 55),
('Club', 55),
('Club Sport', 55),
('Club Campus', 55),
('Ludwig', 55),
('Metro', 55),
('Tetra', 55),
('Zürich', 55),
('Ahoi', 55),
('Autobahn', 55),

-- ============================================
-- JUNGHANS (56)
-- ============================================
('Max Bill', 56),
('Max Bill Automatic', 56),
('Max Bill Chronoscope', 56),
('Meister', 56),
('Meister Pilot', 56),
('Meister Chronoscope', 56),
('Form', 56),
('Force', 56),
('1972', 56),

-- ============================================
-- SINN (57)
-- ============================================
('104', 57),
('104 St Sa', 57),
('144', 57),
('356', 57),
('556', 57),
('556 A', 57),
('556 I', 57),
('757', 57),
('857', 57),
('903', 57),
('EZM', 57),
('EZM 3', 57),
('U1', 57),
('U2', 57),
('U50', 57),
('UX', 57),

-- ============================================
-- TIMEX (66)
-- ============================================
('Marlin', 66),
('Marlin Automatic', 66),
('Q Timex', 66),
('Waterbury', 66),
('Expedition', 66),
('Expedition North', 66),
('Weekender', 66),
('Easy Reader', 66),
('MK1', 66),
('Ironman', 66),
('M79', 66),
('Navi', 66),
('Standard', 66),

-- ============================================
-- BULOVA (67)
-- ============================================
('Precisionist', 67),
('Lunar Pilot', 67),
('Surveyor', 67),
('Sutton', 67),
('Classic', 67),
('Marine Star', 67),
('Archive', 67),
('Curv', 67),
('Accutron', 67),
('Mil-Ships', 67),

-- ============================================
-- YEMA (75)
-- ============================================
('Superman', 75),
('Superman French Air Force', 75),
('Superman Heritage', 75),
('Navygraf', 75),
('Flygraf', 75),
('Spacegraf', 75),
('Rallygraf', 75),
('Wristmaster', 75),

-- ============================================
-- BALTIC (78)
-- ============================================
('Aquascaphe', 78),
('Aquascaphe GMT', 78),
('Aquascaphe Dual Crown', 78),
('Bicompax', 78),
('Tricompax', 78),
('HMS', 78),
('MR01', 78),

-- ============================================
-- BREMONT (83)
-- ============================================
('MBII', 83),
('MBIII', 83),
('Solo', 83),
('Supermarine', 83),
('Supermarine S300', 83),
('Supermarine S500', 83),
('ALT1-C', 83),
('ALT1-P', 83),
('ALT1-Z', 83),
('ALT1-ZT', 83),
('Airco', 83),
('Boeing', 83),

-- ============================================
-- CHRISTOPHER WARD (84)
-- ============================================
('C60 Trident', 84),
('C60 Trident Pro', 84),
('C63 Sealander', 84),
('C63 Sealander GMT', 84),
('C65 Trident', 84),
('C1 Moonglow', 84),
('C9 Big Five', 84),

-- ============================================
-- BULGARI (89)
-- ============================================
('Octo', 89),
('Octo Finissimo', 89),
('Octo Roma', 89),
('Serpenti', 89),
('Serpenti Seduttori', 89),
('BVLGARI BVLGARI', 89),
('Lvcea', 89),
('Divas'' Dream', 89),
('Aluminium', 89),

-- ============================================
-- RICHARD MILLE (34)
-- ============================================
('RM 010', 34),
('RM 011', 34),
('RM 027', 34),
('RM 035', 34),
('RM 055', 34),
('RM 67-01', 34),
('RM 67-02', 34),
('RM 69', 34),

-- ============================================
-- F.P. JOURNE (40)
-- ============================================
('Chronomètre Bleu', 40),
('Chronomètre Souverain', 40),
('Octa', 40),
('Tourbillon Souverain', 40),
('Resonance', 40),
('Centigraphe', 40),
('Elegante', 40);
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
