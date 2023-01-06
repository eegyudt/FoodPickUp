$(() => {

  $('.sendSMS').on('click', function() {
    const detail = $(this).closest('.orderDetail');
    const orderid = detail.find('.orderid').text();
    const phoneNumber = detail.find('.phoneSMS').text();

    const timeframe = detail.find('.timeframe').val();
    const data = { orderid, phoneNumber, timeframe };

    $.post('/admin', data)
      .then(res => {

        let className = `textBox-${'orderid'}`;
        const smsButton = detail.find('.smsBtn');
        const textBox = detail.find('.textClass');
        smsButton.empty();
        textBox.empty();
        textBox.append(`<div class='minutes'>Timeframe: ${timeframe} minutes.</div>`);
      });
  });

  $('.completeBtn').on('click', function() {
    const detail = $(this).closest('.orderDetail');
    const orderid = detail.find('.orderid').text();

    $.post('/admin/orderstatus', { orderid: orderid })
      .then(res => {
        const complete = detail.find('.complete');
        complete.empty();
        complete.append(`<div class="orderComplete">Order complete</div>`);
        $('.orderComplete').css('background', 'rgb(6, 98, 121)');
        $('.orderComplete').css('color', 'white');
      });
  });
});
