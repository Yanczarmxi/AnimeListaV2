async function AddAnimeToRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('DESCRYPTION ERROR: Urzytkownik nie jest zalogowany');
            return res.status(401).json(null);
        }

        {}
    }
    catch(e) {
        console.error(`ERROR Nie udało się dodać anime do bazy danych: ${e}`);
        res.status(500);
    }
}

module.exports = AddAnimeToRecord;