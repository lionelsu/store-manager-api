const productsModel = require('../models/productsModel');

const productsService = {
  getAll: async () => {
    const result = await productsModel.getAll();

    return { status: 'SUCCESSFUL', data: result };
  },

  getById: async (id) => {
    const result = await productsModel.getById(id);

    if (!result) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    
    return { status: 'SUCCESSFUL', data: result };
  },
};

module.exports = productsService;
