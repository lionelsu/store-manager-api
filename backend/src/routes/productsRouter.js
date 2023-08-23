const { Router } = require('express');
const productsController = require('../controllers/productsController');
const productSchema = require('../middlewares/productSchema');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', productSchema.isProductName, productsController.create);

module.exports = productsRouter;
