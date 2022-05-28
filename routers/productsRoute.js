const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.findById);
productsRoute.post('/', validateProducts, rescue(productsController.create));
productsRoute.put('/:id', validateProducts, rescue(productsController.update));

module.exports = productsRoute;
