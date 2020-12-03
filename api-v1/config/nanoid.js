const nanoid = require('nanoid');
const alphabet = process.env.ALPHABET;

const randomId = nanoid.customAlphabet(alphabet, 8);

module.exports = { randomId };