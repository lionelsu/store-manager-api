const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const { sales, salesResponse } = require('../mocks/salesMock');
const salesService = require('../../../src/services/salesService');

describe('Testes para a camada Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar todos as vendas', async function () {
    sinon.stub(salesModel, 'getAll').resolves(sales.get);

    const getSales = await salesService.getAll();

    expect(getSales.status).to.be.equal('SUCCESSFUL');
    expect(getSales.data).to.be.deep.equal(sales.get);
  });

  it('Deve retornar uma venda específica por ID', async function () {
    const saleId = 1;
    const expectedSale = sales.get.find((sale) => sale.saleId === saleId);
    const expectedResult = expectedSale || salesResponse.notFound;

    sinon.stub(salesModel, 'getById').resolves(expectedSale);

    const getSale = await salesService.getById(saleId);
    expect(getSale.status).to.be.equal('SUCCESSFUL');
    expect(getSale.data).to.be.deep.equal(expectedResult);
  });

  it('Deve retornar "Sale not found" caso venda não encontrada', async function () {
    const saleId = 999;
    const expectedSale = sales.get.find((sale) => sale.saleId === saleId);
    const expectedResult = expectedSale || salesResponse.notFound;

    sinon.stub(salesModel, 'getById').resolves(expectedSale);

    const getSale = await salesService.getById(saleId);
    expect(getSale.status).to.be.equal('NOT_FOUND');
    expect(getSale.data).to.be.deep.equal(expectedResult.data);
  });

  it('Deve retornar "Sale not found" caso id de venda seja inexistente', async function () {
    const saleId = 999;
    const expectedSale = sales.get.find((sale) => sale.saleId === saleId);
    const idExist = expectedSale ? salesResponse.success : [];
    const expectedResult = expectedSale || salesResponse.notFound;
    
    sinon.stub(salesModel, 'getById').resolves(idExist);

    const getSale = await salesService.getById(saleId);

    expect(getSale.status).to.be.equal('NOT_FOUND');
    expect(getSale.data).to.be.deep.equal(expectedResult.data);
  });
});