const { Router } = require('express');
const productsController = require('../controllers/productsController');
const productSchema = require('../middlewares/productSchema');

const productsRouter = Router();

productsRouter.get('/search', productsController.getBySearch);
productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', productSchema.isProductName, productsController.create);
productsRouter.put('/:id', productSchema.isProductName, productsController.update);
productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;
