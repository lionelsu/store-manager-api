const camelize = require('camelize');
const connection = require('./connection');

const salesModel = {
  getAll: async () => {
    const [result] = await connection.execute(`SELECT
    sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY sale_id, product_id`);

    return camelize(result);
  },

  getById: async (id) => {
    const [result] = await connection.execute(`SELECT
    sp.product_id, sp.quantity, s.date
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sale_id, product_id`, [id]);

    return camelize(result);
  },

  create: async (sales) => {
    const date = new Date();
    const [result] = await connection.execute(`INSERT INTO
    sales (date) VALUES (?)`, [date]);

    const id = result.insertId;

    const insertSales = sales.map((sale) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, sale.productId, sale.quantity],
    ));

    await Promise.all(insertSales);

    return id;
  },

  delete: async (id) => {
    const [result] = await connection.execute(`DELETE
      FROM sales WHERE id = ?`, [id]);

    return result;
  },

  update: async (saleId, productId, quantity) => {
    const [result] = await connection.execute(`UPDATE
      sales_products 
      SET quantity = ? 
      WHERE sale_id = ? 
      AND product_id = ?`, [quantity, saleId, productId]);

    return result;
  },

  updatedQuantity: async (saleId, productId) => {
    const [[result]] = await connection.execute(`SELECT
      s.date, sp.product_id, sp.quantity, sp.sale_id
      FROM sales s
      INNER JOIN sales_products sp
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      AND sp.product_id = ?`, [saleId, productId]);

    return camelize(result);
  },
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

(async () => {
  const result = await salesModel.updatedQuantity(1, 1);
  console.log(result);
})();
*/

module.exports = salesModel;