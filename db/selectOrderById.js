const db = require('./connection');

const getFoodItemWithId = (ids) => {
  const formattedIds = `(${ids.toString()})`;
  return db.query(`SELECT* FROM orders WHERE id in ${formattedIds};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFoodItemWithId };