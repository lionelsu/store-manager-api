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
    const result = await salesModel.create(sales);

    return { status: 'CREATED', data: { id: result, itemsSold: sales } };
  },
};

module.exports = salesService;
