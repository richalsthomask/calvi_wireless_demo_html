$(document).ready(function () {
  $.each(formFactor, function (i, emp) {
    $("#formFactorDropdown").append(
      "<option value=" + emp + " >" + emp + "</option>"
    );
  });
});
