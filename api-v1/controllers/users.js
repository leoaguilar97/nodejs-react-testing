const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserService = require('../services/users');

const { UPDATE, GET_ALL, CREATE, DELETE_ONE, GET_ONE, DELETE_ALL } = require('../services/operations');

// Crear una transaccion en la base de datos
const createTransaction = async (operation, params, res, next) => {

    const { status, error, result } = await UserService(operation, params);

    if (error) {
        res.status(status).send(error);
        return next({ status, error });
    }
    else {
        return res.status(status || 200).json(result);
    }
};

// Revisar si la validacion del payload enviado es correcto, se realiza con express-validator
//     Los datos a validar estan en req.body
const validationPassed = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return false;
    }

    return true;
};

// @route   GET api/users
// @desc    Obtener todos los usuarios
// @access  Public
router.get('/', (_req, res, next) => {
    createTransaction(GET_ALL, {}, res, next);
});

// @route   GET api/users:code
// @desc    Obtener un usuario especifico
// @access  Public
router.get('/:code', (req, res, next) => {
    createTransaction(GET_ONE, req.params, res, next);
});

// @route   POST api/users
// @desc    Registrar usuario
// @access  Public
router.post('/',
    [
        check('name', 'Por favor incluye un nombre').not().isEmpty(),
        check('name', 'Minimo 2 caracteres, maximo 50').isLength({ min: 2, max: 50 })
    ],
    (req, res, next) => {
        if (validationPassed(req, res)) {
            createTransaction(CREATE, req.body, res, next);
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
    (req, res, next) => {
        if (validationPassed(req, res)) {
            const { code } = req.params;
            const { name } = req.body;

            createTransaction(UPDATE, { code: code, name: name }, res, next);
        }
    });

// @route   DELETE api/users:code
// @desc    Elimina todos los usuarios
// @access  Public
router.delete('/',
    (_req, res, next) => {
        createTransaction(DELETE_ALL, {}, res, next);
    });

// @route   DELETE api/users:code
// @desc    Elimina un usuario por su codigo
// @access  Public
router.delete('/:code',
    (req, res, next) => {
        createTransaction(DELETE_ONE, req.params, res, next);
    });

module.exports = router;