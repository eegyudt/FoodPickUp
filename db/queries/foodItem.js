const db = require('../connection');

const getFoodItem = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => {
      return data.rows;
    });
};

const getFoodItemWithId = (ids) => {
  const formattedIds = `(${ids.toString()})`;
  return db.query(`SELECT id, name, price, ingredients FROM menu_items WHERE id in ${formattedIds};`)
    .then(data => {
      return data.rows;
    });
};

const getPendingOrders = () => {

  return db.query(`SELECT orders.id as orderID, orders.order_started as orderStarted, orders.user_id as userID, users.name as name, users.phone as phoneNumber, menu_items.name as dish, ordered_items.quantity as quantity FROM orders JOIN ordered_items ON order_id = orders.id JOIN menu_items ON menu_id = menu_items.id JOIN users ON users.id = orders.user_id WHERE order_status IS TRUE AND date(order_started) = CURRENT_DATE;
  `)
    .then(data => {
      return data.rows;
    });
};



module.exports = { getFoodItem, getFoodItemWithId, getPendingOrders };
