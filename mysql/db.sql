-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: lab4u_db
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contenedor`
--

DROP TABLE IF EXISTS `contenedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenedor`
--

LOCK TABLES `contenedor` WRITE;
/*!40000 ALTER TABLE `contenedor` DISABLE KEYS */;
INSERT INTO `contenedor` (`id`, `descripcion`) VALUES (1,'Generico'),(2,'Galón de plástico'),(3,'Frasco ámbar'),(4,'Bote de plástico'),(5,'Bolsa de plastico'),(6,'Tubo de cartón'),(7,'Botella de plastico'),(8,'Contenedor de vidrio'),(9,'Garrafa'),(10,'Frasco de vidrio'),(11,'Pruebas3'),(12,'Pruebas');
/*!40000 ALTER TABLE `contenedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `existencia_material`
--

DROP TABLE IF EXISTS `existencia_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `existencia_material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idmaterial` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `numeroserie` varchar(45) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `codigo` varchar(10) DEFAULT NULL,
  `ubicacion` varchar(90) DEFAULT NULL,
  `entrada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `fk_ExistenciasMateriales_Material1_idx` (`idmaterial`),
  CONSTRAINT `fk_ExistenciasMateriales_Material1` FOREIGN KEY (`idmaterial`) REFERENCES `material` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `existencia_material`
--

