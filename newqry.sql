SELECT DISTINCT 
                c.\"SGRCODE\" AS sgr_code,
                -- Assuming SGRNAME is the correct column for SGR names
                t1.\"SGRNAME\" AS sgr_name
            FROM 
                \"TSPMDBE\" s
            INNER JOIN 
                \"TCDTFILEDBE\" c ON s.\"CODSPM\" = c.\"CODSPM\"
            INNER JOIN 
                \"TLINERIADBE\" t1 ON c.\"SGRCODE\" = t1.\"SGRCODE\"
            WHERE 
                s.\"CODSPM\" = '".$leCode."'
                AND s.\"CODLEVEL\" = 'LE'
                AND s.\"FLAG\" = 'Y'
                AND c.\"FLAG\" = 'Y'
                AND t1.\"FLAG\" = 'Y'
            ORDER BY 
                c.\"SGRCODE\" ASC
        ";
