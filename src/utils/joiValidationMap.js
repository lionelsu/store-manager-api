const joiValidationMap = {
  'any.string': 'BAD_REQUEST',
  'any.required': 'BAD_REQUEST',
  'string.min': 'INVALID_VALUE',
  'number.min': 'INVALID_VALUE',
};

module.exports = joiValidationMap;
