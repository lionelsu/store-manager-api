const productsService = require('../services/productsService');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const productsController = {
  getAll: async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get all products'
    // #swagger.description = 'Endpoint to retrieve all products.'

    const { status, data } = await productsService.getAll();

    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Products" },
      description: 'Returns a list with all products.' 
    } */

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getById: async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get a product by id'
    // #swagger.description = 'Endpoint to retrieve a product by ID.'
    // #swagger.parameters['id'] = { description: 'Product ID.' }

    const { id } = req.params;
    const { status, data } = await productsService.getById(id);

    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Products/items" },
      description: 'Returns a product by ID.' 
    } */

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getBySearch: async (req, res) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Search a product by name'
    // #swagger.description = 'Endpoint to retrieve products based on a search query.'
    /* #swagger.parameters['q'] = {
        description: 'Search query string to filter products.',
        required: true,
        allowEmptyValue: true
      } */

    const { q } = req.query;
    const { status, data } = await productsService.getBySearch(q);

    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Products" },
      description: 'Returns a list of products based on the search criteria. If the search is empty, it returns a list of all available products.' 
    } */

    return res.status(mapStatusHTTP(status)).json(data);
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ['Products']
      #swagger.summary = 'Add a new product'
      #swagger.description = 'This endpoint allows you to add a new product to the system.'
      #swagger.requestBody = {
        description: 'New product data.',
        required: true,
        schema: {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Anel do Lanterna Verde"
              }
            }
          }
        }
      #swagger.responses[201] = {
        description: 'Product created successfully.',
        schema: {
          "id": "number",
          "name": "string"
        }
      }
    */
    const { body } = req;
    const { status, data } = await productsService.create(body);
  
    return res.status(mapStatusHTTP(status)).json(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ['Products']
      #swagger.summary = 'Update a product'
      #swagger.description = 'This endpoint allows you to update a product in the system.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the product to be updated',
        required: true
      }
      #swagger.requestBody = {
        description: 'Updated product data.',
        required: true,
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Martelo do Batman'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Product updated successfully.',
        schema: {
          "id": "number",
          "name": "string"
        }
      }
    */
    const { id } = req.params;
    const { body } = req;
    const { status, data } = await productsService.update(id, body);

    return res.status(mapStatusHTTP(status)).json(data);
  },

  delete: async (req, res) => {
    /*
      #swagger.tags = ['Products']
      #swagger.summary = 'Delete a product'
      #swagger.description = 'This endpoint allows you to delete a product in the system.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the product to be deleted',
        required: true
      }
      #swagger.responses[204] = {
        description: 'No content.'
      }
    */
    const { id } = req.params;
    const { status, data } = await productsService.delete(id);

    if (data) {
    // #swagger.responses[404] = { description: 'Product not found' }
    
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(mapStatusHTTP(status)).end();
  },
};

module.exports = productsController;
