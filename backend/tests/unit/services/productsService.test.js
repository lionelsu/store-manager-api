const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { products, productsResponse, resultHeader } = require('../../mocks/productsMock');

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

  it('Deve adicionar um novo produto no banco de dados', async function () {
    const { id, ...name } = products.create;
    sinon.stub(productsModel, 'create').resolves(id);

    const createProduct = await productsService.create(name);
    expect(createProduct.status).to.be.equal(productsResponse.create.status);
    expect(createProduct.data).to.be.deep.equal(products.create);
  });

  it('Deve ser possível atualizar um produto no banco de dados', async function () {
    const productId = 1;
    const updatedName = 'Martelo do Batman';
  
    // Configurar o stub para productsModel.getById
    sinon.stub(productsModel, 'getById')
      .withArgs(productId)
      .resolves(products.update);
  
    // Configurar o stub para productsModel.update
    sinon.stub(productsModel, 'update')
      .withArgs(productId, { name: updatedName })
      .resolves(resultHeader);
  
    const updateProduct = await productsService.update(productId, { name: updatedName });
  
    expect(updateProduct.status).to.be.equal(productsResponse.update.status);
    expect(updateProduct.data).to.be.deep.equal({ id: productId, name: updatedName });
  });

  it('Deve ser possível deletar um produto do banco de dados', async function () {
    const productId = 1;
    sinon.stub(productsModel, 'delete')
      .withArgs(productId)
      .resolves(resultHeader);

    const deleteProduct = await productsService.delete(productId);

    expect(deleteProduct.status).to.be.equal(productsResponse.delete.status);
  });

  it('Não deve ser possível deletar um inexistente produto do banco de dados', async function () {
    const productId = 5;
    sinon.stub(productsModel, 'delete')
      .withArgs(productId)
      .resolves({ ...resultHeader, affectedRows: 0 });

    const deleteProduct = await productsService.delete(productId);

    expect(deleteProduct.status).to.be.equal(productsResponse.notFound.status);
  });

  it('Deve retornar a busca do produto desejado', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products.get);

    const getBySearch = await productsService.getBySearch('Martelo');

    expect(getBySearch.status).to.be.equal(productsResponse.success.status);
    expect(getBySearch.data).to.be.deep.equal([products.get[0]]);
  });
});
