const express = require('express');
const router  = express.Router();

// GET /checkout
router.get('/', (req, res) => {
  res.render('checkout');
});

module.exports = router;