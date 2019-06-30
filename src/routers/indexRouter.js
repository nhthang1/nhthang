/* eslint-disable linebreak-style */
const express = require('express');

const indexRouter = express.Router();

const homeController = require('../controllers/home.comtrollers');

function router() {


  indexRouter.get('/', homeController.home_page);
  
  return indexRouter;
}

module.exports = router;
