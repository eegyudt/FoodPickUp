const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');


router.get('/', (req, res) => {
  // res.render('login');
  const user_id = req.session['user_id'];

  if (user_id) {
    return res.redirect('/menu');
  }
  res.render("login");
});

router.post('/', (req, res) => {
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
    res.render('login', { errors });
  }

  db.query(`SELECT id, email, password, admin FROM users WHERE email = $1`, [email], (err, results) => {
    if (err) {
      throw err;
    }
    console.log("results--------------", results);
    console.log("results.rows--------------", results.rows);
    console.log("results.rows[0]--------------", results.rows[0]);
    console.log("results.rows[0].email--------------", results.rows[0].email);
    console.log("results.rows[0].password--------------", results.rows[0].password);

    if (!results.rows) {
      return res.status(400).send(`<h1>You haven't registered this email!<h1> <a href ="/register">Back to Registration</a>`);
    }

    if (!bcrypt.compareSync(pw, results.rows[0].password)) {
      errors.push({ message: "Incorrect login information!" });
      res.render("login", { errors });
    }

    if (results.rows[0].admin === true) {
      res.redirect('/admin');

    }


    const user_id = results.rows[0].id;
    req.session.user_id = user_id;
    res.redirect('/menu');
    // return name;
  }
  );
}
);



module.exports = router;
