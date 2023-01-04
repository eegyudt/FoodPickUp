/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const menuRoutes = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const {getUserbyId} = require("../helper");


menuRoutes.get('/', (req, res) => {

  const userId = req.session['user_id'];
  if (!userId) {
    return res.redirect('/login');
  }
  getUserbyId(userId)
  .then ((user) => {

    const templateVars = { user };
    res.render('menu', templateVars );

  })
});



module.exports = menuRoutes;
