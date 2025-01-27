const db = require('./DataBaseConnection');

class GroupRepository {
    constructor() {
            this.db = db.getConnection();
        }

    async Get(user) {
        try {
            const sql = 'SELECT gr_id, gr_title FROM anm_groups WHERE gr_user=?';
            const [rows] = await this.db.query(sql, [user]);
            console.log('pobieranie grupy')
            return rows;
        }
        catch(e) {
            console.error('Groups Get Query ERROR: ' + e);
            return null;
        }
    }

    async Add(title, user) {
        try {
            const sql = `INSERT anm_groups (gr_title, gr_user) VALUES (?, ?);`;
            await this.db.execute(sql, [title, user]);
        }
        catch(e) {
            console.error('Groups Add Query ERROR: ' + e);
        }
    }

    async Edit(id, title) {
        try {
            const sql = `UPDATE anm_groups SET gr_title = ? WHERE gr_id = ?;`;
            await this.db.execute(sql, [title, id]);
        }
        catch(e) {
            console.error('Groups Edit Query ERROR: ' + e);
        }
    }

    async Delete(group, user) {
        try {
            const _group = Array.isArray(group) ? JSON.parse(group) : JSON.parse([group]);

            const sql = `DELETE FROM anm_groups WHERE gr_id IN (?) AND gr_user = ?;`;
            await this.db.execute(sql, [_group, user]);
        }
        catch(e) {
            console.error('Groups Delete Query ERROR: ' + e);
        }
    }
}

module.exports = new GroupRepository();