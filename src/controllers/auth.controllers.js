
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://sa:sa@cluster0-bg155.mongodb.net/test?retryWrites=true&w=majority';
const Cart = require('../model/cart');

exports.auth_create_user = (req, res) => {
    const { username, password } = req.body;
    const dbname = 'shop';
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('conected correctly to server');

        const db = client.db(dbname);

        const col = db.collection('user');
        const user = { username, password };
        const results = await col.insertOne(user);
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


  exports.auth_login = passport.authenticate('local', {
    successRedirect: '/product',
    failureRedirect: '/auth/signIn',
  })

  exports.auth_check_admin = (req, res, next) => {
    if(!req.user) {
      next();
    }
    if (req.user) {
      if (req.user.username === '1' && req.user.password === '1') {
        res.redirect('/admin');
      }
      res.redirect('/auth/profile');
    }
  }

  exports.auth_get_page = (req, res) => {
    console.log(req.session.cart);
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    console.log(cartLength);
    res.render('signin', {cartLength});
  }

  exports.auth_get_profile = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    res.render('profile', {cartLength});
  }

  exports.user_change_profile = (req, res) => {
    console.log(req.file);
    res.send('heeloo');
  }