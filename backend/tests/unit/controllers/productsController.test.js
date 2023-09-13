const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { products, productsResponse } = require('../../mocks/productsMock');

chai.use(sinonChai);

describe('Testes para a camada Products Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar todos os produtos', async function () {
    sinon.stub(productsService, 'getAll').resolves(productsResponse.success);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products.get);
  });

  it('Deve retornar um produto específico por ID', async function () {
    const productId = 1;
    const expectedProduct = products.get.find((product) => product.id === productId);
    const expectedResponse = { ...productsResponse.success, data: expectedProduct };

    const expectedResult = expectedProduct ? expectedResponse : productsResponse.notFound;

    sinon.stub(productsService, 'getById').resolves(expectedResult);
    const req = { params: { id: productId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('Deve retornar "Product not found" caso produto não encontrado', async function () {
    const productId = 999;
    const expectedProduct = products.get.find((product) => product.id === productId);
    const expectedResponse = { ...productsResponse.success, data: expectedProduct };

    const expectedResult = expectedProduct ? expectedResponse : productsResponse.notFound;

    sinon.stub(productsService, 'getById').resolves(expectedResult);
    const req = { params: { id: productId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('Deve adicionar um novo produto no banco de dados', async function () {
    const { id, ...name } = products.create;

    sinon.stub(productsService, 'create').resolves(productsResponse.create);
    const req = { body: name };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsResponse.create.data);
  });

  it('Deve ser possível atualizar um produto', async function () {
    const { id, ...name } = products.update;

    sinon.stub(productsService, 'update').resolves(productsResponse.update);
    const req = { params: { id }, body: name };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(name);
  });
});
