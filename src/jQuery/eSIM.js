$(document).ready(function () {
  $.each(eSIM, function (i, emp) {
    $("#eSIMDropdown").append(
      "<option value=" + emp.value + " >" + emp.label + "</option>"
    );
  });
});
