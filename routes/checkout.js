const express = require('express');
const checkoutRoutes = express.Router();
// const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');

checkoutRoutes.post('/', (req, res) => {
  console.log({ data: req.body });

  // const dataObject

  const pendingItems = req.body;
  const pendingItemsArray = [];
  let pendingFoodItems = [];
  console.log(pendingItems);

  Object.entries(pendingItems).filter(([key, value]) => value !== '0')
    .forEach(([key, value]) => pendingItemsArray.push(key));
  console.log("pendingItemsArray>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

  foodItemQueries.getFoodItemWithId(pendingItemsArray)
    .then(foodItem => {
      console.log("foodItem>>>>>>>>>>>>>>>>", foodItem);
      // res.json({ foodItem });
      pendingFoodItems = foodItem;
      res.render('checkout.ejs', { pendingFoodItems });
      console.log("pendingFoodItems???????????", pendingFoodItems);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  


});

// app.get('/checkout', db.getFoodItemWithId);

// GET /checkout
// router.get('/', (req, res) => {
//   res.render('checkout');
// });

// router.post('/', (req, res) => {
//   console.log({ data: req.body });

//   // const dataObject

//   const pendingItems = req.body;
//   const pendingItemsArray = [];
//   let pendingFoodItems = [];
//   console.log(pendingItems);

//   Object.entries(pendingItems).filter(([key, value]) => value !== '0')
//     .forEach(([key, value]) => pendingItemsArray.push(key));
//   console.log("pendingItemsArray>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

//   foodItemQueries.getFoodItemWithId(pendingItemsArray)
//     .then(foodItem => {
//       console.log("foodItem>>>>>>>>>>>>>>>>", foodItem);
//       pendingFoodItems = foodItem;
//       console.log("pendingFoodItems???????????", pendingFoodItems);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });


//   res.render('checkout', { data: pendingFoodItems });




// });


// res.redirect('checkout');
// for (let key in pendingItems) {

//   if (pendingItems[key]) {
//     //  const insertPendingOrder = {
//     //   text: `INSERT INTO ordered_items (menu_id, quantity); VALUES ()`,
//     //   values: []
//     //  };
//     // console.log(pendingItems[key]);
//     pendingItemsArray.push(pendingItems[key]);
//   }
// }
module.exports = checkoutRoutes;