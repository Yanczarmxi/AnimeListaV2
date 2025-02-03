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

    async Add(anime, group, user) {
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
            const sql = `UPDATE anm_segregated SET st_group = ? WHERE st_anime = ? AND st_user = ?;`;
            const [result] = await this.db.execute(sql, [group, anime, user]);

            return result.affectedRows;
        }
        catch(e) {
            console.error('Segregated Edit Query ERROR: ' + e);
            return -1;
        }
    }

    async DeleteByAnime(anime, user) {
        try {
            const _anime = Array.isArray(anime) ? anime.map(Number) : [Number(anime)];

            if (_group.some(isNaN)) {
                throw new Error("SEGREGATE REPO: Nieprawidłowa wartość w anime");
            }

            const placeholder = _group.map(() => '?').join(',');
            const sql = `DELETE FROM anm_segregated WHERE st_anime IN (${placeholder}) AND st_user = ?;`;
            const [result] = await this.db.execute(sql, [..._anime, user]);

            return result.affectedRows;
        }
        catch(e) {
            console.error('Groups Delete Query ERROR: ' + e);
            return -1;
        }
    }

    //Group musi byc tablicą
    async DeleteByGroup(group, user) {
        try {
            const _group = Array.isArray(group) ? group.map(Number) : [Number(group)];

            if (_group.some(isNaN)) {
                throw new Error("SEGREGATE REPO: Nieprawidłowa wartość w group");
            }

            const placeholder = _group.map(() => '?').join(',');

            const sql = `DELETE FROM anm_segregated WHERE st_group IN (${placeholder}) AND st_user = ?;`;
            const [result] = await this.db.execute(sql, [..._group, user]);

            return result.affectedRows;
        }
        catch(e) {
            console.error('Groups Delete Query ERROR: ' + e);
            return -1;
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