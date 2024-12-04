const cors = require('cors');

module.exports = cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})