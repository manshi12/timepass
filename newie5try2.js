document.getElementById("selectc3").onchange = function() {
    var selectc3 = document.getElementById("selectc3");
    var selectc2 = document.getElementById("selectc2");
    var mapstr2 = selectc3.options[selectc3.selectedIndex].value;
    var subgroupmapstr2 = selectc2.options[selectc2.selectedIndex].value;
    
    if(mapstr2 != '' && subgroupmapstr2 != 'None'){
        // Do nothing if conditions met
    } else {
        var xmlhttp;
        if (window.XMLHttpRequest) { // Modern browsers including Chrome
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var res = eval('(' + xmlhttp.responseText + ')');
                var i, options;
                
                // Clear existing options
                while(selectc2.options.length > 0) {
                    selectc2.options[0] = null;
                }
                
                // Check if empty option exists
                var optionExists = false;
                for(i = 0; i < selectc2.options.length; i++) {
                    if(selectc2.options[i].value == '') {
                        optionExists = true;
                        break;
                    }
                }
                
                // Add empty option if it doesn't exist
                if(!optionExists) {
                    var emptyOpt = document.createElement('option');
                    emptyOpt.value = '';
                    emptyOpt.text = '';
                    try {
                        selectc2.add(emptyOpt, selectc2.options[0]); // Chrome
                    } catch(e) {
                        selectc2.add(emptyOpt, 0); // IE5
                    }
                }
                
                // Build and add new options
                for(i = 0; i < res.usergroupsdata.length; i++) {
                    var usr = res.usergroupsdata[i];
                    var opt = document.createElement('option');
                    opt.value = usr.USERNAME;
                    opt.text = usr.NAME;
                    try {
                        opt.setAttribute('data-username', usr.USERNAME); // Chrome
                    } catch(e) {
                        opt['data-username'] = usr.USERNAME; // IE5
                    }
                    try {
                        selectc2.add(opt, null); // Chrome
                    } catch(e) {
                        selectc2.add(opt, selectc2.options.length); // IE5
                    }
                }
                
                // Sort options (bubble sort)
                options = selectc2.options;
                for(i = 0; i < options.length-1; i++) {
                    for(var j = 0; j < options.length-1-i; j++) {
                        if(options[j].text > options[j+1].text) {
                            selectc2.insertBefore(options[j+1], options[j]);
                        }
                    }
                }
            }
        };
        
        // Get radio button value
        var codriaInputs = document.getElementsByName("codria");
        var codriaValue = "";
        for(var i = 0; i < codriaInputs.length; i++) {
            if(codriaInputs[i].checked) {
                codriaValue = codriaInputs[i].value;
                break;
            }
        }
        
        // Get selectsgr_code value
        var selectsgr = document.getElementById("selectsgr_code");
        var selectsgrValue = selectsgr.options[selectsgr.selectedIndex].value;
        
        // Prepare and send request
        var data = "searchType=fetchUsersdetails" +
                  "&usergroup=" + escape(mapstr2) + // Using escape() instead of encodeURIComponent for IE5
                  "&sub_group_code=" + escape(subgroupmapstr2) +
                  "&codria=" + escape(codriaValue) +
                  "&name=" + escape(selectsgrValue);
                  
        xmlhttp.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }
};
