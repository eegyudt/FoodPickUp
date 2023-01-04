


// // $(() => {

//   $.ajax({
//     method: 'GET',
//     url: '/api/menu'
//   })
//     .done((response) => {
//       const $menuList = $('#menu');
//       // const $orderBox = $('order-box');
//       $menuList.empty();

//       foodItem = response.foodItem;
//       for (const index in foodItem) {
//         const item = foodItem[index];
//         $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>$${item.price}</td><td><input type="button" value='-' id="qtyMin-${index}" onclick="qtyMin(this)"/><input readonly name="${item.id}" id="qty-${index}" value="0"/><input type=
//       "button" value="+" id="qtyAdd-${index}" onclick="qtyAdd(this)"/>`).appendTo($menuList);
//       }
//       // for (const index in foodItem) {
//       //   const item = foodItem[index];
//       //   if ($(`#qty-${index}`) > 0) {
//       //     $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td>$(`#qty-${index}`)<input type="submit" value="Submit Order" id="submit">`).appendTo($orderBox);
//       //   }
//       // }

//     });
// });


// const priceCalculate = function(price) {
//   // let price = parseInt($(`#price-${index}`).text());
//   let subtotal = parseInt($(`#subtotal`).text());
//   subtotal += price;
//   $(`#subtotal`).text(subtotal);
// };

// const qtyAdd = function(element) {
//   let index = $(element).attr('id').slice(7);
//   let count = parseInt($(`#qty-${index}`).first().val());
//   count++;
//   $(`#qty-${index}`).first().val(count);
//   let price = parseInt($(`#price-${index}`).text());
//   priceCalculate(price);


// };

// const qtyMin = function(element) {
//   let index = $(element).attr('id').slice(7);
//   let count = parseInt($(`#qty-${index}`).first().val());
//   if (count === 0) {
//     return;
//   }
//   count--;
//   $(`#qty-${index}`).first().val(count);
//   let price = parseInt($(`#price-${index}`).text());
//   priceCalculate(-price);
// }




// $(() => {

//   $.ajax({
//     method: 'POST',
//     url: '/api/menu'
//   })
//     .done((response) => {
//       const foodItem = response.foodItem;
//       console.log({ data: req.body });
//       const pendingItems = req.body;
//       const pendingItemsArray = [];
//       console.log(pendingItems);

//       for (let key in pendingItems) {

//         if (pendingItems[key]) {
//           //  const insertPendingOrder = {
//           //   text: `INSERT INTO ordered_items (menu_id, quantity); VALUES ()`,
//           //   values: []
//           //  };
//           // console.log(pendingItems[key]);
//           pendingItemsArray.push(pendingItems[key]);
//         }
//       }

//       for (let index in pendingItemsArray) {

//         const item = foodItem[index];
//         const itemObject = {};


//       }
//       //   if ($(`#qty-${index}`) > 0) {
//       //     // $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td>$(`#qty-${index}`)<input type="submit" value="Submit Order" id="submit">`).appendTo($orderBox);

//       //     $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>$${item.price}</td><td>`).appendTo($menuList);
//       //   }
//     }


//       console.log(pendingItemsArray);




//   res.render('checkout', { data: pendingItemsArray });
//   res.redirect('/checkout');
//     )});



// router.post('/', (req, res) => {
//   // const userId = req.session.userId;
//   const foodItem = response.foodItem;
//   console.log({ data: req.body });
//   const pendingItems = req.body;
//   const pendingItemsArray = [];
//   console.log(pendingItems);

//   for (let key in pendingItems) {

//     if (pendingItems[key]) {
//       //  const insertPendingOrder = {
//       //   text: `INSERT INTO ordered_items (menu_id, quantity); VALUES ()`,
//       //   values: []
//       //  };
//       // console.log(pendingItems[key]);
//       pendingItemsArray.push(pendingItems[key]);
//     }
//   }

//   for (let index in pendingItemsArray) {

//     const item = foodItem[index];
//     if ($(`#qty-${index}`) > 0) {
//       // $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>${item.price}</td><td>$(`#qty-${index}`)<input type="submit" value="Submit Order" id="submit">`).appendTo($orderBox);

//       $(`<tr class="menu">`).append(`<td>${item.name}</td><td id=price-${index}>$${item.price}</td><td>`).appendTo($menuList);
//     }
//   }


//   console.log(pendingItemsArray);




//   // res.render('checkout', { data: pendingItemsArray });
//   // res.redirect('/checkout');
// });