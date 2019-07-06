const express = require('express');
const contactRouter = express.Router();

const contactController = require('../controllers/contact.controller');

function router() {
    contactRouter.route('/')
        .get(contactController.contact_get_page);

    return contactRouter;
}

module.exports = router;