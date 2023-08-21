const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { products, productsResponse } = require('../mocks/productsMock');

describe('Testes para a camada Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products.get);

    const getProducts = await productsService.getAll();

    expect(getProducts.status).to.be.equal('SUCCESSFUL');
    expect(getProducts.data).to.be.deep.equal(products.get);
  });

  it('Deve retornar um produto específico por ID', async function () {
    const productId = 1;
    const expectedProduct = products.get.find((product) => product.id === productId);
    const expectedResult = expectedProduct || productsResponse.notFound;

    sinon.stub(productsModel, 'getById').resolves(expectedProduct);

    const getProduct = await productsService.getById(productId);
    expect(getProduct.status).to.be.equal('SUCCESSFUL');
    expect(getProduct.data).to.be.deep.equal(expectedResult);
  });

  it('Deve retornar "Product not found" caso produto não encontrado', async function () {
    const productId = 999;
    const expectedProduct = products.get.find((product) => product.id === productId);
    const expectedResult = expectedProduct || productsResponse.notFound;

    sinon.stub(productsModel, 'getById').resolves(expectedProduct);

    const getProduct = await productsService.getById(productId);
    expect(getProduct.status).to.be.equal('NOT_FOUND');
    expect(getProduct.data).to.be.deep.equal(expectedResult.data);
  });
});
