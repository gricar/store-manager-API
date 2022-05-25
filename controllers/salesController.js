const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.findById(id);

  if (sale.error) return next(sale.error);

  res.status(200).json(sale);
};

module.exports = {
  getAll,
  findById,
};
