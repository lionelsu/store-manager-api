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
};

/*
const teste = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 1,
    quantity: 5,
  },
];

(async () => {
  const result = await salesService.create(teste);
  console.log(result);
})();
*/

module.exports = salesService;
