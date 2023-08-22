const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { sales } = require('../mocks/salesMock');

describe('Testes para a camada Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve listar todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales.get]);
    const getSale = await salesModel.getAll();

    expect(getSale).to.be.deep.equal(sales.get);
  });

  it('Deve retornar a venda pelo ID específico', async function () {
    const saleId = 1;
    const expectedSale = sales.get.find((sale) => sale.saleId === saleId);

    sinon.stub(connection, 'execute').resolves([expectedSale]);

    const getSale = await salesModel.getById(saleId);

    expect(getSale).to.be.deep.equal(expectedSale);
  });
});
