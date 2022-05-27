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

const findByName = async (name) => {
  const query = `
  SELECT * FROM StoreManager.products
  WHERE name = ?`;

  const [product] = await connection.execute(query, [name]);

  return product;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';

  const [productAdded] = await connection.execute(query, [name, quantity]);

  return ({ id: productAdded.insertId, name, quantity });
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
};
