$(() => {



  $('.sendSMS').on('click', function() {
    const detail = $(this).closest('.orderDetail');
    const orderid = detail.find('.orderid').text();
    const phoneNumber = detail.find('.phoneSMS').text();

    const timeframe = detail.find('.timeframe').val();
    const data = { orderid, phoneNumber, timeframe };
    console.log("orderid, phoneNumber, timeframe >>>>>", data);

    console.log("admin page event =======================", event);
    console.log("admin page event current target!!! =======================", event.currentTarget);

    $.post('/admin', data)
      .then(res => {
        console.log("RES>>>>>>>>>", res);

        let className = `textBox-${'orderid'}`;
        const smsButton = detail.find('.smsBtn');
        const textBox = detail.find('.textClass');

        // debugger;

        smsButton.empty();
        textBox.empty();
        textBox.append(`<div class='minutes'>Timeframe: ${timeframe} minutes.</div>`);
      });
  });


  $('.completeBtn').on('click', function() {
    const detail = $(this).closest('.orderDetail');
    const orderid = detail.find('.orderid').text();

    console.log("orderid----------->", orderid)



    $.post('/admin/orderstatus', {orderid: orderid})
      .then(res => {
        console.log("RES>>>>>>>>>", res);


        const complete = detail.find('.complete');

        complete.empty();

        complete.append(`<div class="orderComplete">Order complete</div>`);
        $('.orderComplete').css('background', 'rgb(6, 98, 121)');
        $('.orderComplete').css('color', 'white');
      });
  });





});
