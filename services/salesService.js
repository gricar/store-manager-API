const salesModel = require('../models/salesModel');

const getAll = async () => salesModel.getAll();

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return sale;
};

module.exports = {
  getAll,
  findById,
};
