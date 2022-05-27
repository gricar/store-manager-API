const Joi = require('joi');

module.exports = async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
    }).validate(req.body);

  if (error) return next(error);

  next();
};