LOCK TABLES `existencia_material` WRITE;
/*!40000 ALTER TABLE `existencia_material` DISABLE KEYS */;
INSERT INTO `existencia_material` (`id`, `idmaterial`, `cantidad`, `numeroserie`, `observaciones`, `codigo`, `ubicacion`, `entrada`) VALUES (2,4,100,'123456','ninguna','123456','bodega','2018-01-01 00:00:00'),(4,5,10,'123456','ninguna','54353','bodega','2018-01-01 00:00:00');
/*!40000 ALTER TABLE `existencia_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `existencia_reactivo`
--

DROP TABLE IF EXISTS `existencia_reactivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `existencia_reactivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idreactivo` int NOT NULL,
  `caducidad` date NOT NULL,
  `estatus` tinyint NOT NULL,
  `numserie` varchar(45) NOT NULL,
  `contenido` decimal(6,2) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(90) DEFAULT NULL,
  `entrada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ExistenciaReactivo_Reactivo1_idx` (`idreactivo`),
  CONSTRAINT `fk_ExistenciaReactivo_Reactivo1` FOREIGN KEY (`idreactivo`) REFERENCES `reactivo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `existencia_reactivo`
--

LOCK TABLES `existencia_reactivo` WRITE;
/*!40000 ALTER TABLE `existencia_reactivo` DISABLE KEYS */;
INSERT INTO `existencia_reactivo` (`id`, `idreactivo`, `caducidad`, `estatus`, `numserie`, `contenido`, `observaciones`, `ubicacion`, `entrada`) VALUES (1,1,'2024-01-01',1,'123456',100.00,'ninguna','bodega','2018-01-01 00:00:00'),(2,1,'2024-01-01',1,'123456',100.00,'ninguna','bodega','2018-01-01 00:00:00');
/*!40000 ALTER TABLE `existencia_reactivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(5) DEFAULT NULL,
  `semestre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` (`id`, `nombre`, `semestre`) VALUES (1,'1BM01','Tercero');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kit`
--

DROP TABLE IF EXISTS `kit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kit` (
  `idp` int NOT NULL,
  `idh` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idp`,`idh`),
  KEY `fk_Kit_Material1_idx` (`idp`),
  KEY `fk_Kit_Material2_idx` (`idh`),
  CONSTRAINT `fk_Kit_Material1` FOREIGN KEY (`idp`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_Kit_Material2` FOREIGN KEY (`idh`) REFERENCES `material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kit`
--

LOCK TABLES `kit` WRITE;
/*!40000 ALTER TABLE `kit` DISABLE KEYS */;
INSERT INTO `kit` (`idp`, `idh`, `cantidad`) VALUES (4,8,3);
/*!40000 ALTER TABLE `kit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` (`id`, `nombre`) VALUES (1,'Generico'),(2,'Reasol'),(3,'clemente jacques'),(4,'PHYWE'),(5,'Carlroth'),(6,'ROTH'),(7,'GRÜSSING'),(8,'Acros Organics'),(9,'Vaseline'),(10,'Pruebas3'),(11,'Pruebas');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
INSERT INTO `materia` (`id`, `nombre`) VALUES (1,'Biotecnologia');
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idmarca` int DEFAULT NULL,
  `nombre` varchar(120) NOT NULL,
  `tipo` enum('material','equipo') NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Material_Marca1_idx` (`idmarca`),
  CONSTRAINT `fk_Material_Marca1` FOREIGN KEY (`idmarca`) REFERENCES `marca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` (`id`, `idmarca`, `nombre`, `tipo`, `descripcion`) VALUES (4,1,'prueba1','material','ninguna'),(5,1,'prueba1','material','ninguna'),(6,1,'Pruebas','material','Pruebas'),(7,1,'Pruebas','material','Pruebas'),(8,10,'Pruebas','material','Pruebas');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` int NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `paterno` varchar(80) NOT NULL,
  `materno` varchar(80) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `correo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Persona_Usuario1_idx` (`id`),
  CONSTRAINT `fk_Persona_Usuario1` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentacion`
--

DROP TABLE IF EXISTS `presentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presentacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` decimal(8,2) NOT NULL,
  `unidad` enum('ml','g') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentacion`
--

LOCK TABLES `presentacion` WRITE;
/*!40000 ALTER TABLE `presentacion` DISABLE KEYS */;
INSERT INTO `presentacion` (`id`, `cantidad`, `unidad`) VALUES (1,100.00,'g'),(2,100.00,'ml');
/*!40000 ALTER TABLE `presentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactivo`
--

DROP TABLE IF EXISTS `reactivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idmarca` int NOT NULL DEFAULT '1',
  `idcontenedor` int NOT NULL DEFAULT '1',
  `idpresentacion` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `numcas` varchar(45) NOT NULL,
  `formula` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Reactivo_Marca1_idx` (`idmarca`),
  KEY `fk_Reactivo_Contenedor1_idx` (`idcontenedor`),
  KEY `fk_reactivo_presentacion1_idx` (`idpresentacion`),
  CONSTRAINT `fk_Reactivo_Contenedor1` FOREIGN KEY (`idcontenedor`) REFERENCES `contenedor` (`id`),
  CONSTRAINT `fk_Reactivo_Marca1` FOREIGN KEY (`idmarca`) REFERENCES `marca` (`id`),
  CONSTRAINT `fk_reactivo_presentacion1` FOREIGN KEY (`idpresentacion`) REFERENCES `presentacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactivo`
--

LOCK TABLES `reactivo` WRITE;
/*!40000 ALTER TABLE `reactivo` DISABLE KEYS */;
INSERT INTO `reactivo` (`id`, `idmarca`, `idcontenedor`, `idpresentacion`, `nombre`, `numcas`, `formula`) VALUES (1,1,3,0,'Aceite de oliva','8001-25-0','C18H34O1'),(2,1,3,0,'Aceite de silición ','68083-14-7','(Si(CH3)2O)n'),(3,1,4,0,'Acetato de calcio','62-54-4','Ca(CH3COO)2'),(4,1,3,0,'Acetato de etilo','141-78-6','C4H8O2'),(5,2,8,0,'Acetato de sodio anhidro','127-09-3','CH3COONa'),(6,1,4,0,'Acetato de sodio trihidrato','6131-90-4','NaC2H3O2:3H2O'),(7,2,3,0,'Acetato de Zinc dihidrato','5970-45-6','(CH3COO)2Zn*2H2O'),(8,1,3,0,'Acetona','67-64-1','C3H6O'),(9,1,3,0,'Acetona','67-64-1','C3H6O'),(10,1,3,0,'Ácido acetico glacial','64-19-7','CH3COOH'),(11,2,3,0,'Ácido acetico glacial','64-19-7','CH3COOH'),(12,3,7,0,'Vinagre blanco','','C2H4O2'),(13,1,4,0,'Ácido benzoico','65-85-0','C6H5COOH'),(14,1,3,0,'Ácido butirico','107-92-6','C4H802'),(15,1,4,0,'Ácido cítrico monohidrato','5949-29-1','C6H8O7*H2O'),(16,1,3,0,'Ácido Clorhídrico ','7647-01-0','HCl'),(17,1,4,0,'Ácido esteárico químicamente puro','57-11-4','CH3(CH2)16COOH'),(18,2,4,0,'Ácido etilendiaminotetracético','6381-92-6','C10H14N2O8Na2-2H2O'),(19,2,4,0,'Ácido Fluorhídrico','7664-39-3','HF'),(21,1,3,0,'Ácido formíco','64-18-6','CH2O2'),(22,1,4,0,'Ácido L(+)-Tartárico','87694','C4H6O6'),(23,1,3,0,'Ácido nitrico 65%','7697-37-2','HNO3'),(24,1,4,0,'Ácido oxálico dihidrato','6153-56-6','C2H2O4*2H2O'),(25,1,3,0,'Ácido propionico','79-09-4','C3H6O2'),(26,1,3,0,'Ácido sulfúrico 97.1 %','7664-93-9','H2SO4'),(27,1,4,0,'Ácido sulfurico 0.5M','1310-73-2','H2SO4'),(28,1,3,0,'Ácido sulfuroso 5-6%','7782-99-2','H2SO4'),(29,1,9,0,'Agua destilada','7732-18-5','H2O'),(30,1,9,0,'Agua destilada','7732-18-5','H2O'),(31,1,3,0,'Alcohol butílico','71-36-3','1-Butanol'),(32,1,7,0,'Alcohol eítlico 96°','64-17-5','C2H6O'),(33,1,7,0,'Alcohol etilico','64-17-5','C2H6O'),(34,1,3,0,'Alcohol isobutilico','78-83-1','C4H10O'),(35,1,3,0,'Alcohol Isopropílico','67-63-0',''),(36,1,3,0,'Alcohol Isopropilico ','67-63-0','C3H8O'),(37,1,3,0,'Alcohol metilico','67-56-1',''),(38,1,3,0,'Alcohol metilico ','64-56-1',''),(39,1,3,0,'Alcohol pentilico','71410','C5H12O'),(40,1,3,0,'Alcohol propilico','71238','CH3(CH2)2OH'),(41,1,4,0,'Algodon','NA','NA'),(42,1,10,0,'Almidón soluble','9005849','(C6H10O5)n'),(43,1,3,0,'Aluminio granular','7429-90-5','Al'),(44,1,4,0,'Aluminio metal lámina','7429-90-5','Al'),(45,4,4,0,'Arena-Grano II','3182-67-9','NA'),(46,4,4,0,'Arena-Grano I','3182-57-9','NA'),(47,1,4,0,'Azufre quimicamente puro','7704-34-9','S'),(48,2,3,0,'Azul de bromofenol','115-39-9','C19H10Br4O5S'),(49,1,3,0,'Azul de bromotimol','76-59-5','C27H2Br2C5S'),(50,1,3,0,'Azul de metileno ','61-73-4','C16H18CIN3S'),(51,1,4,0,'Bario hidroxido octahidrato','1304-28-5','Ba(OH)2*8H2O'),(52,1,3,0,'Bencina grado técnico','8032-32-4','C6H6'),(53,1,3,0,'Bencina grado técnico','8032-32-4','C6H6'),(54,1,4,0,'Bicarbonato de sodio','144-55-8','NaHCO3'),(55,1,4,0,'Bisulfato de potasio','7646-93-7','KHSO4'),(56,1,3,0,'Bromuro de potasio','7758 02 3','KBr'),(57,1,3,0,'Bromuro de sodio','7647-15-6','NaBr'),(58,1,3,0,'Cal sodada','8006-28-8','CaHNaO2'),(59,1,3,0,'Calcio metal virutas','7440-70-2','Ca'),(60,1,3,0,'Calcio metal virutas','7440-70-2','Ca'),(61,1,3,0,'Calcio metal virutas','7440-70-2','Ca'),(62,1,4,0,'Carbon activado en polvo','7440-44-0','C'),(63,1,4,0,'Carbon vegetal activo','7440-44-0','C'),(64,1,4,0,'Carbonato de calcio','471-34-1','CaCO3'),(65,1,4,0,'Carbonato de potasio','584-08-7','K2CO3'),(66,1,4,0,'Carbonato de sodio anhidro','497-19-8','CNa2O3'),(67,1,4,0,'Carburo de calcio granular','75-20-7','CaC2'),(68,1,3,0,'Cloruro de alumino hexahidrato','7884-13-6','AlCl3*6H2O'),(69,1,4,0,'Cloruro de amonio','12125-02-9','ClH4N'),(70,1,3,0,'Cloruro de bario dihidrato','10326-27-9','BaCl2-2H2O'),(71,1,3,0,'Cloruro de cobre II','10125-13-0','CuC122H2O'),(72,1,3,0,'Cloruro de estroncio hexahidrato','10025-70-4','SrCl2'),(73,1,3,0,'Cloruro de litio','7447-41-8','LiCl'),(74,1,4,0,'Cloruro de magnesio hexahidrato','7791-18-6','ClMg*6H2O'),(75,1,3,0,'Cloruro de potasio','7447-40-7','KCl'),(76,1,4,0,'Cloruro de sodio','7647-14-5','NaCl'),(77,1,4,0,'Cloruro de zinc anhidro','7446-85-7','ZnCl2'),(78,1,4,0,'Cobre en lámina','7440-50-8','Cu'),(79,5,4,0,'Dioxido de silicon','1488-60-7','SiO2'),(80,1,3,0,'Dióxido de plomo','1309-60-0','PbO2'),(81,2,4,0,'Dodecil sulfato de sodio','151-21-3','C12H25OOSO2ONa'),(82,1,3,0,'Eter de petroleo','8032-32-4','C6H6'),(83,1,3,0,'Etilenglicol','107-21-1','HOCH2CH2OH'),(84,1,3,0,'Fehling A','7758-98-7','CuH2O4S'),(85,1,3,0,'Fenolftaleina, solución 0.1%','77-09-8','C20H14O4'),(86,1,3,0,'Fosfato de sodio tribasico dodecahidrato','10101-89-0','Na3PO4-12H2O'),(87,2,3,0,'Glicerina','56-81-5','C3H8O3'),(88,1,4,0,'Glucosa anhidra','50-99-7','C6H12O6'),(89,1,4,0,'Grenetina','9000-70-8',''),(90,1,3,0,'Hexano','110-54-3','C6H14'),(91,1,3,0,'Hidróxido de amonio 25%','1336-21-6','NH4OH'),(92,1,4,0,'Hidróxido de calcio','1305-62-0','Ca(OH)2'),(93,1,4,0,'Hidróxido de potasio lentejas','497-19-8','KOH'),(94,1,10,0,'Hierro reducido por hidrógeno','7439-89-6','Fe'),(95,1,4,0,'Jabón libre de sulfatos','7439-89-13',''),(96,6,3,0,'Lackmus','1393-92-6','C9H10O5N'),(97,1,5,0,'Magnesio metal cinta','7439-95-4','Mg'),(98,1,3,0,'Magnesio metal polvo','7439-95-4','Mg'),(99,1,4,0,'Manganeso (II) cloruro, tetrahidrato','13446-34-9','MnC12-4H2O'),(100,7,4,0,'Mármol ','471-34-1',''),(101,1,3,0,'Molibdato de amonio tetrahidrato','12054-85-2','H24Mo7N6O24-4H2O'),(102,1,3,0,'Naranja de metilo 0.1%','547-58-0','C14H14N3NaO3S'),(103,1,3,0,'Nitrato de plata','7761-88-8','AgNO3'),(104,1,4,0,'Nitrato de potasio','7757-79-1','KnO3'),(105,1,3,0,'Óxido de aluminio','1344-28-1','Al2O3'),(106,1,4,0,'Óxido de calcio','1305-78-8','CaO'),(107,1,3,0,'Óxido de cobre negro','1317-38-0','CuO'),(108,1,4,0,'Óxido de hierro III','1309-37-1','Fe2O3'),(109,1,4,0,'Óxido de magnesio','1309-48-4','MgO'),(110,1,3,0,'Óxido de manganeso','1317-35-7','MnO'),(111,1,3,0,'Óxido de manganeso purificado','1317-35-7','MnO'),(112,1,4,0,'Óxido de zinc','1314-13-2','ZnO'),(113,1,3,0,'Parafina liquida ','8012-95-1','CnH2n+2'),(114,8,3,0,'Patent Blue V, sodium salt','20262-76-4','C27H31N2NAO7S2'),(115,1,3,0,'Pepsina','9001-75-6',''),(116,1,4,0,'Percloruro de hierro','10025-77-1','FeCl3*6H2O'),(117,1,3,0,'Permanganato de potasio','7722-64-7','KMnO4'),(118,1,4,0,'Peróxido de benzoilo','94-36-0','C14H10O4'),(119,1,1,0,'Peroxido de hidrogeno 30%','7722-84-1','H2O2'),(120,1,3,0,'Peroxido de hidrogeno 30%','7722-84-1','H2O3'),(121,1,3,0,'Peroxido de hidrogeno 30%','7722-84-2','H2O4'),(122,1,3,0,'Petroleo sintético ','64742-48-9','C12H26'),(123,2,3,0,'Polisorbato 20%','9005-64-5','C58H114O26'),(124,1,3,0,'Reactivo de schiff','7681-57-4','C20H20ClN3'),(125,1,3,0,'Reactivo según nessler','7783-33-7','H4HgI4K2'),(126,1,3,0,'Resorcina','108-46-3','C6H6O2'),(127,1,3,0,'Rojo de metilo','64-17-5','C15H15N3O2'),(128,1,4,0,'Sacarosa','57-50-1','C12H22O11'),(129,6,4,0,'Seesand','14808-60-7','SiO2'),(130,1,2,0,'Silacato de sodio en solución','1344-09-8','Na2SiO3'),(131,1,3,0,'Solución de lugol','7553-56-2','I2/Kl'),(132,1,3,0,'Solución de lugol','7553-56-2','I2/Kl'),(133,1,3,0,'Solución de lugol','7553-56-2','I2/Kl'),(134,6,3,0,'Sudan III','85-86-9','C22H16N4O'),(135,1,4,0,'Sulfato de aluminio y potasio dodecahidratado','7784-24-9','AlKO8S2-12H2O'),(136,1,4,0,'Sulfato de aluminio, hidratado','7784-31-8','Al2(SO4)3-18H2O'),(137,1,4,0,'Sulfato de amonio','7783-20-2','(NH4)2SO4'),(138,1,4,0,'Sulfato de calcio dihidratado','101-0141-4','CaSO4-2H2O'),(139,1,3,0,'Sulfato de cobre anhidro','7758-98-7','CuSO4'),(140,1,4,0,'Sulfato de cobre pentahidratado','7758-99-8','CuSO4.5H2O'),(141,1,3,0,'Sulfato de sodio anhidro','7757-82-6','Na2SO4'),(142,1,4,0,'Sulfato de sodio decahidratado','7727-73-3','Na2SO4-10H2O'),(143,1,4,0,'Sulfato de zinc heptahidratado','7446-20-0','ZnSO4-7H2O'),(144,1,4,0,'Sulfato ferroso heptahidratado','7782-63-0','FeSO4-7H2O'),(145,1,4,0,'Tartrato de Sodio y Potasio','6381-59-5','C4H4Kn3O6*4H2O'),(146,1,4,0,'Tiocianato de potasio','333-20-0','KSCN'),(147,1,4,0,'Tiosulfato de sodio pentahidratado','10102-17-7','Na2O3S2-5H2O'),(148,1,3,0,'Tricoloetileno','79-01-6',''),(149,1,4,0,'Urea','57-13-6','CH4N2O'),(150,9,4,0,'Vaselina petrolato','63231-60-7','CnH2n+2'),(151,1,3,0,'Yoduro de potasio','7681 11-0','Kl'),(152,1,3,0,'Zinc metal polvo','7440-66-6','Zn'),(153,7,4,0,'Desmophen (polypropylene ether polyol)','82115-39-7','NH1420'),(154,7,10,0,'Desmodur (polypropylene ether polyol)','53317-61-6','C23H37N5O6'),(155,10,11,1,'Pruebas','Pruebas','Pruebas'),(156,11,12,2,'Pruebas1','Pruebas1','Pruebas1');
/*!40000 ALTER TABLE `reactivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`id`, `tipo`) VALUES (1,'admin'),(2,'estudiante');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombre`, `clave`) VALUES (3,'admin','$2b$10$kY4A3XOCLvcOz8Kk1ExPCu1wiL.3v/Xbs2KmEgWTUhBOHV08bcrhi');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `idusuario` int NOT NULL,
  `idrol` int NOT NULL,
  PRIMARY KEY (`idusuario`,`idrol`),
  KEY `fk_Usuario_has_Rol_Rol1_idx` (`idrol`),
  KEY `fk_Usuario_has_Rol_Usuario_idx` (`idusuario`),
  CONSTRAINT `fk_Usuario_has_Rol_Rol1` FOREIGN KEY (`idrol`) REFERENCES `rol` (`id`),
  CONSTRAINT `fk_Usuario_has_Rol_Usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` (`idusuario`, `idrol`) VALUES (3,1);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vale_alumno`
--

DROP TABLE IF EXISTS `vale_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vale_alumno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Vale_Usuario1_idx` (`idusuario`),
  CONSTRAINT `fk_Vale_Usuario10` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vale_alumno`
--

LOCK TABLES `vale_alumno` WRITE;
/*!40000 ALTER TABLE `vale_alumno` DISABLE KEYS */;
/*!40000 ALTER TABLE `vale_alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vale_alumnoprofesor`
--

DROP TABLE IF EXISTS `vale_alumnoprofesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vale_alumnoprofesor` (
  `idvalealumno` int NOT NULL,
  `idvaleprofesor` int NOT NULL,
  `idmaterial` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idvalealumno`,`idvaleprofesor`,`idmaterial`),
  KEY `fk_ValeAlumno_has_ValeProfesor_ValeProfesor1_idx` (`idvaleprofesor`),
  KEY `fk_ValeAlumno_has_ValeProfesor_ValeAlumno1_idx` (`idvalealumno`),
  KEY `fk_ValeAlumno_has_ValeProfesor_ValeMaterial1_idx` (`idmaterial`),
  CONSTRAINT `fk_ValeAlumno_has_ValeProfesor_ValeAlumno1` FOREIGN KEY (`idvalealumno`) REFERENCES `vale_alumno` (`id`),
  CONSTRAINT `fk_ValeAlumno_has_ValeProfesor_ValeMaterial1` FOREIGN KEY (`idmaterial`) REFERENCES `vale_material` (`idmaterial`),
  CONSTRAINT `fk_ValeAlumno_has_ValeProfesor_ValeProfesor1` FOREIGN KEY (`idvaleprofesor`) REFERENCES `vale_profesor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vale_alumnoprofesor`
--

LOCK TABLES `vale_alumnoprofesor` WRITE;
/*!40000 ALTER TABLE `vale_alumnoprofesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `vale_alumnoprofesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vale_material`
--

DROP TABLE IF EXISTS `vale_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vale_material` (
  `idvale` int NOT NULL,
  `idmaterial` int NOT NULL,
  `cantidad` int NOT NULL,
  `codigo` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`idmaterial`,`idvale`),
  KEY `fk_Vale_has_Material_Material1_idx` (`idmaterial`),
  KEY `fk_Vale_has_Material_Vale1_idx` (`idvale`),
  CONSTRAINT `fk_Vale_has_Material_Material1` FOREIGN KEY (`idmaterial`) REFERENCES `material` (`id`),
  CONSTRAINT `fk_Vale_has_Material_Vale1` FOREIGN KEY (`idvale`) REFERENCES `vale_profesor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vale_material`
--

LOCK TABLES `vale_material` WRITE;
/*!40000 ALTER TABLE `vale_material` DISABLE KEYS */;
INSERT INTO `vale_material` (`idvale`, `idmaterial`, `cantidad`, `codigo`) VALUES (1,4,2,'123456'),(2,4,1,'123456');
/*!40000 ALTER TABLE `vale_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vale_profesor`
--

DROP TABLE IF EXISTS `vale_profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vale_profesor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `idgrupo` int NOT NULL,
  `idmateria` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Vale_Usuario1_idx` (`idusuario`),
  KEY `fk_vale_profesor_grupo1_idx` (`idgrupo`),
  KEY `fk_vale_profesor_materia1_idx` (`idmateria`),
  CONSTRAINT `fk_vale_profesor_grupo1` FOREIGN KEY (`idgrupo`) REFERENCES `grupo` (`id`),
  CONSTRAINT `fk_vale_profesor_materia1` FOREIGN KEY (`idmateria`) REFERENCES `materia` (`id`),
  CONSTRAINT `fk_Vale_Usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vale_profesor`
--

LOCK TABLES `vale_profesor` WRITE;
/*!40000 ALTER TABLE `vale_profesor` DISABLE KEYS */;
INSERT INTO `vale_profesor` (`id`, `idusuario`, `idgrupo`, `idmateria`, `fecha`, `estatus`) VALUES (1,3,1,1,'2023-10-19 00:00:00','pendiente'),(2,3,1,1,'2023-10-20 00:00:00','pendiente');
/*!40000 ALTER TABLE `vale_profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vale_reactivo`
--

DROP TABLE IF EXISTS `vale_reactivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vale_reactivo` (
  `idvale` int NOT NULL,
  `idreactivo` int NOT NULL,
  `numserie` varchar(45) NOT NULL,
  KEY `fk_Reactivo_has_Vale_Vale1_idx` (`idvale`),
  KEY `fk_Reactivo_has_Vale_Reactivo1_idx` (`idreactivo`),
  CONSTRAINT `fk_Reactivo_has_Vale_Reactivo1` FOREIGN KEY (`idreactivo`) REFERENCES `reactivo` (`id`),
  CONSTRAINT `fk_Reactivo_has_Vale_Vale1` FOREIGN KEY (`idvale`) REFERENCES `vale_profesor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vale_reactivo`
--

LOCK TABLES `vale_reactivo` WRITE;
/*!40000 ALTER TABLE `vale_reactivo` DISABLE KEYS */;
INSERT INTO `vale_reactivo` (`idvale`, `idreactivo`, `numserie`) VALUES (1,1,'123456'),(2,1,'123456');
/*!40000 ALTER TABLE `vale_reactivo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-19 11:15:38
