
const { post } = require('../controllers/IndividualClientController');
const User = require('../models/User');

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
    const user = await User.findOne({ code }).exec();
    if (!user) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }
    return { result: user };
};

exports.create = async userData => {
    const user = new User(userData);
    const newUser = await user.save();
    return { result: newUser };
};

exports.update = async (code, userData) => {
    const modifiedUser = await User.findOneAndUpdate({ code }, { $set: userData }, { new: true });
    if (!modifiedUser) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }
    return { result: modifiedUser };
};

exports.deleteOne = async (code) => {
    const removedUser = await User.findOneAndDelete({ code });
    if (!removedUser) {
        throw { message: 'Usuario no encontrado', status: 404 };
    }
    return { result: removedUser };
};

exports.deleteMany = async () => {
    await User.deleteMany({});
    return { result: 'Eliminados' };
};
