const express = require('express');
const app = express();
const connectDB = require('./config/db');
const expressWinston = require('express-winston');
const logFiles = require('./config/logger');

connectDB();

app.use(express.json({ extended: false }));

app.use(expressWinston.logger({
    transports: [
        logFiles.expressLogFile
    ]
}));

app.use('/api/v1/users', require('./controllers/users'));

app.use(expressWinston.errorLogger({
    transports: [
        logFiles.expressErrorFile
    ]
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server iniciado en http://localhost:${PORT}`));