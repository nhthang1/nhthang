/* eslint-disable linebreak-style */
const express = require('express');
const adminRouter = express.Router();
const adminControllers = require('../controllers/admin.controllers');

function router(uri) {

  adminRouter.use(adminControllers.admin_auth);

  adminRouter.route('/')
    .get(adminControllers.admin_get_page)
    .post(adminControllers.admin_post_product);

  adminRouter.route('/product')
    .get(adminControllers.admin_init_product);

  adminRouter.route('/warehouse')
    .get(adminControllers.admin_get_warehouse)
    .post(adminControllers.admin_delete_product);
  adminRouter.route('/warehouse/:id')
    .get(adminControllers.admin_delete_product);

  adminRouter.route('/users')
    .get(adminControllers.admin_get_users);

  adminRouter.route('/orders')
    .get(adminControllers.admin_get_orders);

  adminRouter.route('/blogs')
    .get(adminControllers.admin_post_blog)

    adminRouter.route('/orders/:id')
    .get(adminControllers.admin_orders_get_order);
  return adminRouter;
}

module.exports = router;
