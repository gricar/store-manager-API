const Joi = require('joi');

module.exports = async (req, _res, next) => {
  const { error } = Joi.array().items(Joi.object({
    quantity: Joi.number().min(1).required(),
    productId: Joi.number().min(1).required(),
    })).validate(req.body.map((item) => item));

  if (error) return next(error);

  next();
};
