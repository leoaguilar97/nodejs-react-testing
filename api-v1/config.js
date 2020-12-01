

const appRoot = require('app-root-path');

const DB_URI = process.env.DB_URI;
const ALPHABET = process.env.ALPHABET;
const LOG_PATH = process.env.LOG_PATH || `${appRoot}/logs`;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const PAGE_SIZE_LIMIT = process.env.PAGE_SIZE_LIMIT || 100;

module.exports = { DB_URI, ALPHABET, LOG_PATH, LOG_LEVEL, PAGE_SIZE_LIMIT };