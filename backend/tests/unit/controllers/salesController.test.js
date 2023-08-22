const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { sales, salesResponse } = require('../mocks/salesMock');

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
});
