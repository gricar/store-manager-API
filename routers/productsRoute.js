const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.findById);
productsRoute.post('/', validateProducts, rescue(productsController.create));
productsRoute.put('/:id', validateProducts, rescue(productsController.update));
productsRoute.delete('/:id', rescue(productsController.remove));

module.exports = productsRoute;
