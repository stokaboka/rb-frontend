-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 192.168.3.14    Database: agat
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL COMMENT 'имя файла',
  `path` varchar(300) DEFAULT NULL COMMENT 'путь сохранения',
  `description` varchar(300) DEFAULT NULL COMMENT 'описание файла',
  `id_document` int(11) DEFAULT NULL COMMENT 'ссылка на документ',
  `original` varchar(300) DEFAULT NULL COMMENT 'оригинальное имя файла',
  `content_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'8939-2rk3aa.xml','/srv/node/applications/agat/files','',0,'Книга2.xml','text/xml'),(2,'8939-ka2yd2.xml','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011__excel_xml.xml','text/xml'),(3,'8939-jmp4lw.pdf','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011_.pdf','application/pdf'),(4,'12447-te45c5.xml','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011__excel_xml.xml','text/xml'),(5,'12447-9f3zy0.xml','/srv/node/applications/agat/files','',0,'Книга2.xml','text/xml'),(6,'12447-naf4hn.xml','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011__excel_xml.xml','text/xml'),(7,'12447-116yu3.xml','/srv/node/applications/agat/files','',0,'Книга2.xml','text/xml'),(8,'12447-1nadtny.xml','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011_.xml','text/xml'),(9,'12447-1y0rb77.xml','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011__excel_xml.xml','text/xml'),(10,'12447-vofop6.xml','/srv/node/applications/agat/files','',0,'Книга2.xml','text/xml'),(11,'12596-1qhu6fb.xml','/srv/node/applications/agat/files','',0,'Книга2.xml','text/xml'),(12,'12596-1vlzs6l.xml','/srv/node/applications/agat/files','',0,'заказ_#_16_от_15.09.2011__excel_xml.xml','text/xml'),(13,'12596-1848qb4.xml','/srv/node/applications/agat/files','',0,'Книга2.xml','text/xml'),(14,'19240-vhzd9','files','',0,'error_log','application/octet-stream');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-08 16:47:56
