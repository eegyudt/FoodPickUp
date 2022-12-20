const express = require('express');
const router = express.Router();
const menuItemsQueries = require('../db/menu_items_queries');

// GET /menu_items
router.get('/', (req, res) => {
  menuItemsQueries.getMenuItems()
    .then((menu_items) => {
      res.render(menu_items);
      // res.json(menuItems);
    });
});

//GET /menu_items/:id

module.exports = router;