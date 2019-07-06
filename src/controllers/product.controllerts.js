const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:productRouter');
const uri = 'mongodb+srv://sa:sa@cluster0-bg155.mongodb.net/test?retryWrites=true&w=majority';
const Cart = require('../model/cart');

exports.products_get_product = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    const dbname = 'shop';
    const pageCurrent = (req.query.pagenumber || 1);
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('connect correctly to server');
        const db = client.db(dbname);

        const col = await db.collection('product');
        const numberCol = await col.find().count();
        const totalPage = Math.ceil(numberCol / 15);
        const products = await col.find()
          .skip(pageCurrent * 15 - 15)
          .limit(15)
          .toArray();
        console.log(totalPage);
        res.render(
          'product',
          {
            Title: 'Sản phẩm',
            clo: products,
            totalPage,
            pageCurrent,
            cartLength,
          },
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  exports.product_get_by_sex = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    const { sex } = req.params;
    const dbname = 'shop';
    const pageCurrent = (req.query.pagenumber || 1);
    console.log(pageCurrent);
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('connect correctly to server');
        const db = client.db(dbname);

        const col = await db.collection('product');

        const numberCol = await col.find({ gioitinh: sex }).count();
        const totalPage = Math.ceil(numberCol / 15);
        console.log(totalPage);
        const products = await col.find({ gioitinh: sex })
          .skip(pageCurrent * 15 - 15)
          .limit(15)
          .toArray();

        res.render(
          'product',
          {
            Title: `Sản phẩm ${sex}`,
            clo: products,
            totalPage,
            pageCurrent,
            cartLength
          },
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }


  exports.product_get_by_id = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const cartLength = cart.totalItems;
    const { id } = req.params;
    const dbname = 'shop';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        debug('connect correctly to server');

        const db = client.db(dbname);

        const col = await db.collection('product');
        const product = await col.findOne({ _id: new ObjectId(id) });
        debug('product');
        res.render('singleitem',
          { Title: product.tensanpham, clo: product, cartLength });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }()); 
  }