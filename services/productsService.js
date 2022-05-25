const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return product;
};

module.exports = {
  getAll,
  findById,
};
