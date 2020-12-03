
const { randomId } = require('../config/nanoid');
const mongoose = require('mongoose');

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
