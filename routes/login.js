const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require('../db/connection');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const pw = req.body.password;
  let name = '';
  console.log({
    email,
    pw
  });

  let errors = [];

  if (!email || !password) {
    errors.push({ message: " Please enter all fields" });
  }

  if (errors.length > 0) {
    res.render('login', { errors });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    db.query(
      `SELECT * FROM users
      WHERE email = $1`, [email], (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);

      if (results.rows.length > 0) {
        errors.push({ message: "Email not registered! ???" });
        res.render("login", { errors });
      } else {
        db.query(
          `SELECT name, email, password, admin FROM users
          WHERE email = $1
          `, [name, email, password, admin], (err, results) => {
          if (err) {
            throw err;
          }

          const hashedPassword = bcrypt.hashSync(pw, 10);

          if (hashedPassword != pw) {
            errors.push({ message: "Incorrect login information! ???" });
            res.render("login", { errors });
          }

          let userID = name;

          console.log(results.rows);
          res.redirect('/menu');
          // return name;
        }
        );
      }
    }
    );
  }
});


module.exports = router;
