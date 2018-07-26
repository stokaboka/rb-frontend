-- MySQL dump 10.13  Distrib 5.5.50, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: agat
-- ------------------------------------------------------
-- Server version	5.5.50-0ubuntu0.14.04.1

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
-- Current Database: `agat`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `agat` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `agat`;

--
-- Table structure for table `control_levels`
--

DROP TABLE IF EXISTS `control_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `control_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `num` varchar(45) DEFAULT NULL,
  `num_control` varchar(45) DEFAULT NULL,
  `control_level` varchar(45) DEFAULT NULL,
  `task` text,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `fixed` datetime DEFAULT NULL,
  `id_curator` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `curator_fio` varchar(300) DEFAULT NULL,
  `curator_role` varchar(300) DEFAULT NULL,
  `file` varchar(300) DEFAULT NULL,
  `history` int(11) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=709 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`192.168.10.30`*/ /*!50003 TRIGGER `agat`.`documents_AFTER_UPDATE` AFTER UPDATE ON `documents` FOR EACH ROW
BEGIN
    INSERT INTO `agat`.`documents_history`
(`new_start`,
`old_start`,
`new_end`,
`old_end`,
`rem`,
`change`,
`id_document`)
VALUES (
NEW.start,
OLD.start,
NEW.end,
OLD.end,
'',
now(),
NEW.id);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `documents_categories`
--

DROP TABLE IF EXISTS `documents_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documents_categories_name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents_history`
--

DROP TABLE IF EXISTS `documents_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `new_start` datetime DEFAULT NULL COMMENT 'дата начала (было)',
  `old_start` datetime DEFAULT NULL,
  `new_end` datetime DEFAULT NULL COMMENT 'дата окончания (было)',
  `old_end` datetime DEFAULT NULL,
  `rem` varchar(255) DEFAULT NULL COMMENT 'комментарий',
  `change` datetime DEFAULT NULL COMMENT 'дата изменений',
  `id_document` int(11) DEFAULT NULL COMMENT 'ссылка на документ (documents) или задачу (tasks)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=173 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents_source`
--

DROP TABLE IF EXISTS `documents_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='источник - причин�';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents_status`
--

DROP TABLE IF EXISTS `documents_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents_types`
--

DROP TABLE IF EXISTS `documents_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dual`
--

DROP TABLE IF EXISTS `dual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dual` (
  `iddual` int(11) NOT NULL,
  PRIMARY KEY (`iddual`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fam` varchar(100) DEFAULT NULL,
  `im` varchar(100) DEFAULT NULL,
  `ot` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `password` char(128) DEFAULT NULL,
  `salt` char(128) DEFAULT NULL,
  `insurenum` char(11) DEFAULT NULL,
  `db` datetime DEFAULT NULL,
  `db1` date DEFAULT NULL,
  `db2` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employees_groups`
--

DROP TABLE IF EXISTS `employees_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_employee` int(11) DEFAULT NULL COMMENT 'ID работник (employes)',
  `id_group` int(11) DEFAULT NULL COMMENT 'ID группы (groups)',
  `id_role` int(11) DEFAULT NULL COMMENT 'ID должности (roles)',
  `from_date` date DEFAULT '1970-01-01' COMMENT 'в группе с ...',
  `to_date` date DEFAULT '2100-01-01' COMMENT 'ушел из группы с ...',
  `in_from_group` int(11) DEFAULT NULL,
  `out_to_group` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL COMMENT 'Штатный:\nSTAFF - работает постоянно\nPARTTIME - внештатный\nTRANSFERRED - переведен\nFIRED - уволен',
  `role_status` varchar(300) DEFAULT NULL COMMENT 'LEADER - руководитель группы\nEXECUTOR - исполнитель',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=347 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employees_status`
--

DROP TABLE IF EXISTS `employees_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_level_1` int(11) DEFAULT '0',
  `id_level_2` int(11) DEFAULT '0',
  `id_level_3` int(11) DEFAULT '0',
  `id_level_4` int(11) DEFAULT '0',
  `from_date` date DEFAULT '1970-01-01',
  `to_date` date DEFAULT '2100-01-01',
  `name` varchar(100) DEFAULT '',
  `name_level_1` varchar(100) DEFAULT '',
  `name_level_2` varchar(100) DEFAULT '',
  `name_level_3` varchar(100) DEFAULT '',
  `name_level_4` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `short` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=149 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles_status`
--

DROP TABLE IF EXISTS `roles_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sequences`
--

DROP TABLE IF EXISTS `sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequences` (
  `id` varchar(255) NOT NULL COMMENT 'идентификатор последовательности',
  `value` int(11) NOT NULL COMMENT 'значение',
  PRIMARY KEY (`id`),
  UNIQUE KEY `table_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='последовательности';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_document` int(11) DEFAULT NULL,
  `num` varchar(45) DEFAULT NULL,
  `num_control` varchar(45) DEFAULT NULL,
  `control_level` varchar(45) DEFAULT NULL,
  `task` text,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `fixed` datetime DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `id_executor` int(11) DEFAULT NULL COMMENT 'ссылается на employees_groups.id',
  `executor_fio` varchar(100) DEFAULT NULL,
  `executor_role` varchar(100) DEFAULT NULL,
  `executor_group` varchar(100) DEFAULT NULL,
  `history` int(11) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1032 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`192.168.10.30`*/ /*!50003 TRIGGER `agat`.`tasks_AFTER_UPDATE` AFTER UPDATE ON `tasks` FOR EACH ROW
BEGIN

#CALL save_history('tasks', NEW.start, NEW.end, '', NEW.id ); 

    INSERT INTO `agat`.`tasks_history`
(`new_start`,
`old_start`,
`new_end`,
`old_end`,
`rem`,
`change`,
`id_task`)
VALUES (
NEW.start,
OLD.start,
NEW.end,
OLD.end,
'',
now(),
NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tasks_history`
--

DROP TABLE IF EXISTS `tasks_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `new_start` date DEFAULT NULL,
  `old_start` date DEFAULT NULL,
  `new_end` date DEFAULT NULL,
  `old_end` date DEFAULT NULL,
  `rem` varchar(255) DEFAULT NULL,
  `change` date DEFAULT NULL,
  `id_task` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=485 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tasks_status`
--

DROP TABLE IF EXISTS `tasks_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `v_document_or_tasks`
--

DROP TABLE IF EXISTS `v_document_or_tasks`;
/*!50001 DROP VIEW IF EXISTS `v_document_or_tasks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_document_or_tasks` (
  `d_id` tinyint NOT NULL,
  `d_source` tinyint NOT NULL,
  `d_category` tinyint NOT NULL,
  `d_name` tinyint NOT NULL,
  `t_id` tinyint NOT NULL,
  `t_id_document` tinyint NOT NULL,
  `x_type` tinyint NOT NULL,
  `x_num` tinyint NOT NULL,
  `x_num_control` tinyint NOT NULL,
  `x_control_level` tinyint NOT NULL,
  `x_task` tinyint NOT NULL,
  `x_status` tinyint NOT NULL,
  `x_start` tinyint NOT NULL,
  `x_end` tinyint NOT NULL,
  `x_fixed` tinyint NOT NULL,
  `x_id_curator_or_executor` tinyint NOT NULL,
  `x_fio_curator_or_executor` tinyint NOT NULL,
  `x_role_curator_or_executor` tinyint NOT NULL,
  `x_executor_group` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_documents`
--

DROP TABLE IF EXISTS `v_documents`;
/*!50001 DROP VIEW IF EXISTS `v_documents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_documents` (
  `id` tinyint NOT NULL,
  `source` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `num` tinyint NOT NULL,
  `num_control` tinyint NOT NULL,
  `control_level` tinyint NOT NULL,
  `task` tinyint NOT NULL,
  `start` tinyint NOT NULL,
  `end` tinyint NOT NULL,
  `fixed` tinyint NOT NULL,
  `id_curator` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `curator_fio` tinyint NOT NULL,
  `curator_role` tinyint NOT NULL,
  `file` tinyint NOT NULL,
  `file_id` tinyint NOT NULL,
  `file_name` tinyint NOT NULL,
  `file_path` tinyint NOT NULL,
  `file_description` tinyint NOT NULL,
  `file_id_document` tinyint NOT NULL,
  `file_original` tinyint NOT NULL,
  `file_content_type` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_documents_tasks`
--

DROP TABLE IF EXISTS `v_documents_tasks`;
/*!50001 DROP VIEW IF EXISTS `v_documents_tasks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_documents_tasks` (
  `id` tinyint NOT NULL,
  `source` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `num` tinyint NOT NULL,
  `num_control` tinyint NOT NULL,
  `control_level` tinyint NOT NULL,
  `task` tinyint NOT NULL,
  `start` tinyint NOT NULL,
  `end` tinyint NOT NULL,
  `fixed` tinyint NOT NULL,
  `id_curator` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `curator_fio` tinyint NOT NULL,
  `curator_role` tinyint NOT NULL,
  `file` tinyint NOT NULL,
  `file_id` tinyint NOT NULL,
  `file_name` tinyint NOT NULL,
  `file_path` tinyint NOT NULL,
  `file_description` tinyint NOT NULL,
  `file_id_document` tinyint NOT NULL,
  `file_original` tinyint NOT NULL,
  `file_content_type` tinyint NOT NULL,
  `t_id` tinyint NOT NULL,
  `t_num` tinyint NOT NULL,
  `t_num_control` tinyint NOT NULL,
  `t_control_level` tinyint NOT NULL,
  `t_task` tinyint NOT NULL,
  `t_start` tinyint NOT NULL,
  `t_end` tinyint NOT NULL,
  `t_fixed` tinyint NOT NULL,
  `t_status` tinyint NOT NULL,
  `t_id_executor` tinyint NOT NULL,
  `t_executor_fio` tinyint NOT NULL,
  `t_executor_role` tinyint NOT NULL,
  `t_executor_group` tinyint NOT NULL,
  `task_start` tinyint NOT NULL,
  `task_end` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_documents_tasks_gantt`
--

DROP TABLE IF EXISTS `v_documents_tasks_gantt`;
/*!50001 DROP VIEW IF EXISTS `v_documents_tasks_gantt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_documents_tasks_gantt` (
  `id` tinyint NOT NULL,
  `start_date` tinyint NOT NULL,
  `end_date` tinyint NOT NULL,
  `text` tinyint NOT NULL,
  `progress` tinyint NOT NULL,
  `duration` tinyint NOT NULL,
  `progress_status` tinyint NOT NULL,
  `fixed` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `parent` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_employees_groups`
--

DROP TABLE IF EXISTS `v_employees_groups`;
/*!50001 DROP VIEW IF EXISTS `v_employees_groups`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_employees_groups` (
  `id` tinyint NOT NULL,
  `id_employee` tinyint NOT NULL,
  `id_group` tinyint NOT NULL,
  `id_role` tinyint NOT NULL,
  `from_date` tinyint NOT NULL,
  `to_date` tinyint NOT NULL,
  `in_from_group` tinyint NOT NULL,
  `out_to_group` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `role_status` tinyint NOT NULL,
  `fam` tinyint NOT NULL,
  `im` tinyint NOT NULL,
  `ot` tinyint NOT NULL,
  `full_fam` tinyint NOT NULL,
  `dot_fam` tinyint NOT NULL,
  `nickname` tinyint NOT NULL,
  `id_level_1` tinyint NOT NULL,
  `id_level_2` tinyint NOT NULL,
  `id_level_3` tinyint NOT NULL,
  `id_level_4` tinyint NOT NULL,
  `groups_from_date` tinyint NOT NULL,
  `groups_to_date` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `name_level_1` tinyint NOT NULL,
  `name_level_2` tinyint NOT NULL,
  `name_level_3` tinyint NOT NULL,
  `name_level_4` tinyint NOT NULL,
  `role_name` tinyint NOT NULL,
  `role_short_name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_x_documents`
--

DROP TABLE IF EXISTS `v_x_documents`;
/*!50001 DROP VIEW IF EXISTS `v_x_documents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_x_documents` (
  `id` tinyint NOT NULL,
  `source` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `num` tinyint NOT NULL,
  `num_control` tinyint NOT NULL,
  `control_level` tinyint NOT NULL,
  `task` tinyint NOT NULL,
  `start` tinyint NOT NULL,
  `end` tinyint NOT NULL,
  `fixed` tinyint NOT NULL,
  `id_curator` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `curator_fio` tinyint NOT NULL,
  `curator_role` tinyint NOT NULL,
  `file` tinyint NOT NULL,
  `file_id` tinyint NOT NULL,
  `file_name` tinyint NOT NULL,
  `file_path` tinyint NOT NULL,
  `file_description` tinyint NOT NULL,
  `file_id_document` tinyint NOT NULL,
  `file_original` tinyint NOT NULL,
  `file_content_type` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `x_documents`
--

DROP TABLE IF EXISTS `x_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `x_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `num` varchar(45) DEFAULT NULL,
  `num_control` varchar(45) DEFAULT NULL,
  `control_level` varchar(45) DEFAULT NULL,
  `task` text,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `fixed` date DEFAULT NULL,
  `id_curator` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `curator_fio` varchar(300) DEFAULT NULL,
  `curator_role` varchar(300) DEFAULT NULL,
  `file` varchar(300) DEFAULT NULL,
  `history` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=290 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'agat'
--

--
-- Dumping routines for database 'agat'
--
/*!50003 DROP FUNCTION IF EXISTS `MAX_VALUE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `MAX_VALUE`(_p_d1 date, _p_d2 date) RETURNS date
BEGIN
	if ISNULL(_p_d1) AND ISNULL(_p_d2) then
		return NULL;
	end if;
    
    if NOT ISNULL(_p_d1) AND ISNULL(_p_d2) then
		return _p_d1;
	end if;
    
    if  ISNULL(_p_d1) AND NOT ISNULL(_p_d2) then
		return _p_d2;
	end if;
    
    if _p_d1 > _p_d2 THEN
		return _p_d1;
	else
		return _p_d2;
    end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `MIN_VALUE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `MIN_VALUE`(_p_d1 date, _p_d2 date) RETURNS date
BEGIN
	if ISNULL(_p_d1) AND ISNULL(_p_d2) then
		return NULL;
	end if;
    
    if NOT ISNULL(_p_d1) AND ISNULL(_p_d2) then
		return _p_d1;
	end if;
    
    if  ISNULL(_p_d1) AND NOT ISNULL(_p_d2) then
		return _p_d2;
	end if;
    
    if _p_d1 < _p_d2 THEN
		return _p_d1;
	else
		return _p_d2;
    end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `sequencer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `sequencer`(seq_id VARCHAR(255), seq_action VARCHAR(30)) RETURNS int(11)
BEGIN
	SET @s_value = 0;
    
	if seq_action = 'RESET' then
		INSERT INTO `sequences` (`id`, `value`) VALUES (seq_id, 0)
        ON DUPLICATE KEY UPDATE `value` = @s_value;        
	END IF;
    
    if seq_action = 'NEXTVAL' then
		UPDATE `sequences` SET `value` = `value` + 1 WHERE `id` = seq_id;
    END IF;	
    
    SELECT `value` INTO @s_value FROM `sequences` WHERE `id` = seq_id;

	if @s_value = 0 AND seq_action = 'NEXTVAL' then
		
        INSERT INTO `sequences` (`id`, `value`) VALUES (seq_id, 0)
        ON DUPLICATE KEY UPDATE `value` = @s_value;    
        
        SELECT `value` INTO @s_value FROM `sequences` WHERE `id` = seq_id;
        
    end if;

	RETURN @s_value;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `TASK_DURATION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `TASK_DURATION`(_p_d1 date, _p_d2 date) RETURNS decimal(10,0)
BEGIN

	DECLARE __out decimal(10,0) default 0;

	if ISNULL(_p_d1) or ISNULL(_p_d2) then
		return (0);
	end if;

	set __out = (DATEDIFF(_p_d2, _p_d1));

	if ISNULL(__out) then
		set __out = 0;
	end if;

	if __out < 0 then
		set __out = 0;
	END IF;

	RETURN __out;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `TASK_PROGRESS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `TASK_PROGRESS`(_p_d1 date, _p_d2 date, _p_status varchar(30)) RETURNS decimal(6,2)
BEGIN
	DECLARE __total, __current decimal DEFAULT  0;
	DECLARE __out decimal(12,5) DEFAULT  0;
	DECLARE today datetime DEFAULT CURRENT_DATE;

	if(_p_status = 'Выполнен') then
		return (1);
    end if;

	if ISNULL(_p_d1) or ISNULL(_p_d2) then
		return (0);
	end if;

	IF today < _p_d1 then
		RETURN 0;
	end if;

	IF today > _p_d2 then
		RETURN 0;
	end if;

	set __total = DATEDIFF(_p_d2, _p_d1);
	set __current = DATEDIFF(today, _p_d1);
	set __out = __current / __total;
	set __out = ROUND(__out, 2);

#	RETURN (format(__out, 5));

	RETURN (__out);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `TASK_PROGRESS_STATUS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `TASK_PROGRESS_STATUS`(_p_d1 date, _p_d2 date, _p_d3 date, _p_status varchar(30)) RETURNS int(11)
BEGIN
	DECLARE __total, __current decimal DEFAULT  0;	
	DECLARE today datetime DEFAULT CURRENT_DATE;

# out values:
# 0 - undefined
	DECLARE STATUS_UNDEFINED integer default 0;
    
    DECLARE NOT_READY integer default 10;    
    DECLARE READY integer default 20; 
    DECLARE IS_FIXED integer default 30; 
    
    DECLARE BEFORE_START integer default 1;    
	DECLARE BETWEEN_START_AND_END integer default 2;    
	DECLARE AFTER_END integer default 3;
    
	DECLARE __ready	integer default 0;
    DECLARE __dates	integer default 0;

	DECLARE __out integer DEFAULT  STATUS_UNDEFINED;


	if ISNULL(_p_d3) then
		
        if(_p_status = 'Выполнен') then
			set __ready = READY;
		else
			set __ready = NOT_READY;
		end if;          
        
    else
    
		set __ready = IS_FIXED;
        
	end if;

		if NOT ISNULL(_p_d1) AND NOT ISNULL(_p_d2) then
		
			IF today < _p_d1 then
				set __dates = BEFORE_START;
			ELSEIF _p_d1 <= today AND today <= _p_d2 THEN
				set __dates = BETWEEN_START_AND_END;
			ELSEIF _p_d2 < today THEN
				set __dates = AFTER_END;
			ELSE
				set __dates = 0;
			end if;        

		elseif NOT ISNULL(_p_d1) AND ISNULL(_p_d2) then
        
			IF today < _p_d1 then
				set __dates = BEFORE_START;
			ELSE
				set __dates = AFTER_END;
			end if;
        
		elseif ISNULL(_p_d1) AND NOT ISNULL(_p_d2) then
			IF _p_d2 < today THEN
				set __dates = AFTER_END;
			ELSE
				set __dates = BEFORE_START;
		end if; 
        
		else
			set __dates = 0;
		end if;

	set __out = __ready + __dates;

	RETURN (__out);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `task_start_date` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` FUNCTION `task_start_date`(_p_d1 date) RETURNS varchar(10) CHARSET utf8
BEGIN
	
	if ISNULL(_p_d1) then
		return (_utf8'01-01-2014');
	else
		return date_format(_p_d1, _utf8'%m-%d-%Y');
	end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `save_history` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.168.10.30` PROCEDURE `save_history`(p_table varchar(255), p_start datetime, p_end  datetime, p_rem  varchar(255), p_document  int)
BEGIN
	
	INSERT INTO `agat`.`documents_history` (
			`table`,
			`start`,
			`end`,
			`rem`,
			`change`,
			`id_document`
		) VALUES (
			p_table,
			p_start,
			p_end,
			p_rem,
			now(),
			p_document
		);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Current Database: `agat`
--

USE `agat`;

--
-- Final view structure for view `v_document_or_tasks`
--

/*!50001 DROP TABLE IF EXISTS `v_document_or_tasks`*/;
/*!50001 DROP VIEW IF EXISTS `v_document_or_tasks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_document_or_tasks` AS select `d`.`id` AS `d_id`,`d`.`source` AS `d_source`,`d`.`category` AS `d_category`,`d`.`name` AS `d_name`,`t`.`id` AS `t_id`,`t`.`id_document` AS `t_id_document`,if(`t`.`id_document`,'Задача','Документ') AS `x_type`,if(`t`.`id_document`,`t`.`num`,`d`.`num`) AS `x_num`,if(`t`.`id_document`,`t`.`num_control`,`d`.`num_control`) AS `x_num_control`,if(`t`.`id_document`,`t`.`control_level`,`d`.`control_level`) AS `x_control_level`,if(`t`.`id_document`,`t`.`task`,`d`.`task`) AS `x_task`,if(`t`.`id_document`,`t`.`status`,`d`.`status`) AS `x_status`,if(`t`.`id_document`,`t`.`start`,`d`.`start`) AS `x_start`,if(`t`.`id_document`,`t`.`end`,`d`.`end`) AS `x_end`,if(`t`.`id_document`,`t`.`fixed`,`d`.`fixed`) AS `x_fixed`,if(`t`.`id_document`,`t`.`id_executor`,`d`.`id_curator`) AS `x_id_curator_or_executor`,if(`t`.`id_document`,`t`.`executor_fio`,`d`.`curator_fio`) AS `x_fio_curator_or_executor`,if(`t`.`id_document`,`t`.`executor_role`,`d`.`curator_role`) AS `x_role_curator_or_executor`,if(`t`.`id_document`,`t`.`executor_group`,'') AS `x_executor_group` from (`documents` `d` left join `tasks` `t` on((`d`.`id` = `t`.`id_document`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_documents`
--

/*!50001 DROP TABLE IF EXISTS `v_documents`*/;
/*!50001 DROP VIEW IF EXISTS `v_documents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_documents` AS select `d`.`id` AS `id`,`d`.`source` AS `source`,`d`.`category` AS `category`,`d`.`name` AS `name`,`d`.`num` AS `num`,`d`.`num_control` AS `num_control`,`d`.`control_level` AS `control_level`,`d`.`task` AS `task`,`d`.`start` AS `start`,`d`.`end` AS `end`,`d`.`fixed` AS `fixed`,`d`.`id_curator` AS `id_curator`,`d`.`status` AS `status`,`d`.`curator_fio` AS `curator_fio`,`d`.`curator_role` AS `curator_role`,`d`.`file` AS `file`,`f`.`id` AS `file_id`,`f`.`name` AS `file_name`,`f`.`path` AS `file_path`,`f`.`description` AS `file_description`,`f`.`id_document` AS `file_id_document`,`f`.`original` AS `file_original`,`f`.`content_type` AS `file_content_type` from (`documents` `d` left join `files` `f` on((`d`.`file` = `f`.`name`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_documents_tasks`
--

/*!50001 DROP TABLE IF EXISTS `v_documents_tasks`*/;
/*!50001 DROP VIEW IF EXISTS `v_documents_tasks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_documents_tasks` AS select `d`.`id` AS `id`,`d`.`source` AS `source`,`d`.`category` AS `category`,`d`.`name` AS `name`,`d`.`num` AS `num`,`d`.`num_control` AS `num_control`,`d`.`control_level` AS `control_level`,`d`.`task` AS `task`,`d`.`start` AS `start`,`d`.`end` AS `end`,`d`.`fixed` AS `fixed`,`d`.`id_curator` AS `id_curator`,`d`.`status` AS `status`,`d`.`curator_fio` AS `curator_fio`,`d`.`curator_role` AS `curator_role`,`d`.`file` AS `file`,`f`.`id` AS `file_id`,`f`.`name` AS `file_name`,`f`.`path` AS `file_path`,`f`.`description` AS `file_description`,`f`.`id_document` AS `file_id_document`,`f`.`original` AS `file_original`,`f`.`content_type` AS `file_content_type`,`t`.`id` AS `t_id`,`t`.`num` AS `t_num`,`t`.`num_control` AS `t_num_control`,`t`.`control_level` AS `t_control_level`,`t`.`task` AS `t_task`,`t`.`start` AS `t_start`,`t`.`end` AS `t_end`,`t`.`fixed` AS `t_fixed`,`t`.`status` AS `t_status`,`t`.`id_executor` AS `t_id_executor`,`t`.`executor_fio` AS `t_executor_fio`,`t`.`executor_role` AS `t_executor_role`,`t`.`executor_group` AS `t_executor_group`,`MIN_VALUE`(`d`.`start`,`t`.`start`) AS `task_start`,`MAX_VALUE`(`d`.`end`,`t`.`end`) AS `task_end` from ((`documents` `d` left join `files` `f` on((`d`.`file` = `f`.`name`))) left join `tasks` `t` on((`d`.`id` = `t`.`id_document`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_documents_tasks_gantt`
--

/*!50001 DROP TABLE IF EXISTS `v_documents_tasks_gantt`*/;
/*!50001 DROP VIEW IF EXISTS `v_documents_tasks_gantt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_documents_tasks_gantt` AS select `d`.`id` AS `id`,`d`.`start` AS `start_date`,`d`.`end` AS `end_date`,concat(_utf8'№ ',`d`.`num`,_utf8' ',`d`.`task`) AS `text`,`TASK_PROGRESS`(`d`.`start`,`d`.`end`,`d`.`status`) AS `progress`,`TASK_DURATION`(`d`.`start`,`d`.`end`) AS `duration`,`TASK_PROGRESS_STATUS`(`d`.`start`,`d`.`end`,`d`.`fixed`,`d`.`status`) AS `progress_status`,`d`.`fixed` AS `fixed`,`d`.`status` AS `status`,0 AS `parent` from `documents` `d` union select `t`.`id` AS `id`,`t`.`start` AS `start_date`,`t`.`end` AS `end_date`,concat(_utf8'№ ',`t`.`num`,_utf8' ',`t`.`task`) AS `text`,`TASK_PROGRESS`(`t`.`start`,`t`.`end`,`t`.`status`) AS `progress`,`TASK_DURATION`(`t`.`start`,`t`.`end`) AS `duration`,`TASK_PROGRESS_STATUS`(`t`.`start`,`t`.`end`,`t`.`fixed`,`t`.`status`) AS `progress_status`,`t`.`fixed` AS `fixed`,`t`.`status` AS `status`,`t`.`id_document` AS `parent` from `tasks` `t` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_employees_groups`
--

/*!50001 DROP TABLE IF EXISTS `v_employees_groups`*/;
/*!50001 DROP VIEW IF EXISTS `v_employees_groups`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_employees_groups` AS select `eg`.`id` AS `id`,`eg`.`id_employee` AS `id_employee`,`eg`.`id_group` AS `id_group`,`eg`.`id_role` AS `id_role`,`eg`.`from_date` AS `from_date`,`eg`.`to_date` AS `to_date`,`eg`.`in_from_group` AS `in_from_group`,`eg`.`out_to_group` AS `out_to_group`,`eg`.`status` AS `status`,`eg`.`role_status` AS `role_status`,`e`.`fam` AS `fam`,`e`.`im` AS `im`,`e`.`ot` AS `ot`,concat_ws(_utf8' ',`e`.`fam`,`e`.`im`,`e`.`ot`) AS `full_fam`,concat_ws(_utf8' ',`e`.`fam`,left(`e`.`im`,1),_utf8'.',left(`e`.`ot`,1),_utf8'.') AS `dot_fam`,`e`.`nickname` AS `nickname`,`g`.`id_level_1` AS `id_level_1`,`g`.`id_level_2` AS `id_level_2`,`g`.`id_level_3` AS `id_level_3`,`g`.`id_level_4` AS `id_level_4`,`g`.`from_date` AS `groups_from_date`,`g`.`to_date` AS `groups_to_date`,`g`.`name` AS `name`,`g`.`name_level_1` AS `name_level_1`,`g`.`name_level_2` AS `name_level_2`,`g`.`name_level_3` AS `name_level_3`,`g`.`name_level_4` AS `name_level_4`,`r`.`name` AS `role_name`,`r`.`short` AS `role_short_name` from (((`employees_groups` `eg` left join `employees` `e` on((`eg`.`id_employee` = `e`.`id`))) left join `groups` `g` on((`eg`.`id_group` = `g`.`id`))) left join `roles` `r` on((`eg`.`id_role` = `r`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_x_documents`
--

/*!50001 DROP TABLE IF EXISTS `v_x_documents`*/;
/*!50001 DROP VIEW IF EXISTS `v_x_documents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_x_documents` AS select `d`.`id` AS `id`,`d`.`source` AS `source`,`d`.`category` AS `category`,`d`.`name` AS `name`,`d`.`num` AS `num`,`d`.`num_control` AS `num_control`,`d`.`control_level` AS `control_level`,`d`.`task` AS `task`,`d`.`start` AS `start`,`d`.`end` AS `end`,`d`.`fixed` AS `fixed`,`d`.`id_curator` AS `id_curator`,`d`.`status` AS `status`,`d`.`curator_fio` AS `curator_fio`,`d`.`curator_role` AS `curator_role`,`d`.`file` AS `file`,`f`.`id` AS `file_id`,`f`.`name` AS `file_name`,`f`.`path` AS `file_path`,`f`.`description` AS `file_description`,`f`.`id_document` AS `file_id_document`,`f`.`original` AS `file_original`,`f`.`content_type` AS `file_content_type` from (`x_documents` `d` left join `files` `f` on((`d`.`file` = `f`.`name`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-05  9:40:46
