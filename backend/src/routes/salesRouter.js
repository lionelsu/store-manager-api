const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', salesController.create);

module.exports = salesRouter;
