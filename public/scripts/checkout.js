
// eslint-disable-next-line no-undef
$(document).ready(function() {




  $("#submit_button").click(function() {
    $.ajax({
      method: 'POST',
      url: '/checkout/payment'
    })
      .done((response) => {

        const name = "Pizzaholic";
        let dish = $("#item_name");
        let phoneNumber = +14038164180;
        let message = `Hi ${name}, A new order has been place on your website, which includes ${dish}. Please log onto your admin page to review the details and send clien the timeframe. Pizzaholic server 🍕`;
        let fCall = {
          sendText: function(message, phoneNumber) {
            client.messages
              .create({
                body: message,
                from: twilioNumber,
                to: phoneNumber
              })
              .then(message => console.log(message.sid));
          }
        }
        // sendText(message, +14038164180);
        // $( "#sendSMSButton" ).empty();

        $( ".buttonContainer" ).empty();
        $( ".clearCart" ).empty();
        $( "#checkout_title" ).empty();
        $( "#clear_cart_button" ).empty();
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
//     //   $(`< tr class="menu" > `).append(` < td > ${ item.name; }</td ><td id=price-${index}>$${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><input readonly name="${item.id}" id="qty-${index}" value="0"/><input type=
//     //   "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
//     // }

//   });
// });