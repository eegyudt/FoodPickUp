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
  console.log("pendingItems?????????????", pendingItems);

  Object.entries(pendingItems).filter(([key, value]) => value !== '0')
    .forEach(([key, value]) => pendingItemsArray.push(key));
  console.log("pendingItemsArray>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

  foodItemQueries.getFoodItemWithId(pendingItemsArray)
    .then(foodItem => {
      console.log("foodItem>>>>>>>>>>>>>>>>", foodItem);
      // res.json({ foodItem });
      pendingFoodItems = foodItem;

      // const pendingItems = { 1: 1, 3: 2, 4: 0 };

      // const foodItem = [
      //   {
      //     id: 1,
      //     name: ",,,",
      //     ingredients: "...",
      //     price: "",
      //   },
      // ];
      // const pendingItemsWithQuantity = [];
      // for (key in pendingItems) {
      //   console.log(key);
      //   if (pendingItems[key]) {
      //     for (let element of foodItem) {
      //       if (pendingItems[key] === element.id) {
      //         pendingItemsWithQuantity.push({ id: foodItem.id, name: foodItem.name, ingredient: foodItem.ingredients, price: foodItem.price, quantity: pendingItems[item] });
              
      //         console.log("pendingItems[item]", pendingItems[item]);
      //       }
      //     }
      //   }
      //   console.log(pendingItemsWithQuantity);
        
      // }
      
      // const pendingItemsWithQuantity = [];
      // for (let element of foodItem) {
      //   if (pendingItems.id === element.id) {
      //     pendingItemsWithQuantity.push({ id: foodItem.id, name: foodItem.name, ingredient: foodItem.ingredients, price: foodItem.price, quantity: pendingItems[item]});
      //     console.log("pendingItems[item] ! ! ! ! !", pendingItems[item]);
      //   }
      // }

      const pendingItemsWithQuantity = foodItem.map((item) => ({
        ...item,
        quantity: pendingItems[item.id],
      }));

      // const pendingItemsWithQuantity = foodItem.map((item) => {
      //   ...item, quantity: pendingItems[item.id],
      // }));
      console.log("pendingItemsWithQuantity] ! ! ! ! !", pendingItemsWithQuantity);


      res.render('checkout.ejs', { pendingItemsWithQuantity });
      console.log("pendingItemsWithQuantity???????????", pendingItemsWithQuantity);
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