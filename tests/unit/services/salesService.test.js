const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const { sales, salesResponse } = require('../../mocks/salesMock');
const salesService = require('../../../src/services/salesService');
const { resultHeader } = require('../../mocks/productsMock');

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

  it('Deve ser possível criar uma nova venda', async function () {
    const { id, ...items } = salesResponse.create.data;
    sinon.stub(salesModel, 'create').resolves(id);

    const createSale = await salesService.create(items.itemsSold);

    expect(createSale.status).to.be.equal(salesResponse.create.status);
    expect(createSale.data).to.be.deep.equal(salesResponse.create.data);
  });

  it('Deve retornar "Product not found" caso tente realizar uma venda de um produto inexistente no banco de dados.', async function () {
    const fakeSale = [
      {
        productId: 0,
        quantity: 2,
      },
    ];

    const createSale = await salesService.create(fakeSale);

    expect(createSale.status).to.be.equal('NOT_FOUND');
    expect(createSale.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Deve retornar "Product not found" caso tente realizar um venda de varios produto inexistente no banco de dados.', async function () {
    const fakeSale = [
      {
        productId: 2,
        quantity: 2,
      },
      {
        productId: 0,
        quantity: 2,
      },
    ];

    const createSale = await salesService.create(fakeSale);

    expect(createSale.status).to.be.equal('NOT_FOUND');
    expect(createSale.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Deve ser possível deletar uma venda do banco de dados', async function () {
    const saleId = 1;
    sinon.stub(salesModel, 'delete')
      .withArgs(saleId)
      .resolves(resultHeader);

    const deleteSale = await salesService.delete(saleId);

    expect(deleteSale.status).to.be.equal(salesResponse.delete.status);
  });

  it('Não deve ser possível deletar uma inexistente venda do banco de dados', async function () {
    const saleId = 5;
    sinon.stub(salesModel, 'delete')
      .withArgs(saleId)
      .resolves({ ...resultHeader, affectedRows: 0 });

    const deleteSale = await salesService.delete(saleId);

    expect(deleteSale.status).to.be.equal(salesResponse.notFound.status);
  });

  it('Deve ser possível atualizar a quantidade de um produto existente', async function () {
    sinon.stub(salesModel, 'update')
      .withArgs(1, 1, 999)
      .resolves(resultHeader);

    sinon.stub(salesModel, 'updatedQuantity')
      .withArgs(1, 1)
      .resolves(salesResponse.update.data);

    const updateQuantity = await salesService.update(1, 1, 999);

    expect(updateQuantity.status).to.be.equal(salesResponse.update.status);
    expect(updateQuantity.data).to.be.deep.equal(salesResponse.update.data);
  });

  it('Não deve realizar a atualização do caso acima caso id da venda não exista', async function () {
    sinon.stub(salesModel, 'update').resolves(resultHeader);

    const updateQuantity = await salesService.update(0, 1, 999);

    expect(updateQuantity.status).to.be.equal(salesResponse.notFound.status);
    expect(updateQuantity.data).to.be.deep.equal(salesResponse.notFound.data);
  });

  it('Não deve realizar a atualização do caso acima caso id da venda não esteja relacionado com o id do produto', async function () {
    sinon.stub(salesModel, 'update').resolves(resultHeader);

    const updateQuantity = await salesService.update(1, 5, 999);

    expect(updateQuantity.status).to.be.equal(salesResponse.notFound.status);
    expect(updateQuantity.data)
      .to.be.deep.equal({ message: 'Product not found in sale' });
  });
});
