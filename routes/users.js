/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getUserbyId } = require("../helper");


router.get('/', (req, res) => {
  const userId = req.session['user_id'];
  if (!userId) {
    return res.redirect('/menu');
  }
  getUserbyId(userId)
    .then((user) => {

      const templateVars = { user };
      if (user.admin) {
        res.render('users', templateVars);
      }
    });


  res.render('users');
});

module.exports = router;
