const winston = require('winston');
const appRoot = require('app-root-path');
const { json } = require('express');

const { timestamp, combine } = winston.format;

const expressLogFile = new winston.transports.File({
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
});

const expressErrorFile = new winston.transports.File({
    level: 'error',
    filename: `${appRoot}/logs/app.errors.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
});

const infoLogFile = new winston.transports.File({
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
});

const errorsLogFile = new winston.transports.File({
    level: 'error',
    filename: `${appRoot}/logs/errors.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
});

const logger = winston.createLogger({
    level: 'debug',
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