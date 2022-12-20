// load .env data into process.env
require('dotenv').config();

const {getUserbyId} = require("./helper");


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
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
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
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
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/order');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/menu', menuApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/menu', menuRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/order', orderRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
// Note: mount other resources here, using the same pattern above


// import the routers
const menuItemsRouter = require('./routes/menu_items_router');

// user the routers
app.use('/menu_items', menuItemsRouter);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

  const userId = req.session['user_id'];

  getUserbyId(userId)
  .then ((user) => {

    const templateVars = { user };
    res.render('index', templateVars );

  })
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
