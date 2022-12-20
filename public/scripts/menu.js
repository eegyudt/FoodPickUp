// Client facing scripts here
$(() => {
  $('#fetch-menu').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/menu'
    })
    .done((response) => {
      const $menuList = $('#menu');
      $menuList.empty();

      for(const item of response.foodItem) {
        $(`<tr class="menu">`).append(`<td>${item.name}</td><td>${item.price}</td><td><input type="button" value='-'/><span>0</span><input type=
        "button" value="+"/><input type="button" value="Add to Cart"/>`).appendTo($menuList);
      }

    });
  });
});

