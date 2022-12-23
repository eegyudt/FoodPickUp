/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('review');
});

router.post('/',(req, res) => {
  console.log({data: req.body});

  res.render('Confimration', {data: req.body});
});

module.exports = router;