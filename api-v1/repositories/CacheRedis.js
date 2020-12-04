

const redisClient = global.cache;

const setCache = async (code, obj) => {
    const jsonobj = JSON.stringify(obj);

    try {
        await global.cache.set(code, jsonobj);
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
        const cached = await global.cache.getAsync(code);
        if (cached) {
            const jsonCached = JSON.parse(cached);
            global.log.debug({ msg: 'Obtenido del cache', cached, jsonCached, code });
            jsonCached.cached = true;
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
        await global.cache.del(code);
    }
    catch (err) {
        await global.log.error(err);
    }
};

module.exports = { setCache, getCache, cleanCache };