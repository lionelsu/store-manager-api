const productsService = require('../services/productsService');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const productsController = {
  getAll: async (req, res) => {
    const { status, data } = await productsService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.getById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  },
};

module.exports = productsController;
