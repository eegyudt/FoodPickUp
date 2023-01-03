const db = require('./db/connection');


const getUserbyId = (userId) => {

  return db.query(`SELECT id, email, password, admin FROM users WHERE id = $1`, [userId])
  .then ((results) => {

    if (results.rows[0]) {
      return results.rows[0];
    }
    return {};
  })
}

module.exports = { getUserbyId };



