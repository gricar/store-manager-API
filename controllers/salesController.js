const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.findById(id);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const newSale = await salesService.create(req.body);

  res.status(201).json(newSale);
};

const update = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.findById(id);

  if (sale.error) return next(sale.error);

  const saleUpdated = await salesService.update(id, req.body);

  res.status(200).json(saleUpdated);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.findById(id);

  if (sale.error) return next(sale.error);

  await salesService.remove(id);

  res.status(204).end();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
