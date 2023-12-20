//   button toggle show
let cartOrderAmount = localStorage.getItem ('cart_products_data')
  ? JSON.parse (localStorage.getItem ('cart_products_data'))
  : Array (products.length).fill (null);
localStorage.setItem ('cart_products_data', JSON.stringify (cartOrderAmount));

$ (document).ready (function () {
  loadButtons ();

  // on change in modal
  $ ('.close-cart-modal').click (function () {
    cartOrderAmount = JSON.parse (localStorage.getItem ('cart_products_data'));
    loadButtons ();
  });

  var target = $ ('#productList')[0];

  // Create an observer instance
  var observer = new MutationObserver (function () {
    loadButtons ();
  });

  // Configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
  };

  // Pass in the target node, as well as the observer options
  observer.observe (target, config);

  function loadButtons () {
    $.each (products, function (i, ele) {
      $ ('#' + ele.id + '_add_to_cart_button').empty ();
      $ ('#' + ele.id + '_add_to_cart_button').append (
        cartOrderAmount[ele.id] !== null
          ? ` <div key='${ele.id}'  class="flex flex-row gap-1">
                <div class="flex flex-row gap-1">
          ${cartOrderAmount[ele.id] <= 5 || !cartOrderAmount[ele.id] ? `<button
              key='${ele.id}'
             
              class="delete-cart-button bg-red-500 hover:bg-red-600 rounded-l-full px-2.5 py-1.5"
            >
            <svg class='w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="white" d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>` : ` <button
              key='${ele.id}'
              class="add-to-cart-negative-button rounded-l-full px-2.5 py-1 ${cartOrderAmount[ele.id] === 5 ? 'bg-indigo-400' : 'cursor-pointer bg-indigo-500 hover:bg-indigo-600'}"
            >
            
          <svg class='w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Edit / Remove_Minus">
          <path id="Vector" d="M6 12H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </svg>
            </button>`}
          <style>
          /* remove arrows of input type=number */

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            display: none;
          }
        </style>
          <input
          key='${ele.id}'
            value='${cartOrderAmount[ele.id]}'
            type="number"
            class="cart-amount-input border border-gray-400 rounded px-2 py-1 text-center w-12"
            
          />
          <button
           key='${ele.id}'
            class="add-to-cart-positive-button rounded-r-full px-2.5 py-1 ${cartOrderAmount[ele.id] === 10 ? 'bg-indigo-400' : 'cursor-pointer bg-indigo-500 hover:bg-indigo-600'}" 
          >
           <svg class='w-4' fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	         viewBox="0 0 45.402 45.402"
	           xml:space="preserve">
                <g>
	               <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
	              	c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
	              	c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
	             	 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
               </g>
            </svg>
          </button>
        </div>
                </div>`
          : `
                <button
                key='${ele.id}' 
                  class="pre-order-button px-5 py-2 rounded-full bg-green-600 hover:bg-green-500 text-xs sm:text-sm shadow-xl text-white font-semibold"
                >
                  PRE-ORDER
                
                </button>
              
            `
      );
    });
    $ ('.pre-order-button').click (function () {
      const key = $ (this).attr ('key');
      cartOrderAmount[Number (key)] = 5;
      loadButtons ();
    });

    $ ('.delete-cart-button').click (function () {
      const key = $ (this).attr ('key');
      cartOrderAmount[Number (key)] = null;
      loadButtons ();
    });

    $ ('.add-to-cart-positive-button').click (function () {
      const key = $ (this).attr ('key');
      cartOrderAmount[Number (key)] < 10 && cartOrderAmount[Number (key)]++;
      loadButtons ();
    });

    $ ('.add-to-cart-negative-button').click (function () {
      const key = $ (this).attr ('key');
      cartOrderAmount[Number (key)] > 5 && cartOrderAmount[Number (key)]--;
      loadButtons ();
    });

    $ ('.cart-amount-input').change (function () {
      const key = $ (this).attr ('key');
      let value = Number ($ (this).val ());
      if (value < 5) value = 5;
      if (value > 10) value = 10;
      cartOrderAmount[Number (key)] = value;
      loadButtons ();
    });

    localStorage.setItem (
      'cart_products_data',
      JSON.stringify (cartOrderAmount)
    );
  }
});
