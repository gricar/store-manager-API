const salesModel = require('../models/salesModel');

const getAll = async () => salesModel.getAll();

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const create = async (products) => {
  const saleId = await salesModel.registerSaleDate();

  products.forEach((item) => salesModel.create(item, saleId));

  const itensAdded = {
    id: saleId,
    itemsSold: products.map((item) => item),
  };

  return itensAdded;
};

module.exports = {
  getAll,
  findById,
  create,
};
