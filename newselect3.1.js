document.getElementById("selectc3").onchange = function() {
    var selectC3 = document.getElementById("selectc3");
    var selectC2 = document.getElementById("selectc2");
    var selectSgr = document.getElementById("selectsgr_code");

    // Fallback for getting selected value in older browsers
    var mapstr2 = selectC3.options[selectC3.selectedIndex].value;
    var subgroupmapstr2 = selectC2.options.length > 0 ? 
        selectC2.options[selectC2.selectedIndex].value : "";

    // Ensure the condition is met before making the request
    if (mapstr2 !== "" && subgroupmapstr2 !== "None") {
        // Cross-browser AJAX object creation
        var xhr;
        try {
            // Modern browsers and IE7+
            xhr = new XMLHttpRequest();
        } catch (e) {
            try {
                // IE5 and IE6
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    alert("Your browser does not support AJAX!");
                    return false;
                }
            }
        }

        // Open connection
        xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Get radio button value
        var codria = "";
        var codriaElements = document.getElementsByName("codria");
        for (var i = 0; i < codriaElements.length; i++) {
            if (codriaElements[i].checked) {
                codria = codriaElements[i].value;
                break;
            }
        }

        // Prepare POST data
        var postData = "searchType=fetchUsersdetails"
            + "&usergroup=" + encodeURIComponent(mapstr2)
            + "&name=" + encodeURIComponent(subgroupmapstr2)
            + "&codria=" + encodeURIComponent(codria)
            + "&sub_group_code=" + encodeURIComponent(selectSgr.options[selectSgr.selectedIndex].value);

        // State change handler
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Parse response (safe parsing for older browsers)
                    var response;
                    try {
                        // Use eval as a fallback for older browsers (with caution)
                        response = eval("(" + xhr.responseText + ")");
                    } catch (e) {
                        // Fallback if eval fails
                        try {
                            response = JSON.parse(xhr.responseText);
                        } catch (e) {
                            alert("Error parsing response");
                            return;
                        }
                    }

                    // Clear existing options
                    while (selectC2.options.length > 0) {
                        selectC2.remove(0);
                    }

                    // Check if usergroupsdata exists and has length
                    if (response && response.usergroupsdata && response.usergroupsdata.length > 0) { 
                        // Add new options
                        for (var i = 0; i < response.usergroupsdata.length; i++) {
                            var usr = response.usergroupsdata[i];
                            
                            // Create option element cross-browser
                            var newOption = document.createElement("option");
                            
                            // Set attributes cross-browser
                            try {
                                newOption.setAttribute("data-username", usr.USERNAME);
                            } catch (e) {
                                // Fallback for very old browsers
                                newOption.dataUsername = usr.USERNAME;
                            }
                            
                            newOption.value = usr.USERNAME;
                            newOption.text = usr.NAME;
                            
                            // Append option cross-browser
                            try {
                                selectC2.appendChild(newOption);
                            } catch (e) {
                                // Fallback for older IE versions
                                selectC2.add(newOption);
                            }
                        }
                    } else {
                        // If no data is received, add a default message
                        var noDataOption = document.createElement("option");
                        noDataOption.value = "";
                        noDataOption.text = "No options available";
                        
                        try {
                            selectC2.appendChild(noDataOption);
                        } catch (e) {
                            selectC2.add(noDataOption);
                        }
                    }

                    // Trigger any additional UI updates or events
                    try {
                        // Modern browsers
                        var event = new Event('change');
                        selectC2.dispatchEvent(event);
                    } catch (e) {
                        // Fallback for older IE
                        if (document.createEventObject) {
                            var event = document.createEventObject();
                            selectC2.fireEvent("onchange", event);
                        }
                    }
                } else {
                    // Handle error
                    alert("Error in request: " + xhr.status);
                }
            }
        };

        // Send request
        xhr.send(postData);
    }
};

// Additional cross-browser event binding for older browsers
if (window.attachEvent) {
    document.getElementById("selectc3").attachEvent("onchange", function() {
        // Ensure the function runs in the correct context
        document.getElementById("selectc3").onchange.call(document.getElementById("selectc3"));
    });
}
