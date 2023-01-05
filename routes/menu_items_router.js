const express = require('express');
const router = express.Router();
const menuItemsQueries = require('../db/menu_items_queries');

// // GET /menu_items
// router.get('/', (req, res) => {
//   menuItemsQueries.getMenuItems()
//     .then((menu_items) => {
//       res.json(menu_items);
//       // res.render(menu_items);
//       // res.redurect();
//     });
//  });

//GET /menu_items/:id

// router.get('/id', (req, res) => {
//   menuItemsQueries.getMenuItemById(req.params.id)
//     .then((menu_item) => {
//       res.json(menu_item);
//     });
// });

module.exports = router;