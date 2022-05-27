const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSales');

const salesRoute = express.Router();

salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.findById);
salesRoute.post('/', validateSales, rescue(salesController.create));

module.exports = salesRoute;
