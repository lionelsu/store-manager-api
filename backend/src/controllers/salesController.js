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

  create: async (req, res) => {
    const { body } = req;
    const { status, data } = await salesService.create(body);

    return res.status(mapStatusHTTP(status)).json(data);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.delete(id);

    if (data) {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(mapStatusHTTP(status)).end();
  },
};

module.exports = salesController;
