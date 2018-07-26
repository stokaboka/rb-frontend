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
-- Temporary view structure for view `v_documents_tasks`
--

DROP TABLE IF EXISTS `v_documents_tasks`;
/*!50001 DROP VIEW IF EXISTS `v_documents_tasks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_documents_tasks` AS SELECT 
 1 AS `id`,
 1 AS `source`,
 1 AS `category`,
 1 AS `name`,
 1 AS `num`,
 1 AS `num_control`,
 1 AS `control_level`,
 1 AS `task`,
 1 AS `start`,
 1 AS `end`,
 1 AS `fixed`,
 1 AS `id_curator`,
 1 AS `status`,
 1 AS `curator_fio`,
 1 AS `curator_role`,
 1 AS `file`,
 1 AS `file_id`,
 1 AS `file_name`,
 1 AS `file_path`,
 1 AS `file_description`,
 1 AS `file_id_document`,
 1 AS `file_original`,
 1 AS `file_content_type`,
 1 AS `t_id`,
 1 AS `t_num`,
 1 AS `t_num_control`,
 1 AS `t_control_level`,
 1 AS `t_task`,
 1 AS `t_start`,
 1 AS `t_end`,
 1 AS `t_fixed`,
 1 AS `t_status`,
 1 AS `t_id_executor`,
 1 AS `t_executor_fio`,
 1 AS `t_executor_role`,
 1 AS `t_executor_group`,
 1 AS `task_start`,
 1 AS `task_end`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_documents_tasks_gantt`
--

DROP TABLE IF EXISTS `v_documents_tasks_gantt`;
/*!50001 DROP VIEW IF EXISTS `v_documents_tasks_gantt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_documents_tasks_gantt` AS SELECT 
 1 AS `id`,
 1 AS `start_date`,
 1 AS `end_date`,
 1 AS `text`,
 1 AS `progress`,
 1 AS `duration`,
 1 AS `fixed`,
 1 AS `status`,
 1 AS `parent`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_documents`
--

DROP TABLE IF EXISTS `v_documents`;
/*!50001 DROP VIEW IF EXISTS `v_documents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_documents` AS SELECT 
 1 AS `id`,
 1 AS `source`,
 1 AS `category`,
 1 AS `name`,
 1 AS `num`,
 1 AS `num_control`,
 1 AS `control_level`,
 1 AS `task`,
 1 AS `start`,
 1 AS `end`,
 1 AS `fixed`,
 1 AS `id_curator`,
 1 AS `status`,
 1 AS `curator_fio`,
 1 AS `curator_role`,
 1 AS `file`,
 1 AS `file_id`,
 1 AS `file_name`,
 1 AS `file_path`,
 1 AS `file_description`,
 1 AS `file_id_document`,
 1 AS `file_original`,
 1 AS `file_content_type`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_x_documents`
--

DROP TABLE IF EXISTS `v_x_documents`;
/*!50001 DROP VIEW IF EXISTS `v_x_documents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_x_documents` AS SELECT 
 1 AS `id`,
 1 AS `source`,
 1 AS `category`,
 1 AS `name`,
 1 AS `num`,
 1 AS `num_control`,
 1 AS `control_level`,
 1 AS `task`,
 1 AS `start`,
 1 AS `end`,
 1 AS `fixed`,
 1 AS `id_curator`,
 1 AS `status`,
 1 AS `curator_fio`,
 1 AS `curator_role`,
 1 AS `file`,
 1 AS `file_id`,
 1 AS `file_name`,
 1 AS `file_path`,
 1 AS `file_description`,
 1 AS `file_id_document`,
 1 AS `file_original`,
 1 AS `file_content_type`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_document_or_tasks`
--

DROP TABLE IF EXISTS `v_document_or_tasks`;
/*!50001 DROP VIEW IF EXISTS `v_document_or_tasks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_document_or_tasks` AS SELECT 
 1 AS `d_id`,
 1 AS `d_source`,
 1 AS `d_category`,
 1 AS `d_name`,
 1 AS `t_id`,
 1 AS `t_id_document`,
 1 AS `x_type`,
 1 AS `x_num`,
 1 AS `x_num_control`,
 1 AS `x_control_level`,
 1 AS `x_task`,
 1 AS `x_status`,
 1 AS `x_start`,
 1 AS `x_end`,
 1 AS `x_fixed`,
 1 AS `x_id_curator_or_executor`,
 1 AS `x_fio_curator_or_executor`,
 1 AS `x_role_curator_or_executor`,
 1 AS `x_executor_group`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_employees_groups`
--

DROP TABLE IF EXISTS `v_employees_groups`;
/*!50001 DROP VIEW IF EXISTS `v_employees_groups`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_employees_groups` AS SELECT 
 1 AS `id`,
 1 AS `id_employee`,
 1 AS `id_group`,
 1 AS `id_role`,
 1 AS `from_date`,
 1 AS `to_date`,
 1 AS `in_from_group`,
 1 AS `out_to_group`,
 1 AS `status`,
 1 AS `role_status`,
 1 AS `fam`,
 1 AS `im`,
 1 AS `ot`,
 1 AS `full_fam`,
 1 AS `dot_fam`,
 1 AS `nickname`,
 1 AS `id_level_1`,
 1 AS `id_level_2`,
 1 AS `id_level_3`,
 1 AS `id_level_4`,
 1 AS `groups_from_date`,
 1 AS `groups_to_date`,
 1 AS `name`,
 1 AS `name_level_1`,
 1 AS `name_level_2`,
 1 AS `name_level_3`,
 1 AS `name_level_4`,
 1 AS `role_name`,
 1 AS `role_short_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_documents_tasks`
--

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

/*!50001 DROP VIEW IF EXISTS `v_documents_tasks_gantt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`192.168.10.30` SQL SECURITY DEFINER */
/*!50001 VIEW `v_documents_tasks_gantt` AS select `d`.`id` AS `id`,`d`.`start` AS `start_date`,`d`.`end` AS `end_date`,concat(_utf8'№ ',`d`.`num`,_utf8' ',`d`.`task`) AS `text`,`TASK_PROGRESS`(`d`.`start`,`d`.`end`,`d`.`status`) AS `progress`,`TASK_DURATION`(`d`.`start`,`d`.`end`) AS `duration`,`d`.`fixed` AS `fixed`,`d`.`status` AS `status`,0 AS `parent` from `documents` `d` union select `t`.`id` AS `id`,`t`.`start` AS `start_date`,`t`.`end` AS `end_date`,concat(_utf8'№ ',`t`.`num`,_utf8' ',`t`.`task`) AS `text`,`TASK_PROGRESS`(`t`.`start`,`t`.`end`,`t`.`status`) AS `progress`,`TASK_DURATION`(`t`.`start`,`t`.`end`) AS `duration`,`t`.`fixed` AS `fixed`,`t`.`status` AS `status`,`t`.`id_document` AS `parent` from `tasks` `t` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_documents`
--

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
-- Final view structure for view `v_x_documents`
--

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

--
-- Final view structure for view `v_document_or_tasks`
--

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
-- Final view structure for view `v_employees_groups`
--

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-18  9:01:20
