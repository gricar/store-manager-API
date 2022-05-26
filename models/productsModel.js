const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM StoreManager.products');

  return allProducts;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);

  if (product.length === 0) return null;
  return product[0];
};

module.exports = {
  getAll,
  findById,
};
