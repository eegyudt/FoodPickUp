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


adminRoutes.post('/', (req, res) => {


  console.log("admin route req.body", req.body);
  res.json({ status: 'ok' });


  // req.body { orderid: '9', phoneNumber: '4038164180', timeframe: '444' }

  const time = req.body.timeframe;
  let phoneNumber = req.body.phoneNumber;
  phoneNumber = "+1" + phoneNumber;
  const orderId = req.body.orderid;
  // console.log(req.body(orderid));
  let message = `Order number ${orderId} will be ready for pickup in ${time} minutes. Thank you for choosing to dine with us! Pizzaholic 🍕`;
  sendText(message, phoneNumber);
  let message2 = `Order number ${orderId} is ready for pickup now. I hope you enjoy your food! Pizzaholic 🍕`;
  setTimeout(() => sendText(message2, phoneNumber), time * 60 * 1000);


});

module.exports = adminRoutes;


