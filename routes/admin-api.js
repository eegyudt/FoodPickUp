const foodItemQueries = require('../db/queries/foodItem');

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');

router.get('/', (req, res) => {
  foodItemQueries.getPendingOrders()
    .then(orders => {
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
