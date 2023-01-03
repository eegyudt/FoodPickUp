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

  if (!email || !pw) {
    errors.push({ message: " Please enter all fields" });
  }

  if (errors.length > 0) {
    res.render('login', { errors });
  } else {
    const hashedPassword = bcrypt.hashSync(pw, 10);
    console.log(hashedPassword);

    db.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);

      db.query(`SELECT email, password, admin FROM users WHERE email = $1`, [email], (err, results) => {
        if (err) {
          throw err;
        }
        console.log("results--------------", results);
        console.log("results.rows--------------", results.rows);
        console.log("results.rows[0]--------------", results.rows[0]);
        console.log("results.rows[0].email--------------", results.rows[0].email);
        console.log("results.rows[0].password--------------", results.rows[0].password);

        const hashedPassword = bcrypt.hashSync(pw, 10);
        console.log("hashedPassword+++++++++++++++", hashedPassword);

        if (hashedPassword != pw) {
          errors.push({ message: "Incorrect login information! ???" });
          res.render("login", { errors });
        }


        console.log(results.rows);
        res.redirect('/menu');
        // return name;
      }
      );
    }
    );
  }
});



module.exports = router;
