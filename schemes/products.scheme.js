const Joi = require('joi');

const id = Joi.number().positive();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(0);
const image = Joi.string().uri();
const isBlocked = Joi.bool();

const createProductScheme = Joi.object({
  name: name.required(),
  price: price.required(),
});

const updateProductScheme = Joi.object({
  name,
  price,
});

const getProductScheme = Joi.object({
  id: id.required(),
});

module.exports = { createProductScheme, updateProductScheme, getProductScheme, };
