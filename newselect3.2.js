document.getElementById("selectc3").onchange = function() {
    var selectC3 = document.getElementById("selectc3");
    var selectC2 = document.getElementById("selectc2");
    var selectSgr = document.getElementById("selectsgr_code");

    var mapstr2 = selectC3.options[selectC3.selectedIndex].value;
    var subgroupmapstr2 = selectC2.options.length > 0 ? 
        selectC2.options[selectC2.selectedIndex].value : "";

    if (mapstr2 !== "" && subgroupmapstr2 !== "None") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        var codria = "";
        var codriaElements = document.getElementsByName("codria");
        for (var i = 0; i < codriaElements.length; i++) {
            if (codriaElements[i].checked) {
                codria = codriaElements[i].value;
                break;
            }
        }

        var postData = "searchType=fetchUsersdetails"
            + "&usergroup=" + encodeURIComponent(mapstr2)
            + "&name=" + encodeURIComponent(subgroupmapstr2)
            + "&codria=" + encodeURIComponent(codria)
            + "&sub_group_code=" + encodeURIComponent(selectSgr.options[selectSgr.selectedIndex].value);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    // Parse the response
                    var response = JSON.parse(xhr.responseText);

                    // Clear existing options
                    selectC2.options.length = 0;

                    // Check if usergroupsdata exists and has length
                    if (response && response.usergroupsdata && response.usergroupsdata.length > 0) { 
                        // Add new options using option constructor
                        for (var i = 0; i < response.usergroupsdata.length; i++) {
                            var usr = response.usergroupsdata[i];
                            
                            // Create option using Option constructor (more compatible)
                            var newOption = new Option(
                                usr.NAME,  // text
                                usr.USERNAME,  // value
                                false,  // defaultSelected
                                false   // selected
                            );

                            // Set custom attribute 
                            newOption.setAttribute('data-username', usr.USERNAME);

                            // Add option to select
                            selectC2.options[selectC2.options.length] = newOption;
                        }
                    } else {
                        // If no data is received, add a default message
                        var noDataOption = new Option(
                            "No options available", 
                            "", 
                            false, 
                            false
                        );
                        selectC2.options[selectC2.options.length] = noDataOption;
                    }

                    // Trigger change event
                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("change", false, true);
                        selectC2.dispatchEvent(evt);
                    } else {
                        selectC2.fireEvent("onchange");
                    }
                } catch (e) {
                    console.error("Error processing response:", e);
                    // Add error option
                    var errorOption = new Option(
                        "Error loading data", 
                        "", 
                        false, 
                        false
                    );
                    selectC2.options[selectC2.options.length] = errorOption;
                }
            }
        };

        xhr.send(postData);
    }
};
