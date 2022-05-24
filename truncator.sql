CREATE DEFINER=`root`@`localhost` PROCEDURE `truncator`(
tablename varchar(100)
)
BEGIN
declare toDelate boolean;
declare done boolean;
DECLARE queryx varchar(300);
DECLARE DB_TABLE CURSOR FOR SELECT DISTINCT concat( "TRUNCATE TABLE ", table_name, ";" )
FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = tablename;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
SET FOREIGN_KEY_CHECKS = 0;
SET @table_name:=tablename;
	OPEN DB_TABLE;
		loop_through_rows: 
			LOOP
					FETCH DB_TABLE INTO  queryx ;
                	set toDelate = (SELECT IF( EXISTS(
					select  * from (select queryx as q) l  where  l.q like "%hibernate_sequence%"
                    ), 1, 0) as existed);
                if toDelate =0 then
                SET @sql:=CONCAT(queryx);
				PREPARE dynamic_statement FROM @sql;
				EXECUTE dynamic_statement;
				DEALLOCATE PREPARE dynamic_statement;
				END IF;
				IF done THEN
					  LEAVE loop_through_rows;
                END IF;
		END LOOP;
        CLOSE DB_TABLE;
END
