
const { redisClient } = require('../config/db');


const setCache = async (code, obj) => {
    const jsonobj = JSON.stringify(obj);

    try {
        await redisClient.set(code, obj);
        global.log.debug({ msg: 'Datos guardados en cache', code, jsonobj })
        return true;
    }
    catch (err) {
        global.log.error(err);
        return false;
    }
};

const getCache = async (code) => {
  
    const cached = await redisClient.db.get(code);
    console.log(cached);
};