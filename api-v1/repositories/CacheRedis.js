
const { redisClient } = require('../config/db');

const setCache = async (code, obj) => {
    const jsonobj = JSON.stringify(obj);

    try {
        await redisClient.setAsync(code, obj);
        global.log.debug({ msg: 'Datos guardados en cache', code, jsonobj })
        return true;
    }
    catch (err) {
        global.log.error(err);
        return false;
    }
};

const getCache = async (code) => {
    try {
        global.log.debug({ msg: 'Obteniendo del cache', code });
        const cached = await redisClient.getAsync(code);
        if (cached) {
            const jsonCached = JSON.parse(cached);
            global.log.debug({ msg: 'Obtenido del cache', cached, jsonCached, code });

            return jsonCached;
        }
    }
    catch (err) {
        await global.log.error(err);
    }

    return false;
};

const cleanCache = async (code) => {
    try {
        global.log.debug({ msg: 'Eliminado del cache', code });
        await redisClient.del(code);
    }
    catch (err) {
        await global.log.error(err);
    }
};

module.exports = { setCache, getCache, cleanCache };