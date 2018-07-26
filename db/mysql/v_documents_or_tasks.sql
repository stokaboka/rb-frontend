CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`192.168.10.30` 
    SQL SECURITY DEFINER
VIEW `v_document_or_tasks` AS
    SELECT 
        `d`.`id` AS `d_id`,
        `d`.`source` AS `d_source`,
        `d`.`category` AS `d_category`,
        `d`.`name` AS `d_name`,
        `t`.`id` AS `t_id`,
        `t`.`id_document` AS `t_id_document`,
        IF(`t`.`id_document`, 'DOC', 'TASK') AS `x_type`,
        IF(`t`.`id_document`,
            `t`.`num`,
            `d`.`num`) AS `x_num`,
        IF(`t`.`id_document`,
            `t`.`num_control`,
            `d`.`num_control`) AS `x_num_control`,
        IF(`t`.`id_document`,
            `t`.`control_level`,
            `d`.`control_level`) AS `x_control_level`,
        IF(`t`.`id_document`,
            `t`.`task`,
            `d`.`task`) AS `x_task`,
        IF(`t`.`id_document`,
            `t`.`status`,
            `d`.`status`) AS `x_status`,
        IF(`t`.`id_document`,
            `t`.`start`,
            `d`.`start`) AS `x_start`,
        IF(`t`.`id_document`,
            `t`.`end`,
            `d`.`end`) AS `x_end`,
        IF(`t`.`id_document`,
            `t`.`fixed`,
            `d`.`fixed`) AS `x_fixed`,
        IF(`t`.`id_document`,
            `t`.`id_executor`,
            `d`.`id_curator`) AS `x_id_curator_or_executor`,
        IF(`t`.`id_document`,
            `t`.`executor_fio`,
            `d`.`curator_fio`) AS `x_fio_curator_or_executor`,
        IF(`t`.`id_document`,
            `t`.`executor_role`,
            `d`.`curator_role`) AS `x_role_curator_or_executor`,
        IF(`t`.`id_document`,
            `t`.`executor_group`,
            '') AS `x_executor_group`
    FROM
        (`documents` `d`
        LEFT JOIN `tasks` `t` ON ((`d`.`id` = `t`.`id_document`)))