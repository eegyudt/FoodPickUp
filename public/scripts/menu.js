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
        $(`<tr class="menu">`).append(`<td>${item.name}</td><td>${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><span id="qty-${index}">0</span><input type=
        "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/><input type="button" value="Add to Cart"/>`).appendTo($menuList);
      }

    });
});


const qtyAdd = function (element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().text());
  count++ ;
  $(`#qty-${index}`).first().text(count);

}

const qtyMin = function (element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().text());
  if (count === 0) {
    return
  }
  count-- ;
  $(`#qty-${index}`).first().text(count);
}


