const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const UserService = require('../services/users');
const UserController = require('../controllers/users');
const { GET_ONE, CREATE } = require('../services/operations');

global.log = {
    info: console.log,
    debug: console.log,
    error: console.error
};

var sandbox;
beforeEach(function () {
    sandbox = sinon.createSandbox();
    jest.useFakeTimers();
});

afterEach(function () {
    sandbox.restore();
});

describe('Usuarios', () => {
    it('Obtener todos los usuarios', async () => {
        return true;
    });

    it('Obtener un usuario', async () => {
        return true;
    });

    it('Crear un usuario', async () => {
        return true;
    });

    it('Modificar un usuario', async () => {
        return true;
    });

    it('Eliminar un usuario', async () => {
        return true;
    });

    it('Eliminar todos los usuarios', async () => {
        return true;
    });
});
