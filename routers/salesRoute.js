const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSales');
const validateQty = require('../middlewares/validateQty');

const salesRoute = express.Router();

salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.findById);
salesRoute.post('/', validateSales, validateQty, rescue(salesController.create));
salesRoute.put('/:id', validateSales, rescue(salesController.update));
salesRoute.delete('/:id', rescue(salesController.remove));

module.exports = salesRoute;
