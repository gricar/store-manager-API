const Joi = require('joi');

module.exports = async (req, _res, next) => {
  const { error } = Joi.object({
    quantity: Joi.number().min(1).required(),
    productId: Joi.number().min(1).required(),
    }).validate(req.body);

  if (error) return next(error);

  next();
};
