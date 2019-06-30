const Cart = require('../model/cart');
const debug = require('debug')('app:homeRouter');
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://sa:sa@cluster0-bg155.mongodb.net/test?retryWrites=true&w=majority';



exports.home_page = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    
    const dbname = 'shop';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('connect correctly to server');
        const db = client.db(dbname);

        const col = await db.collection('product');
        
        const products = await col.find()
          .skip(10)
          .limit(8)
          .toArray(); 

        res.render(
          'index',
          {
            Title: 'Sản phẩm',
            clo: products,
            cartLength : cartLength,
          },
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }