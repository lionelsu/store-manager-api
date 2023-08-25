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
};

/*
const teste = 3;

(async () => {
  const saida = await productsModel.getById(teste);
  const saidaArray = [saida];
  console.log(saidaArray);
})();
*/

module.exports = productsModel;
