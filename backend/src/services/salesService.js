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
};

module.exports = salesService;
