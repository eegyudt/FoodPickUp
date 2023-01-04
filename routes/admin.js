const express = require('express');
const adminRoutes = express.Router();
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const selectCartItems = require('../db/selectCartItemsWithId');
const { getUserbyId } = require("../helper");

adminRoutes.get('/', (req, res) => {

  const userId = req.session['user_id'];
  if (!userId) {
    return res.redirect('/menu');
  }
  return getUserbyId(userId)
    .then((user) => {
      console.log("user ??????????????????????????????????????", user);

      const templateVars = { user };
      return res.render('admin', templateVars);

    });
});

module.exports = adminRoutes;


