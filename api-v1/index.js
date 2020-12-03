const express = require('express');
const app = express();
require('dotenv').config()
const {connectDB, connectCache } = require('./config/db');
const expressWinston = require('express-winston');
const logFiles = require('./config/logger');

connectDB();
connectCache();

app.use(express.json({ extended: false }));

app.use(expressWinston.logger({
    transports: [
        logFiles.expressLogFile
    ]
}));

app.use('/api/v1/users', require('./controllers/IndividualClientController'));

app.use(expressWinston.errorLogger({
    transports: [
        logFiles.expressErrorFile
    ]
}));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => global.log.info(`API Iniciada en http://localhost:${PORT}`));

module.exports = { server, PORT };

