const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { products, productsResponse, resultHeader } = require('../../mocks/productsMock');

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

  it('Deve ser possível adicionar um novo produto', async function () {
    const { id, ...name } = products.create;

    sinon.stub(connection, 'execute').resolves([{ insertId: id }]);

    const createProduct = await productsModel.create(name);

    expect(createProduct).to.be.equal(4);
  });

  it('Deve ser possível atualizar um produto existente', async function () {
    const { name } = productsResponse.update.data;
    sinon.stub(connection, 'execute').resolves([resultHeader]);

    const updateProduct = await productsModel.update(1, name);

    expect(updateProduct.affectedRows).to.be.equal(1);
  });

  it('Deve ser possível deletar um produto existente', async function () {
    sinon.stub(connection, 'execute').resolves([resultHeader]);

    const deleteProduct = await productsModel.delete(1);

    expect(deleteProduct.affectedRows).to.be.equal(1);
  });
});
