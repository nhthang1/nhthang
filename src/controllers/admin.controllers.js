const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const debug = require("debug")("app:adminRouter");
const uri =
  "mongodb+srv://sa:sa@cluster0-bg155.mongodb.net/test?retryWrites=true&w=majority";
const Cart = require("../model/cart");
exports.admin_get_page = (req, res) => {
  // const url = 'mongodb://localhost:27017/';
  // const dbname = 'shop';
  // (async function mongo() {
  //   let client;
  //   try {
  //     client = await MongoClient.connect(url);
  //     debug('connect correctly to server');

  //     const db = client.db(dbname);

  //     //const response = await db.collection('clothes').insertMany(clothes);
  //     res.json(response);
  //   } catch (err) {
  //     debug(err.stack);
  //   }
  //   client.close();
  // }());
  res.render("adminPage", {
    Title: "Admin page"
  });
};

exports.admin_post_product = (req, res) => {
  const {
    masanpham,
    maloai,
    tensanpham,
    gioitinh,
    dongia,
    hinh,
    mota
  } = req.body;
  const product = {
    masanpham,
    maloai,
    tensanpham,
    gioitinh,
    dongia,
    hinh,
    mota
  };
  const dbname = "shop";
  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(uri);
      debug("conected correctly to server");

      const db = client.db(dbname);

      const col = db.collection("product");
      const results = await col.insertOne(product);
      debug(results);
      req.login(results.ops[0], () => {
        res.send(req.body);
      });
    } catch (err) {
      debug(err);
    }
    client.close();
  })();
};

exports.admin_init_product = (req, res) => {
  const dbname = "shop";
  const rawdata = fs.readFileSync("sanpham.json");
  const product = JSON.parse(rawdata);
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(uri);
      debug("connect correctly to server");

      const db = client.db(dbname);

      const response = await db.collection("product").insertMany(product);
      res.json(response);
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
};

exports.admin_auth = (req, res, next) => {
  if (req.user.username === "1" && req.user.password === "1") {
    next();
  } else {
    res.redirect("/");
  }
};

exports.admin_get_warehouse = (req, res) => {
  const dbname = "shop";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      debug("connect correctly to server");
      const db = client.db(dbname);

      const col = await db.collection("product");

      const products = await col
        .find()
        .skip(10)
        .limit(8)
        .toArray();

      res.render("khoHang", {
        Title: "Sản phẩm",
        clo: products
      });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
};

exports.admin_get_users = (req, res) => {
  const dbname = "shop";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      debug("connect correctly to server");
      const db = client.db(dbname);

      const col = await db.collection("user");

      const user = await col.find().toArray();

      res.render("NguoiDung", {
        Title: "Sản phẩm",
        user: user
      });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
};

exports.admin_get_orders = (req, res) => {
  const dbname = "shop";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      debug("connect correctly to server");
      const db = client.db(dbname);

      const col = await db.collection("customer");

      const orders = await col.find().toArray();
      console.log(orders);
      res.render("DonHang", { orders });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
};

exports.admin_orders_get_order = (req, res) => {
  const id = req.params.id;

  const dbname = "shop";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      debug("connect correctly to server");
      const db = client.db(dbname);

      const col = await db.collection("customer");

      const order = await col.findOne({ _id: new ObjectId(id) });
      // console.log(order.cart);
      // console.log(order.cart.items);
      const cart = new Cart(order.cart);
      console.log(cart.getItems().length);
      res.render("order", {
        order,
        products : cart.getItems(),
        totalPrice: cart.totalPrice,
        cartLength: cart.getItems().length,
      });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
};

exports.admin_post_blog = (req, res) => {
  res.render("DangBai");
};
