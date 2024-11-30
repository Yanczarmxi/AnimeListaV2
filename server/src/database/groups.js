const loadsql = require('./load');

const sql = 'SELECT gr_id, gr_title FROM anm_groups';
const result = loadsql(sql);

module.exports = result;