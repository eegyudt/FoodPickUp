const db = require('../connection');

const getFoodItem = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFoodItem };
