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

const create = async ({ name, quantity }) => {
  const existProduct = await productsModel.findByName(name);

  if (existProduct.length > 0) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Product already exists',
        },
    };
  }

  return productsModel.create(name, quantity);
};

const update = async (id, { name, quantity }) => productsModel.update(id, name, quantity);

module.exports = {
  getAll,
  findById,
  create,
  update,
};
