const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT s_p.sale_id AS saleId, s_p.product_id AS productId, s_p.quantity, sales.date
    FROM StoreManager.sales_products AS s_p
    INNER JOIN StoreManager.sales AS sales
    ON s_p.sale_id = sales.id;`;

  const [allSales] = await connection.execute(query);

  return (allSales);
};

const findById = async (id) => {
  const queryId = `
    SELECT s_p.product_id AS productId, s_p.quantity, sales.date
    FROM StoreManager.sales_products AS s_p
    INNER JOIN StoreManager.sales AS sales
    ON s_p.sale_id = sales.id
    WHERE id = ?;`;

  const [sale] = await connection.execute(queryId, [id]);

  if (sale.length === 0) return null;
  return sale;
};

const registerSaleDate = async () => {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  const querySaleDate = 'INSERT INTO StoreManager.sales (date) VALUES (?);';

  const [dateAdded] = await connection.execute(querySaleDate, [now]);

  return dateAdded.insertId;
};

const create = async ({ productId, quantity }, saleId) => {
  const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`;

  return connection.execute(query, [saleId, productId, quantity]);
};

const update = async (id, quantity) => {
  const query = `
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ?;`;

  return connection.execute(query, [quantity, id]);
};

module.exports = {
  getAll,
  findById,
  registerSaleDate,
  create,
  update,
};
