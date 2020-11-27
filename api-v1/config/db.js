
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    if (process.env.NODE_ENV == 'test') {
        console.log('TESTING!');
    }
    try {
        await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
        global.log.debug('MongoDB conectado');
    }
    catch (err) {
        await global.log.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;