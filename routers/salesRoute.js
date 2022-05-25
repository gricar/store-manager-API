const express = require('express');

const salesController = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.findById);

module.exports = salesRoute;
