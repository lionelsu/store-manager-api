const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { products } = require('../mocks/productsMock');

describe('Testes para a camada Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products.get]);
    const getProducts = await productsModel.getAll();

    expect(getProducts).to.be.deep.equal(products.get);
  });

  it('Deve retornar o produto pelo ID específico', async function () {
    const productId = 1;
    const expectedProduct = products.get.find((product) => product.id === productId);

    sinon.stub(connection, 'execute').resolves([[expectedProduct]]);

    const getProduct = await productsModel.getById(productId);

    expect(getProduct).to.be.deep.equal(expectedProduct);
  });
});
