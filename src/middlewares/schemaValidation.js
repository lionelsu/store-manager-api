const schemaValidation = (schema) => (req, res, next) => {
  const { body } = req;
  const { error } = schema.validate(body);

  return error ? next(error) : next();
};

module.exports = schemaValidation;
