const fs = require('fs');
const yaml = require('js-yaml');

var config;

try {
    const rawConfig = fs.readFileSync('./config/config.yaml', 'utf8');
    config = yaml.load(rawConfig);
}
catch(e) {
    console.error('Error: Nie udało się wczytać pliku config.yaml ' + e);
}

module.exports = config;