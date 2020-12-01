const winston = require('winston');

const { timestamp, combine } = winston.format;

const { LOG_PATH, LOG_LEVEL } = require('../config');

const expressLogFile = new winston.transports.File({
    level: LOG_LEVEL,
    filename: `${LOG_PATH}/api.info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
});

const expressErrorFile = new winston.transports.File({
    level: 'error',
    filename: `${LOG_PATH}/api.errors.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
});

const infoLogFile = new winston.transports.File({
    level: LOG_LEVEL,
    filename: `${LOG_PATH}/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
});

const errorsLogFile = new winston.transports.File({
    level: 'error',
    filename: `${LOG_PATH}/errors.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
});

const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: combine(
        timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        errorsLogFile,
        infoLogFile
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            timestamp()
        )
    }));
}

global.log = logger;

module.exports = { expressLogFile, expressErrorFile };