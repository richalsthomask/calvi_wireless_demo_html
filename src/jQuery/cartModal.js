const priceOfProduct = 35;

$ (document).ready (function () {
  $ ('.close-cart-modal').click (function () {
    $ ('#cart_modal').toggle ();
  });
  $ ('#open_modal').click (function () {
    $ ('#cart_modal').toggle ();
    generateCartModal ();
  });

  function generateCartModal () {
    let cartOrderAmount = JSON.parse (
      localStorage.getItem ('cart_products_data')
    );

    const cartProducts = cartOrderAmount
      .map (
        (val, index) =>
          val
            ? {
                id: index,
                amount: val,
                ...products.find (product => product.id === Number (index))
              }
            : null
      )
      .filter (val => val);

    const totalAmount = cartProducts.reduce (
      (sum, val) => sum + val.amount * priceOfProduct,
      0
    );

    $ ('.total-cart-amount').empty ();
    $ ('.total-cart-amount').append (`$${totalAmount}`);

    $ ('.cart-modal-checkout-button').empty ();
    $ ('.cart-modal-checkout-button').append (`Checkout $${totalAmount}`);

    $ ('#modal_cart_list').empty ();
    $.each (cartProducts, function (i, product) {
      $ ('#modal_cart_list').append (`
        
        <div class="w-full flex flex-col">
        <div class="py-4 w-full flex flex-row items-center justify-between px-4">
          <div class="flex flex-row items-center gap-8">
            <Image src="../public/C42GM.webp" alt="" height='40' width='40' />
            <span class="font-semibold text-gray-500">
              ${product.label}
            </span>
          </div>
          <button
            key='${product.id}'
            class="cart-delete-button transform hover:scale-110 duration-300"
          >
          <svg class='w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="red" d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </button>
        </div>
        <div class="border-y py-1.5 px-4 w-full grid grid-cols-8 sm:grid-cols-11 gap-2">
          <span>#</span>
          <span class="col-span-3">Name</span>
          <span class="col-span-2">Region</span>
          <span class="hidden sm:block">Esim</span>
          <span class="col-span-2 hidden sm:block">Form Factor</span>
          <span class="">Price</span>
          <span class="text-center">Qty</span>
        </div>
        <div class="border-y py-1.5 px-4 w-full grid grid-cols-8 sm:grid-cols-11 gap-2 text-gray-500 font-light text-xs">
          <span>${i + 1}</span>
          <span class="col-span-3">${product.label}</span>
          <span class="col-span-2 flex flex-col">
            ${product.testing.map((region) => (
              `<span key='${region}'>
                ${regionOfTesting.find((val) => val.value === region)?.label}
              </span>`
            )).join(' ')}
          </span>
          <span class="hidden sm:block">
            ${product.eSIM ? "Yes" : "No"}
          </span>
          <span class="col-span-2 hidden sm:flex flex-col">
            ${product.formFactors.map((val, index) => (
              `<span key='${index}'>${val}</span>`
            )).join(' ')}
          </span>
          <span class="">$35</span>
          <span class="text-center">${product.amount}</span>
        </div>
      </div>

        `);
    });

    $ ('.cart-delete-button').click (function () {
      const key = $ (this).attr ('key');
      cartOrderAmount[Number (key)] = null;
      localStorage.setItem (
        'cart_products_data',
        JSON.stringify (cartOrderAmount)
      );
      generateCartModal ();
    });
  }
});
