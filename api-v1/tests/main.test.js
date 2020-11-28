const chai = require('chai');
const sinon = require('sinon');
const faker = require('faker');

const { expect } = chai;

const Users = require('../controllers/users');

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
    it('Obtener todos los usuarios', done => {

        let req = {};
        let res = {
            send: () => { },
            status: sinon.stub().returnsThis()
        };


        const mock = sinon.mock(res);

        mock.expects("send").once().withExactArgs({
            message: "Usuario actualizado correctamente."
        });

        Users.get()

        expect(res.status.calledOnce).to.be.true;
        expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

        mock.verify();

        done();

        return true;
    });

    it('Obtener un usuario', done => {
        return true;
    });

    it('Crear un usuario', done => {
        return true;
    });

    it('Modificar un usuario', done => {
        return true;
    });

    it('Eliminar un usuario', done => {
        return true;
    });

    it('Eliminar todos los usuarios', done => {
        return true;
    });
});
