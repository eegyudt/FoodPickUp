const express = require('express');
const adminRoutes = express.Router();
const db = require('../db/connection');
const foodItemQueries = require('../db/queries/foodItem');
const selectCartItems = require('../db/selectCartItemsWithId');
const { getUserbyId } = require("./helper");

adminRoutes.get('/', (req, res) => {

  const userId = req.session['user_id'];
  if (userId) {
    return res.redirect('/menu');
  }
  getUserbyId(userId)
    .then((user) => {

      const templateVars = { user };
      res.render('login', templateVars);

    });
});


// let pendingItemsWithQuantity = [];

// adminRoutes.post('/', (req, res) => {
//   console.log({ data: req.body });

//   const userId = req.session['user_id'];

//   //checking if user is logged in
//   if (!userId) {
//     return res.status(400).send(`<h1>You must login first!<h1> <a href ="/login">Back to Login</a>`);
//   }

// });


// adminRoutes.get('/', (req, res) => {
//   const userId = req.session['user_id'];
//   let userName = "";
//   db.query(`SELECT id, email, password, admin FROM users WHERE id = $1`, [userId], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     userName = results.rows[0].name;
//     console.log(userName);
//   })
//   const userObj = {userId, userName: results.rows[0].name };

//   // const user = users[user_id];
//   // const templateVars = { user };
//   // res.render("urls_new", templateVars);
//   res.render('admin.ejs', { pendingItemsWithQuantity, userObj });

// });

// module.exports = adminRoutes;