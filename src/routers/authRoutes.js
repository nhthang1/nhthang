/* eslint-disable linebreak-style */
const express = require('express');

const authRouter = express.Router();

const authControllers= require('../controllers/auth.controllers');

function router(uri) {
  authRouter.route('/signUp')
    .post(authControllers.auth_create_user);

  authRouter.route('/signin')
    .all(authControllers.auth_check_admin)
    .get(authControllers.auth_get_page)
    .post(authControllers.auth_login);

  authRouter.route('/profile')
    .get(authControllers.auth_get_profile);
  return authRouter;
}
module.exports = router;
