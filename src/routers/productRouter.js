/* eslint-disable linebreak-style */
const express = require('express');

const productRouter = express.Router();

const productControllser = require('../controllers/product.controllerts');

const router = (uri) => {
  productRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      next();
      // res.redirect('/auth/signin');
    }
  });

  productRouter.route('/')
    .get(productControllser.products_get_product);

  productRouter.route('/:sex')
    .get(productControllser.product_get_by_sex);


  productRouter.route('/:sex/:id')
    .get(productControllser.product_get_by_id);

  return productRouter;
};

module.exports = router;
