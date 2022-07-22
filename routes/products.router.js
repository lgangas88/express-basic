const express = require('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');

const {
  createProductScheme,
  updateProductScheme,
  getProductScheme,
} = require('../schemes/products.scheme');

const ProductsService = require('../services/products.service');
const service = new ProductsService();

router.get('/', (req, res) => {
  const query = req.query;
  const products = service.list(query);
  res.json(products);
});

router.get(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  (req, res) => {
    const { id } = req.params;
    const { q, brand } = req.query;
    console.log('Search:', q);
    console.log('Brand:', brand);
    const product = service.getById(id);
    res.json(product);
  }
);

router.post(
  '/',
  validatorHandler(createProductScheme, 'body'),
  (req, res) => {
    const body = req.body;
    const product = service.create(body);
    res.status(201)
      .json(product);
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  validatorHandler(updateProductScheme, 'body'),
  (req, res) => {
    const body = req.body;
    const { id } = req.params;
    const product = service.update(id, body);
    res.json(product);
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  (req, res) => {
    const { id } = req.params;
    service.delete(id);
    res.json({});
  }
);

module.exports = router;
