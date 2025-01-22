const db = require('./DataBaseConnection');

class SegregatedRepository {
    constructor() {
            this.db = db.getConnection();
        }

    async Get(user) {
        try {
            const sql = 'SELECT st_anime, st_group FROM anm_segregated WHERE st_user=?';
            const [rows] = await this.db.query(sql, [user]);
            console.log('pobieranie grupy')
            return rows;
        }
        catch(e) {
            console.error('Segregated Get Query ERROR: ' + e);
            return null;
        }
    }

    async Add(user, anime, group) {
        try {
            const sql = `INSERT anm_segregated (st_user, st_anime, st_group) VALUES (?, ?, ?);`;
            await this.db.query(sql, [user, anime, group]);
        }
        catch(e) {
            console.error('Segregated Add Query ERROR: ' + e);
        }
    }

    async Edit(group, anime, user) {
        try {
            const sql = `UPDATE anm_segregated SET st_group = ? WHERE st_anime = ? AND st_user;`;
            await this.db.query(sql, [title, id]);

            return true;
        }
        catch(e) {
            console.error('Segregated Edit Query ERROR: ' + e);
            return false;
        }
    }

    async DeleteByAnime(anime, user) {
        try {
            const sql = `DELETE FROM anm_segregated WHERE st_user = ? AND st_anime = ?;`;
            await this.db.query(sql, [user, anime]);

            return true;
        }
        catch(e) {
            console.error('Groups Delete Query ERROR: ' + e);
            return false;
        }
    }

    async DeleteByGroup(group, user) {
        try {
            const sql = `DELETE FROM anm_segregated WHERE st_id = ? AND st_group = ?;`;
            await this.db.query(sql, [user, group]);

            return true;
        }
        catch(e) {
            console.error('Groups Delete Query ERROR: ' + e);
            return false;
        }
    }

    async GetRecord(anime, user) {
        try {
            const sql = `SELECT st_group FROM anm_segregated WHERE st_anime = ? AND st_user = ?`;
            const [rows] = await this.db.execute(sql, [anime, user]);
            return rows[0] ? rows[0].st_group : 0;
        }
        catch(e) {
            console.error(`ERROR: Nie udało się pobrać recordu: ${e}`);
            return 0;
        }
    }
}

module.exports = new SegregatedRepository();