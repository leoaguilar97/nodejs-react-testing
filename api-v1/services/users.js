
const { GET, GET_ALL, UPDATE, CREATE, DELETE, DELETE_ONE, GET_ONE, DELETE_ALL } = require('./operations');

module.exports.User = require('../models/User');
const User = module.exports.User;

// Obtener todos los usuarios
const getAll = async () => {
    const users = await User.find({});

    return { result: users };
};

// Obtener un usuario por su codigo
const get = async code => {
    const user = await User.findOne({ code }).exec();
    if (!user) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }
    return { result: user };
};

// Crear un usuario 
const create = async userData => {
    const user = new User(userData);
    console.log(User);
    console.log(user);
    console.log(user.save);
    const newUser = await user.save();

    return { result: newUser };
};

// Modificar los datos de un usuario
const update = async (code, userData) => {

    const modifiedUser = await User.findOneAndUpdate({ code }, { $set: userData }, { new: true });

    if (!modifiedUser) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }

    return { result: modifiedUser };
};

// Eliminar un usuario
const deleteOne = async (code) => {

    const removedUser = await User.findOneAndDelete({ code });

    if (!removedUser) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }

    return { result: removedUser };
};

// Eliminar todos los usuarios
const deleteMany = async () => {
    await User.deleteMany({});

    return { result: 'Eliminados' };
};

// Controlador de todas las transacciones que se pueden realizar
const transaction = async (operation, params) => {

    const { code, name } = params;

    global.log.debug({ message: 'Realizando transaccion', code, operation, name });

    try {
        switch (operation) {
            case GET_ALL:
                return await getAll(code);
            case GET_ONE:
                return await get(code);

            case CREATE:
                return await create({ name });

            case UPDATE:
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
