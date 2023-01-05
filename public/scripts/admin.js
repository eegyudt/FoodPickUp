
const sendText = require('../send_sms');

$(() => {

  $.ajax({
    method: 'POST',
    url: '/admin'
  })
    .done((response) => {

      const $number = $('#phoneSMS');


      $('#sendSMS').click(function () {
        console.log($number)
      })


    });
});
