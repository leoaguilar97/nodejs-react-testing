
const { setCache, getCache, cleanCache } = require('../repositories/CacheRedis');
const { getAll, get, upsert, update, deleteMany, deleteOne } = require('../repositories/IndividualClientMongo');
const { GET_ONE, GET_ALL, CREATE, UPDATE, PATCH, DELETE_ONE, DELETE_ALL } = require('./operations');

const transaction = async (operation, params) => {

    const { code, name } = params;

    global.log.debug({ message: 'Realizando transaccion', operation, params });

    try {
        switch (operation) {
            case GET_ALL:
                const { page, limit } = params;
                return await getAll({ page, limit });

            case GET_ONE: {
                let user = await getCache(code);
                if (!user) {
                    const { result } = await get(code);
                    setCache(code, result);
                    user = result;
                }

                return { result: user };
            }

            case CREATE:
            case UPDATE: {
                const { result } = await upsert(code, { name });
                setCache(result.code, result);

                return { result };
            }

            case PATCH: {
                const { result } = await update(code, { name });

                // TODO: Rutina para actualizar todos los campos
                setCache(code, result);

                return { result };
            }

            case DELETE_ALL:
                return await deleteMany();

            case DELETE_ONE: {
                const result = await deleteOne(code);
                cleanCache(code);
                return result;
            }

            default:
                return {};
        }
    }
    catch (err) {
        await global.log.error(err);
        return { error: err.message, status: err.status || 500 }
    }
};

module.exports.Transaction = transaction;