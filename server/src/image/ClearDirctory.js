const fs = require('fs');
const path = require('path');

async function ClearDirectory(directoryPath) {
    try {
        // Pobierz listę plików i folderów w katalogu
        const files = fs.readdirSync(directoryPath);

        // Usuń każdy plik lub folder
        for (const file of files) {
            const fullPath = path.join(directoryPath, file);
            fs.unlinkSync(fullPath);
        }

        console.log(`Zawartość katalogu ${directoryPath} została usunięta.`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Katalog ${directoryPath} nie istnieje.`);
        } else {
            console.error(`Błąd podczas usuwania zawartości katalogu: ${error.message}`);
        }
    }
}

module.exports = ClearDirectory();