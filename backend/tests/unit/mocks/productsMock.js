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
};

module.exports = {
  products,
  productsResponse,
};
