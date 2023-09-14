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

  update: {
    id: 1,
    name: 'Martelo do Batman',
  },

  delete: {
    id: 1,
    name: 'Martelo de Thor',
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

  update: {
    status: 'SUCCESSFUL',
    data: { name: 'Martelo do Batman' },
  },

  delete: {
    status: 'DELETED',
  },
};

const resultHeader = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
};

module.exports = {
  products,
  productsResponse,
  resultHeader,
};
