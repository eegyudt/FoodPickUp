/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('menu');
});

router.post('/', (req, res) => {
  // const userId = req.session.userId;
  console.log({ data: req.body });
  const pendingItems = req.body;
  
  console.log(pendingItems);
  for (let key in pendingItems) {
    if (pendingItems[key]) {
     const insertPendingOrder = {
      text: `INSERT INTO ordered_items (menu_id, quantity); VALUES ()`,
      values: []
     };
      console.log(pendingItems[key]);
      
    }
  }
  // 'INSERT INTO ordered_items
  //   (order_id, menu_id, quantity);
  // VALUES
  //   (1, 1, 1),
  //   (1, 4, 1),
  //   (1, 5, 1),
  //   (2, 2, 3),
  //   (2, 3, 3),
  //   (2, 4, 3),
  //   (2, 5, 3),
  //   (3, 1, 3),
  //   (3, 3, 1),
  //   (3, 9, 1),
  //   (4, 6, 1),
  //   (4, 7, 1),
  //   (4, 8, 2)'


  res.render('checkout', { data: req.body });
});

module.exports = router;
