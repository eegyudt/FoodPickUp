const express = require('express');
const { DocumentContext } = require('twilio/lib/rest/preview/sync/service/document');
const adminRoutes = express.Router();
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const { getUserbyId } = require("../helper");
const sendText = require('../send_sms');

adminRoutes.get('/', (req, res) => {

  const userId = req.session['user_id'];
  if (!userId) {
    return res.redirect('/menu');
  }

  return getUserbyId(userId)
    .then((user) => {
      if (!user.admin) {
        return res.redirect('/menu');
      }
      foodItemQueries.getPendingOrders()
        .then(orders => {
          
          const result = {};

          for (let order of orders) {

            if (result[order.orderid]) {
              result[order.orderid].orderedDishes.push(`${order.dish} x ${order.quantity}`);
            } else {
              result[order.orderid] = {
                orderid: order.orderid,
                orderstarted: order.orderstarted,
                userid: order.userid,
                name: order.name,
                phonenumber: order.phonenumber,
                orderedDishes: [`${order.dish} x ${order.quantity}`]
              };
            }
          }
          const finalResult = Object.values(result);
          return res.render('admin', { user, finalResult });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
});


// adminRoutes.post('/', (req, res) => {

//   const time = req.body.timeframe;
//   const name = "";
//   console.log(req.body(orderid));
//   let message = `Hi ${name}, Your oder will be ready for pickup in ${time} minutes. Thank you for choosing to dine with us! Pizzaholic 🍕`;
//   sendText(message, +14038164180);
//   // $( "#sendSMSButton" ).empty();

  
//   let button = document.querySelector('#button');
// let msg = document.querySelector('#message');

// button.addEventListener('click', ()=>{
//   msg.classList.toggle('reveal');
// })


// });

module.exports = adminRoutes;



// let div = document.getElementById('sendSMSButton');
// while (div.firstChild) {
//   div.removeChild(div.firstChild);
// }

// adminRoutes.POST('/', (req, res) => {

//   const userId = req.session['user_id'];
//   if (!userId) {
//     return res.redirect('/menu');
//   }
//   return getUserbyId(userId)
//     .then((user) => {
//       console.log("user ??????????????????????????????????????", user);

//       const templateVars = { user };
//       return res.render('admin', templateVars);

//     });
// });


// console.log("admin page ==================== orders:", orders);
// console.log("admin page result at the end of for loop:++++++++++++++++++++++++++++++", result);
          
// 
// console.log("adming page finalResult >>>>>>>>>>>>>???????????????", finalResult);



