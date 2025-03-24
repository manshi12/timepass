CREATE OR REPLACE FUNCTION dbo."SPU_FETCH_DISTINCT_ROLES"()
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
    OpenedTran BOOLEAN;
    Error INTEGER;
    BusinessEntity VARCHAR(20);
    NatureStatus VARCHAR(60);
    DISTINCT_ROLES_CUR CURSOR FOR
        SELECT DISTINCT business_entity, Nature_status
        FROM "dbo"."wkmaestroprimrole";
    SWV_error INTEGER;
BEGIN
    SWV_error := 0;
    OpenedTran := true;
    
    -- Update flag to N for all records before dumping values from worktable to the table
    UPDATE "dbo"."tprimroledb" SET "FLAG" = 'N';
    
    -- Cursor Declaration
    OPEN DISTINCT_ROLES_CUR;
    FETCH DISTINCT_ROLES_CUR INTO BusinessEntity, NatureStatus;
    
    WHILE (FOUND) LOOP
        IF EXISTS(SELECT 1 FROM "dbo"."tprimroledb" WHERE "codprimrole" = BusinessEntity) THEN
            UPDATE "dbo"."tprimroledb" SET
                "FLAG" = 'Y',
                "nameprimrole" = NatureStatus
            WHERE "codprimrole" = BusinessEntity;
        ELSE
            INSERT INTO "dbo"."tprimroledb"("FLAG", "codprimrole", "nameprimrole")
            VALUES('Y', BusinessEntity, NatureStatus);
        END IF;
        
        FETCH DISTINCT_ROLES_CUR INTO BusinessEntity, NatureStatus;
    END LOOP;
    
    CLOSE DISTINCT_ROLES_CUR;
    RETURN;
EXCEPTION
    WHEN OTHERS THEN
        IF DISTINCT_ROLES_CUR%ISOPEN THEN
            CLOSE DISTINCT_ROLES_CUR;
        END IF;
        RAISE;
END;
$function$;
