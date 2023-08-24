const products = {
  get: [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ],

  create: {
      id: 4,
      name: 'Qualquer produto nerd',
  },
};

const productsResponse = {
  success: {
    status: 'SUCCESSFUL',
    data: products.get,
  },
  
  notFound: {
    status: 'NOT_FOUND',
    data: { message: 'Product not found' },
  },

  create: {
    status: 'CREATED',
    data: products.create,
  },
};

module.exports = {
  products,
  productsResponse,
};
