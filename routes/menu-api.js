/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const foodItemQueries = require('../db/queries/foodItem');

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');

router.get('/', (req, res) => {
  foodItemQueries.getFoodItem()
    .then(foodItem => {
      res.json({ foodItem });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// router.post('/', (req, res) => {
//   // const userId = req.session.userId;
//   // console.log({ data: req.body });
//   const pendingItems = req.body;
//   const pendingItemsArray = [];
//   console.log(pendingItems);
//   let errors = [];

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
//   console.log("pendingItemsArray >>>>>>>>>>>>>>>>>>>>>>", pendingItemsArray);

//   for (let index in pendingItemsArray) {
//     if (pendingItemsArray[index]) {

//       db.query(`SELECT * FROM menu_items WHERE id = $1`, [index], (err, results) => {
//         if (err) {
//           throw err;
//         }
//         console.log(results.rows);

//         // if (results.rows.length > 0) {
//         //   errors.push({ message: "Email already exisited" });
//         //   res.render("register", { errors });
//         // } else {


//         console.log(results.rows);
//       }
//       );
//     }
//     // }
//   }




//   // if ($(`#qty-${index}`) > 0) {
//   //   // $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td>$(`#qty-${index}`)<input type="submit" value="Submit Order" id="submit">`).appendTo($orderBox);

//   //   $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>$${item.price}</td><td>`).appendTo($menuList);
//   // }










//   res.redirect('/checkout');

//   // res.render('checkout', { data: pendingItemsArray });
//   // res.redirect('/checkout');
// });




module.exports = router;
