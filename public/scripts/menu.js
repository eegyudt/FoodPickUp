// Client facing scripts here
$(() => {

  $.ajax({
    method: 'GET',
    url: '/api/menu'
  })
  .done((response) => {
    const $menuList = $('#menu');
    $menuList.empty();

    const foodItem = response.foodItem;
    for(const index in foodItem) {
      const item = foodItem[index];
      $(`<tr class="menu">`).append(`<td>$${item.name}</td><td id=price-${index}>${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><input readonly name="${item.id}" id="qty-${index}" value="0"/><input type=
      "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
    }

  });
});


app.post('/menu', (req, res) => {
  // const orderInfo = req.body;
  // console.log(orderInfo);

  // res.render('checkout', {data: req.body});

  // // Checking if both email and password has been entered
  // if (!email || !password) {
  //   return res.status(400).send(`<h1>You must enter both email and password to register!<h1> <a href ="/register">Back to Registration</a>`);
  // }
  // // Checking if email address has already been registered
  // if (getUserByEmail(email, users)) {
  //   return res.status(400).send(`<h1>You've already registered this email!<h1> <a href ="/register">Back to Registration</a>`);
  // }

  // const user_id = randomString();
  // req.session.user_id = user_id;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  // const user = {
  //   id: user_id,
  //   email: email,
  //   password: hashedPassword
  // };
  // users[user_id] = user;
  // res.redirect('/checkout');
});

// $(() => {

//   $.ajax({
//     method: 'POST',
//     url: '/api/menu'
//   })
//   .done((response) => {
//     response.redirect('/checkout');
//     // const $menuList = $('#menu');
//     // $menuList.empty();

//     // const foodItem = response.foodItem;
//     // for(const index in foodItem) {
//     //   const item = foodItem[index];
//     //   $(`<tr class="menu">`).append(`<td>$${item.name}</td><td id=price-${index}>${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><input readonly name="${item.id}" id="qty-${index}" value="0"/><input type=
//     //   "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
//     // }

//   });
// });

const priceCalculate = function (price) {
// let price = parseInt($(`#price-${index}`).text());
let subtotal = parseInt($(`#subtotal`).text());
subtotal += price;
$(`#subtotal`).text(subtotal);
}

const qtyAdd = function (element) {
let index = $(element).attr('id').slice(7);
let count = parseInt($(`#qty-${index}`).first().val());
count++ ;
$(`#qty-${index}`).first().val(count);
let price = parseInt($(`#price-${index}`).text());
priceCalculate(price);


}

const qtyMin = function (element) {
let index = $(element).attr('id').slice(7);
let count = parseInt($(`#qty-${index}`).first().val());
if (count === 0) {
  return
}
count-- ;
$(`#qty-${index}`).first().val(count);
let price = parseInt($(`#price-${index}`).text());
priceCalculate(-price);
}
