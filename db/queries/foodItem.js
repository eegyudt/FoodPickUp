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

module.exports = { getFoodItem, getFoodItemWithId };
