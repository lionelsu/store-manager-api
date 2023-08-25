const { Router } = require('express');
const salesController = require('../controllers/salesController');
const productSchema = require('../middlewares/productSchema');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', productSchema.isSaleValid, salesController.create);

module.exports = salesRouter;
