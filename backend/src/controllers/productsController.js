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

  getBySearch: async (req, res) => {
    const { q } = req.query;
    const { status, data } = await productsService.getBySearch(q);

    return res.status(mapStatusHTTP(status)).json(data);
  },

  create: async (req, res) => {
    const { body } = req;
    const { status, data } = await productsService.create(body);
  
    return res.status(mapStatusHTTP(status)).json(data);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { status, data } = await productsService.update(id, body);

    return res.status(mapStatusHTTP(status)).json(data);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.delete(id);

    if (data) {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(mapStatusHTTP(status)).end();
  },
};

module.exports = productsController;
