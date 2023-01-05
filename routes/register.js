const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const cookieSession = require('cookie-session');
const { getUserbyId } = require("../helper");

router.use(cookieSession({
  name: 'user_id',
  keys: ['user_id'],
  // Cookies expire in 24 hours
  maxAge: 24 * 60 * 60 * 1000
}));

// router.get('/', (req, res) => {
//   res.render('register');
// });

router.get('/', (req, res) => {

  const userId = req.session['user_id'];
  if (userId) {
    return res.redirect('/menu');
  }
  getUserbyId(userId)
    .then((user) => {

      const templateVars = { user };
      res.render('register', templateVars);

    });
});


router.post('/', async (req, res) => {




  let { name, email, phone, password } = req.body;

  console.log({
    name,
    email,
    phone,
    password
  });

  let errors = [];

  if (!name || !email || !phone || !password) {
    errors.push({ message: " Please enter all fields" });
  }

  if (phone.length < 9) {
    errors.push({ message: "Please enter a valid phone number" });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    db.query(
      `SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const userId = req.session['user_id'];
          if (userId) {
            return res.redirect('/menu');
          }
          getUserbyId(userId)
            .then((user) => {
              errors.push({ message: "Email already registered!" });
              res.render("register", { errors, user });
            });
        } else {
          db.query(
            `INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id, password`, [name, email, phone, hashedPassword], (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              res.redirect('/login');
            }
          );
        }
      }
    );
  }
});


module.exports = router;