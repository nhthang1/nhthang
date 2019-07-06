const express = require('express');
const Cart = require('../model/cart');

const contactRouter = express.Router();

exports.contact_get_page = (req, res) => {
    res.render('contact');
}