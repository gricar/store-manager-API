const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.query('SELECT * FROM StoreManager.products');

  return allProducts;
};

module.exports = {
  getAll,
};
