const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const { server, PORT } = require('../index');
chai.use(chaiHttp);

process.env.NODE_ENV = 'testing';

const { expect } = chai;

const URL = '/api/v1/users'

const name = faker.name.firstName();
var code;

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

    it('Error al crear un usuario', done => {
        chai
            .request(server)
            .post(URL)
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.errors[0].msg).to.equal('Por favor incluye un nombre');
                expect(res.body.errors[1].msg).to.equal('Minimo 2 caracteres, maximo 50');
                done();
            });
    });

    it('Error al crear un usuario', done => {
        chai
            .request(server)
            .post(URL)
            .send({ name: 'a' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.errors[0].msg).to.equal('Minimo 2 caracteres, maximo 50');
                done();
            });
    });

    it('Crear un usuario', done => {
        chai
            .request(server)
            .post(URL)
            .send({ name: name })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.name).to.equal(name);
                code = res.body.code
                done();
            });
    });

    it('Obtener todos los usuarios', done => {
        chai
            .request(server)
            .get(URL)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.users).to.be.a('array');
                done();
            });
        return true;
    });

    it('Error al obtener un usuario', done => {
        try {
            chai
                .request(server)
                .get(`${URL}/${faker.name.firstName()}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    done();
                });
        } catch (err) { }

    });

    it('Obtener un usuario', done => {
        chai
            .request(server)
            .get(`${URL}/${code}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.name).to.equal(name);
                done();
            });
    });

    it('Error al modificar un usuario con PUT', done => {
        chai
            .request(server)
            .put(`${URL}/${name}`)
            .send()
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.errors[0].msg).to.equal('Por favor incluye un nombre');
                expect(res.body.errors[1].msg).to.equal('Minimo 2 caracteres, maximo 50');
                done();
            });
    });

    it('Error al modificar un usuario con PUT', done => {
        chai
            .request(server)
            .put(`${URL}/${name}`)
            .send({ name: 'a' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.errors[0].msg).to.equal('Minimo 2 caracteres, maximo 50');
                done();
            });
    });

    it('Modificar un usuario con PUT', done => {
        let newName = faker.name.firstName();
        chai
            .request(server)
            .put(`${URL}/${code}`)
            .send({ name: newName })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.name).to.equal(newName);
                done();
            });
    });

    it('Error al modificar un usuario con PATCH', done => {
        chai
            .request(server)
            .patch(`${URL}/${name}`)
            .send()
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.errors[0].msg).to.equal('Por favor incluye un nombre');
                expect(res.body.errors[1].msg).to.equal('Minimo 2 caracteres, maximo 50');
                done();
            });
    });

    it('Error al modificar un usuario con PATCH', done => {
        chai
            .request(server)
            .patch(`${URL}/${name}`)
            .send({ name: 'a' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.errors[0].msg).to.equal('Minimo 2 caracteres, maximo 50');
                done();
            });
    });

    it('Error al modificar un usuario con PATCH', done => {
        chai
            .request(server)
            .patch(`${URL}/${faker.name.firstName()}`)
            .send({ name: faker.name.firstName() })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal('Usuario no encontrado');
                done();
            });
    });

    it('Modificar un usuario con PATCH', done => {
        let newName = faker.name.firstName();
        chai
            .request(server)
            .patch(`${URL}/${code}`)
            .send({ name: newName })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.name).to.equal(newName);
                done();
            });
    });

    it('Error al eliminar un usuario', done => {
        chai
            .request(server)
            .delete(`${URL}/${faker.random.uuid()}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal('Usuario no encontrado');
                done();
            });
    });

    it('Eliminar un usuario', done => {
        chai
            .request(server)
            .delete(`${URL}/${code}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.code).to.equal(code);
                done();
            });
    });

    it('Eliminar todos los usuarios', async () => {
        chai
            .request(server)
            .delete(URL)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});
