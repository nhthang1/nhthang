/* eslint-disable linebreak-style */
const express = require('express');
const cartRouter = express.Router();

const cartControllers = require('../controllers/cart.contronller');

function router(uri) {
  cartRouter.route('/')
    .all(cartControllers.cart_check_auth)
    .get(cartControllers.cart_get_info);

  cartRouter.route('/add/:id')
    .get(cartControllers.cart_add_product);

  cartRouter.route('/remove/:id')
    .get(cartControllers.cart_remove_product);

  cartRouter.route('/checkout')
    .get(cartControllers.cart_checkout)
    .post(cartControllers.cart_add_order);

  return cartRouter;
}

module.exports = router;
