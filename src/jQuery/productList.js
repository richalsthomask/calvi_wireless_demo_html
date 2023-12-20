$(document).ready(function () {
  // calling list function at rendering
  productListFilter();

  // reset button
  $("#resetButton").click(function () {
    $("#regionOfTestingDropdown").val("Select");
    $("#eSIMDropdown").val("Select");
    $("#formFactorDropdown").val("Select");
    productListFilter();
  });

  // dropdown select triggers
  $("#regionOfTestingDropdown").change(function () {
    productListFilter();
  });
  $("#eSIMDropdown").change(function () {
    productListFilter();
  });
  $("#formFactorDropdown").change(function () {
    productListFilter();
  });

  // filter array using dropdown select values
  function productListFilter() {
    let tempProducts = products.filter(function (product) {
      let regionFilterValue = $("#regionOfTestingDropdown").val();

      if (regionFilterValue === "Select") return true;
      else return product.testing.includes(regionFilterValue);
    });

    tempProducts = tempProducts.filter(function (product) {
      let eSIMFilterValue = $("#eSIMDropdown").val();

      if (eSIMFilterValue === "Select") return true;
      else return "" + product.eSIM === eSIMFilterValue;
    });

    tempProducts = tempProducts.filter(function (product) {
      let formFactorValue = $("#formFactorDropdown").val();

      if (formFactorValue === "Select") return true;
      else return product.formFactors.includes(formFactorValue);
    });

    $("#productList").empty();

    $.each(tempProducts, function (i, product) {
      $("#productList").append(
        `<div
      
      class="py-3 pl-3 w-full grid grid-cols-6 gap-5 text-sm sm:text-base text-gray-500">
      <span class="col-span-2 qq">${product.label}</span>
      <div class="flex flex-col gap-1">
        ${product.testing
          .map(
            (region) =>
              ` <span key={${region}}>
              ${regionOfTesting.find((val) => val.value === region)?.label}
            </span>`
          )
          .join(" ")}
      </div>
  
      <span>${product.eSIM ? "Yes" : "No"}</span>
      <div class="flex flex-col gap-1">
        ${product.formFactors
          .map((val, index) => `<span key={${index}}>${val}</span>`)
          .join(" ")}
      </div>
      <span id="${product.id}_add_to_cart_button" class="mx-auto">
      ${product.id}_add_to_cart_button
      </span>
     
    </div>`
      );
    });
  }
});
