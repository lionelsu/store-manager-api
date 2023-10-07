const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const salesService = {
  getAll: async () => {
    const result = await salesModel.getAll();

    return { status: 'SUCCESSFUL', data: result };
  },

  getById: async (id) => {
    const result = await salesModel.getById(id);

    if (!result || result.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }

    return { status: 'SUCCESSFUL', data: result };
  },

  create: async (sales) => {
    const allProductsExist = await Promise.all(
      sales.map(async (sale) => {
        const productExists = await productsModel.getById(sale.productId);
        return !!productExists;
      }),
    );
    
    if (!allProductsExist.every((exists) => exists)) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }

    const result = await salesModel.create(sales);

    const saleCreated = {
      id: result,
      itemsSold: sales,
    };

    return { status: 'CREATED', data: saleCreated };
  },

  delete: async (id) => {
    const { affectedRows } = await salesModel.delete(id);

    if (affectedRows === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }

    return { status: 'DELETED' };
  },

  update: async (saleId, productId, quantity) => {
    const saleExists = await salesModel.getById(saleId);
    if (!saleExists || saleExists.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }

    const productExists = saleExists
      .find((product) => product.productId === Number(productId));

    if (!productExists) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
    }

    await salesModel.update(saleId, productId, quantity);

    const result = await salesModel.updatedQuantity(saleId, productId);

    return { status: 'SUCCESSFUL', data: result };
  },
};

module.exports = salesService;
