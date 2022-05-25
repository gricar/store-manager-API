const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

module.exports = {
  getAll,
};
