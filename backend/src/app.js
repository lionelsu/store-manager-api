const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

module.exports = app;
