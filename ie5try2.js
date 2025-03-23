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
    selectCode.id = "select" + stype + "_code"; // Fixed syntax error
    alert("4");
    
    // IE5 compatible event attachment
    if (window.attachEvent) { // Old IE way
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
    
    // IE5 compatible event attachment
    if (window.attachEvent) { // Old IE way
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
        // IE5 compatible parent reference
        var txtCodeParent = txtCode.parentNode || txtCode.parentElement;
        if (txtCodeParent) {
            txtCodeParent.replaceChild(selectCode, txtCode);
        }
        alert("12");
        
        // IE5 compatible parent reference
        var txtNameParent = txtName.parentNode || txtName.parentElement;
        if (txtNameParent) {
            txtNameParent.replaceChild(selectName, txtName);
        }
        alert("13");
        
        // Show reset buttons - IE5 specific way
        var sgrReset = document.all || document.getElementsByTagName("*");
        for (var i = 0; i < sgrReset.length; i++) {
            if (sgrReset[i].className == "sgr_reset") {
                sgrReset[i].style.display = 'block';
            }
        }
        alert("14");
    }
    
    // Populate options - IE5 compatible way
    alert("15");
    for (var index = 0; index < resultData.length; index++) {
        var item = resultData[index];
        
        // IE5 way of creating and adding options
        try {
            // For IE5, use the options collection directly
            var codeLen = selectCode.options.length;
            selectCode.options[codeLen] = new Option(item.id, item.id);
            
            var nameLen = selectName.options.length;
            selectName.options[nameLen] = new Option(item.name || item.id, item.id);
        } catch(ex) {
            alert("Error adding option: " + ex.message);
        }
    }
    alert("16");
    
    // Determine container IDs
    var appendtotype, appendtotype2;
    if (stype == 'le') {
        appendtotype = 'legroupname_id';
        appendtotype2 = 'legroupname_code';
    } else if (stype == 'sgr') {
        appendtotype = 'subgroupname_id';
        appendtotype2 = 'subgroupname_code';
    }
    alert("17");
    
    // Get container elements
    var appendToElement = document.getElementById(appendtotype);
    var appendToElement2 = document.getElementById(appendtotype2);
    alert("18");
    
    // Append controls to containers - IE5 compatible way
    if (appendToElement && appendToElement2) {
        // Clear existing content - this works in IE5
        appendToElement.innerHTML = '';
        appendToElement2.innerHTML = '';
        alert("19");
        
        // Simple appendChild works in IE5
        try {
            appendToElement.appendChild(selectName);
            appendToElement2.appendChild(selectCode);
        } catch(ex) {
            alert("Error appending: " + ex.message);
            
            // Alternative method for very old IE
            if (appendToElement.insertAdjacentElement) {
                appendToElement.insertAdjacentElement("beforeEnd", selectName);
                appendToElement2.insertAdjacentElement("beforeEnd", selectCode);
            }
        }
        alert("20");
    }
    alert("Done");
}
