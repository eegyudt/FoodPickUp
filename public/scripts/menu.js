// Client facing scripts here
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log(urlencodedParser);


$(() => {

  $.ajax({
    method: 'GET',
    url: '/api/menu'
  })
    .done((response) => {
      const $menuList = $('#menu');
      $menuList.empty();

      let foodItem = response.foodItem;
      for (const index in foodItem) {
        const item = foodItem[index];
        $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><span name="${index}" id="qty-${index}">0</span><input type=
        "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
      }

    });
});

app.post('/menu', urlencodedParser, function(req, res) => {



  console.log(req.body);
  res.render('menu rendering>>>', { data: req.body });

});


const priceCalculate = function(price) {
  // let price = parseInt($(`#price-${index}`).text());
  let subtotal = parseInt($(`#subtotal`).text());
  subtotal += price;
  $(`#subtotal`).text(subtotal);
};

const qtyAdd = function(element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().text());
  count++;
  $(`#qty-${index}`).first().text(count);
  let price = parseInt($(`#price-${index}`).text());
  priceCalculate(price);


};

const qtyMin = function(element) {
  let index = $(element).attr('id').slice(7);
  let count = parseInt($(`#qty-${index}`).first().text());
  if (count === 0) {
    return;
  }
  count--;
  $(`#qty-${index}`).first().text(count);
  let price = parseInt($(`#price-${index}`).text());
  priceCalculate(-price);
};


// //login route - POST
// app.post('/menu', (req, res) => {
//   // const email = req.body.email;
//   // const password = req.body.password;

//   // const itemIndexArray = [];
//   const foodItemObject = {};
//   for (let index in foodItem) {
//     // itemIndexArray.push(index);
//     foodItemObject[index] = req.body.index;
//   }
//   console.log(foodItem);

//   // Checking if foodItemObject has items added


//   // // Checking if both email and password has been entered
//   // if (!email || !password) {
//   //   return res.status(400).send(`<h1>You must enter both email and password to login!<h1> <a href ="/login">Back to Login</a>`);
//   // }

//   // const user = getUserByEmail(email, users);

//   // // Checking if email is registered
//   // if (!user) {
//   //   return res.status(400).send(`<h1>You haven't registered this email!<h1> <a href ="/register">Back to Registration</a>`);
//   // }

//   // // Checking if password matches user's password
//   // if (!bcrypt.compareSync(password, user.password)) {
//   //   return res.status(400).send(`<h1>Email or password is incorrect!<h1> <a href ="/login">Back to Login</a>`);
//   // }

//   // const user_id = user.id;
//   // req.session.user_id = user_id;
//   // res.redirect('/urls');
// });
