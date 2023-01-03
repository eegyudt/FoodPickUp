const db = require('./connection');

const selectCartItemsWithId = (ids) => {
  const formattedIds = `(${ids.toString()})`;
  return db.query(`SELECT * FROM cart WHERE id in ${formattedIds};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { selectCartItemsWithId };