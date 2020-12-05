
const mongoose = require('mongoose');

const { DB_URI, CACHE_URI } = require('../config');
const redis = require('redis');
const Promise = require('bluebird');


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
    try {
        let redisClient = await Promise.promisifyAll(redis.createClient(CACHE_URI))

        redisClient.on("error", function (error) {
            global.log.error(error);
        });

        global.log.debug('Redis conectado');

        global.cache = redisClient;
    }
    catch (err) {
        await global.log.error(err);
        await global.log.error('CACHE NO CONECTADA');

        global.cache = {
            set: () => { },
            getAsync: () => { },
            delete: () => { }
        }
    }
}

connectDB();
connectCache();