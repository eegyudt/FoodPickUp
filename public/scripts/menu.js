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
        $(`<li class="menu">`).text(item.name).appendTo($menuList);
      }
    });
  });
});
