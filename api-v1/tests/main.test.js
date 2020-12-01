const chai = require('chai');
const faker = require('faker');
const { server, PORT } = require('../index');
const got = require('got');

const { expect } = chai;

global.log = {
    info: console.log,
    debug: console.log,
    error: console.error
};

beforeEach(function () {
    jest.useFakeTimers();
});

afterEach(function () {
});

describe('Usuarios', () => {
    it('Obtener todos los usuarios', async () => {
        const response = await got('')


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
