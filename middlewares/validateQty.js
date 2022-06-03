const productService = require('../services/productsService');

const errorAmountNotPermitted = {
  code: 'unprocessableEntity',
  message: 'Such amount is not permitted to sell',
};

module.exports = async (req, _res, next) => {
  const [{ productId, quantity }] = req.body;

  const product = await productService.findById(productId);

  if (product.error) return next(product.error);

  if (quantity > product.quantity) return next(errorAmountNotPermitted);

  next();
};
