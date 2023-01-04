const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const { getUserbyId } = require("../helper");

router.get('/login', (req, res) => {

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

router.post('/login', (req, res) => {
  const email = req.body.email;
  const pw = req.body.password;
  // let name = '';
  console.log({
    email,
    pw
  });

  let errors = [];

  if (!email || !pw) {
    errors.push({ message: " Please enter all fields" });
  }

  if (errors.length > 0) {
    return res.render('login', { errors });
  }

  db.query(`SELECT id, email, password, admin FROM users WHERE email = $1`, [email], (err, results) => {
    if (err) {
      throw err;
    }
    console.log("results.rows[0]--------------", results.rows[0]);


    if (!results.rows) {
      return res.status(400).send(`<h1>You haven't registered this email!<h1> <a href ="/register">Back to Registration</a>`);
    }

    if (!bcrypt.compareSync(pw, results.rows[0].password)) {
      errors.push({ message: "Incorrect login information!" });
      return res.render("login", { errors });
    }

    if (results.rows[0].admin === true) {
      const user_id = results.rows[0].id;
      req.session.user_id = user_id;
      return res.redirect('/admin');

    }

    const user_id = results.rows[0].id;
    req.session.user_id = user_id;
    res.redirect('/menu');
    // return name;
  }
  );
}
);


router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

module.exports = router;




