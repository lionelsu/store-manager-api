const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger-output.json');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(express.json());

// Cors middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Swagger middleware
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da aplicação
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// Tratamento de erros
app.use(errorMiddleware);

module.exports = app;
