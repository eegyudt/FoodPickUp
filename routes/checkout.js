const express = require('express');
const checkoutRoutes = express.Router();
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const selectCartItems = require('../db/selectCartItemsWithId');
const { getUserbyId } = require("../helper");


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
  // console.log("pendingItemsArray>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

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
