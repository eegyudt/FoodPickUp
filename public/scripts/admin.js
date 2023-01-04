
// Client facing scripts here
$(() => {

  $.ajax({
    method: 'GET',
    url: '/api/admin'
  })
    .done((response) => {
      const $orderList = $('#order');
      $orderList.empty();

      const orders = response.orders;
      for (const index in orders) {
        const order = orders[index];
        $(`<tr class="menu">`).append(`
        <td>${order}</td>`).appendTo($orderList);
      }

    });
});
