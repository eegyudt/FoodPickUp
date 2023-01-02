const db = require('./connection');

const getFoodItemWithId = (ids) => {
  const formattedIds = `(${ids.toString()})`;
  return db.query(`SELECT name, price, ingredients FROM menu_items WHERE id in ${formattedIds};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFoodItemWithId };
