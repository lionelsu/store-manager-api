const Joi = require('joi');
const schemaValidation = require('./schemaValidation');

const productSchema = {
  isProductName: schemaValidation(Joi.object({
    name: Joi.string().required().empty('').min(5),
  })),
};

/*
(async () => {
  const { type } = await productSchema.isProductName({ name: '34' });
  console.log(type);
})();
*/

module.exports = productSchema;
