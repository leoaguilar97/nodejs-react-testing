
const User = require('../models/User');
const { randomId } = require('../config/nanoid');
const { setCache, getCache, cleanCache } = require('./CacheRedis');

exports.getAll = async ({ page, limit }) => {
    const users = await User.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await User.countDocuments();

    return {
        result: {
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page * 1
        }
    };
};

exports.get = async code => {
    let user = getCache(code);
    if (!user) {
        user = await User.findOne({ code }).exec();

        if (!user) {
            throw { message: 'Usuario no encontrado', status: 404 };
        }

        setCache(code, user);
    }

    return { result: user };
};

exports.upsert = async (code, userData) => {
    if (!code) {
        code = randomId();
        userData.code = code;
    }
    const user = await User.findOneAndUpdate({ code }, userData, { upsert: true, new: true }).exec();
    setCache(code, user);
    return { result: user };
};

exports.update = async (code, userData) => {
    const modifiedUser = await User.findOneAndUpdate({ code }, { $set: userData }, { new: true });
    if (!modifiedUser) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }

    // TODO: Rutina para actualizar todos los campos
    setCache(code, modifiedUser);

    return { result: modifiedUser };
};

exports.deleteOne = async (code) => {
    const removedUser = await User.findOneAndDelete({ code });
    if (!removedUser) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }

    cleanCache(code);

    return { result: removedUser };
};

exports.deleteMany = async () => {
    await User.deleteMany({});
    return { result: 'Eliminados' };
};
