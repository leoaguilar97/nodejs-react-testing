
const mongoose = require('mongoose');
const { DB_URI } = require('../config');
const redis = require('redis');
const redisCllient = {};

const connectDB = async () => {
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

const connectCache = async () => {
    if (process.env.NODE_ENV == 'test') {
        console.debug('TESTING ENVIRONMENT');
    }

    try {

        redisCllient.db = await redis.createClient('redis://0.0.0.0:6379')

        redisCllient.db.on("error", function (error) {
            global.log.error(error);
        });

        global.log.debug('Redis conectado');
    }
    catch (err) {
        await global.log.error(err);
        process.exit(1);
    }
}

module.exports = {
    connectDB, connectCache, redisCllient
};