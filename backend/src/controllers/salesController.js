const salesService = require('../services/salesService');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const salesController = {
  getAll: async (req, res) => {
    const { status, data } = await salesService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.getById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  },
};

module.exports = salesController;
