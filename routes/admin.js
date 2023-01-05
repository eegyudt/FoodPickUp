const express = require('express');
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
      console.log("ADMIN page user =============================", user);
      if (!user.admin) {
        return res.redirect('/menu');
      }
      foodItemQueries.getPendingOrders()
        .then(orders => {
          // res.json({ orders });

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


// });

module.exports = adminRoutes;


