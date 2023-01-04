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

  return db.query(`SELECT orders.id, orders.user_id, menu_items.name
  FROM orders
  JOIN ordered_items ON order_id = orders.id
  JOIN menu_items ON menu_id = menu_items.id
  WHERE order_status IS FALSE AND date(order_started) = CURRENT_DATE
  ORDER BY orders.id DESC;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFoodItem, getFoodItemWithId, getPendingOrders };
