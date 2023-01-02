const db = require('./connection');

const insertNewOrder = () => {
  // const formattedIds = `(${ids.toString()})`;
  return db.query(`INSERT INTO orders (order_status, user_id) VALUES ($1, $2)`, [order_status, user_id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { insertNewOrder };
