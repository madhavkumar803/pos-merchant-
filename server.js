const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const data = require("./data");

let Items = require("./model");
let cartItems = require("./modelCart");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

mongoose.connect(config.url, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.post("/create", function (req, res) {
  //working
  let items = new Items(req.body);
  res.send(req.body);
  items
    .save()
    .then((items) => {
      res.status(200);
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

app.get("/home", (req, res) => {
  //working
  Items.find({}, (err, data) => {
    if (err) {
    } else {
      res.status(200).json(data);
    }
  });
});

app.get("/home/:id", (req, res) => {
  //working
  let id = req.body.id;
  Items.findById(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    }
  });
});

app.post("/update/:id/", (req, res, next) => {
  //working
  Items.findByIdAndUpdate(
    req.params.id,
    { items: req.body.items, price: req.body.price, qty: req.body.qty },
    (err, data) => {
      if (!err) {
        res.status(200).send(data);
      }
    }
  );
});

app.get("/cartData/", (req, res) => {
  //working
  cartItems.find({}, (err, data) => {
    if (err) res.status(500).send("not ok");
    else res.status(200).send(data);
  });
});

app.get("/cart/:id", (req, res) => {
  //working
  cartItems.findById(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    }
  });
});

app.post("/cart/add", (req, res) => {
  //working
  let cartItem = new cartItems(req.body);
  cartItem
    .save()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/cart/stock/update/", (req, res) => {
  //woriking
  Items.findByIdAndUpdate(req.body.id, { qty: req.body.qty }, (err, data) => {
    if (!err) {
      console.log(data);
      res.status(200).send(data);
    }
  });
});
app.post("/cart/delete", (req, res) => {
  cartItems.remove({}, (err) => {
    if (!err) {
      res.status(200).send("ok");
    }
  });
});
app.post("/cart/delete/:id/", (req, res) => {
  cartItems.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) res.status(500).send("not ok");
    res.status(200).send("ok");
  });
});

app.listen(process.env.PORT || config.port, function () {
  console.log("Server is running on Port: " + config.port);
});
