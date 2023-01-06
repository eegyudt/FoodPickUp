// eslint-disable-next-line no-undef
$(document).ready(function() {

  $("#submit_button").click(function() {
    $.ajax({
      method: 'POST',
      url: '/checkout/payment'
    })
      .done((response) => {
        $(".buttonContainer").empty();
        $(".clearCart").empty();
        $("#checkout_title").empty();
        $("#clear_cart_button").empty();
        $("#checkout_title").append("Order Summary");
        $(".successMessage1").append("Order successfully placed!");
        $(".successMessage2").append("We'll text you in a couple of minutes with your order confirmation!");
      });
  });
});
