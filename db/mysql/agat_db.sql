delimiter $$

CREATE DATABASE `agat` /*!40100 DEFAULT CHARACTER SET utf8 */$$



delimiter $$

CREATE TABLE `employees` (
  `id` int(11) NOT NULL auto_increment,
  `fam` varchar(100) default NULL,
  `im` varchar(100) default NULL,
  `ot` varchar(100) default NULL,
  `nickname` varchar(100) default NULL,
  `password` char(128) default NULL,
  `salt` char(128) default NULL,
  `insurenum` char(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8$$



delimiter $$

CREATE TABLE `employees_groups` (
  `id` int(11) NOT NULL auto_increment,
  `id_employee` int(11) default NULL COMMENT 'ID работник (employes)',
  `id_group` int(11) default NULL COMMENT 'ID группы (groups)',
  `id_role` int(11) default NULL COMMENT 'ID должности (roles)',
  `from_date` date default '1970-01-01' COMMENT 'в группе с ...',
  `to_date` date default '2100-01-01' COMMENT 'ушел из группы с ...',
  `in_from_group` int(11) default NULL,
  `out_to_group` int(11) default NULL,
  `status` varchar(45) default NULL COMMENT 'Штатный:\nSTAFF - работает постоянно\nPARTTIME - внештатный\nTRANSFERRED - переведен\nFIRED - уволен',
  `role_status` varchar(300) default NULL COMMENT 'LEADER - руководитель группы\nEXECUTOR - исполнитель',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8$$


delimiter $$

CREATE TABLE `groups` (
  `id` int(11) NOT NULL auto_increment,
  `id_level_1` int(11) default '0',
  `id_level_2` int(11) default '0',
  `id_level_3` int(11) default '0',
  `id_level_4` int(11) default '0',
  `from_date` date default '1970-01-01',
  `to_date` date default '2100-01-01',
  `name` varchar(100) default '',
  `name_level_1` varchar(100) default '',
  `name_level_2` varchar(100) default '',
  `name_level_3` varchar(100) default '',
  `name_level_4` varchar(100) default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8$$


delimiter $$

CREATE TABLE `roles` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(300) default NULL,
  `short` varchar(50) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8$$


delimiter $$

CREATE ALGORITHM=UNDEFINED DEFINER=`stokaboka`@`192.168.10.30` SQL SECURITY DEFINER VIEW `v_employees_groups` AS select `eg`.`id` AS `id`,`eg`.`id_employee` AS `id_employee`,`eg`.`id_group` AS `id_group`,`eg`.`id_role` AS `id_role`,`eg`.`from_date` AS `from_date`,`eg`.`to_date` AS `to_date`,`eg`.`in_from_group` AS `in_from_group`,`eg`.`out_to_group` AS `out_to_group`,`eg`.`status` AS `status`,`eg`.`role_status` AS `role_status`,`e`.`fam` AS `fam`,`e`.`im` AS `im`,`e`.`ot` AS `ot`,`e`.`nickname` AS `nickname`,`g`.`id_level_1` AS `id_level_1`,`g`.`id_level_2` AS `id_level_2`,`g`.`id_level_3` AS `id_level_3`,`g`.`id_level_4` AS `id_level_4`,`g`.`from_date` AS `groups_from_date`,`g`.`to_date` AS `groups_to_date`,`g`.`name` AS `name`,`g`.`name_level_1` AS `name_level_1`,`g`.`name_level_2` AS `name_level_2`,`g`.`name_level_3` AS `name_level_3`,`g`.`name_level_4` AS `name_level_4`,`r`.`name` AS `role_name`,`r`.`short` AS `role_short_name` from (((`employees_groups` `eg` left join `employees` `e` on((`eg`.`id_employee` = `e`.`id`))) left join `groups` `g` on(`eg`.`id_group`)) left join `roles` `r` on((`eg`.`id_role` = `r`.`id`)))$$


