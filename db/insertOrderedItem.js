const db = require('./connection');

const insertOrderedItems = (order_id, menu_id, quantity) => {
  // const formattedIds = `(${ids.toString()})`;
  return db.query(`INSERT INTO ordered_items (order_id, menu_id, quantity) VALUES ($1, $2, $3)`, [order_id, menu_id, quantity])
    .then(data => {
      return data.rows;
    });
};

module.exports = { insertOrderedItems };