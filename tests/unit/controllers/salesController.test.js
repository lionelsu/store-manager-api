const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { sales, salesResponse } = require('../../mocks/salesMock');

chai.use(sinonChai);

describe('Testes para a camada Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Deve retornar todos as vendas', async function () {
    sinon.stub(salesService, 'getAll').resolves(salesResponse.success);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales.get);
  });

  it('Deve retornar uma venda específica por ID', async function () {
    const saleId = 1;
    const expectedSale = sales.get.find((sale) => sale.saleId === saleId);
    const expectedResponse = { ...salesResponse.success, data: expectedSale };

    const expectedResult = expectedSale ? expectedResponse : salesResponse.notFound;
  
    sinon.stub(salesService, 'getById').resolves(expectedResult);
    const req = { params: { id: saleId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('Deve retornar "Sale not found" caso venda não encontrada', async function () {
    const saleId = 999;
    const expectedSale = sales.get.find((sale) => sale.saleId === saleId);
    const expectedResponse = { ...salesResponse.success, data: expectedSale };

    const expectedResult = expectedSale ? expectedResponse : salesResponse.notFound;
  
    sinon.stub(salesService, 'getById').resolves(expectedResult);
    const req = { params: { id: saleId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('Deve ser possível criar uma nova venda através do método POST', async function () {
    sinon.stub(salesService, 'create').resolves(salesResponse.create);
    const req = { body: sales.create };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesResponse.create.data);
  });

  it('Deve ser possível deletar um produto', async function () {
    const saleId = 1;
    sinon.stub(salesService, 'delete')
      .withArgs(saleId)
      .resolves(salesResponse.delete);

    const req = { params: { id: saleId } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await salesController.delete(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Não deve ser possível deletar um produto inexistente', async function () {
    const saleId = 5;
    sinon.stub(salesService, 'delete')
      .withArgs(saleId)
      .resolves(salesResponse.notFound);

    const req = { params: { id: saleId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.delete(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesResponse.notFound.data);
  });

  it('Deve ser possível atualizar a quantidade de um produto de uma venda', async function () {
    sinon.stub(salesService, 'update').resolves(salesResponse.update);

    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesResponse.update.data);
  });
});
