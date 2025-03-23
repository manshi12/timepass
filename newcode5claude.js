xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var resultData = JSON.parse(xhr.responseText);
            if (resultData) {
                if (check === 0) populateSearchOptions(stype, resultData);
                
                // Handle SGR to LE search
                if (stype === 'sgr') {
                    commonsearch('fetchLEBasedonSGR', resultData[0]['id'], searchParam, 'le', 0);
                } 
                // Handle LE to SGR search
                else if (stype === 'le') {
                    commonsearch('fetchSGRBasedonLE', resultData[0]['id'], searchParam, 'sgr', 0);
                }
                
                // Check for additional conditions
                if (document.getElementById("selectsgr_code").value !== '' && 
                    document.getElementById("selectle_code").value !== '') {
                    checkForCreditFiles(document.getElementById("selectsgr_code").value,
                                       document.getElementById("selectle_code").value);
                } else if (document.getElementById("txtsgr_code").value !== '') {
                    commonsearch('fetchLegalEntityBasedonID',
                                document.getElementById("txtsgr_code").value, searchParam, 'le', 0);
                }
            } else {
                if (check === 0) {
                    populateSearchOptions(stype, resultData);
                    // No matching results found notification can be added here
                }
            }
            // document.getElementById("loading_wrap").style.display = 'none';
        }
    }
};
