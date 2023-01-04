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




module.exports = router;
