const { response } = require('express');
const express = require('express');
const checkoutRoutes = express.Router();
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const selectCartItems = require('../db/selectCartItemsWithId');
const { getUserbyId } = require("../helper");
const pizzaholicPhoneNumber = process.env.MY_PHONE_NUMBER;
const sendText = require('../send_sms');

let pendingItemsWithQuantity = [];

checkoutRoutes.post('/', (req, res) => {
  const userId = req.session['user_id'];

  //checking if user is logged in
  if (!userId) {
    return res.status(400).send(`<h1>You must login first!<h1> <a href ="/login">Back to Login</a>`);
  }
  const pendingItems = req.body;
  const pendingItemsArray = [];
  Object.entries(pendingItems).filter(([key, value]) => value !== '0')
    .forEach(([key, value]) => pendingItemsArray.push(key));
  
  foodItemQueries.getFoodItemWithId(pendingItemsArray)
    .then(foodItem => {
      pendingItemsWithQuantity = foodItem.map((item) => ({
        ...item,
        quantity: pendingItems[item.id],
      }));

      for (let item of pendingItemsWithQuantity) {
        db.query(`INSERT INTO cart (user_id, menu_id, quantity, active) VALUES($1, $2, $3, true)`, [userId, item.id, item.quantity], (err, results) => {
          if (err) {
            throw err;
          }
        });
      }
      res.redirect('/checkout');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

checkoutRoutes.get('/', (req, res) => {
  const userId = req.session['user_id'];
  if (!userId) {
    return res.redirect('/login');
  }
  getUserbyId(userId)
    .then((user) => {
      const templateVars = { pendingItemsWithQuantity: pendingItemsWithQuantity, user: user };
      res.render('checkout.ejs', templateVars);
    });
});



checkoutRoutes.post('/payment', (req, res) => {
  const userId = req.session['user_id'];
  let orderId;

  db.query(`INSERT INTO orders (order_status, user_id) VALUES( true, $1) RETURNING *`, [userId], (err, results) => {
    let itemArray = [];
    for (let item of pendingItemsWithQuantity) {
      orderId = results.rows[0].id;
      itemArray.push(`${item.name} -  quantity: ${item.quantity}`);
      db.query(`INSERT INTO ordered_items (order_id, menu_id, quantity) VALUES( $1, $2, $3)`, [orderId, item.id, item.quantity], (err, results) => {
        if (err) {
          throw err;
        }
      });

      if (err) {
        throw err;
      }
    }
    const message = `Hi Pizzaholic 🍕, You have a new order (order number: ${orderId} --- ${itemArray}) Go to your dashboard please to manage the order`;
    sendText(message, pizzaholicPhoneNumber);
    res.json({ response: "Success" });
  });
});

module.exports = checkoutRoutes;
