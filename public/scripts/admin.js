
$(() => {



  $('#sendSMS').on('click', function() {
    const detail = $(this).closest('.orderDetail');
    const orderid = detail.find('.orderid').text();
    const phoneNumber = detail.find('.phoneSMS').text();

    const timeframe = detail.find('.timeframe').val();
    const data = { orderid, phoneNumber, timeframe };
    console.log("orderid, phoneNumber, timeframe >>>>>", data);

    $.post('/admin', data)
      .then(res => {
        console.log("RES>>>>>>>>>", res);
      });





  });


});
