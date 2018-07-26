CREATE DATABASE IF NOT EXISTS agat DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

delimiter $$

CREATE TABLE `employe_group` (
  `id` int(11) NOT NULL auto_increment,
  `id_employe` int(11) default NULL COMMENT 'ID работник (employes)',
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

CREATE TABLE `employees` (
  `id` int(11) NOT NULL auto_increment,
  `fam` varchar(100)  default NULL,
  `im` varchar(100)  default NULL,
  `ot` varchar(100)  default NULL,
  `nickname` varchar(100)  default NULL,
  `password` char(128)  default NULL,
  `salt` char(128)  default NULL,
  `insurenum` char(11)  default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8$$


delimiter $$

CREATE TABLE `groups` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(300)  default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8$$


delimiter $$

CREATE TABLE `groups_tree` (
  `id` int(11) NOT NULL,
  `id_group` int(11) default NULL,
  `parent_group` int(11) default '0',
  `from_date` date default '1970-01-01',
  `to_date` date default '2100-01-01',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8$$


delimiter $$

CREATE TABLE `roles` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(300)  default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8$$



