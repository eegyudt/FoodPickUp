/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');


router.get('/', (req, res) => {
  res.render('menu');
});

router.post('/',(req, res) => {
  console.log({data: req.body});

  res.render('checkout', {data: req.body});

});

module.exports = router;
// router.get('/', (req, res) => { //???? do we need this here to access db???
//   foodItemQueries.getFoodItem()
//     .then(foodItem => {
//       res.json({ foodItem });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });


// router.post('/', (req, res) => {
//   // const userId = req.session.userId;
//   // const foodItem = response.foodItem;
//   console.log({ data: req.body });
//   const pendingItems = req.body;
//   const pendingItemsArray = [];
//   console.log(pendingItems);

//   for (let key in pendingItems) {

//     if (pendingItems[key]) {
//       //  const insertPendingOrder = {
//       //   text: `INSERT INTO ordered_items (menu_id, quantity); VALUES ()`,
//       //   values: []
//       //  };
//       // console.log(pendingItems[key]);
//       pendingItemsArray.push(pendingItems[key]);
//     }
//   }

//   for (let index in pendingItemsArray) {

//     const item = foodItem[index];
//     if ($(`#qty-${index}`) > 0) {
//       // $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td>$(`#qty-${index}`)<input type="submit" value="Submit Order" id="submit">`).appendTo($orderBox);

//         $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>$${item.price}</td><td>`).appendTo($menuList);
//     }
//   }


//   console.log(pendingItemsArray);




//   // res.render('checkout', { data: pendingItemsArray });
//   // res.redirect('/checkout');
// });