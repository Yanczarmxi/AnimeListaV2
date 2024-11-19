const loadsql = require('./load');

const sql = 'SELECT id, created, title, url, episodes FROM anm_animes';
const result = loadsql(sql);

module.exports = result;