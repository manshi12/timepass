CREATE OR REPLACE FUNCTION dbo."SPU_TPRIMROLEDB_UPDATE" ()
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update tprimroledb with concatenated distinct values
    WITH DistinctPrimRoles AS (
        SELECT DISTINCT
            CONCAT(
                business_entity, ' - ', 
                nature, ' - ', 
                status
            ) AS concatenated_role
        FROM 
            "dbo"."wk_maestro_primrole_dbe"
    )
    UPDATE "dbo"."tprimroledb" t
    SET 
        "codeprimrole" = d.concatenated_role,
        "nameprimrole" = d.concatenated_role
    FROM 
        DistinctPrimRoles d
    WHERE 
        -- Assuming we want to update all records
        -- Add specific WHERE conditions if needed
        1 = 1;

    -- Optional: Insert new records that don't exist
    INSERT INTO "dbo"."tprimroledb" ("codeprimrole", "nameprimrole")
    SELECT 
        d.concatenated_role,
        d.concatenated_role
    FROM 
        DistinctPrimRoles d
    WHERE NOT EXISTS (
        SELECT 1 
        FROM "dbo"."tprimroledb" t 
        WHERE t."codeprimrole" = d.concatenated_role
    );

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error occurred: %', SQLERRM;
        RAISE;
END;
$function$;
