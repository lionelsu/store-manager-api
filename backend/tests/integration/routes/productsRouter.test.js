const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const app = require('../../../src/app');
const { products } = require('../../mocks/productsMock');

chai.use(chaiHttp);

describe('Testes de integração para a rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar 201 ao cadastrar um novo produto', async function () {
    const { id, ...name } = products.create;
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: id }])
      .onSecondCall()
      .resolves([products.create]);
    const response = await chai.request(app).post('/products').send(name);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(products.create);
  });

  it('Deve retornar 400 usando o método POST ao cadastrar um produto sem nome', async function () {
    const response = await chai.request(app).post('/products').send('');

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
  });

  it('Deve retornar 422 usando o método POST ao tentar cadastrar um produto com caracteres insuficientes', async function () {
    const response = await chai.request(app).post('/products').send({ name: 'nerd' });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('Deve retornar 500 usando o método POST ao tentar cadastrar um produto com expressões irregulares', async function () {
    const response = await chai.request(app).post('/products').send({ name: null });

    expect(response.status).to.be.equal(500);
  });
});