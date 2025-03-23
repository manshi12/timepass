xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var resultData = JSON.parse(xhr.responseText);
            
            if (resultData && resultData.length > 0) {
                if (check === 0) {
                    populateSearchOptions(stype, resultData);
                }

                // Handle search based on stype
                if (stype === 'sgr') {
                    // SGR to LE search
                    commonsearch('fetchLEBasedonSGR', resultData[0]['id'], searchParam, 'le', 0);
                    
                    if (document.getElementById("selectsgr_code").value !== '' && 
                        document.getElementById("selectle_code").value === '') {
                        checkForCreditFiles(
                            document.getElementById("selectsgr_code").value,
                            document.getElementById("selectle_code").value
                        );
                    } else if (document.getElementById("txtsgr_code").value !== '') {
                        commonsearch('fetchLegalEntityBasedonID',
                            document.getElementById("txtsgr_code").value,
                            searchParam, 'le', 0
                        );
                    }
                } 
                else if (stype === 'le') {
                    // LE to SGR search
                    commonsearch('fetchSGRBasedonLE', resultData[0]['id'], searchParam, 'sgr', 0);
                    
                    if (document.getElementById("selectsgr_code").value === '' && 
                        document.getElementById("selectle_code").value !== '') {
                        checkForCreditFiles(
                            document.getElementById("selectsgr_code").value,
                            document.getElementById("selectle_code").value
                        );
                    }
                }
                
                if (check === 0) {
                    populateSearchOptions(stype, resultData);
                }
            } else {
                if (check === 0) {
                    populateSearchOptions(stype, resultData);
                }
                alert("No Matching Results Found...! or You are not authorized to see this SGR/LE, please contact the Banking Administrator");
            }
            // document.getElementById("loading_wrap").style.display = 'none';
        }
    }
};
