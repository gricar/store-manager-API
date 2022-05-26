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

module.exports = {
  getAll,
  findById,
};
