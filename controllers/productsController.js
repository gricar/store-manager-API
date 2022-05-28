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

const create = async (req, res, next) => {
  const newProduct = await productsService.create(req.body);

  if (newProduct.error) return next(newProduct.error);

  res.status(201).json(newProduct);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.findById(id);

  if (product.error) return next(product.error);

  const [productUpdated] = await productsService.update(id, req.body);

  res.status(200).json(productUpdated);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
