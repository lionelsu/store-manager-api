const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { sales, salesResponse } = require('../../mocks/salesMock');
const { resultHeader } = require('../../mocks/productsMock');

describe('Testes para a camada Sales Model', function () {
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

  it('Deve ser possível criar uma nova venda', async function () {
    const { id, ...items } = salesResponse.create.data;

    sinon.stub(connection, 'execute').resolves([{ insertId: id }]);

    const createSale = await salesModel.create(items.itemsSold);
    expect(createSale).to.be.equal(3);
  });

  it('Deve ser possível deletar uma venda existente', async function () {
    sinon.stub(connection, 'execute').resolves([resultHeader]);

    const deleteSale = await salesModel.delete(1);

    expect(deleteSale.affectedRows).to.be.equal(1);
  });

  it('Deve ser possível atualizar a quantidade de um produto existente', async function () {
    sinon.stub(connection, 'execute').resolves([resultHeader]);

    const updateQuantity = await salesModel.update(1, 1, 999);

    expect(updateQuantity.affectedRows).to.be.equal(1);
  });

  it('Deve retornar a quantidade atualizada do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[salesResponse.update.data]]);

    const updateQuantity = await salesModel.updatedQuantity(1, 1);

    expect(updateQuantity).to.be.deep.equal(salesResponse.update.data);
  });
});
