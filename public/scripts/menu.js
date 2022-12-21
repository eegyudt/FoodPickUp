// Client facing scripts here
$(() => {

  $.ajax({
    method: 'GET',
    url: '/api/menu'
  })
    .done((response) => {
      const $menuList = $('#menu');
      $menuList.empty();

      const foodItem = response.foodItem;
      for(const index in foodItem) {
        const item = foodItem[index];
        $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><span name="${index}" id="qty-${index}">0</span><input type=
        "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
      }

    });
});


const priceCalculate = function(price) {
  // let price = parseInt($(`#price-${index}`).text());
  let subtotal = parseInt($(`#subtotal`).text());
  subtotal += price;
  $(`#subtotal`).text(subtotal);
};

const qtyAdd = function(element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().text());
  count++;
  $(`#qty-${index}`).first().text(count);
  let price = parseInt($(`#price-${index}`).text());
  priceCalculate(price);


};

const qtyMin = function(element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().text());
  if (count === 0) {
    return;
  }
  count--;
  $(`#qty-${index}`).first().text(count);
  let price = parseInt($(`#price-${index}`).text());
  priceCalculate(-price);
}


