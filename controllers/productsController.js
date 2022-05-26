const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.findById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  findById,
};
