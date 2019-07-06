
const Cart = require('../model/cart');

exports.user_signin = (req, res, next) => {
    if (req.user) {
      req.logout();
      res.redirect('/signUp');
    } else {
      next();
    }
  }

  exports.user_get_page = (req, res) => {
    
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    res.render('signUp', {cartLength});
  }