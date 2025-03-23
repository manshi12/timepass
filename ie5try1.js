function populateSearchOptions(stype, resultData) {
    // Clear alerts for debugging
    alert("1");
    if (document.getElementById("codria_code")) {
        document.getElementById("codria_code").value = '';
    }
    alert("2");
    
    // Create SELECT elements - use document.createElement for both browsers
    var selectCode = document.createElement("SELECT");
    alert("3");
    selectCode.id = "select" + stype + "_code"; // Fixed syntax error (colon to semicolon)
    alert("4");
    
    // Use proper cross-browser event attachment
    if (selectCode.attachEvent) { // IE5 way
        selectCode.attachEvent("onchange", function() { 
            selectdropdown(stype, 'code');
        });
    } else { // Modern browsers
        selectCode.onchange = function() { 
            selectdropdown(stype, 'code');
        };
    }
    alert("5");
    
    var selectName = document.createElement("SELECT");
    alert("6");
    selectName.id = "select" + stype + "_name"; // Fixed missing underscore
    alert("7");
    
    // Use proper cross-browser event attachment
    if (selectName.attachEvent) { // IE5 way
        selectName.attachEvent("onchange", function() { 
            selectdropdown(stype, 'name');
        });
    } else { // Modern browsers
        selectName.onchange = function() { 
            selectdropdown(stype, 'name');
        };
    }
    alert("8");
    
    // Get existing elements
    var txtCode = document.getElementById("txt" + stype + "_code");
    alert("9");
    var txtName = document.getElementById("txt" + stype + "_name"); // Fixed syntax error
    alert("10");
    
    // Replace existing elements if found
    if (txtCode && txtName) {
        alert("11");
        if (txtCode.parentElement) { // IE way
            txtCode.parentElement.replaceChild(selectCode, txtCode);
        } else if (txtCode.parentNode) { // Standard way
            txtCode.parentNode.replaceChild(selectCode, txtCode);
        }
        alert("12");
        
        if (txtName.parentElement) { // IE way
            txtName.parentElement.replaceChild(selectName, txtName);
        } else if (txtName.parentNode) { // Standard way
            txtName.parentNode.replaceChild(selectName, txtName);
        }
        
        // Show reset buttons
        var sgrReset;
        if (document.all) { // IE5 way
            sgrReset = document.all;
        } else { // Modern way
            sgrReset = document.getElementsByTagName("*");
        }
        
        for (var i = 0; i < sgrReset.length; i++) {
            if (sgrReset[i].className == "sgr_reset") {
                sgrReset[i].style.display = 'block';
            }
        }
    }
    
    // Populate options
    for (var index = 0; index < resultData.length; index++) {
        var item = resultData[index];
        
        var optionCode = document.createElement("OPTION");
        var optionName = document.createElement("OPTION");
        
        optionCode.value = item.id;
        optionCode.text = item.id; // IE5 doesn't support textContent
        
        optionName.value = item.id; // Fixed syntax error
        optionName.text = item.name || item.id;
        
        // Add options in a cross-browser way
        try {
            // Standard way
            selectCode.add(optionCode, null);
            selectName.add(optionName, null);
        } catch(ex) {
            // IE5 way
            selectCode.add(optionCode);
            selectName.add(optionName);
        }
    }
    
    // Determine container IDs
    var appendtotype, appendtotype2;
    if (stype == 'le') {
        appendtotype = 'legroupname_id';
        appendtotype2 = 'legroupname_code';
    } else if (stype == 'sgr') {
        appendtotype = 'subgroupname_id';
        appendtotype2 = 'subgroupname_code';
    }
    
    // Get container elements
    var appendToElement = document.getElementById(appendtotype);
    var appendToElement2 = document.getElementById(appendtotype2);
    
    // Append controls to containers
    if (appendToElement && appendToElement2) {
        // Clear existing content
        appendToElement.innerHTML = '';
        appendToElement2.innerHTML = '';
        
        // IE5 doesn't support DocumentFragment, use direct appendChild
        appendToElement.appendChild(selectName);
        appendToElement2.appendChild(selectCode);
    }
}
