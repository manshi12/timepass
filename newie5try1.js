function updateUserSelection() {
  var selectC3 = document.getElementById("selectc3");
  var selectC2 = document.getElementById("selectc2");
  var selectSgrCode = document.getElementById("selectsgr_code");
  
  var mapstr2 = selectC3.options[selectC3.selectedIndex].value;
  var subgroupmapstr2 = selectC2.options[selectC2.selectedIndex].value;
  
  // Clear existing options in selectC2
  while (selectC2.options.length > 0) {
    selectC2.remove(0);
  }
  
  // Add empty option if it doesn't exist
  var emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.text = "";
  selectC2.add(emptyOption);
  
  // Get selected radio button value
  var codriaValue = "";
  var codriaElements = document.getElementsByName("codria");
  for (var i = 0; i < codriaElements.length; i++) {
    if (codriaElements[i].checked) {
      codriaValue = codriaElements[i].value;
      break;
    }
  }
  
  // Instead of AJAX, you would use a predefined data array or access data from another source
  // This is a placeholder for where you would normally process your data
  var usergroupsdata = [
    // Your user data would be here
    // Example: {USERNAME: "user1", NAME: "John Doe"}
  ];
  
  // Populate the dropdown with user data
  for (var j = 0; j < usergroupsdata.length; j++) {
    var usr = usergroupsdata[j];
    var option = document.createElement("option");
    option.value = usr.USERNAME;
    option.text = usr.NAME;
    option.setAttribute("data-username", usr.USERNAME);
    selectC2.add(option);
  }
  
  // Sort the dropdown options (basic implementation)
  var options = [];
  for (var k = 0; k < selectC2.options.length; k++) {
    options.push(selectC2.options[k]);
  }
  
  options.sort(function(a, b) {
    return a.text.localeCompare(b.text);
  });
  
  while (selectC2.options.length > 0) {
    selectC2.remove(0);
  }
  
  for (var l = 0; l < options.length; l++) {
    selectC2.add(options[l]);
  }
}

// Add event listener in a cross-browser compatible way
if (document.getElementById("selectc3").attachEvent) {
  // IE5 compatibility
  document.getElementById("selectc3").attachEvent("onchange", updateUserSelection);
} else {
  // Modern browsers
  document.getElementById("selectc3").addEventListener("change", updateUserSelection, false);
}
