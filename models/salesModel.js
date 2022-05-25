const connection = require('./connection');

const getAll = async () => {
  const [allsales] = await connection.execute('SELECT * FROM StoreManager.sales');

  return allsales;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;
  return sale;
};

module.exports = {
  getAll,
  findById,
};
