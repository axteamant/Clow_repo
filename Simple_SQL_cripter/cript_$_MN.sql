CREATE DEFINER=`root`@`localhost` PROCEDURE `Cripter`(
cripter varchar(50),
tab varchar(50),
condiction varchar(100)
)
BEGIN
if(condiction ='') then set condiction:='1=1'; end if;
SET @table_name:=tab;
SET @Fealds_name= (SELECT  DISTINCT GROUP_CONCAT(cripter,'(',info,')', info)  from
															(
                                                            select DISTINCT  COLUMN_NAME as 
                                                            info FROM INFORMATION_SCHEMA.COLUMNS
                                                            WHERE TABLE_NAME=@table_name
                                                            ) as info 
                                                );
SET @sql:=CONCAT(

'select ' , @Fealds_name, ' FROM ',@table_name, ' where ' , condiction );
PREPARE dynamic_statement FROM @sql;
EXECUTE dynamic_statement;
DEALLOCATE PREPARE dynamic_statement;
END