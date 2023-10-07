const { connection } = require('./connection');

const productsModel = {
  getAll: async () => {
    const [result] = await connection.execute('SELECT * FROM products ORDER by id');

    return result;
  },

  getById: async (id) => {
    const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

    return result;
  },

  create: async (name) => {
    const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

    return result.insertId;
  },

  update: async (id, product) => {
    const { name } = product;

    const [result] = await connection.execute(`UPDATE
      products SET name = ? WHERE id = ?`, [name, id]);

    return result;
  },

  delete: async (id) => {
    const [result] = await connection.execute(`DELETE
      FROM products WHERE id = ?`, [id]);

    return result;
  },
};

module.exports = productsModel;
