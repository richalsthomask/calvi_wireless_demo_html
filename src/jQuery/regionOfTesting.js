$(document).ready(function () {
  $.each(regionOfTesting, function (i, emp) {
    $("#regionOfTestingDropdown").append(
      "<option value=" + emp.value + " >" + emp.label + "</option>"
    );
  });
});
