
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
      for (const index in foodItem) {
        const item = foodItem[index];
        $(`<tr class="menu">`).append(`
        <div class="itemTable"
        <td>
            <div class="dishContainer">
              <div class="imageFoodName">
                <img class="food_photo" src="${item.food_photo_url}">
                <div class="food_name">${item.name}</div>
                <div class="price" id=price-${index}>${item.price}</div>
              </div>
              <div class="overlay">
                <div class="ingredients">${item.ingredients}</div>
              </div>
            </div>  
        </td>

        
        <td>
          <div class="quantityButtons">
            <div class="minus">
              <input class="plusMinusBtn" type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/>
            </div>
            <div class="count">
              <input readonly class="quantityText" name="${item.id}" id="qty-${index}" value="0"/>
            </div>
            <div class="plus">
              <input type="button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>
            </div>
          </div>
          </td>
          </div>
          `).appendTo($menuList);
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
  let count = parseInt($(`#qty-${index}`).first().val());
  count++;
  $(`#qty-${index}`).first().val(count);
  let price = parseInt($(`#price-${index}`).text());

  console.log("price>>>", $(`#price-${index}`).text());
  priceCalculate(price);
};

const qtyMin = function(element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().val());
  if (count === 0) {
    return;
  }
  count--;
  $(`#qty-${index}`).first().val(count);
  let price = parseInt($(`#price-${index}`).text());
  priceCalculate(-price);
};
