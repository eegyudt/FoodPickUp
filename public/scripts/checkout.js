

      // const orderInfo = pendingItemsWithQuantity;




    
// eslint-disable-next-line no-undef
$(document).ready(function() {
 


   
    $("#submitButton").click(function() {
      $.ajax({
        method: 'POST',
        url: '/checkout/payment'
      })
        .done((response) => {
    $( ".buttonContainer" ).empty();
    $( ".clearCart" ).empty();
    $( "#checkout_title" ).append("Order Summary");
    $( ".successMessage1" ).append("Order successfully placed!");
    $( ".successMessage2" ).append("We'll text you in a couple of minutes with your order confirmation!");

        
  });
 })});





// $(document).on("click", ".submitButton", function(){
//   alert("The button is clicked in Ajax content!!");
// }); 

// $(document).ready(function() {
//   $("#button_1").click(function(e) {
//     e.preventDefault();
//     $.ajax({
//       type: "POST",
//       url: "/checkout/",
//       data: {
//         id: $("#button_1").val(),
//         access_token: $("#access_token").val()
//       },
//       success: function(result) {
//         alert('ok');
//       },
//       error: function(result) {
//         alert('error');
//       }
//     });
//   });



// $(() => {

//   $.ajax({
//     method: 'POST',
//     url: '/api/checkout'
//   })
//   .done((response) => {
//     console.log(response);
    
    
//     // const $menuList = $('#menu');
//     // $menuList.empty();

//     // const foodItem = response.foodItem;
//     // for(const index in foodItem) {
//     //   const item = foodItem[index];
//     //   $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>$${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><input readonly name="${item.id}" id="qty-${index}" value="0"/><input type=
//     //   "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
//     // }

//   });
// });