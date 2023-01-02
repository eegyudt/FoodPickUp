const express = require('express');
const checkoutRoutes = express.Router();
// const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');

checkoutRoutes.post('/', (req, res) => {
  console.log({ data: req.body });

  const pendingItems = req.body;
  const pendingItemsArray = [];
  let pendingFoodItems = [];
  console.log("pendingItems?????????????", pendingItems);
  console.log("pendingItems?????????????", pendingItems);

  Object.entries(pendingItems).filter(([key, value]) => value !== '0')
    .forEach(([key, value]) => pendingItemsArray.push(key));
  console.log("pendingItemsArray>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

  foodItemQueries.getFoodItemWithId(pendingItemsArray)
    .then(foodItem => {
      console.log("foodItem>>>>>>>>>>>>>>>>", foodItem);
      // res.json({ foodItem });
      pendingFoodItems = foodItem;

      const pendingItemsWithQuantity = foodItem.map((item) => ({
        ...item,
        quantity: pendingItems[item.id],
      }));


      console.log("pendingItemsWithQuantity] ! ! ! ! !", pendingItemsWithQuantity);


      res.render('checkout.ejs', { pendingItemsWithQuantity });

      const pendingItemsWithQuantity = foodItem.map((item) => ({
        ...item,
        quantity: pendingItems[item.id],
      }));


      console.log("pendingItemsWithQuantity] ! ! ! ! !", pendingItemsWithQuantity);


      res.render('checkout.ejs', { pendingItemsWithQuantity });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


});


module.exports = checkoutRoutes;
