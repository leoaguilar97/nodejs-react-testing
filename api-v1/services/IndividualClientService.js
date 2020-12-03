
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

            case GET_ONE:
                return await get(code);

            case CREATE:
            case UPDATE:
                return await upsert(code, { name });

            case PATCH:
                return await update(code, { name });

            case DELETE_ALL:
                return await deleteMany();

            case DELETE_ONE:
                return await deleteOne(code);

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