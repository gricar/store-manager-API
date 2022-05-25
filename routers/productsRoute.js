const express = require('express');

const productsController = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.findById);

module.exports = productsRoute;
