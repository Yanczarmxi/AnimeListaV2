const loadsql = require('./load');

const sql = 'SELECT id, user, data_registration, avatar FROM users';
const result = loadsql(sql);

module.exports = result;