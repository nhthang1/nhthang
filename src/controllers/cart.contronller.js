/* eslint-disable linebreak-style */
const express = require('express');
const debug = require('debug')('app:cartRouter');
const { MongoClient, ObjectId } = require('mongodb');
const Cart = require('../model/cart');

const cartRouter = express.Router();

const cartControllers = require('../controllers/cart.contronller');
const uri = 'mongodb+srv://sa:sa@cluster0-bg155.mongodb.net/test?retryWrites=true&w=majority';

exports.cart_post_order = (req, res) => {
    // const productId = req.params.id;
    const { id } = req.params;
    const dbname = 'shop';
    let product;
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('connect correctly to server');

        const db = client.db(dbname);

        const col = await db.collection('product');
        product = await col.findOne({ _id: new ObjectId(id) });
        client.close();
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.add(product, id);
        req.session.cart = cart;
        req.session.save();
        const link = cart.items[id].item.gioitinh;
        res.redirect(`/product/${link}/${id}`);
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  exports.cart_get_info = (req, res) => {
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const products = cart.getItems();
    const cartLength = cart.totalItems;
    // res.send(products);
    // console.log(products);
    res.render('shoppingCart', {
      tittle: 'Giỏ Hàng',
      products,
      totalPrice: cart.totalPrice,
      cartLength,
    });
  }

  exports.cart_add_product = (req, res) => {
    // const productId = req.params.id;
    const { id } = req.params;
    const dbname = 'shop';
    let product;
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('connect correctly to server');

        const db = client.db(dbname);

        const col = await db.collection('product');
        product = await col.findOne({ _id: new ObjectId(id) });
        client.close();
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.add(product, id);
        req.session.cart = cart;
        req.session.save();
        const link = cart.items[id].item.gioitinh;
        res.redirect(`/product/${link}/${id}`);
      } catch (err) {
        debug(err.stack);
      }
      client.close();

    }());
  }

  exports.cart_remove_product = (req, res) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart);
    cart.remove(id);
    req.session.cart = cart;
    res.redirect('/cart');
  }

  exports.cart_check_auth = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      // next();
      res.redirect('/auth/signin');
    }
  }

  exports.cart_checkout = (req, res) => {
    res.render('checkout');
  }

  exports.cart_add_order = (req, res) => {
    const {
      name, telephoneNumber, address, province, district, conmmune,
    } = req.body;
    const cart = new Cart(req.session.cart);
    const infoCustomer = {
      name,
      telephoneNumber,
      address,
      province,
      district,
      conmmune,
      cart,
    };
    const dbname = 'shop';
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        debug('conected correctly to server');

        const db = client.db(dbname);

        const col = db.collection('customer');
        const results = await col.insertOne(infoCustomer);
        debug(results);
        req.login(results.ops[0], () => {
          res.redirect('/');
        });
      } catch (err) {
        debug(err);
      }
      client.close();
    }());
  }