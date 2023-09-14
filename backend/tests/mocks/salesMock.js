const timeStamp = () => new Date().toISOString();

const sales = {
  get: [
    {
      saleId: 1,
      date: timeStamp(),
      productId: 1,
      quantity: 5,
    },
    { saleId: 1,
      date: timeStamp(),
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: timeStamp(),
      productId: 3,
      quantity: 15,
    },
  ],

  create: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],

  update: {
    date: timeStamp(),
    productId: 1,
    quantity: 999,
    saleId: 1,
  },
};

const salesResponse = {
  success: {
    status: 'SUCCESSFUL',
    data: sales.get,
  },

  create: {
    status: 'CREATED',
    data: { id: 3, itemsSold: sales.create },
  },

  notFound: {
    status: 'NOT_FOUND',
    data: { message: 'Sale not found' },
  },

  delete: {
    status: 'DELETED',
  },

  update: {
    status: 'SUCCESSFUL',
    data: sales.update,
  },
};

module.exports = {
  sales,
  salesResponse,
};
