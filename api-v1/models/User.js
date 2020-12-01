
const nanoid = require('nanoid');
const mongoose = require('mongoose');

const alphabet = process.env.ALPHABET;

const randomId = nanoid.customAlphabet(alphabet, 8);

const UserSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: randomId
    },

    name: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = User = mongoose.model('user', UserSchema);
