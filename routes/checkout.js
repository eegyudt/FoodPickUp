const { response } = require('express');
const express = require('express');
const checkoutRoutes = express.Router();
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const selectCartItems = require('../db/selectCartItemsWithId');
const { getUserbyId } = require("../helper");
const sendText = require('../send_sms');

let pendingItemsWithQuantity = [];

checkoutRoutes.post('/', (req, res) => {
  console.log({ data: req.body });

  const userId = req.session['user_id'];

  //checking if user is logged in
  if (!userId) {
    return res.status(400).send(`<h1>You must login first!<h1> <a href ="/login">Back to Login</a>`);
  }

  const pendingItems = req.body;


  const pendingItemsArray = [];

  Object.entries(pendingItems).filter(([key, value]) => value !== '0')
    .forEach(([key, value]) => pendingItemsArray.push(key));
  console.log("pendingItemsArray>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

  // if (pendingItemsArray.length === 0) {
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!You haven't selected any items yet");
  //   $("#empty_cart").append("Your cart is still empty!");

  //   return;
  // }
  foodItemQueries.getFoodItemWithId(pendingItemsArray)
    .then(foodItem => {
      pendingItemsWithQuantity = foodItem.map((item) => ({
        ...item,
        quantity: pendingItems[item.id],
      }));

      console.log("pendingItemsWithQuantity", pendingItemsWithQuantity);

      for (let item of pendingItemsWithQuantity) {
        console.log(item.name);
        db.query(`INSERT INTO cart (user_id, menu_id, quantity, active) VALUES($1, $2, $3, true)`, [userId, item.id, item.quantity], (err, results) => {
          if (err) {
            throw err;
          }
        }
        );
      }
      console.log("pendingItemsWithQuantity", pendingItemsWithQuantity);

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
      console.log("user ^^^^^^^^^^^^^^^^", user);
      res.render('checkout.ejs', templateVars);

    });

});



checkoutRoutes.post('/payment', (req, res) => {
  const userId = req.session['user_id'];
  let orderId;

  // console.log("checkout.js in routes req.body", req.body);



  db.query(`INSERT INTO orders (order_status, user_id) VALUES( true, $1) RETURNING *`, [userId], (err, results) => {
    let itemArray = [];
    for (let item of pendingItemsWithQuantity) {

      orderId = results.rows[0].id;
      let itemID = item.id;
      let itemQuantity = item.quantity;
      itemArray.push(`${item.name} -  quantity: ${item.quantity}`);
      db.query(`INSERT INTO ordered_items (order_id, menu_id, quantity) VALUES( $1, $2, $3)`, [orderId, item.id, item.quantity], (err, results) => {
        if (err) {
          throw err;
        }

      }
      );

      if (err) {
        throw err;
      }
    }
    console.log("CHECKOUT ROUTES ITEMARRAY =========================", itemArray);
    const message = `Hi Pizzaholic 🍕, You have a new order (order number: ${orderId} --- ${itemArray}) Go to your dashboard please to manage the order`;
    phoneNumber = +14038164180;
    sendText(message, phoneNumber);
    res.json({ response: "Success" });

  }
  );

}


);

// menuRoutes.get('/', (req, res) => {

//   const userId = req.session['user_id'];
//   if (!userId) {
//     return res.redirect('/login');
//   }
//   getUserbyId(userId)
//     .then((user) => {

//       const templateVars = { user };
//       res.render('menu', templateVars);

//     });
// });

module.exports = checkoutRoutes;


          // STRETCH???? NOT IMPLEMENTED YET
          // selectCartItems.selectCartItemsWithId(userId)
          // .then(cartItem => {
          //   if (cartItem) {
          //     alert("You already have a pending order");
          //     res.redirect('/checkout');
          //   }
          // });


                // console.log("foodItem>>>>>>>>>>>>>>>>", foodItem);
      // res.json({ foodItem });
      // pendingFoodItems = foodItem;
