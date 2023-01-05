
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
        $(`<div class="menu">`).append(`
        <div>
        <div>${order.id}</div>
        </div>
        `).appendTo($orderList);
      }

    });
});
