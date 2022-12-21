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
        $(`<tr class="menu">`).append(`<td>${item.name}</td><td>${item.price}</td><td><input type="button" value='-' id="qtyMinus-${index}" onclick="qtyMinus(this)"/><span>0</span><input type=
        "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/><input type="button" value="Add to Cart"/>`).appendTo($menuList);
      }

    });
});


const qtyAdd = function (element) {
console.log(element)

}

const qtyMinus = function (element) {
  console.log(element)

  }
