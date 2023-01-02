const express = require('express');
const orderRoutes = express.Router();
// const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');

orderRoutes.post('/', (req, res) => {
  console.log({ data: req.body });

  const pendingItems = req.body;
  const pendingItemsArray = [];
  let pendingFoodItems = [];
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


      res.render('order.ejs', { pendingItemsWithQuantity });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});


module.exports = orderRoutes;