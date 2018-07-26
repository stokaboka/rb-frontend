SELECT 
id,task_progress_status(start, end, fixed, status) as x,
DATE_FORMAT(start, '%d.%m.%y') as start ,
DATE_FORMAT(end, '%d.%m.%y') as end ,
DATE_FORMAT(fixed, '%d.%m.%y') as fix,
status,
 DATE_FORMAT(CURRENT_DATE, '%d.%m.%y') as aa
FROM v_documents 
WHERE ( (CAST('2017-01-01' AS DATE) <= end))