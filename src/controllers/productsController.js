const productsService = require('../services/productsService');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const productsController = {
  getAll: async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint to retrieve all products.'

    const { status, data } = await productsService.getAll();

    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/AllProducts" },
      description: 'Returns a list of products.' 
    } */

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getById: async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint to retrieve a product by ID.'
    // #swagger.parameters['id'] = { description: 'Product ID.' }

    const { id } = req.params;
    const { status, data } = await productsService.getById(id);

    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/ProductById" },
      description: 'Product by ID.' 
    } */

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getBySearch: async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para obter um produto por id.'
    // #swagger.parameters['id'] = { description: 'ID do produto.' }

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
