/* eslint-disable linebreak-style */
const express = require('express');

const signUpRouter = express.Router();

const signUnController = require('../controllers/signUp.controllers')

function router() {
  signUpRouter.route('/')
    .all(signUnController.user_signin)
    .get(signUnController.user_get_page);


  return signUpRouter;
}

module.exports = router;
