const salesService = require('../services/salesService');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const salesController = {
  getAll: async (req, res) => {
    /*
      #swagger.tags = ['Sales']
      #swagger.summary = 'Get all sales'
      #swagger.description = 'Endpoint to retrieve all sales.'  

      #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Sales" },
        description: 'Returns a list with all sales.'
      }
    */
    const { status, data } = await salesService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  },

  getById: async (req, res) => {
    /*
      #swagger.tags = ['Sales']
      #swagger.summary = 'Get a sale by id'
      #swagger.description = 'Endpoint to retrieve a sale by ID.'
      #swagger.parameters['id'] = { description: 'Sale ID.' }

      #swagger.responses[200] = {
        description: 'Returns a sale by ID.',
        schema: [
          {
            "productId": "number",
            "quantity": "number",
            "date": "timestamp"
          }
        ]
      }
    */
    const { id } = req.params;
    const { status, data } = await salesService.getById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ['Sales']
      #swagger.summary = 'Add a new sale'
      #swagger.description = 'This endpoint allows you to add a new sale to the system.'
      #swagger.requestBody = {
        description: 'New sale data. An array of objects, each containing productId and quantity. Multiple objects with productId and quantity can be included.',
        required: true,
        schema: {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "productId": {
                "type": "number",
                "example": 1
              },
              "quantity": {
                "type": "number",
                "example": "6"
              }
            }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Sale created successfully.',
        schema: {
          "id": "number",
          "itemsSold": [
            {
              "productId": "number",
              "quantity": "number"
            }
          ]
        }
      }
    */
    const { body } = req;
    const { status, data } = await salesService.create(body);

    return res.status(mapStatusHTTP(status)).json(data);
  },

  delete: async (req, res) => {
    /*
      #swagger.tags = ['Sales']
      #swagger.summary = 'Delete a sale'
      #swagger.description = 'This endpoint allows you to delete a sale in the system.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the sale to be deleted',
        required: true
      }
      #swagger.responses[204] = {
        description: 'No content.'
      }
    */
    const { id } = req.params;
    const { status, data } = await salesService.delete(id);

    if (data) {
      // #swagger.responses[404] = { description: 'Sale not found' }
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(mapStatusHTTP(status)).end();
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ['Sales']
      #swagger.summary = 'Update a sale'
      #swagger.description = 'This endpoint allows you to update a sale in the system.'
      #swagger.parameters['saleId'] = {
        in: 'path',
        description: 'ID of the sale.',
        required: true
      }
      #swagger.parameters['productId'] = {
        in: 'path',
        description: 'ID of the product in sale to be updated.',
        required: true
      }
      #swagger.requestBody = {
        description: 'Updated sale data.',
        required: true,
        schema: {
          type: 'object',
          properties: {
            quantity: {
              type: 'number',
              example: 20
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Sale product quantity updated successfully.',
        schema: {
          "date": "timestamp",
          "productId": "number",
          "quantity": "number",
          "saleId": "number"
        }
      }
    */
    const { saleId, productId } = req.params;
    const { quantity } = req.body;

    const { status, data } = await salesService.update(saleId, productId, quantity);

    res.status(mapStatusHTTP(status)).json(data);
  },
};

module.exports = salesController;
