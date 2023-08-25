const Joi = require('joi');
const schemaValidation = require('./schemaValidation');

const productSchema = {
  isProductName: schemaValidation(Joi.object({
    name: Joi.string().required().empty('').min(5),
  })),

  isSaleValid: schemaValidation(Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().required().empty('')
        .min(1)
        .label('productId'),
      quantity: Joi.number().required().empty('').min(1)
        .label('quantity'),
    }),
  )),
};

/*
const teste = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 1,
    quantity: 5,
  },
];

(() => {
  const result = productSchema.isSaleValid.validate(teste);
  console.log(result);
})();
*/

module.exports = productSchema;
