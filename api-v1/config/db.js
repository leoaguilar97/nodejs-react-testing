
const mongoose = require('mongoose');
const { DB_URI } = require('../config');

const connectDB = async () => {
    console.log(DB_URI);
    if (process.env.NODE_ENV == 'test') {
        console.debug('TESTING ENVIRONMENT');
    }
    try {
        await mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
        global.log.debug('MongoDB conectado');
    }
    catch (err) {
        await global.log.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;