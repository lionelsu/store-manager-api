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

  create: async (name) => {
    const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

    return result.insertId;
  },

  update: async (id, product) => {
    const { name } = product;

    const [result] = await connection.execute(`UPDATE
      products SET name = ? WHERE id = ?`, [name, id]);

    console.log(result);
    return result;
  },
};

/*
const teste = {
  name: 'Martelo do Batman',
};

(async () => {
  const saida = await productsModel.update(1, teste);
  console.log(saida);
})();
*/

module.exports = productsModel;
