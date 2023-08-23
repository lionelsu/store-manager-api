const httpResponseMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
};

const mapStatusHTTP = (status) => httpResponseMap[status] || 500;

module.exports = mapStatusHTTP;
