const db = require('./connection');

const getMenuItems = () => {
  return db.query('SELECT menu_items.* FROM menu_items;')
    .then((response) => {
      return response.rows;
    });
};

const getMenuItemById = (id) => {
  return db.query('SELECT menu_items.* FROM menu_items WHERE menu_items.id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getMenuItems,
  getMenuItemById
};