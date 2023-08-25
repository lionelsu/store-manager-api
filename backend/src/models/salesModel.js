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
};

module.exports = salesModel;