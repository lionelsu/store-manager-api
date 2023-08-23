const mapStatusHTTP = require('../utils/mapStatusHTTP');
const joiValidationMap = require('../utils/joiValidationMap');

const errorMiddleware = (error, req, res, _next) => {
  const { type, message } = error.details[0];

  const statusCode = mapStatusHTTP(joiValidationMap[type]);

  return res.status(statusCode).json({ message });
};

module.exports = errorMiddleware;
