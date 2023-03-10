require('dotenv').config();
const { getUserbyId } = require("./helper");


// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const db = require('./db/connection');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieSession({
  name: 'user_id',
  keys: ['user_id'],
  // Cookies expire in 24 hours
  maxAge: 24 * 60 * 60 * 1000
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const menuApiRoutes = require('./routes/menu-api');
const adminApiRoutes = require('./routes/admin-api');
const usersRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');
const checkoutRoutes = require('./routes/checkout');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/menu', menuApiRoutes);
app.use('/api/admin', adminApiRoutes);
app.use('/users', usersRoutes);
app.use('/menu', menuRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/register', registerRoutes);
app.use('/', loginRoutes);
app.use('/admin', adminRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

  const userId = req.session['user_id'];

  getUserbyId(userId)
    .then((user) => {

      const templateVars = { user };
      res.render('index', templateVars);

    });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
