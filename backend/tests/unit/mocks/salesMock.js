const timeStamp = () => {
  const date = new Date();
  const isoStamp = date.toISOString();

  return isoStamp;
};

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
};

const salesResponse = {
  success: {
    status: 'SUCCESSFUL',
    data: sales.get,
  },

  notFound: {
    status: 'NOT_FOUND',
    data: { message: 'Sale not found' },
  },
};

module.exports = {
  sales,
  salesResponse,
};
