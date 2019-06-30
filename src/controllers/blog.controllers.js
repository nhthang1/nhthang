const uri = 'mongodb+srv://sa:sa@cluster0-bg155.mongodb.net/test?retryWrites=true&w=majority';
const Cart = require('../model/cart');

exports.blog_get_list = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    res.render('blogList', {cartLength} );
}


exports.blog_get_blog = (req, res ) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    res.render('blog', {cartLength});
}