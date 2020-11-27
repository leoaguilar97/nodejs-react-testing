const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const User = require('../models/User');

// @route   GET api/users
// @desc    Obtener todos los usuarios
// @access  Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

// @route   GET api/users:code
// @desc    Obtener un usuario especifico
// @access  Public
router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const user = await User.findOne({ code: code });

        if (!user) {
            res.status(404).send(`No existe el usuario con codigo ${code}`);
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

// @route   POST api/users
// @desc    Registrar usuario
// @access  Public
router.post('/',
    [
        check('name', 'Por favor incluye un nombre').not().isEmpty(),
        check('name', 'Minimo 2 caracteres, maximo 50').isLength({ min: 2, max: 50 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name } = req.body;

        try {
            user = new User({ name });
            const newUser = await user.save();

            res.status(201).json(newUser);

        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    });

// @route   PUT api/users:code
// @desc    Modificar un usuario por su codigo
// @access  Public
router.put('/:code',

    [
        check('name', 'Por favor incluye un nombre').not().isEmpty(),
        check('name', 'Minimo 2 caracteres, maximo 50').isLength({ min: 2, max: 50 })
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { code } = req.params;
        const { name } = req.body;

        try {
            const modifiedUser = await User.findOneAndUpdate({ code: code }, { $set: { name: name } }, { new: true });

            if (!modifiedUser) {
                res.status(404).send(`No existe el usuario con codigo ${code}`);
            }
            else {
                res.json(modifiedUser);
            }
        }
        catch (err) {
            res.status(500).send('Server error');
        }
    });

// @route   DELETE api/users:code
// @desc    Elimina todos los usuarios
// @access  Public
router.delete('/',
    async (req, res) => {
        try {
            await User.deleteMany({});
            res.send('Eliminados');
        }
        catch (err) {
            res.status(500).send('Server error');
        }
    });

// @route   DELETE api/users:code
// @desc    Elimina un usuario por su codigo
// @access  Public
router.delete('/:code',
    async (req, res) => {

        const { code } = req.params;

        try {
            const removedUser = await User.findOneAndDelete({ code: code });

            if (!removedUser) {
                res.status(404).send(`No existe el usuario con codigo ${code}`);
            }
            else {
                res.json(removedUser);
            }
        }
        catch (err) {
            res.status(500).send('Server error');
        }
    });

module.exports = router;