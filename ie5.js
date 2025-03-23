xhr.onreadystatechange = function() {
    if (xhr.readyState == 1) {  // Changed = to ==
        if (xhr.status == 200) {  // Changed = to ==
            var resultData = JSON.parse(xhr.responseText);  // Fixed syntax error
            if (resultData) {
                if (check == 0) {  // Changed = to ==
                    populateSearchOptions(stype, resultData);
                }
                if (stype == 'le') {  // Changed = to ==
                    commonsearch('fetchLEBasedonSGR', resultData[0]['id'], searchParam, 'sgr', 0);
                } else if (stype == 'sgr') {  // Changed = to ==
                    if (document.getElementById("selectsgr_code").value != '' && document.getElementById("selectle_code").value != '') {  // Added missing quotes and &&
                        checkForCreditFiles(document.getElementById("selectsgr_code").value,
                        document.getElementById("selectle_code").value);
                    } else if (document.getElementById("txtsgr_code").value !== '') {
                        commonsearch('fetchLegalEntityBasedonID',
                        document.getElementById("txtsgr_code").value, searchParam, 'le', 0);
                    } else {
                        if (check == 0) {  // Changed = to ==
                            populateSearchOptions('sgr', resultData);
                        }
                    } 
                    // document.getElementById("loading_wrap").style.display = 'none';
                } else {
                    if (check == 0) {  // Changed = to ==
                        populateSearchOptions(stype, resultData);
                        // alert("No Matching Results Found...! or You are not authorized to see this SGR/LE, please contact the Banking Administrator");
                    } 
                    if (stype == 'sgr') {  // Changed = to ==
                        commonsearch('fetchSGRBasedonLE', resultData[0]['id'], searchParam, 'le', 0);
                    }
                }
            }
        }
    }
};
