const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'user_id',
  keys: ['user_id'],
  // Cookies expire in 24 hours
  maxAge: 24 * 60 * 60 * 1000
}));

router.get('/', (req, res) => {
  // res.render('login');
  const user_id = req.session['user_id'];

  if (user_id) {
    return res.redirect('/urls');
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
      return res.status(400).send(`<h1>Email or password is incorrect!<h1> <a href ="/login">Back to Login</a>`);
    }

    // const hashedPassword = bcrypt.hashSync(pw, 10);
    // console.log("hashedPassword+++++++++++++++", hashedPassword);

    // if (hashedPassword != pw) {
    //   errors.push({ message: "Incorrect login information!" });
    //   res.render("login", { errors });
    // }
    const user_id = results.rows[0].id;
    req.session.user_id = user_id;
    res.redirect('/menu');
    // return name;
  }
  );
}
);



module.exports = router;
