const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [result] = await connection.execute('SELECT * FROM products ORDER by id');

    return result;
  },

  getById: async (id) => {
    const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

    return result;
  },
};

module.exports = productsModel;
